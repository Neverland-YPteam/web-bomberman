import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container, Box, Avatar, Typography
} from '@mui/material'
import mockData from './mockData';
import { ILeaderboard } from '@src/types/leaderboard'
import { withNavbar } from '@services/withNavbar'

const Leaderboard = () => {
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
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{fontWeight: 'bold'}}>Аватар</TableCell>
                <TableCell align="left" sx={{fontWeight: 'bold'}}>Имя</TableCell>
                <TableCell align="left" sx={{fontWeight: 'bold'}}>Очки</TableCell>
                <TableCell align="left" sx={{fontWeight: 'bold'}}>Место</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((user: ILeaderboard, idx: number) => (
                <TableRow
                  key={user.user.firstName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" padding='normal'>
                    <Avatar
                      alt="Remy Sharp"
                      src={user.user.avatar}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell align="left">{user.user.firstName}</TableCell>
                  <TableCell align="left">{user.user.score}</TableCell>
                  <TableCell align="left">{idx + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default withNavbar(Leaderboard, 'leaderboard');
