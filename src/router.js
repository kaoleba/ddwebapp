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
    children: [{
        path: 'advicelist',
        component: () => import('./dd_advice/advicelist.vue'),
      },
      {
        path: 'adgridmain',
        component: () => import('./dd_report/rategridmain.vue'),
      }
    ]
  },
  {
    path: '/ratemain',
    component: () => import('./components/ratemain.vue'),
    children: [{
        path: 'ratelist',
        component: () => import('./dd_rate/ratelist.vue'),

      },
      {
        path: 'rategridmain',
        component: () => import('./dd_report/rategridmain.vue'),
      }
    ]
  },
  {//建议信息详情
    path:'/adviceinfo',
    component:()=>import('./dd_report/adviceinfo.vue')
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
  {
    path: '/host_user',
    component: () => import('./dd_org/host_user.vue'),
  },
  {
    path: '/jcdj',
    component: () => import('./online_scoring/jcdj.vue'),
    meta: {
      "title": "抓基层党建述职评议测评"
    }
  },
  {
    path: '/qmcy',
    component: () => import('./online_scoring/qmcy.vue'),
    meta: {
      "title": "全面从严治党述职评议测评"
    }
  },
  {
    path: '/qchc',
    component: () => import('./online_scoring/qchc.vue'),
  },
  {
    path: '/jw',
    component: () => import('./online_jwscoring/jw.vue'),
    meta:{"title":"纪委书记履职情况评议表"}
  },
  {
    path: '/jwqchc',
    component: () => import('./online_jwscoring/jwqchc.vue'),
  },
  {
    path: '/vote/:dept/:type',
    component: () => import('./vote/index.vue'),
    meta:{"title":"领导干部推荐"}
  },
  {
    path:"/votedetail",
    component:()=>import('./vote/vote.vue'),
    meta:{"title":"领导干部推荐"}
  }
]

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};