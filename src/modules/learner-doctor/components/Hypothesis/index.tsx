import { CheckCircle, HighlightOff } from '@mui/icons-material'
import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { HypothesisTuto } from '../../../../entities/tutor/HypothesisTuto'
import { DISEASES } from '../../../../shared/constants'
import { getStyles, MenuProps } from '../../../shared/MuiStyles/multipleSelect'
import { infereHypothesis } from '../../network'
import { SymptomStatus } from '../../pages/consultation'

export const Hypothesis = ({
  identifiedSymptoms,
  closeModal,
  getHypothesis,
  threshold,
}: {
  identifiedSymptoms: SymptomStatus[]
  closeModal?: () => void
  getHypothesis: (hypo: HypothesisTuto) => void
  threshold: number
}) => {
  const [diseases, setDiseases] = useState<string[]>([])
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  const theme = useTheme()

  const submitHypothesis = async () => {
    setLoading(true)
    let dataToPost = {
      disease: diseases,
      symptoms: {},
    }
    let symps: any = {}
    for (let symp of identifiedSymptoms) {
      symps[symp.symptom] = symp.found ? 1 : 0
    }
    dataToPost.symptoms = symps
    console.log(dataToPost)
    await infereHypothesis(dataToPost).then((resp) => {
      console.log(resp)
      setResult(resp)
      setLoading(false)
      let l = {
        id: 1,
        symptoms: identifiedSymptoms.map((it) => it.symptom),
        hypothesis: Object.keys(resp).map((key) => {
          let obj: { key: string; val: boolean } = { key: '', val: false }
          if (resp[key] >= threshold + 0.1) {
            obj.key = key
            obj.val = true
          } else {
            obj.key = key
            obj.val = false
          }
          return obj
        }),
        reason,
        threshold: threshold + 0.1,
      }
      getHypothesis(l)
    })
    // closeModal?.()
  }

  return (
    <div>
      <Typography variant='subtitle1' sx={{ textAlign: 'center' }} gutterBottom>
        You have identified the following symptoms <br />
        <b>
          {identifiedSymptoms
            .filter((item) => item.found === true)
            .map(({ symptom }) => (
              <>{symptom}, </>
            ))}
        </b>
      </Typography>

      <Typography variant='subtitle1' sx={{ textAlign: 'center' }} gutterBottom>
        What do you think the patient suffers from ?
      </Typography>

      <FormControl fullWidth margin='dense' required>
        <InputLabel>Disease</InputLabel>
        <Select
          name='diseases'
          multiple
          value={diseases}
          onChange={(event) => {
            const { value } = event.target
            setDiseases(value as string[])
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
          {DISEASES.map((dis) => (
            <MenuItem
              key={dis.value}
              value={dis.value}
              style={getStyles(dis.label, diseases, theme)}
            >
              {dis.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        required
        label='State your reason'
        name='reason'
        fullWidth
        multiline
        rows={4}
        margin='dense'
        value={reason}
        onChange={(event) => {
          const { value } = event.target
          setReason(value)
        }}
        size='small'
      />

      <Button variant='contained' onClick={submitHypothesis}>
        Submit
      </Button>

      {loading && (
        <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
          Verifying your hypothesis... <br />
          <CircularProgress color='success' size={20} />
        </Typography>
      )}
      {result && (
        <div>
          {Object.keys(result).map((key) => (
            <p key={key}>
              {key}:{' '}
              {result[key] >= threshold ? (
                <span>
                  <CheckCircle color='success' sx={{ mb: -0.6 }} /> :{' '}
                  {Math.round(result[key] * 100)}
                  {'% '}
                </span>
              ) : (
                <span>
                  <HighlightOff color='error' sx={{ mb: -0.6 }} /> :{' '}
                  {Math.round(result[key] * 100)}
                  {'% '}
                </span>
              )}{' '}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
