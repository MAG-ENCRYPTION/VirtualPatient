import styled from '@emotion/styled'
import { Nightlife, Save } from '@mui/icons-material'
import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useContext, useState } from 'react'
import { PET_COMPANY, WATER_QUALITY } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { getStyles, MenuProps } from '../../../shared/MuiStyles/multipleSelect'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createLifeStyle } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const LifeStyleForm = ({
  nextTab,
  getLifeStyleId,
}: {
  nextTab?: () => void
  getLifeStyleId: (id: string) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const { caseid } = useContext(CaseIdContexte)

  const defaultValue = {
    water_quality: '',
    mosquito: false,
    pet_company: [],
    clinical_case: '',
  }

  const [formValues, setFormValues] = useState(defaultValue)
  const theme = useTheme()

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()

    const dataToPost = {
      water_quality: formValues.water_quality,
      mosquito: formValues.mosquito,
      pet_company: formValues.pet_company.join(';'),
      clinical_case: caseid,
    }

    await createLifeStyle(dataToPost)
      .then((lifeStyle) => {
        console.log('then -> ', lifeStyle)
        setResponse({ type: 'success', message: 'Saved with success' })
        getLifeStyleId(lifeStyle.url)
        setLoading(false)
        nextTab?.()
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

  const handleSwitch = (event: any) => {
    const { name, checked } = event.target
    setFormValues({ ...formValues, [name]: checked })
  }

  return (
    <Container>
      <Nightlife sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Life style
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Water quality'
          name='water_quality'
          fullWidth
          select
          margin='dense'
          value={formValues.water_quality}
          onChange={handleChange}
          size='small'
        >
          {WATER_QUALITY.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          name='mosquito'
          onChange={handleSwitch}
          checked={formValues.mosquito}
          control={<Switch defaultChecked />}
          label='Mosquito net'
        />

        <FormControl fullWidth margin='dense'>
          <InputLabel>Pet</InputLabel>
          <Select
            name='pet_company'
            multiple
            value={formValues.pet_company}
            onChange={handleChange}
            input={<OutlinedInput label='Pet' />}
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
            {PET_COMPANY.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, formValues.pet_company, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
