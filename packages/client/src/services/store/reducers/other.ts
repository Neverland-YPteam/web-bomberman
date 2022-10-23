import { TOtherActions } from '@services/store/actions/other'

export interface IOtherState {
  score: null | number
}

const initialState: IOtherState = {
  score: null
}

export const otherReducer = (state = initialState, action: TOtherActions) => {
  switch (action.type) {
    case 'SCORE_UPDATE': {
      return {
        ...state,
        score: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
