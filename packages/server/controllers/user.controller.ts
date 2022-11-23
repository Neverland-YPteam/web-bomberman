import type { Request, Response, NextFunction } from 'express'
import type { BaseRESTService } from './base.controller'
import { User } from '../models'

class UserController implements BaseRESTService {
  public create = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params
    const { theme } = body

    try {
      const user = await User.findOrCreate({
        where: { id },
        defaults: { theme }
      })
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }

  public find = async ({ params }: Request, res: Response, next: NextFunction) => {
    const { id } = params

    try {
      const user = await User.findOne({ where: { id } })
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }

  public update = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    const { id } = params
    const { theme } = body

    try {
      const user = await User.update({ theme }, { where: { id } })
      res.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
