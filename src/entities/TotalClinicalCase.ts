import { Allergy } from './Allergy'
import { ClinicalCase } from './ClinicalCase'
import { Disease } from './Disease'
import { LifeStyle } from './LifeStyle'
import { Media } from './Media'
import { MedicalParameter } from './MedicalParameter'
import { ObstetricalAntecedent } from './ObstetricalAntecedent'
import { PersonalInfo } from './PersonalInfo'
import { PhysicalDiagnosis } from './PhysicalDiagnosis'
import { Surgery } from './Surgery'
import { Symptom } from './Symptom'
import { TreatmentInProgress } from './TreatmentInProgress'

export type TotalClinicalCase = {
  id: string
  initial_problem: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  final_diagnosis: string
  system: 'RESPIRATORY SYSTEM' | 'CARDIOVASCULAR SYSTEM'
  specialty:
    | 'Generalist'
    | 'Neurologist'
    | 'Gynecologist'
    | 'Pediatrician'
    | 'Dentist'
    | 'Ophthalmologist'
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  personal_info: PersonalInfo
  medical_parameter: MedicalParameter[]
  physical_diagnosis: PhysicalDiagnosis[]
  exam: MedExam[]
  treatment_in_progress: TreatmentInProgress[]
  life_style: LifeStyle[]
  symptom: Symptom[]
  medical_antecedent: MedAntecedent[]
}

export type MedAntecedent = {
  id: string
  family_antecedents: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  allergy: Allergy[]
  disease: Disease[]
  surgery: Surgery[]
  obstetrical_antecedent: ObstetricalAntecedent[]
}

export type PhysDiagnosis = {
  id: string
  physical_diagnosis: 'PALPATION' | 'OSCULTATION' | 'PERCUTION' | 'INSPECTION'
  result: string
  file: Media
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}

export type MedExam = {
  id: string
  name: string
  anatomy: string
  result: string
  verdict: boolean
  file: Media
  clinical_case: ClinicalCase
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
