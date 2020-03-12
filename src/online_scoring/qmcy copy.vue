
<template>
  <div id="pf" ref="pfscroll">
    <van-sticky>
      <div style="display:flex;width:100% ;flex-wrap: wrap;justify-content : center;height:65px">
        <div v-for=" u  in userList" :key="u">
          <a :href="'#'+u" style="margin:1px">
            <van-button
              class="btn"
              :class="{'btnSelect':userListClass[u]}"
              plain
              hairline
              type="default"
              size="mini"
            >{{u.substring(u.length-3,u.length)}}</van-button>
          </a>
        </div>
      </div>
      <!-- <van-divider>抓基层党建工作述职评议测评表</van-divider> -->
    </van-sticky>
    <div style="overflow-y:auto;" :style="{height: scrollerHeight}">
      <div :id="user" v-for=" user  in userList" :key="user">
        <div
          class="panel"
          style="text-align: left;padding-left:8px;padding-right:5px; margin-top:10px;margin-bottom:10px;"
        >
          <van-panel class="username" :title="user" :class="{'userselect':userListClass[user]}"></van-panel>
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
              <van-radio-group v-model="scoreList[user][pf]">
                <van-row style="margin-top:6px;font-size:17px">
                  <van-col span="6">
                    <van-radio @click="changeValue('4',user,pf)" name="4">好</van-radio>
                  </van-col>
                  <van-col span="6">
                    <van-radio @click="changeValue('3',user,pf)" name="3">较好</van-radio>
                  </van-col>
                  <van-col span="6">
                    <van-radio @click="changeValue('2',user,pf)" name="2">一般</van-radio>
                  </van-col>
                  <van-col span="6">
                    <van-radio @click="changeValue('1',user,pf)" name="1">差</van-radio>
                  </van-col>
                </van-row>
              </van-radio-group>
            </div>
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
    >{{this.type}}评价</van-button>
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
    for (var k = 0; k < this.userList.length; k++) {
      this.scoreList[this.userList[k]] = {};
      this.userListClass[this.userList[k]] = false;
      for (var i = 0; i < this.pfList.length; i++) {
        this.scoreList[this.userList[k]][this.pfList[i]] = "";
      }
    }

    this.$forceUpdate();
  },
  mounted: function() {
    let _this = this;
    dd.ready(function() {
      _this.save = false;
    });
    setTimeout(() => {
      if (!this.save) {
        var s = localStorage.getItem(this.title) || "";
        if (s != "") {
          this.save = true;
          Dialog.alert({ title: "提示", message: "您的评价已提交" });
        } else {
          Dialog.alert({
            title: this.type,
            message: this.title
          });
        }
      } else {
        Dialog.alert({ title: "提示", message: "请使用钉钉扫描二维码！" });
      }
    }, 500);
  },
  data() {
    return {
      title: "全面从严治党述职评议测评",
      save: true,
      type: "",
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
        "对落实全面从严治党责任的认识熟悉程度",
        "履行全面从严治党	职责情况",
        "推动重点任务落实	情况及成效",
        "查摆履行全面从严治党责任存在的问题情况",
        "下一步履行全面从严治党责任的思路措施"
      ],
      userListClass: [],
      scoreList: {}
    };
  },
  methods: {
    changeValue(v, user, pf) {
      this.scoreList[user][pf] = v;
      //window.console.log(this.scoreList);
      var flag = true;
      for (let i = 0; i < this.pfList.length; i++) {
        if (this.scoreList[user][this.pfList[i]] == "") {
          flag = false;
        }
      }
      this.userListClass[user] = flag;
      this.$forceUpdate();
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
            _this.save = true;
            axios
              .post(this.global.ddapi + "Scoring/SaveSore", {
                title: _this.title,
                type: _this.type,
                score: _this.scoreList
              })
              .then(function(response) {
                if (response.data == "") {
                  localStorage.setItem(_this.title, _this.type);
                  Dialog.alert({
                    title: "提示",
                    message: "感谢您提交的评价！"
                  }).then(() => {
                    //location.reload();
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
      return window.innerHeight - 109 + "px";
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

