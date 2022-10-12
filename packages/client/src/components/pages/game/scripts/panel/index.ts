/**
 * Верхняя панелька с информацией о времени, набранных очках и доступных жизнях
 */

import {
  PANEL_HEIGHT_PX,
  BG_COLOR,
  TEXT_COLOR_DEFAULT,
  TEXT_COLOR_ERROR,
  FONT_SIZE,
  TILE_SIZE,
  TIME_INITIAL_S,
  SCORE_INITIAL,
  LIVES_INITIAL,
  textures,
} from '../const'

import { canvasStatic } from '../canvas'
import { level } from '../level'

const { TEXTURE_HEART } = textures

const TEXT_GAP = 24
const TIME_TEXT = 'Время'
const LEVEL_TEXT = 'Ур'
const TIME_DANGER_MAX = 30

class Panel {
  private _time = TIME_INITIAL_S
  private _score = SCORE_INITIAL
  private _lives = LIVES_INITIAL
  private _timeTextWidth = 0

  private _text(
    text: string | number,
    x: number,
    color = TEXT_COLOR_DEFAULT,
    align: CanvasTextAlign = 'left',
  ) {
    text = typeof text === 'string' ? text : String(text)

    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.text(text, x, PANEL_HEIGHT_PX / 2, FONT_SIZE, color, align)
  }

  private _drawTime() {
    const timeColor = this._time > TIME_DANGER_MAX ? TEXT_COLOR_DEFAULT : TEXT_COLOR_ERROR

    this._text(TIME_TEXT, TILE_SIZE)
    this._text(this._time, TILE_SIZE + this._timeTextWidth + TEXT_GAP, timeColor)
  }

  private _drawScore() {
    this._text(this._score, TILE_SIZE * 11, TEXT_COLOR_DEFAULT, 'center')
  }

  private _drawLevelNumber() {
    const text = `${LEVEL_TEXT} ${level.currentLevel}`
    this._text(text, TILE_SIZE * 18, TEXT_COLOR_DEFAULT, 'center')
  }

  private _drawLives() {
    const liveCountTextWidth = canvasStatic.measureText(`×${this._lives}`)

    canvasStatic.image(
      TEXTURE_HEART,
      canvasStatic.width - TILE_SIZE * 2 - liveCountTextWidth - TEXT_GAP * 0.5,
      PANEL_HEIGHT_PX / 2 - TILE_SIZE / 2
    )

    this._text(`×${this._lives}`, canvasStatic.width - TILE_SIZE, TEXT_COLOR_DEFAULT, 'right')
  }

  private _redraw() {
    canvasStatic.setFontSize(FONT_SIZE)
    canvasStatic.rect(0, 0, canvasStatic.width, PANEL_HEIGHT_PX, BG_COLOR)

    this._drawTime()
    this._drawScore()
    this._drawLevelNumber()
    this._drawLives()

    canvasStatic.update()
  }

  init() {
    canvasStatic.setFontSize(FONT_SIZE)

    this._timeTextWidth = canvasStatic.measureText(TIME_TEXT)
    this._redraw()
  }

  updateTime(num: number, redraw = true) {
    this._time = num

    if (redraw) {
      this._redraw()
    }
  }

  updateScore(num: number, redraw = true) {
    this._score = num

    if (redraw) {
      this._redraw()
    }
  }

  updateLives(num: number, redraw = true) {
    this._lives = num

    if (redraw) {
      this._redraw()
    }
  }
}

export const panel = new Panel()
