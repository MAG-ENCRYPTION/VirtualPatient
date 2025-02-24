import { MedicalAntecedent } from './MedicalAntecedent'

export type Allergy = {
  id: string
  manifestation: string
  trigger: string
  medical_antecedent: MedicalAntecedent
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
