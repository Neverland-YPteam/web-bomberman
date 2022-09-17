import { Link } from 'react-router-dom'
import { IRoute, routes } from '@organisms/app-routes'
import { Container, Box } from '@mui/material'
import { theme } from '@services/AppThemeProvider/theme'
import './Navbar.css'
import logo from './images/logo.png'

interface Props {
  showLogo?: boolean
  links: IRoute[]
}

const Navbar = ({ showLogo, links }: Props) => {
  return (
    <Box
      component="nav"
      className="navbar"
      sx={{ zIndex: theme.zIndex.appBar, boxShadow: 2 }}
    >
      <Container>
        <Box className="navbar__content">
          {showLogo &&
            <Link to={routes.landing.path} title="Об игре">
              <img src={logo} width="120" />
            </Link>
          }

          <Box
            component="ul"
            sx={{
              display: 'flex',
              gap: 4,
              marginLeft: 'auto',
              padding: 0,
              listStyle: 'none',
              fontFamily: '"Press Start 2P"',
              color: 'white',
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

            {/* @TODO Кнопка «Выйти» */}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
