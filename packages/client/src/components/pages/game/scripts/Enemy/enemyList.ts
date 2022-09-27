import { TEnemyList } from './types'

import { textures } from '../const'

const {
  TEXTURE_BALLOON_DEAD,
  TEXTURE_BALLOON_LEFT_1, TEXTURE_BALLOON_LEFT_2, TEXTURE_BALLOON_LEFT_3,
  TEXTURE_BALLOON_RIGHT_1, TEXTURE_BALLOON_RIGHT_2, TEXTURE_BALLOON_RIGHT_3,

  TEXTURE_BEAKER_LEFT_DEAD, TEXTURE_BEAKER_LEFT_1, TEXTURE_BEAKER_LEFT_2, TEXTURE_BEAKER_LEFT_3,
  TEXTURE_BEAKER_RIGHT_DEAD, TEXTURE_BEAKER_RIGHT_1, TEXTURE_BEAKER_RIGHT_2, TEXTURE_BEAKER_RIGHT_3,

  TEXTURE_LANTERN_DEAD,
  TEXTURE_LANTERN_LEFT_1, TEXTURE_LANTERN_LEFT_2, TEXTURE_LANTERN_LEFT_3,
  TEXTURE_LANTERN_RIGHT_1, TEXTURE_LANTERN_RIGHT_2, TEXTURE_LANTERN_RIGHT_3,

  TEXTURE_FACE_DEAD,
  TEXTURE_FACE_LEFT_1, TEXTURE_FACE_LEFT_2, TEXTURE_FACE_LEFT_3,
  TEXTURE_FACE_RIGHT_1, TEXTURE_FACE_RIGHT_2, TEXTURE_FACE_RIGHT_3,

  TEXTURE_JELLY_LEFT_DEAD, TEXTURE_JELLY_LEFT_1, TEXTURE_JELLY_LEFT_2, TEXTURE_JELLY_LEFT_3,
  TEXTURE_JELLY_RIGHT_DEAD, TEXTURE_JELLY_RIGHT_1, TEXTURE_JELLY_RIGHT_2, TEXTURE_JELLY_RIGHT_3,

  TEXTURE_GHOST_DEAD,
  TEXTURE_GHOST_LEFT_1, TEXTURE_GHOST_LEFT_2, TEXTURE_GHOST_LEFT_3,
  TEXTURE_GHOST_RIGHT_1, TEXTURE_GHOST_RIGHT_2, TEXTURE_GHOST_RIGHT_3,

  TEXTURE_BEAR_DEAD,
  TEXTURE_BEAR_LEFT_1, TEXTURE_BEAR_LEFT_2, TEXTURE_BEAR_LEFT_3,
  TEXTURE_BEAR_RIGHT_1, TEXTURE_BEAR_RIGHT_2, TEXTURE_BEAR_RIGHT_3,

  TEXTURE_COIN_DEAD, TEXTURE_COIN_SIDE,
  TEXTURE_COIN_LEFT_1, TEXTURE_COIN_LEFT_2,
  TEXTURE_COIN_RIGHT_1, TEXTURE_COIN_RIGHT_2,
} = textures

const enemyList: TEnemyList = {
  balloon: {
    textures: {
      left: [TEXTURE_BALLOON_LEFT_1, TEXTURE_BALLOON_LEFT_2, TEXTURE_BALLOON_LEFT_3, TEXTURE_BALLOON_LEFT_2],
      right: [TEXTURE_BALLOON_RIGHT_1, TEXTURE_BALLOON_RIGHT_2, TEXTURE_BALLOON_RIGHT_3, TEXTURE_BALLOON_RIGHT_2],
      dead: { left: TEXTURE_BALLOON_DEAD, right: TEXTURE_BALLOON_DEAD, },
      interval: 150,
    },
    speed: 1,
    canTurn: true,
  },
  beaker: {
    textures: {
      left: [TEXTURE_BEAKER_LEFT_1, TEXTURE_BEAKER_LEFT_2, TEXTURE_BEAKER_LEFT_3, TEXTURE_BEAKER_LEFT_2],
      right: [TEXTURE_BEAKER_RIGHT_1, TEXTURE_BEAKER_RIGHT_2, TEXTURE_BEAKER_RIGHT_3, TEXTURE_BEAKER_RIGHT_2],
      dead: { left: TEXTURE_BEAKER_LEFT_DEAD, right: TEXTURE_BEAKER_RIGHT_DEAD, },
      interval: 150,
    },
    speed: 1.5,
    canTurn: true,
    unpredictable: true,
  },
  lantern: {
    textures: {
      left: [TEXTURE_LANTERN_LEFT_1, TEXTURE_LANTERN_LEFT_2, TEXTURE_LANTERN_LEFT_3, TEXTURE_LANTERN_LEFT_2],
      right: [TEXTURE_LANTERN_RIGHT_1, TEXTURE_LANTERN_RIGHT_2, TEXTURE_LANTERN_RIGHT_3, TEXTURE_LANTERN_RIGHT_2],
      dead: { left: TEXTURE_LANTERN_DEAD, right: TEXTURE_LANTERN_DEAD, },
      interval: 150,
    },
    speed: 2,
  },
  face: {
    textures: {
      left: [TEXTURE_FACE_LEFT_1, TEXTURE_FACE_LEFT_2, TEXTURE_FACE_LEFT_3, TEXTURE_FACE_LEFT_2],
      right: [TEXTURE_FACE_RIGHT_1, TEXTURE_FACE_RIGHT_2, TEXTURE_FACE_RIGHT_3, TEXTURE_FACE_RIGHT_2],
      dead: { left: TEXTURE_FACE_DEAD, right: TEXTURE_FACE_DEAD, },
      interval: 150,
    },
    speed: 2.4,
  },
  jelly: {
    textures: {
      left: [TEXTURE_JELLY_LEFT_1, TEXTURE_JELLY_LEFT_2, TEXTURE_JELLY_LEFT_3, TEXTURE_JELLY_LEFT_2],
      right: [TEXTURE_JELLY_RIGHT_1, TEXTURE_JELLY_RIGHT_2, TEXTURE_JELLY_RIGHT_3, TEXTURE_JELLY_RIGHT_2],
      dead: { left: TEXTURE_JELLY_LEFT_DEAD, right: TEXTURE_JELLY_RIGHT_DEAD, },
      interval: 100,
    },
    speed: 0.5,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
  },
  ghost: {
    textures: {
      left: [TEXTURE_GHOST_LEFT_1, TEXTURE_GHOST_LEFT_2, TEXTURE_GHOST_LEFT_3, TEXTURE_GHOST_LEFT_2],
      right: [TEXTURE_GHOST_RIGHT_1, TEXTURE_GHOST_RIGHT_2, TEXTURE_GHOST_RIGHT_3, TEXTURE_GHOST_RIGHT_2],
      dead: { left: TEXTURE_GHOST_DEAD, right: TEXTURE_GHOST_DEAD, },
      interval: 200,
    },
    speed: 1.5,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
  },
  bear: {
    textures: {
      left: [TEXTURE_BEAR_LEFT_1, TEXTURE_BEAR_LEFT_2, TEXTURE_BEAR_LEFT_3, TEXTURE_BEAR_LEFT_2],
      right: [TEXTURE_BEAR_RIGHT_1, TEXTURE_BEAR_RIGHT_2, TEXTURE_BEAR_RIGHT_3, TEXTURE_BEAR_RIGHT_2],
      dead: { left: TEXTURE_BEAR_DEAD, right: TEXTURE_BEAR_DEAD, },
      interval: 300,
    },
    speed: 3,
    canTurn: true,
    unpredictable: true,
  },
  coin: {
    textures: {
      left: [TEXTURE_COIN_LEFT_1, TEXTURE_COIN_LEFT_2, TEXTURE_COIN_SIDE, TEXTURE_COIN_RIGHT_2],
      right: [TEXTURE_COIN_RIGHT_1, TEXTURE_COIN_RIGHT_2, TEXTURE_COIN_SIDE, TEXTURE_COIN_LEFT_2],
      dead: { left: TEXTURE_COIN_DEAD, right: TEXTURE_COIN_DEAD, },
      interval: 150,
    },
    speed: 3.2,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
  },
}

export { enemyList }
