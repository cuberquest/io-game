import { getAsset } from "./assets";
import { getCurrentState } from "./state";

const constants = require("../shared/constants");
const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = constants;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

function render() {
  const { me, others, bullets } = getCurrentState();
  if (me) {
    renderBackground(me.x, me.y);

    bullets.forEach(renderBullet.bind(null, me));

    renderPlayer(me, me);
    others.forEach(renderBullet.bind(null, me));
  }
  frameId = requestAnimationFrame(render);
}

let frameId;

export function startRender() {
  frameId = requestAnimationFrame(render);
}

export function stopRender() {
  cancelAnimationFrame(frameId);
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  ctx.drawImage(
    getAsset("bullet.svg"),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2
  )
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = ctx.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, "black");
  backgroundGradient.addColorStop(1, "gray");
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  ctx.save();
  ctx.translate(canvasX, canvasY);
  ctx.rotate(direction);
  ctx.drawImage(
    getAsset("ship.svg"),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  ctx.restore();

  // Draw health bar
  ctx.fillStyle = "white";
  ctx.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  ctx.fillStyle = "red";
  ctx.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );
}