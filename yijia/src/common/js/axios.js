// axios
import axios from 'axios'
import qs from "qs";
import WebDemo from '../../common/js/webdemo'
var demo = new WebDemo;
axios.defaults.timeout = 60000; //超时毫秒 60s
axios.defaults.retry = 30; //默认重试 60次
axios.defaults.retryDelay = 3000; // 毫秒,超时 3s重试一次


import router from "@/router/index"; //引入路由对象
import { Toast, Dialog } from "vant";


import { baseURL, yingchen } from '@/common/js/common'
axios.defaults.baseURL = baseURL;
// 签名所需要的变量，使用sha356加密
let sign_key = 'c9dfaa769668ac047ff0e72a7fecb991';
let sha256 = require("js-sha256").sha256 //这里用的是require方法，所以没用import
let time = parseInt((new Date()).getTime() / 1000);
let version = '1.0.1'


// axios请求拦截
axios.interceptors.request.use(function (config) {
    // 在发送请求之前配置token

    config.headers['token'] = localStorage.getItem('token');
    // config.headers['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaW5mbyI6eyJpZCI6MjA3MywibWVtYmVyX21vYmlsZSI6IjE2NjM4MTQzNDQ3IiwiYWxpcGF5X3VuaW9uaWQiOm51bGwsIndlaXhpbl91bmlvbmlkIjpudWxsLCJyZWFsbmFtZSI6Ilx1NTkyN1x1NjZmMiIsIm1lbWJlcl9hdmF0YXIiOiJodHRwOlwvXC9oYW56aGlmdTItcGhvdG9zLXB1YmxpYy5vc3MtY24tc2hlbnpoZW4uYWxpeXVuY3MuY29tXC9tZW1iZXJfcGhvdG9cLzI0YmRkOTQ1MTNjNWE0MTNkMTM1ZTVmYzdkMmJiZmIxLmpwZyIsIm1lbWJlcl9zZXgiOm51bGwsImludml0ZXJfaWQiOjIwNzEsIm5pY2tuYW1lIjoieGlhb3F1cXUiLCJyel9zdGF0dXMiOjEsImxldmVsX25hbWUiOiJWSVAxIiwibGV2ZWxfaWQiOjEsImlzX2J1eSI6MSwidG9rZW4iOiI5YjEzMjE4ODE2OTczMDI2NTJmZWNjYzBkZjgwZWJlZTFmYzBmYzZhIn0sInRpbWUiOjE1NjQ4MjA2NzgsInRva2VuIjoiOWIxMzIxODgxNjk3MzAyNjUyZmVjY2MwZGY4MGViZWUxZmMwZmM2YSJ9.9gG0oavn235Hr7aBCbnPTo0nEMh8H-O9vQo8ivelsDM'


    // console.log(config);
    // 配置签名
    // let api = '';                                    
    // if (config.url.includes(yingchen)) {
    //     api = config.url.replace(yingchen, '').substring(1).toLowerCase();
    //     config.headers['time'] = time;
    //     config.headers['version'] = version;
    //     config.headers['sign'] = sha256(sign_key + '&' + api + '&' + time + "&" + version) //要加密的密码
    //     // console.log(sign_key + '&' + api + '&' + time + "&" + version);
    // } else {
    //     api = config.url.replace(baseURL, '').substring(1).toLowerCase();
    // }


    Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: false, // 是否显示遮罩层
        // loadingType: false, // 图标样式
        // message: '加载中...',
    });


    // 全局配置接口请求动画且商品及店铺收藏隐藏加载动画
    if (config.url.includes('/api/mobile/index.php?w=member_favorites&t=favorites_add') ||
        config.url.includes('/api/mobile/index.php?w=member_favorites&t=favorites_del') ||
        config.url.includes('/api/mobile/index.php?w=member_favorites_store&t=favorites_add') ||
        config.url.includes('/api/mobile/index.php?w=member_favorites_store&t=favorites_del')) {
        // 清除
        Toast.clear();
    } else {
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            mask: false, // 是否显示遮罩层
            // loadingType: false, // 图标样式
            // message: '加载中...',
        });
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//响应拦截器 超时设置为60s 如果请求超时会每隔1ms 重新发起2次重试请求
/*
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {

	var config = err.config;
	// 如果config不存在或未设置重试选项，请拒绝
	if (!config || !config.retry) {
		return Promise.reject(err);
	}
	console.log(config);
	// 设置变量跟踪重试次数

	console.log(config.__retryCount);
	config.__retryCount = config.__retryCount || 0;
	// 检查是否已经达到最大重试总次数
	if (config.__retryCount >= config.retry) {
		// 抛出错误信息
		Toast.clear();
		Dialog.alert({
			title: "网络连接超时，请检查网络后重试",
			closeOnClickOverlay: true
		}).then(() => {
			// on close
		});
		return Promise.reject(err);
	}

	// 增加请求重试次数
	config.__retryCount += 1;
	// 创建新的异步请求
	var backoff = new Promise(function(resolve) {
		setTimeout(function() {
			resolve();
		}, config.retryDelay || 3000); //3s重试一次
	});
	// 返回axios信息，重新请求
	return backoff.then(function() {
		return axios(config);
	});
});
*/

// require("es6-promise").polyfill();



//请求结果中的status -1：登录过期  1：请求成功 0：请求失败
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 * 
 */
function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}



/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data, formdata) {

    let that = this;
    var params;
    if (data) {
        params = qs.stringify(data);
    } else {
        params = formdata;
    }
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                // 接口请求成功，清除加载动画
                Toast.clear();
                if (res.data.status == -1) {
                    Toast({
                        message: "登录过期，请重新登录!",
                        duration: 2000
                    });
                    localStorage.clear();
                    setTimeout(() => {
                        demo.loginApp('登录');
                        // router.replace("/login");
                    }, 1000);
                    return;
                } else if (res.status == 0) {
                    if (res.msg) {
                        Toast({ message: res.msg, duration: 2000 });
                    } else if (res.data.error) {
                        Toast({ message: res.data.error, duration: 2000 });
                    } else {
                        Toast({ message: '接口返回失败', duration: 2000 });
                    }
                } else {
                    resolve(res.data);
                }
            })
            .catch(err => {
                Toast.clear();
                console.log("失败:\n" + err);
                reject(err);
            });
    });
}
var http = {
    get,
    post
};
export default http;