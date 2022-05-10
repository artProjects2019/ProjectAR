<template>
  <div class="bar" style="color: white">
    {{ selectedGame.ID }}
  </div>
    <div class="session" v-if="this.selectedSession !== 'Private'">
      <div class="sessionButton">
        <button @click="$router.push('./' + selectedGame.ID)">
          Public session
        </button>
      </div>
      <div class="sessionButton">
        <button style="background-color: #4CAF50; color: white" @click="handlePrivateSession()">
          Private session
        </button>
      </div>
    </div>

  <div class="session"  v-if="this.selectedSession === 'Private'">
    <table id="tab">
      <tbody>
        <tr v-for="(FRIEND) in friends " :key="FRIEND">
          <td>
            {{ FRIEND.username }}
          </td>
          <td>
            <button class="invite" @click="handleSessionCreate(logged.username, FRIEND.username, selectedGame.ID)">
              Invite
            </button>
          </td>
          <div v-if="message && (selectedUser === FRIEND.username)"
               class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {game, sessionKey} from '../store/global-variables'
import axios from "axios";
import * as yup from "yup";
export default {
  name: "Game_session",
  data() {
    return {
      friends: [],
      selectedGame: game,
      selectedSession: '',
      message: "",
      selectedUser: "",
      successful: false,
      loading: false,
    }
  },
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    created(){
      setTimeout( () => this.$router.push({ path: '/lobby'}), 3000);
    },
    handlePrivateSession(){
      this.selectedSession = "Private";
    },
    fetchFriends() {
      axios.get("api/friends/" + this.logged.username).then(function (response) {
        this.friends = response.data
      }.bind(this))
    },
    handleSessionCreate(user, user2, game) {
      const session = yup.object().shape({
        firstPlayerUsername: yup.string(),
        secondPlayerUsername: yup.string(),
        game: yup.string(),
      });

      session.firstPlayerUsername = user;
      session.secondPlayerUsername = user2;
      session.game = game;
      this.selectedUser = user2;

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/sessionCreate", session).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
            sessionKey.ID = data.sessionKey;
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
  },
}
</script>
<style scoped>
.session{
  display: flex;
  align-items: center;
  justify-content: center;
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

#tab{
  color: white;
  background: #1c1e1e;
  font-size: 40px;
  text-align: center
}
#tab td{
  padding: 20px;
}
.invite{
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 2px solid black;
}
</style>