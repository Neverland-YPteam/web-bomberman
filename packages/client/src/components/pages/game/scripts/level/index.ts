/**
 * Класс отвечает за начало уровня, генерирование WALL, персонажей и прочих плюшек
 *
 * @TODO Добавлять под случайными стенами BONUS и EXIT
 * @TODO Сделать окончание уровня
 */

import { TField, TCellCoords, TEnemyEntry } from './types'

import {
  FPS, MAP_TILES_COUNT_X, MAP_TILES_COUNT_Y, BG_COLOR, TEXT_COLOR, FONT_SIZE, textures,
} from '../const'

import {
  delay, getBooleanWithProbability, getRandomNumberBetween, LimitFrames,
} from '../utils'
import { canvasStatic, canvas, canvasModal } from '../canvas'
import { Control } from '../Control'
import { map } from '../map'
import { hero } from '../hero'
import { Enemy } from '../Enemy'
import { levelList } from './levelList'

const {
  TEXTURE_COLUMN,
  TEXTURE_WALL,
  TEXTURE_WALL_SAFE,
  TEXTURE_GRASS,
} = textures

const KEY_PAUSE = 'Escape'
const LEVEL_INTRO_TIMEOUT_MS = 500 // На этапе разработки большое значение не нужно
const SAFE_TILES_WALL_COUNT = 2 // Нам не нужно, чтобы стена образовалась прямо возле героя
const SAFE_TILES_ENEMY_COUNT = 8 // И враги тоже
const WALL_PROBABILITY_PCT = 40 // Вероятность появления стены

class Level {
  private _currentLevel = 0
  private _field: TField = []
  private _enemies: Enemy[] = []
  private _enemiesIndexes: string[] = []
  private _limitFrames: null | LimitFrames = null
  private _isPaused = false

  constructor() {
    new Control(KEY_PAUSE, this.togglePause)
  }

  private _showIntro() {
    canvasModal.rect(0, 0, canvasModal.width, canvasModal.height, BG_COLOR)
    canvasModal.text(
      `Уровень ${this._currentLevel}`,
      canvasModal.width / 2,
      canvasModal.height / 2,
      FONT_SIZE,
      TEXT_COLOR,
      'center'
    )
  }

  private _resetField() {
    const newField = []
    let rowIndex = 0

    while (rowIndex < MAP_TILES_COUNT_Y - 2) {
      const row = []
      let colIndex = 0

      while (colIndex < MAP_TILES_COUNT_X - 2) {
        const isColumn = rowIndex % 2 && colIndex % 2
        let texture = TEXTURE_COLUMN

        if (!isColumn) {
          // Некоторые враги могут ходить через стены, поэтому строим две безопасных стены возле персонажа
          const isSafeWallRight = rowIndex === 0 && colIndex === 2
          const isSafeWallBottom = rowIndex === 2 && colIndex === 0

          const isInsideSafeZone = rowIndex < SAFE_TILES_WALL_COUNT && colIndex < SAFE_TILES_WALL_COUNT
          const isWallRandomPositive = getBooleanWithProbability(WALL_PROBABILITY_PCT)
          const isWall = !isInsideSafeZone && isWallRandomPositive

          if (isSafeWallRight || isSafeWallBottom) {
            texture = TEXTURE_WALL_SAFE
            map.drawTexture(TEXTURE_WALL_SAFE, colIndex + 1, rowIndex + 1)
          } else if (isWall) {
            texture = TEXTURE_WALL
            map.drawTexture(TEXTURE_WALL, colIndex + 1, rowIndex + 1)
          } else {
            texture = TEXTURE_GRASS
          }
        }

        row.push(texture)
        colIndex++
      }

      newField.push(row)
      rowIndex++
    }

    this._field = newField
  }

  private _setHero() {
    hero.resetPosition()
    hero.draw()
    hero.allowControl()
  }

  private _updateEnemies() {
    this._enemies.forEach((enemy) => {
      enemy.move()
      enemy.draw()
    })
  }

  private _setEnemies() {
    const { enemies } = levelList[this._currentLevel]
    const enemyEntries = Object.entries(enemies) as TEnemyEntry[]

    enemyEntries.forEach(this._setEnemy)
  }

  private _setEnemy = ([name, count]: TEnemyEntry) => {
    let counter = 0

    while (counter < count) {
      const freeCellCoords = this._findFreeCell(SAFE_TILES_ENEMY_COUNT)

      if (!freeCellCoords) {
        return
      }

      const [row, col] = freeCellCoords
      const enemy = new Enemy(name)

      enemy.setPosition(row, col)
      enemy.draw()

      this._enemies.push(enemy)
      this._enemiesIndexes.push(`${row}-${col}`)

      counter++
    }
  }

  private _updateHero() {
    hero.move()
    hero.draw()
  }

  private _findFreeCell(safeTilesCount: number, usedTilesChecked = 0): TCellCoords | null {
    const row = getRandomNumberBetween(0, MAP_TILES_COUNT_Y - 3)
    const col = getRandomNumberBetween(0, MAP_TILES_COUNT_X - 3)

    const isInsideSafeZone = row <= safeTilesCount && col <= safeTilesCount
    const isTileUsed = this._enemiesIndexes.includes(`${row}-${col}`)
    const texture = this._field[row][col]

    if (isInsideSafeZone || texture !== TEXTURE_GRASS) {
      return this._findFreeCell(safeTilesCount, usedTilesChecked)
    }

    if (isTileUsed) {
      return usedTilesChecked < 10
        ? this._findFreeCell(safeTilesCount, usedTilesChecked + 1)
        : null
    }

    return [row, col]
  }

  // Очередность текстур играет роль, последние будут выше по контексту наложения
  private _updateDynamicTextures = () => {
    canvas.clear()
    this._updateEnemies()
    this._updateHero()
    canvas.update()
  }

  private _clearCanvasModal() {
    canvasModal.clear() // Очистили canvasModal
    canvasModal.update() // Обновили canvasModal
  }

  private _showPauseModal() {
    const modalWidth = 320
    const modalHeight = 150

    canvasModal.rect(0, 0, canvasModal.width, canvasModal.height, 'rgba(0, 0, 0, 0.2')
    canvasModal.rect(
      canvasModal.width / 2 - modalWidth / 2,
      canvasModal.height / 2 - modalHeight / 2,
      modalWidth,
      modalHeight,
      BG_COLOR,
    )
    canvasModal.text(
      `Пауза`,
      canvasModal.width / 2,
      canvasModal.height / 2,
      FONT_SIZE,
      TEXT_COLOR,
      'center',
    )
    canvasModal.update()
  }

  startGame() {
    this.goToNextLevel(1)
  }

  async goToNextLevel(level = this._currentLevel + 1) {
    // @TODO Вызов метода, который генерит бонус и его расположение
    // @TODO Вызов метода, который генерит расположение выхода

    this._currentLevel = level // Перешли на новый уровень

    this._showIntro() // Показали заставку
    canvasModal.update() // Обновили canvas

    this._resetField() // Поместили стены
    canvasStatic.update() // Обновили canvasStatic

    await delay(LEVEL_INTRO_TIMEOUT_MS) // Ждем новый уровень…

    canvas.clear() // Очистили canvas
    this._setHero() // Поместили героя
    this._setEnemies() // Поместили врагов
    canvas.update() // Обновили canvas
    this._clearCanvasModal()

    // Запускаем апдейт фреймов
    this._limitFrames = new LimitFrames(this._updateDynamicTextures, FPS)
    this._limitFrames.start()
  }

  getTileType(col: number, row: number) {
    if (
      col >= 0 && col < MAP_TILES_COUNT_X - 2 &&
      row >= 0 && row < MAP_TILES_COUNT_Y - 2
    ) {
      return this._field[row][col]
    }

    return TEXTURE_COLUMN
  }

  togglePause = (isKeydown: boolean) => {
    if (!isKeydown) {
      return
    }

    this._isPaused = !this._isPaused

    if (this._isPaused) {
      this._showPauseModal()
      this._limitFrames?.pause()
      hero.pauseAnimation()
      this._enemies.forEach((enemy) => enemy.pauseAnimation())
    } else {
      this._limitFrames?.resume()
      hero.resumeAnimation()
      this._enemies.forEach((enemy) => enemy.resumeAnimation())
      this._clearCanvasModal()
    }
  }
}

export const level = new Level()
