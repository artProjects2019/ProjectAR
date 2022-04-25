<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <div class="bar">
          Players online
        </div>
        <div id="players">
          <div class="player" v-for="(USER) in users " :key="USER">
            <div class="personPhoto">
              <img class="person_img" src="../plugins/image/person-icon.png" alt="User img">
            </div>
            Username<h1>{{USER.username}}</h1>

            <div v-if="logged">
              <div v-if="!(USER.username === logged.username)">
                <button @submit="handleAdd" class="add">
                  <font-awesome-icon icon="plus" /> Add to friends
                </button>
                <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                  {{ message }}
                </div>
              </div>

              <div v-if="(USER.username === logged.username)">
                <button class="add" @click="$router.push('./account')">
                  My account
                </button>
              </div>

              <div v-if="friends" class="add">
                You are friends!
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  data() {
    return {
      users: [],
      successful: false,
      loading: false,
      message: "",
    };
  },
  components: { Menu},
  computed: {
    friends() {
      return this.$store.state.auth.friends;
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
    handleAdd(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/addFriend", user).then(
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
.player{
  background: #0c0c0c;
  width: 20% !important;
  margin: 5px !important;
  padding: 10px;
}
#players{
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

.person_img{
  width: 75% !important;
  border-radius: 100%;
  border: 3px solid white;
}
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
