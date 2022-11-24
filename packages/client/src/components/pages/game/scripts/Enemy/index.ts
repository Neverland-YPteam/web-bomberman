/**
 * Класс, отвечающий за врагов и их характеристики
 * Можно даже добавить несложный ИИ для высокоуровневых врагов
 * Если в поле зрения врага есть главный герой, меняем врагу направление движения
 */

import { TEnemyName, TDirection, TDirectionX, ICoords } from './types'

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
  PausableInterval,
  PausableTimeout,
} from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'
import { enemyList } from './enemyList'
import { Score } from '../Score'

const {
  TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE,
  TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE,
} = textures

const DIRECTIONS: TDirection[] = ['left', 'right', 'up', 'down']
const DIRECTION_DEFAULT: TDirectionX = 'right'
const DIRECTION_CHANGE_PROBABILITY_PTC = 10
const TEXTURE_DEAD_CHANGE_INTERVAL_MS = 200
const IMMORTAL_DURATION_S = 3
const BLINKING_INTERVAL_MS = 500

const bombTextures = [TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE]
const blockingTexturesWallPass = [TEXTURE_COLUMN, TEXTURE_WALL_SAFE].concat(bombTextures)
const blockingTextures = blockingTexturesWallPass.concat(TEXTURE_WALL)

class Enemy {
  private _lastDirectionX: TDirectionX = DIRECTION_DEFAULT
  private _direction: TDirection = DIRECTION_DEFAULT
  private _directionAxis = ''

  private _textures
  private _speed
  private _wallPass
  private _canTurn
  private _unpredictable
  private _points

  private _isTextureVisible = true
  private _currentTextureIndex = 0
  private _changeTextureInterval: null | PausableInterval = null
  private _blinkingInterval: null | PausableInterval = null
  private _immortalTimeout: null | PausableTimeout = null

  id: string
  x = 0
  y = 0

  isDead = false
  isImmortal = false

  constructor(name: TEnemyName, id: string, immortal = false) {
    const {
      textures,
      speed,
      wallPass,
      canTurn,
      unpredictable,
      points,
    } = enemyList[name]

    this.id = id

    this._textures = textures
    this._speed = speed
    this._wallPass = wallPass ?? false
    this._canTurn = canTurn ?? false
    this._unpredictable = unpredictable ?? false
    this._points = points

    const randomDirection = this._getRandomDirection(DIRECTIONS) as TDirection
    this._setDirection(randomDirection)

    if (immortal) {
      this._makeImmortal()
    }
  }

  private get _backDirection() {
    if (this._directionAxis === 'x') {
      return this._direction === 'left' ? 'right' : 'left'
    }

    return this._direction === 'up' ? 'down' : 'up'
  }

  private get _blockingTextures() {
    return this._wallPass && getRandomBoolean()
      ? blockingTexturesWallPass
      : blockingTextures
  }

  private get _canRandomlyChangeDirection() {
    return this._unpredictable && getBooleanWithProbability(DIRECTION_CHANGE_PROBABILITY_PTC)
  }

  private get _usedColsRows() {
    const quotientX = this.x / TILE_SIZE - 1
    const flooredX = Math.floor(quotientX)
    const cols = Number.isInteger(quotientX) ? [flooredX] : [flooredX, Math.ceil(quotientX)]

    const quotientY = this.coords.topLeft.y / TILE_SIZE
    const flooredY = Math.floor(quotientY)
    const rows = Number.isInteger(quotientY) ? [flooredY] : [flooredY, Math.ceil(quotientY)]

    return { cols, rows }
  }

  get coords(): ICoords {
    const x = this.x - TILE_SIZE
    const y = this.y - PANEL_HEIGHT_PX - TILE_SIZE

    return {
      topLeft: { x, y },
      topRight: { x: x + TILE_SIZE, y },
      bottomLeft: { x, y: y + TILE_SIZE },
      bottomRight: { x: x + TILE_SIZE, y: y + TILE_SIZE },
      mainCol: Math.round(x / TILE_SIZE),
      mainRow: Math.round(y / TILE_SIZE),
    }
  }

  private _getRandomDirection(directions: TDirection[]) {
    return getRandomArrayValue(directions)
  }

  private _changeDirection(isBackBlocked: boolean) {
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

  private _setDirection(direction: TDirection) {
    const isDirectionX = direction === 'left' || direction === 'right'

    this._direction = direction
    this._directionAxis = isDirectionX ? 'x' : 'y'

    // Меняем горизонтальную текстуру
    if (isDirectionX) {
      this._lastDirectionX = direction
    }
  }

  private _moveFurther() {
    const axis = this._direction === 'left' || this._direction === 'right' ? 'x' : 'y'
    const shift = this._direction === 'left' || this._direction === 'up' ? -this._speed : this._speed

    this[axis] = floatNum(this[axis] + shift)
  }

  private get _texturesCurrent() {
    return this.isDead
      ? this._textures.dead[this._lastDirectionX]
      : this._textures[this._lastDirectionX]
  }

  private _updateTextureIndex = () => {
    const isLast = this._currentTextureIndex === this._texturesCurrent.length - 1
    this._currentTextureIndex = isLast ? 0 : this._currentTextureIndex + 1

    if (isLast && this.isDead) {
      this._destroy()
    }
  }

  private _checkForFlameContact() {
    const { cols, rows } = this._usedColsRows
    return level.burningCells.some(([col, row]) => cols.includes(col) && rows.includes(row))
  }

  private _die() {
    this.isDead = true

    this._currentTextureIndex = -1
    this._changeTextureInterval?.stop()
    this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, TEXTURE_DEAD_CHANGE_INTERVAL_MS)
    this._changeTextureInterval.start()
    this._updateTextureIndex()

    new Score(this._points, this.x, this.y)
  }

  private _destroy() {
    this._changeTextureInterval?.stop()
    level.removeEnemy(this.id)
  }

  private _toggleTextureVisibility = (isVisible?: boolean) => {
    this._isTextureVisible = isVisible ?? !this._isTextureVisible
  }

  private _makeImmortal = () => {
    this.isImmortal = true

    this._immortalTimeout = new PausableTimeout(this._makeMortal, IMMORTAL_DURATION_S * 1000)
    this._immortalTimeout.start()

    this._blinkingInterval = new PausableInterval(this._toggleTextureVisibility, BLINKING_INTERVAL_MS)
    this._blinkingInterval.start()
  }

  private _makeMortal = () => {
    this.isImmortal = false
    this._toggleTextureVisibility(true)

    this._immortalTimeout?.stop()
    this._immortalTimeout = null

    this._blinkingInterval?.stop()
    this._blinkingInterval = null
  }

  setPosition(row: number, col: number) {
    this.x = TILE_SIZE + col * TILE_SIZE
    this.y = PANEL_HEIGHT_PX + TILE_SIZE + row * TILE_SIZE
  }

  draw() {
    if (this._isTextureVisible) {
      canvas.image(this._texturesCurrent[this._currentTextureIndex], this.x, this.y)
    }
  }

  move() {
    if (this.isDead) {
      return
    }

    const hasFlameContact = this._checkForFlameContact()

    if (hasFlameContact && !this.isImmortal) {
      this._die()
      return
    }

    const { coords, _direction, _directionAxis } = this

    const isBetweenTilesX = floatNum(coords.topLeft.x % TILE_SIZE) === 0
    const isBetweenTilesY = floatNum(coords.topLeft.y % TILE_SIZE) === 0
    const isBetweenTiles = isBetweenTilesX && isBetweenTilesY

    if (!isBetweenTiles) {
      this._moveFurther()
      return
    }

    const adjacentTileLeft = floatNum(coords.topLeft.x - this._speed)
    const adjacentTileRight = floatNum(coords.topRight.x + this._speed - 0.1)
    const adjacentTileUp = floatNum(coords.topLeft.y - this._speed)
    const adjacentTileDown = floatNum(coords.bottomLeft.y + this._speed - 0.1)

    const adjacentTileTypes = {
      left: level.getTileType(
        Math.floor(floatNum(adjacentTileLeft / TILE_SIZE)),
        Math.floor(floatNum(coords.topLeft.y / TILE_SIZE)),
      ),
      right: level.getTileType(
        Math.floor(floatNum(adjacentTileRight / TILE_SIZE)),
        Math.floor(floatNum(coords.topLeft.y / TILE_SIZE)),
      ),
      up: level.getTileType(
        Math.floor(floatNum(coords.topLeft.x / TILE_SIZE)),
        Math.floor(floatNum(adjacentTileUp / TILE_SIZE)),
      ),
      down: level.getTileType(
        Math.floor(floatNum(coords.topLeft.x / TILE_SIZE)),
        Math.floor(floatNum(adjacentTileDown / TILE_SIZE)),
      )
    }

    const freeDirectionsForTurn: TDirection[] = []

    let isBackBlocked = false
    let isBlockedFromAllSides = true

    const adjacentTileTypeKeys = Object.keys(adjacentTileTypes) as TDirection[]

    adjacentTileTypeKeys.forEach((direction: TDirection) => {
      const texture = adjacentTileTypes[direction]
      const isBlocked = this._blockingTextures.includes(texture)

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
        this._changeTextureInterval.stop()
        this._changeTextureInterval = null
      }

      return
    }

    const nextTile = adjacentTileTypes[_direction]
    const isAbleToMove = !this._blockingTextures.includes(nextTile)

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
      this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, this._textures.interval)
      this._changeTextureInterval.start()
      this._updateTextureIndex()
    }
  }

  pauseIntervals() {
    this._changeTextureInterval?.pause()
    this._blinkingInterval?.pause()
    this._immortalTimeout?.pause()
  }

  resumeIntervals() {
    this._changeTextureInterval?.resume()
    this._blinkingInterval?.resume()
    this._immortalTimeout?.resume()
  }
}

export { Enemy }
