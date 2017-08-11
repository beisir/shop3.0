/**
 * 企业档案详情页
 * @type {page}
 */
var page = require('./page');

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