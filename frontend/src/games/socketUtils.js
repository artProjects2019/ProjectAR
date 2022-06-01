import axios from "axios";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {actualPlayer, calculateRowAndColumn, isMyTurn, logicBoard} from "@/games/gameUtils";

let socket = null;

function sendMessageToSocket(player, boxNumber, key) {
    return axios.post('api/games/gameMove', {
        player: player,
        boxNumber: boxNumber,
        sessionKey: key,
    });
}

function connectToSocket(sessionKey, winHandler, drawHandler, boardX, boardY, updateTexture, updateInfoBoxTexture) {
    socket = new SockJS("https://ar-project2019.herokuapp.com/api/websocket");
    let stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            console.log(frame);
            stompClient.subscribe("/topic/game/" + sessionKey, response => {
                let message = JSON.parse(response.body);

                let boxNumber = message.boxNumber;
                let move = calculateRowAndColumn(boxNumber, boardX);
                let column = move[0];
                let row = move[1];
                let player = message.player;

                if(player !== actualPlayer) {
                    logicBoard[row][column] = player;
                    updateTexture(boxNumber, player);
                    winHandler(player);
                    drawHandler(boardX, boardY);
                    // eslint-disable-next-line no-import-assign
                    isMyTurn = true;
                    updateInfoBoxTexture(actualPlayer, isMyTurn);
                }
            });
        },
    );
}

export {sendMessageToSocket, connectToSocket}