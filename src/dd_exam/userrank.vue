<template>
  <div>
    <van-cell-group>
      <van-field v-model="examDate" size="large" label="选择日期" readonly="readonly" @click="showPicker" />
      <van-field readonly v-model="company" size="large" label="单位" />
      <van-field readonly v-model="dept" size="large" label="部门" />
      <van-field readonly v-model="userName" size="large" label="姓名" />
      <van-field readonly v-model="score" size="large" label="分数" />
      <van-field readonly v-model="second" size="large" label="用时(秒)" />
      <van-field readonly v-model="dwRancking" size="large" label="单位排名" />
      <van-field readonly v-model="jtRancking" size="large" label="集团排名" />
    </van-cell-group>

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
      />
    </van-popup>
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
  Row,
  Tag,
  Popup,
  DatetimePicker,
  Swipe,
  SwipeItem,
  Lazyload
} from "vant";
import * as dd from "dingtalk-jsapi";
import Vue from "vue";
import axios from "axios";
import utils from "../util/utils";
import dateutil from "../util/date";

Vue.use(Button)
  .use(Toast)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(dd)
  .use(Row)
  .use(Tag)
  .use(Popup)
  .use(DatetimePicker).use(Swipe).use(SwipeItem).use(Lazyload);

export default {
  created: function() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 5000
    });
    let _this = this;
    _this.examDate = dateutil.getNextDate(-1);
    _this.currentDate=new Date(_this.examDate);
    // _this.jobnumber="10019098";
    // _this.GetRankindg( _this.jobnumber, _this.examDate);

    dd.ready(function() {
      //获取个人信息
      dd.runtime.permission.requestAuthCode({
        corpId: _this.global.CorpId, // 企业id
        onSuccess: function(info) {
          _this.userName=info.code;
          var userUrl = _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
          userUrl='http://172.16.0.75/LKSFRZAPI/api/APPIDMIdentify?systemID=7f053021-b10b-5220-d5af-562ab3922fd4&randomCode='+info.code;
            _this.userName=userUrl;
          axios
            .get(userUrl)
            //then获取成功；response成功后的返回值（对象）
            .then(res => {
              alert(JSON.stringify(res))
              if (res.data.errorMsg != "") {
                utils.AlertError({
                  "获取钉钉用户信息异常：": res.data.errorMsg
                });
              } else {
                Toast.clear();
                let userinfo = JSON.parse(res.data.content);
                _this.jobnumber = userinfo.jobnumber;
                _this.GetRankindg( _this.jobnumber, _this.examDate);
              }
            })
            .catch(error => {
              utils.AlertError("获取用户信息失败:" + error);
                 utils.AlertError(JSON.stringify(error.response));
            });
        }
      });
    });
  },

  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "个人排名"
      });
    });
  },
  data() {
    return {
      userName: "",
      code: "",
      company: "",
      dept: "",
      second: "",
      score: "",
      jtRancking: "",
      dwRancking: "",
      examDate: "",
      show: false,
       minDate: new Date(2020,5,10),
      maxDate: new Date(2025,5,20),
      currentDate: '',
      jobnumber:'',
    };
  },
  methods: {
    GetRankindg(Code, ExamDate) {
      let _this = this;

      axios
        .get(
          _this.global.ddapi +
            "Exam/GetRank?Code=" +
            Code +
            "&ExamDate=" +
            ExamDate
        )
        .then(res => {
          var rank = res.data;
          window.console.log(rank);         
          _this.userName = rank.userName;
          _this.code = rank.code;
          _this.company = rank.company;
          _this.dept = rank.dept;
          _this.second = rank.second;        
          _this.score = rank.score;
          _this.jtRancking = rank.jtRancking;
          _this.dwRancking = rank.dwRancking;        
          if(rank=='')
          {
            utils.AlertError("未查询到考试信息");
          }
        })
        .catch(error => {
          utils.AlertError("获取排名信息失败:" + error);
        });
    },
    showPicker() {
      this.show = true;
    },
    confirm()
    {
      this.examDate = dateutil.formatTime(this.currentDate, "YYYY-MM-DD");
      this.show = false;
      setTimeout(() => {
         this.GetRankindg(this.jobnumber, this.examDate);
      }, 1000);
     
    }
  }
};
</script>
<style>
#advicelist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
