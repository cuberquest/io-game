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
    renderBg(me.x, me.y);

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