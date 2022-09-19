/**
 * Класс, отвечающий за врагов и их характеристики
 * Можно даже добавить несложный ИИ для высокоуровневых врагов
 * Если в поле зрения врага есть главный герой, меняем врагу направление движения
 */

import {
  PANEL_HEIGHT_PX,
  TILE_SIZE,
  textures,
} from './const'

import {
  omit,
  getRandomBoolean,
  getRandomArrayValue,
  getBooleanWithProbability,
  floatNum,
} from './utils.js'
import { canvas } from './canvas'
import { level } from './level.js'
import { enemies } from './enemies-list.js'

const { TEXTURE_COLUMN, TEXTURE_WALL } = textures

const DIRECTIONS = ['left', 'right', 'up', 'down']
const DIRECTION_DEFAULT = 'right'
const DIRECTION_CHANGE_PROBABILITY_PTC = 40

class Enemy {
  x
  y

  _lastDirectionX = DIRECTION_DEFAULT
  _direction
  _directionAxis

  _textures
  _speed
  _wallpass
  _canTurn
  _unpredictable

  _changeTextureInterval
  _currentTextureIndex = 0

  constructor(name) {
    const {
      textures,
      speed,
      wallpass,
      canTurn,
      unpredictable,
    } = enemies[name]

    this._textures = textures
    this._speed = speed
    this._wallpass = wallpass ?? false
    this._canTurn = canTurn ?? false
    this._unpredictable = unpredictable ?? false

    this._setDirection(this._getRandomDirection(DIRECTIONS))
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
    if (this._wallpass && getRandomBoolean()) {
      return [TEXTURE_COLUMN]
    }

    return [TEXTURE_COLUMN, TEXTURE_WALL]
  }

  // get _texture() {
  //   return this._textures[this._lastDirectionX]
  // }

  get _canRandomlyChangeDirection() {
    return this._unpredictable && getBooleanWithProbability(DIRECTION_CHANGE_PROBABILITY_PTC)
  }

  _getRandomDirection(directions) {
    return getRandomArrayValue(directions)
  }

  _changeDirection(isBackBlocked) {
    const omittedDirections = [this._direction]

    if (!this._canTurn && !isBackBlocked) {
      if (this._directionAxis === 'x') {
        omittedDirections.push('up', 'down')
      } else {
        omittedDirections.push('left', 'right')
      }
    }

    const directionsFiltered = omit(DIRECTIONS, omittedDirections)
    this._setDirection(this._getRandomDirection(directionsFiltered))
  }

  _setDirection(direction) {
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

  setPosition(row, col) {
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
    const freeDirectionsForTurn = []

    let isBackBlocked = false
    let isBlockedFromAllSides = true

    Object.keys(adjacentTileTypes).forEach((direction) => {
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

    if (isBlockedFromAllSides && !this._wallpass) {
      if (this._changeTextureInterval) {
        this._changeTextureInterval = null
      }

      clearInterval(this._changeTextureInterval)
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
