<template>
  <div>
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