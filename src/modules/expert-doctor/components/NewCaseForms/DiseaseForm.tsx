import styled from '@emotion/styled'
import { Coronavirus, Save } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useState } from 'react'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createDisease } from '../../network'
import { TreatmentForm } from './TreatmentForm'

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

export const DiseaseForm = ({
  antecedentId,
  nextTab,
}: {
  antecedentId: string
  nextTab?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const [firstTurn, setFirstTurn] = useState(true)
  const [savedDiseaseId, setSavedDiseaseId] = useState('')

  const defaultValue = {
    name: '',
    start_time: moment(new Date()),
    end_time: moment(new Date()),
    observation: '',
    medical_antecedent: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()

    const dataToPost = {
      name: formValues.name,
      start_time: formValues.start_time.format('YYYY-MM-DD'),
      end_time: formValues.end_time.format('YYYY-MM-DD'),
      observation: formValues.observation,
      medical_antecedent: antecedentId,
    }

    await createDisease(dataToPost)
      .then((disease) => {
        console.log('then -> ', disease)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        setSavedDiseaseId(disease.url)
        setFirstTurn(false)
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
    <Grid container>
      <Grid item xs={6}>
        <Container>
          <Coronavirus sx={{ fontSize: 40, color: '#777' }} />
          <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
            Previous Disease
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label='Disease name'
              name='name'
              fullWidth
              margin='dense'
              value={formValues.name}
              onChange={handleChange}
              size='small'
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label='Start date'
                    value={formValues.start_time}
                    maxDate={moment(new Date())}
                    inputFormat='YYYY-MM-DD'
                    onChange={(value) => {
                      if (value) {
                        setFormValues({
                          ...formValues,
                          start_time: value,
                        })
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='date'
                        fullWidth
                        margin='dense'
                        size='small'
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label='End date'
                    value={formValues.end_time}
                    maxDate={moment(new Date())}
                    inputFormat='YYYY-MM-DD'
                    onChange={(value) => {
                      if (value) {
                        setFormValues({
                          ...formValues,
                          end_time: value,
                        })
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='end_time'
                        fullWidth
                        margin='dense'
                        size='small'
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <TextField
              label='Observation'
              name='observation'
              fullWidth
              margin='dense'
              value={formValues.observation}
              onChange={handleChange}
              size='small'
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='outlined'
                startIcon={<Save />}
                sx={{ marginTop: 2 }}
                type='submit'
                disabled={firstTurn ? false : true}
              >
                Save
              </Button>

              <Button
                variant='contained'
                sx={{ marginTop: 2 }}
                onClick={() => nextTab?.()}
                disabled={firstTurn ? false : true}
              >
                Next step
              </Button>
            </div>

            <Notification notif={response} />
            <BackdropLoader loading={loading} />
          </form>
        </Container>
      </Grid>

      <Grid item xs={6}>
        <TreatmentForm
          diseaseId={savedDiseaseId}
          disableButton={firstTurn ? true : false}
          nextDisease={() => setFirstTurn(true)}
        />
      </Grid>
    </Grid>
  )
}
