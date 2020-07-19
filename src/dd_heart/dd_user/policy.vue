
<template>
  <div>
     <iframe :src="`http://portal.lykyjt.com:7098/kms/knowledge/mobile/index.jsp?moduleName=%E5%AE%89%E5%85%A8%E5%9F%B9%E8%AE%AD&filter=1&queryStr=orderby%3DdocPublishTime%26ordertype%3Ddown%26categoryId%3D1729bb7815e333fba5466564471afb52%26q.docStatus%3D30#path=0&query=q.docCategory%3A1729bb7815e333fba5466564471afb52%3B`" frameborder="0" scrolling="auto" width="100%" height="100%"  style="overflow-y:scroll;" :style="{height: scrollerHeight}"></iframe>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Button } from "vant";
import * as dd from "dingtalk-jsapi";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(dd);

export default {
  mounted: function() {
    dd.ready(function() {
      dd.biz.navigation.setTitle({
        title: "政策法规"
      });
      dd.ui.webViewBounce.disable();
    });
  },
  methods: {
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 48 + "px";
    }
  }
};
</script>

<style>

</style>
