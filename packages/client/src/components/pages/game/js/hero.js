/**
 * Класс отвечает за расположение героя, его движение по полю и способности
 *
 * @TODO Реализовать смену текстуры при смене направления движения
 * @TODO Добавить анимацию в спокойном состоянии и при движении
 */

import {
  PANEL_HEIGHT_PX,
  TILE_SIZE,
  textures,
} from './const'

import { canvas } from './canvas'
import { level } from './level.js'
import { Controls } from './controls.js'

const {
  TEXTURE_COLUMN,
  TEXTURE_WALL,
  TEXTURE_HERO_RIGHT_STAYING,
} = textures

const HERO_SPEED_DEFAULT = 3 // Скорость героя по умолчанию
// const HERO_SPEED_IMPROVED = 4 // Скорость героя при активном бонусе
const HERO_TOLERANCE_PX = 9 // Допустимое отклонение от границ COLUMN или WALL для прохода героя между текстурами
const HERO_LIVES_DEFAULT = 3

class Hero {
  x
  y

  lives = HERO_LIVES_DEFAULT // Пока не используется, но будет
  speed = HERO_SPEED_DEFAULT // Либо HERO_SPEED_DEFAULT

  abilities = {
    bombs: 1, // Сколько бомб одновременно может размещать
    flame: 1, // Радиус взрыва, не считая центральной клетки
    detonator: false, // Взрывает самую старую бомбу вручную
    wallpass: false, // Может ходить сквозь стены
    bombpass: false, // Может ходить сквозь бомбы
    flamepass: false, // Взрывы не причиняют вреда
    immortal: false, // Враги и взрывы не причиняют вреда, выключается по таймауту
  }

  isMovingLeft = false
  isMovingRight = false
  isMovingUp = false
  isMovingDown = false

  constructor() {
    const controls = new Controls(this)
    controls.addListeners()
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

  get _tolerance() {
    const isXKeyPressed = this.isMovingLeft || this.isMovingRight
    const isYKeyPressed = this.isMovingUp || this.isMovingDown

    return isXKeyPressed && isYKeyPressed ? 0 : HERO_TOLERANCE_PX
  }

  _moveX(direction) {
    const { _coords } = this
    const moduloTop = _coords.topLeft.y % TILE_SIZE
    const moduloBottom = TILE_SIZE - _coords.bottomLeft.y % TILE_SIZE
    const shiftY = moduloTop <= this._tolerance ? -moduloTop : moduloBottom

    if (Math.abs(shiftY) <= this._tolerance) {
      const adjacentTileX = direction === 'left'
        ? _coords.topLeft.x - this.speed
        : _coords.topRight.x + this.speed - 1

      const newY = _coords.topLeft.y + shiftY
      const col = Math.floor(adjacentTileX / TILE_SIZE)
      const row = Math.floor(newY / TILE_SIZE)

      const adjacentTile = level.getTileType(col, row)
      const isAbleToMove = this._isAbleToMove(adjacentTile)

      if (isAbleToMove) {
        const shiftX = direction === 'left' ? -this.speed : this.speed

        this.x += shiftX
        this.y += shiftY
      }
    }
  }

  _moveY(direction) {
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
      const col = Math.floor(newX / TILE_SIZE)
      const row = Math.floor(adjacentTileY / TILE_SIZE)

      const adjacentTile = level.getTileType(col, row)
      const isAbleToMove = this._isAbleToMove(adjacentTile)

      if (isAbleToMove) {
        const shiftY = direction === 'up' ? -this.speed : this.speed

        this.x += shiftX
        this.y += shiftY
      }
    }
  }

  _isAbleToMove(tile) {
    const blockingTextures = [TEXTURE_COLUMN, TEXTURE_WALL]
    return !blockingTextures.includes(tile)
  }

  resetPosition() {
    this.x = TILE_SIZE
    this.y = PANEL_HEIGHT_PX + TILE_SIZE
  }

  draw() {
    canvas.image(TEXTURE_HERO_RIGHT_STAYING, this.x, this.y)
  }

  move() {
    if (this.isMovingLeft) {
      this._moveX('left')
    }
    if (this.isMovingRight) {
      this._moveX('right')
    }
    if (this.isMovingUp) {
      this._moveY('up')
    }
    if (this.isMovingDown) {
      this._moveY('down')
    }
  }
}

export const hero = new Hero()
