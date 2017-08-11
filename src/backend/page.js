/**
 * 导入 json2 模块
 * 导入 es5-shim 模块
 * 导入 jQuery 模块
 * 导入 dragula 模块
 * 导入 dialog 模块
 * 导入 jquery.placeholder 模块
 * 导入 jquery.lazyload 模块
 */
require('json2');
require('es5-shim/es5-shim');
// require('es5-shim');
// require('es5-shim/es5-sham');
require('jquery');
require('dragula');
require('dialog');
require('jquery.placeholder');
require('jquery.lazyload');

/**
 * 加载 artDialog 组件样式
 * 加载 dragula 组件样式
 * 加载 colorpicker 组件样式
 * 加载 webuploader 组件样式
 * 加载 jcrop 组件样式
 * 加载自定义样式
 */
require('../../src/components/artDialog/css/ui-dialog.css');
require('../../node_modules/dragula/dist/dragula.css');
require('../../node_modules/spectrum-colorpicker/spectrum.css');
require('../../src/components/webuploader/webuploader.css');
require('../../src/components/jquery.jcrop/jquery.Jcrop.css');
require('../../src/backend/css/main.css');

/**
 * [page_region 导入区域业务逻辑模块]
 * @type {Object}
 */
var page_region = require('./page.region');

/**
 * 引入顶部操作区域模块
 *
 * [跟产品确认后，认为顶部操作区是用户第一时间需要操作的区域，所以不能异步加载该模块]
 */
var topOperationArea = require('./toparea/top.entrance');

/***
 * 初始化placeholder();
 */
$(function() {
	$("input[type='text'],textarea").placeholder();
});

/**
 * 导入低版本浏览器提示模块
 */
require.ensure([], function(require) {
	var IELowVersionPrompt = require('../common/hc.IELowVersionPrompt');
	IELowVersionPrompt();
}, 'common/hc.IELowVersionPrompt');

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
		region_module_mapping = require('./page.region.module.mapping'),

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