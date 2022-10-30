import { combineReducers } from 'redux'
import { userReducer } from './user'
import { userRegistrationReducer } from './user-registration'
import { userAuthReducer } from './user-auth'

export const rootReducer = combineReducers({
  user: userReducer,
  userRegistration: userRegistrationReducer,
  userAuth: userAuthReducer,
})
