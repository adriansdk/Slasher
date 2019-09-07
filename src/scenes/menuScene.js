import logo from "../assets/images/logo.png";
import background from "../assets/images/background.png";
// import font1 from '../assets/images/font.TTF';

var animation;
var button;
var startButton;

class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" });
    }

    preload() {
        this.load.image('logo', logo);
        // this.load.text('myFont', myFont)
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
        this.add.sprite(450, 300, "background").setScale(0.78).play(anims.shift()).on("animationcomplete", onAnimationcomplete);
        this.add.image(450, 230, 'logo').setScale(0.2);
        let startButton = this.add.text(410, 500, "Start", {
            fontFamily: "font1",
            fontSize: 45
        });
        startButton.alpha = 0.5;
        startButton.setInteractive().on("pointerover", () => {
            document.body.style.cursor = "pointer";
            startButton.alpha = 1;
        }).on("pointerout", () => {
            document.body.style.cursor = "auto";
            startButton.alpha = 0.5;
        }).on("pointerdown", () => {
            document.body.style.cursor = "auto";
            this.scene.start("gameScene");
        });

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