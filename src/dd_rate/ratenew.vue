
<template>
  <div id="rate">
    <van-cell-group>
      <van-field v-model="proposal_dept" readonly label="提报单位" />
      <van-field v-model="title" readonly label="建议标题" placeholder="请输入建议标题" ref="inputVal" />
      <van-field
        v-model="content"
        readonly
        rows="2"
        autosize
        label=""
        label-width="15"
        type="textarea"
        maxlength="150"
        placeholder="请输入建议内容"
        style="line-height:18px"
      />
      <!-- <van-divider>督办</van-divider> -->
      <van-field v-model="host_dept" label="归口主办单位" placeholder readonly />
      <van-field v-model="assisting_dept" label="归口协办单位" placeholder readonly />
      <!-- <van-field v-model="host_user" label="分管领导" placeholder readonly /> -->
    </van-cell-group>
    <!-- desc="紧扣企业重点任务，揭示问题清楚，措施思路清晰，对促进企业高效率、高效益、高质量发展具有现实意义。" -->
    <div class="panel" style="text-align: left;padding-left:18px;">
      <van-panel style="color:red" title="建议价值性"></van-panel>
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
              <van-radio name="10">10</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="8.5">8.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="7">7</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="5.5">5.5</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="9.5">9.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="8">8</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="6.5">6.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="5">5</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="7.5">7.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="6">6</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="4.5">4.5</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>
    <!-- desc="建议及措施具有前瞻性、创新性，体现部室的学习力、敏锐力、专业引领力。" -->
    <div class="panel" style="text-align: left;padding-left:18px;margin-top:5px">
      <van-panel title="建议创新性"></van-panel>
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
              <van-radio name="10">10</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="8.5">8.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="7">7</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="5.5">5.5</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="9.5">9.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="8">8</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="6.5">6.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="5">5</van-radio>
            </van-col>
          </van-row>
          <van-row style="margin-top:6px">
            <van-col span="6">
              <van-radio name="9">9</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="7.5">7.5</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="6">6</van-radio>
            </van-col>
            <van-col span="6">
              <van-radio name="4.5">4.5</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </div>
    </div>
   
      <van-row>
        <van-col span="12">
           <div style="padding-left:30px;padding-right:15px;padding-top:10px">
          <van-notice-bar
            :scrollable="false"
            color="#1989fa"
            background="#ecf9ff"
            left-icon="medal-o"
          >最终得分：{{valueadd}}</van-notice-bar>
            </div>
        </van-col>
        <van-col span="12">
          <div >
            <van-button type="info" size="small" style="margin-top: 15px" @click="btnConfirm">测评确认</van-button>
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
      this.proposal_id = entity.proposal_id;
      this.proposal_score_id = entity.proposal_score_id;
      this.title = entity.proposal_title;
      this.content = entity.proposal_content;
      this.proposal_dept = entity.proposal_dept;
      this.host_dept = entity.host_dept;
      this.assisting_dept = entity.assisting_dept;
      this.host_user = entity.host_user;
      this.score1 = String(entity.score1);
      this.score2 = String(entity.score2);
    }
  },
  data() {
    return {
      show: false,
      title: "",
      content: "",
      proposal_id: "",
      proposal_dept: "",
      host_dept: "",
      assisting_dept: "",
      host_user: "",
      proposal_score_id: "",
      score1: "",
      score2: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btnConfirm() {
      if (this.score1 == "" && this.score2 == "") {
        utils.AlertError("请先完成打分");
        return;
      }
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
            score1: _this.score1,
            score2: _this.score2
          })
          .then(function(response) {
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
    btnTask() {
      Toast("打开任务详情界面");
    }
  },
  computed: {
    valueadd: function() {
      return Number(this.score1) + Number(this.score2);
    }
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

