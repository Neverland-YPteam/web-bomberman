/**
 * Класс отвечает за начало уровня, генерирование WALL, персонажей, проигрыш, выигрыш и разные прочие плюшки
 */

 import { nanoid } from 'nanoid'
import { TField, TCellCoords, TEnemyEntry, TCellColRow, IShadowsToCheck, IBonus } from './types'
import { TEnemyName } from '../Enemy/types'

import {
  FPS, MAP_TILES_COUNT_X, MAP_TILES_COUNT_Y, BG_COLOR, FONT_SIZE,
  TEXT_COLOR_DEFAULT, TEXT_COLOR_SUCCESS, TEXT_COLOR_ERROR, textures,
} from '../const'

import {
  delay,
  getBooleanWithProbability,
  getRandomArrayValue,
  getRandomNumberBetween,
  isEqual,
  LimitFrames,
  PausableTimeout,
} from '../utils'

import { endGameCallback } from '../'
import { canvasStatic, canvas, canvasModal } from '../canvas'
import { Control } from '../Control'
import { panel } from '../panel'
import { map } from '../map'
import { hero } from '../hero'
import { Bomb } from '../Bomb'
import { Flame } from '../Flame'
import { Enemy } from '../Enemy'
import { Score } from '../Score'
import { levelList } from './levelList'
import { stats } from '../stats'
import { pause } from '../pause'

const {
  TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE, TEXTURE_WALL_DAMAGED_2, TEXTURE_GRASS, TEXTURE_DOOR,
  TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE,
  TEXTURE_SHADOW_TL_T_L, TEXTURE_SHADOW_TL_T, TEXTURE_SHADOW_TL_L,
  TEXTURE_SHADOW_TL, TEXTURE_SHADOW_T, TEXTURE_SHADOW_L,
  TEXTURE_FLOWER_1, TEXTURE_FLOWER_2, TEXTURE_FLOWER_3, TEXTURE_FLOWER_4, TEXTURE_FLOWER_5, TEXTURE_FLOWER_6,
  TEXTURE_FLOWER_7, TEXTURE_FLOWER_8, TEXTURE_FLOWER_9, TEXTURE_FLOWER_10, TEXTURE_FLOWER_11, TEXTURE_FLOWER_12,
} = textures

const LEVEL_INTRO_TIMEOUT_MS = 2000 // На этапе разработки большое значение не нужно
const LEVEL_CHANGE_TIMEOUT_MS = 3000
const END_GAME_TIMEOUT_MS = 2000
const SAFE_TILES_WALL_COUNT = 2 // Нам не нужно, чтобы стена образовалась прямо возле героя
const SAFE_TILES_ENEMY_COUNT = 3 // И враги тоже
const WALL_PROBABILITY_PCT = 35 // Вероятность появления стены
const FLOWER_PROBABILITY_PCT = 20 // Вероятность появления цветка
const DOOR_ATTACK_DELAY_S = 3 // Как часто при взрыве двери появляются враги
const DOOR_BONUS_ENEMIES_COUNT = 8 // Количество дополнительных врагов при взрыве двери или бонуса
const TIMEOUT_ENEMY_NAME = 'coin' // Враг, который появляется по окончании времени
const TIMEOUT_ENEMIES_COUNT = 10 // Количество дополнительных врагов по окончании времени
const LEVEL_COMPLETE_SCORE_BASE = 1000
const KEYS_PAUSE = ['Escape', 'KeyP']
const KEY_FULLSCREEN = 'KeyF'
const GAME_CONTENT_ELEMENT_SELECTOR = '.game__content'

const FLOWER_TEXTURES = [
  TEXTURE_FLOWER_1, TEXTURE_FLOWER_2, TEXTURE_FLOWER_3, TEXTURE_FLOWER_4, TEXTURE_FLOWER_5, TEXTURE_FLOWER_6,
  TEXTURE_FLOWER_7, TEXTURE_FLOWER_8, TEXTURE_FLOWER_9, TEXTURE_FLOWER_10, TEXTURE_FLOWER_11, TEXTURE_FLOWER_12,
]
const BOMB_TEXTURES = [TEXTURE_BOMB_SMALL, TEXTURE_BOMB_MEDIUM, TEXTURE_BOMB_LARGE]
const SOLID_TEXTURES = [TEXTURE_COLUMN, TEXTURE_WALL, TEXTURE_WALL_SAFE, TEXTURE_DOOR]

class Level {
  private _controlFullscreen: null | Control = null
  private _controlPause: null | Control = null
  private _field: TField = []
  private _walls: [number, number][] = []
  private _enemiesIndexes: string[] = []
  private _isPauseAllowed = false
  private _isPaused = false
  private _bonus: null | IBonus = null
  private _doorAttackTimeout: null | PausableTimeout = null

  limitFrames: null | LimitFrames = null
  currentLevel = 0
  showHero = true
  doorCoords?: TCellCoords
  bonusCoords?: TCellCoords
  bombs: Record<string, Bomb> = {}
  flames: Record<string, Flame> = {}
  burningCells: [number, number][] = []
  enemies: Enemy[] = []
  scorePopups: Record<string, Score> = {}
  isBonusPickedUp = false
  isDoorOpened = false
  isDoorAttackable = true

  constructor() {
    this._controlFullscreen = new Control(KEY_FULLSCREEN, this._toggleFullscreen)
    this._controlPause = new Control(KEYS_PAUSE, this._togglePause)
  }

  private _showIntro() {
    canvasModal.rect(0, 0, canvasModal.width, canvasModal.height, BG_COLOR)
    canvasModal.text(
      `Уровень ${this.currentLevel}`,
      canvasModal.width / 2,
      canvasModal.height / 2,
      FONT_SIZE,
      TEXT_COLOR_DEFAULT,
      'center'
    )
  }

  private _resetField() {
    this._walls = []

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
            this._walls.push([colIndex, rowIndex])
            map.drawTexture(TEXTURE_WALL_SAFE, colIndex + 1, rowIndex + 1)
          } else if (isWall) {
            texture = TEXTURE_WALL
            this._walls.push([colIndex, rowIndex])
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

  private _tryToDrawFlower(col: number, row: number) {
    const drawFlower = getBooleanWithProbability(FLOWER_PROBABILITY_PCT)

    if (drawFlower) {
      const texture = getRandomArrayValue(FLOWER_TEXTURES)
      map.drawTexture(texture, col + 1, row + 1)
    }
  }

  private _drawGrassShadowsAndFlowers() {
    this._field.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const isColumn = rowIndex % 2 !== 0 && colIndex % 2 !== 0

        if (!isColumn && col === TEXTURE_GRASS) {
          this._tryToDrawFlower(colIndex, rowIndex)
          this._drawGrassShadow(colIndex, rowIndex)
        }
      })
    })
  }

  private _drawGrassShadow(
    col: number,
    row: number,
    shadowsToCheck: IShadowsToCheck = { topLeft: true, top: true, left: true },
  ) {
    const isRowFirst = row === 0
    const isColFirst = col === 0

    const isTopLeftSolid = this._isTextureSolid(row - 1, col - 1)
    const isTopSolid = this._isTextureSolid(row - 1, col)
    const isLeftSolid = this._isTextureSolid(row, col - 1)

    const hasShadowTopLeft = shadowsToCheck.topLeft && (isRowFirst && isColFirst || isTopLeftSolid)
    const hasShadowTop = shadowsToCheck.top && (isRowFirst || isTopSolid)
    const hasShadowLeft = shadowsToCheck.left && (isColFirst || isLeftSolid)

    const texture = this._getShadowTexture(hasShadowTopLeft, hasShadowTop, hasShadowLeft)

    if (texture) {
      map.drawTexture(texture, col + 1, row + 1)
    }
  }

  private _updateGrass(col: number, row: number, shadowsToCheck: IShadowsToCheck) {
    const texture = this._field[row]?.[col]

    if (texture === TEXTURE_GRASS || BOMB_TEXTURES.includes(texture)) {
      map.drawTexture(TEXTURE_GRASS, col + 1, row + 1)
      this._drawGrassShadow(col, row, shadowsToCheck)
    }
  }

  private _isTextureSolid(row: number, col: number) {
    if (row < 0 || col < 0) {
      return true
    }

    const texture = this._field[row][col]
    return SOLID_TEXTURES.includes(texture)
  }

  private _getShadowTexture(topLeft: boolean, top: boolean, left: boolean) {
    if (topLeft && top && left) return TEXTURE_SHADOW_TL_T_L
    if (topLeft && top) return TEXTURE_SHADOW_TL_T
    if (topLeft && left) return TEXTURE_SHADOW_TL_L
    if (topLeft) return TEXTURE_SHADOW_TL
    if (top && left) return TEXTURE_SHADOW_TL_T_L
    if (top) return TEXTURE_SHADOW_T
    if (left) return TEXTURE_SHADOW_L
    return null
  }

  private _setDoorColRow() {
    this.doorCoords = getRandomArrayValue(this._walls)
  }

  private _setBonus() {
    this.bonusCoords = getRandomArrayValue(this._walls)

    const isBusy = isEqual(this.doorCoords as TCellCoords, this.bonusCoords)

    if (isBusy) {
      this._setBonus()
      return
    }

    const { abilityName } = this._currentLevelObject.bonus
    const { bonus, reserveBonus } = this._currentLevelObject

    if (abilityName && hero.abilities[abilityName] && reserveBonus) {
      this._bonus = reserveBonus
    } else {
      this._bonus = bonus
    }
  }

  private _setHero() {
    hero.reset()
    hero.draw()
    hero.allowControl()
  }

  private _updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.move()
      enemy.draw()
    })
  }

  private _setEnemies() {
    this.enemies = []

    const { enemies } = this._currentLevelObject
    const enemyEntries = Object.entries(enemies) as TEnemyEntry[]

    enemyEntries.forEach(([name, count]: TEnemyEntry) => {
      this._setEnemy(name, count)
    })
  }

  private _setEnemy = (name: TEnemyName, count: number, coords?: TCellCoords, immortal = false) => {
    let counter = 0

    while (counter < count) {
      let [col, row] = coords ?? []

      if (col === undefined || row === undefined) {
        const freeCellCoords = this._findFreeCellForEnemy(SAFE_TILES_ENEMY_COUNT)

        if (!freeCellCoords) {
          return
        }

        [row, col] = freeCellCoords
      }

      const id = nanoid()
      const enemy = new Enemy(name, id, immortal)

      enemy.setPosition(row, col)
      enemy.draw()

      this.enemies.push(enemy)
      this._enemiesIndexes.push(`${row}-${col}`)

      counter++
    }
  }

  private _updateHero() {
    if (this.showHero) {
      hero.move()
      hero.draw()
    }
  }

  private _updateBombs() {
    Object.values(this.bombs).forEach((instance) => instance.update())
  }

  private _updateFlames() {
    Object.values(this.flames).forEach((instance) => instance.draw())
  }

  private _updateScorePopups() {
    Object.values(this.scorePopups).forEach((instance) => instance.draw())
  }

  private _findFreeCellForEnemy(safeTilesCount: number, usedTilesChecked = 0): TCellCoords | null {
    const col = getRandomNumberBetween(0, MAP_TILES_COUNT_X - 3)
    const row = getRandomNumberBetween(0, MAP_TILES_COUNT_Y - 3)

    const { mainCol, mainRow } = hero.coords
    const [minColSafeZone, maxColSafeZone] = [mainCol - safeTilesCount, mainCol + safeTilesCount]
    const [minRowSafeZone, maxRowSafeZone] = [mainRow - safeTilesCount, mainRow + safeTilesCount]

    const isColInsideSafeZone = col >= minColSafeZone && col <= maxColSafeZone
    const isRowInsideSafeZone = row >= minRowSafeZone && row <= maxRowSafeZone
    const isInsideSafeZone = isColInsideSafeZone && isRowInsideSafeZone

    const isTileUsed = this._enemiesIndexes.includes(`${row}-${col}`)
    const texture = this._field[row][col]

    if (isInsideSafeZone || texture !== TEXTURE_GRASS) {
      return this._findFreeCellForEnemy(safeTilesCount, usedTilesChecked)
    }

    if (isTileUsed) {
      return usedTilesChecked < 10
        ? this._findFreeCellForEnemy(safeTilesCount, usedTilesChecked + 1)
        : null
    }

    return [row, col]
  }

  // Очередность текстур играет роль, последние будут выше по контексту наложения
  private _updateDynamicTextures = () => {
    this.burningCells = []

    canvas.clear()
    this._updateFlames()
    this._updateBombs()
    this._updateEnemies()
    this._updateScorePopups()
    this._updateHero()
    canvas.update()
  }

  private _clearCanvasModal() {
    canvasModal.clear() // Очистили canvasModal
    canvasModal.update() // Обновили canvasModal
  }

  // Подчищаем разные штуки для перезапуска уровня
  private _tieUpLooseEnds() {
    panel.init()
    map.draw()

    this._isPauseAllowed = false
    this.showHero = true
    this.bombs = {}
    this.isBonusPickedUp = false
    this.isDoorOpened = false
    this.isDoorAttackable = true
  }

  private _endGame(isVictory: boolean) {
    this._showFinalScreen(isVictory)
    this.limitFrames?.stop()
  }

  private async _showFinalScreen(isVictory: boolean) {
    const emoji = isVictory ? '🎉' : '😞'
    const text = isVictory ? 'Поздравляем с победой!' : 'Вы проиграли'
    const color = isVictory ? TEXT_COLOR_SUCCESS : TEXT_COLOR_ERROR

    const textWidth = canvasModal.measureText(text)
    const modalWidth = textWidth + FONT_SIZE * 4
    const modalHeight = FONT_SIZE * 8

    canvasModal.rect(0, 0, canvasModal.width, canvasModal.height, 'rgba(0, 0, 0, 0.2')

    canvasModal.rect(
      canvasModal.width / 2 - modalWidth / 2,
      canvasModal.height / 2 - modalHeight / 2,
      modalWidth, modalHeight, BG_COLOR,
    )

    canvasModal.text(
      emoji, canvasModal.width / 2, canvasModal.height / 2 - FONT_SIZE,
      FONT_SIZE * 2, color, 'center',
    )

    canvasModal.text(
      text, canvasModal.width / 2, canvasModal.height / 2 + FONT_SIZE * 2,
      FONT_SIZE, color, 'center',
    )

    canvasModal.update()

    await delay(END_GAME_TIMEOUT_MS)
    endGameCallback?.(stats.score)
  }

  private _togglePause = (isKeydown: boolean) => {
    if (!isKeydown || !this._isPauseAllowed) {
      return
    }

    this._isPaused = !this._isPaused

    if (this._isPaused) {
      pause.show()
    } else {
      pause.hide()
      this._clearCanvasModal()
    }
  }

  private _toggleFullscreen = (isKeydown: boolean) => {
    if (!isKeydown) {
      return
    }

    const element = document.querySelector(GAME_CONTENT_ELEMENT_SELECTOR)

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      element?.requestFullscreen()
    }
  }

  private _updateNearestCellsShadows(col: number, row: number) {
    this._updateGrass(col + 1, row, { topLeft: true, top: true, left: false })
    this._updateGrass(col, row + 1, { topLeft: true, top: false, left: true })
    this._updateGrass(col + 1, row + 1, { topLeft: false, top: true, left: true })
  }

  private _makeDoorAttackable = () => {
    this.isDoorAttackable = true

    this._doorAttackTimeout?.stop()
    this._doorAttackTimeout = null
  }

  private get _currentLevelObject() {
    return levelList[this.currentLevel]
  }

  get canExit() {
    return this.enemies.length === 0
  }

  startGame() {
    stats.reset()
    this.goToNextLevel(1)
  }

  goToNextLevel = async (level = this.currentLevel + 1) => {
    this._tieUpLooseEnds()
    this.currentLevel = level // Перешли на новый уровень

    this._showIntro() // Показали заставку
    canvasModal.update() // Обновили canvas

    this._resetField() // Поместили стены
    this._drawGrassShadowsAndFlowers()
    this._setDoorColRow() // Добавили дверь
    this._setBonus() // Добавили бонус
    canvasStatic.update() // Обновили canvasStatic

    await delay(LEVEL_INTRO_TIMEOUT_MS) // Ждем новый уровень…

    stats.resetTime()

    canvas.clear() // Очистили canvas
    this._setHero() // Поместили героя
    this._setEnemies() // Поместили врагов
    canvas.update() // Обновили canvas
    this._clearCanvasModal() // Убрали модалку

    // Запускаем апдейт фреймов
    this.limitFrames?.stop()
    this.limitFrames = new LimitFrames(this._updateDynamicTextures, FPS)
    this.limitFrames.start()

    this._isPauseAllowed = true
  }

  getTileType(col: number, row: number) {
    const isInnerCol = col >= 0 && col < MAP_TILES_COUNT_X - 2
    const isInnerRow = row >= 0 && row < MAP_TILES_COUNT_Y - 2

    return isInnerCol && isInnerRow ? this._field[row][col] : TEXTURE_COLUMN
  }

  isDoor(col: number, row: number) {
    const [doorCol, doorRow] = this.doorCoords as TCellCoords
    return col === doorCol && row === doorRow
  }

  isBonus(col: number, row: number) {
    if (this.isBonusPickedUp) {
      return false
    }

    const [bonusCol, bonusRow] = this.bonusCoords as TCellCoords
    return col === bonusCol && row === bonusRow
  }

  updateTexture(texture: number, col: number, row: number) {
    this._field[row][col] = texture
  }

  addBomb(instance: Bomb) {
    this.bombs[instance.id] = instance
  }

  removeBomb(id: string) {
    delete this.bombs[id]
  }

  explodeOldestBomb() {
    const [oldestBombKey] = Object.keys(this.bombs)

    if (oldestBombKey) {
      this.bombs[oldestBombKey].explode()
      this.removeBomb(oldestBombKey)
    }
  }

  addFlame(instance: Flame) {
    this.flames[instance.id] = instance
  }

  removeFlame(id: string) {
    delete this.flames[id]
  }

  addBurningCell = ({ col, row }: TCellColRow) => {
    this.burningCells.push([col, row])
  }

  updateWall = (texture: number, { col, row }: TCellColRow) => {
    const mapCol = col + 1
    const mapRow = row + 1
    const currentTexture = map.getTexture(mapCol, mapRow)

    if (currentTexture !== texture) {
      const isDoor = level.isDoor(col, row)
      const isBonus = level.isBonus(col, row)

      map.drawTexture(TEXTURE_GRASS, mapCol, mapRow)

      if (isDoor) {
        this.isDoorOpened = true
        map.drawTexture(TEXTURE_DOOR, mapCol, mapRow)
      } else if (isBonus) {
        map.drawTexture(this._bonus?.texture as number, mapCol, mapRow)
      } else {
        this._drawGrassShadow(col, row)
      }

      map.drawTexture(texture, mapCol, mapRow)

      if (texture === TEXTURE_WALL_DAMAGED_2 && !isDoor && !isBonus) {
        this._updateNearestCellsShadows(col, row)
      }

      canvasStatic.update()
    }
  }

  onRemoveBomb(col: number, row: number) {
    const isDoor = this.isDoor(col, row)
    const isBonus = this.isBonus(col, row)

    if (!isDoor && !isBonus) {
      map.drawTexture(TEXTURE_GRASS, col + 1, row + 1)
      this._drawGrassShadow(col, row)
    }

    canvasStatic.update()
  }

  removeWall = ({ col, row }: TCellColRow) => {
    this.updateTexture(TEXTURE_GRASS, col, row)

    const isDoor = this.isDoor(col, row)
    const isBonus = this.isBonus(col, row)

    let texture = TEXTURE_GRASS

    if (isDoor) {
      texture = TEXTURE_DOOR
    } else if (isBonus) {
      texture = this._bonus?.texture as number
    }

    map.drawTexture(texture, col + 1, row + 1)

    if (!isDoor && !isBonus) {
      this._drawGrassShadow(col, row)
    }

    canvasStatic.update()
  }

  removeBonus() {
    const [col, row] = this.bonusCoords as number[]

    this.updateTexture(TEXTURE_GRASS, col, row)
    map.drawTexture(TEXTURE_GRASS, col + 1, row + 1)
    this._drawGrassShadow(col, row)
    this._updateNearestCellsShadows(col, row)

    canvasStatic.update()

    if (this._bonus) {
      const bonusEnemyName = this._bonus.enemy
      this._setEnemy(bonusEnemyName, DOOR_BONUS_ENEMIES_COUNT, this.bonusCoords, true)
      this._bonus = null
    }
  }

  onDoorAttack() {
    this.isDoorAttackable = false

    this._setEnemy(
      this._currentLevelObject.doorEnemy,
      DOOR_BONUS_ENEMIES_COUNT,
      this.doorCoords,
      true
    )

    this._doorAttackTimeout = new PausableTimeout(this._makeDoorAttackable, DOOR_ATTACK_DELAY_S * 1000)
    this._doorAttackTimeout.start()
  }

  removeEnemy(id: string) {
    this.enemies = this.enemies.filter((enemy) => enemy.id !== id)
  }

  addScorePopup(instance: Score) {
    this.scorePopups[instance.id] = instance
  }

  removeScorePopup(id: string) {
    delete this.scorePopups[id]
  }

  pickUpBonus() {
    this.isBonusPickedUp = true

    const [col, row] = this.bonusCoords as number[]

    this.updateTexture(TEXTURE_GRASS, col, row)
    map.drawTexture(TEXTURE_GRASS, col + 1, row + 1)
    this._drawGrassShadow(col, row)
    this._updateNearestCellsShadows(col, row)
    canvasStatic.update()

    this._bonus?.callback()
  }

  onLose = () => {
    this._isPauseAllowed = false

    hero.removeControl()
    stats.stopIntervals()
    Object.values(this.bombs).forEach((bomb) => bomb.stopIntervals())

    setTimeout(() => {
      if (stats.lives > 0) {
        hero.stopIntervals()
        hero.resetAbilities()
        stats.decreaseLife()
        this.goToNextLevel(this.currentLevel)
      } else {
        this._endGame(false)
      }
    }, LEVEL_CHANGE_TIMEOUT_MS)
  }

  onTimeExpiration() {
    this._setEnemy(TIMEOUT_ENEMY_NAME, TIMEOUT_ENEMIES_COUNT)
  }

  complete = () => {
    this._isPauseAllowed = false

    hero.removeControl()
    hero.stopIntervals()
    stats.stopIntervals()
    stats.addScore(LEVEL_COMPLETE_SCORE_BASE * this.currentLevel + stats.timeLeft)
    Object.values(this.bombs).forEach((bomb) => bomb.stopIntervals())

    this.limitFrames?.stop()

    setTimeout(() => {
      if (Object.keys(levelList).length > this.currentLevel) {
        stats.addLife()
        this.goToNextLevel()
      } else {
        this._endGame(true)
      }
    }, LEVEL_CHANGE_TIMEOUT_MS)
  }

  removeControl() {
    this._controlFullscreen?.removeListeners()
    this._controlPause?.removeListeners()
  }

  pauseIntervals() {
    this._doorAttackTimeout?.pause()
  }

  resumeIntervals() {
    this._doorAttackTimeout?.resume()
  }
}

export const level = new Level()
