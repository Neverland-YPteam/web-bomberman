import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '@pages/landing'
import { AuthPage } from '@pages/auth'
import { SignupPage } from '@pages/sign-up'
import { LeaderboardPage } from '@pages/leaderboard'
import { ProfilePage } from '@pages/profile'
import { ErrorBoundary } from '@organisms/error-boundary'
import { routes } from './routes'
import { BeginGamePage } from '@pages/begin-game'
import { GamePage } from '@pages/game'
import { ProtectedRoute } from '@molecules/protected-route'
import { EndGamePage } from '@pages/end-game'
import { NotFoundPage } from '@pages/not-found'

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={routes.landing.path} element={<LandingPage />} />
        <Route path={routes.auth.path} element={<AuthPage />} />
        <Route path={routes.signUp.path} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.profile.path} element={<ProfilePage />} />
          <Route path={routes.leaderboard.path} element={<LeaderboardPage />} />
          <Route path={routes.main.path} element={<BeginGamePage />} />
          <Route path={routes.game.path} element={<GamePage />} />
          <Route path={routes.score.path} element={<EndGamePage />} />
        </Route>
        <Route path={routes.notFound.path} element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes
