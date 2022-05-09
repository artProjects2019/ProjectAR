<template>
  <div class="bar" style="color: white">
    Session
  </div>
  <div class="session">
    <div class="sessionButton">
      <button @click="$router.push('./' + selectedGame.ID)">
        Start game
      </button>
    </div>
    <div class="sessionButton">
      <button style="background-color: #4CAF50; color: white" @click="sessionClose(theSessionKey.ID)">
        Close session
      </button>
    </div>
  </div>
</template>

<script>
import {game, sessionKey} from '../store/global-variables'
import axios from "axios";
import * as yup from "yup";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Session",

  data() {
    return {
      gameSession: [],
      theSessionKey: sessionKey,
      selectedGame: game,
    }
  },
  mounted() {
    this.fetchSession();
  },
  methods: {
    fetchSession(){
      axios.get("api/games/invitations/" + this.logged.username).then(function (response) {
        this.gameSession = response.data
      }.bind(this))
    },

    sessionClose(key) {
      const acceptation = yup.object().shape({
        key: yup.string(),
      });

      acceptation.key = key

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/gameAccept", acceptation).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
            this.created();
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
      );
    },

  }
}
</script>

<style scoped>

</style>