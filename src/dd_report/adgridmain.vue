
<template>
  <div>
    <van-grid>
      <van-grid-item :icon="img5" text="建议测评排名" @click="openPage('/propReport')" />
      <van-grid-item :icon="img8" text="数据分析排名" @click="openPage('/analyReport')" />
      <van-grid-item :icon="img3" text="汇总统计排名" @click="openPage('/totalReport')" />
    </van-grid>
  </div>
</template>
<script>

import { Button, Grid, GridItem } from "vant";
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
Vue.use(Button)
  .use(Grid)
  .use(GridItem)
  .use(dd);

export default {
  mounted: function() {      
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "统计报表" 
      });
    });
  },
  data() {
    return {
      img1: require("../assets/雷达图.png"),
      img2: require("../assets/漏斗图.png"),
      img3: require("../assets/散点图.png"),
      img4: require("../assets/条状图.png"),
      img5: require("../assets/折线图.png"),
      img6: require("../assets/中国地图.png"),
      img7: require("../assets/柱状图.png"),
      img8: require("../assets/折线图1.png")
    };
  },
  methods:{
    openPage(path) {
      this.$router.push({
        path: path
      });
    },
  }
};
</script>


