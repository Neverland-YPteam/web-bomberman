/**
 * Класс отвечает за расположение героя, его движение по полю и способности
 */

import {
  TAxis, TCondition, TDirection, TDirectionX, TDirectionY, TFreeDirections, IVertexCoords,
} from './types'

import { PANEL_HEIGHT_PX, TILE_SIZE, textures } from '../const'

import { PausableInterval } from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'
import { Control } from '../Control'

const {
  TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE,
  TEXTURE_HERO_RIGHT_STANDING, TEXTURE_HERO_RIGHT_SITTING,
  TEXTURE_HERO_RIGHT_MOVING_1, TEXTURE_HERO_RIGHT_MOVING_2,
  TEXTURE_HERO_LEFT_STANDING, TEXTURE_HERO_LEFT_SITTING,
  TEXTURE_HERO_LEFT_MOVING_1, TEXTURE_HERO_LEFT_MOVING_2,
  TEXTURE_HERO_UP_STANDING, TEXTURE_HERO_UP_SITTING,
  TEXTURE_HERO_UP_MOVING_1, TEXTURE_HERO_UP_MOVING_2,
  TEXTURE_HERO_DOWN_STANDING, TEXTURE_HERO_DOWN_SITTING,
  TEXTURE_HERO_DOWN_MOVING_1, TEXTURE_HERO_DOWN_MOVING_2,
} = textures

const heroTextures = {
  standing: {
    left: [TEXTURE_HERO_LEFT_STANDING, TEXTURE_HERO_LEFT_SITTING],
    right: [TEXTURE_HERO_RIGHT_STANDING, TEXTURE_HERO_RIGHT_SITTING],
    up: [TEXTURE_HERO_UP_STANDING, TEXTURE_HERO_UP_SITTING],
    down: [TEXTURE_HERO_DOWN_STANDING, TEXTURE_HERO_DOWN_SITTING],
  },
  moving: {
    left: [TEXTURE_HERO_LEFT_MOVING_1, TEXTURE_HERO_LEFT_MOVING_2],
    right: [TEXTURE_HERO_RIGHT_MOVING_1, TEXTURE_HERO_RIGHT_MOVING_2],
    up: [TEXTURE_HERO_UP_MOVING_1, TEXTURE_HERO_UP_MOVING_2],
    down: [TEXTURE_HERO_DOWN_MOVING_1, TEXTURE_HERO_DOWN_MOVING_2],
  },
}
const KEY_LEFT = 'ArrowLeft'
const KEY_RIGHT = 'ArrowRight'
const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'

const SPEED_DEFAULT = 3 // Скорость героя по умолчанию
// const SPEED_IMPROVED = 4 // Скорость героя при активном бонусе
const TOLERANCE_PX = 9 // Допустимое отклонение от границ COLUMN или WALL для прохода героя между текстурами
const DIRECTION_DEFAULT: TDirectionX = 'right'
const CHANGE_TEXTURE_STANDING_INTERVAL_MS = 400 // Скорость анимации standing
const CHANGE_TEXTURE_MOVING_INTERVAL_MS = 150 // Скорость анимации moving

export class Hero {
  private _controlLeft: null | Control = null
  private _controlRight: null | Control = null
  private _controlUp: null | Control = null
  private _controlDown: null | Control = null

  private _isTryingToMoveLeft = false
  private _isTryingToMoveRight = false
  private _isTryingToMoveUp = false
  private _isTryingToMoveDown = false

  private _isMovingX = false
  private _isMovingY = false

  private _lastCondition: TCondition = 'standing'
  private _lastDirection: TDirection = DIRECTION_DEFAULT

  private _direction: TDirection = DIRECTION_DEFAULT
  private _freeDirections: TFreeDirections = {
    left: false,
    right: false,
    up: false,
    down: false,
  }

  private _currentTextureIndex = 0
  private _changeTextureInterval: PausableInterval

  x = 0
  y = 0

  speed = SPEED_DEFAULT

  abilities = {
    bombs: 1, // Сколько бомб одновременно может размещать
    flame: 1, // Радиус взрыва, не считая центральной клетки
    detonator: false, // Взрывает самую старую бомбу вручную
    wallPass: false, // Может ходить сквозь стены
    bombpass: false, // Может ходить сквозь бомбы
    flamepass: false, // Взрывы не причиняют вреда
    immortal: false, // Враги и взрывы не причиняют вреда, выключается по таймауту
  }

  constructor() {
    this._changeTextureInterval = new PausableInterval(this._updateTexture, CHANGE_TEXTURE_STANDING_INTERVAL_MS)
    this._changeTextureInterval.start()
  }

  private get _coords(): IVertexCoords {
    const x = this.x - TILE_SIZE
    const y = this.y - PANEL_HEIGHT_PX - TILE_SIZE

    return {
      topLeft: { x, y },
      topRight: { x: x + TILE_SIZE, y },
      bottomLeft: { x, y: y + TILE_SIZE },
      bottomRight: { x: x + TILE_SIZE, y: y + TILE_SIZE }
    }
  }

  private get _isMoving() {
    return this._isMovingX || this._isMovingY
  }

  private get _condition(): TCondition {
    return this._isMoving ? 'moving' : 'standing'
  }

  private get _texture() {
    return heroTextures[this._condition][this._mainDirection][this._currentTextureIndex]
  }

  private get _mainDirection() {
    if (this._freeDirections.down) {
      return 'down'
    }
    if (this._freeDirections.up) {
      return 'up'
    }
    if (this._freeDirections.right) {
      return 'right'
    }
    if (this._freeDirections.left) {
      return 'left'
    }
    return this._direction
  }

  private get _tolerance() {
    const isXKeyPressed = this._isTryingToMoveLeft || this._isTryingToMoveRight
    const isYKeyPressed = this._isTryingToMoveUp || this._isTryingToMoveDown

    return isXKeyPressed && isYKeyPressed ? 0 : TOLERANCE_PX
  }

  private _updateCoords(shiftX: number, shiftY: number) {
    this.x += shiftX
    this.y += shiftY
  }

  private _tryToMove(
    axis: TAxis,
    direction: TDirection,
    colX: number,
    rowY: number,
    shiftX: number,
    shiftY: number,
  ) {
    const col = Math.floor(colX / TILE_SIZE)
    const row = Math.floor(rowY / TILE_SIZE)

    const adjacentTile = level.getTileType(col, row)
    const isAbleToMove = this._isAbleToMove(adjacentTile)

    if (isAbleToMove) {
      if (axis === 'x') {
        this._isMovingX = true
      } else {
        this._isMovingY = true
      }

      this._freeDirections[direction] = true
      this._direction = direction

      this._updateCoords(shiftX, shiftY)
    }
  }

  private _tryToMoveX(direction: TDirectionX) {
    const { _coords } = this
    const moduloTop = _coords.topLeft.y % TILE_SIZE
    const moduloBottom = TILE_SIZE - _coords.bottomLeft.y % TILE_SIZE
    const shiftY = moduloTop <= this._tolerance ? -moduloTop : moduloBottom

    if (Math.abs(shiftY) <= this._tolerance) {
      const adjacentTileX = direction === 'left'
        ? _coords.topLeft.x - this.speed
        : _coords.topRight.x + this.speed - 1

      const newY = _coords.topLeft.y + shiftY
      const shiftX = direction === 'left' ? -this.speed : this.speed

      this._tryToMove('x', direction, adjacentTileX, newY, shiftX, shiftY)
    }
  }

  private _tryToMoveY(direction: TDirectionY) {
    const { _coords } = this
    const moduloLeft = _coords.topLeft.x % TILE_SIZE
    const moduloRight = TILE_SIZE - _coords.topRight.x % TILE_SIZE
    const shiftX = moduloLeft <= this._tolerance ? -moduloLeft : moduloRight
    const shiftXPositive = Math.abs(shiftX)

    if (shiftXPositive <= this._tolerance) {
      const adjacentTileY = direction === 'up'
        ? _coords.topLeft.y - this.speed
        : _coords.bottomLeft.y + this.speed - 1

      const newX = _coords.topLeft.x + shiftX
      const shiftY = direction === 'up' ? -this.speed : this.speed

      this._tryToMove('y', direction, newX, adjacentTileY, shiftX, shiftY)
    }
  }

  private _isAbleToMove(tile: number) {
    const blockingTextures = [TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE]
    return !blockingTextures.includes(tile)
  }

  private _updateTexture = () => {
    const textures = heroTextures[this._condition][this._mainDirection]

    this._currentTextureIndex = this._currentTextureIndex === textures.length - 1
      ? 0
      : this._currentTextureIndex + 1
  }

  resetPosition() {
    this.x = TILE_SIZE
    this.y = PANEL_HEIGHT_PX + TILE_SIZE
  }

  draw() {
    canvas.image(this._texture, this.x, this.y)
  }

  allowControl() {
    this._controlLeft = new Control(KEY_LEFT, (isPressed) => this._isTryingToMoveLeft = isPressed)
    this._controlRight = new Control(KEY_RIGHT, (isPressed) => this._isTryingToMoveRight = isPressed)
    this._controlUp = new Control(KEY_UP, (isPressed) => this._isTryingToMoveUp = isPressed)
    this._controlDown = new Control(KEY_DOWN, (isPressed) => this._isTryingToMoveDown = isPressed)
  }

  removeControl() {
    this._controlLeft?.removeListeners()
    this._controlRight?.removeListeners()
    this._controlUp?.removeListeners()
    this._controlDown?.removeListeners()
  }

  move() {
    this._isMovingX = false
    this._isMovingY = false

    this._freeDirections.left = false
    this._freeDirections.right = false
    this._freeDirections.up = false
    this._freeDirections.down = false

    if (this._isTryingToMoveLeft && !this._isTryingToMoveRight) {
      this._tryToMoveX('left')
    }
    if (this._isTryingToMoveRight && !this._isTryingToMoveLeft) {
      this._tryToMoveX('right')
    }
    if (this._isTryingToMoveUp && !this._isTryingToMoveDown) {
      this._tryToMoveY('up')
    }
    if (this._isTryingToMoveDown && !this._isTryingToMoveUp) {
      this._tryToMoveY('down')
    }

    if (this._condition !== this._lastCondition || this._direction !== this._lastDirection) {
      this._currentTextureIndex = 0

      const interval = this._isMoving ? CHANGE_TEXTURE_MOVING_INTERVAL_MS : CHANGE_TEXTURE_STANDING_INTERVAL_MS

      this._changeTextureInterval.stop()
      this._changeTextureInterval = new PausableInterval(this._updateTexture, interval)
      this._changeTextureInterval.start()

      this._lastCondition = this._condition
      this._lastDirection = this._direction
    }
  }

  pauseAnimation() {
    this._changeTextureInterval.pause()
  }

  resumeAnimation() {
    this._changeTextureInterval.resume()
  }
}

export const hero = new Hero()
