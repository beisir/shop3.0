/**
 * Created by 姜艳云 on 2016/12/9.
 * 选择模板
 */
var tool = require('../common/module.setting.util'),
    util = require('../common/util'),
    topTemplate = function (pageEntity, html, interfaceUrl) {
        this.topHtml = html;
        /***
         * 商铺配置数据
         */
        this.pageEntity = $.extend({}, pageEntity);
        /****
         * 接口地址
         */
        this.interfaceUrl = interfaceUrl;
        /***
         * 选择模板区域
         */
        this.templateWrap = $('[node-name="templateWrap"]');

        /***
         * 全部模板区域
         */
        this.allTemplateWrap = this.templateWrap.find('.editTemplate').eq(1);
        /***
         * 我的模板库区域
         */
        this.mytemplateWrap = this.templateWrap.find('.editTemplate').eq(2);

        /***
         * 当前用户使用的模板数据
         */
        this.template = this.pageEntity.template;

        /***
         * 是否收费会员 true表示收费用户，false表示免费
         */
        this.ismmt = this.pageEntity.ismmt;

        /***
         * 我的模板列表,模板名称不能重复，修改名称判断用到
         */
        this.templateList = [];

        /***
         * 我的模板库没有模板的提示语
         */
        this.noTemp = '<div class="mbNoneBox"><em></em><p>暂无自定义风格模板！</p></div>';

        /***
         * 公共模板切换的用户类型对象
         * @type {*[]}
         */
        this.userType = [{
            fieldType: 2,
            fieldValue: '免费用户'
        }, {
            fieldType: 1,
            fieldValue: '收费用户'
        }, {
            fieldType: 3,
            fieldValue: '定制用户'
        }];

        /***
         * 公共模板切换的颜色对象
         * @type {*[]}
         */
        this.colortype = [{
            fieldType: 1,
            className: 'tColor1',
            fieldValue: '红色'
        }, {
            fieldType: 2,
            className: 'tColor2',
            fieldValue: '绿色'
        }, {
            fieldType: 3,
            className: 'tColor3',
            fieldValue: '黄色'
        }, {
            fieldType: 4,
            className: 'tColor4',
            fieldValue: '蓝色'
        }, {
            fieldType: 5,
            className: 'tColor5',
            fieldValue: '黑色'
        }, {
            fieldType: 6,
            className: 'tColor6',
            fieldValue: '灰色'
        }];

        this.init();
    };
topTemplate.prototype = {
    init: function () {
        var that = this,
            publicTemplate = (function () {
                return $.ajax({
                    url: that.interfaceUrl.publicTemplate,
                    data: {
                        t: Math.random()
                    },
                    dataType: 'json'
                });
            })(),
            myTemplate = (function () {
                return $.ajax({
                    url: that.interfaceUrl.myTemplate,
                    data: {
                        providerid: that.pageEntity.providerid,
                        t: Math.random()
                    },
                    dataType: 'json'
                });
            })();
        $.when(publicTemplate, myTemplate).done(function (publicTempData, myTempData) {
            that.getPublicTemplate(publicTempData[0]);
            that.getMyTemplate(myTempData[0], true);
            /***
             * 绑定我的模板事件
             */
            that.myTemEvent();
            /***
             * 初始化选择模板里面的切换事件
             */
            that.templateEvent();
        }).fail(function () {
            tool.createDialog("获取模板失败");
        }).always(function () {
            /***
             * 备份模板
             */
            that.backupTemplate();
        });
    },
    /***
     *  当前模板事件，模板类型切换事件，
     */
    templateEvent: function () {
        var that = this;
        /****
         * 当前模板，全部模板，我的模板库切换
         */
        that.templateWrap.on('click', '.editBoxLeft dd', function () {
            var index = $(this).index(),
                editTemplate = that.templateWrap.find('.editBoxRight .editTemplate');
            if (!$(this).hasClass('ddCur')) {
                $(this).addClass('ddCur').siblings().removeClass('ddCur');
                editTemplate.hide();
                editTemplate.eq(index).show();
            }
        });
        /***
         * 恢复当前模板
         */
        that.templateWrap.on('click', 'button', function () {
            that.dialog('您确定恢复吗？', function () {
                $.ajax({
                    url: that.interfaceUrl.restoreTemplate,
                    data: {
                        providerid: that.pageEntity.providerid,
                        actiontype: 3,
                        t: Math.random()
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.state == 0) {
                            tool.createDialog(data.message);
                        } else {
                            /**
                             * 刷新当前页面
                             */
                            window.location.reload();
                        }
                    }
                });
            });
        });
        /****
         *  我的模板和全部模板缩率图hover事件
         */
        that.templateWrap.on('mouseover', '.TemplateImg li', function () {
            if ($(this).find('.mbName').length > 0) {
                $(this).find('.mbName').show();
            }
            $(this).addClass('TemplateCur');
        }).on('mouseout', '.TemplateImg li', function () {
            if ($(this).find('.mbName').length > 0) {
                $(this).find('.mbName').hide();
            }
            $(this).removeClass('TemplateCur');
        });
    },
    /***
     * 备份模板
     */
    backupTemplate: function () {
        var that = this,
            _menu = $('[data-node-name="navMenu"]'),
            menuRight = $('.proH2rig', _menu);

        menuRight.find('[data-node-name="backup"]').click(function () {
            if (that.templateList.length == 10) {
                that.dialog('目前已达到模板库保存数量上限，请将不常用的模板进行删除后再进行保存。');
                return false;
            }
            that.modifyTempName(null, function (inputValue, nameDialog) {
                $.ajax({
                    url: that.interfaceUrl.backupAndRelease,
                    data: {
                        actiontype: 1,
                        backupname: encodeURIComponent(inputValue),
                        providerid: that.pageEntity.providerid,
                        t: Math.random()
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.state == 0) {
                            tool.createDialog(data.message);
                        } else {
                            /**
                             * 重新获取我的模板库的全部模板，重新渲染我的模板库
                             */
                            $.ajax({
                                url: that.interfaceUrl.myTemplate,
                                data: {
                                    providerid: that.pageEntity.providerid,
                                    t: Math.random()
                                },
                                dataType: 'json',
                                success: function (data) {
                                    nameDialog.close().remove();
                                    that.getMyTemplate(data);
                                }
                            });
                        }
                    },
                    error: function () {
                        tool.createDialog('备份商铺模板失败！');
                    }
                });
            });
        });
    },
    /***
     * 初始化公共模板Html
     * @param data 公共模板数据
     */
    getPublicTemplate: function (data) {
        var that = this;
        if (data.state == 0) {
            tool.createDialog(data.message);
        } else {
            var configData = {
                publicTemData: data.data,
                getTemplateEntity: function () {
                    return JSON.stringify(this);
                }
            };

            /***
             * 获取全部模板的模板字符串
             */
            if (that.topHtml.allTempUl) {
                that.allTemplateWrap.find('.TemplateImg ul').html(mustache.render(that.topHtml.allTempUl, configData));
                /***
                 * 将自定义属性放到data缓存上
                 */
                $.each(that.allTemplateWrap.find('.TemplateImg ul li'), function (index, val) {
                    $(val).data('templateEntity', $(val).attr('templateEntity'));
                });
                /***
                 *  绑定全部模板事件
                 */
                that.publicTemEvent();
            }
        }
    },
    /***
     *  公共模板操作事件
     */
    publicTemEvent: function () {
        var that = this,
            _li = that.allTemplateWrap.find('.TemplateImg ul li');
            //是否是商盈通
            that.isCommercialVal = that.pageEntity.issyt;
            // 是否是定制用户
            that.isCustomInfo=that.pageEntity.isddz;
        /***
         * 模板缩率图点击事件
         */
        _li.click(function () {
            var templateEntity = JSON.parse($(this).data('templateEntity')),
                // isSyt = (that.isCommercialVal == undefined) ? that.pageEntity.issyt : that.isCommercialVal,
                dialogHtml = [
                    '<div class="mbAlertBtn"><button type="button" node-name="application">应用</button><button type="button" node-name="close" class="cancelBtn">关闭</button></div>',
                    '<div class="mbAlertBoxCon">',
                    '<img src="' + templateEntity.image + '" />',
                    '</div>'
                ];
            /****
             * 免费用户点击收费模板
             */
            if (that.ismmt == false && templateEntity.usertype == 1) {
                tool.createDialog('此模板是收费用户模板需升级为买卖通收费会员使用。');
            }else {
                var imageDiaLog = dialog({ //缩率图弹框
                        content: dialogHtml.join("")
                    }).showModal(),
                    _data = { //应用模板的ajax的data数据
                        templatetype: 1,
                        templateid: templateEntity.id,
                        providerid: that.pageEntity.providerid,
                        actiontype: 1,
                        templatename: encodeURIComponent(templateEntity.name)
                    },
                    imgDialogNode = $(imageDiaLog.node),
                    application = imgDialogNode.find('[node-name="application"]'), //应用按钮
                    close = imgDialogNode.find('[node-name="close"]'); //关闭按钮
                /***
                 * 应用模板
                 */
                application.click(function () {      
                  // 如果不是商盈通用户并且不是定制用户，点击应用定制模板弹出提示框   
                  if((!that.isCommercialVal&&!that.isCustomInfo)&&templateEntity.usertype == 3){
                    that.dialog('此模板需购买代运营定制版服务方可使用。','//b2b.hc360.com/bw/syt/index.html');
                  }else{
                    that.dialog('您确定使用新的网站模板吗？',
                      function () {
                        that.templateOperaAjax(_data, function () {
                          /**
                           * 应用成功后关闭弹层
                           */
                          imageDiaLog.close().remove();
                          /**
                           * 刷新当前页面
                           */
                          window.location.reload();
                        });
                      },
                      function () {
                        imageDiaLog.close().remove();
                      }
                    );
                  }

                });
                /***
                 * 关闭
                 */
                close.click(function () {
                    imageDiaLog.close().remove();
                });
            }
        });

        /****
         * 用户类型切换
         */
        that.allTemplateWrap.on('click', '.TemplateColor .hyClass a', function () {
            that.allTemplateWrap.find('.hyClass a').removeClass('hyCur');
            $(this).addClass('hyCur');
            that.findPublicTemplate();
        });
        /***
         * 颜色类型切换
         */
        that.allTemplateWrap.on('click', '.TemplateColor li', function () {
            that.allTemplateWrap.find('.TemplateColor li').removeClass('colorCur');
            $(this).addClass('colorCur');
            that.findPublicTemplate();
        });

    },
    /***
     * 初始化我的模板库Html
     * @param data 我的模板数据
     */
    getMyTemplate: function (data) {
        var that = this;
        if (data.state == 0) {
            tool.createDialog(data.message);
        } else {
            if (data.data.length == 0) {
                that.mytemplateWrap.find('.TemplateImg').html(that.noTemp);
            } else {
                /***
                 * 保存我的模板数据列表到templateList，修改名称判断重复和备份需要用到
                 */
                that.templateList = data.data;
                /***
                 * 创建我的模块库Dom结构
                 */
                var configData = {
                    myTemData: that.templateList,
                    getTemplateEntity: function () {
                        return JSON.stringify(this);
                    }
                };
                /***
                 * 创建我的模板库模板引擎
                 * @type {string}
                 */
                if (that.topHtml.myTempUl) {

                    that.mytemplateWrap.find('.TemplateImg').html(mustache.render(that.topHtml.myTempUl, configData));
                    /***
                     * 将自定义属性放到data缓存上
                     */
                    $.each(that.mytemplateWrap.find('.TemplateImg ul li'), function (index, val) {
                        $(val).data('templateEntity', $(val).attr('templateEntity'));
                    });
                }
            }
        }
    },
    /***
     * 我的模板库操作事件
     */
    myTemEvent: function () {
        var that = this;
        that.mytemplateWrap.on('click', '.TemplateImg ul li', function (event) {
            var me = $(this),
                index = me.index(),
                templateEntity = JSON.parse(me.data('templateEntity')), //当前模板的配置数据
                _data = { //ajax请求数据
                    templatetype: 2,
                    templateid: templateEntity.id,
                    providerid: that.pageEntity.providerid,
                    templatename: encodeURIComponent(templateEntity.name)
                },
                nodeName = $(event.target).attr('node-name');
            /****
             * 我的模板库----删除模板
             */
            if (nodeName == "del") {
                that.dialog(
                    '确定要删除这个模板吗？',
                    function () {
                        var data = $.extend({}, {
                            actiontype: 2
                        }, _data);
                        that.templateOperaAjax(data, function () {
                            /***
                             * 删除模板列表里面的模板
                             */
                            that.templateList.splice(index, 1);
                            me.remove();
                            /***
                             * 如果没有一个模板，显示无模板的文字提示！
                             */
                            if (that.templateList.length == 0) {
                                that.mytemplateWrap.find('.TemplateImg').html(that.noTemp);
                            }
                        });
                    }
                );
                /****
                 * 我的模板库----应用模板
                 */
            } else if (nodeName == "application") {
                that.dialog(
                    '您确定要应用这个模板么？',
                    function () {
                        var data = $.extend({}, {
                            actiontype: 1
                        }, _data);
                        that.templateOperaAjax(data, function () {
                            /***
                             * 应用模板成功后，刷新页面
                             */
                            window.location.reload();
                        });
                    }
                );
                /***
                 *   命名
                 */
            } else if (nodeName == "named") {
                /***
                 * 调用创建模板命名弹框方法；
                 */
                that.modifyTempName(
                    templateEntity.name, //模板名称
                    /***
                     * 修改模板名称的回调函数
                     * @param inputValue 修改后的模板名称
                     * @param nameDialog 当前修改模板的弹框对象
                     */
                    function (inputValue, nameDialog) {
                        var data = $.extend({}, _data, {
                            actiontype: 3,
                            templatename: encodeURIComponent(inputValue)
                        });
                        that.templateOperaAjax(data,
                            function () {
                                /***
                                 * 更新模板列表里面的模板名称
                                 */
                                that.templateList[index].name = inputValue;
                                /***
                                 * 重写缓存模板；
                                 */
                                templateEntity.name = inputValue;
                                me.data('templateEntity', JSON.stringify(templateEntity));
                                /**
                                 * 更改页面上的模板名称
                                 */
                                me.find('.mbName span').html(inputValue);
                                nameDialog.close().remove();
                            });
                    });
            }
        });
    },
    /****
     *  模板应用、 删除、 更名调用方法
     * @param data  ajax的data参数
     * @param callback 成功后的回调
     */
    templateOperaAjax: function (data, callback) {
        var that = this;
        /**
         * 添加一个随机数，防止浏览器走缓存
         */
        data.t = Math.random();
        $.ajax({
            url: that.interfaceUrl.tempUpdate,
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.state == 0) {
                    tool.createDialog(data.message);
                } else {
                    callback && callback();
                }
            },
            error: function () {
                tool.createDialog('模板应用、 删除、 更名接口失败！');
            }
        });
    },
    /***
     * 我的模板修改模板名称
     * @param name  模板的默认名称
     * @para callback 命名成功后的回调函数
     */
    modifyTempName: function (name, callback) {
        var that = this;
        /***
         * 修改模板名称Html
         */
        var views = mustache.render(that.topHtml.modifyTemp, {
            templateName: name
        });
        /***
         * 创建模板命名弹框
         */
        var nameDialog = dialog({
            title: '自定义模板命名',
            content: views
        }).showModal();

        var nameDialogWrap = $(nameDialog.node),
            _input = nameDialogWrap.find('.customInput'),
            _prompt = nameDialogWrap.find('.prompt'),
            _save = nameDialogWrap.find('.Save'),
            _cancel = nameDialogWrap.find('.Cancel');
        /***
         * 输入框获得焦点
         */
        _input.focus();
        /***
         * 修改模板弹框保存
         */
        _save.click(function () {
            var inputValue = $.trim(_input.val()),
                flag = true;
            if (inputValue.length == 0) {
                flag = false;
                _prompt.html('命名不能为空！').show();
            }
            $.each(that.templateList, function (index, val) {
                if (val.name == inputValue) {
                    flag = false;
                    _prompt.html('自定义名称不可重复').show();
                }
            });
            if (util.getByteLength(inputValue) > 12) {
                flag = false;
                _prompt.html('命名不超过6个汉字').show();
            }
            if (flag) {
                _prompt.html('').hide();
                if (callback) {
                    callback(inputValue, nameDialog);
                }
            }
        });
        /***
         *修改模板弹框取消
         */
        _cancel.click(function () {
            nameDialog.close().remove();
        });
    },
    /***
     * 检索公共模板的方法；
     */
    findPublicTemplate: function () {
        var that = this,
            userType,
            colorType,
            TemplateColor = that.allTemplateWrap.find('.TemplateColor'),
            userTypeList = TemplateColor.find('.hyClass a'), //用户类型
            colorTypeList = TemplateColor.find('ul li'), //颜色类型
            _li = that.allTemplateWrap.find('.TemplateImg ul li'); //所有模板列表
        /**
         *  获得用户类型查询条件
         */
        $.each(userTypeList, function (index, val) {
            if ($(this).hasClass('hyCur')) {
                userType = that.userType[index];
                return;
            }
        });
        /***
         * 获得颜色查询条件
         */
        $.each(colorTypeList, function (index, val) {
            if ($(this).hasClass('colorCur')) {
                colorType = that.colortype[index];
                return;
            }
        });

        /***
         * 检索满足条件的模板
         */
        _li.each(function () {
            var liEntity = JSON.parse($(this).data('templateEntity'));
            if (userType && liEntity.usertype != userType.fieldType) {
                $(this).hide();
            } else if (colorType && liEntity.colortype != colorType.fieldType) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

    },
    /***
     * 创建弹框
     * @param info 提示信息
     * @param success 成功的回调
     * @param error  失败的回调
     */
    dialog: function (info, success, error) {

       var configData = {
         title: '提示',
         content: info,
         okValue: typeof success == 'string' ? '立即申请': '确定',
         ok: function () {
           if(typeof success == 'string'){
             location.href = success;
           }else{
             success && success();
           }
           this.close().remove();
         }
       };

       if(typeof success != 'string'){
         configData = $.extend(true,configData,{
            cancelValue: '取消',
            cancel: function () {
              this.close().remove();
              error && error();
            }
         })
       }

        dialog(configData).showModal();
    }

};
module.exports = topTemplate;
