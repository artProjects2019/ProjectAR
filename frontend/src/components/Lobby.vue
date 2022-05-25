<template>
  <body>
    <div class="container">

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
          <div class="sessionButton"
               v-if="secondPlayerUsername !== 'null' && logged === owner">
            <button @click=startGame(sessionKey)>
              Start game
            </button>
          </div>
          <div class="sessionButton">
            <button style="background-color: #4CAF50; color: white" @click=closeSession(sessionKey)>
              Close session
            </button>
          </div>
        </div>

      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import * as yup from "yup";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import { game } from '@/store/global-variables'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lobby",
  data() {
    return {
      firstPlayerUsername: '',
      secondPlayerUsername: '',
      socket: null,
      sessionKey: localStorage.getItem('sessionKey'),
      owner: localStorage.getItem('owner'),
      selectedGame: game,
      successful: false,
      loading: false,
      message: '',
    };
  },
  mounted() {
    this.fetchGameSessionUsers();
    this.connectToSocket(this.sessionKey);
  },
  computed: {
    logged() {
      console.log(this.$store.state.auth.user.username);
      console.log(this.owner);
      return this.$store.state.auth.user.username;
    },
  },
  methods: {
    closeSession: function (key) {
      const rejection = yup.object().shape({
        key: yup.string(),
      });

      rejection.key = key;

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/gameDecline", rejection).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
            this.$router.push({ path: '/'});
            this.sendMessageToSocket('closing', key);
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      )
    },
    startGame(sessionKey) {
      this.sendMessageToSocket('starting', sessionKey);
      this.$router.push({ path: './' + this.selectedGame.ID});
    },
    connectToSocket: function() {
      this.socket = new SockJS("https://ar-project2019.herokuapp.com/api/websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            console.log(frame);
            this.stompClient.subscribe("/topic/lobby/" + this.sessionKey, response => {
              let message = response.body;

              switch(message) {
                case 'joining': {
                  this.fetchGameSessionUsers();
                  break;
                }
                case 'starting': {
                  this.$router.push({ path: './' + this.selectedGame.ID});
                  break;
                }
                case 'closing': {
                  this.$router.push({ path: '/'});
                  break;
                }
                case 'decline': {
                  this.$router.push({ path: '/'});
                  break;
                }
              }
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