import React from 'react'
import { routes } from '../../components/organisms/app-routes'
import { Navbar } from '../../components/molecules/navbar'

export type ConfigKey = 'auth' | 'signUp' | 'profile' | 'main' | 'game' | 'leaderboard' | 'forum' | 'score'

interface ConfigOption {
  showLogo?: boolean
  links: ConfigKey[],
  protectedRoute: boolean,
}

type configOptions = Record<string, ConfigOption>

const handleLinks = (key: string) => routes[key]

const configOptions: configOptions = {
  auth: {
    showLogo: true,
    links: ['signUp'],
    protectedRoute: false,
  },
  signUp: {
    showLogo: true,
    links: ['auth'],
    protectedRoute: false,
  },
  profile: {
    showLogo: true,
    links: ['main', 'leaderboard', 'forum'],
    protectedRoute: true,
  },
  leaderboard: {
    showLogo: true,
    links: ['main', 'profile', 'forum'],
    protectedRoute: true,
  },
  main: {
    showLogo: false,
    links: ['forum'],
    protectedRoute: true,
  },
  score: {
    showLogo: true,
    links: ['profile', 'leaderboard', 'forum'],
    protectedRoute: true,
  }
}

const withNavbar = (WrappedComponent: React.ComponentType, configKey: ConfigKey) => ({ ...props }) => {
  const { showLogo, links, protectedRoute } = configOptions[configKey]
  const linksHandled = links.map(handleLinks)

  return (
    <>
      { (showLogo || links?.length > 0) &&
        <Navbar showLogo={showLogo} links={linksHandled} protectedRoute={protectedRoute} />
      }

      <WrappedComponent {...props} />
    </>
  )
}

export default withNavbar
