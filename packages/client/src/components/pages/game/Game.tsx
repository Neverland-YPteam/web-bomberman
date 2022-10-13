import { useEffect } from 'react'
import { Box } from '@mui/material'
import { routes } from '@organisms/app-routes'
import { useNavigate } from 'react-router-dom'
import { CanvasSelectors } from './scripts/const'

const Game = () => {
  const navigate = useNavigate()

  useEffect(() => {
    let cleanListeners: null | (() => void) = null;

    (async () => {
      const { loadResources, registerEndGameCallback, removeListeners } = await import('./scripts')

      cleanListeners = removeListeners

      registerEndGameCallback((score: number) => {
        // @TODO Здесь нужно положить score в стор
        navigate(routes.score.path)
      })

      loadResources()
    })()

    return () => cleanListeners?.()
  }, [])

  return (
    <Box sx={{ height: '100vh' }}>
      <Box
        sx={{
          position: 'relative',
          width: 'min(100vw, calc(100vh * 4 / 3))',
          aspectRatio: '4 / 3',
          margin: '0 auto',
        }}
      >
        {Object.values(CanvasSelectors).map((canvasSelector) =>
          <canvas
            key={canvasSelector}
            id={canvasSelector.slice(1)}
            className={canvasSelector.slice(1)}
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
        )}
      </Box>
    </Box>
  )
}

export default Game
