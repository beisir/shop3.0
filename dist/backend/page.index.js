webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var page = __webpack_require__(1),

		/**
		 * [guider 导入引导模块]
		 * @type {Object}
		 */
		guider = __webpack_require__(97);

	/**
	 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
	 * @type {Object}
	 */
	// require('./template/page.data')();

	/**
	 * 实例化页面业务对象
	 */
	var pageEntity = new page();

	/**
	 * [pageEntity 将页面业务对象暴露到全局]
	 * @type {Object}
	 */
	window.pageEntity = pageEntity;

	/**
	 * [guiderEntity 初始化引导对象实例]
	 * @type {guider}
	 */
	var guiderEntity = new guider(pageEntity);

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [guider 引导业务逻辑对象]
	 * @param  {Object} pageEntity [页面业务逻辑对象实例]
	 */
	function guider(pageEntity) {
		var _this = this,

			/**
			 * [region_module_mapping 获取区域模块映射关系业务对象模块]
			 * @type {Object}
			 */
			region_module_mapping = __webpack_require__(50),

			/**
			 * [region_module_mapping_entity 初始化区域模块映射关系业务对象实例]
			 * @type {region_module_mapping_entity}
			 */
			region_module_mapping_entity = new region_module_mapping();

		/**
		 * [region_module_mapping_data 获取各区域下各模块的配置数据]
		 * @type {Object}
		 */
		_this.region_module_mapping_data = region_module_mapping_entity.analyticPageModuleData(pageEntity);

		/**
		 * [pageEntity 页面业务逻辑对象实例]
		 * @type {Object}
		 */
		_this.pageEntity = pageEntity;

		/**
		 * 初始化引导业务逻辑对象
		 */
		guider.prototype.init.call(_this);
	}

	/**
	 * [init 初始化引导业务逻辑对象]
	 */
	guider.prototype.init = function() {
		var _this = this,

			/**
			 * [_show 是否显示引导]
			 * @type {Number}
			 */
			_show = 0,

			/**
			 * [_htmlArray 模板HTML数组]
			 * @type {Array}
			 */
			_htmlArray = [
				'<div class="guideBox">',
				'    <div class="step1" data-index="1" data-position="action-guider-start">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'    </div>',
				'    <div class="step2" data-index="2" data-position="action-select-layout">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'    </div>',
				'    <div class="step3" data-index="3" data-position="action-select-template">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step4" data-index="4" data-position="action-select-navigation">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step5" data-index="5" data-position="module_setting">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step6" data-index="6" data-position="module_ads">',
				'		<a href="javascript:;" class="sClose"></a>',
				'		<a href="javascript:;" class="sBtn"></a>',
				'		<a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step7" data-index="7" data-position="region_top_banner">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step8" data-index="8" data-position="action-select-theme">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step9" data-index="9" data-position="action-preview-backup-recovery">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'    <div class="step10" data-index="10" data-position="action-release">',
				'        <a href="javascript:;" class="sClose"></a>',
				'        <a href="javascript:;" class="sBtn"></a>',
				'        <a href="javascript:;" class="ReturnBtn"></a>',
				'    </div>',
				'</div>'
			];

		/**
		 * 获取引导是否已向用户展示过
		 */
		try {
			_show = parseInt(HC.util.cookie.get('shop3.0.guider')) || 0;
		} catch (ex) {}

		/**
		 * [已显示过引导，直接返回]
		 */
		if (_show) {
			return;
		}

		/**
		 * [dialogEntity 引导弹出框对象]
		 * @type {String}
		 */
		_this.dialogEntity = dialog({
			innerHTML: _htmlArray.join(''),
			autofocus: false
		}).showModal();

		/**
		 * 清除弹出框默认位置样式
		 */
		_this.dialogEntity.htmlEntity = $(_this.dialogEntity.node).css({
			left: 'auto',
			top: 'auto',
			position: 'static'
		});

		/**
		 * [moduleEntitySet 定义用于定位引导位置的模块对象实例集]
		 * @type {Object}
		 */
		var moduleEntitySet = {

				/**
				 * 可添加 扩展广告 模块的区域
				 */
				'region_top_banner': null,

				/**
				 * 已添加的 宽屏广告 模块
				 */
				'module_ads': null,

				/**
				 * 75% 区域中可移动、可设置、可删除的非第一个模块（因为第一个模块不显示 下移 按钮）
				 */
				'module_setting': null
			},

			/**
			 * [moduleEntitySetReady 用于定位引导位置的模块对象实例集是否已全部初始化完毕]
			 * @return {Boolean} [description]
			 */
			moduleEntitySetReady = function() {
				for (var tempKey in moduleEntitySet) {
					if (!moduleEntitySet[tempKey]) {
						return false;
					}
				}
				return true;
			};

		/**
		 * [初始化用于定位引导位置的模块对象实例集]
		 */
		$.each(_this.pageEntity.regionList, function(regionIndex, regionEntity) {

			/**
			 * 判断是否继续查找用于定位引导位置的模块
			 */
			if (moduleEntitySetReady()) {
				return false;
			}

			/**
			 * [查找可添加 扩展广告 模块的区域]
			 */
			$.each(_this.region_module_mapping_data[regionEntity.identifier], function(moduleIndex, moduleEntity) {

				/**
				 * [存在一个扩展广告模块可添加到当前区域]
				 */
				if ((!moduleEntitySet.region_top_banner) && (moduleEntity.identifier === 'module_banner_ads') && (moduleEntity.enabled)) {
					moduleEntitySet.region_top_banner = regionEntity;
					return false;
				}
			});

			/**
			 * 判断是否继续查找用于定位引导位置的模块
			 */
			if (moduleEntitySetReady()) {
				return false;
			}

			/**
			 * [查找模块]
			 */
			$.each(regionEntity.moduleList, function(moduleIndex, moduleEntity) {

				/**
				 * [查找 宽屏广告 模块
				 */
				if ((!moduleEntitySet.module_ads) && (moduleEntity.identifier === 'module_ads')) {
					moduleEntitySet.module_ads = moduleEntity;
				}

				/**
				 * [75% 区域中可移动、可设置、可删除的非第一个模块（因为第一个模块不显示 下移 按钮）]
				 */
				if ((regionEntity.identifier === 'region_percent_75') && (moduleEntity.dragable) && (moduleEntity.configurable) && (moduleEntity.deletable) && (moduleIndex !== 0)) {

					/**
					 * 模块设置向导对应模块对象实例
					 */
					(!moduleEntitySet.module_setting) && (moduleEntitySet.module_setting = moduleEntity);
				}

				/**
				 * 判断是否继续查找用于定位引导位置的模块
				 */
				if (moduleEntitySetReady()) {
					return false;
				}
			});

			/**
			 * 判断是否继续查找用于定位引导位置的模块
			 */
			if (moduleEntitySetReady()) {
				return false;
			}
		});

		/**
		 * [htmlEntityList 初始化DOM元素对象集]
		 * @type {Object}
		 */
		_this.htmlEntityList = _this.dialogEntity.htmlEntity.find('.guideBox').children().map(function(index, element) {
				var _element = $(element),
					_element_index = parseInt(_element.attr('data-index')) || 0,
					_element_position = _element.attr('data-position') || '';

				/**
				 * [若用于定位引导位置的模块对象实例集中存在当前步骤对应的模块，且未找到则跳过当前步骤]
				 */
				if (!((_element_position in moduleEntitySet) && (!moduleEntitySet[_element_position]))) {
					return _element.data({
						'index': parseInt(_element.attr('data-index')) || 0,
						'position': _element.attr('data-position') || ''
					});
				}
			})
			/**
			 * [按照顺序索引排序]
			 */
			.sort(function(prevElement, nextElement) {
				return prevElement.data('index') - nextElement.data('index');
			});

		/**
		 * [resetPositionCallback 引导各步骤位置回调函数集]
		 * @type {Object}
		 */
		_this.resetPositionCallback = {

			/**
			 * [版式/布局]
			 */
			"action-select-layout": function(element) {

				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);

				_this.dialogEntity.htmlEntity.css({
					top: 0
				});
			},

			/**
			 * [选择模板]
			 */
			"action-select-template": function(element) {

				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);
			},

			/**
			 * [导航管理]
			 */
			"action-select-navigation": function(element) {

				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);
			},

			/**
			 * [模块设置]
			 */
			"module_setting": function(element) {

				/**
				 * [moduleEntity 模块实例对象]
				 * @type {Object}
				 */
				var moduleEntity = moduleEntitySet.module_setting,

					/**
					 * [marginLeft 元素右间距]
					 * @type {Number}
					 */
					marginLeft = 163;

				/**
				 * [侧栏在右布局时候，修改元素右间距]
				 */
				if (parseInt(_this.pageEntity.layout) === 2) {
					marginLeft = -55;
				}

				/**
				 * [设置元素位置]
				 */
				element.css({
					top: moduleEntity.htmlEntity.offset().top + 4,
					marginLeft: marginLeft
				});

				/**
				 * [windowHeight 窗口高度]
				 * @type {Number}
				 */
				var windowHeight = $(window).height(),

					/**
					 * [moduleOffsetTop 模块至顶部的偏移量]
					 * @type {Number}
					 */
					moduleOffsetTop = moduleEntity.htmlEntity.offset().top;

				/**
				 * 滚动至引导处
				 */
				$(window).scrollTop(moduleOffsetTop - (windowHeight / 2) + element.height());
			},

			/**
			 * [全屏广告]
			 */
			"module_ads": function(element) {

				/**
				 * [moduleEntity 模块实例对象]
				 * @type {Object}
				 */
				var moduleEntity = moduleEntitySet.module_ads;

				/**
				 * [设置元素位置]
				 */
				element.css({
					top: moduleEntity.htmlEntity.offset().top + moduleEntity.htmlEntity.height()
				});

				/**
				 * [windowHeight 窗口高度]
				 * @type {Number}
				 */
				var windowHeight = $(window).height(),

					/**
					 * [moduleOffsetTop 模块至顶部的偏移量]
					 * @type {Number}
					 */
					moduleOffsetTop = moduleEntity.htmlEntity.offset().top;

				/**
				 * 滚动至引导处
				 */
				$(window).scrollTop(moduleOffsetTop + element.height() + moduleEntity.htmlEntity.height() - windowHeight);
			},

			/**
			 * [扩展广告]
			 */
			"region_top_banner": function(element) {

				/**
				 * [regionEntity 区域实例对象]
				 * @type {Object}
				 */
				var regionEntity = moduleEntitySet.region_top_banner;

				/**
				 * [设置元素位置]
				 */
				element.css({
					top: regionEntity.htmlEntity.btnAppendModule.offset().top + regionEntity.htmlEntity.btnAppendModule.height() - 176
				});

				/**
				 * [windowHeight 窗口高度]
				 * @type {Number}
				 */
				var windowHeight = $(window).height(),

					/**
					 * [moduleOffsetTop 区域添加模块按钮至顶部的偏移量]
					 * @type {Number}
					 */
					moduleOffsetTop = regionEntity.htmlEntity.btnAppendModule.offset().top;

				/**
				 * 滚动至引导处
				 */
				$(window).scrollTop(moduleOffsetTop - (windowHeight / 2) + element.height());
			},

			/**
			 * [风格设置]
			 */
			"action-select-theme": function(element) {
				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);
			},

			/**
			 * [预览、备份、还原]
			 */
			"action-preview-backup-recovery": function(element) {
				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);
			},

			/**
			 * [发布]
			 */
			"action-release": function(element) {
				/**
				 * 滚动至顶部
				 */
				$(window).scrollTop(0);
			}
		};

		/**
		 * 绑定事件
		 */
		_this.bindEvent();

		/**
		 * [index 设置当前引导项目索引，默认从第一项开始]
		 * @type {Number}
		 */
		_this.index = 0;

		/**
		 * 开始引导
		 */
		_this.start();

		/**
		 * 记录引导已向用户展示过，以便下次不再展示
		 */
		try {
			HC.util.cookie.set('shop3.0.guider', 1, {
				expires: 7,
				path: '/'
			});
		} catch (ex) {}
	};

	/**
	 * [bindEvent 绑定事件]
	 */
	guider.prototype.bindEvent = function() {
		var _this = this;


		/**
		 * [绑定关闭按钮点击事件]
		 */
		_this.dialogEntity.htmlEntity.find('.sClose').click(function(event) {

			/**
			 * 删除弹出框DOM元素
			 */
			_this.dialogEntity.remove();
		})

		/**
		 * [绑定下一步按钮点击事件]
		 */
		.end().find('.sBtn').click(function(event) {

			/**
			 * 显示引导下一步
			 */
			_this.next();
		})

		/**
		 * [绑定上一步按钮点击事件]
		 */
		.end().find('.ReturnBtn').click(function(event) {

			/**
			 * 显示引导上一步
			 */
			_this.prev();
		});
	};

	/**
	 * [start 开始引导]
	 */
	guider.prototype.start = function() {
		var _this = this;

		/**
		 * [已到引导最后一步]
		 */
		if (_this.index >= (_this.htmlEntityList.length)) {

			/**
			 * 删除弹出框DOM元素
			 */
			_this.dialogEntity.remove();
			return;
		}

		/**
		 * [_element 获取当前引导步骤DOM元素并显示]
		 * @type {Object}
		 */
		var _element = _this.htmlEntityList[_this.index].show(),

			/**
			 * [_elementPositionCallback 获取当前引导步骤DOM元素位置回调]
			 * @type {Object}
			 */
			_elementPositionCallback = _this.resetPositionCallback[_element.data('position')];

		/**
		 * 执行位置回调函数
		 */
		_elementPositionCallback && _elementPositionCallback.call(_this, _element);
	};

	/**
	 * [prev 上一步]
	 */
	guider.prototype.prev = function() {
		var _this = this;

		/**
		 * 隐藏当前步骤元素
		 */
		_this.htmlEntityList[_this.index].hide();

		/**
		 * [index 设置上一步索引值]
		 * @type {Number}
		 */
		_this.index = (--_this.index) < 1 ? 1 : _this.index;

		/**
		 * 开始引导
		 */
		_this.start();
	};

	/**
	 * [next 下一步]
	 */
	guider.prototype.next = function() {
		var _this = this;

		/**
		 * 隐藏当前步骤元素
		 */
		_this.htmlEntityList[_this.index].hide();

		/**
		 * [index 设置上一步索引值]
		 * @type {Number}
		 */
		_this.index = (++_this.index) > _this.htmlEntityList.length ? _this.htmlEntityList.length : _this.index;

		/**
		 * 开始引导
		 */
		_this.start();
	};

	module.exports = guider;

/***/ })

});