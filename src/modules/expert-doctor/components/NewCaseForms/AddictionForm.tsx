import styled from '@emotion/styled'
import { Save, SmokingRooms } from '@mui/icons-material'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { ADDICTIONS, UNIT_TIME } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createAddication } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const AddictionForm = ({
  lifeStyleId,
  nextTab,
}: {
  lifeStyleId: string
  nextTab?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    name: '',
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
      name: formValues.name,
      frequency: `${formValues.frequency} times per ${formValues.unit}`,
      duration: `${formValues.duration} ${formValues.unit_duration}`,
      life_style: lifeStyleId,
    }

    await createAddication(dataToPost)
      .then((addiction) => {
        console.log('then -> ', addiction)
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
      <SmokingRooms sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Addiction
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Addiction'
          name='name'
          fullWidth
          select
          margin='dense'
          value={formValues.name}
          onChange={handleChange}
          size='small'
        >
          {ADDICTIONS.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

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
          <Grid item xs={7}>
            <TextField
              required
              label='Duration'
              name='duration'
              fullWidth
              margin='dense'
              type='number'
              placeholder='since when did it start'
              value={formValues.duration}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={5}>
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
