import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import svg from '../../../../assets/images/drug.svg'
import { OngoingTreatmentForm } from '../NewCaseForms/OngoingTreatmentForm'

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

export const OngoingTreatmentPage = () => {
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
          <OngoingTreatmentForm />
        </Grid>
      </Grid>
    </Container>
  )
}
