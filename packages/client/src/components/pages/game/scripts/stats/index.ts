import { LIVES_INITIAL, SCORE_INITIAL, TIME_INITIAL_S } from '../const'

import { PausableInterval } from '../utils'
import { level } from '../level'
import { panel } from '../panel'

class Stats {
  private _score: number = SCORE_INITIAL
  private _time: number = TIME_INITIAL_S
  private _timeInterval: null | PausableInterval = null

  lives = LIVES_INITIAL

  constructor() {
    this.reset()
    this._resetInterval()
  }

  private _resetInterval() {
    this._timeInterval?.stop()
    this._timeInterval = new PausableInterval(this._updateTime, 1000)
    this._timeInterval.start()
  }

  private _updatePanel() {
    panel.updateTime(this._time, false)
    panel.updateScore(this._score, false)
    panel.updateLives(this.lives)
  }

  private _updateTime = () => {
    if (this._time === 0) {
      level.onTimeExpiration()

      this._timeInterval?.stop()
      this._timeInterval = null
    } else {
      this._time--
      this._updatePanel()
    }
  }

  get timeLeft() {
    return this._time
  }

  get score() {
    return this._score
  }

  reset() {
    this._score = SCORE_INITIAL
    this._time = TIME_INITIAL_S
    this.lives = LIVES_INITIAL
  }

  addScore(score: number) {
    this._score += score
    this._updatePanel()
  }

  addLife() {
    this.lives++
    this._updatePanel()
  }

  decreaseLife() {
    this.lives--
  }

  resetTime() {
    this._time = TIME_INITIAL_S
    this._updatePanel()
    this._resetInterval()
  }

  pauseIntervals() {
    this._timeInterval?.pause()
  }

  resumeIntervals() {
    this._timeInterval?.resume()
  }

  stopIntervals() {
    this._timeInterval?.stop()
  }
}

export const stats = new Stats()
