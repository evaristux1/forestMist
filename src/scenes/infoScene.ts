import Background from '../components/background'
import { Map } from '../components/map'

export default class Info extends Phaser.Scene {
  constructor() {
    super('Info')
  }

  preload() {}

  create() {
    const map = new Map(0)

    this.cameras.main.setBackgroundColor('#1b3446')
    this.cameras.main.fadeIn()

    this.cameras.main.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
    this.physics.world.setBounds(map.size.x, map.size.y, map.size.width, map.size.height)

    // the resize function
    let image = this.add.image(80, 0, 'bg-universe').setOrigin(0, 0)
    image.setScale(0.5)

    this.scale.on('resize', (gameSize: any) => {
      this.cameras.main.width = gameSize.width || 1080
      this.cameras.main.height = gameSize.height || 720
      //this.cameras.resize(gameSize.width, gameSize.height)
    })
    const infoImg = this.add.image(this.cameras.main.width - 50, this.cameras.main.height - 60, 'arrow-left')
    infoImg.scaleX = 0.2
    infoImg.scaleY = 0.2
    infoImg.setInteractive({ cursor: 'pointer' })
    infoImg.on('pointerdown', () => {
      this.scene.start('InfoPerson')
    })
  }
}
