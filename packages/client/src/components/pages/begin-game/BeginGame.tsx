import { withNavbar } from '@services/withNavbar'
import { Box, Stack } from '@mui/material'
import logo from '@images/main_logo.png';
import { routes } from '@organisms/app-routes'
import { MainMenuItem } from '@atoms/main-menu-item'

const menuItems = [routes.game, routes.profile, routes.leaderboard];

const BeginGame = () => {
  return (
    <Stack
      spacing={12}
      alignItems="center"
      margin='auto 0'
    >
      <Box margin='0 50px'>
        <img src={logo} alt='Bomberman' />
      </Box>

      <Stack
        alignItems="center"
        spacing={3}
      >
        {menuItems.map((item) => <MainMenuItem item={item} key={item.path} />)}
      </Stack>
    </Stack>
  )
}

export default withNavbar(BeginGame, 'main')
