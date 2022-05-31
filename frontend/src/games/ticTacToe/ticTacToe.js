import {updateInfoBoxTexture, updateTexture} from './drawTicTacToe.js'
import {
    calculateBoxNumber, handleWin,
    logicBoard, gameOver, isMyTurn, calculateRowAndColumn, EMPTY, checkDraw, actualPlayer, sessionKey
} from "@/games/gameUtils";
import {sendMessageToSocket} from "@/games/socketUtils";

let boardX = 3;
let boardY = 3;

let player1 = 'o';
let player2 = 'x';

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
                boxesInARow.push(calculateBoxNumber(i, j), boardX);
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
                boxesInARow.push(calculateBoxNumber(j, i), boardX);
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
            boxesInARow.push(calculateBoxNumber(i, i), boardX);
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
            boxesInARow.push(calculateBoxNumber((boardX - i - 1), i), boardX);
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

// changes the textures of the winning boxes
function drawWin(player, boxesInARow) {
    for(let boxNumber of boxesInARow) {
        updateTexture(boxNumber, player + 'Win');
    }
}


export {boardX, boardY, player1, player2, checkWin, playerTurn};