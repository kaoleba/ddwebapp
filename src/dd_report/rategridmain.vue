<template>
  <div>
    <van-tabs
      swipeable
      title-active-color="#0089ff"
      color="#0089ff"
    >
      <van-tab title="本月排行">
        <van-list v-model="loading1" :finished="finished1" @load="loadMonthReport">
          <van-cell
            v-for="item in monthScoreList"
            :key="item.proposal_dept"
            :title="item.proposal_dept"
            :value="item.score"
            center
            title-style="text-align:left;padding-left:20px;"
          />
        </van-list>
      </van-tab>
      <van-tab title="本单位统计">
        <van-list v-model="loading2" :finished="finished2" @load="loadDeptReport">
          <van-cell v-for="item in deptScoreList" :key="item.proposal_dept"
            :value="item.score"
            center
            title-style="text-align:left;padding-left:20px;">
            <span slot="title">{{item.monthorder}}月份</span>
            </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Toast, Tab, Tabs, List, Cell } from "vant";
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
import utils from "../util/utils";
import axios from "axios";
Vue.use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell)
  .use(dd);

export default {
  mounted: () => {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "统计查询" //控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  methods: {
    loadMonthReport: function() {
      axios.get(this.global.ddapi+"/proposal/MonthScoreList").then(response=>{
        if(response.data)
        this.monthScoreList=response.data;
        this.finished1=true;
      }).catch(error=>{
        utils.AlertError(error);
      });
    },
    loadDeptReport: function() {
      axios.get(this.global.ddapi+"/proposal/DeptScoreList",{params:{deptId:window.ddUserInfo.department[0]}}).then(response=>{
        if(response.data){
          let data=[];
          let m=new Date().getMonth()+1;
          let i,j;
          for(i=m,j=0;i>0;i--){
            if(j>=response.data.length||response.data[j].monthorder<i){
              data.push({
                proposal_dept:"",
                score:0,
                monthorder:i
              });
            }
            else{
              data.push(response.data[j]);
              j++;
            }
          }
          this.deptScoreList=data;
          this.finished2=true;
        }
      }).catch(error=>{
        utils.AlertError(error);
      });
    }
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      finished1: false,
      finished2: false,
      monthScoreList: [],
      deptScoreList: []
    };
  }
};
</script>

<style>
</style>
