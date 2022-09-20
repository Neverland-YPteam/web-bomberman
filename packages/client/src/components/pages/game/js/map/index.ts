/**
 * Штука, которая рисует статическое игровое поле (COLUMN, WALL, GRASS)
 * Используется level'ом
 */

 import {
  PANEL_HEIGHT_PX,
  MAP_TILES_COUNT_X,
  MAP_TILES_COUNT_Y,
  TILE_SIZE,
  textures,
} from '../const'

import { canvasStatic } from '../canvas'

const {
  TEXTURE_COLUMN,
  TEXTURE_GRASS,
} = textures

class Map {
  drawTexture(texture: number, col: number, row: number) {
    const x = col * TILE_SIZE
    const y = PANEL_HEIGHT_PX + row * TILE_SIZE

    canvasStatic.image(texture, x, y)
  }

  draw() {
    let rowIndex = 0

    while (rowIndex < MAP_TILES_COUNT_Y) {
      this.drawTexture(TEXTURE_COLUMN, 0, rowIndex)
      this.drawTexture(TEXTURE_COLUMN, MAP_TILES_COUNT_X - 1, rowIndex)

      const isEdge = rowIndex === 0 || rowIndex === MAP_TILES_COUNT_Y - 1

      if (isEdge) {
        let colIndex = 1

        while (colIndex < MAP_TILES_COUNT_X - 1) {
          this.drawTexture(TEXTURE_COLUMN, colIndex, rowIndex)
          colIndex++
        }
      }

      if (!isEdge) {
        let colIndex = 1

        while (colIndex < MAP_TILES_COUNT_X - 1) {
          const texture = rowIndex % 2 || colIndex % 2 ? TEXTURE_GRASS : TEXTURE_COLUMN
          this.drawTexture(texture, colIndex, rowIndex)
          colIndex++
        }
      }

      rowIndex++
    }
  }
}

export const map = new Map()
