/**
 * [page_module_selector 新增模块选择框]
 * @return {[type]} [description]
 */
function page_module_selector(options) {
	var _this = this,

		/**
		 * [region_module_mapping 获取区域模块映射关系业务对象模块]
		 * @type {Object}
		 */
		region_module_mapping = require('./page.region.module.mapping'),

		/**
		 * [regionModuleMappingEntity 初始化区域模块映射关系业务对象实例]
		 * @type {region_module_mapping_entity}
		 */
		regionModuleMappingEntity = new region_module_mapping();

	/**
	 * 扩展新增模块弹出框配置
	 */
	$.extend(true, _this, {

			/**
			 * [listener 事件监听缓存对象]
			 * @type {Object}
			 */
			listener: {},

			/**
			 * [dialogEntity 弹出框]
			 * @type {[type]}
			 */
			dialogEntity: null,

			/**
			 * [regionEntity 新增模块所在区域业务对象]
			 * @type {Object}
			 */
			regionEntity: null,

			/**
			 * [level 当前选中模块级别]
			 * @type {Number}
			 */
			level: 1,

			/**
			 * [relate 当前选中模块相关]
			 * @type {Number}
			 */
			relate: 0,

			/**
			 * [appendModuleCallback 更新DOM结构及模块列表数据回调函数]
			 * @type {Object}
			 */
			appendModuleCallback: null,

			/**
			 * [rendedCallback 弹出框渲染完毕回调函数]
			 * @type {[type]}
			 */
			rendedCallback: null,

			/**
			 * [regionModuleMappingEntity 缓存区域模块映射关系业务对象实例]
			 * @type {[type]}
			 */
			regionModuleMappingEntity: regionModuleMappingEntity
		},

		/**
		 * 扩展区域模块映射关系业务对象的属性，如模块级别枚举项列表、模块相关枚举项列表、模块配置信息数据集、区域模块组态配置信息数据集。
		 */
		{
			/**
			 * [moduleLevelList 模块级别枚举项列表]
			 * @type {Array}
			 */
			levelList: regionModuleMappingEntity.levelList,

			/**
			 * [relateList 模块相关枚举项列表]
			 * @type {Array}
			 */
			relateList: regionModuleMappingEntity.relateList,

			/**
			 * [moduleList 模块配置信息数据集]
			 * @type {Array}
			 */
			moduleList: regionModuleMappingEntity.moduleList
		},

		/**
		 * 自定义配置数据
		 */
		options || {}
	);

	/**
	 * 初始化模块选择弹出框
	 */
	page_module_selector.prototype.init.call(_this);
}

/**
 * [init 初始化模块选择弹出框]
 * @return {[type]} [description]
 */
page_module_selector.prototype.init = function() {
	var _this = this,
		_callee = arguments.callee,
		_cache = _this.regionEntity.pageEntity.cache['module-setting-html'],
		_htmlDeferrer = _this.getHTMLDeferred(),
		_mustacheDeferrer = _this.loadMustacheDeferred();
		
	/**
	 * 初始化模块数据
	 */
	_this.initData();

	/**
	 * [在模块设置HTML和模板引擎就绪的时候，开始渲染弹出框]
	 */
	$.when(_htmlDeferrer, _mustacheDeferrer).done(function() {

		/**
		 * 获取延迟对象返回结果，由ajax对象返回时arguments[0]的类型为Array，否则为String。
		 */
		var _html = (Array.isArray(arguments[0]) ? arguments[0][0] : arguments[0]) || '';
		if ($.trim(_html).length !== 0) {
			_cache['page.module.selector'] = _html;
		}

		/**
		 * [level 默认选中级别为级别列表第一项]
		 * @type {[type]}
		 */
		_this.level = _this.levelList[0].val;

		/**
		 * [_html 根据数据渲染html]
		 * @type {String}
		 */
		_html = mustache.render(_html, {
			levelList: _this.levelList,
			relateList: _this.relateList,
			moduleList: _this.moduleList,

			/**
			 * [isCurrentLevel 是否当前模块级别]
			 * @return {Boolean} [description]
			 */
			isCurrentLevel: function() {
				return this.val === _this.level ? 'ddCur' : '';
			},

			/**
			 * [isCurrentLevel 是否当前模块相关]
			 * @return {Boolean} [description]
			 */
			isCurrentRelate: function() {
				return this.val === _this.relate ? 'addCur' : '';
			},

			/**
			 * [setDataEntity 设置数据属性]
			 * @return {[type]} [description]
			 */
			setDataEntity: function() {
				return JSON.stringify(this);
			},

			/**
			 * [isLimitMaximum 是否达到数量上限]
			 * @return {Boolean} [description]
			 */
			isLimitMaximum: function() {
				return this.limit_maximum;
			},

			/**
			 * [isLimitScope 是否可将当前模块添加到当前区域]
			 * @return {Boolean} [description]
			 */
			isLimitScope: function() {
				return this.limit_scope;
			},

			/**
			 * [isLimitAuthority 是否有权限添加当前模块]
			 * @return {Boolean} [description]
			 */
			isLimitAuthority: function() {
				return this.limit_authority;
			},

			/**
			 * [isLimitSimulatedLogin 是否仅模拟登陆用户可用]
			 * @return {Boolean} [description]
			 */
			isLimitSimulatedLogin: function() {
				return this.limit_simulatedlogin;
			},

			/**
			 * [isCancellable 是否可撤销当前模块]
			 * @return {Boolean} [description]
			 */
			isCancellable: function() {
				return this.cancellable;
			}
		});

		/**
		 * [dialogEntity 初始化弹出框实例对象]
		 * @type {Object}
		 */
		_this.dialogEntity = dialog({
			fixed: true,
			content: _html,
			title: '添加模块'
		}).showModal();

		/**
		 * [清空弹出框默认 padding 样式]
		 */
		$(_this.dialogEntity.node).find('[i="body"]').css({
			padding: '0px'
		});

		/**
		 * 绑定弹出框相关事件
		 */
		_this.bindEvent();

		/**
		 * 渲染模块列表
		 */
		_this.render();

		/**
		 * 执行弹出框渲染完毕回调
		 */
		_this.rendedCallback && _this.rendedCallback.call(_this);

		/**
		 * [在撤销模块成功时处理相关业务逻辑]
		 */
		_this.addEventListener('onModuleRemoveSuccess', function(elementEntity, moduleSettingData) {

			/**
			 * [更新基于用户计数的模块数量]
			 */
			// _this.regionModuleMappingEntity.decreaseModuleNum(moduleSettingData.identifier);

			/**
			 * 刷新当前模块按钮状态
			 */
			_this.refreshModuleState(elementEntity, moduleSettingData);
		});

		/**
		 * [在添加模块成功时处理相关业务逻辑]
		 */
		_this.addEventListener('onModuleAppendSuccess', function(elementEntity, moduleSettingData) {

			/**
			 * [更新基于用户计数的模块数量]
			 */
			// _this.regionModuleMappingEntity.increaseModuleNum(moduleSettingData.identifier);

			/**
			 * 刷新当前模块按钮状态
			 */
			_this.refreshModuleState(elementEntity, moduleSettingData);
		});

	}).fail(function() {

		/**
		 * [提示获取HTML失败]
		 */
		dialog({
			fixed: true,
			title: '提示',
			content: '获取HTML失败',
			cancelValue: '取消',
			cancel: function() {
				this.close().remove();
			},
			okValue: '确定',
			ok: function() {

				/**
				 * 关闭弹出框
				 */
				this.close().remove();
			}
		}).showModal();
	});
};

/**
 * [initData 初始化模块数据]
 */
page_module_selector.prototype.initData = function() {
	var _this = this,

		/**
		 * [_module_relate_extend_data 模块相关数据集扩展数据]
		 * @type {Object}
		 */
		_module_relate_extend_data = {},

		/**
		 * [_module_level_extend_data 模块级别数据集扩展数据]
		 * @type {Object}
		 */
		_module_level_extend_data = {};

	/**
	 * [更新当前区域下各模块的配置数据]
	 * @type {Object}
	 */
	_this.moduleList = _this.regionModuleMappingEntity.analyticPageModuleData(_this.regionEntity.pageEntity, _this.regionEntity);

	/**
	 * [description]
	 */
	$.each(_this.moduleList, function(moduleIndex, moduleData) {

		/**
		 * [将可添加到当前区域的模块按照模块相关属性进行划分并存储到模块相关数据集中]
		 */
		if (moduleData.limit_scope) {
			_module_relate_extend_data[moduleData.relate] ? _module_relate_extend_data[moduleData.relate].push(moduleData) : (_module_relate_extend_data[moduleData.relate] = [moduleData]);
			_module_level_extend_data[moduleData.level] ? _module_level_extend_data[moduleData.level].push(moduleData) : (_module_level_extend_data[moduleData.level] = [moduleData]);
		}
	});

	/**`
	 * [将当前区域下可添加的模块按照模块相关属性分类并填充到模块相关属性数据集中，以用于在渲染模块新增弹出框时能知晓指定模块相关分类下的模块数据，从而实现模块相关显示与否的判断逻辑]
	 */
	$.each(_this.relateList, function(relateIndex, relateEntity) {
		$.extend(true, relateEntity, {
			modules: (_module_relate_extend_data[relateEntity.val] || []).slice(0)
		});

		/**
		 * 填充"全部模块"模块相关分类项
		 */
		_this.relateList[0].modules = _this.relateList[0].modules.concat((_module_relate_extend_data[relateEntity.val] || []).slice(0));
	});

	/**`
	 * [将当前区域下可添加的模块按照模块级别属性分类并填充到模块级别属性数据集中，以用于在渲染模块新增弹出框时能知晓指定模块级别分类下的模块数据，从而实现模块级别显示与否的判断逻辑]
	 */
	_this.levelList = _this.levelList.filter(function(levelEntity) {
		return !!(_module_level_extend_data[levelEntity.val] || []).length;
	});
};

/**
 * [bindEvent 绑定弹出框事件]
 * @return {[type]} [description]
 */
page_module_selector.prototype.bindEvent = function() {
	var _this = this,
		_dialogEntityNode = $(_this.dialogEntity.node),

		/**
		 * [_btnLevel 模块级别按钮]
		 * @type {Object}
		 */
		_btnLevel = _dialogEntityNode.find('[data-btn-level]'),

		/**
		 * [_btnRelate 模块相关按钮]
		 * @type {Object}
		 */
		_btnRelate = _dialogEntityNode.find('[data-btn-relate]'),

		/**
		 * [_btnRelate 弹框关闭按钮]
		 * @type {Object}
		 */
		_btnClose = _dialogEntityNode.find('[data-btn-close]'),

		/**
		 * [_btnAppend 模块新增按钮]
		 * @type {Object}
		 */
		_btnAppend = _dialogEntityNode.find('[data-btn-act="append"]'),

		/**
		 * [_btnCancel 模块撤销按钮]
		 * @type {Object}
		 */
		_btnCancel = _dialogEntityNode.find('[data-btn-act="cancel"]');

	/**
	 * [绑定弹框关闭按钮事件]
	 */
	_btnClose.click(function(event) {
		_this.dialogEntity.remove();
	});

	/**
	 * [绑定模块相关按钮事件]
	 */
	_btnRelate.each(function(index, element) {
		var _elementEntity = $(element);
		_elementEntity.data('data-btn-val', _elementEntity.attr('data-btn-val'));
	}).click(function(event) {
		var _elementEntity = $(this);
		_elementEntity.addClass('addCur').siblings().removeClass('addCur');
		_this.relate = Number(_elementEntity.data('data-btn-val') || 0);
		_this.render();
	});

	/**
	 * [绑定模块级别按钮事件]
	 */
	_btnLevel.each(function(index, element) {
		var _elementEntity = $(element);
		_elementEntity.data('data-btn-val', _elementEntity.attr('data-btn-val'));
	}).click(function(event) {
		var _elementEntity = $(this);
		_elementEntity.addClass('ddCur').siblings().removeClass('ddCur');
		_this.level = Number(_elementEntity.data('data-btn-val') || 0);
		_this.render();

		/**
		 * [非收费会员点击 高级模块 时，弹出且只弹出一次提示框]
		 */
		if ((_this.level === 2) && (!_this.regionEntity.pageEntity.ismmt) && (!_elementEntity.data('warned'))) {
			_elementEntity.data('warned', true);
			dialog({
				fixed: true,
				title: '提示',
				content: '高级模块为收费用户专享，升级为买卖通收费用户后可添加。',
				okValue: '确定',
				ok: function() {

					/**
					 * 关闭弹出框
					 */
					this.remove();
				}
			}).showModal();
		}
	});

	/**
	 * [初始化内存缓存数据，查找弹出框中所有包含 data-entity 自定义属性的元素，将其 data-entity 自定义属性中的的内容更新到对应的内存缓存中去]
	 */
	_dialogEntityNode.find('[data-entity]').each(function(index, element) {
		var _elementEntity = $(element),
			_elementDataEntity = _elementEntity.attr('data-entity');
		try {
			_elementDataEntity = $.parseJSON(_elementEntity.attr('data-entity'));
		} catch (e) {}
		_elementEntity.data('data-entity', _elementDataEntity);
	});

	/**
	 * [绑定"添加"按钮点击事件]
	 */
	_btnAppend.click(function(event) {

		/**
		 * 添加模块
		 */
		_this.appendModule($(this));

	});

	/**
	 * [绑定"撤销"按钮点击事件]
	 */
	_btnCancel.click(function(event) {

		/**
		 * 撤销模块
		 */
		_this.removeModule($(this));
	});
};

/**
 * [removeModule 撤销模块]
 * @param  {Object} elementEntity ["撤销"按钮]
 * @return {[type]}            [description]
 */
page_module_selector.prototype.removeModule = function(elementEntity) {
	var _this = this,
		_elementEntity = elementEntity.parent(),
		_moduleSettingData = _elementEntity.data('data-entity') || {},
		_callee = arguments.callee;

	/**
	 * [验证是否可以撤销当前区域的当前模块]
	 */
	if (!_moduleSettingData.cancellable) {
		return;
	}

	/**
	 * [查找当前区域的指定类型模块并删除]
	 */
	$.each(_this.regionEntity.moduleList, function(index, module) {
		if (module.identifier === _moduleSettingData.identifier) {
			_this.regionEntity.removeModule(module, function(json) {

				/**
				 * 完成模块撤销后刷新当前模块按钮状态
				 */
				if (json.state) {

					/**
					 * 派发模块撤销成功事件
					 */
					_this.__dispatchEvent('onModuleRemoveSuccess', _elementEntity, _moduleSettingData);
				}
			});
			return false;
		}
	});
};

/**
 * [appendModule 添加模块]
 * @param  {Object} elementEntity ["添加"按钮]
 * @return {[type]}            [description]
 */
page_module_selector.prototype.appendModule = function(elementEntity) {
	var _this = this,
		_elementEntity = elementEntity.parent(),
		_moduleSettingData = _elementEntity.data('data-entity') || {},
		_callee = arguments.callee;

	/**
	 * [验证是否可以添加当前模块到当前区域]
	 */
	if (!_moduleSettingData.enabled) {
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
	 * [_xhr 定义新增模块延迟对象]
	 * @type {Object}
	 */
	var _xhr = $.ajax({
		url: '/detail/turbine/template/shop2016,editmodule.html',
		type: 'GET',
		dataType: 'html',
		data: {
			t: Math.random(), //时间戳，防止ie缓存
			operatetype: 1, //操作类型，1：新增模块，2：编辑模块
			operatedata: JSON.stringify({ //操作数据
				modulemark: _moduleSettingData.identifier, //模块标记
				//providerid: _this.regionEntity.pageEntity.providerid, //商铺编号
				username: _this.regionEntity.pageEntity.username, //商铺用户名
				regionmark: _this.regionEntity.identifier, //区域标记
				templateid: pageEntity.template.id,
				pagetype: pageEntity.pagetype,
				moduleid: 0,
				data: {}
			}),
			username: _this.regionEntity.pageEntity.username //商铺用户名
		}
	});

	/**
	 * [获取新增模块HTML]
	 */
	_xhr.done(function(html) {

		/**
		 * [_htmlEntity 创建模块DOM元素对象]
		 * @type {Object}
		 */
		var _htmlEntity = $($.trim(html)),

			/**
			 * [_errorMessage 模块新增错误信息]
			 * @type {Object}
			 */
			_errorMessage = _htmlEntity.attr('data-error') || '';

		/**
		 * [新增模块失败]
		 */
		if (_errorMessage.length) {

			/**
			 * [提示模块新增失败原因]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: decodeURIComponent(_errorMessage),
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
			return;
		}

		/**
		 * 更新DOM结构及模块列表数据回调函数
		 */
		try {
			_this.appendModuleCallback && _this.appendModuleCallback($($.trim(html)));
		} catch (ex) {}

		/**
		 * 派发模块撤销成功事件
		 */
		_this.__dispatchEvent('onModuleAppendSuccess', _elementEntity, _moduleSettingData);

	}).fail(function() {

		/**
		 * [提示添加模块失败]
		 */
		dialog({
			fixed: true,
			title: '提示',
			content: '添加模块失败',
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
	}).always(function() {

		/**
		 * 删除加载中弹出框
		 */
		loadingDialogEntity.remove();
	});
};

/**
 * [refreshModuleState 刷新模块]
 * @param  {Object} elementEntity [按钮元素]
 * @param  {Object} moduleSettingData [模块配置数据]
 * @return {[type]}               [description]
 */
page_module_selector.prototype.refreshModuleState = function(elementEntity, moduleSettingData) {
	var _this = this,

		/**
		 * [_txtDescription 模块描述信息元素]
		 * @type {Object}
		 */
		_txtDescription = elementEntity.find('[data-desc-wrap]'),

		/**
		 * [_btnAppend 模块新增按钮]
		 * @type {Object}
		 */
		_btnAppend = elementEntity.find('[data-btn-act="append"]'),

		/**
		 * [_btnCancel 模块撤销按钮]
		 * @type {Object}
		 */
		_btnCancel = elementEntity.find('[data-btn-act="cancel"]');

	/**
	 * 重新初始化模块数据
	 */
	_this.initData();

	/**
	 * [更新模块DOM元素配置数据]
	 */
	$.each(_this.moduleList, function(_moduleIndex, _moduleSettingData) {
		if (_moduleSettingData.identifier === moduleSettingData.identifier) {
			moduleSettingData = _moduleSettingData;
			elementEntity.data('data-entity', moduleSettingData);
			_txtDescription.text(moduleSettingData.description);
			return false;
		}
	});

	/**
	 * 更新模块"撤销"按钮状态,"添加"与"撤销"按钮显示状态是互斥的
	 */
	if (moduleSettingData.cancellable) {
		_btnCancel.show();
		_btnAppend.hide();
	} else {
		_btnCancel.hide();
		_btnAppend.show();
	}

	/**
	 * 设置模块"添加"按钮可用状态
	 */
	if (!moduleSettingData.enabled) {
		_btnAppend.attr('disabled', true).addClass('disabled');
	} else {
		_btnAppend.removeAttr('disabled').removeClass('disabled');
	}
};

/**
 * [render 根据模块级别、模块相关渲染模块列表]
 * @return {[type]}        [description]
 */
page_module_selector.prototype.render = function() {
	var _this = this,
		_level = _this.level,
		_relate = _this.relate,
		_dialogEntityNode = $(_this.dialogEntity.node),

		/**
		 * [_wrapModule 模块列表包裹元素]
		 * @type {Object}
		 */
		_wrapModule = _dialogEntityNode.find('[data-module-wrap]'),

		/**
		 * [_wrapModuleRelate 模块相关列表包裹元素]
		 * @type {Object}
		 */
		_wrapModuleRelate = _dialogEntityNode.find('[data-module-relate-wrap]');

	/**
	 * [过滤模块相关列表]
	 */
	_wrapModuleRelate.children().each(function(relateIndex, relateElement) {
		var _elementEntity = $(relateElement),
			_elementDataEntity = _elementEntity.data('data-entity'),
			_elementShowFlag = false,
			_elementRelateModules = [];


		/**
		 * [第一项也就是"全部模块"模块相关项永远显示]
		 */
		if (relateIndex === 0) {
			_elementEntity.show();
			return true;
		}

		/**
		 * [获取当前模块相关分类下的模块列表]
		 */
		for (var i = 0; i < _this.relateList.length; i++) {
			if (_this.relateList[i].val === _elementDataEntity.val) {
				_elementRelateModules = _this.relateList[i].modules || [];
				break;
			}
		}

		/**
		 * [设置当前模块相关过滤条件的显示状态]
		 */
		for (var j = 0; j < _elementRelateModules.length; j++) {
			if (_elementRelateModules[j].enabled && (_elementRelateModules[j].level === _this.level) && ((!_elementDataEntity.val) || (_elementRelateModules[j].relate === _elementDataEntity.val))) {
				_elementShowFlag = true;
				break;
			}
		}

		/**
		 * 切换模块相关过滤条件显示状态
		 */
		_elementShowFlag ? _elementEntity.show() : _elementEntity.hide();

		/**
		 * [若当前选中模块相关项为不显示状态，则将模块相关选中到全部模块相关项]
		 */
		if ((_this.relate === _elementDataEntity.val) && (!_elementShowFlag)) {
			_wrapModuleRelate.children().first().addClass('addCur').siblings().removeClass('addCur');
			_this.relate = 0;
		}
	});

	/**
	 * [过滤模块列表]
	 */
	_wrapModule.children().each(function(index, element) {
		var _elementEntity = $(element);
		var _elementDataEntity = _elementEntity.data('data-entity');
		if ((_elementDataEntity.level === _this.level) && ((!_this.relate) || (_elementDataEntity.relate === _this.relate))) {
			_elementEntity.show();
		} else {
			_elementEntity.hide();
		}
	});
};

/**
 * [getHTMLDeferred 获取HTML延迟对象]
 * @return {[type]} [description]
 */
page_module_selector.prototype.getHTMLDeferred = function() {
	var _this = this,
		_cache = _this.regionEntity.pageEntity.cache['module-setting-html'];

	/**
	 * [检查缓存中是否已有模块选择弹出框HTML]
	 */
	if (_cache && _cache['page.module.selector']) {
		var _deferred = $.Deferred();
		_deferred.resolve(_cache['page.module.selector']);
		return _deferred;
	}

	/**
	 * [通过数据接口获取模块选择弹出框HTML]
	 * @type {Object}
	 */
	return $.ajax({
		url: '/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=page.module.selector',
		type: 'GET',
		dataType: 'jsonp'
	});
};

/**
 * [loadMustacheDeferred 加载 mustache 模板引擎]
 * @return {[type]} [description]
 */
page_module_selector.prototype.loadMustacheDeferred = function() {
	var _this = this,
		_deferrer = $.Deferred();

	/**
	 * [异步加载 mustache 模板引擎]
	 */
	require.ensure([], function(require) {
		require('mustache');
		_deferrer.resolve();
	}, 'components/mustache/mustache');

	return _deferrer;
};

/**
 * [__getEventListener 获取指定事件类型的事件处理函数列表]
 * @param  {String} eventType [事件类型]
 * @return {Array}           [事件处理函数列表]
 */
page_module_selector.prototype.__getEventListener = function(eventType) {
	var _this = this;
	_this.listener[eventType] = _this.listener[eventType] ? _this.listener[eventType] : [];
	return _this.listener[eventType];
};

/**
 * [__dispatchEvent 派发事件]
 */
page_module_selector.prototype.__dispatchEvent = function() {
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
page_module_selector.prototype.removeEventListener = function(eventType, eventHandler) {
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
page_module_selector.prototype.addEventListener = function(eventTypes, eventHandler) {
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

/**
 * [exports 导出业务对象]
 * @type {page_module_selector}
 */
module.exports = page_module_selector;