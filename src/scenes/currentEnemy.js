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

    if (this.zombie.hp > 0){
        this.add.text(730, 230, "" + this.zombie.name, { font: '20px Roboto', fill: '#fff' });
        this.add.text(730, 270, 'Health: ' + this.zombie.hp, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 290, 'Damage: ' + this.zombie.damage, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 310, 'EXP: ' + this.zombie.exp, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 330, 'Gold ' + this.zombie.gold, { font: '16px Roboto', fill: '#fff' });
    } else {
        this.add.text(730, 230, "Not Fighting", { font: '20px Roboto', fill: '#fff' });
    }
        
    }
    update() {

    }
}

export default currentEnemy