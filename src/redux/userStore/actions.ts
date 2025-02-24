import { CREATE_USER } from './actionTypes'
import { UserStateType } from './reducer'

export type UserTypeAction = { type: string; data: any }

export const createUser = (user: UserStateType): UserTypeAction => ({
  type: CREATE_USER,
  data: {
    isConnected: user.isConnected,
    id: user.id,
    name: user.name,
    first_name: user.first_name,
    phone_number: user.phone_number,
    email: user.email,
    sex: user.sex,
    username: user.username,
    userType: user.userType,
    url: user.url,
  },
})
