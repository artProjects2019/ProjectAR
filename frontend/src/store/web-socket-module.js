import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import axios from "axios";

const url = 'http://localhost:8080';
let stompClient;


function connectToSocket(key) {

    console.log("connecting to the lobby");
    let socket = new SockJS(url + "/api/websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("connected to the frame: " + frame);
        stompClient.subscribe("/topic/lobby/" + key, function (response) {
            let data = JSON.parse(response.body);
            console.log(data);
        })
    })
}

function sendMessageToSocket(message, key) {
    return axios.post('api/games/sessions/lobby', {
        message: message,
        sessionKey: key,
    });
}

export {connectToSocket, sendMessageToSocket}