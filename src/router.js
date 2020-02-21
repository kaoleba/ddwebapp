import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const routes = [
  {
    path: '/advicemain',
    component: () => import('./components/advicemain.vue'),
    children: [
      {
        path: 'advicelist',
        component: () => import('./dd_advice/advicelist.vue'),
      },
      {
        path: 'adgridmain',
        component: () => import('./dd_report/adgridmain.vue'),
      }
    ]
  },
  {
    path: '/ratemain',
    component: () => import('./components/ratemain.vue'),
    children: [
      {
        path: 'ratelist',
        component: () => import('./dd_rate/ratelist.vue'),

      },
      {
        path: 'rategridmain',
        component: () => import('./dd_report/rategridmain.vue'),
      }
    ]
  },
  {
    path: '/addadvice',
    component: () => import('./dd_advice/addadvice.vue'),
  },
  {
    path: '/rate',
    component: () => import('./dd_rate/rate.vue'),
  },
  {
    path: '/ratenew',
    component: () => import('./dd_rate/ratenew.vue'),
  },
]

const router = new Router({ routes });

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
//   }
//   next();
// });

export {
  router
};
