import { Map } from '../components/map'
import TilesGroup from '../components/tiles/tilesGroup'
import Player from '../components/player/player'
import CoinGroup from '../components/coins/coinGroup'
import BeeSprite from '../components/enemies/bee'
import EnemiesGroup from '../components/enemies/enemiesGroup'
import GoalSprite from '../components/goalSprite'
import Controls from '../components/controls/controls'
import LevelText from '../components/levelText'
import Background from '../components/background'
import MiniMap from '../components/miniMap'
import PhaserVersionText from '../components/phaserVersionText'

export default class MainScene extends Phaser.Scene {
  player: Player
  tilesGroup: TilesGroup
  cursors: Phaser.Input.Keyboard.CursorKeys
  background: Background
  enemiesGroup: EnemiesGroup
  controls: Controls
  goal: GoalSprite
  level: number
  miniMap: MiniMap
  constructor() {
    super({
      key: 'HomeScene'
    })
  }

  init(props: { level?: number }) {
    const { level = 0 } = props
    this.level = Map.calcCurrentLevel(level)
  }

  create() {

    this.cameras.main.setBackgroundColor('#ade6ff')
    this.cameras.main.fadeIn()
    this.background = new Background(this)
    
  }
}
