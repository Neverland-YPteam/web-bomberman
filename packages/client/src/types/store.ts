import { store } from '@services/store/store'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { TUserActions } from '@services/store/actions/user'
import { TUserRegistrationActions } from '@services/store/actions/user-registration'
import { TUserAuthActions } from '@services/store/actions/user-auth'
import { TLeaderboardActions } from '@services/store/actions/leaderboard'

export type TApplicationActions =
  TUserActions
  | TUserRegistrationActions
  | TUserAuthActions
  | TLeaderboardActions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>
