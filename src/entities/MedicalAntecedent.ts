import { ClinicalCase } from './ClinicalCase'

export type MedicalAntecedent = {
  id: string
  family_antecedents: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
