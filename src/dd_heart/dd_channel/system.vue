
<template>
  <div>
    <van-cell-group>
      <van-field readonly v-model="title" required label="标题" size="large" />

      <van-field
        v-model="message"
        readonly
        required
        rows="4"
        autosize
        label="留言"
        type="textarea"
        size="large"
      />

      <van-field
        v-model="username"
        label="负责人"
        placeholder="请选择负责人"
        readonly
        @click="chooseUser"
        size="large"
        required
      />

      <van-field readonly="true" v-model="dept" required label="负责单位" size="large" />
      <!-- <van-row>
      <van-col span="14">-->
      <van-field v-model="type" required label="问题类型" size="large" :readonly="readonly" />
      <!-- </van-col> -->
      <!-- <van-col span="8">
          <van-checkbox
            v-model="checked"
            @change="changecheck"
            style="font-size:14px;margin-top:15px"
          >纪律作风</van-checkbox>
      </van-col>-->
      <!-- </van-row> -->
      <van-field
        v-model="convertmessage"
        required
        rows="4"
        autosize
        label="转办意见"
        type="textarea"
        size="large"
      />
    </van-cell-group>
    <van-button  type="danger" size="small" style="margin: 5px" @click="btnCancel">不回复</van-button>
    <van-button  type="info" size="small" style="margin: 5px" @click="btnConfirm">提交</van-button>
    <van-button
      v-if="!readonly"
      type="primary"
      size="small"
      style="margin: 5px"
      @click="btnSendHe"
    >纪律作风</van-button>
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
    window.console.log(this.entity);
    if (this.entity != undefined) {
      this.title = this.entity.title;
      this.message = this.entity.message;
      if (this.entity.nextcode == "hsj") {
        this.type = "纪律作风";
        this.readonly = true;
      }

    }
  },
  data() {
    return {
      entity: {},
      title: "",
      message: "",
      reply: "",
      type: "",
      readonly: false,
      checked: false,
      convertmessage: "",
      dept: "",
      username: "",
      dingid: "",
      code:""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      let _this = this;
      if (_this.username == "" || _this.type == ""||_this.convertmessage=="") {
        utils.AlertError("请填写必填内容");
        return;
      }

      axios
        .post(this.global.ddapi + "channel/SendReply", {
          username: _this.username,
          dingid: _this.dingid,
          code:_this.code,
          dept:_this.dept,
          convertmessage:_this.convertmessage,
          id: _this.entity.id,
          type:_this.type
        })
        .then(function(response) {
          if (response.data == "") {
            Toast.success("您的转办已提交成功");
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
    },
    btnSendHe() {
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否确认将纪律作风问题发送给何书记审核？"
      }).then(() => {
        axios
          .post(this.global.ddapi + "channel/SendHe", {
            id: _this.entity.id
          })
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
    },
    chooseUser() {
      let _this = this;
      dd.ready(function() {
        dd.biz.contact.complexPicker({
          title: "分管领导", //标题
          corpId: "ding50a1c2db19b1feb035c2f4657eb6378f", //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          appId: 821139979, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(result) {
            axios
              .get(_this.global.ddapi + "channel/GetDept?id="+result.users[0].emplId)
              .then(function(response) {
                _this.dept=response.data.dept;
                _this.code=response.data.userCode;
              })
              .catch(function(error) {
                utils.AlertError("操作失败：" + error);
              });

            _this.username = result.users[0].name;
            _this.dingid = result.users[0].emplId;
          }
        });
      });
    }
  }
};
</script>

<style>
</style>

