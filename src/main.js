import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import { router } from './router';
import 'amfe-flexible';

Vue.config.productionTip = false
FastClick.attach(document.body)


new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')