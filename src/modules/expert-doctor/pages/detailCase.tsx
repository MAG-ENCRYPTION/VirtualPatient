import { Divider, Grid, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { TotalClinicalCase } from '../../../entities/TotalClinicalCase'
import { AntecedentDetail } from '../components/CaseDetails/AntecedentDetail'
import { ExaminationDetail } from '../components/CaseDetails/ExaminationDetail'
import { GeneralDetail } from '../components/CaseDetails/GeneralDetail'
import { LifeStyleDetail } from '../components/CaseDetails/LifeStyleDetail'
import { OngoingTreatmentDetail } from '../components/CaseDetails/OngoingTreatmentDetail'
import { ParametersDetail } from '../components/CaseDetails/ParametersDetail'
import { PersonnalInfoDetail } from '../components/CaseDetails/PersonnalInfoDetail'
import { PhysicalDiagnosisDetail } from '../components/CaseDetails/PhysicalDiagnosisDetail'
import { SymptomDetail } from '../components/CaseDetails/SymtomDetail'
import { Dashboard } from '../components/ExpertDahsboard'

export const DetailCasePage = () => {
  const clinicalCase = useLocation().state as TotalClinicalCase

  return (
    <Dashboard>
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
    </Dashboard>
  )
}
