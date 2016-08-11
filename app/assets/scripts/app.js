import { loadAssets } from './utils';
import Player from './classes/player';
import Game from './classes/game';
import { gameLoop } from './gameLoop';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const colors = {
    bg: '#bcf2ff',
    text: '#222'
};
const assets = {
    ground: ['resources/images/tile-ground.png'],
    sky: ['resources/images/layer-3.png'],
    playerIdle: [
        'resources/images/player/idle/frame-1.png',
        'resources/images/player/idle/frame-2.png'
    ],
    playerDie: [
        'resources/images/player/faint/frame-1.png',
        'resources/images/player/faint/frame-2.png',
        'resources/images/player/faint/frame-3.png'
    ],
    playerJumpUp: [
        'resources/images/player/jump-up/frame.png',
    ],
    playerJumpDown: [
        'resources/images/player/jump-fall/frame.png',
    ],
    playerRun: [
        'resources/images/player/run/frame-1.png',
        'resources/images/player/run/frame-2.png',
        'resources/images/player/run/frame-3.png',
        'resources/images/player/run/frame-4.png'
    ],
    cactus: [
        'resources/images/cactus.png'
    ]
};

let game = new Game(canvas.width + 50);

// ----------------------------------------------------------------
// ----------------------------------------------------------------

loadAssets(assets, (loadedAssets) => {
    let { cactus, playerIdle, playerDie, playerJumpUp, playerJumpDown, playerRun } = loadedAssets;
    let player = new Player({ playerIdle, playerDie, playerJumpUp, playerJumpDown, playerRun });
    let startBlock = false;
    let paused = false;

    requestAnimationFrame(gameLoop.bind(null, ctx, canvas, loadedAssets, player, game, colors, paused, startBlock));

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 38 || e.keyCode == 32) {
            if (game.state === 1) player.jump();
            if ((game.state === 0 || game.state === 2) && !startBlock) {
                game.start();
                player.run();
            }
        }

        if (e.keyCode == 27) {
            paused = !paused;
        }
    });
});