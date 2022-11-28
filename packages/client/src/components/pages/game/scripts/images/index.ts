/**
 * Ждем загрузки спрайта, затем вызываем onLoad
 */

import { TCoords } from './types'
import imageSprite from '../../images/sprite.webp'

import {
  SPRITE_TEXTURE_SIZE,
  textures,
} from '../const'

import { onLoad } from '../'

const spriteTextureCoords: TCoords = {
  [textures.TEXTURE_COLUMN]:               [0, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_1]:     [1, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_2]:     [2, 0],
  [textures.TEXTURE_COLUMN_DAMAGED_3]:     [3, 0],
  [textures.TEXTURE_GRASS]:                [4, 0],
  [textures.TEXTURE_WALL]:                 [0, 1],
  [textures.TEXTURE_WALL_SAFE]:            [1, 1],
  [textures.TEXTURE_WALL_DAMAGED_1]:       [2, 1],
  [textures.TEXTURE_WALL_DAMAGED_2]:       [3, 1],
  [textures.TEXTURE_WALL_DAMAGED_3]:       [4, 1],
  [textures.TEXTURE_WALL_DAMAGED_4]:       [5, 1],
  [textures.TEXTURE_WALL_DAMAGED_5]:       [6, 1],
  [textures.TEXTURE_WALL_DAMAGED_6]:       [7, 1],
  [textures.TEXTURE_WALL_DAMAGED_7]:       [8, 1],
  [textures.TEXTURE_DOOR]:                 [8, 2],
  [textures.TEXTURE_BOMB_SMALL]:           [5, 0],
  [textures.TEXTURE_BOMB_MEDIUM]:          [6, 0],
  [textures.TEXTURE_BOMB_LARGE]:           [7, 0],
  [textures.TEXTURE_HEART]:                [8, 0],
  [textures.TEXTURE_FLAME_1]:              [7, 3],
  [textures.TEXTURE_FLAME_2]:              [7, 2],
  [textures.TEXTURE_FLAME_3_START]:        [4, 5],
  [textures.TEXTURE_FLAME_3_MIDDLE]:       [5, 5],
  [textures.TEXTURE_FLAME_3_END]:          [6, 5],
  [textures.TEXTURE_FLAME_4_START]:        [4, 4],
  [textures.TEXTURE_FLAME_4_MIDDLE]:       [5, 4],
  [textures.TEXTURE_FLAME_4_END]:          [6, 4],
  [textures.TEXTURE_FLAME_5_START]:        [4, 3],
  [textures.TEXTURE_FLAME_5_MIDDLE]:       [5, 3],
  [textures.TEXTURE_FLAME_5_END]:          [6, 3],
  [textures.TEXTURE_FLAME_6_START]:        [4, 2],
  [textures.TEXTURE_FLAME_6_MIDDLE]:       [5, 2],
  [textures.TEXTURE_FLAME_6_END]:          [6, 2],
  [textures.TEXTURE_SHADOW_TL_T_L]:        [7, 6],
  [textures.TEXTURE_SHADOW_TL_T]:          [7, 7],
  [textures.TEXTURE_SHADOW_TL_L]:          [7, 8],
  [textures.TEXTURE_SHADOW_TL]:            [7, 9],
  [textures.TEXTURE_SHADOW_T]:             [7, 10],
  [textures.TEXTURE_SHADOW_L]:             [7, 11],
  [textures.TEXTURE_FLOWER_1]:             [8, 4],
  [textures.TEXTURE_FLOWER_2]:             [8, 5],
  [textures.TEXTURE_FLOWER_3]:             [8, 6],
  [textures.TEXTURE_FLOWER_4]:             [8, 7],
  [textures.TEXTURE_FLOWER_5]:             [8, 8],
  [textures.TEXTURE_FLOWER_6]:             [8, 9],
  [textures.TEXTURE_FLOWER_7]:             [8, 10],
  [textures.TEXTURE_FLOWER_8]:             [8, 11],
  [textures.TEXTURE_FLOWER_9]:             [8, 12],
  [textures.TEXTURE_FLOWER_10]:            [8, 13],
  [textures.TEXTURE_FLOWER_11]:            [8, 14],
  [textures.TEXTURE_FLOWER_12]:            [8, 15],
  [textures.TEXTURE_BONUS_BOMB]:           [0, 16],
  [textures.TEXTURE_BONUS_FIRE]:           [1, 16],
  [textures.TEXTURE_BONUS_SPEED]:          [2, 16],
  [textures.TEXTURE_BONUS_WALLPASS]:       [3, 16],
  [textures.TEXTURE_BONUS_DETONATOR]:      [4, 16],
  [textures.TEXTURE_BONUS_BOMBPASS]:       [5, 16],
  [textures.TEXTURE_BONUS_FIREPASS]:       [6, 16],
  [textures.TEXTURE_BONUS_IMMORTAL]:       [7, 16],
  [textures.TEXTURE_HERO_LEFT_STANDING]:   [0, 2],
  [textures.TEXTURE_HERO_LEFT_SITTING]:    [0, 3],
  [textures.TEXTURE_HERO_LEFT_MOVING_1]:   [0, 4],
  [textures.TEXTURE_HERO_LEFT_MOVING_2]:   [0, 5],
  [textures.TEXTURE_HERO_RIGHT_STANDING]:  [1, 2],
  [textures.TEXTURE_HERO_RIGHT_SITTING]:   [1, 3],
  [textures.TEXTURE_HERO_RIGHT_MOVING_1]:  [1, 4],
  [textures.TEXTURE_HERO_RIGHT_MOVING_2]:  [1, 5],
  [textures.TEXTURE_HERO_UP_STANDING]:     [2, 2],
  [textures.TEXTURE_HERO_UP_SITTING]:      [2, 3],
  [textures.TEXTURE_HERO_UP_MOVING_1]:     [2, 4],
  [textures.TEXTURE_HERO_UP_MOVING_2]:     [2, 5],
  [textures.TEXTURE_HERO_DOWN_STANDING]:   [3, 2],
  [textures.TEXTURE_HERO_DOWN_SITTING]:    [3, 3],
  [textures.TEXTURE_HERO_DOWN_MOVING_1]:   [3, 4],
  [textures.TEXTURE_HERO_DOWN_MOVING_2]:   [3, 5],
  [textures.TEXTURE_BALLOON_LEFT_3]:       [0, 9],
  [textures.TEXTURE_BALLOON_LEFT_2]:       [1, 9],
  [textures.TEXTURE_BALLOON_LEFT_1]:       [2, 9],
  [textures.TEXTURE_BALLOON_DEAD]:         [3, 9],
  [textures.TEXTURE_BALLOON_RIGHT_1]:      [4, 9],
  [textures.TEXTURE_BALLOON_RIGHT_2]:      [5, 9],
  [textures.TEXTURE_BALLOON_RIGHT_3]:      [6, 9],
  [textures.TEXTURE_BEAKER_LEFT_DEAD]:     [3, 12],
  [textures.TEXTURE_BEAKER_LEFT_1]:        [2, 12],
  [textures.TEXTURE_BEAKER_LEFT_2]:        [1, 12],
  [textures.TEXTURE_BEAKER_LEFT_3]:        [0, 12],
  [textures.TEXTURE_BEAKER_RIGHT_DEAD]:    [4, 12],
  [textures.TEXTURE_BEAKER_RIGHT_1]:       [5, 12],
  [textures.TEXTURE_BEAKER_RIGHT_2]:       [6, 12],
  [textures.TEXTURE_BEAKER_RIGHT_3]:       [7, 12],
  [textures.TEXTURE_LANTERN_LEFT_3]:       [0, 7],
  [textures.TEXTURE_LANTERN_LEFT_2]:       [1, 7],
  [textures.TEXTURE_LANTERN_LEFT_1]:       [2, 7],
  [textures.TEXTURE_LANTERN_DEAD]:         [3, 7],
  [textures.TEXTURE_LANTERN_RIGHT_1]:      [4, 7],
  [textures.TEXTURE_LANTERN_RIGHT_2]:      [5, 7],
  [textures.TEXTURE_LANTERN_RIGHT_3]:      [6, 7],
  [textures.TEXTURE_FACE_LEFT_3]:          [0, 10],
  [textures.TEXTURE_FACE_LEFT_2]:          [1, 10],
  [textures.TEXTURE_FACE_LEFT_1]:          [2, 10],
  [textures.TEXTURE_FACE_DEAD]:            [3, 10],
  [textures.TEXTURE_FACE_RIGHT_1]:         [4, 10],
  [textures.TEXTURE_FACE_RIGHT_2]:         [5, 10],
  [textures.TEXTURE_FACE_RIGHT_3]:         [6, 10],
  [textures.TEXTURE_GHOST_LEFT_3]:         [0, 8],
  [textures.TEXTURE_GHOST_LEFT_2]:         [1, 8],
  [textures.TEXTURE_GHOST_LEFT_1]:         [2, 8],
  [textures.TEXTURE_GHOST_DEAD]:           [3, 8],
  [textures.TEXTURE_GHOST_RIGHT_1]:        [4, 8],
  [textures.TEXTURE_GHOST_RIGHT_2]:        [5, 8],
  [textures.TEXTURE_GHOST_RIGHT_3]:        [6, 8],
  [textures.TEXTURE_JELLY_LEFT_DEAD]:      [3, 13],
  [textures.TEXTURE_JELLY_LEFT_1]:         [2, 13],
  [textures.TEXTURE_JELLY_LEFT_2]:         [1, 13],
  [textures.TEXTURE_JELLY_LEFT_3]:         [0, 13],
  [textures.TEXTURE_JELLY_RIGHT_DEAD]:     [4, 13],
  [textures.TEXTURE_JELLY_RIGHT_1]:        [5, 13],
  [textures.TEXTURE_JELLY_RIGHT_2]:        [6, 13],
  [textures.TEXTURE_JELLY_RIGHT_3]:        [7, 13],
  [textures.TEXTURE_BEAR_LEFT_3]:          [0, 11],
  [textures.TEXTURE_BEAR_LEFT_2]:          [1, 11],
  [textures.TEXTURE_BEAR_LEFT_1]:          [2, 11],
  [textures.TEXTURE_BEAR_DEAD]:            [3, 11],
  [textures.TEXTURE_BEAR_RIGHT_1]:         [4, 11],
  [textures.TEXTURE_BEAR_RIGHT_2]:         [5, 11],
  [textures.TEXTURE_BEAR_RIGHT_3]:         [6, 11],
  [textures.TEXTURE_COIN_DEAD]:            [2, 6],
  [textures.TEXTURE_COIN_LEFT_1]:          [1, 6],
  [textures.TEXTURE_COIN_LEFT_2]:          [0, 6],
  [textures.TEXTURE_COIN_RIGHT_1]:         [3, 6],
  [textures.TEXTURE_COIN_RIGHT_2]:         [4, 6],
  [textures.TEXTURE_COIN_SIDE]:            [5, 6],
  [textures.TEXTURE_ENEMY_DEAD_ORANGE_1]:  [0, 14],
  [textures.TEXTURE_ENEMY_DEAD_ORANGE_2]:  [1, 14],
  [textures.TEXTURE_ENEMY_DEAD_ORANGE_3]:  [2, 14],
  [textures.TEXTURE_ENEMY_DEAD_ORANGE_4]:  [3, 14],
  [textures.TEXTURE_ENEMY_DEAD_BLUE_1]:    [4, 15],
  [textures.TEXTURE_ENEMY_DEAD_BLUE_2]:    [5, 15],
  [textures.TEXTURE_ENEMY_DEAD_BLUE_3]:    [6, 15],
  [textures.TEXTURE_ENEMY_DEAD_BLUE_4]:    [7, 15],
  [textures.TEXTURE_ENEMY_DEAD_RED_1]:     [0, 14],
  [textures.TEXTURE_ENEMY_DEAD_RED_2]:     [1, 14],
  [textures.TEXTURE_ENEMY_DEAD_RED_3]:     [2, 14],
  [textures.TEXTURE_ENEMY_DEAD_RED_4]:     [3, 14],
  [textures.TEXTURE_HERO_DEAD_1]:          [4, 15],
  [textures.TEXTURE_HERO_DEAD_2]:          [5, 15],
  [textures.TEXTURE_HERO_DEAD_3]:          [6, 15],
  [textures.TEXTURE_HERO_DEAD_4]:          [7, 15],
}

const sprite = document.createElement('img')

const loadSprite = () => {
  sprite.onload = onLoad
  sprite.src = imageSprite
}

const getImageCoords = (texture: number): [number, number] => {
  const [col, row] = spriteTextureCoords[texture]

  const x = col * SPRITE_TEXTURE_SIZE
  const y = row * SPRITE_TEXTURE_SIZE

  return [x, y]
}

export { loadSprite, sprite, getImageCoords }
