<template>
  <div id="menu">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div id="text">
          GAMES
        </div>

      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div class="dropdown-item" @click = "handleGame(games.id1)">
            TicTacToe
        </div>
          <div class="dropdown-item" @click = "handleGame(games.id2)">
            Checkers
          </div>
      </div>
    </div>
    <div class="option" @click="$router.push('./')">
          HOME
    </div>
    <div class="option" @click="$router.push('./users')">
          PLAYERS ONLINE
    </div>
    <div class="option" @click="$router.push('./ranking')">
        RANKING
    </div>
    <div class="option" @click="$router.push('./stats')">
        STATISTICS
    </div>
    <div v-if="logged" class="option" @click="$router.push('./friends')">
        FRIENDS
    </div>
  </div>
</template>

<script>
import {game} from '../store/global-variables'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu",
  data() {
    return {
      games: {
        id1 : "TicTacToe",
        id2 : "Checkers"
      },
    }
  },
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
  },
  methods:{
    handleGame(selectedGame){
      this.$router.push('./gameSession')
      game.ID = selectedGame
      return game;
    }
  }
  }
</script>
