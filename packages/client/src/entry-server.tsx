import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { store } from '@services/store/store'
import { App } from '@organisms/app'

interface IRenderProps {
  path: string
}

export const render = ({ path }: IRenderProps) => renderToString(
  <Provider store={store}>
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  </Provider>
)
