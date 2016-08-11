export default class Game {
    constructor(obstacleOffset = 100) {
        this.state = 0;
            // 0 - game started
            // 1 - game running
            // 2 - game finish

        this.groundX = 0;
        this.groundSpeed = 5;
        this.obstacles = [];
        this.obstacleOffset = obstacleOffset;
        this.obstaclesInterval = null;
        this.scoreInterval = null;
        this.gameLevelInterval = null;
        this.score = 0;
        this.highscore = 0;
        this.obstacleRandomness = 12;
        this.obstacleRandomnessTime = 800;
    }

    _obstaclesGenerator(clear = true) {
        if (clear) this.obstacles = [];
        clearInterval(this.obstaclesInterval);

        this.obstaclesInterval = setInterval(() => {
            if (parseInt(Math.random() * this.obstacleRandomness) % 2)
                this.obstacles.push(this.obstacleOffset);
        }, this.obstacleRandomnessTime);
    }

    start() {
        this.state = 1;
        this.score = 0;
        this.groundSpeed = 5;
        this.obstacleRandomness = 12;
        this.obstacleRandomnessTime = 800;
        this._obstaclesGenerator();

        this.scoreInterval = setInterval(() => {
            this.score += 10;
            this.highscore = this.score > this.highscore ? this.score : this.highscore;
        }, 1000);

        this.gameLevelInterval = setInterval(() => {
            this.groundSpeed += 0.5;
            this.obstacleRandomness -= 0.5;
            this.obstacleRandomnessTime -= 50;
            if (this.obstacleRandomnessTime < 50) this.obstacleRandomnessTime = 50;
            if (this.obstacleRandomness < 2) this.obstacleRandomness = 2;
            this._obstaclesGenerator(false);
        }, 5500);
    }

    die() {
        this.state = 2;
        clearInterval(this.obstaclesInterval);
        clearInterval(this.scoreInterval); 
    }

    getObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.state === 1) this.obstacles[i] += -this.groundSpeed;
            if (this.obstacles[i] && this.obstacles[i] < -100) this.obstacles.splice(i, 1);
        }

        return this.obstacles;
    }
};
