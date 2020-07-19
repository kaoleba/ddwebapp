<template>
  <div id="dd_channel_syslist">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-panel
          @click="open(item)"
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          :desc="item.message.substring(0,50)"
          :icon="newIcon"
        >
          <div
            style="margin-left:30px;font-size:12px;border:none;  padding: 5px"
          >{{formatDate(item.createdate)}}</div>
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
import dateutil from "../../util/date";
import axios from "axios";
import utils from "../../util/utils";

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
        duration: 5000
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
                  "biz.customContact.choose",
                  "biz.ding.create"
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
        title: "待处理"
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
      newIcon: require("../../assets/lk.png"),
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
    formatDate(date) {
      try {
        return date.replace("T", " ");
      } catch {
        return "";
      }
    },

    onConfirm() {
      this.$refs.item.toggle();
      this.onRefresh();
    },
    open(item) {
      if (item.state == 0 || item.nextcode == "hsj") {
        this.$router.push({
          path: "/channel_system",
          query: {
            entity: item
          }
        });
      } else {
        if (item.nextcode == "sys") {
          this.$router.push({
            path: "/channel_reply",
            query: {
              entity: item
            }
          });
        } else {
          this.$router.push({
            path: "/channel_flow",
            query: {
              entity: item
            }
          });
        }
      }
    },

    onLoad() {
      let _this = this;
      if (window.ddUserInfo.userid != "") 
      {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          axios
            .get(_this.global.ddapi + "channel/GetMessage", {
              params: {
                 Code: window.ddUserInfo.jobnumber
                //Code: "10034488"
              }
            })
            .then(function(response) {
              var resdata = response.data;
              for (let i = 0; i < resdata.length; i++) {
                _this.list.push(resdata[i]);
              }
              Toast.clear();
              _this.loading = false;
              _this.finished = true;
            })
            .catch(function(error) {
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
  alert("钉钉鉴权失败，请联系管理员: " + JSON.stringify(err));
});
</script>
<style>
#dd_channel_syslist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
