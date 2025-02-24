import { customFetch } from '../../../shared/customFetch'
import { API_ROUTES } from '../../shared/ApiRoutes'

export const signIn = (username: string, password: string): Promise<any> => {
  return customFetch.post(API_ROUTES.LOGIN, { username, password })
}
