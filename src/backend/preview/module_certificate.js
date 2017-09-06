/**
 * 导入 json2 模块
 * 导入 es5-shim 模块
 * 导入 jQuery 模块
 * 导入 mustache 模板引擎
 */
require('json2');
require('es5-shim/es5-shim');
require('jquery');
require('mustache');

/**
 * [preview 荣誉证书预览业务对象]
 */
function preview(options) {
	var _this = this;

	/**
	 * [moduleEntity 扩展本地设置]
	 * @type {Object}
	 */
	$.extend(true, _this, {
		wrap: null,
		template: '',
		styleElement: null
	}, options);

	/**
	 * 初始化荣誉证书预览业务对象
	 */
	preview.prototype.init.call(_this);
}

/**
 * [init 初始化荣誉证书预览业务对象]
 */
preview.prototype.init = function() {
	var _this = this;

	/**
	 * [params 获取查询参数]
	 * @type {Object}
	 */
	_this.params = _this.deserializeEntity();

	/**
	 * 设置样式文件
	 */
	_this.styleElement.length && _this.styleElement.attr('href', (_this.params.style || '//style.org.hc360.com/css/detail/mysite/siteconfig/newPro/proStyle.css'));

	/**
	 * [templateElement 获取模板元素及其HTML]
	 * @type {Object}
	 */
	var templateElement = $('#template_' + (_this.params.entity.regionmark || ''));
	if (templateElement.length) {
		_this.template = templateElement.html();
	}

	/**
	 * [entity 填充默认数据]
	 * @type {Object}
	 */
	_this.params = $.extend(true, {}, {
		entity: {
			data: {
				showTitleAndBorder: 0,
				title: '',
				type: 1
			}
		}
	}, (_this.params));

	/**
	 * 渲染该模块
	 */
	_this.wrap.length && _this.wrap.html(mustache.render(_this.template, {

		/**
		 * [data 模块数据对象]
		 * @type {Object}
		 */
		data: _this.params.data || [],

		/**
		 * [layout 布局]
		 * @type {Boolean}
		 */
		layout: (Number(_this.params.layout) || 1) == 1,

		/**
		 * [showTitle 是否显示标题]
		 * @type {Boolean}
		 */
		showTitleAndBorder: Boolean(parseInt(_this.params.entity.data.showTitleAndBorder)),

		/**
		 * [title 标题]
		 * @type {String}
		 */
		title: _this.params.entity.data.title,

		/**
		 * [type 效果枚举值]
		 * @type {Number}
		 */
		type: ('00' + parseInt(_this.params.entity.data.type)).slice(-2)
	}));


};

/**
 * [deserializeEntity 解析模块业务逻辑对象]
 * @return {Object} [模块业务逻辑对象]
 */
preview.prototype.deserializeEntity = function() {
	var _this = this,

		/**
		 * [_util 导入 util 工具集模块]
		 * @type {Object}
		 */
		_util = require('../common/util'),

		/**
		 * [_params 解析参数]
		 * @type {Object}
		 */
		_params = {};

	/**
	 * [_params 获取查询参数]
	 * @type {Object}
	 */
	try {
		_params = JSON.parse(decodeURIComponent(_util.getQueryString('params')));
	} catch (ex) {}

	return _params;
};

/**
 * [previewEntity 创建荣誉证书预览业务对象实例]
 * @type {preview}
 */
var previewEntity = new preview({

	/**
	 * [wrap 包裹元素]
	 * @type {Object}
	 */
	wrap: $('[data-wrap]'),

	/**
	 * [styleElement 样式元素]
	 * @type {Object}
	 */
	styleElement: $('#lnkThemeStyle')
});