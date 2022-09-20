import { combineReducers } from 'redux'
import { userRegistrationReducer } from '@services/store/reducers/user-registration'
import { userAuthReducer } from '@services/store/reducers/user-auth'

export const rootReducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userAuth: userAuthReducer,
})
