import { AppDispatch, AppThunk } from '../../../types/store'
import { API_URL } from '../../../utils/constants'
import { checkResponseStatus } from '../../../utils/helpers'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

interface IUserLoginAction {
  readonly type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccessAction {
  readonly type: typeof USER_LOGIN_SUCCESS;
}

interface IUserLoginFailedAction {
  readonly type: typeof USER_LOGIN_FAILED;
}

interface IUserLogoutAction {
  readonly type: typeof USER_LOGOUT_REQUEST;
}

interface IUserLogoutSuccessAction {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}

interface IUserLogoutFailedAction {
  readonly type: typeof USER_LOGOUT_FAILED
}

export type TUserAuthActions =
  IUserLoginAction
  | IUserLoginSuccessAction
  | IUserLoginFailedAction
  | IUserLogoutAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction

export const loginUser: AppThunk = (data: FormData) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(Object.fromEntries(data)),
    })
      .then(res => checkResponseStatus(res))
      .then(() => {
        dispatch({
          type: USER_LOGIN_SUCCESS
        })
        localStorage.setItem('Session', 'active')
      })
      .catch(() => {
        dispatch({
          type: USER_LOGIN_FAILED
        })
      })
  }
}

export const logoutUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    })
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        accept: 'application/json'
      },
    })
      .then(res => checkResponseStatus(res))
      .then(() => {
        dispatch({
          type: USER_LOGOUT_SUCCESS
        });
        localStorage.removeItem('Session')
      })
      .catch(() => {
        dispatch({
          type: USER_LOGOUT_FAILED
        })
      })
  }
}
