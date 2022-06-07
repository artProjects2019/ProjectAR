<template>
  <div></div>
</template>

<script>
import {start} from "@/games/ticTacToe/drawTicTacToe";
export default {
  name: "TicTacToe",
  mounted() {
    start();
    this.startTheGame();
  },
  unmounted() {
    document.querySelectorAll("#ARButton").forEach(i=> i.remove());
    Array.from(document.querySelectorAll('body > div')).filter(i=> i.id!=='app').filter(i => !i.classList.contains('container')).forEach(i=> i.remove());
  },
  methods: {
    touchArButton() {
       document.getElementById("ARButton").click();
    },
    startTheGame(){
      setTimeout( () => this.touchArButton(), 0.0001);
    },
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