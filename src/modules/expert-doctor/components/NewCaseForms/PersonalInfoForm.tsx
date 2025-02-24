import styled from '@emotion/styled'
import { Person, Save } from '@mui/icons-material'
import { Button, MenuItem, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { BLOOD_GROUP, CIVIL_STATUS, SEX } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createPersonnalInfo } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const PersonalInfoForm = () => {
  const { caseid, nextStep } = useContext(CaseIdContexte)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  const defaultValue = {
    sex: '',
    age: 0,
    civil_status: '',
    profession: '',
    nb_child: 0,
    blood_group: '',
    clinical_case: '',
  }
  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.clinical_case = caseid
    formValues.nb_child = Number(formValues.nb_child)
    formValues.age = Number(formValues.age)

    await createPersonnalInfo(formValues)
      .then((response) => {
        console.log('then -> ', response)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        setTimeout(() => nextStep(1), 2000)
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
      <Person sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Patient Personal Information
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Sex'
          name='sex'
          fullWidth
          select
          margin='dense'
          value={formValues.sex}
          onChange={handleChange}
          size='small'
        >
          {SEX.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label='Age'
          name='age'
          fullWidth
          type='number'
          margin='dense'
          value={formValues.age}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Civil Status'
          name='civil_status'
          fullWidth
          select
          margin='dense'
          value={formValues.civil_status}
          onChange={handleChange}
          size='small'
        >
          {CIVIL_STATUS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label='Profession'
          name='profession'
          fullWidth
          margin='dense'
          value={formValues.profession}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label="Nombre d'enfant"
          name='nb_child'
          fullWidth
          type='number'
          margin='dense'
          value={formValues.nb_child}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Blood group'
          name='blood_group'
          fullWidth
          select
          margin='dense'
          value={formValues.blood_group}
          onChange={handleChange}
          size='small'
        >
          {BLOOD_GROUP.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant='contained'
          startIcon={<Save />}
          sx={{ marginTop: 2 }}
          type='submit'
          disabled={caseid ? false : true}
        >
          Save
        </Button>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
