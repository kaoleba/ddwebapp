
<template>
  <div>
    <van-cell-group>
      <van-field v-model="proposal_dept" readonly label="提报单位" />
      <van-field v-model="title" required label="建议标题" placeholder="请输入建议标题" ref="inputVal" />

      <van-field
        v-model="content"
        required
        rows="6"
        autosize
        label="建议内容"
        type="textarea"
        maxlength="300"
        placeholder="请输入建议内容"
        show-word-limit
        @blur="viewDefault"
      />

      <!-- <van-divider>督办</van-divider> -->
      <van-field
        v-model="host_dept"
        required
        label="主办部门"
        placeholder="请选择主办部门"
        readonly
        @click="chooseDept"
      />
      <van-field
        v-model="assisting_dept"
        label="协办部门"
        placeholder="请选择协办部门"
        readonly
        @click="chooseDepts"
      />
      <van-field
        v-model="host_user"
        label="分管领导"
        placeholder="请选择分管领导"
        readonly
        @click="chooseUser"
      />
    </van-cell-group>
    <van-row>
      <van-tag v-if="id" size="large" plain type="primary">{{state}}</van-tag>
    </van-row>

    <van-button type="info" size="small" style="  margin-top: 15px" @click="btnConfirm">保存</van-button>
    <van-button
      v-if="id"
      type="danger"
      size="small"
      style="  margin-top: 15px;margin-left:20px"
      @click="btnDelete"
    >删除</van-button>
    <van-button
      v-if="id"
      type="warning"
      size="small"
      style="  margin-top: 15px;margin-left:20px"
      @click="btnRate"
    >参评</van-button>
    <van-button
      v-if="id"
      type="primary"
      size="small"
      style="  margin-top: 15px;margin-left:20px"
      @click="btnCommit"
    >提交</van-button>
  </div>
</template>
<script>
import {
  NavBar,
  Toast,
  Button,
  Field,
  Cell,
  CellGroup,
  Dialog,
  Divider,
  Tag,
  Row
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";
import utils from "../util/utils";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(dd)
  .use(Divider)
  .use(Tag)
  .use(Row);

export default {
  mounted: function() {
    this.entity = this.$route.query.entity;
    if (this.entity != undefined) {
      this.id = this.entity.proposal_id;
      this.title = this.entity.proposal_title;
      this.content = this.entity.proposal_content;
      this.host_deptid = this.entity.host_deptid;
      this.host_dept = this.entity.host_dept;
      this.proposal_deptid = this.entity.proposal_deptid;
      this.proposal_dept = this.entity.proposal_dept;
      this.assisting_deptid = this.entity.assisting_deptid;
      this.assisting_dept = this.entity.assisting_dept;
      this.host_userid = this.entity.host_userid;
      this.host_user = this.entity.host_user;
      if (this.entity.state == "0") this.state = "未提交";
      if (this.entity.state == "1") this.state = "已提交";
      if (this.entity.state == "3") this.state = "已参评";
    } else {
      this.proposal_dept = window.ddUserInfo.remark;
      this.proposal_deptid = window.ddUserInfo.department[0];
      this.id = "";
      this.$nextTick(function() {
        this.$refs.inputVal.focus();
      }, 500);
    }
   
  },
  data() {
    return {
      title: "",
      content: "",
      id: "",
      entity: {},
      proposal_deptid: "",
      proposal_dept: "",
      host_deptid: "",
      host_dept: "",
      assisting_deptid: "",
      assisting_dept: "",
      host_userid: "",
      host_user: "",
      state: ""
    };
  },
  methods: {
    toAdd() {
      this.$router.push({ path: "/advicelist" });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      let _this = this;
      if (
        _this.title == "" ||
        _this.content == "" ||
        _this.host_dept == "" ||
        _this.proposal_dept == ""
      ) {
        utils.AlertError("请填写必填内容");
        return;
      }
      if (this.id != "" && this.state != "未提交") {
        utils.AlertError("该建议已提交");
        return;
      }

      axios
        .post(this.global.ddapi + "proposal", {
          proposal_id: _this.id,
          proposal_title: _this.title,
          proposal_content: _this.content,
          host_deptid: _this.host_deptid,
          host_dept: _this.host_dept,
          proposal_deptid: _this.proposal_deptid,
          proposal_dept: _this.proposal_dept,
          assisting_deptid: _this.assisting_deptid,
          assisting_dept: _this.assisting_dept,
          host_userid: _this.host_userid,
          host_user: _this.host_user,
          creatorid: window.ddUserInfo.userid,
          creator: window.ddUserInfo.name
        })
        .then(function(response) {
          if (response.data == "") {
            Toast.success("保存成功");
            _this.$router.go(-1);
          } else {
            utils.AlertError("保存失败：" + response.data);
          }
        })
        .catch(function(error) {
          utils.AlertError("保存失败：" + error);
        });
    },
    btnDelete() {
      if (this.state != "未提交") {
        utils.AlertError("已提交意见不能删除");
        return;
      }
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否删除本条建议？"
      }).then(() => {
        axios
          .delete(_this.global.ddapi + "proposal/" + _this.id)
          .then(function(response) {
            if (response.data == "") {
              Toast.success("删除成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("删除失败：" + JSON.stringify(response));
            }
          })
          .catch(function(error) {
            utils.AlertError("删除失败：" + error);
          });
      });
    },
    btnCommit() {
      if (this.state != "未提交") {
        utils.AlertError("该建议已提交");
        return;
      }
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "确认提交本条建议？"
      }).then(() => {
        axios
          .get(_this.global.ddapi + "proposal/UpdateState", {
            params: {
              id: _this.id,
              state: "1"
            }
          })
          .then(function(response) {
            if (response.data == "") {
              Toast.success("提交成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("提交失败：" + response.data);
            }
          })
          .catch(function(error) {
            utils.AlertError("提交失败：" + error);
          });
      });
    },
    btnRate() {
      if (this.state == "未提交") {
        utils.AlertError("请先提交再进行参评");
        return;
      }
      if (this.state == "已参评") {
        utils.AlertError("该建议已参评");
        return;
      }
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否将本条建议进行参评？"
      }).then(() => {
        axios
          .get(_this.global.ddapi + "proposal/UpdateState", {
            params: {
              id: _this.id,
              state: "3"
            }
          })
          .then(function(response) {
            if (response.data == "") {
              Toast.success("参评成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("参评失败：" + response.data);
            }
          })
          .catch(function(error) {
            utils.AlertError("参评失败：" + error);
          });
      });
    },
    chooseDept() {
      let _this = this;
      dd.ready(function() {
        dd.biz.contact.departmentsPicker({
          title: "主办单位", //标题
          corpId: "ding50a1c2db19b1feb035c2f4657eb6378f", //企业的corpId
          multiple: false, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxDepartments: 100, //最大选择部门数量
          appId: 390036208, //微应用的Id
          permissionType: "GLOBAL", //
          onSuccess: function(result) {
            _this.host_dept = result.departments[0].name;
            _this.host_deptid = result.departments[0].id;
          }
        });
      });
    },
    chooseDepts() {
      let _this = this;
      dd.ready(function() {
        dd.biz.contact.departmentsPicker({
          title: "协办单位", //标题
          corpId: "ding50a1c2db19b1feb035c2f4657eb6378f", //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxDepartments: 20, //最大选择部门数量
          appId: 390036208, //微应用的Id
          permissionType: "GLOBAL", //
          onSuccess: function(result) {
            var depstring = "";
            var depid = "";
            for (
              var k = 0, length = result.departments.length;
              k < length;
              k++
            ) {
              depstring = depstring + result.departments[k].name;
              depid = depid + result.departments[k].id;
              if (k != length - 1) {
                depstring = depstring + ";";
                depid = depid + ";";
              }
            }
            _this.assisting_dept = depstring;
            _this.assisting_deptid = depid;
          }
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
          maxUsers: 5, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: 390036208, //微应用的Id
          permissionType: "GLOBAL", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(result) {
            //alert(JSON.stringify(result.users[0]));
            _this.host_user = result.users[0].name;
            _this.host_userid = result.users[0].emplId;
          }
        });
      });
    }
  }
};
</script>

<style>
</style>

