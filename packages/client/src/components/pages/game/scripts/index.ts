import { loadSprite } from './images'
import { level } from './level'

const FONT_PATH = '/src/assets/fonts/PressStart2P.ttf'

const onLoad = async () => {
  level.startGame()
}

// Без этого метода на канвасе не хочет рендериться кастомный шрифт
const loadFont = () => new Promise((resolve) => {
  const font = new FontFace('PressStart2P', `url(${FONT_PATH})`)
  document.fonts.add(font)
  font.load().then(resolve)
})

const loadResources = async () => {
  await loadFont()
  loadSprite()
}

// onLoad вызовет загрузчик изображений, когда сделает свое дело
export { loadResources, onLoad }
