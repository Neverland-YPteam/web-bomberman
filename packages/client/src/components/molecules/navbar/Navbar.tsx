import { Link } from 'react-router-dom'
import { IRoute, routes } from '@organisms/app-routes'
import { Box, Container } from '@mui/material'
import { useTheme } from '@mui/material'
import logo from './images/logo.png'
import background from '@/assets/images/background.png'
import { ChangeEvent, SyntheticEvent, useContext } from 'react'
import { useDispatch, useSelector } from '@utils/hooks'
import { logoutUser } from '@services/store/actions/user-auth'
import { ColorModeContext } from '@services/AppThemeProvider'
import { MaterialUISwitch } from './Switch'

interface Props {
  showLogo?: boolean
  links: IRoute[]
}

const Navbar = ({ showLogo, links }: Props) => {
  const dispatch: any = useDispatch()
  const theme = useTheme()
  const { userAuth: { isUserAuth } } = useSelector(state => state)
  const { darkTheme, setDarkTheme } = useContext(ColorModeContext)

  const changeTheme = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement
    setDarkTheme?.(() => input.checked)
  }

  const handleExitClick = (evt: SyntheticEvent) => {
    evt.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
        boxShadow: 2,
        '::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: `url('${background}') no-repeat 0 0 / cover fixed`
        },
        '::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundColor: 'rgba(0, 0, 0, 30%)'
        }
      }}
    >
      <Container>
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minHeight: 54,
          padding: '12px 48px'
        }}>
          {showLogo &&
            <Link to={routes.landing.path} title="Об игре">
              <img src={logo} width="120" />
            </Link>
          }

          <Box
            component="ul"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              marginLeft: 'auto',
              padding: 0,
              listStyle: 'none',
              fontFamily: '"Press Start 2P"',
              color: theme.palette.secondary.main,
            }}
          >
            {links.map(link =>
              <li key={link.path}>
                <Box
                  component={Link}
                  to={link.path}
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.title}
                </Box>
              </li>
            )}

            {isUserAuth && (
              <Box
                onClick={handleExitClick}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Выход
              </Box>
            )}

            <MaterialUISwitch checked={Boolean(darkTheme)} onChange={changeTheme} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
