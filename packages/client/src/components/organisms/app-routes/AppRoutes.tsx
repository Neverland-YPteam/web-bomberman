import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '@pages/auth'
import { SignupPage } from '@pages/sign-up'
import Leaderboard from '@pages/Leaderboard'

const AppRoutes = () => {
  return (
    <Routes>
      // пока тут будет авторизация
      <Route path="/" element={<AuthPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/sign-up" element={<SignupPage />} />
    </Routes>
  )
}

export default AppRoutes
