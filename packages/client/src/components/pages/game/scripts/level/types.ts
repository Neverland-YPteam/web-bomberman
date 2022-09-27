import { TEnemyName } from '../Enemy/types'

type TEnemies = Partial<Record<TEnemyName, number>>
export type TEnemyEntry = [TEnemyName, number]

interface ILevel {
  enemies: TEnemies
}

export type TLevelList = Record<number, ILevel>

type TFieldRow = number[]
export type TField = TFieldRow[]

export type TCellCoords = [number, number]
