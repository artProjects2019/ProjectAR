<template>
  <link rel="stylesheet" href="style.css"/>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Moje konto
      </div>
    </div>

  </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "Account-vue",
  components: {Menu}
}
</script>