import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { Symptom } from '../../../../entities/Symptom'

export const SymptomDetail = ({ symptoms }: { symptoms: Symptom[] }) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          4. <span style={{ textDecoration: 'underline' }}>Symptoms</span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={4}>
          {symptoms.map((symp) => (
            <Grid item key={symp.id}>
              <Typography variant='body1' gutterBottom>
                <b>Symptom: </b> {symp.name} <br />
                <b>Localisation: </b> {symp.localisation} <br />
                <b>Frequency: </b> {symp.frequency} <br />
                <b>Duration: </b> {symp.duration} <br />
                <b>Evolution: </b> {symp.evolution} <br />
                <b>Degree: </b> {symp.degree} <br />
                <b>Trigerring activity: </b> {symp.triggering_activity} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
