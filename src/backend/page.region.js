var page_module = require('./page.module'),
	dragula = require('dragula');

/**
 * [page_region 区域业务对象]
 * @param  {[type]} htmlEntity [区域DOM元素对象]
 * @return {[type]} [description]
 */
function page_region(htmlEntity, pageEntity) {
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
		 * [identifier 区域标识符]
		 * @type {String}
		 */
		identifier: '',

		/**
		 * [addible 区域是否可添加模块]
		 * @type {Boolean}
		 */
		addible: false,

		/**
		 * [dragable 区域内模块是否可拖动]
		 * @type {Boolean}
		 */
		dragable: true,

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
		 * [dragulaEntity 区域拖拽对象实例]
		 * @type {Object}
		 */
		dragulaEntity: null,

		/**
		 * [pageEntity 页面业务逻辑对象]
		 * @type {[type]}
		 */
		pageEntity: null,

		/**
		 * [regionModuleMappingEntity 缓存区域模块映射关系业务对象实例]
		 * @type {Object}
		 */
		regionModuleMappingEntity: regionModuleMappingEntity

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
	 * [创建模块包裹元素，用于防止模块和区域"添加模块"按钮可以拖动互换位置]
	 * @type {String}
	 */
	_this.htmlEntity.wrapInner('<div data-module-wrap="true"></div>');
	_this.htmlEntity.moduleWrap = _this.htmlEntity.find('[data-module-wrap]');

	/**
	 * 获取自定义属性 data-region 的内容并转换为JSON数据对象 
	 */
	try {
		_this.dataEntity = $.parseJSON(_this.htmlEntity.attr('data-region') || '{}');
	} catch (e) {
		_this.dataEntity = {};
	}

	/**
	 * [addible 初始化区域是否创建"添加模块"按钮属性]
	 * @type {Boolean}
	 */
	_this.addible = getElementBoolAttrValue(_this.htmlEntity, 'data-addible'),

		/**
		 * [dragable 初始化区域内模块是否是否可拖动属性，默认可拖拽]
		 * @type {Boolean}
		 */
		_this.dragable = getElementBoolAttrValue(_this.htmlEntity, 'data-dragable') || _this.dragable,

		/**
		 * [identifier 初始化区域标识符属性]
		 * @type {String}
		 */
		_this.identifier = _this.dataEntity.regionmark || '',

		/**
		 * [初始化拖拽对象实例]
		 */
		_this.dragulaEntity = (_this.dragable && dragula([_this.htmlEntity.moduleWrap[0]], {
			removeOnSpill: false, //移出可放置区域外删除
			revertOnSpill: true, //移出可放置区域外重排
			mirrorContainer: _this.htmlEntity.moduleWrap[0],
			moves: function(el, container, handle) { //区域下拥有 data-dragable 属性的元素可拖拽
				return getElementBoolAttrValue($(el), 'data-dragable');
			}
		}));

	/**************************************************************************************我真不想把这个逻辑写在这，相信我**/
	/**
	 * [在布局为 左宽右窄时 设定25%区域下各模块 添加模块 按钮显示位置]
	 */
	if (_this.identifier === 'region_percent_25') {
		(parseInt(_this.pageEntity.layout) === 2) ? _this.htmlEntity.addClass('p25Rig'): _this.htmlEntity.removeClass('p25Rig');
	}

	/**
	 * [在布局为 左宽右窄时 设定75%区域下各模块 添加模块 按钮显示位置]
	 */
	if ((_this.identifier === 'region_percent_75') && (parseInt(_this.pageEntity.layout) === 2)) {
		(parseInt(_this.pageEntity.layout) === 2) ? _this.htmlEntity.addClass('p75Left'): _this.htmlEntity.addClass('p75Left');
	}
	/**************************************************************************************我真不想把这个逻辑写在这，相信我**/

	/**
	 * [注册拖拽对象实例 drop 事件，以实现区域内模块固定定位、更新区域内模块顺序、更新区域内模块“上移”、“上移”按钮显示状态]
	 */
	_this.dragulaEntity && _this.dragulaEntity.on('drop', function(el, target, source, sibling) { //区域下拥有 data-fixed 属性的元素固定

		/**
		 * [_dragulaEntityTemp 拖拽对象实例]
		 * @type {Object}
		 */
		var _dragulaEntityTemp = this;

		/**
		 * [不可将模块拖动到固顶模块的上方]
		 */
		if (getElementBoolAttrValue($(sibling), 'data-fixed-top')) {
			_dragulaEntityTemp.cancel();
			return;
		}

		/**
		 * [不可将模块拖动到固底模块的下方]
		 */
		if (getElementBoolAttrValue($(el).prev(), 'data-fixed-bottom')) {
			_dragulaEntityTemp.cancel();
			return;
		}

		/**
		 * 派发模块顺序变更事件
		 */
		_this.__dispatchEvent('onModuleReposition');

		/**
		 * [更新模块顺序到服务器端]
		 */
		_this.updateModuleSequence();
	});

	/**
	 * 创建区域"添加模块"按钮
	 */
	if (_this.addible) {
		_this.htmlEntity.btnAppendModule = $('<div class="addBannerImg"><a href="javascript:;">添加模块</a></div>').appendTo(_this.htmlEntity);
	}

	/**
	 * 初始化区域下模块对象实例列表
	 */
	_this.htmlEntity.find('[data-module]').each(function(index, element) {

		/**
		 * 实例化模块业务对象并添加到区域下模块对象实例列表
		 */
		_this.moduleList.push(new page_module($(element), _this));
	});

	/**
	 * 刷新模块"上移"、"下移"按钮状态
	 */
	_this.refreshModuleDragView();

	/**
	 * 绑定事件
	 */
	_this.bindEvent();

	/**
	 * [listener 初始化时，需要清空事件监听对象]
	 * @type {Object}
	 */
	_this.listener = {};

	/**
	 * [在删除模块成功时处理相关业务逻辑]
	 */
	_this.addEventListener('onRemoveModuleSuccess', function(moduleEntity) {

		/**
		 * [更新基于用户计数的模块数量]
		 */
		_this.regionModuleMappingEntity.decreaseModuleNum(moduleEntity.identifier);

		/**
		 * 刷新模块"上移"、"下移"按钮状态
		 */
		_this.refreshModuleDragView();

		/**
		 * 刷新页面所有区域添加模块按钮视图
		 */
		_this.pageEntity.refreshAllRegionAppendModuleButtonView();

		/**
		 * [更新模块顺序到服务器端]
		 */
		// _this.updateModuleSequence();
	});

	/**
	 * [在添加模块成功时处理相关业务逻辑]
	 */
	_this.addEventListener('onAppendModuleSuccess', function(moduleEntity) {

		/**
		 * [更新基于用户计数的模块数量]
		 */
		_this.regionModuleMappingEntity.increaseModuleNum(moduleEntity.identifier);

		/**
		 * 刷新页面所有区域添加模块按钮视图
		 */
		_this.pageEntity.refreshAllRegionAppendModuleButtonView();

		/**
		 * [针对模块懒加载的图片进行懒加载初始化，并立刻呈现懒加载图片]
		 */
		$.fn.lazyload && moduleEntity.htmlEntity.find("img[data-original]").lazyload({
			threshold: 0,
			failurelimit: 10,
			container: moduleEntity.htmlEntity,
			skip_invisible: true
		}).trigger('appear');
	});

	/**
	 * [在模块顺序更新成功后处理相关业务逻辑]
	 */
	_this.addEventListener('onUpdateModuleSequenceStart', function() {

		/**
		 * 刷新模块"上移"、"下移"按钮状态
		 */
		_this.refreshModuleDragView();
	});
};

/**
 * [bindEvent 绑定区域相关事件]
 * @return {[type]} [description]
 */
page_region.prototype.bindEvent = function() {
	var _this = this;

	/**
	 * [绑定“添加模块”按钮点击事件]
	 */
	_this.htmlEntity.btnAppendModule && _this.htmlEntity.btnAppendModule.click(function(event) {

		/**
		 * 区域内新增模块
		 */
		_this.appendModule();
	});
};

/**
 * [insertModule 区域内新增模块]
 * @param  {Number} position [模块插入位置]
 */
page_region.prototype.insertModule = function(position) {
	var _this = this,

		/**
		 * [_position 模块插入位置小于0，表示当前模块插入位置]
		 */
		_position = position < 0 ? 0 : position;

	/**
	 * [若模块新增选择框已加载，则直接返回，防止重复加载]
	 */
	if (_this['module-selector-loading']) {
		return;
	}

	/**
	 * 设置模块新增选择框
	 */
	_this['module-selector-loading'] = true;

	/**
	 * [_dialogTemp 显示加载中弹出框]
	 * @type {Object}
	 */
	_dialogTemp = dialog({
		content: '<span class="ui-dialog-loading">加载中..</span>'
	}).show();

	/**
	 * [异步加载新增模块弹出框业务逻辑模块]
	 */
	require.ensure([], function(require) {

		/**
		 * [moduleTemp 业务逻辑模块]
		 * @type {Object}
		 */
		var moduleTemp = require('./page.module.selector');

		/**
		 * 渲染新增模块弹出框
		 */
		new moduleTemp({

			/**
			 * [regionEntity 区域业务对象]
			 * @type {Object}
			 */
			regionEntity: _this,

			/**
			 * [appendModuleCallback 更新DOM结构及模块列表数据回调函数]
			 * @param {[type]} htmlEntity [新模块的DOM元素]
			 */
			appendModuleCallback: function(htmlEntity) {

				/**
				 * [_tempModuleEntity 创建模块对象实例]
				 * @type {page_module}
				 */
				var _tempModuleEntity = new page_module(htmlEntity, _this),

					/**
					 * [_prev 获取插入位置上一个模块]
					 * @type {Object}
					 */
					_prev = _this.moduleList[position - 1],

					/**
					 * [_next 获取插入位置下一个模块]
					 * @type {Object}
					 */
					_next = _this.moduleList[position];

				/**
				 * [添加置顶、置底模块]
				 */
				if (_tempModuleEntity.fixedtop || _tempModuleEntity.fixedbottom) {

					/**
					 * [position 新增置顶模块位置]
					 * @type {Number}
					 */
					_tempModuleEntity.fixedtop && (position = 0);

					/**
					 * [position 新增置底模块位置]
					 * @type {Number}
					 */
					_tempModuleEntity.fixedbottom && (position = _this.moduleList.length);

				}
				/**
				 * 添加非置顶、置底模块
				 */
				else {

					/**
					 * [若上一个模块或下一个模块既固顶且固底则直接返回]
					 */
					if ((_prev && _prev.fixedbottom && _prev.fixedtop) || (_next && _next.fixedbottom && _next.fixedtop)) {
						return;
					}

					/**
					 * [循环获取模块插入位置]
					 *
					 * 若上一个模块固底则插入位置上移，若下一个模块固顶则插入位置下移，直到获取到正确的插入位置
					 */
					while ((_prev && _prev.fixedbottom && (position--)) || (_next && _next.fixedtop && (position++))) {

						/**
						 * [若循环判断后的插入位置为区域顶部或区域底部则直接添加]
						 */
						if ((position === 0) || (position === _this.moduleList.length)) {
							break;
						}
						_prev = _this.moduleList[position - 1],
							_next = _this.moduleList[position];
					}
				}

				/**
				 * 插入新模块DOM元素
				 *
				 * 若下一个模块存在，则基于下一个模块添加新模块的DOM元素。否则，基于包裹元素追加新模块的DOM元素
				 */
				if (_this.moduleList[position]) {
					htmlEntity.insertBefore(_this.moduleList[position].htmlEntity);
				} else {
					_this.htmlEntity.moduleWrap.append(htmlEntity);
				}

				/**
				 * 更新区域模块数据列表
				 */
				_this.moduleList.splice(position, 0, _tempModuleEntity);

				/**
				 * [更新模块顺序到服务器端]
				 */
				_this.updateModuleSequence();

				/**
				 * 派发新增模块成功事件
				 */
				_this.__dispatchEvent('onAppendModuleSuccess', _tempModuleEntity);
			},

			/**
			 * [rendedCallback 渲染完毕回调]
			 */
			rendedCallback: function() {

				/**
				 * 设置模块新增选择框加载完成
				 */
				_this['module-selector-loading'] = false;

				/**
				 * 关闭加载中弹出框
				 */
				_dialogTemp.remove();
			}
		});
	}, 'backend/page.module.selector');
};

/**
 * [appendModule 区域内追加新模块]
 * @return {[type]}         [description]
 */
page_region.prototype.appendModule = function() {
	var _this = this;

	/**
	 * 新模块插入到当前区域的最后位置
	 */
	_this.insertModule(_this.moduleList.length || 0);
};

/**
 * [prependModule 区域内某模块前新增模块]
 * @param  {[type]} module [某模块]
 * @return {[type]}        [description]
 */
page_region.prototype.prependModule = function(module) {
	var _this = this,
		_position = _this.moduleList.indexOf(module);

	/**
	 * [_position 避免当前模块在当前区域的模块列表中不存在的情况]
	 */
	_position = _position < 0 ? 0 : _position;

	/**
	 * 新模块插入到当前模块之前的位置
	 */
	_this.insertModule(_position);
};

/**
 * [removeModule 删除区域内模块]
 * @param  {[type]} moduleEntity [要删除的模块对象实例]
 * @return {[type]}              [description]
 */
page_region.prototype.removeModule = function(moduleEntity, callback) {
	var _this = this,
		_module_list = _this.moduleList,
		_callee = arguments.callee,

		/**
		 * [定义将模块删除的延迟对象]
		 */
		ajaxTemp = $.ajax({
			url: '/detail/turbine/action/DeleteModuleAction/eventsubmit_doDelete/doDelete',
			type: 'POST',
			data: {
				t: Math.random(),
				moduleid: moduleEntity.dataEntity.moduleid
			},
			dataType: 'json'
		});

	/**
	 * [定义延迟对象成功回调函数]
	 */
	ajaxTemp.done(function(json) {

		/**
		 * [若返回数据不正确，则提示服务器端返回的错误信息]
		 */
		if (!parseInt(json.state)) {

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			var boolTemp = callback && callback({
				state: false,
				message: decodeURIComponent(json.message || '')
			});

			/**
			 * [提示模块顺序保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: decodeURIComponent(json.message || '') || '',
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
			return;
		}

		/**
		 * 删除模块DOM结构
		 */
		moduleEntity.htmlEntity.remove();

		/**
		 * 删除模块内存数据
		 */
		var _moduleIndex = _module_list.indexOf(moduleEntity);
		if (_moduleIndex != -1) {
			_module_list.splice(_moduleIndex, 1);
		}

		/**
		 * 派发删除模块成功事件
		 */
		_this.__dispatchEvent('onRemoveModuleSuccess', moduleEntity);

		/**
		 * [执行回调函数]
		 * @type {Boolean}
		 */
		callback && callback({
			state: true,
			message: decodeURIComponent(json.message || '')
		});
	});

	/**
	 * [定义延迟对象失败回调函数]
	 */
	ajaxTemp.fail(function() {

		/**
		 * [执行回调函数]
		 * @type {Boolean}
		 */
		var boolTemp = callback && callback({
			state: false,
			message: '模块删除失败'
		});

		/**
		 * [提示模块顺序保存失败]
		 */
		dialog({
			fixed: true,
			title: '提示',
			content: '模块删除失败',
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
 * [updateModuleSequence 更新区域内模块顺序]
 * @param  {Function} callback [更新后的回调函数]
 * @return {[type]}            [description]
 */
page_region.prototype.updateModuleSequence = function(callback) {
	var _this = this,
		_module_list = _this.moduleList,
		_module_sequence_data = [],
		_callee = arguments.callee;

	/**
	 * 根据页面上的模块顺序，更新内存中模块排序，无论更新成功与否保证内存中的数据与页面表现统一性
	 */
	_module_list.sort(function(moduleA, moduleB) {
		return moduleA.htmlEntity.index() - moduleB.htmlEntity.index();
	});

	/**
	 * [_module_sequence_data 构建传递到服务器端的模块顺序数据]
	 * @type {Array}
	 */
	_module_sequence_data = $.map(_module_list, function(module, moduleIndex) {
		return {
			moduleid: module.dataEntity.moduleid || 0,
			moduleorder: moduleIndex + 1
		};
	});

	/**
	 * 派发模块顺序更新开始事件
	 */
	_this.__dispatchEvent('onUpdateModuleSequenceStart');

	/**
	 * [定义将模块顺序更新到服务器端的延迟对象]
	 */
	var ajaxTemp = $.ajax({
		url: '/detail/turbine/action/RegionModuleSortAction/eventsubmit_doModulesort/doModulesort',
		type: 'GET',
		dataType: 'json',
		data: {
			t: Math.random(),
			modulelist: JSON.stringify(_module_sequence_data)
		}
	});

	/**
	 * [定义延迟对象成功回调函数]
	 */
	ajaxTemp.done(function(json) {

		/**
		 * [若返回数据不正确，则提示服务器端返回的错误信息]
		 */
		if (!json.state) {

			/**
			 * [执行回调函数]
			 * @type {Boolean}
			 */
			callback && callback({
				state: false,
				message: decodeURIComponent(json.message || '')
			});

			/**
			 * [提示模块顺序保存失败]
			 */
			dialog({
				fixed: true,
				title: '提示',
				content: decodeURIComponent(json.message || ''),
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
			return;
		}

		/**
		 * 派发模块顺序更新成功事件
		 */
		_this.__dispatchEvent('onUpdateModuleSequenceSuccess');

		/**
		 * [执行回调函数]
		 * @type {Boolean}
		 */
		callback && callback({
			state: true,
			message: decodeURIComponent(json.message || '')
		});
	});

	/**
	 * [定义延迟对象失败回调函数]
	 */
	ajaxTemp.fail(function() {

		/**
		 * [执行回调函数]
		 * @type {Boolean}
		 */
		var boolTemp = callback && callback({
			state: false,
			message: '模块顺序保存失败'
		});

		/**
		 * [提示模块顺序保存失败]
		 */
		dialog({
			fixed: true,
			title: '提示',
			content: '模块顺序保存失败',
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
 * [shiftUpModule 上移模块]
 */
page_region.prototype.shiftUpModule = function(moduleEntity) {
	var _this = this,

		/**
		 * [_index 获取当前模块在区域中的位置]
		 * @type {Number}
		 */
		_index = _this.moduleList.indexOf(moduleEntity),

		/**
		 * [_prev 获取当前模块上一个模块]
		 * @type {Object}
		 */
		_prev = _this.moduleList[_index - 1];

	/**
	 * [当前模块是区域内第一个模块]
	 */
	if ((_index === -1) || (_index === 0) || (!_prev)) {
		return;
	}

	/**
	 * [当前模块不可移动]
	 */
	if (!_this.dragable) {
		return;
	}

	/**
	 * [当前模块的上一个模块为固顶模块]
	 */
	if (_prev.fixedtop) {
		return;
	}

	/**
	 * 移动当前模块的DOM结构
	 */
	moduleEntity.htmlEntity.insertBefore(_prev.htmlEntity);

	/**
	 * [更新模块顺序到服务器端]
	 */
	_this.updateModuleSequence();

	/**
	 * 派发模块顺序变更事件
	 */
	_this.__dispatchEvent('onModuleReposition');
};

/**
 * [shiftDownModule 下移模块]
 */
page_region.prototype.shiftDownModule = function(moduleEntity) {
	var _this = this,

		/**
		 * [_index 获取当前模块在区域中的位置]
		 * @type {Number}
		 */
		_index = _this.moduleList.indexOf(moduleEntity),

		/**
		 * [_next 获取当前模块下一个模块]
		 * @type {Object}
		 */
		_next = _this.moduleList[_index + 1];

	/**
	 * [当前模块是区域内最后一个模块]
	 */
	if ((_index === -1) || (_this.moduleList.length === (_index + 1)) || (!_next)) {
		return;
	}

	/**
	 * [当前模块不可移动]
	 */
	if (!_this.dragable) {
		return;
	}

	/**
	 * [当前模块的上一个模块为固顶模块]
	 */
	if (_next.fixedbottom) {
		return;
	}

	/**
	 * 移动当前模块的DOM结构
	 */
	moduleEntity.htmlEntity.insertAfter(_next.htmlEntity);

	/**
	 * [更新模块顺序到服务器端]
	 */
	_this.updateModuleSequence();

	/**
	 * 派发模块顺序变更事件
	 */
	_this.__dispatchEvent('onModuleReposition');
};

/**
 * [refreshModuleView 刷新模块"上移"、"下移"按钮状态]
 */
page_region.prototype.refreshModuleDragView = function() {
	var _this = this;

	/**
	 * [设置区域内模块"上移"、"下移"按钮状态]
	 */
	$.each(_this.moduleList, function(moduleIndex, module) {

		/**
		 * 重置当前模块"上移"、"下移"按钮状态
		 */
		module.htmlEntity.btnUp && module.htmlEntity.btnUp.show();
		module.htmlEntity.btnDown && module.htmlEntity.btnDown.show();

		/**
		 * [模块在顶部时，隐藏"上移"按钮]
		 */
		if (moduleIndex === 0) {
			module.htmlEntity.btnUp && module.htmlEntity.btnUp.hide();
		}
		/**
		 * [若当前模块的上一个模块为固顶模块，隐藏"上移"按钮]
		 */
		else {
			var prevModule = _this.moduleList[moduleIndex - 1];
			if (prevModule && prevModule.fixedtop) {
				module.htmlEntity.btnUp && module.htmlEntity.btnUp.hide();
			}
		}

		/**
		 * [模块在底部时，隐藏"下移"按钮]
		 */
		if (_this.moduleList.length === (moduleIndex + 1)) {
			module.htmlEntity.btnDown && module.htmlEntity.btnDown.hide();
		}
		/**
		 * [若当前模块的下一个模块为固顶模块，隐藏"上移"按钮]
		 */
		else {
			var nextModule = _this.moduleList[moduleIndex + 1];
			if (nextModule && nextModule.fixedbottom) {
				module.htmlEntity.btnDown && module.htmlEntity.btnDown.hide();
			}
		}
	});
};

/**
 * [__getEventListener 获取指定事件类型的事件处理函数列表]
 * @param  {String} eventType [事件类型]
 * @return {Array}           [事件处理函数列表]
 */
page_region.prototype.__getEventListener = function(eventType) {
	var _this = this;
	_this.listener[eventType] = _this.listener[eventType] ? _this.listener[eventType] : [];
	return _this.listener[eventType];
};

/**
 * [__dispatchEvent 派发事件]
 */
page_region.prototype.__dispatchEvent = function() {
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
page_region.prototype.removeEventListener = function(eventType, eventHandler) {
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
page_region.prototype.addEventListener = function(eventTypes, eventHandler) {
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

module.exports = page_region;