
<template>
  <div>

    <van-cell-group>
      <van-field
        :readonly="read"
        v-model="title"
        required
        label="标题"
        placeholder="请输入标题"
        ref="inputVal"
        size="large"
      />

      <van-field
        v-model="message"
        :readonly="read"
        required
        rows="8"
        autosize
        label="留言"
        type="textarea"
        placeholder="请输入留言内容"
        size="large"
      />
      <van-field
        v-model="reply"
        v-if="!IfNew" 
        :readonly="read"
        required
        rows="8"
        autosize
        label="回复"
        type="textarea"
        size="large"
      />
    </van-cell-group>
    <van-button v-if="IfNew"  type="info" size="small" style="margin-top: 15px" @click="btnConfirm">提交</van-button>
  </div>
</template>
<script>
 import {  Toast, Button, Field, Cell, CellGroup, Dialog } from "vant";
 import * as dd from "dingtalk-jsapi";
 import Vue from "vue";
 import axios from "axios";
 import utils from "../../util/utils";

Vue.use(Button)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(dd);

export default {
  mounted: function() {
    this.entity = this.$route.query.entity;
    if (this.entity != undefined) {
      this.title = this.entity.title;
      this.message = this.entity.message;
      this.reply = this.entity.reply;
      this.IfNew=false;
      this.read=true;
    }
  },
  data() {
    return {
      title: "",
      message: "",
      reply:"",
      IfNew:true,
      read:false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
     
      let _this = this;
      if (_this.title == "" || _this.message == "") {
        utils.AlertError("请填写必填内容");
        return;
      }

      axios
        .post(this.global.ddapi + "channel/SaveMessage", {
          title: _this.title,
          message: _this.message
        })
        .then(function(response) {
          if (response.data == "") {
            Toast.success("您的留言已提交成功");
            _this.$router.go(-1);
          } else {
            utils.AlertError("保存失败：" + response.data);
          }
        })
        .catch(function(error) {
          alert(error);
          utils.AlertError("保存失败：" + error);
        });
    }
  }
}
</script>

<style>
</style>

