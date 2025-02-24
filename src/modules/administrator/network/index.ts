import { ExpertPhysician } from '../../../entities/Doctor'
import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'

export const getExpertPhysicians = (): Promise<ExpertPhysician[]> => {
  return customFetch.get(API_ROUTES.VIRTUAL_PATIENT.EXPERT.BASE)
}

export const createExpertPhysician = (expert: any): Promise<any> => {
  return customFetch.post(API_ROUTES.VIRTUAL_PATIENT.EXPERT.BASE, expert)
}
