import axios from "axios";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

let socket = null;

function sendMoveToSocket(player, boxNumber, key, action = 'gameMove') {
    return axios.post('api/games/gameMove', {
        player: player,
        boxNumber: boxNumber,
        sessionKey: key,
        action: action
    });
}

function sendCardsPositionToSocket(cards, key) {
    return axios.post('api/games/memory/cards', {
        cards: cards,
        sessionKey: key,
        action: 'positions'
    });
}

function connectToSocket(sessionKey, messageFromSocketHandler) {
    socket = new SockJS("https://ar-project2019.herokuapp.com/api/websocket");
    let stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            console.log(frame);
            stompClient.subscribe("/topic/game/" + sessionKey, response => {
                let message = JSON.parse(response.body);
                messageFromSocketHandler(message);
            });
        },
    );
}

export {sendMoveToSocket, connectToSocket, sendCardsPositionToSocket}