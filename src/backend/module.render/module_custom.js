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
		_contentWrap = _this.moduleEntity.htmlEntity.find('.leftBoxCon');

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
				windowtype: _this.moduleEntity.dataEntity.windowtype
			}
		})
		.done(function(json) {
			if (!!Number(json.state)) {

				if ($.trim(json.data).length === 0) {
					_contentWrap.html('<div class="nInfoPro2">暂无相关信息！<a href="javascript:;">请添加</a></div>');
				} else {
					try {
						_contentWrap.html(decodeURIComponent(json.data) || '');
					} catch (err) {}

				}

			}
		});
};

module.exports = module_custom;