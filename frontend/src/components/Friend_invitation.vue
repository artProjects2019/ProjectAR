<template>
  <body>
  <div class="container">
    <Menu/>
    <div id="main">
      <User_panel/>

      <div class="bar">
        Friend invitations
      </div>

      <div id="players" v-for="(INVITATION) in invitations " :key="INVITATION">
        <div class="player">
          <user_photo/>
        <div class="userName">
          <h6>Username</h6>
          <h3>{{ INVITATION.senderUsername }}</h3>
        </div>

          <div>
            <button @click="handleAcceptation(INVITATION.senderUsername, logged.username)" class="add">
              <font-awesome-icon icon="user-check" />
              Accept
            </button>
            <button @click="handleRejection(INVITATION.senderUsername, logged.username)" class="decline">
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
import user_photo from "@/components/User_photo";
import * as yup from "yup";
import User_panel from "@/components/User_panel";
export default {
  name: "Friend_invitation",
  components: {
    User_panel,
    Menu,
    user_photo
  },
  data() {
    return {
      invitations: [],
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
      axios.get("api/friends/invitations/" + this.logged.username).then(function (response) {
        this.invitations = response.data
      }.bind(this))
    },
    handleAcceptation(user, user2) {
      const acceptation = yup.object().shape({
        sender: yup.string(),
        receiver: yup.string(),
      });

      acceptation.sender = user;
      acceptation.receiver = user2;
      this.selectedUser = user;

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/accept", acceptation).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
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
    handleRejection(user, user2) {
      const rejection = yup.object().shape({
        sender: yup.string(),
        receiver: yup.string(),
      });

      rejection.sender = user;
      rejection.receiver = user2;
      this.selectedUser = user;

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/decline", rejection).then(
          (data) => {
            this.message = (data.response &&
                    data.response.data &&
                    data.response.data.message) ||
                data.message ||
                data.toString();
            this.successful = true;
            this.loading = true;
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