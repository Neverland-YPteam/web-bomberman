import { AppDispatch, AppThunk } from '@src/types/store'
import { API_URL } from '@utils/constants'
import { checkResponseStatus } from '@utils/helpers'
import { USER_LOGIN_SUCCESS } from '@services/store/actions/user-auth'

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

interface IGetRegistrationAction {
  readonly type: typeof USER_REGISTRATION_REQUEST;
}
interface IGetRegistrationSuccessAction {
  readonly type: typeof USER_REGISTRATION_SUCCESS;
  readonly payload: { id: number};
}
interface IGetRegistrationFailedAction {
  readonly type: typeof USER_REGISTRATION_FAILED;
}

export type TUserRegistrationActions =
  IGetRegistrationAction
  | IGetRegistrationSuccessAction
  | IGetRegistrationFailedAction

export const registerUser: AppThunk = (data: FormData) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST
    })
    fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(Object.fromEntries(data)),
    })
      .then(res => checkResponseStatus(res))
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: USER_REGISTRATION_SUCCESS,
          payload: result,
        })
        dispatch({
          type: USER_LOGIN_SUCCESS
        })
        localStorage.setItem('Session', 'active')
      })
      .catch(() => {
        dispatch({
          type: USER_REGISTRATION_FAILED,
        })
      })
  }
}
