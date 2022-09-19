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

