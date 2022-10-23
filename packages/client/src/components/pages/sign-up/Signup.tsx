import React, { useEffect } from 'react'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'
import { TextField } from '@mui/material'
import { withNavbar } from '@services/withNavbar'
import { routes } from '@organisms/app-routes';
import { useDispatch, useSelector } from '@utils/hooks'
import { registerUser } from '@services/store/actions/user-registration'
import { loadUser } from '@services/store/actions/user'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector(state => state.userRegistration);
  const { isUserAuth } = useSelector(state => state.userAuth)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);

    dispatch(registerUser(data))
  }

  useEffect(() => {
    if (isUserAuth) {
      navigate(routes.landing.path, {replace: true})
      dispatch((loadUser()))
    }
  }, [isUserAuth])

  useEffect(() => {
    if (userId) {
      navigate(routes.profile.path);
    }
  }, [userId])

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
