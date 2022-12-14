import { TUserAuthActions } from '@services/store/actions/user-auth'
import { IS_BROWSER } from '@utils/constants'

const preloadedState = IS_BROWSER ? window.__PRELOADED_STATE__ : null

export type TUserAuthState = {
  isUserAuth: boolean;
  isOAuth: boolean

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,
}

const initialState: TUserAuthState = {
  isUserAuth: !!preloadedState?.user,
  isOAuth: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
}

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
        isOAuth: false,
      }
    }
    case 'USER_LOGIN_FAILED': {
      return {
        ...state,
        ...initialState,
        loginFailed: true
      }
    }
    case 'USER_LOGOUT_REQUEST': {
      return {
        ...state,
        logoutRequest: true,
      }
    }
    case 'USER_LOGOUT_SUCCESS': {
      return {
        ...state,
        logoutRequest: false,
        isUserAuth: false,
      }
    }
    case 'USER_LOGOUT_FAILED': {
      return {
        ...state,
        ...initialState,
        logoutFailed: true
      }
    }
    case 'USER_OAUTH_SUCCESS': {
      return {
        ...state,
        loginRequest: false,
        isUserAuth: true,
        isOAuth: true,
      }
    }
    default: {
      return state;
    }
  }
}
