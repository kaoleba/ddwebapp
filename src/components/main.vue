
<template>
  <div id="app">
    <router-view />
<van-tabbar route>
  <van-tabbar-item replace to="/main/advicelist" icon="todo-list-o">
    建议提报
  </van-tabbar-item>
  <van-tabbar-item replace to="/main/test" icon="sign">
    建议打分
  </van-tabbar-item>
  <van-tabbar-item replace to="/main/test" icon="chart-trending-o">
    统计
  </van-tabbar-item>
</van-tabbar>

  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Button  } from 'vant';

Vue.use(Tabbar).use(TabbarItem).use(Button);



export default {
  methods:
  {
    toAdd()
    {

      this.$router.push({ path: '/addadvice' });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0px;
  padding:0px;
}
</style>
