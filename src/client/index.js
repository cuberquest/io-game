import { connect, play } from "./networking";
import { startRender, stopRender } from "./render";
import { startInput, stopInput } from "./input";
import { downloadAssets } from "./assets";
import { initState } from "./state";
import { setLeaderboardHidden } from "./leaderboard";

import "./css/main.css";

const menu = document.getElementById("play-menu");
const playBtn = document.getElementById("play-button");
const username = document.getElementById("username-input");

Promise.all([
  connect(),
  downloadAssets()
]).then(() => {
  menu.classList.remove("hidden");
  username.focus();
  playBtn.addEventListener("click", () => {
    play(username.value);
    menu.classList.add("hidden");
    initState();
    startInput();
    startRender();
    setLeaderboardHidden(false);
  });
});