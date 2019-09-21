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
import jssInfo from '../views/jssInfo.vue'
import jssBench from '../views/jssBench.vue'
import jssHead from '../views/jssHead.vue'
import jssTishi from '../views/jssTishi.vue'
import jssSite from '../views/jssSite.vue'
import jssService from '../views/jssService.vue'
import jssPending from '../views/jssPending.vue'
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
      path: '/jsstishi',
      component: jssTishi
    },
    {
      path: '/jssindex',
      redirect: '/jsszhongjian',
      component: jssIndex,
      children: [{
          path: '/jsszhongjian',
          redirect: '/jsshead',
          component: jssZhongjian,
          children: [{
            path: '/jsshead',
            component: jssHead
          }, ]
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
        },
        {
          path: '/jssbench',
          component: jssBench
        }
      ]
    },
    {
      path: '/jsssite',
      component: jssSite
    },
    {
      path: '/jssservice',
      component: jssService
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
    },
    {
      path: '/jssinfo',
      component: jssInfo
    }, {
      path: '/jsspending',
      component: jssPending
    }
  ]
})
export default router;
