export const gameLoop = (ctx, canvas, loadedAssets, player, game, colors, paused, startBlock) => {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let obstacles = game.getObstacles();
    let playerPos = canvas.height - 195 - (player.getCurrentFrame().posY * 110);

    if (game.state === 1)
        game.groundX = game.groundX <= -100 ? 100 + game.groundX - game.groundSpeed : game.groundX - game.groundSpeed;

    for (let i = 0; i < 10; i++) {
        ctx.drawImage(loadedAssets.ground[0], (i * 100) + game.groundX, canvas.height - 100, 100, 100);
    }

    for (let i = 0; i < obstacles.length; i++) {
        ctx.beginPath();
        ctx.drawImage(loadedAssets.cactus[0], obstacles[i], canvas.height - 150, 35, 50);

        if (
            obstacles[i] - 5 <= 80 + 75 &&
            obstacles[i] + 5 >= 80 &&
            playerPos + 100 > canvas.height - 140 + 40
        ) {
            startBlock = true;
            game.die();
            player.die();

            setTimeout(() => {
                startBlock = false;
            }, 600);
        }
    }
        
    ctx.drawImage(player.getCurrentFrame().img, 80, playerPos, player.state === 'die' ? 115 : 75, 100);

    if (game.state === 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = colors.text;
        ctx.font = '31px Verdana,Geneva,sans-serif';
        ctx.fillText('press space to start', canvas.width / 2, 140);
    }

    if (game.state === 1 || game.state === 2) {
        ctx.textAlign = 'right';
        ctx.fillStyle = colors.text;
        ctx.font = '18px Verdana,Geneva,sans-serif';
        ctx.fillText(`score: ${game.score}`, canvas.width - 20, 30);
        ctx.font = '14px Verdana,Geneva,sans-serif';
        ctx.fillText(`highscore: ${game.highscore}`, canvas.width - 20, 50);
    }

    if (game.state === 2) {
        ctx.textAlign = 'center';
        ctx.fillStyle = colors.text;
        ctx.font = '31px Verdana,Geneva,sans-serif';
        ctx.fillText('you died :(', canvas.width / 2, 140);
        ctx.font = '20px Verdana,Geneva,sans-serif';
        ctx.fillText('press space to try again', canvas.width / 2, 175);
    }

    if (!paused) requestAnimationFrame(gameLoop.bind(null, ctx, canvas, loadedAssets, player, game, colors, paused, startBlock));
};