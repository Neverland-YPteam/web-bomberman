import {
  CanvasSelectors,
  TILE_SIZE,
  SPRITE_TEXTURE_SIZE,
  FONT_FAMILY,
} from '../const'

import { getImageCoords, sprite } from '../images'

/**
 * Используем два канваса — один для статики, другой для текстур с перемещением и анимацией
 * Можно упороться и вместо нижнего холста вовсе использовать фон на CSS
 */

class Canvas {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private _offscreenCanvas: HTMLCanvasElement | OffscreenCanvas
  private _offscreenContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

  // Альфа-канал не нужен для статического канваса, экономим ресурсы
  constructor(selector: CanvasSelectors, alpha = false) {
    const canvasEl = document.querySelector(selector)

    if (!canvasEl) {
      throw new Error(`Cannot find canvas element with selector: ${selector}`)
    }

    this._canvas = document.querySelector(selector) as HTMLCanvasElement
    this._context = this._canvas.getContext('2d', { alpha }) as CanvasRenderingContext2D

    /**
     * Используем offscreenCanvas, чтобы рисовать объекты вне DOM и потом рендерить в один заход
     * Поддерживается не везде, поэтому используем фолбэк в виде обычного канваса вне DOM
     * При этом игра не настолько блокирует основной поток, чтобы задействовать воркер
     */
    this._offscreenCanvas = window.OffscreenCanvas
      ? new OffscreenCanvas(this.width, this.height) as OffscreenCanvas
      : document.createElement('canvas') as HTMLCanvasElement

    this._offscreenCanvas.width = this.width
    this._offscreenCanvas.height = this.height
    this._offscreenContext = this._offscreenCanvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
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

  measureText(text: string) {
    const { width } = this._offscreenContext.measureText(text)
    return Math.floor(width)
  }

  setFontSize(size: number) {
    this._offscreenContext.font = `${size}px '${FONT_FAMILY}'`
  }

  text(
    text: string,
    x: number,
    y: number,
    size: number,
    color: string,
    align: CanvasTextAlign = 'left',
  ) {
    this.setFontSize(size)
    this._offscreenContext.fillStyle = color
    this._offscreenContext.textAlign = align
    this._offscreenContext.textBaseline = 'middle'
    this._offscreenContext.fillText(text.toUpperCase(), x, y)
  }

  rect(
    topLeftX: number,
    topLeftY: number,
    width: number,
    height: number,
    fillColor: string,
  ) {
    this._offscreenContext.fillStyle = fillColor
    this._offscreenContext.fillRect(topLeftX, topLeftY, width, height)
  }

  image(
    texture: number,
    x: number,
    y: number,
    width = TILE_SIZE,
    height = TILE_SIZE,
    angle?: number,
  ) {
    const [spriteX, spriteY] = getImageCoords(texture)

    if (angle) {
      this._offscreenContext.save()
      this._offscreenContext.translate(x + width / 2, y + height / 2)
      this._offscreenContext.rotate(angle * Math.PI / 180)
      this._offscreenContext.drawImage(
        sprite, spriteX, spriteY, SPRITE_TEXTURE_SIZE, SPRITE_TEXTURE_SIZE,
        -width / 2, -height / 2, width, height,
      )
      this._offscreenContext.restore()
    } else {
      this._offscreenContext.drawImage(
        sprite, spriteX, spriteY, SPRITE_TEXTURE_SIZE, SPRITE_TEXTURE_SIZE,
        x, y, width, height,
      )
    }
  }
}

let canvasStatic = new Canvas(CanvasSelectors.Static)
let canvasDynamic = new Canvas(CanvasSelectors.Dynamic, true)
let canvasModal = new Canvas(CanvasSelectors.Modal, true)

const updateCanvases = () => {
  canvasStatic = new Canvas(CanvasSelectors.Static)
  canvasDynamic = new Canvas(CanvasSelectors.Dynamic, true)
  canvasModal = new Canvas(CanvasSelectors.Modal, true)
}

// Экспортируем динамический канвас как canvas, чтобы не писать везде canvasDynamic
export { canvasStatic, canvasDynamic as canvas, canvasModal, updateCanvases }
