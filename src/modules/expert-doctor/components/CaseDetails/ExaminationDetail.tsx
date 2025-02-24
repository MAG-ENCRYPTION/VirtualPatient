import { Check, Clear } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { MedExam } from '../../../../entities/TotalClinicalCase'

export const ExaminationDetail = ({ exams }: { exams: MedExam[] }) => {
  return (
    <Accordion sx={{ marginTop: 5 }}>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
          9.{' '}
          <span style={{ textDecoration: 'underline' }}>
            Medical Examination
          </span>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={4}>
          {exams.map((exam) => (
            <Grid item key={exam.id}>
              <Typography variant='body1' gutterBottom>
                <b>Name: </b> {exam.name} <br />
                <b>Anatomy: </b> {exam.anatomy} <br />
                <b>Result: </b> {exam.result} <br />
                <b>Verdict: </b> {exam.verdict ? 'Positive' : 'Negative'} <br />
                <b>Media file: </b>{' '}
                {exam.file ? (
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
