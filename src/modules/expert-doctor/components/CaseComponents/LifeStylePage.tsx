import styled from '@emotion/styled'
import { ArrowForward } from '@mui/icons-material'
import { Button, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { CaseIdContexte } from '../../context'
import { AddictionForm } from '../NewCaseForms/AddictionForm'
import { LifeStyleForm } from '../NewCaseForms/LifeStyleForm'
import { PhysicalActivityForm } from '../NewCaseForms/PhysicalActivityForm'
import { TravelsForm } from '../NewCaseForms/TravelsForm'

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

export const LifeStylePage = () => {
  const [value, setValue] = useState(0)
  const [lifeStyleId, setLifeStyleId] = useState('')
  const { nextStep } = useContext(CaseIdContexte)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const nextTab = () => {
    if (value === 3) {
      nextStep(4)
    } else {
      setValue(value + 1)
    }
  }

  return (
    <Container>
      <div style={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Life style' />
          <Tab label='Addictions' />
          <Tab label='Physical Activities' />
          <Tab label='Trips' />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <LifeStyleForm nextTab={nextTab} getLifeStyleId={setLifeStyleId} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '68%' }}
        >
          <Tooltip
            title='Pass if no addiction needs to be recorded'
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

        <AddictionForm lifeStyleId={lifeStyleId} nextTab={nextTab} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '68%' }}
        >
          <Tooltip
            title='Pass if no physical activity needs to be recorded'
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
        <PhysicalActivityForm lifeStyleId={lifeStyleId} nextTab={nextTab} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '68%' }}
        >
          <Tooltip
            title='Pass if no trip needs to be recorded'
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
        <TravelsForm lifeStyleId={lifeStyleId} nextTab={nextTab} />
      </TabPanel>
    </Container>
  )
}
