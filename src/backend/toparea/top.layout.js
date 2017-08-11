/**
 * Created by 姜艳云 on 2016/12/9.
 * 板式布局
 */
var tool = require('../common/module.setting.util'),
    topLayout = function (pageEntity, html, interfaceUrl) {
        /***
         * 商铺配置数据
         */
        this.pageEntity = $.extend({}, pageEntity);
        /****
         * 接口地址
         */
        this.interfaceUrl = interfaceUrl;
        /***
         * 板式布局区域
         * @type {*|jQuery|HTMLElement}
         */
        this.topLayout = $('[node-name="layout"]');

        this.switchLayout();
    };
topLayout.prototype = {
    switchLayout: function () {
        var that = this;
        /****
         * 点击侧栏在左侧
         */
        that.topLayout.on('click', '.Format1Img', function () {
            that.changeLayout($(this), 'Format1ImgCur', 'Format2ImgCur', 'right', 'left', '2');
        });
        /****
         * 点击侧栏在右
         */
        that.topLayout.on('click', '.Format2Img', function () {
            that.changeLayout($(this), 'Format2ImgCur', 'Format1ImgCur', 'left', 'right', '1');
        });
    },
    /***
     * 修改左右布局
     * @param me 点击的左右布局
     * @param className 增加的class
     * @param removeClassName 移除的class
     * @param floatType 百分之二十五区域浮动类型
     * @param flotType2 百分之七十五区域浮动类型
     * @param layoutType  布局类型，1:左窄右宽，2：左宽右窄
     */
    changeLayout: function (me, className, removeClassName, floatType, flotType2, layoutType) {
        var that = this;
        if (!me.hasClass(className)) {
            $.ajax({
                url: that.interfaceUrl.indexLayout,
                data: {
                    templateid: this.pageEntity.template.id, //模板id
                    layout: layoutType, //布局类型，1:左窄右宽，2：左宽右窄
                    t: Math.random()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.state == 0) {
                        tool.createDialog(data.message);
                    } else {
                        me.addClass(className);
                        me.parent('.FormatBox').siblings().find('span').removeClass(removeClassName);

                        /***
                         * 频道页面不切换板式布局，板式布局只能在首页切换，pageName首页的标识符
                         */
                        if (window.pageName == "index") {

                            /**
                             * [regionList 获取区域列表对象]
                             * @type {Array}
                             */
                            var regionList = window.pageEntity.regionList || [];

                            /**
                             * [找到25%、75%区域设定相应样式来渲染新布局]
                             */
                            $.each(regionList, function (regionIndex, regionEntity) {

                                /**
                                 * [设定25%区域的浮动样式以及该区域下各模块 添加模块 按钮显示位置]
                                 */
                                if (regionEntity.identifier === 'region_percent_25') {
                                    regionEntity.htmlEntity.css('float', floatType);

                                    /**
                                     * [根据布局方式设置25%区域下各模块 添加模块 按钮显示位置]
                                     */
                                    (parseInt(layoutType) === 2) ? regionEntity.htmlEntity.addClass('p25Rig') : regionEntity.htmlEntity.removeClass('p25Rig');
                                }

                                /**
                                 * [设定75%区域的浮动样式以及该区域下各模块 添加模块 按钮显示位置]
                                 */
                                if (regionEntity.identifier === 'region_percent_75') {
                                    regionEntity.htmlEntity.css('float', flotType2);

                                    /**
                                     * [根据布局方式设置75%区域下各模块 添加模块 按钮显示位置]
                                     */
                                    (parseInt(layoutType) === 2) ? regionEntity.htmlEntity.addClass('p75Left') : regionEntity.htmlEntity.removeClass('p75Left');
                                }
                            });
                        }
                        tool.createDialog('设定成功！您可切换到首页查看效果。');
                    }
                }
            });

        }
    }
};
module.exports = topLayout;