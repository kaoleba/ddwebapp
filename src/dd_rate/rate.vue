
<template>
  <div id="rate">
    <van-cell-group>
      <van-field v-model="proposal_dept" readonly label="提报单位" />
      <van-field v-model="title" readonly label="建议标题" placeholder="请输入建议标题" ref="inputVal" />
      <van-field
        v-model="content"
        readonly
        rows="4"
        autosize
        label="建议内容"
        type="textarea"
        maxlength="300"
        placeholder="请输入建议内容"
        show-word-limit
        @blur="viewDefault"
      />
      <!-- <van-divider>督办</van-divider> -->
      <van-field v-model="host_dept" label="主办单位" placeholder readonly />
      <van-field v-model="assisting_dept" label="协办单位" placeholder readonly />
      <van-field v-model="host_user" label="分管领导" placeholder readonly />
    </van-cell-group>
    <van-notice-bar
      wrapable
      :scrollable="false"
      color="#1989fa"
      background="#ecf9ff"
    >1很差 2较差 3合格 4良好 5优秀</van-notice-bar>
    <van-cell-group style=" margin:20px;   text-align: left;margin-top:0px ">
      <van-cell title="建议评价">
        <van-stepper
          slot="default"
          v-model="score1"
          step="1"
          :min="minValue"
          :max="maxValue"
          autofocus="true"
          input-width="80px"
        />
      </van-cell>
      <van-slider
        v-model="score1"
        :min="minValue"
        :max="maxValue"
        style=" margin-left: 20px;margin-right: 20px;margin-top:5px;margin-bottom:5px "
      ></van-slider>
    </van-cell-group>
    <van-button
      type="primary"
      size="small"
      style="  margin-top: 15px;margin-right:20px"
      @click="btnTask"
    >落实情况</van-button>
    <van-button type="info" size="small" style="margin-top: 15px" @click="btnConfirm">提交打分</van-button>
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
  Slider,
  Stepper,
  NoticeBar,
  NumberKeyboard,
  Dialog
} from "vant";
import Vue from "vue";
import axios from "axios";
import utils from "../util/utils";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Slider)
  .use(Stepper)
  .use(NoticeBar)
  .use(NumberKeyboard)
  .use(Dialog);

export default {
  mounted: function() {
    let entity = this.$route.query.entity;
    if (entity != undefined) {
      this.proposal_id = entity.proposal_id;
      this.proposal_score_id = entity.proposal_score_id;
      this.title = entity.proposal_title;
      this.content = entity.proposal_content;
      this.proposal_dept = entity.proposal_dept;
      this.host_dept = entity.host_dept;
      this.assisting_dept = entity.assisting_dept;
      this.host_user = entity.host_user;
      this.score1 = entity.score1;
    }
    if (this.score1 == null) this.score1 = 4;
  },
  data() {
    return {
      value: "",
      show: false,
      title: "",
      content: "",
      proposal_id: "",
      score1: "4",
      minValue: 0,
      maxValue: 5,
      proposal_dept: "",
      host_dept: "",
      assisting_dept: "",
      host_user: "",
      proposal_score_id: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      Dialog.confirm({
        title: "确认",
        message: "是否提交打分？"
      }).then(() => {
        let _this = this;
        axios
          .post(this.global.ddapi + "proposal/SaveSore", {
            proposal_score_id: _this.proposal_score_id,
            proposal_id: _this.proposal_id,
            evaluator_id: window.ddUserInfo.userid,
            evaluator_name: window.ddUserInfo.name,
            score1: _this.score1
          })
          .then(function(response) {
            if (response.data == "") {
              Toast.success("打分成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("打分失败：" + response.data);
            }
          })
          .catch(function(error) {
            utils.AlertError("打分失败：" + error);
          });
      });
    },
    btnTask() {
      Toast("打开任务详情界面");
    }
  }
};
</script>

<style>
</style>

