export type Doctor = {
  id: string;
  name: string;
  first_name: string;
  phone_number: string;
  address: string;
  city: string;
  cni: string;
  sex: 'M' | 'F';
  specialty:
    | 'Generalist'
    | 'Neurologist'
    | 'Gynecologist'
    | 'Pediatrician'
    | 'Dentist'
    | 'Ophthalmologist';
  year_of_birth: Date;
  place_of_birth: string;
  nationality: string;
  email: string;
  username: string;
  password: string;
  url: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};

export type LearnerPhysician = {
  id: string;
  name: string;
  first_name: string;
  phone_number: string;
  address: string;
  city: string;
  cni: string;
  sex: 'M' | 'F';
  specialty:
    | 'Generalist'
    | 'Neurologist'
    | 'Gynecologist'
    | 'Pediatrician'
    | 'Dentist'
    | 'Ophthalmologist';
  year_of_birth: string;
  place_of_birth: string;
  nationality: string;
  email: string;
  username: string;
  password: string;
  experience: 'Beginner' | 'Intermediate' | 'Expert';
  knowledge_level: number;
  url: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};

export type ExpertPhysician = {
  id: string;
  name: string;
  first_name: string;
  phone_number: string;
  address: string;
  city: string;
  cni: string;
  sex: 'M' | 'F';
  specialty:
    | 'Generalist'
    | 'Neurologist'
    | 'Gynecologist'
    | 'Pediatrician'
    | 'Dentist'
    | 'Ophthalmologist';
  year_of_birth: string;
  place_of_birth: string;
  nationality: string;
  email: string;
  username: string;
  password: string;
  grade: 'GP' | 'SP' | 'Prof';
  url: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};
