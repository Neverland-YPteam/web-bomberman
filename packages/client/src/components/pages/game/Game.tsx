import { withNavbar } from '@services/withNavbar'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { routes } from '@organisms/app-routes'
import { useNavigate } from 'react-router-dom'
import { CanvasSelectors } from './scripts/const'
import { useDispatch } from '@utils/hooks'
import { updateScore } from '@services/store/actions/other'

const Game = () => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  useEffect(() => {
    let cleanListeners: null | (() => void) = null;

    (async () => {
      const { loadResources, registerEndGameCallback, removeListeners } = await import('./scripts')

      cleanListeners = removeListeners

      registerEndGameCallback((score: number) => {
        dispatch(updateScore(score))
        navigate(routes.score.path, { state: 'game' })
      })

      loadResources()
    })()

    return () => cleanListeners?.()
  }, [])

  return (
    <Box
      className="game__content"
      sx={{ flex: 1, position: 'relative', background: 'inherit' }}
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
            objectFit: 'contain',
            objectPosition: 'top',
          }}
        ></canvas>
      )}
    </Box>
  )
}

export default withNavbar(Game, 'game')
