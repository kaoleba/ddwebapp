
<template>
  <div>
    <van-cell-group>
      <van-field readonly v-model="entity.title" required label="标题" size="large" />

      <van-field
        v-model="entity.message"
        readonly
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
        readonly
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
        readonly
        label="回复意见"
        type="textarea"
        size="large"
      />

      <van-field
        v-model="entity.reply"
        required
        rows="4"
        autosize
        readonly
        label="拟发布"
        type="textarea"
        size="large"
      />
    </van-cell-group>
    <van-button v-if="!IfPub" type="danger" size="small" style="margin: 5px" @click="btnCancel">拒绝</van-button>
    <van-button v-if="!IfPub" type="info" size="small" style="margin: 5px" @click="btnConfirm">同意</van-button>
    <van-button v-if="IfPub" type="primary" size="small" style="margin: 5px" @click="btnConfirm">发布</van-button>
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
    if(this.entity.nextcode=='pub' )
      this.IfPub=true
  },
  data() {
    return {
      entity: {},
      IfPub:false
    };
  },
  methods: {
    btnConfirm() {
      let _this = this;

      axios
        .post(this.global.ddapi + "channel/SaveFlow", {
          id: _this.entity.id
        })
        .then(function(response) {
          if (response.data == "") {
            Toast.success("您的操作已提交成功");
            _this.$router.go(-1);
          } else {
            utils.AlertError("保存失败：" + response.data);
          }
        })
        .catch(function(error) {
          alert(error);
          utils.AlertError("保存失败：" + error);
        });
    },
    btnCancel() {
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否确认不回复本条留言？"
      }).then(() => {
        axios
          .delete(_this.global.ddapi + "channel/" + _this.entity.id)
          .then(function(response) {
            if (response.data == "") {
              Toast.success("操作成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("操作失败：" + JSON.stringify(response));
            }
          })
          .catch(function(error) {
            utils.AlertError("操作失败：" + error);
          });
      });
    }
  }
};
</script>

<style>
</style>

