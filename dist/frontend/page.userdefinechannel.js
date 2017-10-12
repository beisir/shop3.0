webpackJsonp([45],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var page = __webpack_require__(117);

	/**
	 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
	 * @type {Object}
	 */
	// require('./template/page.data')();

	/**
	 * 实例化页面业务对象
	 */
	var pageEntity = new page();

	/**
	 * [pageEntity 将页面业务对象暴露到全局]
	 * @type {Object}
	 */
	window.pageEntity = pageEntity;

/***/ })
]);