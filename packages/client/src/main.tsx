import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@organisms/app'
import './styles/index.css'
import { AppThemeProvider } from '@services/AppThemeProvider'
import { Provider } from 'react-redux'
import { store } from '@services/store/store'

ReactDOM.createRoot(document.getElementById('App') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>
)
