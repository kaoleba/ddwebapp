<template>
  <div>
    <van-cell-group>
      <van-cell title="单位" :value="dept" />
      <van-cell title="推荐职务" value="拟提拔副矿处级领导干部人选1人" />
      <van-cell title="推荐时间" value="2020年3月" />
      <van-field
        v-model="vote.vote_detail_name"
        label="人选姓名"
        placeholder="请输入人选姓名"
        required
        maxlength="4"
        :disabled="disabled"
      />
      <van-field
        v-model="vote.vote_detail_duty"
        label="现任职务"
        placeholder="请输入人选现任职务"
        required
        maxlength="5"
        :disabled="disabled"
      />
      <van-field
        v-model="vote.vote_detail_info"
        required
        rows="3"
        autosize
        label="推荐理由"
        type="textarea"
        maxlength="20"
        placeholder="请输入推荐理由"
        show-word-limit
        :disabled="disabled"
      />
      <van-cell title="人选是否违反组织人事纪律">
        <span slot="label" style="font-size:14px;">{{illegal_flag?"是":"否"}}</span>
        <div slot="default">
          <van-switch v-model="illegal_flag" :disabled="disabled"></van-switch>
        </div>
      </van-cell>
      <van-field
        v-model="vote.illegal_info"
        :required="illegal_flag"
        rows="3"
        autosize
        label="违纪具体行为"
        type="textarea"
        maxlength="50"
        placeholder="请输入违纪具体行为"
        show-word-limit
        :disabled="disabled"
      />
      <van-cell>
        <div slot="title">
          <van-button
            type="info"
            block
            round
            style="font-size:16px;"
            @click="doSubmit"
            :disabled="disabled"
          >提交投票</van-button>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import Vue from "vue";
import { CellGroup, Cell, Field, Switch, Button, Dialog, Divider } from "vant";
import Axios from "axios";

Vue.use(CellGroup)
  .use(Cell)
  .use(Field)
  .use(Switch)
  .use(Button)
  .use(Divider);

export default {
  created: function() {
    this.vote.vote_id = this.$route.query.vote_id;
    let message = "";
    switch (this.$route.query.type) {
      case "0"||"1"||"2":
        message =
          "<p>1、推荐人选必须信念坚定、为民服务、勤政务实、敢于担当、清正廉洁；</p>" +
          "<p>2、推荐人选原则上从上海庙矿业公司班子成员中推荐、担任班子副职2年及以上，特别优秀、表现突出、有发展潜力的干部需担任副职工作1年及以上；</p>" +
          "<p>3、推荐人选需具备一定的党务工作经验，熟悉党建管理工作；</p>" +
          "<p>4、学历要求：原则上具有专科及以上学历。</p>";
        break;
      case "3":
        message =
          "<p>1、推荐人选必须信念坚定、为民服务、勤政务实、敢于担当、清正廉洁；</p>" +
          "<p>2、推荐人选原则上从永明煤矿正科级及以上人员中推荐，需担任正科级及以上管理职务2年及以上；</p>" +
          "<p>3、推荐人选原则上需取得中级及以上职称，具备一定的安全管理工作经验，熟悉煤矿生产管理工作；</p>" +
          "<p>4、学历要求：原则上具有专科及以上学历。</p>";
        break;
      default:
        message = "";
    }
    Dialog({
      title: "任职条件",
      message: message
    });
  },
  data() {
    return {
      text: "",
      dept: this.$route.query.dept,
      submitNum: 0,
      illegal_flag: false,
      disabled: false,
      vote: {
        vote_id: "",
        vote_detail_name: "",
        vote_detail_duty: "",
        vote_detail_info: "",
        illegal_flag: 0,
        illegal_info: "",
        vote_detail_def1: window.ddUserInfo.userid,
        vote_detail_def3: this.$route.query.type
      }
    };
  },
  methods: {
    doSubmit: function() {
      let _this = this;
      if (
        this.vote.vote_detail_name == "" ||
        this.vote.vote_detail_duty == "" ||
        this.vote.vote_detail_info == "" ||
        (this.illegal_flag && this.vote.illegal_info == "")
      ) {
        Dialog({
          title: "提示",
          message: "请正确输入必填信息！"
        });
        return;
      }
      if (this.illegal_flag) {
        if (this.submitNum == 0) {
          Dialog({
            title: "提示",
            message: "请再次审计人选违纪具体行为是否正确！"
          }).then(() => {
            this.submitNum = 1;
          });
          return;
        }
      }
      if ((this.illegal_flag && this.submitNum == 1) || !this.illegal_flag) {
        this.vote.illegal_flag = this.illegal_flag==true ? 1 : 0;
        Axios.post(_this.global.ddapi + "/vote/savevoteinfo", this.vote).then(
          response => {
            if (response.data && response.data == 1) {
              Dialog({
                title: "提示",
                message: "提交成功"
              });
              this.disabled = true;
            }
          }
        );
      }
    }
  }
};
</script>
<style>
.van-cell {
  font-size: 16px;
}
.van-cell__title {
  text-align: left;
}
.van-switch {
  height: 62px;
  height: 32px;
}
.van-switch__node {
  width: 30px;
  height: 30px;
}
.van-switch--on .van-switch__node {
  -webkit-transform: translateX(30px);
  transform: translateX(30px);
}
</style>