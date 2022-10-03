import { canvasStatic } from './canvas'
import { loadSprite } from './images'
import { panel } from './panel'
import { map } from './map'
import { level } from './level'

const FONT_PATH = '/src/assets/fonts/PressStart2P.ttf'

const drawStaticTextures = () => {
  panel.init()
  map.draw()
  canvasStatic.update()
}

const onLoad = async () => {
  drawStaticTextures()
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
