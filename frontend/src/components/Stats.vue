<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <div class="bar">
          Statistics
        </div>
      </div>

    </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Statistics",
  components: {Menu}
}
</script>