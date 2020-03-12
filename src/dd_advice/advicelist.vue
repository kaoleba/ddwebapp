<template>
  <div id="advicelist">
    <van-row>
      <van-col span="16">
        <van-dropdown-menu>
          <van-dropdown-item v-model="statevalue" :options="option" @change="changeItem" />
          <van-dropdown-item title="筛选" ref="item" style="text-align: center;">
            <van-field v-model="ny" label="选择日期" readonly="readonly" @click="showPicker" />
            <van-row>
              <van-col span="12">
                <van-button block type="primary" @click="onCancel">重置</van-button>
              </van-col>
              <van-col span="12">
                <van-button block type="info" @click="onConfirm">确认</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-col>

      <van-col span="8">
        <van-sticky>
          <van-button
            style="position:absolute;top:10px;right:20px"
            icon="add-o"
            size="small"
            type="info"
            @click="onClickRight"
          >新增</van-button>
        </van-sticky>
      </van-col>
    </van-row>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-panel
          @click="open(item)"
          v-for="item in list"
          :key="item.proposal_id"
          :title="item.proposal_title"
          :desc="item.proposal_content.substring(0,50)"
          :icon="newIcon"
        >
          <div style="margin-left:30px;font-size:12px;border:none;  padding: 5px">
            <van-tag :type="formatType(item.state)">{{ formatState(item.state)}}</van-tag>

            {{formatDate(item.create_time)}}
          </div>
        </van-panel>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  NavBar,
  Toast,
  Icon,
  List,
  PullRefresh,
  Cell,
  Panel,
  DropdownMenu,
  DropdownItem,
  Switch,
  SwitchCell,
  Sticky,
  Field,
  Popup,
  DatetimePicker,
  Col,
  Row,
  Tag
} from "vant";
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
import dateutil from "../util/date";
import axios from "axios";
import utils from "../util/utils";

Vue.use(NavBar)
  .use(Toast)
  .use(Icon)
  .use(List)
  .use(PullRefresh)
  .use(Cell)
  .use(Panel)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Switch)
  .use(SwitchCell)
  .use(Sticky)
  .use(Field)
  .use(Popup)
  .use(DatetimePicker)
  .use(dd)
  .use(Col)
  .use(Row)
  .use(Tag);

export default {
  created: function() {
    if (typeof window.ddUserInfo == "undefined") {
      let _this = this;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration:5000,
      });
      var jsapiurl =
        this.global.ddapi + "DD/GetConfig?url=" + this.global.adviceurl;
      axios
        .get(jsapiurl)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          var res = response.data.content;
          dd.ready(function() {
            setTimeout(function() {
              dd.config({
                agentId: _this.global.agentId, // 必填，微应用ID
                corpId: res.CorpId, //必填，企业ID
                timeStamp: res.TimeStamp, // 必填，生成签名的时间戳
                nonceStr: res.NonceStr, // 必填，生成签名的随机串
                signature: res.Signature, // 必填，签名
                jsApiList: [
                  "runtime.info",
                  "biz.contact.complexPicker",
                  "biz.contact.departmentsPicker",
                  "biz.customContact.choose"
                ] // 必填，需要使用的jsapi列表，注意：不要带dd。
              });
              //获取个人信息
              dd.runtime.permission.requestAuthCode({
                corpId: res.CorpId, // 企业id
                onSuccess: function(info) {
               
                  var userUrl =
                    _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
                  axios
                    .get(userUrl)
                    //then获取成功；response成功后的返回值（对象）
                    .then(res => {
                         Toast.clear();
                      if (res.data.errorMsg != "") {
                        utils.AlertError({
                          "获取钉钉用户信息异常：": res.data.errorMsg
                        });
                      } else {
                        window.ddUserInfo = JSON.parse(res.data.content);
                        _this.onLoad();
                      }
                    })
                    .catch(error => {
                      utils.AlertError("获取用户信息失败:" + error);
                    });
                }
              });
            }, 1000);
          });
        })
        .catch(error => {
          utils.AlertError("访问配置api异常:" + error);
        });
    }
  },

  mounted: function() {
    this.currentDate = dateutil.formatTime("", "YYYY-MM");
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "建议提报"
      });
    });
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      statevalue: "全部建议",
      option: [
        { text: "全部建议", value: "全部建议" },
        { text: "参评建议", value: "参评建议" }
      ],
      newIcon: require("../assets/lk.png"),
      isRouterAlive: true,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      currentDate: "",
      ny: "",
      pageindex: 1
    };
  },
  methods: {
    showPicker() {
      let _this = this;
      dd.biz.util.datepicker({
        format: "yyyy-MM", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        onSuccess: function(result) {
          _this.ny = result.value;
        }
      });
    },
    formatState(state) {
      if (state == "0") return "未提交";
      if (state == "1") return "已提交";
      if (state == "3") return "已参评";
    },
    formatType(state) {
      if (state == "0") return "primary";
      if (state == "1") return "success";
      if (state == "3") return "warning";
    },
    formatDate(date) {
      try {
        return date.replace("T", " ");
      } catch {
        return "";
      }
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    onNYConfirm(value) {
      this.ny = value;
      this.showPicker = false;
      this.onRefresh();
    },
    changeItem() {
      this.onRefresh();
    },
    onCancel() {
      this.ny = "";
      this.onConfirm();
    },
    onConfirm() {
      this.$refs.item.toggle();
      this.onRefresh();
    },
    open(item) {
      this.$router.push({
        path: "/addadvice",
        query: {
          entity: item
        }
      });
    },

    onClickRight() {
      this.$router.push({ path: "/addadvice" });
    },
    onLoad() {
      let _this = this;

      //window.console.log(_this.list);

      if (window.ddUserInfo.userid != "") {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
            this.pageindex = 1;
          }
          axios
            .get(_this.global.ddapi + "proposal", {
              params: {
                page: _this.pageindex,
                state: _this.statevalue,
                ny: _this.ny,
                deptid: window.ddUserInfo.department[0]
              }
            })
            .then(function(response) {
              var resdata = response.data;
              for (let i = 0; i < resdata.length; i++) {
                // if (resdata[i].proposal_content.length > 50) {
                //   resdata[i].proposal_content =
                //     resdata[i].proposal_content.substring(0,50) + "...";
                // }
                _this.list.push(resdata[i]);
              }
              if (resdata.length < 20) _this.finished = true;
              else {
                _this.pageindex++;
              }
              _this.loading = false;
            })
            .catch(function(error) {
              alert(error);
              utils.AlertError(error);
            });
        }, 500);
      }
    },

    onRefresh() {
      // 清空列表数据
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }
  }
};

dd.error(function(err) {
  alert("钉钉鉴权失败，请联系管理员: " +  JSON.stringify(err));
  //utils.AlertError("钉钉鉴权失败，请联系管理员: " + JSON.stringify(err));
});
</script>
<style>
#advicelist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
