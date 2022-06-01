<template>
  <div></div>
</template>

<script>
import {start} from "@/games/connectFour/drawConnectFour";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ConnectFour",
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
</style>