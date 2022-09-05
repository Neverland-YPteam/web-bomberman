import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '@pages/auth'

const AppRoutes = () => {
  return (
    <Routes>
      // пока тут будет авторизация
      <Route path="/" element={<AuthPage />} />
    </Routes>
  )
}

export default AppRoutes
