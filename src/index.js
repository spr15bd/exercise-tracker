import "./styles.css";
import Game from "./game.js";
let canvas = document.getElementById("game-screen");
let ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);

let lastRender; // time in milliSeconds of last update
let progress; // time in milliSeconds between each loop iteration

function gameLoop(timestamp) {
  progress = timestamp - lastRender;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  game.update(progress);

  game.draw(ctx);
  lastRender = timestamp;
  requestAnimationFrame(gameLoop);
}

gameLoop();
