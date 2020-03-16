
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
       localStorage.removeItem('纪委书记履职情况评议表');
       Dialog.alert({ title: "提示", message: "提交缓存已清除" });
    }
  },
};
</script>


