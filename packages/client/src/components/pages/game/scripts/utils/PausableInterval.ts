type TCallback = () => unknown

export class PausableInterval {
  private _callback: TCallback | null
  private _initialTimeout: number
  private _interval: null | ReturnType<typeof setInterval> = null
  private _timeout: null | ReturnType<typeof setTimeout> = null
  private _then = performance.now()
  private _remaining = 0

  constructor(callback: TCallback, timeout = 1000) {
    this._callback = callback
    this._initialTimeout = timeout
  }

  private _setInterval = () => {
    this._interval = setInterval(this._perform, this._initialTimeout)
  }

  private _perform = () => {
    this._callback?.()
    this._then = performance.now()
  }

  private _clear() {
    if (this._timeout !== null) {
      clearTimeout(this._timeout)
      this._timeout = null
    }

    if (this._interval !== null) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  get isRunning() {
    return this._interval !== null || this._timeout !== null
  }

  start() {
    this._clear()
    this._setInterval()
  }

  pause() {
    const now = performance.now()

    this._remaining = now - this._then
    this._clear()
  }

  resume() {
    this._then = performance.now()

    this._timeout = setTimeout(() => {
      this._callback?.()
      this._setInterval()
    }, this._remaining)
  }

  stop() {
    this._clear()
    this._callback = null
  }
}
