import axios from "axios";
import router from "@/router";
import store from "@/store";
import {playAudio} from "../../public/audio/sound";

let amIOwner;
let isMyTurn;
let actualPlayer;
let sessionKey;

let logicBoard = [];
let gameOver = {status: false};

const EMPTY = 'empty';

function calculateBoxNumber(row, column, scalar) {
    return scalar*row+column; // number of the box from 0 to 8
}

function calculateRowAndColumn(boxNumber, scalar) {
    let column = boxNumber % scalar;
    let row = (boxNumber - column) / scalar;

    return [column, row];
}


function restart(boardX, boardY, player1, player2){
    for(let i = 0; i < boardX; ++i) {
        let row = [];
        for(let j = 0; j < boardY; ++j) {
            row.push(EMPTY);
        }
        logicBoard.push(row);
    }

    gameOver.status = false;
    amIOwner = localStorage.getItem('owner') === store.state.auth.user.username;
    isMyTurn = amIOwner;
    sessionKey = localStorage.getItem('sessionKey');
    actualPlayer = amIOwner ? player1 : player2;
}

function handleEndGame() {
    axios.delete('api/games/sessions/close/' + sessionKey);
    localStorage.removeItem('owner');
    localStorage.removeItem('sessionKey');
    setTimeout( () => router.push({ path: '/'}), 3000);
}

function handleWin(player) {
    if(gameOver.status) {
        if(player === actualPlayer) {
            playAudio("./audio/win.wav");
            axios.patch('api/ranking/' + store.state.auth.user.username);
        }
        else {
            playAudio("./audio/lose.wav");
        }
        handleEndGame();
    }
}

function checkDraw(boardX, boardY) {
    if(!gameOver.status) {
        let draw = true;

        for(let i = 0; i < boardX; ++i) {
            for(let j = 0; j < boardY; ++j) {
                if(logicBoard[i][j] === EMPTY) {
                    draw = false;
                }
            }
        }

        if(draw) {
            gameOver.status = true;
            playAudio("../audio/draw.wav");
            handleEndGame();
        }
    }
}

export {calculateRowAndColumn, calculateBoxNumber, handleEndGame, restart, handleWin, checkDraw,
    amIOwner, isMyTurn, EMPTY, actualPlayer, sessionKey, logicBoard, gameOver}