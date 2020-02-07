import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import { router } from './router';
import 'amfe-flexible';

Vue.config.productionTip = false

FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

FastClick.attach(document.body)


new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')