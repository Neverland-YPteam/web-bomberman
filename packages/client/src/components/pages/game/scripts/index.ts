import { loadSprite } from './images'
import { updateCanvases } from './canvas'
import { level } from './level'
import { hero } from './hero'
import fontPressStart2P from '/src/assets/fonts/PressStart2P.ttf'

type RedirectFunction = (score: number) => void

export let endGameCallback: null | RedirectFunction = null

const onLoad = async () => {
  updateCanvases()
  level.startGame()
}

// Без этого метода на канвасе не хочет рендериться кастомный шрифт
const loadFont = () => new Promise((resolve) => {
  const font = new FontFace('PressStart2P', `url(${fontPressStart2P})`)
  document.fonts.add(font)
  font.load().then(resolve)
})

const loadResources = async () => {
  await loadFont()
  loadSprite()
}

const registerEndGameCallback = (func: RedirectFunction) => {
  endGameCallback = func
}

const removeListeners = () => {
  level.removeControl()
  hero.removeControl()
}

// onLoad вызовет загрузчик изображений, когда сделает свое дело
export { loadResources, onLoad, registerEndGameCallback, removeListeners }
