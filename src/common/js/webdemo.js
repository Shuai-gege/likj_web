"use strict";

/**
 * [WebDemo 主方法]
 * @comment  sangxiaokai@qq.com
 * @DateTime 2018-08-22T16:28:58+0800
 * @author sangxiaokai@qq.com
 */
function WebDemo() {
    var u = navigator.userAgent; //http请求用户代理头

    /**
     * propery
     * @type {String}
     */
    this.name = "webdemo1.0";
    this.debug = true; //开启调试
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断Android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    /**
     * function
     * @comment  sangxiaokai@qq.com
     * @DateTime 2018-08-22T16:33:10+0800
     * @author sangxiaokai@qq.com
     * @return   {[type]}                 [description]
     */
    this.say = function () {
        if (this.debug) {
            console.log("name:", this.name);
            console.log("isandroid:", this.isAndroid);
            console.log("isIOS:", this.isIOS);
        }
        var that = this; //保存引用

        /**
         * 初始化方法
         */
        //建立bridge
        //如果是Android
        if (this.isAndroid) {
            if (this.debug) {
                console.log('setup For ..Android');
            }
            if (typeof webViewJavascriptBridge != 'undefined') {
                this.mainBridge = webViewJavascriptBridge; // android 定义的webview和js通信的bridge
            }
        }
        if (this.isIOS) {
            if (this.debug) {
                console.log('setup For ..IOS');
            }
            this.mainBridge = undefined;

            /*这段代码是固定的，必须要放到js中*/
            this.setupWebViewJavascriptBridge = function (callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
            }; //
            console.log("setupWebViewJavascriptBridge is :", typeof this.setupWebViewJavascriptBridge);
            this.mainBridge = undefined; //

            /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
            this.setupWebViewJavascriptBridge(function (bridge) {
                /**
                 1:扫一扫
                 2:复制
                 */
                console.log('get bridge:', typeof bridge);
                that.mainBridge = bridge;
            });
        } //isIOS


        /**
         * 实现的功能
         */

        // 公用模块


        // 跳转原生登录页面
        this.toLogin = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.toLogin(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.toLogin.postMessage(query);
            }
        }


        // 返回按钮
        this.goBack = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.goToHome(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.goToHome.postMessage(query);
            }
        }
        
        
        //游戏首页，点击返回app
        this.exitApp = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.exitApp(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.exitApp.postMessage(query);
            }
        }


        // 特殊返回按钮，通知原生销毁H5历史记录，直接返回到原生入口页面，参数'0'是销毁 '1'是正常返回
        this.paySetStatus = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.goBackSetStatus(query);
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.goBackSetStatus.postMessage(query);
            }
        }


        //记录手机顶部高度
        this.statusHeight = function () {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    console.log("android未初始化:WebDemo");
                } else {
                    // 调用安卓方法，接收参数并return
                    return that.mainBridge.statusHeight();
                }
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                let iOSInfo = JSON.parse(JSON.stringify(window.iOSInfo));
                return iOSInfo.statusHeight;
            }
        };


        // 获取token
        this.getToken = function () {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    console.log("android未初始化:WebDemo");
                } else {
                    // 调用安卓方法，接收参数并return
                    return that.mainBridge.getToken();
                }
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                let iOSInfo = JSON.parse(JSON.stringify(window.iOSInfo));
                return iOSInfo.token;
            }
        };


        // 拨打打电话
        this.callPhone = function (query) {
            if (that.debug) {
                console.log('mainBridge type is :', typeof that.mainBridge);
                console.log('callback is type :', typeof callback);
            }
            //android的处理
            if (that.isAndroid) {
                if (typeof that.mainBridge == "undefined") {
                    alert("android未初始化:WebDemo");
                } else {
                    that.mainBridge.callPhone();
                }
                return; //android不调用,但是需要实现方法..
            }
            //ios的处理
            if (typeof that.mainBridge == "undefined") {
                console.log('...................');
                console.log(query);
                window.webkit.messageHandlers.Call.postMessage(query);
            }
        }

    };
    this.say();
}
export default WebDemo;