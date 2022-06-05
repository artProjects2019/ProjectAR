import {updateTexture, updateInfoBoxTexture, updateScoreBoxes} from "@/games/memory/drawMemory";
import {
    actualPlayer,
    calculateRowAndColumn,
    sessionKey,
    logicBoard,
    EMPTY,
    gameOver,
    isMyTurn, handleEndGame, handleWin, amIOwner
} from "@/games/gameUtils";
import {sendCardsPositionToSocket, sendMoveToSocket} from "@/games/socketUtils";
import {playAudio} from "../../../public/audio/sound";

let boardX = 5;
let boardY = 4;

let yourScore = 0;
let oppScore = 0;

let player1 = 'red';
let player2 = 'blue';

let firstCard = null;
let firstCardIndex = null;
let secondCard = null;

let cards = [];
let locatedCards = [];

function restartSettings() {
    yourScore = 0;
    oppScore = 0;
    firstCard = null;
    firstCardIndex = null;
    secondCard = null;

    cards = [
        'o', 'x', 'oWin', 'xWin', 'blue', 'green', 'red', 'circles', 'thumb', 'rocket',
        'o', 'x', 'oWin', 'xWin', 'blue', 'green', 'red', 'circles', 'thumb', 'rocket'
    ];

    locatedCards = [
        EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    ];
}

function locateCards() {
    for(let i = 0; i < 20; i++) {
        let index = Math.floor(Math.random() * cards.length);
        locatedCards[i] = cards[index];
        cards.splice(index, 1);
    }

    sendCardsPositionToSocket(locatedCards, sessionKey);
}

function toggleIsMyTurn() {
    return !isMyTurn;
}

function cardsMatches() {
    return firstCard === secondCard;
}

function handleMessageFromSocket(message) {
    let boxNumber = message.boxNumber;
    let move = calculateRowAndColumn(boxNumber, boardX);
    let column = move[0];
    let row = move[1];
    let player = message.player;
    let action = message.action;

    if(player !== actualPlayer) {
        if(action === 'positions') {
            locatedCards = message.cards;
        }
        else {
            if(action === 'firstCard') {
                firstCard = locatedCards[boxNumber];
                firstCardIndex = boxNumber;
                logicBoard[row][column] = player;
                updateTexture(boxNumber, firstCard);
            }
            else {
                secondCard = locatedCards[boxNumber];
                logicBoard[row][column] = player;
                updateTexture(boxNumber, secondCard);

                setTimeout( () => {
                    if(cardsMatches()) {
                        oppScore += 1;
                        updateScoreBoxes(yourScore, oppScore);
                        checkWin();
                    }
                    else {
                        updateTexture(boxNumber, 'white');
                        updateTexture(firstCardIndex, 'white');
                        logicBoard[row][column] = EMPTY;

                        let move = calculateRowAndColumn(firstCardIndex, boardX);
                        let oldColumn = move[0];
                        let oldRow = move[1];
                        logicBoard[oldRow][oldColumn] = EMPTY;

                        // eslint-disable-next-line no-import-assign
                        isMyTurn = toggleIsMyTurn();
                        updateInfoBoxTexture(isMyTurn);
                    }

                    firstCard = null;
                    firstCardIndex = null;
                    secondCard = null;
                }, 1000);
            }
        }
    }
}

function makeAMove(boxNumber, row, column, player) {
    if(firstCard === null) {
        firstCard = locatedCards[boxNumber];
        firstCardIndex = boxNumber;
        logicBoard[row][column] = player;
        updateTexture(boxNumber, firstCard);
        sendMoveToSocket(player, boxNumber, sessionKey, 'firstCard');
    }
    else if(secondCard === null) {
        secondCard = locatedCards[boxNumber];
        logicBoard[row][column] = player;
        updateTexture(boxNumber, secondCard);
        sendMoveToSocket(player, boxNumber, sessionKey);

        setTimeout( () => {
            if(cardsMatches()) {
                yourScore += 1;
                updateScoreBoxes(yourScore, oppScore);
                checkWin();
            }
            else {
                updateTexture(boxNumber, 'white');
                updateTexture(firstCardIndex, 'white');
                logicBoard[row][column] = EMPTY;

                let move = calculateRowAndColumn(firstCardIndex, boardX);
                let oldColumn = move[0];
                let oldRow = move[1];
                logicBoard[oldRow][oldColumn] = EMPTY;

                // eslint-disable-next-line no-import-assign
                isMyTurn = toggleIsMyTurn();
                updateInfoBoxTexture(isMyTurn);
            }

            firstCard = null;
            firstCardIndex = null;
            secondCard = null;
        }, 1000);
    }
}

function playerTurn(boxNumber, player) {
    if(amIOwner && locatedCards[0] === EMPTY) {
        locateCards();
    }
    if(!gameOver.status && isMyTurn) {
        let move = calculateRowAndColumn(boxNumber, boardX);
        let column = move[0];
        let row = move[1];

        if(logicBoard[row][column] === EMPTY) {
            makeAMove(boxNumber, row, column, player);
        }
    }
}

function checkWin() {
    if(!gameOver.status) {
        let over = true;

        for(let i = 0; i < boardY; ++i) {
            for(let j = 0; j < boardX; ++j) {
                if(logicBoard[i][j] === EMPTY) {
                    over = false;
                }
            }
        }

        if(over) {
            gameOver.status = true;

            if(yourScore > 5) {
                handleWin(actualPlayer);
            }
            else if(yourScore < 5) {
                handleWin('looser');
            }
            else { // draw
                playAudio("../audio/toByNic2.wav");
                handleEndGame();
            }
        }
    }
}

export {player1, player2, playerTurn,
    handleMessageFromSocket, boardX, boardY, locateCards, restartSettings};