type TCallback = () => unknown

export class PausableTimeout {
  private _callback: TCallback | null
  private _remaining: number
  private _timeout: null | ReturnType<typeof setTimeout> = null
  private _then = performance.now()

  constructor(callback: TCallback, timeout = 1000) {
    this._callback = callback
    this._remaining = timeout
  }

  private _setTimeout = () => {
    this._timeout = setTimeout(this._perform, this._remaining)
  }

  private _perform = () => {
    this._callback?.()
    this._timeout = null
  }

  private _clear() {
    if (this._timeout !== null) {
      clearTimeout(this._timeout)
      this._timeout = null
    }
  }

  get isRunning() {
    return this._timeout !== null
  }

  start() {
    this._clear()
    this._setTimeout()
  }

  pause() {
    const now = performance.now()
    const elapsed = now - this._then

    this._remaining -= elapsed
    this._clear()
  }

  resume() {
    this._then = performance.now()
    this._timeout = setTimeout(this._perform, this._remaining)
  }

  stop() {
    this._clear()
    this._callback = null
  }
}
