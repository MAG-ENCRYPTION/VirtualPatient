export type ClinicalCase = {
  id: string
  initial_problem: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  final_diagnosis: string
  system: 'RESPIRATORY SYSTEM' | 'CARDIOVASCULAR SYSTEM'
  specialty:
    | 'Generalist'
    | 'Neurologist'
    | 'Gynecologist'
    | 'Pediatrician'
    | 'Dentist'
    | 'Ophthalmologist'
  url: string
  created_at: string
  deleted_at: string
  updated_at: string
}
