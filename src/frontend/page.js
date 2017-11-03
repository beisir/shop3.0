/**
 * 导入 json2 模块
 * 导入 es5-shim 模块
 * 导入 jQuery 模块
 * 导入 jQuery.placeholder 模块
 * 导入 jquery.lazyload 模块
 */
require('json2');
require('es5-shim/es5-shim');
require('jquery');
require('jquery.placeholder');
require('jquery.lazyload');

/**
 * 加载 OwlCarousel 组件样式
 * 加载 slick 组件样式
 * 加载 jquery.transitionEffectsSlider 组件样式
 * 加载自定义样式
 */
require('../../src/components/OwlCarousel/owl.carousel.css');
require('../../src/components/OwlCarousel/owl.theme.css');
require('../../src/components/OwlCarousel/owl.transitions.css');
require('../../node_modules/slick-carousel/slick/slick.css');
require('../../node_modules/slick-carousel/slick/slick-theme.css');
// require('../components/jquery.transitionEffectsSlider/style.css');
require('../../src/frontend/css/main.css');

/***
 * 初始化placeholder();
 */
$(function() {
    $("input[type='text'],textarea").placeholder();
});
/***
 * 判断是否是预览页面
 */
if (window.isPreview) {
    $('body').click(function(e) {
        var evt = e || window.event,
            _target = evt.target;
        /***
         * 如果点击的是a标签，并且不是导航下面的a，那么就阻止默认行为
         */
        if ($(_target).closest('.navBoxCon').length === 0) {
            evt.preventDefault();
        }
    });
}

/***
 *  引入加载头部导航
 */
$.getScript('//style.org.hc360.cn/js/build/source/widgets/flowconfig/hc.flowconfig.min.js', function() {
    HC.W.load('topnav', function() {
        var topNavList = $('.webTopNav');
        if (topNavList && topNavList.length > 0) {
            topnav.init(false, 'narrow');
            $('#wrapInner').append(topNavList);
            topNavList.css({
                "top": "0",
                "position": "static"
            });
        }
    });
});

/***
 *  加载搜索框
 */
HC.W.load('searchModule', function() {
    $('#searchMod').length > 0 && $('#searchMod').searchModule({
        className: 'defaultSearch2',
        searchOur: 1,
        shopOurUrl: window.shopSearchUrl || '',
        userlogs: {
            input: 'onmousedown="return hcclick(\'?hcdetail_enterpriselog=topbar_searchInput\')"', //input
            searchCookie: 'onmousedown="return hcclick(\'?hcdetail_enterpriselog=topbar_search_sh\')"', //cookie词
            searchLink: 'onmousedown="return hcclick(\'?hcdetail_enterpriselog=topbar_search_aw\')"', // 联想词
            ourBtn: 'onmousedown="return hcclick(\'?hcdetail_enterpriselog=topbar_searchLocal\')"', //搜本店
            allBtn: 'onmousedown="return hcclick(\'?hcdetail_enterpriselog=topbar_searchAll\')"' //搜全站
        }
    });
});

/***
 * 引入右侧工具条,预览页面不加载右侧滚动条
 */
if (!window.isPreview) {
    HC.HUB.addCss('//style.org.hc360.com/css/detail/mysite/siteconfig/new_product/detaiAlert.css', function() {
        require.ensure([], function(require) {
            window.righToolbar = require('../common/hc.righToolbar');
            window.righToolbar.init(scyps.sc);
        }, 'common/hc.righToolbar');
    });
}
/***
 * 引入微信给我留言
 */
/*if (typeof window.systemname !== "undefined" && window.systemname === "detail") {
    $.ajax({
        url: '//detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=WeChatHtml',
        dataType: 'jsonp',
        success: function(dialogHtml) {
            $('body').append(dialogHtml);
            /!***
             * 兼容ffOff-lineMessage.min.js里面，判断微信是否在线ajax的data参数，data参数取得是company_username，3.0商铺名称初始化的变量是userName
             *!/
            window.company_username = window.userName || "";
            jQuery.getScript('//style.org.hc360.cn/js/module/detail/ffOff-lineMessage.min.js');
        }
    });
}*/

/**
 * 点击收藏公司，弹出的登录对话框js
 * 解决jquery1.9.1不支持live方法
 * 解决jquery1.9.1不支持curCSS方法，因为 hc.login.pop.min.js引用的jquery.ui.custom.js使用了该方法
 * 解决jquery1.9.1不支持$.browser.msie 如果去掉则会引起build/source/widgets/hc.bgiframe-2.1.3-pre.js报错
 */
$.fn.live = jQuery.fn.on;
$.curCSS = function(element, prop, val) {
    return jQuery(element).css(prop, val);
};
$.browser = {
    msie: HC.env.ie
};
/***
 * 如果页面没有登录对话框的包裹元素$("#popLogin")，那么就创建一个添加到页面上
 */
if ($("#popLogin").length === 0) {
    $('<div id="popLogin" style="display:none"></div>').appendTo($('body'));
}
$.getScript('//style.org.hc360.cn/js/module/detail/hc.login.pop.min.js');

/**
 * [加载新买家卖家活动注册专题、买家找货工具条项目相关脚本 201603]
 */
$.getScript('//style.org.hc360.cn/js/module/detail/hc.detail.welfare.toolbar.min.js');

/**
 * 导入低版本浏览器提示模块
 */
require.ensure([], function(require) {
    var IELowVersionPrompt = require('../common/hc.IELowVersionPrompt');
    IELowVersionPrompt();
}, 'common/hc.IELowVersionPrompt');

/**
 * 智能橱窗
 */
var container = $("#recomdList");
if (container && container.length > 0) {
    require.ensure([], function(require) {
        var SmartWindow = require('./common/smartWindow');
        new SmartWindow(container);
    }, 'frontend/common/smartWindow');
}


/**
 * [lazyloadImages 页面存在懒加载图片时候加载懒加载组件并初始化]
 * @type {Object}
 */
var lazyloadImages = $("img[data-original]");
if (lazyloadImages.length > 0) {
    /**
     * [threshold 初始化图片懒加载]
     * @type {Number}
     */
    lazyloadImages.lazyload({
        effect: "fadeIn",
        skip_invisible: true,
        failure_limit: 10
    });

    /**
     * 主动触发屏幕滚动事件，以显示已经处于可见区域的待加载图片
     */
    //$(window).trigger("scroll");
}

/**
 * 导入DSP分量部码模块
 */
// require('./common/dsp.js')();

/**
 * [验证页面屏蔽词并跳转相关逻辑]
 */
var badWordUrl = "";
if (window.checkon) {
    $.ajax({
        //url: '//detail.b2b.hc360.com/detail/turbine/action/ajax.CheckAjax/eventsubmit_doCheckword/doCheckword',
        url: '//wsdetail.b2b.hc360.com/checkAjax',
        data: $.extend({
            providerid: window.providerId
        }, (window.checkpage ? {
            checkpage: window.checkpage
        } : {})),
        timeout: 3000,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(data) {
            if (data.success) {
                window.location.href = "//detail.b2b.hc360.com/detail/turbine/template/screenkeyword.html";
            }
        }
    });
}

/**
 * [hcclick 注册 WebTrends 用户行为分析数据发送方法]
 * @param  {String} param [description]
 */
window.hcclick = function(param) {
    if (document.images) {
        var rannumber = Math.round(Math.random() * 10000);
        (new Image()).src = "//log.info.hc360.com/click.htm" + param + "&rannumber=" + rannumber;
    }
    return true;
};

/**
 * [imgonerror 图片加载失败后将图片地址指向默认图]
 * @param  {[type]} img [description]
 * @return {[type]}     [description]
 */
window.imgonerror = function(img) {
    img.src = '//b2b.hc360.com/mmtTrade/images/nopic.jpg';
    img.onerror = null;
};


/**
 * 自适应图片大小
 * @param img
 * @param oAW
 * @param oAH
 */
window.resizeImg = function(img, oAW, oAH) {
  var oimgW = img.width,
    oimgH = img.height,
    oimg = img,
    oY = (oimgH / oimgW).toFixed(2),
    oX = (oimgW / oimgH).toFixed(2);
  if (oimgW <= oAW && oimgH <= oAH) {//图片高和宽比指定的宽高都小
    oimg.style.height = oimgH + 'px';
    oimg.style.width = oimgW + 'px';
  } else if (oimgW >= oAW && oimgH >= oAH) {//图片高和宽比指定的宽高都大
    if (oY * oAW >= oAH) { //图片高比宽大
      oimg.style.height = oAH + 'px';
      oimg.style.width = oX * oAH + 'px';
    } else { //图片高比宽小
      oimg.style.height = oY * oAH + 'px';
      oimg.style.width = oAW + 'px';
    }
  } else if (oimgW > oAW && oimgH < oAH) {//图片宽比指定宽大，高比指定的小
    oimg.style.height = oY * oAW + 'px';
    oimg.style.width = oAW + 'px';
  } else if (oimgW < oAW && oimgH > oAH) {//图片宽比指定宽小，高比指定的大
    oimg.style.height = oAH + 'px';
    oimg.style.width = oX * oAH + 'px';
  }
};

/**
 * [util 暴露工具模块方法]
 * @type {Object}
 */
window.util = require('./common/util');

/**
 * [page_region 导入区域业务逻辑模块]
 * @type {Object}
 */
var page_region = require('./page.region');

/**
 * [page 页面业务对象]
 * @return {[type]} [description]
 */
function page() {
    var _this = this;

    /**
     * [扩展页面对象属性]
     * @type {[type]}
     */
    $.extend(true, _this, {

        /**
         * [regionList 区域业务对象实例列表]
         * @type {Array}
         */
        regionList: [],

        /**
         * [cache 页面数据缓存对象]
         * @type {Object}
         */
        cache: {}
    }, window.globalData || {});

    /**
     * 初始化业务对象
     */
    page.prototype.init.call(_this);
}

/**
 * [init 初始化业务对象]
 * @return {[type]} [description]
 */
page.prototype.init = function() {
    var _this = this;

    /**
     * 初始化区域下模块对象实例列表
     */
    $('[data-region]').each(function(index, element) {

        /**
         * 实例化模块业务对象并添加到区域下模块对象实例列表
         */
        _this.regionList.push(new page_region($(element), _this));
    });
};

module.exports = page;
