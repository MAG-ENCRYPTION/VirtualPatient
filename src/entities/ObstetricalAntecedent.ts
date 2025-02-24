import { MedicalAntecedent } from './MedicalAntecedent'

export type ObstetricalAntecedent = {
  id: string
  nb_pregnancy: number
  date_of_last_pregnancy: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  medical_antecedent: MedicalAntecedent
}
