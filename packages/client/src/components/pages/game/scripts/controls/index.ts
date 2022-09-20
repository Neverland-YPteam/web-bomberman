/**
 * Класс отвечает за управление игрой с клавиатуры
 * Пока реализовано движение персонажа стрелками
 *
 * @TODO Размещение бомб
 * @TODO Взрыв бомб вручную при активном бонусе `detonator`
 * @TODO Выход из игры. Можно запилить отдельный класс Exit. Важно ставить игру на паузу
 * @TODO Вызывать removeListeners при смене роута
 */

import { Hero } from '../hero'

const KEY_LEFT = 'ArrowLeft'
const KEY_RIGHT = 'ArrowRight'
const KEY_UP = 'ArrowUp'
const KEY_DOWN = 'ArrowDown'
// const KEY_BOMB_PLACE = ' ' // @TODO Будем размещать бомбы пробелом
// const KEY_BOMB_DETONATE = 'd' // @TODO Будем взрывать бомбы другой клавишей

/**
 * @TODO Можно запилить выход из игры с клавиатуры
 * Допустим, будет появляться всплывашка с предупреждением, и надо будет нажать Escape или Enter
 */
// const KEY_EXIT = 'Escape'
// const KEY_EXIT_CANCEL = 'Escape'
// const KEY_EXIT_CONFIRM = 'Enter'

export class Controls {
  protected _instance

  constructor(instance: Hero) {
    this._instance = instance
  }

  private _keySet(evt: KeyboardEvent, value: boolean) {
    const { key } = evt

    if (key === KEY_LEFT) {
      evt.preventDefault()
      this._instance.isTryingToMoveLeft = value
    }
    if (key === KEY_RIGHT) {
      evt.preventDefault()
      this._instance.isTryingToMoveRight = value
    }
    if (key === KEY_UP) {
      evt.preventDefault()
      this._instance.isTryingToMoveUp = value
    }
    if (key === KEY_DOWN) {
      evt.preventDefault()
      this._instance.isTryingToMoveDown = value
    }
  }

  private _onKeyPressed = (evt: KeyboardEvent) => {
    this._keySet(evt, true)
  }

  private _onKeyReleased = (evt: KeyboardEvent) => {
    this._keySet(evt, false)
  }

  addListeners() {
    document.addEventListener('keydown', this._onKeyPressed)
    document.addEventListener('keyup', this._onKeyReleased)
  }

  removeListeners() {
    document.removeEventListener('keydown', this._onKeyPressed)
    document.removeEventListener('keyup', this._onKeyReleased)

    this._instance.isTryingToMoveLeft = false
    this._instance.isTryingToMoveRight = false
    this._instance.isTryingToMoveUp = false
    this._instance.isTryingToMoveDown = false
  }
}
