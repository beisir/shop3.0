var page_module = require('./page.module');

/**
 * [page_region 区域业务对象]
 * @param  {[type]} htmlEntity [区域DOM元素对象]
 * @return {[type]} [description]
 */
function page_region(htmlEntity, pageEntity) {
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
		 * [identifier 区域标识符]
		 * @type {String}
		 */
		identifier: '',

		/**
		 * [modulelist 区域下模块对象实例列表]
		 * @type {Array}
		 */
		moduleList: [],

		/**
		 * [htmlEntity 区域html元素对象实例]
		 * @type {Object}
		 */
		htmlEntity: null,

		/**
		 * [dataEntity 区域数据对象]
		 * @type {Object}
		 */
		dataEntity: null,

		/**
		 * [pageEntity 页面业务逻辑对象]
		 * @type {[type]}
		 */
		pageEntity: null
	}, {
		htmlEntity: htmlEntity,
		pageEntity: pageEntity
	});

	/**
	 * 初始化业务对象
	 */
	page_region.prototype.init.call(_this);
}

/**
 * [init 初始化业务对象]
 * @return {[type]} [description]
 */
page_region.prototype.init = function() {
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
	 * 获取自定义属性 data-region 的内容并转换为JSON数据对象 
	 */
	try {
		_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-region') || '{}');
	} catch (e) {
		_this.dataEntity = {};
	}

	/**
	 * [identifier 初始化区域标识符属性]
	 * @type {String}
	 */
	_this.identifier = _this.dataEntity.regionmark || '';

	/**
	 * 初始化区域下模块对象实例列表
	 */
	_this.htmlEntity.find('[data-module]').each(function(index, element) {

		/**
		 * 实例化模块业务对象并添加到区域下模块对象实例列表
		 */
		_this.moduleList.push(new page_module($(element), _this));
	});
};

module.exports = page_region;