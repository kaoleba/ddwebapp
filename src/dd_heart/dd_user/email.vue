
<template>
  <div id="email">
      <img  src="../../assets/1.jpg" style="width:100%;margin:0px" />
  </div>
</template>
<script>
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
Vue.use(dd);

export default {
  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "领导信箱"
      });
      dd.ui.webViewBounce.disable();
    });
  },
  methods: {},
};
</script>

<style>

</style>
