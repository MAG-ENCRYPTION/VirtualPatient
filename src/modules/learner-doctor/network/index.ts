import { Question } from '../../../entities/tutor/QuestionTuto'
import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'
import {LearnerPhysician} from "../../../entities/Doctor";

export const askQuestion = (
  id: string,
  question: string,
): Promise<Question> => {
  return customFetch.post(API_ROUTES.TUTOR.QUESTION, {
    clinical_case: id,
    question,
  })
}

export const infereHypothesis = (hypothesis: any): Promise<any> => {
  return customFetch.post(API_ROUTES.TUTOR.INFERE_HYPOTHESIS, hypothesis)
}

export const updateLearnerModel = (
  userId: string,
  systems: string[],
  reelDiagnosis: string,
  symptoms: string[],
  diagnosisStatus: boolean,
) => {
  return customFetch.post(API_ROUTES.LEARNER.MODEL, {
    status: diagnosisStatus,
    learner: userId,
    system: systems,
    disease: reelDiagnosis,
    symptoms: symptoms,
  })
}

export const calculateScore = (
  userId: string,
  symptoms: string[],
  clinicalCaseId: string,
  exams: string[],
  procedure: boolean,
  final_diagnostic: boolean,
) => {
  return customFetch.post(API_ROUTES.TUTOR.EVALUATE_SCORE, {
    learner: userId,
    clinical_case: clinicalCaseId,
    symptoms,
    exams,
    final_diagnostic,
    procedure,
  })
}

export const saveConsultation = (consultationData: any) => {
  return customFetch.post(API_ROUTES.LEARNER.SAVE_CONSULT, consultationData)
}

export const checkConsultationProcedure = (sequence: string) => {
  let regex = new RegExp('^(12|3){2}45?6$')
  return regex.test(sequence)
}

export const getDetailEvaluation = (id: string) => {
  return customFetch.get(API_ROUTES.LEARNER.EVALUATION_DETAIL(id))
}

export const getEvaluationByLearner = (id: string) => {
  return customFetch.get(API_ROUTES.LEARNER.EVALUATION_BY_LEARNER(id))
}

export const getAllEvaluation = () => {
  return customFetch.get(API_ROUTES.LEARNER.ALL_EVALUATION)
}

export const getLearnerProfile = (userId: string): Promise<LearnerPhysician> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.LEARNER.PROFILE(userId));
};

export const updateLearnerProfile = (userId: string, learnerData: LearnerPhysician): Promise<void> => {
  return customFetch.put(API_ROUTES.VIRTUAL_PATIENT.LEARNER.PROFILE(userId), learnerData);
};
