<template>
  <body>
    <div class="container">
      <Menu/>

      <div id="main">
        <div class="bar">
          Ranking
        </div>

      <div class="wrapper">
        <div class="leaderboard_section">
          <div>
            <h2 style="text-align: center">
              <font-awesome-icon icon="ranking-star" /> TOP 5 PLAYER RANKING
            </h2>
          </div>

          <div class="leaderboard_wrap">
            <div class="leaderboard_item " style="display: block;">
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>1.</span> First</p>
                  <div class="bar_wrap">
                    <div class="inner_bar" style="width: 95%"></div>
                  </div>
                </div>
                <div class="points">
                  1195 points
                </div>
              </div>
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>2.</span>Second</p>
                  <div class="bar_wrap">
                    <div class="inner_bar" style="width: 80%"></div>
                  </div>
                </div>
                <div class="points">
                  1185 points
                </div>
              </div>
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>3.</span>Third</p>
                  <div class="bar_wrap">
                    <div class="inner_bar" style="width: 70%;"></div>
                  </div>
                </div>
                <div class="points">
                  1160 points
                </div>
              </div>
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>4.</span>Fourth</p>
                  <div class="bar_wrap">
                    <div class="inner_bar" style="width: 50%"></div>
                  </div>
                </div>
                <div class="points">
                  1130 points
                </div>
              </div>
              <div class="leaderboard_elem">
                <div class="name_bar">
                  <p><span>5.</span>Fifth</p>
                  <div class="bar_wrap">
                    <div class="inner_bar" style="width: 30%"></div>
                  </div>
                </div>
                <div class="points">
                  1110 points
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

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Ranking",
  components: {Menu}
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
  height: 400px;
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

.leaderboard_wrap{
  top: 70px;
  left: 40px;
  width: 100%;
  height: 95%;
  border-radius: 5px;
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
  color: #3a3d51;
}

.leaderboard_wrap .leaderboard_elem .name_bar p span{
  margin-right: 5px;
}

.leaderboard_wrap .leaderboard_elem .points{
  width: 100px;
  color: #3a3d51;
}

.leaderboard_wrap .leaderboard_elem .name_bar .bar_wrap{
  height: 5px;
  background: #000000;
  margin-top: 5px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.leaderboard_wrap .leaderboard_elem .name_bar .bar_wrap .inner_bar{
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  background: #ff0000;
}
</style>