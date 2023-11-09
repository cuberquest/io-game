import io from "socket.io-client";
import { processGameUpdate } from "./state";

const constants = require("../shared/constants");

const socket = io(`ws://${location.host}`);
const connectedPromise = new Promise(resolve => {
  socket.on("connect", () => {
    console.log("Connected to server!", `${socket}`);
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    socket.on(constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(constants.MSG_TYPES.GAME_OVER, onGameOver);
  })
);

export const play = username => socket.emit(constants.MSG_TYPES.JOIN_GAME, username);

export const updateDir = dir => socket.emit(constants.MSG_TYPES.INPUT, dir);