import  {
     updateTexture
}  from './drawTicTacToe.js'

import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import axios from "axios";
import store from "@/store";
import router from "@/router";

import {playAudio} from '../../../public/audio/sound'

let amIOwner;
let isMyTurn;
let myMark;

let sessionKey;
let socket = null;

const SIZE = 3;
const EMPTY = 'empty';

// representation of the game board in the tic-tac-toe's logic
let logicBoard =
    [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];

let gameOver = {status: false};

function connectToSocket(sessionKey) {
    socket = new SockJS("http://localhost:8080/api/websocket");
    let stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            console.log(frame);
            stompClient.subscribe("/topic/game/" + sessionKey, response => {
                let message = JSON.parse(response.body);
                let boxNumber = message.boxNumber;
                let move = calculateRowAndColumn(boxNumber);
                let column = move[0];
                let row = move[1];
                let mark = message.mark;

                if(mark !== myMark) {
                    logicBoard[row][column] = mark;
                    updateTexture(boxNumber, mark);
                    checkWin(mark);
                    checkCatsGame();
                    isMyTurn = true;
                }
            });
        },
    );
}

function sendMessageToSocket(mark, boxNumber, key) {
    return axios.post('api/games/sessions/ticTacToeMove', {
        mark: mark,
        boxNumber: boxNumber,
        sessionKey: key,
    });
}

function restart(){
    logicBoard =
            [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]];
    gameOver.status = false;
    amIOwner = localStorage.getItem('owner') === store.state.auth.user.username;
    isMyTurn = amIOwner;
    sessionKey = localStorage.getItem('sessionKey');
    myMark = amIOwner ? 'o' : 'x';
}

function calculateBoxNumber(row, column) {
    return 3*row+column; // number of the box from 0 to 8
}

function calculateRowAndColumn(boxNumber) {
    let column = boxNumber % 3;
    let row = (boxNumber - column) / 3;

    return [column, row];
}

// if the game is still going then the player makes a move based on the clicked box
function playerTurn(boxNumber, mark) {
    if(!gameOver.status && isMyTurn) {
        let row = Math.floor(boxNumber / 3);
        let column = boxNumber % 3;

        if(logicBoard[row][column] === EMPTY) {
            logicBoard[row][column] = mark;
            updateTexture(boxNumber, mark);
            checkWin(mark);
            checkCatsGame();
            isMyTurn = false;
            sendMessageToSocket(mark, boxNumber, sessionKey);
        }
    }
}


// checks the every column looking for a win for a specific mark(X or O)
function columnWin(mark) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        let boxesInARow = [];
        for(let j = 0; j < SIZE; ++j) {
            if(logicBoard[i][j] === mark) {
                symbolCount++;
                boxesInARow.push(calculateBoxNumber(i, j));
            }
        }
        if(symbolCount === SIZE) {
            drawWin(mark, boxesInARow);
            gameOver.status = true;
        }
    }
}

// checks the every row looking for a win for a specific mark(X or O)
function rowWin(mark) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        let boxesInARow = [];
        for(let j = 0; j < SIZE; ++j) {
            if(logicBoard[j][i] === mark) {
                symbolCount++;
                boxesInARow.push(calculateBoxNumber(j, i));
            }
        }
        if(symbolCount === SIZE) {
            drawWin(mark, boxesInARow);
            gameOver.status = true;
        }
    }
}

// checks the both diagonals looking for a win for a specific mark(X or O)
function diagonalWin(mark) {
    let symbolCount = 0;
    let boxesInARow = [];
    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[i][i] === mark) {
            symbolCount++;
            boxesInARow.push(calculateBoxNumber(i, i));
        }
    }
    if(symbolCount === SIZE) {
        drawWin(mark, boxesInARow);
        gameOver.status = true;
    }

    symbolCount = 0;
    boxesInARow = [];

    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[SIZE - i - 1][i] === mark) {
            symbolCount++;
            boxesInARow.push(calculateBoxNumber((SIZE - i - 1), i));
        }
    }
    if(symbolCount === SIZE) {
        drawWin(mark, boxesInARow);
        gameOver.status = true;
    }
}

// checks the entire board looking for a win for a specific mark(X or O)
function checkWin(mark) {
    columnWin(mark);
    if(!gameOver.status) {
        rowWin(mark);
    }
    if(!gameOver.status) {
        diagonalWin(mark);
    }
    if(gameOver.status) {
        if(mark === myMark) {
            playAudio("./audio/win.wav");
            axios.patch('api/ranking/' + store.state.auth.user.username);
        }
        else {
            playAudio("./audio/lose.wav");
        }
        handleEndGame();
    }
}

// changes the textures of the winning boxes
function drawWin(mark, boxesInARow) {
    for(let boxNumber of boxesInARow) {
        updateTexture(boxNumber, mark + 'Win');
    }
}

// checks whether the game ended in a draw or is still going
function checkCatsGame() {
    if(!gameOver.status) {
        let catsGame = true;

        for(let i = 0; i < SIZE; ++i) {
            for(let j = 0; j < SIZE; ++j) {
                if(logicBoard[i][j] === EMPTY) {
                    catsGame = false;
                }
            }
        }

        if(catsGame) {
            gameOver.status = true;
            playAudio("../audio/draw.wav");
            handleEndGame();
        }
    }
}

function handleEndGame() {
    axios.delete('api/games/sessions/close/' + sessionKey);
    localStorage.removeItem('owner');
    localStorage.removeItem('sessionKey');
    setTimeout( () => router.push({ path: '/'}), 3000);
}

export {playerTurn, restart, myMark, connectToSocket, sessionKey};