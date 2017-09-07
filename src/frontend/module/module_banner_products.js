/**
 * Created by 姜艳云 on 2016/11/1.
 * [通栏产品]   通栏产品只能在通栏插入，不存在七十五或者二十五，所以都可以轮播图片
 */
banProduct = function (moduleEntity) {
    /***
     * 当前模块的html
     * @type {*|jQuery|HTMLElement}
     */
    this.banProductBox = $(moduleEntity.htmlEntity);
    /***
     * 获取商机图片列表接口
     * @type {string}
     */
    this.getProImgList = '//detail.b2b.hc360.com/detail/turbine/action/GetBusinPicListAction/eventsubmit_doGetpiclist/eventsubmit_doGetpiclist';
    /**
     * 通栏产品的滚动类型，2是滚动展示
     */
    this.dataEntity = JSON.parse(this.banProductBox.attr('data-module')).data;
    /**
     * 初始化图片轮播
     */
    if (this.dataEntity.type == 2) {
        this.init();
    }
};
banProduct.prototype = {
    init:function(){
        var that=this,
            picSize=this.dataEntity["picsize"];
        /***
         * 初始化图片轮播div的高度
         */
        switch (picSize){
            case "3": //大图
                that.imgWrapheight='350';
                break;
            case "2": //中图
                that.imgWrapheight='250';
                break;
            case "1": //小图
                that.imgWrapheight='200';
        }
        /**
         * [加载完组件后再开始前端渲染]
         */
        $.when(that.getComponentDeferred()).done(function() {
            that.imgEffect();
        });
    },
    /***
     * 初始化图片轮播
     */
    imgEffect: function () {
        var that = this,
            productDt = this.banProductBox.find('ul li dt');

        /***
         * 设置所有轮播区域高度为0
         */
        productDt.find('.imgAlertBox').addClass('opacity0').show().height('0px');

        /***
         * 鼠标移入
         */
        productDt.mouseenter(function () {
            var _img = $(this).find('img[data-bcid]'),
                link=_img.closest('a').attr('href'),
                imgListWrap = $(this).find('.imgAlertBox'),
                _height=imgListWrap.height()||that.imgWrapheight,
                _ol = imgListWrap.find('ol'),
                loaded = _ol.data('loaded');
            /***
             * 初始化轮播区域显示标识符
             */
            _ol.data('showFlag', true);
            /**
             * 加载过产品图片，直接显示图片轮播区域，并且轮播图片
             */
            if (loaded) {
                imgListWrap.removeClass('opacity0').height(_height+'px');
                _ol.slick('slickPlay');
                return;
            }
            /***
             * 没有加载过产品图片
             */
            $.when(that.getProListData(_img.attr('data-bcid'))).done(function (data) {
                data = data || {};
                if (data.state == 0) {
                    return;
                }
                /***
                 * 拼接html
                 * @type {string}
                 */
                var proHtml = '';
                $.each(data.data, function (index, val) {
                    proHtml += '<li><span><a href="'+link+'" target="_blank"><img src="' + val + '" ></a></span></li>';
                });
                _ol.html(proHtml);
                /**
                 * 开始图片轮播
                 */
                _ol.data('showFlag') &&  imgListWrap.removeClass('opacity0').height(_height+'px');

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
                /**
                 * 初始化加载过产品图片的标识变量
                 */
                _ol.data('loaded', true);

            }).fail(function () {
                // console.log('获取产品图片失败！')
            });
        });

        /***
         * 鼠标移出
         */
        productDt.mouseleave(function () {
            var imgListWrap = $(this).find('.imgAlertBox'),
                _ol = imgListWrap.find('ol'),
                loaded = _ol.data('loaded');
            /***
             * 隐藏播放区域
             */
            imgListWrap.addClass('opacity0').height('0px');
            /***
             * 初始化轮播区域显示标识符
             */
            _ol.data('showFlag', false);
            if (loaded) {
                _ol.slick('slickPause');
                _ol.slick('slickGoTo', 0);
            }
        });
    },
    /**
     * 获取当前产品的其他产品图
     * @param bcid  当前产品的bcid
     */
    getProListData: function (bcid) {
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
    getComponentDeferred: function () {
        /**
         * [slickDeferred 定义 slick 组件加载延迟对象]
         * @type {Object}
         */
        var slickDeferred = $.Deferred();
        require.ensure([], function (require) {
            require('slick');
            slickDeferred.resolve();
        }, 'components/slick');

        return slickDeferred;
    }
};
module.exports = banProduct;
