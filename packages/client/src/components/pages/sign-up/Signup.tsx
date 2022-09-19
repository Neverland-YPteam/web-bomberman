import React, { useEffect } from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'
import { TextField } from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { routes } from '@organisms/app-routes';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@services/store/actions/user-registration'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector(state => (state as any).userRegistration);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);

    dispatch(registerUser(data))
  }

  useEffect(() => {
    if (userId) {
      navigate(routes.profile.path);
    }
  })

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
        label="Телефон"
        name="phone"
        type="tel"
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
      <SubmitButton>Зарегистрироваться</SubmitButton>
      <FormLink to={routes.auth.path} text="Уже есть аккаунт? Войти" />
    </FormContainer>
  )
}

export default withNavbar(Signup, 'signUp')
