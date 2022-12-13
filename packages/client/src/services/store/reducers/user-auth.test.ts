import { TUserAuthState, userAuthReducer as reducer } from '@services/store/reducers/user-auth'
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_OAUTH_SUCCESS
} from '@services/store/actions/user-auth'

const initialState: TUserAuthState = {
  isUserAuth: false,
  isOAuth: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
}

describe('User auth reducer', () => {
  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState)
  })

  test('Should handle USER_LOGIN_REQUEST', () => {
    expect(reducer(undefined, {
      type: USER_LOGIN_REQUEST
    }))
      .toEqual({
        ...initialState,
        loginRequest: true
      })
  })

  test('Should handle USER_LOGIN_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_LOGIN_SUCCESS
    }))
      .toEqual({
        ...initialState,
        isUserAuth: true
      })
  })

  test('Should handle USER_LOGIN_FAILED', () => {
    expect(reducer(undefined, {
      type: USER_LOGIN_FAILED
    }))
      .toEqual({
        ...initialState,
        loginFailed: true
      })
  })

  test('Should handle USER_LOGOUT_REQUEST', () => {
    expect(reducer(undefined, {
      type: USER_LOGOUT_REQUEST
    }))
      .toEqual({
        ...initialState,
        logoutRequest: true
      })
  })

  test('Should handle USER_LOGOUT_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_LOGOUT_SUCCESS
    }))
      .toEqual({
        ...initialState,
      })
  })

  test('Should handle USER_LOGOUT_FAILED', () => {
    expect(reducer(undefined, {
      type: USER_LOGOUT_FAILED
    }))
      .toEqual({
        ...initialState,
        logoutFailed: true
      })
  })

  test('Should handle USER_OAUTH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_OAUTH_SUCCESS
    }))
      .toEqual({
        ...initialState,
        isUserAuth: true,
        isOAuth: true,
      })
  })
})
