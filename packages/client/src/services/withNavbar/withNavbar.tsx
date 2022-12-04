import React from 'react'
import { useSelector } from '@utils/hooks'
import { IRoute, routes } from '@organisms/app-routes'
import { Navbar } from '@molecules/navbar'

export type ConfigKey = 'landing' | 'auth' | 'signUp' | 'profile' | 'main' | 'game' | 'leaderboard' | 'score' | 'notFound'

interface ConfigOption {
  showLogo?: boolean
  links: ConfigKey[]
}

type configOptions = Record<string, ConfigOption>

const configOptions: configOptions = {
  landing: {
    showLogo: false,
    links: ['auth', 'signUp', 'main', 'profile', 'leaderboard'],
  },
  auth: {
    showLogo: true,
    links: ['signUp'],
  },
  signUp: {
    showLogo: true,
    links: ['auth'],
  },
  profile: {
    showLogo: true,
    links: ['main', 'leaderboard'],
  },
  leaderboard: {
    showLogo: true,
    links: ['main', 'profile'],
  },
  main: {
    showLogo: true,
    links: [],
  },
  game: {
    showLogo: true,
    links: ['profile', 'leaderboard'],
  },
  score: {
    showLogo: true,
    links: ['profile'],
  },
  notFound: {
    showLogo: true,
    links: []
  },
}

const withNavbar = (WrappedComponent: React.ComponentType, configKey: ConfigKey) => ({ ...props }) => {
  const { showLogo } = configOptions[configKey]
  const { isUserAuth } = useSelector(state => state.userAuth)

  const links = configOptions[configKey].links.reduce((arr: IRoute[], key) => {
    const route = routes[key]
    const showToUnauth = !isUserAuth && !route.auth
    const showToAuth = isUserAuth && route.auth

    if (configKey !== 'landing' || showToUnauth || showToAuth) {
      arr.push(route)
    }

    return arr
  }, [])

  return (
    <>
      { (showLogo || links?.length > 0) &&
        <Navbar showLogo={showLogo} links={links} />
      }

      <WrappedComponent {...props} />
    </>
  )
}

export default withNavbar
