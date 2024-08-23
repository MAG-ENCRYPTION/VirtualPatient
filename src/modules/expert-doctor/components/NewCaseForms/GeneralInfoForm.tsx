import styled from '@emotion/styled'
import { LocalHospital, Save } from '@mui/icons-material'
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useContext, useState } from 'react'
import {
  DIFFICULTY,
  DISEASES,
  SPECIALITY,
  SYSTEM,
} from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { getStyles, MenuProps } from '../../../shared/MuiStyles/multipleSelect'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createClinicalCase } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const GeneralInfoForm = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const { caseid, setCaseId } = useContext(CaseIdContexte)
  const theme = useTheme()

  const defaultValue = {
    initial_problem: '',
    difficulty: '',
    final_diagnosis: '',
    system: [],
    specialty: '',
  }
  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    const dataToPost = {
      initial_problem: formValues.initial_problem,
      difficulty: formValues.difficulty,
      final_diagnosis: formValues.final_diagnosis,
      system: formValues.system.join(';'),
      specialty: formValues.specialty,
    }

    await createClinicalCase(dataToPost)
      .then((medCase) => {
        console.log('then', medCase)
        setResponse({ type: 'success', message: 'Saved with success' })
        setCaseId(medCase.url) //set case id/url in contexte
        setLoading(false)
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
        Clinical Case
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Disease'
          name='final_diagnosis'
          fullWidth
          select
          margin='dense'
          value={formValues.final_diagnosis}
          onChange={handleChange}
          size='small'
        >
          {DISEASES.map((dis) => (
            <MenuItem key={dis.value} value={dis.value}>
              {dis.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label="Patient's complain"
          name='initial_problem'
          fullWidth
          multiline
          rows={4}
          margin='dense'
          placeholder="the patient's problem with which he came to consult. It must be precise. ex. I have headache, stomach ache and i vomit frequently"
          value={formValues.initial_problem}
          onChange={handleChange}
          size='small'
        />

        <TextField
          required
          label='Difficulty'
          name='difficulty'
          fullWidth
          select
          margin='dense'
          value={formValues.difficulty}
          onChange={handleChange}
          size='small'
        >
          {DIFFICULTY.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth margin='dense' required>
          <InputLabel>Body System</InputLabel>
          <Select
            name='system'
            multiple
            value={formValues.system}
            onChange={(event) => {
              const { value } = event.target
              setFormValues({ ...formValues, system: value as never[] })
            }}
            size='small'
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {SYSTEM.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, formValues.system, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          label='Speciality'
          name='specialty'
          fullWidth
          select
          margin='dense'
          value={formValues.specialty}
          onChange={handleChange}
          size='small'
        >
          {SPECIALITY.map((option) => (
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
          disabled={caseid ? true : false}
        >
          Save
        </Button>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
