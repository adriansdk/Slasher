var cursors;
var direction;
var distance;
var rect;
var graphics

var enemies;
var fighting;

var currentEnemy;

var map;

var topLayer;
var riverLayer;
var objectsLayer;

var Zombie = function (index, x, y, game) {
    this.enemy = game.add.sprite(x, y, 'zombie')
    this.enemy.name = index.toString()
    this.enemy.body.setImmovable()
    this.enemy.body.setCollideWorldBounds(true)
    this.enemy.body.setSize(36, 40).setOffset(0, 27)
    this.enemy.setScale(0.5)
    game.add.collider(this.enemy, this.player, topLayer, riverLayer, objectsLayer)
}


var Skeleton = function (index, x, y, game) {
    this.enemy = game.add.sprite(x, y, 'skeleton')
    this.enemy.name = index.toString()
    this.enemy.body.setImmovable()
    this.enemy.body.setCollideWorldBounds(true)
    this.enemy.body.setSize(32, 50).setOffset(0, 14)
    this.enemy.setScale(0.5)
    game.add.collider(this.enemy, this.player, topLayer, riverLayer, objectsLayer)
}

var Player = {
    name: 'Adrian',
    hp: 100,
    exp: 0,
    expToLevel: 100,
    gold: 0,
    damage: 5,
}

var enemiesStats = {
    zombie: {
        name: 'Zombie',
        hp: 50,
        damage: 4,
        exp: 12,
        gold: 3,
        fighting: false,
        alive: true,
    },
}

import { cst } from "../cst"
import sky from "../assets/images/sky.png";
import dude from "../assets/images/player.png";
import zombieAsset from "../assets/images/zombie.png";
import skeletonAsset from "../assets/images/skeleton.png";
import tilesPack1 from "../assets/map/atlas.png";
import tilesPack2 from "../assets/map/rpgAtlas.png";
import tilesPack3 from "../assets/map/roguelike.png";
import { GameObjects } from "phaser";

export default class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: cst.scenes.game });
        this.player;
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
        map = this.add.tilemap('myMap')
        var tiles = map.addTilesetImage('atlas', 'tiles');
        var tiles2 = map.addTilesetImage('rpgAtlas', 'tiles2');
        var tiles3 = map.addTilesetImage('roguelike', 'tiles3');
        var bottomLayer = map.createStaticLayer("Bottom", [tiles, tiles2, tiles3], 0, 0);
        riverLayer = map.createStaticLayer("River", [tiles, tiles, tiles3], 0, 0);
        topLayer = map.createStaticLayer("Top", [tiles, tiles2, tiles3], 0, 0);
        objectsLayer = map.createStaticLayer("Objects", [tiles, tiles2, tiles3], 0, 0).setDepth(1)
        

        riverLayer.setCollisionByProperty({ collide: true })
        topLayer.setCollisionByProperty({ collide: true })
        objectsLayer.setCollisionByProperty({ collide: true })

        //PLAYER
        this.player = this.physics.add.sprite(665, 205, 'dude');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.55)
        this.player.body.setSize(44, 70).setOffset(18, 12)

        fighting = false
        direction = 'south'

        // NPCS
        enemies = []
        this.createSkeleton();
        this.createZombies();
        console.log(enemies)

        // FIND CURRENT CLOSEST ENEMY
        this.currentEnemy();


        // EVENTS 
        this.timeEvent = this.time.addEvent({
            delay: 2000,
            callback: this.moveEnemies,
            loop: -1,
            callbackScope: this
        });


        //COLLIDERS 
        this.addColliders()
        this.physics.add.collider(this.player, riverLayer)
        this.physics.add.collider(this.player, topLayer)
        this.physics.add.collider(this.player, objectsLayer)

        

        //CAMERA
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.2);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

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


    createSkeleton() {
        if (enemies.length < 8) {
            for (var p = 0; p < 8; p++) {
                var randomX = Math.floor(Math.random() * (550 - 20)) + 20
                var randomY = Math.floor(Math.random() * (750 - 500)) + 500
                enemies.push(new Skeleton(p, randomX, randomY, this.physics))
            }
        }
    }


    createZombies() {
        if (enemies.length < 12) {
            for (var p = 0; p < 6; p++) {
                var randomX = Math.floor(Math.random() * (550 - 20)) + 20
                var randomY = Math.floor(Math.random() * (750 - 500)) + 500
                enemies.push(new Zombie(p, randomX, randomY, this.physics))
            }
        }
    }


    moveEnemies() {
        if (enemiesStats.zombie.fighting == false) { // FIX
            for (var i = 0; i < enemies.length; i++) {
                let randNumber = Math.floor(Math.random() * Math.floor(4));
                switch (randNumber) {
                    case 0:
                        enemies[i].enemy.setVelocityX(25);
                        break;
                    case 1:
                        enemies[i].enemy.setVelocityX(-25);
                        break;
                    case 2:
                        enemies[i].enemy.setVelocityY(25);
                        break;
                    case 3:
                        enemies[i].enemy.setVelocityY(-25);
                        break;
                    default:
                        enemies[i].enemy.setVelocityX(30);
                }
            }
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    for (var o = 0; o < enemies.length; o++) {
                        enemies[o].enemy.setVelocity(0);
                    }
                },
                callbackScope: this
            });
        }
    }
    addColliders(){
        for(var i = 0; i<enemies.length; i++){
            this.physics.add.collider(enemies[i].enemy, riverLayer)
            this.physics.add.collider(enemies[i].enemy, objectsLayer)
            this.physics.add.collider(enemies[i].enemy, topLayer)
            this.physics.add.collider(enemies[i].enemy, this.player)
        }
    }

    updateData() {
        this.player.setData('name', Player.name)
        this.player.setData('health', `${Player.hp}`)
        this.player.setData('exp', `${Player.exp}`)
        this.player.setData('expToLevel', `${Player.expToLevel}`)
        this.player.setData('gold', `${Player.gold}`)
        // ENEMIES DATA
        // this.zombie.setData('name', enemiesStats.zombie.name)
        // this.zombie.setData('health', `${enemiesStats.zombie.hp}`)
        // this.zombie.setData('damage', `${enemiesStats.zombie.damage}`)
        // this.zombie.setData('exp', `${enemiesStats.zombie.exp}`)
        // this.zombie.setData('gold', `${enemiesStats.zombie.gold}`)
    }

    moveCharacter() {
        if (cursors.left.isDown) {
            this.player.anims.play('left', true);
            this.player.setVelocityX(-80);
            direction = 'west'
            if (cursors.shift.isDown) {
                this.player.setVelocityX(-150);
            }
        } else if (cursors.right.isDown) {
            this.player.anims.play('right', true);
            this.player.setVelocityX(80);
            direction = 'east'
            if (cursors.shift.isDown) {
                this.player.setVelocityX(150);
            }
        } else if (cursors.up.isDown) {
            this.player.anims.play('up', true);
            this.player.setVelocityY(-80);
            direction = 'north'
            if (cursors.shift.isDown) {
                this.player.setVelocityY(-150);
            }
        } else if (cursors.down.isDown) {
            this.player.anims.play('down', true);
            this.player.setVelocityY(80);
            direction = 'south'
            if (cursors.shift.isDown) {
                this.player.setVelocityY(150);
            }
        } else if (cursors.space.isUp) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if (direction == 'north') {
                this.player.anims.play('stoppedUp', true);
            } else if (direction == 'south') {
                this.player.anims.play('stoppedDown', true)
            } else if (direction == 'east') {
                this.player.anims.play('stoppedRight', true)
            } else if (direction == 'west') {
                this.player.anims.play('stoppedLeft', true)
            }
        }
    }

    currentEnemy() {
        
    }

    playerAttack() {
        if (cursors.space.isDown) {
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            if (direction == 'north') {
                this.player.anims.play('attackUp', true);
            } else if (direction == 'south') {
                this.player.anims.play('attackDown', true)
            } else if (direction == 'west') {
                this.player.anims.play('attackLeft', true)
            } else if (direction == 'east') {
                this.player.anims.play('attackRight', true)
            }
        }

        // if (cursors.space.isDown) {
        //     this.player.setVelocityY(0);
        //     this.player.setVelocityX(0);
        //     if (direction == 'north' && cursors.space.isDown) {
        //         this.player.anims.play('attackUp', true);
        //         if (enemies < this.player.y && distance < 45) {
        //             enemiesStats.zombie.hp -= Player.damage
        //             enemiesStats.zombie.fighting = true
        //         }
        //     } else if (direction == 'south') {
        //         this.player.anims.play('attackDown', true)
        //         if (this.zombie.y > this.player.y && distance < 30) {
        //             enemiesStats.zombie.hp -= Player.damage
        //             enemiesStats.zombie.fighting = true
        //         }
        //     } else if (direction == 'east') {
        //         this.player.anims.play('attackRight', true)
        //         if (this.zombie.x > this.player.x && distance < 30) {
        //             enemiesStats.zombie.hp -= Player.damage
        //             enemiesStats.zombie.fighting = true
        //         }
        //     } else if (direction == 'west') {
        //         this.player.anims.play('attackLeft', true)
        //         if (this.zombie.x < this.player.x && distance < 30) {
        //             enemiesStats.zombie.hp -= Player.damage
        //             enemiesStats.zombie.fighting = true
        //         }
        //     }
        // }
    }

    update() {

        //FUNCTIONS RUNNING AT ALL TIMES
        this.updateData();
        this.moveCharacter();
        this.playerAttack();
        // STARTING UI SCENES
        this.scene.launch('statsScene', this.player)
        this.scene.launch('currentEnemy', { enemy: currentEnemy, isFighting: fighting })

        // distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.zombie.x, this.zombie.y)
        //CHECK IF COLLIDING WITH MOBS        
    }
}


