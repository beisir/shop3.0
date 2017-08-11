var path = require('path');
/***
 * 引入商铺前台模块默认配置数据
 * @type {setting|exports|module.exports}
 */
var moduleDefaultSetting = require('./page.module.defaultsetting');
/**
 * [page_module 模块业务对象]
 * @param  {[type]} htmlEntity   [模块DOM元素对象]
 * @param  {[type]} regionEntity [模块所在区域业务对象]
 * @return {[type]}              [description]
 */
function page_module(htmlEntity, regionEntity) {
	var _this = this;

	/**
	 * [若html元素对象实例为空，则不进行任何操作]
	 */
	if (!htmlEntity) {
		return;
	}

	/**
	 * [扩展当前实例属性]
	 */
	$.extend(true, _this, {

		/**
		 * [identifier 模块标识符]
		 * @type {String}
		 */
		identifier: '',

		/**
		 * [htmlEntity 模块html元素对象实例]
		 * @type {Object}
		 */
		htmlEntity: null,

		/**
		 * [dataEntity 模块数据对象]
		 * @type {Object}
		 */
		dataEntity: null,

		/**
		 * [regionEntity 模块所在区域业务对象]
		 * @type {Object}
		 */
		regionEntity: null
	}, {
		htmlEntity: htmlEntity,
		regionEntity: regionEntity
	});

	/**
	 * 初始化业务对象
	 */
	page_module.prototype.init.call(_this);
}

/**
 * [init 初始化业务对象]
 * @return {[type]} [description]
 */
page_module.prototype.init = function() {
	var _this = this,

		/**
		 * [getElementBoolAttrValue 获取元素布尔类型的属性值]
		 * @param  {Object} element  [DOM元素]
		 * @param  {String} attrName [属性名]
		 * @return {Boolean}         [布尔类型属性值]
		 */
		getElementBoolAttrValue = function(element, attrName) {
			return element.attr(attrName) && ((element.attr(attrName) === 'true') || ($.trim(element.attr(attrName)).length === 0));
		};

	/**
	 * 获取自定义属性 data-module 的内容并转换为JSON数据对象
	 */
	try {
		_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-module') || '{}');
	} catch (e) {
		_this.dataEntity={};
	}

	/**
	 * [identifier 初始化区域标识符属性]
	 * @type {String}
	 */
	_this.identifier = _this.dataEntity.modulemark || '';

	/**
	 * 覆盖模块默认配置项，以避免模块自定义属性中缺少必要配置项造成错误
	 */
	_this.dataEntity.data = $.extend(true, {}, moduleDefaultSetting[_this.identifier], _this.dataEntity.data);

	/**
	 * 获取当前类型模块的渲染逻辑模块
	 */
	var renderModule;
	try {
		renderModule = require('./module/' + _this.identifier);
	} catch (ex) {}

	/**
	 * [存在渲染逻辑模块则执行，避免创建过多渲染逻辑模块实例，因为大多数模块不需要就行前台渲染]
	 */
	renderModule && (_this.renderEntity = new renderModule(_this));

};

module.exports = page_module;