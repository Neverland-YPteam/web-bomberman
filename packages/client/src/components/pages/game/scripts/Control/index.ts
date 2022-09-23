/**
 * Класс отвечает за управление игрой с клавиатуры
 * Пока реализовано движение персонажа стрелками
 *
 * @TODO Размещение бомб
 * @TODO Взрыв бомб вручную при активном бонусе `detonator`
 * @TODO Выход из игры. Можно запилить отдельный класс Exit. Важно ставить игру на паузу
 * @TODO Вызывать removeListeners при смене роута
 */

import { TCallback } from './types'

// const KEY_BOMB_PLACE = ' ' // @TODO Будем размещать бомбы пробелом
// const KEY_BOMB_DETONATE = 'd' // @TODO Будем взрывать бомбы другой клавишей

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

// export class Controls2 {
//   protected _instance

//   constructor(instance: Hero & typeof level) {
//     this._instance = instance
//   }

//   private _keySet(evt: KeyboardEvent, value: boolean) {
//     const { key } = evt

//     if (key === KEY_LEFT) {
//       evt.preventDefault()
//       this._instance.isTryingToMoveLeft = value
//     }
//     if (key === KEY_RIGHT) {
//       evt.preventDefault()
//       this._instance.isTryingToMoveRight = value
//     }
//     if (key === KEY_UP) {
//       evt.preventDefault()
//       this._instance.isTryingToMoveUp = value
//     }
//     if (key === KEY_DOWN) {
//       evt.preventDefault()
//       this._instance.isTryingToMoveDown = value
//     }

//     if (key === KEY_PAUSE && value) {
//       evt.preventDefault()
//       this._instance.togglePause?.()
//     }
//   }

//   private _onKeyPressed = (evt: KeyboardEvent) => {
//     this._keySet(evt, true)
//   }

//   private _onKeyReleased = (evt: KeyboardEvent) => {
//     this._keySet(evt, false)
//   }

//   addListeners() {
//     document.addEventListener('keydown', this._onKeyPressed)
//     document.addEventListener('keyup', this._onKeyReleased)
//   }

//   removeListeners() {
//     document.removeEventListener('keydown', this._onKeyPressed)
//     document.removeEventListener('keyup', this._onKeyReleased)

//     this._instance.isTryingToMoveLeft = false
//     this._instance.isTryingToMoveRight = false
//     this._instance.isTryingToMoveUp = false
//     this._instance.isTryingToMoveDown = false
//   }
// }
