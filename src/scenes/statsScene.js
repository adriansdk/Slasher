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
    var text = this.add.text(350, 250, '', { font: '16px font1', fill: '#00ff00' });

    text.setText([
        'Name: ' + this.player.data.get('name'),
        'Health: ' + this.player.data.get('health'),
        'Xp: ' + this.player.data.get('xp') + ' gold',
        'Gold ' + this.player.data.get('gold')
    ]);
    }
    update() {

    }
}

export default statsScene