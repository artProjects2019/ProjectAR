<template>
  <body>
  <div class="container">
      <Menu/>
      <div id="main">
        <User_panel/>

        <div class="bar">
          Ranking
        </div>

      <div class="wrapper">
        <div class="leaderboard_section">
          <div>
            <h2 style="text-align: center">
              <font-awesome-icon icon="ranking-star" /> PLAYER RANKING
            </h2>
          </div>

          <div class="leaderboard_wrap">
            <div class="leaderboard_item " style="display: block;" v-for="(RANKING, INDEX) in rankings " :key="RANKING">
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>{{ INDEX + 1}}</span> {{RANKING.username}} </p>
                  <div class="bar_wrap">
                    <div class="inner_bar" :style="`width: ${RANKING.score / maxScore * 100}% !important;`"></div>
                  </div>
                </div>
                <div class="points">
                  {{ RANKING.score }} points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import Menu from "@/components/Menu";
import User_panel from "@/components/User_panel";
import axios from "axios";

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Ranking",
  components: {User_panel, Menu},

  data() {
    return {
      rankings: [],
      successful: false,
      loading: false,
      message: "",
      maxScore: 0,
    };
  },
  mounted() {
    this.fetchRankings();
  },
  methods: {
    fetchRankings(){
      axios.get("api/ranking").then(function (response){
        this.rankings = response.data
        this.maxScore = this.rankings.at(0).score;
      }.bind(this))
    },
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

.leaderboard_section{
  width: 500px;
  margin: 100px auto 0;
  background: #4CAF50;
  padding: 25px 40px;
  position: relative;
  border-radius: 5px;
}

.leaderboard_section ul{
  display: flex;
}

.leaderboard_section ul li{
  margin-right: 50px;
  font-size: 18px;
  font-weight: 600;
  color: #3a3d51;
  cursor: pointer;
}

.leaderboard_wrap .leaderboard_elem{
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ff7373;
}

.leaderboard_wrap .leaderboard_elem:first-child{
  padding-top: 0;
}

.leaderboard_wrap .leaderboard_elem:last-child{
  padding-bottom: 0;
  border-bottom: 0;
}

.leaderboard_wrap .leaderboard_elem img{
  display: block;
}

.leaderboard_wrap .leaderboard_elem .name_bar{
  margin: 0 20px;
  width: calc(100% - 150px);
}

.leaderboard_wrap .leaderboard_elem .name_bar p{
  color: #000000;
}

.leaderboard_wrap .leaderboard_elem .name_bar p span{
  margin-right: 5px;
}

.leaderboard_wrap .leaderboard_elem .points{
  width: 100px;
  color: #000000;
}

.leaderboard_wrap .leaderboard_elem .name_bar .bar_wrap{
  height: 5px;
  background: #000000;
  margin-top: 5px;
  border-radius: 5px;
  position: relative;
}

.leaderboard_wrap .leaderboard_elem .name_bar .bar_wrap .inner_bar{
  position: relative;
  top: 0;
  left: -10px;
  height: 5px;
  background: #ffffff;
}
</style>