<template>
  <div></div>
</template>

<script>
import {start} from "@/games/memory/drawMemory";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Memory",
  mounted() {
    start();
  },
  unmounted() {
    document.querySelectorAll("#VRButton").forEach(i=> i.remove());
    Array.from(document.querySelectorAll('body > div')).filter(i=> i.id!=='app').filter(i => !i.classList.contains('container')).forEach(i=> i.remove());
  },
}
</script>

<style>
</style>