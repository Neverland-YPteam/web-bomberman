import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { canvasSelectors } from './scripts/const'

const Game = () => {
  useEffect(() => {
    (async () => {
      const { loadResources } = await import('./scripts')
      loadResources()
    })()
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
        {Object.values(canvasSelectors).map((canvasSelector) =>
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
