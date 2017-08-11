var page=require('./page');

/**
 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
 * @type {Object}
 */
// require('./template/page.data')('column');

/**
 * 实例化页面业务对象
 */
var pageEntity=new page();

/**
 * [pageEntity 将页面业务对象暴露到全局]
 * @type {Object}
 */
window.pageEntity=pageEntity;