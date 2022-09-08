import * as PIXI from "pixi.js";

export default class {
    constructor(config, app) {
        this.idleTexture = config.idle;
        this.scale = config.scale + Math.random() * (0.05 + 0.05) - 0.05;
        this.asteroidSpeed = config.asteroidSpeed;
        this.asteroid = new PIXI.Sprite(this.idleTexture);
        this.asteroid.anchor.set(0.5);
        this.asteroid.scale.set(this.scale);
        this.asteroid.position.x = app.screen.width * Math.random();
        this.asteroid.position.y = 0;
        app.ticker.add((delta) => {
            this.asteroid.position.y += this.asteroidSpeed * delta;
            this.asteroid.rotation += 0.1 * delta;
        });
        app.stage.addChild(this.asteroid);
    }
}