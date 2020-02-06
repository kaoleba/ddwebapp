import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const routes =[
  {
    path: '*',
    redirect: '/main/advicelist'
  },
  {
    path: '/main',
    component:() => import('./components/main.vue'),
    children: [
      {
        path: 'advicelist',
        component:() => import('./dd_advice/advicelist.vue'),
      },
      {
        path: 'ratelist',
        component:() => import('./dd_rate/ratelist.vue'),
      },
      {
        path: 'gridmain',
        component:() => import('./dd_report/gridmain.vue'),
      }
    ]
  },
  {
    path: '/addadvice',
    component:() => import('./dd_advice/addadvice.vue'),
  },
  {
    path: '/rate',
    component:() => import('./dd_rate/rate.vue'),
  },
]

const router = new Router({ routes });


export {
  router
};
