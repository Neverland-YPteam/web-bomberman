import { TAnimatableInstance } from './types'

import { BG_COLOR, TEXT_COLOR_DEFAULT, FONT_SIZE } from '../const'

import { canvasModal } from '../canvas'
import { level } from '../level'
import { stats } from '../stats'
import { hero } from '../hero'

const MODAL_WIDTH_PX = 320
const MODAL_HEIGHT_PX = 150

class Pause {
  private _pauseInstanceIntervals(instance: TAnimatableInstance) {
    instance.pauseIntervals()
  }

  private _resumeInstanceIntervals(instance: TAnimatableInstance) {
    instance.resumeIntervals()
  }

  private _showPauseModal() {
    canvasModal.rect(0, 0, canvasModal.width, canvasModal.height, 'rgba(0, 0, 0, 0.2')
    canvasModal.rect(
      canvasModal.width / 2 - MODAL_WIDTH_PX / 2,
      canvasModal.height / 2 - MODAL_HEIGHT_PX / 2,
      MODAL_WIDTH_PX,
      MODAL_HEIGHT_PX,
      BG_COLOR,
    )
    canvasModal.text(
      `Пауза`,
      canvasModal.width / 2,
      canvasModal.height / 2,
      FONT_SIZE,
      TEXT_COLOR_DEFAULT,
      'center',
    )
    canvasModal.update()
  }

  show() {
    this._showPauseModal()
    level.limitFrames?.pause()
    this._pauseInstanceIntervals(hero)
    level.enemies.forEach(this._pauseInstanceIntervals)
    Object.values(level.scorePopups).forEach(this._pauseInstanceIntervals)
    Object.values(level.bombs).forEach(this._pauseInstanceIntervals)
    Object.values(level.flames).forEach(this._pauseInstanceIntervals)
    stats.pauseIntervals()
  }

  hide() {
    level.limitFrames?.resume()
    this._resumeInstanceIntervals(hero)
    level.enemies.forEach(this._resumeInstanceIntervals)
    Object.values(level.scorePopups).forEach(this._resumeInstanceIntervals)
    Object.values(level.bombs).forEach(this._resumeInstanceIntervals)
    Object.values(level.flames).forEach(this._resumeInstanceIntervals)
    stats.resumeIntervals()
  }
}

export const pause = new Pause()
