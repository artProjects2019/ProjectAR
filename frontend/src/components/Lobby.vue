<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <div class="bar">
          Lobby
        </div>
      </div>

      <div id="players">
        <div class="player">
          <user_photo/>
          <div class="userName">
            <h6>Username</h6>
            <h3>{{ session.firstPlayerUsername }}</h3>
          </div>
        </div>

        <div class="player" v-if="session.secondPlayer !== null">
          <user_photo/>
          <div class="userName">
            <h6>Username</h6>
            <h3>{{ session.secondPlayerUsername }}</h3>
          </div>
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
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import axios from "axios";
import {sessionKey} from "@/store/global-variables";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lobby",
  components: {Menu},
  data() {
    return {
      session: {},
      connection: null,
    };
  },
  mounted() {
    this.fetchGameSessionUsers();
  },
  created: function connectWebSocket(){
    console.log("Elo mordo");
    this.connection = new WebSocket('')
  },
  methods: {
    fetchGameSessionUsers() {
      axios.get("api/games/sessions/" + sessionKey.ID).then(function (response) {
        this.session = response.data
      }.bind(this))
    },
    isSecondPlayerInLobby() {

    }
  }
}
</script>

<style scoped>

</style>