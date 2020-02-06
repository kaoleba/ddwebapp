<template>
  <div id="advicelist">
    <van-row>
      <van-col span="6">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" @change="changeItem" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-panel
          @click="open(item)"
          v-for="item in list"
          :key="item"
          title="关于大数据中心房屋123123"
          desc="大数据中心 2020-02-05阿斯顿发的发撒旦法打发的发的富士达富士达富士达富士达范德萨富士达富士达富士达"
          :icon="newIcon"
        >
        </van-panel>
      </van-list>
    </van-pull-refresh>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onNYConfirm"
      />
    </van-popup>
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
      showPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    };
  },
  methods: {
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
    },
    changeItem() {
      Toast.loading({
        message: this.value,
        forbidClick: true
      });
    },
    onConfirm() {
      this.$refs.item.toggle();
    },

    open(item) {
       this.$router.push({ path: "/rate" , query: {'id':item,'title':'编辑测试','message':'测试内容很多在这不一一展示了'}});
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
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
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
