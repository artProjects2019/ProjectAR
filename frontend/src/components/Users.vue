<template>
  <link rel="stylesheet" href="style.css"/>
  <body>
  <div class="container">
    <Menu/>

    <div id="main">
      <div class="bar">
        Gracze Online
      </div>

      <div class="player">
        <img class="person_img" src="../plugins/image/person-icon.png" alt="Marcin Salamandra">
        Przykładowy gracz
      </div>

    </div>

  </div>
    </body>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  components: {Menu},
}
</script>

<style>
.player{
  display: flex;
  background: #0c0c0c;
}
</style>