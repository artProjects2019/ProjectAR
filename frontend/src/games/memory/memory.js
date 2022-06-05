import {
    handleWin, logicBoard, gameOver, isMyTurn, calculateRowAndColumn, EMPTY,
    checkDraw, actualPlayer, sessionKey, calculateBoxNumber
} from "@/games/gameUtils";
import {sendMessageToSocket} from "@/games/socketUtils";
import {updateInfoBoxTexture, updateTexture} from './drawMemory.js'

let boardX = 5;
let boardY = 4;

let player1 = 'red';
let player2 = 'blue';