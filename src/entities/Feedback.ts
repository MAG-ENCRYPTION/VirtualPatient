import { ExpertPhysician } from './Doctor'

export type Feedback = {
  id: string
  comment: string
  expert_physician: ExpertPhysician
  evaluation: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
