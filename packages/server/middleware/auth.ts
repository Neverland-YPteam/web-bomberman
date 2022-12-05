import type { NextFunction, Request, Response } from 'express'
import { getUser } from '../api/user'
import type { IUser } from '../types/user'
import { authRoutes, unauthRoutes, authRouteRedirect, unauthRouteRedirect } from '../routes'

interface IRequest extends Request {
  authMiddlewareStatus: 200 | 401
  user: IUser | null
}

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

  console.log('##############') // @TODO
  console.log('##############') // @TODO
  console.log('##############') // @TODO
  console.log('\nЕСТЬ РЕДИРЕКТЫ?') // @TODO
  console.log('auth', isRouteAuth) // @TODO
  console.log('unauth', isRouteUnauth) // @TODO

  if (!isRouteAuth && !isRouteUnauth) {
    console.log('\nОСТАЕМСЯ!') // @TODO
    next()
    return
  }

  console.log('\nКУКИ') // @TODO
  console.log(cookies) // @TODO

  const user = cookies ? await getUser(cookies) : null
  ;(req as IRequest).user = user

  console.log('\nЕСТЬ ЮЗЕР?') // @TODO
  console.log(user) // @TODO

  let url = originalUrl

  if (user && isRouteUnauth) {
    url = authRouteRedirect
  } else if (!user && isRouteAuth) {
    url = unauthRouteRedirect
  }

  const hasRedirect = url !== originalUrl

  console.log('\nУРЛЫ') // @TODO
  console.log('original', originalUrl) // @TODO
  console.log('new', url) // @TODO

  ;(req as IRequest).authMiddlewareStatus = !user && hasRedirect ? 401 : 200

  console.log('\nauthMiddlewareStatus') // @TODO
  console.log((req as IRequest).authMiddlewareStatus) // @TODO

  console.log('\nЕСТЬ РЕДИРЕКТ?') // @TODO
  console.log(hasRedirect) // @TODO

  if (hasRedirect) {
    res.redirect(url)
  } else {
    next()
  }
}
