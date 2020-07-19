
<template>
  <div id="dd_channel_main">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/dd_channel/syslist" icon="todo-list-o">待处理</van-tabbar-item>
  
      <!-- <van-tabbar-item replace to="/heartuser/policy" icon="paid">政策法规</van-tabbar-item> -->
      <van-tabbar-item replace to="/dd_channel/alllist" icon="envelop-o">全部留言</van-tabbar-item> 
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
