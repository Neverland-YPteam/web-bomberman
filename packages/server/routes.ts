const Routes = {
  Landing: '/',
  Auth: '/sign-in',
  SignUp: '/sign-up',
  Profile: '/profile',
  Main: '/main',
  Game: '/game',
  Score: '/score',
  Leaderboard: '/leaderboard',
  NotFound: '*'
}

export const authRoutes = [
  Routes.Profile,
  Routes.Main,
  Routes.Game,
  Routes.Score,
  Routes.Leaderboard,
]

export const unauthRoutes = [
  Routes.Auth,
  Routes.SignUp,
]

export const authRouteRedirect = Routes.Main
export const unauthRouteRedirect = Routes.Auth
