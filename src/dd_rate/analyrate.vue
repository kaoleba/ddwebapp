
<template>
  <div id="analyrate">
    <van-cell-group>
      <van-field v-model="analysis_dept" readonly label="提报部室" />
      <van-field v-model="analysis_title" readonly label="分析专题" />
      <van-field
        v-model="analysis_content"
        readonly
        rows="2"
        autosize
        label
        label-width="15"
        type="textarea"
        maxlength="400"
        style="line-height:18px"
      />
    </van-cell-group>
    <div class="panel" style="text-align: left;padding-left:18px;">
      <van-panel style="color:red" title="数据质量"></van-panel>
    </div>
    <div style="text-align: center;font-size:13px;margin-top:5px">
      <van-row>
        <van-col span="6">优秀</van-col>
        <van-col span="6">良好</van-col>
        <van-col span="4">一般</van-col>
        <van-col span="8">较差</van-col>
      </van-row>
      <div style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px">
        <van-radio-group v-model="score1">
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="20">20</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="17">17</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="14">14</van-radio>
            </van-col>
             <van-col span="6">
              <van-radio name="11">11</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="19">19</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="16">16</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="13">13</van-radio>
            </van-col>
           <van-col span="6">
              <van-radio name="10">10</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="18">18</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="15">15</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="12">12</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>

    <div class="panel" style="text-align: left;padding-left:18px;margin-top:5px">
      <van-panel style="color:red" title="思路方法"></van-panel>
    </div>
    <div style="text-align: center;font-size:13px;margin-top:5px">
      <van-row>
        <van-col span="6">优秀</van-col>
        <van-col span="6">良好</van-col>
        <van-col span="4">一般</van-col>
        <van-col span="8">较差</van-col>
      </van-row>
      <div style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px">
        <van-radio-group v-model="score2">
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="20">20</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="17">17</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="14">14</van-radio>
            </van-col>
             <van-col span="6">
              <van-radio name="11">11</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="19">19</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="16">16</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="13">13</van-radio>
            </van-col>
           <van-col span="6">
              <van-radio name="10">10</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="18">18</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="15">15</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="12">12</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>

    <div class="panel" style="text-align: left;padding-left:18px;margin-top:5px">
      <van-panel style="color:red" title="分析效用"></van-panel>
    </div>
    <div style="text-align: center;font-size:13px;margin-top:5px">
      <van-row>
        <van-col span="6">优秀</van-col>
        <van-col span="6">良好</van-col>
        <van-col span="4">一般</van-col>
        <van-col span="8">较差</van-col>
      </van-row>
      <div style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px">
        <van-radio-group v-model="score3">
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="20">20</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="17">17</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="14">14</van-radio>
            </van-col>
             <van-col span="6">
              <van-radio name="11">11</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="19">19</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="16">16</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="13">13</van-radio>
            </van-col>
           <van-col span="6">
              <van-radio name="10">10</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="18">18</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="15">15</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="12">12</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>

    <div class="panel" style="text-align: left;padding-left:18px;margin-top:5px">
      <van-panel style="color:red" title="解决问题"></van-panel>
    </div>
    <div style="text-align: center;font-size:13px;margin-top:5px">
      <van-row>
        <van-col span="6">优秀</van-col>
        <van-col span="6">良好</van-col>
        <van-col span="4">一般</van-col>
        <van-col span="8">较差</van-col>
      </van-row>
      <div style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px">
        <van-radio-group v-model="score4">
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="20">20</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="17">17</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="14">14</van-radio>
            </van-col>
             <van-col span="6">
              <van-radio name="11">11</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="19">19</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="16">16</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="13">13</van-radio>
            </van-col>
           <van-col span="6">
              <van-radio name="10">10</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="18">18</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="15">15</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="12">12</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>

    <div class="panel" style="text-align: left;padding-left:18px;margin-top:5px">
      <van-panel style="color:red" title="业务提升"></van-panel>
    </div>
    <div style="text-align: center;font-size:13px;margin-top:5px">
      <van-row>
        <van-col span="6">优秀</van-col>
        <van-col span="6">良好</van-col>
        <van-col span="4">一般</van-col>
        <van-col span="8">较差</van-col>
      </van-row>
      <div style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px">
        <van-radio-group v-model="score5">
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="20">20</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="17">17</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="14">14</van-radio>
            </van-col>
             <van-col span="6">
              <van-radio name="11">11</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="19">19</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="16">16</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="13">13</van-radio>
            </van-col>
           <van-col span="6">
              <van-radio name="10">10</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="18">18</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="15">15</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="12">12</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>


    <van-row>
      <van-col span="24">
        <div>
          <van-button type="info" size="small" style="margin-top: 15px;margin-bottom:15px" @click="btnConfirm">测评确认</van-button>
        </div>
      </van-col>
    </van-row>
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
  NoticeBar,
  Dialog,
  Panel,
  Col,
  Row,
  RadioGroup,
  Radio,
  Divider
} from "vant";
import Vue from "vue";
import utils from "../util/utils";
import axios from "axios";

Vue.use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(NoticeBar)
  .use(Dialog)
  .use(Panel)
  .use(Col)
  .use(Row)
  .use(RadioGroup)
  .use(Radio)
  .use(Divider);
export default {
  created: function() {
    let entity = this.$route.query.entity;
    if (entity != undefined) {
      this.analysis_id = entity.analysis_id;
      this.score_id = entity.score_id;
      this.analysis_title = entity.analysis_title;
      this.analysis_content = entity.analysis_content;
      this.analysis_dept = entity.analysis_dept;
      this.score1 = String(entity.score1);
      this.score2 = String(entity.score2);
      this.score3 = String(entity.score3);
      this.score4 = String(entity.score4);
      this.score5 = String(entity.score5);
    }
  },
  data() {
    return {
      show: false,
      analysis_title: "",
      analysis_content: "",
      analysis_id: "",
      analysis_dept: "",
      score_id:"",
      score1: "",
      score2: "",
      score3: "",
      score4: "",
      score5: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      if (this.score1 == "" || this.score2 == ""| this.score3 == ""| this.score4 == ""| this.score5 == "") {
        utils.AlertError("请先完成打分");
        return;
      }
      Dialog.confirm({
        title: "确认",
        message: "是否提交打分？"
      }).then(() => {
        let _this = this;
        axios
          .post(this.global.ddapi + "analysis/SaveSore", {
            score_id: _this.score_id,
            analysis_id: _this.analysis_id,
            reviewer_id: window.ddUserInfo.userid,
            reviewer: window.ddUserInfo.name,
            score1: _this.score1,
            score2: _this.score2,
            score3: _this.score3,
            score4: _this.score4,
            score5: _this.score5
          })
          .then(function(response) {
            //alert(JSON.String(response));
            if (response.data == "") {
              Toast.success("测评确认成功");
              _this.$router.go(-1);
            } else {
              utils.AlertError("测评确认失败：" + response.data);
            }
          })
          .catch(function(error) {
            utils.AlertError("测评确认失败：" + error);
          });
      });
    },

  },
  computed: {

  }
};
</script>

<style>
.van-cell__title {
  color: #1989fa;
}

.van-cell {
  padding: 3px 16px;
}
</style>

