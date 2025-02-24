import styled from '@emotion/styled'
import { ArrowRight, Save, Vaccines } from '@mui/icons-material'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { UNIT_TIME } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createTreatment } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  > form {
    width: 400px;
  }
`

export const TreatmentForm = ({
  diseaseId,
  disableButton,
  nextDisease,
}: {
  diseaseId: string
  disableButton: boolean
  nextDisease: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    name: '',
    posology: '',
    duration: '',
    unit: '',
    unit_posology: '',
    disease: '',
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
      duration: `${formValues.duration} ${formValues.unit}`,
      posology: `${formValues.posology} ${formValues.unit_posology}`,
      disease: diseaseId,
    }

    await createTreatment(dataToPost)
      .then((treatment) => {
        console.log('then -> ', treatment)
        setResponse({
          type: 'success',
          message: 'Treatment saved with success',
        })
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
      <Vaccines sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Disease treatment
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Name (medecine etc.) '
          name='name'
          fullWidth
          margin='dense'
          value={formValues.name}
          onChange={handleChange}
          size='small'
        />

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
              label='Posology (dosage) '
              name='posology'
              fullWidth
              margin='dense'
              type='number'
              value={formValues.posology}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label='Unit'
              name='unit_posology'
              fullWidth
              select
              margin='dense'
              value={formValues.unit_posology}
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
            disabled={disableButton}
          >
            Save
          </Button>

          <Button
            variant='outlined'
            color='secondary'
            sx={{ marginTop: 2 }}
            endIcon={<ArrowRight />}
            onClick={nextDisease}
            disabled={disableButton}
          >
            Next disease
          </Button>
        </div>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
