import Vue from 'vue'
import Router from 'vue-router'
import jssIndex from '../views/jssIndex.vue'
import jssHome from '../views/jssHome.vue'
import jssZhongjian from '../views/jssZhongjian.vue'
import jssLogin from '../views/jssLogin.vue'
import jssReg from '../views/jssReg.vue'
import jssDi from '../views/jssDi.vue'
import jssCary from '../views/jssCary.vue'
import jssMy from '../views/jssMy.vue'
import jssHot from '../views/jssHot.vue'
//import jssLogin from '../views/jssLogin.vue'
import {
  List
} from 'vant'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/jsslogin'
    },
    {
      path: '/jssindex',
      redirect: '/jsszhongjian',
      component: jssIndex,
      children: [{
          path: '/jsszhongjian',
          component: jssZhongjian
        },
        {
          path: '/jssdi',
          component: jssDi
        },
        {
          path: '/jsscary',
          component: jssCary
        },
        {
          path: '/jssmy',
          component: jssMy
        },
        {
          path: '/jsshot',
          component: jssHot
        }
      ]
    },
    {
      path: '/jsshome',
      component: jssHome
    },
    {
      path: '/List',
      component: List
    },
    {
      path: '/jsslogin',
      component: jssLogin
    },
    {
      path: '/jssreg',
      component: jssReg
    }
  ]
})
export default router;
