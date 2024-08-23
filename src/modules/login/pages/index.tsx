import styled from '@emotion/styled'
import {
  AccountCircle,
  ArrowForward,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sideLogin from '../../../assets/images/sidelogin.jpg'
import { createUser } from '../../../redux/userStore/actions'
import { ROUTES } from '../../../routes'
import { PRIMARY } from '../../../shared/colors'
import { BackdropLoader } from '../../shared/Backdrop'
import { signIn } from '../network'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    height: 500px;

    .img-part {
      background-image: url(${sideLogin});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 400px;
      padding: 20px;

      > h2 {
        font-size: 40px;
        text-align: center;
        color: white;
      }
    }

    .form-part {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      padding-top: 50px;

      > h2 {
        font-size: 30px;
        color: ${PRIMARY};
        text-align: center;
        margin-bottom: 80px;
      }

      > form {
        background-color: white;
        width: 400px;
        border-radius: 5px;
        height: 250px;
        margin: 5px;
      }
    }
  }

  // @media (min-width: 768px) {
  //   padding: 0px;
  //   .form-part > form {
  //     width: 400px;
  //   }
  // }
`

export const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useNavigate()

  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    await signIn(formValues.username, formValues.password).then((resp) => {
      setLoading(false)
      if (resp) {
        const { Doctor, type } = resp
        dispatch(
          createUser({
            isConnected: true,
            id: Doctor.id,
            name: Doctor.name,
            first_name: Doctor.first_name,
            phone_number: Doctor.phone_number,
            email: Doctor.email,
            sex: Doctor.sex,
            username: Doctor.username,
            userType: type,
            url: Doctor.url,
          }),
        )
        if (type === 'LEARNER') {
          router(ROUTES.LEARNERS.DASHBOARD)
        } else if (type === 'EXPERT') {
          router(ROUTES.EXPERT.DASHBOARD)
        } else {
          router(ROUTES.ADMIN.DASHBOARD)
        }
      }
    })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <Container>
        <div>
          <div className='img-part'>
            <h2>Welcome on Virtual Patient</h2>
          </div>
          <div className='form-part'>
            <h2>SignIn into your account</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                label='Username'
                name='username'
                fullWidth
                margin='normal'
                value={formValues.username}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                label='Password'
                name='password'
                fullWidth
                margin='normal'
                type={showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <Button variant='text' onClick={() => router(ROUTES.REGISTER)}>
                  Create an account
                </Button>

                <Button
                  variant='contained'
                  endIcon={<ArrowForward />}
                  type='submit'
                >
                  Signin
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <BackdropLoader loading={loading} />
    </>
  )
}
