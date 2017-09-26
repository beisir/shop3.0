webpackJsonp([22],{

/***/ 108:
/***/ (function(module, exports) {

	/**
	 * [fullScreenSlider 背景图轮播]
	 * @param  {Object} options [配置]
	 */
	function fullScreenSlider(options) {
		var _this = this;

		/**
		 * 扩展配置
		 */
		$.extend(_this, {

			/**
			 * [index 当前索引]
			 * @type {Number}
			 */
			index: 0,

			/**
			 * [wrap 包裹元素]
			 * @type {Object}
			 */
			wrap: null,

			/**
			 * [pause 轮播间隔事件]
			 * @type {Number}
			 */
			pause: 3000,

			/**
			 * [auto 是否自动轮播]
			 * @type {Boolean}
			 */
			auto: true,

			/**
			 * [timer 定时器]
			 * @type {Object}
			 */
			timer: null,

			/**
			 * [animationSpeed 动画速度]
			 * @type {Number}
			 */
			animationSpeed: 1000
		}, options);

		/**
		 * 开始初始化
		 */
		fullScreenSlider.prototype.init.call(this);
	};

	/**
	 * [init 初始化]
	 */
	fullScreenSlider.prototype.init = function() {
		var _this = this;

		/**
		 * [height 包裹元素高度]
		 * @type {Number}
		 */
		_this.height = _this.wrap.height(),

			/**
			 * [slidersWrap 轮播图片包裹元素]
			 * @type {Object}
			 */
			_this.slidersWrap = _this.wrap.children('ul'),

			/**
			 * [sliders 轮播图片列表]
			 * @type {Object}
			 */
			_this.sliders = _this.slidersWrap.children('li');

		/**
		 * 设置ul、li样式
		 */
		_this.slidersWrap.css({
			height: (_this.sliders.length * _this.height) + 'px',
			position: 'absolute',
			width: '100%'
		});
		_this.sliders.css({
			height: _this.height + 'px'
		});

		/**
		 * [设置定时器]
		 */
		_this.auto && (_this.timer = setInterval(function() {
			_this.next();
		}, _this.pause));
	};

	/**
	 * [animate 开始动画]
	 */
	fullScreenSlider.prototype.animate = function() {
		var _this = this;

		/**
		 * [开始动画]
		 */
		_this.slidersWrap.stop().animate({
				top: -(_this.height * _this.index)
			},
			_this.animationSpeed);
	};

	/**
	 * [next 下一个]
	 */
	fullScreenSlider.prototype.next = function() {
		var _this = this;
		_this.index++;
		_this.index = (_this.index === _this.sliders.length) ? 0 : _this.index;
		_this.animate();
	};

	/**
	 * [prev 上一个]
	 */
	fullScreenSlider.prototype.prev = function() {
		var _this = this;
		_this.index--;
		_this.index = (_this.index < 0) ? (_this.sliders.length - 1) : _this.index;
		_this.animate();
	};

	/**
	 * [goto]
	 */
	fullScreenSlider.prototype["goto"] = function(index) {
		var _this = this;
		_this.index = index;
		_this.animate();
	};

	/**
	 * [stop 停止自动轮播]
	 */
	fullScreenSlider.prototype.stop = function() {
		var _this = this;

		/**
		 * 清楚定时器
		 */
		window.clearInterval(_this.timer);
	};

	/**
	 * [stop 开始自动轮播]
	 */
	fullScreenSlider.prototype.start = function() {
		var _this = this;

		/**
		 * [初始化定时器]
		 */
		_this.auto && (_this.timer = setInterval(function() {
			_this.next();
		}, _this.pause));
	};

	/**
	 * [导出模块对象]
	 */
	module.exports = fullScreenSlider;

/***/ })

});