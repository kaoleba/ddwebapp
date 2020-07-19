<template>
  <div id="dd_heart_userlist">
    <van-row>
      <van-col span="18">
        <van-search v-model="searchvalue" placeholder="请输入搜索关键词" @search="onSearch" />
      </van-col>

      <van-col span="6">
        <van-sticky>
          <van-button
            style="position:absolute;top:10px;right:20px"
            icon="add-o"
            size="small"
            type="info"
            @click="onClickRight"
          >留言</van-button>
        </van-sticky>
      </van-col>
    </van-row>

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
  Sticky,
  Col,
  Row,
  Tag,
  Search,
  Button
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
  .use(Sticky)
  .use(dd)
  .use(Col)
  .use(Row)
  .use(Tag)
  .use(Search).use(Button);

export default {
  mounted: function() {
    this.currentDate = dateutil.formatTime("", "YYYY-MM");
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "民生通道"
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
    onSearch() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    open(item) {
      this.$router.push({
        path: "/channel_message",
        query: {
          entity: item
        }
      });
    },

    onClickRight() {
      this.$router.push({ path: "/channel_message" });
    },
    onLoad() {
      let _this = this;

      if (this.refreshing) {
        _this.list = [];
        _this.refreshing = false;
        _this.pageindex = 1;
      }
      axios
        .get(_this.global.ddapi + "channel", {
          params: {
            page: _this.pageindex,
            state: "2",
            key: _this.searchvalue
          }
        })
        .then(function(response) {
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
          alert(error);
          utils.AlertError(error);
        });
    }
  },

  onRefresh() {
    // 清空列表数据
    this.refreshing = true;
    this.finished = false;
    this.loading = true;
    this.onLoad();
  }
};
</script>
<style>
#dd_heart_userlist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
