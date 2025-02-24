import styled from '@emotion/styled';
import { KeyboardVoice, Send } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Snackbar,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ButtonWithModal } from '../../../shared/ButtonModal';
import { SpeechToText } from '../../../shared/SpeechToText';
import { Speak } from '../../../shared/TextToSpeech';
import { discussion } from '../../network'; // Importation de la fonction discussion
import { SymptomStatus } from '../../pages/consultation';
import { RecieverMessage } from './message/reciever';
import { SenderMessage } from './message/sender';

export type MessageType = {
  patient?: boolean;
  message: string;
  date: Date;
  editable?: boolean;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
`;

export type QuesPairType = {
  id: string;
  question: string;
  answer: string;
  status: boolean;
  class: string;
};

export const DiaglogBox = ({
  clinicalCaseId,
  getQuestions,
  updateConsultSequence,
  getSymptomStatus,
}: {
  clinicalCaseId: string;
  getQuestions: (quest: QuesPairType[]) => void;
  updateConsultSequence: (seq: string) => void;
  getSymptomStatus: (sympStatus: SymptomStatus) => void;
}) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sendingQues, setSendingQues] = useState(false);
  const [questionPairs, setQuestionPairs] = useState<QuesPairType[]>([]);
  const [index, setIndex] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);
  const [editingMessageIndex, setEditingMessageIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');

  useEffect(() => {
    getQuestions(questionPairs);
  }, [questionPairs, getQuestions]);

  const setSequence = (classe: string) => {
    if (classe === 'Salutation') {
      updateConsultSequence('1');
    } else if (classe === 'Initial Problem') {
      updateConsultSequence('2');
    } else {
      updateConsultSequence('4');
    }
  };

  const sendQuestion = async () => {
    setSendingQues(true);
    if (question !== '') {
      const newMessages = [...messages, { message: question, patient: false, date: new Date() }];
      setMessages(newMessages);
      setQuestion('');

      try {
        const resp = await discussion("case_1", question); // Appel au backend GPT-2 avec l'ID du cas clinique
        const updatedMessages = [...newMessages, { message: resp.response, patient: true, date: new Date() }];
        setMessages(updatedMessages);
        setSendingQues(false);
        Speak(resp.response, 'F', 'Microsoft');
        setSequence(resp.class);

        setQuestionPairs([
          ...questionPairs,
          {
            id: index.toString(),
            question: question,
            answer: resp.response,
            status: resp.status,
            class: resp.class,
          },
        ]);

        if (resp.class === 'Symptoms' && resp.symptom) {
          getSymptomStatus({ symptom: resp.symptom, found: resp.status });
        }
        setIndex(index + 1);

        // Scroll to the bottom of the message block
        document.getElementById('message-block')?.scrollTo(0, document.getElementById('message-block')?.scrollHeight as number);

        // Show notification for new message
        setNotification('New message received');
        setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
      } catch (error) {
        console.error('Error sending question:', error);
        setSendingQues(false);
      }
    }
  };

  // const handleEditMessage = (index: number) => {
  //   const messageToEdit = messages[index];
  //   if (messageToEdit) {
  //     setEditingMessageIndex(index);
  //     setEditedMessage(messageToEdit.message);
  //   }
  // };

  const saveEditedMessage = () => {
    if (editingMessageIndex !== null) {
      const updatedMessages = messages.map((msg, idx) =>
        idx === editingMessageIndex ? { ...msg, message: editedMessage } : msg
      );
      setMessages(updatedMessages);
      setEditingMessageIndex(null);
      setEditedMessage('');
    }
  };

  return (
    <Container>
      <div id='message-block' className='messages y-scroll'>
        {messages.map((mes, index) => (
          mes.patient ? (
            <RecieverMessage
              key={index}
              message={mes}
            />
          ) : (
            <SenderMessage
              key={index}
              message={mes}
            />
          )
        ))}
      </div>

      {editingMessageIndex !== null && (
        <div className='editing'>
          <TextField
            fullWidth
            margin='dense'
            value={editedMessage}
            onChange={(event) => setEditedMessage(event.target.value)}
          />
          <Button variant='contained' onClick={saveEditedMessage}>
            Save
          </Button>
          <Button variant='outlined' onClick={() => setEditingMessageIndex(null)}>
            Cancel
          </Button>
        </div>
      )}

      <div className='textfield'>
        <TextField
          fullWidth
          margin='dense'
          placeholder='Ask a question to the patient'
          value={question}
          InputProps={{
            style: { backgroundColor: 'white' },
            endAdornment: (
              <InputAdornment position='end'>
                {sendingQues && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress color='success' size={20} />
                    <p style={{ fontSize: 11, margin: 0 }}>sending...</p>
                  </div>
                )}
              </InputAdornment>
            ),
          }}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendQuestion();
            }
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' endIcon={<Send />} onClick={sendQuestion} style={{ marginRight: 5 }}>
            Send
          </Button>

          <ButtonWithModal
            title='Speech to Text'
            buttonText='Speak'
            buttonProps={{ endIcon: <KeyboardVoice /> }}
          >
            {(closeModal) => (
              <div>
                <SpeechToText getText={setQuestion} />
                <div className='container'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      closeModal();
                      sendQuestion();
                    }}
                  >
                    Send
                  </Button>
                  <Button variant='outlined' onClick={closeModal}>
                    Validate & Modify
                  </Button>
                </div>
              </div>
            )}
          </ButtonWithModal>
        </div>
      </div>

      <Snackbar
        open={!!notification}
        message={notification || ''}
        autoHideDuration={3000}
      />
    </Container>
  );
};
