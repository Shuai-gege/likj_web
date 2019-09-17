import Vue from 'vue'
import Router from 'vue-router'
import jssIndex from '../views/jssIndex.vue'
//import jssHome from '../views/jssHome.vue'
import { List } from 'vant'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      component:jssIndex
    },
    {
      path:'/List',
      component:List
    }
  ]
})
export default router;
