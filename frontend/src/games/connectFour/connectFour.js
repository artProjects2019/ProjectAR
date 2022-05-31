import {
    handleWin, logicBoard, gameOver, isMyTurn, calculateRowAndColumn, EMPTY,
    checkDraw, actualPlayer, sessionKey, calculateBoxNumber
} from "@/games/gameUtils";
import {sendMessageToSocket} from "@/games/socketUtils";
import {updateInfoBoxTexture, updateTexture} from './drawConnectFour.js'

let boardX = 7;
let boardY = 6;

let player1 = 'red';
let player2 = 'blue';

const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

function checkCombination(player, combination) {
    let tmp = true;

    for(let i = 0; i < 4; ++i) {
        console.log(combination.at(i));
        console.log(combination[i]);
        let move = calculateRowAndColumn(combination.at(i), boardX);
        let column = move[0];
        let row = move[1];

        if(logicBoard[row][column] !== player) {
            tmp = false;
        }
    }

    gameOver.status = tmp;
    if(gameOver.status) {
        drawWin(combination);
    }
}

function checkWin(player) {
    for(let y = 0; y < winningArrays.length && !gameOver.status; y++) {
        checkCombination(player, winningArrays[y]);
    }

    handleWin(player);
}

function playerTurn(boxNumber, player) {
    if(!gameOver.status && isMyTurn) {
        let move = calculateRowAndColumn(boxNumber, boardX);
        let column = move[0];

        for(let i = 0; i < 6; ++i) {
            if (logicBoard[i][column] === EMPTY) {
                boxNumber = calculateBoxNumber(i, column, boardX);
                logicBoard[i][column] = player;
                updateTexture(boxNumber, player);
                checkWin(player);
                checkDraw(boardX, boardY);
                // eslint-disable-next-line no-import-assign
                isMyTurn = false;
                updateInfoBoxTexture(actualPlayer, isMyTurn);
                sendMessageToSocket(player, boxNumber, sessionKey);
                break;
            }
        }
    }
}

function drawWin(boxesInARow) {
    for(let boxNumber of boxesInARow) {
        updateTexture(boxNumber, 'green');
    }
}

export {boardX, boardY, player1, player2, checkWin, playerTurn};

