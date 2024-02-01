import { updateDir } from "./networking";

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const dir = Math.atan2(x - innerWidth / 2, innerHeight / 2 - y);
  updateDir(dir);
}

export function startInput() {
  addEventListener("mousemove", onMouseInput);
  addEventListener("touchmove", onTouchInput);
}

export function stopInput() {
  removeEventListener("mousemove", onMouseInput);
  removeEventListener("mousemove", onTouchInput);
}