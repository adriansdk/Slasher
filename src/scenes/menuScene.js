import logo from "../assets/images/logo.png";
import background from "../assets/images/background.png";


class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        this.load.image('logo', logo);
        this.load.spritesheet('background', background, { frameWidth: 1177, frameHeight: 784});
    }

    create() {
        this.anims.create({
            key: 'background',
            frames: this.anims.generateFrameNumbers('background', { start: 1, end: 46 }),
            frameRate: 10,
            repeat: 0
        });
        this.add.sprite(450, 300, 'background').play('background').setScale(0.78);
        this.add.image(450, 230, 'logo').setScale(0.2);


        
    }
    update() {
        
    }
}

export default menuScene