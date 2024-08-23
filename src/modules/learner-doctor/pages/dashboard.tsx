import styled from '@emotion/styled'
import { ArrowForward } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes'
import { PRIMARY } from '../../../shared/colors'
import { ButtonWithModal } from '../../shared/ButtonModal'
import { DashboardStats } from '../components/DashboardStats'
import { Dashboard } from '../components/LearnerDahsboard'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

const BoxContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin: 10px;
  //padding-top: 10px;
  min-height: 100px;

  > h6 {
    text-align: center;
    background-color: ${PRIMARY};
    color: white;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 10px 0px;
  }

  > div {
    padding: 10px;
  }
`

export const LearnerDashboard = () => {
  const router = useNavigate()

  return (
    <Dashboard>
      <DashboardStats />

      <Container>
        <Typography variant='h6' color='primary' gutterBottom>
          Medical Learner Dashboard
        </Typography>

        <ButtonWithModal
          title='Consultation Mode'
          buttonText='Begin a consultation session'
          maxWidth='sm'
          buttonProps={{ endIcon: <ArrowForward />, size: 'large' }}
        >
          {(closeModal) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <BoxContainer>
                <Typography variant='h6' gutterBottom>
                  Formative Assessment
                </Typography>

                <div>
                  <Typography variant='body1' gutterBottom>
                    Principally used for learning purposes and progression in
                    various medical concepts. The intervention of a virtual
                    tutor during the consultation session is prioritized for a
                    better follow-up and improvement of capacities.
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='outlined'
                      endIcon={<ArrowForward />}
                      onClick={() =>
                        router(ROUTES.LEARNERS.SPECIALITIES, {
                          state: 'formative',
                        })
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </BoxContainer>
              <BoxContainer>
                <Typography variant='h6' gutterBottom>
                  Summative assessment
                </Typography>

                <div>
                  <Typography variant='body1' gutterBottom>
                    Mainly used for evaluation purposes, to test the abilities
                    of the learner after the learning process. A report is
                    submitted at the end of the consultation session and a mark
                    is given. No tutor intervention is possible during the
                    session.
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='outlined'
                      endIcon={<ArrowForward />}
                      onClick={() =>
                        router(ROUTES.LEARNERS.SPECIALITIES, {
                          state: 'summative',
                        })
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </BoxContainer>
            </div>
          )}
        </ButtonWithModal>
      </Container>
    </Dashboard>
  )
}
