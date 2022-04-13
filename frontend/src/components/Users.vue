<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Players online
      </div>

      <div class="player" v-for="(user) in users " :key="user">
        <img class="person_img" src="../plugins/image/person-icon.png" alt="User img">
        <h1>{{user.username}}</h1>
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
    return {users: []}
  },
  components: { Menu},

  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers(){
      axios.get("/users").then(function (response){
        this.users = response.data
      }.bind(this))
    }
  }
}
</script>

<style>
.player{
  display: flex;
  background: #0c0c0c;
}
</style>
