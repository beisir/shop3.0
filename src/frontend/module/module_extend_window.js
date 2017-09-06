/**
 * Created by 姜艳云 on 2016/11/1.
 * [扩展橱窗]   扩展橱窗图片轮播效果在百分之二十五和七十五区域都可以轮播
 */
extendProduct = function(moduleEntity) {
    /***
     * 获取商机图片列表接口
     * @type {string}
     */
    this.getProImgList = '//detail.b2b.hc360.com/detail/turbine/action/GetBusinPicListAction/eventsubmit_doGetpiclist/eventsubmit_doGetpiclist';
    /***
     * 当前模块的html
     * @type {*|jQuery|HTMLElement}
     */
    this.banProductBox = $(moduleEntity.htmlEntity);
    /***
     * 所在区域标识  百分之二十五或者七十五
     */
    this.regionmark = moduleEntity.dataEntity.regionmark;
    if(this.regionmark=="region_percent_75"){
        this.imgWrapheight=200;
    }else{
        this.imgWrapheight=240;
    }
    /**
     * 初始化图片轮播
     */
    this.initEffect();
};
extendProduct.prototype = {
    initEffect: function() {
        var that = this;
        /**
         * [加载完组件后再开始前端渲染]
         */
        $.when.apply(null, that.getComponentDeferred()).done(function() {
            that.imgSlick();
        });

    },
    /***
     * 初始化图片轮播
     */
    imgSlick: function() {
        var that = this,
            productDt = this.banProductBox.find('.newProList ul li dt');

        /***
         * 设置所有轮播区域高度为0
         */
        productDt.find('.imgAlertBox').addClass('opacity0').show().height('0px');

        /***
         * 鼠标移入
         */
        productDt.mouseenter(function() {
            var _img = $(this).find('img[data-busin-id]'),
                link=_img.closest('a').attr('href'),
                imgListWrap = $(this).find('.imgAlertBox'),
                _height=imgListWrap.height()||that.imgWrapheight,
                _ol = imgListWrap.find('ol'),
                loaded = _ol.data('loaded');

            /**
             * [存在滚动对象实例]
             */
            _ol.data('showFlag', true);
            if (loaded) {
                imgListWrap.removeClass('opacity0').height(_height+'px');
                _ol.slick('slickPlay');
                return;
            }

            /**
             * [不存在滚动对象实例，则加载数据并初始化滚动对象实例]
             */
            $.when(that.getProListHtml(_img.attr('data-busin-id'))).done(function(data) {
                data = data || {};
                if (!Number(data.state)) {
                    return;
                }

                var proHtml = '';
                $.each(data.data, function(index, val) {
                    proHtml += '<li><span><a href="'+link+'" target="_blank"><img src="' + val + '" ></a></span></li>';
                });
                _ol.html(proHtml);

                /***
                 * 显示轮播区域
                 */
                _ol.data('showFlag') && imgListWrap.removeClass('opacity0').height(_height+'px');

                /**
                 * 开始图片轮播
                 */
                _ol.slick({
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 1000,
                    autoplay: true,
                    arrows: false,
                    pauseOnHover: false
                });
                _ol.data('loaded', true);

            }).fail(function(){
                 // console.log('获取产品图片失败！')
            });
        });

        /***
         * 鼠标移出
         */
        productDt.mouseleave(function() {
            var imgListWrap = $(this).find('.imgAlertBox'),
                _ol = imgListWrap.find('ol'),
                loaded = _ol.data('loaded');
            imgListWrap.addClass('opacity0').height('0px');
            _ol.data('showFlag', false);
            if (loaded) {
                _ol.slick('slickPause');
                _ol.slick('slickGoTo',0);
            }
        });
    },
    /**
     * 获取当前产品的其他产品图
     * @param bcid  当前产品的bcid
     */
    getProListHtml: function(bcid) {
        var that = this;
        return $.ajax({
            url: that.getProImgList,
            method: 'get',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                bcid: bcid
            }
        });
    },
    /**
     * [getComponentDeferred 获取组件加载延迟对象]
     * @return {Array} [延迟对象数组]
     */
    getComponentDeferred: function() {
        /**
         * [slickDeferred 定义 slick 组件加载延迟对象]
         * @type {Object}
         */
        var slickDeferred = $.Deferred();
        require.ensure([], function(require) {
            require('slick');
            slickDeferred.resolve();
        }, 'components/slick');

        return [slickDeferred];
    }
};
module.exports = extendProduct;