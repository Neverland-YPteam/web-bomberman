type TCallback = () => unknown

const FPS_DEFAULT = 60

export class LimitFrames {
  private _animationFrame: null | ReturnType<typeof requestAnimationFrame> = null
  private _interval = FPS_DEFAULT
  private _then = 0
  private _callback: TCallback
  private _isPaused = false

  constructor(callback: TCallback, fps = FPS_DEFAULT) {
    this._callback = callback
    this._interval = 1000 / fps
  }

  private _request() {
    this._animationFrame = requestAnimationFrame(this._loop)
  }

  private _loop = () => {
    this._request()

    const now = performance.now()
    const delta = now - this._then

    if (delta > this._interval && !this._isPaused) {
      this._then = now - (delta % this._interval)
      this._callback?.()
    }
  }

  start() {
    this._then = performance.now()
    this._request()
  }

  pause() {
    this._isPaused = true
  }

  resume() {
    this._isPaused = false
  }

  stop() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame)
    }
  }
}
