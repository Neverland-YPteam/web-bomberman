import { http, API_YANDEX_URL_PATH } from './http'
import type { IUser } from '../types/user'

export const getUser = async (cookie = ''): Promise<IUser | null> => {
  console.log('\nПЫТАЕМСЯ ПОЛУЧИТЬ ЮЗЕРА') // @TODO
  console.log(`${API_YANDEX_URL_PATH}/auth/user`) // @TODO

  const cookieString = [...Object.entries(cookie)]
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')

  try {
    const { data } = await http(`${API_YANDEX_URL_PATH}/auth/user`, {
      method: 'get',
      headers: {
        Cookie: cookieString,
      },
    })

    return data
  } catch (error) {
    console.log('\nОШИБКА ПРИ ПОЛУЧЕНИИ ЮЗЕРА') // @TODO
    return null
  }
}
