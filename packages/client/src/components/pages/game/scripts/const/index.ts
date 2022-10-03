import { TTextures } from './types'

export enum canvasSelectors {
  static = '#game_static',
  dynamic = '#game_dynamic',
  modal = '#game_modal',
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
export const SPRITE_TEXTURE_SIZE = 128 // Размер текстуры в спрайте

// Стили для верхней панели и интро уровня
export const BG_COLOR = '#11264D'
export const TEXT_COLOR = '#FFFFFF'
export const FONT_SIZE = 28
export const FONT_FAMILY = 'PressStart2P'

export const LIVES_INITIAL = 3
export const SCORE_INITIAL = 0
export const TIME_INITIAL_S = 200

// Числовые коды запоминать необязательно, в коде смотрим на имена констант
export const textures: TTextures = {
  TEXTURE_COLUMN: 0,
  TEXTURE_COLUMN_DAMAGED_1: 1,
  TEXTURE_COLUMN_DAMAGED_2: 2,
  TEXTURE_COLUMN_DAMAGED_3: 3,
  TEXTURE_WALL: 4,
  TEXTURE_WALL_SAFE: 5,
  TEXTURE_GRASS: 6,
  TEXTURE_HEART: 7,
  TEXTURE_BOMB_SMALL: 8,
  TEXTURE_BOMB_MEDIUM: 9,
  TEXTURE_BOMB_LARGE: 10,

  TEXTURE_BALLOON_DEAD: 121,
  TEXTURE_BALLOON_LEFT_1: 122,
  TEXTURE_BALLOON_LEFT_2: 123,
  TEXTURE_BALLOON_LEFT_3: 124,
  TEXTURE_BALLOON_RIGHT_1: 125,
  TEXTURE_BALLOON_RIGHT_2: 126,
  TEXTURE_BALLOON_RIGHT_3: 127,

  TEXTURE_BEAKER_LEFT_DEAD: 130,
  TEXTURE_BEAKER_LEFT_1: 132,
  TEXTURE_BEAKER_LEFT_2: 133,
  TEXTURE_BEAKER_LEFT_3: 134,
  TEXTURE_BEAKER_RIGHT_DEAD: 135,
  TEXTURE_BEAKER_RIGHT_1: 136,
  TEXTURE_BEAKER_RIGHT_2: 137,
  TEXTURE_BEAKER_RIGHT_3: 138,

  TEXTURE_LANTERN_DEAD: 141,
  TEXTURE_LANTERN_LEFT_1: 142,
  TEXTURE_LANTERN_LEFT_2: 143,
  TEXTURE_LANTERN_LEFT_3: 144,
  TEXTURE_LANTERN_RIGHT_1: 145,
  TEXTURE_LANTERN_RIGHT_2: 146,
  TEXTURE_LANTERN_RIGHT_3: 147,

  TEXTURE_FACE_DEAD: 151,
  TEXTURE_FACE_LEFT_1: 152,
  TEXTURE_FACE_LEFT_2: 153,
  TEXTURE_FACE_LEFT_3: 154,
  TEXTURE_FACE_RIGHT_1: 155,
  TEXTURE_FACE_RIGHT_2: 156,
  TEXTURE_FACE_RIGHT_3: 157,

  TEXTURE_JELLY_LEFT_DEAD: 160,
  TEXTURE_JELLY_LEFT_1: 162,
  TEXTURE_JELLY_LEFT_2: 163,
  TEXTURE_JELLY_LEFT_3: 164,
  TEXTURE_JELLY_RIGHT_DEAD: 165,
  TEXTURE_JELLY_RIGHT_1: 166,
  TEXTURE_JELLY_RIGHT_2: 167,
  TEXTURE_JELLY_RIGHT_3: 168,

  TEXTURE_GHOST_DEAD: 171,
  TEXTURE_GHOST_LEFT_1: 172,
  TEXTURE_GHOST_LEFT_2: 173,
  TEXTURE_GHOST_LEFT_3: 174,
  TEXTURE_GHOST_RIGHT_1: 175,
  TEXTURE_GHOST_RIGHT_2: 176,
  TEXTURE_GHOST_RIGHT_3: 177,

  TEXTURE_BEAR_DEAD: 181,
  TEXTURE_BEAR_LEFT_1: 182,
  TEXTURE_BEAR_LEFT_2: 183,
  TEXTURE_BEAR_LEFT_3: 184,
  TEXTURE_BEAR_RIGHT_1: 185,
  TEXTURE_BEAR_RIGHT_2: 186,
  TEXTURE_BEAR_RIGHT_3: 187,

  TEXTURE_COIN_DEAD: 191,
  TEXTURE_COIN_LEFT_1: 192,
  TEXTURE_COIN_LEFT_2: 193,
  TEXTURE_COIN_RIGHT_1: 194,
  TEXTURE_COIN_RIGHT_2: 195,
  TEXTURE_COIN_SIDE: 196,

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
}

// @TODO Подумать, как добавить тени для текстур, если останется время
