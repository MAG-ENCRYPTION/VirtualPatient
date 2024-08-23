import { MedicalAntecedent } from './MedicalAntecedent'
import { Treatment } from './Treatment'

export type Disease = {
  id: string
  name: string
  start_time: string
  end_time: string
  observation: string
  medical_antecedent: MedicalAntecedent
  treatement: Treatment[]
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
