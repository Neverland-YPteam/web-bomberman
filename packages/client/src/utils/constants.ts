export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_BROWSER = typeof window !== 'undefined'

const HOST_ORIGIN = IS_PROD ? location.origin : 'https://ya-praktikum.tech'
const HOST = IS_BROWSER ? HOST_ORIGIN : ''
const API_SUFFIX = IS_PROD ? '/api' : '/api/v2'

export const API_URL = `${HOST}${API_SUFFIX}`
export const API_RESOURCE_URL = `${API_URL}/resources`

export const API_LOCAL_BASE_URL = IS_PROD ? location.origin : `http://localhost:${__SERVER_PORT__}`
export const API_LOCAL_USER_URL = `${API_LOCAL_BASE_URL}/user`

export const OAUTH_YANDEX_AUTHORIZE_URL = `https://oauth.yandex.ru/authorize?response_type=code`
export const OAUTH_REDIRECT_URI = IS_PROD ? location.origin : `http://localhost:3000`

export const TEAM_NAME = 'bomberman'
export const RATING_FIELD_NAME = 'score'
