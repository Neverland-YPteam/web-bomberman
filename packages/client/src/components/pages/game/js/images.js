/**
 * Загрузчик текстур
 * Основная идея — ждем загрузки всех изображений, потом запускаемся
 * Можно использовать спрайт, но хз нужно ли
 */

import {
  RESOURCE_BASE_URL,
  TEXTURE_HEART,
  TEXTURE_COLUMN,
  TEXTURE_WALL,
  TEXTURE_GRASS,
  TEXTURE_HERO_RIGHT_STAYING,
  TEXTURE_BALLOON_LEFT,
  TEXTURE_BALLOON_RIGHT,
  TEXTURE_GHOST_LEFT,
  TEXTURE_GHOST_RIGHT,
  TEXTURE_COIN_LEFT,
  TEXTURE_COIN_RIGHT,
} from './const.js'

import { onLoad } from './index.js'

const images = {}
let imagesToLoad = 0

const updateCounter = () => {
  imagesToLoad--

  if (imagesToLoad === 0) {
    onLoad()
  }
}

const loadImage = ({ texture, fileName }) => {
  const img = document.createElement('img')

  img.onload = updateCounter
  img.src = `${RESOURCE_BASE_URL}/images/${fileName}.webp`

  images[texture] = img
}

const loadImages = () => {
  const imageList = [
    { texture: TEXTURE_HEART, fileName: 'heart' },
    { texture: TEXTURE_COLUMN, fileName: 'column' },
    { texture: TEXTURE_WALL, fileName: 'wall' },
    { texture: TEXTURE_GRASS, fileName: 'grass' },
    { texture: TEXTURE_HERO_RIGHT_STAYING, fileName: 'hero_right_staying' },
    { texture: TEXTURE_BALLOON_LEFT, fileName: 'balloon_left' },
    { texture: TEXTURE_BALLOON_RIGHT, fileName: 'balloon_right' },
    { texture: TEXTURE_GHOST_LEFT, fileName: 'ghost_left' },
    { texture: TEXTURE_GHOST_RIGHT, fileName: 'ghost_right' },
    { texture: TEXTURE_COIN_LEFT, fileName: 'coin_left' },
    { texture: TEXTURE_COIN_RIGHT, fileName: 'coin_right' }
  ]

  imagesToLoad = imageList.length
  imageList.forEach(loadImage)
}

export { loadImages, images }
