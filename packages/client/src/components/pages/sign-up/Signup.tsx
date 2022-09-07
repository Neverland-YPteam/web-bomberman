import React from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'
import { TextField } from '@mui/material'

const Signup = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    console.log({
      first_name: data.get('first_name'),
      second_name: data.get('second_name'),
      email: data.get('email'),
      login: data.get('login'),
      password: data.get('password'),
    });
  }

  return (
    <FormContainer
      onFormSubmit={handleSubmit}
      title="Регистрация"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="Имя"
        name="first_name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="second_name"
        label="Фамилия"
        type="text"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        type="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="login"
        label="Логин"
        type="text"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Пароль"
        type="password"
      />
      <SubmitButton>ЗАРЕГИСТРИРОВАТЬСЯ</SubmitButton>
      <FormLink to="/" text="Уже есть аккаунт? Войти" />
    </FormContainer>
  )
}

export default Signup
