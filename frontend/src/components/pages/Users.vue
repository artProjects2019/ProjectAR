<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <User_panel/>

        <div class="bar">
          Players online
        </div>
        <div id="players">
          <div class="player" v-for="(USER) in users " :key="USER">
            <user_photo/>
            <div class="userName">
              <h6>Username</h6>
              <h3>{{ USER.username }}</h3>
            </div>
            <div v-if="logged">
              <div v-if="!(USER.username === logged.username)">
                <button @click="handleInvite(logged.username, USER.username)" class="add" >
                  <font-awesome-icon icon="plus" /> Add to friends
                </button>
                <div v-if="message && (selectedUser === USER.username)"
                     class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                  {{ message }}
                </div>
              </div>

              <div v-if="(USER.username === logged.username)">
                <button class="add" @click="$router.push('./account')">
                  My account
                </button>
              </div>

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
import user_photo from "@/components/user/User_photo";
import * as yup from "yup";
import User_panel from "@/components/User_panel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  data() {
    return {
      users: [],
      successful: false,
      loading: false,
      message: "",
      selectedUser: "",
    };
  },
  components: {
    User_panel,
    Menu,
    user_photo
  },
  computed: {
    friends() {
      return this.$store.state.auth.accept;
    },
    logged() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers(){
      axios.get("api/users").then(function (response){
        this.users = response.data
      }.bind(this))
    },
    handleInvite(user, user2) {
      const invitation = yup.object().shape({
        sender: yup.string(),
        receiver: yup.string(),
      });

      invitation.sender = user;
      invitation.receiver = user2;
      this.selectedUser = user2;

      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/invite", invitation).then(
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
  },
};
</script>

<style>
.add{
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
