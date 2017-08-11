/**
 * [setting 所见即所得后台页面各模块默认配置项]
 * @type {Object}
 */
var setting = {
    /**
     * 招牌模块
     */
    'module_sign': {
        'logourl': '', //公司LOGO地址
        'companyname': '', //公司名称
        'backgroundurl': '' //背景图片地址
    },
    /**
     * 导航模块
     */
    'module_navigation': {
        'button': {
            'selected': '',//按钮选中样式
            'unselected': ''//按钮未选中样式
        },
        'background': '' //背景图片地址
    },

    /**
     * 宽屏广告
     */
    'module_ads': {
        'type': 1, //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
        'piclist': [],
        'prolist': [],
        'transition': 1, //过渡效果类型
        'pause': 3000 //事件间隔，翻页图片配置，单位ms
    },
    /**
     * 通栏广告模块
     */
    'module_banner_ads': {
        'picurl': '', //图片地址
        'linkurl': '' //链接地址
    },
    /**
     * 通栏产品模块
     */
    'module_banner_products': {
        'title': '',
        'showTitleAndBorder': true, //是否显示标题和边框
        'type': 1, //1：平铺展示，2：滚动展示,
        'prolist': [], //产品列表
        'picsize': 1 //1：大图（300x300）最多显示12个产品，2：中图（210x210）最多显示16个产品，3：小图（170x170）最多显示20个产品
    },
    /**
     * 扩展橱窗模块
     */
    'module_extend_window': {
        'title': '',
        'showTitleAndBorder': true, //是否显示标题和边框
        'prolist': [] //产品列表
    },
    /**
     * 专业橱窗模块
     */
    'module_prof_window': {
        'title': '',
        'showTitleAndBorder': true, //是否显示标题和边框
        'supercatid': '', //终极类目id
        'prolist': [],//产品图片数据列表
        'paramlist': []//参数列表
    },
    /**
     * 自定义内容模块
     */
    'module_custom': {
        'title': '',
        'showTitleAndBorder': true, //是否显示标题和边框
        'content': '<strong>HTML内容</strong>' //编辑内容
    },
    /**
     * 信誉证书模块
     */
    'module_certificate': {
        'title': '',
        'showTitleAndBorder': true, //是否显示标题和边框
        'type': 1 //显示设置，即边框设置，1：边框效果1，2：边框效果2，3：边框效果3
    },
    /**
     * 公司介绍模块
     */
    'module_company_intro': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 公司动态模块
     */
    'module_company_dynamic': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 友情链接模块
     */
    'module_friendship_link': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 联系我们模块
     */
    'module_contact_us': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 客户留言模块
     */
    'module_feedback': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 最新供应模块
     */
    'module_latest_supply': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 产品分类模块
     */
    'module_prod_classify': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 产品橱窗模块
     */
    'module_prod_window': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 相册橱窗模块
     */
    'module_album_window': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 公司相册模块
     */
    'module_company_album': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 买卖通档案模块
     */
    'module_mmt_archives': {
        'title': '',
        'showTitleAndBorder': true //是否显示标题和边框
    },
    /**
     * 面包屑（搜索）模块
     */
    'module_crumbs': {
        'font': '',
        'background': ''
    }
};

module.exports = setting;