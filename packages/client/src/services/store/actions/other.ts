import { AppDispatch, AppThunk } from '@src/types/store'

export const SCORE_UPDATE = 'SCORE_UPDATE'

interface IUpdateScore {
  readonly type: typeof SCORE_UPDATE
  readonly payload: number
}

export type TOtherActions = IUpdateScore

export const updateScore: AppThunk = (score: number) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: SCORE_UPDATE,
      payload: score,
    })
  }
}
