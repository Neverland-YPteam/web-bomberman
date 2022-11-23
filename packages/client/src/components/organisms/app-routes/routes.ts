export interface IRoute {
  title: string
  path: string
  auth?: boolean
}

type TRoutes = Record<string, IRoute>

const routes: TRoutes = {
  landing: {
    title: 'Об игре',
    path: '/',
  },
  auth: {
    title: 'Авторизация',
    path: '/sign-in',
    auth: false,
  },
  signUp: {
    title: 'Регистрация',
    path: '/sign-up',
    auth: false,
  },
  profile: {
    title: 'Профиль',
    path: '/profile',
    auth: true,
  },
  main: {
    title: 'Главная',
    path: '/main',
    auth: true,
  },
  game: {
    title: 'Новая игра',
    path: '/game',
    auth: true,
  },
  score: {
    title: '',
    path: '/score',
    auth: true,
  },
  leaderboard: {
    title: 'Лидеры',
    path: '/leaderboard',
    auth: true,
  },
  forum: {
    title: 'Форум',
    path: '/',
    auth: true,
  },
}

export { routes }
