import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthPage } from '@pages/auth'
import { SignupPage } from '@pages/sign-up'
import Leaderboard from '@pages/Leaderboard'
import { ProfilePage } from '@pages/profile'
import { ErrorBoundary } from '@organisms/error-boundary'
import { routes } from './routes'
import { BeginGamePage } from '@pages/begin-game'
import { GamePage } from '@pages/game'
import { ProtectedRoute } from '@molecules/protected-route'

const AppRoutes = () => {
  //
  const location = useLocation()
  const state = location.state

  return (
    <ErrorBoundary>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={routes.auth.path} element={<AuthPage />} />
        <Route path={routes.signUp.path} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.profile.path} element={<ProfilePage />} />
          <Route path={routes.leaderboard.path} element={<Leaderboard />} />
          <Route path={routes.main.path} element={<BeginGamePage />} />
          <Route path={routes.game.path} element={<GamePage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes
