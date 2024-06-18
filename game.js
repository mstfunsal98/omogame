const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tankWidth = 50;
const tankHeight = 30;
const bombSize = 10;
const tankSpeed = 5;
const bombSpeed = 7;

let tankX = canvas.width / 2 - tankWidth / 2;
let tankY = canvas.height - tankHeight - 10;
let bombs = [];

document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if (e.key === "ArrowLeft" && tankX > 0) {
        tankX -= tankSpeed;
    } else if (e.key === "ArrowRight" && tankX < canvas.width - tankWidth) {
        tankX += tankSpeed;
    } else if (e.key === " ") {
        bombs.push({ x: tankX + tankWidth / 2 - bombSize / 2, y: tankY });
    }
}

function drawTank() {
    ctx.fillStyle = "green";
    ctx.fillRect(tankX, tankY, tankWidth, tankHeight);
}

function drawBombs() {
    ctx.fillStyle = "red";
    for (let i = 0; i < bombs.length; i++) {
        ctx.fillRect(bombs[i].x, bombs[i].y, bombSize, bombSize);
        bombs[i].y -= bombSpeed;
        if (bombs[i].y < 0) {
            bombs.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTank();
    drawBombs();
    requestAnimationFrame(draw);
}

draw();
