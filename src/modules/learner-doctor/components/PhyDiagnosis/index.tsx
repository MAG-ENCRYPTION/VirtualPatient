import styled from '@emotion/styled'
import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import auscult from '../../../../assets/images/icons/auscult.png'
import inspect from '../../../../assets/images/icons/inspect.png'
import palpate from '../../../../assets/images/icons/palpate.png'
import percut from '../../../../assets/images/icons/percut.png'
import { PhysDiagnosis } from '../../../../entities/TotalClinicalCase'
import { PhyDiagnosisTuto } from '../../../../entities/tutor/PhyDiagnosisTuto'
import { ButtonWithModal } from '../../../shared/ButtonModal'

const Container = styled.div`
  .phy {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mb {
    margin-bottom: 30px;
  }
`

export const PhyDiagnosis = ({
  diagnosis,
  closeModal,
  getDiagnosis,
}: {
  diagnosis: PhysDiagnosis[]
  closeModal?: () => void
  getDiagnosis: (diag: PhyDiagnosisTuto) => void
}) => {
  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item>
          <div className='phy mb'>
            <img
              alt='physical-svg'
              src={auscult}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
            />
            <ButtonWithModal
              buttonText='Auscultation'
              title='Auscultation'
              buttonProps={{ variant: 'text' }}
            >
              {(closeModal) => (
                <Auscultation
                  diagnosis={diagnosis}
                  getDiagnosis={getDiagnosis}
                  closeModal={closeModal}
                />
              )}
            </ButtonWithModal>
          </div>
          <div className='phy'>
            <img
              alt='physical-svg'
              src={inspect}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
            />
            <ButtonWithModal
              buttonText='Inspectation'
              title='Inspectation'
              buttonProps={{ variant: 'text' }}
            >
              {(closeModal) => (
                <Inspectation
                  diagnosis={diagnosis}
                  getDiagnosis={getDiagnosis}
                  closeModal={closeModal}
                />
              )}
            </ButtonWithModal>
          </div>
        </Grid>

        <Grid item>
          <div className='phy mb'>
            <img
              alt='physical-svg'
              src={palpate}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
            />
            <ButtonWithModal
              buttonText='Palpation'
              title='Palpation'
              buttonProps={{ variant: 'text' }}
            >
              {(closeModal) => (
                <Palpation
                  diagnosis={diagnosis}
                  getDiagnosis={getDiagnosis}
                  closeModal={closeModal}
                />
              )}
            </ButtonWithModal>
          </div>
          <div className='phy'>
            <img
              alt='physical-svg'
              src={percut}
              height={50}
              width={50}
              style={{ objectFit: 'contain' }}
            />
            <ButtonWithModal
              buttonText='Percussion'
              title='Percussion'
              buttonProps={{ variant: 'text' }}
            >
              {(closeModal) => (
                <Percussion
                  diagnosis={diagnosis}
                  getDiagnosis={getDiagnosis}
                  closeModal={closeModal}
                />
              )}
            </ButtonWithModal>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container1 = styled.div`
  display: flex;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;

    > img {
      margin-bottom: 10px;
    }
  }
`

const Auscultation = ({
  diagnosis,
  getDiagnosis,
  closeModal,
}: {
  diagnosis: PhysDiagnosis[]
  getDiagnosis: (diag: PhyDiagnosisTuto) => void
  closeModal: () => void
}) => {
  const [verdict, setVerdict] = useState('')

  const submit = () => {
    getDiagnosis({ id: 1, exam: 'Auscultation', verdict })
    closeModal()
  }

  const diag = diagnosis.find(
    (item) => item.physical_diagnosis === 'OSCULTATION',
  )

  if (diag) {
    return (
      <>
        <Container1>
          <div>
            <img
              alt='physical-svg'
              src={auscult}
              height={100}
              width={100}
              style={{ objectFit: 'contain' }}
            />
            <ReactAudioPlayer
              src={diag.file.file}
              controls
              loop
              style={{ width: '250' }}
            />
          </div>

          <div>
            <Typography variant='h6'>Verdict</Typography>
            <RadioGroup
              value={verdict}
              onChange={(event) => setVerdict(event.target.value)}
            >
              <FormControlLabel value='Fast' control={<Radio />} label='Fast' />
              <FormControlLabel
                value='Normal'
                control={<Radio />}
                label='Normal'
              />
              <FormControlLabel value='Slow' control={<Radio />} label='Slow' />
            </RadioGroup>
          </div>
        </Container1>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
      </>
    )
  }
  return <Alert severity='info'>No Auscultation exam found!!!</Alert>
}

const Inspectation = ({
  diagnosis,
  getDiagnosis,
  closeModal,
}: {
  diagnosis: PhysDiagnosis[]
  getDiagnosis: (diag: PhyDiagnosisTuto) => void
  closeModal: () => void
}) => {
  const [verdict, setVerdict] = useState('')

  const submit = () => {
    getDiagnosis({ id: 2, exam: 'Inspection', verdict })
    closeModal()
  }

  const diag = diagnosis.find(
    (item) => item.physical_diagnosis === 'INSPECTION',
  )

  if (diag) {
    return (
      <>
        <Container1>
          <div>
            <img
              alt='physical-svg'
              src={auscult}
              height={100}
              width={100}
              style={{ objectFit: 'contain' }}
            />
            <ReactAudioPlayer
              src={diag.file.file}
              controls
              loop
              style={{ width: '250' }}
            />
          </div>

          <div>
            <Typography variant='h6'>Verdict</Typography>
            <RadioGroup
              value={verdict}
              onChange={(event) => setVerdict(event.target.value)}
            >
              <FormControlLabel value='Fast' control={<Radio />} label='Fast' />
              <FormControlLabel
                value='Normal'
                control={<Radio />}
                label='Normal'
              />
              <FormControlLabel value='Slow' control={<Radio />} label='Slow' />
            </RadioGroup>
          </div>
        </Container1>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
      </>
    )
  }
  return <Alert severity='info'>No Inspectation exam found!!!</Alert>
}

const Palpation = ({
  diagnosis,
  getDiagnosis,
  closeModal,
}: {
  diagnosis: PhysDiagnosis[]
  getDiagnosis: (diag: PhyDiagnosisTuto) => void
  closeModal: () => void
}) => {
  const [verdict, setVerdict] = useState('')

  const submit = () => {
    getDiagnosis({ id: 3, exam: 'Palpation', verdict })
    closeModal()
  }

  const diag = diagnosis.find((item) => item.physical_diagnosis === 'PALPATION')

  if (diag) {
    return (
      <>
        <Container1>
          <div>
            <img
              alt='physical-svg'
              src={auscult}
              height={100}
              width={100}
              style={{ objectFit: 'contain' }}
            />
            <ReactAudioPlayer
              src={diag.file.file}
              controls
              loop
              style={{ width: '250' }}
            />
          </div>

          <div>
            <Typography variant='h6'>Verdict</Typography>
            <RadioGroup
              value={verdict}
              onChange={(event) => setVerdict(event.target.value)}
            >
              <FormControlLabel value='Fast' control={<Radio />} label='Fast' />
              <FormControlLabel
                value='Normal'
                control={<Radio />}
                label='Normal'
              />
              <FormControlLabel value='Slow' control={<Radio />} label='Slow' />
            </RadioGroup>
          </div>
        </Container1>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
      </>
    )
  }
  return <Alert severity='info'>No Palpation exam found!!!</Alert>
}

const Percussion = ({
  diagnosis,
  getDiagnosis,
  closeModal,
}: {
  diagnosis: PhysDiagnosis[]
  getDiagnosis: (diag: PhyDiagnosisTuto) => void
  closeModal: () => void
}) => {
  const [verdict, setVerdict] = useState('')

  const submit = () => {
    getDiagnosis({ id: 4, exam: 'Percution', verdict })
    closeModal()
  }

  const diag = diagnosis.find((item) => item.physical_diagnosis === 'PERCUTION')

  if (diag) {
    return (
      <>
        <Container1>
          <div>
            <img
              alt='physical-svg'
              src={auscult}
              height={100}
              width={100}
              style={{ objectFit: 'contain' }}
            />
            <ReactAudioPlayer
              src={diag.file.file}
              controls
              loop
              style={{ width: '250' }}
            />
          </div>

          <div>
            <Typography variant='h6'>Verdict</Typography>
            <RadioGroup
              value={verdict}
              onChange={(event) => setVerdict(event.target.value)}
            >
              <FormControlLabel value='Fast' control={<Radio />} label='Fast' />
              <FormControlLabel
                value='Normal'
                control={<Radio />}
                label='Normal'
              />
              <FormControlLabel value='Slow' control={<Radio />} label='Slow' />
            </RadioGroup>
          </div>
        </Container1>
        <Button variant='contained' onClick={submit}>
          Submit
        </Button>
      </>
    )
  }
  return <Alert severity='info'>No Auscultation exam found!!!</Alert>
}
