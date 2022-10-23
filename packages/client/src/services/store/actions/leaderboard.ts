import { AppDispatch, AppThunk } from '@src/types/store'
import { checkResponseStatus } from '@utils/helpers'
import { API_URL, TEAM_NAME, RATING_FIELD_NAME } from '@utils/constants'
import { ILeaderboardItemData, ILeaderboardItem } from '@src/types/leaderboard'

export const LEADERBOARD_GET_USERS_REQUEST = 'LEADERBOARD_GET_USERS_REQUEST'
export const LEADERBOARD_GET_USERS_SUCCESS = 'LEADERBOARD_GET_USERS_SUCCESS'
export const LEADERBOARD_GET_USERS_FAILED = 'LEADERBOARD_GET_USERS_FAILED'

const enum Path {
  AddUser = '/leaderboard',
  GetUsers = '/leaderboard/{teamName}',
}
interface ILeaderboardAddUserRequest {
  data: ILeaderboardItemData
  ratingFieldName: typeof RATING_FIELD_NAME
  teamName: typeof TEAM_NAME
}

interface ILeaderboardGetUsersParams {
  cursor: number
  limit: number
}

interface ILeaderboardGetUsersRequest {
  ratingFieldName: typeof RATING_FIELD_NAME
  cursor: number
  limit: number
}

interface ILeaderboardGetUsersAction {
  readonly type: typeof LEADERBOARD_GET_USERS_REQUEST
}

interface ILeaderboardGetUsersSuccessAction {
  readonly type: typeof LEADERBOARD_GET_USERS_SUCCESS
  readonly payload: ILeaderboardItem[]
}

interface ILeaderboardGetUsersFailedAction {
  readonly type: typeof LEADERBOARD_GET_USERS_FAILED
}

export type TLeaderboardActions =
  ILeaderboardGetUsersAction
  | ILeaderboardGetUsersSuccessAction
  | ILeaderboardGetUsersFailedAction

export const addLeaderboardUser: AppThunk = (data: ILeaderboardItemData) => {
  return function() {
    const requestData: ILeaderboardAddUserRequest = {
      data,
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    }

    fetch(`${API_URL}${Path.AddUser}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(requestData),
    })
  }
}

export const getLeaderboardUsers: AppThunk = ({ cursor, limit }: ILeaderboardGetUsersParams) => {
  return function(dispatch: AppDispatch) {
    const requestData: ILeaderboardGetUsersRequest = {
      ratingFieldName: RATING_FIELD_NAME,
      cursor,
      limit,
    }

    dispatch({
      type: LEADERBOARD_GET_USERS_REQUEST
    })

    fetch(`${API_URL}${Path.GetUsers.replace('{teamName}', TEAM_NAME)}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(requestData),
    })
      .then((result) => checkResponseStatus(result))
      .then((result) => result.json())
      .then((result) => {
        dispatch({
          type: LEADERBOARD_GET_USERS_SUCCESS,
          payload: result,
        })
      })
      .catch(() => {
        dispatch({
          type: LEADERBOARD_GET_USERS_FAILED,
        })
      })
  }
}
