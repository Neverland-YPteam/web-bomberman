import { RESOURCE_BASE_URL } from './const.js'
import { canvasStatic } from './canvas.js'
import { loadSprite } from './images.js'
import { panel } from './panel.js'
import { map } from './map.js'
import { level } from './level.js'

const drawStaticTextures = () => {
  panel.init()
  map.draw()
  canvasStatic.update()
}

const onLoad = async () => {
  drawStaticTextures()
  await level.goToNextLevel()
  // @TODO Если здесь ничего не будет, убираем async/await
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
