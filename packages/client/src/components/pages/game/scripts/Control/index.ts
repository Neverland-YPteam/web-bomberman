/**
 * Класс отвечает за управление игрой с клавиатуры
 *
 * @TODO Взрыв бомб вручную при активном бонусе `detonator`
 * @TODO Вызывать removeListeners при смене роута
 */

import { TKey, TCallback } from './types'

export class Control {
  private _key: TKey
  private _callback: TCallback

  constructor(key: TKey, callback: TCallback) {
    this._key = key
    this._callback = callback

    this._addListeners()
  }

  private _addListeners() {
    document.addEventListener('keydown', this._onKeyPressed)
    document.addEventListener('keyup', this._onKeyReleased)
  }

  private _checkForKey(key: string) {
    return Array.isArray(this._key) ? this._key.includes(key) : this._key === key
  }

  private _onKeyPressed = (evt: KeyboardEvent) => {
    const { code } = evt

    if (this._checkForKey(code)) {
      evt.preventDefault()
      this._callback(true)
    }
  }

  private _onKeyReleased = (evt: KeyboardEvent) => {
    const { code } = evt

    if (this._checkForKey(code)) {
      evt.preventDefault()
      this._callback(false)
    }
  }

  removeListeners() {
    document.removeEventListener('keydown', this._onKeyPressed)
    document.removeEventListener('keyup', this._onKeyReleased)
  }
}
