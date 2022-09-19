import { combineReducers } from 'redux'
import { userRegistrationReducer } from '@services/store/reducers/user-registration'

export const rootReducer = combineReducers({
  userRegistration: userRegistrationReducer,
})
