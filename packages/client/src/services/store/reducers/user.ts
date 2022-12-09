import { TUserActions } from '@services/store/actions/user'
import { API_RESOURCE_URL, IS_BROWSER } from '@utils/constants'

const preloadedState = IS_BROWSER ? window.__PRELOADED_STATE__ : null

export interface IUserState {
  id: null | number
  first_name: null | string
  second_name: null | string
  display_name: null | string
  login: null | string
  email: null | string
  phone: null | string
  avatar: string
}

const initialState: IUserState = preloadedState?.user ?? {
  id: null,
  first_name: null,
  second_name: null,
  display_name: null,
  login: null,
  email: null,
  phone: null,
  avatar: '',
}

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case 'USER_REQUEST': {
      const { avatar } = action.payload
      const avatarUrl = avatar ? `${API_RESOURCE_URL}${avatar}` : ''

      return {
        ...state,
        ...action.payload,
        avatar: avatarUrl,
      }
    }
    case 'USER_AVATAR_UPDATE': {
      const { avatar } = action.payload
      const avatarUrl = avatar ? `${API_RESOURCE_URL}${avatar}` : ''

      return { ...state, avatar: avatarUrl }
    }
    default: {
      return state
    }
  }
}
