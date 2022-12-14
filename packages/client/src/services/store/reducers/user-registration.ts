import { TUserRegistrationActions } from '@services/store/actions/user-registration'

export interface userRegistrationState {
  registrationRequest: boolean;
  registrationFailed: boolean;
  registrationSuccess: boolean;

  userId: number | null;
}

const initialState: userRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  registrationSuccess: false,

  userId: null,
}

export const userRegistrationReducer = (state = initialState, action: TUserRegistrationActions) => {
  switch (action.type) {
    case 'USER_REGISTRATION_REQUEST': {
      return {
        ...state,
        registrationRequest: true,
      }
    }
    case 'USER_REGISTRATION_SUCCESS': {
      return {
        ...state,
        registrationRequest: false,
        registrationSuccess: true,

        userId: action.payload.id
      }
    }
    case 'USER_REGISTRATION_FAILED': {
      return {
        ...state,
        ...initialState,
        registrationFailed: true
      }
    }
    default: {
      return state;
    }
  }
}
