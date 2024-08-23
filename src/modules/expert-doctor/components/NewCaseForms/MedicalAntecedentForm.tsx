import styled from '@emotion/styled'
import { Coronavirus, Save } from '@mui/icons-material'
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useContext, useState } from 'react'
import { FAMILY_ANTECEDENTS } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { getStyles, MenuProps } from '../../../shared/MuiStyles/multipleSelect'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createAntecedent } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const MedicalAntecedentForm = ({
  nextTab,
  getAntecedentId,
}: {
  nextTab?: () => void
  getAntecedentId: (id: string) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const { caseid } = useContext(CaseIdContexte)

  const defaultValue = {
    family_antecedents: [],
    nb_pregnancy: '',
    date_of_last_pregnancy: moment(new Date()),
  }

  const [formValues, setFormValues] = useState(defaultValue)
  const theme = useTheme()

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()

    const dataToPost = {
      family_antecedents: formValues.family_antecedents.join(';'),
      nb_pregnancy: Number(formValues.nb_pregnancy),
      date_of_last_pregnancy:
        formValues.date_of_last_pregnancy.format('YYYY-MM-DD'),
      clinical_case: caseid,
    }

    await createAntecedent(dataToPost)
      .then((antecedent) => {
        console.log('then -> ', antecedent)
        setResponse({ type: 'success', message: 'Saved with success' })
        getAntecedentId(antecedent.url)
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

  return (
    <Container>
      <Coronavirus sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Medical Antecedent
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='dense'>
          <InputLabel>Family background</InputLabel>
          <Select
            name='family_antecedents'
            multiple
            value={formValues.family_antecedents}
            onChange={handleChange}
            input={<OutlinedInput label='Family background' />}
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
            {FAMILY_ANTECEDENTS.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, formValues.family_antecedents, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              label='N° of pregnancies'
              name='nb_pregnancy'
              fullWidth
              margin='dense'
              type='number'
              value={formValues.nb_pregnancy}
              onChange={handleChange}
              size='small'
            />
          </Grid>

          <Grid item xs={7}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label='Date of last pregnancy'
                value={formValues.date_of_last_pregnancy}
                maxDate={moment(new Date())}
                inputFormat='YYYY-MM-DD'
                onChange={(value) => {
                  if (value) {
                    setFormValues({
                      ...formValues,
                      date_of_last_pregnancy: value,
                    })
                    console.log(value.format('YYYY-MM-DD'))
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='date_of_last_pregnancy'
                    fullWidth
                    margin='dense'
                    size='small'
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

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
