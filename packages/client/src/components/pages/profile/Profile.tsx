import React, { useEffect } from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { Avatar, Box, TextField } from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { useDispatch } from '@utils/hooks'
import { loadProfile, updateAvatar, updateProfile } from '@services/store/actions/profile'
import { API_RESOURCE_URL } from '@utils/constants'

const Profile = () => {
  const dispatch: any = useDispatch();

  const handleAvatarUpdate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = evt.target.files as FileList
    const data = new FormData()
    data.append('avatar', file)
    dispatch(updateAvatar(data))
  }

  const handleProfileUpdate = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    dispatch(updateProfile(data))

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

  useEffect(() => {
    dispatch(loadProfile())
  }, [])

  return (
    <FormContainer
      onFormSubmit={handleProfileUpdate}
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
          accept="image/*"
          onChange={(event) => handleAvatarUpdate(event)}
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
        name="login"
        label="Логин"
        required
        fullWidth
        margin="normal"
      />
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
        label="Email"
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
