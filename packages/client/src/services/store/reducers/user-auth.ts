import { TUserAuthActions } from '@services/store/actions/user-auth'

export type TUserAuthState = {
  isUserAuth: boolean;

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,
}

const initialState: TUserAuthState = {
  isUserAuth: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
};

export const userAuthReducer = (state = initialState, actions: TUserAuthActions) => {
  switch (actions.type) {
    case 'USER_LOGIN_REQUEST': {
      return {
        ...state,
        loginRequest: true,
      }
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        loginRequest: false,
        isUserAuth: true,
      }
    }
    case 'USER_LOGIN_FAILED': {
      return {
        ...state,
        ...initialState,
        loginFailed: true
      }
    }
    default: {
      return state;
    }
  }
}
