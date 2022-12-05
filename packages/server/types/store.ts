import type { IUser } from '../types/user'

export interface IState {
  user: IUser | null
  theme: 'light' | 'dark' | null
}
