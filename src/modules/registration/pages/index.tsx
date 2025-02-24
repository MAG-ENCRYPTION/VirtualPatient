import styled from '@emotion/styled';
import { ArrowForward, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sideLogin from '../../../assets/images/sidelogin.jpg';
import { createUser } from '../../../redux/userStore/actions';
import { ROUTES } from '../../../routes';
import { PRIMARY } from '../../../shared/colors';
import { SEX } from '../../../shared/constants';
import { BackdropLoader } from '../../shared/Backdrop';
import { createLearner } from '../network';

// Sample usernames list to demonstrate the functionality
const existingUsernames = ['user1', 'doctor2', 'learner3'];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    height: 850px;
    margin: 20px;

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
      padding: 0px 20px 30px 20px;

      > h2 {
        font-size: 30px;
        color: ${PRIMARY};
        text-align: center;
      }

      > form {
          background-color: white;
          width: 400px;
          border-radius: 5px;
          height: auto;
          min-height: 300px;
          margin: 5px;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 0px;
    > form {
      width: 400px;
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
  }
`;

export const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();
  const defaultValue = {
    first_name: '',
    name: '',
    email: '',
    specialty: '',
    phone_number: '',
    username: '',
    password: '',
    confirmPassword: '',
    sex: '',
    year_of_birth: moment(new Date()),
    experience: 'Beginner',
  };
  const [formValues, setFormValues] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const dataToPost = {
      first_name: formValues.first_name,
      name: formValues.first_name,
      email: formValues.email,
      specialty: formValues.specialty,
      phone_number: formValues.phone_number,
      username: formValues.username,
      password: formValues.password,
      sex: formValues.sex,
      year_of_birth: formValues.year_of_birth.format('YYYY-MM-DD'),
      experience: formValues.experience,
    };
    await createLearner(dataToPost).then((resp) => {
      if (resp.status) {
        const { User } = resp;
        dispatch(
          createUser({
            isConnected: true,
            id: User.id,
            name: User.name,
            first_name: User.first_name,
            phone_number: User.phone_number,
            email: User.email,
            sex: User.sex,
            username: User.username,
            userType: 'LEARNER',
            url: User.url,
          })
        );
        router(ROUTES.LEARNERS.DASHBOARD);
      }
      setLoading(false);
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === 'password' || name === 'confirmPassword') {
      if (
        name === 'confirmPassword' &&
        formValues.password &&
        formValues.password !== value
      ) {
        setPasswordError('Passwords do not match');
      } else if (
        name === 'password' &&
        formValues.confirmPassword &&
        formValues.confirmPassword !== value
      ) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }

    if (name === 'username') {
      if (existingUsernames.includes(value)) {
        setUsernameError('Username is already taken');
      } else {
        setUsernameError('');
      }
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const SPECIALITIES = [
    'Generalist',
    'Ophthalmologist',
    'Pediatrics',
    'Gynecology',
  ];

  return (
    <Container>
      <div>
        <div className='img-part'>
          <h2>Welcome on Virtual Patient</h2>
        </div>
        <div className='form-part'>
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label='First name'
              name='first_name'
              fullWidth
              margin='dense'
              value={formValues.first_name}
              onChange={handleChange}
            />
            <TextField
              required
              label='Last name'
              name='name'
              fullWidth
              margin='dense'
              value={formValues.name}
              onChange={handleChange}
            />
            <TextField
              required
              label='Email address'
              name='email'
              fullWidth
              margin='dense'
              type='email'
              value={formValues.email}
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label='Sex'
                  name='sex'
                  fullWidth
                  select
                  margin='dense'
                  value={formValues.sex}
                  onChange={handleChange}
                  size='small'
                >
                  {SEX.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label='Date of birth'
                    value={formValues.year_of_birth}
                    maxDate={moment(new Date())}
                    inputFormat='YYYY-MM-DD'
                    onChange={(value) => {
                      if (value) {
                        setFormValues({
                          ...formValues,
                          year_of_birth: value,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='date'
                        fullWidth
                        margin='dense'
                        size='small'
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Autocomplete
              freeSolo
              disableClearable
              options={SPECIALITIES}
              onChange={(event, value) =>
                setFormValues({ ...formValues, specialty: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label='Speciality'
                  name='specialty'
                  fullWidth
                  margin='dense'
                  value={formValues.specialty}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <TextField
              required
              label='Contact'
              name='phone_number'
              fullWidth
              margin='dense'
              value={formValues.phone_number}
              onChange={handleChange}
            />
            <TextField
              required
              label='Username'
              name='username'
              fullWidth
              margin='dense'
              value={formValues.username}
              onChange={handleChange}
              error={Boolean(usernameError)}
              helperText={usernameError}
            />
            <TextField
              required
              label='Password'
              name='password'
              fullWidth
              margin='dense'
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
            <TextField
              required
              label='Confirm Password'
              name='confirmPassword'
              fullWidth
              margin='dense'
              type={showPassword ? 'text' : 'password'}
              value={formValues.confirmPassword}
              onChange={handleChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
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
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={6}>
                <Typography>
                  Already have an account?
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <StyledButton
                  variant='text'
                  onClick={() => router(ROUTES.LOGIN)}
                >
                  Login
                </StyledButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant='outlined'
                  color='error'
                  onClick={() => setFormValues(defaultValue)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={
                    loading || Boolean(passwordError) || Boolean(usernameError)
                  }
                  startIcon={<ArrowForward />}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <BackdropLoader loading={loading} />
    </Container>
  );
};
