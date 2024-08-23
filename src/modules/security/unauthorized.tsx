import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo404 from '../../assets/images/401.svg'
import { ROUTES } from '../../routes'
import { PRIMARY } from '../../shared/colors'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;

  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-top: 0;
    margin: 0;
    height: 450px;
    width: 550px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .not-found p {
    font-size: 16px;
    text-align: center;
  }

  .not-found .line {
    background-color: ${PRIMARY};
    width: 100%;
    height: 10px;
    margin-bottom: 10px;
  }

  .not-found .line2 {
    background-color: #0044ffef;
    width: 100%;
    height: 5px;
    margin-bottom: 10px;
  }
`

export const Unauthorized = () => {
  const router = useNavigate()

  return (
    <Container>
      <div className='shadow not-found'>
        <div className='line2'></div>
        <h2>Unauthorised </h2>
        <p>
          You do not have the necessary rights to access the requested resource.
          Please contact your administrator
        </p>
        <img
          src={logo404}
          width={270}
          style={{ objectFit: 'cover' }}
          alt='not-found'
        />

        <Button variant='contained' onClick={() => router(ROUTES.LOGIN)}>
          SignIn
        </Button>
      </div>
    </Container>
  )
}
