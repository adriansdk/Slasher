import Phaser from "phaser";
import sky from "./assets/sky.png";
import dude from "./assets/player.png";
import zombieAsset from "./assets/monsters.png";
import skeletonAsset from "./assets/skeleton.png";
import tilesAtlas from "./assets/map/atlas.png";




var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var direction;
var zombie;
var skeleton;


function preload() {
  this.load.image('sky', sky);
  this.load.spritesheet('dude', dude, { frameWidth: 84, frameHeight: 84 });
  this.load.spritesheet('zombie', zombieAsset, { frameWidth: 32, frameHeight: 64 });
  this.load.spritesheet('skeleton', skeletonAsset, { frameWidth: 32, frameHeight: 64 });
  this.load.image('tiles', tilesAtlas);
  this.load.tilemapTiledJSON('myMap', 'src/assets/map/map.json');
}

function create() {

  // MAP
  var map = this.add.tilemap('myMap')
  var tiles = map.addTilesetImage('atlas', 'tiles');
  var bottomLayer = map.createStaticLayer("Bottom", tiles, 0, 0);
  var riverLayer = map.createStaticLayer("River", tiles, 0, 0);
  var topLayer = map.createStaticLayer("Top", tiles, 0, 0);
  var objectsLayer = map.createStaticLayer("Objects", tiles, 0, 0);

  riverLayer.setCollisionByProperty({ collide: true })
  topLayer.setCollisionByProperty({ collide: true })
  objectsLayer.setCollisionByProperty({ collide: true })

  //PLAYER
  player = this.physics.add.sprite(100, 500, 'dude');
  player.setCollideWorldBounds(true);
  player.setScale(0.5)

  this.physics.add.collider(player, riverLayer)
  this.physics.add.collider(player, topLayer)
  this.physics.add.collider(player, objectsLayer)

  // NPCS
  zombie = this.physics.add.sprite(200, 300, 'zombie');
  zombie.setCollideWorldBounds(true);
  skeleton = this.physics.add.sprite(250, 300, 'skeleton');
  skeleton.setCollideWorldBounds(true);

  //CAMERA

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(2.5);
  this.physics.world.setBounds(0, 0)

  //ANIMATIONS

  this.anims.create({
    key: 'stoppedDown',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'stoppedUp',
    frames: [{ key: "dude", frame: 29 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'stoppedLeft',
    frames: [{ key: "dude", frame: 35 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'stoppedRight',
    frames: [{ key: "dude", frame: 32 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 20, end: 24 }),
    frameRate: 10,
    repeat: -1
  });


  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 15, end: 19 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 13 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attackUp',
    frames: this.anims.generateFrameNumbers('dude', { start: 29, end: 31 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attackDown',
    frames: this.anims.generateFrameNumbers('dude', { start: 26, end: 28 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attackLeft',
    frames: this.anims.generateFrameNumbers('dude', { start: 35, end: 37 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'attackRight',
    frames: this.anims.generateFrameNumbers('dude', { start: 32, end: 34 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {

  // MOVEMENT 
  
  if (cursors.left.isDown) {
    player.setVelocityX(-80);
    if (cursors.shift.isDown) {
      player.setVelocityX(-150);
    }
    player.anims.play('left', true);
    direction = 'west'
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(80);
    if (cursors.shift.isDown) {
      player.setVelocityX(150);
    }
    player.anims.play('right', true);
    direction = 'east'
  }
  else if (cursors.up.isDown) {
    player.setVelocityY(-80);
    if (cursors.shift.isDown) {
      player.setVelocityY(-150);
    }
    player.anims.play('up', true);
    direction = 'north'
  }
  else if (cursors.down.isDown) {
    player.setVelocityY(80);
    if (cursors.shift.isDown) {
      player.setVelocityY(150);
    }
    player.anims.play('down', true);
    direction = 'south'
  }
  else if (cursors.space.isDown) {
    player.setVelocityY(0);
    player.setVelocityX(0);
    if (direction == 'north') {
      player.anims.play('attackUp', true);
    } else if (direction == 'south') {
      player.anims.play('attackDown', true)
    } else if (direction == 'east') {
      player.anims.play('attackRight', true)
    } else if (direction == 'west') {
      player.anims.play('attackLeft', true)
    }
  }

  else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    if (direction == 'north') {
      player.anims.play('stoppedUp', true);
    } else if (direction == 'south') {
      player.anims.play('stoppedDown', true)
    } else if (direction == 'east') {
      player.anims.play('stoppedRight', true)
    } else if (direction == 'west') {
      player.anims.play('stoppedLeft', true)
    }
  };

}
