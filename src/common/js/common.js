//请求的域名
// export let baseURL = "http://test.tieqiao.shop";

/*将base64转换为file*/
export function dataURLtoFile(dataurl, filename) {
  //将base64转换为文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

// ajax上传图片——文件流方式
export function upload(base64, name) {
  return new Promise((resolve, reject) => {
    let file = dataURLtoFile(base64, name);
    // 实例化FormData
    var formdata = new FormData();
    // 将文件信息存入formdata，键名为file
    // formdata会将文件信息序列化为ajax可识别的数据类型
    formdata.append("file", file);
    $.ajax({
      type: "post",
      url: `${localStorage.getItem(
        "baseURL"
      )}/api/common/upload?token=${localStorage.getItem(
        "token" + localStorage.getItem("sign_id")
      )}&sign_id=${localStorage.getItem("sign_id")}`,
      data: formdata, // formdata直接赋值给data
      processData: false, //formdata已将数据序列化，无需在处理
      contentType: false, //formdata无需设置请求头
      success: function(res) {
        resolve(res.data);
      }
    });
  });
}

/**
 * mescroll封装
 */
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
      htmlLoading:
        '<p class="upwarp-progress mescroll-rotate"></p ><p class="upwarp-tip">正在加载...</p >', // 上拉加载中的布局
      lazyLoad: {
        use: true, // 是否开启懒加载,默认false
        attr: "imgurl", // html标签中,存放网络图片地址的属性名: <img src='占位图' imgurl='网络图'/>
        showClass: "mescroll-lazy-in", // 显示样式,参见mescroll.css
        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
        offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
      }
      // toTop: {
      //     //回到顶部按钮
      //     src: require(""), //图片路径,默认null,支持网络图
      //     offset: 600 //列表滚动1000px才显示回到顶部按钮
      // },
    }
  };
  //加入自定义的默认配置
  options = MeScroll.extend(options, myOption);
  //创建MeScroll对象
  return new MeScroll(mescrollId, options);
}
