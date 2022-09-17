import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '@pages/auth'
import { SignupPage } from '@pages/sign-up'
import Leaderboard from '@pages/Leaderboard'
import { ProfilePage } from '@pages/profile'
import { ErrorBoundary } from '@organisms/error-boundary'
import { routes } from './routes'

const {
  auth,
  signUp,
  profile,
  leaderboard,
} = routes

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={auth.path} element={<AuthPage />} />
        <Route path={signUp.path} element={<SignupPage />} />
        <Route path={profile.path} element={<ProfilePage />} />
        <Route path={leaderboard.path} element={<Leaderboard />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AppRoutes