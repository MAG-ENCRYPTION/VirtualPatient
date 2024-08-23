import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { MedAntecedent } from '../../../../entities/TotalClinicalCase'

export const AntecedentDetail = ({
  antecedent,
}: {
  antecedent: MedAntecedent[]
}) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          7.{' '}
          <span style={{ textDecoration: 'underline' }}>
            Medical Antecedent
          </span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant='body1' gutterBottom>
          <b>Family antecedents: </b> {antecedent[0].family_antecedents} <br />
        </Typography>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>Surgery</span>
        </Typography>
        <Grid container spacing={4}>
          {antecedent[0].surgery.map((surgery) => (
            <Grid item key={surgery.id}>
              <Typography variant='body1' gutterBottom>
                <b>Surgery: </b> {surgery.name} <br />
                <b>Date: </b> {surgery.date} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>Allergy</span>
        </Typography>
        <Grid container spacing={4}>
          {antecedent[0].allergy.map((allergy) => (
            <Grid item key={allergy.id}>
              <Typography variant='body1' gutterBottom>
                <b>Allergy Manifestion: </b> {allergy.manifestation} <br />
                <b>Trigger: </b> {allergy.trigger} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>Previous diseases</span>
        </Typography>
        <Grid container spacing={5}>
          {antecedent[0].disease.map((disease) => (
            <Grid item key={disease.id}>
              <Typography variant='body1' gutterBottom>
                <b>Disease: </b> {disease.name} <br />
                <b>Start: </b> {new Date(disease.start_time).toDateString()}{' '}
                <br />
                <b>End: </b> {new Date(disease.end_time).toDateString()} <br />
                <b>Observation: </b> {disease.observation} <br />
                <b>Treatments: </b> <br />
                {disease.treatement.map((treat) => (
                  <span style={{ marginLeft: 20 }} key={treat.id}>
                    <b>Name: </b> {treat.name} <br />
                    <b style={{ marginLeft: 30 }}>Posology: </b>{' '}
                    {treat.posology} <br />
                    <b style={{ marginLeft: 30 }}>Duration: </b>{' '}
                    {treat.duration} <br />
                    <Divider />
                  </span>
                ))}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
