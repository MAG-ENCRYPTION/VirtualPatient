import styled from '@emotion/styled'
import { LocalHospital, Save } from '@mui/icons-material'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { DEGREE, EVOLUTION, UNIT_TIME } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createSymptom } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const SymptomForm = ({
  symptom,
  step,
  updateStep,
}: {
  symptom: string
  step: number
  updateStep: (step: number) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const { caseid } = useContext(CaseIdContexte)

  const defaultValue = {
    name: symptom,
    localisation: '',
    frequency: '',
    duration: '',
    evolution: '',
    triggering_activity: '',
    degree: '',
    unit: '',
    unit_duration: '',
    clinical_case: '',
  }
  const [formValues, setFormValues] = useState(defaultValue)

  useEffect(() => {
    setFormValues({ ...defaultValue, name: symptom })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symptom])

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
      name: symptom,
      localisation: formValues.localisation,
      frequency: `${formValues.frequency} times per ${formValues.unit}`,
      evolution: formValues.evolution,
      duration: `${formValues.duration} ${formValues.unit_duration}`,
      triggering_activity: formValues.triggering_activity,
      degree: formValues.degree,
      clinical_case: caseid,
    }
    console.log(dataToPost)

    await createSymptom(dataToPost)
      .then((symptom) => {
        console.log('then -> ', symptom)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        updateStep(step + 1)
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
        Symptom
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Symptom'
          name='name'
          fullWidth
          margin='dense'
          value={formValues.name}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Localisation'
          name='localisation'
          fullWidth
          margin='dense'
          value={formValues.localisation}
          onChange={handleChange}
          size='small'
        />

        <Grid container spacing={2}>
          <Grid item xs={7}>
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

        <TextField
          label='Evolution'
          name='evolution'
          fullWidth
          select
          margin='dense'
          value={formValues.evolution}
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
          label='Triggering activity'
          name='triggering_activity'
          fullWidth
          margin='dense'
          value={formValues.triggering_activity}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Intensity'
          name='degree'
          fullWidth
          select
          margin='dense'
          value={formValues.degree}
          onChange={handleChange}
          size='small'
        >
          {DEGREE.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant='contained'
          startIcon={<Save />}
          sx={{ marginTop: 2 }}
          type='submit'
        >
          Save
        </Button>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
