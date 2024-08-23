import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { TotalClinicalCase } from '../../../../entities/TotalClinicalCase'
import { ButtonWithModal } from '../../../shared/ButtonModal'
import { OngoTreatment } from './OngoTreatment'
import { MedParams } from './Params'
import { PreviousDisease } from './PrevDisease'

export const MedicalReport = ({
  clinicalCase,
  closeModal,
  updateConsultSequence,
}: {
  clinicalCase: TotalClinicalCase
  closeModal?: () => void
  updateConsultSequence: (seq: string) => void
}) => {
  const { personal_info } = clinicalCase

  useEffect(() => {
    updateConsultSequence('3')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Grid container spacing={1} sx={{ mb: 4 }}>
        <Grid item>
          <ButtonWithModal
            buttonText='Medical Parameters'
            title='Medical Parameters'
            maxWidth='sm'
          >
            {(closeModal) => (
              <MedParams params={clinicalCase.medical_parameter} />
            )}
          </ButtonWithModal>
        </Grid>
        <Grid item>
          <ButtonWithModal
            buttonText='Ongoing Treatment'
            title='Ongoing Treatment'
          >
            {(closeModal) => (
              <OngoTreatment treatments={clinicalCase.treatment_in_progress} />
            )}
          </ButtonWithModal>
        </Grid>
        <Grid item>
          <ButtonWithModal
            buttonText='Previous diseases'
            title='Previous diseases'
          >
            {(closeModal) => (
              <PreviousDisease
                prevDisease={clinicalCase.medical_antecedent[0].disease}
              />
            )}
          </ButtonWithModal>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            <b>Sex: </b> {personal_info.sex === 'M' ? 'Male' : 'Female'} <br />
            <b>Age: </b> {personal_info.age} year(s) old <br />
            <b>Civil status: </b> {personal_info.civil_status} <br />
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' gutterBottom>
            <b>Profession: </b> {personal_info.profession} <br />
            <b>N° of children: </b> {personal_info.nb_child} <br />
            <b>Blood group: </b> {personal_info.blood_group} <br />
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
