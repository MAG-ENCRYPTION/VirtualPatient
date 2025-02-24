import styled from '@emotion/styled';
import {
  ArrowForward,
  Cached,
  EmojiObjects,
  HelpOutline,
  LocalHospital,
  MenuBook,
  Vaccines,
} from '@mui/icons-material';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { random } from 'lodash';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TotalClinicalCase } from '../../../entities/TotalClinicalCase';
import { HypothesisTuto } from '../../../entities/tutor/HypothesisTuto';
import { MedExamTuto } from '../../../entities/tutor/MedExamTuto';
import { PhyDiagnosisTuto } from '../../../entities/tutor/PhyDiagnosisTuto';
import { UserStateType } from '../../../redux/userStore/reducer';
import { ROUTES } from '../../../routes';
import VirtualRoom from '../../3dComponents/Virtual_room_users_2';
import { getClinicalCase } from '../../expert-doctor/network';
import { BackdropLoader } from '../../shared/Backdrop';
import { ButtonWithModal } from '../../shared/ButtonModal';
import { Notification } from '../../shared/Notification';
import { StopWatch } from '../../shared/StopWatch';
import { DiaglogBox, QuesPairType } from '../components/DialogBox';
import { FinalDiagnosis } from '../components/FinalDiagnosis';
import { Hypothesis } from '../components/Hypothesis';
import { MedDiagnosis } from '../components/MedDianosis';
import { MedicalReport } from '../components/MedReport';
import { PhyDiagnosis } from '../components/PhyDiagnosis';
import { Progress } from '../components/Progress';
import {
  calculateScore,
  checkConsultationProcedure,
  saveConsultation,
  updateLearnerModel,
} from '../network';

const Container = styled.div`
  display: flex;

  .patient {
    flex: 3;
    width: 100%;
    height: 100vh;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .dim {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .progress {
      position: fixed;
      top: 20px;
      left: 20px;
    }

    .clock {
      position: fixed;
      top: 60px;
      left: 20px;
    }

    .buttons {
      position: fixed;
      bottom: 0;
      width: 70%;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      padding-bottom: 15px;

      .tips {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .conversation {
    flex: 1;
    width: 100%;
    height: 95vh;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    margin: 10px 20px 10px 0px;
    border-radius: 20px;
    padding: 10px 10px 0px 10px;
    z-index: 2;

    h5 {
      text-align: center;
      font-family: Montserrat;
    }
  }
`;

export type SymptomStatus = {
  symptom: string;
  found: boolean;
};

export const Consultation = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(true);
  const [startClock, setStartClock] = useState(false);
  const [showStartConsult, setShowStartConsult] = useState(false);
  let training = useParams().training as 'summative' | 'formative';
  const [clinicalCase, setClinicalCase] = useState<TotalClinicalCase>();
  const [questions, setQuestions] = useState<QuesPairType[]>([]);
  const [hypothesis, setHypothesis] = useState<HypothesisTuto[]>([]);
  const [phyDiagnosis, setPhyDiagnosis] = useState<PhyDiagnosisTuto[]>([]);
  const [medExam, setMedExam] = useState<MedExamTuto[]>([]);
  const [consultSequence, setConsultSequence] = useState('');
  const [symptomStatus, setSymptomStatus] = useState<SymptomStatus[]>([]);
  const [goodSymptomCount, setGoodSymptomCount] = useState(0);
  const [showHypothesis, setShowHypothesis] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [hint, setHint] = useState('');
  const [numHints, setNumHints] = useState(1);
  const [hypothesisThreshold, setHypothesisThreshold] = useState(0.4);
  const [finalDiagnosis, setFinalDiagnosis] = useState('');
  const [allPrescription, setAllPrescription] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    getClinicalCase('fc064370-246d-41dd-a65a-72edab73a568').then((clicase) => {
      setClinicalCase(clicase[0]);
      setLoading(false);
      setShowStartConsult(true);
      console.log(clicase[0]);
    });
  }, []);

  const updateConsultSequence = (seq: string) => {
    if (consultSequence.indexOf(seq) === -1) {
      setConsultSequence(consultSequence + seq);
    }
  };

  const addSymptomStatus = (symp: SymptomStatus) => {
    const exists = symptomStatus.find((item) => item.symptom === symp.symptom);
    if (!exists) {
      setSymptomStatus([...symptomStatus, symp]);
      if (symp.found) {
        setGoodSymptomCount(goodSymptomCount + 1);
      }
    }
  };

  const handleClose = (event: any, reason: any) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown'))
      return;
  };

  const addPhyDiagnosis = (phyDiag: PhyDiagnosisTuto) => {
    let diags = phyDiagnosis;
    for (let diag of diags) {
      if (diag.id === phyDiag.id) {
        diag.verdict = phyDiag.verdict;
        setPhyDiagnosis([...diags]);
        return;
      }
    }
    setPhyDiagnosis([...diags, phyDiag]);
  };

  const addHypothesis = (hypo: HypothesisTuto) => {
    setHypothesis([...hypothesis, hypo]);
    setHypothesisThreshold(hypothesisThreshold + 0.1); // mettre à jour le seuil de probabilité de l'hypothèse
  };

  const getTip = () => {
    const trueSymptoms = clinicalCase?.symptom.map((item) => item.name);
    const detectedSymptoms = symptomStatus.map((item) => item.symptom);

    if (trueSymptoms) {
      const remainingSymps = [];
      for (let symp of trueSymptoms) {
        if (!detectedSymptoms.includes(symp)) {
          remainingSymps.push(symp);
        }
      }
      if (remainingSymps.length !== 0) {
        const hintToShow = remainingSymps[random(remainingSymps.length - 1)];
        setHint('Hint: The patient has the following symptom : ' + hintToShow);
        setSymptomStatus([
          ...symptomStatus,
          { symptom: hintToShow, found: true },
        ]);
        setTimeout(() => setHint(''), 11000);
        setNumHints(numHints - 1);
      } else {
        setHint('No hint available ');
      }
    }
    setShowTip(false);
  };

  const updateLearnerModelScore = async () => {
    if (clinicalCase) {
      const dataToPost = {
        learner: connectedUser.id,
        system: clinicalCase.system.split(';'),
        disease: clinicalCase.final_diagnosis,
        symptoms: symptomStatus
          .filter((it) => it.found === true)
          .map((symp) => symp.symptom),
        status: finalDiagnosis === clinicalCase?.final_diagnosis ? true : false,
      };
      await updateLearnerModel(
        dataToPost.learner,
        dataToPost.system,
        dataToPost.disease,
        dataToPost.symptoms,
        dataToPost.status,
      ).then((resp) => {
        console.log(resp);
      });
    }
  };

  const calculateLearnerScore = async () => {
    if (clinicalCase) {
      const dataToPost = {
        symptoms: symptomStatus.map((symp) => symp.symptom),
        learner: connectedUser.id,
        clinical_case: clinicalCase.id,
        procedure: checkConsultationProcedure(consultSequence),
        exams: allPrescription,
        final_diagnostic:
          finalDiagnosis === clinicalCase?.final_diagnosis ? true : false,
      };
      await calculateScore(
        dataToPost.learner,
        dataToPost.symptoms,
        dataToPost.clinical_case,
        dataToPost.exams,
        dataToPost.procedure,
        dataToPost.final_diagnostic,
      ).then(async (resp) => {
        console.log(resp);
        await createEvaluations(resp.note);
      });
    }
  };

  const createEvaluations = async (mark: number) => {
    const evaluation = {
      type: training === 'formative' ? 'FORMATIF' : 'SOMMATIF',
      mark,
      duration,
      learner_physician: connectedUser.id,
      virtual_case: '8c7022e9-3427-4a66-8f4d-6f90e096813a',
      final_diagnosis: finalDiagnosis,
      symptom: symptomStatus.map((item) => item.symptom).join(';'),
    };
    const hyptothesisData = [];
    for (let hyp of hypothesis) {
      hyptothesisData.push({
        symptoms: hyp.symptoms,
        diseases: hyp.hypothesis.map((it) => it.key),
        reason: hyp.reason,
        threshold: hyp.threshold,
        learner_physician: connectedUser.id,
      });
    }

    const questionsData = [];
    for (let ques of questions) {
      questionsData.push({
        question: ques.question,
        answer: ques.answer,
        status: ques.status,
        learner_physician: connectedUser.id,
      });
    }

    const diagnosisData = [];
    for (let phy of phyDiagnosis) {
      diagnosisData.push({
        type: 'PHYSICAL DIAGNOSIS',
        name: phy.exam,
        result: '',
        verdict: phy.verdict,
      });
    }
    for (let phy of medExam) {
      diagnosisData.push({
        type: 'EXAM',
        name: phy.exam,
        result: phy.result,
        verdict: String(phy.verdict),
      });
    }

    const objectToPost = {
      evaluation,
      hypothesis: hyptothesisData,
      diagnosis: diagnosisData,
      question: questionsData,
    };
    console.log(objectToPost);
    await saveConsultation(objectToPost).then((resp) => {
      console.log(resp);
      setLoading(false);
      if (resp) {
        router(ROUTES.LEARNERS.CONSULT_REPORT(resp.evaluation.id));
      }
    });
  };

  const terminerConsultation = async () => {
    setLoading(true);
    await updateLearnerModelScore();
    await calculateLearnerScore();
  };

  useEffect(() => {
    if (finalDiagnosis) {
      // terminer le diagnostic après avoir posé le diagnostic final.
      terminerConsultation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalDiagnosis]);

  useEffect(() => {
    if (goodSymptomCount === 3 && training === 'formative') {
      setTimeout(() => setShowHypothesis(true), 3000);
      setGoodSymptomCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodSymptomCount]);

  return (
    <Container>
      <BackdropLoader loading={loading} />
      <div className='patient'>
        <div className='dim'>
          <Canvas style={{}}>
            <OrbitControls
              enableZoom={true}
              maxAzimuthAngle={Math.PI / 3} //side angles
              minAzimuthAngle={-Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
              minZoom={0.4}
              maxZoom={1.0}
            />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.5} />
            <Suspense fallback={null}>
              <VirtualRoom />
            </Suspense>
          </Canvas>
        </div>

        <div className='progress'>
          <ButtonWithModal
            title='Examination Progress'
            buttonText='Examination Progress'
            buttonProps={{ startIcon: <Cached /> }}
            dialogProps={{ fullScreen: true }}
            transition={true}
          >
            {(closeModal) => (
              <Progress
                questions={questions}
                closeModal={closeModal}
                hypothesis={hypothesis}
                phyDiagnosis={phyDiagnosis}
                medDiagnosis={medExam}
              />
            )}
          </ButtonWithModal>
        </div>

        <div className='clock'>
          <StopWatch startClock={startClock} getTime={setDuration} />

          <Tooltip title='End the consultation and exit'>
            <div>
              <ButtonWithModal
                title='End the medical consultation'
                buttonText='Terminate'
                buttonProps={{
                  endIcon: <ArrowForward />,
                  color: 'error',
                  variant: 'outlined',
                  sx: { mt: 2 },
                }}
              >
                {(closeModal) => (
                  <FinalDiagnosis
                    closeModal={closeModal}
                    identifiedSymptoms={symptomStatus}
                    getFinalDiagnosis={setFinalDiagnosis}
                  />
                )}
              </ButtonWithModal>
            </div>
          </Tooltip>
        </div>

        <Grid container spacing={2} className='buttons'>
          {numHints !== 0 && (
            <Grid item>
              <Tooltip
                title='get a tip'
                placement='left-start'
                arrow
                followCursor
              >
                <Badge badgeContent={numHints} color='error'>
                  <div
                    className='tips heart-beat'
                    onClick={() => setShowTip(true)}
                  >
                    <EmojiObjects color='error' />
                  </div>
                </Badge>
              </Tooltip>
            </Grid>
          )}

          <Grid item>
            <ButtonWithModal
              title="Patient's Medical Report"
              buttonText="Patient's Medical Report"
              buttonProps={{ startIcon: <MenuBook /> }}
            >
              {(closeModal) => (
                <MedicalReport
                  clinicalCase={clinicalCase as TotalClinicalCase}
                  closeModal={closeModal}
                  updateConsultSequence={updateConsultSequence}
                />
              )}
            </ButtonWithModal>
          </Grid>
          {training === 'summative' && (
            <Grid item>
              <ButtonWithModal
                title='Make a hypothesis'
                buttonText='Hypothesis'
                buttonProps={{ startIcon: <HelpOutline /> }}
                maxWidth='xs'
              >
                {(closeModal) => (
                  <Hypothesis
                    closeModal={closeModal}
                    identifiedSymptoms={symptomStatus}
                    getHypothesis={addHypothesis}
                    threshold={hypothesisThreshold}
                  />
                )}
              </ButtonWithModal>
            </Grid>
          )}

          <Grid item>
            <ButtonWithModal
              title='Prescribe a Medical Examination'
              buttonText='Medical Examination'
              buttonProps={{ startIcon: <LocalHospital /> }}
            >
              {(closeModal) => (
                <MedDiagnosis
                  diagnosis={clinicalCase?.exam as any}
                  updateConsultSequence={updateConsultSequence}
                  getExamResult={(exam: MedExamTuto) =>
                    setMedExam([...medExam, exam])
                  }
                  getPrescribedExams={setAllPrescription}
                />
              )}
            </ButtonWithModal>
          </Grid>
          <Grid item>
            <ButtonWithModal
              title='Carryout a Physical Diagnosis'
              buttonText='Physical Diagnosis'
              buttonProps={{ startIcon: <Vaccines /> }}
            >
              {(closeModal) => (
                <PhyDiagnosis
                  diagnosis={clinicalCase?.physical_diagnosis as any[]}
                  getDiagnosis={addPhyDiagnosis}
                />
              )}
            </ButtonWithModal>
          </Grid>
        </Grid>
      </div>

      <div className='conversation'>
        <Typography variant='h5' gutterBottom>
          Patient Interaction
        </Typography>
        <Divider sx={{ backgroundColor: 'white', width: 1 }} />

        <DiaglogBox
          clinicalCaseId={clinicalCase?.id as string}
          getQuestions={setQuestions}
          updateConsultSequence={updateConsultSequence}
          getSymptomStatus={addSymptomStatus}
        />
      </div>

      <Dialog open={showHypothesis} onClose={handleClose} maxWidth='xs'>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Make a hypothesis
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Hypothesis
              closeModal={() => setShowHypothesis(false)}
              identifiedSymptoms={symptomStatus}
              getHypothesis={addHypothesis}
              threshold={hypothesisThreshold}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowHypothesis(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showTip} maxWidth='xs'>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Get a Tip{' '}
          <EmojiObjects color='primary' fontSize='large' sx={{ mb: -1 }} />
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center' }}>
            Do you want to get a tip for the current exercise ?<br /> It is only
            available once !!!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={getTip} variant='contained' size='small'>
            Yes
          </Button>
          <Button
            onClick={() => setShowTip(false)}
            variant='outlined'
            size='small'
            color='error'
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showStartConsult} maxWidth='xs'>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Initiate the consultation session
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center' }}>
            Do you want to begin the consultation session ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setShowStartConsult(false)}
            variant='outlined'
            size='small'
            color='error'
          >
            No
          </Button>
          <Button
            onClick={() => {
              setShowStartConsult(false);
              setStartClock(true);
            }}
            variant='contained'
            size='small'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        notif={{ message: hint, type: 'success' }}
        position={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
};
