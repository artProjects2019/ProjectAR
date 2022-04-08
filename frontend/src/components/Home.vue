<template>
  <link rel="stylesheet" href="style.css"/>
  <body>
  <div class="container">
    <Menu/>
    <div id="main">
      <div id="top">
        <div id="topL">
          CHLEW
        </div>

        <div id="topR">
          <button id="login" @click="$router.push('./login')">
            <font-awesome-icon icon="sign-in-alt" /> Logowanie
          </button>

          <button id="signin" @click="$router.push('./register')">
            <font-awesome-icon icon="user-plus" /> Rejestracja
          </button>

        </div>

      </div>

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
        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/los.jpg" alt="Lukasz Pawlos">
          </div>
          <h1>Łukasz Pawłoś</h1>
          <br>

        </div>

        <div class="person">
          <div class="personPhoto">
            <img class="person_img" src="../plugins/image/remek.jpg" alt="Remigiusz Mielcarz">
          </div>
          <h1>Remigiusz Mielcarz</h1>
          <br>
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
  name: "Home-vue",
  components: {Menu},

  data() {
    return {
      content: "",
    };
  },
};
</script>