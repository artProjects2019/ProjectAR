<template>
  WebSocket
</template>

<script>
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import axios from "axios";
import {sessionKey} from "@/store/global-variables";

export default {
  name: "LobbyWebSocket",
  data() {
    return {
      stompClient: null,
      url: 'http://localhost:8080',
      firstPlayerUsername: '',
      secondPlayerUsername: '',
    };
  },
  methods: {
     connectToSocket() {
        let socket = new SockJS(this.url + "/api/websocket");
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, function (frame) {
            console.log("connected to the frame: " + frame);
            this.stompClient.subscribe("/topic/lobby/" + sessionKey.ID, function (response) {
                let message = response.body;
                console.log(message);
                this.methods.emitSessionData();
                console.log("drugi user: " + this.secondPlayerUsername);
            })
        })
    },
    sendMessageToSocket(message) {
        return axios.post('api/games/sessions/lobby', {
            message: message,
            sessionKey: sessionKey.ID,
        });
    },
    emitSessionData() {
      axios.get("api/games/sessions/" + sessionKey.ID).then(function (response) {
        this.firstPlayerUsername = response.data.firstPlayerUsername
        this.secondPlayerUsername = response.data.secondPlayerUsername
      }.bind(this))
      this.$emit('lobbyWebSocket', this.secondPlayerUsername);
      console.log("drugi user: " + this.secondPlayerUsername);
    },
  }
}
</script>

<style scoped>

</style>