import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { UserStateType } from '../../redux/userStore/reducer'

export const ProtectedRoutes = ({
  children,
  authorization,
}: {
  children: ReactNode
  authorization: 'LEARNER' | 'EXPERT' | 'ADMIN'
}) => {
  const user: UserStateType = useSelector(
    (state: any) => state.userReducer,
  ).user

  if (!user.isConnected) {
    return <Navigate to='/not-connected' replace />
  } else if (user.userType === authorization) {
    return <>{children}</>
  } else {
    return <Navigate to='/unauthorized' replace />
  }
}
