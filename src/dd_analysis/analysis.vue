
<template>
  <div id="analysis">
    <van-cell-group>
      <van-field v-model="analysis_dept" readonly label="提报部室" />
      <van-field
        :readonly="read"
        v-model="analysis_title"
        required
        label="分析专题"
        placeholder="请输入分析专题"
        ref="inputVal"
      />
      <van-panel title="关键数据、结论及建议">
        <div>
          <van-field
            v-model="analysis_content"
            :readonly="read"
            required
            rows="10"
            label-width="30"
            autosize
            type="textarea"
            maxlength="400"
            placeholder="请输入内容"
            show-word-limit
          />
        </div>
      </van-panel>

      <van-field v-model="period" required label="例会期数" type="digit" placeholder="请输入期数" />
      <van-field v-model="submit_time" required label="提报时间" readonly=""  />

    </van-cell-group>
          <van-field  name="checkbox" v-if="id" label>
        <template #input>
          <van-checkbox shape="square"  v-model="IfRate" :disabled="read" >是否参评</van-checkbox>
        </template>
      </van-field>
        <div id="buttonDiv">

    <van-row>
      <van-tag v-if="id" size="large" plain type="primary">{{state}}</van-tag>
    </van-row>

      <van-button
        enable="false"
        v-if="IfCan"
        type="info"
        size="small"
        style="margin-top: 15px"
        @click="btnConfirm"
      >保存</van-button>
      <van-button
        v-if="id&&IfCan"
        type="danger"
        size="small"
        style="  margin-top: 15px;margin-left:20px;margin-bottom: 20px"
        @click="btnDelete"
      >删除</van-button>
      <van-button
        v-if="!IfCan&&!IfRate"
        type="warning"
        size="small"
        style="  margin-top: 15px;"
        @click="btnRate"
      >参评</van-button>
      <van-button
        v-if="id&&IfCan"
        type="primary"
        size="small"
        style="  margin-top: 15px;margin-left:20px"
        @click="btnCommit"
      >提交</van-button>
    </div>

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
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup,
  Picker
} from "vant";
import * as dd from "dingtalk-jsapi";
// import user from "../dd_org/host_user.vue";
import Vue from "vue";
import axios from "axios";
import utils from "../util/utils";
import dateutil from "../util/date";

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
  .use(Row)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Picker)
  .use(Col);

export default {
  mounted: function() {
    

    this.entity = this.$route.query.entity;
    if (this.entity != undefined) {
      this.id = this.entity.analysis_id;
      this.analysis_title = this.entity.analysis_title;
      this.analysis_content = this.entity.analysis_content;
      this.analysis_deptid = this.entity.analysis_deptid;
      this.analysis_dept = this.entity.analysis_dept;
      this.period = this.entity.period;
      this.submit_time=this.entity.submit_time.substring(0,10);
      if (this.entity.state == "0") this.state = "未提交";
      if (this.entity.state == "1") {
        this.state = "已提交";
        this.read = true;
        this.IfCan = false;
      }
      if (this.entity.state == "3") {
        this.state = "已参评";
        this.read = true;
        this.IfRate = true;
        this.IfCan = false;
      }
    } else {
      this.submit_time = dateutil.formatTime("", "YYYY-MM-DD");
      this.analysis_dept = window.ddUserInfo.remark;
      this.analysis_deptid = window.ddUserInfo.department[0];
      this.id = "";
      this.$nextTick(function() {
        this.$refs.inputVal.focus();
      }, 500);
    }
  },

  data() {
    return {
      analysis_title: "",
      analysis_content: "",
      id: "",
      entity: {},
      analysis_deptid: "",
      analysis_dept: "",
      state: "",
      period: "",
      checked: false,
      read: false,
      IfRate: false,
      IfCan: true,
      submit_time:''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onDateConfirm(value) {
      this.prodate = value;
      this.showPicker = false;
    },
    btnConfirm() {
      let _this = this;
      if (
        _this.analysis_title == "" ||
        _this.analysis_content == "" ||
        _this.analysis_dept == ""
      ) {
        utils.AlertError("请填写必填内容");
        return;
      }

      if (_this.period == "") {
        utils.AlertError("请填写例会期数");
        return;
      }

      axios
        .post(this.global.ddapi + "analysis", {
          analysis_id: _this.id,
          analysis_title: _this.analysis_title,
          analysis_content: _this.analysis_content,
          analysis_deptid: _this.analysis_deptid,
          analysis_dept: _this.analysis_dept,
          period:_this.period,
          creatorid: window.ddUserInfo.userid,
          creator: window.ddUserInfo.name,
          submit_time:_this.submit_time
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
        utils.AlertError("已提交数据分析不能删除");
        return;
      }
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否删除本条数据分析？"
      }).then(() => {
        axios
          .delete(_this.global.ddapi + "analysis/" + _this.id)
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
        utils.AlertError("该数据分析已提交");
        return;
      }
      let state = "1";
      if (this.IfRate) state = "3";
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "确认提交本条数据分析？"
      }).then(() => {
        axios
          .get(_this.global.ddapi + "analysis/UpdateState", {
            params: {
              id: _this.id,
              state: state
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
        utils.AlertError("该数据分析已参评");
        return;
      }
      let _this = this;
      Dialog.confirm({
        title: "确认",
        message: "是否将本条数据分析进行参评？"
      }).then(() => {
        axios
          .get(_this.global.ddapi + "analysis/UpdateState", {
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
    }
  }
};
</script>

<style>
#analysis {
  text-align: left;
}
#buttonDiv
{
  text-align:center;
}

.van-address-list__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  width: 100%;
  padding: 5px 16px;
  background-color: #fff;
  text-align: right;
}
.van-address-list__add {
  height: 40px;
  line-height: 38px;
}

.van-cell {
  padding: 6px 16px;
}
</style>

