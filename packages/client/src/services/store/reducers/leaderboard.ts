import { TLeaderboardActions } from '@services/store/actions/leaderboard'
import { ILeaderboardItem } from '@src/types/leaderboard'

export interface ILeaderboardState {
  isRequest: boolean
  isSuccess: boolean
  isFailed: boolean

  items: ILeaderboardItem[]
}

const initialState: ILeaderboardState = {
  isRequest: false,
  isSuccess: false,
  isFailed: false,

  items: [],
}

export const leaderboardReducer = (state = initialState, action: TLeaderboardActions) => {
  switch (action.type) {
    case 'LEADERBOARD_GET_USERS_REQUEST': {
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false,
      }
    }
    case 'LEADERBOARD_GET_USERS_SUCCESS': {
      return {
        ...state,
        isRequest: false,
        isSuccess: true,

        items: action.payload
      }
    }
    case 'LEADERBOARD_GET_USERS_FAILED': {
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      }
    }
    default: {
      return state
    }
  }
}
