<template>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        My account
      </div>

      <div v-if="logged">
        <strong> Hello, {{ logged }} </strong>
      </div>
    </div>

  </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Account",
  components: {Menu},
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