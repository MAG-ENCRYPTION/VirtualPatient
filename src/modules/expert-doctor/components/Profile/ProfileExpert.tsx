import styled from '@emotion/styled';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Snackbar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Doctor } from '../../../../entities/Doctor';
import { getDoctorProfile, updateDoctorProfile } from '../../network';
import { BackdropLoader } from '../../../shared/Backdrop';
import { UserStateType } from "../../../../redux/userStore/reducer";
import { useSelector } from "react-redux";
import SaveIcon from '@mui/icons-material/Save'; // Icône de disquette

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #ffffff;
`;

const PasswordField = styled(TextField)`
  margin-top: 16px;
`;

const ConfirmPasswordField = styled(TextField)`
  margin-top: 16px;
`;

export const ProfileExpert = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user;

  useEffect(() => {
    getDoctorProfile(connectedUser.id).then((resp) => {
      setDoctor(resp);
      setLoading(false);
    });
  }, [connectedUser.id]);

  const specialties = [
    'Generalist',
    'Neurologist',
    'Gynecologist',
    'Pediatrician',
    'Dentist',
    'Ophthalmologist',
  ];

  const handleInputChange = (name: string, value: string) => {
    setDoctor((prevDoctor) => ({ ...prevDoctor!, [name]: value }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const handleSave = () => {
    if (doctor) {
      updateDoctorProfile(connectedUser.id, doctor)
        .then(() => {
          setEditMode(false);
          setSnackbarMessage('Profile updated successfully!');
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage('Failed to update profile.');
          setSnackbarOpen(true);
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setPassword('');
    setConfirmPassword('');
  };

  if (loading) {
    return <BackdropLoader loading={loading} />;
  }

  return (
    <Container>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Doctor Profile
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={connectedUser.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={doctor?.first_name}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Specialty</InputLabel>
          <Select
            value={doctor?.specialty || ''}
            onChange={(e) => handleInputChange('specialty', e.target.value)}
            name="specialty"
            disabled={!editMode}
            required
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={doctor?.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          margin="normal"
          disabled={!editMode}
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone_number"
          value={doctor?.phone_number}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={doctor?.year_of_birth || ''}
          onChange={(e) => handleInputChange('year_of_birth', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <PasswordField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <ConfirmPasswordField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
          error={!passwordMatch}
          helperText={!passwordMatch ? "Passwords do not match." : "Passwords match."}
          InputProps={{
            style: {
              borderColor: passwordMatch ? 'green' : 'red',
            },
          }}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          sx={{ mt: 2, mr: 2, borderColor: 'red', color: 'red', '&:hover': { backgroundColor: 'red', color: 'white' }}}
        >
          Cancel
        </Button>
        {editMode && (
          <IconButton
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2, backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' }}}
            disabled={!doctor || !Object.values(doctor).some(value => value !== '') || !passwordMatch}
          >
            <SaveIcon />
          </IconButton>
        )}
        {!editMode && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(true)}
            sx={{ mt: 2 }}
          >
            Modify
          </Button>
        )}
      </form>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
};
