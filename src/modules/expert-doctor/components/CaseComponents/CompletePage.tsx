import { Divider, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { TotalClinicalCase } from '../../../../entities/TotalClinicalCase'
import { BackdropLoader } from '../../../shared/Backdrop'
import { CaseIdContexte } from '../../context'
import { getClinicalCases } from '../../network'
import { AntecedentDetail } from '../CaseDetails/AntecedentDetail'
import { ExaminationDetail } from '../CaseDetails/ExaminationDetail'
import { GeneralDetail } from '../CaseDetails/GeneralDetail'
import { LifeStyleDetail } from '../CaseDetails/LifeStyleDetail'
import { OngoingTreatmentDetail } from '../CaseDetails/OngoingTreatmentDetail'
import { ParametersDetail } from '../CaseDetails/ParametersDetail'
import { PersonnalInfoDetail } from '../CaseDetails/PersonnalInfoDetail'
import { PhysicalDiagnosisDetail } from '../CaseDetails/PhysicalDiagnosisDetail'
import { SymptomDetail } from '../CaseDetails/SymtomDetail'

export const CompletePage = () => {
  const { caseid } = useContext(CaseIdContexte)
  const [clinicalCase, setClinicalCase] = useState<TotalClinicalCase>()

  useEffect(() => {
    getClinicalCases().then((clinic: any[]) => {
      let cases = clinic as TotalClinicalCase[]
      setClinicalCase(cases.find((item) => item.url === caseid))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!clinicalCase) {
    return <BackdropLoader loading={true} />
  }

  return (
    <>
      <Typography
        variant='h4'
        sx={{ fontFamily: 'Montserrat', marginBottom: 5 }}
      >
        Clinical Case Details
      </Typography>

      <Grid container>
        <Grid item xs={3.5}>
          <Typography
            variant='subtitle1'
            sx={{ marginBottom: 2, fontSize: 18 }}
          >
            1.{' '}
            <span style={{ textDecoration: 'underline' }}>
              General Case Information
            </span>
          </Typography>
          <GeneralDetail clinicalCase={clinicalCase} />
        </Grid>

        <Divider
          orientation='vertical'
          style={{ height: 250, width: 2, backgroundColor: '#777' }}
          sx={{ marginLeft: 2, marginRight: 5 }}
        />

        <Grid item xs={3.5}>
          <Typography
            variant='subtitle1'
            sx={{ marginBottom: 2, fontSize: 18 }}
          >
            2.{' '}
            <span style={{ textDecoration: 'underline' }}>
              Patient's Personnal Information
            </span>
          </Typography>

          <PersonnalInfoDetail personnal={clinicalCase.personal_info} />
        </Grid>

        <Divider
          orientation='vertical'
          style={{ height: 250, width: 2, backgroundColor: '#777' }}
          sx={{ marginLeft: 2, marginRight: 5 }}
        />

        <Grid item xs={3}>
          <Typography
            variant='subtitle1'
            sx={{ marginBottom: 2, fontSize: 18 }}
          >
            3.{' '}
            <span style={{ textDecoration: 'underline' }}>
              Patient Medical Parameters
            </span>
          </Typography>

          <ParametersDetail parameters={clinicalCase.medical_parameter} />
        </Grid>
      </Grid>

      <SymptomDetail symptoms={clinicalCase.symptom} />

      <LifeStyleDetail lifeStyle={clinicalCase.life_style} />

      <OngoingTreatmentDetail treatments={clinicalCase.treatment_in_progress} />

      <AntecedentDetail antecedent={clinicalCase.medical_antecedent} />

      <PhysicalDiagnosisDetail diagnosis={clinicalCase.physical_diagnosis} />

      <ExaminationDetail exams={clinicalCase.exam} />
    </>
  )
}
