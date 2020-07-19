
<template>
  <div>
    <van-cell-group>
      <van-field v-model="username" required readonly label="提交人" size="large" />
      <van-field v-model="title" required label="标题" size="large" />
      <van-field
        readonly
        clickable
        label="类别"
        :value="type"
        placeholder="选择类别"
        @click="showPicker = true"
        size="large"
        required
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-field
        v-model="content"
        required
        rows="4"
        autosize
        label="内容"
        type="textarea"
        maxlength="200"
        placeholder="请输入诉求议内容"
        show-word-limit
        size="large"
      />
      <div id="dd_guild_add" style="margin-left:15px">
        <van-uploader v-model="fileList" multiple />
      </div>
    </van-cell-group>
    <van-button v-if="!id" type="info" size="small" style="margin-top: 15px" @click="btnConfirm">保存</van-button>
    <!-- <van-button
      v-if="id"
      type="danger"
      size="small"
      style="  margin-top: 15px;margin-left:20px;margin-bottom: 20px"
      @click="btnDelete"
    >删除</van-button> -->
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
  Picker,
  Uploader
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";
import utils from "../../util/utils";

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
  .use(Col)
  .use(Uploader);

export default {
  mounted: function() {
    this.username=window.ddUserInfo.name;
  },

  data() {
    return {
      title: "",
      content: "",
      id: "",
      username: "",
      type: "",
      showPicker: false,
      columns: [
        "困难帮扶",
        "便民服务",
        "福利待遇",
        "答疑释惑",
        "会员心声",
        "其它问题"
      ],
      fileList: []
    };
  },
  methods: {
    onDateConfirm(value) {
      this.prodate = value;
      this.showPicker = false;
    },
    onConfirm(value) {
      this.type = value;
      this.showPicker = false;
    },
    btnConfirm() {
      let _this = this;
      if (_this.title == "" || _this.content == "" || _this.type == "") {
        utils.AlertError("请填写必填内容");
        return;
      }

      let param = new FormData(); // 创建form对象
      for (var i = 0; i < this.fileList.length; i++) {
        param.append("file" + i, this.fileList[i].file);
      }
      
      // 通过append向form对象添加数据
      param.append("guild", 
      JSON.stringify({
        "id":_this.id,
        "title":_this.title,
        "content":_this.content,
        "username":_this.username,
        "type":_this.type,
        "dingid":window.ddUserInfo.userid
      }));
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
 
      axios
        .post(this.global.ddapi + "guild/SaveGuild", param, config)
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
  }
};
</script>

<style>
#dd_guild_add {
  text-align: left;
}
</style>

