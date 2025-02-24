import styled from '@emotion/styled'
import { ArrowForward } from '@mui/icons-material'
import { Button, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { CaseIdContexte } from '../../context'
import { AllergyForm } from '../NewCaseForms/AllergyForm'
import { DiseaseForm } from '../NewCaseForms/DiseaseForm'
import { MedicalAntecedentForm } from '../NewCaseForms/MedicalAntecedentForm'
import { SurgeryForm } from '../NewCaseForms/SurgeryForm'

const Container = styled.div`
  .block {
    display: none;
  }

  @media (min-width: 768px) {
    .block {
      display: flex;
      justify-content: flex-end;
    }
  }
`

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  )
}

export const MedicalAntecedentPage = () => {
  const [value, setValue] = useState(0)
  const [antecedentId, setAntecedentId] = useState('')
  const { nextStep } = useContext(CaseIdContexte)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const nextTab = () => {
    if (value === 3) {
      nextStep(6)
    } else {
      setValue(value + 1)
    }
  }

  return (
    <Container>
      <div style={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Medical Antecedent' />
          <Tab label='Previous surgery' />
          <Tab label='Allergies' />
          <Tab label='Previous Disease' />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <MedicalAntecedentForm
          nextTab={nextTab}
          getAntecedentId={setAntecedentId}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '68%' }}
        >
          <Tooltip
            title='Pass if no surgery needs to be recorded'
            arrow
            placement='top'
          >
            <Button
              onClick={nextTab}
              variant='outlined'
              color='secondary'
              endIcon={<ArrowForward />}
            >
              Pass
            </Button>
          </Tooltip>
        </div>
        <SurgeryForm antecedentId={antecedentId} nextTab={nextTab} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '68%' }}
        >
          <Tooltip
            title='Pass if no allergy needs to be recorded'
            arrow
            placement='top'
          >
            <Button
              onClick={nextTab}
              variant='outlined'
              color='secondary'
              endIcon={<ArrowForward />}
            >
              Pass
            </Button>
          </Tooltip>
        </div>
        <AllergyForm antecedentId={antecedentId} nextTab={nextTab} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip
            title='Pass if no previous disease needs to be recorded'
            arrow
            placement='top'
          >
            <Button
              onClick={nextTab}
              variant='outlined'
              color='secondary'
              endIcon={<ArrowForward />}
            >
              Pass
            </Button>
          </Tooltip>
        </div>

        <DiseaseForm antecedentId={antecedentId} nextTab={nextTab} />
      </TabPanel>
    </Container>
  )
}
