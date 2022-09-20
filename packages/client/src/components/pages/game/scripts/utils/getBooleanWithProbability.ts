export const getBooleanWithProbability = (percent: number) => {
  return Math.random() < percent * 0.01
}
