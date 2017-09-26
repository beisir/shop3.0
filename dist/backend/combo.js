/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		47:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({"0":"backend/page.album","1":"components/jquery_imgLiquid","2":"backend/page.module.setting","3":"components/mustache/mustache","4":"components/jquery.pagination","5":"components/webuploader/webuploader","6":"components/OwlCarousel/OwlCarousel","7":"components/Jcrop/Jcrop","8":"components/jquery.spectrum/jquery.spectrum","9":"components/kindeditor/kindeditor","10":"backend/page.module.selector","11":"common/hc.IELowVersionPrompt","12":"backend/page.businwindow","13":"backend/page.busnote","14":"backend/page.company","15":"backend/page.credit","16":"backend/page.index","17":"backend/page.info","18":"backend/page.mmtdocs","19":"backend/page.show","20":"backend/page.userdefinechannel"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//style.org.hc360.cn/js/module/shop3.0/dist/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 导入 json2 模块
	 * 导入 es5-shim 模块
	 * 导入 jQuery 模块
	 * 导入 dragula 模块
	 * 导入 dialog 模块
	 * 导入 jquery.placeholder 模块
	 * 导入 jquery.lazyload 模块
	 */
	__webpack_require__(2);
	__webpack_require__(3);
	// require('es5-shim');
	// require('es5-shim/es5-sham');
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);

	/**
	 * 加载 artDialog 组件样式
	 * 加载 dragula 组件样式
	 * 加载 colorpicker 组件样式
	 * 加载 webuploader 组件样式
	 * 加载 jcrop 组件样式
	 * 加载自定义样式
	 */
	__webpack_require__(23);
	__webpack_require__(28);
	__webpack_require__(30);
	__webpack_require__(32);
	__webpack_require__(34);
	__webpack_require__(37);

	/**
	 * [page_region 导入区域业务逻辑模块]
	 * @type {Object}
	 */
	var page_region = __webpack_require__(39);

	/**
	 * 引入顶部操作区域模块
	 *
	 * [跟产品确认后，认为顶部操作区是用户第一时间需要操作的区域，所以不能异步加载该模块]
	 */
	var topOperationArea = __webpack_require__(91);

	/***
	 * 初始化placeholder();
	 */
	$(function() {
		$("input[type='text'],textarea").placeholder();
	});

	/**
	 * 导入低版本浏览器提示模块
	 */
	__webpack_require__.e/* nsure */(11, function(require) {
		var IELowVersionPrompt = __webpack_require__(96);
		IELowVersionPrompt();
	});

	/**
	 * [lazyloadImages 页面存在懒加载图片时候加载懒加载组件并初始化]
	 * @type {Object}
	 */
	var lazyloadImages = $("img[data-original]");
	if (lazyloadImages.length > 0) {
		/**
		 * [threshold 初始化图片懒加载]
		 * @type {Number}
		 */
		lazyloadImages.lazyload({
			effect: "fadeIn",
			skip_invisible: true,
			failure_limit: 10
		});

		/**
		 * 主动触发屏幕滚动事件，以显示已经处于可见区域的待加载图片
		 */
		$(window).trigger("scroll");
	}

	/**
	 * [page 页面业务对象]
	 * @return {[type]} [description]
	 */
	function page() {
		var _this = this;

		/**
		 * [扩展页面对象属性]
		 * @type {[type]}
		 */
		$.extend(true, _this, {

			/**
			 * [regionList 区域业务对象实例列表]
			 * @type {Array}
			 */
			regionList: [],

			/**
			 * [cache 页面数据缓存对象]
			 * @type {Object}
			 */
			cache: {

				/**
				 * 模块设置
				 */
				'module-setting-html': {}
			}
		}, window.globalData || {});

		/**
		 * 初始化业务对象
		 */
		page.prototype.init.call(_this);
	}

	/**
	 * [init 初始化业务对象]
	 * @return {[type]} [description]
	 */
	page.prototype.init = function() {
		var _this = this;

		/**
		 * 初始化区域下模块对象实例列表
		 */
		$('[data-region]').each(function(index, element) {

			/**
			 * 实例化模块业务对象并添加到区域下模块对象实例列表
			 */
			_this.regionList.push(new page_region($(element), _this));
		});

		/**
		 * 区域业务对象创建完成后，刷新所有区域模块添加按钮视图
		 */
		_this.refreshAllRegionAppendModuleButtonView();

		/**
		 * 实例化顶部操作区域模块
		 */
		new topOperationArea(_this);
	};

	/**
	 * [refreshAllRegionAppendModuleButtonView 刷新所有区域模块添加按钮视图]
	 */
	page.prototype.refreshAllRegionAppendModuleButtonView = function() {
		var _this = this,

			/**
			 * [region_module_mapping 获取区域模块映射关系业务对象模块]
			 * @type {Object}
			 */
			region_module_mapping = __webpack_require__(50),

			/**
			 * [region_module_mapping_entity 初始化区域模块映射关系业务对象实例]
			 * @type {region_module_mapping_entity}
			 */
			region_module_mapping_entity = new region_module_mapping(),

			/**
			 * [region_module_mapping_data 获取各区域下各模块的配置数据]
			 * @type {Object}
			 */
			region_module_mapping_data = region_module_mapping_entity.analyticPageModuleData(_this);

		/**
		 * [初始化各区域 添加模块 按钮状态]
		 */
		$.each(_this.regionList, function(_regionIndex, _regionEntity) {

			/**
			 * [_tempRegionAppendModuleButtonViewState 初始化当前区域添加模块按钮状态]
			 * @type {Boolean}
			 */
			var _tempRegionAppendModuleButtonViewState = false,

				/**
				 * [_tempRegionAppendModuleButton 初始化当前区域添加模块按钮]
				 * @type {Object}
				 */
				_tempRegionAppendModuleButton = _regionEntity.htmlEntity.btnAppendModule,

				/**
				 * [_tempRegionModuleMappingData 获取当前区域下各模块配置数据]
				 * @type {Object}
				 */
				_tempRegionModuleMappingData = region_module_mapping_data[_regionEntity.identifier];

			/**
			 * [初始化当前区域 添加模块 按钮状态]
			 */
			$.each(_tempRegionModuleMappingData, function(_moduleIndex, _moduleEntity) {

				/**
				 * [存在一个模块可添加到当前区域时则显示模块添加按钮]
				 */
				_tempRegionAppendModuleButtonViewState = _moduleEntity.enabled;
				if (_tempRegionAppendModuleButtonViewState) {
					return false;
				}
			});

			/**
			 * 设置模块添加按钮显示状态
			 */
			_tempRegionAppendModuleButtonViewState ? (_tempRegionAppendModuleButton && _tempRegionAppendModuleButton.show()) : (_tempRegionAppendModuleButton && _tempRegionAppendModuleButton.hide());
		});
	};

	module.exports = page;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	//  json2.js
	//  2016-05-01
	//  Public Domain.
	//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	//  See //www.JSON.org/js.html
	//  This code should be minified before deployment.
	//  See //javascript.crockford.com/jsmin.html

	//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	//  NOT CONTROL.

	//  This file creates a global JSON object containing two methods: stringify
	//  and parse. This file is provides the ES5 JSON capability to ES3 systems.
	//  If a project might run on IE8 or earlier, then this file should be included.
	//  This file does nothing on ES5 systems.

	//      JSON.stringify(value, replacer, space)
	//          value       any JavaScript value, usually an object or array.
	//          replacer    an optional parameter that determines how object
	//                      values are stringified for objects. It can be a
	//                      function or an array of strings.
	//          space       an optional parameter that specifies the indentation
	//                      of nested structures. If it is omitted, the text will
	//                      be packed without extra whitespace. If it is a number,
	//                      it will specify the number of spaces to indent at each
	//                      level. If it is a string (such as "\t" or "&nbsp;"),
	//                      it contains the characters used to indent at each level.
	//          This method produces a JSON text from a JavaScript value.
	//          When an object value is found, if the object contains a toJSON
	//          method, its toJSON method will be called and the result will be
	//          stringified. A toJSON method does not serialize: it returns the
	//          value represented by the name/value pair that should be serialized,
	//          or undefined if nothing should be serialized. The toJSON method
	//          will be passed the key associated with the value, and this will be
	//          bound to the value.

	//          For example, this would serialize Dates as ISO strings.

	//              Date.prototype.toJSON = function (key) {
	//                  function f(n) {
	//                      // Format integers to have at least two digits.
	//                      return (n < 10)
	//                          ? "0" + n
	//                          : n;
	//                  }
	//                  return this.getUTCFullYear()   + "-" +
	//                       f(this.getUTCMonth() + 1) + "-" +
	//                       f(this.getUTCDate())      + "T" +
	//                       f(this.getUTCHours())     + ":" +
	//                       f(this.getUTCMinutes())   + ":" +
	//                       f(this.getUTCSeconds())   + "Z";
	//              };

	//          You can provide an optional replacer method. It will be passed the
	//          key and value of each member, with this bound to the containing
	//          object. The value that is returned from your method will be
	//          serialized. If your method returns undefined, then the member will
	//          be excluded from the serialization.

	//          If the replacer parameter is an array of strings, then it will be
	//          used to select the members to be serialized. It filters the results
	//          such that only members with keys listed in the replacer array are
	//          stringified.

	//          Values that do not have JSON representations, such as undefined or
	//          functions, will not be serialized. Such values in objects will be
	//          dropped; in arrays they will be replaced with null. You can use
	//          a replacer function to replace those with JSON values.

	//          JSON.stringify(undefined) returns undefined.

	//          The optional space parameter produces a stringification of the
	//          value that is filled with line breaks and indentation to make it
	//          easier to read.

	//          If the space parameter is a non-empty string, then that string will
	//          be used for indentation. If the space parameter is a number, then
	//          the indentation will be that many spaces.

	//          Example:

	//          text = JSON.stringify(["e", {pluribus: "unum"}]);
	//          // text is '["e",{"pluribus":"unum"}]'

	//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
	//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

	//          text = JSON.stringify([new Date()], function (key, value) {
	//              return this[key] instanceof Date
	//                  ? "Date(" + this[key] + ")"
	//                  : value;
	//          });
	//          // text is '["Date(---current time---)"]'

	//      JSON.parse(text, reviver)
	//          This method parses a JSON text to produce an object or array.
	//          It can throw a SyntaxError exception.

	//          The optional reviver parameter is a function that can filter and
	//          transform the results. It receives each of the keys and values,
	//          and its return value is used instead of the original value.
	//          If it returns what it received, then the structure is not modified.
	//          If it returns undefined then the member is deleted.

	//          Example:

	//          // Parse the text. Values that look like ISO date strings will
	//          // be converted to Date objects.

	//          myData = JSON.parse(text, function (key, value) {
	//              var a;
	//              if (typeof value === "string") {
	//                  a =
	//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	//                  if (a) {
	//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	//                          +a[5], +a[6]));
	//                  }
	//              }
	//              return value;
	//          });

	//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	//              var d;
	//              if (typeof value === "string" &&
	//                      value.slice(0, 5) === "Date(" &&
	//                      value.slice(-1) === ")") {
	//                  d = new Date(value.slice(5, -1));
	//                  if (d) {
	//                      return d;
	//                  }
	//              }
	//              return value;
	//          });

	//  This is a reference implementation. You are free to copy, modify, or
	//  redistribute.

	/*jslint
	    eval, for, this
	*/

	/*property
	    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/


	// Create a JSON object only if one does not already exist. We create the
	// methods in a closure to avoid creating global variables.

	if (typeof window['JSON'] !== "object") {
	    window['JSON'] = {};
	}

	(function() {
	    "use strict";

	    var rx_one = /^[\],:{}\s]*$/;
	    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
	    var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

	    function f(n) {
	        // Format integers to have at least two digits.
	        return n < 10 ? "0" + n : n;
	    }

	    function this_value() {
	        return this.valueOf();
	    }

	    if (typeof Date.prototype.toJSON !== "function") {

	        Date.prototype.toJSON = function() {

	            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" +
	                f(this.getUTCMonth() + 1) + "-" +
	                f(this.getUTCDate()) + "T" +
	                f(this.getUTCHours()) + ":" +
	                f(this.getUTCMinutes()) + ":" +
	                f(this.getUTCSeconds()) + "Z" : null;
	        };

	        Boolean.prototype.toJSON = this_value;
	        Number.prototype.toJSON = this_value;
	        String.prototype.toJSON = this_value;
	    }

	    var gap;
	    var indent;
	    var meta;
	    var rep;


	    function quote(string) {

	        // If the string contains no control characters, no quote characters, and no
	        // backslash characters, then we can safely slap some quotes around it.
	        // Otherwise we must also replace the offending characters with safe escape
	        // sequences.

	        rx_escapable.lastIndex = 0;
	        return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function(a) {
	            var c = meta[a];
	            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + "\"" : "\"" + string + "\"";
	    }


	    function str(key, holder) {

	        // Produce a string from holder[key].

	        var i; // The loop counter.
	        var k; // The member key.
	        var v; // The member value.
	        var length;
	        var mind = gap;
	        var partial;
	        var value = holder[key];

	        // If the value has a toJSON method, call it to obtain a replacement value.

	        if (value && typeof value === "object" &&
	            typeof value.toJSON === "function") {
	            value = value.toJSON(key);
	        }

	        // If we were called with a replacer function, then call the replacer to
	        // obtain a replacement value.

	        if (typeof rep === "function") {
	            value = rep.call(holder, key, value);
	        }

	        // What happens next depends on the value's type.

	        switch (typeof value) {
	            case "string":
	                return quote(value);

	            case "number":

	                // JSON numbers must be finite. Encode non-finite numbers as null.

	                return isFinite(value) ? String(value) : "null";

	            case "boolean":
	            case "null":

	                // If the value is a boolean or null, convert it to a string. Note:
	                // typeof null does not produce "null". The case is included here in
	                // the remote chance that this gets fixed someday.

	                return String(value);

	                // If the type is "object", we might be dealing with an object or an array or
	                // null.

	            case "object":

	                // Due to a specification blunder in ECMAScript, typeof null is "object",
	                // so watch out for that case.

	                if (!value) {
	                    return "null";
	                }

	                // Make an array to hold the partial results of stringifying this object value.

	                gap += indent;
	                partial = [];

	                // Is the value an array?

	                if (Object.prototype.toString.apply(value) === "[object Array]") {

	                    // The value is an array. Stringify every element. Use null as a placeholder
	                    // for non-JSON values.

	                    length = value.length;
	                    for (i = 0; i < length; i += 1) {
	                        partial[i] = str(i, value) || "null";
	                    }

	                    // Join all of the elements together, separated with commas, and wrap them in
	                    // brackets.

	                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
	                    gap = mind;
	                    return v;
	                }

	                // If the replacer is an array, use it to select the members to be stringified.

	                if (rep && typeof rep === "object") {
	                    length = rep.length;
	                    for (i = 0; i < length; i += 1) {
	                        if (typeof rep[i] === "string") {
	                            k = rep[i];
	                            v = str(k, value);
	                            if (v) {
	                                partial.push(quote(k) + (
	                                    gap ? ": " : ":"
	                                ) + v);
	                            }
	                        }
	                    }
	                } else {

	                    // Otherwise, iterate through all of the keys in the object.

	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = str(k, value);
	                            if (v) {
	                                partial.push(quote(k) + (
	                                    gap ? ": " : ":"
	                                ) + v);
	                            }
	                        }
	                    }
	                }

	                // Join all of the member texts together, separated with commas,
	                // and wrap them in braces.

	                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
	                gap = mind;
	                return v;
	        }
	    }

	    // If the JSON object does not yet have a stringify method, give it one.

	    if (typeof JSON.stringify !== "function") {
	        meta = { // table of character substitutions
	            "\b": "\\b",
	            "\t": "\\t",
	            "\n": "\\n",
	            "\f": "\\f",
	            "\r": "\\r",
	            "\"": "\\\"",
	            "\\": "\\\\"
	        };
	        JSON.stringify = function(value, replacer, space) {

	            // The stringify method takes a value and an optional replacer, and an optional
	            // space parameter, and returns a JSON text. The replacer can be a function
	            // that can replace values, or an array of strings that will select the keys.
	            // A default replacer method can be provided. Use of the space parameter can
	            // produce text that is more easily readable.

	            var i;
	            gap = "";
	            indent = "";

	            // If the space parameter is a number, make an indent string containing that
	            // many spaces.

	            if (typeof space === "number") {
	                for (i = 0; i < space; i += 1) {
	                    indent += " ";
	                }

	                // If the space parameter is a string, it will be used as the indent string.

	            } else if (typeof space === "string") {
	                indent = space;
	            }

	            // If there is a replacer, it must be a function or an array.
	            // Otherwise, throw an error.

	            rep = replacer;
	            if (replacer && typeof replacer !== "function" &&
	                (typeof replacer !== "object" ||
	                    typeof replacer.length !== "number")) {
	                throw new Error("JSON.stringify");
	            }

	            // Make a fake root object containing our value under the key of "".
	            // Return the result of stringifying the value.

	            return str("", {
	                "": value
	            });
	        };
	    }


	    // If the JSON object does not yet have a parse method, give it one.

	    if (typeof JSON.parse !== "function") {
	        JSON.parse = function(text, reviver) {

	            // The parse method takes a text and an optional reviver function, and returns
	            // a JavaScript value if the text is a valid JSON text.

	            var j;

	            function walk(holder, key) {

	                // The walk method is used to recursively walk the resulting structure so
	                // that modifications can be made.

	                var k;
	                var v;
	                var value = holder[key];
	                if (value && typeof value === "object") {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }


	            // Parsing happens in four stages. In the first stage, we replace certain
	            // Unicode characters with escape sequences. JavaScript handles many characters
	            // incorrectly, either silently deleting them, or treating them as line endings.

	            text = String(text);
	            rx_dangerous.lastIndex = 0;
	            if (rx_dangerous.test(text)) {
	                text = text.replace(rx_dangerous, function(a) {
	                    return "\\u" +
	                        ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }

	            // In the second stage, we run the text against regular expressions that look
	            // for non-JSON patterns. We are especially concerned with "()" and "new"
	            // because they can cause invocation, and "=" because it can cause mutation.
	            // But just to be safe, we want to reject all unexpected forms.

	            // We split the second stage into 4 regexp operations in order to work around
	            // crippling inefficiencies in IE's and Safari's regexp engines. First we
	            // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
	            // replace all simple value tokens with "]" characters. Third, we delete all
	            // open brackets that follow a colon or comma or that begin the text. Finally,
	            // we look to see that the remaining characters are only whitespace or "]" or
	            // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

	            if (
	                rx_one.test(
	                    text
	                    .replace(rx_two, "@")
	                    .replace(rx_three, "]")
	                    .replace(rx_four, "")
	                )
	            ) {

	                // In the third stage we use the eval function to compile the text into a
	                // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
	                // in JavaScript: it can begin a block or an object literal. We wrap the text
	                // in parens to eliminate the ambiguity.

	                j = eval("(" + text + ")");

	                // In the optional fourth stage, we recursively walk the new structure, passing
	                // each name/value pair to a reviver function for possible transformation.

	                return (typeof reviver === "function") ? walk({
	                    "": j
	                }, "") : j;
	            }

	            // If the text is not JSON parseable, then a SyntaxError is thrown.

	            throw new SyntaxError("JSON.parse");
	        };
	    }
	}());

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */

	// vim: ts=4 sts=4 sw=4 expandtab

	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';

	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	    /**
	     * Brings an environment as close to ECMAScript 5 compliance
	     * as is possible with the facilities of erstwhile engines.
	     *
	     * Annotated ES5: http://es5.github.com/ (specific links below)
	     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	     */

	    // Shortcut to an often accessed properties, in order to avoid multiple
	    // dereference that costs universally. This also holds a reference to known-good
	    // functions.
	    var $Array = Array;
	    var ArrayPrototype = $Array.prototype;
	    var $Object = Object;
	    var ObjectPrototype = $Object.prototype;
	    var $Function = Function;
	    var FunctionPrototype = $Function.prototype;
	    var $String = String;
	    var StringPrototype = $String.prototype;
	    var $Number = Number;
	    var NumberPrototype = $Number.prototype;
	    var array_slice = ArrayPrototype.slice;
	    var array_splice = ArrayPrototype.splice;
	    var array_push = ArrayPrototype.push;
	    var array_unshift = ArrayPrototype.unshift;
	    var array_concat = ArrayPrototype.concat;
	    var array_join = ArrayPrototype.join;
	    var call = FunctionPrototype.call;
	    var apply = FunctionPrototype.apply;
	    var max = Math.max;
	    var min = Math.min;

	    // Having a toString local variable name breaks in Opera so use to_string.
	    var to_string = ObjectPrototype.toString;

	    /* global Symbol */
	    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

	    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
	    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
	    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

	    /* inlined from http://npmjs.com/define-properties */
	    var supportsDescriptors = $Object.defineProperty && (function () {
	        try {
	            var obj = {};
	            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
	                return false;
	            }
	            return obj.x === obj;
	        } catch (e) { /* this is ES3 */
	            return false;
	        }
	    }());
	    var defineProperties = (function (has) {
	        // Define configurable, writable, and non-enumerable props
	        // if they don't exist.
	        var defineProperty;
	        if (supportsDescriptors) {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                $Object.defineProperty(object, name, {
	                    configurable: true,
	                    enumerable: false,
	                    writable: true,
	                    value: method
	                });
	            };
	        } else {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                object[name] = method;
	            };
	        }
	        return function defineProperties(object, map, forceAssign) {
	            for (var name in map) {
	                if (has.call(map, name)) {
	                    defineProperty(object, name, map[name], forceAssign);
	                }
	            }
	        };
	    }(ObjectPrototype.hasOwnProperty));

	    //
	    // Util
	    // ======
	    //

	    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
	    var isPrimitive = function isPrimitive(input) {
	        var type = typeof input;
	        return input === null || (type !== 'object' && type !== 'function');
	    };

	    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
	        return x !== x;
	    };

	    var ES = {
	        // ES5 9.4
	        // http://es5.github.com/#x9.4
	        // http://jsperf.com/to-integer
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
	        ToInteger: function ToInteger(num) {
	            var n = +num;
	            if (isActualNaN(n)) {
	                n = 0;
	            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                n = (n > 0 || -1) * Math.floor(Math.abs(n));
	            }
	            return n;
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
	        ToPrimitive: function ToPrimitive(input) {
	            var val, valueOf, toStr;
	            if (isPrimitive(input)) {
	                return input;
	            }
	            valueOf = input.valueOf;
	            if (isCallable(valueOf)) {
	                val = valueOf.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            toStr = input.toString;
	            if (isCallable(toStr)) {
	                val = toStr.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            throw new TypeError();
	        },

	        // ES5 9.9
	        // http://es5.github.com/#x9.9
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
	        ToObject: function (o) {
	            if (o == null) { // this matches both null and undefined
	                throw new TypeError("can't convert " + o + ' to object');
	            }
	            return $Object(o);
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
	        ToUint32: function ToUint32(x) {
	            return x >>> 0;
	        }
	    };

	    //
	    // Function
	    // ========
	    //

	    // ES-5 15.3.4.5
	    // http://es5.github.com/#x15.3.4.5

	    var Empty = function Empty() {};

	    defineProperties(FunctionPrototype, {
	        bind: function bind(that) { // .length is 1
	            // 1. Let Target be the this value.
	            var target = this;
	            // 2. If IsCallable(Target) is false, throw a TypeError exception.
	            if (!isCallable(target)) {
	                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	            }
	            // 3. Let A be a new (possibly empty) internal list of all of the
	            //   argument values provided after thisArg (arg1, arg2 etc), in order.
	            // XXX slicedArgs will stand in for "A" if used
	            var args = array_slice.call(arguments, 1); // for normal call
	            // 4. Let F be a new native ECMAScript object.
	            // 11. Set the [[Prototype]] internal property of F to the standard
	            //   built-in Function prototype object as specified in 15.3.3.1.
	            // 12. Set the [[Call]] internal property of F as described in
	            //   15.3.4.5.1.
	            // 13. Set the [[Construct]] internal property of F as described in
	            //   15.3.4.5.2.
	            // 14. Set the [[HasInstance]] internal property of F as described in
	            //   15.3.4.5.3.
	            var bound;
	            var binder = function () {

	                if (this instanceof bound) {
	                    // 15.3.4.5.2 [[Construct]]
	                    // When the [[Construct]] internal method of a function object,
	                    // F that was created using the bind function is called with a
	                    // list of arguments ExtraArgs, the following steps are taken:
	                    // 1. Let target be the value of F's [[TargetFunction]]
	                    //   internal property.
	                    // 2. If target has no [[Construct]] internal method, a
	                    //   TypeError exception is thrown.
	                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Construct]] internal
	                    //   method of target providing args as the arguments.

	                    var result = apply.call(
	                        target,
	                        this,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	                    if ($Object(result) === result) {
	                        return result;
	                    }
	                    return this;

	                } else {
	                    // 15.3.4.5.1 [[Call]]
	                    // When the [[Call]] internal method of a function object, F,
	                    // which was created using the bind function is called with a
	                    // this value and a list of arguments ExtraArgs, the following
	                    // steps are taken:
	                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                    //   property.
	                    // 3. Let target be the value of F's [[TargetFunction]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Call]] internal method
	                    //   of target providing boundThis as the this value and
	                    //   providing args as the arguments.

	                    // equiv: target.call(this, ...boundArgs, ...args)
	                    return apply.call(
	                        target,
	                        that,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );

	                }

	            };

	            // 15. If the [[Class]] internal property of Target is "Function", then
	            //     a. Let L be the length property of Target minus the length of A.
	            //     b. Set the length own property of F to either 0 or L, whichever is
	            //       larger.
	            // 16. Else set the length own property of F to 0.

	            var boundLength = max(0, target.length - args.length);

	            // 17. Set the attributes of the length own property of F to the values
	            //   specified in 15.3.5.1.
	            var boundArgs = [];
	            for (var i = 0; i < boundLength; i++) {
	                array_push.call(boundArgs, '$' + i);
	            }

	            // XXX Build a dynamic function with desired amount of arguments is the only
	            // way to set the length property of a function.
	            // In environments where Content Security Policies enabled (Chrome extensions,
	            // for ex.) all use of eval or Function costructor throws an exception.
	            // However in all of these environments Function.prototype.bind exists
	            // and so this code will never be executed.
	            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

	            if (target.prototype) {
	                Empty.prototype = target.prototype;
	                bound.prototype = new Empty();
	                // Clean up dangling references.
	                Empty.prototype = null;
	            }

	            // TODO
	            // 18. Set the [[Extensible]] internal property of F to true.

	            // TODO
	            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	            // 20. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	            //   false.
	            // 21. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	            //   and false.

	            // TODO
	            // NOTE Function objects created using Function.prototype.bind do not
	            // have a prototype property or the [[Code]], [[FormalParameters]], and
	            // [[Scope]] internal properties.
	            // XXX can't delete prototype in pure-js.

	            // 22. Return F.
	            return bound;
	        }
	    });

	    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
	    // use it in defining shortcuts.
	    var owns = call.bind(ObjectPrototype.hasOwnProperty);
	    var toStr = call.bind(ObjectPrototype.toString);
	    var arraySlice = call.bind(array_slice);
	    var arraySliceApply = apply.bind(array_slice);
	    var strSlice = call.bind(StringPrototype.slice);
	    var strSplit = call.bind(StringPrototype.split);
	    var strIndexOf = call.bind(StringPrototype.indexOf);
	    var pushCall = call.bind(array_push);
	    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
	    var arraySort = call.bind(ArrayPrototype.sort);

	    //
	    // Array
	    // =====
	    //

	    var isArray = $Array.isArray || function isArray(obj) {
	        return toStr(obj) === '[object Array]';
	    };

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.13
	    // Return len+argCount.
	    // [bugfix, ielt8]
	    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
	    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
	    defineProperties(ArrayPrototype, {
	        unshift: function () {
	            array_unshift.apply(this, arguments);
	            return this.length;
	        }
	    }, hasUnshiftReturnValueBug);

	    // ES5 15.4.3.2
	    // http://es5.github.com/#x15.4.3.2
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	    defineProperties($Array, { isArray: isArray });

	    // The IsCallable() check in the Array functions
	    // has been replaced with a strict check on the
	    // internal class of the object to trap cases where
	    // the provided function was actually a regular
	    // expression literal, which in V8 and
	    // JavaScriptCore is a typeof "function".  Only in
	    // V8 are regular expression literals permitted as
	    // reduce parameters, so it is desirable in the
	    // general case for the shim to match the more
	    // strict and common behavior of rejecting regular
	    // expressions.

	    // ES5 15.4.4.18
	    // http://es5.github.com/#x15.4.4.18
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

	    // Check failure of by-index access of string characters (IE < 9)
	    // and failure of `0 in boxedString` (Rhino)
	    var boxedString = $Object('a');
	    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	    var properlyBoxesContext = function properlyBoxed(method) {
	        // Check node 0.6.21 bug where third parameter is not boxed
	        var properlyBoxesNonStrict = true;
	        var properlyBoxesStrict = true;
	        var threwException = false;
	        if (method) {
	            try {
	                method.call('foo', function (_, __, context) {
	                    if (typeof context !== 'object') {
	                        properlyBoxesNonStrict = false;
	                    }
	                });

	                method.call([1], function () {
	                    'use strict';

	                    properlyBoxesStrict = typeof this === 'string';
	                }, 'x');
	            } catch (e) {
	                threwException = true;
	            }
	        }
	        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
	    };

	    defineProperties(ArrayPrototype, {
	        forEach: function forEach(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var i = -1;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.forEach callback must be a function');
	            }

	            while (++i < length) {
	                if (i in self) {
	                    // Invoke the callback function with call, passing arguments:
	                    // context, property value, property key, thisArg object
	                    if (typeof T === 'undefined') {
	                        callbackfn(self[i], i, object);
	                    } else {
	                        callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	        }
	    }, !properlyBoxesContext(ArrayPrototype.forEach));

	    // ES5 15.4.4.19
	    // http://es5.github.com/#x15.4.4.19
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	    defineProperties(ArrayPrototype, {
	        map: function map(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = $Array(length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.map callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    if (typeof T === 'undefined') {
	                        result[i] = callbackfn(self[i], i, object);
	                    } else {
	                        result[i] = callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.map));

	    // ES5 15.4.4.20
	    // http://es5.github.com/#x15.4.4.20
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	    defineProperties(ArrayPrototype, {
	        filter: function filter(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = [];
	            var value;
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.filter callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    value = self[i];
	                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
	                        pushCall(result, value);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.filter));

	    // ES5 15.4.4.16
	    // http://es5.github.com/#x15.4.4.16
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	    defineProperties(ArrayPrototype, {
	        every: function every(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.every callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.every));

	    // ES5 15.4.4.17
	    // http://es5.github.com/#x15.4.4.17
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	    defineProperties(ArrayPrototype, {
	        some: function some(callbackfn/*, thisArg */) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.some callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.some));

	    // ES5 15.4.4.21
	    // http://es5.github.com/#x15.4.4.21
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	    var reduceCoercesToObject = false;
	    if (ArrayPrototype.reduce) {
	        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduce: function reduce(callbackfn/*, initialValue*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduce callback must be a function');
	            }

	            // no value to return if no initial value and an empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduce of empty array with no initial value');
	            }

	            var i = 0;
	            var result;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i++];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (++i >= length) {
	                        throw new TypeError('reduce of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            for (; i < length; i++) {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            }

	            return result;
	        }
	    }, !reduceCoercesToObject);

	    // ES5 15.4.4.22
	    // http://es5.github.com/#x15.4.4.22
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	    var reduceRightCoercesToObject = false;
	    if (ArrayPrototype.reduceRight) {
	        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduceRight: function reduceRight(callbackfn/*, initial*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduceRight callback must be a function');
	            }

	            // no value to return if no initial value, empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduceRight of empty array with no initial value');
	            }

	            var result;
	            var i = length - 1;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i--];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (--i < 0) {
	                        throw new TypeError('reduceRight of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            if (i < 0) {
	                return result;
	            }

	            do {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            } while (i--);

	            return result;
	        }
	    }, !reduceRightCoercesToObject);

	    // ES5 15.4.4.14
	    // http://es5.github.com/#x15.4.4.14
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	    defineProperties(ArrayPrototype, {
	        indexOf: function indexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }

	            var i = 0;
	            if (arguments.length > 1) {
	                i = ES.ToInteger(arguments[1]);
	            }

	            // handle negative indices
	            i = i >= 0 ? i : max(0, length + i);
	            for (; i < length; i++) {
	                if (i in self && self[i] === searchElement) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2IndexOfBug);

	    // ES5 15.4.4.15
	    // http://es5.github.com/#x15.4.4.15
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
	    defineProperties(ArrayPrototype, {
	        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }
	            var i = length - 1;
	            if (arguments.length > 1) {
	                i = min(i, ES.ToInteger(arguments[1]));
	            }
	            // handle negative indices
	            i = i >= 0 ? i : length - Math.abs(i);
	            for (; i >= 0; i--) {
	                if (i in self && searchElement === self[i]) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2LastIndexOfBug);

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.12
	    var spliceNoopReturnsEmptyArray = (function () {
	        var a = [1, 2];
	        var result = a.splice();
	        return a.length === 2 && isArray(result) && result.length === 0;
	    }());
	    defineProperties(ArrayPrototype, {
	        // Safari 5.0 bug where .splice() returns undefined
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            } else {
	                return array_splice.apply(this, arguments);
	            }
	        }
	    }, !spliceNoopReturnsEmptyArray);

	    var spliceWorksWithEmptyObject = (function () {
	        var obj = {};
	        ArrayPrototype.splice.call(obj, 0, 0, 1);
	        return obj.length === 1;
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            }
	            var args = arguments;
	            this.length = max(ES.ToInteger(this.length), 0);
	            if (arguments.length > 0 && typeof deleteCount !== 'number') {
	                args = arraySlice(arguments);
	                if (args.length < 2) {
	                    pushCall(args, this.length - start);
	                } else {
	                    args[1] = ES.ToInteger(deleteCount);
	                }
	            }
	            return array_splice.apply(this, args);
	        }
	    }, !spliceWorksWithEmptyObject);
	    var spliceWorksWithLargeSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
	        var arr = new $Array(1e5);
	        // note: the index MUST be 8 or larger or the test will false pass
	        arr[8] = 'x';
	        arr.splice(1, 1);
	        // note: this test must be defined *after* the indexOf shim
	        // per https://github.com/es-shims/es5-shim/issues/313
	        return arr.indexOf('x') === 7;
	    }());
	    var spliceWorksWithSmallSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Opera 12.15 breaks on this, no idea why.
	        var n = 256;
	        var arr = [];
	        arr[n] = 'a';
	        arr.splice(n + 1, 0, 'b');
	        return arr[n] === 'a';
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            var O = ES.ToObject(this);
	            var A = [];
	            var len = ES.ToUint32(O.length);
	            var relativeStart = ES.ToInteger(start);
	            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
	            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

	            var k = 0;
	            var from;
	            while (k < actualDeleteCount) {
	                from = $String(actualStart + k);
	                if (owns(O, from)) {
	                    A[k] = O[from];
	                }
	                k += 1;
	            }

	            var items = arraySlice(arguments, 2);
	            var itemCount = items.length;
	            var to;
	            if (itemCount < actualDeleteCount) {
	                k = actualStart;
	                var maxK = len - actualDeleteCount;
	                while (k < maxK) {
	                    from = $String(k + actualDeleteCount);
	                    to = $String(k + itemCount);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k += 1;
	                }
	                k = len;
	                var minK = len - actualDeleteCount + itemCount;
	                while (k > minK) {
	                    delete O[k - 1];
	                    k -= 1;
	                }
	            } else if (itemCount > actualDeleteCount) {
	                k = len - actualDeleteCount;
	                while (k > actualStart) {
	                    from = $String(k + actualDeleteCount - 1);
	                    to = $String(k + itemCount - 1);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k -= 1;
	                }
	            }
	            k = actualStart;
	            for (var i = 0; i < items.length; ++i) {
	                O[k] = items[i];
	                k += 1;
	            }
	            O.length = len - actualDeleteCount + itemCount;

	            return A;
	        }
	    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

	    var originalJoin = ArrayPrototype.join;
	    var hasStringJoinBug;
	    try {
	        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	    } catch (e) {
	        hasStringJoinBug = true;
	    }
	    if (hasStringJoinBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
	            }
	        }, hasStringJoinBug);
	    }

	    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
	    if (hasJoinUndefinedBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(this, sep);
	            }
	        }, hasJoinUndefinedBug);
	    }

	    var pushShim = function push(item) {
	        var O = ES.ToObject(this);
	        var n = ES.ToUint32(O.length);
	        var i = 0;
	        while (i < arguments.length) {
	            O[n + i] = arguments[i];
	            i += 1;
	        }
	        O.length = n + i;
	        return n + i;
	    };

	    var pushIsNotGeneric = (function () {
	        var obj = {};
	        var result = Array.prototype.push.call(obj, undefined);
	        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
	    }());
	    defineProperties(ArrayPrototype, {
	        push: function push(item) {
	            if (isArray(this)) {
	                return array_push.apply(this, arguments);
	            }
	            return pushShim.apply(this, arguments);
	        }
	    }, pushIsNotGeneric);

	    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
	    var pushUndefinedIsWeird = (function () {
	        var arr = [];
	        var result = arr.push(undefined);
	        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
	    }());
	    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

	    // ES5 15.2.3.14
	    // http://es5.github.io/#x15.4.4.10
	    // Fix boxed string bug
	    defineProperties(ArrayPrototype, {
	        slice: function (start, end) {
	            var arr = isString(this) ? strSplit(this, '') : this;
	            return arraySliceApply(arr, arguments);
	        }
	    }, splitString);

	    var sortIgnoresNonFunctions = (function () {
	        try {
	            [1, 2].sort(null);
	            [1, 2].sort({});
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    var sortThrowsOnRegex = (function () {
	        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
	        try {
	            [1, 2].sort(/a/);
	            return false;
	        } catch (e) {}
	        return true;
	    }());
	    var sortIgnoresUndefined = (function () {
	        // applies in IE 8, for one.
	        try {
	            [1, 2].sort(undefined);
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    defineProperties(ArrayPrototype, {
	        sort: function sort(compareFn) {
	            if (typeof compareFn === 'undefined') {
	                return arraySort(this);
	            }
	            if (!isCallable(compareFn)) {
	                throw new TypeError('Array.prototype.sort callback must be a function');
	            }
	            return arraySort(this, compareFn);
	        }
	    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

	    //
	    // Object
	    // ======
	    //

	    // ES5 15.2.3.14
	    // http://es5.github.com/#x15.2.3.14

	    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString');
	    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
	    var hasStringEnumBug = !owns('x', '0');
	    var equalsConstructorPrototype = function (o) {
	        var ctor = o.constructor;
	        return ctor && ctor.prototype === o;
	    };
	    var blacklistedKeys = {
	        $window: true,
	        $console: true,
	        $parent: true,
	        $self: true,
	        $frame: true,
	        $frames: true,
	        $frameElement: true,
	        $webkitIndexedDB: true,
	        $webkitStorageInfo: true,
	        $external: true
	    };
	    var hasAutomationEqualityBug = (function () {
	        /* globals window */
	        if (typeof window === 'undefined') {
	            return false;
	        }
	        for (var k in window) {
	            try {
	                if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
	                    equalsConstructorPrototype(window[k]);
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	        return false;
	    }());
	    var equalsConstructorPrototypeIfNotBuggy = function (object) {
	        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	            return equalsConstructorPrototype(object);
	        }
	        try {
	            return equalsConstructorPrototype(object);
	        } catch (e) {
	            return false;
	        }
	    };
	    var dontEnums = [
	        'toString',
	        'toLocaleString',
	        'valueOf',
	        'hasOwnProperty',
	        'isPrototypeOf',
	        'propertyIsEnumerable',
	        'constructor'
	    ];
	    var dontEnumsLength = dontEnums.length;

	    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	    // can be replaced with require('is-arguments') if we ever use a build process instead
	    var isStandardArguments = function isArguments(value) {
	        return toStr(value) === '[object Arguments]';
	    };
	    var isLegacyArguments = function isArguments(value) {
	        return value !== null &&
	            typeof value === 'object' &&
	            typeof value.length === 'number' &&
	            value.length >= 0 &&
	            !isArray(value) &&
	            isCallable(value.callee);
	    };
	    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

	    defineProperties($Object, {
	        keys: function keys(object) {
	            var isFn = isCallable(object);
	            var isArgs = isArguments(object);
	            var isObject = object !== null && typeof object === 'object';
	            var isStr = isObject && isString(object);

	            if (!isObject && !isFn && !isArgs) {
	                throw new TypeError('Object.keys called on a non-object');
	            }

	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && isFn;
	            if ((isStr && hasStringEnumBug) || isArgs) {
	                for (var i = 0; i < object.length; ++i) {
	                    pushCall(theKeys, $String(i));
	                }
	            }

	            if (!isArgs) {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
	                        pushCall(theKeys, $String(name));
	                    }
	                }
	            }

	            if (hasDontEnumBug) {
	                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
	                        pushCall(theKeys, dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        }
	    });

	    var keysWorksWithArguments = $Object.keys && (function () {
	        // Safari 5.0 bug
	        return $Object.keys(arguments).length === 2;
	    }(1, 2));
	    var keysHasArgumentsLengthBug = $Object.keys && (function () {
	        var argKeys = $Object.keys(arguments);
	        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
	    }(1));
	    var originalKeys = $Object.keys;
	    defineProperties($Object, {
	        keys: function keys(object) {
	            if (isArguments(object)) {
	                return originalKeys(arraySlice(object));
	            } else {
	                return originalKeys(object);
	            }
	        }
	    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

	    //
	    // Date
	    // ====
	    //

	    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
	    var aNegativeTestDate = new Date(-1509842289600292);
	    var aPositiveTestDate = new Date(1449662400000);
	    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
	    var hasToDateStringFormatBug;
	    var hasToStringFormatBug;
	    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
	    if (timeZoneOffset < -720) {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
	        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    } else {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
	        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/).test(aPositiveTestDate.toString());
	    }

	    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
	    var originalGetMonth = call.bind(Date.prototype.getMonth);
	    var originalGetDate = call.bind(Date.prototype.getDate);
	    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
	    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
	    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
	    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
	    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
	    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
	    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
	    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
	    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var daysInMonth = function daysInMonth(month, year) {
	        return originalGetDate(new Date(year, month, 0));
	    };

	    defineProperties(Date.prototype, {
	        getFullYear: function getFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            if (year < 0 && originalGetMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getMonth: function getMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getDate: function getDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            var date = originalGetDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        },
	        getUTCFullYear: function getUTCFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            if (year < 0 && originalGetUTCMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getUTCMonth: function getUTCMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getUTCDate: function getUTCDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            var date = originalGetUTCDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        }
	    }, hasNegativeMonthYearBug);

	    defineProperties(Date.prototype, {
	        toUTCString: function toUTCString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = originalGetUTCDay(this);
	            var date = originalGetUTCDate(this);
	            var month = originalGetUTCMonth(this);
	            var year = originalGetUTCFullYear(this);
	            var hour = originalGetUTCHours(this);
	            var minute = originalGetUTCMinutes(this);
	            var second = originalGetUTCSeconds(this);
	            return dayName[day] + ', ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                monthName[month] + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT';
	        }
	    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

	    // Opera 12 has `,`
	    defineProperties(Date.prototype, {
	        toDateString: function toDateString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year;
	        }
	    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

	    // can't use defineProperties here because of toString enumeration issue in IE <= 8
	    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
	        Date.prototype.toString = function toString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            var hour = this.getHours();
	            var minute = this.getMinutes();
	            var second = this.getSeconds();
	            var timezoneOffset = this.getTimezoneOffset();
	            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
	            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
	            return dayName[day] + ' ' +
	                monthName[month] + ' ' +
	                (date < 10 ? '0' + date : date) + ' ' +
	                year + ' ' +
	                (hour < 10 ? '0' + hour : hour) + ':' +
	                (minute < 10 ? '0' + minute : minute) + ':' +
	                (second < 10 ? '0' + second : second) + ' GMT' +
	                (timezoneOffset > 0 ? '-' : '+') +
	                (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset) +
	                (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
	        };
	        if (supportsDescriptors) {
	            $Object.defineProperty(Date.prototype, 'toString', {
	                configurable: true,
	                enumerable: false,
	                writable: true
	            });
	        }
	    }

	    // ES5 15.9.5.43
	    // http://es5.github.com/#x15.9.5.43
	    // This function returns a String value represent the instance in time
	    // represented by this Date object. The format of the String is the Date Time
	    // string format defined in 15.9.1.15. All fields are present in the String.
	    // The time zone is always UTC, denoted by the suffix Z. If the time value of
	    // this object is not a finite Number a RangeError exception is thrown.
	    var negativeDate = -62198755200000;
	    var negativeYearString = '-000001';
	    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
	    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

	    var getTime = call.bind(Date.prototype.getTime);

	    defineProperties(Date.prototype, {
	        toISOString: function toISOString() {
	            if (!isFinite(this) || !isFinite(getTime(this))) {
	                // Adope Photoshop requires the second check.
	                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
	            }

	            var year = originalGetUTCFullYear(this);

	            var month = originalGetUTCMonth(this);
	            // see https://github.com/es-shims/es5-shim/issues/111
	            year += Math.floor(month / 12);
	            month = (month % 12 + 12) % 12;

	            // the date time string format is specified in 15.9.1.15.
	            var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
	            year = (
	                (year < 0 ? '-' : (year > 9999 ? '+' : '')) +
	                strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
	            );

	            for (var i = 0; i < result.length; ++i) {
	                // pad months, days, hours, minutes, and seconds to have two digits.
	                result[i] = strSlice('00' + result[i], -2);
	            }
	            // pad milliseconds to have three digits.
	            return (
	                year + '-' + arraySlice(result, 0, 2).join('-') +
	                'T' + arraySlice(result, 2).join(':') + '.' +
	                strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
	            );
	        }
	    }, hasNegativeDateBug || hasSafari51DateBug);

	    // ES5 15.9.5.44
	    // http://es5.github.com/#x15.9.5.44
	    // This function provides a String representation of a Date object for use by
	    // JSON.stringify (15.12.3).
	    var dateToJSONIsSupported = (function () {
	        try {
	            return Date.prototype.toJSON &&
	                new Date(NaN).toJSON() === null &&
	                new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
	                Date.prototype.toJSON.call({ // generic
	                    toISOString: function () { return true; }
	                });
	        } catch (e) {
	            return false;
	        }
	    }());
	    if (!dateToJSONIsSupported) {
	        Date.prototype.toJSON = function toJSON(key) {
	            // When the toJSON method is called with argument key, the following
	            // steps are taken:

	            // 1.  Let O be the result of calling ToObject, giving it the this
	            // value as its argument.
	            // 2. Let tv be ES.ToPrimitive(O, hint Number).
	            var O = $Object(this);
	            var tv = ES.ToPrimitive(O);
	            // 3. If tv is a Number and is not finite, return null.
	            if (typeof tv === 'number' && !isFinite(tv)) {
	                return null;
	            }
	            // 4. Let toISO be the result of calling the [[Get]] internal method of
	            // O with argument "toISOString".
	            var toISO = O.toISOString;
	            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
	            if (!isCallable(toISO)) {
	                throw new TypeError('toISOString property is not callable');
	            }
	            // 6. Return the result of calling the [[Call]] internal method of
	            //  toISO with O as the this value and an empty argument list.
	            return toISO.call(O);

	            // NOTE 1 The argument is ignored.

	            // NOTE 2 The toJSON function is intentionally generic; it does not
	            // require that its this value be a Date object. Therefore, it can be
	            // transferred to other kinds of objects for use as a method. However,
	            // it does require that any such object have a toISOString method. An
	            // object is free to use the argument key to filter its
	            // stringification.
	        };
	    }

	    // ES5 15.9.4.2
	    // http://es5.github.com/#x15.9.4.2
	    // based on work shared by Daniel Friesen (dantman)
	    // http://gist.github.com/303249
	    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
	    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
	    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
	        // XXX global assignment won't work in embeddings that use
	        // an alternate object for the context.
	        /* global Date: true */
	        /* eslint-disable no-undef */
	        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
	        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
	        /* eslint-disable no-implicit-globals */
	        Date = (function (NativeDate) {
	        /* eslint-enable no-implicit-globals */
	        /* eslint-enable no-undef */
	            // Date.length === 7
	            var DateShim = function Date(Y, M, D, h, m, s, ms) {
	                var length = arguments.length;
	                var date;
	                if (this instanceof NativeDate) {
	                    var seconds = s;
	                    var millis = ms;
	                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
	                        // work around a Safari 8/9 bug where it treats the seconds as signed
	                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                        var sToShift = Math.floor(msToShift / 1e3);
	                        seconds += sToShift;
	                        millis -= sToShift * 1e3;
	                    }
	                    date = length === 1 && $String(Y) === Y ? // isString(Y)
	                        // We explicitly pass it through parse:
	                        new NativeDate(DateShim.parse(Y)) :
	                        // We have to manually make calls depending on argument
	                        // length here
	                        length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :
	                        length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :
	                        length >= 5 ? new NativeDate(Y, M, D, h, m) :
	                        length >= 4 ? new NativeDate(Y, M, D, h) :
	                        length >= 3 ? new NativeDate(Y, M, D) :
	                        length >= 2 ? new NativeDate(Y, M) :
	                        length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y) :
	                                      new NativeDate();
	                } else {
	                    date = NativeDate.apply(this, arguments);
	                }
	                if (!isPrimitive(date)) {
	                    // Prevent mixups with unfixed Date object
	                    defineProperties(date, { constructor: DateShim }, true);
	                }
	                return date;
	            };

	            // 15.9.1.15 Date Time String Format.
	            var isoDateExpression = new RegExp('^' +
	                '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +
	                                          // 6-digit extended year
	                '(?:-(\\d{2})' + // optional month capture
	                '(?:-(\\d{2})' + // optional day capture
	                '(?:' + // capture hours:minutes:seconds.milliseconds
	                    'T(\\d{2})' + // hours capture
	                    ':(\\d{2})' + // minutes capture
	                    '(?:' + // optional :seconds.milliseconds
	                        ':(\\d{2})' + // seconds capture
	                        '(?:(\\.\\d{1,}))?' + // milliseconds capture
	                    ')?' +
	                '(' + // capture UTC offset component
	                    'Z|' + // UTC capture
	                    '(?:' + // offset specifier +/-hours:minutes
	                        '([-+])' + // sign capture
	                        '(\\d{2})' + // hours offset capture
	                        ':(\\d{2})' + // minutes offset capture
	                    ')' +
	                ')?)?)?)?' +
	            '$');

	            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

	            var dayFromMonth = function dayFromMonth(year, month) {
	                var t = month > 1 ? 1 : 0;
	                return (
	                    months[month] +
	                    Math.floor((year - 1969 + t) / 4) -
	                    Math.floor((year - 1901 + t) / 100) +
	                    Math.floor((year - 1601 + t) / 400) +
	                    365 * (year - 1970)
	                );
	            };

	            var toUTC = function toUTC(t) {
	                var s = 0;
	                var ms = t;
	                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
	                    // work around a Safari 8/9 bug where it treats the seconds as signed
	                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                    var sToShift = Math.floor(msToShift / 1e3);
	                    s += sToShift;
	                    ms -= sToShift * 1e3;
	                }
	                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
	            };

	            // Copy any custom methods a 3rd party library may have added
	            for (var key in NativeDate) {
	                if (owns(NativeDate, key)) {
	                    DateShim[key] = NativeDate[key];
	                }
	            }

	            // Copy "native" methods explicitly; they may be non-enumerable
	            defineProperties(DateShim, {
	                now: NativeDate.now,
	                UTC: NativeDate.UTC
	            }, true);
	            DateShim.prototype = NativeDate.prototype;
	            defineProperties(DateShim.prototype, {
	                constructor: DateShim
	            }, true);

	            // Upgrade Date.parse to handle simplified ISO 8601 strings
	            var parseShim = function parse(string) {
	                var match = isoDateExpression.exec(string);
	                if (match) {
	                    // parse months, days, hours, minutes, seconds, and milliseconds
	                    // provide default values if necessary
	                    // parse the UTC offset component
	                    var year = $Number(match[1]),
	                        month = $Number(match[2] || 1) - 1,
	                        day = $Number(match[3] || 1) - 1,
	                        hour = $Number(match[4] || 0),
	                        minute = $Number(match[5] || 0),
	                        second = $Number(match[6] || 0),
	                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
	                        // When time zone is missed, local offset should be used
	                        // (ES 5.1 bug)
	                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
	                        isLocalTime = Boolean(match[4] && !match[8]),
	                        signOffset = match[9] === '-' ? 1 : -1,
	                        hourOffset = $Number(match[10] || 0),
	                        minuteOffset = $Number(match[11] || 0),
	                        result;
	                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
	                    if (
	                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&
	                        minute < 60 && second < 60 && millisecond < 1000 &&
	                        month > -1 && month < 12 && hourOffset < 24 &&
	                        minuteOffset < 60 && // detect invalid offsets
	                        day > -1 &&
	                        day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
	                    ) {
	                        result = (
	                            (dayFromMonth(year, month) + day) * 24 +
	                            hour +
	                            hourOffset * signOffset
	                        ) * 60;
	                        result = (
	                            (result + minute + minuteOffset * signOffset) * 60 +
	                            second
	                        ) * 1000 + millisecond;
	                        if (isLocalTime) {
	                            result = toUTC(result);
	                        }
	                        if (-8.64e15 <= result && result <= 8.64e15) {
	                            return result;
	                        }
	                    }
	                    return NaN;
	                }
	                return NativeDate.parse.apply(this, arguments);
	            };
	            defineProperties(DateShim, { parse: parseShim });

	            return DateShim;
	        }(Date));
	        /* global Date: false */
	    }

	    // ES5 15.9.4.4
	    // http://es5.github.com/#x15.9.4.4
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }

	    //
	    // Number
	    // ======
	    //

	    // ES5.1 15.7.4.5
	    // http://es5.github.com/#x15.7.4.5
	    var hasToFixedBugs = NumberPrototype.toFixed && (
	      (0.00008).toFixed(3) !== '0.000' ||
	      (0.9).toFixed(0) !== '1' ||
	      (1.255).toFixed(2) !== '1.25' ||
	      (1000000000000000128).toFixed(0) !== '1000000000000000128'
	    );

	    var toFixedHelpers = {
	        base: 1e7,
	        size: 6,
	        data: [0, 0, 0, 0, 0, 0],
	        multiply: function multiply(n, c) {
	            var i = -1;
	            var c2 = c;
	            while (++i < toFixedHelpers.size) {
	                c2 += n * toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
	                c2 = Math.floor(c2 / toFixedHelpers.base);
	            }
	        },
	        divide: function divide(n) {
	            var i = toFixedHelpers.size;
	            var c = 0;
	            while (--i >= 0) {
	                c += toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = Math.floor(c / n);
	                c = (c % n) * toFixedHelpers.base;
	            }
	        },
	        numToString: function numToString() {
	            var i = toFixedHelpers.size;
	            var s = '';
	            while (--i >= 0) {
	                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
	                    var t = $String(toFixedHelpers.data[i]);
	                    if (s === '') {
	                        s = t;
	                    } else {
	                        s += strSlice('0000000', 0, 7 - t.length) + t;
	                    }
	                }
	            }
	            return s;
	        },
	        pow: function pow(x, n, acc) {
	            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
	        },
	        log: function log(x) {
	            var n = 0;
	            var x2 = x;
	            while (x2 >= 4096) {
	                n += 12;
	                x2 /= 4096;
	            }
	            while (x2 >= 2) {
	                n += 1;
	                x2 /= 2;
	            }
	            return n;
	        }
	    };

	    var toFixedShim = function toFixed(fractionDigits) {
	        var f, x, s, m, e, z, j, k;

	        // Test for NaN and round fractionDigits down
	        f = $Number(fractionDigits);
	        f = isActualNaN(f) ? 0 : Math.floor(f);

	        if (f < 0 || f > 20) {
	            throw new RangeError('Number.toFixed called with invalid number of decimals');
	        }

	        x = $Number(this);

	        if (isActualNaN(x)) {
	            return 'NaN';
	        }

	        // If it is too big or small, return the string value of the number
	        if (x <= -1e21 || x >= 1e21) {
	            return $String(x);
	        }

	        s = '';

	        if (x < 0) {
	            s = '-';
	            x = -x;
	        }

	        m = '0';

	        if (x > 1e-21) {
	            // 1e-21 < x < 1e21
	            // -70 < log2(x) < 70
	            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
	            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
	            z *= 0x10000000000000; // Math.pow(2, 52);
	            e = 52 - e;

	            // -18 < e < 122
	            // x = z / 2 ^ e
	            if (e > 0) {
	                toFixedHelpers.multiply(0, z);
	                j = f;

	                while (j >= 7) {
	                    toFixedHelpers.multiply(1e7, 0);
	                    j -= 7;
	                }

	                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
	                j = e - 1;

	                while (j >= 23) {
	                    toFixedHelpers.divide(1 << 23);
	                    j -= 23;
	                }

	                toFixedHelpers.divide(1 << j);
	                toFixedHelpers.multiply(1, 1);
	                toFixedHelpers.divide(2);
	                m = toFixedHelpers.numToString();
	            } else {
	                toFixedHelpers.multiply(0, z);
	                toFixedHelpers.multiply(1 << (-e), 0);
	                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
	            }
	        }

	        if (f > 0) {
	            k = m.length;

	            if (k <= f) {
	                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
	            } else {
	                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
	            }
	        } else {
	            m = s + m;
	        }

	        return m;
	    };
	    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

	    var hasToPrecisionUndefinedBug = (function () {
	        try {
	            return 1.0.toPrecision(undefined) === '1';
	        } catch (e) {
	            return true;
	        }
	    }());
	    var originalToPrecision = NumberPrototype.toPrecision;
	    defineProperties(NumberPrototype, {
	        toPrecision: function toPrecision(precision) {
	            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
	        }
	    }, hasToPrecisionUndefinedBug);

	    //
	    // String
	    // ======
	    //

	    // ES5 15.5.4.14
	    // http://es5.github.com/#x15.5.4.14

	    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	    // Many browsers do not split properly with regular expressions or they
	    // do not perform the split correctly under obscure conditions.
	    // See http://blog.stevenlevithan.com/archives/cross-browser-split
	    // I've tested in many browsers and this seems to cover the deviant ones:
	    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	    //       [undefined, "t", undefined, "e", ...]
	    //    ''.split(/.?/) should be [], not [""]
	    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

	    if (
	        'ab'.split(/(?:ab)*/).length !== 2 ||
	        '.'.split(/(.?)(.?)/).length !== 4 ||
	        'tesst'.split(/(s)*/)[1] === 't' ||
	        'test'.split(/(?:)/, -1).length !== 4 ||
	        ''.split(/.?/).length ||
	        '.'.split(/()()/).length > 1
	    ) {
	        (function () {
	            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
	            var maxSafe32BitInt = Math.pow(2, 32) - 1;

	            StringPrototype.split = function (separator, limit) {
	                var string = String(this);
	                if (typeof separator === 'undefined' && limit === 0) {
	                    return [];
	                }

	                // If `separator` is not a regex, use native split
	                if (!isRegex(separator)) {
	                    return strSplit(this, separator, limit);
	                }

	                var output = [];
	                var flags = (separator.ignoreCase ? 'i' : '') +
	                            (separator.multiline ? 'm' : '') +
	                            (separator.unicode ? 'u' : '') + // in ES6
	                            (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
	                    lastLastIndex = 0,
	                    // Make `global` and avoid `lastIndex` issues by working with a copy
	                    separator2, match, lastIndex, lastLength;
	                var separatorCopy = new RegExp(separator.source, flags + 'g');
	                if (!compliantExecNpcg) {
	                    // Doesn't need flags gy, but they don't hurt
	                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	                }
	                /* Values for `limit`, per the spec:
	                 * If undefined: 4294967295 // maxSafe32BitInt
	                 * If 0, Infinity, or NaN: 0
	                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	                 * If other: Type-convert, then use the above rules
	                 */
	                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
	                match = separatorCopy.exec(string);
	                while (match) {
	                    // `separatorCopy.lastIndex` is not reliable cross-browser
	                    lastIndex = match.index + match[0].length;
	                    if (lastIndex > lastLastIndex) {
	                        pushCall(output, strSlice(string, lastLastIndex, match.index));
	                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                        // nonparticipating capturing groups
	                        if (!compliantExecNpcg && match.length > 1) {
	                            /* eslint-disable no-loop-func */
	                            match[0].replace(separator2, function () {
	                                for (var i = 1; i < arguments.length - 2; i++) {
	                                    if (typeof arguments[i] === 'undefined') {
	                                        match[i] = void 0;
	                                    }
	                                }
	                            });
	                            /* eslint-enable no-loop-func */
	                        }
	                        if (match.length > 1 && match.index < string.length) {
	                            array_push.apply(output, arraySlice(match, 1));
	                        }
	                        lastLength = match[0].length;
	                        lastLastIndex = lastIndex;
	                        if (output.length >= splitLimit) {
	                            break;
	                        }
	                    }
	                    if (separatorCopy.lastIndex === match.index) {
	                        separatorCopy.lastIndex++; // Avoid an infinite loop
	                    }
	                    match = separatorCopy.exec(string);
	                }
	                if (lastLastIndex === string.length) {
	                    if (lastLength || !separatorCopy.test('')) {
	                        pushCall(output, '');
	                    }
	                } else {
	                    pushCall(output, strSlice(string, lastLastIndex));
	                }
	                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
	            };
	        }());

	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	    } else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (typeof separator === 'undefined' && limit === 0) {
	                return [];
	            }
	            return strSplit(this, separator, limit);
	        };
	    }

	    var str_replace = StringPrototype.replace;
	    var replaceReportsGroupsCorrectly = (function () {
	        var groups = [];
	        'x'.replace(/x(.)?/g, function (match, group) {
	            pushCall(groups, group);
	        });
	        return groups.length === 1 && typeof groups[0] === 'undefined';
	    }());

	    if (!replaceReportsGroupsCorrectly) {
	        StringPrototype.replace = function replace(searchValue, replaceValue) {
	            var isFn = isCallable(replaceValue);
	            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
	            if (!isFn || !hasCapturingGroups) {
	                return str_replace.call(this, searchValue, replaceValue);
	            } else {
	                var wrappedReplaceValue = function (match) {
	                    var length = arguments.length;
	                    var originalLastIndex = searchValue.lastIndex;
	                    searchValue.lastIndex = 0;
	                    var args = searchValue.exec(match) || [];
	                    searchValue.lastIndex = originalLastIndex;
	                    pushCall(args, arguments[length - 2], arguments[length - 1]);
	                    return replaceValue.apply(this, args);
	                };
	                return str_replace.call(this, searchValue, wrappedReplaceValue);
	            }
	        };
	    }

	    // ECMA-262, 3rd B.2.3
	    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	    // non-normative section suggesting uniform semantics and it should be
	    // normalized across all browsers
	    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	    var string_substr = StringPrototype.substr;
	    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	    defineProperties(StringPrototype, {
	        substr: function substr(start, length) {
	            var normalizedStart = start;
	            if (start < 0) {
	                normalizedStart = max(this.length + start, 0);
	            }
	            return string_substr.call(this, normalizedStart, length);
	        }
	    }, hasNegativeSubstrBug);

	    // ES5 15.5.4.20
	    // whitespace from: http://es5.github.io/#x15.5.4.20
	    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
	        '\u2029\uFEFF';
	    var zeroWidth = '\u200b';
	    var wsRegexChars = '[' + ws + ']';
	    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	    defineProperties(StringPrototype, {
	        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	        // http://perfectionkills.com/whitespace-deviations/
	        trim: function trim() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	        }
	    }, hasTrimWhitespaceBug);
	    var trim = call.bind(String.prototype.trim);

	    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var S = $String(this);
	            var searchStr = $String(searchString);
	            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
	            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
	            var start = min(max(pos, 0), S.length);
	            var searchLen = searchStr.length;
	            var k = start + searchLen;
	            while (k > 0) {
	                k = max(0, k - searchLen);
	                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
	                if (index !== -1) {
	                    return k + index;
	                }
	            }
	            return -1;
	        }
	    }, hasLastIndexBug);

	    var originalLastIndexOf = StringPrototype.lastIndexOf;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            return originalLastIndexOf.apply(this, arguments);
	        }
	    }, StringPrototype.lastIndexOf.length !== 1);

	    // ES-5 15.1.2.2
	    /* eslint-disable radix */
	    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
	    /* eslint-enable radix */
	        /* global parseInt: true */
	        parseInt = (function (origParseInt) {
	            var hexRegex = /^[\-+]?0[xX]/;
	            return function parseInt(str, radix) {
	                var string = trim(String(str));
	                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
	                return origParseInt(string, defaultedRadix);
	            };
	        }(parseInt));
	    }

	    // https://es5.github.io/#x15.1.2.3
	    if (1 / parseFloat('-0') !== -Infinity) {
	        /* global parseFloat: true */
	        parseFloat = (function (origParseFloat) {
	            return function parseFloat(string) {
	                var inputString = trim(String(string));
	                var result = origParseFloat(inputString);
	                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
	            };
	        }(parseFloat));
	    }

	    if (String(new RangeError('test')) !== 'RangeError: test') {
	        var errorToStringShim = function toString() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var name = this.name;
	            if (typeof name === 'undefined') {
	                name = 'Error';
	            } else if (typeof name !== 'string') {
	                name = $String(name);
	            }
	            var msg = this.message;
	            if (typeof msg === 'undefined') {
	                msg = '';
	            } else if (typeof msg !== 'string') {
	                msg = $String(msg);
	            }
	            if (!name) {
	                return msg;
	            }
	            if (!msg) {
	                return name;
	            }
	            return name + ': ' + msg;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        Error.prototype.toString = errorToStringShim;
	    }

	    if (supportsDescriptors) {
	        var ensureNonEnumerable = function (obj, prop) {
	            if (isEnum(obj, prop)) {
	                var desc = Object.getOwnPropertyDescriptor(obj, prop);
	                if (desc.configurable) {
	                    desc.enumerable = false;
	                    Object.defineProperty(obj, prop, desc);
	                }
	            }
	        };
	        ensureNonEnumerable(Error.prototype, 'message');
	        if (Error.prototype.message !== '') {
	            Error.prototype.message = '';
	        }
	        ensureNonEnumerable(Error.prototype, 'name');
	    }

	    if (String(/a/mig) !== '/a/gim') {
	        var regexToString = function toString() {
	            var str = '/' + this.source + '/';
	            if (this.global) {
	                str += 'g';
	            }
	            if (this.ignoreCase) {
	                str += 'i';
	            }
	            if (this.multiline) {
	                str += 'm';
	            }
	            return str;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        RegExp.prototype.toString = regexToString;
	    }
	}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v1.9.1
	 * //jquery.com/
	 *
	 * Includes Sizzle.js
	 * //sizzlejs.com/
	 *
	 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * //jquery.org/license
	 *
	 * Date: 2013-2-4
	 */
	(function(window, undefined) {

		// Can't do this because several apps including ASP.NET trace
		// the stack via arguments.caller.callee and Firefox dies if
		// you try to trace through "use strict" call chains. (#13335)
		// Support: Firefox 18+
		//"use strict";
		var
		// The deferred used on DOM ready
			readyList,

			// A central reference to the root jQuery(document)
			rootjQuery,

			// Support: IE<9
			// For `typeof node.method` instead of `node.method !== undefined`
			core_strundefined = typeof undefined,

			// Use the correct document accordingly with window argument (sandbox)
			document = window.document,
			location = window.location,

			// Map over jQuery in case of overwrite
			_jQuery = window.jQuery,

			// Map over the $ in case of overwrite
			_$ = window.$,

			// [[Class]] -> type pairs
			class2type = {},

			// List of deleted data cache ids, so we can reuse them
			core_deletedIds = [],

			core_version = "1.9.1",

			// Save a reference to some core methods
			core_concat = core_deletedIds.concat,
			core_push = core_deletedIds.push,
			core_slice = core_deletedIds.slice,
			core_indexOf = core_deletedIds.indexOf,
			core_toString = class2type.toString,
			core_hasOwn = class2type.hasOwnProperty,
			core_trim = core_version.trim,

			// Define a local copy of jQuery
			jQuery = function(selector, context) {
				// The jQuery object is actually just the init constructor 'enhanced'
				return new jQuery.fn.init(selector, context, rootjQuery);
			},

			// Used for matching numbers
			core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

			// Used for splitting on whitespace
			core_rnotwhite = /\S+/g,

			// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
			rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

			// A simple way to check for HTML strings
			// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
			// Strict HTML recognition (#11290: must start with <)
			rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

			// Match a standalone tag
			rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

			// JSON RegExp
			rvalidchars = /^[\],:{}\s]*$/,
			rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
			rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

			// Matches dashed string for camelizing
			rmsPrefix = /^-ms-/,
			rdashAlpha = /-([\da-z])/gi,

			// Used by jQuery.camelCase as callback to replace()
			fcamelCase = function(all, letter) {
				return letter.toUpperCase();
			},

			// The ready event handler
			completed = function(event) {

				// readyState === "complete" is good enough for us to call the dom ready in oldIE
				if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
					detach();
					jQuery.ready();
				}
			},
			// Clean-up method for dom ready events
			detach = function() {
				if (document.addEventListener) {
					document.removeEventListener("DOMContentLoaded", completed, false);
					window.removeEventListener("load", completed, false);

				} else {
					document.detachEvent("onreadystatechange", completed);
					window.detachEvent("onload", completed);
				}
			};

		jQuery.fn = jQuery.prototype = {
			// The current version of jQuery being used
			jquery: core_version,

			constructor: jQuery,
			init: function(selector, context, rootjQuery) {
				var match, elem;

				// HANDLE: $(""), $(null), $(undefined), $(false)
				if (!selector) {
					return this;
				}

				// Handle HTML strings
				if (typeof selector === "string") {
					if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
						// Assume that strings that start and end with <> are HTML and skip the regex check
						match = [null, selector, null];

					} else {
						match = rquickExpr.exec(selector);
					}

					// Match html or make sure no context is specified for #id
					if (match && (match[1] || !context)) {

						// HANDLE: $(html) -> $(array)
						if (match[1]) {
							context = context instanceof jQuery ? context[0] : context;

							// scripts is true for back-compat
							jQuery.merge(this, jQuery.parseHTML(
								match[1],
								context && context.nodeType ? context.ownerDocument || context : document,
								true
							));

							// HANDLE: $(html, props)
							if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
								for (match in context) {
									// Properties of context are called as methods if possible
									if (jQuery.isFunction(this[match])) {
										this[match](context[match]);

										// ...and otherwise set as attributes
									} else {
										this.attr(match, context[match]);
									}
								}
							}

							return this;

							// HANDLE: $(#id)
						} else {
							elem = document.getElementById(match[2]);

							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							if (elem && elem.parentNode) {
								// Handle the case where IE and Opera return items
								// by name instead of ID
								if (elem.id !== match[2]) {
									return rootjQuery.find(selector);
								}

								// Otherwise, we inject the element directly into the jQuery object
								this.length = 1;
								this[0] = elem;
							}

							this.context = document;
							this.selector = selector;
							return this;
						}

						// HANDLE: $(expr, $(...))
					} else if (!context || context.jquery) {
						return (context || rootjQuery).find(selector);

						// HANDLE: $(expr, context)
						// (which is just equivalent to: $(context).find(expr)
					} else {
						return this.constructor(context).find(selector);
					}

					// HANDLE: $(DOMElement)
				} else if (selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this;

					// HANDLE: $(function)
					// Shortcut for document ready
				} else if (jQuery.isFunction(selector)) {
					return rootjQuery.ready(selector);
				}

				if (selector.selector !== undefined) {
					this.selector = selector.selector;
					this.context = selector.context;
				}

				return jQuery.makeArray(selector, this);
			},

			// Start with an empty selector
			selector: "",

			// The default length of a jQuery object is 0
			length: 0,

			// The number of elements contained in the matched element set
			size: function() {
				return this.length;
			},

			toArray: function() {
				return core_slice.call(this);
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function(num) {
				return num == null ?

					// Return a 'clean' array
					this.toArray() :

					// Return just the object
					(num < 0 ? this[this.length + num] : this[num]);
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
			pushStack: function(elems) {

				// Build a new jQuery matched element set
				var ret = jQuery.merge(this.constructor(), elems);

				// Add the old object onto the stack (as a reference)
				ret.prevObject = this;
				ret.context = this.context;

				// Return the newly-formed element set
				return ret;
			},

			// Execute a callback for every element in the matched set.
			// (You can seed the arguments with an array of args, but this is
			// only used internally.)
			each: function(callback, args) {
				return jQuery.each(this, callback, args);
			},

			ready: function(fn) {
				// Add the callback
				jQuery.ready.promise().done(fn);

				return this;
			},

			slice: function() {
				return this.pushStack(core_slice.apply(this, arguments));
			},

			first: function() {
				return this.eq(0);
			},

			last: function() {
				return this.eq(-1);
			},

			eq: function(i) {
				var len = this.length,
					j = +i + (i < 0 ? len : 0);
				return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
			},

			map: function(callback) {
				return this.pushStack(jQuery.map(this, function(elem, i) {
					return callback.call(elem, i, elem);
				}));
			},

			end: function() {
				return this.prevObject || this.constructor(null);
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: core_push,
			sort: [].sort,
			splice: [].splice
		};

		// Give the init function the jQuery prototype for later instantiation
		jQuery.fn.init.prototype = jQuery.fn;

		jQuery.extend = jQuery.fn.extend = function() {
			var src, copyIsArray, copy, name, options, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// extend jQuery itself if only one argument is passed
			if (length === i) {
				target = this;
				--i;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];

							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = jQuery.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.extend({
			noConflict: function(deep) {
				if (window.$ === jQuery) {
					window.$ = _$;
				}

				if (deep && window.jQuery === jQuery) {
					window.jQuery = _jQuery;
				}

				return jQuery;
			},

			// Is the DOM ready to be used? Set to true once it occurs.
			isReady: false,

			// A counter to track how many items to wait for before
			// the ready event fires. See #6781
			readyWait: 1,

			// Hold (or release) the ready event
			holdReady: function(hold) {
				if (hold) {
					jQuery.readyWait++;
				} else {
					jQuery.ready(true);
				}
			},

			// Handle when the DOM is ready
			ready: function(wait) {

				// Abort if there are pending holds or we're already ready
				if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
					return;
				}

				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if (!document.body) {
					return setTimeout(jQuery.ready);
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If a normal DOM Ready event fired, decrement, and wait if need be
				if (wait !== true && --jQuery.readyWait > 0) {
					return;
				}

				// If there are functions bound, to execute
				readyList.resolveWith(document, [jQuery]);

				// Trigger any bound ready events
				if (jQuery.fn.trigger) {
					jQuery(document).trigger("ready").off("ready");
				}
			},

			// See test/unit/core.js for details concerning isFunction.
			// Since version 1.3, DOM methods and functions like alert
			// aren't supported. They return false on IE (#2968).
			isFunction: function(obj) {
				return jQuery.type(obj) === "function";
			},

			isArray: Array.isArray || function(obj) {
				return jQuery.type(obj) === "array";
			},

			isWindow: function(obj) {
				return obj != null && obj == obj.window;
			},

			isNumeric: function(obj) {
				return !isNaN(parseFloat(obj)) && isFinite(obj);
			},

			type: function(obj) {
				if (obj == null) {
					return String(obj);
				}
				return typeof obj === "object" || typeof obj === "function" ?
					class2type[core_toString.call(obj)] || "object" :
					typeof obj;
			},

			isPlainObject: function(obj) {
				// Must be an Object.
				// Because of IE, we also have to check the presence of the constructor property.
				// Make sure that DOM nodes and window objects don't pass through, as well
				if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
					return false;
				}

				try {
					// Not own constructor property must be Object
					if (obj.constructor &&
						!core_hasOwn.call(obj, "constructor") &&
						!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
						return false;
					}
				} catch (e) {
					// IE8,9 Will throw exceptions on certain host objects #9897
					return false;
				}

				// Own properties are enumerated firstly, so to speed up,
				// if last one is own, then all properties are own.

				var key;
				for (key in obj) {}

				return key === undefined || core_hasOwn.call(obj, key);
			},

			isEmptyObject: function(obj) {
				var name;
				for (name in obj) {
					return false;
				}
				return true;
			},

			error: function(msg) {
				throw new Error(msg);
			},

			// data: string of html
			// context (optional): If specified, the fragment will be created in this context, defaults to document
			// keepScripts (optional): If true, will include scripts passed in the html string
			parseHTML: function(data, context, keepScripts) {
				if (!data || typeof data !== "string") {
					return null;
				}
				if (typeof context === "boolean") {
					keepScripts = context;
					context = false;
				}
				context = context || document;

				var parsed = rsingleTag.exec(data),
					scripts = !keepScripts && [];

				// Single tag
				if (parsed) {
					return [context.createElement(parsed[1])];
				}

				parsed = jQuery.buildFragment([data], context, scripts);
				if (scripts) {
					jQuery(scripts).remove();
				}
				return jQuery.merge([], parsed.childNodes);
			},

			parseJSON: function(data) {
				// Attempt to parse using the native JSON parser first
				if (window.JSON && window.JSON.parse) {
					return window.JSON.parse(data);
				}

				if (data === null) {
					return data;
				}

				if (typeof data === "string") {

					// Make sure leading/trailing whitespace is removed (IE can't handle it)
					data = jQuery.trim(data);

					if (data) {
						// Make sure the incoming data is actual JSON
						// Logic borrowed from //json.org/json2.js
						if (rvalidchars.test(data.replace(rvalidescape, "@")
								.replace(rvalidtokens, "]")
								.replace(rvalidbraces, ""))) {

							return (new Function("return " + data))();
						}
					}
				}

				jQuery.error("Invalid JSON: " + data);
			},

			// Cross-browser xml parsing
			parseXML: function(data) {
				var xml, tmp;
				if (!data || typeof data !== "string") {
					return null;
				}
				try {
					if (window.DOMParser) { // Standard
						tmp = new DOMParser();
						xml = tmp.parseFromString(data, "text/xml");
					} else { // IE
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = "false";
						xml.loadXML(data);
					}
				} catch (e) {
					xml = undefined;
				}
				if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
					jQuery.error("Invalid XML: " + data);
				}
				return xml;
			},

			noop: function() {},

			// Evaluates a script in a global context
			// Workarounds based on findings by Jim Driscoll
			// //weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
			globalEval: function(data) {
				if (data && jQuery.trim(data)) {
					// We use execScript on Internet Explorer
					// We use an anonymous function so that context is window
					// rather than jQuery in Firefox
					(window.execScript || function(data) {
						window["eval"].call(window, data);
					})(data);
				}
			},

			// Convert dashed to camelCase; used by the css and data modules
			// Microsoft forgot to hump their vendor prefix (#9572)
			camelCase: function(string) {
				return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
			},

			nodeName: function(elem, name) {
				return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
			},

			// args is for internal usage only
			each: function(obj, callback, args) {
				var value,
					i = 0,
					length = obj.length,
					isArray = isArraylike(obj);

				if (args) {
					if (isArray) {
						for (; i < length; i++) {
							value = callback.apply(obj[i], args);

							if (value === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							value = callback.apply(obj[i], args);

							if (value === false) {
								break;
							}
						}
					}

					// A special, fast, case for the most common use of each
				} else {
					if (isArray) {
						for (; i < length; i++) {
							value = callback.call(obj[i], i, obj[i]);

							if (value === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							value = callback.call(obj[i], i, obj[i]);

							if (value === false) {
								break;
							}
						}
					}
				}

				return obj;
			},

			// Use native String.trim function wherever possible
			trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
				function(text) {
					return text == null ?
						"" :
						core_trim.call(text);
				} :

				// Otherwise use our own trimming functionality
				function(text) {
					return text == null ?
						"" :
						(text + "").replace(rtrim, "");
				},

			// results is for internal usage only
			makeArray: function(arr, results) {
				var ret = results || [];

				if (arr != null) {
					if (isArraylike(Object(arr))) {
						jQuery.merge(ret,
							typeof arr === "string" ?
							[arr] : arr
						);
					} else {
						core_push.call(ret, arr);
					}
				}

				return ret;
			},

			inArray: function(elem, arr, i) {
				var len;

				if (arr) {
					if (core_indexOf) {
						return core_indexOf.call(arr, elem, i);
					}

					len = arr.length;
					i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

					for (; i < len; i++) {
						// Skip accessing in sparse arrays
						if (i in arr && arr[i] === elem) {
							return i;
						}
					}
				}

				return -1;
			},

			merge: function(first, second) {
				var l = second.length,
					i = first.length,
					j = 0;

				if (typeof l === "number") {
					for (; j < l; j++) {
						first[i++] = second[j];
					}
				} else {
					while (second[j] !== undefined) {
						first[i++] = second[j++];
					}
				}

				first.length = i;

				return first;
			},

			grep: function(elems, callback, inv) {
				var retVal,
					ret = [],
					i = 0,
					length = elems.length;
				inv = !!inv;

				// Go through the array, only saving the items
				// that pass the validator function
				for (; i < length; i++) {
					retVal = !!callback(elems[i], i);
					if (inv !== retVal) {
						ret.push(elems[i]);
					}
				}

				return ret;
			},

			// arg is for internal usage only
			map: function(elems, callback, arg) {
				var value,
					i = 0,
					length = elems.length,
					isArray = isArraylike(elems),
					ret = [];

				// Go through the array, translating each of the items to their
				if (isArray) {
					for (; i < length; i++) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret[ret.length] = value;
						}
					}

					// Go through every key on the object,
				} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret[ret.length] = value;
						}
					}
				}

				// Flatten any nested arrays
				return core_concat.apply([], ret);
			},

			// A global GUID counter for objects
			guid: 1,

			// Bind a function to a context, optionally partially applying any
			// arguments.
			proxy: function(fn, context) {
				var args, proxy, tmp;

				if (typeof context === "string") {
					tmp = fn[context];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if (!jQuery.isFunction(fn)) {
					return undefined;
				}

				// Simulated bind
				args = core_slice.call(arguments, 2);
				proxy = function() {
					return fn.apply(context || this, args.concat(core_slice.call(arguments)));
				};

				// Set the guid of unique handler to the same of original handler, so it can be removed
				proxy.guid = fn.guid = fn.guid || jQuery.guid++;

				return proxy;
			},

			// Multifunctional method to get and set values of a collection
			// The value/s can optionally be executed if it's a function
			access: function(elems, fn, key, value, chainable, emptyGet, raw) {
				var i = 0,
					length = elems.length,
					bulk = key == null;

				// Sets many values
				if (jQuery.type(key) === "object") {
					chainable = true;
					for (i in key) {
						jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
					}

					// Sets one value
				} else if (value !== undefined) {
					chainable = true;

					if (!jQuery.isFunction(value)) {
						raw = true;
					}

					if (bulk) {
						// Bulk operations run against the entire set
						if (raw) {
							fn.call(elems, value);
							fn = null;

							// ...except when executing function values
						} else {
							bulk = fn;
							fn = function(elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
					}

					if (fn) {
						for (; i < length; i++) {
							fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
						}
					}
				}

				return chainable ?
					elems :

					// Gets
					bulk ?
					fn.call(elems) :
					length ? fn(elems[0], key) : emptyGet;
			},

			now: function() {
				return (new Date()).getTime();
			}
		});

		jQuery.ready.promise = function(obj) {
			if (!readyList) {

				readyList = jQuery.Deferred();

				// Catch cases where $(document).ready() is called after the browser event has already occurred.
				// we once tried to use readyState "interactive" here, but it caused issues like the one
				// discovered by ChrisS here: //bugs.jquery.com/ticket/12282#comment:15
				if (document.readyState === "complete") {
					// Handle it asynchronously to allow scripts the opportunity to delay ready
					setTimeout(jQuery.ready);

					// Standards-based browsers support DOMContentLoaded
				} else if (document.addEventListener) {
					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", completed, false);

					// A fallback to window.onload, that will always work
					window.addEventListener("load", completed, false);

					// If IE event model is used
				} else {
					// Ensure firing before onload, maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", completed);

					// A fallback to window.onload, that will always work
					window.attachEvent("onload", completed);

					// If IE and not a frame
					// continually check to see if the document is ready
					var top = false;

					try {
						top = window.frameElement == null && document.documentElement;
					} catch (e) {}

					if (top && top.doScroll) {
						(function doScrollCheck() {
							if (!jQuery.isReady) {

								try {
									// Use the trick by Diego Perini
									// //javascript.nwbox.com/IEContentLoaded/
									top.doScroll("left");
								} catch (e) {
									return setTimeout(doScrollCheck, 50);
								}

								// detach all dom ready events
								detach();

								// and execute any waiting functions
								jQuery.ready();
							}
						})();
					}
				}
			}
			return readyList.promise(obj);
		};

		// Populate the class2type map
		jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

		function isArraylike(obj) {
			var length = obj.length,
				type = jQuery.type(obj);

			if (jQuery.isWindow(obj)) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}

			return type === "array" || type !== "function" &&
				(length === 0 ||
					typeof length === "number" && length > 0 && (length - 1) in obj);
		}

		// All jQuery objects should point back to these
		rootjQuery = jQuery(document);
		// String to Object options format cache
		var optionsCache = {};

		// Convert String-formatted options into Object-formatted ones and store in cache
		function createOptions(options) {
			var object = optionsCache[options] = {};
			jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
				object[flag] = true;
			});
			return object;
		}

		/*
		 * Create a callback list using the following parameters:
		 *
		 *	options: an optional list of space-separated options that will change how
		 *			the callback list behaves or a more traditional option object
		 *
		 * By default a callback list will act like an event callback list and can be
		 * "fired" multiple times.
		 *
		 * Possible options:
		 *
		 *	once:			will ensure the callback list can only be fired once (like a Deferred)
		 *
		 *	memory:			will keep track of previous values and will call any callback added
		 *					after the list has been fired right away with the latest "memorized"
		 *					values (like a Deferred)
		 *
		 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
		 *
		 *	stopOnFalse:	interrupt callings when a callback returns false
		 *
		 */
		jQuery.Callbacks = function(options) {

			// Convert options from String-formatted to Object-formatted if needed
			// (we check in cache first)
			options = typeof options === "string" ?
				(optionsCache[options] || createOptions(options)) :
				jQuery.extend({}, options);

			var // Flag to know if list is currently firing
				firing,
				// Last fire value (for non-forgettable lists)
				memory,
				// Flag to know if list was already fired
				fired,
				// End of the loop when firing
				firingLength,
				// Index of currently firing callback (modified by remove if needed)
				firingIndex,
				// First callback to fire (used internally by add and fireWith)
				firingStart,
				// Actual callback list
				list = [],
				// Stack of fire calls for repeatable lists
				stack = !options.once && [],
				// Fire callbacks
				fire = function(data) {
					memory = options.memory && data;
					fired = true;
					firingIndex = firingStart || 0;
					firingStart = 0;
					firingLength = list.length;
					firing = true;
					for (; list && firingIndex < firingLength; firingIndex++) {
						if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
							memory = false; // To prevent further calls using add
							break;
						}
					}
					firing = false;
					if (list) {
						if (stack) {
							if (stack.length) {
								fire(stack.shift());
							}
						} else if (memory) {
							list = [];
						} else {
							self.disable();
						}
					}
				},
				// Actual Callbacks object
				self = {
					// Add a callback or a collection of callbacks to the list
					add: function() {
						if (list) {
							// First, we save the current length
							var start = list.length;
							(function add(args) {
								jQuery.each(args, function(_, arg) {
									var type = jQuery.type(arg);
									if (type === "function") {
										if (!options.unique || !self.has(arg)) {
											list.push(arg);
										}
									} else if (arg && arg.length && type !== "string") {
										// Inspect recursively
										add(arg);
									}
								});
							})(arguments);
							// Do we need to add the callbacks to the
							// current firing batch?
							if (firing) {
								firingLength = list.length;
								// With memory, if we're not firing then
								// we should call right away
							} else if (memory) {
								firingStart = start;
								fire(memory);
							}
						}
						return this;
					},
					// Remove a callback from the list
					remove: function() {
						if (list) {
							jQuery.each(arguments, function(_, arg) {
								var index;
								while ((index = jQuery.inArray(arg, list, index)) > -1) {
									list.splice(index, 1);
									// Handle firing indexes
									if (firing) {
										if (index <= firingLength) {
											firingLength--;
										}
										if (index <= firingIndex) {
											firingIndex--;
										}
									}
								}
							});
						}
						return this;
					},
					// Check if a given callback is in the list.
					// If no argument is given, return whether or not list has callbacks attached.
					has: function(fn) {
						return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
					},
					// Remove all callbacks from the list
					empty: function() {
						list = [];
						return this;
					},
					// Have the list do nothing anymore
					disable: function() {
						list = stack = memory = undefined;
						return this;
					},
					// Is it disabled?
					disabled: function() {
						return !list;
					},
					// Lock the list in its current state
					lock: function() {
						stack = undefined;
						if (!memory) {
							self.disable();
						}
						return this;
					},
					// Is it locked?
					locked: function() {
						return !stack;
					},
					// Call all callbacks with the given context and arguments
					fireWith: function(context, args) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (list && (!fired || stack)) {
							if (firing) {
								stack.push(args);
							} else {
								fire(args);
							}
						}
						return this;
					},
					// Call all the callbacks with the given arguments
					fire: function() {
						self.fireWith(this, arguments);
						return this;
					},
					// To know if the callbacks have already been called at least once
					fired: function() {
						return !!fired;
					}
				};

			return self;
		};
		jQuery.extend({

			Deferred: function(func) {
				var tuples = [
						// action, add listener, listener list, final state
						["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
						["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
						["notify", "progress", jQuery.Callbacks("memory")]
					],
					state = "pending",
					promise = {
						state: function() {
							return state;
						},
						always: function() {
							deferred.done(arguments).fail(arguments);
							return this;
						},
						then: function( /* fnDone, fnFail, fnProgress */ ) {
							var fns = arguments;
							return jQuery.Deferred(function(newDefer) {
								jQuery.each(tuples, function(i, tuple) {
									var action = tuple[0],
										fn = jQuery.isFunction(fns[i]) && fns[i];
									// deferred[ done | fail | progress ] for forwarding actions to newDefer
									deferred[tuple[1]](function() {
										var returned = fn && fn.apply(this, arguments);
										if (returned && jQuery.isFunction(returned.promise)) {
											returned.promise()
												.done(newDefer.resolve)
												.fail(newDefer.reject)
												.progress(newDefer.notify);
										} else {
											newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
										}
									});
								});
								fns = null;
							}).promise();
						},
						// Get a promise for this deferred
						// If obj is provided, the promise aspect is added to the object
						promise: function(obj) {
							return obj != null ? jQuery.extend(obj, promise) : promise;
						}
					},
					deferred = {};

				// Keep pipe for back-compat
				promise.pipe = promise.then;

				// Add list-specific methods
				jQuery.each(tuples, function(i, tuple) {
					var list = tuple[2],
						stateString = tuple[3];

					// promise[ done | fail | progress ] = list.add
					promise[tuple[1]] = list.add;

					// Handle state
					if (stateString) {
						list.add(function() {
							// state = [ resolved | rejected ]
							state = stateString;

							// [ reject_list | resolve_list ].disable; progress_list.lock
						}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
					}

					// deferred[ resolve | reject | notify ]
					deferred[tuple[0]] = function() {
						deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
						return this;
					};
					deferred[tuple[0] + "With"] = list.fireWith;
				});

				// Make the deferred a promise
				promise.promise(deferred);

				// Call given func if any
				if (func) {
					func.call(deferred, deferred);
				}

				// All done!
				return deferred;
			},

			// Deferred helper
			when: function(subordinate /* , ..., subordinateN */ ) {
				var i = 0,
					resolveValues = core_slice.call(arguments),
					length = resolveValues.length,

					// the count of uncompleted subordinates
					remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

					// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
					deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

					// Update function for both resolve and progress values
					updateFunc = function(i, contexts, values) {
						return function(value) {
							contexts[i] = this;
							values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
							if (values === progressValues) {
								deferred.notifyWith(contexts, values);
							} else if (!(--remaining)) {
								deferred.resolveWith(contexts, values);
							}
						};
					},

					progressValues, progressContexts, resolveContexts;

				// add listeners to Deferred subordinates; treat others as resolved
				if (length > 1) {
					progressValues = new Array(length);
					progressContexts = new Array(length);
					resolveContexts = new Array(length);
					for (; i < length; i++) {
						if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
							resolveValues[i].promise()
								.done(updateFunc(i, resolveContexts, resolveValues))
								.fail(deferred.reject)
								.progress(updateFunc(i, progressContexts, progressValues));
						} else {
							--remaining;
						}
					}
				}

				// if we're not waiting on anything, resolve the master
				if (!remaining) {
					deferred.resolveWith(resolveContexts, resolveValues);
				}

				return deferred.promise();
			}
		});
		jQuery.support = (function() {

			var support, all, a,
				input, select, fragment,
				opt, eventName, isSupported, i,
				div = document.createElement("div");

			// Setup
			div.setAttribute("className", "t");
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			// Support tests won't run in some limited or non-browser environments
			all = div.getElementsByTagName("*");
			a = div.getElementsByTagName("a")[0];
			if (!all || !a || !all.length) {
				return {};
			}

			// First batch of tests
			select = document.createElement("select");
			opt = select.appendChild(document.createElement("option"));
			input = div.getElementsByTagName("input")[0];

			a.style.cssText = "top:1px;float:left;opacity:.5";
			support = {
				// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
				getSetAttribute: div.className !== "t",

				// IE strips leading whitespace when .innerHTML is used
				leadingWhitespace: div.firstChild.nodeType === 3,

				// Make sure that tbody elements aren't automatically inserted
				// IE will insert them into empty tables
				tbody: !div.getElementsByTagName("tbody").length,

				// Make sure that link elements get serialized correctly by innerHTML
				// This requires a wrapper element in IE
				htmlSerialize: !!div.getElementsByTagName("link").length,

				// Get the style information from getAttribute
				// (IE uses .cssText instead)
				style: /top/.test(a.getAttribute("style")),

				// Make sure that URLs aren't manipulated
				// (IE normalizes it by default)
				hrefNormalized: a.getAttribute("href") === "/a",

				// Make sure that element opacity exists
				// (IE uses filter instead)
				// Use a regex to work around a WebKit issue. See #5145
				opacity: /^0.5/.test(a.style.opacity),

				// Verify style float existence
				// (IE uses styleFloat instead of cssFloat)
				cssFloat: !!a.style.cssFloat,

				// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
				checkOn: !!input.value,

				// Make sure that a selected-by-default option has a working selected property.
				// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
				optSelected: opt.selected,

				// Tests for enctype support on a form (#6743)
				enctype: !!document.createElement("form").enctype,

				// Makes sure cloning an html5 element does not cause problems
				// Where outerHTML is undefined, this still works
				html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",

				// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
				boxModel: document.compatMode === "CSS1Compat",

				// Will be defined later
				deleteExpando: true,
				noCloneEvent: true,
				inlineBlockNeedsLayout: false,
				shrinkWrapBlocks: false,
				reliableMarginRight: true,
				boxSizingReliable: true,
				pixelPosition: false
			};

			// Make sure checked status is properly cloned
			input.checked = true;
			support.noCloneChecked = input.cloneNode(true).checked;

			// Make sure that the options inside disabled selects aren't marked as disabled
			// (WebKit marks them as disabled)
			select.disabled = true;
			support.optDisabled = !opt.disabled;

			// Support: IE<9
			try {
				delete div.test;
			} catch (e) {
				support.deleteExpando = false;
			}

			// Check if we can trust getAttribute("value")
			input = document.createElement("input");
			input.setAttribute("value", "");
			support.input = input.getAttribute("value") === "";

			// Check if an input maintains its value after becoming a radio
			input.value = "t";
			input.setAttribute("type", "radio");
			support.radioValue = input.value === "t";

			// #11217 - WebKit loses check when the name is after the checked attribute
			input.setAttribute("checked", "t");
			input.setAttribute("name", "t");

			fragment = document.createDocumentFragment();
			fragment.appendChild(input);

			// Check if a disconnected checkbox will retain its checked
			// value of true after appended to the DOM (IE6/7)
			support.appendChecked = input.checked;

			// WebKit doesn't clone checked state correctly in fragments
			support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

			// Support: IE<9
			// Opera does not clone events (and typeof div.attachEvent === undefined).
			// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
			if (div.attachEvent) {
				div.attachEvent("onclick", function() {
					support.noCloneEvent = false;
				});

				div.cloneNode(true).click();
			}

			// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
			// Beware of CSP restrictions (//developer.mozilla.org/en/Security/CSP), test/csp.php
			for (i in {
					submit: true,
					change: true,
					focusin: true
				}) {
				div.setAttribute(eventName = "on" + i, "t");

				support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
			}

			div.style.backgroundClip = "content-box";
			div.cloneNode(true).style.backgroundClip = "";
			support.clearCloneStyle = div.style.backgroundClip === "content-box";

			// Run tests that need a body at doc ready
			jQuery(function() {
				var container, marginDiv, tds,
					divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
					body = document.getElementsByTagName("body")[0];

				if (!body) {
					// Return for frameset docs that don't have a body
					return;
				}

				container = document.createElement("div");
				container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

				body.appendChild(container).appendChild(div);

				// Support: IE8
				// Check if table cells still have offsetWidth/Height when they are set
				// to display:none and there are still other visible table cells in a
				// table row; if so, offsetWidth/Height are not reliable for use when
				// determining if an element has been hidden directly using
				// display:none (it is still safe to use offsets if a parent element is
				// hidden; don safety goggles and see bug #4512 for more information).
				div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
				tds = div.getElementsByTagName("td");
				tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
				isSupported = (tds[0].offsetHeight === 0);

				tds[0].style.display = "";
				tds[1].style.display = "none";

				// Support: IE8
				// Check if empty table cells still have offsetWidth/Height
				support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);

				// Check box-sizing and margin behavior
				div.innerHTML = "";
				div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
				support.boxSizing = (div.offsetWidth === 4);
				support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);

				// Use window.getComputedStyle because jsdom on node.js will break without it.
				if (window.getComputedStyle) {
					support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
					support.boxSizingReliable = (window.getComputedStyle(div, null) || {
						width: "4px"
					}).width === "4px";

					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// Fails in WebKit before Feb 2011 nightlies
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					marginDiv = div.appendChild(document.createElement("div"));
					marginDiv.style.cssText = div.style.cssText = divReset;
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";

					support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
				}

				if (typeof div.style.zoom !== core_strundefined) {
					// Support: IE<8
					// Check if natively block-level elements act like inline-block
					// elements when setting their display to 'inline' and giving
					// them layout
					div.innerHTML = "";
					div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
					support.inlineBlockNeedsLayout = (div.offsetWidth === 3);

					// Support: IE6
					// Check if elements with layout shrink-wrap their children
					div.style.display = "block";
					div.innerHTML = "<div></div>";
					div.firstChild.style.width = "5px";
					support.shrinkWrapBlocks = (div.offsetWidth !== 3);

					if (support.inlineBlockNeedsLayout) {
						// Prevent IE 6 from affecting layout for positioned elements #11048
						// Prevent IE from shrinking the body in IE 7 mode #12869
						// Support: IE<8
						body.style.zoom = 1;
					}
				}

				body.removeChild(container);

				// Null elements to avoid leaks in IE
				container = div = tds = marginDiv = null;
			});

			// Null elements to avoid leaks in IE
			all = select = fragment = opt = a = input = null;

			return support;
		})();

		var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
			rmultiDash = /([A-Z])/g;

		function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
			if (!jQuery.acceptData(elem)) {
				return;
			}

			var thisCache, ret,
				internalKey = jQuery.expando,
				getByName = typeof name === "string",

				// We have to handle DOM nodes and JS objects differently because IE6-7
				// can't GC object references properly across the DOM-JS boundary
				isNode = elem.nodeType,

				// Only DOM nodes need the global jQuery cache; JS object data is
				// attached directly to the object so GC can occur automatically
				cache = isNode ? jQuery.cache : elem,

				// Only defining an ID for JS objects if its cache already exists allows
				// the code to shortcut on the same path as a DOM node with no cache
				id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

			// Avoid doing any more work than we need to when trying to get data on an
			// object that has no data at all
			if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
				return;
			}

			if (!id) {
				// Only DOM nodes need a new unique ID for each element since their data
				// ends up in the global cache
				if (isNode) {
					elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++;
				} else {
					id = internalKey;
				}
			}

			if (!cache[id]) {
				cache[id] = {};

				// Avoids exposing jQuery metadata on plain JS objects when the object
				// is serialized using JSON.stringify
				if (!isNode) {
					cache[id].toJSON = jQuery.noop;
				}
			}

			// An object can be passed to jQuery.data instead of a key/value pair; this gets
			// shallow copied over onto the existing cache
			if (typeof name === "object" || typeof name === "function") {
				if (pvt) {
					cache[id] = jQuery.extend(cache[id], name);
				} else {
					cache[id].data = jQuery.extend(cache[id].data, name);
				}
			}

			thisCache = cache[id];

			// jQuery data() is stored in a separate object inside the object's internal data
			// cache in order to avoid key collisions between internal data and user-defined
			// data.
			if (!pvt) {
				if (!thisCache.data) {
					thisCache.data = {};
				}

				thisCache = thisCache.data;
			}

			if (data !== undefined) {
				thisCache[jQuery.camelCase(name)] = data;
			}

			// Check for both converted-to-camel and non-converted data property names
			// If a data property was specified
			if (getByName) {

				// First Try to find as-is property data
				ret = thisCache[name];

				// Test for null|undefined property data
				if (ret == null) {

					// Try to find the camelCased property
					ret = thisCache[jQuery.camelCase(name)];
				}
			} else {
				ret = thisCache;
			}

			return ret;
		}

		function internalRemoveData(elem, name, pvt) {
			if (!jQuery.acceptData(elem)) {
				return;
			}

			var i, l, thisCache,
				isNode = elem.nodeType,

				// See jQuery.data for more information
				cache = isNode ? jQuery.cache : elem,
				id = isNode ? elem[jQuery.expando] : jQuery.expando;

			// If there is already no cache entry for this object, there is no
			// purpose in continuing
			if (!cache[id]) {
				return;
			}

			if (name) {

				thisCache = pvt ? cache[id] : cache[id].data;

				if (thisCache) {

					// Support array or space separated string names for data keys
					if (!jQuery.isArray(name)) {

						// try the string as a key before any manipulation
						if (name in thisCache) {
							name = [name];
						} else {

							// split the camel cased version by spaces unless a key with the spaces exists
							name = jQuery.camelCase(name);
							if (name in thisCache) {
								name = [name];
							} else {
								name = name.split(" ");
							}
						}
					} else {
						// If "name" is an array of keys...
						// When data is initially created, via ("key", "val") signature,
						// keys will be converted to camelCase.
						// Since there is no way to tell _how_ a key was added, remove
						// both plain key and camelCase key. #12786
						// This will only penalize the array argument path.
						name = name.concat(jQuery.map(name, jQuery.camelCase));
					}

					for (i = 0, l = name.length; i < l; i++) {
						delete thisCache[name[i]];
					}

					// If there is no data left in the cache, we want to continue
					// and let the cache object itself get destroyed
					if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
						return;
					}
				}
			}

			// See jQuery.data for more information
			if (!pvt) {
				delete cache[id].data;

				// Don't destroy the parent cache unless the internal data object
				// had been the only thing left in it
				if (!isEmptyDataObject(cache[id])) {
					return;
				}
			}

			// Destroy the cache
			if (isNode) {
				jQuery.cleanData([elem], true);

				// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
			} else if (jQuery.support.deleteExpando || cache != cache.window) {
				delete cache[id];

				// When all else fails, null
			} else {
				cache[id] = null;
			}
		}

		jQuery.extend({
			cache: {},

			// Unique for each copy of jQuery on the page
			// Non-digits removed to match rinlinejQuery
			expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),

			// The following elements throw uncatchable exceptions if you
			// attempt to add expando properties to them.
			noData: {
				"embed": true,
				// Ban all objects except for Flash (which handle expandos)
				"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
				"applet": true
			},

			hasData: function(elem) {
				elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
				return !!elem && !isEmptyDataObject(elem);
			},

			data: function(elem, name, data) {
				return internalData(elem, name, data);
			},

			removeData: function(elem, name) {
				return internalRemoveData(elem, name);
			},

			// For internal use only.
			_data: function(elem, name, data) {
				return internalData(elem, name, data, true);
			},

			_removeData: function(elem, name) {
				return internalRemoveData(elem, name, true);
			},

			// A method for determining if a DOM node can handle the data expando
			acceptData: function(elem) {
				// Do not set data on non-element because it will not be cleared (#8335).
				if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
					return false;
				}

				var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];

				// nodes accept data unless otherwise specified; rejection can be conditional
				return !noData || noData !== true && elem.getAttribute("classid") === noData;
			}
		});

		jQuery.fn.extend({
			data: function(key, value) {
				var attrs, name,
					elem = this[0],
					i = 0,
					data = null;

				// Gets all values
				if (key === undefined) {
					if (this.length) {
						data = jQuery.data(elem);

						if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
							attrs = elem.attributes;
							for (; i < attrs.length; i++) {
								name = attrs[i].name;

								if (!name.indexOf("data-")) {
									name = jQuery.camelCase(name.slice(5));

									dataAttr(elem, name, data[name]);
								}
							}
							jQuery._data(elem, "parsedAttrs", true);
						}
					}

					return data;
				}

				// Sets multiple values
				if (typeof key === "object") {
					return this.each(function() {
						jQuery.data(this, key);
					});
				}

				return jQuery.access(this, function(value) {

					if (value === undefined) {
						// Try to fetch any internally stored data first
						return elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
					}

					this.each(function() {
						jQuery.data(this, key, value);
					});
				}, null, value, arguments.length > 1, null, true);
			},

			removeData: function(key) {
				return this.each(function() {
					jQuery.removeData(this, key);
				});
			}
		});

		function dataAttr(elem, key, data) {
			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if (data === undefined && elem.nodeType === 1) {

				var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

				data = elem.getAttribute(name);

				if (typeof data === "string") {
					try {
						data = data === "true" ? true :
							data === "false" ? false :
							data === "null" ? null :
							// Only convert to a number if it doesn't change the string
							+data + "" === data ? +data :
							rbrace.test(data) ? jQuery.parseJSON(data) :
							data;
					} catch (e) {}

					// Make sure we set the data so it isn't changed later
					jQuery.data(elem, key, data);

				} else {
					data = undefined;
				}
			}

			return data;
		}

		// checks a cache object for emptiness
		function isEmptyDataObject(obj) {
			var name;
			for (name in obj) {

				// if the public data object is empty, the private is still empty
				if (name === "data" && jQuery.isEmptyObject(obj[name])) {
					continue;
				}
				if (name !== "toJSON") {
					return false;
				}
			}

			return true;
		}
		jQuery.extend({
			queue: function(elem, type, data) {
				var queue;

				if (elem) {
					type = (type || "fx") + "queue";
					queue = jQuery._data(elem, type);

					// Speed up dequeue by getting out quickly if this is just a lookup
					if (data) {
						if (!queue || jQuery.isArray(data)) {
							queue = jQuery._data(elem, type, jQuery.makeArray(data));
						} else {
							queue.push(data);
						}
					}
					return queue || [];
				}
			},

			dequeue: function(elem, type) {
				type = type || "fx";

				var queue = jQuery.queue(elem, type),
					startLength = queue.length,
					fn = queue.shift(),
					hooks = jQuery._queueHooks(elem, type),
					next = function() {
						jQuery.dequeue(elem, type);
					};

				// If the fx queue is dequeued, always remove the progress sentinel
				if (fn === "inprogress") {
					fn = queue.shift();
					startLength--;
				}

				hooks.cur = fn;
				if (fn) {

					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					// clear up the last queue stop function
					delete hooks.stop;
					fn.call(elem, next, hooks);
				}

				if (!startLength && hooks) {
					hooks.empty.fire();
				}
			},

			// not intended for public consumption - generates a queueHooks object, or returns the current one
			_queueHooks: function(elem, type) {
				var key = type + "queueHooks";
				return jQuery._data(elem, key) || jQuery._data(elem, key, {
					empty: jQuery.Callbacks("once memory").add(function() {
						jQuery._removeData(elem, type + "queue");
						jQuery._removeData(elem, key);
					})
				});
			}
		});

		jQuery.fn.extend({
			queue: function(type, data) {
				var setter = 2;

				if (typeof type !== "string") {
					data = type;
					type = "fx";
					setter--;
				}

				if (arguments.length < setter) {
					return jQuery.queue(this[0], type);
				}

				return data === undefined ?
					this :
					this.each(function() {
						var queue = jQuery.queue(this, type, data);

						// ensure a hooks for this queue
						jQuery._queueHooks(this, type);

						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
			},
			dequeue: function(type) {
				return this.each(function() {
					jQuery.dequeue(this, type);
				});
			},
			// Based off of the plugin by Clint Helfers, with permission.
			// //blindsignals.com/index.php/2009/07/jquery-delay/
			delay: function(time, type) {
				time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
				type = type || "fx";

				return this.queue(type, function(next, hooks) {
					var timeout = setTimeout(next, time);
					hooks.stop = function() {
						clearTimeout(timeout);
					};
				});
			},
			clearQueue: function(type) {
				return this.queue(type || "fx", []);
			},
			// Get a promise resolved when queues of a certain type
			// are emptied (fx is the type by default)
			promise: function(type, obj) {
				var tmp,
					count = 1,
					defer = jQuery.Deferred(),
					elements = this,
					i = this.length,
					resolve = function() {
						if (!(--count)) {
							defer.resolveWith(elements, [elements]);
						}
					};

				if (typeof type !== "string") {
					obj = type;
					type = undefined;
				}
				type = type || "fx";

				while (i--) {
					tmp = jQuery._data(elements[i], type + "queueHooks");
					if (tmp && tmp.empty) {
						count++;
						tmp.empty.add(resolve);
					}
				}
				resolve();
				return defer.promise(obj);
			}
		});
		var nodeHook, boolHook,
			rclass = /[\t\r\n]/g,
			rreturn = /\r/g,
			rfocusable = /^(?:input|select|textarea|button|object)$/i,
			rclickable = /^(?:a|area)$/i,
			rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
			ruseDefault = /^(?:checked|selected)$/i,
			getSetAttribute = jQuery.support.getSetAttribute,
			getSetInput = jQuery.support.input;

		jQuery.fn.extend({
			attr: function(name, value) {
				return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
			},

			removeAttr: function(name) {
				return this.each(function() {
					jQuery.removeAttr(this, name);
				});
			},

			prop: function(name, value) {
				return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
			},

			removeProp: function(name) {
				name = jQuery.propFix[name] || name;
				return this.each(function() {
					// try/catch handles cases where IE balks (such as removing a property on window)
					try {
						this[name] = undefined;
						delete this[name];
					} catch (e) {}
				});
			},

			addClass: function(value) {
				var classes, elem, cur, clazz, j,
					i = 0,
					len = this.length,
					proceed = typeof value === "string" && value;

				if (jQuery.isFunction(value)) {
					return this.each(function(j) {
						jQuery(this).addClass(value.call(this, j, this.className));
					});
				}

				if (proceed) {
					// The disjunction here is for better compressibility (see removeClass)
					classes = (value || "").match(core_rnotwhite) || [];

					for (; i < len; i++) {
						elem = this[i];
						cur = elem.nodeType === 1 && (elem.className ?
							(" " + elem.className + " ").replace(rclass, " ") :
							" "
						);

						if (cur) {
							j = 0;
							while ((clazz = classes[j++])) {
								if (cur.indexOf(" " + clazz + " ") < 0) {
									cur += clazz + " ";
								}
							}
							elem.className = jQuery.trim(cur);

						}
					}
				}

				return this;
			},

			removeClass: function(value) {
				var classes, elem, cur, clazz, j,
					i = 0,
					len = this.length,
					proceed = arguments.length === 0 || typeof value === "string" && value;

				if (jQuery.isFunction(value)) {
					return this.each(function(j) {
						jQuery(this).removeClass(value.call(this, j, this.className));
					});
				}
				if (proceed) {
					classes = (value || "").match(core_rnotwhite) || [];

					for (; i < len; i++) {
						elem = this[i];
						// This expression is here for better compressibility (see addClass)
						cur = elem.nodeType === 1 && (elem.className ?
							(" " + elem.className + " ").replace(rclass, " ") :
							""
						);

						if (cur) {
							j = 0;
							while ((clazz = classes[j++])) {
								// Remove *all* instances
								while (cur.indexOf(" " + clazz + " ") >= 0) {
									cur = cur.replace(" " + clazz + " ", " ");
								}
							}
							elem.className = value ? jQuery.trim(cur) : "";
						}
					}
				}

				return this;
			},

			toggleClass: function(value, stateVal) {
				var type = typeof value,
					isBool = typeof stateVal === "boolean";

				if (jQuery.isFunction(value)) {
					return this.each(function(i) {
						jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
					});
				}

				return this.each(function() {
					if (type === "string") {
						// toggle individual class names
						var className,
							i = 0,
							self = jQuery(this),
							state = stateVal,
							classNames = value.match(core_rnotwhite) || [];

						while ((className = classNames[i++])) {
							// check each className given, space separated list
							state = isBool ? state : !self.hasClass(className);
							self[state ? "addClass" : "removeClass"](className);
						}

						// Toggle whole class name
					} else if (type === core_strundefined || type === "boolean") {
						if (this.className) {
							// store className if set
							jQuery._data(this, "__className__", this.className);
						}

						// If the element has a class name or if we're passed "false",
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
					}
				});
			},

			hasClass: function(selector) {
				var className = " " + selector + " ",
					i = 0,
					l = this.length;
				for (; i < l; i++) {
					if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
						return true;
					}
				}

				return false;
			},

			val: function(value) {
				var ret, hooks, isFunction,
					elem = this[0];

				if (!arguments.length) {
					if (elem) {
						hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

						if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
							return ret;
						}

						ret = elem.value;

						return typeof ret === "string" ?
							// handle most common string cases
							ret.replace(rreturn, "") :
							// handle cases where value is null/undef or number
							ret == null ? "" : ret;
					}

					return;
				}

				isFunction = jQuery.isFunction(value);

				return this.each(function(i) {
					var val,
						self = jQuery(this);

					if (this.nodeType !== 1) {
						return;
					}

					if (isFunction) {
						val = value.call(this, i, self.val());
					} else {
						val = value;
					}

					// Treat null/undefined as ""; convert numbers to string
					if (val == null) {
						val = "";
					} else if (typeof val === "number") {
						val += "";
					} else if (jQuery.isArray(val)) {
						val = jQuery.map(val, function(value) {
							return value == null ? "" : value + "";
						});
					}

					hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

					// If set returns undefined, fall back to normal setting
					if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
						this.value = val;
					}
				});
			}
		});

		jQuery.extend({
			valHooks: {
				option: {
					get: function(elem) {
						// attributes.value is undefined in Blackberry 4.7 but
						// uses .value. See #6932
						var val = elem.attributes.value;
						return !val || val.specified ? elem.value : elem.text;
					}
				},
				select: {
					get: function(elem) {
						var value, option,
							options = elem.options,
							index = elem.selectedIndex,
							one = elem.type === "select-one" || index < 0,
							values = one ? null : [],
							max = one ? index + 1 : options.length,
							i = index < 0 ?
							max :
							one ? index : 0;

						// Loop through all the selected options
						for (; i < max; i++) {
							option = options[i];

							// oldIE doesn't update selected after form reset (#2551)
							if ((option.selected || i === index) &&
								// Don't return options that are disabled or in a disabled optgroup
								(jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
								(!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

								// Get the specific value for the option
								value = jQuery(option).val();

								// We don't need an array for one selects
								if (one) {
									return value;
								}

								// Multi-Selects return an array
								values.push(value);
							}
						}

						return values;
					},

					set: function(elem, value) {
						var values = jQuery.makeArray(value);

						jQuery(elem).find("option").each(function() {
							this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
						});

						if (!values.length) {
							elem.selectedIndex = -1;
						}
						return values;
					}
				}
			},

			attr: function(elem, name, value) {
				var hooks, notxml, ret,
					nType = elem.nodeType;

				// don't get/set attributes on text, comment and attribute nodes
				if (!elem || nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				// Fallback to prop when attributes are not supported
				if (typeof elem.getAttribute === core_strundefined) {
					return jQuery.prop(elem, name, value);
				}

				notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

				// All attributes are lowercase
				// Grab necessary hook if one is defined
				if (notxml) {
					name = name.toLowerCase();
					hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
				}

				if (value !== undefined) {

					if (value === null) {
						jQuery.removeAttr(elem, name);

					} else if (hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;

					} else {
						elem.setAttribute(name, value + "");
						return value;
					}

				} else if (hooks && notxml && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;

				} else {

					// In IE9+, Flash objects don't have .getAttribute (#12945)
					// Support: IE9+
					if (typeof elem.getAttribute !== core_strundefined) {
						ret = elem.getAttribute(name);
					}

					// Non-existent attributes return null, we normalize to undefined
					return ret == null ?
						undefined :
						ret;
				}
			},

			removeAttr: function(elem, value) {
				var name, propName,
					i = 0,
					attrNames = value && value.match(core_rnotwhite);

				if (attrNames && elem.nodeType === 1) {
					while ((name = attrNames[i++])) {
						propName = jQuery.propFix[name] || name;

						// Boolean attributes get special treatment (#10870)
						if (rboolean.test(name)) {
							// Set corresponding property to false for boolean attributes
							// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
							if (!getSetAttribute && ruseDefault.test(name)) {
								elem[jQuery.camelCase("default-" + name)] =
									elem[propName] = false;
							} else {
								elem[propName] = false;
							}

							// See #9699 for explanation of this approach (setting first, then removal)
						} else {
							jQuery.attr(elem, name, "");
						}

						elem.removeAttribute(getSetAttribute ? name : propName);
					}
				}
			},

			attrHooks: {
				type: {
					set: function(elem, value) {
						if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
							// Setting the type on a radio button after the value resets the value in IE6-9
							// Reset value to default in case type is set after value during creation
							var val = elem.value;
							elem.setAttribute("type", value);
							if (val) {
								elem.value = val;
							}
							return value;
						}
					}
				}
			},

			propFix: {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},

			prop: function(elem, name, value) {
				var ret, hooks, notxml,
					nType = elem.nodeType;

				// don't get/set properties on text, comment and attribute nodes
				if (!elem || nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

				if (notxml) {
					// Fix name and attach hooks
					name = jQuery.propFix[name] || name;
					hooks = jQuery.propHooks[name];
				}

				if (value !== undefined) {
					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;

					} else {
						return (elem[name] = value);
					}

				} else {
					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;

					} else {
						return elem[name];
					}
				}
			},

			propHooks: {
				tabIndex: {
					get: function(elem) {
						// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
						// //fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
						var attributeNode = elem.getAttributeNode("tabindex");

						return attributeNode && attributeNode.specified ?
							parseInt(attributeNode.value, 10) :
							rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
							0 :
							undefined;
					}
				}
			}
		});

		// Hook for boolean attributes
		boolHook = {
			get: function(elem, name) {
				var
				// Use .prop to determine if this attribute is understood as boolean
					prop = jQuery.prop(elem, name),

					// Fetch it accordingly
					attr = typeof prop === "boolean" && elem.getAttribute(name),
					detail = typeof prop === "boolean" ?

					getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test(name) ?
					elem[jQuery.camelCase("default-" + name)] :
					!!attr :

					// fetch an attribute node for properties not recognized as boolean
					elem.getAttributeNode(name);

				return detail && detail.value !== false ?
					name.toLowerCase() :
					undefined;
			},
			set: function(elem, value, name) {
				if (value === false) {
					// Remove boolean attributes when set to false
					jQuery.removeAttr(elem, name);
				} else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
					// IE<8 needs the *property* name
					elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

					// Use defaultChecked and defaultSelected for oldIE
				} else {
					elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
				}

				return name;
			}
		};

		// fix oldIE value attroperty
		if (!getSetInput || !getSetAttribute) {
			jQuery.attrHooks.value = {
				get: function(elem, name) {
					var ret = elem.getAttributeNode(name);
					return jQuery.nodeName(elem, "input") ?

						// Ignore the value *property* by using defaultValue
						elem.defaultValue :

						ret && ret.specified ? ret.value : undefined;
				},
				set: function(elem, value, name) {
					if (jQuery.nodeName(elem, "input")) {
						// Does not return so that setAttribute is also used
						elem.defaultValue = value;
					} else {
						// Use nodeHook if defined (#1954); otherwise setAttribute is fine
						return nodeHook && nodeHook.set(elem, value, name);
					}
				}
			};
		}

		// IE6/7 do not support getting/setting some attributes with get/setAttribute
		if (!getSetAttribute) {

			// Use this for any attribute in IE6/7
			// This fixes almost every IE6/7 issue
			nodeHook = jQuery.valHooks.button = {
				get: function(elem, name) {
					var ret = elem.getAttributeNode(name);
					return ret && (name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified) ?
						ret.value :
						undefined;
				},
				set: function(elem, value, name) {
					// Set the existing or create a new attribute node
					var ret = elem.getAttributeNode(name);
					if (!ret) {
						elem.setAttributeNode(
							(ret = elem.ownerDocument.createAttribute(name))
						);
					}

					ret.value = value += "";

					// Break association with cloned elements by also using setAttribute (#9646)
					return name === "value" || value === elem.getAttribute(name) ?
						value :
						undefined;
				}
			};

			// Set contenteditable to false on removals(#10429)
			// Setting to empty string throws an error as an invalid value
			jQuery.attrHooks.contenteditable = {
				get: nodeHook.get,
				set: function(elem, value, name) {
					nodeHook.set(elem, value === "" ? false : value, name);
				}
			};

			// Set width and height to auto instead of 0 on empty string( Bug #8150 )
			// This is for removals
			jQuery.each(["width", "height"], function(i, name) {
				jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
					set: function(elem, value) {
						if (value === "") {
							elem.setAttribute(name, "auto");
							return value;
						}
					}
				});
			});
		}


		// Some attributes require a special call on IE
		// //msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!jQuery.support.hrefNormalized) {
			jQuery.each(["href", "src", "width", "height"], function(i, name) {
				jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
					get: function(elem) {
						var ret = elem.getAttribute(name, 2);
						return ret == null ? undefined : ret;
					}
				});
			});

			// href/src property should get the full normalized URL (#10299/#12915)
			jQuery.each(["href", "src"], function(i, name) {
				jQuery.propHooks[name] = {
					get: function(elem) {
						return elem.getAttribute(name, 4);
					}
				};
			});
		}

		if (!jQuery.support.style) {
			jQuery.attrHooks.style = {
				get: function(elem) {
					// Return undefined in the case of empty string
					// Note: IE uppercases css property names, but if we were to .toLowerCase()
					// .cssText, that would destroy case senstitivity in URL's, like in "background"
					return elem.style.cssText || undefined;
				},
				set: function(elem, value) {
					return (elem.style.cssText = value + "");
				}
			};
		}

		// Safari mis-reports the default selected property of an option
		// Accessing the parent's selectedIndex property fixes it
		if (!jQuery.support.optSelected) {
			jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
				get: function(elem) {
					var parent = elem.parentNode;

					if (parent) {
						parent.selectedIndex;

						// Make sure that it also works with optgroups, see #5701
						if (parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
					}
					return null;
				}
			});
		}

		// IE6/7 call enctype encoding
		if (!jQuery.support.enctype) {
			jQuery.propFix.enctype = "encoding";
		}

		// Radios and checkboxes getter/setter
		if (!jQuery.support.checkOn) {
			jQuery.each(["radio", "checkbox"], function() {
				jQuery.valHooks[this] = {
					get: function(elem) {
						// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
						return elem.getAttribute("value") === null ? "on" : elem.value;
					}
				};
			});
		}
		jQuery.each(["radio", "checkbox"], function() {
			jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
				set: function(elem, value) {
					if (jQuery.isArray(value)) {
						return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
					}
				}
			});
		});
		var rformElems = /^(?:input|select|textarea)$/i,
			rkeyEvent = /^key/,
			rmouseEvent = /^(?:mouse|contextmenu)|click/,
			rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
			rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}

		/*
		 * Helper functions for managing events -- not part of the public interface.
		 * Props to Dean Edwards' addEvent library for many of the ideas.
		 */
		jQuery.event = {

			global: {},

			add: function(elem, types, handler, data, selector) {
				var tmp, events, t, handleObjIn,
					special, eventHandle, handleObj,
					handlers, type, namespaces, origType,
					elemData = jQuery._data(elem);

				// Don't attach events to noData or text/comment nodes (but allow plain objects)
				if (!elemData) {
					return;
				}

				// Caller can pass in an object of custom data in lieu of the handler
				if (handler.handler) {
					handleObjIn = handler;
					handler = handleObjIn.handler;
					selector = handleObjIn.selector;
				}

				// Make sure that the handler has a unique ID, used to find/remove it later
				if (!handler.guid) {
					handler.guid = jQuery.guid++;
				}

				// Init the element's event structure and main handler, if this is the first
				if (!(events = elemData.events)) {
					events = elemData.events = {};
				}
				if (!(eventHandle = elemData.handle)) {
					eventHandle = elemData.handle = function(e) {
						// Discard the second event of a jQuery.event.trigger() and
						// when an event is called after a page has unloaded
						return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
							jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
							undefined;
					};
					// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
					eventHandle.elem = elem;
				}

				// Handle multiple events separated by a space
				// jQuery(...).bind("mouseover mouseout", fn);
				types = (types || "").match(core_rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// If event changes its type, use the special event handlers for the changed type
					special = jQuery.event.special[type] || {};

					// If selector defined, determine special event api type, otherwise given type
					type = (selector ? special.delegateType : special.bindType) || type;

					// Update special based on newly reset type
					special = jQuery.event.special[type] || {};

					// handleObj is passed to all event handlers
					handleObj = jQuery.extend({
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext: selector && jQuery.expr.match.needsContext.test(selector),
						namespace: namespaces.join(".")
					}, handleObjIn);

					// Init the event handler queue if we're the first
					if (!(handlers = events[type])) {
						handlers = events[type] = [];
						handlers.delegateCount = 0;

						// Only use addEventListener/attachEvent if the special events handler returns false
						if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
							// Bind the global event handler to the element
							if (elem.addEventListener) {
								elem.addEventListener(type, eventHandle, false);

							} else if (elem.attachEvent) {
								elem.attachEvent("on" + type, eventHandle);
							}
						}
					}

					if (special.add) {
						special.add.call(elem, handleObj);

						if (!handleObj.handler.guid) {
							handleObj.handler.guid = handler.guid;
						}
					}

					// Add to the element's handler list, delegates in front
					if (selector) {
						handlers.splice(handlers.delegateCount++, 0, handleObj);
					} else {
						handlers.push(handleObj);
					}

					// Keep track of which events have ever been used, for event optimization
					jQuery.event.global[type] = true;
				}

				// Nullify elem to prevent memory leaks in IE
				elem = null;
			},

			// Detach an event or set of events from an element
			remove: function(elem, types, handler, selector, mappedTypes) {
				var j, handleObj, tmp,
					origCount, t, events,
					special, handlers, type,
					namespaces, origType,
					elemData = jQuery.hasData(elem) && jQuery._data(elem);

				if (!elemData || !(events = elemData.events)) {
					return;
				}

				// Once for each type.namespace in types; type may be omitted
				types = (types || "").match(core_rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// Unbind all events (on this namespace, if provided) for the element
					if (!type) {
						for (type in events) {
							jQuery.event.remove(elem, type + types[t], handler, selector, true);
						}
						continue;
					}

					special = jQuery.event.special[type] || {};
					type = (selector ? special.delegateType : special.bindType) || type;
					handlers = events[type] || [];
					tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

					// Remove matching events
					origCount = j = handlers.length;
					while (j--) {
						handleObj = handlers[j];

						if ((mappedTypes || origType === handleObj.origType) &&
							(!handler || handler.guid === handleObj.guid) &&
							(!tmp || tmp.test(handleObj.namespace)) &&
							(!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
							handlers.splice(j, 1);

							if (handleObj.selector) {
								handlers.delegateCount--;
							}
							if (special.remove) {
								special.remove.call(elem, handleObj);
							}
						}
					}

					// Remove generic event handler if we removed something and no more handlers exist
					// (avoids potential for endless recursion during removal of special event handlers)
					if (origCount && !handlers.length) {
						if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
							jQuery.removeEvent(elem, type, elemData.handle);
						}

						delete events[type];
					}
				}

				// Remove the expando if it's no longer used
				if (jQuery.isEmptyObject(events)) {
					delete elemData.handle;

					// removeData also checks for emptiness and clears the expando if empty
					// so use it instead of delete
					jQuery._removeData(elem, "events");
				}
			},

			trigger: function(event, data, elem, onlyHandlers) {
				var handle, ontype, cur,
					bubbleType, special, tmp, i,
					eventPath = [elem || document],
					type = core_hasOwn.call(event, "type") ? event.type : event,
					namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

				cur = tmp = elem = elem || document;

				// Don't do events on text and comment nodes
				if (elem.nodeType === 3 || elem.nodeType === 8) {
					return;
				}

				// focus/blur morphs to focusin/out; ensure we're not firing them right now
				if (rfocusMorph.test(type + jQuery.event.triggered)) {
					return;
				}

				if (type.indexOf(".") >= 0) {
					// Namespaced trigger; create a regexp to match event type in handle()
					namespaces = type.split(".");
					type = namespaces.shift();
					namespaces.sort();
				}
				ontype = type.indexOf(":") < 0 && "on" + type;

				// Caller can pass in a jQuery.Event object, Object, or just an event type string
				event = event[jQuery.expando] ?
					event :
					new jQuery.Event(type, typeof event === "object" && event);

				event.isTrigger = true;
				event.namespace = namespaces.join(".");
				event.namespace_re = event.namespace ?
					new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
					null;

				// Clean up the event in case it is being reused
				event.result = undefined;
				if (!event.target) {
					event.target = elem;
				}

				// Clone any incoming data and prepend the event, creating the handler arg list
				data = data == null ?
					[event] :
					jQuery.makeArray(data, [event]);

				// Allow special events to draw outside the lines
				special = jQuery.event.special[type] || {};
				if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
					return;
				}

				// Determine event propagation path in advance, per W3C events spec (#9951)
				// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
				if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

					bubbleType = special.delegateType || type;
					if (!rfocusMorph.test(bubbleType + type)) {
						cur = cur.parentNode;
					}
					for (; cur; cur = cur.parentNode) {
						eventPath.push(cur);
						tmp = cur;
					}

					// Only add window if we got to document (e.g., not plain obj or detached DOM)
					if (tmp === (elem.ownerDocument || document)) {
						eventPath.push(tmp.defaultView || tmp.parentWindow || window);
					}
				}

				// Fire handlers on the event path
				i = 0;
				while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

					event.type = i > 1 ?
						bubbleType :
						special.bindType || type;

					// jQuery handler
					handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
					if (handle) {
						handle.apply(cur, data);
					}

					// Native handler
					handle = ontype && cur[ontype];
					if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
						event.preventDefault();
					}
				}
				event.type = type;

				// If nobody prevented the default action, do it now
				if (!onlyHandlers && !event.isDefaultPrevented()) {

					if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) &&
						!(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {

						// Call a native DOM method on the target with the same name name as the event.
						// Can't use an .isFunction() check here because IE6/7 fails that test.
						// Don't do default actions on window, that's where global variables be (#6170)
						if (ontype && elem[type] && !jQuery.isWindow(elem)) {

							// Don't re-trigger an onFOO event when we call its FOO() method
							tmp = elem[ontype];

							if (tmp) {
								elem[ontype] = null;
							}

							// Prevent re-triggering of the same event, since we already bubbled it above
							jQuery.event.triggered = type;
							try {
								elem[type]();
							} catch (e) {
								// IE<9 dies on focus/blur to hidden element (#1486,#12518)
								// only reproducible on winXP IE8 native, not IE9 in IE8 mode
							}
							jQuery.event.triggered = undefined;

							if (tmp) {
								elem[ontype] = tmp;
							}
						}
					}
				}

				return event.result;
			},

			dispatch: function(event) {

				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix(event);

				var i, ret, handleObj, matched, j,
					handlerQueue = [],
					args = core_slice.call(arguments),
					handlers = (jQuery._data(this, "events") || {})[event.type] || [],
					special = jQuery.event.special[event.type] || {};

				// Use the fix-ed jQuery.Event rather than the (read-only) native event
				args[0] = event;
				event.delegateTarget = this;

				// Call the preDispatch hook for the mapped type, and let it bail if desired
				if (special.preDispatch && special.preDispatch.call(this, event) === false) {
					return;
				}

				// Determine handlers
				handlerQueue = jQuery.event.handlers.call(this, event, handlers);

				// Run delegates first; they may want to stop propagation beneath us
				i = 0;
				while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
					event.currentTarget = matched.elem;

					j = 0;
					while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

						// Triggered event must either 1) have no namespace, or
						// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
						if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

							event.handleObj = handleObj;
							event.data = handleObj.data;

							ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
								.apply(matched.elem, args);

							if (ret !== undefined) {
								if ((event.result = ret) === false) {
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}

				// Call the postDispatch hook for the mapped type
				if (special.postDispatch) {
					special.postDispatch.call(this, event);
				}

				return event.result;
			},

			handlers: function(event, handlers) {
				var sel, handleObj, matches, i,
					handlerQueue = [],
					delegateCount = handlers.delegateCount,
					cur = event.target;

				// Find delegate handlers
				// Black-hole SVG <use> instance trees (#13180)
				// Avoid non-left-click bubbling in Firefox (#3861)
				if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

					for (; cur != this; cur = cur.parentNode || this) {

						// Don't check non-elements (#13208)
						// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
						if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
							matches = [];
							for (i = 0; i < delegateCount; i++) {
								handleObj = handlers[i];

								// Don't conflict with Object.prototype properties (#13203)
								sel = handleObj.selector + " ";

								if (matches[sel] === undefined) {
									matches[sel] = handleObj.needsContext ?
										jQuery(sel, this).index(cur) >= 0 :
										jQuery.find(sel, this, null, [cur]).length;
								}
								if (matches[sel]) {
									matches.push(handleObj);
								}
							}
							if (matches.length) {
								handlerQueue.push({
									elem: cur,
									handlers: matches
								});
							}
						}
					}
				}

				// Add the remaining (directly-bound) handlers
				if (delegateCount < handlers.length) {
					handlerQueue.push({
						elem: this,
						handlers: handlers.slice(delegateCount)
					});
				}

				return handlerQueue;
			},

			fix: function(event) {
				if (event[jQuery.expando]) {
					return event;
				}

				// Create a writable copy of the event object and normalize some properties
				var i, prop, copy,
					type = event.type,
					originalEvent = event,
					fixHook = this.fixHooks[type];

				if (!fixHook) {
					this.fixHooks[type] = fixHook =
						rmouseEvent.test(type) ? this.mouseHooks :
						rkeyEvent.test(type) ? this.keyHooks : {};
				}
				copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

				event = new jQuery.Event(originalEvent);

				i = copy.length;
				while (i--) {
					prop = copy[i];
					event[prop] = originalEvent[prop];
				}

				// Support: IE<9
				// Fix target property (#1925)
				if (!event.target) {
					event.target = originalEvent.srcElement || document;
				}

				// Support: Chrome 23+, Safari?
				// Target should not be a text node (#504, #13143)
				if (event.target.nodeType === 3) {
					event.target = event.target.parentNode;
				}

				// Support: IE<9
				// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
				event.metaKey = !!event.metaKey;

				return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
			},

			// Includes some event props shared by KeyEvent and MouseEvent
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

			fixHooks: {},

			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(event, original) {

					// Add which for key events
					if (event.which == null) {
						event.which = original.charCode != null ? original.charCode : original.keyCode;
					}

					return event;
				}
			},

			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(event, original) {
					var body, eventDoc, doc,
						button = original.button,
						fromElement = original.fromElement;

					// Calculate pageX/Y if missing and clientX/Y available
					if (event.pageX == null && original.clientX != null) {
						eventDoc = event.target.ownerDocument || document;
						doc = eventDoc.documentElement;
						body = eventDoc.body;

						event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
						event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
					}

					// Add relatedTarget, if necessary
					if (!event.relatedTarget && fromElement) {
						event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
					}

					// Add which for click: 1 === left; 2 === middle; 3 === right
					// Note: button is not normalized, so don't use it
					if (!event.which && button !== undefined) {
						event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
					}

					return event;
				}
			},

			special: {
				load: {
					// Prevent triggered image.load events from bubbling to window.load
					noBubble: true
				},
				click: {
					// For checkbox, fire native event so checked state will be right
					trigger: function() {
						if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
							this.click();
							return false;
						}
					}
				},
				focus: {
					// Fire native event if possible so blur/focus sequence is correct
					trigger: function() {
						if (this !== document.activeElement && this.focus) {
							try {
								this.focus();
								return false;
							} catch (e) {
								// Support: IE<9
								// If we error on focus to hidden element (#1486, #12518),
								// let .trigger() run the handlers
							}
						}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						if (this === document.activeElement && this.blur) {
							this.blur();
							return false;
						}
					},
					delegateType: "focusout"
				},

				beforeunload: {
					postDispatch: function(event) {

						// Even when returnValue equals to undefined Firefox will still show alert
						if (event.result !== undefined) {
							event.originalEvent.returnValue = event.result;
						}
					}
				}
			},

			simulate: function(type, elem, event, bubble) {
				// Piggyback on a donor event to simulate a different one.
				// Fake originalEvent to avoid donor's stopPropagation, but if the
				// simulated event prevents default then we do the same on the donor.
				var e = jQuery.extend(
					new jQuery.Event(),
					event, {
						type: type,
						isSimulated: true,
						originalEvent: {}
					}
				);
				if (bubble) {
					jQuery.event.trigger(e, null, elem);
				} else {
					jQuery.event.dispatch.call(elem, e);
				}
				if (e.isDefaultPrevented()) {
					event.preventDefault();
				}
			}
		};

		jQuery.removeEvent = document.removeEventListener ?
			function(elem, type, handle) {
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handle, false);
				}
			} :
			function(elem, type, handle) {
				var name = "on" + type;

				if (elem.detachEvent) {

					// #8545, #7054, preventing memory leaks for custom events in IE6-8
					// detachEvent needed property on element, by name of that event, to properly expose it to GC
					if (typeof elem[name] === core_strundefined) {
						elem[name] = null;
					}

					elem.detachEvent(name, handle);
				}
			};

		jQuery.Event = function(src, props) {
			// Allow instantiation without the 'new' keyword
			if (!(this instanceof jQuery.Event)) {
				return new jQuery.Event(src, props);
			}

			// Event object
			if (src && src.type) {
				this.originalEvent = src;
				this.type = src.type;

				// Events bubbling up the document may have been marked as prevented
				// by a handler lower down the tree; reflect the correct value.
				this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
					src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

				// Event type
			} else {
				this.type = src;
			}

			// Put explicitly provided properties onto the event object
			if (props) {
				jQuery.extend(this, props);
			}

			// Create a timestamp if incoming event doesn't have one
			this.timeStamp = src && src.timeStamp || jQuery.now();

			// Mark it as fixed
			this[jQuery.expando] = true;
		};

		// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
		// //www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
		jQuery.Event.prototype = {
			isDefaultPrevented: returnFalse,
			isPropagationStopped: returnFalse,
			isImmediatePropagationStopped: returnFalse,

			preventDefault: function() {
				var e = this.originalEvent;

				this.isDefaultPrevented = returnTrue;
				if (!e) {
					return;
				}

				// If preventDefault exists, run it on the original event
				if (e.preventDefault) {
					e.preventDefault();

					// Support: IE
					// Otherwise set the returnValue property of the original event to false
				} else {
					e.returnValue = false;
				}
			},
			stopPropagation: function() {
				var e = this.originalEvent;

				this.isPropagationStopped = returnTrue;
				if (!e) {
					return;
				}
				// If stopPropagation exists, run it on the original event
				if (e.stopPropagation) {
					e.stopPropagation();
				}

				// Support: IE
				// Set the cancelBubble property of the original event to true
				e.cancelBubble = true;
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = returnTrue;
				this.stopPropagation();
			}
		};

		// Create mouseenter/leave events using mouseover/out and event-time checks
		jQuery.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(orig, fix) {
			jQuery.event.special[orig] = {
				delegateType: fix,
				bindType: fix,

				handle: function(event) {
					var ret,
						target = this,
						related = event.relatedTarget,
						handleObj = event.handleObj;

					// For mousenter/leave call the handler if related is outside the target.
					// NB: No relatedTarget if the mouse left/entered the browser window
					if (!related || (related !== target && !jQuery.contains(target, related))) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply(this, arguments);
						event.type = fix;
					}
					return ret;
				}
			};
		});

		// IE submit delegation
		if (!jQuery.support.submitBubbles) {

			jQuery.event.special.submit = {
				setup: function() {
					// Only need this for delegated form submit events
					if (jQuery.nodeName(this, "form")) {
						return false;
					}

					// Lazy-add a submit handler when a descendant form may potentially be submitted
					jQuery.event.add(this, "click._submit keypress._submit", function(e) {
						// Node name check avoids a VML-related crash in IE (#9807)
						var elem = e.target,
							form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
						if (form && !jQuery._data(form, "submitBubbles")) {
							jQuery.event.add(form, "submit._submit", function(event) {
								event._submit_bubble = true;
							});
							jQuery._data(form, "submitBubbles", true);
						}
					});
					// return undefined since we don't need an event listener
				},

				postDispatch: function(event) {
					// If form was submitted by the user, bubble the event up the tree
					if (event._submit_bubble) {
						delete event._submit_bubble;
						if (this.parentNode && !event.isTrigger) {
							jQuery.event.simulate("submit", this.parentNode, event, true);
						}
					}
				},

				teardown: function() {
					// Only need this for delegated form submit events
					if (jQuery.nodeName(this, "form")) {
						return false;
					}

					// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
					jQuery.event.remove(this, "._submit");
				}
			};
		}

		// IE change delegation and checkbox/radio fix
		if (!jQuery.support.changeBubbles) {

			jQuery.event.special.change = {

				setup: function() {

					if (rformElems.test(this.nodeName)) {
						// IE doesn't fire change on a check/radio until blur; trigger it on click
						// after a propertychange. Eat the blur-change in special.change.handle.
						// This still fires onchange a second time for check/radio after blur.
						if (this.type === "checkbox" || this.type === "radio") {
							jQuery.event.add(this, "propertychange._change", function(event) {
								if (event.originalEvent.propertyName === "checked") {
									this._just_changed = true;
								}
							});
							jQuery.event.add(this, "click._change", function(event) {
								if (this._just_changed && !event.isTrigger) {
									this._just_changed = false;
								}
								// Allow triggered, simulated change events (#11500)
								jQuery.event.simulate("change", this, event, true);
							});
						}
						return false;
					}
					// Delegated event; lazy-add a change handler on descendant inputs
					jQuery.event.add(this, "beforeactivate._change", function(e) {
						var elem = e.target;

						if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
							jQuery.event.add(elem, "change._change", function(event) {
								if (this.parentNode && !event.isSimulated && !event.isTrigger) {
									jQuery.event.simulate("change", this.parentNode, event, true);
								}
							});
							jQuery._data(elem, "changeBubbles", true);
						}
					});
				},

				handle: function(event) {
					var elem = event.target;

					// Swallow native change events from checkbox/radio, we already triggered them above
					if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
						return event.handleObj.handler.apply(this, arguments);
					}
				},

				teardown: function() {
					jQuery.event.remove(this, "._change");

					return !rformElems.test(this.nodeName);
				}
			};
		}

		// Create "bubbling" focus and blur events
		if (!jQuery.support.focusinBubbles) {
			jQuery.each({
				focus: "focusin",
				blur: "focusout"
			}, function(orig, fix) {

				// Attach a single capturing handler while someone wants focusin/focusout
				var attaches = 0,
					handler = function(event) {
						jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
					};

				jQuery.event.special[fix] = {
					setup: function() {
						if (attaches++ === 0) {
							document.addEventListener(orig, handler, true);
						}
					},
					teardown: function() {
						if (--attaches === 0) {
							document.removeEventListener(orig, handler, true);
						}
					}
				};
			});
		}

		jQuery.fn.extend({

			on: function(types, selector, data, fn, /*INTERNAL*/ one) {
				var type, origFn;

				// Types can be a map of types/handlers
				if (typeof types === "object") {
					// ( types-Object, selector, data )
					if (typeof selector !== "string") {
						// ( types-Object, data )
						data = data || selector;
						selector = undefined;
					}
					for (type in types) {
						this.on(type, selector, data, types[type], one);
					}
					return this;
				}

				if (data == null && fn == null) {
					// ( types, fn )
					fn = selector;
					data = selector = undefined;
				} else if (fn == null) {
					if (typeof selector === "string") {
						// ( types, selector, fn )
						fn = data;
						data = undefined;
					} else {
						// ( types, data, fn )
						fn = data;
						data = selector;
						selector = undefined;
					}
				}
				if (fn === false) {
					fn = returnFalse;
				} else if (!fn) {
					return this;
				}

				if (one === 1) {
					origFn = fn;
					fn = function(event) {
						// Can use an empty set, since event contains the info
						jQuery().off(event);
						return origFn.apply(this, arguments);
					};
					// Use same guid so caller can remove using origFn
					fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
				}
				return this.each(function() {
					jQuery.event.add(this, types, fn, data, selector);
				});
			},
			one: function(types, selector, data, fn) {
				return this.on(types, selector, data, fn, 1);
			},
			off: function(types, selector, fn) {
				var handleObj, type;
				if (types && types.preventDefault && types.handleObj) {
					// ( event )  dispatched jQuery.Event
					handleObj = types.handleObj;
					jQuery(types.delegateTarget).off(
						handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
						handleObj.selector,
						handleObj.handler
					);
					return this;
				}
				if (typeof types === "object") {
					// ( types-object [, selector] )
					for (type in types) {
						this.off(type, selector, types[type]);
					}
					return this;
				}
				if (selector === false || typeof selector === "function") {
					// ( types [, fn] )
					fn = selector;
					selector = undefined;
				}
				if (fn === false) {
					fn = returnFalse;
				}
				return this.each(function() {
					jQuery.event.remove(this, types, fn, selector);
				});
			},

			bind: function(types, data, fn) {
				return this.on(types, null, data, fn);
			},
			unbind: function(types, fn) {
				return this.off(types, null, fn);
			},

			delegate: function(selector, types, data, fn) {
				return this.on(types, selector, data, fn);
			},
			undelegate: function(selector, types, fn) {
				// ( namespace ) or ( selector, types [, fn] )
				return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
			},

			trigger: function(type, data) {
				return this.each(function() {
					jQuery.event.trigger(type, data, this);
				});
			},
			triggerHandler: function(type, data) {
				var elem = this[0];
				if (elem) {
					return jQuery.event.trigger(type, data, elem, true);
				}
			}
		});
		/*!
		 * Sizzle CSS Selector Engine
		 * Copyright 2012 jQuery Foundation and other contributors
		 * Released under the MIT license
		 * //sizzlejs.com/
		 */
		(function(window, undefined) {

			var i,
				cachedruns,
				Expr,
				getText,
				isXML,
				compile,
				hasDuplicate,
				outermostContext,

				// Local document vars
				setDocument,
				document,
				docElem,
				documentIsXML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,
				sortOrder,

				// Instance-specific data
				expando = "sizzle" + -(new Date()),
				preferredDoc = window.document,
				support = {},
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),

				// General-purpose constants
				strundefined = typeof undefined,
				MAX_NEGATIVE = 1 << 31,

				// Array methods
				arr = [],
				pop = arr.pop,
				push = arr.push,
				slice = arr.slice,
				// Use a stripped-down indexOf if we can't use a native one
				indexOf = arr.indexOf || function(elem) {
					var i = 0,
						len = this.length;
					for (; i < len; i++) {
						if (this[i] === elem) {
							return i;
						}
					}
					return -1;
				},


				// Regular expressions

				// Whitespace characters //www.w3.org/TR/css3-selectors/#whitespace
				whitespace = "[\\x20\\t\\r\\n\\f]",
				// //www.w3.org/TR/css3-syntax/#characters
				characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

				// Loosely modeled on CSS identifier characters
				// An unquoted value should be a CSS identifier //www.w3.org/TR/css3-selectors/#attribute-selectors
				// Proper syntax: //www.w3.org/TR/CSS21/syndata.html#value-def-identifier
				identifier = characterEncoding.replace("w", "w#"),

				// Acceptable operators //www.w3.org/TR/selectors/#attribute-selectors
				operators = "([*^$|!~]?=)",
				attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
				"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

				// Prefer arguments quoted,
				//   then not containing pseudos/brackets,
				//   then attribute selectors/non-parenthetical expressions,
				//   then anything else
				// These preferences are here to reduce the number of selectors
				//   needing tokenize in the PSEUDO preFilter
				pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

				// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
				rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

				rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
				rpseudo = new RegExp(pseudos),
				ridentifier = new RegExp("^" + identifier + "$"),

				matchExpr = {
					"ID": new RegExp("^#(" + characterEncoding + ")"),
					"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
					"NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
					"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},

				rsibling = /[\x20\t\r\n\f]*[+~]/,

				rnative = /^[^{]+\{\s*\[native code/,

				// Easily-parseable/retrievable ID or TAG or CLASS selectors
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,

				rescape = /'|\\/g,
				rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

				// CSS escapes //www.w3.org/TR/CSS21/syndata.html#escaped-characters
				runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
				funescape = function(_, escaped) {
					var high = "0x" + escaped - 0x10000;
					// NaN means non-codepoint
					return high !== high ?
						escaped :
						// BMP codepoint
						high < 0 ?
						String.fromCharCode(high + 0x10000) :
						// Supplemental Plane codepoint (surrogate pair)
						String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				};

			// Use a stripped-down slice if we can't use a native one
			try {
				slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
			} catch (e) {
				slice = function(i) {
					var elem,
						results = [];
					while ((elem = this[i++])) {
						results.push(elem);
					}
					return results;
				};
			}

			/**
			 * For feature detection
			 * @param {Function} fn The function to test for native support
			 */
			function isNative(fn) {
				return rnative.test(fn + "");
			}

			/**
			 * Create key-value caches of limited size
			 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
			 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
			 *	deleting the oldest entry
			 */
			function createCache() {
				var cache,
					keys = [];

				return (cache = function(key, value) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if (keys.push(key += " ") > Expr.cacheLength) {
						// Only keep the most recent entries
						delete cache[keys.shift()];
					}
					return (cache[key] = value);
				});
			}

			/**
			 * Mark a function for special use by Sizzle
			 * @param {Function} fn The function to mark
			 */
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}

			/**
			 * Support testing using an element
			 * @param {Function} fn Passed the created div and expects a boolean result
			 */
			function assert(fn) {
				var div = document.createElement("div");

				try {
					return fn(div);
				} catch (e) {
					return false;
				} finally {
					// release memory in IE
					div = null;
				}
			}

			function Sizzle(selector, context, results, seed) {
				var match, elem, m, nodeType,
					// QSA vars
					i, groups, old, nid, newContext, newSelector;

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}

				context = context || document;
				results = results || [];

				if (!selector || typeof selector !== "string") {
					return results;
				}

				if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
					return [];
				}

				if (!documentIsXML && !seed) {

					// Shortcuts
					if ((match = rquickExpr.exec(selector))) {
						// Speed-up: Sizzle("#ID")
						if ((m = match[1])) {
							if (nodeType === 9) {
								elem = context.getElementById(m);
								// Check parentNode to catch when Blackberry 4.6 returns
								// nodes that are no longer in the document #6963
								if (elem && elem.parentNode) {
									// Handle the case where IE, Opera, and Webkit return items
									// by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}
							} else {
								// Context is not a document
								if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
									contains(context, elem) && elem.id === m) {
									results.push(elem);
									return results;
								}
							}

							// Speed-up: Sizzle("TAG")
						} else if (match[2]) {
							push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
							return results;

							// Speed-up: Sizzle(".CLASS")
						} else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
							push.apply(results, slice.call(context.getElementsByClassName(m), 0));
							return results;
						}
					}

					// QSA path
					if (support.qsa && !rbuggyQSA.test(selector)) {
						old = true;
						nid = expando;
						newContext = context;
						newSelector = nodeType === 9 && selector;

						// qSA works strangely on Element-rooted queries
						// We can work around this by specifying an extra ID on the root
						// and working up from there (Thanks to Andrew Dupont for the technique)
						// IE 8 doesn't work on object elements
						if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
							groups = tokenize(selector);

							if ((old = context.getAttribute("id"))) {
								nid = old.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid);
							}
							nid = "[id='" + nid + "'] ";

							i = groups.length;
							while (i--) {
								groups[i] = nid + toSelector(groups[i]);
							}
							newContext = rsibling.test(selector) && context.parentNode || context;
							newSelector = groups.join(",");
						}

						if (newSelector) {
							try {
								push.apply(results, slice.call(newContext.querySelectorAll(
									newSelector
								), 0));
								return results;
							} catch (qsaError) {} finally {
								if (!old) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}

				// All others
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}

			/**
			 * Detect xml
			 * @param {Element|Object} elem An element or a document
			 */
			isXML = Sizzle.isXML = function(elem) {
				// documentElement is verified for cases where it doesn't yet exist
				// (such as loading iframes in IE - #4833)
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};

			/**
			 * Sets document-related variables once based on the current document
			 * @param {Element|Object} [doc] An element or document object to use to set the document
			 * @returns {Object} Returns the current document
			 */
			setDocument = Sizzle.setDocument = function(node) {
				var doc = node ? node.ownerDocument || node : preferredDoc;

				// If no document and documentElement is available, return
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}

				// Set our document
				document = doc;
				docElem = doc.documentElement;

				// Support tests
				documentIsXML = isXML(doc);

				// Check if getElementsByTagName("*") returns only elements
				support.tagNameNoComments = assert(function(div) {
					div.appendChild(doc.createComment(""));
					return !div.getElementsByTagName("*").length;
				});

				// Check if attributes should be retrieved by attribute nodes
				support.attributes = assert(function(div) {
					div.innerHTML = "<select></select>";
					var type = typeof div.lastChild.getAttribute("multiple");
					// IE8 returns a string for some attributes even when not present
					return type !== "boolean" && type !== "string";
				});

				// Check if getElementsByClassName can be trusted
				support.getByClassName = assert(function(div) {
					// Opera can't find a second classname (in 9.6)
					div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
					if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
						return false;
					}

					// Safari 3.2 caches class attributes and doesn't catch changes
					div.lastChild.className = "e";
					return div.getElementsByClassName("e").length === 2;
				});

				// Check if getElementById returns elements by name
				// Check if getElementsByName privileges form controls or returns elements by ID
				support.getByName = assert(function(div) {
					// Inject content
					div.id = expando + 0;
					div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
					docElem.insertBefore(div, docElem.firstChild);

					// Test
					var pass = doc.getElementsByName &&
						// buggy browsers will return fewer than the correct 2
						doc.getElementsByName(expando).length === 2 +
						// buggy browsers will return more than the correct 0
						doc.getElementsByName(expando + 0).length;
					support.getIdNotName = !doc.getElementById(expando);

					// Cleanup
					docElem.removeChild(div);

					return pass;
				});

				// IE6/7 return modified attributes
				Expr.attrHandle = assert(function(div) {
					div.innerHTML = "<a href='#'></a>";
					return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
						div.firstChild.getAttribute("href") === "#";
				}) ? {} : {
					"href": function(elem) {
						return elem.getAttribute("href", 2);
					},
					"type": function(elem) {
						return elem.getAttribute("type");
					}
				};

				// ID find and filter
				if (support.getIdNotName) {
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== strundefined && !documentIsXML) {
							var m = context.getElementById(id);
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							return m && m.parentNode ? [m] : [];
						}
					};
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
				} else {
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== strundefined && !documentIsXML) {
							var m = context.getElementById(id);

							return m ?
								m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
								[m] :
								undefined :
								[];
						}
					};
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
				}

				// Tag
				Expr.find["TAG"] = support.tagNameNoComments ?
					function(tag, context) {
						if (typeof context.getElementsByTagName !== strundefined) {
							return context.getElementsByTagName(tag);
						}
					} :
					function(tag, context) {
						var elem,
							tmp = [],
							i = 0,
							results = context.getElementsByTagName(tag);

						// Filter out possible comments
						if (tag === "*") {
							while ((elem = results[i++])) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}

							return tmp;
						}
						return results;
					};

				// Name
				Expr.find["NAME"] = support.getByName && function(tag, context) {
					if (typeof context.getElementsByName !== strundefined) {
						return context.getElementsByName(name);
					}
				};

				// Class
				Expr.find["CLASS"] = support.getByClassName && function(className, context) {
					if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) {
						return context.getElementsByClassName(className);
					}
				};

				// QSA and matchesSelector support

				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];

				// qSa(:focus) reports false when true (Chrome 21),
				// no need to also add to buggyMatches since matches checks buggyQSA
				// A support test would require too much code (would include document ready)
				rbuggyQSA = [":focus"];

				if ((support.qsa = isNative(doc.querySelectorAll))) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function(div) {
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explictly
						// setting a boolean content attribute,
						// since its presence should be enough
						// //bugs.jquery.com/ticket/12359
						div.innerHTML = "<select><option selected=''></option></select>";

						// IE8 - Some boolean attributes are not treated correctly
						if (!div.querySelectorAll("[selected]").length) {
							rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
						}

						// Webkit/Opera - :checked should return selected option elements
						// //www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}
					});

					assert(function(div) {

						// Opera 10-12/IE8 - ^= $= *= and empty values
						// Should not select anything
						div.innerHTML = "<input type='hidden' i=''/>";
						if (div.querySelectorAll("[i^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
						}

						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":enabled").length) {
							rbuggyQSA.push(":enabled", ":disabled");
						}

						// Opera 10-11 does not throw on post-comma invalid pseudos
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}

				if ((support.matchesSelector = isNative((matches = docElem.matchesSelector ||
						docElem.mozMatchesSelector ||
						docElem.webkitMatchesSelector ||
						docElem.oMatchesSelector ||
						docElem.msMatchesSelector)))) {

					assert(function(div) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call(div, "div");

						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call(div, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}

				rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = new RegExp(rbuggyMatches.join("|"));

				// Element contains another
				// Purposefully does not implement inclusive descendent
				// As in, an element does not contain itself
				contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
					function(a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (
							adown.contains ?
							adown.contains(bup) :
							a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
						));
					} :
					function(a, b) {
						if (b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};

				// Document order sorting
				sortOrder = docElem.compareDocumentPosition ?
					function(a, b) {
						var compare;

						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						if ((compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b))) {
							if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
								if (a === doc || contains(preferredDoc, a)) {
									return -1;
								}
								if (b === doc || contains(preferredDoc, b)) {
									return 1;
								}
								return 0;
							}
							return compare & 4 ? -1 : 1;
						}

						return a.compareDocumentPosition ? -1 : 1;
					} :
					function(a, b) {
						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [a],
							bp = [b];

						// Exit early if the nodes are identical
						if (a === b) {
							hasDuplicate = true;
							return 0;

							// Parentless nodes are either documents or disconnected
						} else if (!aup || !bup) {
							return a === doc ? -1 :
								b === doc ? 1 :
								aup ? -1 :
								bup ? 1 :
								0;

							// If the nodes are siblings, we can do a quick check
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}

						// Otherwise we need full lists of their ancestors for comparison
						cur = a;
						while ((cur = cur.parentNode)) {
							ap.unshift(cur);
						}
						cur = b;
						while ((cur = cur.parentNode)) {
							bp.unshift(cur);
						}

						// Walk down the tree looking for a discrepancy
						while (ap[i] === bp[i]) {
							i++;
						}

						return i ?
							// Do a sibling check if the nodes have a common ancestor
							siblingCheck(ap[i], bp[i]) :

							// Otherwise nodes in our document sort first
							ap[i] === preferredDoc ? -1 :
							bp[i] === preferredDoc ? 1 :
							0;
					};

				// Always assume the presence of duplicates if sort doesn't
				// pass them to our comparison function (as in Google Chrome).
				hasDuplicate = false;
				[0, 0].sort(sortOrder);
				support.detectDuplicates = hasDuplicate;

				return document;
			};

			Sizzle.matches = function(expr, elements) {
				return Sizzle(expr, null, null, elements);
			};

			Sizzle.matchesSelector = function(elem, expr) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				// Make sure that attribute selectors are quoted
				expr = expr.replace(rattributeQuotes, "='$1']");

				// rbuggyQSA always contains :focus, so no need for an existence check
				if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
					try {
						var ret = matches.call(elem, expr);

						// IE 9's matchesSelector returns false on disconnected nodes
						if (ret || support.disconnectedMatch ||
							// As well, disconnected nodes are said to be in a document
							// fragment in IE 9
							elem.document && elem.document.nodeType !== 11) {
							return ret;
						}
					} catch (e) {}
				}

				return Sizzle(expr, document, null, [elem]).length > 0;
			};

			Sizzle.contains = function(context, elem) {
				// Set document vars if needed
				if ((context.ownerDocument || context) !== document) {
					setDocument(context);
				}
				return contains(context, elem);
			};

			Sizzle.attr = function(elem, name) {
				var val;

				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				if (!documentIsXML) {
					name = name.toLowerCase();
				}
				if ((val = Expr.attrHandle[name])) {
					return val(elem);
				}
				if (documentIsXML || support.attributes) {
					return elem.getAttribute(name);
				}
				return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ?
					name :
					val && val.specified ? val.value : null;
			};

			Sizzle.error = function(msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};

			// Document sorting and removing duplicates
			Sizzle.uniqueSort = function(results) {
				var elem,
					duplicates = [],
					i = 1,
					j = 0;

				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				results.sort(sortOrder);

				if (hasDuplicate) {
					for (;
						(elem = results[i]); i++) {
						if (elem === results[i - 1]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}

				return results;
			};

			function siblingCheck(a, b) {
				var cur = b && a,
					diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

				// Use IE sourceIndex if available on both nodes
				if (diff) {
					return diff;
				}

				// Check if b follows a
				if (cur) {
					while ((cur = cur.nextSibling)) {
						if (cur === b) {
							return -1;
						}
					}
				}

				return a ? 1 : -1;
			}

			// Returns a function to use in pseudos for input types
			function createInputPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}

			// Returns a function to use in pseudos for buttons
			function createButtonPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}

			// Returns a function to use in pseudos for positionals
			function createPositionalPseudo(fn) {
				return markFunction(function(argument) {
					argument = +argument;
					return markFunction(function(seed, matches) {
						var j,
							matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;

						// Match elements found at the specified indexes
						while (i--) {
							if (seed[(j = matchIndexes[i])]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}

			/**
			 * Utility function for retrieving the text value of an array of DOM nodes
			 * @param {Array|Element} elem
			 */
			getText = Sizzle.getText = function(elem) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;

				if (!nodeType) {
					// If no nodeType, this is expected to be an array
					for (;
						(node = elem[i]); i++) {
						// Do not traverse comment nodes
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (see #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse its children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes

				return ret;
			};

			Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength: 50,

				createPseudo: markFunction,

				match: matchExpr,

				find: {},

				relative: {
					">": {
						dir: "parentNode",
						first: true
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: true
					},
					"~": {
						dir: "previousSibling"
					}
				},

				preFilter: {
					"ATTR": function(match) {
						match[1] = match[1].replace(runescape, funescape);

						// Move the given value to match[3] whether quoted or unquoted
						match[3] = (match[4] || match[5] || "").replace(runescape, funescape);

						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}

						return match.slice(0, 4);
					},

					"CHILD": function(match) {
						/* matches from matchExpr["CHILD"]
							1 type (only|nth|...)
							2 what (child|of-type)
							3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
							4 xn-component of xn+y argument ([+-]?\d*n|)
							5 sign of xn-component
							6 x of xn-component
							7 sign of y-component
							8 y of y-component
						*/
						match[1] = match[1].toLowerCase();

						if (match[1].slice(0, 3) === "nth") {
							// nth-* requires argument
							if (!match[3]) {
								Sizzle.error(match[0]);
							}

							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +((match[7] + match[8]) || match[3] === "odd");

							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}

						return match;
					},

					"PSEUDO": function(match) {
						var excess,
							unquoted = !match[5] && match[2];

						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}

						// Accept quoted arguments as-is
						if (match[4]) {
							match[2] = match[4];

							// Strip excess characters from unquoted arguments
						} else if (unquoted && rpseudo.test(unquoted) &&
							// Get excess from tokenize (recursively)
							(excess = tokenize(unquoted, true)) &&
							// advance to the next closing parenthesis
							(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice(0, 3);
					}
				},

				filter: {

					"TAG": function(nodeName) {
						if (nodeName === "*") {
							return function() {
								return true;
							};
						}

						nodeName = nodeName.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
					},

					"CLASS": function(className) {
						var pattern = classCache[className + " "];

						return pattern ||
							(pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
							classCache(className, function(elem) {
								return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
							});
					},

					"ATTR": function(name, operator, check) {
						return function(elem) {
							var result = Sizzle.attr(elem, name);

							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check :
								operator === "!=" ? result !== check :
								operator === "^=" ? check && result.indexOf(check) === 0 :
								operator === "*=" ? check && result.indexOf(check) > -1 :
								operator === "$=" ? check && result.slice(-check.length) === check :
								operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
								operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
								false;
						};
					},

					"CHILD": function(type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";

						return first === 1 && last === 0 ?

							// Shortcut for :nth-*(n)
							function(elem) {
								return !!elem.parentNode;
							} :

							function(elem, context, xml) {
								var cache, outerCache, node, diff, nodeIndex, start,
									dir = simple !== forward ? "nextSibling" : "previousSibling",
									parent = elem.parentNode,
									name = ofType && elem.nodeName.toLowerCase(),
									useCache = !xml && !ofType;

								if (parent) {

									// :(first|last|only)-(child|of-type)
									if (simple) {
										while (dir) {
											node = elem;
											while ((node = node[dir])) {
												if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
													return false;
												}
											}
											// Reverse direction for :only-* (if we haven't yet done so)
											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [forward ? parent.firstChild : parent.lastChild];

									// non-xml :nth-child(...) stores cache data on `parent`
									if (forward && useCache) {
										// Seek `elem` from a previously-cached index
										outerCache = parent[expando] || (parent[expando] = {});
										cache = outerCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = cache[0] === dirruns && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];

										while ((node = ++nodeIndex && node && node[dir] ||

												// Fallback to seeking `elem` from the start
												(diff = nodeIndex = 0) || start.pop())) {

											// When found, cache indexes on `parent` and break
											if (node.nodeType === 1 && ++diff && node === elem) {
												outerCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}

										// Use previously-cached element index if available
									} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
										diff = cache[1];

										// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
									} else {
										// Use the same loop as above to seek `elem` from the start
										while ((node = ++nodeIndex && node && node[dir] ||
												(diff = nodeIndex = 0) || start.pop())) {

											if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
												// Cache the index of each encountered element
												if (useCache) {
													(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
												}

												if (node === elem) {
													break;
												}
											}
										}
									}

									// Incorporate the offset, then check against cycle size
									diff -= last;
									return diff === first || (diff % first === 0 && diff / first >= 0);
								}
							};
					},

					"PSEUDO": function(pseudo, argument) {
						// pseudo-class names are case-insensitive
						// //www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
							fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
							Sizzle.error("unsupported pseudo: " + pseudo);

						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if (fn[expando]) {
							return fn(argument);
						}

						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
								markFunction(function(seed, matches) {
									var idx,
										matched = fn(seed, argument),
										i = matched.length;
									while (i--) {
										idx = indexOf.call(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) :
								function(elem) {
									return fn(elem, 0, args);
								};
						}

						return fn;
					}
				},

				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function(selector) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));

						return matcher[expando] ?
							markFunction(function(seed, matches, context, xml) {
								var elem,
									unmatched = matcher(seed, null, xml, []),
									i = seed.length;

								// Match elements unmatched by `matcher`
								while (i--) {
									if ((elem = unmatched[i])) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) :
							function(elem, context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);
								return !results.pop();
							};
					}),

					"has": markFunction(function(selector) {
						return function(elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),

					"contains": markFunction(function(text) {
						return function(elem) {
							return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
						};
					}),

					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// //www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction(function(lang) {
						// lang value must be a valid identifider
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							var elemLang;
							do {
								if ((elemLang = documentIsXML ?
										elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
										elem.lang)) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),

					// Miscellaneous
					"target": function(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},

					"root": function(elem) {
						return elem === docElem;
					},

					"focus": function(elem) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled": function(elem) {
						return elem.disabled === false;
					},

					"disabled": function(elem) {
						return elem.disabled === true;
					},

					"checked": function(elem) {
						// In CSS3, :checked should return both checked and selected elements
						// //www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
					},

					"selected": function(elem) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty": function(elem) {
						// //www.w3.org/TR/selectors/#empty-pseudo
						// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
						//   not comment, processing instructions, or others
						// Thanks to Diego Perini for the nodeName shortcut
						//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
								return false;
							}
						}
						return true;
					},

					"parent": function(elem) {
						return !Expr.pseudos["empty"](elem);
					},

					// Element/input types
					"header": function(elem) {
						return rheader.test(elem.nodeName);
					},

					"input": function(elem) {
						return rinputs.test(elem.nodeName);
					},

					"button": function(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},

					"text": function(elem) {
						var attr;
						// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
						// use getAttribute instead to test this case
						return elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&
							((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
					},

					// Position-in-collection
					"first": createPositionalPseudo(function() {
						return [0];
					}),

					"last": createPositionalPseudo(function(matchIndexes, length) {
						return [length - 1];
					}),

					"eq": createPositionalPseudo(function(matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),

					"even": createPositionalPseudo(function(matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"odd": createPositionalPseudo(function(matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};

			// Add button/input type pseudos
			for (i in {
					radio: true,
					checkbox: true,
					file: true,
					password: true,
					image: true
				}) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in {
					submit: true,
					reset: true
				}) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}

			function tokenize(selector, parseOnly) {
				var matched, match, tokens, type,
					soFar, groups, preFilters,
					cached = tokenCache[selector + " "];

				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}

				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;

				while (soFar) {

					// Comma and first run
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push(tokens = []);
					}

					matched = false;

					// Combinators
					if ((match = rcombinators.exec(soFar))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length);
					}

					// Filters
					for (type in Expr.filter) {
						if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
								(match = preFilters[type](match)))) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice(matched.length);
						}
					}

					if (!matched) {
						break;
					}
				}

				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ?
					soFar.length :
					soFar ?
					Sizzle.error(selector) :
					// Cache the tokens
					tokenCache(selector, groups).slice(0);
			}

			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;

				return combinator.first ?
					// Check against closest ancestor/preceding element
					function(elem, context, xml) {
						while ((elem = elem[dir])) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
					} :

					// Check against all ancestor/preceding elements
					function(elem, context, xml) {
						var data, cache, outerCache,
							dirkey = dirruns + " " + doneName;

						// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
						if (xml) {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});
									if ((cache = outerCache[dir]) && cache[0] === dirkey) {
										if ((data = cache[1]) === true || data === cachedruns) {
											return data === true;
										}
									} else {
										cache = outerCache[dir] = [dirkey];
										cache[1] = matcher(elem, context, xml) || cachedruns;
										if (cache[1] === true) {
											return true;
										}
									}
								}
							}
						}
					};
			}

			function elementMatcher(matchers) {
				return matchers.length > 1 ?
					function(elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} :
					matchers[0];
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;

				for (; i < len; i++) {
					if ((elem = unmatched[i])) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}

				return newUnmatched;
			}

			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function(seed, results, context, xml) {
					var temp, i, elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,

						// Get initial elements from seed or context
						elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

						// Prefilter to get matcher input, preserving a map for seed-results synchronization
						matcherIn = preFilter && (seed || !selector) ?
						condense(elems, preMap, preFilter, context, xml) :
						elems,

						matcherOut = matcher ?
						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || (seed ? preFilter : preexisting || postFilter) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
						matcherIn;

					// Find primary matches
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}

					// Apply postFilter
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);

						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while (i--) {
							if ((elem = temp[i])) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}

					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i])) {
										// Restore matcherIn since elem is not yet a final match
										temp.push((matcherIn[i] = elem));
									}
								}
								postFinder(null, (matcherOut = []), temp, xml);
							}

							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

									seed[temp] = !(results[temp] = elem);
								}
							}
						}

						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(
							matcherOut === results ?
							matcherOut.splice(preexisting, matcherOut.length) :
							matcherOut
						);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}

			function matcherFromTokens(tokens) {
				var checkContext, matcher, j,
					len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,

					// The foundational matcher ensures that elements are reachable from top-level context(s)
					matchContext = addCombinator(function(elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					matchAnyContext = addCombinator(function(elem) {
						return indexOf.call(checkContext, elem) > -1;
					}, implicitRelative, true),
					matchers = [function(elem, context, xml) {
						return (!leadingRelative && (xml || context !== outermostContext)) || (
							(checkContext = context).nodeType ?
							matchContext(elem, context, xml) :
							matchAnyContext(elem, context, xml));
					}];

				for (; i < len; i++) {
					if ((matcher = Expr.relative[tokens[i].type])) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

						// Return special upon seeing a positional matcher
						if (matcher[expando]) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher(matchers),
								i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"),
								matcher,
								i < j && matcherFromTokens(tokens.slice(i, j)),
								j < len && matcherFromTokens((tokens = tokens.slice(j))),
								j < len && toSelector(tokens)
							);
						}
						matchers.push(matcher);
					}
				}

				return elementMatcher(matchers);
			}

			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				// A counter to specify which element is currently being matched
				var matcherCachedRuns = 0,
					bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function(seed, context, xml, results, expandContext) {
						var elem, j, matcher,
							setMatched = [],
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							outermost = expandContext != null,
							contextBackup = outermostContext,
							// We must always have either seed elements or context
							elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
							// Use integer dirruns iff this is the outermost matcher
							dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

						if (outermost) {
							outermostContext = context !== document && context;
							cachedruns = matcherCachedRuns;
						}

						// Add elements passing elementMatchers directly to results
						// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
						for (;
							(elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								while ((matcher = elementMatchers[j++])) {
									if (matcher(elem, context, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
									cachedruns = ++matcherCachedRuns;
								}
							}

							// Track unmatched elements for set filters
							if (bySet) {
								// They will have gone through all possible matchers
								if ((elem = !matcher && elem)) {
									matchedCount--;
								}

								// Lengthen the array for every element, matched or not
								if (seed) {
									unmatched.push(elem);
								}
							}
						}

						// Apply set filters to unmatched elements
						matchedCount += i;
						if (bySet && i !== matchedCount) {
							j = 0;
							while ((matcher = setMatchers[j++])) {
								matcher(unmatched, setMatched, context, xml);
							}

							if (seed) {
								// Reintegrate element matches to eliminate the need for sorting
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}

								// Discard index placeholder values to get only actual matches
								setMatched = condense(setMatched);
							}

							// Add matches to results
							push.apply(results, setMatched);

							// Seedless set matches succeeding multiple successful matchers stipulate sorting
							if (outermost && !seed && setMatched.length > 0 &&
								(matchedCount + setMatchers.length) > 1) {

								Sizzle.uniqueSort(results);
							}
						}

						// Override manipulation of globals by nested matchers
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

				return bySet ?
					markFunction(superMatcher) :
					superMatcher;
			}

			compile = Sizzle.compile = function(selector, group /* Internal Use Only */ ) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];

				if (!cached) {
					// Generate a function of recursive functions that can be used to check each element
					if (!group) {
						group = tokenize(selector);
					}
					i = group.length;
					while (i--) {
						cached = matcherFromTokens(group[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}

					// Cache the compiled function
					cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
				}
				return cached;
			};

			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}

			function select(selector, context, results, seed) {
				var i, tokens, token, type, find,
					match = tokenize(selector);

				if (!seed) {
					// Try to minimize operations if there is only one group
					if (match.length === 1) {

						// Take a shortcut and set the context if the root selector is an ID
						tokens = match[0] = match[0].slice(0);
						if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
							context.nodeType === 9 && !documentIsXML &&
							Expr.relative[tokens[1].type]) {

							context = Expr.find["ID"](token.matches[0].replace(runescape, funescape), context)[0];
							if (!context) {
								return results;
							}

							selector = selector.slice(tokens.shift().value.length);
						}

						// Fetch a seed set for right-to-left matching
						i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
						while (i--) {
							token = tokens[i];

							// Abort if we hit a combinator
							if (Expr.relative[(type = token.type)]) {
								break;
							}
							if ((find = Expr.find[type])) {
								// Search, expanding context for leading sibling combinators
								if ((seed = find(
										token.matches[0].replace(runescape, funescape),
										rsibling.test(tokens[0].type) && context.parentNode || context
									))) {

									// If seed is empty or no tokens remain, we can return early
									tokens.splice(i, 1);
									selector = seed.length && toSelector(tokens);
									if (!selector) {
										push.apply(results, slice.call(seed, 0));
										return results;
									}

									break;
								}
							}
						}
					}
				}

				// Compile and execute a filtering function
				// Provide `match` to avoid retokenization if we modified the selector above
				compile(selector, match)(
					seed,
					context,
					documentIsXML,
					results,
					rsibling.test(selector)
				);
				return results;
			}

			// Deprecated
			Expr.pseudos["nth"] = Expr.pseudos["eq"];

			// Easy API for creating new setFilters
			function setFilters() {}
			Expr.filters = setFilters.prototype = Expr.pseudos;
			Expr.setFilters = new setFilters();

			// Initialize with the default document
			setDocument();

			// Override sizzle attribute retrieval
			Sizzle.attr = jQuery.attr;
			jQuery.find = Sizzle;
			jQuery.expr = Sizzle.selectors;
			jQuery.expr[":"] = jQuery.expr.pseudos;
			jQuery.unique = Sizzle.uniqueSort;
			jQuery.text = Sizzle.getText;
			jQuery.isXMLDoc = Sizzle.isXML;
			jQuery.contains = Sizzle.contains;


		})(window);
		var runtil = /Until$/,
			rparentsprev = /^(?:parents|prev(?:Until|All))/,
			isSimple = /^.[^:#\[\.,]*$/,
			rneedsContext = jQuery.expr.match.needsContext,
			// methods guaranteed to produce a unique set when starting from a unique set
			guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};

		jQuery.fn.extend({
			find: function(selector) {
				var i, ret, self,
					len = this.length;

				if (typeof selector !== "string") {
					self = this;
					return this.pushStack(jQuery(selector).filter(function() {
						for (i = 0; i < len; i++) {
							if (jQuery.contains(self[i], this)) {
								return true;
							}
						}
					}));
				}

				ret = [];
				for (i = 0; i < len; i++) {
					jQuery.find(selector, this[i], ret);
				}

				// Needed because $( selector, context ) becomes $( context ).find( selector )
				ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
				ret.selector = (this.selector ? this.selector + " " : "") + selector;
				return ret;
			},

			has: function(target) {
				var i,
					targets = jQuery(target, this),
					len = targets.length;

				return this.filter(function() {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(this, targets[i])) {
							return true;
						}
					}
				});
			},

			not: function(selector) {
				return this.pushStack(winnow(this, selector, false));
			},

			filter: function(selector) {
				return this.pushStack(winnow(this, selector, true));
			},

			is: function(selector) {
				return !!selector && (
					typeof selector === "string" ?
					// If this is a positional/relative selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					rneedsContext.test(selector) ?
					jQuery(selector, this.context).index(this[0]) >= 0 :
					jQuery.filter(selector, this).length > 0 :
					this.filter(selector).length > 0);
			},

			closest: function(selectors, context) {
				var cur,
					i = 0,
					l = this.length,
					ret = [],
					pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
					jQuery(selectors, context || this.context) :
					0;

				for (; i < l; i++) {
					cur = this[i];

					while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
						if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
							ret.push(cur);
							break;
						}
						cur = cur.parentNode;
					}
				}

				return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
			},

			// Determine the position of an element within
			// the matched set of elements
			index: function(elem) {

				// No argument, return index in parent
				if (!elem) {
					return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
				}

				// index in selector
				if (typeof elem === "string") {
					return jQuery.inArray(this[0], jQuery(elem));
				}

				// Locate the position of the desired element
				return jQuery.inArray(
					// If it receives a jQuery object, the first element is used
					elem.jquery ? elem[0] : elem, this);
			},

			add: function(selector, context) {
				var set = typeof selector === "string" ?
					jQuery(selector, context) :
					jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
					all = jQuery.merge(this.get(), set);

				return this.pushStack(jQuery.unique(all));
			},

			addBack: function(selector) {
				return this.add(selector == null ?
					this.prevObject : this.prevObject.filter(selector)
				);
			}
		});

		jQuery.fn.andSelf = jQuery.fn.addBack;

		function sibling(cur, dir) {
			do {
				cur = cur[dir];
			} while (cur && cur.nodeType !== 1);

			return cur;
		}

		jQuery.each({
			parent: function(elem) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function(elem) {
				return jQuery.dir(elem, "parentNode");
			},
			parentsUntil: function(elem, i, until) {
				return jQuery.dir(elem, "parentNode", until);
			},
			next: function(elem) {
				return sibling(elem, "nextSibling");
			},
			prev: function(elem) {
				return sibling(elem, "previousSibling");
			},
			nextAll: function(elem) {
				return jQuery.dir(elem, "nextSibling");
			},
			prevAll: function(elem) {
				return jQuery.dir(elem, "previousSibling");
			},
			nextUntil: function(elem, i, until) {
				return jQuery.dir(elem, "nextSibling", until);
			},
			prevUntil: function(elem, i, until) {
				return jQuery.dir(elem, "previousSibling", until);
			},
			siblings: function(elem) {
				return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
			},
			children: function(elem) {
				return jQuery.sibling(elem.firstChild);
			},
			contents: function(elem) {
				return jQuery.nodeName(elem, "iframe") ?
					elem.contentDocument || elem.contentWindow.document :
					jQuery.merge([], elem.childNodes);
			}
		}, function(name, fn) {
			jQuery.fn[name] = function(until, selector) {
				var ret = jQuery.map(this, fn, until);

				if (!runtil.test(name)) {
					selector = until;
				}

				if (selector && typeof selector === "string") {
					ret = jQuery.filter(selector, ret);
				}

				ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;

				if (this.length > 1 && rparentsprev.test(name)) {
					ret = ret.reverse();
				}

				return this.pushStack(ret);
			};
		});

		jQuery.extend({
			filter: function(expr, elems, not) {
				if (not) {
					expr = ":not(" + expr + ")";
				}

				return elems.length === 1 ?
					jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] :
					jQuery.find.matches(expr, elems);
			},

			dir: function(elem, dir, until) {
				var matched = [],
					cur = elem[dir];

				while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
					if (cur.nodeType === 1) {
						matched.push(cur);
					}
					cur = cur[dir];
				}
				return matched;
			},

			sibling: function(n, elem) {
				var r = [];

				for (; n; n = n.nextSibling) {
					if (n.nodeType === 1 && n !== elem) {
						r.push(n);
					}
				}

				return r;
			}
		});

		// Implement the identical functionality for filter and not
		function winnow(elements, qualifier, keep) {

			// Can't pass null or undefined to indexOf in Firefox 4
			// Set to 0 to skip string check
			qualifier = qualifier || 0;

			if (jQuery.isFunction(qualifier)) {
				return jQuery.grep(elements, function(elem, i) {
					var retVal = !!qualifier.call(elem, i, elem);
					return retVal === keep;
				});

			} else if (qualifier.nodeType) {
				return jQuery.grep(elements, function(elem) {
					return (elem === qualifier) === keep;
				});

			} else if (typeof qualifier === "string") {
				var filtered = jQuery.grep(elements, function(elem) {
					return elem.nodeType === 1;
				});

				if (isSimple.test(qualifier)) {
					return jQuery.filter(qualifier, filtered, !keep);
				} else {
					qualifier = jQuery.filter(qualifier, filtered);
				}
			}

			return jQuery.grep(elements, function(elem) {
				return (jQuery.inArray(elem, qualifier) >= 0) === keep;
			});
		}

		function createSafeFragment(document) {
			var list = nodeNames.split("|"),
				safeFrag = document.createDocumentFragment();

			if (safeFrag.createElement) {
				while (list.length) {
					safeFrag.createElement(
						list.pop()
					);
				}
			}
			return safeFrag;
		}

		var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
			rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
			rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
			rleadingWhitespace = /^\s+/,
			rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			rtagName = /<([\w:]+)/,
			rtbody = /<tbody/i,
			rhtml = /<|&#?\w+;/,
			rnoInnerhtml = /<(?:script|style|link)/i,
			manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
			// checked="checked" or checked
			rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			rscriptType = /^$|\/(?:java|ecma)script/i,
			rscriptTypeMasked = /^true\/(.*)/,
			rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

			// We have to close these tags to support XHTML (#13200)
			wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				area: [1, "<map>", "</map>"],
				param: [1, "<object>", "</object>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

				// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
				// unless wrapped in a div with non-breaking characters in front of it.
				_default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
			},
			safeFragment = createSafeFragment(document),
			fragmentDiv = safeFragment.appendChild(document.createElement("div"));

		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		jQuery.fn.extend({
			text: function(value) {
				return jQuery.access(this, function(value) {
					return value === undefined ?
						jQuery.text(this) :
						this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
				}, null, value, arguments.length);
			},

			wrapAll: function(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function(i) {
						jQuery(this).wrapAll(html.call(this, i));
					});
				}

				if (this[0]) {
					// The elements to wrap the target around
					var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

					if (this[0].parentNode) {
						wrap.insertBefore(this[0]);
					}

					wrap.map(function() {
						var elem = this;

						while (elem.firstChild && elem.firstChild.nodeType === 1) {
							elem = elem.firstChild;
						}

						return elem;
					}).append(this);
				}

				return this;
			},

			wrapInner: function(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function(i) {
						jQuery(this).wrapInner(html.call(this, i));
					});
				}

				return this.each(function() {
					var self = jQuery(this),
						contents = self.contents();

					if (contents.length) {
						contents.wrapAll(html);

					} else {
						self.append(html);
					}
				});
			},

			wrap: function(html) {
				var isFunction = jQuery.isFunction(html);

				return this.each(function(i) {
					jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
				});
			},

			unwrap: function() {
				return this.parent().each(function() {
					if (!jQuery.nodeName(this, "body")) {
						jQuery(this).replaceWith(this.childNodes);
					}
				}).end();
			},

			append: function() {
				return this.domManip(arguments, true, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.appendChild(elem);
					}
				});
			},

			prepend: function() {
				return this.domManip(arguments, true, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.insertBefore(elem, this.firstChild);
					}
				});
			},

			before: function() {
				return this.domManip(arguments, false, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this);
					}
				});
			},

			after: function() {
				return this.domManip(arguments, false, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this.nextSibling);
					}
				});
			},

			// keepData is for internal use only--do not document
			remove: function(selector, keepData) {
				var elem,
					i = 0;

				for (;
					(elem = this[i]) != null; i++) {
					if (!selector || jQuery.filter(selector, [elem]).length > 0) {
						if (!keepData && elem.nodeType === 1) {
							jQuery.cleanData(getAll(elem));
						}

						if (elem.parentNode) {
							if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
								setGlobalEval(getAll(elem, "script"));
							}
							elem.parentNode.removeChild(elem);
						}
					}
				}

				return this;
			},

			empty: function() {
				var elem,
					i = 0;

				for (;
					(elem = this[i]) != null; i++) {
					// Remove element nodes and prevent memory leaks
					if (elem.nodeType === 1) {
						jQuery.cleanData(getAll(elem, false));
					}

					// Remove any remaining nodes
					while (elem.firstChild) {
						elem.removeChild(elem.firstChild);
					}

					// If this is a select, ensure that it displays empty (#12336)
					// Support: IE<9
					if (elem.options && jQuery.nodeName(elem, "select")) {
						elem.options.length = 0;
					}
				}

				return this;
			},

			clone: function(dataAndEvents, deepDataAndEvents) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

				return this.map(function() {
					return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
				});
			},

			html: function(value) {
				return jQuery.access(this, function(value) {
					var elem = this[0] || {},
						i = 0,
						l = this.length;

					if (value === undefined) {
						return elem.nodeType === 1 ?
							elem.innerHTML.replace(rinlinejQuery, "") :
							undefined;
					}

					// See if we can take a shortcut and just use innerHTML
					if (typeof value === "string" && !rnoInnerhtml.test(value) &&
						(jQuery.support.htmlSerialize || !rnoshimcache.test(value)) &&
						(jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
						!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

						value = value.replace(rxhtmlTag, "<$1></$2>");

						try {
							for (; i < l; i++) {
								// Remove element nodes and prevent memory leaks
								elem = this[i] || {};
								if (elem.nodeType === 1) {
									jQuery.cleanData(getAll(elem, false));
									elem.innerHTML = value;
								}
							}

							elem = 0;

							// If using innerHTML throws an exception, use the fallback method
						} catch (e) {}
					}

					if (elem) {
						this.empty().append(value);
					}
				}, null, value, arguments.length);
			},

			replaceWith: function(value) {
				var isFunc = jQuery.isFunction(value);

				// Make sure that the elements are removed from the DOM before they are inserted
				// this can help fix replacing a parent with child elements
				if (!isFunc && typeof value !== "string") {
					value = jQuery(value).not(this).detach();
				}

				return this.domManip([value], true, function(elem) {
					var next = this.nextSibling,
						parent = this.parentNode;

					if (parent) {
						jQuery(this).remove();
						parent.insertBefore(elem, next);
					}
				});
			},

			detach: function(selector) {
				return this.remove(selector, true);
			},

			domManip: function(args, table, callback) {

				// Flatten any nested arrays
				args = core_concat.apply([], args);

				var first, node, hasScripts,
					scripts, doc, fragment,
					i = 0,
					l = this.length,
					set = this,
					iNoClone = l - 1,
					value = args[0],
					isFunction = jQuery.isFunction(value);

				// We can't cloneNode fragments that contain checked, in WebKit
				if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) {
					return this.each(function(index) {
						var self = set.eq(index);
						if (isFunction) {
							args[0] = value.call(this, index, table ? self.html() : undefined);
						}
						self.domManip(args, table, callback);
					});
				}

				if (l) {
					fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
					first = fragment.firstChild;

					if (fragment.childNodes.length === 1) {
						fragment = first;
					}

					if (first) {
						table = table && jQuery.nodeName(first, "tr");
						scripts = jQuery.map(getAll(fragment, "script"), disableScript);
						hasScripts = scripts.length;

						// Use the original fragment for the last item instead of the first because it can end up
						// being emptied incorrectly in certain situations (#8070).
						for (; i < l; i++) {
							node = fragment;

							if (i !== iNoClone) {
								node = jQuery.clone(node, true, true);

								// Keep references to cloned scripts for later restoration
								if (hasScripts) {
									jQuery.merge(scripts, getAll(node, "script"));
								}
							}

							callback.call(
								table && jQuery.nodeName(this[i], "table") ?
								findOrAppend(this[i], "tbody") :
								this[i],
								node,
								i
							);
						}

						if (hasScripts) {
							doc = scripts[scripts.length - 1].ownerDocument;

							// Reenable scripts
							jQuery.map(scripts, restoreScript);

							// Evaluate executable scripts on first document insertion
							for (i = 0; i < hasScripts; i++) {
								node = scripts[i];
								if (rscriptType.test(node.type || "") &&
									!jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

									if (node.src) {
										// Hope ajax is available...
										jQuery.ajax({
											url: node.src,
											type: "GET",
											dataType: "script",
											async: false,
											global: false,
											"throws": true
										});
									} else {
										jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
									}
								}
							}
						}

						// Fix #11809: Avoid leaking memory
						fragment = first = null;
					}
				}

				return this;
			}
		});

		function findOrAppend(elem, tag) {
			return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
		}

		// Replace/restore the type attribute of script elements for safe DOM manipulation
		function disableScript(elem) {
			var attr = elem.getAttributeNode("type");
			elem.type = (attr && attr.specified) + "/" + elem.type;
			return elem;
		}

		function restoreScript(elem) {
			var match = rscriptTypeMasked.exec(elem.type);
			if (match) {
				elem.type = match[1];
			} else {
				elem.removeAttribute("type");
			}
			return elem;
		}

		// Mark scripts as having already been evaluated
		function setGlobalEval(elems, refElements) {
			var elem,
				i = 0;
			for (;
				(elem = elems[i]) != null; i++) {
				jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
			}
		}

		function cloneCopyEvent(src, dest) {

			if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
				return;
			}

			var type, i, l,
				oldData = jQuery._data(src),
				curData = jQuery._data(dest, oldData),
				events = oldData.events;

			if (events) {
				delete curData.handle;
				curData.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}

			// make the cloned public data object a copy from the original
			if (curData.data) {
				curData.data = jQuery.extend({}, curData.data);
			}
		}

		function fixCloneNodeIssues(src, dest) {
			var nodeName, e, data;

			// We do not need to do anything for non-Elements
			if (dest.nodeType !== 1) {
				return;
			}

			nodeName = dest.nodeName.toLowerCase();

			// IE6-8 copies events bound via attachEvent when using cloneNode.
			if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
				data = jQuery._data(dest);

				for (e in data.events) {
					jQuery.removeEvent(dest, e, data.handle);
				}

				// Event data gets referenced instead of copied if the expando gets copied too
				dest.removeAttribute(jQuery.expando);
			}

			// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
			if (nodeName === "script" && dest.text !== src.text) {
				disableScript(dest).text = src.text;
				restoreScript(dest);

				// IE6-10 improperly clones children of object elements using classid.
				// IE10 throws NoModificationAllowedError if parent is null, #12132.
			} else if (nodeName === "object") {
				if (dest.parentNode) {
					dest.outerHTML = src.outerHTML;
				}

				// This path appears unavoidable for IE9. When cloning an object
				// element in IE9, the outerHTML strategy above is not sufficient.
				// If the src has innerHTML and the destination does not,
				// copy the src.innerHTML into the dest.innerHTML. #10324
				if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
					dest.innerHTML = src.innerHTML;
				}

			} else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
				// IE6-8 fails to persist the checked state of a cloned checkbox
				// or radio button. Worse, IE6-7 fail to give the cloned element
				// a checked appearance if the defaultChecked value isn't also set

				dest.defaultChecked = dest.checked = src.checked;

				// IE6-7 get confused and end up setting the value of a cloned
				// checkbox/radio button to an empty string instead of "on"
				if (dest.value !== src.value) {
					dest.value = src.value;
				}

				// IE6-8 fails to return the selected option to the default selected
				// state when cloning options
			} else if (nodeName === "option") {
				dest.defaultSelected = dest.selected = src.defaultSelected;

				// IE6-8 fails to set the defaultValue to the correct value when
				// cloning other types of input fields
			} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
		}

		jQuery.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(name, original) {
			jQuery.fn[name] = function(selector) {
				var elems,
					i = 0,
					ret = [],
					insert = jQuery(selector),
					last = insert.length - 1;

				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true);
					jQuery(insert[i])[original](elems);

					// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
					core_push.apply(ret, elems.get());
				}

				return this.pushStack(ret);
			};
		});

		function getAll(context, tag) {
			var elems, elem,
				i = 0,
				found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") :
				typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") :
				undefined;

			if (!found) {
				for (found = [], elems = context.childNodes || context;
					(elem = elems[i]) != null; i++) {
					if (!tag || jQuery.nodeName(elem, tag)) {
						found.push(elem);
					} else {
						jQuery.merge(found, getAll(elem, tag));
					}
				}
			}

			return tag === undefined || tag && jQuery.nodeName(context, tag) ?
				jQuery.merge([context], found) :
				found;
		}

		// Used in buildFragment, fixes the defaultChecked property
		function fixDefaultChecked(elem) {
			if (manipulation_rcheckableType.test(elem.type)) {
				elem.defaultChecked = elem.checked;
			}
		}

		jQuery.extend({
			clone: function(elem, dataAndEvents, deepDataAndEvents) {
				var destElements, node, clone, i, srcElements,
					inPage = jQuery.contains(elem.ownerDocument, elem);

				if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
					clone = elem.cloneNode(true);

					// IE<=8 does not properly clone detached, unknown element nodes
				} else {
					fragmentDiv.innerHTML = elem.outerHTML;
					fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
				}

				if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
					(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

					// We eschew Sizzle here for performance reasons: //jsperf.com/getall-vs-sizzle/2
					destElements = getAll(clone);
					srcElements = getAll(elem);

					// Fix all IE cloning issues
					for (i = 0;
						(node = srcElements[i]) != null; ++i) {
						// Ensure that the destination node is not null; Fixes #9587
						if (destElements[i]) {
							fixCloneNodeIssues(node, destElements[i]);
						}
					}
				}

				// Copy the events from the original to the clone
				if (dataAndEvents) {
					if (deepDataAndEvents) {
						srcElements = srcElements || getAll(elem);
						destElements = destElements || getAll(clone);

						for (i = 0;
							(node = srcElements[i]) != null; i++) {
							cloneCopyEvent(node, destElements[i]);
						}
					} else {
						cloneCopyEvent(elem, clone);
					}
				}

				// Preserve script evaluation history
				destElements = getAll(clone, "script");
				if (destElements.length > 0) {
					setGlobalEval(destElements, !inPage && getAll(elem, "script"));
				}

				destElements = srcElements = node = null;

				// Return the cloned set
				return clone;
			},

			buildFragment: function(elems, context, scripts, selection) {
				var j, elem, contains,
					tmp, tag, tbody, wrap,
					l = elems.length,

					// Ensure a safe fragment
					safe = createSafeFragment(context),

					nodes = [],
					i = 0;

				for (; i < l; i++) {
					elem = elems[i];

					if (elem || elem === 0) {

						// Add nodes directly
						if (jQuery.type(elem) === "object") {
							jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

							// Convert non-html into a text node
						} else if (!rhtml.test(elem)) {
							nodes.push(context.createTextNode(elem));

							// Convert html into DOM nodes
						} else {
							tmp = tmp || safe.appendChild(context.createElement("div"));

							// Deserialize a standard representation
							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;

							tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

							// Descend through wrappers to the right content
							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							// Manually add leading whitespace removed by IE
							if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
								nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
							}

							// Remove IE's autoinserted <tbody> from table fragments
							if (!jQuery.support.tbody) {

								// String was a <table>, *may* have spurious <tbody>
								elem = tag === "table" && !rtbody.test(elem) ?
									tmp.firstChild :

									// String was a bare <thead> or <tfoot>
									wrap[1] === "<table>" && !rtbody.test(elem) ?
									tmp :
									0;

								j = elem && elem.childNodes.length;
								while (j--) {
									if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
										elem.removeChild(tbody);
									}
								}
							}

							jQuery.merge(nodes, tmp.childNodes);

							// Fix #12392 for WebKit and IE > 9
							tmp.textContent = "";

							// Fix #12392 for oldIE
							while (tmp.firstChild) {
								tmp.removeChild(tmp.firstChild);
							}

							// Remember the top-level container for proper cleanup
							tmp = safe.lastChild;
						}
					}
				}

				// Fix #11356: Clear elements from fragment
				if (tmp) {
					safe.removeChild(tmp);
				}

				// Reset defaultChecked for any radios and checkboxes
				// about to be appended to the DOM in IE 6/7 (#8060)
				if (!jQuery.support.appendChecked) {
					jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
				}

				i = 0;
				while ((elem = nodes[i++])) {

					// #4087 - If origin and destination elements are the same, and this is
					// that element, do not do anything
					if (selection && jQuery.inArray(elem, selection) !== -1) {
						continue;
					}

					contains = jQuery.contains(elem.ownerDocument, elem);

					// Append to fragment
					tmp = getAll(safe.appendChild(elem), "script");

					// Preserve script evaluation history
					if (contains) {
						setGlobalEval(tmp);
					}

					// Capture executables
					if (scripts) {
						j = 0;
						while ((elem = tmp[j++])) {
							if (rscriptType.test(elem.type || "")) {
								scripts.push(elem);
							}
						}
					}
				}

				tmp = null;

				return safe;
			},

			cleanData: function(elems, /* internal */ acceptData) {
				var elem, type, id, data,
					i = 0,
					internalKey = jQuery.expando,
					cache = jQuery.cache,
					deleteExpando = jQuery.support.deleteExpando,
					special = jQuery.event.special;

				for (;
					(elem = elems[i]) != null; i++) {

					if (acceptData || jQuery.acceptData(elem)) {

						id = elem[internalKey];
						data = id && cache[id];

						if (data) {
							if (data.events) {
								for (type in data.events) {
									if (special[type]) {
										jQuery.event.remove(elem, type);

										// This is a shortcut to avoid jQuery.event.remove's overhead
									} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
								}
							}

							// Remove cache only if it was not already removed by jQuery.event.remove
							if (cache[id]) {

								delete cache[id];

								// IE does not allow us to delete expando properties from nodes,
								// nor does it have a removeAttribute function on Document nodes;
								// we must handle all of these cases
								if (deleteExpando) {
									delete elem[internalKey];

								} else if (typeof elem.removeAttribute !== core_strundefined) {
									elem.removeAttribute(internalKey);

								} else {
									elem[internalKey] = null;
								}

								core_deletedIds.push(id);
							}
						}
					}
				}
			}
		});
		var iframe, getStyles, curCSS,
			ralpha = /alpha\([^)]*\)/i,
			ropacity = /opacity\s*=\s*([^)]*)/,
			rposition = /^(top|right|bottom|left)$/,
			// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
			// see here for display values: //developer.mozilla.org/en-US/docs/CSS/display
			rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			rmargin = /^margin/,
			rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
			rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
			rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
			elemdisplay = {
				BODY: "block"
			},

			cssShow = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			cssNormalTransform = {
				letterSpacing: 0,
				fontWeight: 400
			},

			cssExpand = ["Top", "Right", "Bottom", "Left"],
			cssPrefixes = ["Webkit", "O", "Moz", "ms"];

		// return a css property mapped to a potentially vendor prefixed property
		function vendorPropName(style, name) {

			// shortcut for names that are not vendor prefixed
			if (name in style) {
				return name;
			}

			// check for vendor prefixed names
			var capName = name.charAt(0).toUpperCase() + name.slice(1),
				origName = name,
				i = cssPrefixes.length;

			while (i--) {
				name = cssPrefixes[i] + capName;
				if (name in style) {
					return name;
				}
			}

			return origName;
		}

		function isHidden(elem, el) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
		}

		function showHide(elements, show) {
			var display, elem, hidden,
				values = [],
				index = 0,
				length = elements.length;

			for (; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}

				values[index] = jQuery._data(elem, "olddisplay");
				display = elem.style.display;
				if (show) {
					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if (!values[index] && display === "none") {
						elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if (elem.style.display === "" && isHidden(elem)) {
						values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
					}
				} else {

					if (!values[index]) {
						hidden = isHidden(elem);

						if (display && display !== "none" || !hidden) {
							jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
						}
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for (index = 0; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}
				if (!show || elem.style.display === "none" || elem.style.display === "") {
					elem.style.display = show ? values[index] || "" : "none";
				}
			}

			return elements;
		}

		jQuery.fn.extend({
			css: function(name, value) {
				return jQuery.access(this, function(elem, name, value) {
					var len, styles,
						map = {},
						i = 0;

					if (jQuery.isArray(name)) {
						styles = getStyles(elem);
						len = name.length;

						for (; i < len; i++) {
							map[name[i]] = jQuery.css(elem, name[i], false, styles);
						}

						return map;
					}

					return value !== undefined ?
						jQuery.style(elem, name, value) :
						jQuery.css(elem, name);
				}, name, value, arguments.length > 1);
			},
			show: function() {
				return showHide(this, true);
			},
			hide: function() {
				return showHide(this);
			},
			toggle: function(state) {
				var bool = typeof state === "boolean";

				return this.each(function() {
					if (bool ? state : isHidden(this)) {
						jQuery(this).show();
					} else {
						jQuery(this).hide();
					}
				});
			}
		});

		jQuery.extend({
			// Add in style property hooks for overriding the default
			// behavior of getting and setting a style property
			cssHooks: {
				opacity: {
					get: function(elem, computed) {
						if (computed) {
							// We should always get a number back from opacity
							var ret = curCSS(elem, "opacity");
							return ret === "" ? "1" : ret;
						}
					}
				}
			},

			// Exclude the following css properties to add px
			cssNumber: {
				"columnCount": true,
				"fillOpacity": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},

			// Add in properties whose names you wish to fix before
			// setting or getting the value
			cssProps: {
				// normalize float css property
				"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
			},

			// Get and set the style property on a DOM Node
			style: function(elem, name, value, extra) {
				// Don't set styles on text and comment nodes
				if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
					return;
				}

				// Make sure that we're working with the right name
				var ret, type, hooks,
					origName = jQuery.camelCase(name),
					style = elem.style;

				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

				// gets hook for the prefixed version
				// followed by the unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// Check if we're setting a value
				if (value !== undefined) {
					type = typeof value;

					// convert relative number strings (+= or -=) to relative numbers. #7345
					if (type === "string" && (ret = rrelNum.exec(value))) {
						value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
						// Fixes bug #9237
						type = "number";
					}

					// Make sure that NaN and null values aren't set. See: #7116
					if (value == null || type === "number" && isNaN(value)) {
						return;
					}

					// If a number was passed in, add 'px' to the (except for certain CSS properties)
					if (type === "number" && !jQuery.cssNumber[origName]) {
						value += "px";
					}

					// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
					// but it would mean to define eight (for every problematic property) identical functions
					if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
						style[name] = "inherit";
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

						// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
						// Fixes bug #5509
						try {
							style[name] = value;
						} catch (e) {}
					}

				} else {
					// If a hook was provided get the non-computed value from there
					if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
						return ret;
					}

					// Otherwise just get the value from the style object
					return style[name];
				}
			},

			css: function(elem, name, extra, styles) {
				var num, val, hooks,
					origName = jQuery.camelCase(name);

				// Make sure that we're working with the right name
				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

				// gets hook for the prefixed version
				// followed by the unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// If a hook was provided get the computed value from there
				if (hooks && "get" in hooks) {
					val = hooks.get(elem, true, extra);
				}

				// Otherwise, if a way to get the computed value exists, use that
				if (val === undefined) {
					val = curCSS(elem, name, styles);
				}

				//convert "normal" to computed value
				if (val === "normal" && name in cssNormalTransform) {
					val = cssNormalTransform[name];
				}

				// Return, converting to number if forced or a qualifier was provided and val looks numeric
				if (extra === "" || extra) {
					num = parseFloat(val);
					return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
				}
				return val;
			},

			// A method for quickly swapping in/out CSS properties to get correct calculations
			swap: function(elem, options, callback, args) {
				var ret, name,
					old = {};

				// Remember the old values, and insert the new ones
				for (name in options) {
					old[name] = elem.style[name];
					elem.style[name] = options[name];
				}

				ret = callback.apply(elem, args || []);

				// Revert the old values
				for (name in options) {
					elem.style[name] = old[name];
				}

				return ret;
			}
		});

		// NOTE: we've included the "window" in window.getComputedStyle
		// because jsdom on node.js will break without it.
		if (window.getComputedStyle) {
			getStyles = function(elem) {
				return window.getComputedStyle(elem, null);
			};

			curCSS = function(elem, name, _computed) {
				var width, minWidth, maxWidth,
					computed = _computed || getStyles(elem),

					// getPropertyValue is only needed for .css('filter') in IE9, see #12537
					ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
					style = elem.style;

				if (computed) {

					if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
						ret = jQuery.style(elem, name);
					}

					// A tribute to the "awesome hack by Dean Edwards"
					// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
					// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
					// this is against the CSSOM draft spec: //dev.w3.org/csswg/cssom/#resolved-values
					if (rnumnonpx.test(ret) && rmargin.test(name)) {

						// Remember the original values
						width = style.width;
						minWidth = style.minWidth;
						maxWidth = style.maxWidth;

						// Put in the new values to get a computed value out
						style.minWidth = style.maxWidth = style.width = ret;
						ret = computed.width;

						// Revert the changed values
						style.width = width;
						style.minWidth = minWidth;
						style.maxWidth = maxWidth;
					}
				}

				return ret;
			};
		} else if (document.documentElement.currentStyle) {
			getStyles = function(elem) {
				return elem.currentStyle;
			};

			curCSS = function(elem, name, _computed) {
				var left, rs, rsLeft,
					computed = _computed || getStyles(elem),
					ret = computed ? computed[name] : undefined,
					style = elem.style;

				// Avoid setting ret to empty string here
				// so we don't default to auto
				if (ret == null && style && style[name]) {
					ret = style[name];
				}

				// From the awesome hack by Dean Edwards
				// //erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

				// If we're not dealing with a regular pixel number
				// but a number that has a weird ending, we need to convert it to pixels
				// but not position css attributes, as those are proportional to the parent element instead
				// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
				if (rnumnonpx.test(ret) && !rposition.test(name)) {

					// Remember the original values
					left = style.left;
					rs = elem.runtimeStyle;
					rsLeft = rs && rs.left;

					// Put in the new values to get a computed value out
					if (rsLeft) {
						rs.left = elem.currentStyle.left;
					}
					style.left = name === "fontSize" ? "1em" : ret;
					ret = style.pixelLeft + "px";

					// Revert the changed values
					style.left = left;
					if (rsLeft) {
						rs.left = rsLeft;
					}
				}

				return ret === "" ? "auto" : ret;
			};
		}

		function setPositiveNumber(elem, value, subtract) {
			var matches = rnumsplit.exec(value);
			return matches ?
				// Guard against undefined "subtract", e.g., when used as in cssHooks
				Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
				value;
		}

		function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
			var i = extra === (isBorderBox ? "border" : "content") ?
				// If we already have the right measurement, avoid augmentation
				4 :
				// Otherwise initialize for horizontal or vertical properties
				name === "width" ? 1 : 0,

				val = 0;

			for (; i < 4; i += 2) {
				// both box models exclude margin, so add it if we want it
				if (extra === "margin") {
					val += jQuery.css(elem, extra + cssExpand[i], true, styles);
				}

				if (isBorderBox) {
					// border-box includes padding, so remove it if we want content
					if (extra === "content") {
						val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
					}

					// at this point, extra isn't border nor margin, so remove border
					if (extra !== "margin") {
						val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				} else {
					// at this point, extra isn't content, so add padding
					val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

					// at this point, extra isn't content nor padding, so add border
					if (extra !== "padding") {
						val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				}
			}

			return val;
		}

		function getWidthOrHeight(elem, name, extra) {

			// Start with offset property, which is equivalent to the border-box value
			var valueIsBorderBox = true,
				val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
				styles = getStyles(elem),
				isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

			// some non-html elements return undefined for offsetWidth, so check for null/undefined
			// svg - //bugzilla.mozilla.org/show_bug.cgi?id=649285
			// MathML - //bugzilla.mozilla.org/show_bug.cgi?id=491668
			if (val <= 0 || val == null) {
				// Fall back to computed then uncomputed css if necessary
				val = curCSS(elem, name, styles);
				if (val < 0 || val == null) {
					val = elem.style[name];
				}

				// Computed unit is not pixels. Stop here and return.
				if (rnumnonpx.test(val)) {
					return val;
				}

				// we need the check for style in case a browser which returns unreliable values
				// for getComputedStyle silently falls back to the reliable elem.style
				valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);

				// Normalize "", auto, and prepare for extra
				val = parseFloat(val) || 0;
			}

			// use the active box-sizing model to add/subtract irrelevant styles
			return (val +
				augmentWidthOrHeight(
					elem,
					name,
					extra || (isBorderBox ? "border" : "content"),
					valueIsBorderBox,
					styles
				)
			) + "px";
		}

		// Try to determine the default display value of an element
		function css_defaultDisplay(nodeName) {
			var doc = document,
				display = elemdisplay[nodeName];

			if (!display) {
				display = actualDisplay(nodeName, doc);

				// If the simple way fails, read from inside an iframe
				if (display === "none" || !display) {
					// Use the already-created iframe if possible
					iframe = (iframe ||
						jQuery("<iframe frameborder='0' width='0' height='0'/>")
						.css("cssText", "display:block !important")
					).appendTo(doc.documentElement);

					// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
					doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
					doc.write("<!doctype html><html><body>");
					doc.close();

					display = actualDisplay(nodeName, doc);
					iframe.detach();
				}

				// Store the correct default display
				elemdisplay[nodeName] = display;
			}

			return display;
		}

		// Called ONLY from within css_defaultDisplay
		function actualDisplay(name, doc) {
			var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
				display = jQuery.css(elem[0], "display");
			elem.remove();
			return display;
		}

		jQuery.each(["height", "width"], function(i, name) {
			jQuery.cssHooks[name] = {
				get: function(elem, computed, extra) {
					if (computed) {
						// certain elements can have dimension info if we invisibly show them
						// however, it must have a current display style that would benefit from this
						return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ?
							jQuery.swap(elem, cssShow, function() {
								return getWidthOrHeight(elem, name, extra);
							}) :
							getWidthOrHeight(elem, name, extra);
					}
				},

				set: function(elem, value, extra) {
					var styles = extra && getStyles(elem);
					return setPositiveNumber(elem, value, extra ?
						augmentWidthOrHeight(
							elem,
							name,
							extra,
							jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
							styles
						) : 0
					);
				}
			};
		});

		if (!jQuery.support.opacity) {
			jQuery.cssHooks.opacity = {
				get: function(elem, computed) {
					// IE uses filters for opacity
					return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
						(0.01 * parseFloat(RegExp.$1)) + "" :
						computed ? "1" : "";
				},

				set: function(elem, value) {
					var style = elem.style,
						currentStyle = elem.currentStyle,
						opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
						filter = currentStyle && currentStyle.filter || style.filter || "";

					// IE has trouble with opacity if it does not have layout
					// Force it by setting the zoom level
					style.zoom = 1;

					// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
					// if value === "", then remove inline opacity #12685
					if ((value >= 1 || value === "") &&
						jQuery.trim(filter.replace(ralpha, "")) === "" &&
						style.removeAttribute) {

						// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
						// if "filter:" is present at all, clearType is disabled, we want to avoid this
						// style.removeAttribute is IE Only, but so apparently is this code path...
						style.removeAttribute("filter");

						// if there is no filter style applied in a css rule or unset inline opacity, we are done
						if (value === "" || currentStyle && !currentStyle.filter) {
							return;
						}
					}

					// otherwise, set new filter values
					style.filter = ralpha.test(filter) ?
						filter.replace(ralpha, opacity) :
						filter + " " + opacity;
				}
			};
		}

		// These hooks cannot be added until DOM ready because the support test
		// for it is not run until after DOM ready
		jQuery(function() {
			if (!jQuery.support.reliableMarginRight) {
				jQuery.cssHooks.marginRight = {
					get: function(elem, computed) {
						if (computed) {
							// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
							// Work around by temporarily setting element display to inline-block
							return jQuery.swap(elem, {
									"display": "inline-block"
								},
								curCSS, [elem, "marginRight"]);
						}
					}
				};
			}

			// Webkit bug: //bugs.webkit.org/show_bug.cgi?id=29084
			// getComputedStyle returns percent when specified for top/left/bottom/right
			// rather than make the css module depend on the offset module, we just check for it here
			if (!jQuery.support.pixelPosition && jQuery.fn.position) {
				jQuery.each(["top", "left"], function(i, prop) {
					jQuery.cssHooks[prop] = {
						get: function(elem, computed) {
							if (computed) {
								computed = curCSS(elem, prop);
								// if curCSS returns percentage, fallback to offset
								return rnumnonpx.test(computed) ?
									jQuery(elem).position()[prop] + "px" :
									computed;
							}
						}
					};
				});
			}

		});

		if (jQuery.expr && jQuery.expr.filters) {
			jQuery.expr.filters.hidden = function(elem) {
				// Support: Opera <= 12.12
				// Opera reports offsetWidths and offsetHeights less than zero on some elements
				return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
					(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
			};

			jQuery.expr.filters.visible = function(elem) {
				return !jQuery.expr.filters.hidden(elem);
			};
		}

		// These hooks are used by animate to expand properties
		jQuery.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(prefix, suffix) {
			jQuery.cssHooks[prefix + suffix] = {
				expand: function(value) {
					var i = 0,
						expanded = {},

						// assumes a single number if not a string
						parts = typeof value === "string" ? value.split(" ") : [value];

					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] =
							parts[i] || parts[i - 2] || parts[0];
					}

					return expanded;
				}
			};

			if (!rmargin.test(prefix)) {
				jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
			}
		});
		var r20 = /%20/g,
			rbracket = /\[\]$/,
			rCRLF = /\r?\n/g,
			rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
			rsubmittable = /^(?:input|select|textarea|keygen)/i;

		jQuery.fn.extend({
			serialize: function() {
				return jQuery.param(this.serializeArray());
			},
			serializeArray: function() {
				return this.map(function() {
						// Can add propHook for "elements" to filter or add form elements
						var elements = jQuery.prop(this, "elements");
						return elements ? jQuery.makeArray(elements) : this;
					})
					.filter(function() {
						var type = this.type;
						// Use .is(":disabled") so that fieldset[disabled] works
						return this.name && !jQuery(this).is(":disabled") &&
							rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
							(this.checked || !manipulation_rcheckableType.test(type));
					})
					.map(function(i, elem) {
						var val = jQuery(this).val();

						return val == null ?
							null :
							jQuery.isArray(val) ?
							jQuery.map(val, function(val) {
								return {
									name: elem.name,
									value: val.replace(rCRLF, "\r\n")
								};
							}) : {
								name: elem.name,
								value: val.replace(rCRLF, "\r\n")
							};
					}).get();
			}
		});

		//Serialize an array of form elements or a set of
		//key/values into a query string
		jQuery.param = function(a, traditional) {
			var prefix,
				s = [],
				add = function(key, value) {
					// If value is a function, invoke it and return its value
					value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
					s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
				};

			// Set traditional to true for jQuery <= 1.3.2 behavior.
			if (traditional === undefined) {
				traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
			}

			// If an array was passed in, assume that it is an array of form elements.
			if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
				// Serialize the form elements
				jQuery.each(a, function() {
					add(this.name, this.value);
				});

			} else {
				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for (prefix in a) {
					buildParams(prefix, a[prefix], traditional, add);
				}
			}

			// Return the resulting serialization
			return s.join("&").replace(r20, "+");
		};

		function buildParams(prefix, obj, traditional, add) {
			var name;

			if (jQuery.isArray(obj)) {
				// Serialize array item.
				jQuery.each(obj, function(i, v) {
					if (traditional || rbracket.test(prefix)) {
						// Treat each array item as a scalar.
						add(prefix, v);

					} else {
						// Item is non-scalar (array or object), encode its numeric index.
						buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
					}
				});

			} else if (!traditional && jQuery.type(obj) === "object") {
				// Serialize object item.
				for (name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
				}

			} else {
				// Serialize scalar item.
				add(prefix, obj);
			}
		}
		jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {

			// Handle event binding
			jQuery.fn[name] = function(data, fn) {
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name);
			};
		});

		jQuery.fn.hover = function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		};
		var
		// Document location
			ajaxLocParts,
			ajaxLocation,
			ajax_nonce = jQuery.now(),

			ajax_rquery = /\?/,
			rhash = /#.*$/,
			rts = /([?&])_=[^&]*/,
			rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
			// #7653, #8125, #8152: local protocol detection
			rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			rnoContent = /^(?:GET|HEAD)$/,
			rprotocol = /^\/\//,
			rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

			// Keep a copy of the old load method
			_load = jQuery.fn.load,

			/* Prefilters
			 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
			 * 2) These are called:
			 *    - BEFORE asking for a transport
			 *    - AFTER param serialization (s.data is a string if s.processData is true)
			 * 3) key is the dataType
			 * 4) the catchall symbol "*" can be used
			 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
			 */
			prefilters = {},

			/* Transports bindings
			 * 1) key is the dataType
			 * 2) the catchall symbol "*" can be used
			 * 3) selection will start with transport dataType and THEN go to "*" if needed
			 */
			transports = {},

			// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
			allTypes = "*/".concat("*");

		// #8138, IE may throw an exception when accessing
		// a field from window.location if document.domain has been set
		try {
			ajaxLocation = location.href;
		} catch (e) {
			// Use the href attribute of an A element
			// since IE will modify it given document.location
			ajaxLocation = document.createElement("a");
			ajaxLocation.href = "";
			ajaxLocation = ajaxLocation.href;
		}

		// Segment location into parts
		ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

		// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
		function addToPrefiltersOrTransports(structure) {

			// dataTypeExpression is optional and defaults to "*"
			return function(dataTypeExpression, func) {

				if (typeof dataTypeExpression !== "string") {
					func = dataTypeExpression;
					dataTypeExpression = "*";
				}

				var dataType,
					i = 0,
					dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];

				if (jQuery.isFunction(func)) {
					// For each dataType in the dataTypeExpression
					while ((dataType = dataTypes[i++])) {
						// Prepend if requested
						if (dataType[0] === "+") {
							dataType = dataType.slice(1) || "*";
							(structure[dataType] = structure[dataType] || []).unshift(func);

							// Otherwise append
						} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
					}
				}
			};
		}

		// Base inspection function for prefilters and transports
		function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

			var inspected = {},
				seekingTransport = (structure === transports);

			function inspect(dataType) {
				var selected;
				inspected[dataType] = true;
				jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
					var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
					if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
						options.dataTypes.unshift(dataTypeOrTransport);
						inspect(dataTypeOrTransport);
						return false;
					} else if (seekingTransport) {
						return !(selected = dataTypeOrTransport);
					}
				});
				return selected;
			}

			return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
		}

		// A special extend for ajax options
		// that takes "flat" options (not to be deep extended)
		// Fixes #9887
		function ajaxExtend(target, src) {
			var deep, key,
				flatOptions = jQuery.ajaxSettings.flatOptions || {};

			for (key in src) {
				if (src[key] !== undefined) {
					(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
				}
			}
			if (deep) {
				jQuery.extend(true, target, deep);
			}

			return target;
		}

		jQuery.fn.load = function(url, params, callback) {
			if (typeof url !== "string" && _load) {
				return _load.apply(this, arguments);
			}

			var selector, response, type,
				self = this,
				off = url.indexOf(" ");

			if (off >= 0) {
				selector = url.slice(off, url.length);
				url = url.slice(0, off);
			}

			// If it's a function
			if (jQuery.isFunction(params)) {

				// We assume that it's the callback
				callback = params;
				params = undefined;

				// Otherwise, build a param string
			} else if (params && typeof params === "object") {
				type = "POST";
			}

			// If we have elements to modify, make the request
			if (self.length > 0) {
				jQuery.ajax({
					url: url,

					// if "type" variable is undefined, then "GET" method will be used
					type: type,
					dataType: "html",
					data: params
				}).done(function(responseText) {

					// Save response for use in complete callback
					response = arguments;

					self.html(selector ?

						// If a selector was specified, locate the right elements in a dummy div
						// Exclude scripts to avoid IE 'Permission Denied' errors
						jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

						// Otherwise use the full result
						responseText);

				}).complete(callback && function(jqXHR, status) {
					self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
				});
			}

			return this;
		};

		// Attach a bunch of functions for handling common AJAX events
		jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
			jQuery.fn[type] = function(fn) {
				return this.on(type, fn);
			};
		});

		jQuery.each(["get", "post"], function(i, method) {
			jQuery[method] = function(url, data, callback, type) {
				// shift arguments if data argument was omitted
				if (jQuery.isFunction(data)) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				return jQuery.ajax({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				});
			};
		});

		jQuery.extend({

			// Counter for holding the number of active queries
			active: 0,

			// Last-Modified header cache for next request
			lastModified: {},
			etag: {},

			ajaxSettings: {
				url: ajaxLocation,
				type: "GET",
				isLocal: rlocalProtocol.test(ajaxLocParts[1]),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				/*
				timeout: 0,
				data: null,
				dataType: null,
				username: null,
				password: null,
				cache: null,
				throws: false,
				traditional: false,
				headers: {},
				*/

				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},

				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},

				responseFields: {
					xml: "responseXML",
					text: "responseText"
				},

				// Data converters
				// Keys separate source (or catchall "*") and destination types with a single space
				converters: {

					// Convert anything to text
					"* text": window.String,

					// Text to html (true = no transformation)
					"text html": true,

					// Evaluate text as a json expression
					"text json": jQuery.parseJSON,

					// Parse text as xml
					"text xml": jQuery.parseXML
				},

				// For options that shouldn't be deep extended:
				// you can add your own custom options here if
				// and when you create one that shouldn't be
				// deep extended (see ajaxExtend)
				flatOptions: {
					url: true,
					context: true
				}
			},

			// Creates a full fledged settings object into target
			// with both ajaxSettings and settings fields.
			// If target is omitted, writes into ajaxSettings.
			ajaxSetup: function(target, settings) {
				return settings ?

					// Building a settings object
					ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

					// Extending ajaxSettings
					ajaxExtend(jQuery.ajaxSettings, target);
			},

			ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
			ajaxTransport: addToPrefiltersOrTransports(transports),

			// Main method
			ajax: function(url, options) {

				// If url is an object, simulate pre-1.5 signature
				if (typeof url === "object") {
					options = url;
					url = undefined;
				}

				// Force options to be an object
				options = options || {};

				var // Cross-domain detection vars
					parts,
					// Loop variable
					i,
					// URL without anti-cache param
					cacheURL,
					// Response headers as string
					responseHeadersString,
					// timeout handle
					timeoutTimer,

					// To know if global events are to be dispatched
					fireGlobals,

					transport,
					// Response headers
					responseHeaders,
					// Create the final options object
					s = jQuery.ajaxSetup({}, options),
					// Callbacks context
					callbackContext = s.context || s,
					// Context for global events is callbackContext if it is a DOM node or jQuery collection
					globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
					jQuery(callbackContext) :
					jQuery.event,
					// Deferreds
					deferred = jQuery.Deferred(),
					completeDeferred = jQuery.Callbacks("once memory"),
					// Status-dependent callbacks
					statusCode = s.statusCode || {},
					// Headers (they are sent all at once)
					requestHeaders = {},
					requestHeadersNames = {},
					// The jqXHR state
					state = 0,
					// Default abort message
					strAbort = "canceled",
					// Fake xhr
					jqXHR = {
						readyState: 0,

						// Builds headers hashtable if needed
						getResponseHeader: function(key) {
							var match;
							if (state === 2) {
								if (!responseHeaders) {
									responseHeaders = {};
									while ((match = rheaders.exec(responseHeadersString))) {
										responseHeaders[match[1].toLowerCase()] = match[2];
									}
								}
								match = responseHeaders[key.toLowerCase()];
							}
							return match == null ? null : match;
						},

						// Raw string
						getAllResponseHeaders: function() {
							return state === 2 ? responseHeadersString : null;
						},

						// Caches the header
						setRequestHeader: function(name, value) {
							var lname = name.toLowerCase();
							if (!state) {
								name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
								requestHeaders[name] = value;
							}
							return this;
						},

						// Overrides response content-type header
						overrideMimeType: function(type) {
							if (!state) {
								s.mimeType = type;
							}
							return this;
						},

						// Status-dependent callbacks
						statusCode: function(map) {
							var code;
							if (map) {
								if (state < 2) {
									for (code in map) {
										// Lazy-add the new callback in a way that preserves old ones
										statusCode[code] = [statusCode[code], map[code]];
									}
								} else {
									// Execute the appropriate callbacks
									jqXHR.always(map[jqXHR.status]);
								}
							}
							return this;
						},

						// Cancel the request
						abort: function(statusText) {
							var finalText = statusText || strAbort;
							if (transport) {
								transport.abort(finalText);
							}
							done(0, finalText);
							return this;
						}
					};

				// Attach deferreds
				deferred.promise(jqXHR).complete = completeDeferred.add;
				jqXHR.success = jqXHR.done;
				jqXHR.error = jqXHR.fail;

				// Remove hash character (#7531: and string promotion)
				// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
				// Handle falsy url in the settings object (#10093: consistency with old signature)
				// We also use the url parameter if available
				s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

				// Alias method option to type as per ticket #12004
				s.type = options.method || options.type || s.method || s.type;

				// Extract dataTypes list
				s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];

				// A cross-domain request is in order when we have a protocol:host:port mismatch
				if (s.crossDomain == null) {
					parts = rurl.exec(s.url.toLowerCase());
					s.crossDomain = !!(parts &&
						(parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
							(parts[3] || (parts[1] === "http:" ? 80 : 443)) !=
							(ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443)))
					);
				}

				// Convert data if not already a string
				if (s.data && s.processData && typeof s.data !== "string") {
					s.data = jQuery.param(s.data, s.traditional);
				}

				// Apply prefilters
				inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

				// If request was aborted inside a prefilter, stop there
				if (state === 2) {
					return jqXHR;
				}

				// We can fire global events as of now if asked to
				fireGlobals = s.global;

				// Watch for a new set of requests
				if (fireGlobals && jQuery.active++ === 0) {
					jQuery.event.trigger("ajaxStart");
				}

				// Uppercase the type
				s.type = s.type.toUpperCase();

				// Determine if request has content
				s.hasContent = !rnoContent.test(s.type);

				// Save the URL in case we're toying with the If-Modified-Since
				// and/or If-None-Match header later on
				cacheURL = s.url;

				// More options handling for requests with no content
				if (!s.hasContent) {

					// If data is available, append data to url
					if (s.data) {
						cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
						// #9682: remove data so that it's not used in an eventual retry
						delete s.data;
					}

					// Add anti-cache in url if needed
					if (s.cache === false) {
						s.url = rts.test(cacheURL) ?

							// If there is already a '_' parameter, set its value
							cacheURL.replace(rts, "$1_=" + ajax_nonce++) :

							// Otherwise add one to the end
							cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
					}
				}

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if (s.ifModified) {
					if (jQuery.lastModified[cacheURL]) {
						jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
					}
					if (jQuery.etag[cacheURL]) {
						jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
					}
				}

				// Set the correct header, if data is being sent
				if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
					jqXHR.setRequestHeader("Content-Type", s.contentType);
				}

				// Set the Accepts header for the server, depending on the dataType
				jqXHR.setRequestHeader(
					"Accept",
					s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
					s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
					s.accepts["*"]
				);

				// Check for headers option
				for (i in s.headers) {
					jqXHR.setRequestHeader(i, s.headers[i]);
				}

				// Allow custom headers/mimetypes and early abort
				if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
					// Abort if not done already and return
					return jqXHR.abort();
				}

				// aborting is no longer a cancellation
				strAbort = "abort";

				// Install callbacks on deferreds
				for (i in {
						success: 1,
						error: 1,
						complete: 1
					}) {
					jqXHR[i](s[i]);
				}

				// Get transport
				transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

				// If no transport, we auto-abort
				if (!transport) {
					done(-1, "No Transport");
				} else {
					jqXHR.readyState = 1;

					// Send global event
					if (fireGlobals) {
						globalEventContext.trigger("ajaxSend", [jqXHR, s]);
					}
					// Timeout
					if (s.async && s.timeout > 0) {
						timeoutTimer = setTimeout(function() {
							jqXHR.abort("timeout");
						}, s.timeout);
					}

					try {
						state = 1;
						transport.send(requestHeaders, done);
					} catch (e) {
						// Propagate exception as error if not done
						if (state < 2) {
							done(-1, e);
							// Simply rethrow otherwise
						} else {
							throw e;
						}
					}
				}

				// Callback for when everything is done
				function done(status, nativeStatusText, responses, headers) {
					var isSuccess, success, error, response, modified,
						statusText = nativeStatusText;

					// Called once
					if (state === 2) {
						return;
					}

					// State is "done" now
					state = 2;

					// Clear timeout if it exists
					if (timeoutTimer) {
						clearTimeout(timeoutTimer);
					}

					// Dereference transport for early garbage collection
					// (no matter how long the jqXHR object will be used)
					transport = undefined;

					// Cache response headers
					responseHeadersString = headers || "";

					// Set readyState
					jqXHR.readyState = status > 0 ? 4 : 0;

					// Get response data
					if (responses) {
						response = ajaxHandleResponses(s, jqXHR, responses);
					}

					// If successful, handle type chaining
					if (status >= 200 && status < 300 || status === 304) {

						// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
						if (s.ifModified) {
							modified = jqXHR.getResponseHeader("Last-Modified");
							if (modified) {
								jQuery.lastModified[cacheURL] = modified;
							}
							modified = jqXHR.getResponseHeader("etag");
							if (modified) {
								jQuery.etag[cacheURL] = modified;
							}
						}

						// if no content
						if (status === 204) {
							isSuccess = true;
							statusText = "nocontent";

							// if not modified
						} else if (status === 304) {
							isSuccess = true;
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
							isSuccess = ajaxConvert(s, response);
							statusText = isSuccess.state;
							success = isSuccess.data;
							error = isSuccess.error;
							isSuccess = !error;
						}
					} else {
						// We extract error from statusText
						// then normalize statusText and status for non-aborts
						error = statusText;
						if (status || !statusText) {
							statusText = "error";
							if (status < 0) {
								status = 0;
							}
						}
					}

					// Set data for the fake xhr object
					jqXHR.status = status;
					jqXHR.statusText = (nativeStatusText || statusText) + "";

					// Success/Error
					if (isSuccess) {
						deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
					} else {
						deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
					}

					// Status-dependent callbacks
					jqXHR.statusCode(statusCode);
					statusCode = undefined;

					if (fireGlobals) {
						globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
					}

					// Complete
					completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

					if (fireGlobals) {
						globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
						// Handle the global AJAX counter
						if (!(--jQuery.active)) {
							jQuery.event.trigger("ajaxStop");
						}
					}
				}

				return jqXHR;
			},

			getScript: function(url, callback) {
				return jQuery.get(url, undefined, callback, "script");
			},

			getJSON: function(url, data, callback) {
				return jQuery.get(url, data, callback, "json");
			}
		});

		/* Handles responses to an ajax request:
		 * - sets all responseXXX fields accordingly
		 * - finds the right dataType (mediates between content-type and expected dataType)
		 * - returns the corresponding response
		 */
		function ajaxHandleResponses(s, jqXHR, responses) {
			var firstDataType, ct, finalDataType, type,
				contents = s.contents,
				dataTypes = s.dataTypes,
				responseFields = s.responseFields;

			// Fill responseXXX fields
			for (type in responseFields) {
				if (type in responses) {
					jqXHR[responseFields[type]] = responses[type];
				}
			}

			// Remove auto dataType and get content-type in the process
			while (dataTypes[0] === "*") {
				dataTypes.shift();
				if (ct === undefined) {
					ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
				}
			}

			// Check if we're dealing with a known content-type
			if (ct) {
				for (type in contents) {
					if (contents[type] && contents[type].test(ct)) {
						dataTypes.unshift(type);
						break;
					}
				}
			}

			// Check to see if we have a response for the expected dataType
			if (dataTypes[0] in responses) {
				finalDataType = dataTypes[0];
			} else {
				// Try convertible dataTypes
				for (type in responses) {
					if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
						finalDataType = type;
						break;
					}
					if (!firstDataType) {
						firstDataType = type;
					}
				}
				// Or just use first one
				finalDataType = finalDataType || firstDataType;
			}

			// If we found a dataType
			// We add the dataType to the list if needed
			// and return the corresponding response
			if (finalDataType) {
				if (finalDataType !== dataTypes[0]) {
					dataTypes.unshift(finalDataType);
				}
				return responses[finalDataType];
			}
		}

		// Chain conversions given the request and the original response
		function ajaxConvert(s, response) {
			var conv2, current, conv, tmp,
				converters = {},
				i = 0,
				// Work with a copy of dataTypes in case we need to modify it for conversion
				dataTypes = s.dataTypes.slice(),
				prev = dataTypes[0];

			// Apply the dataFilter if provided
			if (s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			// Create converters map with lowercased keys
			if (dataTypes[1]) {
				for (conv in s.converters) {
					converters[conv.toLowerCase()] = s.converters[conv];
				}
			}

			// Convert to each sequential dataType, tolerating list modification
			for (;
				(current = dataTypes[++i]);) {

				// There's only work to do if current dataType is non-auto
				if (current !== "*") {

					// Convert response if prev dataType is non-auto and differs from current
					if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] ||
										converters["* " + tmp[0]];
									if (conv) {
										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
											current = tmp[0];
											dataTypes.splice(i--, 0, current);
										}

										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s["throws"]) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}

					// Update prev for next iteration
					prev = current;
				}
			}

			return {
				state: "success",
				data: response
			};
		}
		// Install script dataType
		jQuery.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /(?:java|ecma)script/
			},
			converters: {
				"text script": function(text) {
					jQuery.globalEval(text);
					return text;
				}
			}
		});

		// Handle cache's special case and global
		jQuery.ajaxPrefilter("script", function(s) {
			if (s.cache === undefined) {
				s.cache = false;
			}
			if (s.crossDomain) {
				s.type = "GET";
				s.global = false;
			}
		});

		// Bind script tag hack transport
		jQuery.ajaxTransport("script", function(s) {

			// This transport only deals with cross domain requests
			if (s.crossDomain) {

				var script,
					head = document.head || jQuery("head")[0] || document.documentElement;

				return {

					send: function(_, callback) {

						script = document.createElement("script");

						script.async = true;

						if (s.scriptCharset) {
							script.charset = s.scriptCharset;
						}

						script.src = s.url;

						// Attach handlers for all browsers
						script.onload = script.onreadystatechange = function(_, isAbort) {

							if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

								// Handle memory leak in IE
								script.onload = script.onreadystatechange = null;

								// Remove the script
								if (script.parentNode) {
									script.parentNode.removeChild(script);
								}

								// Dereference the script
								script = null;

								// Callback if not abort
								if (!isAbort) {
									callback(200, "success");
								}
							}
						};

						// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
						// Use native DOM manipulation to avoid our domManip AJAX trickery
						head.insertBefore(script, head.firstChild);
					},

					abort: function() {
						if (script) {
							script.onload(undefined, true);
						}
					}
				};
			}
		});
		var oldCallbacks = [],
			rjsonp = /(=)\?(?=&|$)|\?\?/;

		// Default jsonp settings
		jQuery.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
				this[callback] = true;
				return callback;
			}
		});

		// Detect, normalize options and install callbacks for jsonp requests
		jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

			var callbackName, overwritten, responseContainer,
				jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
					"url" :
					typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
				);

			// Handle iff the expected data type is "jsonp" or we have a parameter to set
			if (jsonProp || s.dataTypes[0] === "jsonp") {

				// Get callback name, remembering preexisting value associated with it
				callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
					s.jsonpCallback() :
					s.jsonpCallback;

				// Insert callback into url or form data
				if (jsonProp) {
					s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
				} else if (s.jsonp !== false) {
					s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
				}

				// Use data converter to retrieve json after script execution
				s.converters["script json"] = function() {
					if (!responseContainer) {
						jQuery.error(callbackName + " was not called");
					}
					return responseContainer[0];
				};

				// force json dataType
				s.dataTypes[0] = "json";

				// Install callback
				overwritten = window[callbackName];
				window[callbackName] = function() {
					responseContainer = arguments;
				};

				// Clean-up function (fires after converters)
				jqXHR.always(function() {
					// Restore preexisting value
					window[callbackName] = overwritten;

					// Save back as free
					if (s[callbackName]) {
						// make sure that re-using the options doesn't screw things around
						s.jsonpCallback = originalSettings.jsonpCallback;

						// save the callback name for future use
						oldCallbacks.push(callbackName);
					}

					// Call if it was a function and we have a response
					if (responseContainer && jQuery.isFunction(overwritten)) {
						overwritten(responseContainer[0]);
					}

					responseContainer = overwritten = undefined;
				});

				// Delegate to script
				return "script";
			}
		});
		var xhrCallbacks, xhrSupported,
			xhrId = 0,
			// #5280: Internet Explorer will keep connections alive if we don't abort on unload
			xhrOnUnloadAbort = window.ActiveXObject && function() {
				// Abort all pending requests
				var key;
				for (key in xhrCallbacks) {
					xhrCallbacks[key](undefined, true);
				}
			};

		// Functions to create xhrs
		function createStandardXHR() {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {}
		}

		function createActiveXHR() {
			try {
				return new window.ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}

		// Create the request object
		// (This is still attached to ajaxSettings for backward compatibility)
		jQuery.ajaxSettings.xhr = window.ActiveXObject ?
			/* Microsoft failed to properly
			 * implement the XMLHttpRequest in IE7 (can't request local files),
			 * so we use the ActiveXObject when it is available
			 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
			 * we need a fallback.
			 */
			function() {
				return !this.isLocal && createStandardXHR() || createActiveXHR();
			} :
			// For all other browsers, use the standard XMLHttpRequest object
			createStandardXHR;

		// Determine support properties
		xhrSupported = jQuery.ajaxSettings.xhr();
		jQuery.support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
		xhrSupported = jQuery.support.ajax = !!xhrSupported;

		// Create transport if the browser can provide an xhr
		if (xhrSupported) {

			jQuery.ajaxTransport(function(s) {
				// Cross domain only allowed if supported through XMLHttpRequest
				if (!s.crossDomain || jQuery.support.cors) {

					var callback;

					return {
						send: function(headers, complete) {

							// Get a new xhr
							var handle, i,
								xhr = s.xhr();

							// Open the socket
							// Passing null username, generates a login popup on Opera (#2865)
							if (s.username) {
								xhr.open(s.type, s.url, s.async, s.username, s.password);
							} else {
								xhr.open(s.type, s.url, s.async);
							}

							// Apply custom fields if provided
							if (s.xhrFields) {
								for (i in s.xhrFields) {
									xhr[i] = s.xhrFields[i];
								}
							}

							// Override mime type if needed
							if (s.mimeType && xhr.overrideMimeType) {
								xhr.overrideMimeType(s.mimeType);
							}

							// X-Requested-With header
							// For cross-domain requests, seeing as conditions for a preflight are
							// akin to a jigsaw puzzle, we simply never set it to be sure.
							// (it can always be set on a per-request basis or even using ajaxSetup)
							// For same-domain requests, won't change header if already provided.
							if (!s.crossDomain && !headers["X-Requested-With"]) {
								headers["X-Requested-With"] = "XMLHttpRequest";
							}

							// Need an extra try/catch for cross domain requests in Firefox 3
							try {
								for (i in headers) {
									xhr.setRequestHeader(i, headers[i]);
								}
							} catch (err) {}

							// Do send the request
							// This may raise an exception which is actually
							// handled in jQuery.ajax (so no try/catch here)
							xhr.send((s.hasContent && s.data) || null);

							// Listener
							callback = function(_, isAbort) {
								var status, responseHeaders, statusText, responses;

								// Firefox throws exceptions when accessing properties
								// of an xhr when a network error occurred
								// //helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
								try {

									// Was never called and is aborted or complete
									if (callback && (isAbort || xhr.readyState === 4)) {

										// Only called once
										callback = undefined;

										// Do not keep as active anymore
										if (handle) {
											xhr.onreadystatechange = jQuery.noop;
											if (xhrOnUnloadAbort) {
												delete xhrCallbacks[handle];
											}
										}

										// If it's an abort
										if (isAbort) {
											// Abort it manually if needed
											if (xhr.readyState !== 4) {
												xhr.abort();
											}
										} else {
											responses = {};
											status = xhr.status;
											responseHeaders = xhr.getAllResponseHeaders();

											// When requesting binary data, IE6-9 will throw an exception
											// on any attempt to access responseText (#11426)
											if (typeof xhr.responseText === "string") {
												responses.text = xhr.responseText;
											}

											// Firefox throws an exception when accessing
											// statusText for faulty cross-domain requests
											try {
												statusText = xhr.statusText;
											} catch (e) {
												// We normalize with Webkit giving an empty statusText
												statusText = "";
											}

											// Filter status for non standard behaviors

											// If the request is local and we have data: assume a success
											// (success with no data won't get notified, that's the best we
											// can do given current implementations)
											if (!status && s.isLocal && !s.crossDomain) {
												status = responses.text ? 200 : 404;
												// IE - #1450: sometimes returns 1223 when it should be 204
											} else if (status === 1223) {
												status = 204;
											}
										}
									}
								} catch (firefoxAccessException) {
									if (!isAbort) {
										complete(-1, firefoxAccessException);
									}
								}

								// Call complete if needed
								if (responses) {
									complete(status, statusText, responses, responseHeaders);
								}
							};

							if (!s.async) {
								// if we're in sync mode we fire the callback
								callback();
							} else if (xhr.readyState === 4) {
								// (IE6 & IE7) if it's in cache and has been
								// retrieved directly we need to fire the callback
								setTimeout(callback);
							} else {
								handle = ++xhrId;
								if (xhrOnUnloadAbort) {
									// Create the active xhrs callbacks list if needed
									// and attach the unload handler
									if (!xhrCallbacks) {
										xhrCallbacks = {};
										jQuery(window).unload(xhrOnUnloadAbort);
									}
									// Add to list of active xhrs callbacks
									xhrCallbacks[handle] = callback;
								}
								xhr.onreadystatechange = callback;
							}
						},

						abort: function() {
							if (callback) {
								callback(undefined, true);
							}
						}
					};
				}
			});
		}
		var fxNow, timerId,
			rfxtypes = /^(?:toggle|show|hide)$/,
			rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
			rrun = /queueHooks$/,
			animationPrefilters = [defaultPrefilter],
			tweeners = {
				"*": [function(prop, value) {
					var end, unit,
						tween = this.createTween(prop, value),
						parts = rfxnum.exec(value),
						target = tween.cur(),
						start = +target || 0,
						scale = 1,
						maxIterations = 20;

					if (parts) {
						end = +parts[2];
						unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");

						// We need to compute starting value
						if (unit !== "px" && start) {
							// Iteratively approximate from a nonzero starting point
							// Prefer the current property, because this process will be trivial if it uses the same units
							// Fallback to end or a simple constant
							start = jQuery.css(tween.elem, prop, true) || end || 1;

							do {
								// If previous iteration zeroed out, double until we get *something*
								// Use a string for doubling factor so we don't accidentally see scale as unchanged below
								scale = scale || ".5";

								// Adjust and apply
								start = start / scale;
								jQuery.style(tween.elem, prop, start + unit);

								// Update scale, tolerating zero or NaN from tween.cur()
								// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
							} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
						}

						tween.unit = unit;
						tween.start = start;
						// If a +=/-= token was provided, we're doing a relative animation
						tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
					}
					return tween;
				}]
			};

		// Animations created synchronously will run synchronously
		function createFxNow() {
			setTimeout(function() {
				fxNow = undefined;
			});
			return (fxNow = jQuery.now());
		}

		function createTweens(animation, props) {
			jQuery.each(props, function(prop, value) {
				var collection = (tweeners[prop] || []).concat(tweeners["*"]),
					index = 0,
					length = collection.length;
				for (; index < length; index++) {
					if (collection[index].call(animation, prop, value)) {

						// we're done with this property
						return;
					}
				}
			});
		}

		function Animation(elem, properties, options) {
			var result,
				stopped,
				index = 0,
				length = animationPrefilters.length,
				deferred = jQuery.Deferred().always(function() {
					// don't match elem in the :animated selector
					delete tick.elem;
				}),
				tick = function() {
					if (stopped) {
						return false;
					}
					var currentTime = fxNow || createFxNow(),
						remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
						// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
						temp = remaining / animation.duration || 0,
						percent = 1 - temp,
						index = 0,
						length = animation.tweens.length;

					for (; index < length; index++) {
						animation.tweens[index].run(percent);
					}

					deferred.notifyWith(elem, [animation, percent, remaining]);

					if (percent < 1 && length) {
						return remaining;
					} else {
						deferred.resolveWith(elem, [animation]);
						return false;
					}
				},
				animation = deferred.promise({
					elem: elem,
					props: jQuery.extend({}, properties),
					opts: jQuery.extend(true, {
						specialEasing: {}
					}, options),
					originalProperties: properties,
					originalOptions: options,
					startTime: fxNow || createFxNow(),
					duration: options.duration,
					tweens: [],
					createTween: function(prop, end) {
						var tween = jQuery.Tween(elem, animation.opts, prop, end,
							animation.opts.specialEasing[prop] || animation.opts.easing);
						animation.tweens.push(tween);
						return tween;
					},
					stop: function(gotoEnd) {
						var index = 0,
							// if we are going to the end, we want to run all the tweens
							// otherwise we skip this part
							length = gotoEnd ? animation.tweens.length : 0;
						if (stopped) {
							return this;
						}
						stopped = true;
						for (; index < length; index++) {
							animation.tweens[index].run(1);
						}

						// resolve when we played the last frame
						// otherwise, reject
						if (gotoEnd) {
							deferred.resolveWith(elem, [animation, gotoEnd]);
						} else {
							deferred.rejectWith(elem, [animation, gotoEnd]);
						}
						return this;
					}
				}),
				props = animation.props;

			propFilter(props, animation.opts.specialEasing);

			for (; index < length; index++) {
				result = animationPrefilters[index].call(animation, elem, props, animation.opts);
				if (result) {
					return result;
				}
			}

			createTweens(animation, props);

			if (jQuery.isFunction(animation.opts.start)) {
				animation.opts.start.call(elem, animation);
			}

			jQuery.fx.timer(
				jQuery.extend(tick, {
					elem: elem,
					anim: animation,
					queue: animation.opts.queue
				})
			);

			// attach callbacks from options
			return animation.progress(animation.opts.progress)
				.done(animation.opts.done, animation.opts.complete)
				.fail(animation.opts.fail)
				.always(animation.opts.always);
		}

		function propFilter(props, specialEasing) {
			var value, name, index, easing, hooks;

			// camelCase, specialEasing and expand cssHook pass
			for (index in props) {
				name = jQuery.camelCase(index);
				easing = specialEasing[name];
				value = props[index];
				if (jQuery.isArray(value)) {
					easing = value[1];
					value = props[index] = value[0];
				}

				if (index !== name) {
					props[name] = value;
					delete props[index];
				}

				hooks = jQuery.cssHooks[name];
				if (hooks && "expand" in hooks) {
					value = hooks.expand(value);
					delete props[name];

					// not quite $.extend, this wont overwrite keys already present.
					// also - reusing 'index' from above because we have the correct "name"
					for (index in value) {
						if (!(index in props)) {
							props[index] = value[index];
							specialEasing[index] = easing;
						}
					}
				} else {
					specialEasing[name] = easing;
				}
			}
		}

		jQuery.Animation = jQuery.extend(Animation, {

			tweener: function(props, callback) {
				if (jQuery.isFunction(props)) {
					callback = props;
					props = ["*"];
				} else {
					props = props.split(" ");
				}

				var prop,
					index = 0,
					length = props.length;

				for (; index < length; index++) {
					prop = props[index];
					tweeners[prop] = tweeners[prop] || [];
					tweeners[prop].unshift(callback);
				}
			},

			prefilter: function(callback, prepend) {
				if (prepend) {
					animationPrefilters.unshift(callback);
				} else {
					animationPrefilters.push(callback);
				}
			}
		});

		function defaultPrefilter(elem, props, opts) {
			/*jshint validthis:true */
			var prop, index, length,
				value, dataShow, toggle,
				tween, hooks, oldfire,
				anim = this,
				style = elem.style,
				orig = {},
				handled = [],
				hidden = elem.nodeType && isHidden(elem);

			// handle queue: false promises
			if (!opts.queue) {
				hooks = jQuery._queueHooks(elem, "fx");
				if (hooks.unqueued == null) {
					hooks.unqueued = 0;
					oldfire = hooks.empty.fire;
					hooks.empty.fire = function() {
						if (!hooks.unqueued) {
							oldfire();
						}
					};
				}
				hooks.unqueued++;

				anim.always(function() {
					// doing this makes sure that the complete handler will be called
					// before this completes
					anim.always(function() {
						hooks.unqueued--;
						if (!jQuery.queue(elem, "fx").length) {
							hooks.empty.fire();
						}
					});
				});
			}

			// height/width overflow pass
			if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
				// Make sure that nothing sneaks out
				// Record all 3 overflow attributes because IE does not
				// change the overflow attribute when overflowX and
				// overflowY are set to the same value
				opts.overflow = [style.overflow, style.overflowX, style.overflowY];

				// Set display property to inline-block for height/width
				// animations on inline elements that are having width/height animated
				if (jQuery.css(elem, "display") === "inline" &&
					jQuery.css(elem, "float") === "none") {

					// inline-level elements accept inline-block;
					// block-level elements need to be inline with layout
					if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
						style.display = "inline-block";

					} else {
						style.zoom = 1;
					}
				}
			}

			if (opts.overflow) {
				style.overflow = "hidden";
				if (!jQuery.support.shrinkWrapBlocks) {
					anim.always(function() {
						style.overflow = opts.overflow[0];
						style.overflowX = opts.overflow[1];
						style.overflowY = opts.overflow[2];
					});
				}
			}


			// show/hide pass
			for (index in props) {
				value = props[index];
				if (rfxtypes.exec(value)) {
					delete props[index];
					toggle = toggle || value === "toggle";
					if (value === (hidden ? "hide" : "show")) {
						continue;
					}
					handled.push(index);
				}
			}

			length = handled.length;
			if (length) {
				dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}

				// store state if its toggle - enables .stop().toggle() to "reverse"
				if (toggle) {
					dataShow.hidden = !hidden;
				}
				if (hidden) {
					jQuery(elem).show();
				} else {
					anim.done(function() {
						jQuery(elem).hide();
					});
				}
				anim.done(function() {
					var prop;
					jQuery._removeData(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
				for (index = 0; index < length; index++) {
					prop = handled[index];
					tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
					orig[prop] = dataShow[prop] || jQuery.style(elem, prop);

					if (!(prop in dataShow)) {
						dataShow[prop] = tween.start;
						if (hidden) {
							tween.end = tween.start;
							tween.start = prop === "width" || prop === "height" ? 1 : 0;
						}
					}
				}
			}
		}

		function Tween(elem, options, prop, end, easing) {
			return new Tween.prototype.init(elem, options, prop, end, easing);
		}
		jQuery.Tween = Tween;

		Tween.prototype = {
			constructor: Tween,
			init: function(elem, options, prop, end, easing, unit) {
				this.elem = elem;
				this.prop = prop;
				this.easing = easing || "swing";
				this.options = options;
				this.start = this.now = this.cur();
				this.end = end;
				this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
			},
			cur: function() {
				var hooks = Tween.propHooks[this.prop];

				return hooks && hooks.get ?
					hooks.get(this) :
					Tween.propHooks._default.get(this);
			},
			run: function(percent) {
				var eased,
					hooks = Tween.propHooks[this.prop];

				if (this.options.duration) {
					this.pos = eased = jQuery.easing[this.easing](
						percent, this.options.duration * percent, 0, 1, this.options.duration
					);
				} else {
					this.pos = eased = percent;
				}
				this.now = (this.end - this.start) * eased + this.start;

				if (this.options.step) {
					this.options.step.call(this.elem, this.now, this);
				}

				if (hooks && hooks.set) {
					hooks.set(this);
				} else {
					Tween.propHooks._default.set(this);
				}
				return this;
			}
		};

		Tween.prototype.init.prototype = Tween.prototype;

		Tween.propHooks = {
			_default: {
				get: function(tween) {
					var result;

					if (tween.elem[tween.prop] != null &&
						(!tween.elem.style || tween.elem.style[tween.prop] == null)) {
						return tween.elem[tween.prop];
					}

					// passing an empty string as a 3rd parameter to .css will automatically
					// attempt a parseFloat and fallback to a string if the parse fails
					// so, simple values such as "10px" are parsed to Float.
					// complex values such as "rotate(1rad)" are returned as is.
					result = jQuery.css(tween.elem, tween.prop, "");
					// Empty strings, null, undefined and "auto" are converted to 0.
					return !result || result === "auto" ? 0 : result;
				},
				set: function(tween) {
					// use step hook for back compat - use cssHook if its there - use .style if its
					// available and use plain properties where available
					if (jQuery.fx.step[tween.prop]) {
						jQuery.fx.step[tween.prop](tween);
					} else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
						jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
					} else {
						tween.elem[tween.prop] = tween.now;
					}
				}
			}
		};

		// Remove in 2.0 - this supports IE8's panic based approach
		// to setting things on disconnected nodes

		Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
			set: function(tween) {
				if (tween.elem.nodeType && tween.elem.parentNode) {
					tween.elem[tween.prop] = tween.now;
				}
			}
		};

		jQuery.each(["toggle", "show", "hide"], function(i, name) {
			var cssFn = jQuery.fn[name];
			jQuery.fn[name] = function(speed, easing, callback) {
				return speed == null || typeof speed === "boolean" ?
					cssFn.apply(this, arguments) :
					this.animate(genFx(name, true), speed, easing, callback);
			};
		});

		jQuery.fn.extend({
			fadeTo: function(speed, to, easing, callback) {

				// show any hidden elements after setting opacity to 0
				return this.filter(isHidden).css("opacity", 0).show()

				// animate to the value specified
				.end().animate({
					opacity: to
				}, speed, easing, callback);
			},
			animate: function(prop, speed, easing, callback) {
				var empty = jQuery.isEmptyObject(prop),
					optall = jQuery.speed(speed, easing, callback),
					doAnimation = function() {
						// Operate on a copy of prop so per-property easing won't be lost
						var anim = Animation(this, jQuery.extend({}, prop), optall);
						doAnimation.finish = function() {
							anim.stop(true);
						};
						// Empty animations, or finishing resolves immediately
						if (empty || jQuery._data(this, "finish")) {
							anim.stop(true);
						}
					};
				doAnimation.finish = doAnimation;

				return empty || optall.queue === false ?
					this.each(doAnimation) :
					this.queue(optall.queue, doAnimation);
			},
			stop: function(type, clearQueue, gotoEnd) {
				var stopQueue = function(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd);
				};

				if (typeof type !== "string") {
					gotoEnd = clearQueue;
					clearQueue = type;
					type = undefined;
				}
				if (clearQueue && type !== false) {
					this.queue(type || "fx", []);
				}

				return this.each(function() {
					var dequeue = true,
						index = type != null && type + "queueHooks",
						timers = jQuery.timers,
						data = jQuery._data(this);

					if (index) {
						if (data[index] && data[index].stop) {
							stopQueue(data[index]);
						}
					} else {
						for (index in data) {
							if (data[index] && data[index].stop && rrun.test(index)) {
								stopQueue(data[index]);
							}
						}
					}

					for (index = timers.length; index--;) {
						if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
							timers[index].anim.stop(gotoEnd);
							dequeue = false;
							timers.splice(index, 1);
						}
					}

					// start the next in the queue if the last step wasn't forced
					// timers currently will call their complete callbacks, which will dequeue
					// but only if they were gotoEnd
					if (dequeue || !gotoEnd) {
						jQuery.dequeue(this, type);
					}
				});
			},
			finish: function(type) {
				if (type !== false) {
					type = type || "fx";
				}
				return this.each(function() {
					var index,
						data = jQuery._data(this),
						queue = data[type + "queue"],
						hooks = data[type + "queueHooks"],
						timers = jQuery.timers,
						length = queue ? queue.length : 0;

					// enable finishing flag on private data
					data.finish = true;

					// empty the queue first
					jQuery.queue(this, type, []);

					if (hooks && hooks.cur && hooks.cur.finish) {
						hooks.cur.finish.call(this);
					}

					// look for any active animations, and finish them
					for (index = timers.length; index--;) {
						if (timers[index].elem === this && timers[index].queue === type) {
							timers[index].anim.stop(true);
							timers.splice(index, 1);
						}
					}

					// look for any animations in the old queue and finish them
					for (index = 0; index < length; index++) {
						if (queue[index] && queue[index].finish) {
							queue[index].finish.call(this);
						}
					}

					// turn off finishing flag
					delete data.finish;
				});
			}
		});

		// Generate parameters to create a standard animation
		function genFx(type, includeWidth) {
			var which,
				attrs = {
					height: type
				},
				i = 0;

			// if we include width, step value is 1 to do all cssExpand values,
			// if we don't include width, step value is 2 to skip over Left and Right
			includeWidth = includeWidth ? 1 : 0;
			for (; i < 4; i += 2 - includeWidth) {
				which = cssExpand[i];
				attrs["margin" + which] = attrs["padding" + which] = type;
			}

			if (includeWidth) {
				attrs.opacity = attrs.width = type;
			}

			return attrs;
		}

		// Generate shortcuts for custom animations
		jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(name, props) {
			jQuery.fn[name] = function(speed, easing, callback) {
				return this.animate(props, speed, easing, callback);
			};
		});

		jQuery.speed = function(speed, easing, fn) {
			var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
				complete: fn || !fn && easing ||
					jQuery.isFunction(speed) && speed,
				duration: speed,
				easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
			};

			opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
				opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

			// normalize opt.queue - true/undefined/null -> "fx"
			if (opt.queue == null || opt.queue === true) {
				opt.queue = "fx";
			}

			// Queueing
			opt.old = opt.complete;

			opt.complete = function() {
				if (jQuery.isFunction(opt.old)) {
					opt.old.call(this);
				}

				if (opt.queue) {
					jQuery.dequeue(this, opt.queue);
				}
			};

			return opt;
		};

		jQuery.easing = {
			linear: function(p) {
				return p;
			},
			swing: function(p) {
				return 0.5 - Math.cos(p * Math.PI) / 2;
			}
		};

		jQuery.timers = [];
		jQuery.fx = Tween.prototype.init;
		jQuery.fx.tick = function() {
			var timer,
				timers = jQuery.timers,
				i = 0;

			fxNow = jQuery.now();

			for (; i < timers.length; i++) {
				timer = timers[i];
				// Checks the timer has not already been removed
				if (!timer() && timers[i] === timer) {
					timers.splice(i--, 1);
				}
			}

			if (!timers.length) {
				jQuery.fx.stop();
			}
			fxNow = undefined;
		};

		jQuery.fx.timer = function(timer) {
			if (timer() && jQuery.timers.push(timer)) {
				jQuery.fx.start();
			}
		};

		jQuery.fx.interval = 13;

		jQuery.fx.start = function() {
			if (!timerId) {
				timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
			}
		};

		jQuery.fx.stop = function() {
			clearInterval(timerId);
			timerId = null;
		};

		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		};

		// Back Compat <1.8 extension point
		jQuery.fx.step = {};

		if (jQuery.expr && jQuery.expr.filters) {
			jQuery.expr.filters.animated = function(elem) {
				return jQuery.grep(jQuery.timers, function(fn) {
					return elem === fn.elem;
				}).length;
			};
		}
		jQuery.fn.offset = function(options) {
			if (arguments.length) {
				return options === undefined ?
					this :
					this.each(function(i) {
						jQuery.offset.setOffset(this, options, i);
					});
			}

			var docElem, win,
				box = {
					top: 0,
					left: 0
				},
				elem = this[0],
				doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if (typeof elem.getBoundingClientRect !== core_strundefined) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow(doc);
			return {
				top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
				left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
			};
		};

		jQuery.offset = {

			setOffset: function(elem, options, i) {
				var position = jQuery.css(elem, "position");

				// set position first, in-case top/left are set even on static elem
				if (position === "static") {
					elem.style.position = "relative";
				}

				var curElem = jQuery(elem),
					curOffset = curElem.offset(),
					curCSSTop = jQuery.css(elem, "top"),
					curCSSLeft = jQuery.css(elem, "left"),
					calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
					props = {},
					curPosition = {},
					curTop, curLeft;

				// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
				if (calculatePosition) {
					curPosition = curElem.position();
					curTop = curPosition.top;
					curLeft = curPosition.left;
				} else {
					curTop = parseFloat(curCSSTop) || 0;
					curLeft = parseFloat(curCSSLeft) || 0;
				}

				if (jQuery.isFunction(options)) {
					options = options.call(elem, i, curOffset);
				}

				if (options.top != null) {
					props.top = (options.top - curOffset.top) + curTop;
				}
				if (options.left != null) {
					props.left = (options.left - curOffset.left) + curLeft;
				}

				if ("using" in options) {
					options.using.call(elem, props);
				} else {
					curElem.css(props);
				}
			}
		};


		jQuery.fn.extend({

			position: function() {
				if (!this[0]) {
					return;
				}

				var offsetParent, offset,
					parentOffset = {
						top: 0,
						left: 0
					},
					elem = this[0];

				// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
				if (jQuery.css(elem, "position") === "fixed") {
					// we assume that getBoundingClientRect is available when computed position is fixed
					offset = elem.getBoundingClientRect();
				} else {
					// Get *real* offsetParent
					offsetParent = this.offsetParent();

					// Get correct offsets
					offset = this.offset();
					if (!jQuery.nodeName(offsetParent[0], "html")) {
						parentOffset = offsetParent.offset();
					}

					// Add offsetParent borders
					parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
					parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
				}

				// Subtract parent offsets and element margins
				// note: when an element has margin: auto the offsetLeft and marginLeft
				// are the same in Safari causing offset.left to incorrectly be 0
				return {
					top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
					left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
				};
			},

			offsetParent: function() {
				return this.map(function() {
					var offsetParent = this.offsetParent || document.documentElement;
					while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
						offsetParent = offsetParent.offsetParent;
					}
					return offsetParent || document.documentElement;
				});
			}
		});


		// Create scrollLeft and scrollTop methods
		jQuery.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(method, prop) {
			var top = /Y/.test(prop);

			jQuery.fn[method] = function(val) {
				return jQuery.access(this, function(elem, method, val) {
					var win = getWindow(elem);

					if (val === undefined) {
						return win ? (prop in win) ? win[prop] :
							win.document.documentElement[method] :
							elem[method];
					}

					if (win) {
						win.scrollTo(!top ? val : jQuery(win).scrollLeft(),
							top ? val : jQuery(win).scrollTop()
						);

					} else {
						elem[method] = val;
					}
				}, method, val, arguments.length, null);
			};
		});

		function getWindow(elem) {
			return jQuery.isWindow(elem) ?
				elem :
				elem.nodeType === 9 ?
				elem.defaultView || elem.parentWindow :
				false;
		}
		// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		jQuery.each({
			Height: "height",
			Width: "width"
		}, function(name, type) {
			jQuery.each({
				padding: "inner" + name,
				content: type,
				"": "outer" + name
			}, function(defaultExtra, funcName) {
				// margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function(margin, value) {
					var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
						extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

					return jQuery.access(this, function(elem, type, value) {
						var doc;

						if (jQuery.isWindow(elem)) {
							// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
							// isn't a whole lot we can do. See pull request at this URL for discussion:
							// //github.com/jquery/jquery/pull/764
							return elem.document.documentElement["client" + name];
						}

						// Get document width or height
						if (elem.nodeType === 9) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
							// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
							return Math.max(
								elem.body["scroll" + name], doc["scroll" + name],
								elem.body["offset" + name], doc["offset" + name],
								doc["client" + name]
							);
						}

						return value === undefined ?
							// Get width or height on the element, requesting but not forcing parseFloat
							jQuery.css(elem, type, extra) :

							// Set width or height on the element
							jQuery.style(elem, type, value, extra);
					}, type, chainable ? margin : undefined, chainable, null);
				};
			});
		});
		// Limit scope pollution from any deprecated API
		// (function() {

		// })();
		// Expose jQuery to the global object
		window.jQuery = window.$ = jQuery;

		// Expose jQuery as an AMD module, but only for AMD loaders that
		// understand the issues with loading multiple versions of jQuery
		// in a page that all might call define(). The loader will indicate
		// they have special allowances for multiple jQuery versions by
		// specifying define.amd.jQuery = true. Register as a named module,
		// since jQuery can be concatenated with other files that may use define,
		// but not use a proper concatenation script that understands anonymous
		// AMD modules. A named AMD is safest and most robust way to register.
		// Lowercase jquery is used because AMD module names are derived from
		// file names, and jQuery is normally delivered in a lowercase file name.
		// Do this after creating the global so that if an AMD module wants to call
		// noConflict to hide this version of jQuery, it will work.
		if ("function" === "function" && __webpack_require__(5) && __webpack_require__(5).jQuery) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return jQuery;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}

	})(window);

	module.exports=jQuery;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["dragula"] = __webpack_require__(7);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var emitter = __webpack_require__(8);
	var crossvent = __webpack_require__(16);
	var classes = __webpack_require__(19);
	var doc = document;
	var documentElement = doc.documentElement;

	function dragula (initialContainers, options) {
	  var len = arguments.length;
	  if (len === 1 && Array.isArray(initialContainers) === false) {
	    options = initialContainers;
	    initialContainers = [];
	  }
	  var _mirror; // mirror image
	  var _source; // source container
	  var _item; // item being dragged
	  var _offsetX; // reference x
	  var _offsetY; // reference y
	  var _moveX; // reference move x
	  var _moveY; // reference move y
	  var _initialSibling; // reference sibling when grabbed
	  var _currentSibling; // reference sibling now
	  var _copy; // item used for copying
	  var _renderTimer; // timer for setTimeout renderMirrorImage
	  var _lastDropTarget = null; // last container item was over
	  var _grabbed; // holds mousedown context until first mousemove

	  var o = options || {};
	  if (o.moves === void 0) { o.moves = always; }
	  if (o.accepts === void 0) { o.accepts = always; }
	  if (o.invalid === void 0) { o.invalid = invalidTarget; }
	  if (o.containers === void 0) { o.containers = initialContainers || []; }
	  if (o.isContainer === void 0) { o.isContainer = never; }
	  if (o.copy === void 0) { o.copy = false; }
	  if (o.copySortSource === void 0) { o.copySortSource = false; }
	  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
	  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
	  if (o.direction === void 0) { o.direction = 'vertical'; }
	  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
	  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

	  var drake = emitter({
	    containers: o.containers,
	    start: manualStart,
	    end: end,
	    cancel: cancel,
	    remove: remove,
	    destroy: destroy,
	    canMove: canMove,
	    dragging: false
	  });

	  if (o.removeOnSpill === true) {
	    drake.on('over', spillOver).on('out', spillOut);
	  }

	  events();

	  return drake;

	  function isContainer (el) {
	    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
	  }

	  function events (remove) {
	    var op = remove ? 'remove' : 'add';
	    touchy(documentElement, op, 'mousedown', grab);
	    touchy(documentElement, op, 'mouseup', release);
	  }

	  function eventualMovements (remove) {
	    var op = remove ? 'remove' : 'add';
	    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
	  }

	  function movements (remove) {
	    var op = remove ? 'remove' : 'add';
	    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
	    crossvent[op](documentElement, 'click', preventGrabbed);
	  }

	  function destroy () {
	    events(true);
	    release({});
	  }

	  function preventGrabbed (e) {
	    if (_grabbed) {
	      e.preventDefault();
	    }
	  }

	  function grab (e) {
	    _moveX = e.clientX;
	    _moveY = e.clientY;

	    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
	    if (ignore) {
	      return; // we only care about honest-to-god left clicks and touch events
	    }
	    var item = e.target;
	    var context = canStart(item);
	    if (!context) {
	      return;
	    }
	    _grabbed = context;
	    eventualMovements();
	    if (e.type === 'mousedown') {
	      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
	        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
	      } else {
	        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
	      }
	    }
	  }

	  function startBecauseMouseMoved (e) {
	    if (!_grabbed) {
	      return;
	    }
	    if (whichMouseButton(e) === 0) {
	      release({});
	      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
	    }
	    // truthy check fixes #239, equality fixes #207
	    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
	      return;
	    }
	    if (o.ignoreInputTextSelection) {
	      var clientX = getCoord('clientX', e);
	      var clientY = getCoord('clientY', e);
	      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
	      if (isInput(elementBehindCursor)) {
	        return;
	      }
	    }

	    var grabbed = _grabbed; // call to end() unsets _grabbed
	    eventualMovements(true);
	    movements();
	    end();
	    start(grabbed);

	    var offset = getOffset(_item);
	    _offsetX = getCoord('pageX', e) - offset.left;
	    _offsetY = getCoord('pageY', e) - offset.top;

	    classes.add(_copy || _item, 'gu-transit');
	    renderMirrorImage();
	    drag(e);
	  }

	  function canStart (item) {
	    if (drake.dragging && _mirror) {
	      return;
	    }
	    if (isContainer(item)) {
	      return; // don't drag container itself
	    }
	    var handle = item;
	    while (getParent(item) && isContainer(getParent(item)) === false) {
	      if (o.invalid(item, handle)) {
	        return;
	      }
	      item = getParent(item); // drag target should be a top element
	      if (!item) {
	        return;
	      }
	    }
	    var source = getParent(item);
	    if (!source) {
	      return;
	    }
	    if (o.invalid(item, handle)) {
	      return;
	    }

	    var movable = o.moves(item, source, handle, nextEl(item));
	    if (!movable) {
	      return;
	    }

	    return {
	      item: item,
	      source: source
	    };
	  }

	  function canMove (item) {
	    return !!canStart(item);
	  }

	  function manualStart (item) {
	    var context = canStart(item);
	    if (context) {
	      start(context);
	    }
	  }

	  function start (context) {
	    if (isCopy(context.item, context.source)) {
	      _copy = context.item.cloneNode(true);
	      drake.emit('cloned', _copy, context.item, 'copy');
	    }

	    _source = context.source;
	    _item = context.item;
	    _initialSibling = _currentSibling = nextEl(context.item);

	    drake.dragging = true;
	    drake.emit('drag', _item, _source);
	  }

	  function invalidTarget () {
	    return false;
	  }

	  function end () {
	    if (!drake.dragging) {
	      return;
	    }
	    var item = _copy || _item;
	    drop(item, getParent(item));
	  }

	  function ungrab () {
	    _grabbed = false;
	    eventualMovements(true);
	    movements(true);
	  }

	  function release (e) {
	    ungrab();

	    if (!drake.dragging) {
	      return;
	    }
	    var item = _copy || _item;
	    var clientX = getCoord('clientX', e);
	    var clientY = getCoord('clientY', e);
	    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
	    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
	    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
	      drop(item, dropTarget);
	    } else if (o.removeOnSpill) {
	      remove();
	    } else {
	      cancel();
	    }
	  }

	  function drop (item, target) {
	    var parent = getParent(item);
	    if (_copy && o.copySortSource && target === _source) {
	      parent.removeChild(_item);
	    }
	    if (isInitialPlacement(target)) {
	      drake.emit('cancel', item, _source, _source);
	    } else {
	      drake.emit('drop', item, target, _source, _currentSibling);
	    }
	    cleanup();
	  }

	  function remove () {
	    if (!drake.dragging) {
	      return;
	    }
	    var item = _copy || _item;
	    var parent = getParent(item);
	    if (parent) {
	      parent.removeChild(item);
	    }
	    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
	    cleanup();
	  }

	  function cancel (revert) {
	    if (!drake.dragging) {
	      return;
	    }
	    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
	    var item = _copy || _item;
	    var parent = getParent(item);
	    var initial = isInitialPlacement(parent);
	    if (initial === false && reverts) {
	      if (_copy) {
	        parent.removeChild(_copy);
	      } else {
	        _source.insertBefore(item, _initialSibling);
	      }
	    }
	    if (initial || reverts) {
	      drake.emit('cancel', item, _source, _source);
	    } else {
	      drake.emit('drop', item, parent, _source, _currentSibling);
	    }
	    cleanup();
	  }

	  function cleanup () {
	    var item = _copy || _item;
	    ungrab();
	    removeMirrorImage();
	    if (item) {
	      classes.rm(item, 'gu-transit');
	    }
	    if (_renderTimer) {
	      clearTimeout(_renderTimer);
	    }
	    drake.dragging = false;
	    if (_lastDropTarget) {
	      drake.emit('out', item, _lastDropTarget, _source);
	    }
	    drake.emit('dragend', item);
	    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
	  }

	  function isInitialPlacement (target, s) {
	    var sibling;
	    if (s !== void 0) {
	      sibling = s;
	    } else if (_mirror) {
	      sibling = _currentSibling;
	    } else {
	      sibling = nextEl(_copy || _item);
	    }
	    return target === _source && sibling === _initialSibling;
	  }

	  function findDropTarget (elementBehindCursor, clientX, clientY) {
	    var target = elementBehindCursor;
	    while (target && !accepted()) {
	      target = getParent(target);
	    }
	    return target;

	    function accepted () {
	      var droppable = isContainer(target);
	      if (droppable === false) {
	        return false;
	      }

	      var immediate = getImmediateChild(target, elementBehindCursor);
	      var reference = getReference(target, immediate, clientX, clientY);
	      var initial = isInitialPlacement(target, reference);
	      if (initial) {
	        return true; // should always be able to drop it right back where it was
	      }
	      return o.accepts(_item, target, _source, reference);
	    }
	  }

	  function drag (e) {
	    if (!_mirror) {
	      return;
	    }
	    e.preventDefault();

	    var clientX = getCoord('clientX', e);
	    var clientY = getCoord('clientY', e);
	    var x = clientX - _offsetX;
	    var y = clientY - _offsetY;

	    _mirror.style.left = x + 'px';
	    _mirror.style.top = y + 'px';

	    var item = _copy || _item;
	    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
	    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
	    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
	    if (changed || dropTarget === null) {
	      out();
	      _lastDropTarget = dropTarget;
	      over();
	    }
	    var parent = getParent(item);
	    if (dropTarget === _source && _copy && !o.copySortSource) {
	      if (parent) {
	        parent.removeChild(item);
	      }
	      return;
	    }
	    var reference;
	    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
	    if (immediate !== null) {
	      reference = getReference(dropTarget, immediate, clientX, clientY);
	    } else if (o.revertOnSpill === true && !_copy) {
	      reference = _initialSibling;
	      dropTarget = _source;
	    } else {
	      if (_copy && parent) {
	        parent.removeChild(item);
	      }
	      return;
	    }
	    if (
	      (reference === null && changed) ||
	      reference !== item &&
	      reference !== nextEl(item)
	    ) {
	      _currentSibling = reference;
	      dropTarget.insertBefore(item, reference);
	      drake.emit('shadow', item, dropTarget, _source);
	    }
	    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
	    function over () { if (changed) { moved('over'); } }
	    function out () { if (_lastDropTarget) { moved('out'); } }
	  }

	  function spillOver (el) {
	    classes.rm(el, 'gu-hide');
	  }

	  function spillOut (el) {
	    if (drake.dragging) { classes.add(el, 'gu-hide'); }
	  }

	  function renderMirrorImage () {
	    if (_mirror) {
	      return;
	    }
	    var rect = _item.getBoundingClientRect();
	    _mirror = _item.cloneNode(true);
	    _mirror.style.width = getRectWidth(rect) + 'px';
	    _mirror.style.height = getRectHeight(rect) + 'px';
	    classes.rm(_mirror, 'gu-transit');
	    classes.add(_mirror, 'gu-mirror');
	    o.mirrorContainer.appendChild(_mirror);
	    touchy(documentElement, 'add', 'mousemove', drag);
	    classes.add(o.mirrorContainer, 'gu-unselectable');
	    drake.emit('cloned', _mirror, _item, 'mirror');
	  }

	  function removeMirrorImage () {
	    if (_mirror) {
	      classes.rm(o.mirrorContainer, 'gu-unselectable');
	      touchy(documentElement, 'remove', 'mousemove', drag);
	      getParent(_mirror).removeChild(_mirror);
	      _mirror = null;
	    }
	  }

	  function getImmediateChild (dropTarget, target) {
	    var immediate = target;
	    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
	      immediate = getParent(immediate);
	    }
	    if (immediate === documentElement) {
	      return null;
	    }
	    return immediate;
	  }

	  function getReference (dropTarget, target, x, y) {
	    var horizontal = o.direction === 'horizontal';
	    var reference = target !== dropTarget ? inside() : outside();
	    return reference;

	    function outside () { // slower, but able to figure out any position
	      var len = dropTarget.children.length;
	      var i;
	      var el;
	      var rect;
	      for (i = 0; i < len; i++) {
	        el = dropTarget.children[i];
	        rect = el.getBoundingClientRect();
	        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
	        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
	      }
	      return null;
	    }

	    function inside () { // faster, but only available if dropped inside a child element
	      var rect = target.getBoundingClientRect();
	      if (horizontal) {
	        return resolve(x > rect.left + getRectWidth(rect) / 2);
	      }
	      return resolve(y > rect.top + getRectHeight(rect) / 2);
	    }

	    function resolve (after) {
	      return after ? nextEl(target) : target;
	    }
	  }

	  function isCopy (item, container) {
	    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
	  }
	}

	function touchy (el, op, type, fn) {
	  var touch = {
	    mouseup: 'touchend',
	    mousedown: 'touchstart',
	    mousemove: 'touchmove'
	  };
	  var pointers = {
	    mouseup: 'pointerup',
	    mousedown: 'pointerdown',
	    mousemove: 'pointermove'
	  };
	  var microsoft = {
	    mouseup: 'MSPointerUp',
	    mousedown: 'MSPointerDown',
	    mousemove: 'MSPointerMove'
	  };
	  if (global.navigator.pointerEnabled) {
	    crossvent[op](el, pointers[type], fn);
	  } else if (global.navigator.msPointerEnabled) {
	    crossvent[op](el, microsoft[type], fn);
	  } else {
	    crossvent[op](el, touch[type], fn);
	    crossvent[op](el, type, fn);
	  }
	}

	function whichMouseButton (e) {
	  if (e.touches !== void 0) { return e.touches.length; }
	  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
	  if (e.buttons !== void 0) { return e.buttons; }
	  var button = e.button;
	  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
	    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
	  }
	}

	function getOffset (el) {
	  var rect = el.getBoundingClientRect();
	  return {
	    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
	    top: rect.top + getScroll('scrollTop', 'pageYOffset')
	  };
	}

	function getScroll (scrollProp, offsetProp) {
	  if (typeof global[offsetProp] !== 'undefined') {
	    return global[offsetProp];
	  }
	  if (documentElement.clientHeight) {
	    return documentElement[scrollProp];
	  }
	  return doc.body[scrollProp];
	}

	function getElementBehindPoint (point, x, y) {
	  var p = point || {};
	  var state = p.className;
	  var el;
	  p.className += ' gu-hide';
	  el = doc.elementFromPoint(x, y);
	  p.className = state;
	  return el;
	}

	function never () { return false; }
	function always () { return true; }
	function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
	function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
	function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
	function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
	function isEditable (el) {
	  if (!el) { return false; } // no parents were editable
	  if (el.contentEditable === 'false') { return false; } // stop the lookup
	  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
	  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
	}

	function nextEl (el) {
	  return el.nextElementSibling || manually();
	  function manually () {
	    var sibling = el;
	    do {
	      sibling = sibling.nextSibling;
	    } while (sibling && sibling.nodeType !== 1);
	    return sibling;
	  }
	}

	function getEventHost (e) {
	  // on touchend event, we have to use `e.changedTouches`
	  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
	  // see https://github.com/bevacqua/dragula/issues/34
	  if (e.targetTouches && e.targetTouches.length) {
	    return e.targetTouches[0];
	  }
	  if (e.changedTouches && e.changedTouches.length) {
	    return e.changedTouches[0];
	  }
	  return e;
	}

	function getCoord (coord, e) {
	  var host = getEventHost(e);
	  var missMap = {
	    pageX: 'clientX', // IE8
	    pageY: 'clientY' // IE8
	  };
	  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
	    coord = missMap[coord];
	  }
	  return host[coord];
	}

	module.exports = dragula;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var atoa = __webpack_require__(9);
	var debounce = __webpack_require__(10);

	module.exports = function emitter (thing, options) {
	  var opts = options || {};
	  var evt = {};
	  if (thing === undefined) { thing = {}; }
	  thing.on = function (type, fn) {
	    if (!evt[type]) {
	      evt[type] = [fn];
	    } else {
	      evt[type].push(fn);
	    }
	    return thing;
	  };
	  thing.once = function (type, fn) {
	    fn._once = true; // thing.off(fn) still works!
	    thing.on(type, fn);
	    return thing;
	  };
	  thing.off = function (type, fn) {
	    var c = arguments.length;
	    if (c === 1) {
	      delete evt[type];
	    } else if (c === 0) {
	      evt = {};
	    } else {
	      var et = evt[type];
	      if (!et) { return thing; }
	      et.splice(et.indexOf(fn), 1);
	    }
	    return thing;
	  };
	  thing.emit = function () {
	    var args = atoa(arguments);
	    return thing.emitterSnapshot(args.shift()).apply(this, args);
	  };
	  thing.emitterSnapshot = function (type) {
	    var et = (evt[type] || []).slice(0);
	    return function () {
	      var args = atoa(arguments);
	      var ctx = this || thing;
	      if (type === 'error' && opts["throws"] !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
	      et.forEach(function emitter (listen) {
	        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
	        if (listen._once) { thing.off(type, listen); }
	      });
	      return thing;
	    };
	  };
	  return thing;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var ticky = __webpack_require__(11);

	module.exports = function debounce (fn, args, ctx) {
	  if (!fn) { return; }
	  ticky(function run () {
	    fn.apply(ctx || null, args || []);
	  });
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
	if (si) {
	  tick = function (fn) { setImmediate(fn); };
	} else {
	  tick = function (fn) { setTimeout(fn, 0); };
	}

	module.exports = tick;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).setImmediate))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(13);
	var global = __webpack_require__(15);
	exports.setImmediate = global.setImmediate;
	exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14)))

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var win;

	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof global !== "undefined") {
	    win = global;
	} else if (typeof self !== "undefined"){
	    win = self;
	} else {
	    win = {};
	}

	module.exports = win;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var customEvent = __webpack_require__(17);
	var eventmap = __webpack_require__(18);
	var doc = global.document;
	var addEvent = addEventEasy;
	var removeEvent = removeEventEasy;
	var hardCache = [];

	if (!global.addEventListener) {
	  addEvent = addEventHard;
	  removeEvent = removeEventHard;
	}

	module.exports = {
	  add: addEvent,
	  remove: removeEvent,
	  fabricate: fabricateEvent
	};

	function addEventEasy (el, type, fn, capturing) {
	  return el.addEventListener(type, fn, capturing);
	}

	function addEventHard (el, type, fn) {
	  return el.attachEvent('on' + type, wrap(el, type, fn));
	}

	function removeEventEasy (el, type, fn, capturing) {
	  return el.removeEventListener(type, fn, capturing);
	}

	function removeEventHard (el, type, fn) {
	  var listener = unwrap(el, type, fn);
	  if (listener) {
	    return el.detachEvent('on' + type, listener);
	  }
	}

	function fabricateEvent (el, type, model) {
	  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
	  if (el.dispatchEvent) {
	    el.dispatchEvent(e);
	  } else {
	    el.fireEvent('on' + type, e);
	  }
	  function makeClassicEvent () {
	    var e;
	    if (doc.createEvent) {
	      e = doc.createEvent('Event');
	      e.initEvent(type, true, true);
	    } else if (doc.createEventObject) {
	      e = doc.createEventObject();
	    }
	    return e;
	  }
	  function makeCustomEvent () {
	    return new customEvent(type, { detail: model });
	  }
	}

	function wrapperFactory (el, type, fn) {
	  return function wrapper (originalEvent) {
	    var e = originalEvent || global.event;
	    e.target = e.target || e.srcElement;
	    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
	    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
	    e.which = e.which || e.keyCode;
	    fn.call(el, e);
	  };
	}

	function wrap (el, type, fn) {
	  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
	  hardCache.push({
	    wrapper: wrapper,
	    element: el,
	    type: type,
	    fn: fn
	  });
	  return wrapper;
	}

	function unwrap (el, type, fn) {
	  var i = find(el, type, fn);
	  if (i) {
	    var wrapper = hardCache[i].wrapper;
	    hardCache.splice(i, 1); // free up a tad of memory
	    return wrapper;
	  }
	}

	function find (el, type, fn) {
	  var i, item;
	  for (i = 0; i < hardCache.length; i++) {
	    item = hardCache[i];
	    if (item.element === el && item.type === type && item.fn === fn) {
	      return i;
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;

	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}

	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */

	module.exports = useNative() ? NativeCustomEvent :

	// IE >= 9
	'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :

	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var eventmap = [];
	var eventname = '';
	var ron = /^on/;

	for (eventname in global) {
	  if (ron.test(eventname)) {
	    eventmap.push(eventname.slice(2));
	  }
	}

	module.exports = eventmap;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	var cache = {};
	var start = '(?:^|\\s)';
	var end = '(?:\\s|$)';

	function lookupClass (className) {
	  var cached = cache[className];
	  if (cached) {
	    cached.lastIndex = 0;
	  } else {
	    cache[className] = cached = new RegExp(start + className + end, 'g');
	  }
	  return cached;
	}

	function addClass (el, className) {
	  var current = el.className;
	  if (!current.length) {
	    el.className = className;
	  } else if (!lookupClass(className).test(current)) {
	    el.className += ' ' + className;
	  }
	}

	function rmClass (el, className) {
	  el.className = el.className.replace(lookupClass(className), ' ').trim();
	}

	module.exports = {
	  add: addClass,
	  rm: rmClass
	};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/*! artDialog v6.0.5 | //github.com/aui/artDialog */
	!(function () {

	var __modules__ = {};

	function require (id) {
	    var mod = __modules__[id];
	    var exports = 'exports';

	    if (typeof mod === 'object') {
	        return mod;
	    }

	    if (!mod[exports]) {
	        mod[exports] = {};
	        mod[exports] = mod.call(mod[exports], require, mod[exports], mod) || mod[exports];
	    }

	    return mod[exports];
	}

	function define (path, fn) {
	    __modules__[path] = fn;
	}



	define("jquery", function () {
		return jQuery;
	});


	/*!
	 * PopupJS
	 * Date: 2014-11-09
	 * //github.com/aui/popupjs
	 * (c) 2009-2014 TangBin, //www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: //www.gnu.org/licenses/lgpl-2.1.html
	 */

	define("popup", function (require) {

	var $ = require("jquery");

	var _count = 0;
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isFixed = !_isIE6;


	function Popup () {

	    this.destroyed = false;


	    this.__popup = $('<div />')
	    /*使用 <dialog /> 元素可能导致 z-index 永远置顶的问题(chrome)*/
	    .css({
	        display: 'none',
	        position: 'absolute',
	        /*
	        left: 0,
	        top: 0,
	        bottom: 'auto',
	        right: 'auto',
	        margin: 0,
	        padding: 0,
	        border: '0 none',
	        background: 'transparent'
	        */
	        outline: 0
	    })
	    .attr('tabindex', '-1')
	    .html(this.innerHTML)
	    .appendTo('body');


	    this.__backdrop = this.__mask = $('<div />')
	    .css({
	        opacity: .7,
	        background: '#000'
	    });


	    // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
	    // 统一的接口利于未来 Popup 移植到其他 DOM 库中
	    this.node = this.__popup[0];
	    this.backdrop = this.__backdrop[0];

	    _count ++;
	}


	$.extend(Popup.prototype, {
	    
	    /**
	     * 初始化完毕事件，在 show()、showModal() 执行
	     * @name Popup.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name Popup.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name Popup.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name Popup.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name Popup.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name Popup.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name Popup.prototype.onblur
	     * @event
	     */

	    /** 浮层 DOM 素节点[*] */
	    node: null,

	    /** 遮罩 DOM 节点[*] */
	    backdrop: null,

	    /** 是否开启固定定位[*] */
	    fixed: false,

	    /** 判断对话框是否删除[*] */
	    destroyed: true,

	    /** 判断对话框是否显示 */
	    open: false,

	    /** close 返回值 */
	    returnValue: '',

	    /** 是否自动聚焦 */
	    autofocus: true,

	    /** 对齐方式[*] */
	    align: 'bottom left',

	    /** 内部的 HTML 字符串 */
	    innerHTML: '',

	    /** CSS 类名 */
	    className: 'ui-popup',

	    /**
	     * 显示浮层
	     * @param   {HTMLElement, Event}  指定位置（可选）
	     */
	    show: function (anchor) {

	        if (this.destroyed) {
	            return this;
	        }

	        var that = this;
	        var popup = this.__popup;
	        var backdrop = this.__backdrop;

	        this.__activeElement = this.__getActive();

	        this.open = true;
	        this.follow = anchor || this.follow;


	        // 初始化 show 方法
	        if (!this.__ready) {

	            popup
	            .addClass(this.className)
	            .attr('role', this.modal ? 'alertdialog' : 'dialog')
	            .css('position', this.fixed ? 'fixed' : 'absolute');

	            if (!_isIE6) {
	                $(window).on('resize', $.proxy(this.reset, this));
	            }

	            // 模态浮层的遮罩
	            if (this.modal) {
	                var backdropCss = {
	                    position: 'fixed',
	                    left: 0,
	                    top: 0,
	                    width: '100%',
	                    height: '100%',
	                    overflow: 'hidden',
	                    userSelect: 'none',
	                    zIndex: this.zIndex || Popup.zIndex
	                };


	                popup.addClass(this.className + '-modal');


	                if (!_isFixed) {
	                    $.extend(backdropCss, {
	                        position: 'absolute',
	                        width: $(window).width() + 'px',
	                        height: $(document).height() + 'px'
	                    });
	                }


	                backdrop
	                .css(backdropCss)
	                .attr({tabindex: '0'})
	                .on('focus', $.proxy(this.focus, this));

	                // 锁定 tab 的焦点操作
	                this.__mask = backdrop
	                .clone(true)
	                .attr('style', '')
	                .insertAfter(popup);

	                backdrop
	                .addClass(this.className + '-backdrop')
	                .insertBefore(popup);

	                this.__ready = true;
	            }


	            if (!popup.html()) {
	                popup.html(this.innerHTML);
	            }
	        }


	        popup
	        .addClass(this.className + '-show')
	        .show();

	        backdrop.show();


	        this.reset().focus();
	        this.__dispatchEvent('show');

	        return this;
	    },


	    /** 显示模态浮层。参数参见 show() */
	    showModal: function () {
	        this.modal = true;
	        return this.show.apply(this, arguments);
	    },
	    
	    
	    /** 关闭浮层 */
	    close: function (result) {
	        
	        if (!this.destroyed && this.open) {
	            
	            if (result !== undefined) {
	                this.returnValue = result;
	            }
	            
	            this.__popup.hide().removeClass(this.className + '-show');
	            this.__backdrop.hide();
	            this.open = false;
	            this.blur();// 恢复焦点，照顾键盘操作的用户
	            this.__dispatchEvent('close');
	        }
	    
	        return this;
	    },


	    /** 销毁浮层 */
	    remove: function () {

	        if (this.destroyed) {
	            return this;
	        }

	        this.__dispatchEvent('beforeremove');
	        
	        if (Popup.current === this) {
	            Popup.current = null;
	        }


	        // 从 DOM 中移除节点
	        this.__popup.remove();
	        this.__backdrop.remove();
	        this.__mask.remove();


	        if (!_isIE6) {
	            $(window).off('resize', this.reset);
	        }


	        this.__dispatchEvent('remove');

	        for (var i in this) {
	            delete this[i];
	        }

	        return this;
	    },


	    /** 重置位置 */
	    reset: function () {

	        var elem = this.follow;

	        if (elem) {
	            this.__follow(elem);
	        } else {
	            this.__center();
	        }

	        this.__dispatchEvent('reset');

	        return this;
	    },


	    /** 让浮层获取焦点 */
	    focus: function () {

	        var node = this.node;
	        var popup = this.__popup;
	        var current = Popup.current;
	        var index = this.zIndex = Popup.zIndex ++;

	        if (current && current !== this) {
	            current.blur(false);
	        }

	        // 检查焦点是否在浮层里面
	        if (!$.contains(node, this.__getActive())) {
	            var autofocus = popup.find('[autofocus]')[0];

	            if (!this._autofocus && autofocus) {
	                this._autofocus = true;
	            } else {
	                autofocus = node;
	            }

	            this.__focus(autofocus);
	        }

	        // 设置叠加高度
	        popup.css('zIndex', index);
	        //this.__backdrop.css('zIndex', index);

	        Popup.current = this;
	        popup.addClass(this.className + '-focus');

	        this.__dispatchEvent('focus');

	        return this;
	    },


	    /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
	    blur: function () {

	        var activeElement = this.__activeElement;
	        var isBlur = arguments[0];


	        if (isBlur !== false) {
	            this.__focus(activeElement);
	        }

	        this._autofocus = false;
	        this.__popup.removeClass(this.className + '-focus');
	        this.__dispatchEvent('blur');

	        return this;
	    },


	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    addEventListener: function (type, callback) {
	        this.__getEventListener(type).push(callback);
	        return this;
	    },


	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    removeEventListener: function (type, callback) {
	        var listeners = this.__getEventListener(type);
	        for (var i = 0; i < listeners.length; i ++) {
	            if (callback === listeners[i]) {
	                listeners.splice(i--, 1);
	            }
	        }
	        return this;
	    },


	    // 获取事件缓存
	    __getEventListener: function (type) {
	        var listener = this.__listener;
	        if (!listener) {
	            listener = this.__listener = {};
	        }
	        if (!listener[type]) {
	            listener[type] = [];
	        }
	        return listener[type];
	    },


	    // 派发事件
	    __dispatchEvent: function (type) {
	        var listeners = this.__getEventListener(type);

	        if (this['on' + type]) {
	            this['on' + type]();
	        }

	        for (var i = 0; i < listeners.length; i ++) {
	            listeners[i].call(this);
	        }
	    },


	    // 对元素安全聚焦
	    __focus: function (elem) {
	        // 防止 iframe 跨域无权限报错
	        // 防止 IE 不可见元素报错
	        try {
	            // ie11 bug: iframe 页面点击会跳到顶部
	            if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) {
	                elem.focus();
	            }
	        } catch (e) {}
	    },


	    // 获取当前焦点的元素
	    __getActive: function () {
	        try {// try: ie8~9, iframe #26
	            var activeElement = document.activeElement;
	            var contentDocument = activeElement.contentDocument;
	            var elem = contentDocument && contentDocument.activeElement || activeElement;
	            return elem;
	        } catch (e) {}
	    },


	    // 居中浮层
	    __center: function () {
	    
	        var popup = this.__popup;
	        var $window = $(window);
	        var $document = $(document);
	        var fixed = this.fixed;
	        var dl = fixed ? 0 : $document.scrollLeft();
	        var dt = fixed ? 0 : $document.scrollTop();
	        var ww = $window.width();
	        var wh = $window.height();
	        var ow = popup.width();
	        var oh = popup.height();
	        var left = (ww - ow) / 2 + dl;
	        var top = (wh - oh) * 382 / 1000 + dt;// 黄金比例
	        var style = popup[0].style;

	        
	        style.left = Math.max(parseInt(left), dl) + 'px';
	        style.top = Math.max(parseInt(top), dt) + 'px';
	    },
	    
	    
	    // 指定位置 @param    {HTMLElement, Event}  anchor
	    __follow: function (anchor) {
	        
	        var $elem = anchor.parentNode && $(anchor);
	        var popup = this.__popup;
	        

	        if (this.__followSkin) {
	            popup.removeClass(this.__followSkin);
	        }


	        // 隐藏元素不可用
	        if ($elem) {
	            var o = $elem.offset();
	            if (o.left * o.top < 0) {
	                return this.__center();
	            }
	        }
	        
	        var that = this;
	        var fixed = this.fixed;

	        var $window = $(window);
	        var $document = $(document);
	        var winWidth = $window.width();
	        var winHeight = $window.height();
	        var docLeft =  $document.scrollLeft();
	        var docTop = $document.scrollTop();


	        var popupWidth = popup.width();
	        var popupHeight = popup.height();
	        var width = $elem ? $elem.outerWidth() : 0;
	        var height = $elem ? $elem.outerHeight() : 0;
	        var offset = this.__offset(anchor);
	        var x = offset.left;
	        var y = offset.top;
	        var left =  fixed ? x - docLeft : x;
	        var top = fixed ? y - docTop : y;


	        var minLeft = fixed ? 0 : docLeft;
	        var minTop = fixed ? 0 : docTop;
	        var maxLeft = minLeft + winWidth - popupWidth;
	        var maxTop = minTop + winHeight - popupHeight;


	        var css = {};
	        var align = this.align.split(' ');
	        var className = this.className + '-';
	        var reverse = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};
	        var name = {top: 'top', bottom: 'top', left: 'left', right: 'left'};


	        var temp = [{
	            top: top - popupHeight,
	            bottom: top + height,
	            left: left - popupWidth,
	            right: left + width
	        }, {
	            top: top,
	            bottom: top - popupHeight + height,
	            left: left,
	            right: left - popupWidth + width
	        }];


	        var center = {
	            left: left + width / 2 - popupWidth / 2,
	            top: top + height / 2 - popupHeight / 2
	        };

	        
	        var range = {
	            left: [minLeft, maxLeft],
	            top: [minTop, maxTop]
	        };


	        // 超出可视区域重新适应位置
	        $.each(align, function (i, val) {

	            // 超出右或下边界：使用左或者上边对齐
	            if (temp[i][val] > range[name[val]][1]) {
	                val = align[i] = reverse[val];
	            }

	            // 超出左或右边界：使用右或者下边对齐
	            if (temp[i][val] < range[name[val]][0]) {
	                align[i] = reverse[val];
	            }

	        });


	        // 一个参数的情况
	        if (!align[1]) {
	            name[align[1]] = name[align[0]] === 'left' ? 'top' : 'left';
	            temp[1][align[1]] = center[name[align[1]]];
	        }


	        //添加follow的css, 为了给css使用
	        className += align.join('-') + ' '+ this.className+ '-follow';
	        
	        that.__followSkin = className;


	        if ($elem) {
	            popup.addClass(className);
	        }

	        
	        css[name[align[0]]] = parseInt(temp[0][align[0]]);
	        css[name[align[1]]] = parseInt(temp[1][align[1]]);
	        popup.css(css);

	    },


	    // 获取元素相对于页面的位置（包括iframe内的元素）
	    // 暂时不支持两层以上的 iframe 套嵌
	    __offset: function (anchor) {

	        var isNode = anchor.parentNode;
	        var offset = isNode ? $(anchor).offset() : {
	            left: anchor.pageX,
	            top: anchor.pageY
	        };


	        anchor = isNode ? anchor : anchor.target;
	        var ownerDocument = anchor.ownerDocument;
	        var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;
	        
	        if (defaultView == window) {// IE <= 8 只能使用两个等于号
	            return offset;
	        }

	        // {Element: Ifarme}
	        var frameElement = defaultView.frameElement;
	        var $ownerDocument = $(ownerDocument);
	        var docLeft =  $ownerDocument.scrollLeft();
	        var docTop = $ownerDocument.scrollTop();
	        var frameOffset = $(frameElement).offset();
	        var frameLeft = frameOffset.left;
	        var frameTop = frameOffset.top;
	        
	        return {
	            left: offset.left + frameLeft - docLeft,
	            top: offset.top + frameTop - docTop
	        };
	    }
	    
	});


	/** 当前叠加高度 */
	Popup.zIndex = 1024;


	/** 顶层浮层的实例 */
	Popup.current = null;


	return Popup;

	});

	// artDialog - 默认配置
	define("dialog-config", {

	    /* -----已注释的配置继承自 popup.js，仍可以再这里重新定义它----- */

	    // 对齐方式
	    //align: 'bottom left',
	    
	    // 是否固定定位
	    //fixed: false,
	    
	    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
	    //zIndex: 1024,

	    // 设置遮罩背景颜色
	    backdropBackground: '#000',

	    // 设置遮罩透明度
	    backdropOpacity: 0.7,

	    // 消息内容
	    content: '<span class="ui-dialog-loading">Loading..</span>',
	    
	    // 标题
	    title: '',

	    // 对话框状态栏区域 HTML 代码
	    statusbar: '',
	    
	    // 自定义按钮
	    button: null,
	    
	    // 确定按钮回调函数
	    ok: null,
	    
	    // 取消按钮回调函数
	    cancel: null,

	    // 确定按钮文本
	    okValue: 'ok',
	    
	    // 取消按钮文本
	    cancelValue: 'cancel',

	    cancelDisplay: true,
	    
	    // 内容宽度
	    width: '',
	    
	    // 内容高度
	    height: '',
	    
	    // 内容与边界填充距离
	    padding: '',
	    
	    // 对话框自定义 className
	    skin: '',

	    // 是否支持快捷关闭（点击遮罩层自动关闭）
	    quickClose: false,

	    // css 文件路径，留空则不会使用 js 自动加载样式
	    // 注意：css 只允许加载一个
	    cssUri: '../css/ui-dialog.css',

	    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
	    // js 使用 i="***" 属性识别结构，其余的均可自定义
	    innerHTML:
	        '<div i="dialog" class="ui-dialog">'
	        +       '<div class="ui-dialog-arrow-a"></div>'
	        +       '<div class="ui-dialog-arrow-b"></div>'
	        +       '<table class="ui-dialog-grid">'
	        +           '<tr>'
	        +               '<td i="header" class="ui-dialog-header">'
	        +                   '<button i="close" class="ui-dialog-close">&#215;</button>'
	        +                   '<div i="title" class="ui-dialog-title"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +           '<tr>'
	        +               '<td i="body" class="ui-dialog-body">'
	        +                   '<div i="content" class="ui-dialog-content"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +           '<tr>'
	        +               '<td i="footer" class="ui-dialog-footer">'
	        +                   '<div i="statusbar" class="ui-dialog-statusbar"></div>'
	        +                   '<div i="button" class="ui-dialog-button"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +       '</table>'
	        +'</div>'
	    
	});

	/*!
	 * artDialog
	 * Date: 2014-11-09
	 * //github.com/aui/artDialog
	 * (c) 2009-2014 TangBin, //www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: //www.gnu.org/licenses/lgpl-2.1.html
	 */
	define("dialog", function (require) {

	var $ = require("jquery");
	var Popup = require("popup");
	var defaults = require("dialog-config");
	var css = defaults.cssUri;


	// css loader: RequireJS & SeaJS
	if (css) {
	    var fn = require[require.toUrl ? 'toUrl' : 'resolve'];
	    if (fn) {
	        css = fn(css);
	        css = '<link rel="stylesheet" href="' + css + '" />';
	        if ($('base')[0]) {
	            $('base').before(css);
	        } else {
	            $('head').append(css);
	        } 
	    }
	}


	var _count = 0;
	var _expando = new Date() - 0; // Date.now()
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isMobile = 'createTouch' in document && !('onmousemove' in document)
	    || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var _isFixed = !_isIE6 && !_isMobile;


	var artDialog = function (options, ok, cancel) {

	    var originalOptions = options = options || {};
	    

	    if (typeof options === 'string' || options.nodeType === 1) {
	    
	        options = {content: options, fixed: !_isMobile};
	    }
	    

	    options = $.extend(true, {}, artDialog.defaults, options);
	    options.original = originalOptions;

	    var id = options.id = options.id || _expando + _count;
	    var api = artDialog.get(id);
	    
	    
	    // 如果存在同名的对话框对象，则直接返回
	    if (api) {
	        return api.focus();
	    }
	    
	    
	    // 目前主流移动设备对fixed支持不好，禁用此特性
	    if (!_isFixed) {
	        options.fixed = false;
	    }


	    // 快捷关闭支持：点击对话框外快速关闭对话框
	    if (options.quickClose) {
	        options.modal = true;
	        options.backdropOpacity = 0;
	    }
	    

	    // 按钮组
	    if (!$.isArray(options.button)) {
	        options.button = [];
	    }


	    // 取消按钮
	    if (cancel !== undefined) {
	        options.cancel = cancel;
	    }
	    
	    if (options.cancel) {
	        options.button.push({
	            id: 'cancel',
	            value: options.cancelValue,
	            callback: options.cancel,
	            display: options.cancelDisplay
	        });
	    }
	    
	    
	    // 确定按钮
	    if (ok !== undefined) {
	        options.ok = ok;
	    }
	    
	    if (options.ok) {
	        options.button.push({
	            id: 'ok',
	            value: options.okValue,
	            callback: options.ok,
	            autofocus: true
	        });
	    }
	    

	    return artDialog.list[id] = new artDialog.create(options);
	};

	var popup = function () {};
	popup.prototype = Popup.prototype;
	var prototype = artDialog.prototype = new popup();

	artDialog.create = function (options) {
	    var that = this;

	    $.extend(this, new Popup());

	    var originalOptions = options.original;
	    var $popup = $(this.node).html(options.innerHTML);
	    var $backdrop = $(this.backdrop);

	    this.options = options;
	    this._popup = $popup;

	    
	    $.each(options, function (name, value) {
	        if (typeof that[name] === 'function') {
	            that[name](value);
	        } else {
	            that[name] = value;
	        }
	    });


	    // 更新 zIndex 全局配置
	    if (options.zIndex) {
	        Popup.zIndex = options.zIndex;
	    }


	    // 设置 ARIA 信息
	    $popup.attr({
	        'aria-labelledby': this._$('title')
	            .attr('id', 'title:' + this.id).attr('id'),
	        'aria-describedby': this._$('content')
	            .attr('id', 'content:' + this.id).attr('id')
	    });


	    // 关闭按钮
	    this._$('close')
	    .css('display', this.cancel === false ? 'none' : '')
	    .attr('title', this.cancelValue)
	    .on('click', function (event) {
	        that._trigger('cancel');
	        event.preventDefault();
	    });
	    

	    // 添加视觉参数
	    this._$('dialog').addClass(this.skin);
	    this._$('body').css('padding', this.padding);


	    // 点击任意空白处关闭对话框
	    if (options.quickClose) {
	        $backdrop
	        .on(
	            'onmousedown' in document ? 'mousedown' : 'click',
	            function () {
	            that._trigger('cancel');
	            return false;// 阻止抢夺焦点
	        });
	    }


	    // 遮罩设置
	    this.addEventListener('show', function () {
	        $backdrop.css({
	            opacity: 0,
	            background: options.backdropBackground
	        }).animate(
	            {opacity: options.backdropOpacity}
	        , 150);
	    });


	    // ESC 快捷键关闭对话框
	    this._esc = function (event) {
	        var target = event.target;
	        var nodeName = target.nodeName;
	        var rinput = /^input|textarea$/i;
	        var isTop = Popup.current === that;
	        var keyCode = event.keyCode;

	        // 避免输入状态中 ESC 误操作关闭
	        if (!isTop || rinput.test(nodeName) && target.type !== 'button') {
	            return;
	        }
	        
	        if (keyCode === 27) {
	            that._trigger('cancel');
	        }
	    };

	    $(document).on('keydown', this._esc);
	    this.addEventListener('remove', function () {
	        $(document).off('keydown', this._esc);
	        delete artDialog.list[this.id];
	    });


	    _count ++;
	    
	    artDialog.oncreate(this);

	    return this;
	};


	artDialog.create.prototype = prototype;



	$.extend(prototype, {

	    /**
	     * 显示对话框
	     * @name artDialog.prototype.show
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */
	    
	    /**
	     * 显示对话框（模态）
	     * @name artDialog.prototype.showModal
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */

	    /**
	     * 关闭对话框
	     * @name artDialog.prototype.close
	     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
	     */

	    /**
	     * 销毁对话框
	     * @name artDialog.prototype.remove
	     */

	    /**
	     * 重置对话框位置
	     * @name artDialog.prototype.reset
	     */

	    /**
	     * 让对话框聚焦（同时置顶）
	     * @name artDialog.prototype.focus
	     */

	    /**
	     * 让对话框失焦（同时置顶）
	     * @name artDialog.prototype.blur
	     */

	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.addEventListener
	     */

	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.removeEventListener
	     */

	    /**
	     * 对话框显示事件，在 show()、showModal() 执行
	     * @name artDialog.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name artDialog.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name artDialog.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name artDialog.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name artDialog.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name artDialog.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name artDialog.prototype.onblur
	     * @event
	     */

	    
	    /**
	     * 设置内容
	     * @param    {String, HTMLElement}   内容
	     */
	    content: function (html) {
	    
	        var $content = this._$('content');

	        // HTMLElement
	        if (typeof html === 'object') {
	            html = $(html);
	            $content.empty('').append(html.show());
	            this.addEventListener('beforeremove', function () {
	                $('body').append(html.hide());
	            });
	        // String
	        } else {
	            $content.html(html);
	        }
	                
	        return this.reset();
	    },
	    
	    
	    /**
	     * 设置标题
	     * @param    {String}   标题内容
	     */
	    title: function (text) {
	        this._$('title').text(text);
	        this._$('header')[text ? 'show' : 'hide']();
	        return this;
	    },


	    /** 设置宽度 */
	    width: function (value) {
	        this._$('content').css('width', value);
	        return this.reset();
	    },


	    /** 设置高度 */
	    height: function (value) {
	        this._$('content').css('height', value);
	        return this.reset();
	    },


	    /**
	     * 设置按钮组
	     * @param   {Array, String}
	     * Options: value, callback, autofocus, disabled 
	     */
	    button: function (args) {
	        args = args || [];
	        var that = this;
	        var html = '';
	        var number = 0;
	        this.callbacks = {};
	        
	           
	        if (typeof args === 'string') {
	            html = args;
	            number ++;
	        } else {
	            $.each(args, function (i, val) {

	                var id = val.id = val.id || val.value;
	                var style = '';
	                that.callbacks[id] = val.callback;


	                if (val.display === false) {
	                    style = ' style="display:none"';
	                } else {
	                    number ++;
	                }

	                html +=
	                  '<button'
	                + ' type="button"'
	                + ' i-id="' + id + '"'
	                + style
	                + (val.disabled ? ' disabled' : '')
	                + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '')
	                + '>'
	                +   val.value
	                + '</button>';

	                that._$('button')
	                .on('click', '[i-id=' + id +']', function (event) {                
	                    var $this = $(this);
	                    if (!$this.attr('disabled')) {// IE BUG
	                        that._trigger(id);
	                    }
	                
	                    event.preventDefault();
	                });

	            });
	        }

	        this._$('button').html(html);
	        this._$('footer')[number ? 'show' : 'hide']();

	        return this;
	    },


	    statusbar: function (html) {
	        this._$('statusbar')
	        .html(html)[html ? 'show' : 'hide']();

	        return this;
	    },


	    _$: function (i) {
	        return this._popup.find('[i=' + i + ']');
	    },
	    
	    
	    // 触发按钮回调函数
	    _trigger: function (id) {
	        var fn = this.callbacks[id];
	            
	        return typeof fn !== 'function' || fn.call(this) !== false ?
	            this.close().remove() : this;
	    }
	    
	});



	artDialog.oncreate = $.noop;



	/** 获取最顶层的对话框API */
	artDialog.getCurrent = function () {
	    return Popup.current;
	};



	/**
	 * 根据 ID 获取某对话框 API
	 * @param    {String}    对话框 ID
	 * @return   {Object}    对话框 API (实例)
	 */
	artDialog.get = function (id) {
	    return id === undefined
	    ? artDialog.list
	    : artDialog.list[id];
	};

	artDialog.list = {};



	/**
	 * 默认配置
	 */
	artDialog.defaults = defaults;



	return artDialog;

	});




	window.dialog = require("dialog");

	})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Placeholder Plugin v2.3.1
	 * https://github.com/mathiasbynens/jquery-placeholder
	 *
	 * Copyright 2011, 2015 Mathias Bynens
	 * Released under the MIT license
	 */
	(function(factory) {
	    if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        factory(require('jquery'));
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function($) {

	    /****
	     * Allows plugin behavior simulation in modern browsers for easier debugging. 
	     * When setting to true, use attribute "placeholder-x" rather than the usual "placeholder" in your inputs/textareas 
	     * i.e. <input type="text" placeholder-x="my placeholder text" />
	     */
	    var debugMode = false; 

	    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
	    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
	    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
	    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
	    var valHooks = $.valHooks;
	    var propHooks = $.propHooks;
	    var hooks;
	    var placeholder;
	    var settings = {};

	    if (isInputSupported && isTextareaSupported) {

	        placeholder = $.fn.placeholder = function() {
	            return this;
	        };

	        placeholder.input = true;
	        placeholder.textarea = true;

	    } else {

	        placeholder = $.fn.placeholder = function(options) {

	            var defaults = {customClass: 'placeholder'};
	            settings = $.extend({}, defaults, options);

	            return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']')
	                .not('.'+settings.customClass)
	                .not(':radio, :checkbox, [type=hidden]')
	                .bind({
	                    'focus.placeholder': clearPlaceholder,
	                    'blur.placeholder': setPlaceholder
	                })
	                .data('placeholder-enabled', true)
	                .trigger('blur.placeholder');
	        };

	        placeholder.input = isInputSupported;
	        placeholder.textarea = isTextareaSupported;

	        hooks = {
	            'get': function(element) {

	                var $element = $(element);
	                var $passwordInput = $element.data('placeholder-password');

	                if ($passwordInput) {
	                    return $passwordInput[0].value;
	                }

	                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
	            },
	            'set': function(element, value) {

	                var $element = $(element);
	                var $replacement;
	                var $passwordInput;

	                if (value !== '') {

	                    $replacement = $element.data('placeholder-textinput');
	                    $passwordInput = $element.data('placeholder-password');

	                    if ($replacement) {
	                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
	                        $replacement[0].value = value;

	                    } else if ($passwordInput) {
	                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
	                        element.value = value;
	                    }
	                }

	                if (!$element.data('placeholder-enabled')) {
	                    element.value = value;
	                    return $element;
	                }

	                if (value === '') {
	                    
	                    element.value = value;
	                    
	                    // Setting the placeholder causes problems if the element continues to have focus.
	                    if (element != safeActiveElement()) {
	                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
	                        setPlaceholder.call(element);
	                    }

	                } else {
	                    
	                    if ($element.hasClass(settings.customClass)) {
	                        clearPlaceholder.call(element);
	                    }

	                    element.value = value;
	                }
	                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
	                return $element;
	            }
	        };

	        if (!isInputSupported) {
	            valHooks.input = hooks;
	            propHooks.value = hooks;
	        }

	        if (!isTextareaSupported) {
	            valHooks.textarea = hooks;
	            propHooks.value = hooks;
	        }

	        $(function() {
	            // Look for forms
	            $(document).delegate('form', 'submit.placeholder', function() {
	                
	                // Clear the placeholder values so they don't get submitted
	                var $inputs = $('.'+settings.customClass, this).each(function() {
	                    clearPlaceholder.call(this, true, '');
	                });

	                setTimeout(function() {
	                    $inputs.each(setPlaceholder);
	                }, 10);
	            });
	        });

	        // Clear placeholder values upon page reload
	        $(window).bind('beforeunload.placeholder', function() {

	            var clearPlaceholders = true;

	            try {
	                // Prevent IE javascript:void(0) anchors from causing cleared values
	                if (document.activeElement.toString() === 'javascript:void(0)') {
	                    clearPlaceholders = false;
	                }
	            } catch (exception) { }

	            if (clearPlaceholders) {
	                $('.'+settings.customClass).each(function() {
	                    this.value = '';
	                });
	            }
	        });
	    }

	    function args(elem) {
	        // Return an object of element attributes
	        var newAttrs = {};
	        var rinlinejQuery = /^jQuery\d+$/;

	        $.each(elem.attributes, function(i, attr) {
	            if (attr.specified && !rinlinejQuery.test(attr.name)) {
	                newAttrs[attr.name] = attr.value;
	            }
	        });

	        return newAttrs;
	    }

	    function clearPlaceholder(event, value) {
	        
	        var input = this;
	        var $input = $(this);
	        
	        if (input.value === $input.attr((debugMode ? 'placeholder-x' : 'placeholder')) && $input.hasClass(settings.customClass)) {
	            
	            input.value = '';
	            $input.removeClass(settings.customClass);

	            if ($input.data('placeholder-password')) {

	                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
	                
	                // If `clearPlaceholder` was called from `$.valHooks.input.set`
	                if (event === true) {
	                    $input[0].value = value;

	                    return value;
	                }

	                $input.focus();

	            } else {
	                input == safeActiveElement() && input.select();
	            }
	        }
	    }

	    function setPlaceholder(event) {
	        var $replacement;
	        var input = this;
	        var $input = $(this);
	        var id = input.id;

	        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
	        if (event && event.type === 'blur' && $input.hasClass(settings.customClass)) {
	            return;
	        }

	        if (input.value === '') {
	            if (input.type === 'password') {
	                if (!$input.data('placeholder-textinput')) {
	                    
	                    try {
	                        $replacement = $input.clone().prop({ 'type': 'text' });
	                    } catch(e) {
	                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
	                    }

	                    $replacement
	                        .removeAttr('name')
	                        .data({
	                            'placeholder-enabled': true,
	                            'placeholder-password': $input,
	                            'placeholder-id': id
	                        })
	                        .bind('focus.placeholder', clearPlaceholder);

	                    $input
	                        .data({
	                            'placeholder-textinput': $replacement,
	                            'placeholder-id': id
	                        })
	                        .before($replacement);
	                }

	                input.value = '';
	                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

	            } else {
	                
	                var $passwordInput = $input.data('placeholder-password');

	                if ($passwordInput) {
	                    $passwordInput[0].value = '';
	                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
	                }
	            }

	            $input.addClass(settings.customClass);
	            $input[0].value = $input.attr((debugMode ? 'placeholder-x' : 'placeholder'));

	        } else {
	            $input.removeClass(settings.customClass);
	        }
	    }

	    function safeActiveElement() {
	        // Avoid IE9 `document.activeElement` of death
	        try {
	            return document.activeElement;
	        } catch (exception) {}
	    }
	}));


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/*!
	 * Lazy Load - jQuery plugin for lazy loading images
	 *
	 * Copyright (c) 2007-2015 Mika Tuupola
	 *
	 * Licensed under the MIT license:
	 *   //www.opensource.org/licenses/mit-license.php
	 *
	 * Project home:
	 *   //www.appelsiini.net/projects/lazyload
	 *
	 * Version:  1.9.7
	 *
	 */

	(function($, window, document, undefined) {
	    var $window = $(window);

	    $.fn.lazyload = function(options) {
	        var elements = this;
	        var $container;
	        var settings = {
	            threshold       : 0,
	            failure_limit   : 0,
	            event           : "scroll",
	            effect          : "show",
	            container       : window,
	            data_attribute  : "original",
	            skip_invisible  : false,
	            appear          : null,
	            load            : null,
	            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
	        };

	        function update() {
	            var counter = 0;

	            elements.each(function() {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                        /* Nothing. */
	                } else if (!$.belowthefold(this, settings) &&
	                    !$.rightoffold(this, settings)) {
	                        $this.trigger("appear");
	                        /* if we found an image we'll load, reset the counter */
	                        counter = 0;
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });

	        }

	        if(options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }

	            $.extend(settings, options);
	        }

	        /* Cache container as jQuery as object. */
	        $container = (settings.container === undefined ||
	                      settings.container === window) ? $window : $(settings.container);

	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.on(settings.event, function() {
	                return update();
	            });
	        }

	        this.each(function() {
	            var self = this;
	            var $self = $(self);

	            self.loaded = false;

	            /* If no src attribute given use data:uri. */
	            if ($self.attr("src") === undefined || $self.attr("src") === false) {
	                if ($self.is("img")) {
	                    $self.attr("src", settings.placeholder);
	                }
	            }

	            /* When appear is triggered load original image. */
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .one("load", function() {
	                            var original = $self.attr("data-" + settings.data_attribute);
	                            $self.hide();
	                            if ($self.is("img")) {
	                                $self.attr("src", original);
	                            } else {
	                                $self.css("background-image", "url('" + original + "')");
	                            }
	                            $self[settings.effect](settings.effect_speed);

	                            self.loaded = true;

	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);

	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.attr("data-" + settings.data_attribute));
	                }
	            });

	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.on(settings.event, function() {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });

	        /* Check if something appears when window is resized. */
	        $window.on("resize", function() {
	            update();
	        });

	        /* With IOS5 force loading images when navigating with back button. */
	        /* Non optimal workaround. */
	        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
	            $window.on("pageshow", function(event) {
	                if (event.originalEvent && event.originalEvent.persisted) {
	                    elements.each(function() {
	                        $(this).trigger("appear");
	                    });
	                }
	            });
	        }

	        /* Force initial check if images should appear. */
	        $(document).ready(function() {
	            update();
	        });

	        return this;
	    };

	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	    $.belowthefold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top + $(settings.container).height();
	        }

	        return fold <= $(element).offset().top - settings.threshold;
	    };

	    $.rightoffold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left + $(settings.container).width();
	        }

	        return fold <= $(element).offset().left - settings.threshold;
	    };

	    $.abovethetop = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top;
	        }

	        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
	    };

	    $.leftofbegin = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left;
	        }

	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };

	    $.inviewport = function(element, settings) {
	         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
	                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	     };

	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() or */
	    /* $("img").filter(":below-the-fold").something() which is faster */

	    $.extend($.expr[":"], {
	        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
	        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
	        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
	        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
	        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
	    });

	})(jQuery, window, document);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var page_module = __webpack_require__(40),
		dragula = __webpack_require__(6);

	/**
	 * [page_region 区域业务对象]
	 * @param  {[type]} htmlEntity [区域DOM元素对象]
	 * @return {[type]} [description]
	 */
	function page_region(htmlEntity, pageEntity) {
		var _this = this,

			/**
			 * [region_module_mapping 获取区域模块映射关系业务对象模块]
			 * @type {Object}
			 */
			region_module_mapping = __webpack_require__(50),

			/**
			 * [regionModuleMappingEntity 初始化区域模块映射关系业务对象实例]
			 * @type {region_module_mapping_entity}
			 */
			regionModuleMappingEntity = new region_module_mapping();

		/**
		 * [若html元素对象实例为空，则不进行任何操作]
		 */
		if (!htmlEntity) {
			return;
		}

		/**
		 * [扩展当前实例属性]
		 */
		$.extend(true, _this, {

			/**
			 * [listener 事件监听缓存对象]
			 * @type {Object}
			 */
			listener: {},

			/**
			 * [identifier 区域标识符]
			 * @type {String}
			 */
			identifier: '',

			/**
			 * [addible 区域是否可添加模块]
			 * @type {Boolean}
			 */
			addible: false,

			/**
			 * [dragable 区域内模块是否可拖动]
			 * @type {Boolean}
			 */
			dragable: true,

			/**
			 * [modulelist 区域下模块对象实例列表]
			 * @type {Array}
			 */
			moduleList: [],

			/**
			 * [htmlEntity 区域html元素对象实例]
			 * @type {Object}
			 */
			htmlEntity: null,

			/**
			 * [dataEntity 区域数据对象]
			 * @type {Object}
			 */
			dataEntity: null,

			/**
			 * [dragulaEntity 区域拖拽对象实例]
			 * @type {Object}
			 */
			dragulaEntity: null,

			/**
			 * [pageEntity 页面业务逻辑对象]
			 * @type {[type]}
			 */
			pageEntity: null,

			/**
			 * [regionModuleMappingEntity 缓存区域模块映射关系业务对象实例]
			 * @type {Object}
			 */
			regionModuleMappingEntity: regionModuleMappingEntity

		}, {
			htmlEntity: htmlEntity,
			pageEntity: pageEntity
		});

		/**
		 * 初始化业务对象
		 */
		page_region.prototype.init.call(_this);
	}

	/**
	 * [init 初始化业务对象]
	 * @return {[type]} [description]
	 */
	page_region.prototype.init = function() {
		var _this = this,

			/**
			 * [getElementBoolAttrValue 获取元素布尔类型的属性值]
			 * @param  {Object} element  [DOM元素]
			 * @param  {String} attrName [属性名]
			 * @return {Boolean}         [布尔类型属性值]
			 */
			getElementBoolAttrValue = function(element, attrName) {
				return element.attr(attrName) && ((element.attr(attrName) === 'true') || ($.trim(element.attr(attrName)).length === 0));
			};

		/**
		 * [创建模块包裹元素，用于防止模块和区域"添加模块"按钮可以拖动互换位置]
		 * @type {String}
		 */
		_this.htmlEntity.wrapInner('<div data-module-wrap="true"></div>');
		_this.htmlEntity.moduleWrap = _this.htmlEntity.find('[data-module-wrap]');

		/**
		 * 获取自定义属性 data-region 的内容并转换为JSON数据对象 
		 */
		try {
			_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-region') || '{}');
		} catch (e) {
			_this.dataEntity = {};
		}

		/**
		 * [addible 初始化区域是否创建"添加模块"按钮属性]
		 * @type {Boolean}
		 */
		_this.addible = getElementBoolAttrValue(_this.htmlEntity, 'data-addible'),

			/**
			 * [dragable 初始化区域内模块是否是否可拖动属性，默认可拖拽]
			 * @type {Boolean}
			 */
			_this.dragable = getElementBoolAttrValue(_this.htmlEntity, 'data-dragable') || _this.dragable,

			/**
			 * [identifier 初始化区域标识符属性]
			 * @type {String}
			 */
			_this.identifier = _this.dataEntity.regionmark || '',

			/**
			 * [初始化拖拽对象实例]
			 */
			_this.dragulaEntity = (_this.dragable && dragula([_this.htmlEntity.moduleWrap[0]], {
				removeOnSpill: false, //移出可放置区域外删除
				revertOnSpill: true, //移出可放置区域外重排
				mirrorContainer: _this.htmlEntity.moduleWrap[0],
				moves: function(el, container, handle) { //区域下拥有 data-dragable 属性的元素可拖拽
					return getElementBoolAttrValue($(el), 'data-dragable');
				}
			}));

		/**************************************************************************************我真不想把这个逻辑写在这，相信我**/
		/**
		 * [在布局为 左宽右窄时 设定25%区域下各模块 添加模块 按钮显示位置]
		 */
		if (_this.identifier === 'region_percent_25') {
			(parseInt(_this.pageEntity.layout) === 2) ? _this.htmlEntity.addClass('p25Rig'): _this.htmlEntity.removeClass('p25Rig');
		}

		/**
		 * [在布局为 左宽右窄时 设定75%区域下各模块 添加模块 按钮显示位置]
		 */
		if ((_this.identifier === 'region_percent_75') && (parseInt(_this.pageEntity.layout) === 2)) {
			(parseInt(_this.pageEntity.layout) === 2) ? _this.htmlEntity.addClass('p75Left'): _this.htmlEntity.addClass('p75Left');
		}
		/**************************************************************************************我真不想把这个逻辑写在这，相信我**/

		/**
		 * [注册拖拽对象实例 drop 事件，以实现区域内模块固定定位、更新区域内模块顺序、更新区域内模块“上移”、“上移”按钮显示状态]
		 */
		_this.dragulaEntity && _this.dragulaEntity.on('drop', function(el, target, source, sibling) { //区域下拥有 data-fixed 属性的元素固定

			/**
			 * [_dragulaEntityTemp 拖拽对象实例]
			 * @type {Object}
			 */
			var _dragulaEntityTemp = this;

			/**
			 * [不可将模块拖动到固顶模块的上方]
			 */
			if (getElementBoolAttrValue($(sibling), 'data-fixed-top')) {
				_dragulaEntityTemp.cancel();
				return;
			}

			/**
			 * [不可将模块拖动到固底模块的下方]
			 */
			if (getElementBoolAttrValue($(el).prev(), 'data-fixed-bottom')) {
				_dragulaEntityTemp.cancel();
				return;
			}

			/**
			 * 派发模块顺序变更事件
			 */
			_this.__dispatchEvent('onModuleReposition');

			/**
			 * [更新模块顺序到服务器端]
			 */
			_this.updateModuleSequence();
		});

		/**
		 * 创建区域"添加模块"按钮
		 */
		if (_this.addible) {
			_this.htmlEntity.btnAppendModule = $('<div class="addBannerImg"><a href="javascript:;">添加模块</a></div>').appendTo(_this.htmlEntity);
		}

		/**
		 * 初始化区域下模块对象实例列表
		 */
		_this.htmlEntity.find('[data-module]').each(function(index, element) {

			/**
			 * 实例化模块业务对象并添加到区域下模块对象实例列表
			 */
			_this.moduleList.push(new page_module($(element), _this));
		});

		/**
		 * 刷新模块"上移"、"下移"按钮状态
		 */
		_this.refreshModuleDragView();

		/**
		 * 绑定事件
		 */
		_this.bindEvent();

		/**
		 * [listener 初始化时，需要清空事件监听对象]
		 * @type {Object}
		 */
		_this.listener = {};

		/**
		 * [在删除模块成功时处理相关业务逻辑]
		 */
		_this.addEventListener('onRemoveModuleSuccess', function(moduleEntity) {

			/**
			 * [更新基于用户计数的模块数量]
			 */
			_this.regionModuleMappingEntity.decreaseModuleNum(moduleEntity.identifier);

			/**
			 * 刷新模块"上移"、"下移"按钮状态
			 */
			_this.refreshModuleDragView();

			/**
			 * 刷新页面所有区域添加模块按钮视图
			 */
			_this.pageEntity.refreshAllRegionAppendModuleButtonView();

			/**
			 * [更新模块顺序到服务器端]
			 */
			// _this.updateModuleSequence();
		});

		/**
		 * [在添加模块成功时处理相关业务逻辑]
		 */
		_this.addEventListener('onAppendModuleSuccess', function(moduleEntity) {

			/**
			 * [更新基于用户计数的模块数量]
			 */
			_this.regionModuleMappingEntity.increaseModuleNum(moduleEntity.identifier);

			/**
			 * 刷新页面所有区域添加模块按钮视图
			 */
			_this.pageEntity.refreshAllRegionAppendModuleButtonView();

			/**
			 * [针对模块懒加载的图片进行懒加载初始化，并立刻呈现懒加载图片]
			 */
			$.fn.lazyload && moduleEntity.htmlEntity.find("img[data-original]").lazyload({
				threshold: 0,
				failurelimit: 10,
				container: moduleEntity.htmlEntity,
				skip_invisible: true
			}).trigger('appear');
		});

		/**
		 * [在模块顺序更新成功后处理相关业务逻辑]
		 */
		_this.addEventListener('onUpdateModuleSequenceStart', function() {

			/**
			 * 刷新模块"上移"、"下移"按钮状态
			 */
			_this.refreshModuleDragView();
		});
	};

	/**
	 * [bindEvent 绑定区域相关事件]
	 * @return {[type]} [description]
	 */
	page_region.prototype.bindEvent = function() {
		var _this = this;

		/**
		 * [绑定“添加模块”按钮点击事件]
		 */
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.click(function(event) {

			/**
			 * 区域内新增模块
			 */
			_this.appendModule();
		});
	};

	/**
	 * [insertModule 区域内新增模块]
	 * @param  {Number} position [模块插入位置]
	 */
	page_region.prototype.insertModule = function(position) {
		var _this = this,

			/**
			 * [_position 模块插入位置小于0，表示当前模块插入位置]
			 */
			_position = position < 0 ? 0 : position;

		/**
		 * [若模块新增选择框已加载，则直接返回，防止重复加载]
		 */
		if (_this['module-selector-loading']) {
			return;
		}

		/**
		 * 设置模块新增选择框
		 */
		_this['module-selector-loading'] = true;

		/**
		 * [_dialogTemp 显示加载中弹出框]
		 * @type {Object}
		 */
		_dialogTemp = dialog({
			content: '<span class="ui-dialog-loading">加载中..</span>'
		}).show();

		/**
		 * [异步加载新增模块弹出框业务逻辑模块]
		 */
		__webpack_require__.e/* nsure */(10, function(require) {

			/**
			 * [moduleTemp 业务逻辑模块]
			 * @type {Object}
			 */
			var moduleTemp = __webpack_require__(90);

			/**
			 * 渲染新增模块弹出框
			 */
			new moduleTemp({

				/**
				 * [regionEntity 区域业务对象]
				 * @type {Object}
				 */
				regionEntity: _this,

				/**
				 * [appendModuleCallback 更新DOM结构及模块列表数据回调函数]
				 * @param {[type]} htmlEntity [新模块的DOM元素]
				 */
				appendModuleCallback: function(htmlEntity) {

					/**
					 * [_tempModuleEntity 创建模块对象实例]
					 * @type {page_module}
					 */
					var _tempModuleEntity = new page_module(htmlEntity, _this),

						/**
						 * [_prev 获取插入位置上一个模块]
						 * @type {Object}
						 */
						_prev = _this.moduleList[position - 1],

						/**
						 * [_next 获取插入位置下一个模块]
						 * @type {Object}
						 */
						_next = _this.moduleList[position];

					/**
					 * [添加置顶、置底模块]
					 */
					if (_tempModuleEntity.fixedtop || _tempModuleEntity.fixedbottom) {

						/**
						 * [position 新增置顶模块位置]
						 * @type {Number}
						 */
						_tempModuleEntity.fixedtop && (position = 0);

						/**
						 * [position 新增置底模块位置]
						 * @type {Number}
						 */
						_tempModuleEntity.fixedbottom && (position = _this.moduleList.length);

					}
					/**
					 * 添加非置顶、置底模块
					 */
					else {

						/**
						 * [若上一个模块或下一个模块既固顶且固底则直接返回]
						 */
						if ((_prev && _prev.fixedbottom && _prev.fixedtop) || (_next && _next.fixedbottom && _next.fixedtop)) {
							return;
						}

						/**
						 * [循环获取模块插入位置]
						 *
						 * 若上一个模块固底则插入位置上移，若下一个模块固顶则插入位置下移，直到获取到正确的插入位置
						 */
						while ((_prev && _prev.fixedbottom && (position--)) || (_next && _next.fixedtop && (position++))) {

							/**
							 * [若循环判断后的插入位置为区域顶部或区域底部则直接添加]
							 */
							if ((position === 0) || (position === _this.moduleList.length)) {
								break;
							}
							_prev = _this.moduleList[position - 1],
								_next = _this.moduleList[position];
						}
					}

					/**
					 * 插入新模块DOM元素
					 *
					 * 若下一个模块存在，则基于下一个模块添加新模块的DOM元素。否则，基于包裹元素追加新模块的DOM元素
					 */
					if (_this.moduleList[position]) {
						htmlEntity.insertBefore(_this.moduleList[position].htmlEntity);
					} else {
						_this.htmlEntity.moduleWrap.append(htmlEntity);
					}

					/**
					 * 更新区域模块数据列表
					 */
					_this.moduleList.splice(position, 0, _tempModuleEntity);

					/**
					 * [更新模块顺序到服务器端]
					 */
					_this.updateModuleSequence();

					/**
					 * 派发新增模块成功事件
					 */
					_this.__dispatchEvent('onAppendModuleSuccess', _tempModuleEntity);
				},

				/**
				 * [rendedCallback 渲染完毕回调]
				 */
				rendedCallback: function() {

					/**
					 * 设置模块新增选择框加载完成
					 */
					_this['module-selector-loading'] = false;

					/**
					 * 关闭加载中弹出框
					 */
					_dialogTemp.remove();
				}
			});
		});
	};

	/**
	 * [appendModule 区域内追加新模块]
	 * @return {[type]}         [description]
	 */
	page_region.prototype.appendModule = function() {
		var _this = this;

		/**
		 * 新模块插入到当前区域的最后位置
		 */
		_this.insertModule(_this.moduleList.length || 0);
	};

	/**
	 * [prependModule 区域内某模块前新增模块]
	 * @param  {[type]} module [某模块]
	 * @return {[type]}        [description]
	 */
	page_region.prototype.prependModule = function(module) {
		var _this = this,
			_position = _this.moduleList.indexOf(module);

		/**
		 * [_position 避免当前模块在当前区域的模块列表中不存在的情况]
		 */
		_position = _position < 0 ? 0 : _position;

		/**
		 * 新模块插入到当前模块之前的位置
		 */
		_this.insertModule(_position);
	};

	/**
	 * [removeModule 删除区域内模块]
	 * @param  {[type]} moduleEntity [要删除的模块对象实例]
	 * @return {[type]}              [description]
	 */
	page_region.prototype.removeModule = function(moduleEntity, callback) {
		var _this = this,
			_module_list = _this.moduleList,
			_callee = arguments.callee,

			/**
			 * [定义将模块删除的延迟对象]
			 */
			ajaxTemp = $.ajax({
				url: '/detail/turbine/action/DeleteModuleAction/eventsubmit_doDelete/doDelete',
				type: 'POST',
				data: {
					t: Math.random(),
					moduleid: moduleEntity.dataEntity.moduleid
				},
				dataType: 'json'
			});

		/**
		 * [定义延迟对象成功回调函数]
		 */
		ajaxTemp.done(function(json) {

			/**
			 * [若返回数据不正确，则提示服务器端返回的错误信息]
			 */
			if (!parseInt(json.state)) {

				/**
				 * [执行回调函数]
				 * @type {Boolean}
				 */
				var boolTemp = callback && callback({
					state: false,
					message: decodeURIComponent(json.message || '')
				});

				/**
				 * [提示模块顺序保存失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: decodeURIComponent(json.message || '') || '',
					cancelValue: '取消',
					cancel: function() {
						this.close().remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.close().remove();
					}
				}).showModal();
				return;
			}

			/**
			 * 删除模块DOM结构
			 */
			moduleEntity.htmlEntity.remove();

			/**
			 * 删除模块内存数据
			 */
			var _moduleIndex = _module_list.indexOf(moduleEntity);
			if (_moduleIndex != -1) {
				_module_list.splice(_moduleIndex, 1);
			}

			/**
			 * 派发删除模块成功事件
			 */
			_this.__dispatchEvent('onRemoveModuleSuccess', moduleEntity);

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			callback && callback({
				state: true,
				message: decodeURIComponent(json.message || '')
			});
		});

		/**
		 * [定义延迟对象失败回调函数]
		 */
		ajaxTemp.fail(function() {

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			var boolTemp = callback && callback({
				state: false,
				message: '模块删除失败'
			});

			/**
			 * [提示模块顺序保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: '模块删除失败',
				cancelValue: '取消',
				cancel: function() {
					this.close().remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.close().remove();
				}
			}).showModal();
		});
	};

	/**
	 * [updateModuleSequence 更新区域内模块顺序]
	 * @param  {Function} callback [更新后的回调函数]
	 * @return {[type]}            [description]
	 */
	page_region.prototype.updateModuleSequence = function(callback) {
		var _this = this,
			_module_list = _this.moduleList,
			_module_sequence_data = [],
			_callee = arguments.callee;

		/**
		 * 根据页面上的模块顺序，更新内存中模块排序，无论更新成功与否保证内存中的数据与页面表现统一性
		 */
		_module_list.sort(function(moduleA, moduleB) {
			return moduleA.htmlEntity.index() - moduleB.htmlEntity.index();
		});

		/**
		 * [_module_sequence_data 构建传递到服务器端的模块顺序数据]
		 * @type {Array}
		 */
		_module_sequence_data = $.map(_module_list, function(module, moduleIndex) {
			return {
				moduleid: module.dataEntity.moduleid || 0,
				moduleorder: moduleIndex + 1
			};
		});

		/**
		 * 派发模块顺序更新开始事件
		 */
		_this.__dispatchEvent('onUpdateModuleSequenceStart');

		/**
		 * [定义将模块顺序更新到服务器端的延迟对象]
		 */
		var ajaxTemp = $.ajax({
			url: '/detail/turbine/action/RegionModuleSortAction/eventsubmit_doModulesort/doModulesort',
			type: 'GET',
			dataType: 'json',
			data: {
				t: Math.random(),
				modulelist: JSON.stringify(_module_sequence_data)
			}
		});

		/**
		 * [定义延迟对象成功回调函数]
		 */
		ajaxTemp.done(function(json) {

			/**
			 * [若返回数据不正确，则提示服务器端返回的错误信息]
			 */
			if (!json.state) {

				/**
				 * [执行回调函数]
				 * @type {Boolean}
				 */
				callback && callback({
					state: false,
					message: decodeURIComponent(json.message || '')
				});

				/**
				 * [提示模块顺序保存失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: decodeURIComponent(json.message || ''),
					cancelValue: '取消',
					cancel: function() {
						this.close().remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.close().remove();
					}
				}).showModal();
				return;
			}

			/**
			 * 派发模块顺序更新成功事件
			 */
			_this.__dispatchEvent('onUpdateModuleSequenceSuccess');

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			callback && callback({
				state: true,
				message: decodeURIComponent(json.message || '')
			});
		});

		/**
		 * [定义延迟对象失败回调函数]
		 */
		ajaxTemp.fail(function() {

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			var boolTemp = callback && callback({
				state: false,
				message: '模块顺序保存失败'
			});

			/**
			 * [提示模块顺序保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: '模块顺序保存失败',
				cancelValue: '取消',
				cancel: function() {
					this.close().remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.close().remove();
				}
			}).showModal();
		});
	};

	/**
	 * [shiftUpModule 上移模块]
	 */
	page_region.prototype.shiftUpModule = function(moduleEntity) {
		var _this = this,

			/**
			 * [_index 获取当前模块在区域中的位置]
			 * @type {Number}
			 */
			_index = _this.moduleList.indexOf(moduleEntity),

			/**
			 * [_prev 获取当前模块上一个模块]
			 * @type {Object}
			 */
			_prev = _this.moduleList[_index - 1];

		/**
		 * [当前模块是区域内第一个模块]
		 */
		if ((_index === -1) || (_index === 0) || (!_prev)) {
			return;
		}

		/**
		 * [当前模块不可移动]
		 */
		if (!_this.dragable) {
			return;
		}

		/**
		 * [当前模块的上一个模块为固顶模块]
		 */
		if (_prev.fixedtop) {
			return;
		}

		/**
		 * 移动当前模块的DOM结构
		 */
		moduleEntity.htmlEntity.insertBefore(_prev.htmlEntity);

		/**
		 * [更新模块顺序到服务器端]
		 */
		_this.updateModuleSequence();

		/**
		 * 派发模块顺序变更事件
		 */
		_this.__dispatchEvent('onModuleReposition');
	};

	/**
	 * [shiftDownModule 下移模块]
	 */
	page_region.prototype.shiftDownModule = function(moduleEntity) {
		var _this = this,

			/**
			 * [_index 获取当前模块在区域中的位置]
			 * @type {Number}
			 */
			_index = _this.moduleList.indexOf(moduleEntity),

			/**
			 * [_next 获取当前模块下一个模块]
			 * @type {Object}
			 */
			_next = _this.moduleList[_index + 1];

		/**
		 * [当前模块是区域内最后一个模块]
		 */
		if ((_index === -1) || (_this.moduleList.length === (_index + 1)) || (!_next)) {
			return;
		}

		/**
		 * [当前模块不可移动]
		 */
		if (!_this.dragable) {
			return;
		}

		/**
		 * [当前模块的上一个模块为固顶模块]
		 */
		if (_next.fixedbottom) {
			return;
		}

		/**
		 * 移动当前模块的DOM结构
		 */
		moduleEntity.htmlEntity.insertAfter(_next.htmlEntity);

		/**
		 * [更新模块顺序到服务器端]
		 */
		_this.updateModuleSequence();

		/**
		 * 派发模块顺序变更事件
		 */
		_this.__dispatchEvent('onModuleReposition');
	};

	/**
	 * [refreshModuleView 刷新模块"上移"、"下移"按钮状态]
	 */
	page_region.prototype.refreshModuleDragView = function() {
		var _this = this;

		/**
		 * [设置区域内模块"上移"、"下移"按钮状态]
		 */
		$.each(_this.moduleList, function(moduleIndex, module) {

			/**
			 * 重置当前模块"上移"、"下移"按钮状态
			 */
			module.htmlEntity.btnUp && module.htmlEntity.btnUp.show();
			module.htmlEntity.btnDown && module.htmlEntity.btnDown.show();

			/**
			 * [模块在顶部时，隐藏"上移"按钮]
			 */
			if (moduleIndex === 0) {
				module.htmlEntity.btnUp && module.htmlEntity.btnUp.hide();
			}
			/**
			 * [若当前模块的上一个模块为固顶模块，隐藏"上移"按钮]
			 */
			else {
				var prevModule = _this.moduleList[moduleIndex - 1];
				if (prevModule && prevModule.fixedtop) {
					module.htmlEntity.btnUp && module.htmlEntity.btnUp.hide();
				}
			}

			/**
			 * [模块在底部时，隐藏"下移"按钮]
			 */
			if (_this.moduleList.length === (moduleIndex + 1)) {
				module.htmlEntity.btnDown && module.htmlEntity.btnDown.hide();
			}
			/**
			 * [若当前模块的下一个模块为固顶模块，隐藏"上移"按钮]
			 */
			else {
				var nextModule = _this.moduleList[moduleIndex + 1];
				if (nextModule && nextModule.fixedbottom) {
					module.htmlEntity.btnDown && module.htmlEntity.btnDown.hide();
				}
			}
		});
	};

	/**
	 * [__getEventListener 获取指定事件类型的事件处理函数列表]
	 * @param  {String} eventType [事件类型]
	 * @return {Array}           [事件处理函数列表]
	 */
	page_region.prototype.__getEventListener = function(eventType) {
		var _this = this;
		_this.listener[eventType] = _this.listener[eventType] ? _this.listener[eventType] : [];
		return _this.listener[eventType];
	};

	/**
	 * [__dispatchEvent 派发事件]
	 */
	page_region.prototype.__dispatchEvent = function() {
		var _this = this,
			_eventType = Array.prototype.shift.call(arguments),
			_listener = _this.__getEventListener(_eventType);

		for (var i = 0; i < _listener.length; i++) {
			try {
				_listener[i].apply(_this, arguments);
			} catch (ex) {}
		}
	};

	/**
	 * [__removeEventListener 移除事件监听]
	 * @param {String} eventType    [事件类型]
	 * @param {Object} eventHandler [事件处理函数]
	 * @return {Object}              [当前业务对象]
	 */
	page_region.prototype.removeEventListener = function(eventType, eventHandler) {
		var _this = this,
			_listener = _this.__getEventListener(eventType);

		for (var i = 0; i < _listener.length; i++) {
			if (eventHandler === _listener[i]) {
				_listener.splice(i--, 1);
			}
		}
	};

	/**
	 * [addEventListener 添加事件监听]
	 * @param {String} eventTypes    [事件类型名称列表]
	 * @param {Object} eventHandler [事件处理函数]
	 * @return {Object}              [当前业务对象]
	 */
	page_region.prototype.addEventListener = function(eventTypes, eventHandler) {
		var _this = this,
			_listener = [],
			_eventTypeList = eventTypes.split(',');

		/**
		 * [循环添加不同事件类型的事件处理函数]
		 */
		$.each(_eventTypeList, function(index, eventType) {

			/**
			 * [过滤空事件类型名称]
			 */
			if (!($.trim(eventType).length)) {
				return true;
			}

			/**
			 * 获取指定事件类型的事件处理函数列表
			 */
			_listener = _this.__getEventListener(eventType);

			/**
			 * 将事件处理函数添加到指定事件类型的事件处理函数列表
			 */
			_listener.push(eventHandler);
		});
	};

	module.exports = page_region;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/***
	 * 引入所见即所得后台模块默认配置数据
	 * @type {setting|exports|module.exports}
	 */
	var moduleDefaultSetting = __webpack_require__(41);

	/**
	 * [page_module 模块业务对象]
	 * @param  {[type]} htmlEntity   [模块DOM元素对象]
	 * @param  {[type]} regionEntity [模块所在区域业务对象]
	 * @return {[type]}              [description]
	 */
	function page_module(htmlEntity, regionEntity) {
		var _this = this;

		/**
		 * [若html元素对象实例为空，则不进行任何操作]
		 */
		if (!htmlEntity) {
			return;
		}

		/**
		 * [扩展当前实例属性]
		 */
		$.extend(true, _this, {

			/**
			 * [listener 事件监听缓存对象]
			 * @type {Object}
			 */
			listener: {},

			/**
			 * [identifier 模块标识符]
			 * @type {String}
			 */
			identifier: '',

			/**
			 * [addible 模块是否可添加模块]
			 * @type {Boolean}
			 */
			addible: false,

			/**
			 * [configurable 模块是否可配置]
			 * @type {Boolean}
			 */
			configurable: false,

			/**
			 * [dragable 模块是否可拖动]
			 * @type {Boolean}
			 */
			dragable: false,

			/**
			 * [deletable 模块是否可删除]
			 * @type {Boolean}
			 */
			deletable: false,

			/**
			 * [fixed 模块位置是否固定]
			 * @type {Boolean}
			 */
			fixed: false,

			/**
			 * [htmlEntity 模块html元素对象实例]
			 * @type {Object}
			 */
			htmlEntity: null,

			/**
			 * [dataEntity 模块数据对象]
			 * @type {Object}
			 */
			dataEntity: null,

			/**
			 * [regionEntity 模块所在区域业务对象]
			 * @type {Object}
			 */
			regionEntity: null
		}, {
			htmlEntity: htmlEntity,
			regionEntity: regionEntity
		});

		/**
		 * 初始化业务对象
		 */
		page_module.prototype.init.call(_this);
	}

	/**
	 * [init 初始化业务对象]
	 * @return {[type]} [description]
	 */
	page_module.prototype.init = function() {
		var _this = this,

			/**
			 * [getElementBoolAttrValue 获取元素布尔类型的属性值]
			 * @param  {Object} element  [DOM元素]
			 * @param  {String} attrName [属性名]
			 * @return {Boolean}         [布尔类型属性值]
			 */
			getElementBoolAttrValue = function(element, attrName) {
				return element.attr(attrName) && ((element.attr(attrName) === 'true') || ($.trim(element.attr(attrName)).length === 0));
			};

		/**
		 * 获取自定义属性 data-module 的内容并转换为JSON数据对象
		 */
		try {
			_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-module').replace(/\t/igm, "") || '{}');
		} catch (e) {
			_this.dataEntity = {};
		}

		/**
		 * [addible 初始化模块是否创建"添加模块"按钮属性]
		 * @type {[type]}
		 */
		_this.addible = getElementBoolAttrValue(_this.htmlEntity, 'data-addible'),

			/**
			 * [configurable 初始化模块是否可配置属性]
			 * @type {[type]}
			 */
			_this.configurable = getElementBoolAttrValue(_this.htmlEntity, 'data-configurable'),

			/**
			 * [dragable 初始化模块是否可拖动属性]
			 * @type {[type]}
			 */
			_this.dragable = getElementBoolAttrValue(_this.htmlEntity, 'data-dragable'),

			/**
			 * [deletable 初始化模块是否可删除属性]
			 * @type {[type]}
			 */
			_this.deletable = getElementBoolAttrValue(_this.htmlEntity, 'data-deletable'),

			/**
			 * [fixedtop 初始化模块是否固顶属性]
			 * @type {[type]}
			 */
			_this.fixedtop = getElementBoolAttrValue(_this.htmlEntity, 'data-fixed-top'),

			/**
			 * [fixedtop 初始化模块是否固顶属性]
			 * @type {[type]}
			 */
			_this.fixedbottom = getElementBoolAttrValue(_this.htmlEntity, 'data-fixed-bottom'),

			/**
			 * [manageable 初始化模块是否可管理属性]
			 * @type {[type]}
			 */
			_this.manageable = getElementBoolAttrValue(_this.htmlEntity, 'data-manageable'),

			/**
			 * [identifier 初始化区域标识符属性]
			 * @type {String}
			 */
			_this.identifier = _this.dataEntity.modulemark || '';

		/**
		 * 覆盖模块默认配置项，以避免模块自定义属性中缺少必要配置项造成错误
		 */
		_this.dataEntity.data = $.extend(true, {}, moduleDefaultSetting[_this.identifier], _this.dataEntity.data);

		/**
		 * [创建模块"添加模块"按钮]
		 */
		if (_this.addible) {
			_this.htmlEntity.btnAppendModule = $('<div class="addBox"><a href="javascript:;">添加模块</a></div>').appendTo(_this.htmlEntity).hide();
		}

		/**
		 * [overlayer 创建模块遮罩层,并默认隐藏]
		 * @type {[type]}
		 */
		_this.htmlEntity.overlayer = $('<div class="colunmEdit"><div class="colunmBg"></div><div class="colunmBtn"></div></div>').appendTo(_this.htmlEntity).hide();

		/**
		 * [overlayerBg 模块遮罩层背景元素]
		 * @type {Object}
		 */
		_this.htmlEntity.overlayerBg = _this.htmlEntity.overlayer.find('.colunmBg');

		/**
		 * [btnwrap 初始化模块按钮包裹元素]
		 * @type {[type]}
		 */
		_this.htmlEntity.btnWrap = _this.htmlEntity.overlayer.find('.colunmBtn');

		/**
		 * [创建模块"上移" "下移"按钮]
		 */
		if (_this.dragable) {
			_this.htmlEntity.addClass('dragable'); //添加可拖拽样式类名
			_this.htmlEntity.btnUp = $('<a href="javascript:;" class="upBtn"></a>').appendTo(_this.htmlEntity.btnWrap);
			_this.htmlEntity.btnDown = $('<a href="javascript:;" class="downBtn"></a>').appendTo(_this.htmlEntity.btnWrap);
		}

		/**
		 * [创建模块"设置"按钮]
		 */
		if (_this.configurable) {
			_this.htmlEntity.btnSetting = $('<a href="javascript:;" class="colunmBtn1">设置</a>').appendTo(_this.htmlEntity.btnWrap);
		}

		/**
		 * [创建模块"删除"按钮]
		 */
		if (_this.deletable) {
			_this.htmlEntity.btnDelete = $('<a href="javascript:;" class="colunmBtn1">删除</a>').appendTo(_this.htmlEntity.btnWrap);
		}

		/**
		 * [创建模块"管理"按钮]
		 */
		if (_this.manageable) {
			_this.htmlEntity.btnManage = $('<a href="' + (_this.dataEntity.href || '#') + '" class="colunmBtn1" target="_blank">管理</a>').appendTo(_this.htmlEntity.btnWrap);
		}

		/**
		 * 绑定模块相关事件
		 */
		_this.bindEvent();

		/**
		 * [listener 初始化模块时，需要清空事件监听对象]
		 * @type {Object}
		 */
		_this.listener = {};

		/**
		 * [在添加模块成功时处理相关业务逻辑]
		 */
		_this.addEventListener('onModuleUpdateSuccess', function() {

			/**
			 * 刷新模块"上移"、"下移"按钮状态
			 */
			_this.regionEntity.refreshModuleDragView();

			/**
			 * [针对模块懒加载的图片进行懒加载初始化，并立刻呈现懒加载图片]
			 */
			$.fn.lazyload && _this.htmlEntity.find("img[data-original]").lazyload({
				threshold: 0,
				failurelimit: 10,
				container: _this.htmlEntity,
				skip_invisible: true
			}).trigger('appear');
		});
	};

	/**
	 * [bindEvent 绑定模块相关事件]
	 * @return {[type]} [description]
	 */
	page_module.prototype.bindEvent = function() {
		var _this = this;

		/**
		 * [绑定“添加模块”按钮点击事件]
		 */
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.click(function(event) {

			/**
			 * 调用区域新增模块功能
			 */
			_this.regionEntity.prependModule(_this);
		});

		/**
		 * [绑定“删除”按钮点击事件]
		 */
		_this.htmlEntity.btnDelete && _this.htmlEntity.btnDelete.click(function(event) {

			/**
			 * [当前模块是否可删除]
			 */
			if (!_this.deletable) {
				return false;
			}

			/**
			 * [提示模块顺序保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: '确定要删除此模块吗？',
				cancelValue: '取消',
				cancel: function() {
					this.close().remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 调用区域业务对象的删除区域内模块方法
					 */
					_this.regionEntity.removeModule(_this);

					/**
					 * 关闭弹出框
					 */
					this.close().remove();
				}
			}).showModal();
		});

		/**
		 * [绑定“上移”按钮点击事件]
		 */
		_this.htmlEntity.btnUp && _this.htmlEntity.btnUp.click(function(event) {

			/**
			 * 调用区域业务对象的模块上移方法
			 */
			_this.regionEntity.shiftUpModule(_this);

			/**
			 * 隐藏被移动模块的遮罩层、添加模块按钮
			 */
			_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
			_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
		});

		/**
		 * [绑定“下移”按钮点击事件]
		 */
		_this.htmlEntity.btnDown && _this.htmlEntity.btnDown.click(function(event) {

			/**
			 * 调用区域业务对象的模块下移方法
			 */
			_this.regionEntity.shiftDownModule(_this);

			/**
			 * 隐藏被移动模块的遮罩层、添加模块按钮
			 */
			_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
			_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
		});

		/**
		 * [绑定模块鼠标悬浮时显示遮罩层，否则隐藏]
		 */
		_this.htmlEntity.mouseenter(function(event) {
			_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.show();
			_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.show();
		}).mouseleave(function(event) {
			_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
			_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
		});

		/**
		 * [若模块可设置则绑定模块“设置”按钮点击事件]
		 */
		_this.configurable && _this.htmlEntity.btnSetting && _this.htmlEntity.btnSetting.click(function(event) {

			/**
			 * 显示模块设置遮罩层
			 */
			_this.showModuleSettingOverlayer();
		});

		/**
		 * [若模块可设置则绑定遮罩层点击事件，执行模块设置按钮逻辑]
		 */
		_this.configurable && _this.htmlEntity.overlayerBg.click(function(event) {

			/**
			 * 显示模块设置遮罩层
			 */
			_this.showModuleSettingOverlayer();
		});

		/**
		 * 获取当前类型模块的渲染逻辑模块
		 */
		var renderModule;
		try {
			renderModule = __webpack_require__(42)("./" + _this.identifier);
		} catch (ex) {}

		/**
		 * [存在渲染逻辑模块则执行，避免创建过多渲染逻辑模块实例，因为大多数模块不需要就行前台渲染]
		 */
		renderModule && (_this.renderEntity = new renderModule(_this)) && _this.renderEntity.render && _this.renderEntity.render();
	};

	/**
	 * [showModuleSettingOverlayer 显示模块设置遮罩层]
	 */
	page_module.prototype.showModuleSettingOverlayer = function() {
		var _this = this,

			/**
			 * 获取模块设置表单HTML延迟对象
			 */
			_xhrTemp,

			/**
			 * [_htmlCache 模块设置表单HTML缓存]
			 * @type {String}
			 */
			_htmlCache = _this.regionEntity.pageEntity.cache['module-setting-html'],

			/**
			 * [_callee 获取当前正在执行函数]
			 * @type {Object}
			 */
			_callee = arguments.callee;

		/**
		 * [若模块新增选择框已加载，则直接返回，防止重复加载]
		 */
		if (_this['module-loading']) {
			return;
		}

		/**
		 * 设置模块新增选择框
		 */
		_this['module-loading'] = true;

		/**
		 * [_dialogTemp 显示加载中弹出框]
		 * @type {Object}
		 */
		var _dialogTemp = dialog({
			content: '<span class="ui-dialog-loading">加载中..</span>'
		}).show();

		/**
		 * 从缓存中获取模块设置表单HTML
		 */
		if (_htmlCache[_this.identifier]) {
			_xhrTemp = $.Deferred();
			_xhrTemp.resolve(_htmlCache[_this.identifier]);
		}
		/**
		 * 若缓存中不存在模块设置表单HTML，则从服务器端获取
		 */
		else {

			/**
			 * 显示加载中弹出框
			 */
			_dialogTemp.show();

			/**
			 * [_xhrTemp 从服务器端获取模块设置表单HTML]
			 * @type {Object}
			 */
			_xhrTemp = $.ajax({
				url: '/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=' + _this.identifier,
				type: 'GET',
				dataType: 'jsonp'
			});
		}

		/**
		 * [异步加载各模块设置业务逻辑模块]
		 */
		__webpack_require__.e/* nsure */(2, function(require) {

			/**
			 * [成功获取模块设置HTML]
			 */
			_xhrTemp.done(function(html) {

				/**
				 * 将模块设置表单HTML写入缓存
				 */
				_htmlCache[_this.identifier] = html;

				/**
				 * [moduleSettingTemp 获取设置模块]
				 * @type {Object}
				 */
				var moduleSettingTemp = __webpack_require__(51)("./" + _this.identifier);

				/**
				 * 创建设置模块对象
				 */
				new moduleSettingTemp(_this, html, {

					/**
					 * [rendedCallback 渲染完毕回调]
					 */
					rendedCallback: function() {

						/**
						 * 设置模块新增选择框加载完成
						 */
						_this['module-loading'] = false;

						/**
						 * 关闭加载中弹出框
						 */
						_dialogTemp.remove();
					}
				});
			});

			/**
			 * [获取模块设置HTML失败]
			 */
			_xhrTemp.fail(function() {

				/**
				 * [提示模块HTML获取失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: '模块设置表单获取失败',
					cancelValue: '取消',
					cancel: function() {
						this.close().remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.remove();
					}
				}).showModal();

				/**
				 * 设置模块新增选择框加载完成
				 */
				_this['module-loading'] = false;

				/**
				 * [关闭加载中弹出框]
				 */
				_dialogTemp.remove();
			});

		});
	};

	/**
	 * [validate 验证是否允许操作收费模块]
	 * @return {Boolean} [是否允许操作]
	 */
	page_module.prototype.validate = function() {
		var _this = this,

			/**
			 * [_ret 是否允许操作]
			 * @type {Boolean}
			 */
			_ret = {
				state: true,
				message: ''
			},

			/**
			 * [region_module_mapping 获取区域模块映射关系业务对象模块]
			 * @type {Object}
			 */
			region_module_mapping = __webpack_require__(50),

			/**
			 * [region_module_mapping_entity 初始化区域模块映射关系业务对象实例]
			 * @type {region_module_mapping_entity}
			 */
			region_module_mapping_entity = new region_module_mapping(),

			/**
			 * [region_module_mapping_data 获取各区域下各模块的配置数据]
			 * @type {Object}
			 */
			region_module_mapping_data = region_module_mapping_entity.analyticPageModuleData(_this.regionEntity.pageEntity, _this.regionEntity);

		/**
		 * [验证是否有权限更新当前模块]
		 */
		$.each(region_module_mapping_data, function(moduleIndex, moduleData) {
			if (moduleData.identifier === _this.identifier) {

				/**
				 * [验证当前用户是否有权限对高级模块进行操作，验证当前用户是否有权限对模拟登陆才能操作的模块进行操作]
				 */
				if ((!moduleData.limit_authority) || (!moduleData.limit_simulatedlogin)) {
					_ret.state = false;
					_ret.message = moduleData.message.join('，');
				}
				return false;
			}
		});

		return _ret;
	};

	/**
	 * [update 更新模块]
	 * @param  {Object}   moduleData      [模块可配置的自定义数据集]
	 * @param  {Function} successCallback [成功更新后的回调]
	 * @param  {Function} failCallback    [更新失败后的回调]
	 * @return {[type]}                   [description]
	 */
	page_module.prototype.update = function(moduleData, successCallback, failCallback) {
		var _this = this,

			/**
			 * [_params 模块设置保存基本参数]
			 * @type {Object}
			 */
			_params = {
				'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
				'operatedata': { //操作内容
					'providerid': _this.regionEntity.pageEntity.providerid, //商铺编号
					'username': _this.regionEntity.pageEntity.username, //商铺用户名
					'templateid': _this.regionEntity.pageEntity.template.id, //模板id
					'pagetype': _this.regionEntity.pageEntity.pagetype //区分频道页和二级页
				},
				'username': _this.regionEntity.pageEntity.username
			},

			/**
			 * [_callee 正在执行函数引用]
			 * @type {Function}
			 */

			_callee = arguments.callee;

		/**
		 * [验证是否允许操作当前模块]
		 */
		var _validate = _this.validate();
		if (!_validate.state) {
			dialog({
				title: '提示',
				content: _validate.message,
				okValue: '确定',
				ok: function() {
					this.remove();
				}
			}).showModal();
			return;
		}

		/**
		 * [loadingDialogEntity 显示加载中的遮罩层]
		 * @type {Object}
		 */
		var loadingDialogEntity = dialog({
			content: '<span class="ui-dialog-loading">加载中..</span>'
		}).showModal();

		/**
		 * [operatedata 更新请求参数]
		 * @type {Object}
		 */
		_params.operatedata = encodeURIComponent(JSON.stringify($.extend({}, _params.operatedata, _this.dataEntity, moduleData)));

		/***
		 * 增加一个时间戳字段，防止ie缓存
		 * @type {number}
		 */
		_params.t = Math.random();
		/**
		 * [保存模块配置]
		 */
		$.ajax({
			type: "POST",
			url: "/detail/turbine/template/shop2016,editmodule.html",
			timeout: 5000, //超时时间设置，单位毫秒
			data: _params,
			success: function(res) {

				/**
				 * [验证返回HTML非空]
				 */
				if (!$.trim(res).length) {

					/**
					 * [提示模块配置保存失败]
					 */
					dialog({
						fixed: true,
						title: '提示',
						content: '模块更新失败！',
						cancelValue: '取消',
						cancel: function() {
							this.remove();
						},
						okValue: '确定',
						ok: function() {

							/**
							 * 关闭弹出框
							 */
							this.remove();
						}
					}).showModal();

					/**
					 * 执行失败回调
					 */
					failCallback && failCallback();
					return;
				}

				/**
				 * [errorMessage 保存失败错误信息]
				 * @type {String}
				 */
				var _htmlEntity = $($.trim(res));
				var errorMessage = $.trim(_htmlEntity.attr("data-error")) || '';

				/**
				 * [保存成功]
				 */
				if (!errorMessage) {

					/**
					 * 替换当前模块DOM元素
					 */
					_this.htmlEntity.replaceWith(_htmlEntity);

					/**
					 * [htmlEntity 更新当前模块DOM元素引用]
					 * @type {Object}
					 */
					_this.htmlEntity = _htmlEntity;

					/**
					 * 使用更新后的HTML重新初始化模块
					 */
					_this.init(_htmlEntity);

					/**
					 * 派发模块更新成功事件
					 */
					_this.__dispatchEvent('onModuleUpdateSuccess');

					/**
					 * 执行失败回调
					 */
					successCallback && successCallback();
					return;
				}

				/**
				 * [提示模块配置保存失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: decodeURIComponent(errorMessage),
					cancelValue: '取消',
					cancel: function() {
						this.remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.remove();
					}
				}).showModal();

				/**
				 * 执行失败回调
				 */
				failCallback && failCallback();
			},
			error: function() {

				/**
				 * [提示模块配置保存失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: '网络异常，请稍后重试！',
					cancelValue: '取消',
					cancel: function() {
						this.remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.remove();
					}
				}).showModal();

				/**
				 * 执行失败回调
				 */
				failCallback && failCallback();
			},
			complete: function(XMLHttpRequest, status) {
				if (status == 'timeout') { //超时
					dialog({
						title: '提示',
						content: '请求超时！',
						okValue: '确定',
						ok: function() {
							this.close().remove();
							return false;
						}
					}).showModal();
				}

				/**
				 * 删除加载中弹出框
				 */
				loadingDialogEntity.remove();
			}
		});
	};

	/**
	 * [__getEventListener 获取指定事件类型的事件处理函数列表]
	 * @param  {String} eventType [事件类型]
	 * @return {Array}           [事件处理函数列表]
	 */
	page_module.prototype.__getEventListener = function(eventType) {
		var _this = this;
		_this.listener[eventType] = _this.listener[eventType] ? _this.listener[eventType] : [];
		return _this.listener[eventType];
	};

	/**
	 * [__dispatchEvent 派发事件]
	 */
	page_module.prototype.__dispatchEvent = function() {
		var _this = this,
			_eventType = Array.prototype.shift.call(arguments),
			_listener = _this.__getEventListener(_eventType);

		for (var i = 0; i < _listener.length; i++) {
			try {
				_listener[i].apply(_this, arguments);
			} catch (ex) {}
		}
	};

	/**
	 * [__removeEventListener 移除事件监听]
	 * @param {String} eventType    [事件类型]
	 * @param {Object} eventHandler [事件处理函数]
	 * @return {Object}              [当前业务对象]
	 */
	page_module.prototype.removeEventListener = function(eventType, eventHandler) {
		var _this = this,
			_listener = _this.__getEventListener(eventType);

		for (var i = 0; i < _listener.length; i++) {
			if (eventHandler === _listener[i]) {
				_listener.splice(i--, 1);
			}
		}
	};

	/**
	 * [addEventListener 添加事件监听]
	 * @param {String} eventTypes    [事件类型名称列表]
	 * @param {Object} eventHandler [事件处理函数]
	 * @return {Object}              [当前业务对象]
	 */
	page_module.prototype.addEventListener = function(eventTypes, eventHandler) {
		var _this = this,
			_listener = [],
			_eventTypeList = eventTypes.split(',');

		/**
		 * [循环添加不同事件类型的事件处理函数]
		 */
		$.each(_eventTypeList, function(index, eventType) {

			/**
			 * [过滤空事件类型名称]
			 */
			if (!($.trim(eventType).length)) {
				return true;
			}

			/**
			 * 获取指定事件类型的事件处理函数列表
			 */
			_listener = _this.__getEventListener(eventType);

			/**
			 * 将事件处理函数添加到指定事件类型的事件处理函数列表
			 */
			_listener.push(eventHandler);
		});
	};

	module.exports = page_module;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	/**
	 * [setting 所见即所得后台页面各模块默认配置项]
	 * @type {Object}
	 */
	var setting = {
	    /**
	     * 招牌模块
	     */
	    'module_sign': {
	        'logourl': '', //公司LOGO地址
	        'companyname': '', //公司名称
	        'backgroundurl': '' //背景图片地址
	    },
	    /**
	     * 导航模块
	     */
	    'module_navigation': {
	        'button': {
	            'selected': '',//按钮选中样式
	            'unselected': ''//按钮未选中样式
	        },
	        'background': '' //背景图片地址
	    },

	    /**
	     * 宽屏广告
	     */
	    'module_ads': {
	        'type': 1, //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
	        'piclist': [],
	        'prolist': [],
	        'transition': 1, //过渡效果类型
	        'pause': 3000 //事件间隔，翻页图片配置，单位ms
	    },
	    /**
	     * 通栏广告模块
	     */
	    'module_banner_ads': {
	        'picurl': '', //图片地址
	        'linkurl': '' //链接地址
	    },
	    /**
	     * 通栏产品模块
	     */
	    'module_banner_products': {
	        'title': '',
	        'showTitleAndBorder': true, //是否显示标题和边框
	        'type': 1, //1：平铺展示，2：滚动展示,
	        'prolist': [], //产品列表
	        'picsize': 1 //1：大图（300x300）最多显示12个产品，2：中图（210x210）最多显示16个产品，3：小图（170x170）最多显示20个产品
	    },
	    /**
	     * 扩展橱窗模块
	     */
	    'module_extend_window': {
	        'title': '',
	        'showTitleAndBorder': true, //是否显示标题和边框
	        'prolist': [] //产品列表
	    },
	    /**
	     * 专业橱窗模块
	     */
	    'module_prof_window': {
	        'title': '',
	        'showTitleAndBorder': true, //是否显示标题和边框
	        'supercatid': '', //终极类目id
	        'prolist': [],//产品图片数据列表
	        'paramlist': []//参数列表
	    },
	    /**
	     * 自定义内容模块
	     */
	    'module_custom': {
	        'title': '',
	        'showTitleAndBorder': true, //是否显示标题和边框
	        'content': '<strong>HTML内容</strong>' //编辑内容
	    },
	    /**
	     * 信誉证书模块
	     */
	    'module_certificate': {
	        'title': '',
	        'showTitleAndBorder': true, //是否显示标题和边框
	        'type': 1 //显示设置，即边框设置，1：边框效果1，2：边框效果2，3：边框效果3
	    },
	    /**
	     * 公司介绍模块
	     */
	    'module_company_intro': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 公司动态模块
	     */
	    'module_company_dynamic': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 友情链接模块
	     */
	    'module_friendship_link': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 联系我们模块
	     */
	    'module_contact_us': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 客户留言模块
	     */
	    'module_feedback': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 最新供应模块
	     */
	    'module_latest_supply': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 产品分类模块
	     */
	    'module_prod_classify': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 产品橱窗模块
	     */
	    'module_prod_window': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 相册橱窗模块
	     */
	    'module_album_window': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 公司相册模块
	     */
	    'module_company_album': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 买卖通档案模块
	     */
	    'module_mmt_archives': {
	        'title': '',
	        'showTitleAndBorder': true //是否显示标题和边框
	    },
	    /**
	     * 面包屑（搜索）模块
	     */
	    'module_crumbs': {
	        'font': '',
	        'background': ''
	    }
	};

	module.exports = setting;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./module_album_window": 43,
		"./module_album_window.js": 43,
		"./module_company_files": 45,
		"./module_company_files.js": 45,
		"./module_contact_us": 46,
		"./module_contact_us.js": 46,
		"./module_custom": 47,
		"./module_custom.js": 47,
		"./module_custom_video": 48,
		"./module_custom_video.js": 48,
		"./module_widescreen_custom": 49,
		"./module_widescreen_custom.js": 49
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 42;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/13.
	 *  [module_album_window 相册橱窗所见即所得渲染逻辑]
	 */
	function module_album_window(moduleEntity) {
	    /***
	     * 当前模块
	     * @type {*|jQuery|HTMLElement}
	     */
	    this.albumBox = $(moduleEntity.htmlEntity);
	    /***
	     * 图片显示区域
	     */
	    this.imgInfo = this.albumBox.find('.albumWindow .albumLeft');
	}

	module_album_window.prototype = {
	    /**
	     * [render 渲染函数]
	     * @return {[type]} [description]
	     */
	    render: function () {
	        var that = this,
	            imgInfoCon = that.imgInfo.find('.albumBoxCon');

	        that.imgLiquid().done(function(){
	            imgInfoCon.find('.albumImgCon a').imgLiquid({
	                fill: false,
	                verticalAlign: 'center',
	                horizontalAlign: 'center'
	            });
	        });
	    },
	    /**
	     * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
	     * @type {Object}
	     */
	    imgLiquid: function () {
	        var imgLiquidDeferred = $.Deferred();
	        __webpack_require__.e/* nsure */(1, function (require) {
	            __webpack_require__(44);
	            imgLiquidDeferred.resolve();
	        });
	        return imgLiquidDeferred;
	    }
	};


	module.exports = module_album_window;


/***/ }),
/* 44 */,
/* 45 */
/***/ (function(module, exports) {

	/**
	 * Created by 姜艳云 on 2016/11/16.
	 * [module_company_files 企业档案所见即所得渲染逻辑]
	 */
	var enterpriseArchives = function(moduleEntity) {
	}
	enterpriseArchives.prototype = {
	    /***
	     * 创建二维码
	     * @param shopName 商铺名称
	     * @param wrapName 二维码包裹元素
	     * @param _width 二维码宽度
	     * @param _height 二维码高度
	     */
	    createQrcode: function (shopName, wrapName, _width, _height) {
	        /***
	         * 创建二维码的组件用$.browser.msie来判断ie版本，但是我们升级Jquery版本号，现在用的1.9不支持，所以我们定义一个全局对象来代替$.browser
	         * @type {{msie: boolean, version: *}}
	         */
	        $.browser = {
	            msie: HC.env.ie > 0,
	            version: HC.env.ie
	        };
	        /***
	         * 拉取二维码js
	         */
	        if (!$.fn.hcQrcode) {
	            $.getScript('//style.org.hc360.cn/js/build/source/widgets/qrcode/hc.qrcode.min.js', function () {
	                $('[data-node-name="' + wrapName + '"]').hcQrcode({
	                    width: _width,
	                    height: _height,
	                    text: document.location.protocol+"//app.hc360.com/m.html?uid=" + shopName + ",a=x"
	                });
	            });
	        } else {
	            $('[data-node-name="' + wrapName + '"]').hcQrcode({
	                width: _width,
	                height: _height,
	                text: document.location.protocol+"//app.hc360.com/m.html?uid=" + shopName + ",a=x"
	            });
	        }
	    },

	    /**
	     * [render 渲染函数]
	     * @return {[type]} [description]
	     */
	    render: function() {
	        this.createQrcode(window.userName, 'qrcodeBox', 80, 80);
	    }

	};

	module.exports = enterpriseArchives;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

	/**
	 * Created by 姜艳云 on 2016/11/21.
	 * [module_contact_us 联系我们所见即所得渲染逻辑]
	 */
	function module_contact_us() {
	}

	module_contact_us.prototype = {
	    /***
	     * 初始化联系我们里面的qq和微信
	     */
	    initQQFFMod:function(){
	        var bcid=(window.scyps&&window.scyps.sc&&window.scyps.sc.id)&&"";
	        $.ajax({
	            url:"/detail/turbine/template/saleser,qqser.html?jsoncallback=?",
	            data:{
	                providerId: window.providerId
	            },
	            dataType: "jsonp",
	            success:function(result){
	                var qqlist=result.listQQ,
	                    qqHtml="";
	                if(qqlist.length>0){
	                    var item=qqlist[0];
	                    qqHtml='<a href="//wpa.qq.com/msgrd?v=3&uin='+item.qq+'&site=qq&menu=yes" target="_blank" onclick="window.qqAction();" class="leftqqIco" onmousedown="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_qq_float_1?detailuserid='+window.providerId+'&quot;)" /></a>';
	                }
	                qqHtml+='<a href="" class="awxIco" data-bcid="'+bcid+'" onmousedone="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_fafa_float_1?detailuserid='+window.providerId+'&quot;)" ><img data-query="weixin" src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/wxIco2.png" /></a>';
	                $('[data-node-name="companyServiceMod"]').html(qqHtml);
	            }
	        });
	    },
	    /**
	     * [render 渲染函数]
	     * @return {[type]} [description]
	     */
	    render: function() {
	        this.initQQFFMod();
	    }

	};


	module.exports = module_contact_us;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * [module_custom 自定义模块所见即所得渲染逻辑]
	 * @return {Object} [description]
	 */
	function module_custom(moduleEntity) {
		var _this = this;

		/**
		 * [初始化模块元素引用]
		 */
		$.extend(true, _this, {

			/**
			 * [moduleEntity 模块业务对象]
			 * @type {Object}
			 */
			moduleEntity: moduleEntity
		});
	}

	/**
	 * [render 渲染模块]
	 * @param  {String} html [自定义模块内容]
	 */
	module_custom.prototype.render = function(html) {
		var _this = this,

			/**
			 * [contentWrap 内容包裹元素]
			 * @type {Object}
			 */
	    _contentWrap = _this.moduleEntity.identifier == 'module_custom_video' ? _this.moduleEntity.htmlEntity.find('.videoBox') : _this.moduleEntity.htmlEntity.find('.leftBoxCon');
			//_contentWrap = _this.moduleEntity.htmlEntity.find('.leftBoxCon');

		/**
		 * [判断是否有自定义模块内容参数]
		 */
		if (html) {
			_contentWrap.html(html);
			return;
		}
		/**
		 * [url 获取自定义内容数据]
		 * @type {String}
		 */
		$.ajax({
				url: '/detail/turbine/action/GetCustomContentAction/eventsubmit_doGetcustomcontent/doGetcustomcontent',
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'callback',
				data: {
					providerid: _this.moduleEntity.regionEntity.pageEntity.providerid,
					area: _this.moduleEntity.regionEntity.identifier,
					moduleid: _this.moduleEntity.dataEntity.moduleid,
					windowtype: _this.moduleEntity.dataEntity.windowtype,
	        modulemark:_this.moduleEntity.identifier
				}
			})
			.done(function(json) {
				if (!!Number(json.state)) {

					if ($.trim(json.data).length === 0) {
						_contentWrap.html('<div class="nInfoPro2">暂无相关信息！<a href="javascript:;">请添加</a></div>');
	          _contentWrap.siblings('p.videoPrompt').hide();
					} else {
						try {
	            _contentWrap.html(json.data || '');
	            _contentWrap.siblings('p.videoPrompt').show();
							//_contentWrap.html(decodeURIComponent(json.data) || '');
						} catch (err) {}

					}

				}
			});
	};

	module.exports = module_custom;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by hc360 on 2017/8/15.
	 */
	module.exports = __webpack_require__(47);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [exports 导出同自定义模块]
	 * @type {[type]}
	 */
	module.exports = __webpack_require__(47);

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	/**
	 * [模块级别枚举项列表、模块相关枚举项列表、模块配置信息数据集、区域模块组态配置信息业务逻辑对象]
	 * @type {Object}
	 */
	function region_module_mapping(options) {
	  var _this = this;

	  /**
	   * 扩展业务对象实例属性
	   */
	  $.extend(true, _this, {

	    /**
	     * [moduleLevelList 模块级别枚举项列表]
	     * @type {Array}
	     */
	    levelList: [{
	      name: '普通模块', //模块等级名称
	      val: 1 //模块等级编号
	    }, {
	      name: '高级模块',
	      val: 2
	    }],

	    /**
	     * [userLevelList 用户级别列表]
	     * @type {Array}
	     */
	    userLevelList: {
	      'all': {
	        name: '免费会员'
	      },
	      'mmt': {
	        name: '收费会员'
	      },
	      'syt': {
	        name: '商盈通'
	      }
	    },

	    /**
	     * [relateList 模块相关枚举项列表]
	     * @type {Array}
	     */
	    relateList: [{
	      name: '全部模块', //模块相关名称
	      val: 0 //模块相关编号
	    }, {
	      name: '公司相关',
	      val: 1
	    }, {
	      name: '产品相关',
	      val: 2
	    }, {
	      name: '广告相关',
	      val: 3
	    }],

	    /**
	     * [moduleList 模块配置信息数据集]
	     * @type {Array}
	     */
	    moduleList: [{
	      name: '公司介绍', //模块名称
	      identifier: 'module_company_intro', //模块标识符
	      description_template: '展示公司信息，让买家了解企业实力。', //模块描述模板，此字段中的特殊标记会替换成指定数据并赋值给 description 字段
	      description: '', //模块描述
	      icon: 'gsAddIco1', //模块图标样式类
	      relate: 1, //模块相关枚举值
	      level: 1, //模块级别枚举值
	      maximum: 1 //模块数量上限
	    }, {
	      name: '公司动态',
	      identifier: 'module_company_dynamic',
	      description_template: '展示公司新闻、公司动态。',
	      description: '',
	      icon: 'gsAddIco2',
	      relate: 1,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '友情链接',
	      identifier: 'module_friendship_link',
	      description_template: '展示友情链接网站列表。',
	      description: '',
	      icon: 'gsAddIco3',
	      relate: 1,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1
	    }, {
	      name: '联系我们',
	      identifier: 'module_contact_us',
	      description_template: '展示公司联系方式方便买家联系到您。',
	      description: '',
	      icon: 'gsAddIco4',
	      relate: 1,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '客户留言',
	      identifier: 'module_feedback',
	      description_template: '展示买家留言信息列表。',
	      description: '',
	      icon: 'gsAddIco5',
	      relate: 1,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '最新供应',
	      identifier: 'module_latest_supply',
	      description_template: '添加供应产品。',
	      description: '',
	      icon: 'cpAddIco1',
	      relate: 2,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '产品分类',
	      identifier: 'module_prod_classify',
	      description_template: '展示产品分类列表，方便买家浏览产品。',
	      description: '',
	      icon: 'cpAddIco2',
	      relate: 2,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '产品橱窗',
	      identifier: 'module_prod_window',
	      description_template: '手动推荐产品至橱窗内，可优先展示优质产品。',
	      description: '',
	      icon: 'cpAddIco3',
	      relate: 2,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '相册橱窗',
	      identifier: 'module_album_window',
	      description_template: '手动推荐相册至橱窗内，动态展示相册。',
	      description: '',
	      icon: 'cpAddIco4',
	      relate: 2,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '公司相册',
	      identifier: 'module_company_album',
	      description_template: '展示相册列表。',
	      description: '',
	      icon: 'cpAddIco5',
	      relate: 2,
	      level: 1,
	      maximum: 1
	    }, {
	      name: '扩展广告',
	      identifier: 'module_banner_ads',
	      description_template: '添加商铺首页扩展广告，最多添加 #NUM_LIMIT# 个扩展广告模块，已添加 #NUM# 个',
	      description: '',
	      icon: 'ggAddIco1',
	      relate: 3,
	      level: 1,
	      maximum: 3,
	      maximum_scope: 'page'
	    }, {
	      name: '信誉证书',
	      identifier: 'module_certificate',
	      description_template: '上传信誉证书，展示企业实力',
	      description: '',
	      icon: 'gsAdd2Ico1',
	      relate: 1,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1
	    }, {
	      name: '买卖通档案',
	      identifier: 'module_mmt_archives',
	      description_template: '展示信誉记录，体现企业实力',
	      description: '',
	      icon: 'gsAdd2Ico2',
	      relate: 1,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1
	    }, {
	      name: '自定义内容',
	      identifier: 'module_custom',
	      description_template: '个性定制栏目内容',
	      description: '',
	      icon: 'gsAdd2Ico4',
	      relate: 1,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1,
	      simulatedlogin: true
	    }, {
	      name: '扩展橱窗',
	      identifier: 'module_extend_window',
	      description_template: '可最多添加 #NUM_LIMIT# 个产品展示橱窗和使用多个橱窗特效，已添加 #NUM# 个',
	      description: '',
	      icon: 'cpAdd2Ico1',
	      relate: 2,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 5,
	      maximum_scope: 'page',

	      /**
	       * [getNum 获取指定范围内当前模块已添加数量。扩展橱窗模块区别于其他模块，它的模块数量限制是基于用户的，也就是说一个用户添加该模块的数量是一定的，所有由后端初始化当前已添加该模块数量。]
	       * @param  {String} scope [指定范围内的模块数量]
	       * @return {Number}       [指定范围内模块数量]
	       */
	      getNum: function() {
	        return window.globalData.windowuplimit || 0;
	      },

	      /**
	       * [setNum 设置当前模块已添加数量]
	       * @param {String} scope [指定范围内的模块数量]
	       * @param {Number} num   [模块数量]
	       */
	      setNum: function(num) {
	        window.globalData.windowuplimit = Number(num) || 0;
	      }
	    }, {
	      name: '专业橱窗',
	      identifier: 'module_prof_window',
	      description_template: '展示产品专业化参数，便于用户更全面了解产品',
	      description: '',
	      icon: 'cpAdd2Ico2',
	      relate: 2,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1
	    }, {
	      name: '通栏产品',
	      identifier: 'module_banner_products',
	      description_template: '显示在商铺首页通栏处，最多添加 #NUM_LIMIT# 个通栏产品模块，已添加 #NUM# 个。',
	      description: '',
	      icon: 'cpAddIco6',
	      relate: 2,
	      level: 1,
	      maximum: 5,
	      maximum_scope: 'page'
	    }, {
	      name: '宽屏广告',
	      identifier: 'module_ads',
	      description_template: '添加商铺首页主题广告',
	      description: '',
	      icon: 'ggAdd2Ico1',
	      relate: 3,
	      level: 2,
	      userlevel: ['mmt', 'syt'],
	      maximum: 1,
	      maximum_scope: 'page'
	    }, {
	      name: '扩展广告',
	      identifier: 'module_banner_widescreen_ads',
	      description_template: '添加商铺首页扩展广告，最多添加 #NUM_LIMIT# 个扩展广告模块，已添加 #NUM# 个',
	      description: '',
	      icon: 'ggAddIco1',
	      relate: 3,
	      level: 2,
	      userlevel: ['syt'],
	      maximum: 3
	    }, {
	      name: '自定义内容',
	      identifier: 'module_widescreen_custom',
	      description_template: '个性定制栏目内容',
	      description: '',
	      icon: 'gsAdd2Ico4',
	      relate: 1,
	      level: 2,
	      userlevel: ['syt'],
	      maximum: 3,
	      simulatedlogin: true
	    },{
	      name: '掌柜说视频',
	      identifier: 'module_custom_video',
	      description_template: '自定义视频',
	      description: '',
	      icon: 'gsAdd2Ico5',
	      relate: 1,
	      level: 2,
	      userlevel: ['syt'],
	      maximum: 1,
	      simulatedlogin: true
	    }],

	    /**
	     * [regionModuleConfiguration 区域模块组态配置信息数据集]
	     * @type {Object}
	     */
	    regionModuleConfiguration: {

	      /**
	       * 招牌导航区
	       */
	      'region_sign_navigation': [
	        'module_sign', //招牌模块
	        'module_navigation' //导航模块
	      ],

	      /**
	       * 商盈通全屏广告区
	       */
	      'region_full_widescreen': [
	        'module_banner_widescreen_ads', //宽屏扩展广告模块
	        'module_widescreen_custom' //宽屏自定义模块
	      ],

	      /**
	       * 全屏广告区
	       */
	      'region_full_screen': [
	        'module_ads' //全屏广告模块
	      ],

	      /**
	       * 顶部通栏区
	       */
	      'region_top_banner': [
	        'module_banner_ads', //通栏广告模块/扩展广告模块
	        'module_banner_products' //通栏产品模块
	      ],

	      /**
	       * 搜索栏区
	       */
	      'region_crumbs': [
	        'module_crumbs' //搜索栏模块/面包屑模块
	      ],

	      /**
	       * 25%区
	       */
	      'region_percent_25': [
	        'module_company_intro', //公司介绍模块
	        'module_company_dynamic', //公司动态模块
	        'module_prod_window', //产品橱窗模块
	        'module_latest_supply', //最新供应模块
	        'module_prod_classify', //产品分类模块
	        'module_company_album', //公司相册模块
	        'module_album_window', //相册橱窗模块
	        'module_contact_us', //联系我们模块
	        'module_feedback', //客户留言模块
	        'module_custom', //自定义内容模块（ 收费用户）
	        'module_certificate', //信誉证书模块（ 收费用户）
	        'module_extend_window', //扩展橱窗模块（ 收费用户）
	        'module_mmt_archives' //买卖通档案模块（ 收费用户）
	      ],

	      /**
	       * 75%区
	       */
	      'region_percent_75': [
	        'module_company_intro', //公司介绍模块
	        'module_company_dynamic', //公司动态模块
	        'module_prod_window', //产品橱窗模块
	        'module_latest_supply', //最新供应模块
	        'module_prod_classify', //产品分类模块
	        'module_company_album', //公司相册模块
	        'module_album_window', //相册橱窗模块
	        'module_contact_us', //联系我们模块
	        'module_feedback', //客户留言模块
	        'module_certificate', //信誉证书模块（ 收费用户）
	        'module_prof_window', //专业橱窗模块（ 收费用户）
	        'module_custom', //自定义内容模块（ 收费用户）
	        'module_extend_window', //扩展橱窗模块（ 收费用户）
	        'module_custom_video'//视频模块（收费用户）
	      ],

	      /**
	       * 底部通栏区
	       */
	      'region_bottom_banner': [
	        'module_banner_ads', //扩展广告模块
	        'module_friendship_link' //友情链接模块
	      ]
	    }
	  }, options || {});

	  /**
	   * 初始化业务逻辑对象
	   */
	  region_module_mapping.prototype.init.call(_this);
	}

	/**
	 * [init 初始化业务逻辑对象]
	 * @return {[type]} [description]
	 */
	region_module_mapping.prototype.init = function() {
	  var _this = this;

	  /**
	   * [moduleList 扩展模块默认属性]
	   */
	  for (var i = 0; i < _this.moduleList.length; i++) {

	    /**
	     * [为模块添加默认属性]
	     */
	    _this.moduleList[i] = $.extend({
	      maximum_scope: 'region', //模块数量上限范围，默认为区域
	      simulatedlogin: false, //模块是否仅模拟登陆用户可用
	      limit_maximum: true, //是否未超过数量上限
	      limit_scope: true, //是否当前区域可添加的模块
	      limit_authority: true, //是否当前会员可添加的模块
	      limit_simulatedlogin: true, //是否当前会员可添加的模块，该判断条件由模块的 module.simulatedlogin && (!_this.regionEntity.pageEntity.issimulated) 表达式而来
	      cancellable: false, //是否可撤销当前模块
	      message: [] //不可操作当前模块的原因
	    }, _this.moduleList[i]);
	  }
	};

	/**
	 * [analyticPageModuleData 解析页面模块数据对象]
	 * @param  {Object} pageEntity   [页面业务对象]
	 * @param  {Object} regionEntity [区域业务对象，该对象指定后只会解析该区域下的模块属性]
	 * @return {Object}              [模块数据对象]
	 */
	region_module_mapping.prototype.analyticPageModuleData = function(pageEntity, regionEntity) {
	  var _this = this,

	    /**
	     * [_module_num 模块数量数据对象]
	     * @type {Object}
	     */
	    _module_num = {

	      /**
	       * [page 页面各模块数量]
	       * @type {Object}
	       */
	      page: {},

	      /**
	       * [regions 各区域下各模块数量]
	       * @type {Object}
	       */
	      regions: {}
	    },

	    /**
	     * [_module_config_data 模块配置数据]
	     * @type {Object}
	     */
	    _module_config_data = {};

	  /**
	   * [初始化模块数量数据]
	   */
	  $.each(pageEntity.regionList || [], function(_regionIndex, _regionEntity) {

	    /**
	     * [填充模块数量数据]
	     */
	    $.each(_regionEntity.moduleList, function(_moduleIndex, _moduleEntity) {

	      /**
	       * 累计页面指定类型模块数量
	       */
	      _module_num.page[_moduleEntity.identifier] ? _module_num.page[_moduleEntity.identifier]++ : _module_num.page[_moduleEntity.identifier] = 1;

	      /**
	       * 累计各区域指定类型模块数量
	       */
	      _module_num.regions[_regionEntity.identifier] = _module_num.regions[_regionEntity.identifier] ? _module_num.regions[_regionEntity.identifier] : {};
	      _module_num.regions[_regionEntity.identifier][_moduleEntity.identifier] ? _module_num.regions[_regionEntity.identifier][_moduleEntity.identifier]++ : _module_num.regions[_regionEntity.identifier][_moduleEntity.identifier] = 1;
	    });
	  });

	  /**
	   * [根据模块数量数据初始化模块配置数据]
	   */
	  $.each(pageEntity.regionList, function(_regionIndex, _regionEntity) {

	    /**
	     * [若指定了区域业务对象，则只返回该区域的模块配置数据]
	     */
	    if (regionEntity && (regionEntity.identifier !== regionEntity.identifier)) {
	      return true;
	    }

	    /**
	     * [_tempModuleList 创建当前区域的所有模块配置信息数据集临时对象]
	     * @type {Array}
	     */
	    _module_config_data[_regionEntity.identifier] = $.extend(true, [], _this.moduleList);
	    var _tempModuleList = _module_config_data[_regionEntity.identifier],

	      /**
	       * [_tempModuleNum 初始化当前区域下所有模块数量]
	       * @type {Array}
	       */
	      _tempModuleNum = $.extend(true, {}, _module_num, {
	        region: _module_num.regions[_regionEntity.identifier] || []
	      });

	    /**
	     * [初始化所有模块在当前区域的是否超过数量上限、是否非当前区域可添加的模块、是否非当前会员可添加的模块属性]
	     */
	    $.each(_tempModuleList, function(_moduleIndex, _moduleEntity) {

	      /**
	       * 设置模块是否可以添加到当前区域
	       */
	      if ((_this.regionModuleConfiguration[_regionEntity.identifier] || []).indexOf(_moduleEntity.identifier) === -1) {
	        _moduleEntity.limit_scope = false;
	      }

	      /**
	       * 若当前模块对用户级别有要求
	       */
	      if (_moduleEntity.userlevel) {
	        var _syt = !!((_moduleEntity.userlevel.indexOf('syt') != -1) && _regionEntity.pageEntity.issyt),
	          _mmt = !!((_moduleEntity.userlevel.indexOf('mmt') != -1) && _regionEntity.pageEntity.ismmt);
	        _moduleEntity.limit_authority = _syt || _mmt;
	        if (!_moduleEntity.limit_authority) {
	          (!_syt) ? _moduleEntity.message.push('保存失败，请升级为商营通会员后使用！'): _moduleEntity.message.push('保存失败，请升级成为收费会员后使用！');
	        }
	      }

	      /**
	       * [设置当前模块是否仅模拟登陆用户可用]
	       */
	      if (_moduleEntity.simulatedlogin && (!_regionEntity.pageEntity.issimulated)) {
	        _moduleEntity.limit_simulatedlogin = false;
	        _moduleEntity.message.push('当前模块只可在模拟登陆时操作！');
	      }

	      /**
	       * [limit_maximum 根据当前模块指定范围的数量上限设置当前模块是否还可继续向当前区域添加。如果该模块有自定义的获取数量回调函数，则通过该回调函数获取模块数量]
	       * @type {Boolean}
	       */
	      var tempNum = _tempModuleNum[_moduleEntity.maximum_scope][_moduleEntity.identifier] || 0;
	      tempNum = (_moduleEntity.getNum && Object.prototype.toString.call(_moduleEntity.getNum) === '[object Function]') ? _moduleEntity.getNum.call(null) : tempNum;
	      _moduleEntity.limit_maximum = (tempNum < _moduleEntity.maximum);

	      /**
	       * [cancellable 设置当前模块是否可撤销 区域内当前模块数量为1且模块数量上限为1]
	       * @type {Boolean}
	       */
	      _moduleEntity.cancellable = (((_tempModuleNum.region[_moduleEntity.identifier] || 0) === 1) && (_moduleEntity.maximum === 1));

	      /**
	       * [更新当前模块数量上限及已添加数量]
	       * @type {String}
	       */
	      _moduleEntity.description = _moduleEntity.description_template.replace(/#NUM_LIMIT#/ig, _moduleEntity.maximum).replace(/#NUM#/ig, tempNum);

	      /**
	       * [enabled 设置模块可用状态]
	       * @type {Boolean}
	       */
	      _moduleEntity.enabled = (_moduleEntity.limit_maximum && _moduleEntity.limit_authority && _moduleEntity.limit_scope && _moduleEntity.limit_simulatedlogin);
	    });
	  });

	  /**
	   * 返回模块配置数据
	   */
	  return regionEntity ? _module_config_data[regionEntity.identifier] : _module_config_data;
	};

	/**
	 * [increaseModuleNum 递增模块数量]
	 * @param  {String} moduleIdentifier [模块标识符]
	 */
	region_module_mapping.prototype.increaseModuleNum = function(moduleIdentifier) {
	  var _this = this;
	  for (var i = 0; i < _this.moduleList.length; i++) {
	    if (_this.moduleList[i].identifier === moduleIdentifier) {
	      if (_this.moduleList[i].setNum && _this.moduleList[i].getNum && Object.prototype.toString.call(_this.moduleList[i].setNum) === '[object Function]' && Object.prototype.toString.call(_this.moduleList[i].getNum) === '[object Function]') {
	        _this.moduleList[i].setNum.call(null, ((parseInt(_this.moduleList[i].getNum.call(null)) || 0) + 1));
	      }
	      break;
	    }
	  }
	};

	/**
	 * [decreaseModuleNum 递减模块数量]
	 * @param  {String} moduleIdentifier [模块标识符]
	 */
	region_module_mapping.prototype.decreaseModuleNum = function(moduleIdentifier) {
	  var _this = this;
	  for (var i = 0; i < _this.moduleList.length; i++) {
	    if (_this.moduleList[i].identifier === moduleIdentifier) {
	      if (_this.moduleList[i].setNum && _this.moduleList[i].getNum && Object.prototype.toString.call(_this.moduleList[i].setNum) === '[object Function]' && Object.prototype.toString.call(_this.moduleList[i].getNum) === '[object Function]') {
	        _this.moduleList[i].setNum.call(null, ((parseInt(_this.moduleList[i].getNum.call(null)) || 0) - 1));
	      }
	      break;
	    }
	  }
	};

	/**
	 * [exports 导出业务对象]
	 * @type {Function}
	 */
	module.exports = region_module_mapping;


/***/ }),
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports) {

	/**
	 * Created by 姜艳云 on 2016/9/29.
	 */
	var util = {
	    /**
	     * [getByteLength 获取字符串长度，英文占1个字符，中文汉字占2个字符]
	     * @param {String} str [字符串]
	     * @param {Number} minLength [字符串长度]
	     */
	    getByteLength: function(str) {
	        if (typeof str != 'string') {
	            str = str.toString();
	        }
	        var nlength = 0;
	        for (var i = 0; i < str.length; i++) {
	            if ((str.charCodeAt(i) & 0xff00) != 0) {
	                nlength++;
	            }
	            nlength++;
	        }
	        return nlength;
	    },

	    /**
	     * [获取指定url地址的主机名、协议等属性]
	     * @param  {String} url [url]
	     * @return {Object}     [属性对象]
	     */
	    parseURL: function(url) {

	        /**
	         * [url 删除左右空格]
	         * @type {String}
	         */
	        var _url = url.replace(/(^\s*)|(\s*$)/g, ""),

	            /**
	             * [_protocols 网络协议前缀]
	             * @type {Array}
	             */
	            _protocols = ['http', 'https'],

	            /**
	             * [_regExp 判断url地址是否包含网络协议]
	             * @type {RegExp}
	             */
	            _regExp = new RegExp('^(' + _protocols.join('|') + ')\:\/\/', 'ig');

	        /**
	         * [若url地址不包含协议，则默认在url地址起始位置添加 // ]
	         */
	        (!_regExp.test(url)) && (_url = '//' + _url);

	        /**
	         * [根据url地址创建链接元素并解析链接属性]
	         * @type {Object}
	         */
	        var a = document.createElement('a');
	        a.href = _url;
	        return {
	            source: _url,
	            protocol: a.protocol.replace(':', ''),
	            host: a.hostname,
	            port: a.port,
	            query: a.search,
	            params: (function() {
	                var ret = {},
	                    seg = a.search.replace(/^\?/, '').split('&'),
	                    len = seg.length,
	                    i = 0,
	                    s;
	                for (; i < len; i++) {
	                    if (!seg[i]) {
	                        continue;
	                    }
	                    s = seg[i].split('=');
	                    ret[s[0]] = s[1];
	                }
	                return ret;
	            })(),
	            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
	            hash: a.hash.replace('#', ''),
	            path: a.pathname.replace(/^([^\/])/, '/$1'),
	            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
	            segments: a.pathname.replace(/^\//, '').split('/')
	        };
	    },

	    /**
	     * [getQueryString 获取查询参数]
	     * @param {String} key [键]
	     * @return {String} [值]
	     */
	    getQueryString: function(key) {
	        var search = window.location.search;
	        var regExp = new RegExp('[\\?\\&]([^\\?\\&]+)=([^\\?\\&]+)', 'ig');
	        var queryStringList = {};
	        var parttern;
	        while ((parttern = regExp.exec(search))) {
	            if (!queryStringList[parttern[1].toLowerCase()]) {
	                queryStringList[parttern[1].toLowerCase()] = parttern[2];
	            }
	        }

	        //返回指定键的值
	        if (key) {
	            return queryStringList[key.toLowerCase()] || '';
	        }

	        //返回所有查询参数
	        return queryStringList;
	    },


	    /**
	     * [resizeImage 计算图片大小]
	     */
	    resizeImage: function($img, $imgWidth, $imgHeight, $wrapWidth, $wrapHeight) {

	        // Calculate size
	        var w, h, wn, hn, ha, va, hdif, vdif,
	            margT = 0,
	            margL = 0,
	            $imgCW = $wrapWidth,
	            $imgCH = $wrapHeight;


	        // Save original sizes
	        if ($img.data('owidth') === undefined) $img.data('owidth', $imgWidth);
	        if ($img.data('oheight') === undefined) $img.data('oheight', $imgHeight);


	        // Compare ratio
	        if (($imgCW / $imgCH) < ($img.data('owidth') / $img.data('oheight'))) {
	            w = '100%';
	            h = 'auto';
	            wn = Math.floor($imgCW);
	            hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
	        } else {
	            w = 'auto';
	            h = '100%';
	            wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
	            hn = Math.floor($imgCH);
	        }

	        // Align X
	        ha = 'center';
	        hdif = $imgCW - wn;
	        if (ha === 'left') margL = 0;
	        if (ha === 'center') margL = hdif * 0.5;
	        if (ha === 'right') margL = hdif;
	        if (ha.indexOf('%') !== -1) {
	            ha = parseInt(ha.replace('%', ''), 10);
	            if (ha > 0) margL = hdif * ha * 0.01;
	        }


	        // Align Y
	        va = 'center';
	        vdif = $imgCH - hn;
	        if (va === 'top') margT = 0;
	        if (va === 'center') margT = vdif * 0.5;
	        if (va === 'bottom') margT = vdif;
	        if (va.indexOf('%') !== -1) {
	            va = parseInt(va.replace('%', ''), 10);
	            if (va > 0) margT = vdif * va * 0.01;
	        }


	        // Add Css
	        w = wn;
	        h = hn;
	        $img.css({
	            'width': w,
	            'height': h,
	            'margin-left': Math.floor(margL),
	            'margin-top': Math.floor(margT)
	        });
	    },

	    /**
	     * [getTemplateFromHTML 从HTML中获取指定模板，各特定模板使用[key]……[/key]包裹并分隔
	     * @param  {String} html [模板HTML]
	     * @param  {String} key  [模板关键字]
	     * @return {String}      [指定关键字的模板HTML或所有HTML数组]
	     */
	    getTemplateFromHTML: function(html, key) {
	        var htmlArray = {},
	            regExp = new RegExp('\\[([\\w\\W]+?)\\]([\\w\\W]*?)(\\[\\/\\1\\])', 'igm'),
	            parttern;
	        while ((parttern = regExp.exec(html))) {

	            /**
	             * 过滤空字符
	             */
	            htmlArray[parttern[1]] = (parttern[2]||'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
	        }

	        /**
	         * [若指定了模板关键字，只返回指定关键字的模板]
	         */
	        if (key) {
	            return htmlArray[key] || '';
	        }

	        /**
	         * 未指定模板关键字，返回所有关键字及其对应模板
	         */
	        return htmlArray;
	    }
	};
	module.exports = util;

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/10/13.
	 *
	 *  模块工具包
	 */
	/**
	 * jQuery Mousewheel 3.1.13
	 */
	__webpack_require__(66);

	var tool = {
	    /***
	     * 格式化字符串，返回一个对象
	     * @returns {{}}
	     */
	    formatDate: function(data) {
	        var result,
	            reg = /([^:;]+):([^;]+);/ig,
	            obj = {};
	        while (result = reg.exec(data)) {
	            obj[result[1]] = result[2];
	        }
	        return obj;
	    },
	    /***
	     * background:url(//www.hc360.com/1.jpg)
	     * 获取//www.hc360.com/1.jpg图片路径，返回一个图片地址
	     * @returns {string}
	     */
	    getBgUrl: function(url) {
	        var reg = /url\((['"]?)(.+)\1\)/g;
	        var result;
	        if (result = reg.exec(url)) {
	            return result[2];
	        } else {
	            return result;
	        }
	    },
	    /***
	     * 初始化图片路径，图片加载失败，替换成无图
	     * @param list
	     */
	    initImgSrc: function(list) {
	        $.each(list, function(index, val) {
	            var _img = $(val).find('img'),
	                _imgSrc = $.trim(_img.attr('src')),
	                newImg = $('<img>').attr('src', _imgSrc);
	            newImg.error(function() {
	                _img.attr('src', '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPic.jpg');
	                newImg.onerror = null;
	            });
	        });
	    },
	    /****
	     * 创建提示性弹框，只有一个确定按钮；
	     * @param prompt 弹框提示内容
	     */
	    createDialog: function(prompt) {
	        dialog({
	            title: '提示',
	            content: prompt,
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	                return false;
	            }
	        }).showModal();
	    },

	    /**
	     * [serializeStyle 解析样式字符串]
	     * @param  {[type]} strStyle [description]
	     * @return {[type]}          [description]
	     */
	    serializeStyle: function(strStyle) {
	        var _regExp = new RegExp('([^:;]+):([^;]+)', 'igm'),
	            _ret = {},
	            _parttern;

	        while (_parttern = _regExp.exec(strStyle)) {
	            _ret[_parttern[1].trim()] = _parttern[2].trim();
	        }

	        return _ret;
	    },

	    /**
	     * [createColorpicker 创建取色器]
	     * @param node 点击出现颜色选择器的元素
	     * @param color 初始化颜色选择器的颜色
	     * @param dialog 当前弹框
	     * @param callback 改变颜色后的回调函数
	     * @param showCallback 显示取色器时的回调函数
	     */
	    createColorpicker: function(node, color, dialog, callback, showCallback) {
	        __webpack_require__.e/* nsure */(8, function(require) {
	            __webpack_require__(67);

	            /**
	             * [color 设置默认色]
	             */
	            color = $.trim(color);
	            color = color.length ? color : '#2399fe';

	            /**
	             * [初始化取色器]
	             */
	            node.spectrum({
	                showInput: true,
	                color: color,
	                cancelText: "取消",
	                chooseText: "选择",
	                clearText: "清除",
	                preferredFormat: 'hex',
	                change: function(col) {
	                    $(this).attr('data-color', col.toHexString());
	                    callback && callback();
	                },
	                hide: function(col) {
	                    $(this).attr('data-color', col.toHexString());
	                    callback && callback();
	                },
	                show: function(color) {
	                    showCallback && showCallback.apply(this, arguments);
	                }
	            });
	            /***
	             * 拖拽停止后，执行方法
	             */
	            node.on("dragstop.spectrum", function(e, color) {
	                $(this).attr('data-color', color.toHexString());
	                callback && callback();
	            })

	            /**
	             * [点击时切换显示状态]
	             */
	            .click(function(event) {
	                $(this).spectrum("toggle");
	            });

	            /***
	             * 关闭弹层的时候移除颜色编辑器
	             */
	            dialog && dialog.addEventListener('close', function() {
	                node.spectrum("destroy");
	            });
	        });
	    },

	    /***
	     * 创建上传组件
	     * @param data webuploader配置
	     * @param upload 上传按钮
	     * @param logoTitle  图片加入队列后，图片标题显示区域
	     * @param defaultTilte 默认无图，标题文字
	     * @param webuploderSuccess 图片上传完成后执行的回调
	     */
	    createWebuploder: function(data, upload, logoTitle, defaultTilte, webuploderSuccess, webuploaderLoadedCallback) {
	        var that = this;
	        __webpack_require__.e/* nsure */(5, function(require) {
	            __webpack_require__(57);
	            var uploader = webuploader.create(data);
	            webuploaderLoadedCallback && webuploaderLoadedCallback(uploader);
	            /** 图片上传 **/
	            upload.click(function() {
	                if (logoTitle.html() == defaultTilte) {
	                    that.createDialog('请选择要上传的文件！');
	                    return false;
	                }
	                uploader.upload();
	            });
	            /** 添加进来图片 **/
	            uploader.on('fileQueued', function(file) {
	                logoTitle.html(file.name);
	            });
	            /**
	             * [监听文件上传后接收服务器响应事件]
	             */
	            uploader.on('uploadAccept', function(obj, ret) {
	                var _json = ret || {},
	                    _result = false;
	                /**
	                 * [文件上传成功]
	                 */
	                if (_json.state === 'true') {
	                    var _img = $('<img src="' + _json.result.url + '">');
	                    /** 上传图片成功后执行webuploderSuccess**/
	                    webuploderSuccess && webuploderSuccess(_img);
	                } else {
	                    uploader.trigger('error', 'CUSTOM', _json.error.message);
	                }
	                return _result;
	            });
	            /***
	             * [监听文件上传失败后的响应事件]
	             */
	            uploader.on('error', function() {
	                /**
	                 * [errorSettings 错误信息枚举列表]
	                 * @type {Object}
	                 */
	                var _errorSettings = {
	                    'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
	                    'Q_EXCEED_SIZE_': '上传文件大小超过上限！',
	                    'F_EXCEED_SIZE': '上传文件大小超过限制！',
	                    'Q_TYPE_DENIED': '格式不正确，请重新选择上传！',
	                    'F_DUPLICATE': '上传文件重复了请重新选择上传！',
	                    'OTHER': '上传失败请重新上传！',
	                    'CUSTOM': ''
	                };
	                /** [显示错误信息] */
	                var errorCode = arguments[0] || 'OTHER';
	                that.createDialog(_errorSettings[errorCode] || arguments[1] || '');
	            });
	        });
	    },
	    /** 设置字体类型初始值 **/
	    "setFontType": function(data, _default, that) {
	        var dataFamily = data["font-family"],
	            fontFamily = dataFamily ? dataFamily : _default;
	        if (that == fontFamily) {
	            return '<option selected>' + that + '</option>';
	        } else {
	            return '<option>' + that + '</option>';
	        }
	    },
	    /** 设置字号初始值 **/
	    "setFontSize": function(data, _default, that) {
	        var dataSize = window.parseInt(data["font-size"]),
	            fontSize = dataSize ? dataSize : _default;
	        if (that == fontSize) {
	            return '<option selected>' + that + '</option>';
	        } else {
	            return '<option>' + that + '</option>';
	        }
	    },
	    /** 设置是否加粗初始值 **/
	    "setFontBold": function(data) {
	        var fontFamily = data["font-weight"];
	        if (fontFamily == "bold") {
	            return 'curCheckBox';
	        }
	    },
	    /** 设置是否倾斜初始值 **/
	    "setFontStyle": function(data) {
	        var fontStyle = data["font-style"];
	        if (fontStyle == "italic") {
	            return 'curCheckBox';
	        }
	    },

	    /**
	     * [preventMousewheel 在指定元素滚动到顶部或底部时，取消置顶包裹元素的滚动事件行为，防止页面发生滚动]
	     * @param  {Object} wrap [要操作的元素]
	     */
	    preventMousewheel: function(wrap) {

	        /**
	         * [preventDefault 取消默认行为]
	         */
	        function preventDefault(e) {
	            e = e || window.event;
	            e.preventDefault && e.preventDefault();
	            e.returnValue = false;
	        }

	        /**
	         * [stopPropagation 阻止事件冒泡]
	         */
	        function stopPropagation(e) {
	            e = e || window.event;
	            e.stopPropagation && e.stopPropagation();
	            e.cancelBubble = false;
	        }

	        /**
	         * [绑定元素鼠标滚动事件]
	         */
	        wrap.on('mousewheel', function(e, delta) {
	            stopPropagation(e);
	            var box = $(this).get(0);
	            if ($(box).outerHeight() + box.scrollTop >= box.scrollHeight) {
	                if (delta < 0) {
	                    preventDefault(e);
	                    return false;
	                }
	            }
	            if (box.scrollTop === 0) {
	                if (delta > 0) {
	                    preventDefault(e);
	                    return false;
	                }
	            }
	        });
	    }
	};
	module.exports = tool;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Mousewheel 3.1.13
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * //jquery.org/license
	 */

	(function (factory) {
	    if ( true ) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node/CommonJS style for Browserify
	        module.exports = factory;
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function ($) {

	    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
	        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
	                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
	        slice  = Array.prototype.slice,
	        nullLowestDeltaTimeout, lowestDelta;

	    if ( $.event.fixHooks ) {
	        for ( var i = toFix.length; i; ) {
	            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
	        }
	    }

	    var special = $.event.special.mousewheel = {
	        version: '3.1.12',

	        setup: function() {
	            if ( this.addEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.addEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = handler;
	            }
	            // Store the line height and page height for this particular element
	            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
	            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
	        },

	        teardown: function() {
	            if ( this.removeEventListener ) {
	                for ( var i = toBind.length; i; ) {
	                    this.removeEventListener( toBind[--i], handler, false );
	                }
	            } else {
	                this.onmousewheel = null;
	            }
	            // Clean up the data we added to the element
	            $.removeData(this, 'mousewheel-line-height');
	            $.removeData(this, 'mousewheel-page-height');
	        },

	        getLineHeight: function(elem) {
	            var $elem = $(elem),
	                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
	            if (!$parent.length) {
	                $parent = $('body');
	            }
	            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
	        },

	        getPageHeight: function(elem) {
	            return $(elem).height();
	        },

	        settings: {
	            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
	            normalizeOffset: true  // calls getBoundingClientRect for each event
	        }
	    };

	    $.fn.extend({
	        mousewheel: function(fn) {
	            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
	        },

	        unmousewheel: function(fn) {
	            return this.unbind('mousewheel', fn);
	        }
	    });


	    function handler(event) {
	        var orgEvent   = event || window.event,
	            args       = slice.call(arguments, 1),
	            delta      = 0,
	            deltaX     = 0,
	            deltaY     = 0,
	            absDelta   = 0,
	            offsetX    = 0,
	            offsetY    = 0;
	        event = $.event.fix(orgEvent);
	        event.type = 'mousewheel';

	        // Old school scrollwheel delta
	        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
	        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
	        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
	        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }

	        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
	        delta = deltaY === 0 ? deltaX : deltaY;

	        // New school wheel delta (wheel event)
	        if ( 'deltaY' in orgEvent ) {
	            deltaY = orgEvent.deltaY * -1;
	            delta  = deltaY;
	        }
	        if ( 'deltaX' in orgEvent ) {
	            deltaX = orgEvent.deltaX;
	            if ( deltaY === 0 ) { delta  = deltaX * -1; }
	        }

	        // No change actually happened, no reason to go any further
	        if ( deltaY === 0 && deltaX === 0 ) { return; }

	        // Need to convert lines and pages to pixels if we aren't already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if ( orgEvent.deltaMode === 1 ) {
	            var lineHeight = $.data(this, 'mousewheel-line-height');
	            delta  *= lineHeight;
	            deltaY *= lineHeight;
	            deltaX *= lineHeight;
	        } else if ( orgEvent.deltaMode === 2 ) {
	            var pageHeight = $.data(this, 'mousewheel-page-height');
	            delta  *= pageHeight;
	            deltaY *= pageHeight;
	            deltaX *= pageHeight;
	        }

	        // Store lowest absolute delta to normalize the delta values
	        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

	        if ( !lowestDelta || absDelta < lowestDelta ) {
	            lowestDelta = absDelta;

	            // Adjust older deltas if necessary
	            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	                lowestDelta /= 40;
	            }
	        }

	        // Adjust older deltas if necessary
	        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
	            // Divide all the things by 40!
	            delta  /= 40;
	            deltaX /= 40;
	            deltaY /= 40;
	        }

	        // Get a whole, normalized value for the deltas
	        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
	        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
	        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

	        // Normalise offsetX and offsetY properties
	        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
	            var boundingRect = this.getBoundingClientRect();
	            offsetX = event.clientX - boundingRect.left;
	            offsetY = event.clientY - boundingRect.top;
	        }

	        // Add information to the event object
	        event.deltaX = deltaX;
	        event.deltaY = deltaY;
	        event.deltaFactor = lowestDelta;
	        event.offsetX = offsetX;
	        event.offsetY = offsetY;
	        // Go ahead and set deltaMode to 0 since we converted to pixels
	        // Although this is a little odd since we overwrite the deltaX/Y
	        // properties with normalized deltas.
	        event.deltaMode = 0;

	        // Add event and delta to the front of the arguments
	        args.unshift(event, delta, deltaX, deltaY);

	        // Clearout lowestDelta after sometime to better
	        // handle multiple device types that give different
	        // a different lowestDelta
	        // Ex: trackpad = 3 and mouse wheel = 120
	        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
	        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

	        return ($.event.dispatch || $.event.handle).apply(this, args);
	    }

	    function nullLowestDelta() {
	        lowestDelta = null;
	    }

	    function shouldAdjustOldDeltas(orgEvent, absDelta) {
	        // If this is an older event and the delta is divisable by 120,
	        // then we are assuming that the browser is treating this as an
	        // older mouse wheel event and that we should divide the deltas
	        // by 40 to try and get a more usable deltaFactor.
	        // Side note, this actually impacts the reported scroll distance
	        // in older browsers and can cause scrolling to be slower than native.
	        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
	        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	    }

	}));

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/9.
	 * 顶部操作区域入口文件
	 */
	var tool = __webpack_require__(65),
	    util = __webpack_require__(53),
	    topOperaArea = function(pageEntity) {
	        /***
	         * 商铺配置数据
	         */
	        this.pageEntity = $.extend({}, pageEntity);
	        /***
	         * 当前用户使用的模板数据
	         */
	        this.template = this.pageEntity.template;
	        /***
	         * 布局枚举值，1：侧栏在左，2：侧栏在右；
	         */
	        this.layout = this.pageEntity.layout;
	        /***
	         * 顶部操作内容区域
	         */
	        this.topOperaWrap = $('[data-node-name="editBox"]');
	        /****
	         * 接口地址
	         */
	        this.interfaceUrl = {
	                /***
	                 * 顶部操作区域Html
	                 */
	                topHtml: "/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=topOperationArea",
	                /***
	                 * 我的模板库
	                 */
	                myTemplate: '/detail/turbine/action/GetCustomTemplateListAction/eventsubmit_doCustomlate/doCustomlate',
	                /***
	                 * 全部模板
	                 */
	                publicTemplate: '/detail/turbine/action/GetListOfCommonTemplateAction/eventsubmit_doCommontemplate/doCommontemplate',
	                /****
	                 * 模板应用、 删除、 更名接口
	                 */
	                tempUpdate: '/detail/turbine/action/AppDeleteRenameTempAction/eventsubmit_doExecute/doExecute',
	                /***
	                 * 板式更新接口
	                 */
	                indexLayout: '/detail/turbine/action/PlateTypeUpdatingAction/eventsubmit_doUpdatelayout/doUpdatelayout?',
	                /***
	                 * 导航管理导航数据列表接口
	                 */
	                navSettings: '/detail/turbine/action/NavDataListAction/eventsubmit_doGetnavlist/doGetnavlist',
	                /***
	                 * 导航数据更新接口
	                 */
	                navDataUpdate: '/detail/turbine/action/NavDataUpdateAction/eventsubmit_doUpdatenav/doUpdatenav',
	                /***
	                 * 备份、 发布接口
	                 */
	                backupAndRelease: '/detail/turbine/action/BackupAndReleaseAction/eventsubmit_doExecute/doExecute',
	                /****
	                 * 恢复接口
	                 */
	                restoreTemplate: '/detail/turbine/action/ResumeTemplateAction/eventsubmit_doExecute/doExecute',
	                /***
	                 * 全局样式更新接口
	                 */
	                styleUpdate: '/detail/turbine/action/GlobalStyleUpdateAction/eventsubmit_doUpdateglobalstyle/doUpdateglobalstyle',
	                /***
	                 * 退出地址
	                 */
	                exit: "/detail/turbine/action/ajax.TemplateAjaxAction/eventsubmit_doQuitout/doQuitout"
	            };
	            /***
	             * 异步加载页面引用的组件，加载成功调用init方法初始化顶部操作区域
	             * @type {topOperaArea}
	             */
	        var that = this;
	        that.def = this.loadComponents();
	        $.when.apply(null, that.def).done(function() {
	            that.getTopHtml();
	        });

	    };

	topOperaArea.prototype = {
	    /***
	     * 获取顶部操作区域Html
	     */
	    getTopHtml: function() {
	        var that = this;
	        $.ajax({
	            type: "GET",
	            url: that.interfaceUrl.topHtml,
	            data: {
	                t: Math.random()
	            },
	            dataType: 'jsonp',
	            success: function(html) {
	                that.topHtml = util.getTemplateFromHTML(html);
	                var configData = {
	                    thumbnail: that.template.thumbnail,
	                    tplName: that.template.name,
	                    leftLayout: function() {
	                        if (that.layout == 2) {
	                            return 'Format1ImgCur';
	                        }
	                    },
	                    rightLayout: function() {
	                        if (that.layout == 1) {
	                            return 'Format2ImgCur';
	                        }
	                    }
	                };
	                if (that.topHtml.topOperation) {
	                    that.topOperaWrap.html(mustache.render(that.topHtml.topOperation, configData));
	                }
	                that.getModule();
	                that.topEvent();

	            },
	            error: function() {
	                tool.createDialog('获取顶部操作区html失败！');
	            }
	        });
	    },
	    /***
	     *  获取四个模块的js文件
	     */
	    getModule: function() {
	        var that = this,
	            _layout = __webpack_require__(92),
	            _top = __webpack_require__(93),
	            _style = __webpack_require__(94),
	            _template = __webpack_require__(95),
	            moduleArr = [_layout, _top, _style, _template];
	        /***
	         * 初始化每个模块
	         */
	        $.each(moduleArr, function(index, val) {
	            new val(that.pageEntity, that.topHtml, that.interfaceUrl);
	        });
	    },
	    /***
	     * 绑定顶部操作区域事件
	     */
	    topEvent: function() {
	        var that = this,
	            exitBtn = $('[data-node-name="exitBtn"]'),
	            _menu = $('[data-node-name="navMenu"]'),
	            menuLeft = $('.proH2left', _menu),
	            menuRight = $('.proH2rig', _menu),
	            reList = $('.reBoxAlert', menuRight),

	            /**
	             * [_btnShowGuider 建站向导按钮]
	             * @type {Object}
	             */
	            _btnShowGuider = $('[data-node-name="guider"]');

	        /***
	         * 板式布局到导航管理的四个页签切换
	         */
	        menuLeft.on('click', 'a', function() {
	            var me = $(this),
	                thatEditBox = that.topOperaWrap.find('.editBoxCon').eq(me.index());
	            /***
	             * 点击四个页签，如果下面设置层已经显示那么隐藏，如果是隐藏的，那么打开对应设置层
	             */
	            if (thatEditBox.is(':visible')) {
	                that.topOperaWrap.hide().find('.editBoxCon').hide();
	                menuLeft.find('a').removeClass('leftCur');
	            } else {
	                that.topOperaWrap.show().find('.editBoxCon').hide();
	                me.addClass('leftCur').siblings().removeClass('leftCur');
	                thatEditBox.show();
	            }
	        });

	        /***
	         * 退出
	         */
	        exitBtn.click(function() {
	            that.dialog('您确认要退出网站设定后台吗？退出前请确认您的最新设定已保存并应用。', function() {
	                window.location.href = that.interfaceUrl.exit;
	            });
	        });

	        /***
	         * 恢复下拉菜单
	         */
	        menuRight.find('.reBox,.reBoxAlert').mouseover(function() {
	            reList.show();
	        }).mouseout(function() {
	            reList.hide();
	        });

	        /***
	         * 恢复事件
	         */
	        reList.find('a').click(function() {
	            that.restoreTemplate($(this));
	        });

	        /***
	         * 发布
	         */
	        menuRight.find('.rigCur').click(function() {
	            that.release();
	        });

	        /**
	         * [生成 建站向导 弹出框DOM元素]
	         */
	        that.guiderDialogEntity = dialog({
	            innerHTML: that.topHtml.guider || '',
	            autofocus: false
	        });

	        /**
	         * [绑定 建站向导 弹出框关闭按钮点击事件]
	         */
	        $(that.guiderDialogEntity.node).find('.close').click(function() {
	            that.guiderDialogEntity.close();
	        });

	        /**
	         * [绑定 建站向导 按钮点击事件]
	         */
	        _btnShowGuider.click(function(event) {
	            that.guiderDialogEntity.showModal();
	        });
	    },

	    /***
	     * 恢复商铺模板
	     */
	    restoreTemplate: function(me) {
	        var that = this,
	            actiontype = me.index() + 1,
	            dialogHtml = actiontype == 1 ? '您确认要将网站恢复至默认风格吗？' : '您确认要将网站恢复至最后一次保存的风格吗？';
	        this.dialog(
	            dialogHtml,
	            function() {
	                $.ajax({
	                    url: that.interfaceUrl.restoreTemplate,
	                    data: {
	                        actiontype: actiontype,
	                        providerid: that.pageEntity.providerid,
	                        t: Math.random()
	                    },
	                    dataType: 'json',
	                    success: function(data) {
	                        if (data.state == 0) {
	                            tool.createDialog(data.message);
	                        } else {
	                            /**
	                             * 刷新当前页面
	                             */
	                            window.location.reload();
	                        }
	                    },
	                    error: function() {
	                        tool.createDialog('恢复商铺模板失败！');
	                    }
	                });
	            }
	        );
	    },
	    /***
	     * 发布模板
	     */
	    release: function() {
	        var that = this;
	        that.dialog(
	            '点击确定后，您本次对商铺进行的装修将立即生效！',
	            function() {
	                $.ajax({
	                    url: that.interfaceUrl.backupAndRelease,
	                    data: {
	                        actiontype: 2,
	                        providerid: that.pageEntity.providerid,
	                        t: Math.random()
	                    },
	                    dataType: 'json',
	                    success: function(data) {
	                        if (data.state == 0) {
	                            tool.createDialog(data.message);
	                        } else {
	                            tool.createDialog('发布商铺模板成功！');
	                        }
	                    },
	                    error: function() {
	                        tool.createDialog('发布商铺模板失败！');
	                    }
	                });
	            });
	    },
	    /***
	     * 创建弹框
	     * @param info 提示信息
	     * @param success 成功的回调
	     * @param error  失败的回调
	     */
	    dialog: function(info, success, error) {
	        dialog({
	            title: '提示',
	            content: info,
	            okValue: '确定',
	            ok: function() {
	                this.close().remove();
	                success && success();
	            },
	            cancelValue: '取消',
	            cancel: function() {
	                this.close().remove();
	                error && error();
	            }
	        }).showModal();
	    },
	    /***
	     * 异步加载所有组件，返回一个延迟对象
	     * @returns {*}
	     */
	    loadComponents: function() {
	        var mustacheDef = $.Deferred();
	        __webpack_require__.e/* nsure */(3, function(require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });

	        /**
	         * [webuploaderDeferred 创建加载 webuploader 延迟对象]
	         * @type {Object}
	         */
	        var webuploaderDeferred = $.Deferred();
	        __webpack_require__.e/* nsure */(5, function(require) {
	            __webpack_require__(57);
	            webuploaderDeferred.resolve();
	        });

	        /**
	         * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
	         * @type {Object}
	         */
	        var imgLiquidDeferred = $.Deferred();
	        __webpack_require__.e/* nsure */(1, function(require) {
	            __webpack_require__(44);
	            imgLiquidDeferred.resolve();
	        });

	        return [mustacheDef, webuploaderDeferred, imgLiquidDeferred];
	    }

	};

	module.exports = topOperaArea;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/9.
	 * 板式布局
	 */
	var tool = __webpack_require__(65),
	    topLayout = function (pageEntity, html, interfaceUrl) {
	        /***
	         * 商铺配置数据
	         */
	        this.pageEntity = $.extend({}, pageEntity);
	        /****
	         * 接口地址
	         */
	        this.interfaceUrl = interfaceUrl;
	        /***
	         * 板式布局区域
	         * @type {*|jQuery|HTMLElement}
	         */
	        this.topLayout = $('[node-name="layout"]');

	        this.switchLayout();
	    };
	topLayout.prototype = {
	    switchLayout: function () {
	        var that = this;
	        /****
	         * 点击侧栏在左侧
	         */
	        that.topLayout.on('click', '.Format1Img', function () {
	            that.changeLayout($(this), 'Format1ImgCur', 'Format2ImgCur', 'right', 'left', '2');
	        });
	        /****
	         * 点击侧栏在右
	         */
	        that.topLayout.on('click', '.Format2Img', function () {
	            that.changeLayout($(this), 'Format2ImgCur', 'Format1ImgCur', 'left', 'right', '1');
	        });
	    },
	    /***
	     * 修改左右布局
	     * @param me 点击的左右布局
	     * @param className 增加的class
	     * @param removeClassName 移除的class
	     * @param floatType 百分之二十五区域浮动类型
	     * @param flotType2 百分之七十五区域浮动类型
	     * @param layoutType  布局类型，1:左窄右宽，2：左宽右窄
	     */
	    changeLayout: function (me, className, removeClassName, floatType, flotType2, layoutType) {
	        var that = this;
	        if (!me.hasClass(className)) {
	            $.ajax({
	                url: that.interfaceUrl.indexLayout,
	                data: {
	                    templateid: this.pageEntity.template.id, //模板id
	                    layout: layoutType, //布局类型，1:左窄右宽，2：左宽右窄
	                    t: Math.random()
	                },
	                dataType: 'json',
	                success: function (data) {
	                    if (data.state == 0) {
	                        tool.createDialog(data.message);
	                    } else {
	                        me.addClass(className);
	                        me.parent('.FormatBox').siblings().find('span').removeClass(removeClassName);

	                        /***
	                         * 频道页面不切换板式布局，板式布局只能在首页切换，pageName首页的标识符
	                         */
	                        if (window.pageName == "index") {

	                            /**
	                             * [regionList 获取区域列表对象]
	                             * @type {Array}
	                             */
	                            var regionList = window.pageEntity.regionList || [];

	                            /**
	                             * [找到25%、75%区域设定相应样式来渲染新布局]
	                             */
	                            $.each(regionList, function (regionIndex, regionEntity) {

	                                /**
	                                 * [设定25%区域的浮动样式以及该区域下各模块 添加模块 按钮显示位置]
	                                 */
	                                if (regionEntity.identifier === 'region_percent_25') {
	                                    regionEntity.htmlEntity.css('float', floatType);

	                                    /**
	                                     * [根据布局方式设置25%区域下各模块 添加模块 按钮显示位置]
	                                     */
	                                    (parseInt(layoutType) === 2) ? regionEntity.htmlEntity.addClass('p25Rig') : regionEntity.htmlEntity.removeClass('p25Rig');
	                                }

	                                /**
	                                 * [设定75%区域的浮动样式以及该区域下各模块 添加模块 按钮显示位置]
	                                 */
	                                if (regionEntity.identifier === 'region_percent_75') {
	                                    regionEntity.htmlEntity.css('float', flotType2);

	                                    /**
	                                     * [根据布局方式设置75%区域下各模块 添加模块 按钮显示位置]
	                                     */
	                                    (parseInt(layoutType) === 2) ? regionEntity.htmlEntity.addClass('p75Left') : regionEntity.htmlEntity.removeClass('p75Left');
	                                }
	                            });
	                        }
	                        tool.createDialog('设定成功！您可切换到首页查看效果。');
	                    }
	                }
	            });

	        }
	    }
	};
	module.exports = topLayout;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/9.
	 * 导航管理
	 */
	var tool = __webpack_require__(65),
	    util=__webpack_require__(53),
	    topNav = function (pageEntity, html, interfaceUrl) {
	        this.topHtml=html;
	        /***
	         * 商铺配置数据
	         */
	        this.pageEntity = $.extend({}, pageEntity);
	        /****
	         * 接口地址
	         */
	        this.interfaceUrl = interfaceUrl;
	        /***
	         * 导航管理区域
	         */
	        this.navManageWrap = $('[node-name="navManage"]');

	        /***
	         * 默认导航选中项目的id，默认是首页id（0）
	         */
	        this._defaultNavId = 0;

	        /***
	         * 当前用户使用的模板数据
	         */
	        this.template = this.pageEntity.template;

	        this.initNav();
	    };
	topNav.prototype={
	    /***
	     * 导航设置
	     */
	    initNav: function () {
	        var that = this,
	            /***
	             * 模块设置区域，导航列表
	             */
	            _ul = that.navManageWrap.find('.navManageList ul');

	        $.ajax({
	            url: that.interfaceUrl.navSettings,
	            data: {
	                templateid: that.template.id,
	                t:Math.random()  //随机数防止ie9缓存

	            },
	            dataType: 'json',
	            success: function (data) {
	                if (data.state == 0) {
	                    tool.createDialog(data.message);
	                } else {
	                    /***
	                     * 将导航数据存储到navData
	                     */
	                    that.navData = data.data;
	                    /***
	                     * 存储导航模块编号，更新导航发送数据用到
	                     */
	                    that.moduleid = data.moduleid;
	                    /***
	                     * 初始化默认导航选中项的id
	                     */
	                    var _defaultNav = $('[data-node-name="navWrap"]').find('td a.navCur').html();
	                    $.each(that.navData, function (index, val) {
	                        if (val.name == _defaultNav) {
	                            that._defaultNavId = val.id;
	                        }
	                    });
	                    /***
	                     * 创建模板引擎数据
	                     */
	                    var configData = {
	                        navData: data.data,
	                        getSettings: function () {
	                            return JSON.stringify(this);
	                        },
	                        isShowNav: function () {
	                            /***
	                             * 如果是不可修改的，直接是选中状态  0表示不可更改
	                             */
	                            if (this.enabled == '0') {
	                                return 'selectIcoDefault';
	                            } else {
	                                if (this.visible == '1') {
	                                    return 'selectIcoCur';
	                                } else if (this.visible == '0') {
	                                    return 'selectIco';
	                                }
	                            }
	                        },
	                        upHide: function () {
	                            if (this.order == 1) {
	                                return 'none';
	                            } else {
	                                return 'block';
	                            }
	                        },
	                        doneHide: function () {
	                            if (this.order == that.navData.length) {
	                                return 'none';
	                            } else {
	                                return 'block';
	                            }
	                        }
	                    };
	                    /***
	                     * 获取导航模板数据
	                     * @type {*|jQuery}
	                     */
	                    if (that.topHtml.navUl) {
	                        _ul.html(mustache.render(that.topHtml.navUl, configData));
	                        /***
	                         * 将自定义属性放到data缓存上
	                         */
	                        $.each(_ul.find('li'), function (index, val) {
	                            $(val).data('navSetting', $(val).attr('navSetting'));
	                        });
	                        /***
	                         * 修改导航名称
	                         */
	                        that.changeNavName();
	                        /***
	                         * 修改导航的显示状态
	                         */
	                        that.editeShowStatus();
	                        /***
	                         * 导航项目上移和下移
	                         */
	                        that.navOrder();
	                    }
	                }
	            },
	            error: function () {
	                tool.createDialog('拉取导航接口失败');
	            }
	        });

	    },
	    /**
	     * 修改导航名称
	     * @param _ul 导航设置下拉修改名称的当前列表
	     */
	    changeNavName: function () {
	        var that = this,
	            _ul = that.navManageWrap.find('.navManageList ul'),
	            editNameBtn = _ul.find('li [node-name="showName"]').find('.navEdit'),
	            editInput = _ul.find('li [node-name="editname"]').find('input');
	        /***
	         * 点击修改按钮，出现修改导航名称编辑框
	         */
	        if (!editNameBtn.data('isClick')) {
	            editNameBtn.click(function () {
	                var me = $(this),
	                    _li=$(this).closest('li[navsetting]'),
	                    editnameWrap = _li.find('[node-name="editname"]'),
	                    showNameWrap= _li.find('[node-name="showName"]');
	                me.data('isClick', true);
	                /** 隐藏显示导航区域 **/
	                showNameWrap.hide();
	                /** 显示导航修改区域 **/
	                editnameWrap.show();
	                /** input区域获得焦点 **/
	                editnameWrap.find('input').focus();
	            });
	        }
	        /***
	         * 绑定input失去焦点事件
	         */
	        editInput.blur(function () {
	            var me = $(this),
	                /***
	                 * 弹框html
	                 */
	                dialogHtml='<div class="navPromprBox"><h4>确定要修改导航名称吗？</h4></div>',

	                _id = JSON.parse(me.parents('li').data('navSetting')).id,
	                /**
	                 * 编辑导航名称框
	                 */
	                editNameWrap = me.parent(),
	                /***
	                 * 显示导航名称框
	                 */
	                showNameWrap = editNameWrap.next(),
	                /**
	                 * 更改之前的导航名称
	                 */
	                nameValue = showNameWrap.find('p').html(),
	                /***
	                 * 显示导航里面的编辑按钮
	                 */
	                nameEditBtn = showNameWrap.find('.navEdit'),
	                /***
	                 * 更改后的导航名称
	                 */
	                inputVal = $.trim(me.val());
	            if (inputVal.length < 4) {
	                var info=inputVal.length==0?'导航名称不能为空':'一级频道名称必须为4个字';
	                that.newDialog(info, function () {
	                    /***
	                     * 隐藏编辑状态,显示原来导航
	                     */
	                    editNameWrap.find('input').val(nameValue).end().hide();
	                    showNameWrap.show();
	                }, function () {
	                    /***
	                     * 隐藏编辑状态,显示原来导航
	                     */
	                    editNameWrap.find('input').val(nameValue).end().hide();
	                    showNameWrap.show();
	                });
	                return;
	            }
	            if(inputVal.length>4){
	                dialogHtml='<div class="navPromprBox"><h4>确定要修改导航名称吗？</h4><p>提示：名称长度为4个字，超出隐藏</p></div>';
	                inputVal=inputVal.substr(0,4);
	            }

	            that.newDialog(dialogHtml,
	                function () {
	                    /***
	                     * 复制一份导航数据
	                     */
	                    var navList = $.extend(true, [], that.navData);
	                    /***
	                     * 修改导航数据
	                     */
	                    $.each(navList, function (index, val) {
	                        if (val.id == _id) {
	                            val.name = inputVal;
	                        }
	                    });
	                    /***
	                     * 更新导航名称
	                     */
	                    that.updataNavData(navList, function () {
	                        /***
	                         * 修改名称成功后，将修改后的数据更新navData
	                         */
	                        that.navData = navList.slice(0);
	                        /***
	                         * 更新导航html
	                         */
	                        that.updateNavHtml();
	                        /***
	                         * 重置点击状态为可点击
	                         */
	                        nameEditBtn.data('isClick', false);
	                        /***
	                         * 修改input输入框的导航名称并且隐藏编辑框
	                         */
	                        editNameWrap.find('input').val(inputVal).end().hide();
	                        /**
	                         * 修改p标签的显示导航名称
	                         */
	                        showNameWrap.find('p').html(inputVal).end().show();
	                    });
	                },
	                function () {
	                    /***
	                     * 隐藏编辑状态,显示原来导航
	                     */
	                    editNameWrap.find('input').val(nameValue).end().hide();
	                    showNameWrap.show();
	                    nameEditBtn.data('isClick', false);
	                });
	        });
	    },
	    /***
	     * 修改导航的显示状态
	     *  @param _ul 导航设置下拉修改名称的当前列表
	     */
	    editeShowStatus: function () {
	        var that = this,
	            _ul = that.navManageWrap.find('.navManageList ul'),
	            isShowBtn = _ul.find('li [node-name="showStatus"] em');
	        /***
	         * 绑定点击事件，切换显示状态
	         */
	        isShowBtn.click(function () {
	            var me = $(this),
	                _li = me.parents('li'),
	                navList = $.extend(true, [], that.navData),
	                navSetting = JSON.parse(_li.data('navSetting')),
	                thisVisible = navSetting.visible == 0 ? 1 : 0;
	            /***
	             * 不可定义显示状态
	             */
	            if (navSetting.enabled == 0) {
	                return false;
	            }
	            /***
	             * 修改更新的导航显示状态数据
	             */
	            $.each(navList, function (index, val) {
	                val.id == navSetting.id ? val.visible = thisVisible : null;
	            });

	            /***
	             * 发送更新导航数据请求
	             */
	            that.updataNavData(navList, function () {
	                /***
	                 * 接口成功，更新navdata数据
	                 */
	                that.navData = navList.slice(0);
	                /***
	                 * 显示或不显示导航切换
	                 */
	                if (me.hasClass('selectIcoCur')) {
	                    //取消显示当前导航
	                    me.removeClass('selectIcoCur').addClass('selectIco');
	                    navSetting.visible = 0;
	                } else {
	                    //显示当前导航
	                    me.removeClass('selectIco').addClass('selectIcoCur');
	                    navSetting.visible = 1;
	                }
	                /***
	                 * 重写缓存数据
	                 */
	                _li.data('navSetting', JSON.stringify(navSetting));
	                /**
	                 * 更新导航Html
	                 */
	                that.updateNavHtml();
	            });

	        });
	    },
	    /***
	     * 导航上移和下移
	     */
	    navOrder: function () {
	        var that = this,
	            _ul = that.navManageWrap.find('.navManageList ul'),
	            orderEdit = _ul.find('[node-name="orderEdit"]');
	        /***
	         * 点击向上移动按钮
	         */
	        orderEdit.find('em.nUp').click(function () {
	            var upBtn = $(this),
	                _this = upBtn.parents('li'),
	                prev = _this.prev();
	            /***
	             * 交换导航和缓存的数据
	             */
	            var navList = that.exchangeNaveData(_this, prev);
	            /***
	             * 发送更新导航数据请求
	             */
	            that.updataNavData(navList, function () {
	                that.navData = navList.slice(0);
	                if (prev.index() == 0) {
	                    /**
	                     * 当前是第二条，点击上移，那么把当前的向上移动隐藏，把上一条的向上移动显示
	                     */
	                    upBtn.hide();
	                    prev.find('em.nUp').show();
	                } else if (_this.index() == that.navData.length - 1) {
	                    /**
	                     * 当前是最后一条，点击上移，那么把当前的向下移动显示，把上一条的向下移动显示
	                     */
	                    upBtn.next('.nDown').show();
	                    prev.find('.nDown').hide();
	                }
	                prev.before(_this);
	                that.updateNavHtml();
	            });
	        });

	        /***
	         * 点击向下移动按钮
	         */
	        orderEdit.find('em.nDown').click(function () {
	            var downBtn = $(this),
	                _this = downBtn.parents('li'),
	                other = _this.next();
	            /***
	             * 交换导航和缓存的数据
	             */
	            var navList = that.exchangeNaveData(_this, other);
	            /***
	             * 发送更新导航数据请求
	             */
	            that.updataNavData(navList, function () {
	                that.navData = navList.slice(0);
	                if (_this.index() == 0) {
	                    /**
	                     * 当前是第一条，点击下移，那么把当前的向上移动显示，把下一条的向上移动隐藏
	                     */
	                    downBtn.prev('.nUp').show();
	                    other.find('em.nUp').hide();
	                } else if (_this.index() == that.navData.length - 2) {
	                    /**
	                     * 当前是最后二条，点击下移，那么把当前的向下移动隐藏，把上一条的向下移动显示
	                     */
	                    downBtn.hide();
	                    other.find('.nDown').show();
	                }
	                other.after(_this);
	                that.updateNavHtml();
	            });


	        });
	    },
	    /***
	     * 交换导航缓存的数据和导航配置数据
	     * @param _this 点击上移或者下移的li
	     * @param other 相邻的上一个或者下一个的li
	     */
	    exchangeNaveData: function (_this, other) {
	        var navList = $.extend(true, [], this.navData),
	            otherSetting = JSON.parse(other.data('navSetting')),
	            _thisSetting = JSON.parse(_this.data('navSetting'));
	        /***
	         * 交换导航数据的order；
	         */
	        $.each(navList, function (index, val) {
	            if (val.id == otherSetting.id) {
	                val.order = _thisSetting.order;
	            } else if (val.id == _thisSetting.id) {
	                val.order = otherSetting.order;
	            }
	        });
	        /***
	         * 交换两个li的order；
	         * @type {string|*}
	         */
	        var thatOrder = otherSetting.order;
	        otherSetting.order = _thisSetting.order;
	        _thisSetting.order = thatOrder;
	        /***
	         * 更新导航缓存上的数据
	         */
	        other.data('navSetting', JSON.stringify(otherSetting));
	        _this.data('navSetting', JSON.stringify(_thisSetting));
	        /***
	         * 返回更改后的数据
	         */
	        return navList;
	    },
	    /***
	     * 导航数据更新，ajax请求
	     * @param data 导航数据
	     * @param success 更新成功后的回调函数
	     */
	    updataNavData: function (data, success) {
	        var that = this;
	        return $.ajax({
	            url: that.interfaceUrl.navDataUpdate,
	            data: {
	                data: encodeURIComponent(JSON.stringify(data)),
	                moduleid: that.moduleid,
	                t:Math.random()
	            },
	            dataType: 'json',
	            success: function (data) {
	                if (data.state == 0) {
	                    tool.createDialog(data.message);
	                } else {
	                    success && success();
	                }
	            },
	            error: function () {
	                tool.createDialog('更新导航失败！');
	            }
	        });

	    },
	    /***
	     * 更新导航的html结构
	     */
	    updateNavHtml: function () {
	        var that = this;
	        /***
	         * 复制一份当前的导航数据
	         */
	        var navData = $.extend(true, [], that.navData);
	        /***
	         * 获得导航条模块的ul区域
	         */
	        var navList = $('[data-node-name="navWrap"]').find('.navBoxCon tr');
	        /***
	         * 增加一个首页
	         */
	        navData.splice(0, 0, {
	            "id": "0",
	            "order": "0",
	            "name": "首页",
	            "visible": "1",
	            "enabled": "0",
	            "url": "#"
	        });
	        /***
	         * 遍历导航数据，给默认选中的当前页增加一个curr属性；
	         */
	        $.each(navData, function (index, nav) {
	            if (nav.id == that._defaultNavId) {
	                nav.curr = true;
	            } else {
	                nav.curr = false;
	            }
	        });
	        /***
	         * 根据order排序导航顺序
	         */
	        navData.sort(function (a, b) {
	            return a.order - b.order;
	        });
	        /***
	         * 创建模板字符串，更新导航
	         */
	        var tpl = '{{#navData}}<td style="display: {{isShow}}"><a href="{{url}}" class="{{#curr}}navCur{{/curr}}">{{name}}</a></td>{{/navData}}';
	        navList.html(
	            mustache.render(tpl, {
	                navData: navData,
	                isShow: function () {
	                    if (this.visible == 1) {
	                        return 'block';
	                    } else {
	                        return 'none';
	                    }
	                }
	            })
	        );
	    },
	    /***
	     * 创建一个弹框
	     * @param info info是弹框内容
	     * @param callback 点击确定后的回调函数
	     */
	    newDialog: function (info, success, error) {
	        dialog({
	            title: '提示',
	            content: info,
	            okValue: '确定',
	            ok: function () {
	                this.close().remove();
	                success && success();
	            },
	            cancelValue: '取消',
	            cancel: function () {
	                this.close().remove();
	                error && error();
	            }
	        }).showModal();
	    }
	};
	module.exports = topNav;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/9.
	 * 风格设置
	 */
	var tool = __webpack_require__(65),
	    topStyle = function(pageEntity, html, interfaceUrl) {
	        /***
	         * 商铺配置数据
	         */
	        this.pageEntity = $.extend({}, pageEntity);
	        /****
	         * 接口地址
	         */
	        this.interfaceUrl = interfaceUrl;
	        /***
	         * 风格设置区域
	         */
	        this.templateStyleWrap = $('[node-name="templateStyle"]');

	        /***
	         * 更新样式的全局样式发送的ajax数据
	         */
	        this.globalStyle = $.extend(true, {}, this.pageEntity["global-style"]);

	        /***
	         * 记录用户选择的内背景样式
	         */
	        this.insidebackground = {
	            recommBg: '', //推荐背景
	            uploadBg: '', //上传背景
	            bgColor: '' //图片颜色
	        };
	        /***
	         * 记录用户选择的外背景样式
	         */
	        this.outsidebackground = {
	            vipBg: '', //vip背景
	            recommBg: '', //推荐背景
	            uploadBg: '', //上传背景
	            bgColor: '' //图片颜色
	        };

	        this.initStyle();
	    };
	topStyle.prototype = {
	    initStyle: function() {
	        var that = this; //外背景样式
	        /***
	         * 初始化内背景操作
	         */
	        new tempStyle({
	            backType: 'insidebackground',
	            uploadBtn: '#insideSelectBtn',
	            webuploader: {
	                fileSingleSizeLimit: 1 * 1024 * 1024
	            }
	        }, that);

	        /***
	         * 初始化外背景操作
	         */
	        new tempStyle({
	            backType: 'outsidebackground',
	            uploadBtn: '#outsideSelectBtn'
	        }, that);
	        /**
	         * 内外背景切换
	         */
	        var bgManageBox = that.templateStyleWrap.find('.editBoxRight .bgManageBox');
	        that.templateStyleWrap.find('.editBoxLeft dd').click(function() {
	            $(this).addClass('ddCur').siblings().removeClass('ddCur');
	            bgManageBox.find('.bgManage').hide();
	            bgManageBox.find('.bgManage').eq($(this).index()).show();
	        });
	    }

	};

	module.exports = topStyle;

	/***
	 * 创建内外背景的构造函数
	 * @param config   内外背景的配置项
	 * @param that  当前对象
	 */
	var tempStyle = function(config, that) {
	    this.copyAttr(that);
	    /***
	     * 是否可用使用vip外背景
	     */
	    this.membersVip = this.pageEntity.isvip;

	    /***
	     * 当前用户使用的模板数据
	     */
	    this.template = this.pageEntity.template;

	    /****
	     * 风格设置的内外背景，如果用户没有上传图片，用无图的图片
	     * @type {string}
	     */
	    this.noPicAddress = '//style.org.hc360.com/images/detail/mysite/default/noPicAddress.jpg';
	    /***
	     * 初始化内外背景
	     */
	    this.init(config);
	};
	tempStyle.prototype = {

	    init: function(config) {
	        var that = this;
	        /** 上传图片按钮 **/
	        this.uploadBtn = config.uploadBtn;
	        /***
	         * 背景类型  内背景或者外背景
	         */
	        this.backType = config.backType;
	        /***
	         * 背景区域
	         */
	        this.content = this.templateStyleWrap.find('[node-name="' + this.backType + '"]');
	        /***
	         * 默认背景样式
	         */
	        this.defaultBack = tool.formatDate(this.globalStyle[this.backType]);
	        /***
	         * 默认当前区域的背景图片，
	         */
	        this.imageSrc = tool.getBgUrl(this.defaultBack["background-image"]);
	        /***
	         * 将大图路径替换成小图路径
	         */
	        this.defaultBgImg = this.imageSrc && this.imageSrc.replace('/abroad/', '/within/');
	        /***
	         *  默认当前区域的背景颜色
	         */
	        this.defaultBgColor = this.defaultBack.background;
	        /***
	         * 内外背景图片地址
	         * @type {{insideBg: 内背景推荐背景, insideVipBg: 内背景VIP背景, outsideBg: 外背景推荐背景, outsideVipBg: 外背景VIP背景}}
	         */
	        this.backObject = {
	            insideBg: [
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_1.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_2.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_3.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_4.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_5.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_6.jpg'
	            ],
	            outsideBg: [
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_1.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_2.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_3.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_4.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_5.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_6.jpg'
	            ],
	            outsideVipBg: [
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_1.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_2.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_3.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_4.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_5.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_6.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_7.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_8.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_9.jpg',
	                '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_10.jpg'
	            ]
	        };

	        /**
	         * [webuploaderConfig 上传组件基础配置对象]
	         * @type {[type]}
	         */
	        that.webuploaderConfig = $.extend({}, {
	            // swf文件路径
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
	            // 文件接收服务端。
	            server: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd',
	            // 选择文件的按钮。可选。
	            pick: {
	                id: that.uploadBtn,
	                multiple: false //关闭多个文件传输的功能
	            },
	            formData: {
	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',
	                /**
	                 * [picstr 加密信息picstr]
	                 */
	                picstr: $('#picstr').val() || ''
	            },
	            //设置文件上传域的name。
	            fileVal: "file",
	            //最多支持上传一个图片
	            threads: 1,
	            //限制单个文件大小
	            fileSingleSizeLimit: 5 * 1024 * 1024, // 5M
	            // 只允许选择图片文件。
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,png',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
	            },
	            compress: false,
	            //禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	            disableGlobalDnd: true,
	            duplicate: true, //是否可以上传重复文件，默认为undefined
	            //不需要手动调用上传，有文件选择即开始上传
	            auto: true
	        }, config.webuploader);

	        this.initRecommendBack();
	        this.initImageUplaod();
	        this.initColor();
	        /***
	         * 背景类型前面的单选按钮点击事件
	         */
	        that.content.find('dl dt').click(function() {
	            var _me = $(this).find('em'), //背景类型
	                _type = _me.parents('.bgImgBox').attr('node-name'), //应用的图片类型：vip，推荐，上传，颜色
	                thisBgStyle = that[that.backType][_type]; //用户当前类型下的样式；
	            /***
	             * 更新发送给后台的样式对象
	             */
	            if (thisBgStyle) {
	                that.globalStyle[that.backType] = thisBgStyle;
	            }
	            /***
	             * 更新导航样式，并选中选择背景色单选
	             */
	            that.updateTempStyle(function() {
	                that.content.find('dl dt em').removeClass('radioCur');
	                _me.addClass('radioCur');
	            });
	        });
	        /***
	         * vip背景和推荐背景点击事件
	         */
	        that.content.on('click', 'ul[data-bglogo] li', function() {
	            that.applicaBackground($(this));
	        });
	    },
	    /**
	     * 初始化内外背景的推荐背景和vip背景
	     */
	    initRecommendBack: function() {
	        var that = this,
	            vipBgWrap = this.content.find('[node-name="vipBg"]'), //vip背景
	            ulList = this.content.find('ul[data-bglogo]'); //外背景的vipul和推荐背景ul，内背景的推荐背景ul列表

	        $.each(ulList, function() {
	            var me = $(this),
	                backKey = me.attr('node-name'), //对应backObject里面的key
	                isVip = (backKey == "outsideVipBg") ? 'isVip=1' : '', //是否是vip列表
	                _em = me.parents('dl').find('dt em'), //单选按钮
	                _type = me.parents('.bgImgBox').attr('node-name'), //当前的背景类型 insideBg outsideVipBg  outsideBg
	                imgHtml = '';
	            /***
	             * 获取vip背景和推荐背景ul上面的自定义属性node-name,对应bgObj里面的属性值，循环输出背景图，并且初始化默认选中背景
	             */
	            $.each(that.backObject[backKey], function(index, val) {
	                if (that.defaultBgImg && that.defaultBgImg == val) {
	                    (!_em.hasClass('radioCur')) ? _em.addClass('radioCur'): null;
	                    /***
	                     * 修改全局用户内外背景对象 insidebackground  outsidebackground
	                     */
	                    that[that.backType][_type] = 'background-image: url(' + that.defaultBgImg + ');';
	                    imgHtml += '<li class="bgCur" ' + isVip + '><img src="' + val + '"> </li>';
	                } else {
	                    imgHtml += '<li ' + isVip + '><img src="' + val + '"> </li>';
	                }
	            });
	            me.html(imgHtml);
	        });
	        /***
	         * 如果是免费会员隐藏vip背景
	         */
	        if (!that.membersVip && vipBgWrap.length > 0) {
	            vipBgWrap.hide();
	        }
	    },
	    /***
	     * 初始化上传图片
	     */
	    initImageUplaod: function() {
	        var that = this,
	            uploadWrap = that.content.find('[node-name="uploadBg"]'),
	            imgElement = uploadWrap.find('.updateImgBox img');
	        if (that.defaultBgImg) {
	            var flag = true,
	                bglinkArr = that.backType == 'insidebackground' ? that.backObject["insideBg"] : that.backObject["outsideBg"].concat(that.backObject["outsideVipBg"]);
	            /***
	             * 遍历推荐背景图片，跟默认的图片比对，如果不相等，那就是上传的图片
	             */
	            $.each(bglinkArr, function(index, val) {
	                if (val == that.defaultBgImg) {
	                    flag = false;
	                    return false;
	                }
	            });
	            if (flag) {
	                imgElement.attr('src', that.defaultBgImg);
	                uploadWrap.find('dl dt em').addClass('radioCur');
	                /***
	                 * 更新全局用户内外背景对象
	                 * @type {string}
	                 */
	                that[that.backType].uploadBg = 'background-image: url(' + that.defaultBgImg + ');';
	            } else {
	                imgElement.attr('src', this.noPicAddress);
	            }
	        } else {
	            imgElement.attr('src', this.noPicAddress);
	        }

	        /***
	         * 初始化图片上传
	         */
	        that.bgImgUpload(uploadWrap);
	    },
	    /***
	     * 初始化颜色选择器
	     */
	    initColor: function() {
	        var that = this,
	            backColorWrap = that.content.find('[node-name="bgColor"]'),
	            colorVal = that.defaultBgColor ? that.defaultBgColor : '',
	            _type = backColorWrap.attr('node-name'); // 背景类型，背景颜色，上传背景，推荐背景
	        /***
	         * 初始化默认是否是背景颜色
	         */
	        if (that.defaultBgColor) {
	            backColorWrap.find('dt em').addClass('radioCur');
	            backColorWrap.find('.bgColorBox').css('background', that.defaultBgColor).attr('data-color', that.defaultBgColor);
	            /***
	             * 更新全局用户内外背景对象  insidebackground  outsidebackground
	             */
	            this[this.backType].bgColor = 'background: ' + this.defaultBgColor + ';';
	        }

	        /***
	         * 初始化颜色编辑器
	         */
	        tool.createColorpicker(backColorWrap.find('.bgColorBox'), colorVal, null, function() {
	            var color = backColorWrap.find('.bgColorBox').attr('data-color'),
	                colorCss = 'background: ' + color + ';';
	            /***
	             * 更新全局用户内外背景对象
	             */
	            that[that.backType][_type] = colorCss;
	            /***
	             * 更新发送给后台的用户当前选择的背景对象
	             */
	            that.globalStyle[that.backType] = colorCss;
	            that.globalStyle.isvipbackground = 0;
	            /***
	             * 更新导航样式，并选中选择背景色单选
	             */
	            that.updateTempStyle(function() {
	                that.content.find('dl dt em').removeClass('radioCur');
	                backColorWrap.find('dt em').addClass('radioCur');
	            });
	        });
	    },
	    /***
	     * 应用推荐背景和vip背景
	     * @param me 当前点击项
	     */
	    applicaBackground: function(me) {
	        var that = this,
	            /***
	             * 当前背景里面的推荐背景，vip背景，上传背景，背景色
	             */
	            _type = me.parents('.bgImgBox').attr('node-name'), //样式类型，上传，颜色或者推荐
	            isVip = me.attr('isVip'),
	            imgSrc = me.find('img').attr('src').replace('/within/', '/abroad/'), //替换成大图
	            bgCss = 'background-image: url(' + imgSrc + ');',
	            _em = me.parents('dl').find('dt em');
	        /***
	         * 取消背景选择
	         */
	        if (me.hasClass('bgCur')) {
	            var thatBg = that[that.backType][_type],
	                globalBg = that.globalStyle[that.backType];
	            /***
	             * 如果取消选中的背景，跟全局背景相同就更新全局样式，否则不更新全局样式
	             */
	            if (thatBg == globalBg) {
	                /***
	                 * 更新发送给后台的用户当前选择的背景对象
	                 */
	                that.globalStyle[that.backType] = "";
	                that.globalStyle.isvipbackground = isVip == 1 ? 1 : 0;
	                that.updateTempStyle(function() {
	                    _em.removeClass('radioCur');
	                    me.removeClass('bgCur');
	                });
	            }
	            /***
	             * 更新全局用户内外背景对象
	             */
	            that[that.backType][_type] = "";
	            me.removeClass('bgCur');
	        } else {
	            /***
	             * 更新全局用户内外背景对象
	             */
	            that[that.backType][_type] = bgCss;
	            /***
	             * 更新发送给后台的用户当前选择的背景对象
	             */
	            that.globalStyle[that.backType] = bgCss;
	            that.globalStyle.isvipbackground = isVip == 1 ? 1 : 0;
	            that.updateTempStyle(function() {
	                /***
	                 * 选中当前点击项目
	                 */
	                that.content.find('ul[data-bglogo] li').removeClass('bgCur');
	                that.content.find('dl dt em').removeClass('radioCur');
	                _em.addClass('radioCur');
	                me.addClass('bgCur');
	            });
	        }
	    },
	    /***
	     * 更新全局模板样式
	     * @param data ajaxData
	     * @param callback 成功后的回调函数
	     */
	    updateTempStyle: function(callback) {
	        var that = this,
	            insideWrap = $('div[data-inside-bg-wrap]'), //渲染内背景区域
	            outsideWrap = $('body'); //渲染外背景的区域
	        /***
	         * 发送更新样式请求的ajax的data属性增加一个模板id的字段，id的值是当前模板的id
	         */
	        that.globalStyle.templateid = this.template.id;
	        $.ajax({
	            url: that.interfaceUrl.styleUpdate,
	            data: that.globalStyle,
	            dataType: 'json',
	            success: function(data) {
	                if (data.state == 0) {
	                    tool.createDialog(data.message);
	                } else {
	                    var insideObj = tool.formatDate(that.globalStyle.insidebackground),
	                        outside = tool.formatDate(that.globalStyle.outsidebackground);
	                    /***
	                     * 移除内背景内敛样式，增加当前设置的样式
	                     */
	                    insideWrap.removeAttr('style', "");
	                    $.each(insideObj, function(key, val) {
	                        insideWrap.css($.trim(key), $.trim(val));
	                    });
	                    /***
	                     * 移除外背景内敛样式，增加当前设置的样式
	                     */
	                    outsideWrap.removeAttr('style', "");
	                    $.each(outside, function(key, val) {
	                        outsideWrap.css($.trim(key), $.trim(val));
	                    });
	                    /***
	                     * 执行回调
	                     */
	                    callback && callback();
	                }
	            },
	            error: function() {
	                tool.createDialog('更新样式失败！');
	            }
	        });
	    },
	    /***
	     * 初始化上传背景
	     * @param uploadBgWrap   上传区域
	     */
	    bgImgUpload: function(uploadBgWrap) {
	        var that = this,
	            webuploderObj = that.webuploaderConfig,
	            webuploaderEntity = webuploader.create(webuploderObj);

	        
	        /**
	         * [监听文件上传后接收服务器响应事件]
	         */
	        webuploaderEntity.on('uploadAccept', function(obj, ret) {
	            var _json = ret || {},
	                _type = uploadBgWrap.attr('node-name'), //uploadBg
	                _img = uploadBgWrap.find('.updateImgBox img'),
	                _result = false;
	            /**
	             * [文件上传成功]
	             */
	            if (_json.state === 'true') {
	                /***
	                 * 定义当前背景
	                 * @type {string}
	                 */
	                var bgCss = 'background-image: url(' + _json.result.url + ');';
	                /**
	                 * 显示上传后的图片
	                 */
	                _img.attr('src', _json.result.url);
	                /**
	                 * 使图片在容器中以全部填充的形式显示
	                 */
	                _img.parent().imgLiquid({
	                    fill: false
	                });
	                /***
	                 * 更新当前背景的选中样式
	                 */
	                that[that.backType][_type] = bgCss;
	                /***
	                 * 修改发送请求的ajaxdata数据
	                 * @type {string}
	                 */
	                that.globalStyle[that.backType] = bgCss;
	                that.globalStyle.isvipbackground = 0;
	                /***
	                 * 更新样式
	                 */
	                that.updateTempStyle(function() {
	                    /***
	                     * 选中上传背景图的的单选按钮；
	                     */
	                    that.content.find('dl dt em').removeClass('radioCur');
	                    uploadBgWrap.find('dt em').addClass('radioCur');
	                });

	            }
	            /**
	             * 文件上传失败
	             */
	            else {
	                webuploaderEntity.trigger('error', 'CUSTOM', _json.error.message);
	            }

	            return _result;
	        });

	        /**
	         * [监听上传错误事件，以显示上传错误信息]
	         */
	        webuploaderEntity.on('error', function() {
	            /**
	             * [errorSettings 错误信息枚举列表]
	             * @type {Object}
	             */
	            var _errorSettings = {
	                'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
	                'Q_EXCEED_SIZE_': '上传文件大小超过上限！',
	                'F_EXCEED_SIZE': '上传文件大小超过上限！',
	                'Q_TYPE_DENIED': '上传文件类型错误，请重新选择上传！',
	                'F_DUPLICATE': '上传文件重复了请重新选择上传！',
	                'OTHER': '上传失败请重新上传！',
	                'CUSTOM': ''
	            };

	            /** [显示错误信息] */
	            var errorCode = arguments[0] || 'OTHER';
	            dialog({
	                title: '提示',
	                content: _errorSettings[errorCode] || arguments[1] || '',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	        });
	    },
	    /***
	     * 拷贝  tempStyle上的属性
	     * @param self
	     */
	    copyAttr: function(self) {
	        var that = this;
	        $.each(self, function(key, val) {
	            if (typeof val != "function") {
	                that[key] = val;
	            }
	        });
	    }
	};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/12/9.
	 * 选择模板
	 */
	var tool = __webpack_require__(65),
	    util = __webpack_require__(53),
	    topTemplate = function (pageEntity, html, interfaceUrl) {
	        this.topHtml = html;
	        /***
	         * 商铺配置数据
	         */
	        this.pageEntity = $.extend({}, pageEntity);
	        /****
	         * 接口地址
	         */
	        this.interfaceUrl = interfaceUrl;
	        /***
	         * 选择模板区域
	         */
	        this.templateWrap = $('[node-name="templateWrap"]');

	        /***
	         * 全部模板区域
	         */
	        this.allTemplateWrap = this.templateWrap.find('.editTemplate').eq(1);
	        /***
	         * 我的模板库区域
	         */
	        this.mytemplateWrap = this.templateWrap.find('.editTemplate').eq(2);

	        /***
	         * 当前用户使用的模板数据
	         */
	        this.template = this.pageEntity.template;

	        /***
	         * 是否收费会员 true表示收费用户，false表示免费
	         */
	        this.ismmt = this.pageEntity.ismmt;

	        /***
	         * 我的模板列表,模板名称不能重复，修改名称判断用到
	         */
	        this.templateList = [];

	        /***
	         * 我的模板库没有模板的提示语
	         */
	        this.noTemp = '<div class="mbNoneBox"><em></em><p>暂无自定义风格模板！</p></div>';

	        /***
	         * 公共模板切换的用户类型对象
	         * @type {*[]}
	         */
	        this.userType = [{
	            fieldType: 2,
	            fieldValue: '免费用户'
	        }, {
	            fieldType: 1,
	            fieldValue: '收费用户'
	        }, {
	            fieldType: 3,
	            fieldValue: '商营通用户'
	        }];

	        /***
	         * 公共模板切换的颜色对象
	         * @type {*[]}
	         */
	        this.colortype = [{
	            fieldType: 1,
	            className: 'tColor1',
	            fieldValue: '红色'
	        }, {
	            fieldType: 2,
	            className: 'tColor2',
	            fieldValue: '绿色'
	        }, {
	            fieldType: 3,
	            className: 'tColor3',
	            fieldValue: '黄色'
	        }, {
	            fieldType: 4,
	            className: 'tColor4',
	            fieldValue: '蓝色'
	        }, {
	            fieldType: 5,
	            className: 'tColor5',
	            fieldValue: '黑色'
	        }, {
	            fieldType: 6,
	            className: 'tColor6',
	            fieldValue: '灰色'
	        }];

	        this.init();
	    };
	topTemplate.prototype = {
	    init: function () {
	        var that = this,
	            publicTemplate = (function () {
	                return $.ajax({
	                    url: that.interfaceUrl.publicTemplate,
	                    data: {
	                        t: Math.random()
	                    },
	                    dataType: 'json'
	                });
	            })(),
	            myTemplate = (function () {
	                return $.ajax({
	                    url: that.interfaceUrl.myTemplate,
	                    data: {
	                        providerid: that.pageEntity.providerid,
	                        t: Math.random()
	                    },
	                    dataType: 'json'
	                });
	            })();
	        $.when(publicTemplate, myTemplate).done(function (publicTempData, myTempData) {
	            that.getPublicTemplate(publicTempData[0]);
	            that.getMyTemplate(myTempData[0], true);
	            /***
	             * 绑定我的模板事件
	             */
	            that.myTemEvent();
	            /***
	             * 初始化选择模板里面的切换事件
	             */
	            that.templateEvent();
	        }).fail(function () {
	            tool.createDialog("获取模板失败");
	        }).always(function () {
	            /***
	             * 备份模板
	             */
	            that.backupTemplate();
	        });
	    },
	    /***
	     *  当前模板事件，模板类型切换事件，
	     */
	    templateEvent: function () {
	        var that = this;
	        /****
	         * 当前模板，全部模板，我的模板库切换
	         */
	        that.templateWrap.on('click', '.editBoxLeft dd', function () {
	            var index = $(this).index(),
	                editTemplate = that.templateWrap.find('.editBoxRight .editTemplate');
	            if (!$(this).hasClass('ddCur')) {
	                $(this).addClass('ddCur').siblings().removeClass('ddCur');
	                editTemplate.hide();
	                editTemplate.eq(index).show();
	            }
	        });
	        /***
	         * 恢复当前模板
	         */
	        that.templateWrap.on('click', 'button', function () {
	            that.dialog('您确定恢复吗？', function () {
	                $.ajax({
	                    url: that.interfaceUrl.restoreTemplate,
	                    data: {
	                        providerid: that.pageEntity.providerid,
	                        actiontype: 3,
	                        t: Math.random()
	                    },
	                    dataType: 'json',
	                    success: function (data) {
	                        if (data.state == 0) {
	                            tool.createDialog(data.message);
	                        } else {
	                            /**
	                             * 刷新当前页面
	                             */
	                            window.location.reload();
	                        }
	                    }
	                });
	            });
	        });
	        /****
	         *  我的模板和全部模板缩率图hover事件
	         */
	        that.templateWrap.on('mouseover', '.TemplateImg li', function () {
	            if ($(this).find('.mbName').length > 0) {
	                $(this).find('.mbName').show();
	            }
	            $(this).addClass('TemplateCur');
	        }).on('mouseout', '.TemplateImg li', function () {
	            if ($(this).find('.mbName').length > 0) {
	                $(this).find('.mbName').hide();
	            }
	            $(this).removeClass('TemplateCur');
	        });
	    },
	    /***
	     * 备份模板
	     */
	    backupTemplate: function () {
	        var that = this,
	            _menu = $('[data-node-name="navMenu"]'),
	            menuRight = $('.proH2rig', _menu);

	        menuRight.find('[data-node-name="backup"]').click(function () {
	            if (that.templateList.length == 10) {
	                that.dialog('目前已达到模板库保存数量上限，请将不常用的模板进行删除后再进行保存。');
	                return false;
	            }
	            that.modifyTempName(null, function (inputValue, nameDialog) {
	                $.ajax({
	                    url: that.interfaceUrl.backupAndRelease,
	                    data: {
	                        actiontype: 1,
	                        backupname: encodeURIComponent(inputValue),
	                        providerid: that.pageEntity.providerid,
	                        t: Math.random()
	                    },
	                    dataType: 'json',
	                    success: function (data) {
	                        if (data.state == 0) {
	                            tool.createDialog(data.message);
	                        } else {
	                            /**
	                             * 重新获取我的模板库的全部模板，重新渲染我的模板库
	                             */
	                            $.ajax({
	                                url: that.interfaceUrl.myTemplate,
	                                data: {
	                                    providerid: that.pageEntity.providerid,
	                                    t: Math.random()
	                                },
	                                dataType: 'json',
	                                success: function (data) {
	                                    nameDialog.close().remove();
	                                    that.getMyTemplate(data);
	                                }
	                            });
	                        }
	                    },
	                    error: function () {
	                        tool.createDialog('备份商铺模板失败！');
	                    }
	                });
	            });
	        });
	    },
	    /***
	     * 初始化公共模板Html
	     * @param data 公共模板数据
	     */
	    getPublicTemplate: function (data) {
	        var that = this;
	        if (data.state == 0) {
	            tool.createDialog(data.message);
	        } else {
	            var configData = {
	                publicTemData: data.data,
	                getTemplateEntity: function () {
	                    return JSON.stringify(this);
	                }
	            };

	            /***
	             * 获取全部模板的模板字符串
	             */
	            if (that.topHtml.allTempUl) {
	                that.allTemplateWrap.find('.TemplateImg ul').html(mustache.render(that.topHtml.allTempUl, configData));
	                /***
	                 * 将自定义属性放到data缓存上
	                 */
	                $.each(that.allTemplateWrap.find('.TemplateImg ul li'), function (index, val) {
	                    $(val).data('templateEntity', $(val).attr('templateEntity'));
	                });
	                /***
	                 *  绑定全部模板事件
	                 */
	                that.publicTemEvent();
	            }
	        }
	    },
	    /***
	     *  公共模板操作事件
	     */
	    publicTemEvent: function () {
	        var that = this,
	            _li = that.allTemplateWrap.find('.TemplateImg ul li');
	        /***
	         * 模板缩率图点击事件
	         */
	        _li.click(function () {
	            var templateEntity = JSON.parse($(this).data('templateEntity')),
	                isSyt = (that.isCommercialVal == undefined) ? that.pageEntity.issyt : that.isCommercialVal,
	                dialogHtml = [
	                    '<div class="mbAlertBtn"><button type="button" node-name="application">应用</button><button type="button" node-name="close" class="cancelBtn">关闭</button></div>',
	                    '<div class="mbAlertBoxCon">',
	                    '<img src="' + templateEntity.image + '" />',
	                    '</div>'
	                ];
	            /****
	             * 免费用户点击收费模板
	             */
	            if (that.ismmt == false && templateEntity.usertype == 1) {
	                tool.createDialog('此模板是收费用户模板需升级为买卖通收费会员使用。');
	            } else if(!that.isCommercialVal&&templateEntity.usertype == 3){
	             /** 不是商营通用户，点击商营通模板**/
	                that.isCommercialVal = that.pageEntity.issyt;
	                if (that.isCommercialVal != true) {
	                    tool.createDialog('此模板是商营通用户模板需升级为商营通用户会员使用。');

	                }
	            }else {
	                var imageDiaLog = dialog({ //缩率图弹框
	                        content: dialogHtml.join("")
	                    }).showModal(),
	                    _data = { //应用模板的ajax的data数据
	                        templatetype: 1,
	                        templateid: templateEntity.id,
	                        providerid: that.pageEntity.providerid,
	                        actiontype: 1,
	                        templatename: encodeURIComponent(templateEntity.name)
	                    },
	                    imgDialogNode = $(imageDiaLog.node),
	                    application = imgDialogNode.find('[node-name="application"]'), //应用按钮
	                    close = imgDialogNode.find('[node-name="close"]'); //关闭按钮
	                /***
	                 * 应用模板
	                 */
	                application.click(function () {
	                    that.dialog('您确定使用新的网站模板吗？',
	                        function () {
	                            that.templateOperaAjax(_data, function () {
	                                /**
	                                 * 应用成功后关闭弹层
	                                 */
	                                imageDiaLog.close().remove();
	                                /**
	                                 * 刷新当前页面
	                                 */
	                                window.location.reload();
	                            });
	                        },
	                        function () {
	                            imageDiaLog.close().remove();
	                        }
	                    );
	                });
	                /***
	                 * 关闭
	                 */
	                close.click(function () {
	                    imageDiaLog.close().remove();
	                });
	            }
	        });

	        /****
	         * 用户类型切换
	         */
	        that.allTemplateWrap.on('click', '.TemplateColor .hyClass a', function () {
	            that.allTemplateWrap.find('.hyClass a').removeClass('hyCur');
	            $(this).addClass('hyCur');
	            that.findPublicTemplate();
	        });
	        /***
	         * 颜色类型切换
	         */
	        that.allTemplateWrap.on('click', '.TemplateColor li', function () {
	            that.allTemplateWrap.find('.TemplateColor li').removeClass('colorCur');
	            $(this).addClass('colorCur');
	            that.findPublicTemplate();
	        });

	    },
	    /***
	     * 初始化我的模板库Html
	     * @param data 我的模板数据
	     */
	    getMyTemplate: function (data) {
	        var that = this;
	        if (data.state == 0) {
	            tool.createDialog(data.message);
	        } else {
	            if (data.data.length == 0) {
	                that.mytemplateWrap.find('.TemplateImg').html(that.noTemp);
	            } else {
	                /***
	                 * 保存我的模板数据列表到templateList，修改名称判断重复和备份需要用到
	                 */
	                that.templateList = data.data;
	                /***
	                 * 创建我的模块库Dom结构
	                 */
	                var configData = {
	                    myTemData: that.templateList,
	                    getTemplateEntity: function () {
	                        return JSON.stringify(this);
	                    }
	                };
	                /***
	                 * 创建我的模板库模板引擎
	                 * @type {string}
	                 */
	                if (that.topHtml.myTempUl) {

	                    that.mytemplateWrap.find('.TemplateImg').html(mustache.render(that.topHtml.myTempUl, configData));
	                    /***
	                     * 将自定义属性放到data缓存上
	                     */
	                    $.each(that.mytemplateWrap.find('.TemplateImg ul li'), function (index, val) {
	                        $(val).data('templateEntity', $(val).attr('templateEntity'));
	                    });
	                }
	            }
	        }
	    },
	    /***
	     * 我的模板库操作事件
	     */
	    myTemEvent: function () {
	        var that = this;
	        that.mytemplateWrap.on('click', '.TemplateImg ul li', function (event) {
	            var me = $(this),
	                index = me.index(),
	                templateEntity = JSON.parse(me.data('templateEntity')), //当前模板的配置数据
	                _data = { //ajax请求数据
	                    templatetype: 2,
	                    templateid: templateEntity.id,
	                    providerid: that.pageEntity.providerid,
	                    templatename: encodeURIComponent(templateEntity.name)
	                },
	                nodeName = $(event.target).attr('node-name');
	            /****
	             * 我的模板库----删除模板
	             */
	            if (nodeName == "del") {
	                that.dialog(
	                    '确定要删除这个模板吗？',
	                    function () {
	                        var data = $.extend({}, {
	                            actiontype: 2
	                        }, _data);
	                        that.templateOperaAjax(data, function () {
	                            /***
	                             * 删除模板列表里面的模板
	                             */
	                            that.templateList.splice(index, 1);
	                            me.remove();
	                            /***
	                             * 如果没有一个模板，显示无模板的文字提示！
	                             */
	                            if (that.templateList.length == 0) {
	                                that.mytemplateWrap.find('.TemplateImg').html(that.noTemp);
	                            }
	                        });
	                    }
	                );
	                /****
	                 * 我的模板库----应用模板
	                 */
	            } else if (nodeName == "application") {
	                that.dialog(
	                    '您确定要应用这个模板么？',
	                    function () {
	                        var data = $.extend({}, {
	                            actiontype: 1
	                        }, _data);
	                        that.templateOperaAjax(data, function () {
	                            /***
	                             * 应用模板成功后，刷新页面
	                             */
	                            window.location.reload();
	                        });
	                    }
	                );
	                /***
	                 *   命名
	                 */
	            } else if (nodeName == "named") {
	                /***
	                 * 调用创建模板命名弹框方法；
	                 */
	                that.modifyTempName(
	                    templateEntity.name, //模板名称
	                    /***
	                     * 修改模板名称的回调函数
	                     * @param inputValue 修改后的模板名称
	                     * @param nameDialog 当前修改模板的弹框对象
	                     */
	                    function (inputValue, nameDialog) {
	                        var data = $.extend({}, _data, {
	                            actiontype: 3,
	                            templatename: encodeURIComponent(inputValue)
	                        });
	                        that.templateOperaAjax(data,
	                            function () {
	                                /***
	                                 * 更新模板列表里面的模板名称
	                                 */
	                                that.templateList[index].name = inputValue;
	                                /***
	                                 * 重写缓存模板；
	                                 */
	                                templateEntity.name = inputValue;
	                                me.data('templateEntity', JSON.stringify(templateEntity));
	                                /**
	                                 * 更改页面上的模板名称
	                                 */
	                                me.find('.mbName span').html(inputValue);
	                                nameDialog.close().remove();
	                            });
	                    });
	            }
	        });
	    },
	    /****
	     *  模板应用、 删除、 更名调用方法
	     * @param data  ajax的data参数
	     * @param callback 成功后的回调
	     */
	    templateOperaAjax: function (data, callback) {
	        var that = this;
	        /**
	         * 添加一个随机数，防止浏览器走缓存
	         */
	        data.t = Math.random();
	        $.ajax({
	            url: that.interfaceUrl.tempUpdate,
	            data: data,
	            dataType: 'json',
	            success: function (data) {
	                if (data.state == 0) {
	                    tool.createDialog(data.message);
	                } else {
	                    callback && callback();
	                }
	            },
	            error: function () {
	                tool.createDialog('模板应用、 删除、 更名接口失败！');
	            }
	        });
	    },
	    /***
	     * 我的模板修改模板名称
	     * @param name  模板的默认名称
	     * @para callback 命名成功后的回调函数
	     */
	    modifyTempName: function (name, callback) {
	        var that = this;
	        /***
	         * 修改模板名称Html
	         */
	        var views = mustache.render(that.topHtml.modifyTemp, {
	            templateName: name
	        });
	        /***
	         * 创建模板命名弹框
	         */
	        var nameDialog = dialog({
	            title: '自定义模板命名',
	            content: views
	        }).showModal();

	        var nameDialogWrap = $(nameDialog.node),
	            _input = nameDialogWrap.find('.customInput'),
	            _prompt = nameDialogWrap.find('.prompt'),
	            _save = nameDialogWrap.find('.Save'),
	            _cancel = nameDialogWrap.find('.Cancel');
	        /***
	         * 输入框获得焦点
	         */
	        _input.focus();
	        /***
	         * 修改模板弹框保存
	         */
	        _save.click(function () {
	            var inputValue = $.trim(_input.val()),
	                flag = true;
	            if (inputValue.length == 0) {
	                flag = false;
	                _prompt.html('命名不能为空！').show();
	            }
	            $.each(that.templateList, function (index, val) {
	                if (val.name == inputValue) {
	                    flag = false;
	                    _prompt.html('自定义名称不可重复').show();
	                }
	            });
	            if (util.getByteLength(inputValue) > 12) {
	                flag = false;
	                _prompt.html('命名不超过6个汉字').show();
	            }
	            if (flag) {
	                _prompt.html('').hide();
	                if (callback) {
	                    callback(inputValue, nameDialog);
	                }
	            }
	        });
	        /***
	         *修改模板弹框取消
	         */
	        _cancel.click(function () {
	            nameDialog.close().remove();
	        });
	    },
	    /***
	     * 检索公共模板的方法；
	     */
	    findPublicTemplate: function () {
	        var that = this,
	            userType,
	            colorType,
	            TemplateColor = that.allTemplateWrap.find('.TemplateColor'),
	            userTypeList = TemplateColor.find('.hyClass a'), //用户类型
	            colorTypeList = TemplateColor.find('ul li'), //颜色类型
	            _li = that.allTemplateWrap.find('.TemplateImg ul li'); //所有模板列表
	        /**
	         *  获得用户类型查询条件
	         */
	        $.each(userTypeList, function (index, val) {
	            if ($(this).hasClass('hyCur')) {
	                userType = that.userType[index];
	                return;
	            }
	        });
	        /***
	         * 获得颜色查询条件
	         */
	        $.each(colorTypeList, function (index, val) {
	            if ($(this).hasClass('colorCur')) {
	                colorType = that.colortype[index];
	                return;
	            }
	        });

	        /***
	         * 检索满足条件的模板
	         */
	        _li.each(function () {
	            var liEntity = JSON.parse($(this).data('templateEntity'));
	            if (userType && liEntity.usertype != userType.fieldType) {
	                $(this).hide();
	            } else if (colorType && liEntity.colortype != colorType.fieldType) {
	                $(this).hide();
	            } else {
	                $(this).show();
	            }
	        });

	    },
	    /***
	     * 创建弹框
	     * @param info 提示信息
	     * @param success 成功的回调
	     * @param error  失败的回调
	     */
	    dialog: function (info, success, error) {
	        dialog({
	            title: '提示',
	            content: info,
	            okValue: '确定',
	            ok: function () {
	                this.close().remove();
	                success && success();
	            },
	            cancelValue: '取消',
	            cancel: function () {
	                this.close().remove();
	                error && error();
	            }
	        }).showModal();
	    }

	};
	module.exports = topTemplate;

/***/ })
/******/ ]);