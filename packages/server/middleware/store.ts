import type { NextFunction, Request, Response } from 'express'
import type { IState } from '../types/store'
import type { IRequest } from '../types/request'

export default (req: Request, _res: Response, next: NextFunction) => {
  const initialState: IState = {
    user: null,
    theme: null,
  }

  ;(req as IRequest).initialState = initialState

  next()
}
