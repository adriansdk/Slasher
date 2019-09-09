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
        this.add.text(730, 30, "" + this.enemy.getData('name'), { font: '25px Courier', fill: '#fff' });
        this.add.text(730, 70, 'Health: ' + this.enemy.getData('hp'), { font: '18px Courier', fill: '#fff' });
        this.add.text(730, 90, 'Damage: ' + this.enemy.getData('damage'), { font: '18px Courier', fill: '#fff' });
        this.add.text(730, 110, 'EXP: ' + this.enemy.getData('exp'), { font: '18px Courier', fill: '#fff' });
        this.add.text(730, 130, 'Gold ' + this.enemy.getData('gold'), { font: '18px Courier', fill: '#fff' });
    } else if(this.isFighting == false){
        this.add.text(730, 30, "Not Fighting", { font: '20px Courier', fill: '#fff' });
    }
        
    }
    update() {

    }
}

export default currentEnemy