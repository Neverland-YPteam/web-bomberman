import { TTextures } from './types'

export enum CanvasSelectors {
  Static = '#game_static',
  Dynamic = '#game_dynamic',
  Modal = '#game_modal',
}

/**
 * Трудно гармонично подобрать размеры канваса с нужными пропорциями и значения констант ниже
 * Помимо прочего, нужно избежать использования координат с плавающей точкой
 * Если будем внедрять translate при движении камеры, проблема частично нивелируется
 * Иначе лучше оставить как есть
 */
export const FPS = 60
export const PANEL_HEIGHT_PX = 84 // Высота верхней панели в пикселях
export const MAP_TILES_COUNT_X = 25 // Ширина игрового поля в ячейках, включая стены
export const MAP_TILES_COUNT_Y = 17 // Высота игрового поля в ячейках, включая стены
export const TILE_SIZE = 48 // Ширина/высота квадратных текстур
export const SPRITE_TEXTURE_SIZE = 256 // Размер текстуры в спрайте

// Стили для верхней панели и интро уровня
export const BG_COLOR = '#11264D'
export const TEXT_COLOR_DEFAULT = '#FFFFFF'
export const TEXT_COLOR_SUCCESS = '#32CD32'
export const TEXT_COLOR_ERROR = '#FF3232'
export const FONT_SIZE = 28
export const FONT_FAMILY = 'PressStart2P'

export const LIVES_INITIAL = 2
export const SCORE_INITIAL = 0
export const TIME_INITIAL_S = 300

// Числовые коды запоминать необязательно, в коде смотрим на имена констант
export const textures: TTextures = {
  TEXTURE_COLUMN: 0,
  TEXTURE_COLUMN_DAMAGED_1: 1,
  TEXTURE_COLUMN_DAMAGED_2: 2,
  TEXTURE_COLUMN_DAMAGED_3: 3,
  TEXTURE_WALL: 4,
  TEXTURE_WALL_SAFE: 5,
  TEXTURE_WALL_DAMAGED_1: 6,
  TEXTURE_WALL_DAMAGED_2: 7,
  TEXTURE_WALL_DAMAGED_3: 8,
  TEXTURE_WALL_DAMAGED_4: 9,
  TEXTURE_WALL_DAMAGED_5: 10,
  TEXTURE_WALL_DAMAGED_6: 11,
  TEXTURE_WALL_DAMAGED_7: 12,
  TEXTURE_GRASS: 13,
  TEXTURE_HEART: 14,
  TEXTURE_DOOR: 15,
  TEXTURE_BOMB_SMALL: 16,
  TEXTURE_BOMB_MEDIUM: 17,
  TEXTURE_BOMB_LARGE: 18,

  TEXTURE_FLAME_1: 20,
  TEXTURE_FLAME_2: 21,
  TEXTURE_FLAME_3_START: 22,
  TEXTURE_FLAME_3_MIDDLE: 23,
  TEXTURE_FLAME_3_END: 24,
  TEXTURE_FLAME_4_START: 25,
  TEXTURE_FLAME_4_MIDDLE: 26,
  TEXTURE_FLAME_4_END: 27,
  TEXTURE_FLAME_5_START: 28,
  TEXTURE_FLAME_5_MIDDLE: 29,
  TEXTURE_FLAME_5_END: 30,
  TEXTURE_FLAME_6_START: 31,
  TEXTURE_FLAME_6_MIDDLE: 32,
  TEXTURE_FLAME_6_END: 33,

  TEXTURE_SHADOW_TL_T_L: 40,
  TEXTURE_SHADOW_TL_T: 41,
  TEXTURE_SHADOW_TL_L: 42,
  TEXTURE_SHADOW_TL: 43,
  TEXTURE_SHADOW_T: 44,
  TEXTURE_SHADOW_L: 45,

  TEXTURE_FLOWER_1: 50,
  TEXTURE_FLOWER_2: 51,
  TEXTURE_FLOWER_3: 52,
  TEXTURE_FLOWER_4: 53,
  TEXTURE_FLOWER_5: 54,
  TEXTURE_FLOWER_6: 55,
  TEXTURE_FLOWER_7: 56,
  TEXTURE_FLOWER_8: 57,
  TEXTURE_FLOWER_9: 58,
  TEXTURE_FLOWER_10: 59,
  TEXTURE_FLOWER_11: 60,
  TEXTURE_FLOWER_12: 61,

  TEXTURE_BONUS_BOMB: 70,
  TEXTURE_BONUS_FIRE: 71,
  TEXTURE_BONUS_SPEED: 72,
  TEXTURE_BONUS_DETONATOR: 73,
  TEXTURE_BONUS_WALLPASS: 74,
  TEXTURE_BONUS_BOMBPASS: 75,
  TEXTURE_BONUS_FIREPASS: 76,
  TEXTURE_BONUS_IMMORTAL: 77,

  TEXTURE_HERO_LEFT_STANDING: 100,
  TEXTURE_HERO_LEFT_SITTING: 101,
  TEXTURE_HERO_LEFT_MOVING_1: 102,
  TEXTURE_HERO_LEFT_MOVING_2: 103,
  TEXTURE_HERO_RIGHT_STANDING: 104,
  TEXTURE_HERO_RIGHT_SITTING: 105,
  TEXTURE_HERO_RIGHT_MOVING_1: 106,
  TEXTURE_HERO_RIGHT_MOVING_2: 107,
  TEXTURE_HERO_UP_STANDING: 108,
  TEXTURE_HERO_UP_SITTING: 109,
  TEXTURE_HERO_UP_MOVING_1: 110,
  TEXTURE_HERO_UP_MOVING_2: 111,
  TEXTURE_HERO_DOWN_STANDING: 112,
  TEXTURE_HERO_DOWN_SITTING: 113,
  TEXTURE_HERO_DOWN_MOVING_1: 114,
  TEXTURE_HERO_DOWN_MOVING_2: 115,
  TEXTURE_HERO_DEAD_1: 116,
  TEXTURE_HERO_DEAD_2: 117,
  TEXTURE_HERO_DEAD_3: 118,
  TEXTURE_HERO_DEAD_4: 119,

  TEXTURE_BALLOON_DEAD: 200,
  TEXTURE_BALLOON_LEFT_1: 201,
  TEXTURE_BALLOON_LEFT_2: 202,
  TEXTURE_BALLOON_LEFT_3: 203,
  TEXTURE_BALLOON_RIGHT_1: 204,
  TEXTURE_BALLOON_RIGHT_2: 205,
  TEXTURE_BALLOON_RIGHT_3: 206,

  TEXTURE_BEAKER_LEFT_DEAD: 210,
  TEXTURE_BEAKER_LEFT_1: 211,
  TEXTURE_BEAKER_LEFT_2: 212,
  TEXTURE_BEAKER_LEFT_3: 213,
  TEXTURE_BEAKER_RIGHT_DEAD: 214,
  TEXTURE_BEAKER_RIGHT_1: 215,
  TEXTURE_BEAKER_RIGHT_2: 216,
  TEXTURE_BEAKER_RIGHT_3: 217,

  TEXTURE_LANTERN_DEAD: 220,
  TEXTURE_LANTERN_LEFT_1: 221,
  TEXTURE_LANTERN_LEFT_2: 222,
  TEXTURE_LANTERN_LEFT_3: 223,
  TEXTURE_LANTERN_RIGHT_1: 224,
  TEXTURE_LANTERN_RIGHT_2: 225,
  TEXTURE_LANTERN_RIGHT_3: 226,

  TEXTURE_FACE_DEAD: 230,
  TEXTURE_FACE_LEFT_1: 231,
  TEXTURE_FACE_LEFT_2: 232,
  TEXTURE_FACE_LEFT_3: 233,
  TEXTURE_FACE_RIGHT_1: 234,
  TEXTURE_FACE_RIGHT_2: 235,
  TEXTURE_FACE_RIGHT_3: 236,

  TEXTURE_JELLY_LEFT_DEAD: 240,
  TEXTURE_JELLY_LEFT_1: 241,
  TEXTURE_JELLY_LEFT_2: 242,
  TEXTURE_JELLY_LEFT_3: 243,
  TEXTURE_JELLY_RIGHT_DEAD: 244,
  TEXTURE_JELLY_RIGHT_1: 245,
  TEXTURE_JELLY_RIGHT_2: 246,
  TEXTURE_JELLY_RIGHT_3: 247,

  TEXTURE_GHOST_DEAD: 250,
  TEXTURE_GHOST_LEFT_1: 251,
  TEXTURE_GHOST_LEFT_2: 252,
  TEXTURE_GHOST_LEFT_3: 253,
  TEXTURE_GHOST_RIGHT_1: 254,
  TEXTURE_GHOST_RIGHT_2: 255,
  TEXTURE_GHOST_RIGHT_3: 256,

  TEXTURE_BEAR_DEAD: 260,
  TEXTURE_BEAR_LEFT_1: 261,
  TEXTURE_BEAR_LEFT_2: 262,
  TEXTURE_BEAR_LEFT_3: 263,
  TEXTURE_BEAR_RIGHT_1: 264,
  TEXTURE_BEAR_RIGHT_2: 265,
  TEXTURE_BEAR_RIGHT_3: 266,

  TEXTURE_COIN_DEAD: 270,
  TEXTURE_COIN_LEFT_1: 271,
  TEXTURE_COIN_LEFT_2: 272,
  TEXTURE_COIN_RIGHT_1: 273,
  TEXTURE_COIN_RIGHT_2: 274,
  TEXTURE_COIN_SIDE: 275,

  TEXTURE_ENEMY_DEAD_ORANGE_1: 280,
  TEXTURE_ENEMY_DEAD_ORANGE_2: 281,
  TEXTURE_ENEMY_DEAD_ORANGE_3: 282,
  TEXTURE_ENEMY_DEAD_ORANGE_4: 283,
  TEXTURE_ENEMY_DEAD_BLUE_1: 284,
  TEXTURE_ENEMY_DEAD_BLUE_2: 285,
  TEXTURE_ENEMY_DEAD_BLUE_3: 286,
  TEXTURE_ENEMY_DEAD_BLUE_4: 287,
  TEXTURE_ENEMY_DEAD_RED_1: 288,
  TEXTURE_ENEMY_DEAD_RED_2: 289,
  TEXTURE_ENEMY_DEAD_RED_3: 290,
  TEXTURE_ENEMY_DEAD_RED_4: 291,
}
