
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

      <van-field v-model="entity.type" required label="问题类型" size="large" readonly />

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
    <van-button type="info" size="small" style="margin: 5px" @click="btnConfirm">查看进度</van-button>

    <van-popup v-model="show" position="left" :style="{ width: '85%',height:'100%' }">
      <van-cell-group>
        <van-field readonly v-model="dept" label="单位" size="large" />
        <van-field readonly v-model="name" label="处理人" size="large" />
        <van-button type="primary" size="small" style="margin: 5px" @click="btnSend">发送DING</van-button>
      </van-cell-group>
      <div id="step">
        <van-steps direction="vertical" :active="list.length-1">
          <van-step
            v-for="item in list"
            :key="item.id"
          >【{{item.name}}】{{formatDate(item.createdate)}}</van-step>
        </van-steps>
      </div>
    </van-popup>
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
  Popup,
  Step,
  Steps
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";
//  import dateutil from "../../util/date";
//  import utils from "../../util/utils";

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
  .use(Popup)
  .use(Step)
  .use(Steps);

export default {
  mounted: function() {
    this.entity = this.$route.query.entity;
    let _this = this;
    axios
      .get(_this.global.ddapi + "channel/GetFlow?id=" + this.entity.id)
      .then(response => {
        _this.list = response.data.flowlist;
        _this.flow = response.data.deptInfo;
        if (_this.flow != null) {
          _this.dept = _this.flow.dept;
          _this.name = _this.flow.name;
          _this.dingTalk = _this.flow.dingTalk;
        }
        window.console.log(response.data);
      });
  },
  data() {
    return {
      list: [],
      entity: {},
      show: false,
      flow: {},
      dept: "",
      name: "",
      dingTalk: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    formatDate(date) {
      try {
        return date.replace("T", " ");
      } catch {
        return "";
      }
    },
    btnConfirm() {
      this.show = true;
    },
    btnSend() {
      let _this = this;
      if (_this.dingTalk != "") {
        dd.biz.ding.create({
          users: [_this.dingTalk], // 用户列表，工号
          corpId: _this.global.CorpId, // 企业id
          type: 2, // 附件类型 1：image  2：link
          alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
          text: "请您处理民生通道消息承办", // 正文
          bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
          taskInfo: {
            taskRemind: 1440 // 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
          },

          onSuccess: function() {
            //onSuccess将在点击发送之后调用

          },
          onFail: function() {}
        });
      }
    }
  }
};
</script>

<style>
#step {
  text-align: left;
  padding-left: 15px;
}
</style>

