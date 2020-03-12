
<template>
  <div id="pf" ref="pfscroll"> 
   <van-button
      :disabled="save"
      style="font-size:18px"
      type="primary"
      @click="btnConfirm"
      block
    >清除缓存</van-button>
  </div>
</template>
<script>
import {
  Button,
  Dialog
} from "vant";
import Vue from "vue";

Vue.use(Button).use(Dialog)

export default {
  methods: {
    btnConfirm() {
       localStorage.removeItem('抓基层党建述职评议测评');
       localStorage.removeItem('全面从严治党述职评议测评');
       Dialog.alert({ title: "提示", message: "提交缓存已清除" });
    }
  },
};
</script>


