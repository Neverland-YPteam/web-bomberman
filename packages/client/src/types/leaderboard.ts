export interface ILeaderboardItemData {
  id: string
  name: string
  avatar: null | string
  score: number
}

export interface ILeaderboardItem {
  data: ILeaderboardItemData
}
