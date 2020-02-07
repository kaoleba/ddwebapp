
<template>
  <div id="rate">
    <van-cell-group>
      <van-field value="大数据中心" readonly label="提报单位" />
      <van-field v-model="title" readonly label="建议标题" placeholder="请输入建议标题" ref="inputVal" />
      <van-field
        v-model="message"
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
    </van-cell-group>
    <van-notice-bar
      wrapable
      :scrollable="false"
      color="#1989fa"
      background="#ecf9ff"
    >1很差 2较差 3合格 4良好 5优秀</van-notice-bar>
    <van-cell-group style=" margin:20px;   text-align: left;margin-top:0px ">
      <!-- <van-field
        type="digit"
        v-model="value"
        label="建议评分"
        input-align="right"
        autofocus="true"
        readonly="readonly"
        @touchstart.native.stop="show = true"
      />   
      <van-number-keyboard v-model="value" :show="show" :maxlength="1" @blur="show = false" /> -->
      <van-cell title="建议打分">
        <van-stepper slot="default" v-model="fs1" step="1" :min="minValue" :max="maxValue" autofocus="true" />
      </van-cell>
      <van-slider
        v-model="fs1"
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
    <van-button type="info" size="small" style="  margin-top: 15px" @click="btnConfirm">提交打分</van-button>
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
  NumberKeyboard
} from "vant";
import Vue from "vue";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Slider)
  .use(Stepper)
  .use(NoticeBar)
  .use(NumberKeyboard);

export default {
  mounted: function() {
    this.id = this.$route.query.id;

    if (this.id != undefined) {
      this.title = this.$route.query.title;
      this.message = this.$route.query.message;
    } else {
      this.$nextTick(function() {
        this.$refs.inputVal.focus();
      });
    }
  },
  data() {
    return {
      value:"",
      show: false,
      phone: "18605498606",
      title: "",
      message: "",
      id: "",
      fs1: "",
      minValue: 0,
      maxValue: 5
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
    btnTask() {
      Toast("打开任务详情界面");
    }
  }
};
</script>

<style>
</style>

