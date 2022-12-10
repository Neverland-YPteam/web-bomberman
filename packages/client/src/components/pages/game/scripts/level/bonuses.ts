import { TBonuses } from './types'

import { textures } from '../const'
import { hero } from '../hero'
import { level } from '../level'

export const bonuses: TBonuses = {
  bomb: {
    texture: textures.TEXTURE_BONUS_BOMB,
    callback: () => hero.abilities.bombs += 1,
    enemy: 'balloon'
  },
  fire: {
    texture: textures.TEXTURE_BONUS_FIRE,
    callback: () => hero.abilities.fire += 1,
    enemy: 'beaker'
  },
  speed: {
    texture: textures.TEXTURE_BONUS_SPEED,
    callback: hero.increaseSpeed,
    enemy: 'lantern'
  },
  detonator: {
    texture: textures.TEXTURE_BONUS_DETONATOR,
    abilityName: 'detonator',
    callback: () => {
      hero.abilities.detonator = true
      Object.values(level.bombs).forEach((bomb) => bomb.clearExplosionTimeout())
    },
    enemy: 'jelly'
  },
  wallpass: {
    texture: textures.TEXTURE_BONUS_WALLPASS,
    abilityName: 'wallpass',
    callback: () => hero.abilities.wallpass = true,
    enemy: 'face'
  },
  bombpass: {
    texture: textures.TEXTURE_BONUS_BOMBPASS,
    abilityName: 'bombpass',
    callback: () => hero.abilities.bombpass = true,
    enemy: 'ghost'
  },
  firepass: {
    texture: textures.TEXTURE_BONUS_FIREPASS,
    abilityName: 'firepass',
    callback: () => hero.abilities.firepass = true,
    enemy: 'bear'
  },
  immortal: {
    texture: textures.TEXTURE_BONUS_IMMORTAL,
    callback: hero.makeImmortal,
    enemy: 'coin'
  },
}
