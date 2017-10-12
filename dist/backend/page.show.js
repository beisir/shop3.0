webpackJsonp([19],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var page = __webpack_require__(1);

	/**
	 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
	 * @type {Object}
	 */
	// require('./template/page.data')('column');

	/**
	 * 实例化页面业务对象
	 */
	var pageEntity = new page();

	/**
	 * [pageEntity 将页面业务对象暴露到全局]
	 * @type {Object}
	 */
	window.pageEntity = pageEntity;

	/**
	 * [resizeEvalIframe 定义全局重置iframe高度的方法，以重置 卖家累计信用 框架页高度]
	 */
	window.resizeEvalIframe = function() {
		document.domain = "hc360.com";
		var iframe = document.getElementById("evalFrame");
		try {
			var minHeight = "480";
			jQuery('#evalFrame').height(minHeight);
			var h = "0";
			if (iframe.contentDocument && iframe.contentDocument.body.offsetHeight) { // ff,chrome等
				h = parseInt(iframe.contentDocument.body.offsetHeight);
			} else if (iframe.Document && iframe.Document.body.scrollHeight) { // IE
				h = parseInt(iframe.Document.body.scrollHeight);
			} else {
				var bHeight = parseInt(iframe.contentWindow.document.body.scrollHeight);
				var dHeight = parseInt(iframe.contentWindow.document.documentElement.scrollHeight);
				h = Math.max(bHeight, dHeight);
			}
			if (h < minHeight) {
				h = minHeight;
			}
			jQuery('#evalFrame').height(h);

			if (jQuery(window).scrollTop() > 450) {
				jQuery(window).scrollTop(180);
			}
		} catch (ex) {}
	};

/***/ })
]);