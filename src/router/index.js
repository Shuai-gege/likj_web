import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



const xinjian = () => import('@/pages/car/xinjian') // 首页




const stock = () => import('@/pages/stock/stock') // 云仓
const stockdetail = () => import('@/pages/stock/stockdetail') // 云仓详情





const home = () => import('@/pages/home/home') // 首页
const detail = () => import('@/pages/home/detail') // 商品详情
const search = () => import('@/pages/home/search') // 搜索页面
const goodsList = () => import('@/pages/home/goodsList') // 商品列表
const show = () => import('@/pages/home/show') // 未授权页面


const worker = () => import('@/pages/worker/worker') // 工作台
const agentType = () => import('@/pages/worker/agentType') // 邀请代理方式选择
const inviteagent = () => import('@/pages/worker/inviteagent') // 邀请代理
const audit = () => import('../pages/worker/audit') //审核授权
const ccie = () => import('../pages/worker/Ccie') //授权证书
const xiajidingdan = () => import('../pages/worker/xiajidingdan') //下级订单
const xiajiorderDetail = () => import('../pages/worker/xiajiorderDetail') //下级订单详情
const zhuandanorder = () => import('../pages/worker/zhuandanorder') //转单记录
const tuijianjiang = () => import('../pages/worker/tuijianjiang') //推荐奖
const shenqing = () => import('../pages/worker/shenqing') //申请授权
const bonus = () => import('../pages/worker/bonus') //奖金列表
const auditcontent = () => import("../pages/worker/auditcontent") //消息中心
const message = () => import("../pages/worker/message") //审核详情页
const mydata = () => import('@/pages/worker/mydata') // 个人资料
const myshoukuanxinxi = () => import('@/pages/worker/myshoukuanxinxi') //我的收款账户
const shangjishoukuan = () => import('@/pages/worker/shangjishoukuan') //上级收款收款账户
const shoukuan = () => import('@/pages/worker/shoukuan') // 公司收款账户
const update = () => import('@/pages/worker/update') // 我要升级
const updateRecord = () => import('@/pages/worker/updateRecord') // 升级记录
const updateDetail = () => import('@/pages/worker/updateDetail') // 升级详情
const Certification = () => import('@/pages/worker/Certification') // 实名认证

const hot = () => import('@/pages/hot/hot') // 热卖商品

const car = () => import('@/pages/car/car') // 购物车
const confirmOrder = () => import('@/pages/car/confirmOrder') // 确认订单
const offline = () => import('@/pages/car/offline') // 线下支付

const my = () => import('@/pages/my/my') // 我的
const myteam = () => import('@/pages/my/myteam') // 我的团队
const mysuperior = () => import('@/pages/my/mysuperior') // 我的上级
const mypurse = () => import('@/pages/my/mypurse') // 我的钱包
const topup = () => import('@/pages/my/topup') // 充值
const mydetail = () => import('@/pages/my/mydetail') // 可提现余额明细
const chongzhilist = () => import('@/pages/my/chongzhilist') // 充值明细
const tixianlist = () => import('@/pages/my/tixianlist') // 充值明细
const topuplist = () => import('../pages/my/topuplist') //下级充值记录
const topuporder = () => import('../pages/my/topuporder') //下级充值记录详情
const xiajitixianlist = () => import('../pages/my/xiajitixianlist') //下级提现记录
const xiajitixian = () => import('../pages/my/xiajitixian') //下级提现记录详情
const tixian = () => import('@/pages/my/tixian') // 提现
const tixianinfo = () => import('@/pages/my/tixianinfo') // 提现明细详情
const recordinfo = () => import('@/pages/my/recordinfo') // 提现明细详情
const myshoukuan = () => import('@/pages/my/myshoukuan') //收款账户设置
const teamcenter = () => import('@/pages/my/teamcenter') // 团队中心
const WLK = () => import('@/pages/my/WLK') // 团队活动
const addWLK = () => import('@/pages/my/addWLK') // 添加团队活动
const yonghu = () => import('@/pages/my/yonghu') // 用户
const yinsi = () => import('@/pages/my/yinsi') // 隐私
const login = () => import('../pages/my/login') //登录
const set = () => import('@/pages/my/set') // 设置
const address = () => import('@/pages/my/address') // 地址列表
const edit_address = () => import('@/pages/my/edit_address') // 地址列表
const add_address = () => import('@/pages/my/add_address') // 添加地址
const modify_psd = () => import('@/pages/my/modify_psd') // 修改登录密码
const payPsd = () => import('@/pages/my/payPsd') // 修改登录密码
const yuncangLog = () => import('@/pages/my/yuncangLog') // 云仓记录


const orderList = () => import('@/pages/order/orderList') // 订单列表
const backMoney = () => import('@/pages/order/backMoney') // 订单列表
const orderDetail = () => import('@/pages/order/orderDetail') // 订单详情
const wuliu = () => import('@/pages/order/wuliu') // 物流

let router = new Router({
  routes: [{
      path: "/", //APP首页
      name: "home",
      component: home,
      meta: {
        ifShow_Footbar: true
      }
    },
    {
      path: "/detail", //商品详情
      name: "detail",
      component: detail
    },
    {
      path: "/xinjian", //新建
      name: "xinjian",
      component: xinjian
    },
    {
      path: "/search", //搜索
      name: "search",
      component: search
    },
    {
      path: "/goodsList", //搜索
      name: "goodsList",
      component: goodsList,
      meta: {
        ifShow_Footbar: true
      }
    },
    {
      path: "/worker", //工作台
      name: "worker",
      component: worker,
      meta: {
        ifShow_Footbar: true
      }
    },
    {
      path: "/agentType", //邀请代理方式选择
      name: "agentType",
      component: agentType
    },
    {
      path: "/inviteagent", //邀请代理
      name: "inviteagent",
      component: inviteagent
    },
    {
      path: "/audit", //审核授权
      name: "audit",
      component: audit
    },

    {
      path: "/tuijianjiang", //推荐奖
      name: "tuijianjiang",
      component: tuijianjiang
    },
    {
      path: "/shenqing", //申请授权
      name: "shenqing",
      component: shenqing
    },
    {
      path: "/ccie", //授权证书
      name: "ccie",
      component: ccie
    },
    {
      path: "/auditcontent", //审核详情页
      name: "auditcontent",
      component: auditcontent
    },

    {
      path: "/stock", //云仓
      name: "stock",
      component: stock
    },
    {
      path: "/xiajidingdan", //下级订单
      name: "xiajidingdan",
      component: xiajidingdan
    },

    {
      path: "/xiajiorderDetail", //下级订单详情
      name: "xiajiorderDetail",
      component: xiajiorderDetail
    },
    {
      path: "/zhuandanorder", //转单记录
      name: "zhuandanorder",
      component: zhuandanorder
    },
    {
      path: "/stockdetail", //云仓详情
      name: "stockdetail",
      component: stockdetail
    },
    {
      path: "/message", //信息中心
      name: "message",
      component: message
    },
    {
      path: "/mydata", //个人资料
      name: "mydata",
      component: mydata
    },
    {
      path: "/shoukuan", //公司收款账户
      name: "shoukuan",
      component: shoukuan
    },
    {
      path: '/myshoukuan', //我的收款账户
      name: 'myshoukuan',
      component: myshoukuan,
    },
    {
      path: '/shangjishoukuan', //上级收款账户
      name: 'shangjishoukuan',
      component: shangjishoukuan,
    },
    {
      path: '/myshoukuanxinxi', //个人收款账户
      name: 'myshoukuanxinxi',
      component: myshoukuanxinxi,
    },
    {
      path: "/update", //我要升级
      name: "update",
      component: update
    },
    {
      path: "/updateDetail", //升级详情
      name: "updateDetail",
      component: updateDetail
    },
    {
      path: "/updateRecord", //升级记录
      name: "updateRecord",
      component: updateRecord
    },
    {
      path: "/bonus", //奖金列表
      name: "bonus",
      component: bonus
    },
    {
      path: "/Certification",
      name: "Certification",
      component: Certification
    },
    {
      path: "/hot", //热卖商品
      name: "hot",
      component: hot,
      meta: {
        // ifShow_Footbar: true,
      }
    },
    {
      path: "/car", //购物车
      name: "car",
      component: car,
      meta: {
        ifShow_Footbar: true
      }
    },

    {
      path: "/my", //我的
      name: "my",
      component: my,
      meta: {
        ifShow_Footbar: true
      }
    },
    {
      path: "/myteam", //我的团队
      name: "myteam",
      component: myteam
    },
    {
      path: "/WLK", //团队活动
      name: "WLK",
      component: WLK
    },
    {
      path: "/addWLK", //团队活动
      name: "addWLK",
      component: addWLK
    },
    {
      path: "/mysuperior", //我的上级
      name: "mysuperior",
      component: mysuperior
    },
    {
      path: "/mypurse", //我的钱包
      name: "mypurse",
      component: mypurse
    },
    {
      path: "/topup", //充值
      name: "topup",
      component: topup
    },
    {
      path: "/chongzhilist", //充值明细
      name: "chongzhilist",
      component: chongzhilist
    },
    {
      path: "/tixianlist", //充值明细
      name: "tixianlist",
      component: tixianlist
    },
    {
      path: "/recordinfo", //充值明细详情
      name: "recordinfo",
      component: recordinfo
    },
    {
      path: "/topuplist", //下级充值记录
      name: "topuplist",
      component: topuplist
    },
    {
      path: "/topuporder", //下级充值记录详情
      name: "topuporder",
      component: topuporder
    },
    {
      path: "/xiajitixianlist", //下级提现记录
      name: "xiajitixianlist",
      component: xiajitixianlist
    },
    {
      path: "/xiajitixian", //下级提现记录详情
      name: "xiajitixian",
      component: xiajitixian
    },
    {
      path: "/tixian", //提现
      name: "tixian",
      component: tixian
    },
    {
      path: "/tixianinfo", //提现详情
      name: "tixianinfo",
      component: tixianinfo
    },
    {
      path: "/mydetail",
      name: "mydetail",
      component: mydetail
    },
    {
      path: "/teamcenter", //个人中心
      name: "teamcenter",
      component: teamcenter
    },
    {
      path: "/set", //设置
      name: "set",
      component: set
    },
    {
      path: "/confirmOrder", //确认订单
      name: "confirmOrder",
      component: confirmOrder
    },
    {
      path: "/offline", //线下支付
      name: "offline",
      component: offline
    },
    {
      path: "/show", //未授权页面
      name: "show",
      component: show
    },
    {
      path: "/yonghu", //用户
      name: "yonghu",
      component: yonghu
    },
    {
      path: "/yinsi", //隐私
      name: "yinsi",
      component: yinsi
    },
    {
      path: "/login", //登录
      name: "login",
      component: login
    },
    {
      path: "/address", //地址列表
      name: "address",
      component: address
    },
    {
      path: "/edit_address", //编辑地址
      name: "edit_address",
      component: edit_address
    },
    {
      path: "/add_address", //添加地址
      name: "add_address",
      component: add_address
    },
    {
      path: "/modify_psd", //修改密码
      name: "modify_psd",
      component: modify_psd
    },
    {
      path: "/payPsd", //修改密码
      name: "payPsd",
      component: payPsd
    },

    {
      path: "/orderList", //订单列表
      name: "orderList",
      component: orderList
    },
    {
      path: "/orderDetail", //订单详情
      name: "orderDetail",
      component: orderDetail
    },
    {
      path: "/wuliu", //物流
      name: "wuliu",
      component: wuliu
    },
    {
      path: "/backMoney", //物流
      name: "backMoney",
      component: backMoney
    },
    {
      path: "/yuncangLog", //云仓记录
      name: "yuncangLog",
      component: yuncangLog
    }
  ],

  //该方法用于控制滚动行为，
  scrollBehavior(to, form, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

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
