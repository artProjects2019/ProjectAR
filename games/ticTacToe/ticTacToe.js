const SIZE = 3;
const X = 1;
const O = 0;
const EMPTY = -1;

let logicBoard =
    [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];

let gameOver = {status: false};

function playerTurn(boxNumber) {

    if(!gameOver.status) {
        let row = Math.floor(boxNumber / 3);
        let column = boxNumber % 3;

        if(logicBoard[row][column] === EMPTY) {
            logicBoard[row][column] = O;
            updateTextureO(boxNumber);

            checkWin(O);
            checkCatsGame();

            computerTurn();
        }
    }
}

function calculateBoxNumber(row, column) {
    return 3*row+column;
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

function checkRow(madeTurn, mark) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        let column = -1;
        for(let j = 0; j < SIZE; ++j) {
            if(logicBoard[i][j] === mark) {
                symbolCount++;
            }
            else if(logicBoard[i][j] === EMPTY) {
                column = j;
            }
        }
        if(symbolCount === SIZE - 1 && column >= 0) {
            logicBoard[i][column] = X;
            updateTextureX(calculateBoxNumber(i, column));
            madeTurn.status = true;
            break;
        }
    }
}

function checkColumn(madeTurn, mark) {
    for(let j = 0; j < SIZE; ++j) {
        let symbolCount = 0;
        let row = -1;
        for(let i = 0; i < SIZE; ++i) {
            if(logicBoard[i][j] === mark) {
                symbolCount++;
            }
            else if(logicBoard[i][j] === EMPTY) {
                row = i;
            }
        }
        if(symbolCount === SIZE - 1 && row >= 0) {
            logicBoard[row][j] = X;
            updateTextureX(calculateBoxNumber(row, j));
            madeTurn.status = true;
            break;
        }
    }
}

function checkDiagonalLeftTop(madeTurn, mark) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[i][i] === mark) {
            symbolCount++;
        }
        else if(logicBoard[i][i] === EMPTY) {
            position = i;
        }
    }
    if(symbolCount === SIZE - 1 && position >= 0) {
        logicBoard[position][position] = X;
        updateTextureX(calculateBoxNumber(position, position));
        madeTurn.status = true;
    }
}

function checkDiagonalLeftBottom(madeTurn, mark) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(logicBoard[SIZE - i - 1][i] === mark) {
            symbolCount++;
        }
        else if(logicBoard[SIZE - i - 1][i] === EMPTY) {
            position = i;
        }
    }
    if(symbolCount === SIZE - 1 && position >= 0) {
        logicBoard[SIZE - position - 1][position] = X;
        updateTextureX(calculateBoxNumber((SIZE - position - 1), position));
        madeTurn.status = true;
    }
}

function computerInput() {
    let turnMade = {status: false};

    //Computer checks if it can make 3 in a row
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

    //Computer checks if the player can be blocked
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

    //Computer makes random move
    if(!turnMade.status) {
        computerRandomInput();
    }
}

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

function checkWin(mark) {
    columnWin(mark);
    rowWin(mark);
    diagonalWin(mark);
}

function checkCatsGame() {
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
    }
}

function computerTurn() {
    if(!gameOver.status) {
        computerInput();
        checkWin(X);
        checkCatsGame();
    }
}

function drawWin(mark, boxesInARow) {
    for(let number of boxesInARow)
    {
        if (mark === O)
            updateTextureOWin(number);
        else
            updateTextureXWin(number);
    }
}
