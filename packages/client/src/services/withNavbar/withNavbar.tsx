import React from 'react'
import { routes } from '@organisms/app-routes'
import { Navbar } from '@molecules/navbar'

interface ConfigOption {
  showLogo?: boolean
  links: string[]
}

type configOptions = Record<string, ConfigOption>
export type ConfigKey = 'auth' | 'signUp' | 'profile' | 'main' | 'game' | 'leaderboard' | 'forum'

const handleLinks = (key: string) => routes[key]

const configOptions: configOptions = {
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
    links: ['main', 'leaderboard', 'forum'],
  },
  leaderboard: {
    showLogo: true,
    links: ['main', 'profile', 'forum'],
  },
  main: {
    showLogo: false,
    links: ['forum']
  }
}

const withNavbar = (WrappedComponent: React.ComponentType, configKey: ConfigKey) => ({ ...props }) => {
  const { showLogo, links } = configOptions[configKey]
  const linksHandled = links.map(handleLinks)

  return (
    <>
      { (showLogo || links?.length > 0) &&
        <Navbar showLogo={showLogo} links={linksHandled} />
      }

      <WrappedComponent {...props} />
    </>
  )
}

export default withNavbar
