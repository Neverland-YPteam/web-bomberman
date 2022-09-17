import React from 'react';
import { TextField } from '@mui/material'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'
import { withNavbar } from '@services/withNavbar'

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
      <SubmitButton>Войти</SubmitButton>
      <FormLink to="/sign-up" text="Нет аккаунта? Регистрация" />
    </FormContainer>
  );
};

export default withNavbar(Auth, 'auth');
