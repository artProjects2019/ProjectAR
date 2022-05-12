<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <div class="bar">
          Lobby
        </div>

        <div id="players">
          <div class="player">
            <user_photo/>
            <div class="userName">
              <h6>Username</h6>
              <h3>{{ firstPlayerUsername }}</h3>
            </div>
          </div>

          <div class="player" v-if="secondPlayerUsername !== 'null'">
            <user_photo/>
            <div class="userName">
              <h6>Username</h6>
              <h3>{{ secondPlayerUsername }}</h3>
            </div>
          </div>
        </div>

        <div class="session">
          <div class="sessionButton">
            <button @click="$router.push('./' + selectedGame.ID)">
              Start game
            </button>
          </div>
          <div class="sessionButton">
            <button style="background-color: #4CAF50; color: white" @click="$router.push('./' + selectedGame.ID)">
              Close session
            </button>
          </div>
        </div>

      </div>
    </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import axios from "axios";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lobby",
  components: {Menu},
  data() {
    return {
      firstPlayerUsername: '',
      secondPlayerUsername: '',
      socket: null,
      sessionKey: localStorage.getItem('sessionKey'),
    };
  },
  mounted() {
    this.fetchGameSessionUsers();
    this.connectToSocket(this.sessionKey);
  },
  methods: {
    connectToSocket: function() {
      this.socket = new SockJS("http://localhost:8080/api/websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            console.log(frame);
            this.stompClient.subscribe("/topic/lobby/" + this.sessionKey, response => {
              let message = response.body;
              console.log(message);
              this.fetchGameSessionUsers();
              console.log("drugi user: " + this.secondPlayerUsername);
            });
          },
      );
    },
    sendMessageToSocket(message, key) {
      return axios.post('api/games/sessions/lobby', {
        message: message,
        sessionKey: key,
      });
    },
    fetchGameSessionUsers() {
      axios.get("api/games/sessions/" + this.sessionKey).then(function (response) {
        this.firstPlayerUsername = response.data.firstPlayerUsername
        this.secondPlayerUsername = response.data.secondPlayerUsername
      }.bind(this))
    },
  }
}
</script>

<style scoped>
.session{
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
}

.sessionButton{
  padding: 10px;
}

.sessionButton button{
  background-color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 40px;
  border: 2px solid black;
  width: 400px;
  height: 100px;
}
</style>