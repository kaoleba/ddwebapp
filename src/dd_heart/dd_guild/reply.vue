
<template>
  <div>
    <van-cell-group>
      <van-field v-model="entity.username" readonly label="提交人" size="large" />
      <van-field v-model="entity.mobile" readonly label="手机号" size="large" />
      <van-field v-model="entity.dept" readonly label="单位" size="large" />
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

      <van-field
        v-model="solve"
        required
        rows="4"
        autosize
        label="落实意见"
        type="textarea"
        size="large"
        maxlength="200"
        placeholder="请输入落实意见"
        show-word-limit
      />
    </van-cell-group>
    <!-- <van-button v-if="!IfPub" type="danger" size="small" style="margin: 5px" @click="btnCancel">不处理</van-button> -->
    <van-button v-if="!IfPub" type="info" size="small" style="margin: 5px" @click="btnConfirm">提交</van-button>
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
import axios from "axios";
import utils from "../../util/utils";

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

    let _this = this;
    var id= this.$route.query.id;
    axios.get(_this.global.ddapi + "guild/" + id).then(response => {
      _this.entity = response.data;
      if(_this.entity.solve!="")
      {
        _this.IfPub=false;
      }

      if (_this.entity != undefined) {
        var images = _this.entity.image.split(",");
        for (var i = 0; i < images.length; i++) {
          if (images[i] != "")
            _this.fileList.push({ url: _this.global.imageurl + images[i] });
        }
      }
    });
  },
  data() {
    return {
      entity: {},
      solve: "",
      fileList: [],
      IfPub:true
    };
  },
  methods: {
    btnConfirm() {
      let _this = this;
      if (_this.solve == "") {
        utils.AlertError("请填写必填内容");
        return;
      }

      axios
        .post(this.global.ddapi + "guild/SaveReply", {
          solve: _this.solve,
          id: _this.entity.id
        })
        .then(function(response) {
          if (response.data == "") {
            _this.IfPub=false;
            Toast.success("您的落实意见已提交");
            _this.$router.go(-1);
          } else {
            utils.AlertError("保存失败：" + response.data);
          }
        })
        .catch(function(error) {
          alert(error);
          utils.AlertError("保存失败：" + error);
        });
    },
  }
};
</script>

<style>
#dd_guild_add {
  text-align: left;
}
</style>

