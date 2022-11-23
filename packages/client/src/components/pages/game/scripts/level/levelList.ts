import { TLevelList } from './types'
import { bonuses } from './bonuses'

const { bomb, fire, speed, detonator, wallpass, bombpass, firepass, immortal } = bonuses

export const levelList: TLevelList = {
  1: {
    enemies: { balloon: 6 },
    bonus: fire,
    timeoutEnemy: 'balloon',
  },
  2: {
    enemies: { balloon: 4, beaker: 2 },
    bonus: bomb,
    timeoutEnemy: 'balloon',
  },
  3: {
    enemies: { balloon: 3, beaker: 2, lantern: 1 },
    bonus: detonator,
    timeoutEnemy: 'balloon',
  },
  4: {
    enemies: { balloon: 2, beaker: 2, lantern: 2 },
    bonus: speed,
    timeoutEnemy: 'beaker',
  },
  5: {
    enemies: { balloon: 1, beaker: 3, lantern: 2 },
    bonus: fire,
    timeoutEnemy: 'beaker',
  },
  6: {
    enemies: { beaker: 3, lantern: 2, face: 1 },
    bonus: bomb,
    timeoutEnemy: 'beaker',
  },
  7: {
    enemies: { beaker: 2, lantern: 2, face: 2 },
    bonus: detonator,
    reserveBonus: fire,
    timeoutEnemy: 'lantern',
  },
  8: {
    enemies: { beaker: 1, lantern: 3, face: 2 },
    bonus: fire,
    timeoutEnemy: 'lantern',
  },
  9: {
    enemies: { lantern: 3, face: 2, jelly: 1 },
    bonus: bomb,
    timeoutEnemy: 'lantern',
  },
  10: {
    enemies: { lantern: 2, face: 2, jelly: 2 },
    bonus: immortal,
    timeoutEnemy: 'face',
  },
  11: {
    enemies: { lantern: 1, face: 3, jelly: 2 },
    bonus: fire,
    timeoutEnemy: 'face',
  },
  12: {
    enemies: { face: 3, jelly: 2, ghost: 1 },
    bonus: wallpass,
    timeoutEnemy: 'face',
  },
  13: {
    enemies: { face: 2, jelly: 2, ghost: 2 },
    bonus: bomb,
    timeoutEnemy: 'jelly',
  },
  14: {
    enemies: { face: 1, jelly: 3, ghost: 2 },
    bonus: firepass,
    timeoutEnemy: 'jelly',
  },
  15: {
    enemies: { jelly: 3, ghost: 2, bear: 1 },
    bonus: bombpass,
    timeoutEnemy: 'ghost',
  },
  16: {
    enemies: { jelly: 2, ghost: 2, bear: 2 },
    bonus: wallpass,
    reserveBonus: bomb,
    timeoutEnemy: 'ghost',
  },
  17: {
    enemies: { jelly: 1, ghost: 3, bear: 2 },
    bonus: detonator,
    reserveBonus: fire,
    timeoutEnemy: 'bear',
  },
  18: {
    enemies: { ghost: 3, bear: 2, coin: 1 },
    bonus: bombpass,
    reserveBonus: bomb,
    timeoutEnemy: 'bear',
  },
  19: {
    enemies: { ghost: 2, bear: 2, coin: 2 },
    bonus: firepass,
    reserveBonus: fire,
    timeoutEnemy: 'coin',
  },
  20: {
    enemies: { ghost: 1, bear: 3, coin: 2 },
    bonus: immortal,
    timeoutEnemy: 'coin',
  },
}
