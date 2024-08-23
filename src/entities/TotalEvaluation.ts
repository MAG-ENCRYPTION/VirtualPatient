import { LearnerPhysician } from './Doctor'

export type HypoType = {
  id: string
  symptoms: string
  diseases: string
  reason: string
  threshold: number
}

type QuesType = {
  id: string
  question: string
  answer: string
  status: number
}

type ExamType = {
  id: string
  type: 'EXAM' | 'PHYSICAL DIAGNOSIS'
  name: string
  result: string
  verdict: string
}

type FeedType = {
  id: string
  expert_physician: string
  comment: string
}

export type TotalEvaluation = {
  id: string
  type: 'FORMATIF' | 'SOMMATIF'
  mark: number
  duration: number
  learner_physician: LearnerPhysician
  virtual_case: string
  clinical_case: string
  hypothesis: HypoType[]
  symptoms: string
  questions: QuesType[]
  diagnosis: ExamType[]
  feedback: FeedType[]
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}

