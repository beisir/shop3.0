/**
 * [page_index_config_set 首页面配置模拟数据集合]
 * @type {Object}
 */
var page_index_config_set = {

	/**
	 * [region_list 区域列表]
	 * @type {Array}
	 */
	region_list: [

		/**
		 * 招牌导航区域
		 */
		{
			selector: $('.conListNew').parent('div'),
			attributes: {
				'data-region': {
					'regionmark': 'region_sign_navigation'
				}
			}
		},

		/**
		 * 全屏广告区域
		 */
		{
			selector: $('.bannerBoxNew').parent('div'),
			attributes: {
				'data-region': {
					'regionmark': 'region_full_screen'
				}
			}
		},

		/**
		 * 顶部通栏区域
		 */
		{
			selector: $('.hotBox'),
			attributes: {
				'data-region': {
					'regionmark': 'region_top_banner'
				}
			}
		},

		/**
		 * 搜索栏区域
		 */
		{
			selector: $('.BoxContent'),
			attributes: {
				'data-region': {
					'regionmark': 'region_crumbs'
				}
			}
		},

		/**
		 * 25%区域
		 */
		{
			selector: $('.proBox25left'),
			attributes: {
				'data-region': {
					'regionmark': 'region_percent_25'
				}
			}
		},

		/**
		 * 75%区域
		 */
		{
			selector: $('.proBox75Rig'),
			attributes: {
				'data-region': {
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 底部通栏区域
		 */
		{
			selector: $('.newProBox').eq(3),
			attributes: {
				'data-region': {
					'regionmark': 'region_bottom_banner'
				}
			}
		}
	],
	/**
	 * [module_list 模块列表]
	 * @type {Array}
	 */
	module_list: [

		/**
		 * 宽屏广告模块
		 */
		{
			selector: $('.bannerBoxNew'),
			attributes: {
				'data-module': {
					'modulemark': 'module_ads',
					'regionmark': 'region_full_screen',
					'data': {
						'type': 1, //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
						'transition': 2, //过渡效果类型
						'pause': 3000 //事件间隔，翻页图片配置，单位ms
					}
				}
			}
		},

		/**
		 * 面包屑（搜索）模块
		 */
		{
			selector: $('.proSearch'),
			attributes: {
				'data-module': {
					'modulemark': 'module_crumbs',
					'regionmark': 'region_crumbs'
				}
			}
		},

		/**
		 * 公司介绍模块 25%区域
		 */
		{
			selector: $('.proBox25left .columnbox:eq(1)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_company_intro',
					'regionmark': 'region_percent_25'
				}
			}
		},

		/**
		 * 公司介绍模块 75%区域
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(0)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_company_intro',
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 产品分类模块 25%区域
		 */
		{
			selector: $('.proBox25left .columnbox:eq(7)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_prod_classify',
					'regionmark': 'region_percent_25'
				}
			}
		},

		/**
		 * 产品分类模块 75%区域
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(5)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_prod_classify',
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 产品橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(8),.proBox75Rig .columnbox:eq(6)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_prod_window',
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 相册橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(4),.proBox75Rig .columnbox:eq(7)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_album_window',
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 通栏产品模块
		 */
		{
			selector: $('.hotProBox'),
			attributes: {
				'data-module': {
					'modulemark': 'module_banner_products',
					'regionmark': 'region_top_banner',
					'data': {
						'type': 2, //1：平铺展示，2：滚动展示
					}
				}
			}
		},

		/**
		 * 企业档案模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(0)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_company_files',
					'regionmark': 'region_percent_25',
				}
			}
		},

		/**
		 * 扩展橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(9),.proBox75Rig .columnbox:eq(9)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_extend_window',
					'regionmark': 'region_percent_75'
				}
			}
		},

		/**
		 * 自定义内容模块
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(12)'),
			attributes: {
				'data-module': {
					'modulemark': 'module_custom',
					'regionmark': 'region_percent_75'
				}
			}
		}
	]
};
/**
 * [page_column_config_set 二级页面配置模拟数据集合]
 * @type {Object}
 */
var page_column_config_set = {
	/**
	 * [region_list 区域列表]
	 * @type {Array}
	 */
	region_list: [
		/**
		 * 25%区域
		 */
		{
			selector: $('.proBox25left'),
			attributes: {
				'data-region': {
					'regionmark': 'region_percent_25'
				}
			}
		}
	],
	/**
	 * [module_list 模块列表]
	 * @type {Array}
	 */
	module_list: [
	]
};
/**
 * [page_config_init 初始化页面配置]
 * @return {[type]} [description]
 */
function page_config_init(param) {
	var configParam = (param && param == "column") ? page_column_config_set : page_index_config_set;
	for (var p in configParam) {
		var jsonObj = configParam[p];
		$.each(jsonObj, function(i, k) {
			var location = k.selector;
			for (var m in k.attributes) {
				var dataValue = (k.attributes)[m];
				if (typeof dataValue == "object") {
					dataValue = JSON.stringify(dataValue);
				}
				location.attr(m, dataValue);
			}
		})
	}
}
module.exports = page_config_init;