<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Invitations
      </div>

      <div id="players" v-for="(INVITATION) in invitations " :key="INVITATION">
        <div class="player">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/person-icon.png" alt="User img">
          </div>
          Username<h1>{{ INVITATION.senderUsername }}</h1>

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
export default {
  name: "Friend_invitation",
  components: {
    Menu
  },
  data() {
    return {
      invitations: [],
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

.person_img{
  width: 40% !important;
  border-radius: 100%;
  border: 3px solid white;
}

</style>