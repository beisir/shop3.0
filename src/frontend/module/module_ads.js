var util = require('../common/util');

/**
 * [module_ads 宽屏广告模块前端渲染逻辑]
 * @return {Object} [description]
 */
function module_ads(moduleEntity) {
    var _this = this;

    /**
     * [初始化模块元素引用]
     */
    $.extend(true, _this, {

        /**
         * [moduleEntity 模块业务对象]
         * @type {Object}
         */
        moduleEntity: moduleEntity

    });

    /**确保_this.moduleEntity.dataEntity.data.pause值存在，不能为0*/
    if (!_this.moduleEntity.dataEntity.data.pause || Number(_this.moduleEntity.dataEntity.data.pause) == 0) {
        _this.moduleEntity.dataEntity.data.pause = 3000;
    }

    /**
     * 初始化模块业务逻辑
     */
    module_ads.prototype.init.call(_this);

    /**
     * 针对 kqe666 用户，其商铺的当前模块是可以跳转到外网的
     * 
     * 该需求为产品人员 高松 提出的特殊需求
     */
    if (window.userName === 'kqe666') {
        return;
    }

    /**
     * 禁止外域链接跳转
     */
    var wrap = _this.moduleEntity.htmlEntity.find('[data-carousel-wrap]');
    wrap.delegate('a', 'click', function(evt) {
        var linkAttr = util.parseURL($(this).attr('href') || '');
        if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
            evt.preventDefault();
        }
    });
}

/**
 * [loadComponent 根据广告类型加载组件并执行相应渲染逻辑]
 * @return {$.Deferred}  [description]
 */
module_ads.prototype.init = function() {
    var _this = this,
        _config = _this.getLoadComponentDeferredAndRender();

    /**
     * [加载完组件执行渲染逻辑]
     */
    $.when(_config.deferred).done(function(component) {
        _config.render.call(_this, component);
    });
};

/**
 * [getLoadComponentDeferredAndRender 获取加载组件延迟对象]
 * @return {$.Deferred} [description]
 */
module_ads.prototype.getLoadComponentDeferredAndRender = function() {
    var _this = this,

        /**
         * [_deferred 轮播组件延迟对象]
         * @type {Object}
         */
        _deferred = $.Deferred(),

        /**
         * 渲染逻辑函数
         */
        _render;

    /**
     * [枚举宽屏广告显示类型]
     */
    switch (Number(_this.moduleEntity.dataEntity.data.type)) {

        /**
         * [翻页图片]
         */
        case 1:

            /**
             * [枚举翻页图片切换效果]
             */
            switch (Number(_this.moduleEntity.dataEntity.data.transition)) {

                /**
                 * 普通轮播效果
                 */
                case 0:
                    /**
                     * [加载OwlCarousel组件]
                     */
                    require.ensure([], function() {
                        require("OwlCarousel");
                        _deferred.resolve($.fn.owlCarousel);
                    }, 'components/OwlCarousel/OwlCarousel');

                    /**
                     * [_render 设置渲染逻辑函数]
                     * @type {Function}
                     */
                    _render = _this.renderCarouselNormal;
                    break;

                    /**
                     * 多个切换效果
                     */
                case 1:
                    /**
                     * [fullScreenSlider 定义组件加载延迟对象]
                     * @type {Object}
                     */
                    require.ensure([], function(require) {
                        _deferred.resolve(require('../../components/jquery.fullScreenSlider'));
                    }, 'components/jquery.fullScreenSlider');

                    /**
                     * [_render 设置渲染逻辑函数]
                     * @type {Function}
                     */
                    _render = _this.renderCarouselFullScreenSlider;
                    break;

                    // case 2:
                    //  /**
                    //   * [transitionEffectsSlider 定义组件加载延迟对象]
                    //   * @type {Object}
                    //   */
                    //  require.ensure([], function(require) {
                    //      require('../../components/jquery.transitionEffectsSlider/jquery.transitionEffectsSlider');
                    //      _deferred.resolve($.fn.transitionEffectsSlider);
                    //  }, 'components/jquery.transitionEffectsSlider/jquery.transitionEffectsSlider');

                    //  /**
                    //   * [_render 设置渲染逻辑函数]
                    //   * @type {Function}
                    //   */
                    //  _render = _this.renderCarouselTransitionEffects;
                    //  break;

                    /**
                     * [默认普通轮播效果]
                     */
                default:

                    /**
                     * [加载OwlCarousel组件]
                     */
                    require.ensure([], function() {
                        require("OwlCarousel");
                        _deferred.resolve();
                    }, 'components/OwlCarousel/OwlCarousel');

                    /**
                     * [_render 设置渲染逻辑函数]
                     * @type {Function}
                     */
                    _render = _this.renderCarouselNormal;
                    break;
            }
            break;

            /**
             * [产品轮播]
             */
        case 2:

            /**
             * [加载msclass]
             */
            require.ensure([], function() {
                require("msclass");
                _deferred.resolve();
            }, 'components/msclass/msclass');

            /**
             * [_render 设置渲染逻辑函数]
             * @type {Function}
             */
            _render = _this.renderCarouselProduct;
            break;

            /**
             * [默认]
             */
        default:
            break;
    }

    /**
     * 返回组件加载延迟对象及渲染逻辑函数
     */
    return {
        deferred: _deferred,
        render: _render
    };
};

/**
 * [renderCarouselTransitionEffects 渲染百叶窗轮播效果]
 * @return {[type]} [description]
 */
module_ads.prototype.renderCarouselTransitionEffects = function() {
    var _this = this;

    /**
     * [element 初始化滚动元素]
     * @type {Object}
     */
    _element = {

        /**
         * [wrap 滚动区域包裹元素]
         * @type {Object}
         */
        wrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap] ul')
    };

    /**
     * [componentEntity 实例化轮播插件实例]
     * @type {component}
     */
    var componentEntity = _element.wrap.transitionEffectsSlider({
        blockSize: {
            height: 80,
            width: 80
        },
        autorotationSpeed: _this.moduleEntity.dataEntity.data.pause,
        // animationSpeed:1000,//动画速度
        transition: 'slide',
        display: 'all',
        transitionOrder: ['diagonaltop', 'diagonalbottom', 'topleft', 'bottomright', 'random']
    });
};

/**
 * [renderCarouselFullScreenSlider 渲染全屏轮播效果]
 * @return {[type]}           [description]
 */
module_ads.prototype.renderCarouselFullScreenSlider = function(component) {
    var _this = this;

    /**
     * [element 初始化滚动元素]
     * @type {Object}
     */
    _element = {

        /**
         * [wrap 滚动区域包裹元素]
         * @type {Object}
         */
        wrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap]'),

        /**
         * [btnWrap 按钮包裹元素]
         * @type {Object}
         */
        btnWrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap]'),

        /**
         * [thumbnailWrap 缩略图包裹元素]
         * @type {Object}
         */
        thumbnailWrap: _this.moduleEntity.htmlEntity.find('.BtnimgList'),

        /**
         * [btnLeft 向左滚动按钮元素]
         * @type {Object}
         */
        btnLeft: _this.moduleEntity.htmlEntity.find('[data-btn-prev]'),

        /**
         * [btnLeft 向右滚动按钮元素]
         * @type {Object}
         */
        btnRight: _this.moduleEntity.htmlEntity.find('[data-btn-next]')
    };

    /**
     * [fullScreenCarouselEntity 实例化轮播插件实例]
     * @type {component}
     */
    var componentEntity = new component({
        wrap: _element.wrap,
        pause: _this.moduleEntity.dataEntity.data.pause
    });

    var left = 500 - _element.thumbnailWrap.width() / 2;
    _element.thumbnailWrap.show().css({
        'position': 'absolute',
        'bottom': -(_element.btnWrap.height() / 2 + _element.btnLeft.height() + 80) + 'px',
        'left': left + 'px'
    });

    /**
     * [按钮包裹元素鼠标悬浮显示左右按钮及下方缩略图]
     */
    _element.btnWrap.hover(function() {
        _element.btnLeft.show();
        _element.btnRight.show();
        _element.thumbnailWrap.stop().animate({
            bottom: (-_element.btnWrap.height() / 2) + 'px'
        });

        /**
         * 停止自动轮播
         */
        componentEntity.stop();
    }, function() {
        _element.btnLeft.hide();
        _element.btnRight.hide();
        _element.thumbnailWrap.stop().animate({
            bottom: (-_element.btnWrap.height()) + 'px'
        });

        /**
         * 开始自动轮播
         */
        componentEntity.start();
    });

    /**
     * [绑定缩略图鼠标悬浮事件]
     */
    _element.thumbnailWrap.children().hover(function() {
        componentEntity.goto($(this).index());
    });

    /**
     * [绑定向左滚动按钮点击事件]
     */
    _element.btnLeft.on('click', function() {
        componentEntity.prev($(this).index());
    });

    /**
     * [绑定向右滚动按钮点击事件]
     */
    _element.btnRight.on('click', function() {
        componentEntity.next($(this).index());
    });
};

/**
 * [renderCarouselAD 翻页图片，普通效果]
 */
module_ads.prototype.renderCarouselNormal = function(component) {
    var _this = this,
        _transition,

        /**
         * [element 初始化滚动元素]
         * @type {Object}
         */
        _element = {

            /**
             * [wrap 滚动区域包裹元素]
             * @type {Object}
             */
            wrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap] ul'),

            /**
             * [btnWrap 按钮包裹元素]
             * @type {Object}
             */
            btnWrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap]'),

            /**
             * [thumbnailWrap 缩略图包裹元素]
             * @type {Object}
             */
            thumbnailWrap: _this.moduleEntity.htmlEntity.find('.BtnimgList'),

            /**
             * [btnLeft 向左滚动按钮元素]
             * @type {Object}
             */
            btnLeft: _this.moduleEntity.htmlEntity.find('[data-btn-prev]'),

            /**
             * [btnLeft 向右滚动按钮元素]
             * @type {Object}
             */
            btnRight: _this.moduleEntity.htmlEntity.find('[data-btn-next]')
        };

    var left = 500 - _element.thumbnailWrap.width() / 2;
    _element.thumbnailWrap.show().css({
        'position': 'absolute',
        'bottom': -(_element.btnWrap.height() / 2 + _element.btnLeft.height() + 80) + 'px',
        'left': left + 'px'
    });

    /**
     * [对应切换效果数据]
     */
    // switch (Number(_this.moduleEntity.dataEntity.data.transition)) {
    //  case 1:
    //      _transition = 'fade';
    //      break;
    //  case 2:
    //      _transition = 'backSlide';
    //      break;
    //  case 3:
    //      _transition = 'goDown';
    //      break;
    //  case 4:
    //      _transition = 'fadeUp';
    //      break;
    //  default:
    //      _transition = false;
    //      break;
    // }

    /**
     * [开始翻页图片滚动，]
     */
    _element.wrap.owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        singleItem: true,
        autoPlay: _this.moduleEntity.dataEntity.data.pause,
        stopOnHover: true,
        transitionStyle: false
    });

    /**
     * [owlCarouselEntity 获取滚动实例对象]
     * @type {Object}
     */
    var owlCarouselEntity = _element.wrap.data('owlCarousel');

    /**
     * [按钮包裹元素鼠标悬浮显示左右按钮及下方缩略图]
     */
    _element.btnWrap.mouseenter(function() {
        _element.btnLeft.show();
        _element.btnRight.show();
        _element.thumbnailWrap.stop().animate({
            bottom: -(_element.btnWrap.height() / 2) + 'px'
        });
        _element.wrap.trigger("owl.stop");
    });
    _element.btnWrap.mouseleave(function() {
        _element.btnLeft.hide();
        _element.btnRight.hide();
        _element.thumbnailWrap.stop().animate({
            bottom: (-_element.btnWrap.height() / 2 - 80 - _element.btnLeft.height()) + 'px'
        });
        owlCarouselEntity.play();
    });

    /**
     * [绑定缩略图鼠标悬浮事件]
     */
    _element.thumbnailWrap.children().hover(function() {
        owlCarouselEntity.goTo($(this).index());
    });

    /**
     * [绑定向左滚动按钮点击事件]
     */
    _element.btnLeft.on('click', function() {
        _element.wrap.trigger("owl.prev");
    });

    /**
     * [绑定向右滚动按钮点击事件]
     */
    _element.btnRight.on('click', function() {
        _element.wrap.trigger("owl.next");
    });
};

/**
 * [renderCarouselProduct 渲染产品轮播]
 */
module_ads.prototype.renderCarouselProduct = function() {
    var _this = this,

        /**
         * [element 初始化滚动元素]
         * @type {Object}
         */
        _element = {

            /**
             * [wrap 滚动区域包裹元素]
             * @type {Object}
             */
            wrap: _this.moduleEntity.htmlEntity.find('[data-carousel-wrap] ul')
        };

    /**
     * [因为Marquee轮播组件要求元素必须指定id属性，所以此处初始化了一个随机id]
     */
    var marqueeWrapID = 'marquee-wrap-' + Math.random();
    _element.wrap.attr({
        id: marqueeWrapID
    });

    /**
     * [开始产品图片轮播]
     */
    var marqueeEntity = new Marquee(marqueeWrapID);
    marqueeEntity.Direction = 2;
    marqueeEntity.Step = 1;
    marqueeEntity.Width = 930;
    marqueeEntity.Height = 282;
    marqueeEntity.Timer = 30;
    marqueeEntity.DelayTime = 0;
    marqueeEntity.WaitTime = 0;
    marqueeEntity.Start();
};

module.exports = module_ads;
