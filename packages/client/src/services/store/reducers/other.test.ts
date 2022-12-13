import { IOtherState, otherReducer as reducer } from '@services/store/reducers/other'
import { SCORE_UPDATE } from '@services/store/actions/other'

const initialState: IOtherState = {
  score: null
}

const score = 230

describe('Other reducer', () => {
  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState)
  })

  test('Should handle SCORE_UPDATE', () => {
    expect(reducer(undefined, {
      type: SCORE_UPDATE,
      payload: score
    }))
      .toEqual({
        ...initialState,
        score
      })
  })
})
