import { AppDispatch, AppThunk } from '@src/types/store'
import { API_URL } from '@utils/constants'
import { checkResponseStatus } from '@utils/helpers'
import { snackbar } from '@utils/snackbar'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_OAUTH_SUCCESS = 'USER_OAUTH_SUCCESS';

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

interface IUserOAuthSuccessAction {
  readonly type: typeof USER_OAUTH_SUCCESS
}

export type TUserAuthActions =
  IUserLoginAction
  | IUserLoginSuccessAction
  | IUserLoginFailedAction
  | IUserLogoutAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction
  | IUserOAuthSuccessAction

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
        snackbar.success('Вы успешно авторизовались')
      })
      .catch(() => {
        dispatch({
          type: USER_LOGIN_FAILED
        })
        snackbar.error('Не удалось авторизоваться')
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
        snackbar.success('Вы успешно вышли из аккаунта')
      })
      .catch(() => {
        dispatch({
          type: USER_LOGOUT_FAILED
        })
        snackbar.error('Не удалось выйти из аккаунта')
      })
  }
}
