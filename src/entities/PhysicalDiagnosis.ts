import { ClinicalCase } from './ClinicalCase'

export type PhysicalDiagnosis = {
  id: string
  physical_diagnosis: 'PALPATION' | 'OSCULTATION' | 'PERCUTION' | 'INSPECTION'
  result: string
  file: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
