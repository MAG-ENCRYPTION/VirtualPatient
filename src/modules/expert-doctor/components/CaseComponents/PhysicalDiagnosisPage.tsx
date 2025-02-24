import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import svg from '../../../../assets/images/diagnosis.svg'
import { PhysicalDiagnosisForm } from '../NewCaseForms/PhysicalDiagnosisForm'

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

export const PhysicalDiagnosisPage = () => {
  return (
    <Container>
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
          <PhysicalDiagnosisForm />
        </Grid>
      </Grid>
    </Container>
  )
}
