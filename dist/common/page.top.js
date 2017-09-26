/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//style.org.hc360.cn/js/module/shop3.0/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

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
	            cookie: __webpack_require__(111),

	            /**
	             * [uuid 引入uuid模块]
	             * @type {String}
	             */
	            uuid: __webpack_require__(113),

	            /**
	             * [ua 引入ua模块]
	             * @type {String}
	             */
	            ua: __webpack_require__(114),

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
	            ready: __webpack_require__(115),

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
	    globalNS.W = __webpack_require__(116);

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


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Cookies"] = __webpack_require__(112);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.3
	 * //github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;
	(function(factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function() {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function() {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init(converter) {
			function api(key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					return (document.cookie = [
						key, '=', value,
						attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						attributes.path ? '; path=' + attributes.path : '',
						attributes.domain ? '; domain=' + attributes.domain : '',
						attributes.secure ? '; secure' : ''
					].join(''));
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function(key) {
				return api.call(api, key);
			};
			api.getJSON = function() {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function(key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function() {});
	}));

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

	/**
	 * [UUID 生成UUID]
	 */
	function UUID() {
		this.id = this.createUUID();
	}

	/**
	 * [valueOf 重写 valueOf 方法]
	 * @return {String} [description]
	 */
	UUID.prototype.valueOf = function() {
		return this.id;
	};

	/**
	 * [valueOf 重写 toString 方法]
	 * @return {String} [description]
	 */
	UUID.prototype.toString = function() {
		return this.id;
	};

	/**
	 * [createUUID 创建UUID]
	 * @return {String} [description]
	 */
	UUID.prototype.createUUID = function() {
		var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
		var dc = new Date();
		var t = dc.getTime() - dg.getTime();
		var h = '';
		var tl = UUID.getIntegerBits(t, 0, 31);
		var tm = UUID.getIntegerBits(t, 32, 47);
		var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
		var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
			UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
			UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
			UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
			UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
		return tl + h + tm + h + thv + h + csar + csl + h + n;
	};

	/**
	 * [getIntegerBits description]
	 * @param  {[type]} val   [description]
	 * @param  {[type]} start [description]
	 * @param  {[type]} end   [description]
	 * @return {[type]}       [description]
	 */
	UUID.getIntegerBits = function(val, start, end) {
		var base16 = UUID.returnBase(val, 16);
		var quadArray = new Array();
		var quadString = '';
		var i = 0;
		for (i = 0; i < base16.length; i++) {
			quadArray.push(base16.substring(i, i + 1));
		}
		for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
			if (!quadArray[i] || quadArray[i] == ''){
				quadString += '0';
			}
			else{
				quadString += quadArray[i];
			}
		}
		return quadString;
	};

	/**
	 * [returnBase description]
	 * @param  {[type]} number [description]
	 * @param  {[type]} base   [description]
	 * @return {[type]}        [description]
	 */
	UUID.returnBase = function(number, base) {
		var convert = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		if (number < base)
			var output = convert[number];
		else {
			var MSD = '' + Math.floor(number / base);
			var LSD = number - MSD * base;
			if (MSD >= base)
				var output = this.returnBase(MSD, base) + convert[LSD];
			else
				var output = convert[MSD] + convert[LSD];
		}
		return output;
	};

	/**
	 * [rand description]
	 * @param  {[type]} max [description]
	 * @return {[type]}     [description]
	 */
	UUID.rand = function(max) {
		return Math.floor(Math.random() * max);
	};

	module.exports = UUID;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * The YUI module contains the components required for building the YUI seed
	 * file.  This includes the script loading mechanism, a simple queue, and the
	 * core utilities for the library.
	 * @module yui
	 * @submodule yui-base
	 */
	module.exports = {

		/**
		Performs a simple comparison between two version numbers, accounting for
		standard versioning logic such as the fact that "535.8" is a lower version than
		"535.24", even though a simple numerical comparison would indicate that it's
		greater. Also accounts for cases such as "1.1" vs. "1.1.0", which are
		considered equivalent.
		 
		Returns -1 if version _a_ is lower than version _b_, 0 if they're equivalent,
		1 if _a_ is higher than _b_.
		 
		Versions may be numbers or strings containing numbers and dots. For example,
		both `535` and `"535.8.10"` are acceptable. A version string containing
		non-numeric characters, like `"535.8.beta"`, may produce unexpected results.
		 
		@method compareVersions
		@param {Number|String} a First version number to compare.
		@param {Number|String} b Second version number to compare.
		@return -1 if _a_ is lower than _b_, 0 if they're equivalent, 1 if _a_ is
		    higher than _b_.
		**/
		compareVersions: function(a, b) {
			var aPart, aParts, bPart, bParts, i, len;

			if (a === b) {
				return 0;
			}

			aParts = (a + '').split('.');
			bParts = (b + '').split('.');

			for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {
				aPart = parseInt(aParts[i], 10);
				bPart = parseInt(bParts[i], 10);

				/*jshint expr: true*/
				isNaN(aPart) && (aPart = 0);
				isNaN(bPart) && (bPart = 0);

				if (aPart < bPart) {
					return -1;
				}

				if (aPart > bPart) {
					return 1;
				}
			}

			return 0;
		},

		/**
		 * YUI user agent detection.
		 * Do not fork for a browser if it can be avoided.  Use feature detection when
		 * you can.  Use the user agent as a last resort.  For all fields listed
		 * as @type float, UA stores a version number for the browser engine,
		 * 0 otherwise.  This value may or may not map to the version number of
		 * the browser using the engine.  The value is presented as a float so
		 * that it can easily be used for boolean evaluation as well as for
		 * looking for a particular range of versions.  Because of this,
		 * some of the granularity of the version info may be lost.  The fields that
		 * are @type string default to null.  The API docs list the values that
		 * these fields can have.
		 * @class UA
		 * @static
		 */

		/**
		 * Static method on `YUI.Env` for parsing a UA string.  Called at instantiation
		 * to populate `Y.UA`.
		 *
		 * @static
		 * @method parseUA
		 * @param {String} [subUA=navigator.userAgent] UA string to parse
		 * @return {Object} The Y.UA object
		 */
		parseUA: function(subUA) {

			var numberify = function(s) {
					var c = 0;
					return parseFloat(s.replace(/\./g, function() {
						return (c++ === 1) ? '' : '.';
					}));
				},

				win = window,

				nav = win && win.navigator,

				o = {

					/**
					 * Internet Explorer version number or 0.  Example: 6
					 * @property ie
					 * @type float
					 * @static
					 */
					ie: 0,

					/**
					 * Opera version number or 0.  Example: 9.2
					 * @property opera
					 * @type float
					 * @static
					 */
					opera: 0,

					/**
					 * Gecko engine revision number.  Will evaluate to 1 if Gecko
					 * is detected but the revision could not be found. Other browsers
					 * will be 0.  Example: 1.8
					 * <pre>
					 * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
					 * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8
					 * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81
					 * Firefox 3.0   <-- 1.9
					 * Firefox 3.5   <-- 1.91
					 * </pre>
					 * @property gecko
					 * @type float
					 * @static
					 */
					gecko: 0,

					/**
					 * AppleWebKit version.  KHTML browsers that are not WebKit browsers
					 * will evaluate to 1, other browsers 0.  Example: 418.9
					 * <pre>
					 * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the
					 *                                   latest available for Mac OSX 10.3.
					 * Safari 2.0.2:         416     <-- hasOwnProperty introduced
					 * Safari 2.0.4:         418     <-- preventDefault fixed
					 * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
					 *                                   different versions of webkit
					 * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
					 *                                   updated, but not updated
					 *                                   to the latest patch.
					 * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native
					 * SVG and many major issues fixed).
					 * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic
					 * update from 2.x via the 10.4.11 OS patch.
					 * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
					 *                                   yahoo.com user agent hack removed.
					 * </pre>
					 * //en.wikipedia.org/wiki/Safari_version_history
					 * @property webkit
					 * @type float
					 * @static
					 */
					webkit: 0,

					/**
					 * Safari will be detected as webkit, but this property will also
					 * be populated with the Safari version number
					 * @property safari
					 * @type float
					 * @static
					 */
					safari: 0,

					/**
					 * Chrome will be detected as webkit, but this property will also
					 * be populated with the Chrome version number
					 * @property chrome
					 * @type float
					 * @static
					 */
					chrome: 0,

					/**
					 * The mobile property will be set to a string containing any relevant
					 * user agent information when a modern mobile browser is detected.
					 * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series
					 * devices with the WebKit-based browser, and Opera Mini.
					 * @property mobile
					 * @type string
					 * @default null
					 * @static
					 */
					mobile: null,

					/**
					 * Adobe AIR version number or 0.  Only populated if webkit is detected.
					 * Example: 1.0
					 * @property air
					 * @type float
					 */
					air: 0,
					/**
					 * PhantomJS version number or 0.  Only populated if webkit is detected.
					 * Example: 1.0
					 * @property phantomjs
					 * @type float
					 */
					phantomjs: 0,
					/**
					 * Detects Apple iPad's OS version
					 * @property ipad
					 * @type float
					 * @static
					 */
					ipad: 0,
					/**
					 * Detects Apple iPhone's OS version
					 * @property iphone
					 * @type float
					 * @static
					 */
					iphone: 0,
					/**
					 * Detects Apples iPod's OS version
					 * @property ipod
					 * @type float
					 * @static
					 */
					ipod: 0,
					/**
					 * General truthy check for iPad, iPhone or iPod
					 * @property ios
					 * @type Boolean
					 * @default null
					 * @static
					 */
					ios: null,
					/**
					 * Detects Googles Android OS version
					 * @property android
					 * @type float
					 * @static
					 */
					android: 0,
					/**
					 * Detects Kindle Silk
					 * @property silk
					 * @type float
					 * @static
					 */
					silk: 0,
					/**
					 * Detects Ubuntu version
					 * @property ubuntu
					 * @type float
					 * @static
					 */
					ubuntu: 0,
					/**
					 * Detects Kindle Silk Acceleration
					 * @property accel
					 * @type Boolean
					 * @static
					 */
					accel: false,
					/**
					 * Detects Palms WebOS version
					 * @property webos
					 * @type float
					 * @static
					 */
					webos: 0,

					/**
					 * Google Caja version number or 0.
					 * @property caja
					 * @type float
					 */
					caja: nav && nav.cajaVersion,

					/**
					 * Set to true if the page appears to be in SSL
					 * @property secure
					 * @type boolean
					 * @static
					 */
					secure: false,

					/**
					 * The operating system.
					 *
					 * Possible values are `windows`, `macintosh`, `android`, `symbos`, `linux`, `rhino` and `ios`.
					 *
					 * @property os
					 * @type string
					 * @default null
					 * @static
					 */
					os: null,

					/**
					 * The Nodejs Version
					 * @property nodejs
					 * @type float
					 * @default 0
					 * @static
					 */
					nodejs: 0,
					/**
					 * Window8/IE10 Application host environment
					 * @property winjs
					 * @type Boolean
					 * @static
					 */
					winjs: !!((typeof Windows !== "undefined") && Windows.System),
					/**
					 * Are touch/msPointer events available on this device
					 * @property touchEnabled
					 * @type Boolean
					 * @static
					 */
					touchEnabled: false
				},

				ua = subUA || nav && nav.userAgent,

				loc = win && win.location,

				href = loc && loc.href,

				m;

			/**
			 * The User Agent string that was parsed
			 * @property userAgent
			 * @type String
			 * @static
			 */
			o.userAgent = ua;


			o.secure = href && (href.toLowerCase().indexOf('https') === 0);

			if (ua) {

				if ((/windows|win32/i).test(ua)) {
					o.os = 'windows';
				} else if ((/macintosh|mac_powerpc/i).test(ua)) {
					o.os = 'macintosh';
				} else if ((/android/i).test(ua)) {
					o.os = 'android';
				} else if ((/symbos/i).test(ua)) {
					o.os = 'symbos';
				} else if ((/linux/i).test(ua)) {
					o.os = 'linux';
				} else if ((/rhino/i).test(ua)) {
					o.os = 'rhino';
				}

				// Modern KHTML browsers should qualify as Safari X-Grade
				if ((/KHTML/).test(ua)) {
					o.webkit = 1;
				}
				if ((/IEMobile|XBLWP7/).test(ua)) {
					o.mobile = 'windows';
				}
				if ((/Fennec/).test(ua)) {
					o.mobile = 'gecko';
				}
				// Modern WebKit browsers are at least X-Grade
				m = ua.match(/AppleWebKit\/([^\s]*)/);
				if (m && m[1]) {
					o.webkit = numberify(m[1]);
					o.safari = o.webkit;

					if (/PhantomJS/.test(ua)) {
						m = ua.match(/PhantomJS\/([^\s]*)/);
						if (m && m[1]) {
							o.phantomjs = numberify(m[1]);
						}
					}

					// Mobile browser check
					if (/ Mobile\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {
						o.mobile = 'Apple'; // iPhone or iPod Touch

						m = ua.match(/OS ([^\s]*)/);
						if (m && m[1]) {
							m = numberify(m[1].replace('_', '.'));
						}
						o.ios = m;
						o.os = 'ios';
						o.ipad = o.ipod = o.iphone = 0;

						m = ua.match(/iPad|iPod|iPhone/);
						if (m && m[0]) {
							o[m[0].toLowerCase()] = o.ios;
						}
					} else {
						m = ua.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
						if (m) {
							// Nokia N-series, webOS, ex: NokiaN95
							o.mobile = m[0];
						}
						if (/webOS/.test(ua)) {
							o.mobile = 'WebOS';
							m = ua.match(/webOS\/([^\s]*);/);
							if (m && m[1]) {
								o.webos = numberify(m[1]);
							}
						}
						if (/ Android/.test(ua)) {
							o.mobile = 'Android';
							m = ua.match(/Android ([^\s]*);/);
							if (m && m[1]) {
								o.android = numberify(m[1]);
							}

						}
						if (/Silk/.test(ua)) {
							m = ua.match(/Silk\/([^\s]*)/);
							if (m && m[1]) {
								o.silk = numberify(m[1]);
							}
							if (!o.android) {
								o.android = 2.34; //Hack for desktop mode in Kindle
								o.os = 'Android';
							}
							if (/Accelerated=true/.test(ua)) {
								o.accel = true;
							}
						}
					}

					m = ua.match(/OPR\/(\d+\.\d+)/);

					if (m && m[1]) {
						// Opera 15+ with Blink (pretends to be both Chrome and Safari)
						o.opera = numberify(m[1]);
					} else {
						m = ua.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/);

						if (m && m[1] && m[2]) {
							o.chrome = numberify(m[2]); // Chrome
							o.safari = 0; //Reset safari back to 0
							if (m[1] === 'CrMo') {
								o.mobile = 'chrome';
							}
						} else {
							m = ua.match(/AdobeAIR\/([^\s]*)/);
							if (m) {
								o.air = m[0]; // Adobe AIR 1.0 or better
							}
						}
					}
				}

				m = ua.match(/Ubuntu\ (\d+\.\d+)/);
				if (m && m[1]) {

					o.os = 'linux';
					o.ubuntu = numberify(m[1]);

					m = ua.match(/\ WebKit\/([^\s]*)/);
					if (m && m[1]) {
						o.webkit = numberify(m[1]);
					}
					m = ua.match(/\ Chromium\/([^\s]*)/);
					if (m && m[1]) {
						o.chrome = numberify(m[1]);
					}
					if (/ Mobile$/.test(ua)) {
						o.mobile = 'Ubuntu';
					}
				}

				if (!o.webkit) { // not webkit
					// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
					if (/Opera/.test(ua)) {
						m = ua.match(/Opera[\s\/]([^\s]*)/);
						if (m && m[1]) {
							o.opera = numberify(m[1]);
						}
						m = ua.match(/Version\/([^\s]*)/);
						if (m && m[1]) {
							o.opera = numberify(m[1]); // opera 10+
						}

						if (/Opera Mobi/.test(ua)) {
							o.mobile = 'opera';
							m = ua.replace('Opera Mobi', '').match(/Opera ([^\s]*)/);
							if (m && m[1]) {
								o.opera = numberify(m[1]);
							}
						}
						m = ua.match(/Opera Mini[^;]*/);

						if (m) {
							o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
						}
					} else { // not opera or webkit
						m = ua.match(/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/);

						if (m && (m[1] || m[2])) {
							o.ie = numberify(m[1] || m[2]);
						} else { // not opera, webkit, or ie
							m = ua.match(/Gecko\/([^\s]*)/);

							if (m) {
								o.gecko = 1; // Gecko detected, look for revision
								m = ua.match(/rv:([^\s\)]*)/);
								if (m && m[1]) {
									o.gecko = numberify(m[1]);
									if (/Mobile|Tablet/.test(ua)) {
										o.mobile = "ffos";
									}
								}
							}
						}
					}
				}
			}

			//Check for known properties to tell if touch events are enabled on this device or if
			//the number of MSPointer touchpoints on this device is greater than 0.
			if (win && nav && !(o.chrome && o.chrome < 6)) {
				o.touchEnabled = (("ontouchstart" in win) || (("msMaxTouchPoints" in nav) && (nav.msMaxTouchPoints > 0)));
			}

			//It was a parsed UA, do not assign the global value.
			if (!subUA) {

				if (typeof process === 'object') {

					if (process.versions && process.versions.node) {
						//NodeJS
						o.os = process.platform;
						o.nodejs = numberify(process.versions.node);
					}
				}

			}

			return o;
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2012 - License MIT
	  */
	!function (name, definition) {
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	}('domready', function (ready) {

	  var fns = [], fn, f = false
	    , doc = document
	    , testEl = doc.documentElement
	    , hack = testEl.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , addEventListener = 'addEventListener'
	    , onreadystatechange = 'onreadystatechange'
	    , readyState = 'readyState'
	    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
	    , loaded = loadedRgx.test(doc[readyState])

	  function flush(f) {
	    loaded = 1
	    while (f = fns.shift()) f()
	  }

	  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
	    doc.removeEventListener(domContentLoaded, fn, f)
	    flush()
	  }, f)


	  hack && doc.attachEvent(onreadystatechange, fn = function () {
	    if (/^c/.test(doc[readyState])) {
	      doc.detachEvent(onreadystatechange, fn)
	      flush()
	    }
	  })

	  return (ready = hack ?
	    function (fn) {
	      self != top ?
	        loaded ? fn() : fns.push(fn) :
	        function () {
	          try {
	            testEl.doScroll('left')
	          } catch (e) {
	            return setTimeout(function() { ready(fn) }, 50)
	          }
	          fn()
	        }()
	    } :
	    function (fn) {
	      loaded ? fn() : fns.push(fn)
	    })
	})

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

	var loadDict = {}; //所有加载文件的详细信息字典，键为url标识，值为加载状态（1-正在加载中，2-加载完成）
	var taskQueue = {};
	var linkDict = {};

	var LOADER_URL = '//style.org.hc360.cn/js/build/source/widgets/loader/';

	/**
	 * 组件统一加载对象构造方法
	 * @param moduleName String  组件模块名称
	 * @param fn Function 组件依赖文件加载完成后的回调函数
	 */
	var Loader = function(moduleName, fn) {
		this.init.call(this, moduleName, fn);
	};
	Loader.prototype = {
		/**
		 * 组件统一初始化判断
		 * @param moduleName String  组件模块名称
		 * @param fn Function 组件依赖文件加载完成后的回调函数
		 */
		init: function(moduleName, fn) {
			var _this = this;
			var link = document.getElementsByTagName('link');
			/***
			 *  获取页面所有连接地址放入一个数组里面
			 */
			for (var i = 0, len = link.length; i < len; i++) {
				linkDict[link[i].href] = 1;
			}
			/***
			 * 如果加载过组件，会在HC.W上有当前组件加Urls的属性名，属性值是一个数组
			 */
			if (HC.W[moduleName + 'Urls']) {
				_this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
			} else {
				if (loadDict[moduleName]) {
					_this.addTaskQueue(moduleName, function() {
						_this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
					});
				} else {
					loadDict[moduleName] = 1;
					HC.HUB.addScript(LOADER_URL + 'hc.' + moduleName + '.urls.js', function() {
						loadDict[moduleName] = 0;
						_this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
						_this.callTaskQueue(moduleName);
					});
				}
			}
		},
		/***
		 * 添加组件
		 * @param moduleName
		 * @param fn
		 */
		addTaskQueue: function(moduleName, fn) {
			if (!taskQueue[moduleName]) {
				taskQueue[moduleName] = [];
			}
			taskQueue[moduleName].push(fn);
		},
		callTaskQueue: function(moduleName) {
			if (taskQueue[moduleName]) {
				for (var i = 0, len = taskQueue[moduleName].length; i < len; i++) {
					taskQueue[moduleName][i]();
				}
				taskQueue[moduleName].length = 0;
			}
		},
		/**
		 * 批量添加资源文件
		 * @param index  Number  当前加载的数组序号
		 * @param moduleUrls Array  组件模块url数组
		 * @param moduleFn Function  组件模块文件加载完成以后的回调函数
		 */
		loadUrls: function(index, moduleUrls, moduleFn) {
			var _this = this;
			var i = index;
			if (i === moduleUrls.length) { //该组件的url尚未被完全加载
				moduleFn && moduleFn();
				moduleFn = null; //清除回调函数，避免重复执行
			} else { //url已全部加载完
				var urlObj = moduleUrls[i];

				/**
				 * 异步加载一个url
	 			 * @param url  要加载的地址
				 * @param type  类型   addCss  addScript
				 */
				function loadUrl(url, type) {
					if (loadDict[url]) {
						_this.addTaskQueue(url, function() {
							_this.loadUrls(++i, moduleUrls, moduleFn);
						});
					} else {
						loadDict[url] = 1;
						HC.HUB[type](url, function() {
							loadDict[url] = 0;
							_this.loadUrls(++i, moduleUrls, moduleFn);
							if (type === 'css') {
								linkDict[url] = 1;
							}
							_this.callTaskQueue(url);
						});
					}
				}
				if (urlObj.css) {
					if (linkDict[urlObj.css]) {
						_this.loadUrls(++i, moduleUrls, moduleFn);
					} else {
						loadUrl(urlObj.css, 'addCss');
					}
				} else {
					try {
						if (eval(urlObj.isExisted)) {
							_this.loadUrls(++i, moduleUrls, moduleFn);
						} else {
							loadUrl(urlObj.js, 'addScript');
						}
					} catch (ex) {
						loadUrl(urlObj.js, 'addScript');
					}
				}
			}
		}
	};

	module.exports = {
		Loader: Loader,

		/**
		 * [修改调用方式，这里采用增加一个方法对Loader进行调用使用户易于理解和简单使用，用户依然可以使用Loader获得高级功能。]
		 * @param  {[type]}   moduleName [description]
		 * @param  {Function} fn         [description]
		 * @return {[type]}              [description]
		 */
		load: function(moduleName, fn) {
			new Loader(moduleName, fn);
		}
	};

/***/ })

/******/ });