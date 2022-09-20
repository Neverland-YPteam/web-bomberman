import { getRandomNumberBetween } from './getRandomNumberBetween'

export const getRandomArrayValue = <T>(arr: T[]): T => {
  const randomIndex = getRandomNumberBetween(0, arr.length - 1)

  return arr[randomIndex]
}
