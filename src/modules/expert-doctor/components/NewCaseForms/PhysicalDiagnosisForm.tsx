import styled from '@emotion/styled'
import { Elderly, Save } from '@mui/icons-material'
import {
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
import ReactAudioPlayer from 'react-audio-player'
import { Media } from '../../../../entities/Media'
import { PHYSICAL_DIAGNOSIS } from '../../../../shared/constants'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { CaseIdContexte } from '../../context'
import { createPhysicalDiagnosis, getMediaFiles } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    width: 400px;
  }
`

export const PhysicalDiagnosisForm = () => {
  const defaultValue = {
    physical_diagnosis: '',
    result: '',
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
    getMediaFiles('PHYSICAL DIAGNOSIS').then((resp) => {
      setMedias(resp)
    })
  }, [])

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    formValues.clinical_case = caseid

    await createPhysicalDiagnosis(formValues)
      .then((diagnosis) => {
        console.log('then -> ', diagnosis)
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
      <Elderly sx={{ fontSize: 40, color: '#777' }} />
      <Typography variant='h5' sx={{ color: '#777' }} gutterBottom>
        Physical diagnosis
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label='Physical diagnosis'
          name='physical_diagnosis'
          fullWidth
          select
          margin='dense'
          value={formValues.physical_diagnosis}
          onChange={handleChange}
          size='small'
        >
          {PHYSICAL_DIAGNOSIS.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>

        <FormControl>
          <FormLabel>Diagnosis Result</FormLabel>
          <RadioGroup
            row
            name='result'
            value={formValues.result}
            onChange={handleChange}
          >
            <FormControlLabel
              value='Positive'
              control={<Radio />}
              label='Positive'
            />
            <FormControlLabel
              value='Negative'
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
          {medias.map((media) => (
            <MenuItem key={media.id} value={media.url}>
              {media.name}
            </MenuItem>
          ))}
        </TextField>

        <div style={{ margin: 5 }}>
          {source !== '' && (
            <ReactAudioPlayer
              src={source}
              controls
              loop
              style={{ width: '100%' }}
            />
          )}
        </div>

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
            onClick={() => nextStep(7)}
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
