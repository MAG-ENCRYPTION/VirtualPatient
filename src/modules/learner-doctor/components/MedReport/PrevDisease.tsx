import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Disease } from '../../../../entities/Disease'

export const PreviousDisease = ({
  prevDisease,
  closeModal,
}: {
  prevDisease: Disease[]
  closeModal?: () => void
}) => {
  const [disease, setDisease] = useState<Disease>()

  return (
    <Grid container spacing={5}>
      <Grid item>
        <ol>
          {prevDisease.map((dis) => (
            <li
              key={dis.id}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setDisease(dis)}
            >
              {dis.name}
            </li>
          ))}
        </ol>
      </Grid>

      <Grid item>
        {disease && (
          <>
            <Typography variant='body1'>
              <b>Disease: </b> {disease.name} <br />
              <b>Start: </b> {new Date(disease.start_time).toDateString()}{' '}
              <br />
              <b>End: </b> {new Date(disease.end_time).toDateString()} <br />
              <b>Treatments: </b> <br />
            </Typography>

            <Grid container spacing={3}>
              {disease.treatement.map((treat) => (
                <Grid item style={{ marginLeft: 20 }} key={treat.id}>
                  <Typography variant='body1' gutterBottom>
                    <b>Name: </b> {treat.name} <br />
                    <b>Posology: </b> {treat.posology} <br />
                    <b>Duration: </b> {treat.duration} <br />
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}
