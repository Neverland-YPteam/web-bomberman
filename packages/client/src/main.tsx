// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { App } from '@organisms/app'
// import { AppThemeProvider } from '@services/AppThemeProvider'
// import { Provider } from 'react-redux'
// import { store } from '@services/store/store'
// import { startServiceWorker } from '../service-worker'
// import './styles/style.css'

// ReactDOM.createRoot(document.getElementById('App') as HTMLElement).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <AppThemeProvider>
//         <App />
//       </AppThemeProvider>
//     </Provider>
//   </React.StrictMode>
// )

// if (process.env.NODE_ENV === 'production') {
//   startServiceWorker()
// }

import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { TestApp } from '@organisms/test-app'

hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)
