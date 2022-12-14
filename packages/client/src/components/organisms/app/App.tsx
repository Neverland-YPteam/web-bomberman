import { useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { Box } from '@mui/material'

import { useDispatch } from '@utils/hooks'
import { loadUser } from '@services/store/actions/user'
import { USER_LOGIN_SUCCESS } from '@services/store/actions/user-auth'
import { tryOAuth } from '@services/OAuth'
import { AppThemeProvider } from '@services/AppThemeProvider'
import { SnackbarUtilsConfigurator } from '@utils/snackbar'
import { AppRoutes } from '@organisms/app-routes'
import background from '@/assets/images/background.png'

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
    <AppThemeProvider>
      <Box sx={{
        flex: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `url('${background}') no-repeat 0 0 / cover fixed`
      }}>
        <SnackbarProvider>
          <SnackbarUtilsConfigurator />
          <AppRoutes />
        </SnackbarProvider>
      </Box>
    </AppThemeProvider>
  )
}

export default App
