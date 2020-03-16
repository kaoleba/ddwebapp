
<template>
  <div id="pf" ref="pfscroll">
    <div style="height:30px;font-size:20px;color:#07c160;line-height: 30px">{{type}}</div>
    <div style="display:flex;width:100% ;flex-wrap: wrap;justify-content : center;height:55px">
      <div style="width:20%;height:15px;" v-for=" (u,uindex)  in userList" :key="u">
        <a style="margin:1px">
          <van-button
            class="btn"
            :class="{'btnSelect':userListClass[u]}"
            plain
            hairline
            type="default"
            size="mini"
            @click="SelectUser(u,uindex)"
          >{{u.substring(u.length-3,u.length)}}</van-button>
        </a>
      </div>
    </div>
    <!-- <van-divider>抓基层党建工作述职评议测评表</van-divider> -->
    <div style="overflow-y:auto;" :style="{height: scrollerHeight}">
      <div
        class="panel"
        style="text-align: left;padding-left:8px;padding-right:5px; margin-top:10px;margin-bottom:10px;"
      >
        <van-panel
          style="height:20px"
          class="username"
          :title="(index+1)+'.'+username"
          :class="{'userselect':userListClass[username]}"
        ></van-panel>
      </div>
      <div
        class="panel"
        v-for=" pf in pfList"
        :key="pf"
        style="text-align: left;padding-left:8px;padding-right:5px;"
      >
        <van-panel :title="pf"></van-panel>

        <div style="text-align: center;margin-top:5px">
          <div style="text-align: center;margin-left:18px;margin-top:0px;margin-bottom:1px">
            <van-radio-group @change="changeValue()" v-model="scoreList[username][pf]">
              <van-row style="margin-top:4px;font-size:15px">
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="4">满意</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="3">较满意</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="2">一般</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="1">不满意</van-radio>
                </van-col>
              </van-row>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
    <van-button
      :disabled="save"
      style="font-size:18px"
      type="primary"
      @click="btnConfirm"
      block
    >{{btnTitle}}</van-button>
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
  Divider,
  DropdownMenu,
  DropdownItem,
  Sticky
} from "vant";
import Vue from "vue";
// import utils from "../util/utils";
//import axios from "axios";
import * as dd from "dingtalk-jsapi";

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
  .use(Divider)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Sticky);
export default {
  created: function() {
    this.type = this.$route.query.type;
    //     for (var k = 0; k < this.userList.length; k++) {
    //   this.scoreList[this.userList[k]] = {};
    //   this.userListClass[this.userList[k]] = false;
    //   for (var i = 0; i < this.pfList.length; i++) {
    //     this.scoreList[this.userList[k]][this.pfList[i]] = "";
    //   }
    // }
    // window.console.log(JSON.stringify(this.scoreList));
  },
  mounted: function() {
    let _this = this;
    dd.ready(function() {
      _this.ddfalg = false;
        //获取个人信息
        // dd.runtime.permission.requestAuthCode({
        //   corpId: _this.global.CorpId, // 企业id
        //   onSuccess: function(info) {
        //     var userUrl =
        //       _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
        //     axios
        //       .get(userUrl)
        //       //then获取成功；response成功后的返回值（对象）
        //       .then(res => {
        //         Toast.clear();
        //         if (res.data.errorMsg != "") {
        //           alert({
        //             "获取钉钉用户信息异常：": res.data.errorMsg
        //           });
        //         } else {
        //           alert(res.data.content);
        //         }
        //       })
        //       .catch(error => {
        //        alert("获取用户信息失败:" + error);
        //       });
        //   }
        // });
    });
    setTimeout(() => {
      if (!_this.ddfalg) {
        var s = localStorage.getItem(this.title) || "";
        if (s != "") {
          Dialog.alert({ title: "提示", message: "您的评价已提交" }).then(
            () => {
              this.btnTitle = "评价已提交";
              _this.ddfalg = true;
            }
          );
        } else {
          // Dialog.alert({
          //   title: this.type,
          //   message: this.title
          // });
        }
      } else {
        Dialog.alert({ title: "提示", message: "请使用钉钉扫描二维码！" });
        this.btnTitle = "请用钉钉扫描二维码";
      }
    }, 500);
  },
  data() {
    return {
      title: "纪委书记履职情况评议表",
      save: true,
      ddfalg: true,
      type: "",
      username: "董忠科",
      index: 0,
      btnTitle: "提交(0/15)",
      userList: [
        "董忠科",
        "秦 涛",
        "徐晓华",
        "胡彦峰",
        "张 卫",
        "杨现贵",
        "魏海峰",
        "付士军",
        "董凤广",
        "孙迎东",
        "张世海",
        "吴同德",
        "白云明",
        "翟若臣",
        "赵钦营"
      ],
      pfList: [
        "总体评价",
        "落实监督责任情况",
        "纪检监察工作成效情况",
        "作风建设、廉洁从业情况",
        "落实上级纪委交办工作情况",
        "纪监组织建设情况",
        "问题查摆分析情况",
        "工作打算情和措施",     
      ],
      userListClass: [],
      scoreList: {"董忠科":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"秦 涛":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"徐晓华":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"胡彦峰":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"张 卫":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"杨现贵":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"魏海峰":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"付士军":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"董凤广":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"孙迎东":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"张世海":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"吴同德":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"白云明":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"翟若臣":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""},"赵钦营":{"总体评价":"","落实监督责任情况":"","纪检监察工作成效情况":"","作风建设、廉洁从业情况":"","落实上级纪委交办工作情况":"","纪监组织建设情况":"","问题查摆分析情况":"","工作打算情和措施":""}}
    };
  },
  methods: {
    SelectUser(user, uindex) {
      this.username = user;
      this.index = uindex;
    },
    changeValue() {
      if (this.userListClass[this.username]) return;
      var flag = true;
      for (let i = 0; i < this.pfList.length; i++) {
        if (this.scoreList[this.username][this.pfList[i]] == "") {
          flag = false;
        }
      }
      this.userListClass[this.username] = flag;
      if (flag) {
        if (this.index != 14) {
          Toast.loading({
            message: "加载中...",
            loadingType: "spinner",
            duration: 500
          });
          this.index = this.index + 1;
          this.username = this.userList[this.index];
        }
      }

      let total = 0;
      for (var k = 0; k < this.userList.length; k++) {
        let flag = true;
        for (var i = 0; i < this.pfList.length; i++) {
          if (this.scoreList[this.userList[k]][this.pfList[i]] == "") {
            flag = false;
            break;
          }
        }
        if (flag) total++;
      }

      this.btnTitle = "提交(" + total + "/15)";
      if (total == 15) this.save = false;
    },
    btnConfirm() {
      let _this = this;

      var flag = true;
      for (var k = 0; k < this.userList.length; k++) {
        for (var i = 0; i < this.pfList.length; i++) {
          if (this.scoreList[this.userList[k]][this.pfList[i]] == "") {
            flag = false;
            break;
          }
        }
      }
      if (!flag) {
        Dialog.alert({ title: "提示", message: "请完成所有评分再提交" });
      } else {
        Dialog.confirm({
          title: this.type,
          message: "确定提交" + this.title + "？"
        })
          .then(() => {
            Toast.loading({
              message: "提交中...",
              loadingType: "spinner",
              duration: 0
            });
            _this.save = true;
            localStorage.setItem(_this.title, _this.type);
            Dialog.alert({
              title: "提示",
              message: "感谢您提交的评价！"
            }).then(() => {
              Toast.clear();
              _this.ddfalg = true;
            });
            // axios
            //   .post(this.global.ddapi + "Scoring/SaveSore", {
            //     title: _this.title,
            //     type: _this.type,
            //     score: _this.scoreList
            //   })
            //   .then(function(response) {
            //     Toast.clear();
            //     if (response.data == "") {
            //       localStorage.setItem(_this.title, _this.type);
            //       Dialog.alert({
            //         title: "提示",
            //         message: "感谢您提交的评价！"
            //       }).then(() => {
            //         _this.ddfalg = true;
            //       });
            //     } else {
            //       _this.save = false;
            //       Dialog.alert({ title: "提示", message: response.data });
            //     }
            //   })
            //   .catch(function(error) {
            //     Dialog.alert({ title: "提示", message: error });
            //     _this.save = false;
            //   });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 129 + "px";
    }
  }
};
</script>

<style>
#pf {
  font-size: 16px;
}

.btn {
  color: #ff9966 !important;
  font-size: 15px !important;
}

.btnSelect {
  color: #07c160 !important;
  font-size: 15px !important;
}

.username .van-cell__title {
  color: #ff9966;
  font-size: 20px;
  font-weight: bold;
}

.userselect .van-cell__title {
  color: #07c160;
  font-size: 20px;
  font-weight: bold;
}

.van-cell__title {
  color: #0099cc;
  font-size: 16px;
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px !important;
  border: none !important;
}

.van-cell:not(:last-child)::after {
  border-width: 0px !important;
  border: none !important;
}

.van-row {
  font-size: 16px;
}

.van-cell {
  padding: 3px 16px;
}
</style>

