<template>
  <div>

    <van-tabs
      swipeable
      title-active-color="#0089ff"
      color="#0089ff"
    >
      <van-tab title="上季度排行">
        
        <van-list @load="loadMonthReport">
          <van-cell
            v-for="item in monthScoreList"
            :key="item.analysisDept"
            :title="item.analysisDept"
            :value="item.avgScore"
            center
            @click="monthItemClick(item)"
            title-style="text-align:left;padding-left:20px;"
          />
        </van-list>
      </van-tab>
      <van-tab title="本单位统计">
        <van-list @load="loadDeptReport">
          <van-cell v-for="(item,index) in deptScoreList" :key="index"
            center
            @click="deptItemClick()"
            title-style="text-align:left;padding-left:20px;">
            <span slot="default">{{item.done===true?item.avgScore:"打分未完成"}}</span>
            <span slot="title">{{ item.year }} 年第 {{ item.quarter }}季度</span>
            </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Toast, Tab, Tabs, List, Cell } from "vant";
import Vue from "vue";
import utils from "../util/utils";
import * as dd from "dingtalk-jsapi";
import axios from "axios";
Vue.use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell);

export default {
  mounted: () => {
      dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "数据分析排名"
      });
    });
    Date.prototype.getQuarter = function() {
      var month = this.getMonth() + 1;
      if(month  < 3) {
        return '1';
      }else if(month < 6) {
        return '2';
      }else if(month <9) {
        return '3';
      }else if(month <12) {
        return '4';
      }
    };
  },
  methods: {
    monthItemClick:function(item){
      this.$router.push({path:"/analyinfo",query: {deptId: item.deptId, quarter: new Date().getQuarter()}});
    },
    deptItemClick:function(){
      this.$router.push({path:"/analyinfo",query:{deptId:window.ddUserInfo.department[0],quarter:new Date().getQuarter()}});
    },
    loadMonthReport: function() {
      axios.get(this.global.javaapi+"/quarterScoreList").then(response=>{
        if(response.data.code !== 0){
          Toast("程序错误!请联系管理员");
          return;
        }
        window.console.log('response:' + JSON.stringify(response));
        if(response.data.result == null || response.data.result&&response.data.result.length==0){
          Toast("打分工作尚未完成，敬请稍候！");
          return;
        }
        this.monthScoreList=response.data.result;
      }).catch(error=>{
        utils.AlertError(error);
      });
    },
    loadDeptReport: function() {
      axios.get(this.global.javaapi+"/deptScoreList",{params:{deptId:window.ddUserInfo.department[0]}}).then(response=>{
        window.console.log('response1:' + JSON.stringify(response));
        if(response.data && response.data.code !== 0){
          Toast("程序错误!请联系管理员");
          return;
        }
        if(response.data){
          let data=[];
          var date = new Date();
          let m=new Date().getQuarter();
          let i,j;
          for(i=m,j=0;i>0;i--){
            if(response.data.result === null || j>=response.data.result.length||response.data.result[j].quarter<i){
              data.push({
                analysisDept: "",
                avgScore: 0,
                quarter: i,
                year: date.getFullYear(),
                done: true
              });
            }
            else{
              data.push(response.data.result[j]);
              j++;
            }
          }
          this.deptScoreList=data;
        }
      }).catch(error=>{
        utils.AlertError(error);
      });
    }
  },
  data() {
    return {
      monthScoreList: [],
      deptScoreList: []
    };
  }
};
</script>

<style>
</style>
