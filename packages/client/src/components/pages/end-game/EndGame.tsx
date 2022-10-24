import { useEffect } from 'react'
import { withNavbar } from '@services/withNavbar'
import { Stack, Typography } from '@mui/material'
import { routes } from '@organisms/app-routes'
import { MainMenuItem } from '@atoms/main-menu-item'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '@utils/hooks'
import { addLeaderboardUser } from '@services/store/actions/leaderboard'
import { nanoid } from 'nanoid'

const LEADERBOARD_ID_LENGTH = 10

const menuItems = [routes.game, routes.main];

const EndGame = () => {
  const dispatch: any = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state

  const {
    user: { avatar, display_name, first_name, second_name },
    other: { score },
  } = useSelector(state => state)

  useEffect(() => {
    if (state !== 'game') {
      navigate(routes.main.path, {replace: true})
      return
    }

    const name = display_name || `${first_name} ${second_name}`

    dispatch(addLeaderboardUser({
      id: nanoid(LEADERBOARD_ID_LENGTH),
      name,
      avatar,
      score,
    }))
  }, [])

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
