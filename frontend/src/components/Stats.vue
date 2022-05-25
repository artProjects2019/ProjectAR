<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <User_panel/>

        <div class="bar">
          Statistics
        </div>
      </div>

    </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import User_panel from "@/components/User_panel";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Statistics",
  components: {User_panel, Menu}
}
</script>