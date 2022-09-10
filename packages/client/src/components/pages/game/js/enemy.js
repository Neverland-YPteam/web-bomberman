/**
 * Здесь будет класс Enemy, отвечающий за врагов
 * По аналогии с Hero, но не синглтон
 *
 * Можно даже добавить несложный ИИ для высокоуровневых врагов
 * Если в поле зрения врага есть главный герой, меняем врагу направление движения
 */

 import {
  PANEL_HEIGHT_PX,
  TILE_SIZE,
  TEXTURE_COLUMN,
  TEXTURE_WALL,
  TEXTURE_BALLOON_LEFT,
  TEXTURE_BALLOON_RIGHT,
  TEXTURE_GHOST_LEFT,
  TEXTURE_GHOST_RIGHT,
  TEXTURE_COIN_LEFT,
  TEXTURE_COIN_RIGHT,
} from './const.js'

import {
  getRandomBoolean,
  getRandomArrayValue,
  omit,
  getBooleanWithProbability,
} from './utils.js'
import { canvas } from './canvas.js'
import { level } from './level.js'

const DIRECTIONS = ['left', 'right', 'up', 'down']
const DIRECTION_DEFAULT = 'right'
const DIRECTION_CHANGE_PROBABILITY_PTC = 40

const enemies = {
  balloon: {
    textures: {
      left: TEXTURE_BALLOON_LEFT,
      right: TEXTURE_BALLOON_RIGHT,
    },
    speed: 1,
  },
  ghost: {
    textures: {
      left: TEXTURE_GHOST_LEFT,
      right: TEXTURE_GHOST_RIGHT,
    },
    speed: 1,
    wallPass: true,
    unpredictable: true,
  },
  coin: {
    textures: {
      left: TEXTURE_COIN_LEFT,
      right: TEXTURE_COIN_RIGHT,
    },
    speed: 3,
    unpredictable: true,
  },
}

class Enemy {
  x
  y

  _lastDirectionX = DIRECTION_DEFAULT
  _direction
  _directionAxis

  _textures
  _speed
  _abilities

  constructor(name) {
    const {
      textures,
      speed,
      wallPass,
      unpredictable,
    } = enemies[name]

    this._textures = textures
    this._speed = speed
    this._wallPass = wallPass ?? false
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

  get _blockingTextures() {
    if (this._wallPass && getRandomBoolean()) {
      return [TEXTURE_COLUMN]
    }

    return [TEXTURE_COLUMN, TEXTURE_WALL]
  }

  get _texture() {
    return this._textures[this._lastDirectionX]
  }

  get _canRandomlyChangeDirection() {
    return this._unpredictable && getBooleanWithProbability(DIRECTION_CHANGE_PROBABILITY_PTC)
  }

  _getRandomDirection(directions) {
    return getRandomArrayValue(directions)
  }

  _changeDirection(omittedDirection) {
    const directionsFiltered = omit(DIRECTIONS, omittedDirection)
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

    this[axis] += this._direction === 'left' || this._direction === 'up'
      ? -this._speed
      : this._speed
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

    const isBetweenTilesX = _coords.topLeft.x % TILE_SIZE === 0
    const isBetweenTilesY = _coords.topLeft.y % TILE_SIZE === 0
    const isBetweenTiles = isBetweenTilesX && isBetweenTilesY

    if (!isBetweenTiles) {
      this._moveFurther()
      return
    }

    const adjacentTileLeft = _coords.topLeft.x - this._speed
    const adjacentTileRight = _coords.topRight.x + this._speed - 1
    const adjacentTileUp = _coords.topLeft.y - this._speed
    const adjacentTileDown = _coords.bottomLeft.y + this._speed - 1

    const adjacentTileTypes = {
      left: level.getTileType(
        Math.floor(adjacentTileLeft / TILE_SIZE),
        Math.floor(_coords.topLeft.y / TILE_SIZE),
      ),
      right: level.getTileType(
        Math.floor(adjacentTileRight / TILE_SIZE),
        Math.floor(_coords.topLeft.y / TILE_SIZE),
      ),
      up: level.getTileType(
        Math.floor(_coords.topLeft.x / TILE_SIZE),
        Math.floor(adjacentTileUp / TILE_SIZE),
      ),
      down: level.getTileType(
        Math.floor(_coords.topLeft.x / TILE_SIZE),
        Math.floor(adjacentTileDown / TILE_SIZE),
      )
    }

    const blockingTextures = this._blockingTextures
    const freeDirectionsForTurn = []

    let isBlockedFromAllSides = true

    Object.keys(adjacentTileTypes).forEach((direction) => {
      const texture = adjacentTileTypes[direction]
      const isBlocked = blockingTextures.includes(texture)

      if (isBlocked) {
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

    if (isBlockedFromAllSides) {
      return
    }

    const nextTile = adjacentTileTypes[_direction]
    const isAbleToMove = !blockingTextures.includes(nextTile)

    if (!isAbleToMove) {
      this._changeDirection(_direction)
    } else if (freeDirectionsForTurn.length && this._canRandomlyChangeDirection) {
      const newDirection = this._getRandomDirection(freeDirectionsForTurn)
      this._setDirection(newDirection)
    } else {
      this._moveFurther()
    }
  }
}

export { Enemy }
