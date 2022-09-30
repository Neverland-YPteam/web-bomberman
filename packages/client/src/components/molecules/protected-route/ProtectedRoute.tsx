import React from 'react'
import { useSelector } from '@utils/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isUserAuth, loginRequest } = useSelector(state => state.userAuth)
  const location = useLocation()

  if (!isUserAuth && !loginRequest) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
