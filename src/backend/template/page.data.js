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
				'data-addible': false,
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
				'data-addible': false,
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
				'data-addible': true,
				'data-region': {
					'regionmark': 'region_top_banner'
				}
			}
		},

		/**
		 * 搜索栏区域
		 */
		{
			selector: $('.BoxContent').parent('div'),
			attributes: {
				'data-addible': false,
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
				'data-addible': true,
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
				'data-addible': true,
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
				'data-addible': true,
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
		 * 招牌模块
		 */
		{
			selector: $('.conListNew'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': false,
				'data-addible': false,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 1,
					'modulemark': 'module_sign',
					'regionmark': 'region_sign_navigation',
					'data': {
						'logourl': '//www.hc360.com/1.jpg', //公司LOGO地址
						'companyname': 'display:none;font-family:黑体;font-size:14;font-weight:bold;font-style:italic;color:#565643;', //公司名称
						'backgroundurl': 'background:url(//www.hc360.com/1.jpg)' //背景图片地址
					}
				}
			}
		},

		/**
		 * 导航模块
		 */
		{
			selector: $('.proNavBox'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': false,
				'data-addible': false,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 2,
					'modulemark': 'module_navigation',
					'regionmark': 'region_sign_navigation',
					'data': {
						'button': {
							'selected': 'font-family:黑体;font-size:12px;font-weight:bold;font-style:italic;color:#588995;border-color:#a966f3;border:1px dashed;background:url(//www.hc360.com/1.jpg);',
							'unselected': 'font-family:黑体;font-size:14px;font-weight:bold;font-style:italic;color:#a966f3;border-color:#0dc9a8;border:1px dashed;'
						},
						'background': 'background:url(//www.hc360.com/1.jpg)' //背景图片地址
					}
				}
			}


		},

		/**
		 * 宽屏广告模块
		 */
		{
			selector: $('.bannerBoxNew'),
			attributes: {
				'data-configurable': true,
				'data-dragable': false,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-module': {
					'moduleid': 11,
					'modulemark': 'module_ads',
					'regionmark': 'region_full_screen',
					'data': {
						'type': 2, //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
						'piclist': [{ //翻页图片数据列表，翻页图片配置
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}, {
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}, {
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}],
						'prolist': [{ //产品轮播图片数据列表
							'bcid': 1, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 2, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 3, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 3, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}],
						'transition': 2, //过渡效果类型
						'pause': 3000 //事件间隔，翻页图片配置，单位ms
					}
				}
			}

		},

		/**
		 * 宽屏广告模块（产品轮播）
		 */
		{
			selector: $('.proCarousel'),
			attributes: {
				'data-configurable': true,
				'data-dragable': false,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-module': {
					'moduleid': 11,
					'modulemark': 'module_ads',
					'regionmark': 'region_full_screen',
					'data': {
						'type': 2, //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
						'piclist': [{ //翻页图片数据列表，翻页图片配置
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}, {
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}, {
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/banner.jpg',
							'linkurl': '//www.hc360.com'
						}],
						'prolist': [{ //产品轮播图片数据列表
							'bcid': 1, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 2, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 3, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						},{ //产品轮播图片数据列表
							'bcid': 3, //商机编号
							'bcname': 'title1', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/bImg1.png',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}],
						'transition': 2, //过渡效果类型
						'pause': 3000 //事件间隔，翻页图片配置，单位ms
					}
				}
			}

		},

		/**
		 * 通栏广告模块
		 */
		{
			selector: $('.proImgBox'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 61,
					'modulemark': 'module_banner_ads',
					'regionmark': 'region_bottom_banner',
					'data': {
						'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/pImg1.png', //图片地址
						'linkurl': '//www.hc360.com' //链接地址
					}
				}
			}
		},

		/**
		 * 通栏产品模块
		 */
		{
			selector: $('.hotProBox'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 15,
					'modulemark': 'module_banner_products',
					'regionmark': 'region_top_banner',
					'data': {
						'title': '标题',
						'showTitleAndBorder': false, //是否显示标题和边框
						'type': 1, //1：平铺展示，2：滚动展示,
						'prolist': [{ //产品图片数据列表
							'bcid': 34567890, //商机编号
							'bcname': '商机标题', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/proImg.jpg',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}],
						'picsize': 3 //1：大图（300x300）最多显示12个产品，2：中图（210x210）最多显示16个产品，3：小图（170x170）最多显示20个产品
					}
				}
			}
		},

		/**
		 * 扩展橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(9),.proBox75Rig .columnbox:eq(9)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 63,
					'modulemark': 'module_extend_window',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true, //是否显示标题和边框
						'prolist': [{ //产品图片数据列表
							'bcid': 1, //商机编号
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/proImg.jpg',
							'bcname': 'title1',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}, { //产品图片数据列表
							'bcid': 2, //商机编号
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/proImg.jpg',
							'bcname': 'title2',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}]
					}
				}
			}
		},

		/**
		 * 专业橱窗模块
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(11)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 100,
					'modulemark': 'module_prof_window',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': false, //是否显示标题和边框
						'supercatid': 123456745, //终极类目id
						'prolist': [{ //产品图片数据列表
							'bcid': 1234, //商机编号
							'bcname': '商机标题', //商机标题
							'picurl': '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/proImg.jpg',
							'linkurl': '//www.hc360.com',
							'deleted': 0 //用于判断该商品是否已删除,0：未删除，1：已删除
						}],
						'paramlist': [ //参数列表
							{
								"id": "121",
								"name": "产地",
								"fieldname": "origin",
								"type": "1"
							}, {
								"id": "122",
								"name": "颜色",
								"fieldname": "color",
								"type": "1"
							}, {
								"id": "123",
								"name": "面料",
								"fieldname": "style",
								"type": "2"
							}, {
								"id": "124",
								"name": "裙长",
								"fieldname": "SkirtLength",
								"type": "1"
							}
						]
					}
				}
			}
		},

		/**
		 * 自定义内容模块
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(12)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 116,
					'modulemark': 'module_custom',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true, //是否显示标题和边框
						'content': '<strong>HTML内容</strong>' //编辑内容
					}
				}
			}
		},

		/**
		 * 信誉证书模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(11),.proBox75Rig .columnbox:eq(10)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 57,
					'modulemark': 'module_certificate',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true, //是否显示标题和边框
						'type': 1 //显示设置，即边框设置，1：边框效果1，2：边框效果2，3：边框效果3
					}
				}
			}
		},

		/**
		 * 公司介绍模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(1),.proBox75Rig .columnbox:eq(0)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 19,
					'modulemark': 'module_company_intro',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 公司动态模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(2),.proBox75Rig .columnbox:eq(1)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 25,
					'modulemark': 'module_company_dynamic',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 友情链接模块
		 */
		{
			selector: $('.fLink'),
			attributes: {
				'data-configurable': true,
				'data-dragable': false,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': true,
				'data-module': {
					'moduleid': 105,
					'modulemark': 'module_friendship_link',
					'regionmark': 'region_bottom_banner',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 联系我们模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(6),.proBox75Rig .columnbox:eq(2)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 49,
					'modulemark': 'module_contact_us',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 客户留言模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(5),.proBox75Rig .columnbox:eq(3)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 51,
					'modulemark': 'module_feedback',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 最新供应模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(3),.proBox75Rig .columnbox:eq(4)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 33,
					'modulemark': 'module_latest_supply',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 产品分类模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(7),.proBox75Rig .columnbox:eq(5)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 37,
					'modulemark': 'module_prod_classify',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 产品橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(8),.proBox75Rig .columnbox:eq(6)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 29,
					'modulemark': 'module_prod_window',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 相册橱窗模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(4),.proBox75Rig .columnbox:eq(7)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 43,
					'modulemark': 'module_album_window',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 公司相册模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(10),.proBox75Rig .columnbox:eq(8)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 41,
					'modulemark': 'module_company_album',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 买卖通档案模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(12)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 101,
					'modulemark': 'module_mmt_archives',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
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
				'data-configurable': true,
				'data-dragable': false,
				'data-deletable': false,
				'data-addible': false,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 3,
					'modulemark': 'module_crumbs',
					'regionmark': 'region_crumbs',
					'data': {
						'font': 'color:#ddd;',
						'background': 'background-color:#ddd;'
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
				'data-configurable': false,
				'data-dragable': false,
				'data-deletable': false,
				'data-addible': false,
				'data-fixed-top': true,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 2004,
					'modulemark': 'module_company_files',
					'regionmark': 'region_percent_25',
					'data': {

					}
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
				'data-addible': true,
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
				'data-addible': false,
				'data-dragable': false,
				'data-region': {
					'regionmark': 'region_percent_75'
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
		 * 公司介绍模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(1),.proBox75Rig .columnbox:eq(0)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 21,
					'modulemark': 'module_company_intro',
					'regionmark': 'region_percent_75',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 公司动态模块
		 */
		/*{
			selector: $('.proBox25left .columnbox:eq(2)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 1002,
					'modulemark': 'module_company_dynamic',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},*/

		/**
		 * 联系我们模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(6)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 1004,
					'modulemark': 'module_contact_us',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},

		/**
		 * 客户留言模块
		 */
		/*{
			selector: $('.proBox25left .columnbox:eq(5)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 53,
					'modulemark': 'module_feedback',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},*/

		/**
		 * 买卖通档案模块
		 */
		/*{
			selector: $('.proBox25left .columnbox:eq(12)'),
			attributes: {
				'data-configurable': true,
				'data-dragable': true,
				'data-deletable': true,
				'data-addible': true,
				'data-fixed-top': false,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 2002,
					'modulemark': 'module_mmt_archives',
					'regionmark': 'region_percent_25',
					'data': {
						'title': '标题',
						'showTitleAndBorder': true //是否显示标题和边框
					}
				}
			}
		},*/

		/**
		 * 企业档案模块
		 */
		{
			selector: $('.proBox25left .columnbox:eq(0)'),
			attributes: {
				'data-configurable': false,
				'data-dragable': false,
				'data-deletable': false,
				'data-addible': false,
				'data-fixed-top': true,
				'data-fixed-bottom': false,
				'data-module': {
					'moduleid': 2004,
					'modulemark': 'module_company_files',
					'regionmark': 'region_percent_25',
					'data': {

					}
				}
			}
		},

		/**
		 * 右侧公司概况模块管理
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(0)'),
			attributes: {
				'data-manageable': true,
				'data-module': {
					'href':'//www.hc360.com'
				}
			}
		},

		/**
		 * 右侧详细信息模块管理
		 */
		{
			selector: $('.proBox75Rig .columnbox:eq(1)'),
			attributes: {
				'data-manageable': true,
				'data-module': {
					'href':'//agent.hc360.com'
				}
			}
		}
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