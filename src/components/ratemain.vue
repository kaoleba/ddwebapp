
<template>
  <div id="ratemain">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/ratemain/ratelist" icon="sign">建议评分</van-tabbar-item>
      <van-tabbar-item replace to="/ratemain/analyratelist" icon="completed">数据评分</van-tabbar-item>
      <van-tabbar-item replace to="/ratemain/adgridmain" icon="chart-trending-o">统计报表</van-tabbar-item> 
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
        title: "建议评分"
      });
      dd.ui.webViewBounce.disable();
    });
  },
  methods: {
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
  padding: 0px;
}
</style>
