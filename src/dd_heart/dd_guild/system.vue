
<template>
  <div>
    <van-cell-group>
      <van-field v-model="entity.username" readonly label="提交人" size="large" />
      <van-field v-model="entity.mobile" readonly label="手机号" size="large" />
      <van-field v-model="entity.dept" readonly label="单位" size="large" />
      <van-field readonly v-model="entity.title" label="标题" size="large" />
      <van-field readonly v-model="entity.type" label="类别" size="large" />
      <van-field
        v-model="entity.content"
        readonly
        required
        rows="1"
        autosize
        label="内容"
        type="textarea"
        size="large"
      />
      <div id="dd_guild_add" style="margin-left:15px">
        <van-uploader v-model="fileList" multiple :deletable="false" :show-upload="false" />
      </div>
      <van-field
        v-model="zpusername"
        label="负责人"
        placeholder="请选择负责人"
        readonly
        @click="chooseUser"
        size="large"
        required
      />

      <van-field readonly v-model="cldept" required label="负责单位" size="large" />
    </van-cell-group>
    <van-button type="danger" size="small" style="margin: 5px" @click="btnCancel">不处理</van-button>
    <van-button type="info" size="small" style="margin: 5px" @click="btnConfirm">提交</van-button>
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
  Col,
  Uploader
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
  .use(Col)
  .use(Uploader);

export default {
  mounted: function() {
    this.entity = this.$route.query.entity;
    window.console.log(this.entity);
    if (this.entity != undefined) {
      var images = this.entity.image.split(",");
      for (var i = 0; i < images.length; i++) {
        if (images[i] != "")
          this.fileList.push({ url: this.global.imageurl + images[i] });
      }
    }
  },
  data() {
    return {
      entity: {},
      cldept: "",
      zpusername: "",
      zpdingid: "",
      fileList: []
    };
  },
  methods: {
    btnConfirm() {
      let _this = this;
      if (_this.zpusername == "") {
        utils.AlertError("请选择负责人！");
        return;
      }

      axios
        .post(this.global.ddapi + "guild/SendReply", {
          zpdingid: _this.zpdingid,
          zpusername: _this.zpusername,
          cldept: _this.cldept,
          cldingid: window.ddUserInfo.userid,
          clusername: window.ddUserInfo.name,
          id: _this.entity.id
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
        message: "是否确认不处理本条诉求？"
      }).then(() => {
        axios
          .delete(_this.global.ddapi + "guild/" + _this.entity.id)
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
          appId: 821201450, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(result) {
            axios
              .get(
                _this.global.ddapi +
                  "channel/GetDept?id=" +
                  result.users[0].emplId
              )
              .then(function(response) {
                _this.cldept = response.data.dept;
                _this.code = response.data.userCode;
              })
              .catch(function(error) {
                utils.AlertError("操作失败：" + error);
              });

            _this.zpusername = result.users[0].name;
            _this.zpdingid = result.users[0].emplId;
          }
        });
      });
    }
  }
};
</script>

<style>
#dd_guild_add {
  text-align: left;
}
</style>

