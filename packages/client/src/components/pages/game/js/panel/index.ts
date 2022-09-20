/**
 * Верхняя панелька с информацией о времени, набранных очках и доступных жизнях
 */

import {
  PANEL_HEIGHT_PX,
  BG_COLOR,
  TEXT_COLOR,
  FONT_SIZE,
  TILE_SIZE,
  TIME_INITIAL_S,
  SCORE_INITIAL,
  LIVES_INITIAL,
  textures,
} from '../const'

import { canvasStatic } from '../canvas'

const { TEXTURE_HEART } = textures

const TEXT_GAP = 24
const TIME_TEXT = 'Время'

class Panel {
  _time = TIME_INITIAL_S
  _score = SCORE_INITIAL
  _lives = LIVES_INITIAL

  _timeTextWidth = 0
  _liveCountTextWidth = 0

  _text(text: string | number, x: number, align: CanvasTextAlign = 'left') {
    text = typeof text === 'string' ? text : String(text)

    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.text(text, x, PANEL_HEIGHT_PX / 2, FONT_SIZE, TEXT_COLOR, align)
  }

  _redraw() {
    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.rect(0, 0, canvasStatic.width, PANEL_HEIGHT_PX, BG_COLOR)

    this._liveCountTextWidth = canvasStatic.measureText(`×${this._lives}`)

    this._text(TIME_TEXT, TILE_SIZE)
    this._text(this._time, TILE_SIZE + this._timeTextWidth + TEXT_GAP)
    this._text(this._score, canvasStatic.width / 2, 'center')
    this._text(`×${this._lives}`, canvasStatic.width - TILE_SIZE, 'right')

    canvasStatic.image(
      TEXTURE_HEART,
      canvasStatic.width - TILE_SIZE * 2 - this._liveCountTextWidth - TEXT_GAP,
      PANEL_HEIGHT_PX / 2 - TILE_SIZE / 2
    )
  }

  init() {
    canvasStatic.setFontSize(FONT_SIZE)

    this._timeTextWidth = canvasStatic.measureText(TIME_TEXT)
    this._redraw()
  }

  updateTime(num: number) {
    this._time = num
    this._redraw()
  }

  updateScore(num: number) {
    this._score = num
    this._redraw()
  }

  updateLives(num: number) {
    this._lives = num
    this._redraw()
  }
}

export const panel = new Panel()
