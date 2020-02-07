
<template>
  <div>
    <van-cell-group>
      <van-field value="大数据中心" readonly label="提报单位" />
      <van-field v-model="title" required label="建议标题" placeholder="请输入建议标题" ref="inputVal" />

      <van-field
        v-model="message"
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
        v-model="dept"
        required
        label="主办部门"
        placeholder="请选择主办部门"
        readonly
        @click="chooseDept"
      />
      <van-field v-model="depts" label="协办部门" placeholder="请选择协办部门" readonly @click="chooseDepts" />
      <van-field
        v-model="deptuser"
        label="分管领导"
        placeholder="请选择分管领导"
        readonly
        @click="chooseUser"
      />
    </van-cell-group>

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
  Divider
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(dd)
  .use(Divider);

export default {
  mounted: function() {
    this.id = this.$route.query.id;
    if (this.id != undefined) {
      this.title = this.$route.query.title;
      this.message = this.$route.query.message;
      this.dept = "大数据中心";
      this.depts = "办公室;通防处";
      this.deptuser = "陆永生";
    } else {
      this.$nextTick(function() {
        this.$refs.inputVal.focus();
      }, 500);
    }

    axios
      .get(
        "http://111.229.134.36:8033/api/DD/GetConfig?url=http://p4h2rb.natappfree.cc/#/advicemain/advicelist"
      )
      //then获取成功；response成功后的返回值（对象）
      .then(response => {
        window.console.log(response.data);
        var res = JSON.parse(response.data).content;

        dd.config({
          agentId: "350136488", // 必填，微应用ID
          corpId: res.CorpId, //必填，企业ID
          timeStamp: res.TimeStamp, // 必填，生成签名的时间戳
          nonceStr: res.NonceStr, // 必填，生成签名的随机串
          signature: res.Signature, // 必填，签名
          jsApiList: [
            "runtime.info",
            "biz.contact.complexPicker",
            "biz.contact.departmentsPicker"
          ] // 必填，需要使用的jsapi列表，注意：不要带dd。
        });
      })
      .catch(error => {
        window.console.log(error);
        alert("鉴权失败");
      });
  },
  data() {
    return {
      phone: "18605498606",
      title: "",
      message: "",
      id: "",
      deptid: "",
      dept: "",
      deptsid: "",
      depts: "",
      deptuser: ""
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
      Toast.success("保存成功");
      this.$router.go(-1);
    },
    btnDelete() {
      Dialog.confirm({
        title: "确认",
        message: "是否删除本条建议？"
      })
        .then(() => {
          Toast.success("删除成功");
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
    btnCommit() {
      Dialog.confirm({
        title: "确认",
        message: "确认提交本条建议？"
      })
        .then(() => {
          Toast.success("提交成功");
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
    btnRate() {
      Dialog.confirm({
        title: "确认",
        message: "是否将本条建议进行参评？"
      })
        .then(() => {
          Toast.success("参评成功");
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
    chooseDept() {
      let _this = this;
      dd.biz.contact.departmentsPicker({
        title: "主办单位", //标题
        corpId: "ding50a1c2db19b1feb035c2f4657eb6378f", //企业的corpId
        multiple: false, //是否多选
        limitTips: "超出了", //超过限定人数返回提示
        maxDepartments: 100, //最大选择部门数量
        appId: 390036208, //微应用的Id
        permissionType: "GLOBAL", //
        onSuccess: function(result) {
          _this.dept = result.departments[0].name;
        },
        onFail: function(err) {
          "选取主办部门异常：" + JSON.stringify(err);
        }
      });
    },
    chooseDepts() {
      let _this = this;
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
          for (var k = 0, length = result.departments.length; k < length; k++) {
            depstring = depstring + result.departments[k].name;
            if (k != length - 1) depstring = depstring + ";";
          }
          _this.depts = depstring;
        },
        onFail: function(err) {
          "选取协办部门异常：" + JSON.stringify(err);
        }
      });
    },
    chooseUser() {
      let _this = this;
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
          _this.deptuser = result.users[0].name;
          /**
        {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
        },
        onFail: function(err) {
          "选取分管领导异常：" + JSON.stringify(err);
        }
      });
    }
  }
};

dd.error(function(err) {
  alert("dd error: " + JSON.stringify(err));
});
</script>

<style>
</style>

