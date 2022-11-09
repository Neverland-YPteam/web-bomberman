/**
 * Штука, которая рисует статическое игровое поле (COLUMN, WALL, GRASS)
 * Используется level'ом
 */

import { TTextures } from './types'

import {
  PANEL_HEIGHT_PX,
  MAP_TILES_COUNT_X,
  MAP_TILES_COUNT_Y,
  TILE_SIZE,
  textures,
} from '../const'

import { getRandomNumberBetween } from '../utils'
import { canvasStatic } from '../canvas'

const {
  TEXTURE_COLUMN, TEXTURE_COLUMN_DAMAGED_1, TEXTURE_COLUMN_DAMAGED_2, TEXTURE_COLUMN_DAMAGED_3, TEXTURE_GRASS,
} = textures

const DAMAGED_COLUMN_RATIO = 20

const textureColumnsDamaged = [TEXTURE_COLUMN_DAMAGED_1, TEXTURE_COLUMN_DAMAGED_2, TEXTURE_COLUMN_DAMAGED_3]

class Map {
  private _textures: TTextures = {}

  private _getRandomColumnTexture() {
    const damagedColumnTextureIndex = getRandomNumberBetween(0, DAMAGED_COLUMN_RATIO)
    return textureColumnsDamaged[damagedColumnTextureIndex] ?? TEXTURE_COLUMN
  }

  getTexture(col: number, row: number) {
    return this._textures[`${col}-${row}`]
  }

  drawTexture(texture: number, col: number, row: number) {
    const x = col * TILE_SIZE
    const y = PANEL_HEIGHT_PX + row * TILE_SIZE

    this._textures[`${col}-${row}`] = texture

    canvasStatic.image(texture, x, y)
  }

  draw() {
    let rowIndex = 0

    while (rowIndex < MAP_TILES_COUNT_Y) {
      this.drawTexture(this._getRandomColumnTexture(), 0, rowIndex)
      this.drawTexture(this._getRandomColumnTexture(), MAP_TILES_COUNT_X - 1, rowIndex)

      const isEdge = rowIndex === 0 || rowIndex === MAP_TILES_COUNT_Y - 1

      let colIndex = 1

      while (colIndex < MAP_TILES_COUNT_X - 1) {
        if (isEdge) {
          this.drawTexture(this._getRandomColumnTexture(), colIndex, rowIndex)
        } else {
          const texture = rowIndex % 2 === 0 && colIndex % 2 === 0
            ? TEXTURE_COLUMN
            : TEXTURE_GRASS

          this.drawTexture(texture, colIndex, rowIndex)
        }

        colIndex++
      }

      rowIndex++
    }
  }
}

export const map = new Map()
