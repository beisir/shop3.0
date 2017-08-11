/***
 * 引入所见即所得后台模块默认配置数据
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
		 * [listener 事件监听缓存对象]
		 * @type {Object}
		 */
		listener: {},

		/**
		 * [identifier 模块标识符]
		 * @type {String}
		 */
		identifier: '',

		/**
		 * [addible 模块是否可添加模块]
		 * @type {Boolean}
		 */
		addible: false,

		/**
		 * [configurable 模块是否可配置]
		 * @type {Boolean}
		 */
		configurable: false,

		/**
		 * [dragable 模块是否可拖动]
		 * @type {Boolean}
		 */
		dragable: false,

		/**
		 * [deletable 模块是否可删除]
		 * @type {Boolean}
		 */
		deletable: false,

		/**
		 * [fixed 模块位置是否固定]
		 * @type {Boolean}
		 */
		fixed: false,

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
		_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-module').replace(/\t/igm, "") || '{}');
	} catch (e) {
		_this.dataEntity = {};
	}

	/**
	 * [addible 初始化模块是否创建"添加模块"按钮属性]
	 * @type {[type]}
	 */
	_this.addible = getElementBoolAttrValue(_this.htmlEntity, 'data-addible'),

		/**
		 * [configurable 初始化模块是否可配置属性]
		 * @type {[type]}
		 */
		_this.configurable = getElementBoolAttrValue(_this.htmlEntity, 'data-configurable'),

		/**
		 * [dragable 初始化模块是否可拖动属性]
		 * @type {[type]}
		 */
		_this.dragable = getElementBoolAttrValue(_this.htmlEntity, 'data-dragable'),

		/**
		 * [deletable 初始化模块是否可删除属性]
		 * @type {[type]}
		 */
		_this.deletable = getElementBoolAttrValue(_this.htmlEntity, 'data-deletable'),

		/**
		 * [fixedtop 初始化模块是否固顶属性]
		 * @type {[type]}
		 */
		_this.fixedtop = getElementBoolAttrValue(_this.htmlEntity, 'data-fixed-top'),

		/**
		 * [fixedtop 初始化模块是否固顶属性]
		 * @type {[type]}
		 */
		_this.fixedbottom = getElementBoolAttrValue(_this.htmlEntity, 'data-fixed-bottom'),

		/**
		 * [manageable 初始化模块是否可管理属性]
		 * @type {[type]}
		 */
		_this.manageable = getElementBoolAttrValue(_this.htmlEntity, 'data-manageable'),

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
	 * [创建模块"添加模块"按钮]
	 */
	if (_this.addible) {
		_this.htmlEntity.btnAppendModule = $('<div class="addBox"><a href="javascript:;">添加模块</a></div>').appendTo(_this.htmlEntity).hide();
	}

	/**
	 * [overlayer 创建模块遮罩层,并默认隐藏]
	 * @type {[type]}
	 */
	_this.htmlEntity.overlayer = $('<div class="colunmEdit"><div class="colunmBg"></div><div class="colunmBtn"></div></div>').appendTo(_this.htmlEntity).hide();

	/**
	 * [overlayerBg 模块遮罩层背景元素]
	 * @type {Object}
	 */
	_this.htmlEntity.overlayerBg = _this.htmlEntity.overlayer.find('.colunmBg');

	/**
	 * [btnwrap 初始化模块按钮包裹元素]
	 * @type {[type]}
	 */
	_this.htmlEntity.btnWrap = _this.htmlEntity.overlayer.find('.colunmBtn');

	/**
	 * [创建模块"上移" "下移"按钮]
	 */
	if (_this.dragable) {
		_this.htmlEntity.addClass('dragable'); //添加可拖拽样式类名
		_this.htmlEntity.btnUp = $('<a href="javascript:;" class="upBtn"></a>').appendTo(_this.htmlEntity.btnWrap);
		_this.htmlEntity.btnDown = $('<a href="javascript:;" class="downBtn"></a>').appendTo(_this.htmlEntity.btnWrap);
	}

	/**
	 * [创建模块"设置"按钮]
	 */
	if (_this.configurable) {
		_this.htmlEntity.btnSetting = $('<a href="javascript:;" class="colunmBtn1">设置</a>').appendTo(_this.htmlEntity.btnWrap);
	}

	/**
	 * [创建模块"删除"按钮]
	 */
	if (_this.deletable) {
		_this.htmlEntity.btnDelete = $('<a href="javascript:;" class="colunmBtn1">删除</a>').appendTo(_this.htmlEntity.btnWrap);
	}

	/**
	 * [创建模块"管理"按钮]
	 */
	if (_this.manageable) {
		_this.htmlEntity.btnManage = $('<a href="' + (_this.dataEntity.href || '#') + '" class="colunmBtn1" target="_blank">管理</a>').appendTo(_this.htmlEntity.btnWrap);
	}

	/**
	 * 绑定模块相关事件
	 */
	_this.bindEvent();

	/**
	 * [listener 初始化模块时，需要清空事件监听对象]
	 * @type {Object}
	 */
	_this.listener = {};

	/**
	 * [在添加模块成功时处理相关业务逻辑]
	 */
	_this.addEventListener('onModuleUpdateSuccess', function() {

		/**
		 * 刷新模块"上移"、"下移"按钮状态
		 */
		_this.regionEntity.refreshModuleDragView();

		/**
		 * [针对模块懒加载的图片进行懒加载初始化，并立刻呈现懒加载图片]
		 */
		$.fn.lazyload && _this.htmlEntity.find("img[data-original]").lazyload({
			threshold: 0,
			failurelimit: 10,
			container: _this.htmlEntity,
			skip_invisible: true
		}).trigger('appear');
	});
};

/**
 * [bindEvent 绑定模块相关事件]
 * @return {[type]} [description]
 */
page_module.prototype.bindEvent = function() {
	var _this = this;

	/**
	 * [绑定“添加模块”按钮点击事件]
	 */
	_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.click(function(event) {

		/**
		 * 调用区域新增模块功能
		 */
		_this.regionEntity.prependModule(_this);
	});

	/**
	 * [绑定“删除”按钮点击事件]
	 */
	_this.htmlEntity.btnDelete && _this.htmlEntity.btnDelete.click(function(event) {

		/**
		 * [当前模块是否可删除]
		 */
		if (!_this.deletable) {
			return false;
		}

		/**
		 * [提示模块顺序保存失败]
		 */
		dialog({
			fixed: true,
			title: '提示',
			content: '确定要删除此模块吗？',
			cancelValue: '取消',
			cancel: function() {
				this.close().remove();
			},
			okValue: '确定',
			ok: function() {

				/**
				 * 调用区域业务对象的删除区域内模块方法
				 */
				_this.regionEntity.removeModule(_this);

				/**
				 * 关闭弹出框
				 */
				this.close().remove();
			}
		}).showModal();
	});

	/**
	 * [绑定“上移”按钮点击事件]
	 */
	_this.htmlEntity.btnUp && _this.htmlEntity.btnUp.click(function(event) {

		/**
		 * 调用区域业务对象的模块上移方法
		 */
		_this.regionEntity.shiftUpModule(_this);

		/**
		 * 隐藏被移动模块的遮罩层、添加模块按钮
		 */
		_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
	});

	/**
	 * [绑定“下移”按钮点击事件]
	 */
	_this.htmlEntity.btnDown && _this.htmlEntity.btnDown.click(function(event) {

		/**
		 * 调用区域业务对象的模块下移方法
		 */
		_this.regionEntity.shiftDownModule(_this);

		/**
		 * 隐藏被移动模块的遮罩层、添加模块按钮
		 */
		_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
	});

	/**
	 * [绑定模块鼠标悬浮时显示遮罩层，否则隐藏]
	 */
	_this.htmlEntity.mouseenter(function(event) {
		_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.show();
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.show();
	}).mouseleave(function(event) {
		_this.htmlEntity.overlayer && _this.htmlEntity.overlayer.hide();
		_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.hide();
	});

	/**
	 * [若模块可设置则绑定模块“设置”按钮点击事件]
	 */
	_this.configurable && _this.htmlEntity.btnSetting && _this.htmlEntity.btnSetting.click(function(event) {

		/**
		 * 显示模块设置遮罩层
		 */
		_this.showModuleSettingOverlayer();
	});

	/**
	 * [若模块可设置则绑定遮罩层点击事件，执行模块设置按钮逻辑]
	 */
	_this.configurable && _this.htmlEntity.overlayerBg.click(function(event) {

		/**
		 * 显示模块设置遮罩层
		 */
		_this.showModuleSettingOverlayer();
	});

	/**
	 * 获取当前类型模块的渲染逻辑模块
	 */
	var renderModule;
	try {
		renderModule = require('./module.render/' + _this.identifier);
	} catch (ex) {}

	/**
	 * [存在渲染逻辑模块则执行，避免创建过多渲染逻辑模块实例，因为大多数模块不需要就行前台渲染]
	 */
	renderModule && (_this.renderEntity = new renderModule(_this)) && _this.renderEntity.render && _this.renderEntity.render();
};

/**
 * [showModuleSettingOverlayer 显示模块设置遮罩层]
 */
page_module.prototype.showModuleSettingOverlayer = function() {
	var _this = this,

		/**
		 * 获取模块设置表单HTML延迟对象
		 */
		_xhrTemp,

		/**
		 * [_htmlCache 模块设置表单HTML缓存]
		 * @type {String}
		 */
		_htmlCache = _this.regionEntity.pageEntity.cache['module-setting-html'],

		/**
		 * [_callee 获取当前正在执行函数]
		 * @type {Object}
		 */
		_callee = arguments.callee;

	/**
	 * [若模块新增选择框已加载，则直接返回，防止重复加载]
	 */
	if (_this['module-loading']) {
		return;
	}

	/**
	 * 设置模块新增选择框
	 */
	_this['module-loading'] = true;

	/**
	 * [_dialogTemp 显示加载中弹出框]
	 * @type {Object}
	 */
	var _dialogTemp = dialog({
		content: '<span class="ui-dialog-loading">加载中..</span>'
	}).show();

	/**
	 * 从缓存中获取模块设置表单HTML
	 */
	if (_htmlCache[_this.identifier]) {
		_xhrTemp = $.Deferred();
		_xhrTemp.resolve(_htmlCache[_this.identifier]);
	}
	/**
	 * 若缓存中不存在模块设置表单HTML，则从服务器端获取
	 */
	else {

		/**
		 * 显示加载中弹出框
		 */
		_dialogTemp.show();

		/**
		 * [_xhrTemp 从服务器端获取模块设置表单HTML]
		 * @type {Object}
		 */
		_xhrTemp = $.ajax({
			url: '/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=' + _this.identifier,
			type: 'GET',
			dataType: 'jsonp'
		});
	}

	/**
	 * [异步加载各模块设置业务逻辑模块]
	 */
	require.ensure([], function(require) {

		/**
		 * [成功获取模块设置HTML]
		 */
		_xhrTemp.done(function(html) {

			/**
			 * 将模块设置表单HTML写入缓存
			 */
			_htmlCache[_this.identifier] = html;

			/**
			 * [moduleSettingTemp 获取设置模块]
			 * @type {Object}
			 */
			var moduleSettingTemp = require('./module/' + _this.identifier);

			/**
			 * 创建设置模块对象
			 */
			new moduleSettingTemp(_this, html, {

				/**
				 * [rendedCallback 渲染完毕回调]
				 */
				rendedCallback: function() {

					/**
					 * 设置模块新增选择框加载完成
					 */
					_this['module-loading'] = false;

					/**
					 * 关闭加载中弹出框
					 */
					_dialogTemp.remove();
				}
			});
		});

		/**
		 * [获取模块设置HTML失败]
		 */
		_xhrTemp.fail(function() {

			/**
			 * [提示模块HTML获取失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: '模块设置表单获取失败',
				cancelValue: '取消',
				cancel: function() {
					this.close().remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.remove();
				}
			}).showModal();

			/**
			 * 设置模块新增选择框加载完成
			 */
			_this['module-loading'] = false;

			/**
			 * [关闭加载中弹出框]
			 */
			_dialogTemp.remove();
		});

	}, 'backend/page.module.setting');
};

/**
 * [validate 验证是否允许操作收费模块]
 * @return {Boolean} [是否允许操作]
 */
page_module.prototype.validate = function() {
	var _this = this,

		/**
		 * [_ret 是否允许操作]
		 * @type {Boolean}
		 */
		_ret = {
			state: true,
			message: ''
		},

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
		region_module_mapping_data = region_module_mapping_entity.analyticPageModuleData(_this.regionEntity.pageEntity, _this.regionEntity);

	/**
	 * [验证是否有权限更新当前模块]
	 */
	$.each(region_module_mapping_data, function(moduleIndex, moduleData) {
		if (moduleData.identifier === _this.identifier) {

			/**
			 * [验证当前用户是否有权限对高级模块进行操作，验证当前用户是否有权限对模拟登陆才能操作的模块进行操作]
			 */
			if ((!moduleData.limit_authority) || (!moduleData.limit_simulatedlogin)) {
				_ret.state = false;
				_ret.message = moduleData.message.join('，');
			}
			return false;
		}
	});

	return _ret;
};

/**
 * [update 更新模块]
 * @param  {Object}   moduleData      [模块可配置的自定义数据集]
 * @param  {Function} successCallback [成功更新后的回调]
 * @param  {Function} failCallback    [更新失败后的回调]
 * @return {[type]}                   [description]
 */
page_module.prototype.update = function(moduleData, successCallback, failCallback) {
	var _this = this,

		/**
		 * [_params 模块设置保存基本参数]
		 * @type {Object}
		 */
		_params = {
			'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
			'operatedata': { //操作内容
				'providerid': _this.regionEntity.pageEntity.providerid, //商铺编号
				'username': _this.regionEntity.pageEntity.username, //商铺用户名
				'templateid': _this.regionEntity.pageEntity.template.id, //模板id
				'pagetype': _this.regionEntity.pageEntity.pagetype //区分频道页和二级页
			},
			'username': _this.regionEntity.pageEntity.username
		},

		/**
		 * [_callee 正在执行函数引用]
		 * @type {Function}
		 */

		_callee = arguments.callee;

	/**
	 * [验证是否允许操作当前模块]
	 */
	var _validate = _this.validate();
	if (!_validate.state) {
		dialog({
			title: '提示',
			content: _validate.message,
			okValue: '确定',
			ok: function() {
				this.remove();
			}
		}).showModal();
		return;
	}

	/**
	 * [loadingDialogEntity 显示加载中的遮罩层]
	 * @type {Object}
	 */
	var loadingDialogEntity = dialog({
		content: '<span class="ui-dialog-loading">加载中..</span>'
	}).showModal();

	/**
	 * [operatedata 更新请求参数]
	 * @type {Object}
	 */
	_params.operatedata = encodeURIComponent(JSON.stringify($.extend({}, _params.operatedata, _this.dataEntity, moduleData)));

	/***
	 * 增加一个时间戳字段，防止ie缓存
	 * @type {number}
	 */
	_params.t = Math.random();
	/**
	 * [保存模块配置]
	 */
	$.ajax({
		type: "POST",
		url: "/detail/turbine/template/shop2016,editmodule.html",
		timeout: 5000, //超时时间设置，单位毫秒
		data: _params,
		success: function(res) {

			/**
			 * [验证返回HTML非空]
			 */
			if (!$.trim(res).length) {

				/**
				 * [提示模块配置保存失败]
				 */
				dialog({
					fixed: true,
					title: '提示',
					content: '模块更新失败！',
					cancelValue: '取消',
					cancel: function() {
						this.remove();
					},
					okValue: '确定',
					ok: function() {

						/**
						 * 关闭弹出框
						 */
						this.remove();
					}
				}).showModal();

				/**
				 * 执行失败回调
				 */
				failCallback && failCallback();
				return;
			}

			/**
			 * [errorMessage 保存失败错误信息]
			 * @type {String}
			 */
			var _htmlEntity = $($.trim(res));
			var errorMessage = $.trim(_htmlEntity.attr("data-error")) || '';

			/**
			 * [保存成功]
			 */
			if (!errorMessage) {

				/**
				 * 替换当前模块DOM元素
				 */
				_this.htmlEntity.replaceWith(_htmlEntity);

				/**
				 * [htmlEntity 更新当前模块DOM元素引用]
				 * @type {Object}
				 */
				_this.htmlEntity = _htmlEntity;

				/**
				 * 使用更新后的HTML重新初始化模块
				 */
				_this.init(_htmlEntity);

				/**
				 * 派发模块更新成功事件
				 */
				_this.__dispatchEvent('onModuleUpdateSuccess');

				/**
				 * 执行失败回调
				 */
				successCallback && successCallback();
				return;
			}

			/**
			 * [提示模块配置保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: decodeURIComponent(errorMessage),
				cancelValue: '取消',
				cancel: function() {
					this.remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.remove();
				}
			}).showModal();

			/**
			 * 执行失败回调
			 */
			failCallback && failCallback();
		},
		error: function() {

			/**
			 * [提示模块配置保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: '网络异常，请稍后重试！',
				cancelValue: '取消',
				cancel: function() {
					this.remove();
				},
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.remove();
				}
			}).showModal();

			/**
			 * 执行失败回调
			 */
			failCallback && failCallback();
		},
		complete: function(XMLHttpRequest, status) {
			if (status == 'timeout') { //超时
				dialog({
					title: '提示',
					content: '请求超时！',
					okValue: '确定',
					ok: function() {
						this.close().remove();
						return false;
					}
				}).showModal();
			}

			/**
			 * 删除加载中弹出框
			 */
			loadingDialogEntity.remove();
		}
	});
};

/**
 * [__getEventListener 获取指定事件类型的事件处理函数列表]
 * @param  {String} eventType [事件类型]
 * @return {Array}           [事件处理函数列表]
 */
page_module.prototype.__getEventListener = function(eventType) {
	var _this = this;
	_this.listener[eventType] = _this.listener[eventType] ? _this.listener[eventType] : [];
	return _this.listener[eventType];
};

/**
 * [__dispatchEvent 派发事件]
 */
page_module.prototype.__dispatchEvent = function() {
	var _this = this,
		_eventType = Array.prototype.shift.call(arguments),
		_listener = _this.__getEventListener(_eventType);

	for (var i = 0; i < _listener.length; i++) {
		try {
			_listener[i].apply(_this, arguments);
		} catch (ex) {}
	}
};

/**
 * [__removeEventListener 移除事件监听]
 * @param {String} eventType    [事件类型]
 * @param {Object} eventHandler [事件处理函数]
 * @return {Object}              [当前业务对象]
 */
page_module.prototype.removeEventListener = function(eventType, eventHandler) {
	var _this = this,
		_listener = _this.__getEventListener(eventType);

	for (var i = 0; i < _listener.length; i++) {
		if (eventHandler === _listener[i]) {
			_listener.splice(i--, 1);
		}
	}
};

/**
 * [addEventListener 添加事件监听]
 * @param {String} eventTypes    [事件类型名称列表]
 * @param {Object} eventHandler [事件处理函数]
 * @return {Object}              [当前业务对象]
 */
page_module.prototype.addEventListener = function(eventTypes, eventHandler) {
	var _this = this,
		_listener = [],
		_eventTypeList = eventTypes.split(',');

	/**
	 * [循环添加不同事件类型的事件处理函数]
	 */
	$.each(_eventTypeList, function(index, eventType) {

		/**
		 * [过滤空事件类型名称]
		 */
		if (!($.trim(eventType).length)) {
			return true;
		}

		/**
		 * 获取指定事件类型的事件处理函数列表
		 */
		_listener = _this.__getEventListener(eventType);

		/**
		 * 将事件处理函数添加到指定事件类型的事件处理函数列表
		 */
		_listener.push(eventHandler);
	});
};

module.exports = page_module;