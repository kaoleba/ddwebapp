
<template>
  <div id="list">
    <van-swipe class="my-swipe" :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" style="height:230px;width:100%" />
      </van-swipe-item>
    </van-swipe>
<!-- <van-notice-bar 
  left-icon="volume-o"
  text="民生通道是临矿官网的民生通道的手机版;公会帮办由公会解决广大职工的实际问题;临矿心声是广大职工的吐槽天地"
/> -->
    <div style="">
      <van-grid :column-num="3">
        <van-grid-item :icon="img1" text="民生通道" @click="openPage('/channel_userlist')" />
        <!-- <van-grid-item :icon="img2" text="临矿心声" @click="openPage('/heart')" /> -->
        <van-grid-item :icon="img3" text="工会帮办" @click="openPage('/guild_userlist')" />
      </van-grid>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Grid, GridItem, NoticeBar } from "vant";
import * as dd from "dingtalk-jsapi";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(dd)
  .use(NoticeBar);

export default {
  data() {
    return {
      img1: require("../../assets/通道.png"),
      img2: require("../../assets/心声.png"),
      img3: require("../../assets/帮办.png"),
      images: ["http://221.2.76.14:8059/ddlast.jpg"]
    };
  },
  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "心声云"
      });
      dd.ui.webViewBounce.disable();
    });
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

<style>


.van-grid-item__icon {
  font-size: 48px;
}

.van-grid-item
{
  border: none;
}
</style>
