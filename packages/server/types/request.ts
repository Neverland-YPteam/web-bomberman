import type { Request } from 'express'
import type { IState } from '../types/store'

export interface IRequest extends Request {
  authMiddlewareStatus: 200 | 401
  initialState: IState
}
