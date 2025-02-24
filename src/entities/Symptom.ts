import { ClinicalCase } from './ClinicalCase'

export type Symptom = {
  id: string
  name: string
  localisation: string
  frequency: string
  duration: string
  evolution: string
  triggering_activity: string
  degree: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
