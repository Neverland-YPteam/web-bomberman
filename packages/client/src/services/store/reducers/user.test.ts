import { IUserState, userReducer as reducer } from './user'

import { USER_AVATAR_UPDATE, USER_REQUEST } from '../actions/user'

const initialState: IUserState = {
  id: null,
  first_name: null,
  second_name: null,
  display_name: null,
  login: null,
  email: null,
  phone: null,
  avatar: '',
}

const user = {
  id: 123,
  first_name: 'vasya',
  second_name: 'pupkin',
  display_name: 'vpupk',
  login: 'pupkin',
  email: 'p@up.kin',
  phone: '0000000',
  avatar: '/image',
}

describe('User profile reducer', () => {
  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  test('Should handle USER_REQUEST', () => {
    expect(reducer(undefined, {
      type: USER_REQUEST,
      payload: {...user}
    }))
      .toEqual({
        ...user,
        avatar: `http://localhost/api/resources${user.avatar}`,
      })
  });

  test('Should handle USER_AVATAR_UPDATE', () => {
    expect(reducer(user, {
      type: USER_AVATAR_UPDATE,
      payload: {...user, avatar: '/image2'}
    }))
      .toEqual({
        ...user,
        avatar: `http://localhost/api/resources/image2`
      })
  })
})
