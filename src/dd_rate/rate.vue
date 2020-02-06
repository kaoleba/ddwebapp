
<template>
  <div id="rate">
    <van-cell-group>
      <van-field value="大数据中心" readonly label="提报单位" />
      <van-field v-model="title" required label="建议标题" placeholder="请输入建议标题" ref="inputVal" />
      <van-field
        v-model="message"
        required
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
    >6-8很差 9-11较差 12-14合格 15-17良好 18-20优秀</van-notice-bar>
    <van-cell-group style=" margin:20px;   text-align: left;margin-top:0px ">
      <van-cell title="建议价值型">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-stepper slot="default" v-model="fs1" step="1" :min="minValue" :max="maxValue" />
      </van-cell>
      <van-slider
        v-model="fs1"
        :min="minValue"
        :max="maxValue"
        style=" margin-left: 20px;margin-right: 20px;margin-top:5px;margin-bottom:5px "
      ></van-slider>
      <van-cell title="建议可落地" style="margin-top:15px">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-stepper slot="default" v-model="fs2" step="1" :min="minValue" :max="maxValue" />
      </van-cell>
      <van-slider
        v-model="fs2"
        :min="minValue"
        :max="maxValue"
        style=" margin-left: 20px;margin-right: 20px;margin-top:5px; "
      ></van-slider>
      <van-cell title="建议创新性" style="margin-top:15px">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-stepper slot="default" v-model="fs3" step="1" :min="minValue" :max="maxValue" />
      </van-cell>
      <van-slider
        v-model="fs3"
        :min="minValue"
        :max="maxValue"
        style=" margin-left: 20px;margin-right: 20px;margin-top:5px;margin-bottom:5px "
      ></van-slider>
    </van-cell-group>

    <van-button type="info" size="small" style="  margin-top: 15px" @click="btnConfirm">保存</van-button>
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
  NoticeBar
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
  .use(NoticeBar);

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
      phone: "18605498606",
      title: "",
      message: "",
      id: "",
      fs1: 6,
      fs2: 6,
      fs3: 6,
      minValue: 6,
      maxValue: 20
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
    }
  }
};
</script>

<style>
</style>

