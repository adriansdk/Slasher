import Phaser from "phaser";
import gameScene from "./scenes/gameScene"
import stats from "./scenes/statsScene"
import menuScene from "./scenes/menuScene"
import currentEnemy from "./scenes/currentEnemy"

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },
  scene: [ gameScene, stats, currentEnemy ]
};

var game = new Phaser.Game(config);
