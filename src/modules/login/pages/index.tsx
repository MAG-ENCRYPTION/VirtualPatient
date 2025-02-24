import styled from '@emotion/styled';
import {
  AccountCircle,
  ArrowForward,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sideLogin from '../../../assets/images/sidelogin.jpg';
import { createUser } from '../../../redux/userStore/actions';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { BackdropLoader } from '../../shared/Backdrop';
import { signIn } from '../network';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f8;

  > div {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    height: 500px;
    border-radius: 10px;

    .img-part {
      background-image: url(${sideLogin});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 400px;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      > h2 {
        font-size: 40px;
        text-align: center;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }

    .form-part {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      padding-top: 50px;

      > h2 {
        font-size: 30px;
        color: ${PRIMARY};
        text-align: center;
        margin-bottom: 40px;
      }

      > form {
        background-color: white;
        width: 400px;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const StyledButton = styled(Button)`
  &.vibrate {
    animation: vibrate 0.5s ease-in-out infinite;
  }

  @keyframes vibrate {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 0); }
    40% { transform: translate(2px, 0); }
    60% { transform: translate(-2px, 0); }
    80% { transform: translate(2px, 0); }
    100% { transform: translate(0); }
`;

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();

  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [vibrateButton, setVibrateButton] = useState(false); // État pour l'animation du bouton

  useEffect(() => {
    let vibrateTimeout: any;
    if (vibrateButton) {
      vibrateTimeout = setTimeout(() => {
        setVibrateButton(false); // Réinitialiser l'animation après 5 secondes
      }, 5000);
    }
    return () => clearTimeout(vibrateTimeout); // Nettoyer le timeout
  }, [vibrateButton]);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    setUsernameError(''); // Réinitialiser le message d'erreur
    setPasswordError(''); // Réinitialiser le message d'erreur

    try {
      const resp = await signIn(formValues.username, formValues.password);
      setLoading(false);
      console.log(resp);
      if (resp) {
        // Vérification des erreurs dans la réponse
        if (resp.error) {
          if (resp.error === 'User does not exist') {
            setUsernameError(resp.error); // Utilisateur non répertorié
            setVibrateButton(true); // Activer l'animation du bouton
          } else if (resp.error === 'Incorrect Password') {
            setPasswordError(resp.error); // Mot de passe incorrect
          }
          return; // Sortir pour ne pas continuer
        }

        const ADMIN_STATE = resp.Doctor.is_admin;
        const { Doctor, type } = resp;
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
            url: Doctor.url
          }),
        );

        switch (type) {
          case 'LEARNER':
            router(ROUTES.LEARNERS.DASHBOARD);
            break;
          case 'EXPERT':
            router(ROUTES.EXPERT.DASHBOARD);
            break;
        }
      }
    } catch (error) {
      setLoading(false);
      setUsernameError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Container>
        <div>
          <div className='img-part'>
            <h2>Welcome on Virtual Patient</h2>
          </div>
          <div className='form-part'>
            <h2>Log In Now</h2>
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
                error={!!usernameError} // Indiquer une erreur
              />
              <FormHelperText error>{usernameError}</FormHelperText>{' '}
              {/* Afficher le message d'erreur */}
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
                error={!!passwordError} // Indiquer une erreur
              />
              <FormHelperText error>{passwordError}</FormHelperText>{' '}
              {/* Afficher le message d'erreur */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <StyledButton
                  variant='text'
                  onClick={() => router(ROUTES.REGISTER)}
                  className={vibrateButton ? 'vibrate' : ''}
                >
                  Create an account
                </StyledButton>

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
  );
};
