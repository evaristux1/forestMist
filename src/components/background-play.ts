export default class BackgroundPlay extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 0, 0, 'bd-universe')
    scene.add.existing(this)

    this.setOrigin(0.5).setScrollFactor(0)
  }

  adjustPosition() {
    const imgHeight = 648
    this.setScale(this.scene.cameras.main.height / imgHeight)
    this.x = this.scene.cameras.main.centerX
    this.y = this.scene.cameras.main.centerY
    this.width = this.scene.cameras.main.width
  }

 
}
