import { USER_REGISTRATION_FAILED, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS } from "../actions/user-registration";
import { userRegistrationState, userRegistrationReducer as reducer } from "./user-registration";

const initialState: userRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  registrationSuccess: false,

  userId: null,
}

const user = {
  id: 1001
}

describe('Registration reducer', () => {
  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState)
  })

  test('Should handle USER_REGISTRATION_REQUEST', () => {
    expect(reducer(undefined, {
      type: USER_REGISTRATION_REQUEST
    }))
      .toEqual({
        ...initialState,
        registrationRequest: true,
      })
  })

  test('Should handle USER_REGISTRATION_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_REGISTRATION_SUCCESS,
      payload: user
    }))
      .toEqual({
        ...initialState,
        registrationSuccess: true,
        userId: user.id
      })
  })

  test('Should handle USER_REGISTRATION_FAILED', () => {
    expect(reducer(undefined, {
      type: USER_REGISTRATION_FAILED
    }))
      .toEqual({
        ...initialState,
        registrationFailed: true,
      })
  })
})
