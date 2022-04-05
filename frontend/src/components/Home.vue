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
        O projekcie
      </div>

      <div class="soon">
        Projekt powstaje w ramach realizacji kursu Projekt zespołowy, organizowanym na Politechnice Wrocławskiej
        dla studentów III roku, kierunku Automatyka i Robotyka. Projekt tworzony jest we współpracy z
        wrocławskim odziałem firmy Iteratec.
      </div>
      <div class="soon">
        Projekt jest platformą obsługującą gry w alternatywnej rzeczywistości. Aktualnie projekt znajduje się we
        wczesnej fazie rozwoju, natomiast w przyszłości twórcy przewidują takie funkcjonalności jak:
        <br>
        - sesje gier (publiczna, prywatna) -<br>
        - statystyki gier oraz graczy -<br>
        - dodawanie znajomych -<br>
        - czat z użytkownikami -<br>
        - więcej gier -<br>
      </div>

      <div class="brake"></div>

      <div class="bar">
        Twórcy projektu
      </div>
      <div id= "people">
        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/salamandra.jpg" alt="Marcin Salamandra">
          </div>

          <h1>Marcin Salamandra</h1>
          <br>
          <div class="personText">
          Nie zadzieraj z tym okazem, bo nie ujdzie Ci to płazem.
          Stwór, który jest pod ochroną, wpisany w czerwoną księgę gatunków zagrożonych. Jest obślizgły, a na jego
          ciele możemy dostrzec pomarańczowe łaty (prawie takie jak u krowy, ale w przypadku krowy łaty są czarne).
          Odradzane jest głaskanie tego zwierzaka, gdyż jego śluz jest mocno trujący, może spowodować zaczerwienienia i
          czkawkę... Jeśli go spotkasz na leśnej polanie, uwiecznij tego stwora na swym ekranie.
          </div>
        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/los.jpg" alt="Lukasz Pawlos">
          </div>
          <h1>Łukasz Pawłoś</h1>
          <br>
          <div class="personText">
          Z uśmiechem na twarzy przemierza lasy, nigdy nie zchodzi z wyznoczonej trasy. Zwany przez  wielu jako król
          Bieszczadzkich Puszczy, zwierz, potężny i postawny, jest postrachem dla niedźwiedzi, wilków i strusi.
          Legendy mówią, że jest nieśmiertelny i pamięta czasy Jezusa, grał w karty ze Świętym Piotrem, odwiedził
          Atlantydę. W czasach Imperium Rzymskiego uważany był za osobę postawioną wyżej niż cesarz.
          Swoją nieśmiertelność zawdzięcza nieskończonej pętli while w której żyje.
          </div>

        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/remek.jpg" alt="Remigiusz Mielcarz">
          </div>
          <h1>Remigiusz Mielcarz</h1>
          <br>
          <div class="personText">
            To człowiek inteligentny, król znający wartość poezji, blyskotliwy generał, poliglota, koneser piękna
            (nie tylko tego kobiecego - potrafi docenić sztukę, architekturę) i zręczny złodziej: cała jego
            barbarzyńskość mieści się w niesamowitej woli życia, zwierzęcej czujności, żelaznej wytrzymałości,
            zabobonności oraz pogardy dla cywilizacji i jej praw, sprzecznych z naturą człowieka.

          </div>
        </div>
      </div>

      <div class="brake"></div>

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
export default {
  name: "Home-vue",
  data() {
    return {
      content: "",
    };
  },
};
</script>