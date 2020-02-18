
<template>
  <div>
    <van-grid>
      <van-grid-item :icon="img1" text="分数排名" @click="openPage('分数排名')" />
      <van-grid-item :icon="img2" text="单位统计" @click="openPage('单位统计')" />
      <van-grid-item :icon="img3" text="任务报表" @click="openPage('任务报表')" />
      <van-grid-item :icon="img4" text="任务统计" @click="openPage('任务统计')" />
      <van-grid-item :icon="img5" text="分数排名" @click="openPage('分数排名')" />
      <van-grid-item :icon="img6" text="单位统计" @click="openPage('单位统计')" />
      <van-grid-item :icon="img7" text="任务报表" @click="openPage('任务报表')" />
      <van-grid-item :icon="img8" text="任务统计" @click="openPage('任务统计')" />
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
        title: "统计查询" //控制标题文本，空字符串表示显示默认文本
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
};
</script>


