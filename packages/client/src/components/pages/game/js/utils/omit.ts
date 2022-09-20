// Пока поддержка только массивов
export const omit = (arr: unknown[], omitted: unknown) => {
  return arr.filter((value) => {
    return Array.isArray(omitted)
      ? !omitted.includes(value)
      : value !== omitted
  })
}
