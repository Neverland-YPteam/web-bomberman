export type TDirection = 'left' | 'right' | 'up' | 'down'
export type TBlockedDirections = Partial<Record<TDirection, number>>
export type TCellColRow = Record<'col' | 'row', number>

export type TTextures = number[][]
