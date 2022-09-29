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

  TEXTURE_ENEMY_DEAD_ORANGE_1, TEXTURE_ENEMY_DEAD_ORANGE_2,
  TEXTURE_ENEMY_DEAD_ORANGE_3, TEXTURE_ENEMY_DEAD_ORANGE_4,

  TEXTURE_ENEMY_DEAD_BLUE_1, TEXTURE_ENEMY_DEAD_BLUE_2,
  TEXTURE_ENEMY_DEAD_BLUE_3, TEXTURE_ENEMY_DEAD_BLUE_4,

  TEXTURE_ENEMY_DEAD_RED_1, TEXTURE_ENEMY_DEAD_RED_2,
  TEXTURE_ENEMY_DEAD_RED_3, TEXTURE_ENEMY_DEAD_RED_4,
} = textures

const deadTexturesOrange = [
  TEXTURE_ENEMY_DEAD_ORANGE_1, TEXTURE_ENEMY_DEAD_ORANGE_2,
  TEXTURE_ENEMY_DEAD_ORANGE_3, TEXTURE_ENEMY_DEAD_ORANGE_4,
]

const deadTexturesBlue = [
  TEXTURE_ENEMY_DEAD_BLUE_1, TEXTURE_ENEMY_DEAD_BLUE_2,
  TEXTURE_ENEMY_DEAD_BLUE_3, TEXTURE_ENEMY_DEAD_BLUE_4,
]

const deadTexturesRed = [
  TEXTURE_ENEMY_DEAD_RED_1, TEXTURE_ENEMY_DEAD_RED_2,
  TEXTURE_ENEMY_DEAD_RED_3, TEXTURE_ENEMY_DEAD_RED_4,
]

const enemyList: TEnemyList = {
  balloon: {
    textures: {
      left: [TEXTURE_BALLOON_LEFT_1, TEXTURE_BALLOON_LEFT_2, TEXTURE_BALLOON_LEFT_3, TEXTURE_BALLOON_LEFT_2],
      right: [TEXTURE_BALLOON_RIGHT_1, TEXTURE_BALLOON_RIGHT_2, TEXTURE_BALLOON_RIGHT_3, TEXTURE_BALLOON_RIGHT_2],
      dead: {
        left: [TEXTURE_BALLOON_DEAD].concat(deadTexturesOrange),
        right: [TEXTURE_BALLOON_DEAD].concat(deadTexturesOrange),
      },
      interval: 150,
    },
    speed: 1,
    canTurn: true,
    points: 100,
  },
  beaker: {
    textures: {
      left: [TEXTURE_BEAKER_LEFT_1, TEXTURE_BEAKER_LEFT_2, TEXTURE_BEAKER_LEFT_3, TEXTURE_BEAKER_LEFT_2],
      right: [TEXTURE_BEAKER_RIGHT_1, TEXTURE_BEAKER_RIGHT_2, TEXTURE_BEAKER_RIGHT_3, TEXTURE_BEAKER_RIGHT_2],
      dead: {
        left: [TEXTURE_BEAKER_LEFT_DEAD].concat(deadTexturesBlue),
        right: [TEXTURE_BEAKER_RIGHT_DEAD].concat(deadTexturesBlue),
      },
      interval: 150,
    },
    speed: 1.5,
    canTurn: true,
    unpredictable: true,
    points: 200,
  },
  lantern: {
    textures: {
      left: [TEXTURE_LANTERN_LEFT_1, TEXTURE_LANTERN_LEFT_2, TEXTURE_LANTERN_LEFT_3, TEXTURE_LANTERN_LEFT_2],
      right: [TEXTURE_LANTERN_RIGHT_1, TEXTURE_LANTERN_RIGHT_2, TEXTURE_LANTERN_RIGHT_3, TEXTURE_LANTERN_RIGHT_2],
      dead: {
        left: [TEXTURE_LANTERN_DEAD].concat(deadTexturesRed),
        right: [TEXTURE_LANTERN_DEAD].concat(deadTexturesRed),
      },
      interval: 150,
    },
    speed: 2,
    points: 400,
  },
  face: {
    textures: {
      left: [TEXTURE_FACE_LEFT_1, TEXTURE_FACE_LEFT_2, TEXTURE_FACE_LEFT_3, TEXTURE_FACE_LEFT_2],
      right: [TEXTURE_FACE_RIGHT_1, TEXTURE_FACE_RIGHT_2, TEXTURE_FACE_RIGHT_3, TEXTURE_FACE_RIGHT_2],
      dead: {
        left: [TEXTURE_FACE_DEAD].concat(deadTexturesOrange),
        right: [TEXTURE_FACE_DEAD].concat(deadTexturesOrange),
      },
      interval: 150,
    },
    speed: 2.4,
    points: 800,
  },
  ghost: {
    textures: {
      left: [TEXTURE_GHOST_LEFT_1, TEXTURE_GHOST_LEFT_2, TEXTURE_GHOST_LEFT_3, TEXTURE_GHOST_LEFT_2],
      right: [TEXTURE_GHOST_RIGHT_1, TEXTURE_GHOST_RIGHT_2, TEXTURE_GHOST_RIGHT_3, TEXTURE_GHOST_RIGHT_2],
      dead: {
        left: [TEXTURE_GHOST_DEAD].concat(deadTexturesRed),
        right: [TEXTURE_GHOST_DEAD].concat(deadTexturesRed),
      },
      interval: 200,
    },
    speed: 1.5,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
    points: 1000,
  },
  jelly: {
    textures: {
      left: [TEXTURE_JELLY_LEFT_1, TEXTURE_JELLY_LEFT_2, TEXTURE_JELLY_LEFT_3, TEXTURE_JELLY_LEFT_2],
      right: [TEXTURE_JELLY_RIGHT_1, TEXTURE_JELLY_RIGHT_2, TEXTURE_JELLY_RIGHT_3, TEXTURE_JELLY_RIGHT_2],
      dead: {
        left: [TEXTURE_JELLY_LEFT_DEAD].concat(deadTexturesBlue),
        right: [TEXTURE_JELLY_RIGHT_DEAD].concat(deadTexturesBlue),
      },
      interval: 100,
    },
    speed: 0.5,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
    points: 2000,
  },
  bear: {
    textures: {
      left: [TEXTURE_BEAR_LEFT_1, TEXTURE_BEAR_LEFT_2, TEXTURE_BEAR_LEFT_3, TEXTURE_BEAR_LEFT_2],
      right: [TEXTURE_BEAR_RIGHT_1, TEXTURE_BEAR_RIGHT_2, TEXTURE_BEAR_RIGHT_3, TEXTURE_BEAR_RIGHT_2],
      dead: {
        left: [TEXTURE_BEAR_DEAD].concat(deadTexturesOrange),
        right: [TEXTURE_BEAR_DEAD].concat(deadTexturesOrange),
      },
      interval: 300,
    },
    speed: 3,
    canTurn: true,
    unpredictable: true,
    points: 4000,
  },
  coin: {
    textures: {
      left: [TEXTURE_COIN_LEFT_1, TEXTURE_COIN_LEFT_2, TEXTURE_COIN_SIDE, TEXTURE_COIN_RIGHT_2],
      right: [TEXTURE_COIN_RIGHT_1, TEXTURE_COIN_RIGHT_2, TEXTURE_COIN_SIDE, TEXTURE_COIN_LEFT_2],
      dead: {
        left: [TEXTURE_COIN_DEAD].concat(deadTexturesRed),
        right: [TEXTURE_COIN_DEAD].concat(deadTexturesRed),
      },
      interval: 150,
    },
    speed: 3.2,
    wallPass: true,
    canTurn: true,
    unpredictable: true,
    points: 8000,
  },
}

export { enemyList }
