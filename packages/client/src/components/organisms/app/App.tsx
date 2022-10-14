import { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@organisms/app-routes'
import { Box } from '@mui/material';
import { useDispatch } from '@utils/hooks'
import { loadUser } from '@services/store/actions/user'
import { USER_LOGIN_SUCCESS } from '@services/store/actions/user-auth'

function App() {
  const dispatch: any = useDispatch()

  useEffect(() => {
    const isSessionActive = localStorage.getItem('Session') === 'active'

    if (isSessionActive) {
      dispatch({
        type: USER_LOGIN_SUCCESS
      })

      dispatch(loadUser())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Box className="app__wrapper">
        <AppRoutes />
      </Box>
    </BrowserRouter>
  )
}

export default App
