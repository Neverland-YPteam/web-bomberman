import { AppDispatch, AppThunk } from '../../../types/store'
import { checkResponseStatus } from '../../../utils/helpers'
import { API_URL } from '../../../utils/constants'
import { IUserState } from '../reducers/user'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_AVATAR_UPDATE = 'USER_AVATAR_UPDATE'

interface IGetUserAction {
  readonly type: typeof USER_REQUEST
  readonly payload: IUserState
}

interface IUpdateUserAvatarAction {
  readonly type: typeof USER_AVATAR_UPDATE
  readonly payload: IUserState
}

export type TUserActions = IGetUserAction | IUpdateUserAvatarAction

const enum Path {
  User = '/auth/user',
}

export const loadUser: AppThunk = () => {
  return async function(dispatch: AppDispatch) {
    await fetch(`${API_URL}${Path.User}`, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => checkResponseStatus(res))
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: USER_REQUEST,
          payload: result,
        })
      })
  }
}
