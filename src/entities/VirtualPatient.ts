export type VirtualPatient = {
  id: string
  sex: 'M' | 'F'
  civil_status: 'SINGLE' | 'MARRIED' | 'DIVORCED'
  min_age: number
  max_age: number
  weight: number
  modele_3D: File
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
