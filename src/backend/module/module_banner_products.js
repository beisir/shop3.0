/**
 * Created by 姜艳云 on 2016/10/9.
 *
 *  [通栏产品]
 */
var tool = require('../common/module.setting.util'),
    util = require('../common/util');
var banProduct = function (data, html, obj) {
    this.moduleEntity = data;
    /***
     * 模块的html
     */
    this.moduleHtml = util.getTemplateFromHTML(html);
    /***
     * 分页条数
     */
    this.pageNumber = 40;
    /***
     * 选择产品的上限
     */
    this.proLimit = 20;
    /**
     * 深拷贝模块数据
     */
    this.moduleData = $.extend(true, {}, this.moduleEntity.dataEntity.data);

    /****
     * 配置对象
     * @type {*|{}}
     */
    this.option = obj || {};
    /***
     * 调用异步加载模块，执行初始化弹框
     * @type {banProduct}
     */
    var that = this;
    that.def = this.loadComponents();
    $.when.apply(null, this.def).done(function () {
        that.initLayer(html);
    });

}
banProduct.prototype = {
    /***
     * 初始化通栏产品弹框
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
            'moduleData': that.moduleData,
            'isShowTitle': that.moduleData.showTitleAndBorder == 1 ? true : false,
            'type': this.moduleData.type ? this.moduleData.type : '1',
            "picSize": this.moduleData["picsize"] ? this.moduleData["picsize"] : '3',
            'totalLen': proNumber.length,

            /**
             * 是否平铺展示
             * @returns {string}
             */
            'isTile': function () {
                if (this.type == 1) {
                    return 'curRadioBox';
                }
            },
            /**
             * 是否滚动展示
             * @returns {string}
             */
            'isRolling': function () {
                if (this.type == 2) {
                    return 'curRadioBox';
                }
            },
            /**
             * 是否是小图
             * @returns {string}
             */
            'isSmallImg': function () {
                if (this.picSize == 1) {
                    return 'curRadioBox';
                }
            },
            /**
             * 是否是中图
             * @returns {string}
             */
            'isMiddleImg': function () {
                if (this.picSize == 2) {
                    return 'curRadioBox';
                }
            },
            /**
             * 是否是大图
             * @returns {string}
             */
            'isBigImg': function () {
                if (this.picSize == 3) {
                    return 'curRadioBox';
                }
            }
        };
        /**
         * 创建弹层触发一个回调函数
         */
        that.option.rendedCallback && that.option.rendedCallback.call(that);

        that.proWrapDialog = dialog({
            content: mustache.render(dialogHtml, configData),
            title: '编辑内容>通栏产品'
        }).showModal();

        that.bindEvent();

    },
    bindEvent: function () {
        var that = this;

        /** 弹出层 **/
        that.productsWrap = $(that.proWrapDialog.node);

        /** 通栏产品设置区域 **/
        that.banProductWrap = that.productsWrap.find('[node-name="banProduct"]');

        /** 选择产品按钮 **/
        that.selectProBtn = that.banProductWrap.find('[node-name="selectPro"]');

        /** 通栏产品设置区域 保存 **/
        that.banProductWrap.on('click', '.Save', function () {
            that.saveModuleData();
        });

        /** 关闭弹层 **/
        that.banProductWrap.on('click', '.Cancel', function () {
            that.proWrapDialog.close().remove();
        });

        /** 是否显示板块标题栏及边框 **/
        that.banProductWrap.find('.chosen').click(function () {
            $(this).toggleClass('curChosen');
        });

        /** 展示方式 图片大小切换 **/
        that.banProductWrap.find('.radioCon').click(function () {
            if (!$(this).hasClass('curRadioBox')) {
                $(this).parents('.radioBoxNew').find('.radioCon').removeClass('curRadioBox');
                $(this).addClass('curRadioBox');
            }
        });

        /** 选择产品 **/
        that.selectProBtn.click(function () {
            if (!$(this).data('isClick')) {
                $(this).data('isClick', true);
                /***
                 * 显示加载中
                 */
                that.proListLoding = dialog({
                    content: '<span class="ui-dialog-loading">加载中..</span>'
                }).show();

                /***
                 * 绑定关闭事件
                 */
                that.proListLoding.addEventListener('close', function () {
                    that.proListLoding = null;
                    /** 重置选择产品按钮可点击 */
                    that.selectProBtn.data('isClick', false);
                });

                /***
                 * 初始化选择产品弹层
                 */
                that.createProductDialog();
            }
        });
    },
    /***
     * 保存模块设置
     */
    saveModuleData: function () {
        var that = this,
            proListArr = that.moduleData["prolist"],
            titleValue = $.trim(that.banProductWrap.find('[node-name="moduleTitle"]').val()),
            titleLen = titleValue.length;

        if (proListArr.length == 0) {
            tool.createDialog('您还未添加产品！');
            return;
        }
        if (titleLen === 0 || titleLen > 5) {
            var _content = (titleLen == 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
            tool.createDialog(_content);
            return;
        }
        var bannerObj = {
            title: titleValue,
            showTitleAndBorder: that.banProductWrap.find('.chosen').hasClass('curChosen') ? 1 : 0,
            type: that.getShowType('[node-name="showType"]'),
            "picsize": that.getPageSize('[node-name="imgSize"]'),
            "prolist": proListArr.map(function (val) {
                return {bcid: val.bcid};
            })
        };


        //模块保存
        that.moduleEntity.update({data: bannerObj}, function () {
            that.proWrapDialog.close().remove();
        });

    },
    /***
     *  获取图片的展示方式
     * @param wrap
     * @returns {string}
     */
    getShowType: function (wrap) {
        var radioCon = this.banProductWrap.find(wrap + ' .radioCon');
        var type = '';
        radioCon.each(function (index, val) {
            if ($(this).hasClass('curRadioBox')) {
                type = index + 1;
            }
        });
        return type;
    },
    /***
     *  获取图片大小
     * @param wrap
     * @returns {string}
     */
    getPageSize: function (wrap) {
        var radioCon = this.banProductWrap.find(wrap + ' .radioCon');
        var type = '';
        radioCon.each(function (index, val) {
            if ($(this).hasClass('curRadioBox')) {
                switch (index) {
                    case 0:  // 大图  3
                        type = 3;
                        break;
                    case 1: // 中图  2
                        type = 2;
                        break;
                    case 2:  // 小图  1
                        type = 1;
                        break;
                }
            }
        });
        return type;
    },
    /****
     *   创建选择产品的弹层
     */
    createProductDialog: function () {
        var that = this,
            _onShellData = that.getShellData({
                pageindex: 1,
                pagesize: that.pageNumber,
                providerid: pageEntity.providerid
            });

        /***
         * 拉取在线商品接口
         */
        _onShellData.done(function (data) {
            /***
             * 创建选择产品的弹框
             */
            that.proListDialog = dialog({
                title: '通栏产品>插入产品',
                content: that.moduleHtml.selectProduct
            });
            /** 选择产品弹层 **/
            that.proListWrap = $(that.proListDialog.node);
            /**
             * 拷贝默认已经选择的产品列表
             */
            that.proListDate = that.moduleData["prolist"].slice(0, that.proLimit);
            /***
             * 选择的产品个数
             */
            that.proLen = that.proListDate.length;
            /***
             * 渲染在线商品
             */
            that.getShellHtml(data, "initShop");

            /***
             * 渲染已选择的商品
             */
            that.getSelectHtml();

            /** 在售产品 **/
            that.onSellList = that.proListWrap.find('.seleListCon dl');

            /** 选择产品 **/
            that.selectList = that.proListWrap.find('.seleRightCon ul');
            /***
             * 暂无商机wrap
             */
            that.noBusiness = that.proListWrap.find('[node-name="noBusiness"]');

            /** 关闭选择产品弹层 **/
            that.proListWrap.on('click', '.Cancel', function () {
                that.proListDialog.close().remove();
            });
            /*** 修改请补充链接地址 ***/
            that.proListWrap.find('[data-node-name="Please"]').attr('href', '//my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cbusinonsale.html');

            /** 选择产品 **/
            that.chooseProduct();

            /** 撤销选择产品 **/
            that.undoSelectProduct();

            /** 搜索在线商品 **/
            that.searchProduct();

            /** 保存选择的产品 **/
            that.saveSelectProduct();

            /**
             * [在已选择产品、待选择产品包裹元素滚动至顶部或底部时，继续滚动时不会滚动整个文档]
             */
            tool.preventMousewheel(that.proListWrap.find('[data-node-name="proListWrap"] .seleListCon'));
            tool.preventMousewheel(that.proListWrap.find('.seleRight .seleRightCon'));

        }).fail(function () {
            tool.createDialog('拉取在售商品接口失败！');
        });

    },
    /**
     * 渲染在售商品Dom结构
     * @param data
     * @param callType 调用类型  initShop 初始化调用   searchShop 搜索调用
     */
    getShellHtml: function (data, callType) {
        var that = this,
            shellData = data.data,
            proData = shellData.prolist,
            shellBoxs = that.proListWrap.find('.seleList>div[data-node-name="proListWrap"]'),
            pageList = that.proListWrap.find('.seleList .pageList');
        /*** 获取在售商品失败 **/
        if (data.state == 0) {
            /*** 关闭loding **/
            that.proListLoding && that.proListLoding.close().remove();
            tool.createDialog(data.message);
            return false;
        }
        /***
         * 隐藏搜索无结果
         */
        shellBoxs.hide();
        /** 搜索结果为0 **/
        if (proData.length == 0) {
            /*** 关闭loding **/
            that.proListLoding && that.proListLoding.close().remove();
            /*** 显示无结果元素 ***/
            callType == "initShop" ? shellBoxs.eq('0').show() : shellBoxs.eq('1').show();
            /*** 移除分页 **/
            pageList.length > 0 ? pageList.remove() : "";
            /** 显示弹层 */
            that.proListDialog.showModal();
            return false;
        }
        /***
         * 显示在售商机列表
         */
        shellBoxs.eq('2').show();

        /*** 关闭loding **/
        that.proListLoding && that.proListLoding.close().remove();

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
        /***
         * 如果弹框没有打开，那么打开在售商品的弹框
         */
        if (!that.proListDialog.open) {
            that.proListDialog.showModal();
        }
        /** 初始化数据和搜索数据的时候重新创建分页 **/
        if (callType == "initShop" || callType == "searchShop") {
            that.createPagination(0, shellData.procount);
        }
    },
    /***
     * 拉取在线商品数据
     * @param pageData  在售商机列表接口参数 productname: '商品标题', pageindex:1 pagesize:"",//页码大小 supercatid: 123 //类目编号
     * @returns {*}
     */
    getShellData: function (pageData) {
        return $.ajax({
            url: '/detail/turbine/action/GetSelectProductListAction/eventsubmit_doBusinchance/doBusinchance',
            type: 'get',
            data: pageData,
            jsonp: 'callback',
            dataType: 'jsonp'
        });
    },
    /***
     * 渲染已选择的商品
     * @returns {*}
     */
    getSelectHtml: function () {
        var that = this,
            configData = {
                'proList': that.proListDate,
                'len': that.proLen,
                'isShow': function () {
                    return (this.len == 0) ? false : true;
                }
            };
        /***
         * 已选择的商品模板数据
         * @type {*|jQuery}
         */
        if (that.moduleHtml.selectProWrap) {
            /**
             * [用 mustache 组件渲染数据]
             */
            var views = mustache.render(that.moduleHtml.selectProWrap, configData);
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
     * @param pageCount  总页数
     */
    createPagination: function (index, pageCount) {
        var that = this,
            pageList = that.proListWrap.find('.seleList .pageList');

        if (pageList.length == 0) {
            pageList = $("<div class='pageList'></div>").appendTo(that.proListWrap.find('.seleList'));
        }
        pageList.pagination(pageCount, {
            num_edge_entries: 0, //边缘页数
            num_display_entries: 5, //主体页数
            current_page: index, //当前选中页
            items_per_page: that.pageNumber, //一页显示40条
            prev_text: '&nbsp;',
            next_text: '&nbsp;',
            link_to: "#p__id__",
            ellipse_text: "...",
            load_first_page: false,//首次不执行callback；
            callback: function (pageIndex) {
                var pageData = {
                    'pageindex': ++pageIndex,//当前页索引
                    'providerid': pageEntity.providerid, //商铺id
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
                 * 重新渲染在线商品数据
                 */
                that.getShellData(pageData).done(function (data) {
                    that.getShellHtml(data, 'nextPage');
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
            that.noBusiness.is(":visible") ? that.noBusiness.hide() : '';
            /**
             * 判断选择产品上线
             */
            if (that.proLen == that.proLimit) {
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
                    that.selectList.prepend(views);
                }
                /**
                 * 修改选择数量
                 */
                that.proLen++;
                that.proListWrap.find('.proLen').html(that.proLen);
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
            that.onSellList.find('dd').each(function () {
                if ($(this).attr('data-bcid') == bcId) {
                    $(this).find('.picboxBtn button').html('选择').removeClass('gBtn2');
                }
            });
            /**
             * 修改选择数量
             */
            that.proLen--;
            that.proListWrap.find('.proLen').html(that.proLen);
            /**
             * 如果没有选择产品，出现暂无商机推荐
             */
            if (that.proLen == 0) {
                that.noBusiness.show();
            }
        });
    },
    /**
     * 搜索在线商品
     */
    searchProduct: function () {
        var that = this;
        that.proListWrap.on('click', '[node-name="searchPro"]', function () {
            var title = $(this).parent('.seleProSea').find('input').val();
            var pageData = {
                productname: title.length == 0 ? "" : encodeURIComponent(title), //商品标题
                providerid: pageEntity.providerid,
                pageindex: 1,//当前页索引
                pagesize: that.pageNumber//页码大小
            };
            /**
             * 重新渲染在线商品数据
             */
            that.getShellData(pageData).done(function (data) {
                that.getShellHtml(data, "searchShop");
            });
        });
    },
    /***
     * 保存选择的产品
     */
    saveSelectProduct: function () {
        var that = this,
            proLisArr = [];
        that.proListWrap.on('click', '.Save', function () {
            that.selectList.find('li').each(function () {
                var proObj = {
                    'bcid': $(this).attr('data-bcid'),
                    'bcname': $(this).find('.picboxTit a').html(),
                    'picurl': $(this).find('.picbox img').attr('src'),
                    'linkurl': $(this).find('.picbox a').attr('href')
                };
                proLisArr.push(proObj);
            });
            /***
             * 修改默认已经选择的产品数据
             */
            that.moduleData["prolist"] = proLisArr;

            /** 修改已选择的数量 **/
            that.banProductWrap.find('.proLen').html(proLisArr.length);
            /**
             * 关闭选择产品弹层
             */
            that.proListDialog.close().remove();
        })
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
module.exports = banProduct;
