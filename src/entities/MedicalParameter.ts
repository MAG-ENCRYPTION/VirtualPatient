import { ClinicalCase } from './ClinicalCase'

export type TypeParameter = {
  id: string
  name: string
  unit: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}

export type MedicalParameter = {
  id: string
  value: number
  comment: string
  type_parameter: TypeParameter
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
