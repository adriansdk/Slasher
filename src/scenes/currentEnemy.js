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


    this.add.text(730, 230, "" + this.zombie.data.get('name'), { font: '20px Roboto', fill: '#fff' });
    this.add.text(730, 270, 'Health: ' + this.zombie.data.get('health'), { font: '16px Roboto', fill: '#fff' });
    this.add.text(730, 290, 'Damage: ' + this.zombie.data.get('damage'), { font: '16px Roboto', fill: '#fff' });
    this.add.text(730, 310, 'EXP: ' + this.zombie.data.get('exp'), { font: '16px Roboto', fill: '#fff' });
    this.add.text(730, 330, 'Gold ' + this.zombie.data.get('gold'), { font: '16px Roboto', fill: '#fff' });
        
    }
    update() {

    }
}

export default currentEnemy