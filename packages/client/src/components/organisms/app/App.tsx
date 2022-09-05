import { useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthPage } from '@pages/auth';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const response = await fetch('http://localhost:3001')
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Routes>
            // пока тут будет авторизация
            <Route path="/" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
