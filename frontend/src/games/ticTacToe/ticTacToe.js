import {updateInfoBoxTexture, updateTexture} from './drawTicTacToe.js'
import {
    calculateBoxNumber, handleWin,
    gameOver, isMyTurn, calculateRowAndColumn, actualPlayer, sessionKey, handleEndGame
} from "@/games/gameUtils";
import {sendMessageToSocket} from "@/games/socketUtils";
import {playAudio} from "../../../public/audio/sound";

let boardX = 3;
let boardY = 3;

let player1 = 'o';
let player2 = 'x';

const EMPTY = 'empty';
let logicBoard = [];

function initLogicBoard() {
    logicBoard = [];
    for(let i = 0; i < boardY; ++i) {
        let row = [];
        for(let j = 0; j < boardX; ++j) {
            row.push(EMPTY);
        }
        logicBoard.push(row);
    }
}

function playerTurn(boxNumber, player) {
    if(!gameOver.status && isMyTurn) {
        let move = calculateRowAndColumn(boxNumber, boardX);
        let column = move[0];
        let row = move[1];

        if(logicBoard[row][column] === EMPTY) {
            logicBoard[row][column] = player;
            updateTexture(boxNumber, player);
            checkWin(player);
            checkDraw(boardX, boardY);
            // eslint-disable-next-line no-import-assign
            isMyTurn = false;
            updateInfoBoxTexture(actualPlayer, isMyTurn);
            sendMessageToSocket(player, boxNumber, sessionKey);
        }
    }
}

// checks the every column looking for a win for a specific player(X or O)
function columnWin(player) {
    for(let i = 0; i < boardX; ++i) {
        let symbolCount = 0;
        let boxesInARow = [];
        for(let j = 0; j < boardX; ++j) {
            if(logicBoard[i][j] === player) {
                symbolCount++;
                boxesInARow.push(calculateBoxNumber(i, j, boardX));
            }
        }
        if(symbolCount === boardX) {
            drawWin(player, boxesInARow);
            gameOver.status = true;
        }
    }
}

// checks the every row looking for a win for a specific player(X or O)
function rowWin(player) {
    for(let i = 0; i < boardX; ++i) {
        let symbolCount = 0;
        let boxesInARow = [];
        for(let j = 0; j < boardX; ++j) {
            if(logicBoard[j][i] === player) {
                symbolCount++;
                boxesInARow.push(calculateBoxNumber(j, i, boardX));
            }
        }
        if(symbolCount === boardX) {
            drawWin(player, boxesInARow);
            gameOver.status = true;
        }
    }
}

// checks the both diagonals looking for a win for a specific player(X or O)
function diagonalWin(player) {
    let symbolCount = 0;
    let boxesInARow = [];
    for(let i = 0; i < boardX; ++i) {
        if(logicBoard[i][i] === player) {
            symbolCount++;
            boxesInARow.push(calculateBoxNumber(i, i, boardX));
        }
    }
    if(symbolCount === boardX) {
        drawWin(player, boxesInARow);
        gameOver.status = true;
    }

    symbolCount = 0;
    boxesInARow = [];

    for(let i = 0; i < boardX; ++i) {
        if(logicBoard[boardX - i - 1][i] === player) {
            symbolCount++;
            boxesInARow.push(calculateBoxNumber((boardX - i - 1), i, boardX));
        }
    }
    if(symbolCount === boardX) {
        drawWin(player, boxesInARow);
        gameOver.status = true;
    }
}

function checkWin(player) {
    columnWin(player);
    if(!gameOver.status) {
        rowWin(player);
    }
    if(!gameOver.status) {
        diagonalWin(player);
    }
    handleWin(player);
}

function checkDraw() {
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

// changes the textures of the winning boxes
function drawWin(player, boxesInARow) {
    for(let boxNumber of boxesInARow) {
        updateTexture(boxNumber, player + 'Win');
    }
}

function handleMessageFromSocket(message) {
    let boxNumber = message.boxNumber;
    let move = calculateRowAndColumn(boxNumber, boardX);
    let column = move[0];
    let row = move[1];
    let player = message.player;

    if(player !== actualPlayer) {
        logicBoard[row][column] = player;
        updateTexture(boxNumber, player);
        checkWin(player);
        checkDraw(boardX, boardY);
        // eslint-disable-next-line no-import-assign
        isMyTurn = true;
        updateInfoBoxTexture(actualPlayer, isMyTurn);
    }
}


export {boardX, boardY, player1, player2, checkWin, playerTurn, handleMessageFromSocket, initLogicBoard};