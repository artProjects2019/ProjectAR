<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
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
import Account_panel from "@/components/Account_panel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  components: {Menu, Account_panel},
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