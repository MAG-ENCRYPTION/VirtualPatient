import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import svg from '../../../../assets/images/nurse.svg'
import { MedicalParametersForm } from '../NewCaseForms/MedicalParametersForm'

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

export const ParametersPage = () => {
  return (
    <Container>
      <Typography color='text.secondary' variant='body1' gutterBottom>
        There are 6 different medical parameters:
        <ul>
          <li>Height</li>
          <li>Weight</li>
          <li>Temperature</li>
          <li>Blood Pressure</li>
          <li>Heart rate</li>
          <li>Breathing frequency</li>
        </ul>
      </Typography>
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
          <MedicalParametersForm />
        </Grid>
      </Grid>
    </Container>
  )
}
