import { ClinicalCase } from './ClinicalCase'

export type PhysicalActivity = {
  id: string
  name: string
  frequency: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}

export type Addiction = {
  id: string
  name: string
  frequency: string
  duration: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}

export type Travel = {
  id: string
  location: string
  frequency: string
  duration: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}

export type LifeStyle = {
  id: string
  water_quality:
    | 'Mineral water'
    | 'Tap water'
    | 'Water from the source'
    | 'River water'
    | 'Potable water'
    | 'Well water'
  mosquito: boolean
  pet_company: string
  clinical_case: ClinicalCase
  physical_activity: PhysicalActivity[]
  addiction: Addiction[]
  travel: Travel[]
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
