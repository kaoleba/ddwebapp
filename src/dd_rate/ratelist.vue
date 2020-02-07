<template>
  <div id="advicelist">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option" @change="changeItem" />
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

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-panel
          @click="open(item)"
          v-for="item in list"
          :key="item"
          title="关于大数据中心房屋123123"
          desc="大数据中心 2020-02-05阿斯顿发的发撒旦法打发的发的富士达富士达富士达富士达范德萨富士达富士达富士达"
          :icon="newIcon"
        ></van-panel>
      </van-list>
    </van-pull-refresh>

    <!-- <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onNYConfirm"
      />
    </van-popup>-->
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
  Row
} from "vant";
import Vue from "vue";
import * as dd from "dingtalk-jsapi";
import dateutil from "../util/date";

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
  .use(Row);

export default {
  mounted: function() {
    this.currentDate = dateutil.formatTime("", "YYYY-MM");
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "建议评分" //控制标题文本，空字符串表示显示默认文本
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
      value: "全部建议",
      option: [
        { text: "全部建议", value: "全部建议" },
        { text: "未评建议", value: "未评建议" },
        { text: "已评建议", value: "已评建议" }
      ],
      newIcon: require("../assets/logo.png"),
      isRouterAlive: true,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      currentDate: "",
      ny: ""
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
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },

    changeItem() {
      Toast.loading({
        message: this.value,
        forbidClick: true
      });
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
        path: "/rate",
        query: {
          id: item,
          title: "编辑测试",
          message: "测试内容很多在这不一一展示了"
        }
      });
    },

    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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
