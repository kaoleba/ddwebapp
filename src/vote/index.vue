<template>
  <div>
    <div class="vote-body">
      <van-panel>
        <div slot="header">
          <van-divider class="header-alert">
            <van-icon name="star"></van-icon>
            <span style="padding:0 15px;font-size:24px;">组织人事纪律要求</span>
            <van-icon name="star"></van-icon>
          </van-divider>
        </div>
        <div style="padding-bottom:10px;">
          <p>一、要严格遵守中央纪委、中央组织部“5个严禁、17个不准、5个一律”纪律要求。</p>
          <p>二、凡通过宴请、送礼、安排消费活动、打电话、发短信、当面拜访等形式，或委托、授意中间人出面说情，或通过举办同学、同乡、同事、战友等联谊活动，请求他人给予自己关照等行为，均属拉票行为，必须坚决禁止。</p>
          <p>三、对核查属实有拉票行为的人员，给予严肃处理。考察工作开始前发现并查实的，不得列入被推荐人选名单；考察过程中发现并查实的，是考察对象的，一律排除出考察人选；考察结束后发现并查实的，已提拔的，责令辞职、免职、降职。同时，要予以通报批评，记录在案，作为今后评价使用干部的重要依据。应当给予纪律处分的，移交纪检监察部门处理。</p>
          <p>四、参与、帮助他人拉票的，同样属于严重违反组织人事纪律的行为，比照为自己拉票的行为给予相应处理。对接受有拉票意图的宴请、收受拉票人礼品或参与拉票人安排的消费活动的，也要给予严肃批评教育。</p>
        </div>
      </van-panel>
      <van-cell>
        <div slot="default">
          <van-checkbox v-model="validate" :disabled="disabled">阅读完毕并接受组织人事纪律要求</van-checkbox>
        </div>
      </van-cell>
    </div>
    <div class="vote-footer">
      <van-button type="info" round @click="confirmClick" :disabled="!validate">确定</van-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Panel, Divider, Icon, Dialog, Checkbox, Cell } from "vant";
import axios from "axios";
import * as dd from "dingtalk-jsapi";

Vue.use(Button)
  .use(Panel)
  .use(Divider)
  .use(Icon)
  .use(Dialog)
  .use(Checkbox)
  .use(Cell);

export default {
  created: function() {
    if (dd.env.platform == "notInDingTalk") {
      Dialog({
        title: "提示",
        message: "请使用钉钉打开！"
      });
      return;
    }
    let _this = this;
    dd.ready(function() {
      //获取个人信息
      dd.runtime.permission.requestAuthCode({
        corpId: _this.global.CorpId, // 企业id
        onSuccess: function(info) {
          var userUrl = _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
          axios
            .get(userUrl)
            //then获取成功；response成功后的返回值（对象）
            .then(res => {
              window.ddUserInfo = JSON.parse(res.data.content);
              axios
                .get(
                  _this.global.ddapi +
                    "/vote/checksubmit?userid=" +
                    window.ddUserInfo.userid+"&type="+_this.$route.params.type
                )
                .then(response => {
                  if (response.status == 200 && response.data == 0) {
                    _this.disabled = false;
                  } else {
                    _this.disabled = true;
                    Dialog({
                      title: "提示",
                      message: "您已经提交投票！"
                    });
                  }
                });
            });
        }
      });
    });
    axios
      .get(
        _this.global.ddapi +
          "/vote/voteintimecount?dept=" +
          _this.$route.params.dept
      )
      .then(response => {
        if (response.data) {
          _this.disabled = false;
          _this.vote_id = response.data;
          return;
        }
        Dialog({
          title: "提示",
          message: "无投票活动或者现在尚未处于可投票的时间段！"
        }).then(() => {
          _this.disabled = true;
        });
      });
  },
  data() {
    return {
      disabled: true,
      validate: false,
      vote_id: ""
    };
  },
  methods: {
    confirmClick: function() {
      this.$router.push({
        path: "/votedetail",
        query: {
          dept: this.$route.params.dept,
          vote_id: this.vote_id,
          type: this.$route.params.type
        }
      });
    }
  }
};
</script>
<style>
* {
  font-size: 16px;
  box-sizing: border-box;
}
.header-alert {
  padding: 20px 0 15px 0;
  color: red;
  border-color: red;
  font-size: 20px;
}
.header-info {
  padding: 15px 0;
  color: #1989fa;
  border-color: #1989fa;
  font-size: 18px;
}
.vote-body {
  position: relative;
  left: 0;
  top: 0;
  padding-bottom: 90px;
}
p {
  padding: 0 15px;
  text-align: left;
  word-break: break-all;
  text-indent: 2em;
}
.vote-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background: #ffffff;
  z-index: 99;
}
.vote-footer button {
  width: 100%;
}
.van-checkbox__label {
  color: #0089ff;
}
</style>