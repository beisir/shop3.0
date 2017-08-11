/**
 * Created by 姜艳云 on 2016/12/13.
 *  [module_album_window 相册橱窗所见即所得渲染逻辑]
 */
function module_album_window(moduleEntity) {
    /***
     * 当前模块
     * @type {*|jQuery|HTMLElement}
     */
    this.albumBox = $(moduleEntity.htmlEntity);
    /***
     * 图片显示区域
     */
    this.imgInfo = this.albumBox.find('.albumWindow .albumLeft');
}

module_album_window.prototype = {
    /**
     * [render 渲染函数]
     * @return {[type]} [description]
     */
    render: function () {
        var that = this,
            imgInfoCon = that.imgInfo.find('.albumBoxCon');

        that.imgLiquid().done(function(){
            imgInfoCon.find('.albumImgCon a').imgLiquid({
                fill: false,
                verticalAlign: 'center',
                horizontalAlign: 'center'
            });
        });
    },
    /**
     * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
     * @type {Object}
     */
    imgLiquid: function () {
        var imgLiquidDeferred = $.Deferred();
        require.ensure([], function (require) {
            require('jquery_imgLiquid');
            imgLiquidDeferred.resolve();
        }, 'components/jquery_imgLiquid');
        return imgLiquidDeferred;
    }
};


module.exports = module_album_window;
