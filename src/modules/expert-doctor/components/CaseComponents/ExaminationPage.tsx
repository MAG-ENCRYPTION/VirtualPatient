import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import svg from '../../../../assets/images/exam.svg'
import { ExaminationForm } from '../NewCaseForms/ExaminationForm'

const Container = styled.div`
  .block {
    display: none;
  }

  @media (min-width: 768px) {
    .block {
      display: flex;
      justify-content: flex-end;
    }
  }
`

export const ExaminationPage = () => {
  return (
    <Container>
      <Typography
        color='text.secondary'
        variant='body1'
        gutterBottom
      ></Typography>
      <Grid container>
        <Grid item xs className='block'>
          <img
            alt='virtual-patient-home-svg'
            src={svg}
            height={400}
            width={400}
            style={{ objectFit: 'contain' }}
          />
        </Grid>

        <Grid item xs>
          <ExaminationForm />
        </Grid>
      </Grid>
    </Container>
  )
}
