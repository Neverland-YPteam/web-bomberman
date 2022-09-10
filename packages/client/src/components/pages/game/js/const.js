export const RESOURCE_BASE_URL = 'src/components/pages/game'

/**
 * Трудно гармонично подобрать размеры канваса с нужными пропорциями и значения констант ниже
 * Помимо прочего, нужно избежать использования координат с плавающей точкой
 * Если будем внедрять translate при движении камеры, проблема частично нивелируется
 * Иначе лучше оставить как есть
 */
export const PANEL_HEIGHT_PX = 84 // Высота верхней панели в пикселях
export const MAP_TILES_COUNT_X = 25 // Ширина игрового поля в ячейках, включая стены
export const MAP_TILES_COUNT_Y = 17 // Высота игрового поля в ячейках, включая стены
export const TILE_SIZE = 48 // Ширина/высота квадратных текстур

// Стили для верхней панели и интро уровня
export const BG_COLOR = '#11264D'
export const TEXT_COLOR = '#FFFFFF'
export const FONT_SIZE = 28
export const FONT_FAMILY = 'Press Start 2P'

// Числовые коды запоминать необязательно, в коде смотрим на имена констант
export const TEXTURE_HERO_RIGHT_STAYING = 0
export const TEXTURE_PANEL = 1
export const TEXTURE_HEART = 2
export const TEXTURE_COLUMN = 3
export const TEXTURE_WALL = 4
export const TEXTURE_GRASS = 5
export const TEXTURE_BALLOON_LEFT = 10
export const TEXTURE_BALLOON_RIGHT = 11
export const TEXTURE_GHOST_LEFT = 20
export const TEXTURE_GHOST_RIGHT = 21
export const TEXTURE_COIN_LEFT = 30
export const TEXTURE_COIN_RIGHT = 31

export const LIVES_INITIAL = 3

// @TODO Подумать, как добавить тени для текстур, если останется время
