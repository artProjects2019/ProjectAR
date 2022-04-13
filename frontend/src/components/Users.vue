<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Players online
      </div>
      <div id="players">
      <div class="player" v-for="(user) in users " :key="user">
        <div class="personPhoto">
          <img class="person_img" src="../plugins/image/person-icon.png" alt="User img">
        </div>
        Username<h1>{{user.username}}</h1>
        <button class="add">
          <font-awesome-icon icon="plus" /> Add to friends
        </button>
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
