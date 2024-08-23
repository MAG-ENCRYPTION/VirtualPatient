import { ClinicalCase } from './ClinicalCase'

export type Exam = {
  id: string
  name: string
  anatomy: string
  result: string
  verdict: boolean
  file: string
  clinical_case: ClinicalCase
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
