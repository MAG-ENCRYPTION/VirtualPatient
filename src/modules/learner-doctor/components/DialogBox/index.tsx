import styled from '@emotion/styled';
import { KeyboardVoice, Send } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ButtonWithModal } from '../../../shared/ButtonModal';
import { SpeechToText } from '../../../shared/SpeechToText';
import { Speak } from '../../../shared/TextToSpeech';
import { askQuestion } from '../../network';
import { SymptomStatus } from '../../pages/consultation';
import { RecieverMessage } from './message/reciever';
import { SenderMessage } from './message/sender';

export type MessageType = {
  patient?: boolean;
  message: string;
  date: Date;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;

  > .message {
  }

  > .textfield {
  }
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

  useEffect(() => {
    getQuestions(questionPairs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionPairs]);

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
      let mess = messages;
      mess.push({ message: question, patient: false, date: new Date() });
      setMessages(mess);
      setQuestion('');
      await askQuestion(clinicalCaseId, question).then((resp) => {
        mess.push({ message: resp.response, patient: true, date: new Date() });
        setMessages(mess);
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
      });

      document
        .getElementById('message-block')
        ?.scrollTo(
          0,
          document.getElementById('message-block')?.scrollHeight as number,
        );
    }
  };

  return (
    <Container>
      <div id='message-block' className='messages y-scroll'>
        {messages.map((mes, index) => {
          if (mes.patient) {
            return <RecieverMessage key={index} message={mes} />;
          } else {
            return <SenderMessage key={index} message={mes} />;
          }
        })}
      </div>

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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress color='success' size={20} />
                    <p style={{ fontSize: 11, margin: 0 }}>sending...</p>
                  </div>
                )}
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            const { value } = event.target;
            setQuestion(value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendQuestion();
            }
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            endIcon={<Send />}
            onClick={sendQuestion}
            style={{ marginRight: 5 }}
          >
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
    </Container>
  );
};
