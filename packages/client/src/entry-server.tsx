import { renderToString } from 'react-dom/server'
import { TestApp } from '@organisms/test-app'

export const render = () => renderToString(<TestApp />)
