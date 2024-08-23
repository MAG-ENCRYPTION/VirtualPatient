import { Allergy } from '../../../entities/Allergy'
import { ClinicalCase } from '../../../entities/ClinicalCase'
import { Disease } from '../../../entities/Disease'
import { Doctor } from '../../../entities/Doctor'
import { Exam } from '../../../entities/Exam'
import { Feedback } from '../../../entities/Feedback'
import {
  Addiction,
  LifeStyle,
  PhysicalActivity,
  Travel,
} from '../../../entities/LifeStyle'
import { Media } from '../../../entities/Media'
import { MedicalAntecedent } from '../../../entities/MedicalAntecedent'
import {
  MedicalParameter,
  TypeParameter,
} from '../../../entities/MedicalParameter'
import { PersonalInfo } from '../../../entities/PersonalInfo'
import { PhysicalDiagnosis } from '../../../entities/PhysicalDiagnosis'
import { Surgery } from '../../../entities/Surgery'
import { Symptom } from '../../../entities/Symptom'
import { TotalClinicalCase } from '../../../entities/TotalClinicalCase'
import { Treatment } from '../../../entities/Treatment'
import { TreatmentInProgress } from '../../../entities/TreatmentInProgress'
import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'

export const createClinicalCase = (
  clinicalCase: any,
): Promise<ClinicalCase> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.CLINICAL_CASE.BASE,
    clinicalCase,
  )
}

export const createPersonnalInfo = (
  personnalInfo: any,
): Promise<PersonalInfo> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.PERSONNAL_INFO,
    personnalInfo,
  )
}

export const updateDoctorProfile = (id: string, doctor:Doctor): Promise<Doctor> => {
  return customFetch.put(API_ROUTES.VIRTUAL_PATIENT.EXPERT.PROFILE(id), doctor);
};

export const getDoctorProfile = (id: string ): Promise<Doctor> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.EXPERT.PROFILE(id));
};

export const getTypeParameters = (): Promise<TypeParameter[]> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.TYPE_PARAMETER)
}

export const createMedicalParameter = (
  params: any,
): Promise<MedicalParameter> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.MEDICAL_PARAMETER, params)
}

export const createSymptom = (symptom: any): Promise<Symptom> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.SYMPTOM, symptom)
}

export const createLifeStyle = (lifeStyle: any): Promise<LifeStyle> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.LIFE_STYLE.BASE, lifeStyle)
}

export const createAddication = (addiction: any): Promise<Addiction> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.LIFE_STYLE.ADDICTION,
    addiction,
  )
}

export const createPhysicalActivity = (
  activity: any,
): Promise<PhysicalActivity> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.LIFE_STYLE.PHYSICAL,
    activity,
  )
}

export const createTrip = (trip: any): Promise<Travel> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.LIFE_STYLE.TRAVEL, trip)
}

export const createOngoingTreatment = (
  treatment: any,
): Promise<TreatmentInProgress> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ONGOING_TREATMENT,
    treatment,
  )
}

export const createAntecedent = (
  antecedent: any,
): Promise<MedicalAntecedent> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ANTECEDENT.BASE,
    antecedent,
  )
}

export const createSurgery = (surgery: any): Promise<Surgery> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ANTECEDENT.SURGERY,
    surgery,
  )
}

export const createAllergy = (allergy: any): Promise<Allergy> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ANTECEDENT.ALLERGY,
    allergy,
  )
}

export const createDisease = (disease: any): Promise<Disease> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ANTECEDENT.DISEASE,
    disease,
  )
}

export const createTreatment = (treatment: any): Promise<Treatment> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.ANTECEDENT.TREATMENT,
    treatment,
  )
}

export const getMediaFiles = (
  type: 'EXAM' | 'PHYSICAL DIAGNOSIS',
): Promise<Media[]> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.MEDIA.BY_TYPE(type))
}

export const createPhysicalDiagnosis = (
  diagnosis: any,
): Promise<PhysicalDiagnosis> => {
  return customFetch.post(
    API_ROUTES.VIRTUAL_PATIENT.PHYSICAL_DIAGNOSIS,
    diagnosis,
  )
}

export const createExamination = (exam: any): Promise<Exam> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.MEDICAL_EXAMINATION, exam)
}

export const getClinicalCases = (): Promise<ClinicalCase[]> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.CLINICAL_CASE.DETAIL)
}

export const getClinicalCase = (id: string): Promise<TotalClinicalCase[]> => {
  return customFetch.get(
    API_ROUTES.VIRTUAL_PATIENT.CLINICAL_CASE.DETAIL_ONE(id),
  )
}

export const getStats = (): Promise<any> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.GET_STAT)
}

export const getLearners = (): Promise<Doctor[]> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.LEARNER.BASE)
}

export const createFeedback = (feedback: any): Promise<Feedback> => {
  return customFetch.post(API_ROUTES.LEARNER.FEEDBACK, feedback)
}

export const verifySymptoms = (
  caseId: string,
  symptoms: string[],
): Promise<Feedback> => {
  return customFetch.post(API_ROUTES.TUTOR.CHECK_SYMPTOMS, {
    clinical_case: caseId,
    symptoms,
  })
}
