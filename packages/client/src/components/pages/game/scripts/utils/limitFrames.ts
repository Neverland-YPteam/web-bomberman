export const limitFrames = (cb: () => unknown, fps = 60) => {
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
  })()
}
