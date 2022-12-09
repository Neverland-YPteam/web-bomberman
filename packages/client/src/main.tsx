import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@services/store/store'
import { IS_PROD, IS_BROWSER } from '@utils/constants'
import { startServiceWorker } from '../service-worker'
import { App } from '@organisms/app'
import './styles/style.css'

hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

if (IS_PROD && IS_BROWSER) {
  startServiceWorker()
}
