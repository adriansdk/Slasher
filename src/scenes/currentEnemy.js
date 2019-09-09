import { cst } from "../cst"


class currentEnemy extends Phaser.Scene {
    
    constructor() {
        super({ key: cst.scenes.enemyStats});
        this.enemy;
        this.isFighting
    }

    preload() {

    }
    init(data){
        this.enemy = data.enemy
        this.isFighting = data.isFighting
    }

    create() {

    if (this.isFighting == true){
        this.add.text(730, 230, "" + this.enemy.name, { font: '20px Roboto', fill: '#fff' });
        this.add.text(730, 270, 'Health: ' + this.enemy.hp, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 290, 'Damage: ' + this.enemy.damage, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 310, 'EXP: ' + this.enemy.exp, { font: '16px Roboto', fill: '#fff' });
        this.add.text(730, 330, 'Gold ' + this.enemy.gold, { font: '16px Roboto', fill: '#fff' });
    } else if(this.isFighting == false){
        this.add.text(730, 230, "Not Fighting", { font: '20px Roboto', fill: '#fff' });
    }
        
    }
    update() {

    }
}

export default currentEnemy