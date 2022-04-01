<template>
  <link rel="stylesheet" href="style.css"/>
  <body>
  <div class="container">
    <div id="menu">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            GAMES
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-item">
              <router-link
                  style ="text-decoration: none;color: #1c1e1e;"
                  to="./TicTacToe">
                TicTacToe
              </router-link>
            </div>
          </div>
        </div>

      <div class="option">ONLINE PLAYERS</div>
      <div class="option">RANKING</div>
      <div class="option">STATS</div>
      <div class="option">MY ACCOUNT</div>
      <div class="option">FRIENDS</div>
      <div class="option">NEWS</div>
    </div>

    <div id="main">
      <div id="top">
        <div id="topL">
          kVRnik
        </div>

        <div id="topR">
          <button id="login" @click="$router.push('./login')">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </button>

          <button id="signin" @click="$router.push('./register')">
            <font-awesome-icon icon="user-plus" /> Sign In
          </button>

        </div>

      </div>

      <div class="brake"></div>

      <div class="bar">
        <h1>O projekcie</h1>
      </div>

      <div class="soon">
        Coming soon...
      </div>

      <div class="brake"></div>

      <div class="bar">
        <h1>Twórcy projektu</h1>
      </div>
      <div id= "people">
        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/salamandra.jpg" alt="Marcin Salamandra">
          </div>

          <h1>Marcin Salamandra</h1>
          Mauris pretium est eget accumsan pretium. In tincidunt venenatis lorem, non lobortis lacus
          condimentum nec. Vestibulum a ligula arcu. Sed in nunc sit amet risus lacinia accumsan iaculis
          sed nisi. Nulla sagittis consectetur velit sed consequat. Nunc eleifend in leo in dictum.
          Morbi imperdiet elementum auctor. Vivamus id lorem erat. Nullam molestie interdum ipsum id
          consequat. Cras ac magna ipsum. Pellentesque nunc justo, fermentum id pellentesque nec, rutrum
          at ipsum. Morbi elementum magna in orci lobortis, ut porta odio ornare. Cras elementum magna ac
          turpis tristique ultricies.
        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/los.jpg" alt="Lukasz Pawlos">
          </div>
          <h1>Łukasz Pawłoś</h1>
          Mauris pretium est eget accumsan pretium. In tincidunt venenatis lorem, non lobortis lacus
          condimentum nec. Vestibulum a ligula arcu. Sed in nunc sit amet risus lacinia accumsan iaculis
          sed nisi. Nulla sagittis consectetur velit sed consequat. Nunc eleifend in leo in dictum.
          Morbi imperdiet elementum auctor. Vivamus id lorem erat. Nullam molestie interdum ipsum id
          consequat. Cras ac magna ipsum. Pellentesque nunc justo, fermentum id pellentesque nec, rutrum
          at ipsum. Morbi elementum magna in orci lobortis, ut porta odio ornare. Cras elementum magna ac
          turpis tristique ultricies.

        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/remek.jpg" alt="Remigiusz Mielcarz">
          </div>
          <h1>Remigiusz Mielcarz</h1>
          Mauris pretium est eget accumsan pretium. In tincidunt venenatis lorem, non lobortis lacus
          condimentum nec. Vestibulum a ligula arcu. Sed in nunc sit amet risus lacinia accumsan iaculis
          sed nisi. Nulla sagittis consectetur velit sed consequat. Nunc eleifend in leo in dictum.
          Morbi imperdiet elementum auctor. Vivamus id lorem erat. Nullam molestie interdum ipsum id
          consequat. Cras ac magna ipsum. Pellentesque nunc justo, fermentum id pellentesque nec, rutrum
          at ipsum. Morbi elementum magna in orci lobortis, ut porta odio ornare. Cras elementum magna ac
          turpis tristique ultricies.
        </div>
      </div>

      <div class="bar">
        <a href="https://www.iteratec.com/pl/">
          <img id="companyPhoto" src="../plugins/image/iteratec.png" alt="iteratec logo">
        </a>

      </div>

      <div class="soon">
        Coming soon...
      </div>

    </div>
  </div>
  </body>
</template>
<script>
export default {
  name: "Home-vue",
  data() {
    return {
      content: "",
    };
  },
};
</script>