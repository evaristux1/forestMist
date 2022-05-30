export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene',
    })
  }

  preload() {
    const images = [
      'tile-left',
      'tile-middle',
      'tile-right',
      'tile-single',
      'controls',
      'background',
      'goal',
      'saturno',
      'bg-universe',
      'green-button',
      'question',
      'bg-person',
      'arrow-left',
      'home',
      'game-over',
    ]
    images.forEach((img) => {
      this.load.image(img, `assets/img/${img}.png`)
    })
    this.load.spritesheet('player', 'assets/img/player.png', { frameHeight: 165, frameWidth: 120 })
    this.load.spritesheet('coin', 'assets/img/coin.png', { frameHeight: 42, frameWidth: 42 })
    this.load.spritesheet('bee', 'assets/img/bee.png', { frameHeight: 100, frameWidth: 128 })
    this.load.spritesheet('slime', 'assets/img/slime.png', { frameHeight: 68, frameWidth: 112 })
    this.load.audio('jump', 'assets/audio/jump.mp3')
    this.load.audio('colectCoin', 'assets/audio/colectCoin.wav')
    this.load.audio('bgsound', 'assets/audio/musicGame.mp3')
    this.load.audio('dead', 'assets/audio/dead.mp3')
    this.load.audio('openDoor', 'assets/audio/openDoor.mp3')
    this.load.audio('gameOver', 'assets/audio/gameOver.wav')

    this.load.setPath('assets/spine')

    // @ts-ignore
    this.load.spine('boy', 'boy.json', 'boy.atlas')
  }

  create() {
    this.scene.start('HomeScene')
  }
}
