<template>
  <div id="advicelist">
    <van-row>
      <van-col span="6">
        <div style="text-align: right;font-size:15px;margin-top:13px">帮办状态：</div>
      </van-col>
      <van-col span="6">
        <van-dropdown-menu>
          <van-dropdown-item v-model="statevalue" :options="option" @change="changeItem" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="12">
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
          @click="opendetail(item)"
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          :desc="item.content.substring(0,50)"
          :icon="newIcon"
        >
          <div style="margin-left:30px;font-size:12px;border:none;  padding: 5px">
            <van-tag :type="formatType(item.state)">{{ formatState(item.state)}}</van-tag>
            {{formatDate(item.createdate)}}
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
  Tag,
  Button
} from "vant";
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
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
  .use(Tag)
  .use(Button);

export default {
  created: function() {
    if (typeof window.ddUserInfo == "undefined") {
      let _this = this;
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 5000
      // });

      //获取个人信息
      dd.runtime.permission.requestAuthCode({
        corpId: _this.global.CorpId, // 企业id
        onSuccess: function(info) {
          var userUrl = _this.global.ddapi + "DD/GetUserInfo?code=" + info.code;
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
    }
  },

  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "工会帮办"
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
      statevalue: "",
      option: [
        { text: "全部", value: "" },
        { text: "不处理", value: "-1" },
        { text: "未处理", value: "0" },
        { text: "处理中", value: "1" },
        { text: "已完成", value: "2" }
      ],
      newIcon: require("../../assets/lk.png"),
      isRouterAlive: true,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      ny: "",
      pageindex: 1
    };
  },
  methods: {
    formatState(state) {
      if (state == "0") return "未处理";
      if (state == "1") return "处理中";
      if (state == "2") return "已完成";
    },
    formatType(state) {
      if (state == "0") return "primary";
      if (state == "1") return "info";
      if (state == "2") return "success";
    },
    formatDate(date) {
      try {
        return date.replace("T", " ");
      } catch {
        return "";
      }
    },
    changeItem() {
      this.onRefresh();
    },
    onCancel() {
      this.ny = "";
      this.onConfirm();
    },
    open(item) {
      this.$router.push({
        path: "/guild_add",
        query: {
          entity: item
        }
      });
    },
    opendetail(item) {
      this.$router.push({
        path: "/guild_detail",
        query: {
          entity: item
        }
      });
    },

    onClickRight() {
      this.$router.push({ path: "/guild_add" });
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
            .get(_this.global.ddapi + "guild", {
              params: {
                page: _this.pageindex,
                state: _this.statevalue,
                userid: window.ddUserInfo.userid
                // userid:'05273505221222370'
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
              Toast.clear();
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
</script>
<style>
#advicelist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
