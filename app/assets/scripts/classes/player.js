import BezierEasing from 'bezier-easing';
const jumpUpEasing = BezierEasing(.23, .75, .45, .85);
const jumpDownEasing = BezierEasing(.6, .03, .8, .58);

export default class Player {
    constructor(playerImages) {
        this.state = 'idle'; // 'run', 'up', 'down', 'die'
        this.running = true;
        this.posY = 0;
        this.frameTimeout = null;
        this.jumpTime = 0;
        this.jumpUpDelay = 200;
        this.jumpDownDelay = 300;

        this.images = {
            idle: {
                current: 0,
                img: playerImages.playerIdle
            },
            run: {
                current: 0,
                img: playerImages.playerRun
            },
            up: {
                current: 0,
                img: playerImages.playerJumpUp
            },
            down: {
                current: 0,
                img: playerImages.playerJumpDown
            },
            die: {
                current: 0,
                img: playerImages.playerDie
            },
        }

        this._runFrameInterval();
    }

    _runFrameInterval() {
        clearInterval(this.frameTimeout);
        this.frameTimeout = setInterval(() => {
            this.images[this.state].current++;

            if (this.images[this.state].current > this.images[this.state].img.length - 1)
                this.images[this.state].current = 0;

            if (this.state === 'die' && this.images[this.state].current === this.images[this.state].img.length - 1) {
                clearInterval(this.frameTimeout);
            }

        }, this.state === 'idle' ? 500 : 100);
    }

    run() {
        this.state = 'run';
        this._runFrameInterval();
    }

    jump() {
        if (this.state !== 'run') return;
        this.state = 'up';
        this.jumpTime = Date.now();

        setTimeout(() => {
            this.state = 'down';
            this.jumpTime = Date.now();

            setTimeout(() => {
                this.state = 'run';
            }, this.jumpDownDelay);
        }, this.jumpUpDelay);
    }

    die() {
        this.state = 'die';
    }
    
    getCurrentFrame() {
        let posY = this.posY;

        if (this.state === 'up') {
            posY = jumpUpEasing((Date.now() - this.jumpTime) / this.jumpUpDelay);
        }

        if (this.state === 'down') {
            posY = 1 - jumpDownEasing((Date.now() - this.jumpTime) / this.jumpDownDelay);
        }

        return {
            img: this.images[this.state].img[this.images[this.state].current],
            posY
        }
    }
};
