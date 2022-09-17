import React from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { Avatar, Box, TextField } from '@mui/material'
import { withNavbar } from '@services/withNavbar'

const Profile = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);

    /**
     * По ТЗ пароль нужен на странице профиля
     * Эндпоинты для профиля и пароля у нас отдельные
     * Вероятно, придется слать два запроса через Promise.all
     */
    console.log({
      first_name: data.get('first_name'),
      second_name: data.get('second_name'),
      display_name: data.get('display_name'),
      email: data.get('email'),
      phone: data.get('phone'),
      password: data.get('password'),
    });
  }

  return (
    <FormContainer
      onFormSubmit={handleSubmit}
      title="Профиль"
    >
      <Avatar
        component="label"
        alt="Ваш аватар"
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          cursor: 'pointer',
        }}
      >
        В
        <input
          type="file"
          hidden
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 30%)'
            },
            transition: 'background-color 200ms ease-out'
          }}
        />
      </Avatar>

      <TextField
        name="first_name"
        label="Имя"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="second_name"
        label="Фамилия"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="display_name"
        label="Никнейм"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Никнейм"
        type="email"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="phone"
        label="Телефон"
        type="tel"
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Пароль"
        type="password"
        required
        fullWidth
        margin="normal"
      />
      <SubmitButton>Сохранить</SubmitButton>
    </FormContainer>
  )
}

export default withNavbar(Profile, 'profile')
