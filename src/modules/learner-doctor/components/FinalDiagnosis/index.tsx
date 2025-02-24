import { Button, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { DISEASES } from '../../../../shared/constants'
import { SymptomStatus } from '../../pages/consultation'

export const FinalDiagnosis = ({
  identifiedSymptoms,
  closeModal,
  getFinalDiagnosis,
}: {
  identifiedSymptoms: SymptomStatus[]
  closeModal?: () => void
  getFinalDiagnosis: (disease: string) => void
}) => {
  const [disease, setDisease] = useState<string>()

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
        What is your final diagnosis for this clinical case ?
      </Typography>

      <TextField
        required
        label='disease'
        name='name'
        fullWidth
        select
        margin='dense'
        value={disease}
        onChange={(event) => setDisease(event.target.value)}
      >
        {DISEASES.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant='contained'
        onClick={() => {
          if (disease) {
            getFinalDiagnosis(disease)
            closeModal?.()
          }
        }}
      >
        Submit
      </Button>
    </div>
  )
}
