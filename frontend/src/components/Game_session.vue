<template>
  <div class="bar" style="color: white">
    {{selectedGame.ID}}
  </div>
    <div class="session">
      <div class="sessionButton">
        <button @click="$router.push('./' + selectedGame.ID)">
          Public session
        </button>
      </div>
      <div class="sessionButton">
        <button style="background-color: #4CAF50; color: white">
          Private session
        </button>
      </div>
    </div>
</template>

<script>
import {game} from '../store/actual-game'
export default {
  name: "Game_session",
  data() {
    return {
      selectedGame: game
    }
  },
}
</script>
<style scoped>
.session{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
}

.sessionButton{
  padding: 10px;
}

.sessionButton button{
  background-color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 40px;
  border: 2px solid black;
  width: 400px;
  height: 100px;
}
</style>