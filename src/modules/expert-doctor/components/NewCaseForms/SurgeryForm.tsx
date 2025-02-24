import styled from '@emotion/styled'
import { Masks, Save } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useState } from 'react'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createSurgery } from '../../network'

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

export const SurgeryForm = ({
  antecedentId,
  nextTab,
}: {
  antecedentId: string
  nextTab?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    name: '',
    date: moment(new Date()),
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()

    const dataToPost = {
      name: formValues.name,
      date: formValues.date.format('YYYY-MM-DD'),
      medical_antecedent: antecedentId,
    }

    await createSurgery(dataToPost)
      .then((surgery) => {
        console.log('then -> ', surgery)
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
      <Masks sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Previous surgery
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label='Surgery name'
          name='name'
          fullWidth
          margin='dense'
          value={formValues.name}
          onChange={handleChange}
          size='small'
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label='Date of surgery'
            value={formValues.date}
            maxDate={moment(new Date())}
            inputFormat='YYYY-MM-DD'
            onChange={(value) => {
              if (value) {
                setFormValues({
                  ...formValues,
                  date: value,
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

        <Notification notif={response} />
        <BackdropLoader loading={loading} />
      </form>
    </Container>
  )
}
