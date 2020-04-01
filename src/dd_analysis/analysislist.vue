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
          :key="item.analysis_id"
          :title="item.analysis_title"
          :desc="item.analysis_content.substring(0,50)"
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

  mounted: function() {
    this.currentDate = dateutil.formatTime("", "YYYY-MM");
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "数据分析"
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
      statevalue: "全部分析",
      option: [
        { text: "全部分析", value: "全部分析" },
        { text: "参评分析", value: "参评分析" }
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
        path: "/analysis",
        query: {
          entity: item
        }
      });
    },

    onClickRight() {
      this.$router.push({ path: "/analysis" });
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
            .get(_this.global.ddapi + "analysis", {
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

</script>
<style>
#advicelist {
  margin-bottom: 45px;
  text-align: left;
}
</style>
