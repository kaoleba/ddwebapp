
<template>
  <div >
     <iframe :src="`http://dj.lykyjt.com:8897/index`" frameborder="0" scrolling="auto" width="100%" height="100%"  style="overflow-y:scroll;" :style="{height: scrollerHeight}"></iframe>
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
        title: "临矿心声"
      });
      dd.ui.webViewBounce.disable();
    });
  },
  methods: {
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 48 + "px";
    }
  }
};
</script>

<style>

</style>
