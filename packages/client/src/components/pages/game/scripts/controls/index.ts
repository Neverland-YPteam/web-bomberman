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
  _instance

  constructor(instance: Hero) {
    this._instance = instance
  }

  addListeners() {
    document.addEventListener('keydown', this._onKeyPressed)
    document.addEventListener('keyup', this._onKeyReleased)
  }

  removeListeners() {
    document.removeEventListener('keydown', this._onKeyPressed)
    document.removeEventListener('keyup', this._onKeyReleased)

    this._instance.isMovingLeft = false
    this._instance.isMovingRight = false
    this._instance.isMovingUp = false
    this._instance.isMovingDown = false
  }

  _keySet(evt: KeyboardEvent, value: boolean) {
    const { key } = evt

    if (key === KEY_LEFT) {
      evt.preventDefault()
      this._instance.isMovingLeft = value
    }
    if (key === KEY_RIGHT) {
      evt.preventDefault()
      this._instance.isMovingRight = value
    }
    if (key === KEY_UP) {
      evt.preventDefault()
      this._instance.isMovingUp = value
    }
    if (key === KEY_DOWN) {
      evt.preventDefault()
      this._instance.isMovingDown = value
    }
  }

  _onKeyPressed = (evt: KeyboardEvent) => {
    this._keySet(evt, true)
  }

  _onKeyReleased = (evt: KeyboardEvent) => {
    this._keySet(evt, false)
  }
}
