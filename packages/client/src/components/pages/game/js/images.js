/**
 * Ждем загрузки спрайта, затем вызываем onLoad
 */

import {
  RESOURCE_BASE_URL,
  SPRITE_TEXTURE_SIZE,
  textures,
} from './const.js'

import { onLoad } from './index.js'

const spriteTextureCoords = {
  [textures.TEXTURE_HEART]:               [7, 1],
  [textures.TEXTURE_COLUMN]:              [0, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_1]:    [1, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_2]:    [2, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_3]:    [3, 0],
  [textures.TEXTURE_WALL]:                [4, 0],
  [textures.TEXTURE_GRASS]:               [5, 0],
  [textures.TEXTURE_HERO_RIGHT_STAYING]:  [0, 1],
  [textures.TEXTURE_BALLOON_LEFT_3]:      [0, 5],
  [textures.TEXTURE_BALLOON_LEFT_2]:      [1, 5],
  [textures.TEXTURE_BALLOON_LEFT_1]:      [2, 5],
  [textures.TEXTURE_BALLOON_DEAD]:        [3, 5],
  [textures.TEXTURE_BALLOON_RIGHT_1]:     [4, 5],
  [textures.TEXTURE_BALLOON_RIGHT_2]:     [5, 5],
  [textures.TEXTURE_BALLOON_RIGHT_3]:     [6, 5],
  [textures.TEXTURE_BEAKER_LEFT_DEAD]:    [3, 6],
  [textures.TEXTURE_BEAKER_LEFT_1]:       [2, 6],
  [textures.TEXTURE_BEAKER_LEFT_2]:       [1, 6],
  [textures.TEXTURE_BEAKER_LEFT_3]:       [0, 6],
  [textures.TEXTURE_BEAKER_RIGHT_DEAD]:   [4, 6],
  [textures.TEXTURE_BEAKER_RIGHT_1]:      [5, 6],
  [textures.TEXTURE_BEAKER_RIGHT_2]:      [6, 6],
  [textures.TEXTURE_BEAKER_RIGHT_3]:      [7, 6],
  [textures.TEXTURE_LANTERN_LEFT_3]:      [0, 7],
  [textures.TEXTURE_LANTERN_LEFT_2]:      [1, 7],
  [textures.TEXTURE_LANTERN_LEFT_1]:      [2, 7],
  [textures.TEXTURE_LANTERN_DEAD]:        [3, 7],
  [textures.TEXTURE_LANTERN_RIGHT_1]:     [4, 7],
  [textures.TEXTURE_LANTERN_RIGHT_2]:     [5, 7],
  [textures.TEXTURE_LANTERN_RIGHT_3]:     [6, 7],
  [textures.TEXTURE_FACE_LEFT_3]:         [0, 8],
  [textures.TEXTURE_FACE_LEFT_2]:         [1, 8],
  [textures.TEXTURE_FACE_LEFT_1]:         [2, 8],
  [textures.TEXTURE_FACE_DEAD]:           [3, 8],
  [textures.TEXTURE_FACE_RIGHT_1]:        [4, 8],
  [textures.TEXTURE_FACE_RIGHT_2]:        [5, 8],
  [textures.TEXTURE_FACE_RIGHT_3]:        [6, 8],
  [textures.TEXTURE_JELLY_LEFT_DEAD]:     [3, 9],
  [textures.TEXTURE_JELLY_LEFT_1]:        [2, 9],
  [textures.TEXTURE_JELLY_LEFT_2]:        [1, 9],
  [textures.TEXTURE_JELLY_LEFT_3]:        [0, 9],
  [textures.TEXTURE_JELLY_RIGHT_DEAD]:    [4, 9],
  [textures.TEXTURE_JELLY_RIGHT_1]:       [5, 9],
  [textures.TEXTURE_JELLY_RIGHT_2]:       [6, 9],
  [textures.TEXTURE_JELLY_RIGHT_3]:       [7, 9],
  [textures.TEXTURE_GHOST_LEFT_3]:        [0, 10],
  [textures.TEXTURE_GHOST_LEFT_2]:        [1, 10],
  [textures.TEXTURE_GHOST_LEFT_1]:        [2, 10],
  [textures.TEXTURE_GHOST_DEAD]:          [3, 10],
  [textures.TEXTURE_GHOST_RIGHT_1]:       [4, 10],
  [textures.TEXTURE_GHOST_RIGHT_2]:       [5, 10],
  [textures.TEXTURE_GHOST_RIGHT_3]:       [6, 10],
  [textures.TEXTURE_BEAR_LEFT_3]:         [0, 11],
  [textures.TEXTURE_BEAR_LEFT_2]:         [1, 11],
  [textures.TEXTURE_BEAR_LEFT_1]:         [2, 11],
  [textures.TEXTURE_BEAR_DEAD]:           [3, 11],
  [textures.TEXTURE_BEAR_RIGHT_1]:        [4, 11],
  [textures.TEXTURE_BEAR_RIGHT_2]:        [5, 11],
  [textures.TEXTURE_BEAR_RIGHT_3]:        [6, 11],
  [textures.TEXTURE_COIN_DEAD]:           [2, 12],
  [textures.TEXTURE_COIN_LEFT_1]:         [1, 12],
  [textures.TEXTURE_COIN_LEFT_2]:         [0, 12],
  [textures.TEXTURE_COIN_RIGHT_1]:        [3, 12],
  [textures.TEXTURE_COIN_RIGHT_2]:        [4, 12],
  [textures.TEXTURE_COIN_SIDE]:           [5, 12],
}

let sprite

const loadSprite = () => {
  sprite = document.createElement('img')

  sprite.onload = onLoad
  sprite.src = `${RESOURCE_BASE_URL}/images/sprite.webp`
}

const getImageCoords = (texture) => {
  const [col, row] = spriteTextureCoords[texture]

  const x = col * SPRITE_TEXTURE_SIZE
  const y = row * SPRITE_TEXTURE_SIZE

  return [x, y]
}

export { loadSprite, sprite, getImageCoords }
