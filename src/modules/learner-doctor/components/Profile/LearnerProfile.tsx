import styled from '@emotion/styled';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Snackbar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { LearnerPhysician } from '../../../../entities/Doctor'; // Assurez-vous que le chemin est correct
import { getLearnerProfile, updateLearnerProfile } from '../../network'; // Mettez à jour le chemin selon votre structure
import { BackdropLoader } from '../../../shared/Backdrop';
import { UserStateType } from "../../../../redux/userStore/reducer";
import { useSelector } from "react-redux";
import SaveIcon from '@mui/icons-material/Save';

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

export const LearnerProfile = () => {
  const connectedUser: UserStateType = useSelector(
    (state: any) => state.userReducer.user
  );

  const [learner, setLearner] = useState<LearnerPhysician | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const specialties = [
    'Generalist',
    'Neurologist',
    'Gynecologist',
    'Pediatrician',
    'Dentist',
    'Ophthalmologist',
  ];

  useEffect(() => {
    getLearnerProfile(connectedUser.id).then((resp) => {
      setLearner(resp);
      setLoading(false);
    });
  }, [connectedUser.id]);

  const handleInputChange = (name: string, value: string) => {
    setLearner((prevLearner) => ({ ...prevLearner!, [name]: value }));
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
    if (learner) {
      updateLearnerProfile(connectedUser.id, learner)
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
        Learner Profile
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          value={connectedUser.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="First Name"
          value={learner?.first_name}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <FormControl fullWidth margin="normal" disabled={!editMode} required>
          <InputLabel>Sex</InputLabel>
          <Select
            value={learner?.sex || ''}
            onChange={(e) => handleInputChange('sex', e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" disabled={!editMode} required>
          <InputLabel>Specialty</InputLabel>
          <Select
            value={learner?.specialty || ''}
            onChange={(e) => handleInputChange('specialty', e.target.value)}
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
          label="Phone Number"
          value={learner?.phone_number}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="Address"
          value={learner?.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="City"
          value={learner?.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="CNI"
          value={learner?.cni}
          onChange={(e) => handleInputChange('cni', e.target.value)}
          margin="normal"
          disabled={!editMode}
          required
        />
        <TextField
          fullWidth
          label="Year of Birth"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={learner?.year_of_birth}
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
        />
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          sx={{ mt: 2, mr: 2 }}
        >
          Cancel
        </Button>
        {editMode && (
          <IconButton
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
            disabled={!learner || !passwordMatch}
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
