export type TEnemyName = 'balloon' | 'beaker' | 'lantern' | 'face' | 'jelly' | 'ghost' | 'bear' | 'coin'

type TVertexCoord = { x: number, y: number }

export interface ICoords {
  topLeft: TVertexCoord
  topRight: TVertexCoord
  bottomLeft: TVertexCoord
  bottomRight: TVertexCoord
  mainCol: number
  mainRow: number
}

interface IEnemyTextures {
  left: number[]
  right: number[]
  dead: {
    left: number[]
    right: number[]
  }
  interval: number
}

interface IEnemy {
  textures: IEnemyTextures
  speed: number
  wallPass?: boolean
  canTurn?: boolean
  unpredictable?: boolean
  points: number
}

export type TEnemyList = Record<TEnemyName, IEnemy>

export type TDirectionX = 'left' | 'right'
export type TDirectionY = 'up' | 'down'
export type TDirection = TDirectionX | TDirectionY
