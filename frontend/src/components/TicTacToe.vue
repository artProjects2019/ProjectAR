<template>
  <div id="startGame">
    START GAME <br>
    THERE<br>
    |<br>|<br>|<br>|<br>|<br>V<br>
  </div>
</template>

<script>
import {start} from "@/games/ticTacToe/drawTicTacToe";
export default {
  name: "TicTacToe",
  mounted() {
    start();
  },
  unmounted() {
    document.querySelectorAll("#ARButton").forEach(i=> i.remove());
    Array.from(document.querySelectorAll('body > div')).filter(i=> i.id!=='app').filter(i => !i.classList.contains('container')).forEach(i=> i.remove());
  }
}
</script>

<style>

#startGame{
  padding: 50px;
  font-size: 60px;
  color: white;
  text-align: center;
}

</style>