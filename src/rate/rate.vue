
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
    </van-cell-group>

    <van-button type="info" size="small" style="  margin-top: 15px" @click="btnConfirm">保存</van-button>
    <van-button
      v-if="id"
      type="danger"
      size="small"
      style="  margin-top: 15px;margin-left:20px"
      @click="btnDelete"
    >删除</van-button>
  </div>
</template>
<script>
import { NavBar, Toast, Button, Field, Cell, CellGroup } from "vant";

import Vue from "vue";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup);

export default {
  mounted: function() {
    
    this.id = this.$route.query.id;

    if (this.id != undefined) {
        this.title=this.$route.query.title;
        this.message=this.$route.query.message;
    
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
      id: ""
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
      Toast.success("删除成功");
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>

