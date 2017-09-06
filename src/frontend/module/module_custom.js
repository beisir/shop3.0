/**
 * [module_custom 自定义模块前端渲染逻辑]
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
    moduleEntity: moduleEntity,

    /**
     * [contentWrap 内容包裹元素]
     * @type {Object}
     */
    contentWrap: moduleEntity.identifier == 'module_custom_video' ? moduleEntity.htmlEntity.find('.videoBox') : moduleEntity.htmlEntity.find('.leftBoxCon')
  });

  /**
   * 初始化模块业务逻辑
   */
  module_custom.prototype.init.call(_this);
}

/**
 * [init 初始化]
 */
module_custom.prototype.init = function() {
  var _this = this;

  /**
   * [url 获取自定义内容数据]
   * @type {String}
   */
  $.ajax({
    url: '//detail.b2b.hc360.com/detail/turbine/action/GetCustomContentAction/eventsubmit_doGetcustomcontent/doGetcustomcontent',
    type: 'get',
    dataType: 'jsonp',
    data: {
      providerid: window.scyps.sc.providerId,
      area: _this.moduleEntity.regionEntity.identifier,
      moduleid: _this.moduleEntity.dataEntity.moduleid,
      windowtype: _this.moduleEntity.dataEntity.windowtype,
      modulemark:_this.moduleEntity.identifier
    }
  })
    .done(function(json) {
      if ($.trim(json.data).length == 0) {
        _this.contentWrap.html('<div class="nInfoPro2">暂无相关信息！</div>');
        _this.contentWrap.siblings('p.videoPrompt').hide();
      } else {
        _this.contentWrap.html(json.data || '');
        _this.contentWrap.siblings('p.videoPrompt').show();
      }
    });
};

module.exports = module_custom;
