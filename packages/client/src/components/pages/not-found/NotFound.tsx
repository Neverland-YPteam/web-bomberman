import { withNavbar } from '@services/withNavbar'
import { Stack, Typography } from '@mui/material'
import { routes } from '@organisms/app-routes'
import { MainMenuItem } from '@atoms/main-menu-item'

const NotFound = () => {
  return (
    <Stack
      spacing={12}
      alignItems="center"
      margin='auto 0'
    >
      <Stack alignItems="center" spacing={2}>
        <Typography
          variant="subtitle1"
          fontSize="140px"
          lineHeight="140px"
          sx={{':hover': {textDecoration: 'none'}}}
        >
          404
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize="32px"
          sx={{':hover': {textDecoration: 'none'}}}
        >
          Страница не найдена
        </Typography>
      </Stack>

      <Stack alignItems="center">
        <MainMenuItem item={routes.main} />
      </Stack>
    </Stack>
  )
}

export default withNavbar(NotFound, 'notFound')
