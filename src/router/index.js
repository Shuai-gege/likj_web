import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const myaccount = () => import("@/pages/car/myaccount"); // 我的收款账户

const stock = () => import("@/pages/stock/stock"); // 云仓
const stockdetail = () => import("@/pages/stock/stockdetail"); // 云仓详情

const home = () => import("@/pages/home/home"); // 首页
const detail = () => import("@/pages/home/detail"); // 商品详情
const search = () => import("@/pages/home/search"); // 搜索页面
const goodsList = () => import("@/pages/home/goodsList"); // 商品列表
const show = () => import("@/pages/home/show"); // 未授权页面

// 工作台
const worker = () => import("@/pages/worker/worker"); // 工作台
const wodeshoukuan = () => import("@/pages/worker/wodeshoukuan"); // 我的首款账户
const agentType = () => import("@/pages/worker/agentType"); // 邀请代理方式选择
const inviteagent = () => import("@/pages/worker/inviteagent"); // 邀请代理
const audit = () => import("../pages/worker/audit"); //审核授权
const ccie = () => import("../pages/worker/Ccie"); //授权证书
const downorder = () => import("../pages/worker/downorder"); //下级订单
const xiajiorderDetail = () => import("../pages/worker/xiajiorderDetail"); //下级订单详情
const zhuandanorder = () => import("../pages/worker/zhuandanorder"); //转单记录
const tuijianjiang = () => import("../pages/worker/tuijianjiang"); //推荐奖
const applyfor = () => import("../pages/worker/applyfor"); //申请授权
const applyfor1 = () => import("../pages/worker/applyfor1"); //web申请授权
const bonus = () => import("../pages/worker/bonus"); //奖金列表
const authorization = () => import("../pages/worker/authorization"); //消息中心
const message = () => import("../pages/worker/message"); //审核详情页
const mydata = () => import("@/pages/worker/mydata"); // 个人资料
const myshoukuanxinxi = () => import("@/pages/worker/myshoukuanxinxi"); //我的收款账户信息
const shangjishoukuan = () => import("@/pages/worker/shangjishoukuan"); //上级收款收款账户
const shoukuan = () => import("@/pages/worker/shoukuan"); // 公司收款账户
const update = () => import("@/pages/worker/update"); // 我要升级
const updateRecord = () => import("@/pages/worker/updateRecord"); // 升级记录
const updateDetail = () => import("@/pages/worker/updateDetail"); // 升级详情
const Certification = () => import("@/pages/worker/Certification"); // 实名认证
const dailichaxun = () => import("@/pages/worker/dailichaxun"); // 代理查询


const hot = () => import("@/pages/hot/hot"); // 热卖商品
const echart = () => import("@/pages/hot/echart"); // 试一试echart

const ceshi = () => import("@/pages/worker/ceshi"); // 测试看看
const ceshi1 = () => import("@/pages/worker/ceshi1"); // 测试看看

// 购物车
const car = () => import("@/pages/car/car"); // 购物车
const confirmOrder = () => import("@/pages/car/confirmOrder"); // 确认订单
const offline = () => import("@/pages/car/offline"); // 线下支付

// 我的
const my = () => import("@/pages/my/my"); // 我的
const newmy = () => import("@/pages/my/newmy"); // 信我的
const myteam = () => import("@/pages/my/myteam"); // 我的团队
const mysuperior = () => import("@/pages/my/mysuperior"); // 我的上级
const myVip = () => import("@/pages/my/myVip"); // 我的会员
const mypurse = () => import("@/pages/my/mypurse"); // 我的钱包
const topup = () => import("@/pages/my/topup"); // 充值
const mydetail = () => import("@/pages/my/mydetail"); // 可提现余额明细
const chongzhilist = () => import("@/pages/my/chongzhilist"); // 充值明细
const tixianlist = () => import("@/pages/my/tixianlist"); // 充值明细
const topuplist = () => import("../pages/my/topuplist"); //下级充值记录
const topupremind = () => import("../pages/my/topupremind"); //下级充值记录详情
const xiajitixianlist = () => import("../pages/my/xiajitixianlist"); //下级提现记录
const downwithdraw = () => import("../pages/my/downwithdraw"); //下级提现记录详情
const tixian = () => import("@/pages/my/tixian"); // 提现
const tixianinfo = () => import("@/pages/my/tixianinfo"); // 提现明细详情
const recordinfo = () => import("@/pages/my/recordinfo"); // 提现明细详情详情
const change = () => import("@/pages/my/change"); // 余额转货款
const myshoukuan = () => import("@/pages/my/myshoukuan"); //收款账户设置
const teamcenter = () => import("@/pages/my/teamcenter"); // 团队中心
const WLK = () => import("@/pages/my/WLK"); // 团队活动
const addWLK = () => import("@/pages/my/addWLK"); // 添加团队活动
const yonghu = () => import("@/pages/my/yonghu"); // 用户
const yinsi = () => import("@/pages/my/yinsi"); // 隐私
const login = () => import("../pages/my/login"); //登录
const set = () => import("@/pages/my/set"); // 设置
const set_tel = () => import("@/pages/my/set_tel"); // 设置手机号
const address = () => import("@/pages/my/address"); // 地址列表
const edit_address = () => import("@/pages/my/edit_address"); // 地址列表
const add_address = () => import("@/pages/my/add_address"); // 添加地址
const modify_psd = () => import("@/pages/my/modify_psd"); // 修改登录密码
const login_psd = () => import("@/pages/my/login_psd"); // 修改登录密码
const payPsd = () => import("@/pages/my/payPsd"); // 修改登录密码
const yuncangLog = () => import("@/pages/my/yuncangLog"); // 云仓记录
const orderList = () => import("@/pages/order/orderList"); // 订单列表
const backMoney = () => import("@/pages/order/backMoney"); // 订单列表
const orderDetail = () => import("@/pages/order/orderDetail"); // 订单详情
const wuliu = () => import("@/pages/order/wuliu"); // 物流
const moneydetail = () => import("@/pages/my/moneydetail"); // 资金明细

// 店铺
const rule = () => import("@/pages/store/rule"); //免责声明
const applystore = () => import("@/pages/store/applystore"); // 申请店铺
const newstore = () => import("@/pages/store/newstore"); // 店铺上新
const mystore = () => import("@/pages/store/mystore"); // 我的店铺
const noticeDetail = () => import("@/pages/store/noticeDetail"); // 公告详情
const storeorder = () => import("@/pages/store/storeorder"); // 店铺订单
const wuliuCode = () => import("@/pages/store/wuliuCode"); // 物流信息

const sucaiconter = () => import("../pages/worker/tool/sucaiconter"); // 素材中心
const material = () => import("../pages/worker/tool/material"); // 新素材中心
const upsucai = () => import("../pages/worker/tool/upsucai"); // 上传素材
const mysucai = () => import("../pages/worker/tool/mysucai"); // 上传素材
const fake = () => import("../pages/worker/tool/fake"); // 防伪查询
const school = () => import("../pages/worker/tool/school"); // 商学院
const rank = () => import("../pages/worker/tool/rank"); // 商学院

// const coursecontent = () => import("../pages/worker/coursecontent"); // 商学院
const live_detail = () => import("../pages/worker/tool/live_detail"); // 直播详情
const touwen_detail = () => import("../pages/worker/tool/touwen_detail"); // 图文详情
const area_agent = () => import("../pages/worker/tool/area_agent"); // 区域代理
const up_area_agent = () => import("../pages/worker/tool/up_area_agent"); // 升级区域代理
const courseup = () => import("../pages/worker/courseup"); // 课程上传

let router = new Router({
  routes: [{
      path: "/", //APP首页
      name: "home",
      component: home,
      meta: {
        ifShow_Footbar: true,
        title: "首页"
      }
    },
    {
      path: "/detail", //商品详情
      name: "detail",
      component: detail,
      meta: {
        title: "商品详情"
      }
    },
    {
      path: "/myaccount", //我的收款账户
      name: "myaccount",
      component: myaccount,
      meta: {
        title: "我的收款账户"
      }
    },
    {
      path: "/search", //搜索
      name: "search",
      component: search,
      meta: {
        title: "搜索"
      }
    },
    {
      path: "/goodsList", //搜索
      name: "goodsList",
      component: goodsList,
      meta: {
        ifShow_Footbar: true,
        title: "热卖商品"
      }
    },
    {
      path: "/worker", //工作台
      name: "worker",
      component: worker,
      meta: {
        ifShow_Footbar: true,
        title: "工作台"
      }
    },
    {
      path: "/ceshi", //测试看看
      name: "ceshi",
      component: ceshi,
      meta: {
        title: "测试看看"
      }
    },
    {
      path: "/ceshi1", //测试看看
      name: "ceshi1",
      component: ceshi1,
      meta: {
        title: "测试看看"
      }
    },
    {
      path: "/mysucai", //我的素材
      name: "mysucai",
      component: mysucai,
      meta: {
        title: "我的素材"
      }
    },
    {
      path: "/fake", //防伪查询
      name: "fake",
      component: fake,
      meta: {
        title: "防伪查询"
      }
    },

    {
      path: "/dailichaxun", //代理查询
      name: "dailichaxun",
      component: dailichaxun,
      meta: {
        title: "代理查询"
      }
    },
    {
      path: "/wodeshoukuan", //我的收款信息
      name: "wodeshoukuan",
      component: wodeshoukuan,
      meta: {
        title: "我的收款信息"
      }
    },
    {
      path: "/agentType", //邀请代理方式选择
      name: "agentType",
      component: agentType,
      meta: {
        title: "邀请代理方式选择"
      }
    },
    {
      path: "/inviteagent", //邀请代理
      name: "inviteagent",
      component: inviteagent,
      meta: {
        title: "邀请"
      }
    },
    {
      path: "/audit", //审核授权
      name: "audit",
      component: audit,
      meta: {
        title: "审核授权"
      }
    },

    {
      path: "/tuijianjiang", //推荐奖
      name: "tuijianjiang",
      component: tuijianjiang,
      meta: {
        title: "推荐奖"
      }
    },
    {
      path: "/applyfor", //申请授权
      name: "applyfor",
      component: applyfor,
      meta: {
        title: "申请授权"
      }
    },
    {
      path: "/applyfor1", //web申请授权
      name: "applyfor1",
      component: applyfor1,
      meta: {
        title: "申请授权"
      }
    },
    {
      path: "/ccie", //授权证书
      name: "ccie",
      component: ccie,
      meta: {
        title: "授权证书"
      }
    },
    {
      path: "/authorization", //审核详情页
      name: "authorization",
      component: authorization,
      meta: {
        title: "审核详情页"
      }
    },

    {
      path: "/stock", //云仓
      name: "stock",
      component: stock,
      meta: {
        title: "云仓"
      }
    },
    {
      path: "/downorder", //下级订单
      name: "downorder",
      component: downorder,
      meta: {
        title: "下级订单"
      }
    },

    {
      path: "/xiajiorderDetail", //下级订单详情
      name: "xiajiorderDetail",
      component: xiajiorderDetail,
      meta: {
        title: "下级订单详情"
      }
    },
    {
      path: "/zhuandanorder", //转单记录
      name: "zhuandanorder",
      component: zhuandanorder,
      meta: {
        title: "转单记录"
      }
    },
    {
      path: "/stockdetail", //云仓详情
      name: "stockdetail",
      component: stockdetail,
      meta: {
        title: "云仓详情"
      }
    },
    {
      path: "/message", //信息中心
      name: "message",
      component: message,
      meta: {
        title: "信息中心"
      }
    },
    {
      path: "/mydata", //个人资料
      name: "mydata",
      component: mydata,
      meta: {
        title: "个人资料"
      }
    },
    {
      path: "/shoukuan", //公司收款账户
      name: "shoukuan",
      component: shoukuan,
      meta: {
        title: "公司收款账户"
      }
    },
    {
      path: "/myshoukuan", //我的收款账户
      name: "myshoukuan",
      component: myshoukuan,
      meta: {
        title: "我的收款账户"
      }
    },
    {
      path: "/shangjishoukuan", //上级收款账户
      name: "shangjishoukuan",
      component: shangjishoukuan,
      meta: {
        title: "上级收款账户"
      }
    },
    {
      path: "/myshoukuanxinxi", //个人收款账户
      name: "myshoukuanxinxi",
      component: myshoukuanxinxi,
      meta: {
        title: "个人收款账户"
      }
    },
    {
      path: "/update", //我要升级
      name: "update",
      component: update,
      meta: {
        title: "我要升级"
      }
    },
    {
      path: "/updateDetail", //升级详情
      name: "updateDetail",
      component: updateDetail,
      meta: {
        title: "升级详情"
      }
    },
    {
      path: "/updateRecord", //升级记录
      name: "updateRecord",
      component: updateRecord,
      meta: {
        title: "升级记录"
      }
    },
    {
      path: "/bonus", //奖金列表
      name: "bonus",
      component: bonus,
      meta: {
        title: "奖金列表"
      }
    },
    {
      path: "/Certification", //实名认证
      name: "Certification",
      component: Certification,
      meta: {
        title: "实名认证"
      }
    },
    {
      path: "/hot", //热卖商品
      name: "hot",
      component: hot,
      meta: {
        // ifShow_Footbar: true,
        title: "热卖商品"
      }
    },
    {
      path: "/echart", //试试echart
      name: "echart",
      component: echart,
      meta: {
        // ifShow_Footbar: true,
        title: "试试echart"
      }
    },
    {
      path: "/car", //购物车
      name: "car",
      component: car,
      meta: {
        ifShow_Footbar: true,
        title: "购物车"
      }
    },

    {
      path: "/my", //我的
      name: "my",
      component: my,
      meta: {
        ifShow_Footbar: true,
        title: "我的"
      }
    },
    {
      path: "/newmy", //我的
      name: "newmy",
      component: newmy,
      meta: {
        ifShow_Footbar: true,
        title: "我的"
      }
    },
    {
      path: "/myteam", //我的团队
      name: "myteam",
      component: myteam,
      meta: {
        // ifShow_Footbar: true,
        title: "我的团队"
      }
    },
    {
      path: "/WLK", //团队活动
      name: "WLK",
      component: WLK,
      meta: {
        // ifShow_Footbar: true,
        title: "团队活动"
      }
    },
    {
      path: "/applystore", //申请店铺
      name: "applystore",
      component: applystore,
      meta: {
        title: "申请店铺"
      }
    },
    {
      path: "/newstore", //店铺上新
      name: "newstore",
      component: newstore,
      meta: {
        title: "店铺上新"
      }
    },
    {
      path: "/mystore", //我的店铺
      name: "mystore",
      component: mystore,
      meta: {
        title: "我的店铺"
      }
    },
    {
      path: "/noticeDetail", //公告详情
      name: "noticeDetail",
      component: noticeDetail,
      meta: {
        title: "公告详情"
      }
    },
    {
      path: "/storeorder", //店铺订单
      name: "storeorder",
      component: storeorder,
      meta: {
        title: "店铺订单"
      }
    },
    {
      path: "/wuliuCode", //物流信息
      name: "wuliuCode",
      component: wuliuCode,
      meta: {
        title: "物流信息"
      }
    },
    {
      path: "/rule", //免责声明
      name: "rule",
      component: rule,
      meta: {
        title: "免责声明"
      }
    },
    {
      path: "/addWLK", //添加团队活动
      name: "addWLK",
      component: addWLK,
      meta: {
        // ifShow_Footbar: true,
        title: "添加团队活动"
      }
    },
    {
      path: "/mysuperior", //我的上级
      name: "mysuperior",
      component: mysuperior,
      meta: {
        // ifShow_Footbar: true,
        title: "我的上级"
      }
    },
    {
      path: "/myVip", //我的会员
      name: "myVip",
      component: myVip,
      meta: {
        // ifShow_Footbar: true,
        title: "我的会员"
      }
    },
    {
      path: "/mypurse", //我的钱包
      name: "mypurse",
      component: mypurse,
      meta: {
        title: "我的钱包"
      }
    },
    {
      path: "/change", //余额转货款
      name: "change",
      component: change,
      meta: {
        title: "余额转货款"
      }
    },
    {
      path: "/topup", //充值
      name: "topup",
      component: topup,
      meta: {
        title: "充值"
      }
    },
    {
      path: "/chongzhilist", //充值明细
      name: "chongzhilist",
      component: chongzhilist,
      meta: {
        title: "充值明细"
      }
    },
    {
      path: "/tixianlist", //提现明细
      name: "tixianlist",
      component: tixianlist,
      meta: {
        title: "提现明细"
      }
    },
    {
      path: "/recordinfo", //充值明细详情
      name: "recordinfo",
      component: recordinfo,
      meta: {
        title: "充值明细详情"
      }
    },
    {
      path: "/topuplist", //下级充值记录
      name: "topuplist",
      component: topuplist,
      meta: {
        title: "下级充值记录"
      }
    },
    {
      path: "/topupremind", //下级充值记录详情
      name: "topupremind",
      component: topupremind,
      meta: {
        title: "下级充值记录详情"
      }
    },
    {
      path: "/xiajitixianlist", //下级提现记录
      name: "xiajitixianlist",
      component: xiajitixianlist,
      meta: {
        title: "下级提现记录"
      }
    },
    {
      path: "/downwithdraw", //下级提现记录详情
      name: "downwithdraw",
      component: downwithdraw,
      meta: {
        title: "下级提现记录详情"
      }
    },
    {
      path: "/tixian", //提现
      name: "tixian",
      component: tixian,
      meta: {
        title: "提现"
      }
    },
    {
      path: "/tixianinfo", //提现详情
      name: "tixianinfo",
      component: tixianinfo,
      meta: {
        title: "提现详情"
      }
    },
    {
      path: "/mydetail", //保证金
      name: "mydetail",
      component: mydetail,
      meta: {
        title: "保证金"
      }
    },
    {
      path: "/teamcenter", //个人中心
      name: "teamcenter",
      component: teamcenter,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/set", //设置
      name: "set",
      component: set,
      meta: {
        title: "设置"
      }
    },
    {
      path: "/set_tel", //设置
      name: "set_tel",
      component: set_tel,
      meta: {
        title: "管理手机号"
      }
    },
    {
      path: "/confirmOrder", //确认订单
      name: "confirmOrder",
      component: confirmOrder,
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/offline", //线下支付
      name: "offline",
      component: offline,
      meta: {
        title: "线下支付"
      }
    },
    {
      path: "/show", //未授权页面
      name: "show",
      component: show,
      meta: {
        title: "未授权页面"
      }
    },
    {
      path: "/yonghu", //用户
      name: "yonghu",
      component: yonghu,
      meta: {
        title: "用户"
      }
    },
    {
      path: "/yinsi", //隐私
      name: "yinsi",
      component: yinsi,
      meta: {
        title: "隐私"
      }
    },
    {
      path: "/login", //登录
      name: "login",
      component: login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/address", //地址列表
      name: "address",
      component: address,
      meta: {
        title: "地址列表"
      }
    },
    {
      path: "/edit_address", //编辑地址
      name: "edit_address",
      component: edit_address,
      meta: {
        title: "编辑地址"
      }
    },
    {
      path: "/add_address", //添加地址
      name: "add_address",
      component: add_address,
      meta: {
        title: "添加地址"
      }
    },
    {
      path: "/modify_psd", //修改密码
      name: "modify_psd",
      component: modify_psd,
      meta: {
        title: "修改密码"
      }
    },
    {
      path: "/payPsd", //修改密码
      name: "payPsd",
      component: payPsd,
      meta: {
        title: "修改密码"
      }
    },

    {
      path: "/orderList", //订单列表
      name: "orderList",
      component: orderList,
      meta: {
        title: "订单列表"
      }
    },
    {
      path: "/orderDetail", //订单详情
      name: "orderDetail",
      component: orderDetail,
      meta: {
        title: "订单详情"
      }
    },
    {
      path: "/wuliu", //物流
      name: "wuliu",
      component: wuliu,
      meta: {
        title: "物流"
      }
    },
    {
      path: "/moneydetail", //资金明细
      name: "moneydetail",
      component: moneydetail,
      meta: {
        title: "资金明细"
      }
    },

    {
      path: "/sucaiconter", //素材中心
      name: "sucaiconter",
      component: sucaiconter,
      meta: {
        title: "素材中心"
      }
    },
    {
      path: "/material", //素材中心
      name: "material",
      component: material,
      meta: {
        title: "素材中心"
      }
    },
    {
      path: "/upsucai", //上传素材
      name: "upsucai",
      component: upsucai,
      meta: {
        title: "上传素材"
      }
    },
    {
      path: "/login_psd", //修改登录密码
      name: "login_psd",
      component: login_psd,
      meta: {
        title: "修改登录密码"
      }
    },
    // {
    //   path: "/coursecontent", //商学院
    //   name: "coursecontent",
    //   component: coursecontent,
    //   meta: {
    //     title: "商学院"
    //   }
    // },
    {
      path: "/school", //商学院
      name: "school",
      component: school,
      meta: {
        title: "商学院",
        ifShow_Footbar: true
      }
    },
    {
      path: "/rank", //排行榜
      name: "rank",
      component: rank,
      meta: {
        title: "排行榜"
      }
    },
    {
      path: "/live_detail", //直播详情
      name: "live_detail",
      component: live_detail,
      meta: {
        title: "直播详情"
      }
    },
    {
      path: "/touwen_detail", //图文详情
      name: "touwen_detail",
      component: touwen_detail,
      meta: {
        title: "图文详情"
      }
    },
    {
      path: "/area_agent", //区域代理
      name: "area_agent",
      component: area_agent,
      meta: {
        title: "区域代理"
      }
    },
    {
      path: "/up_area_agent", //升级区域代理
      name: "up_area_agent",
      component: up_area_agent,
      meta: {
        title: "升级区域代理"
      }
    },
    {
      path: "/courseup", //课堂上传
      name: "courseup",
      component: courseup,
      meta: {
        title: "课堂上传"
      }
    },
    {
      path: "/backMoney", //退款
      name: "backMoney",
      component: backMoney,
      meta: {
        title: "退款"
      }
    },
    {
      path: "/yuncangLog", //云仓记录
      name: "yuncangLog",
      component: yuncangLog,
      meta: {
        title: "云仓记录"
      }
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

import axios from "axios";
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    let token = "";
    if (localStorage.getItem("token" + localStorage.getItem("sign_id"))) {
      token = localStorage.getItem("token" + localStorage.getItem("sign_id"));
    } else if (localStorage.getItem("token_tel")) {
      token = localStorage.getItem("token_tel");
    }
    if (localStorage.getItem("baseURL") && token) {
      axios
        .post(
          localStorage.getItem("baseURL") + "/api/user/index?token=" + token
        )
        .then(data => {
          document.title = data.data.data.shop_name;
          if (data.data.data.cloud_model == 2) {
            localStorage.setItem("model", "2");
          }
        });
    }
  } else {
    //修改标题
    document.title = to.meta.title;
  }
  next();
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
