var page = require('./page');

/**
 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
 * @type {Object}
 */
// require('./template/page.data')();

/**
 * 实例化页面业务对象
 */
var pageEntity = new page();

$(function () {
  /**
   * [显示企业档案模块的 商盈通 图标逻辑]
   */
  $.ajax({
    type: "get",
    url: "//order.b2b.hc360.com/brandneworder/checkbuslinks.html",
    data: {
      providerid: window.providerId
    },
    timeout: 3000,
    dataType: "jsonp",
    jsonp: "jsoncallback",
    success: function(result) {
      if (result) {
        if ($("#sytico").length > 0) {
          $("#sytico").show();
        } else if ($("#service-message").length > 0) {
          $("#service-message").show();
        }
      }
    },
    error: function(e) {}
  });
});

/**
 * [pageEntity 将页面业务对象暴露到全局]
 * @type {Object}
 */
window.pageEntity = pageEntity;
