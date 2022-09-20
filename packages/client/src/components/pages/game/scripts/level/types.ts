import { TEnemyName } from '../enemy/types'

type TEnemies = Record<TEnemyName, number>
export type TEnemyEntry = [TEnemyName, number]

interface ILevel {
  enemies: TEnemies
}
export type TLevelList = Record<number, ILevel>

type TFieldRow = number[]
export type TField = TFieldRow[]

export type TCellCoords = [number, number]
