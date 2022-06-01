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
    return scalar*row+column;
}

function calculateRowAndColumn(boxNumber, scalar) {
    let column = boxNumber % scalar;
    let row = (boxNumber - column) / scalar;

    return [column, row];
}


function restart(boardX, boardY, player1, player2){
    logicBoard = [];
    for(let i = 0; i < boardY; ++i) {
        let row = [];
        for(let j = 0; j < boardX; ++j) {
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
    setTimeout( () => router.push({ path: '/'}), 4000);

}

function handleWin(player) {
    if(gameOver.status) {
        if(player === actualPlayer) {
            playAudio("./audio/polskaGurom.wav");
            axios.patch('api/ranking/' + store.state.auth.user.username);
        }
        else {
            playAudio("./audio/klopoty.wav");
        }
        handleEndGame();
    }
}

function checkDraw(boardX, boardY) {
    if(!gameOver.status) {
        let draw = true;

        for(let i = 0; i < boardY; ++i) {
            for(let j = 0; j < boardX; ++j) {
                if(logicBoard[i][j] === EMPTY) {
                    draw = false;
                }
            }
        }

        if(draw) {
            gameOver.status = true;
            playAudio("../audio/toByNic2.wav");
            handleEndGame();
        }
    }
}

export {calculateRowAndColumn, calculateBoxNumber, handleEndGame, restart, handleWin, checkDraw,
    amIOwner, isMyTurn, EMPTY, actualPlayer, sessionKey, logicBoard, gameOver}