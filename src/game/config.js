import * as PIXI from "pixi.js";

let config = {
    levelUpSpeedDiff: 2.5,
    levelUpCoolDown: 30000,
    screenConfig: {
        width: 360,
        height: 780
        //Styles for game screen in style.css -> .game-screen
    },
    spaceshipConfig: {
        idle: PIXI.Texture.from("assets/spaceship.png"),
        explode: PIXI.Texture.from("assets/explosion.png"),
        scale: 0.15,
        bulletSpeed: 10,
        bulletWidth: 5,
        bulletHeight: 10,
        shootingCoolDown: 1000
    },
    asteroidConfig: {
        idle: PIXI.Texture.from("assets/asteroid.png"),
        explode: PIXI.Texture.from("assets/explosion.png"),
        scale: 0.15,
        asteroidSpeed: 5,
        asteroidCoolDown: 500,
    }
}

export default config;