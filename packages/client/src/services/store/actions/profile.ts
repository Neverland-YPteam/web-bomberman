import { AppDispatch, AppThunk } from '@src/types/store'
import { checkResponseStatus } from '@utils/helpers'
import { API_URL } from '@utils/constants'
import { USER_AVATAR_UPDATE } from '@services/store/actions/user'

const enum Path {
  Avatar = '/user/profile/avatar',
  Profile = '/user/profile',
  Password = '/user/password',
}

export const updateAvatar: AppThunk = (data: FormData) => {
  return function(dispatch: AppDispatch) {
    fetch(`${API_URL}${Path.Avatar}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {},
      credentials: 'include',
      body: data,
    })
    .then(res => checkResponseStatus(res))
    .then(res => res.json())
    .then(result => {
      dispatch({
        type: USER_AVATAR_UPDATE,
        payload: result,
      })
    })
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

export const updatePassword: AppThunk = (data: FormData) => {
  return function() {
    fetch(`${API_URL}${Path.Password}`, {
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
