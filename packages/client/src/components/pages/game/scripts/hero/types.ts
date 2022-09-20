export type TAxis = 'x' | 'y'

export type TCondition = 'standing' | 'moving'

export type TDirectionX = 'left' | 'right'
export type TDirectionY = 'up' | 'down'
export type TDirection = TDirectionX | TDirectionY
export type TFreeDirections = Record<TDirection, boolean>

type TVertexCoord = { x: number, y: number }

export interface IVertexCoords {
  topLeft: TVertexCoord
  topRight: TVertexCoord
  bottomLeft: TVertexCoord
  bottomRight: TVertexCoord
}
