/**
 * [商铺3.0页面顶部脚本]
 * @param  {Object} window [窗口对象]
 * @param  {Object} document [文档对象]
 */
(function(window, document) {

    /**
     * [防止重复加载]
     */
    if (window['HC']) {
        return;
    }

    /**
     * [HC 初始化全局命名空间]
     * @type {Object}
     */
    var globalNS = {

        /**
         * [startTime 初始化页面开始加载时间]
         * @type {Number}
         */
        startTime: (!!window.performance) ? performance.timing.navigationStart : +new Date(),

        /**
         * [env 浏览器环境信息]
         * @type {String}
         */
        env: '',

        /**
         * [util 工具方法集合]
         * @type {Object}
         */
        util: {

            /**
             * [cookie 引入cookie操作模块]
             * @type {Object}
             */
            cookie: require('cookie'),

            /**
             * [uuid 引入uuid模块]
             * @type {String}
             */
            uuid: require('uuid'),

            /**
             * [ua 引入ua模块]
             * @type {String}
             */
            ua: require('ua'),

            /**
             * [isPageInIframe 当前页面是否嵌入在框架页中]
             * @return {Number} [0：未被引用于框架页，1：被同域页面引用于框架页，2：被外域页面引用于框架页]
             */
            isPageInFrame: function() {
                var _url,
                    _result;

                /**
                 * 当前页面被外域页面引用于框架页
                 */
                try {
                    _url = window.top.location.href;
                } catch (ex) {
                    _result = 2;
                    return _result;
                }

                /**
                 * [获取不到框架页地址时，按外域页面引用处理]
                 */
                if (!_url) {
                    _result = 2;
                    return _result;
                }

                /**
                 * [判断当前页面是否被同域页面引用于框架页]
                 */
                _url === window.location.href ? (_result = 0) : (_result = 1);
                return _result;
            },

            /**
             * [ready 监听DOMContentLoaded事件]
             * @param  {Function} fn [监听事件回调]
             */
            ready: require('../components/DOMReady'),

            /**
             * [添加事件监听]
             * @param  {Object} element     [指定要添加事件监听的元素]
             * @param  {String} eventName   [指定事件名]
             * @param  {Function} callback  [指定要事件触发时执行的函数]
             * @param  {Boolean} useCapture [指定事件是否在捕获或冒泡阶段执行]
             * @return {Undefined}          [无返回]
             */
            addEventListener: document.addEventListener ? function(element, eventName, callback, useCapture) {
                element.addEventListener(eventName, callback, useCapture);
            } : function(element, eventName, callback, useCapture) {
                element.attachEvent("on" + eventName, callback);
            },

            /**
             * [移除事件监听]
             * @param  {Object} element     [指定要添加事件监听的元素]
             * @param  {String} eventName   [指定事件名]
             * @param  {Function} callback  [指定要事件触发时执行的函数]
             * @param  {Boolean} useCapture [指定事件是否在捕获或冒泡阶段执行]
             * @return {Undefined}          [无返回]
             */
            removeEventListener: document.removeEventListener ? function(element, eventName, callback, useCapture) {
                element.removeEventListener(eventName, callback, useCapture);
            } : function(element, eventName, callback, useCapture) {
                element.detachEvent("on" + eventName, callback);
            },

            /**
             * [addCss 载入样式表]
             * @param {String}   url [待载入样式表路径]
             * @param {Function} fn  [成功载入样式表后回调函数]
             */
            addCss: function(url, fn) {
                if (!url) return;
                var link = document.createElement('link');
                link.href = url;
                link.type = 'text/css';
                link.rel = 'stylesheet';
                if (link.readyState) {
                    link.onreadystatechange = function() {
                        if (link.readyState == "loaded" || link.readyState == "complete") {
                            link.onreadystatechange = null;
                            fn && fn();
                        }
                    };
                } else {
                    link.onload = function() {
                        fn && fn();
                    };
                }
                document.getElementsByTagName('head')[0].appendChild(link);
            },

            /**
             * [addScript 载入脚本]
             * @param {String}   url [带载入脚本路径]
             * @param {Function} fn  [成功载入脚本后的回调函数]
             */
            addScript: function(url, fn) {
                if (!url) return;
                var script = document.createElement('script');
                if (script.readyState) {
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            fn && fn();
                        }
                    };
                } else {
                    script.onload = function() {
                        fn && fn();
                    };
                }
                script.type = 'text/javascript';
                script.src = url;
                script.setAttribute('charset', 'utf-8');
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    };

    /**
     * 兼容线上用户行为分析脚本、用户性能分析脚本
     */
    globalNS.UUID = globalNS.util.uuid;
    globalNS.HUB = {
        LocalCookie: {
            set: function(opt) {
                globalNS.util.cookie.set(opt.key, opt.value, {
                    expires: opt.day,
                    domain: opt.domain,
                    path: opt.path
                });
            },
            get: globalNS.util.cookie.get,
            remove: globalNS.util.cookie.remove
        },
        addEvent: function(element, callback, eventName) {
            globalNS.util.addEventListener(element, eventName, callback, false);
        },
        addCss: globalNS.util.addCss,
        addScript: globalNS.util.addScript
    };

    /**
     * [兼容线上组件加载器功能]
     * @param  {[type]} win [description]
     * @param  {[type]} doc [description]
     * @return {[type]}     [description]
     */
    globalNS.W = require('../common/hc.widgets.loader');

    /**
     * [UBA_metadata_init 用户行为分析元数据初始化，分别初始化以下cookie项：hc360visitid、visitid_time、hc360first_time、hcbrowserid]
     */
    /**
     * [hc360visitid 从cookie中读取 hc360visitid ，若不存在则创建该cookie]
     * @type {String}
     */
    var hc360visitid = globalNS.util.cookie.get('hc360visitid');
    if (!hc360visitid) {

        /**
         * [写入 visitid_time 访问时间cookie]
         */
        var now = new Date();
        globalNS.util.cookie.set("visitid_time", (now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()), {
            expires: 3650,
            path: '/',
            domain: 'hc360.com'
        });

        /**
         * [写入 hc360visitid 访问者编号cookie]
         */
        var uuid = new globalNS.util.uuid().createUUID();
        globalNS.util.cookie.set("hc360visitid", uuid, {
            expires: 3650,
            path: '/',
            domain: 'hc360.com'
        });
    }

    /**
     * [hc360firsttime 用于判断新老访客，存在该Cookie为老访客，否则为新访客。]
     * @type {String}
     */
    var hc360firsttime = globalNS.util.cookie.get('hc360first_time');
    if (!hc360firsttime) {

        /**
         * [写入 hc360first_time 访问时间cookie]
         */
        var now = new Date();
        globalNS.util.cookie.set("hc360first_time", (now.getFullYear() + "-" + ('0' + (now.getMonth() + 1)).slice(-2) + "-" + ('0' + (now.getDate())).slice(-2)), {
            expires: 3650,
            path: '/',
            domain: 'hc360.com'
        });
    }

    /**
     * [hcbrowserid 用于区分每个浏览标识]
     * @type {String}
     */
    var hcbrowserid = globalNS.util.cookie.get('hcbrowserid');
    if (!hc360firsttime) {

        /**
         * [写入 hcbrowserid ]
         */
        var uuid = new globalNS.util.uuid().createUUID();
        globalNS.util.cookie.set("hcbrowserid", uuid, {
            expires: 3650,
            path: '/',
            domain: 'hc360.com'
        });
    }

    /**
     * [异步加载用户页面性能分析模块，包括脚本错误报告等。该模块待后期完善]
     */
    // (function() {
    // 	var relativeScript = document.getElementsByTagName('script')[0],
    // 		script = document.createElement('script');
    // 	script.async = 'async';
    // 	script.src = 'frontend/common/hc.shop3.0.uppa.js';
    // 	relativeScript.parentNode.insertBefore(script, relativeScript);
    // })();

    /**
     * [env 初始化浏览器环境数据]
     * @type {Object}
     */
    globalNS.env = globalNS.util.ua.parseUA();

    /**
     * 暴露全局命名空间
     */
    window['HC'] = globalNS;

})(window, document);
