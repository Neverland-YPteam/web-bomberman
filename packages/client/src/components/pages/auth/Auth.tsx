import React from 'react';
import { Box, Typography } from '@mui/material'

const Auth = () => {
  return (
    <Box
    sx={{
      height: '100vh',
      // display: 'flex',
    }}
    >
        {/* Просто пример использования */}
        <Typography
          sx={{
            background: ({ palette }) => palette.info.main,
          }}
        >
          Authorization page
        </Typography>
    </Box>
  );
};

export default Auth;
