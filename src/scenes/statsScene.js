import gameScene from "./gameScene"


class statsScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'statsScene'});
    }

    preload() {

    }

    create() {
       console.log(Phaser.Scene)
       console.log(this.player)
    }
    update() {

    }
}

export default statsScene