/**
 * Класс отвечает за начало уровня, генерирование WALL, персонажей и прочих плюшек
 *
 * @TODO Добавлять под случайными стенами BONUS и EXIT
 * @TODO Сделать окончание уровня
 */

import { TField, TCellCoords, TEnemyEntry } from './types'

import {
  FPS,
  MAP_TILES_COUNT_X,
  MAP_TILES_COUNT_Y,
  BG_COLOR,
  TEXT_COLOR,
  FONT_SIZE,
  textures,
} from '../const'

import {
  delay,
  getBooleanWithProbability,
  getRandomNumberBetween,
  limitFrames,
} from '../utils'
import { canvasStatic, canvas } from '../canvas'
import { map } from '../map'
import { hero } from '../hero'
import { Enemy } from '../enemy'
import { levelList } from './levelList'

const {
  TEXTURE_COLUMN,
  TEXTURE_WALL,
  TEXTURE_GRASS,
} = textures

const LEVEL_INTRO_TIMEOUT_MS = 500 // На этапе разработки большое значение не нужно
const SAFE_TILES_WALL_COUNT = 2 // Нам не нужно, чтобы стена образовалась прямо возле героя
const SAFE_TILES_ENEMY_COUNT = 8 // И враги тоже
const WALL_PROBABILITY_PCT = 40 // Вероятность появления стены

class Level {
  private _currentLevel = 0
  private _field: TField = []
  private _enemies: Enemy[] = []
  private _enemiesIndexes: string[] = []

  private _showIntro() {
    canvas.rect(0, 0, canvas.width, canvas.height, BG_COLOR)
    canvas.text(`Уровень ${this._currentLevel}`, canvas.width / 2, canvas.height / 2, FONT_SIZE, TEXT_COLOR, 'center')
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
          const isInsideSafeZone = rowIndex < SAFE_TILES_WALL_COUNT && colIndex < SAFE_TILES_WALL_COUNT
          const isWallRandomPositive = getBooleanWithProbability(WALL_PROBABILITY_PCT)
          const isWall = !isInsideSafeZone && isWallRandomPositive

          texture = isWall ? TEXTURE_WALL : TEXTURE_GRASS

          if (isWall) {
            map.drawTexture(TEXTURE_WALL, colIndex + 1, rowIndex + 1)
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
      const [row, col] = this._findFreeCell(SAFE_TILES_ENEMY_COUNT)
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

  private _findFreeCell(safeTilesCount: number): TCellCoords {
    const row = getRandomNumberBetween(0, MAP_TILES_COUNT_Y - 3)
    const col = getRandomNumberBetween(0, MAP_TILES_COUNT_X - 3)

    const isInsideSafeZone = row <= safeTilesCount && col <= safeTilesCount
    const isTileUsed = this._enemiesIndexes.includes(`${row}-${col}`)
    const texture = this._field[row][col]

    return !isInsideSafeZone && !isTileUsed && texture === TEXTURE_GRASS
      ? [row, col]
      : this._findFreeCell(safeTilesCount)
  }

  // Очередность текстур играет роль, последние будут выше по контексту наложения
  private _updateDynamicTextures = () => {
    canvas.clear()
    this._updateEnemies()
    this._updateHero()
    canvas.update()
  }

  startGame() {
    this.goToNextLevel(1)
  }

  async goToNextLevel(level = this._currentLevel + 1) {
    // @TODO Вызов метода, который генерит бонус и его расположение
    // @TODO Вызов метода, который генерит расположение выхода

    this._currentLevel = level // Перешли на новый уровень

    this._showIntro() // Показали заставку
    canvas.update() // Обновили canvas

    this._resetField() // Поместили стены
    canvasStatic.update() // Обновили canvasStatic

    await delay(LEVEL_INTRO_TIMEOUT_MS) // Ждем новый уровень…

    canvas.clear() // Очистили canvas
    this._setHero() // Поместили героя
    this._setEnemies() // Поместили врагов
    canvas.update() // Обновили canvas

    /**
     * Запускаем апдейт фреймов
     *
     * @TODO Научиться временно дизаблить эту штуку
     * Пригодится перед очередным goToNextLevel или при появлении попапа о подтверждении выхода
     */
    limitFrames(this._updateDynamicTextures, FPS)
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
}

export const level = new Level()
