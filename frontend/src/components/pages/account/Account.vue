<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <User_panel/>

      <div class="bar">
        My account
      </div>

      <div v-if="logged" style="position: center">
        <strong> Hello, {{ logged.username }} </strong>
      </div>

      <Account_panel/>

    </div>
  </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import Account_panel from "@/components/pages/account/Account_panel";
import User_panel from "@/components/User_panel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  components: {User_panel, Menu, Account_panel},
  computed: {
    logged() {
      return this.$store.state.auth.user;
      },
    },
  mounted() {
    if (!this.logged) {
      this.$router.push('/login');
    }
  },
};
</script>