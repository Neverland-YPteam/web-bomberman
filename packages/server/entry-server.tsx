import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from 'client/src/components/organisms/app'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

import { rootReducer } from 'client/src/services/store/reducers'

export async function SSRender (url: string | Partial<Location>) {
  const store = createStore(rootReducer)

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    // </Provider>
  )
}
