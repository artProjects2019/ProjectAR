<template>
  <div id="top">
    <div id="topL">
      kVRnik
    </div>

    <div v-if="!logged" class="topR">
      <button id="login" @click="$router.push('./login')">
        <font-awesome-icon icon="sign-in-alt" /> Log in
      </button>

      <button id="signup" @click="$router.push('./register')">
        <font-awesome-icon icon="user-plus" /> Sign up
      </button>
    </div>

    <div v-if="logged" class="topR">
      <button id="user" @click="$router.push('./account')">
        <font-awesome-icon icon="user" /> {{logged.username}}
      </button>

      <button id="logout" @click.prevent="logOut">
        <font-awesome-icon icon="sign-out-alt" /> Log out
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "User_panel",
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>