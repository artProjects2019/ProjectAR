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
            <button class="add">
              <font-awesome-icon icon="user-check" />
              Accept
            </button>
            <button class="decline">
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
export default {
  name: "Friend_invitation",
  components: {Menu},

  data() {
    return {
      invitations: [],
    };
  },
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.fetchInvitations();
  },
  methods: {
    fetchInvitations(){
      axios.get("api/friends/invitations/" + this.logged.username).then(function (response) {
        this.invitations = response.data
      }.bind(this))
    }
  },
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