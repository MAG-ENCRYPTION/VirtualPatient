import { Button, Grow } from '@mui/material'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import * as React from 'react'
import { CompletePage } from '../components/CaseComponents/CompletePage'
import { ExaminationPage } from '../components/CaseComponents/ExaminationPage'
import { GeneralPage } from '../components/CaseComponents/GeneralPage'
import { LifeStylePage } from '../components/CaseComponents/LifeStylePage'
import { MedicalAntecedentPage } from '../components/CaseComponents/MedicalAntecedentPage'
import { OngoingTreatmentPage } from '../components/CaseComponents/OngoingTreatmentPage'
import { ParametersPage } from '../components/CaseComponents/ParametersPage'
import { PhysicalDiagnosisPage } from '../components/CaseComponents/PhysicalDiagnosisPage'
import { SymptomPage } from '../components/CaseComponents/SymptomPage'
import { Dashboard } from '../components/ExpertDahsboard'
import { CaseIdContexte } from '../context'

export const NewCasePage = () => {
  const steps = [
    'General Data',
    'Medical Parameters',
    'Symptoms',
    'Life Style',
    'Ongoing Treatment',
    'Medical Background',
    'Physical Diagnosis',
    'Medical Examination',
    'Complete',
  ]

  const [activeStep, setActiveStep] = React.useState(0)
  const [caseId, setCaseId] = React.useState('')

  const pageToShow = (index: number) => {
    return index === activeStep ? true : false
  }

  const PAGES = [
    <GeneralPage />,
    <ParametersPage />,
    <SymptomPage />,
    <LifeStylePage />,
    <OngoingTreatmentPage />,
    <MedicalAntecedentPage />,
    <PhysicalDiagnosisPage />,
    <ExaminationPage />,
    <CompletePage />,
  ]

  return (
    <CaseIdContexte.Provider
      value={{
        caseid: caseId,
        setCaseId: (id: string) => setCaseId(id),
        nextStep: (step: number) => setActiveStep(step),
      }}
    >
      <Dashboard>
        <div style={{ width: '100%' }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepButton>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
        <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>

        <div>
          {PAGES.map((page, index) => {
            return (
              pageToShow(index) && (
                <Grow
                  in={pageToShow(index)}
                  key={index}
                  style={{ transitionDelay: '100ms' }}
                >
                  <div style={{ width: '100%' }}>{page}</div>
                </Grow>
              )
            )
          })}
        </div>
      </Dashboard>
    </CaseIdContexte.Provider>
  )
}
