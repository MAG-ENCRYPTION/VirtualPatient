import { ClinicalCase } from './ClinicalCase'
import { VirtualPatient } from './VirtualPatient'

export type VirtualCase = {
  id: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  virtual_patient: VirtualPatient
  clinical_case: ClinicalCase
}
