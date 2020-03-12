
<template>
  <div id="pf" ref="pfscroll">
    <div style="height:40px;font-size:20px;color:#07c160;line-height: 40px">{{type}}</div>
    <div style="display:flex;width:100% ;flex-wrap: wrap;justify-content : center;height:65px">
      <div v-for=" (u,uindex)  in userList" :key="u">
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

        <div style="text-align: center;font-size:13px;margin-top:5px">
          <div
            style="text-align: center;font-size:12px;margin-left:35px;margin-top:10px;margin-bottom:10px"
          >
            <van-radio-group @change="changeValue()" v-model="scoreList[username][pf]">
              <van-row style="margin-top:6px;font-size:17px">
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="4">好</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="3">较好</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="2">一般</van-radio>
                </van-col>
                <van-col span="6">
                  <van-radio :disabled="ddfalg" name="1">差</van-radio>
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
import axios from "axios";
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
  },
  mounted: function() {
    let _this = this;
    dd.ready(function() {
      _this.ddfalg = false;
       dd.ui.webViewBounce.disable();
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
          Dialog.alert({
            title: this.type,
            message: this.title
          });
        }
      } else {
        Dialog.alert({ title: "提示", message: "请使用钉钉扫描二维码！" });
        this.btnTitle = "请用钉钉扫描二维码";
      }
    }, 500);
  },
  data() {
    return {
      title: "抓基层党建述职评议测评",
      save: true,
      ddfalg: true,
      type: "",
      username: "古城煤矿党委书记伦庆忠",
      index: 0,
      btnTitle: "提交(0/14)",
      userList: [
        "古城煤矿党委书记伦庆忠",
        "菏泽煤电公司党委书记李存禄",
        "王楼煤矿党委书记白景志",
        "新驿煤矿党委书记庄又军",
        "田庄煤矿党委书记李宗国",
        "邱集煤矿党委书记武善元",
        "株柏煤矿党委书记齐东合",
        "上海庙矿业公司党委书记肖庆华",
        "永明煤矿党委书记李新山",
        "会宝岭铁矿党委书记邵昌友",
        "玻纤公司党委书记牛爱君",
        "物商集团党委书记庄树伟",
        "技师学院党委书记李 泉",
        "集团公司机关党委书记陈立海"
      ],
      pfList: [
        "总体评价",
        "对抓基层党建工作的认识熟悉程度",
        "履行抓基层党建工作责任情况",
        "推动重点任务落实情况及成效",
        "查摆抓基层党建工作中存在问题",
        "下一步抓好基层党建工作的思路措施"
      ],
      userListClass: [],
      scoreList: {
        古城煤矿党委书记伦庆忠: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        菏泽煤电公司党委书记李存禄: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        王楼煤矿党委书记白景志: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        新驿煤矿党委书记庄又军: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        田庄煤矿党委书记李宗国: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        邱集煤矿党委书记武善元: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        株柏煤矿党委书记齐东合: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        上海庙矿业公司党委书记肖庆华: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        永明煤矿党委书记李新山: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        会宝岭铁矿党委书记邵昌友: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        玻纤公司党委书记牛爱君: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        物商集团党委书记庄树伟: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        "技师学院党委书记李 泉": {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        },
        集团公司机关党委书记陈立海: {
          总体评价: "",
          对抓基层党建工作的认识熟悉程度: "",
          履行抓基层党建工作责任情况: "",
          推动重点任务落实情况及成效: "",
          查摆抓基层党建工作中存在问题: "",
          下一步抓好基层党建工作的思路措施: ""
        }
      }
    };
  },
  methods: {
    SelectUser(user, uindex) {
      this.username = user;
      this.index = uindex;
    },
    changeValue() {
      var flag = true;
      for (let i = 0; i < this.pfList.length; i++) {
        if (this.scoreList[this.username][this.pfList[i]] == "") {
          flag = false;
        }
      }
      this.userListClass[this.username] = flag;
      if (flag) {
        if (this.index != 13) {
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

      this.btnTitle = "提交(" + total + "/14)";
      if (total == 14) this.save = false;
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
            axios
              .post(this.global.ddapi + "Scoring/SaveSore", {
                title: _this.title,
                type: _this.type,
                score: _this.scoreList
              })
              .then(function(response) {
                Toast.clear();
                if (response.data == "") {
                  localStorage.setItem(_this.title, _this.type);
                  Dialog.alert({
                    title: "提示",
                    message: "感谢您提交的评价！"
                  }).then(() => {
                    _this.ddfalg = true;
                  });
                } else {
                  _this.save = false;
                  Dialog.alert({ title: "提示", message: response.data });
                }
              })
              .catch(function(error) {
                Dialog.alert({ title: "提示", message: error });
                _this.save = false;
              });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 149 + "px";
    }
  }
};
</script>

<style>
#pf {
  font-size: 16px;
}

.username .van-cell__title {
  color: #ff9966;
  font-size: 20px;
  font-weight: bold;
}

.btn {
  color: #ff9966 !important;
  font-size: 15px !important;
}

.btnSelect {
  color: #07c160 !important;
  font-size: 15px !important;
}

.userselect .van-cell__title {
  color: #07c160;
  font-size: 20px;
  font-weight: bold;
}

.van-cell__title {
  color: #0099cc;
  font-size: 18px;
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

