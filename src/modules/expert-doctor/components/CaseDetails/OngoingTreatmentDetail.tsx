import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { TreatmentInProgress } from '../../../../entities/TreatmentInProgress'

export const OngoingTreatmentDetail = ({
  treatments,
}: {
  treatments: TreatmentInProgress[]
}) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          6.{' '}
          <span style={{ textDecoration: 'underline' }}>Ongoing Treatment</span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={4}>
          {treatments.map((treat) => (
            <Grid item key={treat.id}>
              <Typography variant='body1' gutterBottom>
                <b>Treatment: </b> {treat.name} <br />
                <b>Administration mode: </b> {treat.administration_mode} <br />
                <b>Duration: </b> {treat.duration} <br />
                <b>Observation: </b> {treat.observation} <br />
                <b>Efficiency: </b> {treat.efficiency} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
