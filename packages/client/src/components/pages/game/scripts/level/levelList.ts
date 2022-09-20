import { TLevelList } from './types'

// @TODO Подумать, как прятать бонус под WALL, чтобы он появлялся при уничтожении WALL
export const levelList: TLevelList = {
  1: {
    enemies: {
      balloon: 2,
      beaker: 2,
      lantern: 2,
      face: 2,
      jelly: 2,
      ghost: 2,
      bear: 2,
      coin: 2,
    },
    // bonus: 'bomb', // Если дойдем до бонусов, на каждом уровне будет определенный
  },
}
