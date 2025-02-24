import styled from '@emotion/styled'
import { LocalCarWash, Save } from '@mui/icons-material'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { UNIT_TIME } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createTrip } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const TravelsForm = ({
  lifeStyleId,
  nextTab,
}: {
  lifeStyleId: string
  nextTab?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    location: '',
    frequency: '',
    duration: '',
    unit: '',
    unit_duration: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.unit = formValues.unit.slice(0, formValues.unit.indexOf('(s)'))

    if (formValues.duration === '1') {
      formValues.unit_duration = formValues.unit_duration.slice(
        0,
        formValues.unit_duration.indexOf('(s)'),
      )
    } else {
      formValues.unit_duration = formValues.unit_duration.slice(
        0,
        formValues.unit_duration.indexOf('(s)'),
      )
      formValues.unit_duration = formValues.unit_duration + 's'
    }

    const dataToPost = {
      location: formValues.location,
      frequency: `${formValues.frequency} times per ${formValues.unit}`,
      duration: `${formValues.duration} ${formValues.unit_duration}`,
      life_style: lifeStyleId,
    }

    await createTrip(dataToPost)
      .then((trip) => {
        console.log('then -> ', trip)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        setFormValues(defaultValue)
      })
      .catch((response) => {
        console.log('catch', response)
        setResponse({ type: 'error', message: 'Error occured' })
        setLoading(false)
      })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <Container>
      <LocalCarWash sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Travels or trips
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Location'
          name='location'
          fullWidth
          margin='dense'
          value={formValues.location}
          onChange={handleChange}
          size='small'
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label='Frequency'
              name='frequency'
              fullWidth
              margin='dense'
              type='number'
              value={formValues.frequency}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label='Unit'
              name='unit'
              fullWidth
              select
              margin='dense'
              value={formValues.unit}
              onChange={handleChange}
              size='small'
            >
              {UNIT_TIME.map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label='Duration'
              name='duration'
              fullWidth
              margin='dense'
              type='number'
              value={formValues.duration}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label='Unit'
              name='unit_duration'
              fullWidth
              select
              margin='dense'
              value={formValues.unit_duration}
              onChange={handleChange}
              size='small'
            >
              {UNIT_TIME.map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='outlined'
            startIcon={<Save />}
            sx={{ marginTop: 2 }}
            type='submit'
          >
            Save
          </Button>

          <Button
            variant='contained'
            sx={{ marginTop: 2 }}
            onClick={() => nextTab?.()}
          >
            Next step
          </Button>
        </div>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
