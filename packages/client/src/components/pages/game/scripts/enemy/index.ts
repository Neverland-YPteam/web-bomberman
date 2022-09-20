/**
 * Класс, отвечающий за врагов и их характеристики
 * Можно даже добавить несложный ИИ для высокоуровневых врагов
 * Если в поле зрения врага есть главный герой, меняем врагу направление движения
 */

import { TEnemyName, TDirection, TDirectionX } from './types'

import {
  PANEL_HEIGHT_PX,
  TILE_SIZE,
  textures,
} from '../const'

import {
  omit,
  getRandomBoolean,
  getRandomArrayValue,
  getBooleanWithProbability,
  floatNum,
} from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'
import { enemyList } from './enemyList'

const { TEXTURE_COLUMN, TEXTURE_WALL } = textures

const DIRECTIONS: TDirection[] = ['left', 'right', 'up', 'down']
const DIRECTION_DEFAULT: TDirectionX = 'right'
const DIRECTION_CHANGE_PROBABILITY_PTC = 40

class Enemy {
  x = 0
  y = 0

  _lastDirectionX: TDirectionX = DIRECTION_DEFAULT
  _direction: TDirection = DIRECTION_DEFAULT
  _directionAxis = ''

  _textures
  _speed
  _wallPass
  _canTurn
  _unpredictable

  _changeTextureInterval: null | ReturnType<typeof setInterval> = null
  _currentTextureIndex = 0

  constructor(name: TEnemyName) {
    const {
      textures,
      speed,
      wallPass,
      canTurn,
      unpredictable,
    } = enemyList[name]

    this._textures = textures
    this._speed = speed
    this._wallPass = wallPass ?? false
    this._canTurn = canTurn ?? false
    this._unpredictable = unpredictable ?? false

    const randomDirection = this._getRandomDirection(DIRECTIONS) as TDirection

    this._setDirection(randomDirection)
  }

  get _coords() {
    const x = this.x - TILE_SIZE
    const y = this.y - PANEL_HEIGHT_PX - TILE_SIZE

    return {
      topLeft: { x, y },
      topRight: { x: x + TILE_SIZE, y },
      bottomLeft: { x, y: y + TILE_SIZE },
      bottomRight: { x: x + TILE_SIZE, y: y + TILE_SIZE }
    }
  }

  get _backDirection() {
    if (this._directionAxis === 'x') {
      return this._direction === 'left' ? 'right' : 'left'
    }

    return this._direction === 'up' ? 'down' : 'up'
  }

  get _blockingTextures() {
    if (this._wallPass && getRandomBoolean()) {
      return [TEXTURE_COLUMN]
    }

    return [TEXTURE_COLUMN, TEXTURE_WALL]
  }

  get _canRandomlyChangeDirection() {
    return this._unpredictable && getBooleanWithProbability(DIRECTION_CHANGE_PROBABILITY_PTC)
  }

  _getRandomDirection(directions: TDirection[]) {
    return getRandomArrayValue(directions)
  }

  _changeDirection(isBackBlocked: boolean) {
    const omittedDirections = [this._direction]

    if (!this._canTurn && !isBackBlocked) {
      if (this._directionAxis === 'x') {
        omittedDirections.push('up', 'down')
      } else {
        omittedDirections.push('left', 'right')
      }
    }

    const directionsFiltered = omit(DIRECTIONS, omittedDirections) as TDirection[]
    const randomDirection = this._getRandomDirection(directionsFiltered) as TDirection

    this._setDirection(randomDirection)
  }

  _setDirection(direction: TDirection) {
    const isDirectionX = direction === 'left' || direction === 'right'

    this._direction = direction
    this._directionAxis = isDirectionX ? 'x' : 'y'

    // Меняем горизонтальную текстуру
    if (isDirectionX) {
      this._lastDirectionX = direction
    }
  }

  _moveFurther() {
    const axis = this._direction === 'left' || this._direction === 'right' ? 'x' : 'y'
    const shift = this._direction === 'left' || this._direction === 'up' ? -this._speed : this._speed

    this[axis] = floatNum(this[axis] + shift)
  }

  get _texture() {
    return this._textures[this._lastDirectionX][this._currentTextureIndex]
  }

  _updateTexture = () => {
    const textures = this._textures[this._lastDirectionX]

    this._currentTextureIndex = this._currentTextureIndex === textures.length - 1
      ? 0
      : this._currentTextureIndex + 1
  }

  setPosition(row: number, col: number) {
    this.x = TILE_SIZE + col * TILE_SIZE
    this.y = PANEL_HEIGHT_PX + TILE_SIZE + row * TILE_SIZE
  }

  draw() {
    canvas.image(this._texture, this.x, this.y)
  }

  move() {
    const { _coords, _direction, _directionAxis } = this

    const isBetweenTilesX = floatNum(_coords.topLeft.x % TILE_SIZE) === 0
    const isBetweenTilesY = floatNum(_coords.topLeft.y % TILE_SIZE) === 0
    const isBetweenTiles = isBetweenTilesX && isBetweenTilesY

    if (!isBetweenTiles) {
      this._moveFurther()
      return
    }

    const adjacentTileLeft = floatNum(_coords.topLeft.x - this._speed)
    const adjacentTileRight = floatNum(_coords.topRight.x + this._speed - 0.1)
    const adjacentTileUp = floatNum(_coords.topLeft.y - this._speed)
    const adjacentTileDown = floatNum(_coords.bottomLeft.y + this._speed - 0.1)

    const adjacentTileTypes = {
      left: level.getTileType(
        Math.floor(floatNum(adjacentTileLeft / TILE_SIZE)),
        Math.floor(floatNum(_coords.topLeft.y / TILE_SIZE)),
      ),
      right: level.getTileType(
        Math.floor(floatNum(adjacentTileRight / TILE_SIZE)),
        Math.floor(floatNum(_coords.topLeft.y / TILE_SIZE)),
      ),
      up: level.getTileType(
        Math.floor(floatNum(_coords.topLeft.x / TILE_SIZE)),
        Math.floor(floatNum(adjacentTileUp / TILE_SIZE)),
      ),
      down: level.getTileType(
        Math.floor(floatNum(_coords.topLeft.x / TILE_SIZE)),
        Math.floor(floatNum(adjacentTileDown / TILE_SIZE)),
      )
    }

    const blockingTextures = this._blockingTextures
    const freeDirectionsForTurn: TDirection[] = []

    let isBackBlocked = false
    let isBlockedFromAllSides = true

    const adjacentTileTypeKeys = Object.keys(adjacentTileTypes) as TDirection[]

    adjacentTileTypeKeys.forEach((direction: TDirection) => {
      const texture = adjacentTileTypes[direction]
      const isBlocked = blockingTextures.includes(texture)

      if (isBlocked) {
        if (direction === this._backDirection) {
          isBackBlocked = true
        }

        return
      }

      isBlockedFromAllSides = false

      const isTurnDirectionX = direction === 'left' || direction === 'right'
      const isTurnDirectionY = !isTurnDirectionX

      if (_directionAxis === 'x' && isTurnDirectionY) {
        freeDirectionsForTurn.push(direction)
      } else if (_directionAxis === 'y' && isTurnDirectionX) {
        freeDirectionsForTurn.push(direction)
      }
    })

    if (isBlockedFromAllSides && !this._wallPass) {
      if (this._changeTextureInterval) {
        clearInterval(this._changeTextureInterval)
        this._changeTextureInterval = null
      }

      return
    }

    const nextTile = adjacentTileTypes[_direction]
    const isAbleToMove = !blockingTextures.includes(nextTile)

    if (!isAbleToMove) {
      this._changeDirection(isBackBlocked)
    } else if (freeDirectionsForTurn.length > 0 && this._canRandomlyChangeDirection) {
      const newDirection = this._getRandomDirection(freeDirectionsForTurn)
      this._setDirection(newDirection)
    } else {
      this._moveFurther()
    }

    if (!this._changeTextureInterval) {
      this._currentTextureIndex = 0
      this._changeTextureInterval = setInterval(this._updateTexture, this._textures.interval)
      this._updateTexture()
    }
  }
}

export { Enemy }
