/**
 * Created by xyh on 2016/9/27.
 * [扩展橱窗模块设置]
 */
var util = require('../common/util');
var ExtendWindowUtil = function(settions, html, options) {
    var _this = this;
    _this.module = settions;
    _this.moduleBox = settions.htmlEntity; //模块对象
    _this.moduleData = settions.dataEntity; //模块配置数据
    /**为防止初始化数据过多，只截取前8个*/
    _this.moduleData.data.prolist.slice(0,8);

    _this.tempHtml = util.getTemplateFromHTML(html);//弹框模板
    _this.selectCount = _this.moduleData.data.prolist.length;//已选商机个数
    _this.totalCount = 8;//可以选择商机的总数

    _this.pageData = {
        pageindex:1,//默认当前页为第一页
        pagesize:40,//每页的页容量为40
        providerid:pageEntity.providerid
    };

    _this.options = options || {};//检测弹框

    /**
     * 异步加载的模块完成后，再初始化弹层
     */
    $.when.apply(null, _this.loadComponents()).done(function () {
        _this.initLayer();
    });
};
ExtendWindowUtil.prototype = {

    /**
     * 初始化弹层
     */
    initLayer: function(){
        var _t = this;
        var configData = {
            title : _t.moduleData.data.title,
            isChosen : function(){
                var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
                return showTitleAndBorder ? 1 :0;
            },
            selectCount : _t.selectCount,
            totalCount : _t.totalCount
        };
        _t.editDialog = dialog({
            content: mustache.render([_t.tempHtml.editDialog,_t.tempHtml.proDialog].join(''), configData),
            title:'编辑内容>扩展橱窗'
        }).showModal();
        _t.options.rendedCallback && _t.options.rendedCallback.call(_t);
        /**
         * 绑定事件
         */
        _t.bindEvent();
    },

    /**
     * 绑定事件
     */
    bindEvent: function(){
        var _t = this;
        _t.dialogWrap = $(_t.editDialog.node);
        _t.editDialogWrap = _t.dialogWrap.find("[node-name='editDialog']");//第一个弹框容器
        _t.proDialogWrap = _t.dialogWrap.find("[node-name='proDialog']") ;//选择产品弹框容器
        _t.selectProBtn = _t.editDialogWrap.find("#selectProBtn"); //选择产品按钮
        _t.saveBtn = _t.dialogWrap.find(".Save");//保存按钮
        _t.titleInput = _t.dialogWrap.find("input[name='title']");//标题文本框
        _t.showTitleAndBorderRadio = _t.dialogWrap.find("#titleAndBorder_extWin"); //板块标题栏和边栏是否选中

        /**
         * 关闭、取消弹层
         */
        _t.editDialogWrap.on('click','.t-close,.Cancel',function(){
            _t.editDialog.close().remove();
        });

        /**
         * 板块标题栏和边栏是否选中
         */
        _t.showTitleAndBorderRadio.on('click', function() {
            $(this).toggleClass("curChosen");
        });

        /**
         * 选择产品
         */
        _t.selectProBtn.on('click',function(){
            _t.createProDialog(_t.pageData);
        });

        /**
         * 保存设置
         */
        _t.saveEditDialog();
    },

    /**
     * 创建选择产品弹框
     * @param pageData  获取的在售商机数据
     */
    createProDialog: function(pageData){
        var _t = this;
        $.when(_t.getOnSaleData(pageData),_t.getOnSelectData()).done(function(data){

            /**
             * 渲染在售商机页面
             */
            _t.createOnSaleHtml(data[0],_t.proDialogWrap);

            /**
             * 创建选择产品的弹框
             */
            _t.proDialog = dialog({
                title:'扩展橱窗>插入产品',
                content: _t.proDialogWrap.html()
            }).showModal();
            _t.options.rendedCallback && _t.options.rendedCallback.call(_t);
            /**
             * 关闭选择产品弹框
             */
            $(_t.proDialog.node).find('.t-close,.Cancel').on('click',function(){
                _t.proDialog.close().remove();
            });

            /**
             * 渲染分页
             */
             _t.initPagnation(data[0].data.procount);

            /**
             * 选择产品方法
             */
            _t.selectSaleProFunc();
            /**
             * 取消选择产品方法
             */
            _t.cancelSeleProFunc();
            /**
             * 过滤在售商品方法
             */
            _t.filterSaleProFunc();
            /**
             * 保存已选产品
             */
            _t.saveSaleProFunc();

        }).fail(function(){
            _t.createDialog("网络异常，请稍后重试！");
        });

    },

    /**
     * 获取在售商机接口数据
     * @param pageData
     * @returns {*}
     */
    getOnSaleData: function(pageData){
        return $.ajax({
            type: "GET",
            dataType:'jsonp',
            jsonp:'callback',
            url:'/detail/turbine/action/GetSelectProductListAction/eventsubmit_doBusinchance/doBusinchance',
            data: pageData
        });
    },

    /**
     * 初始化已选商机数据
     * @returns {*}
     */
    getOnSelectData: function(){
        var _t = this;
        var defer = $.Deferred();

        _t.selectCount = _t.updateModuleData ? _t.updateModuleData.prolist.length : _t.moduleData.data.prolist.length;
        if (_t.selectCount === 0) {
            _t.proDialogWrap.find(".seleRight dd").html("您可以选择<span>"+_t.totalCount+"条</span>产品显示在扩展橱窗");
            _t.proDialogWrap.find("#noProListTip").show();
            _t.proDialogWrap.find("#ProListDiv").hide();
        } else {
            _t.proDialogWrap.find(".seleRight dd").html("您可以选择<b id='total_count'>"+_t.totalCount+"条</b>，已选择<span  id='select_count'>" + _t.selectCount + "条</span>");
            _t.proDialogWrap.find("#noProListTip").hide();
            _t.proDialogWrap.find("#ProListDiv").show();
        }
        //初始化已选列表
        var param = _t.updateModuleData ? _t.updateModuleData : _t.moduleData.data;
        var selectList = mustache.render(_t.tempHtml.isSelectPro,param);
        _t.proDialogWrap.find("#ProListDiv ul").html(selectList);

        defer.resolve();
        return defer;
    },

    /**
     * 在线商机接口返回的数据
     * @param res 返回的接口数据
     * @param wrap 在线商机容器
     * @param newParam  分页之后重新获取的已选商机数据
     * @param flag 代表是初始化还是搜索的标志
     */
    createOnSaleHtml: function(res,wrap,newParam,flag){
        var _t = this;
        if (res.state == 1) {
            if(res.data.prolist && res.data.prolist.length>0){
                $.each(res.data.prolist,function(k,v){
                    var param = "";
                    if(newParam && typeof newParam == "object" && newParam.prolist.length>=0){
                        param = newParam;
                    }else{
                        param = _t.updateModuleData ? _t.updateModuleData : _t.moduleData.data;
                    }
                    $.each(param.prolist,function(m,n){
                        if(v.bcid == n.bcid){
                            v.isSelect = true;
                            return false;
                        }
                    });
                });
                var prolist = mustache.render(_t.tempHtml.selectPro/*$(_t.tempHtml).get(4).innerHTML*/,res.data);

                if(wrap.find(".seleListCon dl").length > 0){
                    wrap.find(".seleListCon dl").html(prolist);
                }else{
                    wrap.find(".seleList").html('<dl><dt>' +
                        '<span class="seleTit1">产品信息</span>' +
                        '<span class="seleTit2">操作</span>' +
                        '</dt></dl>' +
                        '<div class="seleListCon"><dl>'+ prolist +'</dl></div>');
                }

            }else{
                if(flag && flag == "search"){//搜索无结果
                    wrap.find(".seleList").html('<p class="sLeftPrompt">未搜索到相关商品</p>');

                }else{//初始化无结果
                    wrap.find(".seleList").html('<p class="sLeftPrompt">商铺中暂无在售商品，<a href="http://my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cstepsupplyfirst.html" target="_blank">请补充</a></p>');
                }
            }

        }else{
            _t.createDialog(res.message);
        }
    },

    /**
     * 初始化分页组件
     * @param totalCount    总条数
     */
    initPagnation: function(totalCount){
        var _t = this;
        if(totalCount < _t.pageData.pagesize || totalCount == _t.pageData.pagesize){

            if($(_t.proDialog.node).find('.pageList').length>0){
                $(_t.proDialog.node).find('.pageList').remove();
            }
            return false;
        }

        var pageContainer =$(_t.proDialog.node).find('.pageList').length>0 ? $(_t.proDialog.node).find('.pageList'):$('<div>',{
            'class':'pageList'
        }).appendTo($(_t.proDialog.node).find('.seleList'));

        pageContainer.pagination(totalCount, {
            num_display_entries: 5, //主体页数
            link_to: "#p__id__",
            items_per_page: _t.pageData.pagesize, //一页显示多少条
            prev_text: '&nbsp;',
            next_text: '&nbsp;',
            load_first_page: false,//首次不执行callback；
            callback: function (pageIndex) {
                //重新渲染数据
                var updateParam = {
                    pageindex : pageIndex+1,
                    productname: encodeURIComponent($.trim($(_t.proDialog.node).find("#filterText").val())) || ''
                };
                var resultData = $.extend({},_t.pageData,updateParam);

                /**为保证分页之后已选择的数据在商机列表中是已选*/
                var newSelect = {'prolist':[]};
                if($(_t.proDialog.node).find("#ProListDiv").is(":visible")){
                    newSelect.prolist = $.map($(_t.proDialog.node).find("#ProListDiv li"),function(v){
                        return {
                            'bcid':$(v).find("em").attr("data-bcid")
                        };
                    });
                }

                $.when(_t.getOnSaleData(resultData)).done(function(res){
                    _t.createOnSaleHtml(res,$(_t.proDialog.node),newSelect);
                    /**保证分页之后滚动条滚动到顶部*/
                    $(_t.proDialog.node).find(".seleListCon").scrollTop(0);

                });
            }
        });

    },

    /**
     * 选择在售商机
     */
    selectSaleProFunc: function(){
        var _t = this;
        $(_t.proDialog.node).on('click','button[type="submit"][data-bcid]',function(){
            var $this = $(this);
            if(_t.selectCount == _t.totalCount){
                _t.createDialog('您选择的产品数已达上限');
                return false;
            }
            if(!$this.hasClass('gBtn2')){
                var title = $this.parent().siblings('.picboxTit').text();//选择的产品标题
                var imgSrc = $this.parent().siblings('.picbox').find('img').attr('src');//选择的产品图片链接
                var bcid = $this.attr('data-bcid');
                var data = {
                    'prolist':[
                        {
                            'bcid': bcid, //商机编号
                            'picurl': imgSrc,
                            'bcname':title
                            //'deleted':0
                        }
                    ]
                };

                //选择第一条在售商机时，改变提示文字
                if(_t.proDialogWrap.find("#ProListDiv").is(":hidden")){
                    $(_t.proDialog.node).find(".seleRight dd").html("您可以选择<b id='total_count'>"+_t.totalCount+"条</b>，已选择<span id='select_count'>1条</span>");
                    $(_t.proDialog.node).find("#noProListTip").hide();
                    $(_t.proDialog.node).find("#ProListDiv").show();
                }

                //改变已选列表
                var selectList = mustache.render(_t.tempHtml.isSelectPro,data);
                $(_t.proDialog.node).find("#ProListDiv ul").append(selectList);

                //改变按钮样式和文字
                $(this).addClass('gBtn2').text('已选择');

                //改变已选产品个数
                _t.selectCount++;
                $(_t.proDialog.node).find("#select_count").text(_t.selectCount+'条');
            }


        });
    },

    /**
     * 取消选择的产品
     */
    cancelSeleProFunc: function(){
        var _t = this;
        $(_t.proDialog.node).find('.seleRight').on('click','em[data-bcid]',function(){
            var $this = $(this);
            var bcid = $this.attr('data-bcid');

            //改变已选择产品个数
            if(!_t.selectCount) return false;
            _t.selectCount--;

            //改变文字描述
            if(_t.selectCount>0){
                $(_t.proDialog.node).find("#select_count").text(_t.selectCount+"条");
            }else{
                $(_t.proDialog.node).find("#ProListDiv").hide();
                $(_t.proDialog.node).find(".seleRight dd").html("您可以选择<span>"+ _t.totalCount +"条</span>产品显示在扩展橱窗");
                $(_t.proDialog.node).find("#noProListTip").show();
            }

            //移除取消选择的产品
            $this.closest('li').remove();

            //改变左侧取消选择的产品按钮样式
            $("button[type='submit'][data-bcid="+bcid+"]").removeClass('gBtn2').text('选择');
        });
    },

    /**
     * 过滤筛选在售商机
     */
    filterSaleProFunc: function(){
        var _t = this;
        $(_t.proDialog.node).find("button[data-name='searchBtn']").on('click',function(){
            var text = $.trim($(_t.proDialog.node).find("#filterText").val());

            var updateParam = {
                'productname': encodeURIComponent(text)
            };
            var filterParam = $.extend({},updateParam,_t.pageData);

            $.when(_t.getOnSaleData(filterParam)).done(function(res){

                /**为保证过滤之后已选择的数据在商机列表中是已选*/
                var newSelect = {'prolist':[]};
                if($(_t.proDialog.node).find("#ProListDiv").is(":visible")){
                    newSelect.prolist = $.map($(_t.proDialog.node).find("#ProListDiv li"),function(v){
                        return {
                            'bcid':$(v).find("em").attr("data-bcid")
                        };
                    });
                }

                //重新渲染数据
                _t.createOnSaleHtml(res,$(_t.proDialog.node),newSelect,"search");

                //重新渲染分页
                _t.initPagnation(res.data.procount);
            });

        });

    },

    /**
     * 保存已选在售商机
     */
    saveSaleProFunc: function(){
        var _t = this;
        $(_t.proDialog.node).find(".Save").on('click',function(){
            var resultSalePro = [];

            //已选产品对象
            if($(_t.proDialog.node).find("#ProListDiv").is(":visible")){
                resultSalePro = $.map($(_t.proDialog.node).find("#ProListDiv li"),function(v){
                    return {
                        'bcid':$(v).find("em").attr("data-bcid"),
                        'bcname':$(v).find(".picboxTit").text(),
                        'picurl':$(v).find("img").attr("src"),
                        'linkurl':$(v).find('a').attr("href")
                        //'deleted':$(v).attr("data-delete") || 0
                    };
                });
            }
            _t.updateModuleData = {
                'title':_t.moduleData.data.title,
                'showTitleAndBorder':_t.moduleData.data.showTitleAndBorder,
                'prolist':resultSalePro,
                'isSelect':true
            };

            //关闭选择产品弹框
            _t.proDialog.close().remove();

            //保存已选产品后改变第一个弹框描述信息
            $(_t.editDialog.node).find("#selectProBtn").next("span").text("已选择" + _t.selectCount + "/"+_t.totalCount+"个产品");
        });
    },

    /**
     * 保存编辑弹框（所有的弹框的保存）
     */
    saveEditDialog: function(){
        var _t = this;
        _t.saveBtn.on('click',function(){

            var title = $.trim(_t.titleInput.val());
            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;

            if (title.length === 0) {
                _t.createDialog('标题不能为空！');
                return false;
            }

            //保存的对象值
            var moduleList = $.map(_t.moduleData.data.prolist,function(v){
                return {
                    "bcid" :v.bcid
                };
            });
            var proList = _t.updateModuleData ? _t.updateModuleData.prolist : moduleList;
            if(proList.length === 0){
                _t.createDialog("您还未添加产品！");
                return;
            }
            var updateParam = {
                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
                'operatedata': { //操作内容
                    'providerid': pageEntity.providerid, //商铺编号
                    'username': pageEntity.username, //商铺用户名
                    'data': {
                       // 'title': encodeURIComponent(title),
                        'title': title,
                        'showTitleAndBorder': isshow,
                        'prolist': proList
                    } //模块配置数据
                }
            };
            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

            _t.module.update({data:updateParam.operatedata.data},function(){

                _t.editDialog.close().remove();

            });

        });

    },

    /**
     * 创建提示的弹框公用方法
     * @param content
     */
    createDialog: function(content){
        dialog({
            title: '提示',
            content: content,
            okValue: '确定',
            ok: function() {
                this.close().remove();
                return false;
            }
        }).showModal();
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

};

module.exports = ExtendWindowUtil;