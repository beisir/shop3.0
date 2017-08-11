/**
 * Created by 姜艳云 on 2016/12/9.
 * 导航管理
 */
var tool = require('../common/module.setting.util'),
    util=require('../common/util'),
    topNav = function (pageEntity, html, interfaceUrl) {
        this.topHtml=html;
        /***
         * 商铺配置数据
         */
        this.pageEntity = $.extend({}, pageEntity);
        /****
         * 接口地址
         */
        this.interfaceUrl = interfaceUrl;
        /***
         * 导航管理区域
         */
        this.navManageWrap = $('[node-name="navManage"]');

        /***
         * 默认导航选中项目的id，默认是首页id（0）
         */
        this._defaultNavId = 0;

        /***
         * 当前用户使用的模板数据
         */
        this.template = this.pageEntity.template;

        this.initNav();
    };
topNav.prototype={
    /***
     * 导航设置
     */
    initNav: function () {
        var that = this,
            /***
             * 模块设置区域，导航列表
             */
            _ul = that.navManageWrap.find('.navManageList ul');

        $.ajax({
            url: that.interfaceUrl.navSettings,
            data: {
                templateid: that.template.id,
                t:Math.random()  //随机数防止ie9缓存

            },
            dataType: 'json',
            success: function (data) {
                if (data.state == 0) {
                    tool.createDialog(data.message);
                } else {
                    /***
                     * 将导航数据存储到navData
                     */
                    that.navData = data.data;
                    /***
                     * 存储导航模块编号，更新导航发送数据用到
                     */
                    that.moduleid = data.moduleid;
                    /***
                     * 初始化默认导航选中项的id
                     */
                    var _defaultNav = $('[data-node-name="navWrap"]').find('td a.navCur').html();
                    $.each(that.navData, function (index, val) {
                        if (val.name == _defaultNav) {
                            that._defaultNavId = val.id;
                        }
                    });
                    /***
                     * 创建模板引擎数据
                     */
                    var configData = {
                        navData: data.data,
                        getSettings: function () {
                            return JSON.stringify(this);
                        },
                        isShowNav: function () {
                            /***
                             * 如果是不可修改的，直接是选中状态  0表示不可更改
                             */
                            if (this.enabled == '0') {
                                return 'selectIcoDefault';
                            } else {
                                if (this.visible == '1') {
                                    return 'selectIcoCur';
                                } else if (this.visible == '0') {
                                    return 'selectIco';
                                }
                            }
                        },
                        upHide: function () {
                            if (this.order == 1) {
                                return 'none';
                            } else {
                                return 'block';
                            }
                        },
                        doneHide: function () {
                            if (this.order == that.navData.length) {
                                return 'none';
                            } else {
                                return 'block';
                            }
                        }
                    };
                    /***
                     * 获取导航模板数据
                     * @type {*|jQuery}
                     */
                    if (that.topHtml.navUl) {
                        _ul.html(mustache.render(that.topHtml.navUl, configData));
                        /***
                         * 将自定义属性放到data缓存上
                         */
                        $.each(_ul.find('li'), function (index, val) {
                            $(val).data('navSetting', $(val).attr('navSetting'));
                        });
                        /***
                         * 修改导航名称
                         */
                        that.changeNavName();
                        /***
                         * 修改导航的显示状态
                         */
                        that.editeShowStatus();
                        /***
                         * 导航项目上移和下移
                         */
                        that.navOrder();
                    }
                }
            },
            error: function () {
                tool.createDialog('拉取导航接口失败');
            }
        });

    },
    /**
     * 修改导航名称
     * @param _ul 导航设置下拉修改名称的当前列表
     */
    changeNavName: function () {
        var that = this,
            _ul = that.navManageWrap.find('.navManageList ul'),
            editNameBtn = _ul.find('li [node-name="showName"]').find('.navEdit'),
            editInput = _ul.find('li [node-name="editname"]').find('input');
        /***
         * 点击修改按钮，出现修改导航名称编辑框
         */
        if (!editNameBtn.data('isClick')) {
            editNameBtn.click(function () {
                var me = $(this),
                    _li=$(this).closest('li[navsetting]'),
                    editnameWrap = _li.find('[node-name="editname"]'),
                    showNameWrap= _li.find('[node-name="showName"]');
                me.data('isClick', true);
                /** 隐藏显示导航区域 **/
                showNameWrap.hide();
                /** 显示导航修改区域 **/
                editnameWrap.show();
                /** input区域获得焦点 **/
                editnameWrap.find('input').focus();
            });
        }
        /***
         * 绑定input失去焦点事件
         */
        editInput.blur(function () {
            var me = $(this),
                /***
                 * 弹框html
                 */
                dialogHtml='<div class="navPromprBox"><h4>确定要修改导航名称吗？</h4></div>',

                _id = JSON.parse(me.parents('li').data('navSetting')).id,
                /**
                 * 编辑导航名称框
                 */
                editNameWrap = me.parent(),
                /***
                 * 显示导航名称框
                 */
                showNameWrap = editNameWrap.next(),
                /**
                 * 更改之前的导航名称
                 */
                nameValue = showNameWrap.find('p').html(),
                /***
                 * 显示导航里面的编辑按钮
                 */
                nameEditBtn = showNameWrap.find('.navEdit'),
                /***
                 * 更改后的导航名称
                 */
                inputVal = $.trim(me.val());
            if (inputVal.length < 4) {
                var info=inputVal.length==0?'导航名称不能为空':'一级频道名称必须为4个字';
                that.newDialog(info, function () {
                    /***
                     * 隐藏编辑状态,显示原来导航
                     */
                    editNameWrap.find('input').val(nameValue).end().hide();
                    showNameWrap.show();
                }, function () {
                    /***
                     * 隐藏编辑状态,显示原来导航
                     */
                    editNameWrap.find('input').val(nameValue).end().hide();
                    showNameWrap.show();
                });
                return;
            }
            if(inputVal.length>4){
                dialogHtml='<div class="navPromprBox"><h4>确定要修改导航名称吗？</h4><p>提示：名称长度为4个字，超出隐藏</p></div>';
                inputVal=inputVal.substr(0,4);
            }

            that.newDialog(dialogHtml,
                function () {
                    /***
                     * 复制一份导航数据
                     */
                    var navList = $.extend(true, [], that.navData);
                    /***
                     * 修改导航数据
                     */
                    $.each(navList, function (index, val) {
                        if (val.id == _id) {
                            val.name = inputVal;
                        }
                    });
                    /***
                     * 更新导航名称
                     */
                    that.updataNavData(navList, function () {
                        /***
                         * 修改名称成功后，将修改后的数据更新navData
                         */
                        that.navData = navList.slice(0);
                        /***
                         * 更新导航html
                         */
                        that.updateNavHtml();
                        /***
                         * 重置点击状态为可点击
                         */
                        nameEditBtn.data('isClick', false);
                        /***
                         * 修改input输入框的导航名称并且隐藏编辑框
                         */
                        editNameWrap.find('input').val(inputVal).end().hide();
                        /**
                         * 修改p标签的显示导航名称
                         */
                        showNameWrap.find('p').html(inputVal).end().show();
                    });
                },
                function () {
                    /***
                     * 隐藏编辑状态,显示原来导航
                     */
                    editNameWrap.find('input').val(nameValue).end().hide();
                    showNameWrap.show();
                    nameEditBtn.data('isClick', false);
                });
        });
    },
    /***
     * 修改导航的显示状态
     *  @param _ul 导航设置下拉修改名称的当前列表
     */
    editeShowStatus: function () {
        var that = this,
            _ul = that.navManageWrap.find('.navManageList ul'),
            isShowBtn = _ul.find('li [node-name="showStatus"] em');
        /***
         * 绑定点击事件，切换显示状态
         */
        isShowBtn.click(function () {
            var me = $(this),
                _li = me.parents('li'),
                navList = $.extend(true, [], that.navData),
                navSetting = JSON.parse(_li.data('navSetting')),
                thisVisible = navSetting.visible == 0 ? 1 : 0;
            /***
             * 不可定义显示状态
             */
            if (navSetting.enabled == 0) {
                return false;
            }
            /***
             * 修改更新的导航显示状态数据
             */
            $.each(navList, function (index, val) {
                val.id == navSetting.id ? val.visible = thisVisible : null;
            });

            /***
             * 发送更新导航数据请求
             */
            that.updataNavData(navList, function () {
                /***
                 * 接口成功，更新navdata数据
                 */
                that.navData = navList.slice(0);
                /***
                 * 显示或不显示导航切换
                 */
                if (me.hasClass('selectIcoCur')) {
                    //取消显示当前导航
                    me.removeClass('selectIcoCur').addClass('selectIco');
                    navSetting.visible = 0;
                } else {
                    //显示当前导航
                    me.removeClass('selectIco').addClass('selectIcoCur');
                    navSetting.visible = 1;
                }
                /***
                 * 重写缓存数据
                 */
                _li.data('navSetting', JSON.stringify(navSetting));
                /**
                 * 更新导航Html
                 */
                that.updateNavHtml();
            });

        });
    },
    /***
     * 导航上移和下移
     */
    navOrder: function () {
        var that = this,
            _ul = that.navManageWrap.find('.navManageList ul'),
            orderEdit = _ul.find('[node-name="orderEdit"]');
        /***
         * 点击向上移动按钮
         */
        orderEdit.find('em.nUp').click(function () {
            var upBtn = $(this),
                _this = upBtn.parents('li'),
                prev = _this.prev();
            /***
             * 交换导航和缓存的数据
             */
            var navList = that.exchangeNaveData(_this, prev);
            /***
             * 发送更新导航数据请求
             */
            that.updataNavData(navList, function () {
                that.navData = navList.slice(0);
                if (prev.index() == 0) {
                    /**
                     * 当前是第二条，点击上移，那么把当前的向上移动隐藏，把上一条的向上移动显示
                     */
                    upBtn.hide();
                    prev.find('em.nUp').show();
                } else if (_this.index() == that.navData.length - 1) {
                    /**
                     * 当前是最后一条，点击上移，那么把当前的向下移动显示，把上一条的向下移动显示
                     */
                    upBtn.next('.nDown').show();
                    prev.find('.nDown').hide();
                }
                prev.before(_this);
                that.updateNavHtml();
            });
        });

        /***
         * 点击向下移动按钮
         */
        orderEdit.find('em.nDown').click(function () {
            var downBtn = $(this),
                _this = downBtn.parents('li'),
                other = _this.next();
            /***
             * 交换导航和缓存的数据
             */
            var navList = that.exchangeNaveData(_this, other);
            /***
             * 发送更新导航数据请求
             */
            that.updataNavData(navList, function () {
                that.navData = navList.slice(0);
                if (_this.index() == 0) {
                    /**
                     * 当前是第一条，点击下移，那么把当前的向上移动显示，把下一条的向上移动隐藏
                     */
                    downBtn.prev('.nUp').show();
                    other.find('em.nUp').hide();
                } else if (_this.index() == that.navData.length - 2) {
                    /**
                     * 当前是最后二条，点击下移，那么把当前的向下移动隐藏，把上一条的向下移动显示
                     */
                    downBtn.hide();
                    other.find('.nDown').show();
                }
                other.after(_this);
                that.updateNavHtml();
            });


        });
    },
    /***
     * 交换导航缓存的数据和导航配置数据
     * @param _this 点击上移或者下移的li
     * @param other 相邻的上一个或者下一个的li
     */
    exchangeNaveData: function (_this, other) {
        var navList = $.extend(true, [], this.navData),
            otherSetting = JSON.parse(other.data('navSetting')),
            _thisSetting = JSON.parse(_this.data('navSetting'));
        /***
         * 交换导航数据的order；
         */
        $.each(navList, function (index, val) {
            if (val.id == otherSetting.id) {
                val.order = _thisSetting.order;
            } else if (val.id == _thisSetting.id) {
                val.order = otherSetting.order;
            }
        });
        /***
         * 交换两个li的order；
         * @type {string|*}
         */
        var thatOrder = otherSetting.order;
        otherSetting.order = _thisSetting.order;
        _thisSetting.order = thatOrder;
        /***
         * 更新导航缓存上的数据
         */
        other.data('navSetting', JSON.stringify(otherSetting));
        _this.data('navSetting', JSON.stringify(_thisSetting));
        /***
         * 返回更改后的数据
         */
        return navList;
    },
    /***
     * 导航数据更新，ajax请求
     * @param data 导航数据
     * @param success 更新成功后的回调函数
     */
    updataNavData: function (data, success) {
        var that = this;
        return $.ajax({
            url: that.interfaceUrl.navDataUpdate,
            data: {
                data: encodeURIComponent(JSON.stringify(data)),
                moduleid: that.moduleid,
                t:Math.random()
            },
            dataType: 'json',
            success: function (data) {
                if (data.state == 0) {
                    tool.createDialog(data.message);
                } else {
                    success && success();
                }
            },
            error: function () {
                tool.createDialog('更新导航失败！');
            }
        });

    },
    /***
     * 更新导航的html结构
     */
    updateNavHtml: function () {
        var that = this;
        /***
         * 复制一份当前的导航数据
         */
        var navData = $.extend(true, [], that.navData);
        /***
         * 获得导航条模块的ul区域
         */
        var navList = $('[data-node-name="navWrap"]').find('.navBoxCon tr');
        /***
         * 增加一个首页
         */
        navData.splice(0, 0, {
            "id": "0",
            "order": "0",
            "name": "首页",
            "visible": "1",
            "enabled": "0",
            "url": "#"
        });
        /***
         * 遍历导航数据，给默认选中的当前页增加一个curr属性；
         */
        $.each(navData, function (index, nav) {
            if (nav.id == that._defaultNavId) {
                nav.curr = true;
            } else {
                nav.curr = false;
            }
        });
        /***
         * 根据order排序导航顺序
         */
        navData.sort(function (a, b) {
            return a.order - b.order;
        });
        /***
         * 创建模板字符串，更新导航
         */
        var tpl = '{{#navData}}<td style="display: {{isShow}}"><a href="{{url}}" class="{{#curr}}navCur{{/curr}}">{{name}}</a></td>{{/navData}}';
        navList.html(
            mustache.render(tpl, {
                navData: navData,
                isShow: function () {
                    if (this.visible == 1) {
                        return 'block';
                    } else {
                        return 'none';
                    }
                }
            })
        );
    },
    /***
     * 创建一个弹框
     * @param info info是弹框内容
     * @param callback 点击确定后的回调函数
     */
    newDialog: function (info, success, error) {
        dialog({
            title: '提示',
            content: info,
            okValue: '确定',
            ok: function () {
                this.close().remove();
                success && success();
            },
            cancelValue: '取消',
            cancel: function () {
                this.close().remove();
                error && error();
            }
        }).showModal();
    }
};
module.exports = topNav;