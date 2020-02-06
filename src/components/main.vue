
<template>
  <div id="app">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/main/advicelist" icon="todo-list-o">建议提报</van-tabbar-item>
      <van-tabbar-item replace to="/main/ratelist" icon="sign">建议评分</van-tabbar-item>
      <van-tabbar-item replace to="/main/gridmain" icon="chart-trending-o">统计查询</van-tabbar-item>
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
        title: "建议提报"
      });
      dd.ui.webViewBounce.disable();
    });
  },
  methods: {
    toAdd() {
      this.$router.push({ path: "/addadvice" });
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
  padding: 0px;
}
</style>
