import  {
     updateTextureX,
     updateTextureXWin,
     updateTextureO,
     updateTextureOWin
}  from './drawTicTacToe.js'

import {playAudio} from '../audio/sound.js'

const SIZE = 3;
const X = 1;
const O = 0;
const EMPTY = -1;

// representation of the game board in the tic-tac-toe's logic
let logicBoard =
    [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];

let gameOver = {status: false};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateBoxNumber(row, column) {
    return 3*row+column; // number of the box from 0 to 8
}

// if the game is still going then the player makes a move based on the clicked box
async function playerTurn(boxNumber) {
    if(!gameOver.status) {
        let row = Math.floor(boxNumber / 3);
        let column = boxNumber % 3;

        if(logicBoard[row][column] === EMPTY) {
            logicBoard[row][column] = O;
            updateTextureO(boxNumber);

            // check the game status after the player's move
            checkWin(O);
            checkCatsGame();

            // computer makes a move only after player's turn
            await sleep(200);
            computerTurn();
        }
    }
}

// if the game is still going then the computer makes a move
function computerTurn() {
    if(!gameOver.status) {
        computerInput();

        // check the game status after the computer's move
        checkWin(X);
        checkCatsGame();
    }
}

function computerRandomInput() {
    let row = Math.floor((Math.random() * 10) % 3);
    let column = Math.floor((Math.random() * 10) % 3);

    if(logicBoard[row][column] === EMPTY) {
        logicBoard[row][column] = X;
        updateTextureX(calculateBoxNumber(row, column));
    }
    else {
        computerRandomInput();
    }
}

// function used by the computer to check whether it should make a move in one of the rows
function checkRow(madeTurn, mark) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        let column = -1;
        for(let j = 0; j < SIZE; ++j) {
            if(logicBoard[i][j] === mark) {
                symbolCount++;
            }
            else if(logicBoard[i][j] === EMPTY) {
                column = j; // remember the position of the potential computer's move
            }
        }

        // if there are 2 the same marks in the same row and the third box is empty
        // then make a move on the remembered position
        if(symbolCount === SIZE - 1 && column >= 0) {
            logicBoard[i][column] = X;
            updateTextureX(calculateBoxNumber(i, column));
            madeTurn.status = true;
            break;
        }
    }
}

// function used by the computer to check whether it should make a move in one of the columns
function checkColumn(madeTurn, mark) {
    for(let j = 0; j < SIZE; ++j) {
        let symbolCount = 0;
        let row = -1;
        for(let i = 0; i < SIZE; ++i) {
            if(logicBoard[i][j] === mark) {
                symbolCount++;
            }
            else if(logicBoard[i][j] === EMPTY) {
                row = i; // remember the position of the potential computer's move
            }
        }

        // if there are 2 the same marks in the same column and the third box is empty
        // then make a move on the remembered position
        if(symbolCount === SIZE - 1 && row >= 0) {
            logicBoard[row][j] = X;
            updateTextureX(calculateBoxNumber(row, j));
            madeTurn.status = true;
            break;
        }
    }
}

// function used by the computer to check whether it should make a move on one of the diagonals
function checkDiagonalLeftTop(madeTurn, mark) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[i][i] === mark) {
            symbolCount++;
        }
        else if(logicBoard[i][i] === EMPTY) {
            position = i; // remember the position of the potential computer's move
        }
    }

    // if there are 2 the same marks on the same diagonal and the third box is empty
    // then make a move on the remembered position
    if(symbolCount === SIZE - 1 && position >= 0) {
        logicBoard[position][position] = X;
        updateTextureX(calculateBoxNumber(position, position));
        madeTurn.status = true;
    }
}

// function used by the computer to check whether it should make a move on one of the diagonals
function checkDiagonalLeftBottom(madeTurn, mark) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[SIZE - i - 1][i] === mark) {
            symbolCount++;
        }
        else if(logicBoard[SIZE - i - 1][i] === EMPTY) {
            position = i; // remember the position of the potential computer's move
        }
    }

    // if there are 2 the same marks on the same diagonal and the third box is empty
    // then make a move on the remembered position
    if(symbolCount === SIZE - 1 && position >= 0) {
        logicBoard[SIZE - position - 1][position] = X;
        updateTextureX(calculateBoxNumber((SIZE - position - 1), position));
        madeTurn.status = true;
    }
}

// computer's logic
function computerInput() {
    let turnMade = {status: false};

    // Computer checks if it can make 3 in a row and win the game
    checkColumn(turnMade, X);
    if(!turnMade.status) {
        checkRow(turnMade, X);
    }
    if(!turnMade.status) {
        checkDiagonalLeftTop(turnMade, X);
    }
    if(!turnMade.status) {
        checkDiagonalLeftBottom(turnMade, X);
    }

    // Computer checks if the player can make 3 in a row in the next turn and blocks him if he can
    if(!turnMade.status) {
        checkColumn(turnMade, O);
    }
    if(!turnMade.status) {
        checkRow(turnMade, O);
    }
    if(!turnMade.status) {
        checkDiagonalLeftBottom(turnMade, O);
    }
    if(!turnMade.status) {
        checkDiagonalLeftTop(turnMade, O);
    }

    // Computer makes a random move if it did not get to win the game, nor block the player
    if(!turnMade.status) {
        computerRandomInput();
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
        if(mark === O) {
            playAudio("../audio/win.wav");
        }
        if(mark === X) {
            playAudio("../audio/lose.wav");
        }
    }
}

// changes the textures of the winning boxes
function drawWin(mark, boxesInARow) {
    for(let boxNumber of boxesInARow) {
        if(mark === O) {
            updateTextureOWin(boxNumber);
        }
        if(mark === X) {
            updateTextureXWin(boxNumber);
        }
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
        }
    }
}

export {playerTurn};