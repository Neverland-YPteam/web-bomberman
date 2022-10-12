// @TODO Убирать у бомбы таймер, когда персонаж берет бонус «Детонатор»

import { TExplosionCallback } from './types'

import { PANEL_HEIGHT_PX, TILE_SIZE, textures } from '../const'
import { PausableInterval, PausableTimeout } from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'

const { TEXTURE_GRASS, TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE } = textures
const bombTextures = [TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE, TEXTURE_BOMB_MEDIUM]

const EXPLOSION_DELAY_MS = 2000
const FRAMES_BEFORE_EXPLOSION = 11
const TEXTURE_CHANGE_INTERVAL_MS = EXPLOSION_DELAY_MS / FRAMES_BEFORE_EXPLOSION

class Bomb {
  private _col = 0
  private _row = 0
  private _x = 0
  private _y = 0
  private _currentTextureIndex = 0
  private _changeTextureInterval: null | PausableInterval = null
  private _explosionTimeout: null | PausableTimeout = null
  private _explosionCallback: null | TExplosionCallback = null

  id: string

  constructor(col: number, row: number, explosionCallback: TExplosionCallback) {
    this.id = `${col}-${row}`

    this._col = col
    this._row = row
    this._x = TILE_SIZE + col * TILE_SIZE
    this._y = TILE_SIZE + row * TILE_SIZE + PANEL_HEIGHT_PX

    this._explosionCallback = explosionCallback

    level.addBomb(this)
    level.updateTexture(this._texture, col, row)

    this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, TEXTURE_CHANGE_INTERVAL_MS)
    this._changeTextureInterval.start()
  }

  private _updateTextureIndex = () => {
    this._currentTextureIndex = this._currentTextureIndex === bombTextures.length - 1
      ? 0
      : this._currentTextureIndex + 1
  }

  private _clearExplosionTimeout() {
    this._explosionTimeout?.stop()
    this._explosionTimeout = null
  }

  private _checkForFlameContact() {
    return level.burningCells.some(([col, row]) => col === this._col && row === this._row)
  }

  private get _texture() {
    return bombTextures[this._currentTextureIndex]
  }

  update() {
    const willExplode = this._checkForFlameContact()
    willExplode ? this.explode() : this.draw()
  }

  draw() {
    canvas.image(this._texture, this._x, this._y)
  }

  countdown() {
    this._explosionTimeout = new PausableTimeout(this.explode, EXPLOSION_DELAY_MS)
    this._explosionTimeout.start()
  }

  explode = () => {
    this._clearExplosionTimeout()

    level.removeBomb(this.id)
    level.updateTexture(TEXTURE_GRASS, this._col, this._row)

    this._explosionCallback?.(this._col, this._row)
  }

  pauseIntervals() {
    this._changeTextureInterval?.pause()
    this._explosionTimeout?.pause()
  }

  resumeIntervals() {
    this._changeTextureInterval?.resume()
    this._explosionTimeout?.resume()
  }

  stopIntervals() {
    this._changeTextureInterval?.stop()
    this._explosionTimeout?.stop()
  }
}

export { Bomb }
