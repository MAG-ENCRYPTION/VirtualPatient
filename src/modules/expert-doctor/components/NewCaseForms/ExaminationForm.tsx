import styled from '@emotion/styled'
import { MedicalInformation, Save } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Media } from '../../../../entities/Media'
import { ANATOMY, EXAMINATION } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createExamination, getMediaFiles } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }

  img {
    border-radius: 20px;
  }
`

export const ExaminationForm = () => {
  const defaultValue = {
    name: '',
    anatomy: '',
    result: '',
    verdict: '',
    file: '',
    clinical_case: '',
  }

  const { caseid, nextStep } = useContext(CaseIdContexte)
  const [formValues, setFormValues] = useState(defaultValue)
  const [medias, setMedias] = useState<Media[]>([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<NotifType>()
  const [source, setSource] = useState('')

  useEffect(() => {
    getMediaFiles('EXAM').then((resp) => {
      setMedias(resp)
    })
  }, [])

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.clinical_case = caseid

    await createExamination(formValues)
      .then((exam) => {
        console.log('then -> ', exam)
        setResponse({ type: 'success', message: 'Saved with success' })
        setLoading(false)
        setFormValues(defaultValue)
        nextStep(8)
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
      <MedicalInformation sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Medical examinations
      </Typography>

      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          disableClearable
          options={EXAMINATION}
          onChange={(event, value) =>
            setFormValues({ ...formValues, name: value })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label='Medical exam'
              name='name'
              fullWidth
              margin='dense'
              value={formValues.name}
              size='small'
            />
          )}
        />

        <TextField
          required
          label='Body anatomy'
          name='anatomy'
          fullWidth
          select
          margin='dense'
          value={formValues.anatomy}
          onChange={handleChange}
          size='small'
        >
          {ANATOMY.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          label='Examination result'
          name='result'
          fullWidth
          multiline
          rows={4}
          margin='dense'
          value={formValues.result}
          onChange={handleChange}
          size='small'
        />

        <FormControl>
          <FormLabel>Verdict</FormLabel>
          <RadioGroup
            row
            name='verdict'
            value={formValues.verdict}
            onChange={handleChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label='Positive'
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label='Negative'
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label='Media File'
          name='file'
          fullWidth
          select
          margin='dense'
          value={formValues.file}
          onChange={(event) => {
            handleChange(event)
            const url = event.target.value
            let file = medias.find((item) => item.url === url)?.file
            if (file) {
              setSource(file)
            }
          }}
          size='small'
        >
          {medias.map((val) => (
            <MenuItem key={val.id} value={val.url}>
              {val.name}
            </MenuItem>
          ))}
        </TextField>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {source !== '' && (
            <img
              alt='exam-result'
              className='im'
              src={source}
              height={200}
              width={200}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>

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
