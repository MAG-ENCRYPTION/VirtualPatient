import { LearnerPhysician } from './Doctor'
import { Evaluation } from './Evaluation'

export type Question = {
  id: string
  question: string
  answer: string
  learner_physician: LearnerPhysician
  evaluation: Evaluation
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
