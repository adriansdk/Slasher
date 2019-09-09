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


    this.add.text(30, 30, "" + this.player.data.get('name'), { font: '24px Roboto', fill: '#000' });
    this.add.text(30, 70, 'Health: ' + this.player.data .get('health'), { font: '20px Roboto', fill: '#000' });
    this.add.text(30, 90, 'EXP: ' + this.player.data.get('exp') + '/' + this.player.data.get('expToLevel'), { font: '20px Roboto', fill: '#000' });
    this.add.text(30, 110, 'Gold ' + this.player.data.get('gold'), { font: '20px Roboto', fill: '#000' });
    
    }
    update() {

    }
}

export default statsScene