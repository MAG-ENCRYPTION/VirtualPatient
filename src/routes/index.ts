export const ROUTES = {
  HOME_PAGE: '/',
  LOGIN: '/signin',
  REGISTER: '/signup',
  EXPERT: {
    DASHBOARD: '/expert/dashboard',
    LEARNERS: '/expert/learners',
    CASES: '/expert/cases',
    NEW_CASE: '/expert/cases/new',
    DETAIL_CASE: '/expert/cases/detail',
    PROFILE: '/expert/profile',
    EVALUATION: '/expert/evaluation',
    DETAIL_EVALUATION: '/expert/evaluation/report',
    FEEDBACK: '/expert/feedback'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EXPERTS: '/admin/experts',
    NEW_EXPERT: '/admin/experts/new',
    PROFILE: '/admin/profile',
  },
  LEARNERS: {
    DASHBOARD: '/learner/dashboard',
    EVALUATION: '/learner/evaluation',
    FEEDBACK: '/learner/feedback',
    PROFILE: '/learner/profile',
    SPECIALITIES: '/learner/specialities',
    CONSULTATION: (training: string) => `/learner/consultation/${training}`,
    CONSULT_REPORT: (evaluation: string) =>
      `/learner/consultation-report/${evaluation}`,
  },
}
