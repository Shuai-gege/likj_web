import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const home = () => import('@/pages/home/home') // 首页
const worker = () => import('@/pages/worker/worker') // 工作台
const hot = () => import('@/pages/hot/hot') // 热卖商品
const car = () => import('@/pages/car/car') // 购物车
const my = () => import('@/pages/my/my') // 我的




let router = new Router({
  routes: [{
      path: '/', //APP首页
      name: 'home',
      component: home,
      meta: {
        ifShow_Footbar: true,
      }
    },
    {
      path: '/worker', //工作台
      name: 'worker',
      component: worker,
      meta: {
        ifShow_Footbar: true,
      }
    },
    {
      path: '/hot', //热卖商品
      name: 'hot',
      component: hot,
      meta: {
        ifShow_Footbar: true,
      }
    },
    {
      path: '/car', //购物车
      name: 'car',
      component: car,
      meta: {
        ifShow_Footbar: true,
      }
    },
    {
      path: '/my', //我的
      name: 'my',
      component: my,
      meta: {
        ifShow_Footbar: true,
      }
    },
  ],





  //该方法用于控制滚动行为，
  scrollBehavior(to, form, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
})

// 登录拦截
// router.beforeEach((to, from, next) => {
// 	// 判断有没有登录
// 	if (!localStorage.getItem("token")) {
// 		// to.path == "/register"
// 		if (to.path == "/login" || to.path == "/forgetPsd" || to.path == '/shareReg') {
// 			next();
// 		} else {
// 			next({ path: "/login" });
// 		}
// 	} else {
// 		next();
// 	}
// });


export default router;
