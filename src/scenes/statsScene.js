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


    this.add.text(730, 30, "" + this.player.data.get('name'), { font: '20px font1', fill: '#000' });
    this.add.text(730, 70, 'Health: ' + this.player.data.get('health'), { font: '16px font1', fill: '#000' });
    this.add.text(730, 90, 'Xp: ' + this.player.data.get('xp') + ' gold', { font: '16px font1', fill: '#000' });
    this.add.text(730, 110, 'Gold ' + this.player.data.get('gold'), { font: '16px font1', fill: '#000' });
    
    }
    update() {

    }
}

export default statsScene