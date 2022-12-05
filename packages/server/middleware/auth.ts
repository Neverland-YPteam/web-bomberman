import type { NextFunction, Request, Response } from 'express'
import { getUser } from '../api/user'
import type { IRequest } from '../types/request'
import { authRoutes, unauthRoutes, authRouteRedirect, unauthRouteRedirect } from '../routes'
import { User } from '../models'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    cookies,
    originalUrl
  } = req

  const isRouteAuth = authRoutes.includes(originalUrl)
  const isRouteUnauth = unauthRoutes.includes(originalUrl)

  const user = cookies ? await getUser(cookies) : null
  ;(req as IRequest).initialState.user = user

  if (user) {
    const userDBItem = await User.findOne({
      where: {
        id: user.id
      }
    })

    const theme = userDBItem?.dataValues?.theme ?? 'light'
    ;(req as IRequest).initialState.theme = theme
  }

  let url = originalUrl

  if (user && isRouteUnauth) {
    url = authRouteRedirect
  } else if (!user && isRouteAuth) {
    url = unauthRouteRedirect
  }

  const hasRedirect = url !== originalUrl

  ;(req as IRequest).authMiddlewareStatus = !user && hasRedirect ? 401 : 200

  if (hasRedirect) {
    res.redirect(url)
  } else {
    next()
  }
}
