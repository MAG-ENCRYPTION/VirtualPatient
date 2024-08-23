import styled from '@emotion/styled'
import {
  HourglassBottom,
  HourglassEmpty,
  HourglassFull,
} from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  StepLabel,
} from '@mui/material'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import { useContext, useEffect, useState } from 'react'
import { CaseIdContexte } from '../../context'
import { SymptomForm } from '../NewCaseForms/SymptomsForm'
import { TransferList } from '../TransferList'

const Container = styled.div`
  padding: 30px;
  .block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
  }
`

export const SymptomPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const closeModal = () => setIsModalVisible(false)
  const [activeStep, setActiveStep] = useState(0)
  const { nextStep } = useContext(CaseIdContexte)

  const handleClose = (event: any, reason: any) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown'))
      return
    closeModal()
  }

  const [selectedSymtoms, setSelectedSymtoms] = useState<string[]>([])
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if (selectedSymtoms.length > 0 && activeStep === selectedSymtoms.length) {
      setFinish(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  return (
    <Container>
      <Dialog open={isModalVisible} onClose={handleClose} maxWidth='sm'>
        <DialogTitle>Select the symptoms</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <TransferList getSelectedSymptoms={setSelectedSymtoms} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant='contained'>
            Finish
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container>
        <Grid item xs className='block'>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {selectedSymtoms.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  icon={
                    index < activeStep ? (
                      <HourglassFull />
                    ) : index === activeStep ? (
                      <HourglassBottom />
                    ) : (
                      <HourglassEmpty />
                    )
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Grid item xs>
          {finish ? (
            <>
              <Button variant='contained' onClick={() => nextStep(3)}>
                Next Step
              </Button>
            </>
          ) : (
            <SymptomForm
              symptom={selectedSymtoms[activeStep]}
              step={activeStep}
              updateStep={setActiveStep}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
