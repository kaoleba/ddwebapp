
<template>
  <div>
    <van-cell-group>
      <van-field readonly="true" v-model="entity.title" required label="标题" size="large" />

      <van-field
        v-model="entity.message"
        readonly="true"
        required
        rows="4"
        autosize
        label="留言"
        type="textarea"
        size="large"
      />

      <van-field v-model="entity.type" required label="问题类型" size="large" readonly="true" />

      <van-field
        v-model="entity.convertmessage"
        readonly="true"
        required
        rows="4"
        autosize
        label="转办意见"
        type="textarea"
        size="large"
      />

      <van-field
        v-model="entity.replymessage"
        required
        rows="4"
        autosize
        readonly="true"
        label="回复意见"
        type="textarea"
        size="large"
      />

      <van-field
        v-model="reply"
        required
        rows="4"
        autosize
        autofocus="true"
        label="拟发布"
        type="textarea"
        size="large"
      />
    </van-cell-group>
    <van-button v-if="!IfPub" type="info" size="small" style="margin: 5px" @click="btnConfirm">提交</van-button>
  </div>
</template>
<script>
import {
  Toast,
  Button,
  Field,
  Cell,
  CellGroup,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Row,
  Col
} from "vant";
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
  .use(dd)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Row)
  .use(Col);

export default {
  mounted: function() {
    
    this.entity = this.$route.query.entity;

    if (this.entity.reply != null) {
      this.reply = this.entity.reply;
      this.IfPub = true;
    }
  },
  data() {
    return {
      entity: {},
      reply: "",
      IfPub: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      let _this = this;
      if (_this.reply == "") {
        utils.AlertError("请填写拟发布回复");
        return;
      }

      axios
        .post(this.global.ddapi + "channel/SendFlow", {
          id: _this.entity.id,
          reply: _this.reply
        })
        .then(function(response) {
          if (response.data == "") {
            Toast.success("您的回复已提交成功");
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
};
</script>

<style>
</style>

