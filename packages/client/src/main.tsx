import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@organisms/app'
import './styles/index.css'
import { AppThemeProvider } from '@services/AppThemeProvider'

ReactDOM.createRoot(document.getElementById('App') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
)
