import Controls from '../controls/controls'
import PlayerSpine from './playerSpine'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private _dead: boolean = false
  private _halt: boolean = false
  private _jumpSound: typeof Phaser.Sound
  playerSpine: PlayerSpine

  constructor(scene: Phaser.Scene, player: TilesConfig, mapSize: MapSize, level: number) {
    super(scene, player.x, player.y, player.texture)
    // this._jumpSound = this.scene.sound.add('jump')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.scene = scene

    // scene.anims.create({
    //   key: 'walk',
    //   frames: scene.anims.generateFrameNames('player'),
    //   frameRate: 8,
    //   repeat: -1
    // })
    // this.play('walk')

    this.setVisible(false)

    this.setOrigin(0, 1)
    this.setDragX(1500)
    this.body.setSize(70, 132)
    this.body.setOffset(25, 24)

    this.playerSpine = new PlayerSpine(scene, this.body.center.x, this.body.bottom)
    this.playerSpine.setSkin('blue')
  }

  kill() {
    this._dead = true
    // animate the camera if the player dies
    this.scene.scene.restart()
  }

  killEnemy() {
    this.playerSpine.spine.customParams.isKilling = true
    this.setVelocityY(-600)
  }

  halt() {
    this.body.enable = false
    this._halt = true
  }

  update(cursors: any, controls: Controls) {
    if (this._halt || this._dead) return

    // controls left & right
    if (cursors.left.isDown || controls.leftIsDown) {
      this.setVelocityX(-500)
      this.setFlipX(true)
    } else if (cursors.right.isDown || controls.rightIsDown) {
      this.setVelocityX(550)
      this.setFlipX(false)
    }
    // controls up
    if ((cursors.up.isDown || cursors.space.isDown || controls.upIsDown) && this.body.blocked.down) {
      const sound = this.scene.sound.add('jump')
      sound.play()
      this.setVelocityY(-1250)
    }

    // update spine animation
    this.playerSpine.update(this)
  }
}
