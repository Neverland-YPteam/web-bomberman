import React, { useEffect, useState } from 'react'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, Box, Container, Pagination, Skeleton, Typography,
} from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { useDispatch, useSelector } from '@utils/hooks'
import { getLeaderboardUsers } from '@services/store/actions/leaderboard'
import { ILeaderboardItem } from '@src/types/leaderboard'
import { Link } from 'react-router-dom'
import { routes } from '@organisms/app-routes'

const ITEMS_PER_PAGE = 10
const ITEMS_TOTAL_COUNT = 100
const SKELETON_COUNT = 3

const Leaderboard = () => {
  const dispatch: any = useDispatch()
  const [page, setPage] = useState(1)
  const { items, isRequest } = useSelector(state => state.leaderboard)

  useEffect(() => {
    dispatch(getLeaderboardUsers({ cursor: 0, limit: ITEMS_TOTAL_COUNT }))
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
        padding={6}
      >
        <Typography variant="h5" sx={{ marginBottom: 4 }}>Таблица лидеров</Typography>

        { isRequest
          ? <>
              <Skeleton variant="text" sx={{ marginTop: 2 }} />
              {Array.from(Array(SKELETON_COUNT)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={70}
                  sx={{ marginTop: 2 }}
                />
              ))}
            </>
          : (items.length
              ? <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Аватар</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Имя</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Очки</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Место</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.slice(page - 1, page + ITEMS_PER_PAGE - 1).map(({
                        data: { id, name, avatar, score }
                      }: ILeaderboardItem, idx: number) => (
                        <TableRow key={id}>
                          <TableCell align="center">
                            <Avatar
                              alt="Remy Sharp"
                              src={ avatar ?? '' }
                              sx={{ width: 40, height: 40 }}
                            />
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="right">{score}</TableCell>
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
            )
        }

        { items.length > ITEMS_PER_PAGE &&
          <Pagination
            count={Math.ceil(items.length / ITEMS_PER_PAGE)}
            page={page}
            sx={{ marginTop: 4, marginX: 'auto' }}
            onChange={(_, page) => setPage(page)}
          />
        }
      </Box>
    </Container>
  )
}

export default withNavbar(Leaderboard, 'leaderboard')
