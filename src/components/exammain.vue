
<template>
  <div id="advicemain">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/exammain/userrank" icon="bar-chart-o">个人排名</van-tabbar-item>
      <van-tabbar-item replace to="/exammain/deptrank" icon="chart-trending-o">单位综合排名</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Button } from "vant";
import * as dd from "dingtalk-jsapi";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(dd);

export default {
  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "个人排名"
      });
      dd.ui.webViewBounce.disable();
    });
  },
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
  padding: 0px;
}
</style>
