import { TLevelList } from './types'
import { bonuses } from './bonuses'

const { bomb, fire, speed, detonator, wallpass, bombpass, firepass, immortal } = bonuses

export const levelList: TLevelList = {
  1: {
    enemies: { balloon: 6 },
    bonus: fire,
    doorEnemy: 'balloon',
  },
  2: {
    enemies: { balloon: 4, beaker: 2 },
    bonus: bomb,
    doorEnemy: 'balloon',
  },
  3: {
    enemies: { balloon: 3, beaker: 2, lantern: 1 },
    bonus: detonator,
    doorEnemy: 'balloon',
  },
  4: {
    enemies: { balloon: 2, beaker: 2, lantern: 2 },
    bonus: speed,
    doorEnemy: 'beaker',
  },
  5: {
    enemies: { balloon: 1, beaker: 3, lantern: 2 },
    bonus: fire,
    doorEnemy: 'beaker',
  },
  6: {
    enemies: { beaker: 3, lantern: 2, face: 1 },
    bonus: bomb,
    doorEnemy: 'beaker',
  },
  7: {
    enemies: { beaker: 2, lantern: 2, face: 2 },
    bonus: detonator,
    reserveBonus: fire,
    doorEnemy: 'lantern',
  },
  8: {
    enemies: { beaker: 1, lantern: 3, face: 2 },
    bonus: fire,
    doorEnemy: 'lantern',
  },
  9: {
    enemies: { lantern: 3, face: 2, jelly: 1 },
    bonus: bomb,
    doorEnemy: 'lantern',
  },
  10: {
    enemies: { lantern: 2, face: 2, jelly: 2 },
    bonus: immortal,
    doorEnemy: 'face',
  },
  11: {
    enemies: { lantern: 1, face: 3, jelly: 2 },
    bonus: fire,
    doorEnemy: 'face',
  },
  12: {
    enemies: { face: 3, jelly: 2, ghost: 1 },
    bonus: wallpass,
    doorEnemy: 'face',
  },
  13: {
    enemies: { face: 2, jelly: 2, ghost: 2 },
    bonus: bomb,
    doorEnemy: 'jelly',
  },
  14: {
    enemies: { face: 1, jelly: 3, ghost: 2 },
    bonus: firepass,
    doorEnemy: 'jelly',
  },
  15: {
    enemies: { jelly: 3, ghost: 2, bear: 1 },
    bonus: bombpass,
    doorEnemy: 'ghost',
  },
  16: {
    enemies: { jelly: 2, ghost: 2, bear: 2 },
    bonus: wallpass,
    reserveBonus: bomb,
    doorEnemy: 'ghost',
  },
  17: {
    enemies: { jelly: 1, ghost: 3, bear: 2 },
    bonus: detonator,
    reserveBonus: fire,
    doorEnemy: 'bear',
  },
  18: {
    enemies: { ghost: 3, bear: 2, coin: 1 },
    bonus: bombpass,
    reserveBonus: bomb,
    doorEnemy: 'bear',
  },
  19: {
    enemies: { ghost: 2, bear: 2, coin: 2 },
    bonus: firepass,
    reserveBonus: fire,
    doorEnemy: 'coin',
  },
  20: {
    enemies: { ghost: 1, bear: 3, coin: 2 },
    bonus: immortal,
    doorEnemy: 'coin',
  },
}
