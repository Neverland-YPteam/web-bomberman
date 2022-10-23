export interface ILeaderboardItemData {
  id: number
  name: string
  avatar: null | string
  score: number
}

export interface ILeaderboardItem {
  data: ILeaderboardItemData
}
