const player = document.getElementById('player');
const fallingObject = document.getElementById('falling-object');
const scoreDisplay = document.getElementById('score');
let score = 0;

const gameArea = document.getElementById('game-area');
const gameAreaWidth = gameArea.clientWidth;
const gameAreaHeight = gameArea.clientHeight;
const playerSpeed = 10;
let fallingSpeed = 2;

document.addEventListener('keydown', (event) => {
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = playerLeft - playerSpeed + 'px';
    } else if (event.key === 'ArrowRight' && playerLeft < gameAreaWidth - player.clientWidth) {
        
        player.style.left = playerLeft + playerSpeed + 'px';
    }
});

function startFalling() {
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.floor(Math.random() * (gameAreaWidth - fallingObject.clientWidth)) + 'px';
    fall();
}

function fall() {
    let fallingObjectTop = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('top'));
    if (fallingObjectTop < gameAreaHeight) {
        fallingObject.style.top = fallingObjectTop + fallingSpeed + 'px';
        requestAnimationFrame(fall);
        if (checkCollision(player, fallingObject)) {
            score += 1;
            scoreDisplay.innerText = 'Puntos: ' + score;
            resetFallingObject();
        }
    } else {
        resetFallingObject();
    }
}

function checkCollision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function resetFallingObject() {
    fallingObject.style.top = '0px';
    startFalling();
}

startFalling();
