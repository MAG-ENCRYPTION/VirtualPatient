import { ClinicalCase } from './ClinicalCase'

export type Concept = {
  id: string
  name: string
  clinical_case: ClinicalCase
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
