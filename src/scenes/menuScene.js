import logo from "../assets/images/logo.png";
import background from "../assets/images/background.png";

var animation;

class menuScene extends Phaser.Scene { 
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        this.load.image('logo', logo);
        this.load.spritesheet('background', background, { frameWidth: 1177, frameHeight: 784 });
    }

    create() {
        this.createAnims.call(this);

        var anims = ["background", "background2"];

        var onAnimationcomplete = function (anim) {
            console.log("animationcomplete", anim.key);
            var next = anims.shift();
            if (next) {
                this.play(next);
            } else {
                this.off("animationcomplete", onAnimationcomplete);
            }
        };

        this.add.sprite(450, 300, "background").setScale(0.78)
            .play(anims.shift())
            .on("animationcomplete", onAnimationcomplete);
        // animation = this.add.sprite(450, 300, 'background').play('background').setScale(0.78);
        // animation.animationcomplete(chain('background2'))
        this.add.image(450, 230, 'logo').setScale(0.2);   
    }

    createAnims() {
        this.anims.create({
            key: 'background',
            frames: this.anims.generateFrameNumbers('background', { start: 1, end: 46 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'background2',
            frames: this.anims.generateFrameNumbers('background', { start: 43, end: 45 }),
            frameRate: 7,
            repeat: -1,
            forward: false,
        });
    }


    update() {

    }
}

export default menuScene