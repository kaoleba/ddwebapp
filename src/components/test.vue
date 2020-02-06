
<template>
  <div>
    Test
    1
  </div>
</template>
<script>

import Vue from "vue";
import * as dd from "dingtalk-jsapi";

Vue.use(dd);

export default {
  methods: {
    toAdd() {
      this.$router.push({ path: "/addadvice" });
    }
  },
  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "建议打分" //控制标题文本，空字符串表示显示默认文本
      });
    });
  }
};
</script>

<style>
</style>
