import { ClinicalCase } from './ClinicalCase'

export type PersonalInfo = {
  id: string
  sex: 'M' | 'F'
  age: number
  civil_status: 'SINGLE' | 'MARRIED' | 'DIVORCED'
  profession: string
  nb_child: number
  blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
  clinical_case: ClinicalCase
}
