import { loadUser } from '@services/store/actions/user'
import { API_URL, OAUTH_REDIRECT_URI, OAUTH_YANDEX_AUTHORIZE_URL } from '@utils/constants'
import { USER_OAUTH_SUCCESS } from '@services/store/actions/user-auth'

const enum Path {
  AppId = '/oauth/yandex/service-id',
  SignIn = '/oauth/yandex',
}

interface IRequestOAuthData {
  code: string
  redirect_uri: string
}

export const getOAuthYandexAppId = async () => {
  const url = new URL(`${API_URL}${Path.AppId}`)

  url.searchParams.set('redirect_uri', OAUTH_REDIRECT_URI)

  const response = await fetch(url)
  const json = await response.json()

  return json
}

export const getOAuthYandexUrl = (id: string) => {
  const url = new URL(OAUTH_YANDEX_AUTHORIZE_URL)

  url.searchParams.set('client_id', id)
  url.searchParams.set('redirect_uri', OAUTH_REDIRECT_URI)

  return url
}

export const requestOAuth = async (code: string) => {
  const authData: IRequestOAuthData = {
    code,
    redirect_uri: OAUTH_REDIRECT_URI,
  }

  return await fetch(`${API_URL}${Path.SignIn}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(authData),
  })
}

export const tryOAuth = async (code: string, dispatch: any) => {
  const { status } = await requestOAuth(code)

  if (status === 200) {
    localStorage.setItem('Session', 'active')

    dispatch({
      type: USER_OAUTH_SUCCESS
    })

    dispatch(loadUser())
  }
}
