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
              <h3>{{ firstPlayerUsernameChange }}</h3>
            </div>
          </div>

          <div class="player" v-if="secondPlayerUsernameChange !== 'null'">
            <user_photo/>
            <div class="userName">
              <h6>Username</h6>
              <h3>{{ secondPlayerUsernameChange }}</h3>
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
            <button style="background-color: #4CAF50; color: white" @click="handlePrivateSession()">
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
import LobbyWebSocket from "@/components/LobbyWebSocket";
import {sessionKey} from "@/store/global-variables";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lobby",
  components: {Menu},
  data() {
    return {
      firstPlayerUsername: '',
      secondPlayerUsername: '',
    };
  },
  mounted() {
    this.fetchGameSessionUsers();
    LobbyWebSocket.methods.connectToSocket(sessionKey.ID);
    // eslint-disable-next-line vue/no-deprecated-events-api
    this.$on('lobbyWebSocket', (username) => { // here you need to use the arrow function
      this.secondPlayerUsername = username;
      console.log(this.secondPlayerUsername);
    })
  },
  computed: {
    firstPlayerUsernameChange() {
      return this.firstPlayerUsername;
    },
    secondPlayerUsernameChange() {
      return this.secondPlayerUsername;
    },
  },
  methods: {
    fetchGameSessionUsers() {
      axios.get("api/games/sessions/" + sessionKey.ID).then(function (response) {
        this.firstPlayerUsername = response.data.firstPlayerUsername
        this.secondPlayerUsername = response.data.secondPlayerUsername
      }.bind(this))
    },
  }
}
</script>

<style scoped>

</style>