import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@organisms/app'
import './normalize.css'
import './index.css'
import { AppThemeProvider } from '@services/AppThemeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
)
