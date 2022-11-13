import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from 'client/src/components/organisms/app'
import { Provider } from 'react-redux'
import { store } from '@services/store/store'
import { AppThemeProvider } from '@services/AppThemeProvider'

export async function SSRender (url: string | Partial<Location>) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
      </StaticRouter>
    </Provider>
  )
}
