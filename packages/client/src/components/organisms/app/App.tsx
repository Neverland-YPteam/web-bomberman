import { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@organisms/app-routes'
import { Box } from '@mui/material';
import { useDispatch } from '@utils/hooks'
import { USER_LOGIN_SUCCESS } from '@services/store/actions/user-auth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const isSessionActive = localStorage.getItem('Session') === 'active'
    if (isSessionActive) {
      dispatch({
        type: USER_LOGIN_SUCCESS
      })
    }
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001')
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <Box className="app__wrapper">
        <AppRoutes />
      </Box>
    </BrowserRouter>
  )
}

export default App
