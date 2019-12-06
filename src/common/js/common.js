//请求的域名
// export let baseURL = "http://test.tieqiao.shop";
import { Toast, Dialog } from "vant"; //引入vant提示框

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

// 把图片绘制到canvas上去
function compressEvent(img, callback) {
  let that = this;
  // let canvas = document.getElementById("myCanvas");
  var canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  let dataURL = canvas.toDataURL("image/jpeg", 0.3);
  callback ? callback(dataURL) : null; //调用回调函数
}
// dataURL转换为Bold对象或File对象
function dataURItoBlob(dataurl) {
  //dataurl是base64格式
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}
// 将Bold对象转换成formData对象,并提交
function uploadImg(dataURL, name) {}
// 将Bold对象转换成formData对象,并提交
// ajax上传图片——文件流方式
export function upload(base64, name) {
  return new Promise((resolve, reject) => {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: false // 是否显示遮罩层
      // message: "图片上传中..."
    });
    let img = new Image();
    img.src = base64;
    img.onload = function() {
      //图片加载完毕
      compressEvent(img, dataURL => {
        uploadImg(dataURL);
        let blob = dataURItoBlob(dataURL);
        console.log(11111111, blob);

        let formdata = new FormData();
        formdata.append("file", blob, name);
        let token;
        if (localStorage.getItem("token" + localStorage.getItem("sign_id"))) {
          token = localStorage.getItem(
            "token" + localStorage.getItem("sign_id")
          );
        } else if (localStorage.getItem("token_tel")) {
          token = localStorage.getItem("token_tel");
        }
        $.ajax({
          type: "post",
          url: `${localStorage.getItem(
            "baseURL"
          )}/api/common/uploadali?token=${token}&sign_id=${localStorage.getItem(
            "sign_id"
          )}&web_type=agent`,
          data: formdata, // formdata直接赋值给data
          processData: false, //formdata已将数据序列化，无需在处理
          contentType: false, //formdata无需设置请求头
          success: function(res) {
            console.log(222, res);
            Toast.clear();
            resolve(res.data);
          }
        });
      });
    };
  });
}

// ajax上传素材文件
export function upfile(e) {
  return new Promise((resolve, reject) => {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: false // 是否显示遮罩层
      // message: "图片上传中..."
    });
    // 处理成功会执行
    // 获取文件信息
    var file = e.target.files[0];
    // 实例化FormData;
    var formdata = new FormData();
    //  将文件信息存入formdata，键名为file
    //  formdata会将文件信息序列化为ajax可识别的数据类型
    formdata.append("file", file);
    $.ajax({
      type: "post",
      url: `${localStorage.getItem(
        "baseURL"
      )}/api/common/uploadali?token=${localStorage.getItem(
        "token" + localStorage.getItem("sign_id")
      )}&sign_id=${localStorage.getItem("sign_id")}`,
      data: formdata, // formdata直接赋值给data
      processData: false, //formdata已将数据序列化，无需在处理
      contentType: false, //formdata无需设置请求头
      success: function(res) {
        console.log(9999999999, res);
        Toast.clear();
        resolve(res.data);
      }
    });
  });
}

// 下载文件（图片、文档、压缩包）到手机相册，不适用微信浏览器
// 将文件地址转为blob二进制对象
function getFile(src) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onprogress = function(e) {
      console.log(
        "当前数据获取进度为" + ((e.loaded * 100) / e.total).toFixed(2) + "%"
      );
    };
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        resolve(this.response);
      }
    };
    xhr.open("get", src);
    xhr.send();
  });
}
// 下载文件到本地
import { saveAs } from "./FileSaver";
export function downFile(src) {
  console.log(src);
  getFile(src).then(res => {
    console.log(1111111111, res);
    saveAs(res, new Date().getTime() + "" + Math.round(Math.random() * 10000));
  });
}

// 处理时间戳为时间格式
export function getTime(timestamp, type = 0) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (type == 1) {
    return Y + "年" + M + "月" + D + "日 " + h + ":" + m;
  } else {
    return M + "-" + D + " " + h + ":" + m;
  }
}

// 微信扫码
import axios from "axios";
export function scan() {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    mask: false // 是否显示遮罩层
    // message: "数据加载中..."
  });
  return new Promise((resolve, reject) => {
    axios
      .post(localStorage.getItem("baseURL") + "/api/we_chat/getJSSDK", {
        url: location.href
      })
      .then(res => {
        Toast.clear();
        let data = res.data.data;
        let _this = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
          // 9.1.2 扫描二维码并返回结果
          wx.scanQRCode({
            needResult: 1,
            desc: "scanQRCode desc",
            success: function(res) {
              Toast.clear();
              resolve(res.resultStr.split(",")[1]);
            }
          });
        });
        //初始化jsapi接口 状态
        wx.error(function(res) {
          Toast.clear();
          alert("调用微信jsapi返回的状态:" + res.msg);
        });
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
