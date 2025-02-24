import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { LifeStyle } from '../../../../entities/LifeStyle'

export const LifeStyleDetail = ({ lifeStyle }: { lifeStyle: LifeStyle[] }) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          5. <span style={{ textDecoration: 'underline' }}>Life Style</span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant='body1' gutterBottom>
          <b>Water quality: </b> {lifeStyle[0].water_quality} <br />
          <b>Pet: </b> {lifeStyle[0].pet_company} <br />
          <b>Mosquito net: </b> {lifeStyle[0].mosquito ? 'Yes' : 'No'}
        </Typography>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>Addiction</span>
        </Typography>
        <Grid container spacing={4}>
          {lifeStyle[0].addiction.map((addiction) => (
            <Grid item key={addiction.id}>
              <Typography variant='body1' gutterBottom>
                <b>Addicted to: </b> {addiction.name} <br />
                <b>Frequency: </b> {addiction.frequency} <br />
                <b>Duration: </b> {addiction.duration} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>
            Physical Activities
          </span>
        </Typography>
        <Grid container spacing={4}>
          {lifeStyle[0].physical_activity.map((activity) => (
            <Grid item key={activity.id}>
              <Typography variant='body1' gutterBottom>
                <b>Activity: </b> {activity.name} <br />
                <b>Frequency: </b> {activity.frequency} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
          <span style={{ textDecoration: 'underline' }}>Travel/Trip</span>
        </Typography>
        <Grid container spacing={4}>
          {lifeStyle[0].travel.map((travel) => (
            <Grid item key={travel.id}>
              <Typography variant='body1' gutterBottom>
                <b>Location: </b> {travel.location} <br />
                <b>Frequency: </b> {travel.frequency} <br />
                <b>Duration: </b> {travel.duration} <br />
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
