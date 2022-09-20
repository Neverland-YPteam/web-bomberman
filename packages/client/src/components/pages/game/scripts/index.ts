import { RESOURCE_BASE_URL } from './const'
import { canvasStatic } from './canvas'
import { loadSprite } from './images'
import { panel } from './panel'
import { map } from './map'
import { level } from './level'

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
const loadFont = async () => {
  const font = new FontFace('Press Start 2P', `url(${RESOURCE_BASE_URL}/fonts/PressStart2P.ttf)`)

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
