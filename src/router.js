import Vue from 'vue'
import Router from 'vue-router'



Vue.use(VueRouter);

export default new Router(
{
   routes:[
     {
       path:'/advice/addadvice',
       name:'addadvice',
       component:addadvice
     },
     {
       path:'/advice/advicelist',
       name:'advicelist',
       component:advicelist
     }
  ]
})