import { nanoid } from 'nanoid'

import { TILE_SIZE } from '../const';
import { PausableInterval } from '../utils';
import { canvas } from '../canvas';
import { level } from '../level';
import { stats } from '../stats';

const COORDS_STEP_PX = 1
const COORDS_UPDATE_COUNT_MAX = 40
const COORDS_UPDATE_INTERVAL_MS = 30
const FONT_SIZE = 18

export class Score {
  private _score: number
  private _x: number
  private _y: number
  private _changeCoordsInterval: null | PausableInterval = null
  private _updateCount = 0

  id: string

  constructor(score: number, x: number, y: number) {
    this.id = nanoid()

    this._score = score;
    this._x = x;
    this._y = y;

    level.addScorePopup(this)
    stats.addScore(score)

    this._changeCoordsInterval = new PausableInterval(this._updateCoords, COORDS_UPDATE_INTERVAL_MS)
    this._changeCoordsInterval.start()
  }

  private _updateCoords = () => {
    if (this._updateCount === COORDS_UPDATE_COUNT_MAX) {
      this._destroy()
      return
    }

    this._y -= COORDS_STEP_PX
    this._updateCount++
  }

  private _destroy() {
    this._changeCoordsInterval?.stop()
    level.removeScorePopup(this.id)
  }

  draw() {
    canvas.text(String(this._score), this._x + TILE_SIZE / 2, this._y, FONT_SIZE, 'white', 'center')
  }

  pauseIntervals() {
    this._changeCoordsInterval?.pause()
  }

  resumeIntervals() {
    this._changeCoordsInterval?.resume()
  }
}
