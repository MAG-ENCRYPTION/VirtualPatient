import { ClinicalCase } from './ClinicalCase'

export type TreatmentInProgress = {
  id: string
  name: string
  administration_mode: string
  duration: string
  observation: String
  efficiency: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
