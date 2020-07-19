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
      path: 'analysislist',
      component: () => import('./dd_analysis/analysislist.vue'),
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
    children: [{
      path: 'ratelist',
      component: () => import('./dd_rate/ratelist.vue'),

    },
    {
      path: 'analyratelist',
      component: () => import('./dd_rate/analyratelist.vue'),
    },
    {
      path: 'adgridmain',
      component: () => import('./dd_report/adgridmain.vue'),
    }
    ]
  },
  {
    path: '/exammain',
    component: () => import('./components/exammain.vue'),
    children: [{
      path: 'userrank',
      component: () => import('./dd_exam/userrank.vue'),

    },
    {
      path: 'deptrank',
      component: () => import('./dd_exam/deptrank.vue'),
    }
    ]
  },
  // {
  //   path: '/heartuser',
  //   component: () => import('./dd_heart/dd_user/main.vue'),
  //   children: [{
  //     path: 'list',
  //     component: () => import('./dd_heart/dd_user/list.vue'),
  //   },
  //   {
  //     path: 'email',
  //     component: () => import('./dd_heart/dd_user/email.vue'),
  //   },
  //   {
  //     path: 'policy',
  //     component: () => import('./dd_heart/dd_user/policy.vue'),
  //   },
  //   ]
  // },


  {
    path: '/dd_channel',
    component: () => import('./dd_heart/dd_channel/main.vue'),
    children: [{
      path: 'syslist',
      component: () => import('./dd_heart/dd_channel/syslist.vue'),
    },
    {
      path: 'alllist',
      component: () => import('./dd_heart/dd_channel/alllist.vue'),
    }
    ]
  },
  {
    path: '/heart_list',
    component: () => import('./dd_heart/dd_user/list.vue'),
  },
  {
    path: '/heart_email',
    component: () => import('./dd_heart/dd_user/email.vue'),
  },
  {
    path: '/heart_policy',
    component: () => import('./dd_heart/dd_user/policy.vue'),
  },

  {
    path: '/guild_userlist',
    component: () => import('./dd_heart/dd_guild/userlist.vue'),
  },
  {
    path: '/guild_add',
    component: () => import('./dd_heart/dd_guild/add.vue'),
  },
  {
    path: '/dd_guild',
    component: () => import('./dd_heart/dd_guild/main.vue'),
    children: [{
      path: 'syslist',
      component: () => import('./dd_heart/dd_guild/syslist.vue'),
    },
    {
      path: 'alllist',
      component: () => import('./dd_heart/dd_guild/alllist.vue'),
    }
    ]
  },
  {
    path: '/channel_detail',
    component: () => import('./dd_heart/dd_channel/detail.vue'),
  },
  {
    path: '/channel_flow',
    component: () => import('./dd_heart/dd_channel/flow.vue'),
  },
  {
    path: '/channel_reply',
    component: () => import('./dd_heart/dd_channel/reply.vue'),
  },
  {
    path: '/channel_todo',
    component: () => import('./dd_heart/dd_channel/todo.vue'),
  },
  {
    path: '/channel_message',
    component: () => import('./dd_heart/dd_channel/message.vue'),
  },
  {
    path: '/channel_userlist',
    component: () => import('./dd_heart/dd_channel/userlist.vue'),
  },
  {
    path: '/channel_syslist',
    component: () => import('./dd_heart/dd_channel/syslist.vue'),
  },
  {
    path: '/channel_system',
    component: () => import('./dd_heart/dd_channel/system.vue'),
  },
  {
    path: '/channel_flow',
    component: () => import('./dd_heart/dd_channel/flow.vue'),
  },
  {
    path: '/guild_userlist',
    component: () => import('./dd_heart/dd_guild/userlist.vue'),
  },
  {
    path: '/guild_system',
    component: () => import('./dd_heart/dd_guild/system.vue'),
  },
  {
    path: '/guild_reply',
    component: () => import('./dd_heart/dd_guild/reply.vue'),
  },
  {
    path: '/guild_detail',
    component: () => import('./dd_heart/dd_guild/detail.vue'),
  },
  {//建议信息详情
    path: '/adviceinfo',
    component: () => import('./dd_report/adviceinfo.vue')
  },
  {//专业数据分析信息详情
    path: '/analyinfo',
    component: () => import('./dd_report/analyinfo.vue')
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
    path: '/analysis',
    component: () => import('./dd_analysis/analysis.vue'),
  },
  {
    path: '/propReport',
    component: () => import('./dd_report/propReport.vue'),
  },
  {
    path: '/analyReport',
    component: () => import('./dd_report/analyReport.vue'),
  },
  {
    path: '/totalReport',
    component: () => import('./dd_report/totalReport.vue'),
  },
  {
    path: '/analyrate',
    component: () => import('./dd_rate/analyrate.vue'),
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
    meta: { "title": "纪委书记履职情况评议表" }
  },
  {
    path: '/jwqchc',
    component: () => import('./online_jwscoring/jwqchc.vue'),
  },
  {
    path: '/vote/:dept/:type',
    component: () => import('./vote/index.vue'),
    meta: { "title": "领导干部推荐" }
  },
  {
    path: '/food',
    component: () => import('./online_food/index.vue'),
    meta: { "title": "机关食堂满意度测评" }
  },
  {
    path: "/votedetail",
    component: () => import('./vote/vote.vue'),
    meta: { "title": "领导干部推荐" }
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