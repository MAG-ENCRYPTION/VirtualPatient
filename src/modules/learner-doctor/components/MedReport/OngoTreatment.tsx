import { Grid, Typography } from '@mui/material'
import { TreatmentInProgress } from '../../../../entities/TreatmentInProgress'

export const OngoTreatment = ({
  treatments,
  closeModal,
}: {
  treatments: TreatmentInProgress[]
  closeModal?: () => void
}) => {
  if (treatments.length === 0) {
    return (
      <Typography variant='body1' gutterBottom sx={{ textAlign: 'center' }}>
        No Ongoing treatment for this clinical case!
      </Typography>
    )
  }

  return (
    <div>
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
    </div>
  )
}
