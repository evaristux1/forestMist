import Background from '../components/background'
import { Map } from '../components/map'

export default class GameOver extends Phaser.Scene {
  level: number
  points: number
  constructor() {
    super('GameOver')
  }
  init(props: { level?: number; points?: number }) {
    const { level = 0, points = 0 } = props
    this.level = level
    this.points = points
  }
  preload() {}

  create() {
    const map = new Map(0)

    this.cameras.main.setBackgroundColor('#1b3446')
    this.cameras.main.fadeIn()

    this.cameras.main.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
    this.physics.world.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)

    // the resize function
    let image = this.add.image(80, 0, 'game-over').setOrigin(0, 0)
    image.setScale(0.5)
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const screenCenterY = this.cameras.main.worldView.y + 75 + this.cameras.main.height / 2
    const loadingText = this.add
      .text(screenCenterX, screenCenterY, `${this.points}`, {
        color: '#111',
        fontSize: '40px',
        fontWeight: 'bold',
        letterSpacing: ' -1px',
        lineheight: 1,
        textAlign: 'center',
      })
      .setOrigin(0.5)
    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width || 1080
      this.cameras.main.height = gameSize.height || 720
      //this.cameras.resize(gameSize.width, gameSize.height)
    })
    const infoImg = this.add.image(this.cameras.main.width - 50, this.cameras.main.height - 60, 'home')
    infoImg.scaleX = 0.2
    infoImg.scaleY = 0.2
    infoImg.setInteractive({ cursor: 'pointer' })
    infoImg.on('pointerdown', () => {
      this.scene.start('HomeScene')
    })
  }
}
