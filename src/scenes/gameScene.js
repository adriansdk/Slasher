var cursors;
var direction;
var damageTaken;

var Player = {
    name: 'Adrian',
    hp: 100,
    exp: 0,
    expToLevel: 100,
    gold: 0,
}

import { cst } from "../cst"
import sky from "../assets/images/sky.png";
import dude from "../assets/images/player.png";
import zombieAsset from "../assets/images/zombie.png";
import skeletonAsset from "../assets/images/skeleton.png";
import tilesPack1 from "../assets/map/atlas.png";
import tilesPack2 from "../assets/map/rpgAtlas.png";
import tilesPack3 from "../assets/map/roguelike.png";

export default class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: cst.scenes.game });
        this.player;
        this.zombie;
    }

    preload() {
        this.load.image('sky', sky);
        this.load.spritesheet('dude', dude, { frameWidth: 84, frameHeight: 84 });
        this.load.spritesheet('zombie', zombieAsset, { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('skeleton', skeletonAsset, { frameWidth: 32, frameHeight: 64 });
        this.load.image('tiles', tilesPack1);
        this.load.image('tiles2', tilesPack2);
        this.load.image('tiles3', tilesPack3);
        this.load.tilemapTiledJSON('myMap', 'src/assets/map/map.json');
    }

    create() {
        // MAP
        var map = this.add.tilemap('myMap')
        var tiles = map.addTilesetImage('atlas', 'tiles');
        var tiles2 = map.addTilesetImage('rpgAtlas', 'tiles2');
        var tiles3 = map.addTilesetImage('roguelike', 'tiles3');
        var bottomLayer = map.createStaticLayer("Bottom", [tiles, tiles2, tiles3], 0, 0);
        var riverLayer = map.createStaticLayer("River", [tiles, tiles, tiles3], 0, 0);
        var topLayer = map.createStaticLayer("Top", [tiles, tiles2, tiles3], 0, 0);
        var objectsLayer = map.createStaticLayer("Objects", [tiles, tiles2, tiles3], 0, 0).setDepth(1)

        riverLayer.setCollisionByProperty({ collide: true })
        topLayer.setCollisionByProperty({ collide: true })
        objectsLayer.setCollisionByProperty({ collide: true })

        //PLAYER
        this.player = this.physics.add.sprite(665, 205, 'dude');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.55)
        this.player.body.setSize(44, 70).setOffset(18, 12)

        this.physics.add.collider(this.player, riverLayer)
        this.physics.add.collider(this.player, topLayer)
        this.physics.add.collider(this.player, objectsLayer)
        // console.log(this.player)

        // NPCS
        this.zombie = this.physics.add.sprite(200, 500, 'zombie').setScale(0.6);
        this.zombie.setCollideWorldBounds(true);

        this.zombie.setData('name', 'Zombie')
        this.zombie.setData('health', 50)
        this.zombie.setData('xp', 10)
        this.zombie.setData('gold', 3)
        
        damageTaken = 10


        // skeleton = this.physics.add.sprite(250, 300, 'skeleton').setScale(0.6);
        // skeleton.setCollideWorldBounds(true);

        //CAMERA

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.2);
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
    takeDamage() {
        Player.hp = Player.hp - damageTaken
        console.log(Player.hp)
    }
    update() {

        // STARTING OTHER SCENES AND PASSING DATA TO THEM

        this.player.setData('name', Player.name)
        this.player.setData('health', `${Player.hp}`)
        this.player.setData('xp', `${Player.exp}`)
        this.player.setData('xp', `${Player.expToLevel}`)
        this.player.setData('gold', `${Player.gold}`)

        this.scene.launch('statsScene', this.player)
        this.scene.launch('currentEnemy', this.zombie)

        // MOVEMENT 
        

        if (cursors.left.isDown) {
            console.log('left')
            this.player.setVelocityX(-80);
            if (cursors.shift.isDown) {
                this.player.setVelocityX(-150);
            }
            this.player.anims.play('left', true);
            direction = 'west'
        }
        else if (cursors.right.isDown) {
            console.log('right')
            this.player.setVelocityX(80);
            if (cursors.shift.isDown) {
                this.player.setVelocityX(150);
            }
            this.player.anims.play('right', true);
            direction = 'east'
        }
        else if (cursors.up.isDown) {
            console.log('up')
            this.player.setVelocityY(-80);
            if (cursors.shift.isDown) {
                this.player.setVelocityY(-150);
            }
            this.player.anims.play('up', true);
            direction = 'north'
        }
        else if (cursors.down.isDown) {
            console.log('down')
            this.player.setVelocityY(80);
            if (cursors.shift.isDown) {
                this.player.setVelocityY(150);
            }
            this.player.anims.play('down', true);
            direction = 'south'
        }
        else if (cursors.space.isDown) {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            if (direction == 'north') {
                this.player.anims.play('attackUp', true);
            } else if (direction == 'south') {
                this.player.anims.play('attackDown', true)
            } else if (direction == 'east') {
                this.player.anims.play('attackRight', true)
            } else if (direction == 'west') {
                this.player.anims.play('attackLeft', true)
            }
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if (direction == 'north') {
                this.player.anims.play('stoppedUp', true);
                // this.player.body.setSize(54, 76).setOffset(14, 6)
            } else if (direction == 'south') {
                this.player.anims.play('stoppedDown', true)
                // this.player.body.setSize(54, 76).setOffset(14, 6)
            } else if (direction == 'east') {
                this.player.anims.play('stoppedRight', true)
                // this.player.body.setSize(54, 76).setOffset(14, 6)
            } else if (direction == 'west') {
                this.player.anims.play('stoppedLeft', true)
                // this.player.body.setSize(54, 76).setOffset(14, 6)
            }
        }
    }
}


