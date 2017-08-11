var page = require('./page'),

	/**
	 * [guider 导入引导模块]
	 * @type {Object}
	 */
	guider = require('./common/guider.js');

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

/**
 * [guiderEntity 初始化引导对象实例]
 * @type {guider}
 */
var guiderEntity = new guider(pageEntity);