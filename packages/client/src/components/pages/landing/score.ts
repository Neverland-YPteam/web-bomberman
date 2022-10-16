interface IScore {
  title: string
  description: string
}

export const score: IScore[] = [
  { title: 'Разрушение стены', description: '5 очков' },
  { title: 'Уничтожение противника', description: 'зависит от противника (см. выше)' },
  { title: 'Прохождение уровня', description: '1000 очков × номер уровня + оставшееся время' },
]
