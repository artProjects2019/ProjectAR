<template>
  <body>
  <div class="container">
    <Menu/>
    <div id="main">
      <div id="top">
        <div id="topL">
          kVRnik - test
        </div>

        <div v-if="!logged" class="topR">
          <button id="login" @click="$router.push('./login')">
            <font-awesome-icon icon="sign-in-alt" /> Log in
          </button>

          <button id="signup" @click="$router.push('./register')">
            <font-awesome-icon icon="user-plus" /> Sign up
          </button>
        </div>

        <div v-if="logged" class="topR">
          <button id="user" @click="$router.push('./account')">
            <font-awesome-icon icon="user" /> {{logged.username}}
          </button>

          <button id="logout" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Log out
          </button>

        </div>
      </div>

      <div class="bar">
        About project
      </div>

      <div class="soon">
        The project is a part of the Team Project course organized at the Wrocław University of Technology
        for third-year students of Control Engineering and Robotics. The project is being created in cooperation with
        Wrocław branch of iteratec.
      </div>
      <div class="soon">
        The project is an augmented reality gaming platform.
        Currently, the project is at an early stage of development,
        while in the future, the developers envisage such functionalities as:
        <br>
        - game sessions (public, private) -<br>
        - statistics of games and players -<br>
        - adding friends -<br>
        - chat with users -<br>
        - more games -<br>
      </div>

      <div class="bar">
        Authors
      </div>
      <div id= "people">
        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/salamandra.jpg" alt="Marcin Salamandra">
          </div>

          <h1>Marcin Salamandra</h1>
          <br>
          <div class="brands">
            <div>
              <a href="https://github.com/salamaan">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/marcin.salamandra">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/salaman914/">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" /></h1>
              </a>
            </div>
          </div>
        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/los.jpg" alt="Lukasz Pawlos">
          </div>
          <h1>Łukasz Pawłoś</h1>
          <br>
          <div class="brands">
            <div>
              <a href="https://github.com/lukasz-pawlos">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/profile.php?id=100007344810188">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/losiek23/">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" /></h1>
              </a>
            </div>
          </div>
        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/remek.jpg" alt="Remigiusz Mielcarz">
          </div>
          <h1>Remigiusz Mielcarz</h1>
          <br>
          <div class="brands">
            <div>
              <a href="https://github.com/RemigiuszMielcarz">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.facebook.com/rimonelo">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" /></h1>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/remy00_/">
                <h1><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" /></h1>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="bar">
        <a href="https://www.iteratec.com/pl/">
          <img id="companyPhoto" src="../plugins/image/iteratec.png" alt="iteratec logo">
        </a>
      </div>
    </div>
  </div>
  </body>
</template>
<script>
import Menu from "@/components/Menu";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Menu
  },
  computed: {
    logged() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>