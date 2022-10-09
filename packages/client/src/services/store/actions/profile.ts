import { AppThunk } from '@src/types/store'
import { API_URL, API_RESOURCE_URL } from '@utils/constants'

const enum Path {
  User = '/auth/user',
  Profile = '/user/profile',
  Avatar = '/user/profile/avatar',
}

export const loadProfile: AppThunk = () => {
  return async function() {
    const response = await fetch(`${API_URL}${Path.User}`, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    })

    const userData = await response.json()
  }
}

export const updateProfile: AppThunk = (data: FormData) => {
  return function() {
    fetch(`${API_URL}${Path.Profile}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(Object.fromEntries(data)),
    })
  }
}

export const updateAvatar: AppThunk = (data: FormData) => {
  return function() {
    fetch(`${API_URL}${Path.Avatar}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {},
      credentials: 'include',
      body: data,
    })
  }
}
