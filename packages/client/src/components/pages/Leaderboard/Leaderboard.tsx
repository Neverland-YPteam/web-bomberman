import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper, Box, Avatar, Typography
} from '@mui/material'
import mockData from '@pages/Leaderboard/mockData';
import { ILeaderboard } from '@src/types/leaderboard'

const Leaderboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        minWidth="100vh"
        backgroundColor="white"
        padding="48px"
      >
        <Typography variant="h4">Таблица лидеров</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{fontWeight: 'bold'}}>Аватар</TableCell>
                <TableCell align="center" sx={{fontWeight: 'bold'}}>Имя</TableCell>
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
    </Box>
  );
};

export default Leaderboard;
