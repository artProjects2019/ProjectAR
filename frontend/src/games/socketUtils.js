import axios from "axios";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

let socket = null;

function sendMessageToSocket(player, boxNumber, key) {
    return axios.post('api/games/gameMove', {
        player: player,
        boxNumber: boxNumber,
        sessionKey: key,
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

export {sendMessageToSocket, connectToSocket}