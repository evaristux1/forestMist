export default class HomeScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'HomeScene',
    })
  }

  preload() {}

  create() {
    this.scene.start('MainScene')
  }
}
