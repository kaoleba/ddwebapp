<template>
  <div>

    <van-tabs
      swipeable
      title-active-color="#0089ff"
      color="#0089ff"
    >
      <van-tab title="本月排行">
        
        <van-list @load="loadMonthReport">
          <van-cell
            v-for="item in monthScoreList"
            :key="item.proposal_dept"
            :title="item.proposal_dept"
            :value="item.score"
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
            @click="deptItemClick(item)"
            title-style="text-align:left;padding-left:20px;">
            <span slot="default">{{item.score==-1?"打分未完成":item.score}}</span>
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
  },
  methods: {
    monthItemClick:function(item){
      let monthorder=new Date().getMonth()+1;
      this.$router.push({path:"/adviceinfo",query:{deptid:item.proposal_dept,monthorder:monthorder}});
    },
    deptItemClick:function(item){
      this.$router.push({path:"/adviceinfo",query:{deptid:window.ddUserInfo.remark,monthorder:item.monthorder}});
    },
    loadMonthReport: function() {
      axios.get(this.global.ddapi+"/proposal/MonthScoreList").then(response=>{

        window.console.log(response);
        if(response.data&&response.data.length==0){
          Toast("打分工作尚未完成，敬请稍候！");
          return;
        }
        this.monthScoreList=response.data;
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
