import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const Auth = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    console.log({
      login: data.get('login'),
      password: data.get('password'),
    });
  }

  return (
    <Box
    sx={{
      height: '100vh',
      display: 'flex',
    }}
    >
      <Paper
        variant="outlined"
        sx={{
          maxWidth: '330px',
          margin: 'auto',
          textAlign: 'center',
          padding: '24px 28px',
        }}
      >
        <Typography component="h2" variant="h5">
          Авторизация
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: ({palette}) => palette.info.main }}
          >
            ВОЙТИ
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
