import { useEffect } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container, Box, Avatar, Typography
} from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { useDispatch, useSelector } from '@utils/hooks'
import { getLeaderboardUsers } from '@services/store/actions/leaderboard'
import { ILeaderboardItem } from '@src/types/leaderboard'
import { Link } from 'react-router-dom'
import { routes } from '@organisms/app-routes'

const Leaderboard = () => {
  const dispatch: any = useDispatch()

  const { items } = useSelector(state => state.leaderboard)

  useEffect(() => {
    dispatch(getLeaderboardUsers({ cursor: 0, limit: 100 }))
  }, [])

  return (
    <Container
      sx={{
        flex: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{ backgroundColor: 'white' }}
        flex="100%"
        display="flex"
        flexDirection="column"
        padding="48px"
      >
        <Typography variant="h5" sx={{ marginBottom: '40px' }}>Таблица лидеров</Typography>

        { items.length

          ? <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Аватар</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Имя</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Очки</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Место</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(({ data: { id, name, avatar, score }}: ILeaderboardItem, idx: number) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Avatar
                          alt="Remy Sharp"
                          src={ avatar ?? '' }
                          sx={{ width: 40, height: 40 }}
                        />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="center">{score}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>{idx + 1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          : <div>
              Список лидеров пока пуст.<br />
              <Link to={routes.game.path}>Сыграйте</Link>, чтобы стать первым!
            </div>
        }
      </Box>
    </Container>
  )
}

export default withNavbar(Leaderboard, 'leaderboard')
