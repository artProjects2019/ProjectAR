const SIZE = 3;
const X = 1;
const O = 0;
const EMPTY = -1;

function isInputValid(input) {
    return input === 0 || input === 1 || input === 2;
}

function playerInput(board) {
    let row = parseInt(prompt("Select row to mark:"));
    let column = parseInt(prompt("Select column to mark:"));

    while (!isInputValid(row) || !isInputValid(column)) {
        row = parseInt(prompt("Invalid input. Select row to mark:"));
        column = parseInt(prompt("Invalid input. Select column to mark:"));
    }

    if(board[row][column] === EMPTY) {
        board[row][column] = O;
    }
    else {
        playerInput(board);
    }
    // changeTextures(); --> in AR

}

function computerRandomInput(board) {
    let row = Math.floor((Math.random() * 10) % 3);
    let column = Math.floor((Math.random() * 10) % 3);

    if(board[row][column] === EMPTY) {
        board[row][column] = X;
    }
    else {
        computerRandomInput(board);
    }
}

function checkRow(madeTurn, mark, board) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        let columnNumber = -1;
        for(let j = 0; j < SIZE; ++j) {
            if(board[i][j] === mark) {
                symbolCount++;
            }
            else if(board[i][j] === EMPTY) {
                columnNumber = j;
            }
        }
        if(symbolCount === SIZE - 1 && columnNumber >= 0) {
            board[i][columnNumber] = X;
            madeTurn.item = true;
            break;
        }
    }
}

function checkColumn(madeTurn, mark, board) {
    for(let j = 0; j < SIZE; ++j) {
        let symbolCount = 0;
        let rowNumber = -1;
        for(let i = 0; i < SIZE; ++i) {
            if(board[i][j] === mark) {
                symbolCount++;
            }
            else if(board[i][j] === EMPTY) {
                rowNumber = i;
            }
        }
        if(symbolCount === SIZE - 1 && rowNumber >= 0) {
            board[rowNumber][j] = X;
            madeTurn.item = true;
            break;
        }
    }
}

function checkDiagonalLeftTop(madeTurn, mark, board) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(board[i][i] === mark) {
            symbolCount++;
        }
        else if(board[i][i] === EMPTY) {
            position = i;
        }
    }
    if(symbolCount === SIZE - 1 && position >= 0) {
        board[position][position] = X;
        madeTurn.item = true;
    }
}

function checkDiagonalLeftBottom(madeTurn, mark, board) {
    let symbolCount = 0;
    let position = -1;

    for(let i = 0; i < SIZE; ++i) {
        if(board[SIZE - i - 1][i] === mark) {
            symbolCount++;
        }
        else if(board[SIZE - i - 1][i] === EMPTY) {
            position = i;
        }
    }
    if(symbolCount === SIZE - 1 && position >= 0) {
        board[SIZE - position - 1][position] = X;
        madeTurn.item = true;
    }
}

function computerInput(board) {
    let turnMade = {item: false};

    //Computer checks if it can make 3 in a row
    checkColumn(turnMade, X, board);
    if(!turnMade.item) {
        checkRow(turnMade, X, board);
    }
    if(!turnMade.item) {
        checkDiagonalLeftTop(turnMade, X, board);
    }
    if(!turnMade.item) {
        checkDiagonalLeftBottom(turnMade, X, board);
    }

    //Computer checks if the player can be blocked
    if(!turnMade.item) {
        checkColumn(turnMade, O, board);
    }
    if(!turnMade.item) {
        checkRow(turnMade, O, board);
    }
    if(!turnMade.item) {
        checkDiagonalLeftBottom(turnMade, O, board);
    }
    if(!turnMade.item) {
        checkDiagonalLeftTop(turnMade, O, board);
    }

    //Computer makes random move
    if(!turnMade.item) {
        computerRandomInput(board);
    }
}

function columnWin(gameOver, mark, board) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        for(let j = 0; j < SIZE; ++j) {
            if(board[i][j] === mark) {
                symbolCount++;
            }
        }
        if(symbolCount === SIZE) {
            gameOver.item = true;
        }
    }
}

function rowWin(gameOver, mark, board) {
    for(let i = 0; i < SIZE; ++i) {
        let symbolCount = 0;
        for(let j = 0; j < SIZE; ++j) {
            if(board[j][i] === mark) {
                symbolCount++;
            }
        }
        if(symbolCount === SIZE) {
            gameOver.item = true;
        }
    }
}

function diagonalWin(gameOver, mark, board) {
    let symbolCount = 0;
    for(let i = 0; i < SIZE; ++i) {
        if(board[i][i] === mark) {
            symbolCount++;
        }
    }
    if(symbolCount === SIZE) {
        gameOver.item = true;
    }

    symbolCount = 0;

    for(let i = 0; i < SIZE; ++i) {
        if(board[SIZE - i - 1][i] === mark) {
            symbolCount++;
        }
    }
    if(symbolCount === SIZE) {
        gameOver.item = true;
    }
}

function checkWin(gameOver, mark, board) {
    columnWin(gameOver, mark, board);
    rowWin(gameOver, mark, board);
    diagonalWin(gameOver, mark, board);
}

function checkCatsGame(gameOver, board) {
    let catsGame = true;
    for(let i = 0; i < SIZE; ++i) {
        for(let j = 0; j < SIZE; ++j) {
            if(board[i][j] === EMPTY) {
                catsGame = false;
            }
        }
    }
    if(catsGame) {
        gameOver.item = true;
    }
}

function printBoard(board) {
    for(let i = 0; i < SIZE; ++i) {
        for(let j = 0; j < SIZE; ++j) {
            document.write(board[i][j]);
            document.write(" ");
        }
        document.write("<br>");
    }
    document.write("<br>");
}

function play() {
    let board =
            [[-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]];

    let endText;
    let gameOver = {item: false};

    while(!gameOver.item) {
        checkCatsGame(gameOver, board);
        if(gameOver.item) {
            endText = "Cat's game! ";
            break;
        }

        playerInput(board);

        checkWin(gameOver, O, board);
        if(gameOver.item) {
            endText = "You win! ";
            break;
        }

        checkCatsGame(gameOver, board);
        if(gameOver.item) {
            endText = "Cat's game! ";
            break;
        }

        computerInput(board);
        printBoard(board);

        checkWin(gameOver, X, board);
        if(gameOver.item) {
            endText = "You lose. ";
            break;
        }
    }

    document.write(endText);
}

//play();


