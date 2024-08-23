import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'

export const createLearner = (learner: any): Promise<any> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.LEARNER.BASE, learner)
}
