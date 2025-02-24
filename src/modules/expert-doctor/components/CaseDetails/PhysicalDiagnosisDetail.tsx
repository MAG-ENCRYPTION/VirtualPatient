import { Check, Clear } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { PhysicalDiagnosis } from '../../../../entities/PhysicalDiagnosis'

export const PhysicalDiagnosisDetail = ({
  diagnosis,
}: {
  diagnosis: PhysicalDiagnosis[]
}) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          9.{' '}
          <span style={{ textDecoration: 'underline' }}>
            Physical Diagnosis
          </span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={4}>
          {diagnosis.map((diag) => (
            <Grid item key={diag.id}>
              <Typography variant='body1' gutterBottom>
                <b>Name: </b> {diag.physical_diagnosis} <br />
                <b>Result: </b> {diag.result} <br />
                <b>Media file: </b>{' '}
                {diag.file ? (
                  <Check color='success' />
                ) : (
                  <Clear color='error' />
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
