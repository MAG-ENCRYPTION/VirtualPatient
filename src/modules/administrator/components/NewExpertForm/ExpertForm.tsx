import styled from '@emotion/styled'
import { Save, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useState } from 'react'
import { ExpertPhysician } from '../../../../entities/Doctor'
import { GRADE, SEX, SPECIALITY } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createExpertPhysician } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  height: 127px;
  margin-right: 10px;
  margin-left: 10px;
`

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`

export const ExpertForm = ({
  saveExpert,
  closeModal,
}: {
  saveExpert: (ex: ExpertPhysician) => void
  closeModal?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const [showPassword, setShowPassword] = useState(false)

  const defaultValue = {
    name: '',
    first_name: '',
    phone_number: '',
    sex: '',
    specialty: '',
    year_of_birth: moment(new Date()),
    email: '',
    username: '',
    password: '',
    grade: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.year_of_birth = formValues.year_of_birth.format(
      'YYYY-MM-DD',
    ) as any

    await createExpertPhysician(formValues)
      .then((expert) => {
        console.log('then -> ', expert)
        saveExpert(expert.User)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        closeModal?.()
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
      <form onSubmit={handleSubmit}>
        <Container1>
          <Container>
            <Container1>
              <TextField
                required
                label='First Name'
                name='first_name'
                fullWidth
                margin='dense'
                value={formValues.first_name}
                onChange={handleChange}
                size='small'
              />
              <TextField
                required
                label='Last Name'
                name='name'
                fullWidth
                margin='dense'
                value={formValues.name}
                onChange={handleChange}
                size='small'
              />

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label='Date of Birth'
                  value={formValues.year_of_birth}
                  maxDate={moment(new Date())}
                  inputFormat='YYYY-MM-DD'
                  onChange={(value) => {
                    if (value) {
                      setFormValues({
                        ...formValues,
                        year_of_birth: value,
                      })
                      console.log(value.format('YYYY-MM-DD'))
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='year_of_birht'
                      fullWidth
                      margin='dense'
                      size='small'
                    />
                  )}
                />
              </LocalizationProvider>

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
                label='Phone number'
                name='phone_number'
                fullWidth
                margin='dense'
                value={formValues.phone_number}
                onChange={handleChange}
                size='small'
              />
            </Container1>

            <Line></Line>

            <Container1>
              <TextField
                required
                label='Email'
                name='email'
                fullWidth
                margin='dense'
                value={formValues.email}
                onChange={handleChange}
                size='small'
              />
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
                {SPECIALITY.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label='Grade'
                name='grade'
                fullWidth
                select
                margin='dense'
                value={formValues.grade}
                onChange={handleChange}
                size='small'
              >
                {GRADE.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                label='Username'
                name='username'
                fullWidth
                margin='dense'
                value={formValues.username}
                onChange={handleChange}
                size='small'
              />

              <TextField
                required
                label='Password'
                name='password'
                fullWidth
                margin='dense'
                type={showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={handleChange}
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant='outlined'
                fullWidth
                startIcon={<Save />}
                sx={{ marginTop: 1.1 }}
                type='submit'
              >
                Save
              </Button>
            </Container1>
          </Container>
        </Container1>
      </form>

      <Notification notif={response} />
      <BackdropLoader loading={loading} />
    </Container>
  )
}
