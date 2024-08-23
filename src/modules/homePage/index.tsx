import styled from '@emotion/styled'
import { ArrowForward } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import svg from '../../assets/images/Cardiologist-bro.svg'
import { ROUTES } from '../../routes'
import { Background } from './components/Background'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 50px;

  > div {
    > h3 {
      margin-bottom: 20px;
      color: white;
      font-family: 'Montserrat';
    }
  }

  > img {
    display: none;
  }

  @media (min-width: 1200px) {
    > div > h3 {
      width: 80%;
    }

    > img {
      display: block;
      margin-right: 50px;
    }
  }
`

// function Im() {
//   return (
//     <object type='image/svg+xml' data={SvgAnimated}>
//       svg-animation
//     </object>
//   )
// }

export const HomePage = () => {
  const router = useNavigate()

  return (
    <Background>
      <Container>
        <div>
          <Typography variant='h3' component='h3'>
            An Intelligent Tutoring System based Virtual Patient for Medical
            Diagnosis and Clinical Reasoning.
          </Typography>
          <Button
            variant='contained'
            endIcon={<ArrowForward />}
            onClick={() => router(ROUTES.LOGIN)}
          >
            Getting Started
          </Button>
        </div>

        <img
          alt='virtual-patient-home-svg'
          src={svg}
          height={500}
          width={500}
          style={{ objectFit: 'contain' }}
        />
      </Container>
    </Background>
  )
}
