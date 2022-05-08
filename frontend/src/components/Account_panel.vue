<template>
  <div class="panel">
    <div class="panel_option">
      <button class="option_button" @click="$router.push('./changePassword')">
      Change password
      </button>
    </div>
    <div class="panel_option">
      <button class="option_button" @click="$router.push('./friends')" >
      My friends
      </button>
    </div>
    <div class="panel_option">
      <button class="option_button" @click="$router.push('./friendInvitation')">
      Friend invitations
      </button>
    </div>
    <div class="panel_option">
      <button class="option_button" @click="$router.push('./gameInvitation')">
        Game invitations
      </button>
    </div>
    <div class="panel_option">
      <button class="option_button">
      Delete account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account_panel"
}
</script>

<style scoped>
.panel{
  display: flex;
  justify-content: space-around;
}

.panel_option{
}

.option_button{
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 2px solid black;
}
</style>