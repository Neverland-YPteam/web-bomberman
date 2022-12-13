import { ILeaderboardState } from '@services/store/reducers/leaderboard'
import { leaderboardReducer as reducer } from './leaderboard'
import {
  LEADERBOARD_GET_USERS_FAILED,
  LEADERBOARD_GET_USERS_REQUEST,
  LEADERBOARD_GET_USERS_SUCCESS
} from '../actions/leaderboard'

const initialState: ILeaderboardState = {
  isRequest: false,
  isSuccess: false,
  isFailed: false,

  items: [],
}

const items = [
  {
    data: {
      id: '1',
      name: 'item1',
      avatar: 'image',
      score: 100,
    }
  },
  {
    data: {
      id: '2',
      name: 'item2',
      avatar: 'image',
      score: 200,
    }
  }
]

describe('Leaderboard reducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  })

  test('Should handle LEADERBOARD_GET_USERS_REQUEST', () => {
    expect(reducer(undefined, {type: LEADERBOARD_GET_USERS_REQUEST}))
      .toEqual({
        ...initialState,
        isRequest: true
      })
  })

  test('Should handle LEADERBOARD_GET_USERS_FAILED', () => {
    expect(reducer(undefined, {type: LEADERBOARD_GET_USERS_FAILED}))
      .toEqual({
        ...initialState,
        isFailed: true
      })
  })

  test('Should handle LEADERBOARD_GET_USERS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: LEADERBOARD_GET_USERS_SUCCESS,
      payload: items
    }))
      .toEqual({
        ...initialState,
        isSuccess: true,
        items: [
          ...items
        ]
      })
  })
})
