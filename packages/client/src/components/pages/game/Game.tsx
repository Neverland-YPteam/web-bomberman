import {
  Box,
} from '@mui/material'
import { useEffect } from 'react'


const Game = () => {
  useEffect(() => {
    (async () => {
      const { loadResources } = await import('./js')
      loadResources()
    })()
  }, [])

  return (
    <Box sx={{ height: '100vh' }} >
      <Box
        sx={{
          position: 'relative',
          width: 'min(100vw, calc(100vh * 4 / 3))',
          maxWidth: 800,
          aspectRatio: '4 / 3',
          margin: '0 auto',
        }}
      >
        <canvas
          id="game_static"
          className="game__canvas"
          width="1200"
          height="900"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></canvas>

        <canvas
          id="game_dynamic"
          className="game__canvas"
          width="1200"
          height="900"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></canvas>
      </Box>
    </Box>
  )
}

export default Game
