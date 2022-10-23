import { combineReducers } from 'redux'
import { userReducer } from '@services/store/reducers/user'
import { userRegistrationReducer } from '@services/store/reducers/user-registration'
import { userAuthReducer } from '@services/store/reducers/user-auth'
import { leaderboardReducer } from '@services/store/reducers/leaderboard'
import { otherReducer } from '@services/store/reducers/other'

export const rootReducer = combineReducers({
  user: userReducer,
  userRegistration: userRegistrationReducer,
  userAuth: userAuthReducer,
  leaderboard: leaderboardReducer,
  other: otherReducer,
})
