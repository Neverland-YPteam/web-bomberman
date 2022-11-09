import React, { useEffect } from 'react'
import { Box, TextField } from '@mui/material'
import { FormContainer } from '@molecules/form-container'
import { SubmitButton } from '@atoms/submit-button'
import { FormLink } from '@atoms/form-link'
import { withNavbar } from '@services/withNavbar'
import { routes } from '@organisms/app-routes';
import { useDispatch, useSelector } from '@utils/hooks'
import { loginUser } from '@services/store/actions/user-auth'
import { loadUser } from '@services/store/actions/user'
import { useLocation, useNavigate } from 'react-router-dom'
import ImageYandexId from './yandex_id.svg'
import { getOAuthYandexAppId, getOAuthYandexUrl } from '@services/OAuth'

const Auth = () => {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const state = location.state

  const { isUserAuth } = useSelector(state => state.userAuth)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);

    dispatch(loginUser(data))
  }

  const initOAuth = async () => {
    const { service_id } = await getOAuthYandexAppId()
    const { href } = getOAuthYandexUrl(service_id)

    window.location.replace(href)
  }

  useEffect(() => {
    if (isUserAuth) {
      navigate((state as any)?.from || routes.main.path, {replace: true})
      dispatch(loadUser())
    }
  }, [isUserAuth])

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
      <FormLink to={routes.signUp.path} text="Нет аккаунта? Регистрация" />

      <Box
        component="img"
        src={ImageYandexId}
        marginTop={3}
        sx={{ cursor: 'pointer' }}
        onClick={initOAuth}
      />
    </FormContainer>
  );
};

export default withNavbar(Auth, 'auth');
