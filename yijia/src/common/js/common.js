//请求的域名
export let baseURL = "https://ceshi-shop.hfgld.net"; //测试服务器
export let zhiwei = "https://ceshi-web.hfgld.net/my/#"; //志伟IP
export let yingchen = "https://ceshi-ucenter.hfgld.net"; //郝英晨
export let kefu = "https://ceshi-shop.hfgld.net"; //聊天客服地址

// export let baseURL = "https://shop.hfgld.net"; //正式服务器
// export let zhiwei = "https://web.hfgld.net/my/#"; //志伟IP
// export let yingchen = "https://ucenter.hfgld.net"; //郝英晨
// export let kefu = "https://shop.hfgld.net"; //聊天客服地址






//手机号 正则
export let tel = /^1[3456789]\d{9}$/;
//登录密码 正则   请输入6-20位数字字母组合密码
export let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}|[0-9]{6,20}$/;
//身份证 正则
export let id_card = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
//邮箱 正则
export let email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;


// 获取原生跳转过来的参数
// 使用方法：1、commonjs中定义方法 2、main.js中引入，注册给原型 3、页面使用
export function GetRequest() {
    let url = location.href.split("?")[1].split("&"); //获取url中"?"符后的字串
    let query = {};
    url.forEach(item => {
        query[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]);
    });
    return query;
}



//mescroll封装
import MeScroll from "mescroll.js";
export function initMeScroll(mescrollId, options) {
    let myOption = {
        // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
        up: {
            page: {
                num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                size: 10, // 每页数据条数
                time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
            },
            loadFull: {
                use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size或者嵌套mescroll-bounce的div避免这个情况
                delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            // toTop: {
            //     //回到顶部按钮
            //     src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
            //     offset: 1000, //列表滚动1000px才显示回到顶部按钮
            // },
            noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            // htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>', // 无数据的布局
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p ><p class="upwarp-tip">正在加载...</p >', // 上拉加载中的布局
            lazyLoad: {
                use: true, // 是否开启懒加载,默认false
                attr: 'imgurl', // html标签中,存放网络图片地址的属性名: <img src='占位图' imgurl='网络图'/>
                showClass: 'mescroll-lazy-in', // 显示样式,参见mescroll.css
                delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
                offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
            },
            // toTop: {
            //     //回到顶部按钮
            //     src: require("../../assets/images/common/top.png"), //图片路径,默认null,支持网络图
            //     offset: 600 //列表滚动1000px才显示回到顶部按钮
            // },
        },
    };
    //加入自定义的默认配置
    options = MeScroll.extend(options, myOption);
    //创建MeScroll对象
    return new MeScroll(mescrollId, options);
}

// mescroll组件全局配置mescrollUp上拉加载的配置.
//页面up配置 data中拼接对象
// mescrollUp: Object.assign(mescrollUp, {
//     callback: this.upCallback
// }),
export const mescrollUp = {
    // callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
    //以下是一些常用的配置,当然不写也可以的.
    page: {
        num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        size: 10 //每页数据条数,默认10
    },
    htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
    noMoreSize: 6, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
    // 避免列表数据过少(比如只有一条数据),
    // 显示无更多数据会不好看
    // 这就是为什么无更多数据有时候不显示的原因
    toTop: {
        //回到顶部按钮
        src: require("../../assets/images/common/top.png"), //图片路径,默认null,支持网络图
        offset: 600 //列表滚动1000px才显示回到顶部按钮
    },
    // empty: {
    //     //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
    //     warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
    //     icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
    //     tip: "暂无相关数据~" //提示
    // }
}