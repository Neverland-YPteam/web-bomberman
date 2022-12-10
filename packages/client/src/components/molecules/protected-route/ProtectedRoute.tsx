import { useSelector } from '@utils/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { IS_BROWSER } from '@utils/constants'

const ProtectedRoute = () => {
  const isSessionActive = IS_BROWSER && localStorage.getItem('Session') === 'active'
  const { isUserAuth, loginRequest } = useSelector(state => state.userAuth)
  const location = useLocation()

  if (!isUserAuth && !loginRequest && !isSessionActive) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
