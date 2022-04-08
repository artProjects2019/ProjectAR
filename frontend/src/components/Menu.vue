<template>
  <div id="menu">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div id="text">
          GRY
        </div>

      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div class="dropdown-item">
          <router-link
              style ="text-decoration: none; color: black;"
              to="./ticTacToe">
            TicTacToe
          </router-link>
        </div>
      </div>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./">
        HOME
      </router-link>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./users">
        GRACZE ONLINE
      </router-link>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./ranking">
        RANKING
      </router-link>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./stats">
        STATYSTYKI
      </router-link>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./account">
        KONTO
      </router-link>
    </div>

    <div class="option">
      <router-link
          style ="text-decoration: none; color: white;"
          to="./friends">
        ZNAJOMI
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu"
}
</script>
