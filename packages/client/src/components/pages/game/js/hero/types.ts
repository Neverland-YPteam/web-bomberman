export type TDirectionX = 'left' | 'right'
export type TDirectionY = 'up' | 'down'

type TVertexCoord = { x: number, y: number }

export interface IVertexCoords {
  topLeft: TVertexCoord
  topRight: TVertexCoord
  bottomLeft: TVertexCoord
  bottomRight: TVertexCoord
}
