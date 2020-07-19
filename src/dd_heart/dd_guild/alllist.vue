<template>
  <div id="dd_channel_alllist">
    <van-row>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="statevalue" :options="option" @change="changeItem" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="16">
        <van-search v-model="searchvalue" placeholder="请输入搜索关键词" @search="onSearch" />
      </van-col>
    </van-row>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-panel
          @click="open(item)"
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          :desc="item.content.substring(0,50)"
          :icon="newIcon"
        >
          <div style="margin-left:30px;font-size:12px;border:none;  padding: 5px">
            <van-tag :type="formatType(item.state)">{{ formatState(item.state)}}</van-tag>
            <van-tag
              style="margin-left:5px;margin-right:5px;"
              :type="formatType(item.state)"
            >{{ item.type}}</van-tag>
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
  Search
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
  .use(Tag)
  .use(Search);

export default {
  mounted: function() {
    this.currentDate = dateutil.formatTime("", "YYYY-MM");
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "全部留言"
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
      searchvalue: "",
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
      currentDate: "",
      ny: "",
      pageindex: 1
    };
  },
  methods: {
    formatState(state) {
      if (state == -1) return "不处理";
      if (state == 0) return "未处理";
      if (state == 1) return "处理中";
      if (state == 2) return "已完成";
    },
    formatType(state) {
      if (state == -1) return "danger";
      if (state == 0) return "primary";
      if (state == 1) return "warning";
      if (state == 2) return "success";
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
    open(item) {
      this.$router.push({
        path: "/guild_detail",
        query: {
          entity: item
        }
      });
    },

    onLoad() {
      let _this = this;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 5000
      });

      //window.console.log(_this.list);

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
            key: _this.searchvalue
          }
        })
        .then(function(response) {
          Toast.clear();
          var resdata = response.data;
          for (let i = 0; i < resdata.length; i++) {
            _this.list.push(resdata[i]);
          }
          if (resdata.length < 20) _this.finished = true;
          else {
            _this.pageindex++;
          }
          _this.loading = false;
        })
        .catch(function(error) {
          Toast.clear();
          utils.AlertError(error);
        });
    },
    onSearch() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.onLoad();
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
#dd_channel_alllist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
