/**
 * Класс отвечает за расположение героя, его движение по полю и способности
 */

import {
  TAxis, TCondition, TDirection, TDirectionX, TDirectionY,
  TFreeDirections, ICoords, ITextures, TBombsPlaced,
} from './types'

import { PANEL_HEIGHT_PX, TILE_SIZE, textures } from '../const'

import { PausableInterval } from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'
import { Control } from '../Control'
import { Bomb } from '../Bomb'
import { Flame } from '../Flame'

const {
  TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE, TEXTURE_GRASS,
  TEXTURE_HERO_RIGHT_STANDING, TEXTURE_HERO_RIGHT_SITTING,
  TEXTURE_HERO_RIGHT_MOVING_1, TEXTURE_HERO_RIGHT_MOVING_2,
  TEXTURE_HERO_LEFT_STANDING, TEXTURE_HERO_LEFT_SITTING,
  TEXTURE_HERO_LEFT_MOVING_1, TEXTURE_HERO_LEFT_MOVING_2,
  TEXTURE_HERO_UP_STANDING, TEXTURE_HERO_UP_SITTING,
  TEXTURE_HERO_UP_MOVING_1, TEXTURE_HERO_UP_MOVING_2,
  TEXTURE_HERO_DOWN_STANDING, TEXTURE_HERO_DOWN_SITTING,
  TEXTURE_HERO_DOWN_MOVING_1, TEXTURE_HERO_DOWN_MOVING_2,
  TEXTURE_HERO_DEAD_1, TEXTURE_HERO_DEAD_2, TEXTURE_HERO_DEAD_3, TEXTURE_HERO_DEAD_4,
  TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE,
} = textures

const heroTextures: ITextures = {
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
  dead: [TEXTURE_HERO_DEAD_1, TEXTURE_HERO_DEAD_2, TEXTURE_HERO_DEAD_3, TEXTURE_HERO_DEAD_4],
}

const KEY_LEFT = 'ArrowLeft'
const KEY_RIGHT = 'ArrowRight'
const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'
const KEY_BOMB_PLACE = 'Space'
const KEY_BOMB_DETONATE = 'ControlLeft'

const SPEED_DEFAULT = 3 // Скорость героя по умолчанию
const SPEED_IMPROVED = 4 // Скорость героя при активном бонусе
const TOLERANCE_PX = 9 // Допустимое отклонение от границ COLUMN или WALL для прохода героя между текстурами
const BOMBS_COUNT_DEFAULT = 1
const FIRE_RADIUS_DEFAULT = 1
const SAFE_BOUND_X_PX = 9 // Безопасная область HERO при контакте с ENEMY по оси X
const SAFE_BOUND_Y_PX = 3 // Безопасная область HERO при контакте с ENEMY по оси Y
const DIRECTION_DEFAULT: TDirectionX = 'right'
const TEXTURE_STANDING_CHANGE_INTERVAL_MS = 400 // Скорость анимации standing
const TEXTURE_MOVING_CHANGE_INTERVAL_MS = 150 // Скорость анимации moving
const TEXTURE_DEAD_CHANGE_INTERVAL_MS = 200 // Скорость анимации dead

const globalTextures = [TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE]
const bombTextures = [TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE]

export class Hero {
  private _controlLeft: null | Control = null
  private _controlRight: null | Control = null
  private _controlUp: null | Control = null
  private _controlDown: null | Control = null
  private _controlBombPlace: null | Control = null
  private _controlBombDetonate: null | Control = null

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

  private _bombsPlaced: TBombsPlaced = {}

  x = 0
  y = 0

  isDead = false
  speed = SPEED_DEFAULT

  abilities = {
    bombs: BOMBS_COUNT_DEFAULT, // Сколько бомб одновременно может размещать
    fire: FIRE_RADIUS_DEFAULT, // Радиус взрыва, не считая центральной клетки
    detonator: false, // Взрывает самую старую бомбу вручную
    wallpass: false, // Может ходить сквозь стены
    bombpass: false, // Может ходить сквозь бомбы
    firepass: false, // Взрывы не причиняют вреда
    immortal: false, // Враги и взрывы не причиняют вреда, выключается по таймауту
  }

  constructor() {
    this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, TEXTURE_STANDING_CHANGE_INTERVAL_MS)
    this._changeTextureInterval.start()
  }

  private get _coords(): ICoords {
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

  private get _isMoving() {
    return this._isMovingX || this._isMovingY
  }

  private get _condition(): TCondition {
    return this._isMoving ? 'moving' : 'standing'
  }

  private get _texturesCurrent() {
    return this.isDead
      ? heroTextures.dead
      : heroTextures[this._condition][this._mainDirection]
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

  private get _usedColsRows() {
    const quotientX = this.x / TILE_SIZE - 1
    const flooredX = Math.floor(quotientX)
    const cols = Number.isInteger(quotientX) ? [flooredX] : [flooredX, Math.ceil(quotientX)]

    const quotientY = this._coords.topLeft.y / TILE_SIZE
    const flooredY = Math.floor(quotientY)
    const rows = Number.isInteger(quotientY) ? [flooredY] : [flooredY, Math.ceil(quotientY)]

    return { cols, rows }
  }

  private _resetPosition() {
    this.x = TILE_SIZE
    this.y = PANEL_HEIGHT_PX + TILE_SIZE
    this._direction = 'right'
    this._lastDirection = 'right'
  }

  private _updateCoords(shiftX: number, shiftY: number) {
    this.x += shiftX
    this.y += shiftY
  }

  private _tryToMove(
    axis: TAxis,
    direction: TDirection,
    col: number,
    row: number,
    shiftX: number,
    shiftY: number,
  ) {
    const adjacentTile = level.getTileType(col, row)
    const isAbleToMove = this._isAbleToMove(adjacentTile, col, row)

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
      const col = direction === 'left'
        ? Math.floor((_coords.topLeft.x - this.speed) / TILE_SIZE)
        : Math.ceil((_coords.topLeft.x + this.speed) / TILE_SIZE)

      const row = Math.floor((_coords.topLeft.y + shiftY) / TILE_SIZE)
      const shiftX = direction === 'left' ? -this.speed : this.speed

      this._tryToMove('x', direction, col, row, shiftX, shiftY)
    }
  }

  private _tryToMoveY(direction: TDirectionY) {
    const { _coords } = this
    const moduloLeft = _coords.topLeft.x % TILE_SIZE
    const moduloRight = TILE_SIZE - _coords.topRight.x % TILE_SIZE
    const shiftX = moduloLeft <= this._tolerance ? -moduloLeft : moduloRight
    const shiftXPositive = Math.abs(shiftX)

    if (shiftXPositive <= this._tolerance) {
      const row = direction === 'up'
        ? Math.floor((_coords.topLeft.y - this.speed) / TILE_SIZE)
        : Math.ceil((_coords.topLeft.y + this.speed) / TILE_SIZE)

      const col = Math.floor((_coords.topLeft.x + shiftX) / TILE_SIZE)
      const shiftY = direction === 'up' ? -this.speed : this.speed

      this._tryToMove('y', direction, col, row, shiftX, shiftY)
    }
  }

  private _isAbleToMove(tile: number, col: number, row: number) {
    if (bombTextures.includes(tile)) {
      if (this.abilities.bombpass) {
        return true
      }

      const { cols, rows } = this._usedColsRows
      return cols.includes(col) && rows.includes(row)
    }

    if (this.abilities.wallpass) {
      return tile !== TEXTURE_COLUMN
    }

    return !globalTextures.includes(tile)
  }

  private _updateTextureIndex = () => {
    const isLast = this._currentTextureIndex === this._texturesCurrent.length - 1
    this._currentTextureIndex = isLast ? 0 : this._currentTextureIndex + 1

    if (isLast && this.isDead) {
      this._destroy()
    }
  }

  private _onBombPlaceKeyPress = (isPressed: boolean) => {
    if (isPressed) {
      this._tryToPlaceBomb()
    }
  }

  private _onBombDetonateKeyPress = (isPressed: boolean) => {
    if (isPressed && this.abilities.detonator) {
      level.explodeOldestBomb()
    }
  }

  private _tryToPlaceBomb() {
    if (Object.keys(this._bombsPlaced).length === this.abilities.bombs) {
      return
    }

    const col = Math.round(this._coords.topLeft.x / TILE_SIZE)
    const row = Math.round(this._coords.topLeft.y / TILE_SIZE)
    const texture = level.getTileType(col, row)

    if (bombTextures.includes(texture) || texture !== TEXTURE_GRASS) {
      return
    }

    const bomb = new Bomb(col, row, this._onBombExplosion)
    this._bombsPlaced[`${col}-${row}`] = bomb

    if (!this.abilities.detonator) {
      bomb.countdown()
    }
  }

  private _onBombExplosion = (col: number, row: number) => {
    delete this._bombsPlaced[`${col}-${row}`]
    new Flame(col, row, this.abilities.fire)
  }

  private _checkForFlameContact() {
    return level.burningCells.some(([col, row]) => col === this._coords.mainCol && row === this._coords.mainRow)
  }

  private _checkForEnemyContact() {
    return level.enemies.some((enemy) => {
      if (enemy.isDead) {
        return false
      }

      const hasContactXLeft = enemy.coords.topRight.x - this._coords.topLeft.x > SAFE_BOUND_X_PX
      const hasContactXRight = this._coords.topRight.x - enemy.coords.topLeft.x > SAFE_BOUND_X_PX
      const hasContactYTop = enemy.coords.bottomLeft.y - this._coords.topLeft.y > SAFE_BOUND_Y_PX
      const hasContactYBottom = this._coords.bottomLeft.y - enemy.coords.topLeft.y > SAFE_BOUND_Y_PX

      return hasContactXLeft && hasContactXRight && hasContactYTop && hasContactYBottom
    })
  }

  private _die() {
    this.isDead = true

    this._currentTextureIndex = -1
    this._changeTextureInterval?.stop()
    this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, TEXTURE_DEAD_CHANGE_INTERVAL_MS)
    this._changeTextureInterval.start()
    this._updateTextureIndex()

    level.onLose()
  }

  private _destroy() {
    this._changeTextureInterval?.stop()
    level.showHero = false
  }

  reset() {
    this.isDead = false
    this._resetPosition()
  }

  resetAbilities() {
    this.speed = SPEED_DEFAULT
    this.abilities.detonator = false
    this.abilities.wallpass = false
    this.abilities.bombpass = false
    this.abilities.firepass = false
    this.abilities.immortal = false
  }

  draw() {
    canvas.image(this._texturesCurrent[this._currentTextureIndex], this.x, this.y)
  }

  allowControl() {
    this._controlLeft = new Control(KEY_LEFT, (isPressed) => this._isTryingToMoveLeft = isPressed)
    this._controlRight = new Control(KEY_RIGHT, (isPressed) => this._isTryingToMoveRight = isPressed)
    this._controlUp = new Control(KEY_UP, (isPressed) => this._isTryingToMoveUp = isPressed)
    this._controlDown = new Control(KEY_DOWN, (isPressed) => this._isTryingToMoveDown = isPressed)
    this._controlBombPlace = new Control(KEY_BOMB_PLACE, this._onBombPlaceKeyPress)
    this._controlBombDetonate = new Control(KEY_BOMB_DETONATE, this._onBombDetonateKeyPress)
  }

  removeControl() {
    this._isTryingToMoveLeft = false
    this._isTryingToMoveRight = false
    this._isTryingToMoveUp = false
    this._isTryingToMoveDown = false

    this._controlLeft?.removeListeners()
    this._controlRight?.removeListeners()
    this._controlUp?.removeListeners()
    this._controlDown?.removeListeners()
    this._controlBombPlace?.removeListeners()
    this._controlBombDetonate?.removeListeners()
  }

  move() {
    if (this.isDead) {
      return
    }

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

      const interval = this._isMoving ? TEXTURE_MOVING_CHANGE_INTERVAL_MS : TEXTURE_STANDING_CHANGE_INTERVAL_MS

      this._changeTextureInterval.stop()
      this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, interval)
      this._changeTextureInterval.start()

      this._lastCondition = this._condition
      this._lastDirection = this._direction
    }

    const hasFlameContact = this._checkForFlameContact()

    if (hasFlameContact && !this.abilities.firepass) {
      this._die()
      return
    }

    const hasEnemyContact = this._checkForEnemyContact()

    if (hasEnemyContact) {
      this._die()
    }

    if (level.canExit) {
      const [doorCol, doorRow] = level.doorCoords

      if (this._coords.mainCol === doorCol && this._coords.mainRow === doorRow) {
        level.complete()
        return
      }
    }

    const tileType = level.getTileType(this._coords.mainCol, this._coords.mainRow)

    if (!level.isBonusPickedUp && tileType !== TEXTURE_WALL && tileType !== TEXTURE_WALL_SAFE) {
      const [bonusCol, bonusRow] = level.bonusCoords

      if (this._coords.mainCol === bonusCol && this._coords.mainRow === bonusRow) {
        level.pickUpBonus()
      }
    }
  }

  increaseSpeed = () => {
    this.speed = SPEED_IMPROVED
  }

  makeImmortal() {
    // @TODO Сделать неуязвимым
  }

  pauseIntervals() {
    this._changeTextureInterval.pause()
  }

  resumeIntervals() {
    this._changeTextureInterval.resume()
  }

  stopIntervals() {
    this._changeTextureInterval.stop()
  }
}

export const hero = new Hero()
