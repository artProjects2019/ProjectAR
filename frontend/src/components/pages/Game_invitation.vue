<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <User_panel/>

      <div class="bar">
        Game invitations
      </div>

      <div id="players" v-for="(INVITATION) in gameInvitations " :key="INVITATION">
        <div class="player">
          {{ INVITATION.game }}
          <div class="userName">
            <h6>Username</h6>
            <h3>{{ INVITATION.senderUsername }}</h3>
          </div>

          <div>
            <button @click="handleAcceptation(logged.username, INVITATION.senderUsername, INVITATION.sessionKey, INVITATION.game)" class="add">
              <font-awesome-icon icon="user-check" />
              Accept
            </button>
            <button @click="handleRejection(INVITATION.senderUsername, INVITATION.sessionKey)" class="decline">
              <font-awesome-icon icon="user-xmark" />
              Decline
            </button>
          </div>
          <div v-if="message && (selectedUser === INVITATION.senderUsername)"
               class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import axios from "axios";
import * as yup from "yup";
import { game } from "@/store/global-variables";
import Lobby from "@/components/pages/Lobby";
import User_panel from "@/components/User_panel";


export default {
  name: "Game_invitation",
  components: {
    User_panel,
    Menu,
  },
  data() {
    return {
      gameInvitations: [],
      successful: false,
      loading: false,
      message: "",
      selectedUser: "",
    };
  },
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
    rejected() {
      return this.$store.state.auth.rejected;
    }
  },
  mounted() {
    this.fetchInvitations();
  },
  methods: {
    fetchInvitations(){
      axios.get("api/games/invitations/" + this.logged.username).then(function (response) {
        this.gameInvitations = response.data
      }.bind(this))
    },
    handleAcceptation(receiver, sender, key, gameID) {
      const acceptation = yup.object().shape({
        receiver: yup.string(),
        key: yup.string(),
      });

      acceptation.receiver = receiver;
      acceptation.key = key
      this.selectedUser = sender;

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
            game.ID = gameID;
            localStorage.setItem('sessionKey', key);
            localStorage.setItem('owner', sender);
            Lobby.methods.sendMessageToSocket('joining', key);
            this.$router.push({ path: '/lobby'});
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
    handleRejection(sender, key) {
      const rejection = yup.object().shape({
        key: yup.string(),
      });

      rejection.key = key;
      this.selectedUser = sender;

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
            Lobby.methods.sendMessageToSocket('decline', key);
            this.fetchInvitations();
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
.decline{
  background-color: white; /* Green */
  color: black;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 2px solid black;
}
</style>