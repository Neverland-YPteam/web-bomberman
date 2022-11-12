import { TBonuses } from './types'

import { textures } from '../const'
import { hero } from '../hero'
import { level } from '../level'

export const bonuses: TBonuses = {
  bomb: {
    texture: textures.TEXTURE_BONUS_BOMB,
    callback: () => hero.abilities.bombs += 1,
  },
  fire: {
    texture: textures.TEXTURE_BONUS_FIRE,
    callback: () => hero.abilities.fire += 1,
  },
  speed: {
    texture: textures.TEXTURE_BONUS_SPEED,
    callback: hero.increaseSpeed,
  },
  detonator: {
    texture: textures.TEXTURE_BONUS_DETONATOR,
    callback: () => {
      hero.abilities.detonator = true
      Object.values(level.bombs).forEach((bomb) => bomb.clearExplosionTimeout())
    }
  },
  wallpass: {
    texture: textures.TEXTURE_BONUS_WALLPASS,
    callback: () => hero.abilities.wallpass = true,
  },
  bombpass: {
    texture: textures.TEXTURE_BONUS_BOMBPASS,
    callback: () => hero.abilities.bombpass = true,
  },
  firepass: {
    texture: textures.TEXTURE_BONUS_FIREPASS,
    callback: () => hero.abilities.firepass = true,
  },
  immortal: {
    texture: textures.TEXTURE_BONUS_IMMORTAL,
    callback: hero.makeImmortal,
  },
}
