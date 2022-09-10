/**
 * Верхняя панелька с информацией о набранных очках и доступных жизнях
 */

import {
  PANEL_HEIGHT_PX,
  BG_COLOR,
  TEXT_COLOR,
  FONT_SIZE,
  TILE_SIZE,
  TEXTURE_HEART,
  LIVES_INITIAL,
} from './const.js'

import { canvasStatic } from './canvas.js'

const TEXT_GAP = 24
const SCORE_TEXT = 'Счет'
const SCORE_INITIAL = 0

class Panel {
  _score = SCORE_INITIAL
  _lives = LIVES_INITIAL

  _scoreTextWidth
  _liveCountTextWidth

  _text(text, x, align = 'left') {
    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.text(text, x, PANEL_HEIGHT_PX / 2, FONT_SIZE, TEXT_COLOR, align)
  }

  _redraw() {
    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.rect(0, 0, canvasStatic.width, PANEL_HEIGHT_PX, BG_COLOR)

    this._liveCountTextWidth = canvasStatic.measureText(`×${this._lives}`)

    this._text(SCORE_TEXT, TILE_SIZE)
    this._text(String(this._score), TILE_SIZE + this._scoreTextWidth + TEXT_GAP)
    this._text(`×${this._lives}`, canvasStatic.width - TILE_SIZE, 'right')

    canvasStatic.image(
      TEXTURE_HEART,
      canvasStatic.width - TILE_SIZE * 2 - this._liveCountTextWidth - TEXT_GAP,
      PANEL_HEIGHT_PX / 2 - TILE_SIZE / 2
    )
  }

  init() {
    canvasStatic.setFontSize(FONT_SIZE)

    this._scoreTextWidth = canvasStatic.measureText(SCORE_TEXT)
    this._redraw()
  }

  updateScore(num) {
    this._score = num
    this._redraw()
  }

  updateLives(num) {
    this._lives = num
    this._redraw()
  }
}

export const panel = new Panel()
