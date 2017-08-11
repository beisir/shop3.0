/**
 * [module_company_intro 公司介绍模块渲染逻辑]
 * @return {[type]} [description]
 */
function module_company_intro(moduleEntity) {
	var _this = this;

	/**
	 * [初始化模块元素引用]
	 */
	$.extend(true, _this, {
		/**
		 * [imgWrap 模块内图片包裹元素]
		 * @type {[type]}
		 */
		imgWrap: moduleEntity.htmlEntity.find('.conpanyImg ul'),

		/**
		 * [moduleEntity 模块业务对象]
		 * @type {Object}
		 */
		moduleEntity: null
	}, {
		moduleEntity: moduleEntity
	});

	/**
	 * [imgLength 获取图片数量]
	 * @type {Number}
	 */
	_this.imgLength = _this.imgWrap.find('img').length;

	/**
	 * [单张图片时不需要进行前端渲染]
	 */
	if (_this.imgLength <= 1) {
		return;
	}

	/**
	 * 初始化模块业务逻辑
	 */
	module_company_intro.prototype.init.call(_this);
}

/**
 * [init 渲染初始化]
 * @return {[type]} [description]
 */
module_company_intro.prototype.init = function() {
	var _this = this;

	/**
	 * [加载完组件后再开始前端渲染]
	 */
	$.when.apply(null, _this.getComponentDeferred()).done(function() {

		/**
		 * 执行指定区域的模块渲染逻辑
		 */
		_this['render_' + _this.moduleEntity.regionEntity.identifier] && _this['render_' + _this.moduleEntity.regionEntity.identifier]();
	});
};

/**
 * [render_region_percent_25 渲染25%区域中的当前模块]
 * @return {[type]} [description]
 */
module_company_intro.prototype.render_region_percent_25 = function() {
	var _this = this;

	/**
	 * 开始图片轮播
	 */
	_this.imgWrap.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		dots: true,
		pauseOnHover: true
	});
};

/**
 * [renderregion_percent_75 渲染75%区域中的当前模块]
 * @return {[type]} [description]
 */
module_company_intro.prototype.render_region_percent_75 = function() {
	var _this = this,

		/**
		 * [imgContainer 获取外层包裹元素]
		 * @type {Object}
		 */
		imgContainer = _this.imgWrap.parent(),

		/**
		 * [imgContainerWidth 获取外层包裹元素宽度]
		 * @type {Number}
		 */
		imgContainerWidth = imgContainer.width(),

		/**
		 * [imgItemWidth 获取第一张图所在元素宽度]
		 * @type {Number}
		 */
		imgItemWidth = _this.imgWrap.children().first().outerWidth(),

		/**
		 * [maxItemCount 一次最多可显示的图片数量，指定宽度内能在一行内显示的最多相同宽度图片数量]
		 * @type {Number}
		 */
		maxItemCount = 0,

		/**
		 * [maxImgWrapWidth 包裹元素最大宽度]
		 * @type {Number}
		 */
		maxImgWrapWidth = 0;

	/**
	 * [初始化 一次最多可显示的图片数量 包裹元素最大宽度]
	 */
	while ((maxItemCount < _this.imgLength) && ((maxImgWrapWidth + imgItemWidth) <= imgContainerWidth)) {
		maxImgWrapWidth += imgItemWidth;
		maxItemCount++;
	}

	/**
	 * 设置外层包裹元素宽度
	 */
	imgContainer.width(maxImgWrapWidth);

	/**
	 * [当图片数量少于一次最多可显示的图片数量，需要将已有图片追加一次，以增加容器宽度实现滚动]
	 */
	if (_this.imgLength <= maxItemCount) {
		_this.imgWrap.children().clone().appendTo(_this.imgWrap);
	}

	/**
	 * [开始图片轮播]
	 */
	_this.imgWrap.slick({
		slidesToShow: maxItemCount,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		dots: false,
		pauseOnHover: true
	});
};

/**
 * [getComponentDeferred 获取组件加载延迟对象]
 * @return {Array} [延迟对象数组]
 */
module_company_intro.prototype.getComponentDeferred = function() {
	var _this = this;

	/**
	 * [slickDeferred 定义 slick 组件加载延迟对象]
	 * @type {Object}
	 */
	var slickDeferred = $.Deferred();
	require.ensure([], function(require) {
		require('slick');
		slickDeferred.resolve();
	}, 'components/slick');

	return [slickDeferred];
};

module.exports = module_company_intro;