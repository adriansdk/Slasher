import { cst } from "../cst"


class currentEnemy extends Phaser.Scene {
    
    constructor() {
        super({ key: cst.scenes.enemyStats});
        this.zombie;
    }

    preload() {

    }
    init(data){
        this.zombie = data
    }
    create() {


    this.add.text(730, 230, "" + this.zombie.data.get('name'), { font: '20px font1', fill: '#0f0' });
    this.add.text(730, 270, 'Health: ' + this.zombie.data.get('health'), { font: '16px font1', fill: '#0f0' });
    this.add.text(730, 270, 'Damage: ' + this.zombie.data.get('damage'), { font: '16px font1', fill: '#0f0' });
    this.add.text(730, 290, 'EXP: ' + this.zombie.data.get('exp'), { font: '16px font1', fill: '#0f0' });
    this.add.text(730, 310, 'Gold ' + this.zombie.data.get('gold'), { font: '16px font1', fill: '#0f0' });
    
    }
    update() {

    }
}

export default currentEnemy