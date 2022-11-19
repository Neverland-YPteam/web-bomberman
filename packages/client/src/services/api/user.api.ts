import { API_LOCAL_USER_URL } from '@utils/constants'

type TTheme = 'light' | 'dark'

export interface IUserCreateRequest {
  id: number
  theme: TTheme
}

export interface IUserReadRequest {
  id: number
}

export interface IUserUpdateRequest {
  id: number
  theme?: TTheme
}

class UserAPI {
  create = async ({ id, theme }: IUserCreateRequest) => {
    const response = await fetch(`${API_LOCAL_USER_URL}/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme })
    })

    const [user] = await response.json()
    return user
  }

  find = async ({ id }: IUserReadRequest) => {
    const response = await fetch(`${API_LOCAL_USER_URL}/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    try {
      return await response.json()
    } catch (error) {
      return null
    }
  }

  update = async ({ id, theme }: IUserUpdateRequest) => {
    return await fetch(`${API_LOCAL_USER_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme })
    })
  }
}

export default new UserAPI()
