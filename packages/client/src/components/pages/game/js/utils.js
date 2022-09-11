/**
 * Можно что-нибудь заменить на методы из лодаша
 */

const delay = (timeout) => new Promise((res) => { setTimeout(res, timeout) })

const limitFrames = (cb, fps = 60) => {
  const interval = 1000 / fps
  let then = performance.now()

  return (function loop() {
    requestAnimationFrame(loop)

    const now = performance.now()
    const delta = now - then

    if (delta > interval) {
      then = now - (delta % interval)
      cb()
    }
  }(0))
}

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const getBooleanWithProbability = (percent) => Math.random() < percent * 0.01

const getRandomBoolean = () => Boolean(getRandomNumberBetween(0, 1))

const getRandomArrayValue = (arr) => {
  const randomIndex = getRandomNumberBetween(0, arr.length - 1)

  return arr[randomIndex]
}

// Пока поддержка только массивов
const omit = (arr, omitted) => {
  return arr.filter((value) => {
    return Array.isArray(omitted)
      ? !omitted.includes(value)
      : value !== omitted
  })
}

const floatNum = (num) => parseFloat(num.toFixed(5))

export {
  delay,
  getRandomArrayValue,
  getBooleanWithProbability,
  getRandomNumberBetween,
  getRandomBoolean,
  floatNum,
  limitFrames,
  omit,
}
