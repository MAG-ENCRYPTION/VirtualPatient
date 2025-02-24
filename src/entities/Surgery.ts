import { MedicalAntecedent } from './MedicalAntecedent'

export type Surgery = {
  id: string
  name: string
  date: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  medical_antecedent: MedicalAntecedent
}
