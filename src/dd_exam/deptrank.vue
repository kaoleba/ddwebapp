<template>
  <div id="deptrank">
    <van-cell-group style="padding-left:10px">
      <van-field
        v-model="examDate"
        size="large"
        label="选择日期"
        readonly="readonly"
        @click="showPicker"
      />
    </van-cell-group>
    <van-list v-model="loading" :finished="finished">
      <van-panel
        v-for="item in list"
        :key="item.rank+item.company"
        :title="item.rank+'.'+item.company"
        :status="'总成绩:'+item.zcj"
      >
        <div
          style="margin-left:20px;font-size:13px;border:none;  padding: 2px"
        >{{ '比例排名:'+item.cspm+' 在册人数:'+item.zcNumber+' 考试人数:'+item.csNumber+' 参赛比例:'+item.csbl }}</div>
        <div
          style="margin-left:20px;font-size:13px;border:none;  padding: 2px"
        >{{ '成绩排名:'+item.cjpm+' 合计成绩:'+item.hjcj+' 平均成绩:'+item.pjcj }}</div>
      </van-panel>
    </van-list>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  Toast,
  Field,
  Cell,
  List,
  CellGroup,
  Popup,
  DatetimePicker,
  Panel
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";
import utils from "../util/utils";
import dateutil from "../util/date";

Vue.use(Toast)
  .use(Field)
  .use(Cell)
  .use(List)
  .use(CellGroup)
  .use(dd)
  .use(Popup)
  .use(DatetimePicker)
  .use(Panel);

export default {
  created: function() {
    // Toast.loading({
    //   message: "加载中...",
    //   forbidClick: true,
    //   duration: 5000
    // });
    let _this = this;
    _this.examDate = dateutil.getNextDate(-1);
    _this.currentDate = new Date(_this.examDate);
    // _this.jobnumber="10019098";
    // _this.GetRankindg( _this.jobnumber, _this.examDate);
    _this.GetRankindg(_this.examDate);
  },

  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "单位综合排名"
      });
    });
  },
  data() {
    return {
      list: [],
      examDate: "",
      show: false,
      loading: false,
      finished: false,
      refreshing: false,
      minDate: new Date(2020, 5, 10),
      maxDate: new Date(2025, 5, 20),
      currentDate: ""
    };
  },
  methods: {
    GetRankindg(ExamDate) {
      let _this = this;

      axios
        .get(_this.global.ddapi + "Exam/GetDeptRank?ExamDate=" + ExamDate)
        .then(res => {
          //  Toast.clear();
          var resdata = res.data;
          if (resdata.length == 0) {
            utils.AlertError("未查询到考试信息");
          } else {
            for (let i = 0; i < resdata.length; i++) {
              _this.list.push(resdata[i]);
            }
          }
          _this.finished = true;
        })
        .catch(error => {
          utils.AlertError("获取排名信息失败:" + error);
        });
    },
    showPicker() {
      this.show = true;
    },
    confirm() {
      let _this = this;
      window.console.log(_this.currentDate);
      _this.examDate = dateutil.formatTime(_this.currentDate, "YYYY-MM-DD");
      _this.list = [];
      _this.show = false;
      setTimeout(() => {
        _this.GetRankindg(_this.examDate);
      }, 500);
      //this.GetRankindg(this.examDate);
    },
    cancel() {
      this.show = false;
    }
  }
};
</script>
<style>
#deptrank {
  margin-bottom: 45px;
  text-align: left;
}

.van-panel__header-value {
  color: #0099cc;
}

.van-list .van-cell__title {
  font-size: 16px;
  color: #ff9966;
  height: 20px;
}
</style>
