import { getRandomNumberBetween } from './getRandomNumberBetween'

export const getRandomBoolean = () => Boolean(getRandomNumberBetween(0, 1))
