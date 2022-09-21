/**
 * Класс отвечает за расположение героя, его движение по полю и способности
 */

import {
  TAxis,
  TCondition,
  TDirection,
  TDirectionX,
  TDirectionY,
  TFreeDirections,
  IVertexCoords,
} from './types'

import {
  PANEL_HEIGHT_PX,
  TILE_SIZE,
  textures,
} from '../const'

import { canvas } from '../canvas'
import { level } from '../level'
import { Controls } from '../controls'

const {
  TEXTURE_COLUMN, TEXTURE_WALL,
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

const SPEED_DEFAULT = 3 // Скорость героя по умолчанию
// const SPEED_IMPROVED = 4 // Скорость героя при активном бонусе
const TOLERANCE_PX = 6 // Допустимое отклонение от границ COLUMN или WALL для прохода героя между текстурами
const DIRECTION_DEFAULT: TDirectionX = 'right'
const CHANGE_TEXTURE_STANDING_INTERVAL_MS = 400 // Скорость анимации standing
const CHANGE_TEXTURE_MOVING_INTERVAL_MS = 150 // Скорость анимации moving

export class Hero {
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
  private _changeTextureInterval: ReturnType<typeof setInterval>

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

  isTryingToMoveLeft = false
  isTryingToMoveRight = false
  isTryingToMoveUp = false
  isTryingToMoveDown = false

  constructor() {
    const controls = new Controls(this)
    controls.addListeners()

    this._changeTextureInterval = setInterval(this._updateTexture, CHANGE_TEXTURE_STANDING_INTERVAL_MS)
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
    const isXKeyPressed = this.isTryingToMoveLeft || this.isTryingToMoveRight
    const isYKeyPressed = this.isTryingToMoveUp || this.isTryingToMoveDown

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
    const blockingTextures = [TEXTURE_COLUMN, TEXTURE_WALL]
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

  move() {
    this._isMovingX = false
    this._isMovingY = false

    this._freeDirections.left = false
    this._freeDirections.right = false
    this._freeDirections.up = false
    this._freeDirections.down = false

    if (this.isTryingToMoveLeft && !this.isTryingToMoveRight) {
      this._tryToMoveX('left')
    }
    if (this.isTryingToMoveRight && !this.isTryingToMoveLeft) {
      this._tryToMoveX('right')
    }
    if (this.isTryingToMoveUp && !this.isTryingToMoveDown) {
      this._tryToMoveY('up')
    }
    if (this.isTryingToMoveDown && !this.isTryingToMoveUp) {
      this._tryToMoveY('down')
    }

    if (this._condition !== this._lastCondition || this._direction !== this._lastDirection) {
      this._currentTextureIndex = 0

      const interval = this._isMoving ? CHANGE_TEXTURE_MOVING_INTERVAL_MS : CHANGE_TEXTURE_STANDING_INTERVAL_MS
      clearInterval(this._changeTextureInterval)
      this._changeTextureInterval = setInterval(this._updateTexture, interval)

      this._lastCondition = this._condition
      this._lastDirection = this._direction
    }
  }
}

export const hero = new Hero()
