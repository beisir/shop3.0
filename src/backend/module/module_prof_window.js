/**
 * Created by 姜艳云 on 2016/10/11.
 *  [专业橱窗]
 */

/**
 *  加载工具类
 */
var tool = require('../common/module.setting.util'),
    util = require('../common/util');

/***
 * [专业橱窗构造函数]
 * @param data 包含当前模块的配置数据
 * @param html 弹层的html
 * @param obj  有一个obj.rendedCallback方法，是在第一个弹层创建是要运行的；
 */
var professionWin = function (data, html, obj) {
    /***
     * 保存模块数据
     */
    this.moduleEntity = data;

    /***
     * 分页条数
     */
    this.pageNumber = 40;
    /***
     * 选择产品的上线
     */
    this.proLimit = 16;
    this.option = obj || {};
    /**
     * 页面接口
     * @type {{onlineProduct: string, cateList: string, cateParams: string, setParam: string}}
     */
    this.proInterface = {
        /***
         * 在售商机列表接口
         */
        onlineProduct: '/detail/turbine/action/GetSelectProductListAction/eventsubmit_doBusinchance/doBusinchance',
        /***
         * 商机终极类目列表接口
         */
        cateList: '/detail/turbine/action/GetProductSupcatAction/eventsubmit_doGetsupcat/doGetsupcat',
        /***
         * 根据商机终极类目获得参数列表接口
         */
        cateParams: '/detail/turbine/action/GetParamItemAction/eventsubmit_doGetparam/doGetparam',
        /***
         * 根据终极类目获取商机列表接口
         */
        setParam: '/detail/turbine/action/GetCustomlateProductListAction/eventsubmit_doCustomlateproduct/doCustomlateproduct'
    };
    /**
     * 深拷贝模块数据
     */
    this.moduleData = $.extend(true, {}, data.dataEntity.data);
    /***
     * 保存模块html
     */
    this.moduleHtml = util.getTemplateFromHTML(html);
    /**
     * 默认选择产品的列表，或者重新选择后都将更新到这个列表里面，来查看用户选择了多少个商机
     */
    this.proListDate = this.moduleData["prolist"];
    /***
     * 默认类目id，选择产品后更新的类目id，用这个参数来判断选择的产品是哪个类目的
     */
    this.defaultSupercateId = this.moduleData["supercatid"];
    /***
     *
     * 默认类目参数列表 点击选择的类目都更新到这个defaultParamList里面 根据终极类目获取商机列表接口需要用到
     */
    this.defaultParamList = this.moduleData["paramlist"];
    /**
     * 点击的类目后，当前点击的所有参数列表，
     */
    this.paramList = [];

    /***
     * 调用异步加载模块，执行初始化弹框
     * @type {banProduct}
     */
    var that = this;
    that.def = this.loadComponents();
    $.when.apply(null, this.def).done(function () {
        that.initLayer(html);
    });
};
professionWin.prototype = {
    constructor: professionWin,
    /***
     * 初始化弹框
     * @param dialogHtml
     */
    initLayer: function (dialogHtml) {
        var that = this,
            proNumber = that.moduleData["prolist"].slice(0, that.proLimit);
        /***
         * 模板引擎配置数据
         *
         */
        var configData = {
            title: that.moduleData.title,
            isShowTitle: that.moduleData.showTitleAndBorder == 1 ? true : false,
            len: proNumber.length,
            setParamClass: function () {
                if (this.len === 0) {
                    return 'proGrayBtn';
                }
            }
        };
        /**
         * 创建弹层触发一个回调函数；
         */
        that.option.rendedCallback && that.option.rendedCallback.call(that);
        that.profWinDialog = dialog({
            title: '编辑内容>专业橱窗',
            content: mustache.render(dialogHtml, configData)
        }).showModal();
        that.bindEvent();
    },
    /***
     * 绑定事件
     */
    bindEvent: function () {
        var that = this;
        /***
         * 专业橱窗所有弹层wrap
         * @type {*|jQuery|HTMLElement}
         */
        that.dialogContainer = $(that.profWinDialog.node);

        /**
         *  专业橱窗设置Wrap
         */
        that.profWinWrap = that.dialogContainer.find('[node-name="profWin"]');

        /***
         *  选择产品按钮
         */
        that.selectProBtn = that.profWinWrap.find('[node-name="selectProBtn"]');

        /***
         *  设置参数按钮
         */
        that.setParaBtn = that.profWinWrap.find('[node-name="setParamBtn"]');
        /**
         *  设置产品参数弹层wrap
         */
        that.setParamWrap = that.dialogContainer.find('[node-name="setParam"]');

        /***
         * 关闭设置专业橱窗弹层
         */
        that.profWinWrap.on('click', '.Cancel,.t-close', function () {
            that.profWinDialog.close().remove();
        });

        /***
         * 保存设置专业橱窗弹层
         */
        that.profWinWrap.on('click', '.Save', function () {
            that.saveModuleData();
        });

        /***
         * 显示板块标题栏及边框切换
         */
        that.profWinWrap.on('click', '.chosen', function () {
            $(this).toggleClass('curChosen');
        });
        /***
         * 初始化选择类目弹层
         */
        that.selectProBtn.click(function () {
            /***
             * 设置isClick，来判断是否可点击,防止用户多次点击
             */
            if (!$(this).data('isClick')) {
                $(this).data('isClick', true);
                /***
                 * 显示加载中
                 */
                that.CateLodingDialog = dialog({
                    content: '<span class="ui-dialog-loading">加载中..</span>'
                }).show();

                /***
                 * 绑定关闭事件
                 */
                that.CateLodingDialog.addEventListener('close', function () {
                    that.CateLodingDialog = null;
                    /** 重置选择产品按钮可点击 */
                    that.selectProBtn.data('isClick', false);
                });

                /***
                 * 初始化类目
                 */
                that.initSelectCateDialog();
            }
        });

        /****
         * 初始化设置参数弹层
         */
        that.setParaBtn.click(function () {
            /***
             * 设置isClick，来判断是否可点击,防止用户多次点击,
             */
            if (that.proListDate.length > 0 && !$(this).data('isClick')) {
                $(this).data('isClick', true);
                /***
                 * 显示加载中
                 */
                that.paramLodingDialog = dialog({
                    content: '<span class="ui-dialog-loading">加载中..</span>'
                }).show();

                /***
                 * 绑定关闭设置参数loding弹框
                 */
                that.paramLodingDialog.addEventListener('close', function () {
                    that.paramLodingDialog = null;
                    /** 重置选择产品按钮可点击 */
                    that.setParaBtn.data('isClick', false);
                });

                /****
                 * 初始化设置参数的表头
                 */
                that.initParamTitle();
            }
        });

    },
    /**
     * 保存模块设置数据
     */
    saveModuleData: function () {
        var that = this,
            proListArr = that.moduleData["prolist"],
            titleValue = $.trim(that.profWinWrap.find('input[name="title"]').val()),
            titleLen = titleValue.length;
        if(that.defaultParamList.length===0){
            tool.createDialog('参数项不能为空，请设置参数项!');
            return false;
        }
        if (titleLen === 0 || titleLen > 5) {
            var _content = (titleLen === 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
            tool.createDialog(_content);
            return;
        }
        var profWindowObj = {
            title: titleValue,
            showTitleAndBorder: that.profWinWrap.find('.chosen').hasClass('curChosen') ? 1 : 0,
            supercatid: that.defaultSupercateId,
            "prolist": proListArr.map(function (val) {
                return {bcid: val.bcid};
            }),
            "paramlist": that.defaultParamList
        };
        //模块保存
        that.moduleEntity.update({data: profWindowObj}, function () {
            that.profWinDialog.close().remove();
        });
    },
    /***
     * 初始化选择类目弹框
     */
    initSelectCateDialog: function () {
        var that = this;
        /***
         * 获取所有类目
         */
        that.getAjaxDef(that.proInterface.cateList, {"providerid": pageEntity.providerid}).done(function (data) {
            if (data.state == 0) {
                /***
                 * 关闭类目loding弹框
                 */
                that.CateLodingDialog && that.CateLodingDialog.close().remove();
                tool.createDialog(data.message);
                return;
            }
            var configData = data.data;
            if (configData.length == 0) {
                /***
                 * 关闭类目loding弹框
                 */
                that.CateLodingDialog && that.CateLodingDialog.close().remove();
                tool.createDialog('无可选类目，请先发布商品到相应类目中');
            } else {
                /***
                 * 关闭类目loding弹框
                 */
                that.CateLodingDialog && that.CateLodingDialog.close().remove();
                /***
                 * 创建选择类目弹框
                 */
                that.cateListDialog = dialog({
                    title: '选择产品类目',
                    content: that.moduleHtml.selectCategory
                }).showModal();

                /**
                 * 选择类目弹框wrap
                 */
                that.selectCateDialogWrap = $(that.cateListDialog.node);

                /**
                 * 选择类目列表li
                 */
                that.cateList = that.selectCateDialogWrap.find('[node-name="cateList"]');

                /***
                 * 初始化默认选中的类目
                 */
                $.each(configData, function (index, val) {
                    if (val.supercatid == that.defaultSupercateId) {
                        val.isSelect = true;
                    }
                });
                /**
                 * [用mustache组件初始化选择类目]
                 */
                if (that.moduleHtml.cateListModule) {
                    var views = mustache.render(that.moduleHtml.cateListModule, {
                        "cateDate": configData,
                        "stringify": function () {
                            return JSON.stringify(this);
                        }
                    });
                    that.cateList.html(views);
                }
                /***
                 * 关闭设选择类目弹层
                 */
                that.selectCateDialogWrap.on('click', '.Cancel', function () {
                    that.cateListDialog.close().remove();

                });

                /***
                 * 点击每个类目初始化选择产品弹层
                 */
                that.cateList.find('li').click(function () {
                    var me = $(this);
                    /***
                     * 类目data缓存中的isClick是false，或者undefined是可以点击的，防止用户多次点击
                     */
                    if (!me.data('isClick')) {
                        me.data('isClick', true);
                        /***
                         * 显示加载中
                         */
                        that.proLodingDialog = dialog({
                            content: '<span class="ui-dialog-loading">加载中..</span>'
                        }).show();

                        /***
                         * 绑定关闭事件
                         */
                        that.proLodingDialog.addEventListener('close', function () {
                            that.proLodingDialog = null;
                            /** 重置选择产品按钮可点击 */
                            me.data('isClick', false);
                        });
                        /***
                         * 初始化当前类目的产品弹层
                         */
                        that.initSelectProductDialog(me);
                    }
                });

                /***
                 * 把自定义属性缓存到data缓存里面
                 */
                that.cateList.find('li').each(function (index, val) {
                    $(val).data('cateEntity', $(val).attr('cateEntity'));
                });


            }

        }).fail(function () {
            that.CateLodingDialog && that.CateLodingDialog.close().remove();
            tool.createDialog('获取商机终极类目接口失败！');
        });
    },
    /***
     * 初始化选择产品弹框
     * @param cate  当前点击的类目
     */
    initSelectProductDialog: function (cate) {
        var that = this,
            cateEntity = that.cateList.find('li').eq(cate.index()).data('cateEntity');
        /***
         * 当前类目所有后台返回的配置数据cateEntity
         */
        that.cateEntity = JSON.parse(cateEntity);

        /***
         * 初始化在线商品接口
         */
        var _onShellData = that.getAjaxDef(that.proInterface.onlineProduct, {
            pageindex: 1,
            pagesize: that.pageNumber,
            providerid: pageEntity.providerid,
            supercatid: that.cateEntity.supercatid
        });

        _onShellData.done(function (data) {
            /***
             * 创建选择产品的弹框
             */
            that.proListDialog = dialog({
                title: '专业橱窗>插入产品',
                content: that.moduleHtml.selectProduct
            });

            /** 选择产品弹层 **/
            that.proListWrap = $(that.proListDialog.node);

            /**
             * 拷贝默认已经选择的产品列表
             */
            that.proListDate = that.moduleData["prolist"].slice(0, that.proLimit);
            /***
             * 渲染在线商品
             */
            that.getShellHtml(data, "initShop");

            /***
             * 初始化已选择的产品
             */
            that.getSelectHtml();

            /**  已经选择产品wrap **/
            that.selecProWrap = that.proListWrap.find('.seleRight');
            /***
             * 在售产品wrap
             */
            that.onlineProList = that.proListWrap.find('.seleListCon dl');

            /** 选择产品的个数 **/
            that.productLen = that.selecProWrap.find('ul li').length;

            /***
             * 显示已经选择的产品个数区域
             */
            that.selectProLenWrap = that.selecProWrap.find('[node-name="selectProLenWrap"]');

            /***
             * 暂无商机wrap
             */
            that.noBusiness = that.proListWrap.find('[node-name="noBusiness"]');
            /****
             * 修改当前类目名称
             */
            that.proListWrap.find('.seleClass span').html(cate.find('a').html());

            /*** 修改请补充链接地址 ***/
            that.proListWrap.find('[data-node-name="Please"]').attr('href', '//my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cbusinonsale.html');

            /** 关闭选择产品弹层 **/
            that.proListWrap.on('click', '.Cancel,.returnCate', function () {
                that.proListDialog.close().remove();
            });

            /** 选择产品 **/
            that.chooseProduct();

            /** 撤销选择产品 **/
            that.undoSelectProduct();

            /** 搜索在线商品 **/
            that.searchProduct();

            /** 保存选择的产品 **/
            that.saveSelectProduct();
        });
    },
    /**
     * 获取一个异步的ajax回调函数
     * @param url  ajax的url
     * @param pageData
     * @returns {*}
     */
    getAjaxDef: function (url, pageData) {
        return $.ajax({
            url: url,
            type: 'get',
            data: pageData,
            jsonp: 'callback',
            dataType: 'jsonp'
        });
    },
    /**
     * 渲染在售商品Dom结构
     * @param data
     * @param getShelType
     */
    getShellHtml: function (data, getShelType) {
        var that = this,
            shellData = data.data,
            proData = shellData.prolist,
            pageList = that.proListWrap.find('.seleList .pageList');
        shellBoxs = that.proListWrap.find('.seleList>div[data-node-name="proListWrap"]');
        /*** 获取在售商品失败 **/
        if (data.state == 0) {
            /**关闭选择产品loding */
            that.proLodingDialog && that.proLodingDialog.close().remove();
            tool.createDialog(data.message);
            return false;
        }
        /***
         * 隐藏搜索无结果
         */
        shellBoxs.hide();

        /** 搜索结果为0 **/
        if (proData.length == 0) {
            /***
             * 关闭选择产品loding
             */
            that.proLodingDialog && that.proLodingDialog.close().remove();

            getShelType == "initShop" ? shellBoxs.eq('0').show() : shellBoxs.eq('1').show();
            /*** 移除分页 **/
            pageList.length > 0 ? pageList.remove() : "";

            /** 显示弹层选择产品弹层*/
            that.proListDialog.showModal();
            return false;
        }
        /***
         * 显示在售商机列表
         */
        shellBoxs.eq('2').show();

        /**关闭选择产品loding */
        that.proLodingDialog && that.proLodingDialog.close().remove();

        /***
         * 循环当前数据跟默认选择产品的列表，初始化已选择产品
         */
        $.each(proData, function (index, pro) {
            var bcId = pro.bcid;
            $.each(that.proListDate, function (index, val) {
                if (val.bcid == bcId) {
                    pro.isChoose = true;
                    return;
                }
            });
        });
        /***
         * 在售商机列表模板数据
         * @type {*|jQuery}
         */
        if (that.moduleHtml.onlineProModule) {
            var views = mustache.render(that.moduleHtml.onlineProModule, {
                proList: proData
            });
            that.proListWrap.find('.seleListCon dl').html(views);
            /***
             * 初始化图片路径
             */
           tool.initImgSrc(that.proListWrap.find('.seleListCon dl dd'));
        }

        /** 如果弹框没有打开，那么打开在售商品的弹框 */
        if (!that.proListDialog.open) {
            that.proListDialog.showModal();
        }

        /** 初始化数据和搜索数据的时候重新创建分页 **/
        if (getShelType == "initShop" || getShelType == "searchShop") {
            that.createPagination(0, shellData.procount);
        }

    },
    /***
     * 渲染已选择的商品 返回一个延迟对象
     * @param superCatId 点击的类目id
     * @returns {*}
     */
    getSelectHtml: function () {
        var that = this,
            configData = {
                'proList': that.proListDate,
                'len': that.proListDate.length,
                'isShow': function () {
                    return (this.len === 0) ? false : true;
                }
            };
        /***
         * 如果点击的类目id是moduleData的id（即初始化的defaultSupercateId），那就初始化已选择产品
         */
        if (that.cateEntity.supercatid != that.defaultSupercateId) {
            configData.len = 0;
            configData.proList = [];
        }
        /***
         * 已选择的商品模板数据
         * @type {*|jQuery}
         */
        if (that.moduleHtml.selectProModule) {
            /**
             * 【用mustache组件渲染已选择的商品]
             */
            var views = mustache.render(that.moduleHtml.selectProModule, configData);
            that.proListWrap.find('.seleRight').html(views);
            /***
             * 初始化图片路径
             */
            tool.initImgSrc(that.proListWrap.find('.seleRight li'));
        }
    },
    /**
     * 创建分页插件
     * @param index 当前页面
     */
    createPagination: function (index, pageCount) {
        var that = this,
            pageList = that.proListWrap.find('.seleList .pageList');
        /***
         * 创建分页包裹元素
         */
        if (pageList.length === 0) {
            pageList = $("<div class='pageList'></div>").appendTo(that.proListWrap.find('.seleList'));
        }
        pageList.pagination(pageCount, {
            num_edge_entries: 0, //边缘页数
            num_display_entries: 5, //主体页数
            current_page: index, //当前选中页
            items_per_page: that.pageNumber, //一页显示多少条
            prev_text: '&nbsp;',
            next_text: '&nbsp;',
            link_to: "#p__id__",
            ellipse_text: "...",
            load_first_page: false,//首次不执行callback；
            callback: function (pageIndex) {
                var pageData = {
                    'pageindex': ++pageIndex,//当前页索引
                    'providerid': pageEntity.providerid, //商铺id
                    'supercatid': that.cateEntity.supercatid, //类目id
                    'pagesize': that.pageNumber//页码大小
                };
                /***
                 * 如果有搜索过的标题，分页的时候传入后台
                 */
                var title = that.proListWrap.find('.seleProSea input').val();
                if (title.length > 0) {
                    pageData.productname = encodeURIComponent(title);
                }
                /**
                 * 点击下一页重新渲染在线商品数据
                 */
                that.getAjaxDef(that.proInterface.onlineProduct, pageData).done(function (data) {
                    that.getShellHtml(data, "nextPage");
                });
            }
        });
    },

    /***
     * 选择产品
     */
    chooseProduct: function () {
        var that = this;
        that.proListWrap.on('click', '[node-name="selectBtn"]', function () {
            /**
             * 隐藏暂无商机推荐
             */
            if (that.noBusiness.is(":visible")) {
                that.noBusiness.hide();
            }
            /**
             * 判断选择产品上线
             */
            if (that.productLen == that.proLimit) {
                tool.createDialog('您选择的产品已达上限!');
                return false;
            }
            if (!$(this).hasClass('gBtn2')) {
                $(this).addClass('gBtn2').html('已选择');
                var proWrap = $(this).parents('dd'),
                    thisProObj = {
                        "linkurl": proWrap.find('.picbox a').attr('href'),
                        "picurl": proWrap.find('.picbox img').attr('src'),
                        "bcname": proWrap.find('.picboxTit a').html(),
                        "bcid": proWrap.attr('data-bcid')
                    };
                /***
                 * 更新选择的产品数组
                 */
                that.proListDate.unshift(thisProObj);
                /***
                 * 添加到已选择产品列表
                 * @type {string[]}
                 */
                if (that.moduleHtml.productHtml) {
                    var views = mustache.render(that.moduleHtml.productHtml, thisProObj);
                    that.selecProWrap.find('ul').prepend(views);
                }
                /**
                 * 修改选择数量
                 */
                that.productLen++;
                that.selectProLenWrap.html(that.productLen + '条');
            }
        });
    },
    /***
     * 撤销选择产品
     */
    undoSelectProduct: function () {
        var that = this;
        that.proListWrap.on('click', '[node-name="closePro"]', function () {
            var bcId = $(this).parent('li').attr('data-bcid');
            /***
             * 更新选择的产品
             */
            $.each(that.proListDate, function (index, val) {
                if (val.bcid == bcId) {
                    that.proListDate.splice(index + 1, 1);
                    return false;
                }
            });
            /**
             * 移除选择列表里面的li
             */
            $(this).parents('li').remove();
            /**
             * 将在售商品的已选择改成选择
             */
            that.onlineProList.find('dd').each(function () {
                if ($(this).attr('data-bcid') == bcId) {
                    $(this).find('.picboxBtn button').html('选择').removeClass('gBtn2');
                }
            });
            /**
             * 修改选择数量
             */
            that.productLen--;
            that.selectProLenWrap.html(that.productLen + '条');
            /**
             * 如果没有选择产品，出现暂无商机推荐
             */
            if (that.productLen == 0) {
                that.noBusiness.show();
            }
        })
    },
    /**
     * 搜索在线商品
     */
    searchProduct: function () {
        var that = this;
        that.proListWrap.on('click', '[node-name="search"]', function () {
            var title = $(this).parent('.seleProSea').find('input').val();
            var pageData = {
                productname: title.length == 0 ? "" : encodeURIComponent(title), //商品标题
                providerid: pageEntity.providerid,
                supercatid: that.cateEntity.supercatid, //商品标题
                pageindex: 1,//当前页索引
                pagesize: that.pageNumber//页码大小
            }
            /**
             * 搜索标题重新渲染在线商品数据
             */
            that.getAjaxDef(that.proInterface.onlineProduct, pageData).done(function (data) {
                that.getShellHtml(data, "searchShop");
            });
        })
    },
    /***
     *  保存已经选择的产品
     */
    saveSelectProduct: function () {
        var that = this,
            proLisArr = [];
        that.proListWrap.on('click', '.Save', function () {
            that.selecProWrap.find('ul li').each(function () {
                var proObj = {
                    'bcid': $(this).attr('data-bcid'),
                    'bcname': $(this).find('.picboxTit a').html(),
                    'picurl': $(this).find('.picbox img').attr('src'),
                    'linkurl': $(this).find('.picbox a').attr('href')
                };
                proLisArr.push(proObj);
            });
            /***
             * 修改默认已经选择的产品
             */
            that.moduleData["prolist"] = proLisArr;
            /***
             * 选择的类目不等于默认的类目，那么参数列表重置为空
             */
            if (that.defaultSupercateId !=that.cateEntity.supercatid) {
                /** 重置参数数组 **/
                that.defaultParamList = [];
                /** 更新选择的初始化类目id,初始化选择产品 **/
                that.defaultSupercateId = that.cateEntity.supercatid;
            }

            /** 修改已选择的数量和设置参数的class样式 **/
            that.profWinWrap.find('.proLen').html(proLisArr.length);
            if (proLisArr.length == 0 && !that.selectProBtn.hasClass('proGrayBtn')) {
                that.setParaBtn.addClass('proGrayBtn');
            } else {
                that.setParaBtn.removeClass('proGrayBtn');
            }
            /**
             * 关闭选择产品和选择类目弹层
             */
            that.cateListDialog.close().remove();
            that.proListDialog.close().remove();
        })
    },
    /***
     * 初始化设置产品参数表头
     * @returns {*}
     */
    initParamTitle: function () {
        var that = this;
        that.getAjaxDef(that.proInterface.cateParams, {
            "providerid": pageEntity.providerid,
            "supercatid": that.defaultSupercateId
        }).done(function (data) {
            /** 关闭loding **/
            that.paramLodingDialog && that.paramLodingDialog.close().remove();

            if (data.state == 0) {
                tool.createDialog(data.message);
                return;
            }
            /** 赋值所有参数列表 */
            that.paramList = data.data;

            /** 参数列表为空 **/
            if (that.paramList.length == 0) {
                tool.createDialog(data.message);
            } else {
                /***
                 * 复制一份所有参数列表
                 */
                var paramList = that.paramList.slice(0, that.paramList.length);
                /***
                 *  必填参数项目在前面，按照type排序所有当前类目列表
                 */
                paramList.sort(function (prevParaObj, nextParaObj) {
                    return prevParaObj.type - nextParaObj.type;
                })
                /***
                 * 没有选择类目，或者选择了类目跟默认类目相同都用默认的参数，否则就并且从所有参数列表按顺序截取四个，设置参数只能设置四个
                 */
                if (that.defaultSupercateId != that.moduleEntity.dataEntity.data.supercatid) {
                    that.defaultParamList = paramList.slice(0, paramList.length).slice(0, 4);
                }else{
                    that.defaultParamList = that.moduleEntity.dataEntity.data.paramlist;
                }
                /***
                 * 创建模板对象
                 * @type {{paramObj: 排序后的类目对象, paramArr: 类目名称}}
                 */
                var configData = {
                    paramObj: that.defaultParamList,
                    paramArr: paramList,
                    getClass: function () {
                        var _val, me = this;
                        $.each(that.defaultParamList, function (index, val) {
                            /**
                             * 比对paramObj里面的id和defaultParamList的id，返回2,3,4,5，等自增的className
                             */
                            if (val.name == me.name) {
                                _val = index + 2;
                                return false;
                            }
                        });
                        return _val;
                    },
                    getParamSet: function () {
                        return JSON.stringify(this);
                    }
                };
                /***
                 * 设置产品参数表头模板数据
                 * @type {*|jQuery}
                 */
                if (that.moduleHtml.headerModule) {
                    /**
                     * [异步加载 mustache 组件后再继续模块初始化]
                     */
                    var views = mustache.render(that.moduleHtml.headerModule, configData);
                    that.setParamWrap.find('.pTitBox').html(views);
                }
                that.setParamWrap.find('.pTitBox select option').each(function () {
                    var paramObj = JSON.parse($(this).parents('select').attr('_defaultParam'));
                    /***
                     * 初始化默认下拉选中
                     */
                    if ($(this).html() == paramObj.name) {
                        $(this).attr('selected', true);
                    }
                })
                /***
                 * 初始化表格内容
                 */
                that.initParamContent(that.setParamWrap)
            }

        }).fail(function () {
            /***
             * 关闭loding
             */
            that.paramLodingDialog && that.paramLodingDialog.close().remove();
        })
    },
    /***
     *
     * 初始化设置产品参数内容
     * @param  _defaultParam  默认选中的参数列表
     */
    initParamContent: function (wrap) {
        var that = this,
            paramlistArr = that.defaultParamList.map(function (val) {
                return encodeURIComponent(val.name);
            }),
            prolistArr = that.moduleData["prolist"].map(function (val) {
                return val.bcid
            });
        /***
         * 商机列表的ajax请求的data参数
         */
        var ajaxData = {
            providerid: pageEntity.providerid,//商铺id
            supercatid: that.defaultSupercateId,//终极类目id
            paramlist: paramlistArr.join(','),//参数列表
            prolist: prolistArr.join(',')//商机id列表
        }
        /***
         * 根据终极类目参数获取商机列表，填充页面表格
         */
        that.getAjaxDef(that.proInterface.setParam, ajaxData).done(function (paramData) {
            if (paramData.state == 0) {
                /** 关闭loding **/
                that.paramLodingDialog && that.paramLodingDialog.close().remove();
                tool.createDialog(paramData.message);
                return;
            }
            /** 关闭loding **/
            that.paramLodingDialog && that.paramLodingDialog.close().remove();
            /***
             * 根据prolistArr排序后台返回的参数值列表（sortProListDate），将顺序排列成跟选择产品的顺序一致
             * @type {Array}
             */
            that.sortProListDate = paramData.data;
            that.sortProListDate.sort(function (prev, next) {
                var prev = prolistArr.indexOf(prev.bcid);
                var next = prolistArr.indexOf(next.bcid);
                return prev - next;
            });
            /***
             * 创建表格内容
             * @type {string}
             */
            that.createParamContent(wrap);
            /***
             * 创建设置参数弹框，修改参数也会走这个方法，用setParamDialog判断，只初始化一个弹框
             */
            if (!that.setParamDialog) {
                that.initSetParamDialog();
            }

        }).fail(function () {
            /***
             * 关闭loding
             */
            that.paramLodingDialog && that.paramLodingDialog.close().remove();
        })
    },
    /***
     *  创建参数表格内容
     * @param wrap
     */
    createParamContent: function (wrap) {
        var that = this;
        /***
         * 拼接html，插入产品参数列表
         */
        var template = '{{#proListDate}}<dd>';
        template += '<div class="pList1">{{bcname}}</div>';
        /***
         * 循环表头默认选中的参数字段名称，构建字段内容模板引擎
         */
        for (var i = 0; i < that.defaultParamList.length; i++) {
            var className = i + 2;
            template += '<div class="pList' + className + '">{{' + that.defaultParamList[i].fieldname + '}}</div>';
        }

        template += '<div class="pList6">{{#formatPrice}}{{price}}元/{{unit}}{{/formatPrice}}{{^formatPrice}}面议{{/formatPrice}}</div>';

        template += '</dd>{{/proListDate}}';
        /***
         * 加载模板引擎渲染数据
         */
        var views = mustache.render(template, {
            proListDate: that.sortProListDate,
            formatPrice: function () {
                if (parseFloat(this.price) === 0) {
                    return false;
                }
                return true;
            }
        });
        /***
         * 更新页面结构
         */
        wrap.find('[node-name="paramContent"]').html(views);
    },
    /***
     * 初始化设置参数弹框操作事件
     */
    initSetParamDialog: function () {
        var that = this;
        /***
         * 创建弹框
         */
        that.setParamDialog = dialog({
            title: '设置产品参数',
            content: that.setParamWrap.html()
        }).showModal();

        /***
         * 设置参数外层包裹元素
         * @type {*|jQuery|HTMLElement}
         */
        that.setParamDialogWrap = $(that.setParamDialog.node);
        /***
         * 将存储在表头的select和option里面的attr放在data缓存里面
         */
        that.setParamDialogWrap.find('.pTitBox select option').each(function () {
            var paramObj = JSON.parse($(this).parents('select').attr('_defaultParam'));
            $(this).data('optionParam', JSON.parse($(this).attr('optionParam')));
            $(this).parents('select').data("_defaultParam", paramObj);
        });
        /***
         * 关闭弹框
         */
        that.setParamDialog.addEventListener('close', function () {
            that.setParamDialog.close().remove();
            that.setParamDialog = null;
        });
        /***
         * 绑定类目下拉菜单
         */
        that.setParamDialogWrap.on('change', '.pTitBox select', function () {
            var index = $(this).parent().index(),
                optionParam = $(this).find('option:selected').data('optionParam');
            /***
             * 更新默认选中的参数数组
             * @type {*|jQuery}
             */
            that.defaultParamList[index] = optionParam;
            /***
             * 更新商品参数列表
             */
            that.initParamContent(that.setParamDialogWrap);
        });
        /***
         * 确定按钮
         */
        that.setParamDialogWrap.on('click', '.Save', function () {
            that.savePrarmData();
        });
        /***
         * 取消按钮
         */
        that.setParamDialogWrap.on('click', '.Cancel', function () {
            that.setParamDialog.close().remove();
        });
    },
    /***
     * 保存参数设置
     */
    savePrarmData: function () {
        var that = this,
            isSave = true,
            fieldArr = [];
        /***
         * 从字段名参数列表中取出参数名
         */
        $.each(that.defaultParamList, function (index, val) {
            fieldArr.push(val.name);
        });
        /***
         * 循环所有参数名
         */
        $.each(fieldArr.sort(), function (index, val) {
            if (fieldArr[index + 1] == val) {
                tool.createDialog('产品参数项不能重复，请更改！');
                isSave = false;
                return false;
            }
        });
        if (isSave) {
            that.setParamDialog.close().remove();
        }
    },
    /***
     * 异步加载所有组件，返回一个延迟对象
     * @returns {*}
     */
    loadComponents: function () {
        var mustacheDef = $.Deferred(),
            paginationDef = $.Deferred();
        require.ensure([], function (require) {
            require('mustache');
            mustacheDef.resolve();
        }, 'components/mustache/mustache');
        require.ensure([], function (require) {
            require('jquery_pagination');
            paginationDef.resolve();
        }, 'components/jquery.pagination');
        return [mustacheDef, paginationDef];
    }

}
module.exports = professionWin

