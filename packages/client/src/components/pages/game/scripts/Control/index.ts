/**
 * Класс отвечает за управление игрой с клавиатуры
 *
 * @TODO Взрыв бомб вручную при активном бонусе `detonator`
 * @TODO Вызывать removeListeners при смене роута
 */

import { TCallback } from './types'

export class Control {
  private _key: string
  private _callback: TCallback

  constructor(key: string, callback: TCallback) {
    this._key = key
    this._callback = callback

    this._addListeners()
  }

  private _addListeners() {
    document.addEventListener('keydown', this._onKeyPressed)
    document.addEventListener('keyup', this._onKeyReleased)
  }

  private _onKeyPressed = (evt: KeyboardEvent) => {
    const { key } = evt

    if (key === this._key) {
      evt.preventDefault()
      this._callback(true)
    }
  }

  private _onKeyReleased = (evt: KeyboardEvent) => {
    const { key } = evt

    if (key === this._key) {
      evt.preventDefault()
      this._callback(false)
    }
  }

  removeListeners() {
    document.removeEventListener('keydown', this._onKeyPressed)
    document.removeEventListener('keyup', this._onKeyReleased)
  }
}
