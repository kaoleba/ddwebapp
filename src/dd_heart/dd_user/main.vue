
<template>
  <div id="heartuser">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/heartuser/list" icon="like-o">心声云</van-tabbar-item>
      <!-- <van-tabbar-item replace to="/heartuser/policy" icon="paid">政策法规</van-tabbar-item> -->
      <van-tabbar-item replace to="/heartuser/email" icon="envelop-o">领导信箱</van-tabbar-item> 
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

  },
  methods: {
  }

};
</script>

<style>

</style>
