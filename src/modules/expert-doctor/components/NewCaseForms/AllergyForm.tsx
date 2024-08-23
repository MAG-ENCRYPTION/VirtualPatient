import styled from '@emotion/styled'
import { DataSaverOn, Save } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createAllergy } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const AllergyForm = ({
  antecedentId,
  nextTab,
}: {
  antecedentId: string
  nextTab?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    manifestation: '',
    trigger: '',
    medical_antecedent: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.medical_antecedent = antecedentId

    await createAllergy(formValues)
      .then((allergy) => {
        console.log('then -> ', allergy)
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
      <DataSaverOn sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Allergies
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label='Allergy manifestation'
          name='manifestation'
          fullWidth
          margin='dense'
          value={formValues.manifestation}
          onChange={handleChange}
          size='small'
        />

        <TextField
          label='Allergy trigger'
          name='trigger'
          fullWidth
          margin='dense'
          value={formValues.trigger}
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
