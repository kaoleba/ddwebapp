import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import Router from 'vue-router'
import 'amfe-flexible';
 

Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

FastClick.attach(document.body)
Vue.use(Router)

import addadvice from './advice/addadvice.vue'
import advicelist from './advice/advicelist.vue'
import test from './components/test.vue'
import main from './components/main.vue'

const router = new Router(

  {
    routes: [
      {
        path: '*',
        redirect: '/main/advicelist'
      },
      {
        path: '/main',
        component: main,
        children: [
          {
            path: 'advicelist',
            component: advicelist
          },
          {
            path: 'test',
            component: test
          }
        ]
      },
      {
        path: '/addadvice',
        component: addadvice
      },
    ]
  })

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')