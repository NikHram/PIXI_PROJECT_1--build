import * as PIXI from "pixi.js";
import Spaceship from "./Spaceship";
import Asteroid from "./Asteroid";
import anime from "animejs";

export default class {
    constructor(config, container = document.body) {
        this.width = config.screenConfig.width;
        this.height = config.screenConfig.height;
        this.score = 0;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.app.view.classList.add("game-screen");
        this.displayApp(container);
        // app styles in style.css -> .game-screen

        this.spaceship = new Spaceship(config.spaceshipConfig, this.app);
        this.app.view.addEventListener("mousemove", (e) => {
            this.spaceship.spaceship.position.x = e.clientX - ((window.innerWidth/2) - (this.app.view.width/2));
            this.spaceship.spaceship.position.y = e.clientY - ((window.innerHeight/2) - (this.app.view.height/2));
        });

        this.explodeTexture = config.spaceshipConfig.explode;
        this.asteroids = [];
        this.asteroidCoolDown = config.asteroidConfig.asteroidCoolDown;
        setInterval(()=>{
            this.deployAsteroid(config.asteroidConfig, this.app);
        }, this.asteroidCoolDown);
        this.app.ticker.add(()=>{
            this.checkCollision(container);
            this.checkAsteroidDestruction();
        });

        setInterval(()=>{
            this.countScore();
        }, 1000);

        this.levelUpSpeedDiff = config.levelUpSpeedDiff;
        this.levelUpCoolDown = config.levelUpCoolDown;
        setInterval(()=>{
            config.asteroidConfig.asteroidSpeed += this.levelUpSpeedDiff;
        }, this.levelUpCoolDown);
    }

    displayApp(container){
        container.appendChild(this.app.view);
    }

    deployAsteroid(config, app){
        let asteroid = new Asteroid(config, app);
        this.asteroids.push(asteroid);
    }

    checkCollision(container){
        this.asteroids.forEach((e) => {
            if (e.asteroid.position.x > this.spaceship.spaceship.position.x - this.spaceship.spaceship.width/2 &&
                e.asteroid.position.x < this.spaceship.spaceship.position.x + this.spaceship.spaceship.width/2 &&
                e.asteroid.position.y > this.spaceship.spaceship.position.y - this.spaceship.spaceship.height/2 &&
                e.asteroid.position.y < this.spaceship.spaceship.position.y + this.spaceship.spaceship.height/2) {
                this.spaceship.spaceship.texture = this.explodeTexture;
                this.app.ticker.stop();
                this.showGameOverScreen(container);
            }
        })
    }

    checkAsteroidDestruction(){
        for (let i = 0; i < this.asteroids.length; i++){
            for (let j = 0; j < this.spaceship.bullets.length; j++) {
                if (this.spaceship.bullets[j].position.x > this.asteroids[i].asteroid.position.x - this.asteroids[i].asteroid.width/2 &&
                    this.spaceship.bullets[j].position.x < this.asteroids[i].asteroid.position.x + this.asteroids[i].asteroid.width/2 &&
                    this.spaceship.bullets[j].position.y > this.asteroids[i].asteroid.position.y - this.asteroids[i].asteroid.height/2 &&
                    this.spaceship.bullets[j].position.y < this.asteroids[i].asteroid.position.y + this.asteroids[i].asteroid.height/2) {
                    this.app.stage.removeChild(this.spaceship.bullets[j]);
                    this.app.stage.removeChild(this.asteroids[i].asteroid);
                    this.spaceship.bullets.splice(j, 1);
                    this.asteroids.splice(i, 1);
                }
            }
        }
    }

    countScore(){
        this.score++;
        document.querySelector("#score").innerHTML = this.score;
    }

    showGameOverScreen(container){
        let gameOverContainer = document.createElement("div");
        let gameOverSign = document.createElement("h2");
        let gameOverButton = document.createElement("button");
        let gameOverText = document.createElement("p")
        let gameOverScore = document.createElement("input");
        gameOverSign.innerHTML = "Game Over";
        gameOverButton.innerHTML = "RESTART";
        gameOverText.innerHTML = "You've managed to survive for"
        document.querySelector("#score").style.display = "none";
        gameOverContainer.classList.add("game-over-container");
        gameOverSign.classList.add("game-over-sign");
        gameOverButton.classList.add("game-over-button");
        gameOverScore.classList.add("game-over-score");
        gameOverText.classList.add("game-over-text");
        gameOverScore.disabled = true;
        container.appendChild(gameOverContainer);
        gameOverContainer.appendChild(gameOverSign);
        gameOverContainer.appendChild(gameOverText);
        gameOverContainer.appendChild(gameOverScore);
        gameOverContainer.appendChild(gameOverButton);
        gameOverButton.onclick = () => location.reload();
        anime({
            targets: gameOverContainer,
            top: "calc(50% - 312px)",
            easing: "linear",
            duration: 300
        });
        anime({
            targets: gameOverScore,
            value: [0, this.score],
            round: 1,
            easing: 'easeInOutExpo',
            duration: 2000
        });
    }
}