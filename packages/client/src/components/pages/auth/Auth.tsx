import React from 'react';
import { TextField } from '@mui/material'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'

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
    <FormContainer
      onFormSubmit={handleSubmit}
      title="Авторизация"
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
      <SubmitButton>ВОЙТИ</SubmitButton>
      <FormLink to="/sign-in" text="Нет аккаунта? Регистрация" />
    </FormContainer>
  );
};

export default Auth;
