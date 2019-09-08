import { cst } from "../cst"


class statsScene extends Phaser.Scene {
    
    constructor() {
        super({ key: cst.scenes.stats});
        this.player;
    }

    preload() {

    }
    init(data){
        this.player = data
    }
    create() {


    this.add.text(730, 30, "" + this.player.data.get('name'), { font: '20px Roboto', fill: '#000' });
    this.add.text(730, 70, 'Health: ' + this.player.data.get('health'), { font: '16px Roboto', fill: '#000' });
    this.add.text(730, 90, 'EXP: ' + this.player.data.get('exp') + '/' + this.player.data.get('expToLevel'), { font: '16px Roboto', fill: '#000' });
    this.add.text(730, 110, 'Gold ' + this.player.data.get('gold'), { font: '16px Roboto', fill: '#000' });
    
    }
    update() {

    }
}

export default statsScene