import { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@organisms/app-routes'

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
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
