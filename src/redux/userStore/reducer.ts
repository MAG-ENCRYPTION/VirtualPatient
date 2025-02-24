import { UserTypeAction } from './actions'
import { CREATE_USER } from './actionTypes'

export type UserStateType = {
  isConnected: boolean
  id: string
  name: string
  first_name: string
  phone_number: string
  email: string
  sex: string
  username: string
  userType: string
  url: string
}
const INITIAL_STORE: UserStateType = {
  isConnected: false,
  id: '',
  name: '',
  first_name: '',
  phone_number: '',
  email: '',
  sex: '',
  username: '',
  userType: '',
  url: '',
}

export const userReducer = (state = INITIAL_STORE, action: UserTypeAction) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        user: action.data,
      }
    default:
      return state
  }
}
