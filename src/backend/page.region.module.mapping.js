/**
 * [模块级别枚举项列表、模块相关枚举项列表、模块配置信息数据集、区域模块组态配置信息业务逻辑对象]
 * @type {Object}
 */
function region_module_mapping(options) {
	var _this = this;

	/**
	 * 扩展业务对象实例属性
	 */
	$.extend(true, _this, {

		/**
		 * [moduleLevelList 模块级别枚举项列表]
		 * @type {Array}
		 */
		levelList: [{
			name: '普通模块', //模块等级名称
			val: 1 //模块等级编号
		}, {
			name: '高级模块',
			val: 2
		}],

		/**
		 * [userLevelList 用户级别列表]
		 * @type {Array}
		 */
		userLevelList: {
			'all': {
				name: '免费会员',
			},
			'mmt': {
				name: '收费会员'
			},
			'syt': {
				name: '商盈通'
			}
		},

		/**
		 * [relateList 模块相关枚举项列表]
		 * @type {Array}
		 */
		relateList: [{
			name: '全部模块', //模块相关名称
			val: 0 //模块相关编号
		}, {
			name: '公司相关',
			val: 1
		}, {
			name: '产品相关',
			val: 2
		}, {
			name: '广告相关',
			val: 3
		}],

		/**
		 * [moduleList 模块配置信息数据集]
		 * @type {Array}
		 */
		moduleList: [{
			name: '公司介绍', //模块名称
			identifier: 'module_company_intro', //模块标识符
			description_template: '展示公司信息，让买家了解企业实力。', //模块描述模板，此字段中的特殊标记会替换成指定数据并赋值给 description 字段
			description: '', //模块描述
			icon: 'gsAddIco1', //模块图标样式类
			relate: 1, //模块相关枚举值
			level: 1, //模块级别枚举值
			maximum: 1 //模块数量上限
		}, {
			name: '公司动态',
			identifier: 'module_company_dynamic',
			description_template: '展示公司新闻、公司动态。',
			description: '',
			icon: 'gsAddIco2',
			relate: 1,
			level: 1,
			maximum: 1
		}, {
			name: '友情链接',
			identifier: 'module_friendship_link',
			description_template: '展示友情链接网站列表。',
			description: '',
			icon: 'gsAddIco3',
			relate: 1,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1
		}, {
			name: '联系我们',
			identifier: 'module_contact_us',
			description_template: '展示公司联系方式方便买家联系到您。',
			description: '',
			icon: 'gsAddIco4',
			relate: 1,
			level: 1,
			maximum: 1
		}, {
			name: '客户留言',
			identifier: 'module_feedback',
			description_template: '展示买家留言信息列表。',
			description: '',
			icon: 'gsAddIco5',
			relate: 1,
			level: 1,
			maximum: 1
		}, {
			name: '最新供应',
			identifier: 'module_latest_supply',
			description_template: '添加供应产品。',
			description: '',
			icon: 'cpAddIco1',
			relate: 2,
			level: 1,
			maximum: 1
		}, {
			name: '产品分类',
			identifier: 'module_prod_classify',
			description_template: '展示产品分类列表，方便买家浏览产品。',
			description: '',
			icon: 'cpAddIco2',
			relate: 2,
			level: 1,
			maximum: 1
		}, {
			name: '产品橱窗',
			identifier: 'module_prod_window',
			description_template: '手动推荐产品至橱窗内，可优先展示优质产品。',
			description: '',
			icon: 'cpAddIco3',
			relate: 2,
			level: 1,
			maximum: 1
		}, {
			name: '相册橱窗',
			identifier: 'module_album_window',
			description_template: '手动推荐相册至橱窗内，动态展示相册。',
			description: '',
			icon: 'cpAddIco4',
			relate: 2,
			level: 1,
			maximum: 1
		}, {
			name: '公司相册',
			identifier: 'module_company_album',
			description_template: '展示相册列表。',
			description: '',
			icon: 'cpAddIco5',
			relate: 2,
			level: 1,
			maximum: 1
		}, {
			name: '扩展广告',
			identifier: 'module_banner_ads',
			description_template: '添加商铺首页扩展广告，最多添加 #NUM_LIMIT# 个扩展广告模块，已添加 #NUM# 个',
			description: '',
			icon: 'ggAddIco1',
			relate: 3,
			level: 1,
			maximum: 3,
			maximum_scope: 'page'
		}, {
			name: '信誉证书',
			identifier: 'module_certificate',
			description_template: '上传信誉证书，展示企业实力',
			description: '',
			icon: 'gsAdd2Ico1',
			relate: 1,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1
		}, {
			name: '买卖通档案',
			identifier: 'module_mmt_archives',
			description_template: '展示信誉记录，体现企业实力',
			description: '',
			icon: 'gsAdd2Ico2',
			relate: 1,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1
		}, {
			name: '自定义内容',
			identifier: 'module_custom',
			description_template: '个性定制栏目内容',
			description: '',
			icon: 'gsAdd2Ico4',
			relate: 1,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1,
			simulatedlogin: true
		}, {
			name: '扩展橱窗',
			identifier: 'module_extend_window',
			description_template: '可最多添加 #NUM_LIMIT# 个产品展示橱窗和使用多个橱窗特效，已添加 #NUM# 个',
			description: '',
			icon: 'cpAdd2Ico1',
			relate: 2,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 5,
			maximum_scope: 'page',

			/**
			 * [getNum 获取指定范围内当前模块已添加数量。扩展橱窗模块区别于其他模块，它的模块数量限制是基于用户的，也就是说一个用户添加该模块的数量是一定的，所有由后端初始化当前已添加该模块数量。]
			 * @param  {String} scope [指定范围内的模块数量]
			 * @return {Number}       [指定范围内模块数量]
			 */
			getNum: function() {
				return window.globalData.windowuplimit || 0;
			},

			/**
			 * [setNum 设置当前模块已添加数量]
			 * @param {String} scope [指定范围内的模块数量]
			 * @param {Number} num   [模块数量]
			 */
			setNum: function(num) {
				window.globalData.windowuplimit = Number(num) || 0;
			}
		}, {
			name: '专业橱窗',
			identifier: 'module_prof_window',
			description_template: '展示产品专业化参数，便于用户更全面了解产品',
			description: '',
			icon: 'cpAdd2Ico2',
			relate: 2,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1
		}, {
			name: '通栏产品',
			identifier: 'module_banner_products',
			description_template: '显示在商铺首页通栏处，最多添加 #NUM_LIMIT# 个通栏产品模块，已添加 #NUM# 个。',
			description: '',
			icon: 'cpAddIco6',
			relate: 2,
			level: 1,
			maximum: 5,
			maximum_scope: 'page'
		}, {
			name: '宽屏广告',
			identifier: 'module_ads',
			description_template: '添加商铺首页主题广告',
			description: '',
			icon: 'ggAdd2Ico1',
			relate: 3,
			level: 2,
			userlevel: ['mmt', 'syt'],
			maximum: 1,
			maximum_scope: 'page'
		}, {
			name: '扩展广告',
			identifier: 'module_banner_widescreen_ads',
			description_template: '添加商铺首页扩展广告，最多添加 #NUM_LIMIT# 个扩展广告模块，已添加 #NUM# 个',
			description: '',
			icon: 'ggAddIco1',
			relate: 3,
			level: 2,
			userlevel: ['syt'],
			maximum: 3
		}, {
			name: '自定义内容',
			identifier: 'module_widescreen_custom',
			description_template: '个性定制栏目内容',
			description: '',
			icon: 'gsAdd2Ico4',
			relate: 1,
			level: 2,
			userlevel: ['syt'],
			maximum: 3,
			simulatedlogin: true
		}],

		/**
		 * [regionModuleConfiguration 区域模块组态配置信息数据集]
		 * @type {Object}
		 */
		regionModuleConfiguration: {

			/**
			 * 招牌导航区
			 */
			'region_sign_navigation': [
				'module_sign', //招牌模块
				'module_navigation' //导航模块
			],

			/**
			 * 商盈通全屏广告区
			 */
			'region_full_widescreen': [
				'module_banner_widescreen_ads', //宽屏扩展广告模块
				'module_widescreen_custom' //宽屏自定义模块
			],

			/**
			 * 全屏广告区
			 */
			'region_full_screen': [
				'module_ads' //全屏广告模块
			],

			/**
			 * 顶部通栏区
			 */
			'region_top_banner': [
				'module_banner_ads', //通栏广告模块/扩展广告模块
				'module_banner_products' //通栏产品模块
			],

			/**
			 * 搜索栏区
			 */
			'region_crumbs': [
				'module_crumbs' //搜索栏模块/面包屑模块
			],

			/**
			 * 25%区
			 */
			'region_percent_25': [
				'module_company_intro', //公司介绍模块
				'module_company_dynamic', //公司动态模块
				'module_prod_window', //产品橱窗模块
				'module_latest_supply', //最新供应模块
				'module_prod_classify', //产品分类模块
				'module_company_album', //公司相册模块
				'module_album_window', //相册橱窗模块
				'module_contact_us', //联系我们模块
				'module_feedback', //客户留言模块
				'module_custom', //自定义内容模块（ 收费用户）
				'module_certificate', //信誉证书模块（ 收费用户）
				'module_extend_window', //扩展橱窗模块（ 收费用户）
				'module_mmt_archives' //买卖通档案模块（ 收费用户）
			],

			/**
			 * 75%区
			 */
			'region_percent_75': [
				'module_company_intro', //公司介绍模块
				'module_company_dynamic', //公司动态模块
				'module_prod_window', //产品橱窗模块
				'module_latest_supply', //最新供应模块
				'module_prod_classify', //产品分类模块
				'module_company_album', //公司相册模块
				'module_album_window', //相册橱窗模块
				'module_contact_us', //联系我们模块
				'module_feedback', //客户留言模块
				'module_certificate', //信誉证书模块（ 收费用户）
				'module_prof_window', //专业橱窗模块（ 收费用户）
				'module_custom', //自定义内容模块（ 收费用户）
				'module_extend_window' //扩展橱窗模块（ 收费用户）
			],

			/**
			 * 底部通栏区
			 */
			'region_bottom_banner': [
				'module_banner_ads', //扩展广告模块
				'module_friendship_link' //友情链接模块
			]
		}
	}, options || {});

	/**
	 * 初始化业务逻辑对象
	 */
	region_module_mapping.prototype.init.call(_this);
}

/**
 * [init 初始化业务逻辑对象]
 * @return {[type]} [description]
 */
region_module_mapping.prototype.init = function() {
	var _this = this;

	/**
	 * [moduleList 扩展模块默认属性]
	 */
	for (var i = 0; i < _this.moduleList.length; i++) {

		/**
		 * [为模块添加默认属性]
		 */
		_this.moduleList[i] = $.extend({
			maximum_scope: 'region', //模块数量上限范围，默认为区域
			simulatedlogin: false, //模块是否仅模拟登陆用户可用
			limit_maximum: true, //是否未超过数量上限
			limit_scope: true, //是否当前区域可添加的模块
			limit_authority: true, //是否当前会员可添加的模块
			limit_simulatedlogin: true, //是否当前会员可添加的模块，该判断条件由模块的 module.simulatedlogin && (!_this.regionEntity.pageEntity.issimulated) 表达式而来
			cancellable: false, //是否可撤销当前模块
			message: [] //不可操作当前模块的原因
		}, _this.moduleList[i]);
	}
};

/**
 * [analyticPageModuleData 解析页面模块数据对象]
 * @param  {Object} pageEntity   [页面业务对象]
 * @param  {Object} regionEntity [区域业务对象，该对象指定后只会解析该区域下的模块属性]
 * @return {Object}              [模块数据对象]
 */
region_module_mapping.prototype.analyticPageModuleData = function(pageEntity, regionEntity) {
	var _this = this,

		/**
		 * [_module_num 模块数量数据对象]
		 * @type {Object}
		 */
		_module_num = {

			/**
			 * [page 页面各模块数量]
			 * @type {Object}
			 */
			page: {},

			/**
			 * [regions 各区域下各模块数量]
			 * @type {Object}
			 */
			regions: {}
		},

		/**
		 * [_module_config_data 模块配置数据]
		 * @type {Object}
		 */
		_module_config_data = {};

	/**
	 * [初始化模块数量数据]
	 */
	$.each(pageEntity.regionList || [], function(_regionIndex, _regionEntity) {

		/**
		 * [填充模块数量数据]
		 */
		$.each(_regionEntity.moduleList, function(_moduleIndex, _moduleEntity) {

			/**
			 * 累计页面指定类型模块数量
			 */
			_module_num.page[_moduleEntity.identifier] ? _module_num.page[_moduleEntity.identifier]++ : _module_num.page[_moduleEntity.identifier] = 1;

			/**
			 * 累计各区域指定类型模块数量
			 */
			_module_num.regions[_regionEntity.identifier] = _module_num.regions[_regionEntity.identifier] ? _module_num.regions[_regionEntity.identifier] : {};
			_module_num.regions[_regionEntity.identifier][_moduleEntity.identifier] ? _module_num.regions[_regionEntity.identifier][_moduleEntity.identifier]++ : _module_num.regions[_regionEntity.identifier][_moduleEntity.identifier] = 1;
		});
	});

	/**
	 * [根据模块数量数据初始化模块配置数据]
	 */
	$.each(pageEntity.regionList, function(_regionIndex, _regionEntity) {

		/**
		 * [若指定了区域业务对象，则只返回该区域的模块配置数据]
		 */
		if (regionEntity && (regionEntity.identifier !== regionEntity.identifier)) {
			return true;
		}

		/**
		 * [_tempModuleList 创建当前区域的所有模块配置信息数据集临时对象]
		 * @type {Array}
		 */
		_module_config_data[_regionEntity.identifier] = $.extend(true, [], _this.moduleList);
		var _tempModuleList = _module_config_data[_regionEntity.identifier],

			/**
			 * [_tempModuleNum 初始化当前区域下所有模块数量]
			 * @type {Array}
			 */
			_tempModuleNum = $.extend(true, {}, _module_num, {
				region: _module_num.regions[_regionEntity.identifier] || []
			});

		/**
		 * [初始化所有模块在当前区域的是否超过数量上限、是否非当前区域可添加的模块、是否非当前会员可添加的模块属性]
		 */
		$.each(_tempModuleList, function(_moduleIndex, _moduleEntity) {

			/**
			 * 设置模块是否可以添加到当前区域
			 */
			if ((_this.regionModuleConfiguration[_regionEntity.identifier] || []).indexOf(_moduleEntity.identifier) === -1) {
				_moduleEntity.limit_scope = false;
			}

			/**
			 * 若当前模块对用户级别有要求
			 */
			if (_moduleEntity.userlevel) {
				var _syt = !!((_moduleEntity.userlevel.indexOf('syt') != -1) && _regionEntity.pageEntity.issyt),
					_mmt = !!((_moduleEntity.userlevel.indexOf('mmt') != -1) && _regionEntity.pageEntity.ismmt);
				_moduleEntity.limit_authority = _syt || _mmt;
				if (!_moduleEntity.limit_authority) {
					(!_syt) ? _moduleEntity.message.push('保存失败，请升级为商营通会员后使用！'): _moduleEntity.message.push('保存失败，请升级成为收费会员后使用！');
				}
			}

			/**
			 * [设置当前模块是否仅模拟登陆用户可用]
			 */
			if (_moduleEntity.simulatedlogin && (!_regionEntity.pageEntity.issimulated)) {
				_moduleEntity.limit_simulatedlogin = false;
				_moduleEntity.message.push('当前模块只可在模拟登陆时操作！');
			}

			/**
			 * [limit_maximum 根据当前模块指定范围的数量上限设置当前模块是否还可继续向当前区域添加。如果该模块有自定义的获取数量回调函数，则通过该回调函数获取模块数量]
			 * @type {Boolean}
			 */
			var tempNum = _tempModuleNum[_moduleEntity.maximum_scope][_moduleEntity.identifier] || 0;
			tempNum = (_moduleEntity.getNum && Object.prototype.toString.call(_moduleEntity.getNum) === '[object Function]') ? _moduleEntity.getNum.call(null) : tempNum;
			_moduleEntity.limit_maximum = (tempNum < _moduleEntity.maximum);

			/**
			 * [cancellable 设置当前模块是否可撤销 区域内当前模块数量为1且模块数量上限为1]
			 * @type {Boolean}
			 */
			_moduleEntity.cancellable = (((_tempModuleNum.region[_moduleEntity.identifier] || 0) === 1) && (_moduleEntity.maximum === 1));

			/**
			 * [更新当前模块数量上限及已添加数量]
			 * @type {String}
			 */
			_moduleEntity.description = _moduleEntity.description_template.replace(/#NUM_LIMIT#/ig, _moduleEntity.maximum).replace(/#NUM#/ig, tempNum);

			/**
			 * [enabled 设置模块可用状态]
			 * @type {Boolean}
			 */
			_moduleEntity.enabled = (_moduleEntity.limit_maximum && _moduleEntity.limit_authority && _moduleEntity.limit_scope && _moduleEntity.limit_simulatedlogin);
		});
	});

	/**
	 * 返回模块配置数据
	 */
	return regionEntity ? _module_config_data[regionEntity.identifier] : _module_config_data;
};

/**
 * [increaseModuleNum 递增模块数量]
 * @param  {String} moduleIdentifier [模块标识符]
 */
region_module_mapping.prototype.increaseModuleNum = function(moduleIdentifier) {
	var _this = this;
	for (var i = 0; i < _this.moduleList.length; i++) {
		if (_this.moduleList[i].identifier === moduleIdentifier) {
			if (_this.moduleList[i].setNum && _this.moduleList[i].getNum && Object.prototype.toString.call(_this.moduleList[i].setNum) === '[object Function]' && Object.prototype.toString.call(_this.moduleList[i].getNum) === '[object Function]') {
				_this.moduleList[i].setNum.call(null, ((parseInt(_this.moduleList[i].getNum.call(null)) || 0) + 1));
			}
			break;
		}
	}
};

/**
 * [decreaseModuleNum 递减模块数量]
 * @param  {String} moduleIdentifier [模块标识符]
 */
region_module_mapping.prototype.decreaseModuleNum = function(moduleIdentifier) {
	var _this = this;
	for (var i = 0; i < _this.moduleList.length; i++) {
		if (_this.moduleList[i].identifier === moduleIdentifier) {
			if (_this.moduleList[i].setNum && _this.moduleList[i].getNum && Object.prototype.toString.call(_this.moduleList[i].setNum) === '[object Function]' && Object.prototype.toString.call(_this.moduleList[i].getNum) === '[object Function]') {
				_this.moduleList[i].setNum.call(null, ((parseInt(_this.moduleList[i].getNum.call(null)) || 0) - 1));
			}
			break;
		}
	}
};

/**
 * [exports 导出业务对象]
 * @type {Function}
 */
module.exports = region_module_mapping;