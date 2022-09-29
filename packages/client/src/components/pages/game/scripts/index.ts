import { loadSprite } from './images'
import { level } from './level'

const FONT_PATH = '/src/assets/fonts/PressStart2P.ttf'

const onLoad = async () => {
  level.startGame()
}

// Без этого метода на канвасе не хочет рендериться кастомный шрифт
const loadFont = async () => {
  const font = new FontFace('Press Start 2P', `url(${FONT_PATH})`)

  // @FIXME Разобраться, почему здесь орет Firefox
  await font.load()

  document.fonts.add(font)
}

const loadResources = async () => {
  await loadFont()
  loadSprite()
}

// onLoad вызовет загрузчик изображений, когда сделает свое дело
export { loadResources, onLoad }
