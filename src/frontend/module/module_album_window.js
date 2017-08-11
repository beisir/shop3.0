/**
 * Created by 姜艳云 on 2016/11/1.
 * [相册橱窗]   百分之七十五区域有图片效果
 */
albumWindow = function (moduleEntity) {
    /***
     * 所在区域标识  百分之二十五或者七十五
     */
    this.regionmark = moduleEntity.dataEntity.regionmark;
    /***
     * 当前模块
     * @type {*|jQuery|HTMLElement}
     */
    this.albumBox = $(moduleEntity.htmlEntity);
    /**
     * 图片列表区域
     */
    this.imgList = this.albumBox.find('.albumWindow .albumRig');
    /***
     * 图片显示区域
     */
    this.imgInfo = this.albumBox.find('.albumWindow .albumLeft');

    if (this.regionmark == "region_percent_75") {
        var that=this,
            def=that.imgLiquid();
        def.done(function(){
            that.bindEvent();
        });
    }
};

albumWindow.prototype = {
    bindEvent: function () {
        var that = this;
        var imgInfoCon = that.imgInfo.find('.albumBoxCon');
        var _width = imgInfoCon.width();
        var _height = imgInfoCon.height();
        /***
         * 初始化第一张图片居中
         */
        imgInfoCon.find('.albumImgCon a').imgLiquid({
            fill: false,
            verticalAlign:'center',
            horizontalAlign:'center'
        });
        /***
         * 鼠标指上，开始动画
         */
        that.imgList.find('li').bind('mouseenter', function () {
            var me = $(this);
            imgInfoCon
                .stop(true)
                .animate({
                    height: 0,
                    width: 0,
                    left: _width / 2 + 'px',
                    top: _height / 2 + 'px'
                }, 200, "linear", function () {
                    that.changeImgInfo(me);
                    imgInfoCon
                        .stop(true)
                        .animate({
                            height: _height + 'px',
                            width: _width + 'px',
                            left: 0,
                            top: 0
                        }, 400, "linear");
                });
        });
    },
    imgLiquid: function () {
        /**
         * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
         * @type {Object}
         */
        var imgLiquidDeferred = $.Deferred();
        require.ensure([], function (require) {
            require('jquery_imgLiquid');
            imgLiquidDeferred.resolve();
        }, 'components/jquery_imgLiquid');
        return imgLiquidDeferred;
    },
    /***
     * 修改大图的图片，链接，标题
     * @param _li
     */
    changeImgInfo: function (_li) {
        var largerImg=this.imgInfo.find('.albumBoxCon img'),
            _img=_li.find('img'),
            title = _img.attr('data-title'),
            imgSrc = _img.attr('data-largerimg'),
            linkUrl = _img.attr('data-detail');
        /***
         * 修改查看详情的链接
         */
        this.imgInfo.find('.imgDetailBtn').attr('href', linkUrl);
        /***
         * 修改图片地址和标题
         */
        largerImg.attr('src', imgSrc);
        /***
         * 修改标题
         */
        this.imgInfo.find('.albumBoxCon p a').html(title).attr('href',linkUrl);

        largerImg.parent().imgLiquid({
            fill: false,
            verticalAlign:'center',
            horizontalAlign:'center'
        });
    }
};


module.exports = albumWindow;