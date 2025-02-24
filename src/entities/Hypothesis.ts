import { LearnerPhysician } from './Doctor'
import { Evaluation } from './Evaluation'

export type Hypothesis = {
  id: string
  description: string
  learner_physician: LearnerPhysician
  evaluation: Evaluation
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
