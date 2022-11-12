import { TEnemyName } from '../Enemy/types'

type TEnemies = Partial<Record<TEnemyName, number>>
export type TEnemyEntry = [TEnemyName, number]

interface ILevel {
  enemies: TEnemies
  bonus: IBonus
}

export type TLevelList = Record<number, ILevel>

type TFieldRow = number[]
export type TField = TFieldRow[]

export type TCellCoords = [number, number]
export type TCellColRow = Record<'col' | 'row', number>

export interface IShadowsToCheck {
  topLeft: boolean
  top: boolean
  left: boolean
}

export interface IBonus {
  texture: number
  callback: () => unknown
}

type TBonusName = 'bomb' | 'fire' | 'speed' | 'detonator' | 'wallpass' | 'bombpass' | 'firepass' | 'immortal'

export type TBonuses = Record<TBonusName, IBonus>
