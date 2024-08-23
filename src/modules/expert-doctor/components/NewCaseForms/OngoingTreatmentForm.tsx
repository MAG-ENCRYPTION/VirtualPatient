import styled from '@emotion/styled'
import { LocalHospital, Save } from '@mui/icons-material'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import {
  ADMINISTRATION_MODE,
  EVOLUTION,
  UNIT_TIME,
} from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createOngoingTreatment } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`
export const OngoingTreatmentForm = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const { nextStep, caseid } = useContext(CaseIdContexte)

  const defaultValue = {
    name: '',
    administration_mode: '',
    duration: '',
    observation: '',
    efficiency: '',
    unit: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    if (formValues.duration === '1') {
      formValues.unit = formValues.unit.slice(0, formValues.unit.indexOf('(s)'))
    } else {
      formValues.unit = formValues.unit.slice(0, formValues.unit.indexOf('(s)'))
      formValues.unit = formValues.unit + 's'
    }

    const dataToPost = {
      name: formValues.name,
      administration_mode: formValues.administration_mode,
      duration: `${formValues.duration} ${formValues.unit}`,
      observation: formValues.observation,
      efficiency: formValues.efficiency,
      clinical_case: caseid,
    }

    await createOngoingTreatment(dataToPost)
      .then((treatment) => {
        console.log('then -> ', treatment)
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
      <LocalHospital sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Ongoing Treatment
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Treatment'
          name='name'
          fullWidth
          margin='dense'
          value={formValues.name}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Administration mode'
          name='administration_mode'
          fullWidth
          select
          margin='dense'
          value={formValues.administration_mode}
          onChange={handleChange}
          size='small'
        >
          {ADMINISTRATION_MODE.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              required
              label='Duration'
              name='duration'
              fullWidth
              margin='dense'
              type='number'
              placeholder='since when did you start'
              value={formValues.duration}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={5}>
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

        <TextField
          required
          label='Observation'
          name='observation'
          fullWidth
          select
          margin='dense'
          value={formValues.observation}
          onChange={handleChange}
          size='small'
        >
          {EVOLUTION.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label='Efficiency'
          name='efficiency'
          fullWidth
          margin='dense'
          value={formValues.efficiency}
          onChange={handleChange}
          size='small'
        />

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
            onClick={() => nextStep(5)}
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
