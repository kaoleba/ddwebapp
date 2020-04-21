<template>
  <div>
    <van-panel title="建议标题">
      <div>{{proposal.proposal_title}}</div>
    </van-panel>
    <van-cell title="提报单位">
      <span slot="default" style="font-size:16px;">{{proposal.proposal_dept}}</span>
    </van-cell>
    <van-cell title="归口主办部室">
      <span slot="default" style="font-size:16px;">{{proposal.host_dept}}</span>
    </van-cell>
    <van-panel title="归口协办部室">
      <div>{{proposal.assisting_dept||"无"}}</div>
    </van-panel>
    <van-cell title="归口主管领导">
      <span slot="default" style="font-size:16px;">{{proposal.host_user||"无"}}</span>
    </van-cell>
    <van-panel title="建议内容">
      <div>{{proposal.proposal_content}}</div>
    </van-panel>
  </div>
</template>
<script>
import Vue from "vue";
import { Panel, Cell, Dialog } from "vant";
import axios from "axios";
import utils from "../util/utils";

Vue.use(Panel)
  .use(Cell)
  .use(axios)
  .use(Dialog);

export default {
  created: function() {
    window.document.title = "建议详情";
    var deptid = this.$route.query.deptid;
    var monthorder = this.$route.query.monthorder;

    axios
      .get(this.global.ddapi + "proposal/AdviceInfo", {
        params: {
          deptid: deptid,
          monthorder: monthorder
        }
      })
      .then(response => {
        if(response.data.proposal_title){
          this.proposal=response.data;
        }
        else{
           Dialog.alert({
            title: "提示",
            message: "本月未提报工作建议。"
          }).then(() => {
            this.$router.go(-1);
          });
        }
      })
      .catch(err => {
        utils.AlertError(err);
      });
  },
  data() {
    return {
      proposal: {}
    };
  }
};
</script>
<style>
.van-cell__title {
  text-align: left;
}
.van-cell__title span {
  font-size: 16px;
}
.van-panel__content div {
  padding: 15px 20px;
  font-size: 16px;
  text-align: left;
  color: #999;
}
</style>