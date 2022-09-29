import { Bomb } from '../Bomb'

export type TAxis = 'x' | 'y'

export type TCondition = 'standing' | 'moving'

export type TDirectionX = 'left' | 'right'
export type TDirectionY = 'up' | 'down'
export type TDirection = TDirectionX | TDirectionY
export type TFreeDirections = Record<TDirection, boolean>

type TVertexCoord = { x: number, y: number }

export interface ICoords {
  topLeft: TVertexCoord
  topRight: TVertexCoord
  bottomLeft: TVertexCoord
  bottomRight: TVertexCoord
  mainCol: number
  mainRow: number
}

export interface ITextures {
  standing: {
    left: number[]
    right: number[]
    up: number[]
    down: number[]
  }
  moving: {
    left: number[]
    right: number[]
    up: number[]
    down: number[]
  }
  dead: number[]
}

export type TBombsPlaced = Record<string, Bomb>
