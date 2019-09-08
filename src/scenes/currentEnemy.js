import { cst } from "../cst"


class currentEnemy extends Phaser.Scene {
    
    constructor() {
        super({ key: cst.scenes.enemyStats});
        this.player;
        this.zombie;
    }

    preload() {

    }
    init(data){
        this.player = data
    }
    create() {


    this.add.text(730, 230, "" + this.player.data.get('name'), { font: '20px font1', fill: '#0f0' });
    this.add.text(730, 270, 'Health: ' + this.player.data.get('health'), { font: '16px font1', fill: '#0f0' });
    this.add.text(730, 290, 'Xp: ' + this.player.data.get('xp') + ' gold', { font: '16px font1', fill: '#0f0' });
    this.add.text(730, 310, 'Gold ' + this.player.data.get('gold'), { font: '16px font1', fill: '#0f0' });
    
    }
    update() {

    }
}

export default currentEnemy