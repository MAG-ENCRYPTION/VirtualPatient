import styled from '@emotion/styled';
import { CheckCircle, HighlightOff } from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TotalEvaluation } from '../../../../entities/TotalEvaluation';
import Feedback from '../../../Feedback/Feedback';
import { getExperts } from '../../../expert-doctor/network';
import { BackdropLoader } from '../../../shared/Backdrop';
import { getDetailEvaluation } from '../../network';
import { Dashboard } from '../LearnerDahsboard';

const Container = styled.div`
  margin: 20px;

  h5 {
    font-family: Montserrat;
  }
`;

interface ExpertDictionary {
  [key: string]: string;
}

export const EvaluationReport = () => {
  const [loading, setLoading] = useState(false);
  let evaluationId = useParams().evaluation as string;
  const [evaluation, setEvaluation] = useState<TotalEvaluation>();
  const [expertDictionary, setExpertDictionary] = useState<ExpertDictionary>(
    {},
  );

  useEffect(() => {
    getDetailEvaluation(evaluationId).then((resp) => {
      setLoading(false);
      setEvaluation(resp.evaluation);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(evaluation);
  }, [evaluation]);

  const secToMin = (sec: number) => {
    if (sec < 60) {
      return `${sec}sec`;
    }
    let min = Math.floor(sec / 60);
    return `${min}min ${sec - 60 * min}sec`;
  };

  useEffect(() => {
    getExperts()
      .then((experts) => {
        const newDictionary: ExpertDictionary = {};
        for (const expert of experts) {
          newDictionary[
            expert.id
          ] = `${expert.first_name} ${expert.first_name} - ${expert.specialty}`;
        }
        setExpertDictionary(newDictionary);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des experts :', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const extractIdFromUrl = (url: string) => {
    const regex =
      /\/([a-f0-9]{8}-[a-f0-9]{4}-[4][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12})\/?$/i;
    const match = url.match(regex);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  };

  const getExpertByIdInDictionary = (id: string) => {
    return expertDictionary[id];
  };

  return (
    <Dashboard>
      <Container>
        <BackdropLoader loading={loading} />

        {evaluation && (
          <>
            <div>
              <Typography variant='h5' gutterBottom>
                Diagnosis Report
              </Typography>
              <Divider />

              <div>
                <Typography variant='body1' gutterBottom>
                  Consultation date :{' '}
                  {new Date(evaluation?.created_at).toDateString()}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Evaluation type : {evaluation?.type}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Mark : {evaluation?.mark * 20} / 20
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Duration : {secToMin(evaluation?.duration)}
                </Typography>
              </div>
            </div>

            <div>
              <Typography variant='h6' gutterBottom>
                Questions
              </Typography>
              <Divider />

              <ol>
                {evaluation?.questions.map((ques) => (
                  <li key={ques.id}>
                    <Typography variant='body1' gutterBottom>
                      <b>Q: </b> {ques.question} ; <br />
                      <b>R: </b> {ques.answer}{' '}
                      {ques.status ? (
                        <CheckCircle
                          color='success'
                          sx={{ mb: -0.3, fontSize: 18 }}
                        />
                      ) : (
                        <HighlightOff
                          color='error'
                          sx={{ mb: -0.3, fontSize: 18 }}
                        />
                      )}
                    </Typography>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Typography variant='h6' gutterBottom>
                Hypothesis
              </Typography>
              <Divider />
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={3}>
                  <Typography variant='button'>Symptoms</Typography>
                  {evaluation.hypothesis.map((hyp) => (
                    <p key={hyp.id}>{hyp.symptoms} </p>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='button'>Hypothesis</Typography>
                  {evaluation.hypothesis.map((hyp) => (
                    <p key={hyp.id}>
                      {hyp.diseases.split(',').map((it) => (
                        <span>{it}, </span>
                      ))}
                    </p>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='button'>Result</Typography>
                  {evaluation.hypothesis.map((it) => (
                    <p key={it.id}>{it.reason} </p>
                  ))}
                </Grid>
              </Grid>
            </div>

            <div>
              <Typography variant='h6' gutterBottom>
                Medical Examinations
              </Typography>
              <Divider />

              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={3}>
                  <Typography variant='button'>Exam</Typography>
                  {evaluation.diagnosis.map((it) => (
                    <p key={it.id}>{it.name} </p>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='button'>Type</Typography>
                  {evaluation.diagnosis.map((it) => (
                    <p key={it.id}>{it.type} </p>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='button'>Result</Typography>
                  {evaluation.diagnosis.map((it) => (
                    <p key={it.id}>{it.result} </p>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='button'>Verdict</Typography>
                  {evaluation.diagnosis.map((it) => (
                    <p key={it.id}>{it.verdict} </p>
                  ))}
                </Grid>
              </Grid>
            </div>
            <div>
              <Typography variant='h6' gutterBottom>
                Feedback
              </Typography>
              <Divider />
              <br />
              {evaluation.feedbacks ? (
                <div>
                  {evaluation.feedbacks.map((feed) => (
                    <Feedback
                      key={feed.id}
                      author={getExpertByIdInDictionary(
                        extractIdFromUrl(feed?.expert_physician?.toString()) ||
                          '',
                      )}
                      content={feed.comment}
                    />
                  ))}
                </div>
              ) : (
                <Typography variant='body2' gutterBottom>
                  No feedback is available for now
                </Typography>
              )}
            </div>
          </>
        )}
      </Container>
    </Dashboard>
  );
};
