import { Doctor } from './Doctor'

export type Log = {
  id: string
  operation: 'UPDATE' | 'CREATE' | 'DELETE'
  doctor: Doctor
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
