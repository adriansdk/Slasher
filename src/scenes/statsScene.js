import { cst } from "../cst"


class statsScene extends Phaser.Scene {
    
    constructor() {
        super({ key: cst.scenes.stats});
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