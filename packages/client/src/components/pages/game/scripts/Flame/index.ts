import {
  TTextures, TDirection, TBlockedDirections, TCellColRow,
} from './types'

import { PANEL_HEIGHT_PX, TILE_SIZE, textures } from '../const'
import { PausableInterval } from '../utils'
import { canvas } from '../canvas'
import { level } from '../level'
import { stats } from '../stats'

const {
  TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE,
  TEXTURE_WALL_DAMAGED_1, TEXTURE_WALL_DAMAGED_2, TEXTURE_WALL_DAMAGED_3,
  TEXTURE_WALL_DAMAGED_4, TEXTURE_WALL_DAMAGED_5, TEXTURE_WALL_DAMAGED_6,
  TEXTURE_WALL_DAMAGED_7, TEXTURE_FLAME_1, TEXTURE_FLAME_2,
  TEXTURE_FLAME_3_START, TEXTURE_FLAME_3_MIDDLE, TEXTURE_FLAME_3_END,
  TEXTURE_FLAME_4_START, TEXTURE_FLAME_4_MIDDLE, TEXTURE_FLAME_4_END,
  TEXTURE_FLAME_5_START, TEXTURE_FLAME_5_MIDDLE, TEXTURE_FLAME_5_END,
  TEXTURE_FLAME_6_START, TEXTURE_FLAME_6_MIDDLE, TEXTURE_FLAME_6_END,
} = textures

const flameTextures: TTextures = [
  [TEXTURE_FLAME_1],
  [TEXTURE_FLAME_2],
  [TEXTURE_FLAME_3_START, TEXTURE_FLAME_3_MIDDLE, TEXTURE_FLAME_3_END],
  [TEXTURE_FLAME_4_START, TEXTURE_FLAME_4_MIDDLE, TEXTURE_FLAME_4_END],
  [TEXTURE_FLAME_5_START, TEXTURE_FLAME_5_MIDDLE, TEXTURE_FLAME_5_END],
  [TEXTURE_FLAME_6_START, TEXTURE_FLAME_6_MIDDLE, TEXTURE_FLAME_6_END],
]

// Индекс первого набора полных текстур (в котором есть start, middle и end)
const TEXTURE_FULL_START_INDEX = 2
const TEXTURE_MIDDLE_INDEX = 1
const TEXTURE_END_INDEX = 2
const TEXTURE_CHANGE_INTERVAL_MS = 55

const WALL_DESTROYING_SCORE = 5

const imageAngles = {
  left: 180,
  right: 0,
  up: -90,
  down: 90,
}

export class Flame {
  private _col: number
  private _row: number
  private _x: number
  private _y: number
  private _radius: number
  private _currentTextureIndex = 0
  private _changeTextureInterval: null | PausableInterval = null
  private _isAnimationBackwards = false
  private _burningCells: TCellColRow[] = []
  private _cellsToRemove: TCellColRow[] = []
  private _wallBlockedDirections: TBlockedDirections = {}
  private _isDoorFired = false

  id: string

  constructor(col: number, row: number, radius: number) {
    this.id = `${col}-${row}`

    this._col = col
    this._row = row
    this._x = TILE_SIZE + col * TILE_SIZE
    this._y = TILE_SIZE + row * TILE_SIZE + PANEL_HEIGHT_PX
    this._radius = radius

    level.addFlame(this)

    this._changeTextureInterval = new PausableInterval(this._updateTextureIndex, TEXTURE_CHANGE_INTERVAL_MS)
    this._changeTextureInterval.start()
  }

  private _updateTextureIndex = () => {
    if (this._isAnimationBackwards && this._currentTextureIndex === TEXTURE_FULL_START_INDEX) {
      this._destroy()
    } else if (this._isAnimationBackwards) {
      this._currentTextureIndex--
    } else if (this._currentTextureIndex === flameTextures.length - 1) {
      this._isAnimationBackwards = true
      this._currentTextureIndex--
    } else {
      this._currentTextureIndex++
    }
  }

  private _destroy() {
    this._changeTextureInterval?.stop()
    level.removeFlame(this.id)
    this._cellsToRemove.forEach(level.removeWall)
  }

  private _getCellCount(direction: TDirection) {
    let counter = 1

    while (counter <= this._radius) {
      let col = this._col
      let row = this._row

      if (direction === 'left' || direction === 'right') {
        col = direction === 'left' ? col - counter : col + counter
      } else {
        row = direction === 'up' ? row - counter : row + counter
      }

      const texture = level.getTileType(col, row)

      if (texture === TEXTURE_COLUMN) {
        return counter - 1
      }

      if (texture === TEXTURE_WALL || texture === TEXTURE_WALL_SAFE) {
        this._cellsToRemove.push({ col, row })
        this._wallBlockedDirections[direction] = counter

        stats.addScore(WALL_DESTROYING_SCORE)

        return counter
      }

      this._handleDoorAndBonus(col, row)

      counter++
    }

    return counter - 1
  }

  private _handleDoorAndBonus(col: number, row: number) {
    const isDoor = level.isDoor(col, row)
    const isBonus = level.isBonus(col, row)

    if (isDoor && !this._isDoorFired) {
      level.addDoorEnemies()
      this._isDoorFired = true
    } else if (isBonus) {
      level.removeBonus()
    }
  }

  private get _textures() {
    return flameTextures[this._currentTextureIndex]
  }

  drawStartTexture() {
    const [texture] = this._textures
    canvas.image(texture, this._x, this._y)
  }

  drawMiddleTextures(direction: TDirection, middleTexturesCount: number) {
    let counter = 1

    while (counter <= middleTexturesCount) {
      const shift = counter * TILE_SIZE

      let col = this._col
      let row = this._row
      let x = this._x
      let y = this._y

      if (direction === 'left' || direction === 'right') {
        col = direction === 'left' ? this._col - counter : this._col + counter
        x = direction === 'left' ? this._x - shift : this._x + shift
      } else {
        row = direction === 'up' ? this._row - counter : this._row + counter
        y = direction === 'up' ? this._y - shift : this._y + shift
      }

      this._burningCells.push({ col, row })
      this.drawRotatedImage(this._textures[TEXTURE_MIDDLE_INDEX], x, y, direction)

      counter++
    }
  }

  drawEndTexture(direction: TDirection, shiftCells: number) {
    const shift = shiftCells * TILE_SIZE

    let col = this._col
    let row = this._row
    let x = this._x
    let y = this._y

    if (direction === 'left' || direction === 'right') {
      col = direction === 'left' ? this._col - shiftCells : this._col + shiftCells
      x = direction === 'left' ? x - shift : x + shift
    } else {
      row = direction === 'up' ? this._row - shiftCells : this._row + shiftCells
      y = direction === 'up' ? y - shift : y + shift
    }

    this._burningCells.push({ col, row })
    this.drawRotatedImage(this._textures[TEXTURE_END_INDEX], x, y, direction)
  }

  draw() {
    this._burningCells = [{ col: this._col, row: this._row }]

    this.drawStartTexture()

    if (this._currentTextureIndex < TEXTURE_FULL_START_INDEX && !this._isAnimationBackwards) {
      const [burningCell] = this._burningCells
      level.addBurningCell(burningCell)
      this._handleDoorAndBonus(burningCell.col, burningCell.row)
      return
    }

    const directions: TDirection[] = ['left', 'right', 'up', 'down']

    const cellCount = directions.reduce((obj, dir) => ({
      ...obj,
      [dir]: this._wallBlockedDirections[dir] || this._getCellCount(dir),
    }), {}) as Record<TDirection, number>

    directions.forEach((direction) => {
      const texturesCount = cellCount[direction]

      if (texturesCount === 0) {
        return
      }

      const middleTexturesCount = texturesCount - 1

      this.drawMiddleTextures(direction, middleTexturesCount)
      this.drawEndTexture(direction, texturesCount)
    })

    this._burningCells.forEach(level.addBurningCell)

    this._cellsToRemove.forEach((cell) => {
      if (this._currentTextureIndex === 2 && !this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_1, cell)
      } else if (this._currentTextureIndex === 3 && !this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_2, cell)
      } else if (this._currentTextureIndex === 4 && !this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_3, cell)
      } else if (this._currentTextureIndex === 5) {
        level.updateWall(TEXTURE_WALL_DAMAGED_4, cell)
      } else if (this._currentTextureIndex === 4 && this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_5, cell)
      } else if (this._currentTextureIndex === 3 && this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_6, cell)
      } else if (this._currentTextureIndex === 2 && this._isAnimationBackwards) {
        level.updateWall(TEXTURE_WALL_DAMAGED_7, cell)
      }
    })
  }

  drawRotatedImage(texture: number, x: number, y: number, direction: TDirection) {
    canvas.image(texture, x, y, TILE_SIZE, TILE_SIZE, imageAngles[direction])
  }

  pauseIntervals() {
    this._changeTextureInterval?.pause()
  }

  resumeIntervals() {
    this._changeTextureInterval?.resume()
  }
}
