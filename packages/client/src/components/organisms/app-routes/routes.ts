// @TODO: После появления лендинга по роуту / перенести auth на /auth (или /sign-in)
// И поправить configOptions в withNavbar

export interface IRoute {
  title: string
  path: string
}

type TRoutes = Record<string, IRoute>

const routes: TRoutes = {
  auth: {
    title: 'Авторизация',
    path: '/',
  },
  signUp: {
    title: 'Регистрация',
    path: '/sign-up',
  },
  profile: {
    title: 'Профиль',
    path: '/profile',
  },
  main: {
    title: 'Главная',
    path: '/main',
  },
  game: {
    title: 'Новая игра',
    path: '/game',
  },
  leaderboard: {
    title: 'Лидеры',
    path: '/leaderboard',
  },
  forum: {
    title: 'Форум',
    path: '/forum',
  },
}

export { routes }