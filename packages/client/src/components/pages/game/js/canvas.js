import {
  TILE_SIZE,
  FONT_FAMILY,
} from './const.js'

import { images } from './images.js'

/**
 * Используем два канваса — один для статики, другой для текстур с перемещением и анимацией
 * Можно упороться и вместо нижнего холста вовсе использовать фон на CSS
 */
 export const CANVAS_SELECTOR_STATIC = '#game_static'
 export const CANVAS_SELECTOR_DYNAMIC = '#game_dynamic'

class Canvas {
  _canvas
  _context
  _offscreenCanvas
  _offscreenContext
  _allowAutomaticUpdate

  constructor(selector, alpha = false) {
    this._canvas = document.querySelector(selector)
    this._context = this._canvas.getContext('2d', { alpha })

    /**
     * Используем offscreenCanvas, чтобы рисовать объекты вне DOM и потом рендерить в один заход
     * Фича не кроссбраузерная, можно добавить полифил, на крайняк вернемся к обычному контексту
     */
    this._offscreenCanvas = document.createElement('canvas')
    this._offscreenCanvas.width = this.width
    this._offscreenCanvas.height = this.height
    this._offscreenContext = this._offscreenCanvas.getContext('2d')

    this._canvas.offscreenCanvas = this._offscreenCanvas
  }

  get width() {
    return this._canvas.width
  }

  get height() {
    return this._canvas.height
  }

  // Вызываем после отрисовки кадра
  update() {
    this._context.drawImage(this._offscreenCanvas, 0, 0)
  }

  clear() {
    this._offscreenContext.clearRect(0, 0, this.width, this.height)

    // Костыль для неработающего update() после очистки _offscreenContext
    this._context.clearRect(0, 0, this.width, this.height)
  }

  measureText(text) {
    const { width } = this._offscreenContext.measureText(text)
    return Math.floor(width)
  }

  setFontSize(size) {
    this._offscreenContext.font = `${size}px '${FONT_FAMILY}'`
  }

  text(text, x, y, size, color, align = 'left') {
    this._offscreenContext.fillStyle = color
    this.setFontSize(size)
    this._offscreenContext.textAlign = align
    this._offscreenContext.textBaseline = 'middle'
    this._offscreenContext.fillText(text.toUpperCase(), x, y)
  }

  rect(topLeftX, topLeftY, width, height, fillColor) {
    this._offscreenContext.fillStyle = fillColor
    this._offscreenContext.fillRect(topLeftX, topLeftY, width, height)
  }

  image(texture, x, y, width = TILE_SIZE, height = TILE_SIZE) {
    const image = images[texture]
    this._offscreenContext.drawImage(image, x, y, width, height)
  }

  // Старое. Пока не требуется
  // colorCell(col, row, color) {
  //   const x = col * TILE_SIZE
  //   const y = row * TILE_SIZE

  //   this.context.fillStyle = color
  //   this.context.fillRect(x, y, TILE_SIZE, TILE_SIZE)
  // }
}

const canvasStatic = new Canvas(CANVAS_SELECTOR_STATIC)
const canvasDynamic = new Canvas(CANVAS_SELECTOR_DYNAMIC, true)

// Экспортируем динамический канвас как canvas, чтобы не писать везде canvasDynamic
export { canvasStatic, canvasDynamic as canvas }
