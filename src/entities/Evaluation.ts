export type Evaluation = {
  id: string
  type: 'FORMATIF' | 'SOMMATIF'
  mark: number
  learner_physician: string
  virtual_case: string
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
