import React, { useEffect } from 'react'
import { withNavbar } from '@services/withNavbar'
import { Stack, Typography } from '@mui/material'
import { routes } from '@organisms/app-routes'
import { MainMenuItem } from '@atoms/main-menu-item'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from '@utils/hooks'

const menuItems = [routes.game, routes.main];

const EndGame = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const { score } = useSelector(state => state.other)

  // временно, чтобы можно было посмотреть
  // useEffect(() => {
  //   if (state !== 'game') {
  //     navigate(routes.main.path, {replace: true})
  //   }
  // }, [])

  return (
    <Stack
      spacing={12}
      alignItems="center"
      margin='auto 0'
    >
      <Stack alignItems="center" spacing={2}>
        <Typography variant="subtitle1" fontSize="140px" lineHeight="140px" sx={{':hover': {textDecoration: 'none'}}}>
          { score ?? 0 }
        </Typography>
        <Typography variant="subtitle1" fontSize="32px" sx={{':hover': {textDecoration: 'none'}}}>
          Игра окончена
        </Typography>
      </Stack>

      <Stack
        alignItems="center"
        spacing={2}
      >
        {menuItems.map((item) => <MainMenuItem item={item} key={item.title} />)}
      </Stack>
    </Stack>
  )
}

export default withNavbar(EndGame, 'score')
