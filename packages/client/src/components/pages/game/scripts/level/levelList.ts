import { TLevelList } from './types'

// @TODO Подумать, как прятать бонус под WALL, чтобы он появлялся при уничтожении WALL
export const levelList: TLevelList = {
  1: { enemies: { balloon: 6 } },
  2: { enemies: { balloon: 4, beaker: 2 } },
  3: { enemies: { balloon: 3, beaker: 2, lantern: 1 } },
  4: { enemies: { balloon: 2, beaker: 2, lantern: 2 } },
  5: { enemies: { balloon: 1, beaker: 3, lantern: 2 } },
  6: { enemies: { beaker: 3, lantern: 2, face: 1 } },
  7: { enemies: { beaker: 2, lantern: 2, face: 2 } },
  8: { enemies: { beaker: 1, lantern: 3, face: 2 } },
  9: { enemies: { lantern: 3, face: 2, jelly: 1 } },
  10: { enemies: { lantern: 2, face: 2, jelly: 2 } },
  11: { enemies: { lantern: 1, face: 3, jelly: 2 } },
  12: { enemies: { face: 3, jelly: 2, ghost: 1 } },
  13: { enemies: { face: 2, jelly: 2, ghost: 2 } },
  14: { enemies: { face: 1, jelly: 3, ghost: 2 } },
  15: { enemies: { jelly: 3, ghost: 2, bear: 1 } },
  16: { enemies: { jelly: 2, ghost: 2, bear: 2 } },
  17: { enemies: { jelly: 1, ghost: 3, bear: 2 } },
  18: { enemies: { ghost: 3, bear: 2, coin: 1 } },
  19: { enemies: { ghost: 2, bear: 2, coin: 2 } },
  20: { enemies: { ghost: 1, bear: 3, coin: 2 } },
}
