import { Divider, Grid, Typography } from '@mui/material'
import { GeneralInfoForm } from '../NewCaseForms/GeneralInfoForm'
import { PersonalInfoForm } from '../NewCaseForms/PersonalInfoForm'

export const GeneralPage = () => {
  return (
    <div>
      <Typography variant='h3' sx={{ fontFamily: 'Montserrat', marginTop: 5 }}>
        Clinical case editor
      </Typography>
      <Typography
        color='text.secondary'
        variant='body1'
        maxWidth={1000}
        gutterBottom
      >
        A clinical case is a detailed report of the medical record and the
        anatomical characteristics, symptoms, physical signs, explorations,
        diagnosis, treatments, follow-up and evolution of a patient.
      </Typography>
      <Typography
        variant='h6'
        sx={{ fontFamily: 'Montserrat', marginTop: 3, marginBottom: 2 }}
      >
        Begin the process...
      </Typography>
      <Grid container>
        <Grid item xs>
          <GeneralInfoForm />
        </Grid>
        <Divider orientation='vertical' flexItem>
          <b>
            Clinical case's <br /> Patient Information
          </b>
        </Divider>
        <Grid item xs>
          <PersonalInfoForm />
        </Grid>
      </Grid>
    </div>
  )
}
