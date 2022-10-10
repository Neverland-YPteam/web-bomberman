import { combineReducers } from 'redux'
import { userReducer } from '@services/store/reducers/user'
import { userRegistrationReducer } from '@services/store/reducers/user-registration'
import { userAuthReducer } from '@services/store/reducers/user-auth'

export const rootReducer = combineReducers({
  user: userReducer,
  userRegistration: userRegistrationReducer,
  userAuth: userAuthReducer,
})
