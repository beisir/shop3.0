/**
 * Created by StarLikeRain on 28/09/2016.
 * [面包屑]
 */
var tool = require('../common/module.setting.util');
var crumbs = function (data, html, obj) {
    this.moduleEntity = data;
    /**
     * 模块数据
     */
    this.moduleData = data.dataEntity.data;

    /****
     * 配置对象
     * @type {*|{}}
     */
    this.option = obj || {};
    /**
     * 字体颜色
     */
    this._fontColor = tool.formatDate(this.moduleData.font).color;
    /**
     * 背景颜色
     */
    this._background = tool.formatDate(this.moduleData.background).background;
    /***
     * 初始化弹框
     */
    this.initLayer(html);
};

crumbs.prototype = {
    /***
     * 初始化弹框
     * @param html
     */
    initLayer: function (html) {
        var that = this,
            configData = {
                fontColor: this._fontColor,
                _background: this._background,
                bgType: function () {
                    if (!this._background) {
                        return false;
                    }
                    return true;
                }
            };
        require.ensure([], function (require) {
            require('mustache');
            /**
             * 创建弹层触发一个回调函数；汪浩让第一个弹层出现的时候加的；
             */
            that.option.rendedCallback && that.option.rendedCallback.call(that);

            that.searchDialog = dialog({
                content: mustache.render(html, configData),
                title: '编辑内容>搜索栏'
            }).showModal();

            that.bindEvent();

        },'components/mustache/mustache');
    },
    /***
     * 绑定事件
     */
    bindEvent: function () {
        var that = this;

        /** 导航栏弹框元素 **/
        that.searchWrap = $(that.searchDialog.node);

        /***
         * 背景切换
         */
        that.searchTab = that.searchWrap.find('[data-node-name="searchTab"]');
        /**
         * 自定义背景区域
         */
        that.crumbsWrap = that.searchWrap.find('[data-node-name="customBgColorDiv"]');
        /***
         * 字体颜色区域
         */
        that._fontColorWrap = that.searchWrap.find('[data-node-name="fontColor"]');
        /***
         * 背景颜色区域
         */
        that.bgColorWrap = that.searchWrap.find('[data-node-name="bjColor"]');

        /***
         * 默认背景和自定义背景切换
         */
        that.searchTab.on('click', 'span', function () {
            $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
            if ($(this).index() == 1) {
                that.crumbsWrap.show();
            } else {
                that.crumbsWrap.hide();
            }
        });
        /***
         * 初始化字体颜色选择器
         */
        tool.createColorpicker(
            that._fontColorWrap,
            that._fontColor,
            that.searchDialog
        );

        /***
         * 初始化背景颜色选择器
         */
        tool.createColorpicker(
            that.bgColorWrap,
            that._background,
            that.searchDialog
        );

        /***
         * 关闭弹层
         */
        that.searchWrap.on('click', '.t-close,.Cancel', function () {
            that.searchDialog.close().remove();
        });

        /***
         * 保存设置
         */
        that.searchWrap.on('click', '.Save', function () {
            that.saveSearch();
        });
    },
    saveSearch: function () {
        var that=this,
            fontColor = that._fontColorWrap.attr('data-color'),//字体颜色
            bgColor = that.bgColorWrap.attr('data-color'),//自定义背景颜色
            customBg = that.searchTab.find('span').eq(1),
            SearchObj={//自定义背景
                "font": "",
                "background": ""
                };
        if (fontColor) {
            SearchObj.font = "color:" + fontColor + ";";
        }
        if (customBg.hasClass('curRadioBox') && bgColor) {
            SearchObj.background = "background:" + bgColor + ";";
        }

        //模块的保存
        that.moduleEntity.update({data: SearchObj}, function () {
            that.searchDialog.close().remove();
        });
    }
};

module.exports = crumbs;