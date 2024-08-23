import styled from '@emotion/styled'
import {
  Add,
  ArrowForward,
  CheckCircle,
  HighlightOff,
  RemoveCircle,
} from '@mui/icons-material'
import { Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { TotalClinicalCase } from '../../../entities/TotalClinicalCase'
import { TotalEvaluation } from '../../../entities/TotalEvaluation'
import { UserStateType } from '../../../redux/userStore/reducer'
import { ROUTES } from '../../../routes'
import { BackdropLoader } from '../../shared/Backdrop'
import { Notification, NotifType } from '../../shared/Notification'
import { RichEditor } from '../../shared/RichEditor'
import { Dashboard } from '../components/ExpertDahsboard'
import { createFeedback, getClinicalCase, verifySymptoms } from '../network'

const Container = styled.div`
  margin: 20px;

  h5 {
    font-family: Montserrat;
  }
`

export const EvaluationDetailReport = () => {
  const router = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const evaluation = useLocation().state as TotalEvaluation
  const [clinical_case, setClinical_case] = useState<TotalClinicalCase>()
  const [messNotif, setMessNotif] = useState<NotifType>()
  const [symptoms, setSymptoms] = useState<{ symp: string; status: number }[]>(
    [],
  )
  // const [hypoValues, setHypoValues] = useState<{ key: string; val: boolean }[]>(
  //   [],
  // )
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user

  useEffect(() => {
    console.log(evaluation)

    if (evaluation) {
      verifySymptoms(
        evaluation.clinical_case,
        evaluation.symptoms?.split(','),
      ).then((resp: any) => {
        let l = []
        for (let key of Object.keys(resp)) {
          l.push({ symp: key, status: resp[key] })
        }
        setSymptoms(l)
      })
    }
  }, [evaluation])

  useEffect(() => {
    if (evaluation) {
      getClinicalCase(evaluation.clinical_case).then((resp) => {
        setClinical_case(resp[0])
      })
    }
  }, [evaluation])

  const secToMin = (sec: number) => {
    if (sec < 60) {
      return `${sec}sec`
    }
    let min = Math.floor(sec / 60)
    return `${min}min ${sec - 60 * min}sec`
  }

  const saveFeedback = async () => {
    setLoading(true)
    console.log(feedback)
    const dataToPost = {
      comment: feedback,
      evaluation: evaluation.url,
      expert_physician: connectedUser.url,
    }
    await createFeedback(dataToPost).then((resp) => {
      console.log(resp)
      setLoading(false)

      setMessNotif({
        message:
          'Your feedback has been sent successfully. Thanks for your contriubtion',
        type: 'success',
      })
    })
  }

  const sympPresent = (symptom: string) => {
    if (clinical_case) {
      for (let symp of clinical_case.symptom) {
        if (symp.name === symptom) {
          return 0
        }
      }
      return 1
    }
    return 2
  }

  return (
    <Dashboard>
      <Container>
        <BackdropLoader loading={loading} />

        <div>
          <Typography variant='h5' gutterBottom>
            Detail Evaluation Report
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
            <Typography variant='body1' gutterBottom>
              Learner : {evaluation?.learner_physician.name}{' '}
              {evaluation?.learner_physician.first_name}
            </Typography>
            <Button
              variant='contained'
              size='small'
              endIcon={<ArrowForward />}
              onClick={() =>
                router(ROUTES.EXPERT.DETAIL_CASE, { state: clinical_case })
              }
            >
              View the clinical case
            </Button>
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
            Symptoms
          </Typography>
          <Divider />

          <ul>
            {symptoms.map((sym) => (
              <li key={sym.symp}>
                {sym.symp}{' '}
                {sym.status === 0 ? (
                  <CheckCircle
                    color='success'
                    sx={{ mb: -0.3, fontSize: 18 }}
                  />
                ) : sym.status === 1 ? (
                  <RemoveCircle
                    color='warning'
                    sx={{ mb: -0.3, fontSize: 18 }}
                  />
                ) : (
                  <HighlightOff color='error' sx={{ mb: -0.3, fontSize: 18 }} />
                )}{' '}
              </li>
            ))}
          </ul>
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
                <Stack direction='row' key={hyp.id} spacing={0.5}>
                  {hyp.symptoms.split(',').map((symp) => (
                    <Chip
                      key={symp}
                      label={symp}
                      variant='outlined'
                      size='small'
                      color={
                        sympPresent(symp) === 0
                          ? 'success'
                          : sympPresent(symp) === 1
                          ? 'error'
                          : undefined
                      }
                    />
                  ))}{' '}
                </Stack>
              ))}
            </Grid>
            <Grid item xs={3}>
              <Typography variant='button'>Hypothesis</Typography>
              {evaluation.hypothesis.map((hyp) => (
                <p>{hyp.diseases} </p>
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
                <p key={it.id}>{it.result !== '' ? it.result : '----'} </p>
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
          {evaluation.feedback ? (
            <div>
              {evaluation.feedback.map((feed) => (
                <Typography key={feed.id} variant='body2' gutterBottom>
                  {feed.comment}
                  <br /> by: <b> {feed.expert_physician}</b>
                </Typography>
              ))}
            </div>
          ) : (
            <Typography variant='body2' gutterBottom>
              No feedback is available for now
            </Typography>
          )}
          <Button
            variant='contained'
            onClick={() => setShowFeedback(true)}
            endIcon={<Add />}
            sx={{ mt: 2, mb: 2 }}
          >
            Add a feedback
          </Button>

          {showFeedback && (
            <>
              <RichEditor
                getContent={setFeedback}
                placeholder='Write down your feedback...'
              />
              <Button variant='contained' onClick={saveFeedback} sx={{ mt: 1 }}>
                Submit
              </Button>
            </>
          )}
        </div>
      </Container>
      <Notification notif={messNotif} />
    </Dashboard>
  )
}
