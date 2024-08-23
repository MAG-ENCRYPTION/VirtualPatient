// export const BASE_URL = 'https://virtual-patient-api.herokuapp.com/api/'
export const BASE_URL = 'http://127.0.0.1:8000/api/';

export const API_ROUTES = {
  LOGIN: `${BASE_URL}auth/login/`,
  BAYESIAN: {
    INFERE: `${BASE_URL}inference`,
  },
  VIRTUAL_PATIENT: {
    EXPERT: {
      BASE: `${BASE_URL}virtual-patient/doctor-expert/`,
      PROFILE: (id: string) => `${BASE_URL}virtual-patient/doctor-expert/${id}/`,
    },
    LEARNER: {
      BASE: `${BASE_URL}virtual-patient/doctor-apprenant/`,
      PROFILE: (id: string) => `${BASE_URL}virtual-patient/doctor-apprenant/${id}/`,
    },
    CLINICAL_CASE: {
      BASE: `${BASE_URL}virtual-patient/clinical-case/`,
      DETAIL: `${BASE_URL}virtual-patient/getclinicalcase/all`,
      DETAIL_ONE: (id: string) =>
        `${BASE_URL}virtual-patient/getclinicalcase/${id}`,
    },
    PERSONNAL_INFO: `${BASE_URL}virtual-patient/personnal-information/`,
    TYPE_PARAMETER: `${BASE_URL}virtual-patient/type-parametre/`,
    MEDICAL_PARAMETER: `${BASE_URL}virtual-patient/medical-parameter/`,
    SYMPTOM: `${BASE_URL}virtual-patient/symptom/`,
    LIFE_STYLE: {
      BASE: `${BASE_URL}virtual-patient/life-style/`,
      PHYSICAL: `${BASE_URL}virtual-patient/physical-activity/`,
      ADDICTION: `${BASE_URL}virtual-patient/addiction/`,
      TRAVEL: `${BASE_URL}virtual-patient/travel/`,
    },
    ONGOING_TREATMENT: `${BASE_URL}virtual-patient/ongoing-treatment/`,
    ANTECEDENT: {
      BASE: `${BASE_URL}virtual-patient/medical-antecedent/`,
      SURGERY: `${BASE_URL}virtual-patient/surgery/`,
      ALLERGY: `${BASE_URL}virtual-patient/allergy/`,
      DISEASE: `${BASE_URL}virtual-patient/disease/`,
      TREATMENT: `${BASE_URL}virtual-patient/treatment/`,
    },
    MEDIA: {
      BASE: `${BASE_URL}virtual-patient/media/`,
      BY_TYPE: (type: 'EXAM' | 'PHYSICAL DIAGNOSIS') =>
        `${BASE_URL}virtual-patient/media/?type=${type}`,
    },
    PHYSICAL_DIAGNOSIS: `${BASE_URL}virtual-patient/physical-diagnostic/`,
    MEDICAL_EXAMINATION: `${BASE_URL}virtual-patient/exam/`,
    GET_STAT: `${BASE_URL}virtual-patient/getStat/`,
  },
  TUTOR: {
    QUESTION: `${BASE_URL}tutor-module/response/`,
    //QUESTION: `${BASE_URL}response/`,
    INFERE_HYPOTHESIS: `${BASE_URL}expert-module/inference/`,
    EVALUATE_SCORE: `${BASE_URL}tutor-module/notate/`,
    CHECK_SYMPTOMS: `${BASE_URL}tutor-module/verifysymptoms/`,
  },
  LEARNER: {
    MODEL: `${BASE_URL}learner-module/rating/`,
    SAVE_CONSULT: `${BASE_URL}virtual-patient/save/`,
    EVALUATION_DETAIL: (id: string) =>
      `${BASE_URL}virtual-patient/getEvaluation/${id}`,
    EVALUATION_BY_LEARNER: (id: string) =>
      `${BASE_URL}virtual-patient/getEvaluationByLearner/${id}`,
    ALL_EVALUATION: `${BASE_URL}virtual-patient/getAllEvaluation`,
    FEEDBACK: `${BASE_URL}virtual-patient/feedback/`,
  },
};
