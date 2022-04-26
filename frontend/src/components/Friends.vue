<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Friends
      </div>
      <div id="players">
        <div class="player" v-for="(FRIEND) in friends " :key="FRIEND">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/person-icon.png" alt="User img">
          </div>
          Username<h1>{{ FRIEND.username }}</h1>
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
  name: "Friends",
  components: {
    Menu
  },
  data() {
    return {
      friends: [],
    };
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
    fetchFriends() {
      axios.get("api/friends/" + this.logged.username).then(function (response) {
        this.friends = response.data
      }.bind(this))
    },
  }
}
</script>