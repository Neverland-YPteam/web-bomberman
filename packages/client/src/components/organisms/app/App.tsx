import { useEffect } from 'react';
import './App.css';
import { AppRoutes } from '@organisms/app-routes'
import { Box } from '@mui/material';
import { useDispatch } from '@utils/hooks'
import { loadUser } from '@services/store/actions/user'
import { USER_LOGIN_SUCCESS } from '@services/store/actions/user-auth'
import { tryOAuth } from '@services/OAuth'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '@utils/snackbar'

function App() {
  const dispatch: any = useDispatch()

  useEffect(() => {
    const oAuthCode = new URLSearchParams(window.location.search).get('code')
    const isSessionActive = localStorage.getItem('Session') === 'active'

    if (oAuthCode) {
      tryOAuth(oAuthCode, dispatch)
    } else if (isSessionActive) {
      dispatch({
        type: USER_LOGIN_SUCCESS
      })

      dispatch(loadUser())
    }
  }, [dispatch])

  return (
    <Box className="app__wrapper">
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <AppRoutes />
      </SnackbarProvider>
    </Box>
  )
}

export default App
