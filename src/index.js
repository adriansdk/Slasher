import Phaser from "phaser";
import gameScene from "./scenes/gameScene"
import stats from "./scenes/statsScene"
import menuScene from "./scenes/menuScene"

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: true
    }
  },
  scene: [ menuScene, gameScene, stats ]
};

var game = new Phaser.Game(config);
