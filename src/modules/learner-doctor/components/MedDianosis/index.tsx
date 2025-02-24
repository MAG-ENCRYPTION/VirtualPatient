import styled from '@emotion/styled'
import { ArrowForward } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { MedExam } from '../../../../entities/TotalClinicalCase'
import { MedExamTuto } from '../../../../entities/tutor/MedExamTuto'
import { EXAMINATION } from '../../../../shared/constants'
import { ButtonWithModal } from '../../../shared/ButtonModal'

const Container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    min-width: 250px;
  }
`

export const MedDiagnosis = ({
  diagnosis,
  closeModal,
  updateConsultSequence,
  getExamResult,
  getPrescribedExams,
}: {
  diagnosis: MedExam[]
  closeModal?: () => void
  updateConsultSequence: (seq: string) => void
  getExamResult: (exam: MedExamTuto) => void
  getPrescribedExams: (exam: string[]) => void
}) => {
  const [prescriptions, setPrescriptions] = useState<string[]>([])
  const [results, setResults] = useState<MedExam[]>([])
  const [verdict, setVerdict] = useState<boolean>()

  const getResults = () => {
    getPrescribedExams(prescriptions)
    let res = diagnosis.filter((diag) => prescriptions.includes(diag.name))
    setResults(res)
    updateConsultSequence('5')
  }

  return (
    <Container>
      <div>
        <Typography gutterBottom variant='h6'>
          Available examinations
        </Typography>
        <FormGroup>
          {EXAMINATION.map((exam) => (
            <FormControlLabel
              key={exam}
              control={
                <Checkbox
                  value={exam}
                  onChange={(event) => {
                    const { value, checked } = event.target
                    if (checked) {
                      setPrescriptions([...prescriptions, value])
                    } else {
                      let ind = prescriptions.indexOf(value)
                      prescriptions.splice(ind, 1)
                      setPrescriptions(prescriptions)
                    }
                  }}
                />
              }
              label={exam}
            />
          ))}
        </FormGroup>

        <Button variant='contained' onClick={getResults}>
          Prescribe
        </Button>
      </div>

      <Divider
        orientation='vertical'
        style={{ height: 250, width: 1, backgroundColor: '#777' }}
        sx={{ ml: 2, mr: 2 }}
      />

      <div>
        <Typography gutterBottom variant='h6'>
          Results
        </Typography>
        {results.map((res, index) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography key={res.id}>{res.name}</Typography>
            <ButtonWithModal
              buttonText='View'
              title={res.name + ' Results'}
              buttonProps={{
                endIcon: <ArrowForward sx={{ mb: 0.5 }} />,
                variant: 'text',
              }}
            >
              {(closeModal) => (
                <Container>
                  <div>
                    <img
                      alt='med'
                      src={res.file.file}
                      height={250}
                      width={250}
                      style={{ objectFit: 'contain' }}
                    />
                    <Typography variant='body1' gutterBottom>
                      <b>Name: </b> {res.name} <br />
                      <b>Anatomy: </b> {res.anatomy} <br />
                      <b>Result: </b> {res.result} <br />
                    </Typography>
                  </div>
                  <div style={{ marginLeft: 20 }}>
                    <Typography variant='h6'>Verdict</Typography>
                    <RadioGroup
                      value={verdict}
                      onChange={(event) =>
                        setVerdict(Boolean(event.target.value))
                      }
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

                    <Button
                      variant='contained'
                      onClick={() => {
                        if (verdict !== undefined) {
                          getExamResult({
                            id: index,
                            exam: res.name + ' - ' + res.anatomy,
                            result: res.result,
                            verdict,
                          })
                          closeModal()
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </Container>
              )}
            </ButtonWithModal>
          </div>
        ))}
      </div>
    </Container>
  )
}
