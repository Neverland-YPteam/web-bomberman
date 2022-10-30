import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '../../pages/auth'
import { SignupPage } from '../../pages/sign-up'
import Leaderboard from '../../pages/Leaderboard'
import { ProfilePage } from '../../pages/profile'
import { ErrorBoundary } from '../error-boundary'
import { routes } from './routes'
import { BeginGamePage } from '../../pages/begin-game'
import { GamePage } from '../../pages/game'
import { ProtectedRoute } from '../../molecules/protected-route'
import { EndGamePage } from '../../pages/end-game'

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={routes.auth.path} element={<AuthPage />} />
        <Route path={routes.signUp.path} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.profile.path} element={<ProfilePage />} />
          <Route path={routes.leaderboard.path} element={<Leaderboard />} />
          <Route path={routes.main.path} element={<BeginGamePage />} />
          <Route path={routes.game.path} element={<GamePage />} />
          <Route path={routes.score.path} element={<EndGamePage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes
