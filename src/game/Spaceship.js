import * as PIXI from "pixi.js";

export default class {
    constructor(config, app) {
        this.idleTexture = config.idle;
        this.scale = config.scale;
        this.spaceship = new PIXI.Sprite(this.idleTexture);
        this.spaceship.anchor.set(0.5);
        this.spaceship.scale.set(this.scale);
        this.spaceship.position.set(app.screen.width/2, app.screen.height/2);
        this.deploy(app);

        this.bulletWidth = config.bulletWidth;
        this.bulletHeight = config.bulletHeight;
        this.bulletSpeed = config.bulletSpeed;
        this.bullets = [];

        this.shootingCoolDown = config.shootingCoolDown;

        setInterval(() => {
            this.shoot(app);
        }, this.shootingCoolDown);

        app.ticker.add(() => {
            this.bullets.forEach((e, i) => {
                if(e.position.y < 0) {
                    app.stage.removeChild(e);
                    this.bullets.splice(i, 1);
                }
            })
        });
    }

    deploy(app){
        app.stage.addChild(this.spaceship);
    }

    shoot(app){
        let bullet = new PIXI.Graphics();
        bullet.position.set(this.spaceship.position.x, this.spaceship.position.y);
        bullet.beginFill(0xff0000, 1);
        bullet.drawRect(0, 0 - this.spaceship.height/2, this.bulletWidth, this.bulletHeight);
        bullet.endFill();
        this.bullets.push(bullet);
        app.stage.addChild(bullet);
        app.ticker.add((delta) => {
            bullet.position.y -= this.bulletSpeed * delta;
        });
    }
}