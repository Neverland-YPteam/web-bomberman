import React, { useEffect, useState } from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { Avatar, Box, Skeleton, TextField } from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { useDispatch, useSelector } from '@utils/hooks'
import { updateAvatar, updateProfile, updatePassword } from '@services/store/actions/profile'

const SKELETON_COUNT = 8

const Profile = () => {
  const dispatch: any = useDispatch()
  const { user, userAuth: { isOAuth } } = useSelector(state => state)
  const [componentKey, updateComponentKey] = useState(0)

  const handleAvatarUpdate = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = evt.target.files as FileList
    const data = new FormData()
    data.append('avatar', file)
    dispatch(updateAvatar(data))
  }

  const handleProfileUpdate = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const profileData = new FormData(evt.currentTarget)
    profileData.delete('oldPassword')
    profileData.delete('newPassword')
    dispatch(updateProfile(profileData))

    if (!isOAuth) {
      const passwordData = new FormData()
      passwordData.append('oldPassword', evt.currentTarget.oldPassword.value)
      passwordData.append('newPassword', evt.currentTarget.newPassword.value)
      dispatch(updatePassword(passwordData))
    }
  }

  useEffect(() => {
    updateComponentKey(key => key + 1)
  }, [user])

  return (
    <FormContainer
      key={componentKey}
      onFormSubmit={handleProfileUpdate}
      title="Профиль"
    >
      <Box
        component="label"
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          overflow: 'hidden',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        {user.avatar
          ? <Avatar
              component="label"
              src={user.avatar}
              alt="Ваш аватар"
              sx={{ width: '100%', height: '100%' }}
            />
          : <Avatar
              component="label"
              alt="Аватар отсутствует"
              sx={{ width: 120, height: 120 }}
            >
              { (user.display_name ?? user.login)?.slice(0, 1).toUpperCase() }
            </Avatar>
        }

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
      </Box>

      {user.login

        ? <>
          <TextField
            name="login"
            label="Логин"
            autoFocus
            required
            fullWidth
            margin="normal"
            defaultValue={user.login}
          />
          <TextField
            name="first_name"
            label="Имя"
            required
            fullWidth
            margin="normal"
            defaultValue={user.first_name}
          />
          <TextField
            name="second_name"
            label="Фамилия"
            required
            fullWidth
            margin="normal"
            defaultValue={user.second_name}
          />
          <TextField
            name="display_name"
            label="Никнейм"
            required
            fullWidth
            margin="normal"
            defaultValue={user.display_name}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            defaultValue={user.email}
          />
          <TextField
            name="phone"
            label="Телефон"
            type="tel"
            required
            fullWidth
            margin="normal"
            defaultValue={user.phone}
          />

          {!isOAuth && (
            <>
              <TextField
                name="oldPassword"
                label="Текущий пароль"
                type="password"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="newPassword"
                label="Новый пароль"
                type="password"
                required
                fullWidth
                margin="normal"
              />
            </>
          )}

          <SubmitButton>Сохранить</SubmitButton>
        </>

        : Array.from(Array(SKELETON_COUNT)).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={210}
            height={60}
            sx={{ margin: 1 }}
          />
        ))
      }
    </FormContainer>
  )
}

export default withNavbar(Profile, 'profile')
