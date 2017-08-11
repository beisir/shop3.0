/**
 * Created by 姜艳云 on 2016/12/9.
 * 顶部操作区域入口文件
 */
var tool = require('../common/module.setting.util'),
    util = require('../common/util'),
    topOperaArea = function(pageEntity) {
        /***
         * 商铺配置数据
         */
        this.pageEntity = $.extend({}, pageEntity);
        /***
         * 当前用户使用的模板数据
         */
        this.template = this.pageEntity.template;
        /***
         * 布局枚举值，1：侧栏在左，2：侧栏在右；
         */
        this.layout = this.pageEntity.layout;
        /***
         * 顶部操作内容区域
         */
        this.topOperaWrap = $('[data-node-name="editBox"]');
        /****
         * 接口地址
         */
        this.interfaceUrl = {
                /***
                 * 顶部操作区域Html
                 */
                topHtml: "/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=topOperationArea",
                /***
                 * 我的模板库
                 */
                myTemplate: '/detail/turbine/action/GetCustomTemplateListAction/eventsubmit_doCustomlate/doCustomlate',
                /***
                 * 全部模板
                 */
                publicTemplate: '/detail/turbine/action/GetListOfCommonTemplateAction/eventsubmit_doCommontemplate/doCommontemplate',
                /****
                 * 模板应用、 删除、 更名接口
                 */
                tempUpdate: '/detail/turbine/action/AppDeleteRenameTempAction/eventsubmit_doExecute/doExecute',
                /***
                 * 板式更新接口
                 */
                indexLayout: '/detail/turbine/action/PlateTypeUpdatingAction/eventsubmit_doUpdatelayout/doUpdatelayout?',
                /***
                 * 导航管理导航数据列表接口
                 */
                navSettings: '/detail/turbine/action/NavDataListAction/eventsubmit_doGetnavlist/doGetnavlist',
                /***
                 * 导航数据更新接口
                 */
                navDataUpdate: '/detail/turbine/action/NavDataUpdateAction/eventsubmit_doUpdatenav/doUpdatenav',
                /***
                 * 备份、 发布接口
                 */
                backupAndRelease: '/detail/turbine/action/BackupAndReleaseAction/eventsubmit_doExecute/doExecute',
                /****
                 * 恢复接口
                 */
                restoreTemplate: '/detail/turbine/action/ResumeTemplateAction/eventsubmit_doExecute/doExecute',
                /***
                 * 全局样式更新接口
                 */
                styleUpdate: '/detail/turbine/action/GlobalStyleUpdateAction/eventsubmit_doUpdateglobalstyle/doUpdateglobalstyle',
                /***
                 * 退出地址
                 */
                exit: "/detail/turbine/action/ajax.TemplateAjaxAction/eventsubmit_doQuitout/doQuitout"
            };
            /***
             * 异步加载页面引用的组件，加载成功调用init方法初始化顶部操作区域
             * @type {topOperaArea}
             */
        var that = this;
        that.def = this.loadComponents();
        $.when.apply(null, that.def).done(function() {
            that.getTopHtml();
        });

    };

topOperaArea.prototype = {
    /***
     * 获取顶部操作区域Html
     */
    getTopHtml: function() {
        var that = this;
        $.ajax({
            type: "GET",
            url: that.interfaceUrl.topHtml,
            data: {
                t: Math.random()
            },
            dataType: 'jsonp',
            success: function(html) {
                that.topHtml = util.getTemplateFromHTML(html);
                var configData = {
                    thumbnail: that.template.thumbnail,
                    tplName: that.template.name,
                    leftLayout: function() {
                        if (that.layout == 2) {
                            return 'Format1ImgCur';
                        }
                    },
                    rightLayout: function() {
                        if (that.layout == 1) {
                            return 'Format2ImgCur';
                        }
                    }
                };
                if (that.topHtml.topOperation) {
                    that.topOperaWrap.html(mustache.render(that.topHtml.topOperation, configData));
                }
                that.getModule();
                that.topEvent();

            },
            error: function() {
                tool.createDialog('获取顶部操作区html失败！');
            }
        });
    },
    /***
     *  获取四个模块的js文件
     */
    getModule: function() {
        var that = this,
            _layout = require('./top.layout'),
            _top = require('./top.nav'),
            _style = require('./top.style'),
            _template = require('./top.template'),
            moduleArr = [_layout, _top, _style, _template];
        /***
         * 初始化每个模块
         */
        $.each(moduleArr, function(index, val) {
            new val(that.pageEntity, that.topHtml, that.interfaceUrl);
        });
    },
    /***
     * 绑定顶部操作区域事件
     */
    topEvent: function() {
        var that = this,
            exitBtn = $('[data-node-name="exitBtn"]'),
            _menu = $('[data-node-name="navMenu"]'),
            menuLeft = $('.proH2left', _menu),
            menuRight = $('.proH2rig', _menu),
            reList = $('.reBoxAlert', menuRight),

            /**
             * [_btnShowGuider 建站向导按钮]
             * @type {Object}
             */
            _btnShowGuider = $('[data-node-name="guider"]');

        /***
         * 板式布局到导航管理的四个页签切换
         */
        menuLeft.on('click', 'a', function() {
            var me = $(this),
                thatEditBox = that.topOperaWrap.find('.editBoxCon').eq(me.index());
            /***
             * 点击四个页签，如果下面设置层已经显示那么隐藏，如果是隐藏的，那么打开对应设置层
             */
            if (thatEditBox.is(':visible')) {
                that.topOperaWrap.hide().find('.editBoxCon').hide();
                menuLeft.find('a').removeClass('leftCur');
            } else {
                that.topOperaWrap.show().find('.editBoxCon').hide();
                me.addClass('leftCur').siblings().removeClass('leftCur');
                thatEditBox.show();
            }
        });

        /***
         * 退出
         */
        exitBtn.click(function() {
            that.dialog('您确认要退出网站设定后台吗？退出前请确认您的最新设定已保存并应用。', function() {
                window.location.href = that.interfaceUrl.exit;
            });
        });

        /***
         * 恢复下拉菜单
         */
        menuRight.find('.reBox,.reBoxAlert').mouseover(function() {
            reList.show();
        }).mouseout(function() {
            reList.hide();
        });

        /***
         * 恢复事件
         */
        reList.find('a').click(function() {
            that.restoreTemplate($(this));
        });

        /***
         * 发布
         */
        menuRight.find('.rigCur').click(function() {
            that.release();
        });

        /**
         * [生成 建站向导 弹出框DOM元素]
         */
        that.guiderDialogEntity = dialog({
            innerHTML: that.topHtml.guider || '',
            autofocus: false
        });

        /**
         * [绑定 建站向导 弹出框关闭按钮点击事件]
         */
        $(that.guiderDialogEntity.node).find('.close').click(function() {
            that.guiderDialogEntity.close();
        });

        /**
         * [绑定 建站向导 按钮点击事件]
         */
        _btnShowGuider.click(function(event) {
            that.guiderDialogEntity.showModal();
        });
    },

    /***
     * 恢复商铺模板
     */
    restoreTemplate: function(me) {
        var that = this,
            actiontype = me.index() + 1,
            dialogHtml = actiontype == 1 ? '您确认要将网站恢复至默认风格吗？' : '您确认要将网站恢复至最后一次保存的风格吗？';
        this.dialog(
            dialogHtml,
            function() {
                $.ajax({
                    url: that.interfaceUrl.restoreTemplate,
                    data: {
                        actiontype: actiontype,
                        providerid: that.pageEntity.providerid,
                        t: Math.random()
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.state == 0) {
                            tool.createDialog(data.message);
                        } else {
                            /**
                             * 刷新当前页面
                             */
                            window.location.reload();
                        }
                    },
                    error: function() {
                        tool.createDialog('恢复商铺模板失败！');
                    }
                });
            }
        );
    },
    /***
     * 发布模板
     */
    release: function() {
        var that = this;
        that.dialog(
            '点击确定后，您本次对商铺进行的装修将立即生效！',
            function() {
                $.ajax({
                    url: that.interfaceUrl.backupAndRelease,
                    data: {
                        actiontype: 2,
                        providerid: that.pageEntity.providerid,
                        t: Math.random()
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.state == 0) {
                            tool.createDialog(data.message);
                        } else {
                            tool.createDialog('发布商铺模板成功！');
                        }
                    },
                    error: function() {
                        tool.createDialog('发布商铺模板失败！');
                    }
                });
            });
    },
    /***
     * 创建弹框
     * @param info 提示信息
     * @param success 成功的回调
     * @param error  失败的回调
     */
    dialog: function(info, success, error) {
        dialog({
            title: '提示',
            content: info,
            okValue: '确定',
            ok: function() {
                this.close().remove();
                success && success();
            },
            cancelValue: '取消',
            cancel: function() {
                this.close().remove();
                error && error();
            }
        }).showModal();
    },
    /***
     * 异步加载所有组件，返回一个延迟对象
     * @returns {*}
     */
    loadComponents: function() {
        var mustacheDef = $.Deferred();
        require.ensure([], function(require) {
            require('mustache');
            mustacheDef.resolve();
        }, 'components/mustache/mustache');

        /**
         * [webuploaderDeferred 创建加载 webuploader 延迟对象]
         * @type {Object}
         */
        var webuploaderDeferred = $.Deferred();
        require.ensure([], function(require) {
            require('webuploader');
            webuploaderDeferred.resolve();
        }, 'components/webuploader/webuploader');

        /**
         * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
         * @type {Object}
         */
        var imgLiquidDeferred = $.Deferred();
        require.ensure([], function(require) {
            require('jquery_imgLiquid');
            imgLiquidDeferred.resolve();
        }, 'components/jquery_imgLiquid');

        return [mustacheDef, webuploaderDeferred, imgLiquidDeferred];
    }

};

module.exports = topOperaArea;