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
          <user_photo/>
        <div class="userName">
          <h6>Username</h6>
          <h3>{{ FRIEND.username }}</h3>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Friends",
  components: {
    Menu,
    user_photo
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