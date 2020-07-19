
<template>
  <div>
    <van-cell-group>
      <van-field v-model="entity.username" readonly label="提交人" size="large" />
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
      <van-field v-model="entity.zpusername" readonly label="落实人" size="large" />
      <van-field v-model="entity.solvedate" readonly label="落实时间" size="large" />
      <van-field
        v-model="entity.solve"
        required
        readonly
        rows="4"
        autosize
        label="落实意见"
        type="textarea"
        size="large"
        placeholder="请输入落实意见"
      />
    </van-cell-group>
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
// import axios from "axios";
// import utils from "../../util/utils";

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
      fileList: []
    };
  }
};
</script>

<style>
#dd_guild_add {
  text-align: left;
}
</style>

