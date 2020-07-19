
<template>
  <div>
    <van-cell-group>
      <van-field readonly v-model="entity.title" required label="标题" size="large" />

      <van-field
        v-model="entity.message"
        readonly=
        required
        rows="4"
        autosize
        label="留言"
        type="textarea"
        size="large"
      />

      <van-field v-model="entity.type" required label="问题类型" size="large" readonly="true" /> 

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
        v-model="replymessage"
        :readonly="readonly"
        required
        rows="4"
        autosize
        autofocus="true"
        label="回复意见"
        type="textarea"
        size="large"
      />

    </van-cell-group>
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
  Col
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
  .use(Col);

export default {
  mounted: function() {
    this.id = this.$route.query.id;
    this.getValues(this.id )

  },
  data() {
    return {
      entity: {},
      id:"",
      replymessage:"",
      IfPub:false,
      readonly:false
    };
  },
  methods: {
      getValues(id) {
      let _this = this;

      axios
        .get(
          _this.global.ddapi +
            "channel/" +id
        )
        .then(response => {
          _this.entity=response.data;
          if(_this.entity.replymessage!=null)
          {
            _this.replymessage=_this.entity.replymessage;
            _this.IfPub=true;
            _this.readonly=true;

          }
          Toast.clear();
        });
    },
    btnConfirm() {
      let _this = this;
      if (_this.replymessage == "") {
        utils.AlertError("请填写回复意见");
        return;
      }

      axios
        .post(this.global.ddapi + "channel/SaveReply", {
          id: _this.id,
          replymessage: _this.replymessage
        })
        .then(function(response) {
          if (response.data == "") {
            _this.readonly=true;
            _this.IfPub=true;
            Toast.success("您的回复已提交成功");
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
</style>

