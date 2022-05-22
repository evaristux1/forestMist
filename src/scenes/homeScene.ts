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
import ButtonPlay from '../components/buttons/playButton'
import Button from '../components/buttons/playButton'
const ButtonUp = 'button_up'
const ButtonDown = 'button_down'
const Gem = 'gem'

const Orange = 0xffad00
const LightOrange = 0xffcd60

export default class HomeScene extends Phaser.Scene {
  tilesGroup: TilesGroup
  cursors: Phaser.Input.Keyboard.CursorKeys
  background: Background
  enemiesGroup: EnemiesGroup
  controls: Controls
  goal: GoalSprite
  level: number
  constructor() {
    super({
      key: 'HomeScene',
    })
  }

  init(props: { level?: number }) {
    const { level = 0 } = props
    this.level = Map.calcCurrentLevel(level)
  }

  create() {
    const map = new Map(this.level)

    this.cameras.main.setBackgroundColor('#ade6ff')
    this.cameras.main.fadeIn()

    this.cameras.main.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
    this.physics.world.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)

    this.input.addPointer(1)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.background = new Background(this)
    this.tilesGroup = new TilesGroup(
      this,
      map.info.filter((el: TilesConfig) => el.type === 'tile')
    )
    this.goal = new GoalSprite(this, map.info.filter((el: TilesConfig) => el.type === 'goal')[0])
    this.enemiesGroup = new EnemiesGroup(this, map.info)

    this.controls = new Controls(this)

    this.physics.add.collider(this.tilesGroup, this.enemiesGroup)
    // @ts-ignore

    // remove the loading screen
    let loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.add('transparent')
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          // @ts-ignore
          loadingScreen.remove()
        },
      })
    }

    // the resize function
    const resize = () => {
      this.controls.adjustPositions()

      this.background.adjustPosition()
    }

    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width || 1080
      this.cameras.main.height = gameSize.height || 720
      //this.cameras.resize(gameSize.width, gameSize.height)
      resize()
    })
    const logo = this.add.image(750, 200, 'saturno')
    const playButton = this.add.image(750, 550, 'green-button')
    playButton.setInteractive({ cursor: 'pointer' })
    logo.scaleX = 0.4
    logo.scaleY = 0.4
    playButton.scaleX = 0.8
    playButton.scaleY = 0.6
    playButton.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('MainScene')
    })
    const infoImg = this.add.image(this.cameras.main.width - 50, this.cameras.main.height - 60, 'question')
    infoImg.scaleX = 0.4
    infoImg.scaleY = 0.4
    infoImg.setInteractive({ cursor: 'pointer' })
    infoImg.on('pointerdown', () => {
      
      this.scene.start('Info')
    })

    resize()
  }

  update() {
    this.controls.update()
    this.enemiesGroup.update()
  }
}
