import styled from '@emotion/styled'
import { LocalHospital, Save } from '@mui/icons-material'
import { Button, MenuItem, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { TypeParameter } from '../../../../entities/MedicalParameter'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createMedicalParameter, getTypeParameters } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const MedicalParametersForm = () => {
  const defaultValue = {
    value: '',
    comment: '',
    type_parameter: '',
    clinical_case: '',
  }

  const { caseid, nextStep } = useContext(CaseIdContexte)
  const [formValues, setFormValues] = useState(defaultValue)
  const [typeParams, setTypeParams] = useState<TypeParameter[]>([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()

  useEffect(() => {
    getTypeParameters().then((resp) => {
      setTypeParams(resp)
    })
  }, [])

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.clinical_case = caseid

    await createMedicalParameter(formValues)
      .then((response) => {
        console.log('then -> ', response)
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
        Medical Parameters
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Parameter type'
          name='type_parameter'
          fullWidth
          select
          margin='dense'
          value={formValues.type_parameter}
          onChange={handleChange}
          size='small'
        >
          {typeParams.map((value) => (
            <MenuItem key={value.id} value={value.url}>
              {value.name} - {value.unit}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label='Value'
          name='value'
          fullWidth
          margin='dense'
          type='number'
          value={formValues.value}
          onChange={handleChange}
          size='small'
        />

        <TextField
          label='Comment'
          name='comment'
          fullWidth
          multiline
          rows={4}
          margin='dense'
          value={formValues.comment}
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
            onClick={() => nextStep(2)}
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
