/**
 *  Created by xyh on 2016/9/19.
 * [util 导入通用工具函数模块]
 * @type {Object}
 */
var util = require('../common/util');

/**
 *
 * @param settions  模块业务对象
 * @param html  模块设置表单HTML
 * @param options   模块设置配置项
 * @constructor
 */
var FullAdsUtil = function(settions, html, options) {
    var _this = this;
    _this.module = settions;
    _this.moduleBox = settions.htmlEntity; //模块对象
    _this.moduleData = $.extend(true, {}, settions.dataEntity); //模块配置数据

    /**为防止初始化数据过多，翻页图片最多只取6个，产品轮播最多只取8个*/
    _this.moduleData.data.piclist.slice(0, 6);
    _this.moduleData.data.prolist.slice(0, 8);

    _this.copy_moduleData = $.extend(true, {}, settions.dataEntity); //模块配置数据
    _this.options = options || {};
    _this.tempHtml = util.getTemplateFromHTML(html);
    _this.pageData = {
        pageindex: 1, //默认当前页为第一页
        pagesize: 40, //每页的页容量为40
        providerid: pageEntity.providerid

    };
    _this.selectCount = _this.moduleData.data.prolist.length; //已选产品个数
    _this.totalCount = 6; //可以选择产品的总数

    /**
     * webuploader配置参数
     * @type {{swf: string, server: string, formData: {operType: string, picstr: (*|string)}, fileVal: string, threads: number, crop: boolean, fileSingleSizeLimit: number, accept: {title: string, extensions: string, mimeTypes: string}, duplicate: boolean, auto: boolean}}
     */
    _this.webuploderObj = {
        swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf?t=' + Math.random(),
        server: 'http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //上传文件服务接口地址
        formData: {
            /**
             * [operType 操作类型设置为上传图片]
             */
            operType: 'upload',

            /**
             * [picstr 加密信息picstr]
             * @type {String}
             */
            picstr: $.trim($("#picstr").val()) || ''
        },
        fileVal: 'file',
        threads: 1,
        // crop: true,//是否允许裁剪
        fileSizeLimit: 5 * 1024 * 1024, //限制单个文件大小5 M
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,png',
            mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
        },
        duplicate: true, //是否可以上传重复文件，默认为false
        auto: true //设置为 true 后，不需要手动调用上传，有文件选择即开始上传
    };

    /**
     * 异步加载的模块完成后，再初始化弹层
     */
    $.when.apply(null, _this.loadComponents()).done(function() {
        _this.initLayer();
    });

};

FullAdsUtil.prototype = {

    /**
     * 初始化弹层
     */
    initLayer: function() {
        var _t = this;
        var configParam = {
            type: function() {
                return _t.moduleData.data.type == 1 ? 1 : 0;
            },
            transition: function() {
                return [{
                    'key': '左右切换',
                    'value': 0
                }, {
                    'key': '上下切换',
                    'value': 1
                        // }, {
                        //     'key': '百叶窗',
                        //     'value': 2
                }];
            },
            interval: function() {
                return [{
                    'pause': 3
                }, {
                    'pause': 5
                }];
            }
        };

        //初始化编辑弹框并显示
        _t.editDialog = dialog({
            title: '编辑内容>宽屏广告',
            content: mustache.render([_t.tempHtml.editDialog, _t.tempHtml.modifyProDialog, _t.tempHtml.proSingleDialog, _t.tempHtml.proBatchDialog].join(''), configParam)
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
    bindEvent: function() {
        var _t = this;
        _t.dialogWrap = $(_t.editDialog.node);
        _t.editDialogWrap = _t.dialogWrap.find("[node-name='editDialog']"); //第一个弹框
        _t.modifyProDialogWrap = _t.dialogWrap.find("[node-name='modifyProDialog']"); //图片修改弹框
        _t.proSingleDialogWrap = _t.dialogWrap.find("[node-name='proSingleDialog']"); //单个产品弹框
        _t.proBatchDialogWrap = _t.dialogWrap.find("[node-name='proBatchDialog']"); //批量产品弹框
        _t.picLi = _t.editDialogWrap.find("#picList li"); //每一行图片设置的li
        /**
         * 初始化切换效果
         */
        _t.editDialogWrap.find(".layout-info:eq(1) #transitionDiv select").val(_t.moduleData.data.transition);

        /**
         * 初始化间隔时间
         */
        _t.editDialogWrap.find(".layout-info:eq(1) #pauseDiv select").val(_t.moduleData.data.pause / 1000);

        /**
         * 初始化广告形式
         */
        if (_t.copy_moduleData.data.type == 1) {
            $("[data-type='pagePic']").addClass('curRadioBox');
            $("[data-name='pagePicDiv']").show();
            $("[data-name='loopProDiv']").hide();
        } else {
            $("[data-type='loopPro']").addClass('curRadioBox');
            $("[data-name='loopProDiv']").show();
            $("[data-name='pagePicDiv']").hide();
        }

        /**
         * 初始化图片地址
         */
        if (_t.copy_moduleData.data.piclist.length > 0) {
            $.each(_t.copy_moduleData.data.piclist, function(i, v) {
                $(_t.picLi[i]).find(".inputW220 input").val(v.picurl);
                $(_t.picLi[i]).find(".inputW210 input").val(v.linkurl);
            });
        }

        /**
         * 广告形式切换
         */
        _t.editDialogWrap.find(".layout-info:first .radioCon").on('click', function() {
            var $this = $(this);
            var type = $(this).attr("data-type");
            $this.addClass('curRadioBox').siblings(".radioCon").removeClass('curRadioBox');
            $("[data-name='" + type + "Div']").show().siblings("[data-name $= 'Div']").hide();
            /**为防止IE8下切换时出现半截弹框*/
            _t.editDialog.focus();
        });

        /**
         * 清空文本框
         */
        _t.editDialogWrap.find("span[data-name='clearBtn']").on('click', function() {
            var $this = $(this);
            if ($.trim($this.parent().siblings(".inputW220").find("input").val()) == "" && $.trim($this.parent().siblings(".inputW210").find("input").val()) == "") {
                return false;
            }
            dialog({
                title: '提示',
                content: "确定要清除当前图片及链接地址吗？",
                okValue: '确定',
                cancelValue: '取消',
                ok: function() {
                    this.close().remove();
                    $this.parent().siblings(".inputW220,.inputW210").find("input").val("");
                    return false;
                },
                cancel: function() {
                    this.close().remove();
                    return false;
                }
            }).showModal();
        });

        /**
         * 上移
         */
        _t.editDialogWrap.find("span[data-name='upBtn']").on('click', function() {
            var $this = $(this);
            var ul = $this.closest("ul");
            var li = $this.closest("li");
            li.insertBefore(li.prev("li"));
            if (li.is(ul.children(":first"))) {
                $(this).addClass('arrowGray-up').removeClass('arrowBlue-up');
                li.next("li").find("[data-name='upBtn']").removeClass('arrowGray-up').addClass('arrowBlue-up');
            } else {
                var downBtn = $(this).siblings("[data-name='downBtn']");
                if (downBtn.hasClass('arrowGray-down')) {
                    downBtn.removeClass('arrowGray-down').addClass('arrowBlue-down');
                    li.next("li").find("[data-name='downBtn']").addClass('arrowGray-down').removeClass('arrowBlue-down');
                }
            }
        });

        /**
         * 下移
         */
        _t.editDialogWrap.find("span[data-name='downBtn']").on('click', function() {
            var $this = $(this);
            var ul = $this.closest("ul");
            var li = $this.closest("li");
            li.insertAfter(li.next("li"));
            if (li.is(ul.children(":last"))) {
                $(this).addClass('arrowGray-down').removeClass('arrowBlue-down');
                li.prev("li").find("[data-name='downBtn']").addClass('arrowBlue-down').removeClass('arrowGray-down');
            } else {
                var upBtn = $(this).siblings("[data-name='upBtn']");
                if (upBtn.hasClass('arrowGray-up')) {
                    upBtn.removeClass('arrowGray-up').addClass('arrowBlue-up');
                    li.prev("li").find("[data-name='upBtn']").addClass('arrowGray-up').removeClass('arrowBlue-up');
                }
            }

        });

        /**
         * 上传图片
         */
        // _t.editDialogWrap.find("[data-class='custom_uploadBtn']").on('click', function() {
        //     _t.clickTarget = $(this);
        // });
        _t.uploadImgFunc();

        /**
         * 选择产品
         */
        _t.editDialogWrap.find("a[data-name='selectProBtn']").on('click', function() {
            _t.createModifyProDialog();
        });

        /**
         * 弹框关闭、取消
         */
        _t.editDialogWrap.find(".t-close,.Cancel").on('click', function() {
            _t.editDialog.close().remove();
        });

        /**
         * 弹框保存
         */
        _t.editDialogWrap.find(".Save").on('click', function() {
            var picLiNew = _t.editDialogWrap.find("#picList li");
            //广告形式
            var type = _t.editDialogWrap.find(".layout-info:first .radioCon:first").hasClass("curRadioBox") ? 1 : 2;
            //切换效果
            var transition = _t.editDialogWrap.find(".layout-info:eq(1) #transitionDiv select").val();
            //间隔时间
            var pause = _t.editDialogWrap.find(".layout-info:eq(1) #pauseDiv select").val() * 1000;
            var picList = [];
            picList = $.map(picLiNew, function(v) {
                if ($.trim($(v).find(".inputW220 input").val()) == "" && $.trim($(v).find(".inputW210 input").val()) == "") return;

                /**外链是否有效，有效则保存，无效返回空*/
                var linkUrl = $.trim($(v).find(".inputW210 input").val());
                var linkAttr = util.parseURL(linkUrl);
                if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
                    linkUrl = "";
                } else {
                    linkUrl = linkAttr.source;
                }
                return {
                    'picurl': $.trim($(v).find(".inputW220 input").val()),
                    'linkurl': linkUrl
                };
            });
            if (!validatePic(picList)) {
                _t.createDialog("请填写正确的图片地址");
                return false;
            }

            function validatePic(picList) {
                var flag = true;
                $.each(picList, function(i, v) {
                    if (v.picurl == "") {
                        flag = false;
                        return;
                    }
                });
                return flag;
            }
            if (type == 1 && picList.length < 1) {
                _t.createDialog("请上传不少于1张翻页图片");
                return false;
            }
            if (type == 2 && _t.copy_moduleData.data.prolist.length < 1) {
                _t.createDialog("您还未添加产品！");
                return false;
            }

            var moduleData = {
                'type': type,
                'transition': transition,
                'pause': pause,
                'piclist': picList
            };
            $.extend(_t.copy_moduleData.data, moduleData);

            /**
             * 选择的产品链接若是100*100，保存原图链接
             */
            var result = $.extend(true, {}, _t.copy_moduleData.data);
            $.each(result.prolist, function(i, v) {
                if ((/(\.){2}/g).test(v.picurl)) {
                    v.picurl = v.picurl.split(/(\.){2}/g)[0];
                }
            });

            /**
             * 获取翻页图片中每张图最大的高度
             */
            function getMaxHeightDef() {
                var heightArray = [];
                $.each(result.piclist, function(i, v) {
                    var heightDef = $.Deferred();
                    heightArray.push(heightDef);
                    var imgUrl = v.picurl;
                    if (imgUrl == "" || !imgUrl) {
                        return true;
                    }
                    var img = new Image();
                    img.onload = function() {
                        heightDef.resolve(this.height);
                    };
                    img.onerror = function() {
                        heightDef.resolve(0);
                    };
                    img.src = imgUrl;
                });
                return heightArray;
            }

            $.when.apply(null, getMaxHeightDef()).done(function() {

                var maxHeight = Math.max.apply(null, arguments);
                if (!maxHeight || maxHeight == 0) {
                    $.extend(result, {
                        'height': ""
                    });
                } else {
                    var height = maxHeight + "px";
                    $.extend(result, {
                        'height': height
                    });
                }

                /**
                 * 模块保存
                 */
                _t.module.update({
                    data: result
                }, function() {
                    _t.editDialog.close().remove();
                });

            });

        });

        /**
         * 预览
         */
        _t.editDialogWrap.find("#previewBtn").on('click', function() {
            var $this = $(this);
            var picLiNew = _t.editDialogWrap.find("#picList li");
            //广告形式
            var type = _t.editDialogWrap.find(".layout-info:first .radioCon:first").hasClass("curRadioBox") ? 1 : 2;
            //切换效果
            var transition = _t.editDialogWrap.find(".layout-info:eq(1) #transitionDiv select").val();
            //间隔时间
            var pause = _t.editDialogWrap.find(".layout-info:eq(1) #pauseDiv select").val() * 1000;
            var picList = [];
            picList = $.map(picLiNew, function(v) {
                if ($.trim($(v).find(".inputW220 input").val()) == "" && $.trim($(v).find(".inputW210 input").val()) == "") return;
                return {
                    'picurl': $.trim($(v).find(".inputW220 input").val()),
                    'linkurl': $.trim($(v).find(".inputW210 input").val())
                };
            });
            if (!validatePic(picList)) {
                _t.createDialog("请填写正确的图片地址");
                return false;
            }

            function validatePic(picList) {
                var flag = true;
                $.each(picList, function(i, v) {
                    if (v['picurl'] == "") {
                        flag = false;
                        return;
                    }
                });
                return flag;
            }
            if (type == 1 && picList.length < 1) {
                _t.createDialog("请上传不少于1张翻页图片");
                return false;
            }
            var moduleData = {
                'type': type,
                'transition': transition,
                'pause': pause,
                'piclist': picList
            };
            $.extend(_t.copy_moduleData.data, moduleData);

            /**
             * 选择的产品链接若是100*100，保存原图链接
             */
            var result = $.extend(true, {}, _t.copy_moduleData.data);
            $.each(result['prolist'], function(i, v) {
                if ((/(\.){2}/g).test(v['picurl'])) {
                    v['picurl'] = v['picurl'].split(/(\.){2}/g)[0];
                }
            });
            /**
             * 为防止IE浏览器Url过长，预览哪种类型，传该类型数据，但产品轮播数据6张图片仍过长，故把bcname也删除
             */
            if (type == 1) {
                delete result["prolist"];
                if (result["piclist"].length > 0) {
                    $.each(result["piclist"], function(i, v) {
                        if ($.trim(v['linkurl']) == "") {
                            delete v['linkurl'];
                        }
                    });
                }
            } else if (type == 2) {
                delete result["piclist"];
                if (result["prolist"].length > 0) {
                    $.each(result["prolist"], function(i, v) {
                        delete v['bcname']
                    });
                }
            }
            var param = encodeURIComponent(JSON.stringify(result));
            var previewUrl = "http://style.org.hc360.cn/js/module/shop3.0/dist/backend/preview/module_ads.html?" + param;
            //预览...
            $this.attr("target", "_blank");
            $this.attr("href", previewUrl);

        });

    },

    /**
     * 上传文件方法
     */
    uploadImgFunc: function() {
        var _t = this;

        var webupload = $.extend({}, _t.webuploderObj, {
            pick: _t.editDialogWrap.find("[data-class='custom_uploadBtn']").selector,
            compress: {
                width: 1920,
                height: 1080
            }
            // compress: {
            //     width: 1920,
            //     height: 1080,

            //     // 图片质量，只有type为`image/jpeg`的时候才有效。
            //     quality: 90,

            //     // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            //     allowMagnify: false,

            //     // 是否允许裁剪。
            //     crop: true,

            //     // 是否保留头部meta信息。
            //     preserveHeaders: true,

            //     // 如果发现压缩后文件大小比原来还大，则使用原来图片
            //     // 此属性可能会影响图片自动纠正功能
            //     noCompressIfLarger: false,

            //     // 单位字节，如果图片大小小于此值，不会采用压缩。
            //     compressSize: 0
            // }
        });

        var uploader = webuploader.create(webupload);

        //校验不通过
        uploader.on('error', function(type) {
            if (type == 'Q_TYPE_DENIED') {
                _t.createDialog('只能上传jpg、jpeg、gif、png格式的图片');
            } else if (type == 'Q_EXCEED_SIZE_LIMIT' || type == 'F_EXCEED_SIZE') {
                _t.createDialog('上传图片不能超过5M');
            } else {
                _t.createDialog('上传失败请重新上传！');
            }
        });

        //上传成功
        uploader.on('uploadSuccess', function(file, res) {
            if (res.state == 0) {
                _t.createDialog(res.message);
                return false;
            }

            /**
             * [btnCurrentUploader 获取当前上传按钮]
             * @type {Object}
             */
            var btnCurrentUploader = $('#rt_' + file.source.ruid);
            if (btnCurrentUploader.length) {
                btnCurrentUploader.closest('li').find('input[type="text"]:first').val(res.result.url);
            }
        });

    },

    /**
     * 创建修改弹框
     */
    createModifyProDialog: function() {
        var _t = this;

        //默认选中单张图片修改
        _t.modifyProDialogWrap.find("[data-name='singleModifyDiv']").show();
        _t.modifyProDialogWrap.find("[data-name='batchModifyDiv']").hide();

        //弹层显示
        _t.modifyProDialog = dialog({
            title: '编辑内容>单张图片修改',
            content: _t.modifyProDialogWrap.html(),
            onclose: function() {
                //关闭取消时将已选产品和已选个数还原
                _t.modifyProDialog.copy_moduleData = null;
                _t.selectCount = _t.copy_moduleData.data.prolist.length;
                //上传的图片恢复默认
                //$(_t.modifyProDialog.node).find("#imgContainer").removeAttr("src");
                if ($(_t.modifyProDialog.node).find("#imgContainer").length > 0) {
                    $(_t.modifyProDialog.node).find("#imgContainer").remove();
                }
                //如果jcrop存在，销毁
                if (_t.jcrop) {
                    _t.jcrop.destroy();
                }
                //预览图片层销毁
                $("#previewContainer").remove();
                _t.picParam = "";
            }
        }).showModal();
        _t.options.rendedCallback && _t.options.rendedCallback.call(_t);

        _t.modifyProDialog.copy_moduleData = $.extend(true, {}, _t.copy_moduleData);

        _t.picCropperDiv = $(_t.modifyProDialog.node).find("div[data-name='picCropperDiv']"); //本地上传图片裁剪div
        _t.closeAndCancelDialogBtn_modify = $(_t.modifyProDialog.node).find(".t-close,.Cancel"); //修改弹框关闭、取消按钮
        _t.batchUploadBtn = $(_t.modifyProDialog.node).find("[data-name='batchUploadProBtn']"); //批量上传产品按钮
        _t.proListContainer = $(_t.modifyProDialog.node).find('#proListContainer');
        _t.batchProListContainer = $(_t.modifyProDialog.node).find('#batchProListContainer');
        _t.saveProListBtn = $(_t.modifyProDialog.node).find('.Save'); //保存按钮
        _t.linkUrlInput = $(_t.modifyProDialog.node).find('#linkUrlInput'); //输入链接地址文本框


        /**
         * 绑定事件
         */
        _t.bindModifyProDialogEvent();

    },


    bindModifyProDialogEvent: function() {
        var _t = this;
        var tempData = $.extend(true, {}, _t.modifyProDialog.copy_moduleData);

        /**
         * 初始化已有图片
         */
        _t.initSelectProList(tempData);



        /**
         * 单张图片修改
         */
        $(_t.modifyProDialog.node).on('click', '#proListContainer li', function() {

            var li = $(this),
                liPic = li.siblings().find('.picbox a'),
                liBtn = li.siblings().find('.changeImg a');
            var currentLinkUrl = li.find('.picbox a').attr('data-href');
            currentLinkUrl = ($.trim(currentLinkUrl) == 'javascript:;') ? "" : currentLinkUrl;
            //该图片和按钮加上选中样式
            li.find(".picbox a").addClass('boxBlueBor');
            li.find('.changeImg a').addClass('cBtnCur');
            //$this.addClass('cBtnCur').parent().siblings().find('a').addClass('boxBlueBor');

            //其他兄弟元素去掉选中样式
            liPic.removeClass('boxBlueBor');
            liBtn.removeClass('cBtnCur');

            //图片链接显示到文本框可以修改
            _t.linkUrlInput.val(currentLinkUrl);

            //默认选择产品选中
            $(_t.modifyProDialog.node).find("span[data-name='uploadType']:eq(0)").addClass('curradioImg');
            $(_t.modifyProDialog.node).find("span[data-name='uploadType']:eq(1)").removeClass('curradioImg');

            //如果是占位的图片，本地上传图片隐藏；如果修改的是已存在的商机，本地上传图片显示
            if (li.find(".changeImg a").attr('data-bcid')) {
                $(_t.modifyProDialog.node).find('li[data-flag="picModify"]').show();
                $(_t.modifyProDialog.node).find('div[data-name="picCropperDiv"]').hide();
                _t.linkUrlInput.parent().hide();
            } else {
                $(_t.modifyProDialog.node).find('li[data-flag="picModify"]').hide();
                $(_t.modifyProDialog.node).find('div[data-name="picCropperDiv"]').hide();
                _t.linkUrlInput.parent().hide();
            }
            if (_t.jcrop) _t.jcrop.destroy();
            $("#previewContainer").remove();
            //为防止第二次进入imgContainer是个空白框，由于第一次jcrop给加上了style，故每点击时去除style
            if ($(_t.modifyProDialog.node).find("#imgContainer").length > 0) {
                $(_t.modifyProDialog.node).find("#imgContainer").remove();
            }
            _t.picParam = "";
            //$(_t.modifyProDialog.node).find("#imgContainer").removeAttr('style');
        });

        /**
         * 插入形式切换
         */
        $(_t.modifyProDialog.node).find("div[data-name='switchType'] a").on('click', function() {
            var $this = $(this);
            var divName = $this.attr('data-name');
            var siblingsDivName = $this.siblings('a').attr('data-name');
            $this.addClass('changeImgBtn').removeClass('insertImgBtn').siblings('a').removeClass('changeImgBtn').addClass('insertImgBtn');
            $("div[data-name='" + divName + "Div']").show();
            $("div[data-name='" + siblingsDivName + "Div']").hide();
            //初始化已选产品数据
            var tempData = $.extend(true, {}, _t.modifyProDialog.copy_moduleData);
            _t.initSelectProList(tempData);

            //默认选择产品选中，本地上传图片隐藏
            $(_t.modifyProDialog.node).find("span[data-name='uploadType']:eq(0)").addClass('curradioImg');
            $(_t.modifyProDialog.node).find("span[data-name='uploadType']:eq(1)").removeClass('curradioImg');
            $(_t.modifyProDialog.node).find('li[data-flag="picModify"]').hide();
            $(_t.modifyProDialog.node).find('div[data-name="picCropperDiv"]').hide();
            $(_t.modifyProDialog.node).find('#linkUrlInput').parent().hide();

            //如果jcrop存在，销毁
            if (_t.jcrop) _t.jcrop.destroy();
            //预览图片层销毁
            $("#previewContainer").remove();
        });

        /**
         * 上传图片方式切换
         */
        $(_t.modifyProDialog.node).find("span[data-name='uploadType']").on('click', function() {
            var $this = $(this);
            var ul = $this.closest("ul"),
                li = $this.closest("li");
            $this.addClass('curradioImg');
            li.siblings().find("span[data-name='uploadType']").removeClass('curradioImg');

            if (li.is(ul.children(":last"))) {
                _t.picCropperDiv.show();
                $(_t.modifyProDialog.node).find('#linkUrlInput').parent().show();
            } else {
                _t.picCropperDiv.hide();
                $(_t.modifyProDialog.node).find('#linkUrlInput').parent().hide();
            }

            //原图方式默认选中
            $(_t.modifyProDialog.node).find("[data-type='orginal']").addClass("curradioImg");
            $(_t.modifyProDialog.node).find("[data-type='cropper']").removeClass("curradioImg").hide();
            //如果jcrop存在，销毁
            if (_t.jcrop) _t.jcrop.destroy();
            //预览图片层销毁
            $("#previewContainer").remove();
            //上传的图片恢复默认
            if ($(_t.modifyProDialog.node).find("#imgContainer").length > 0) {
                $(_t.modifyProDialog.node).find("#imgContainer").remove();
            }
            _t.picParam = "";
            //$(_t.modifyProDialog.node).find("#imgContainer").removeAttr("src");
        });

        /**
         * 单产品上传操作（选择产品上传和本地上传）
         */
        $(_t.modifyProDialog.node).find("span[data-name='uploadType']").siblings().on('click', function() {
            var $this = $(this);
            var siblingsRadio = $this.siblings('span');

            //上传按钮旁边单选择框没有选中不进行下面操作
            if (!siblingsRadio.hasClass('curradioImg')) return false;

            //没有选中修改的产品元素给提示
            if (!_t.proListContainer.find('.changeImg a').hasClass('cBtnCur')) {
                _t.createDialog('请先选择要修改的产品');
                return false;
            }

            if ($this.attr('data-name') == 'selectProUpload') { //选择产品上传

                var updateObj = _t.proListContainer.find(".changeImg a[class='cBtnCur']").closest('li');

                _t.createSingleProDialog(_t.proSingleDialogWrap, updateObj);

            }

        });
        //本地上传并提交
        _t.locateUploadPic();



        /**
         * 上传本地图片的保存
         */
        $(_t.modifyProDialog.node).find("#locatePicSave").on('click', function() {
            //修改的对象
            var updateObj = _t.proListContainer.find(".changeImg a[class='cBtnCur']").closest('li');

            //修改对象的linkUrl
            //var orginalLinkUrl = updateObj.find(".picbox a").attr('href');

            //修改对象的bcid
            var old_bcid = updateObj.find(".changeImg a").attr("data-bcid");

            var imgC = $(_t.modifyProDialog.node).find("#imgContainer");
            var locate_upload_type = $(_t.modifyProDialog.node).find("[data-name='load_pic_type'] span").filter(".curradioImg").attr("data-type");
            var picUrl = imgC.attr("src"); //图片url

            //var linkUrl = _t.validateProLinkUrl(orginalLinkUrl,$.trim(_t.linkUrlInput.val()));//链接url

            if (!picUrl) {
                _t.createDialog("请先上传图片");
                return false;
            }

            if (locate_upload_type == "cropper") { //裁剪保存
                if (!_t.picParam) { //没有设置裁切选择框，默认原图上传
                    updateObj.find(".picbox img").attr("src", picUrl);
                    var index;
                    $.each(_t.modifyProDialog.copy_moduleData.data['prolist'], function(j, k) {
                        if (k.bcid == old_bcid) {
                            index = j;
                            return false;
                        }
                    });
                    var proList_update = $.extend((_t.modifyProDialog.copy_moduleData.data['prolist'])[index], {
                        'picurl': picUrl
                    });

                    _t.modifyProDialog.copy_moduleData.data['prolist'].splice(index, 1, proList_update);
                } else { //设置了裁切选择框
                    var cropData = {
                        leftUpX: _t.picParam.x,
                        leftUpY: _t.picParam.y,
                        rightDownX: _t.picParam.x2,
                        rightDownY: _t.picParam.y2,
                        fileURL: picUrl,
                        picstr: $.trim($("#picstr").val()) || '',
                        operType: 'upload',
                        actType: 'crop'
                    };
                    $.ajax({
                        type: "GET",
                        url: 'http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //用于文件上传的服务器端请求地址
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        data: cropData,
                        success: function(res) { //服务器成功响应处理函数
                            if (res.state) {

                                updateObj.find(".picbox img").attr("src", res.result.url);
                                var index;
                                $.each(_t.modifyProDialog.copy_moduleData.data['prolist'], function(j, k) {
                                    if (k.bcid == old_bcid) {
                                        index = j;
                                        return false;
                                    }
                                });

                                var proList_update = $.extend((_t.modifyProDialog.copy_moduleData.data['prolist'])[index], {
                                    'picurl': res.result.url
                                });

                                //更新_t.modifyProDialog.copy_moduleData数据
                                _t.modifyProDialog.copy_moduleData.data['prolist'].splice(index, 1, proList_update);

                            } else {

                                _t.createDialog(res.error.message);
                            }

                        },
                        error: function() {
                            _t.createDialog("文件保存失败！");
                        }
                    });
                }

            } else { //原图保存

                updateObj.find(".picbox img").attr("src", picUrl);
                var index;
                $.each(_t.modifyProDialog.copy_moduleData.data['prolist'], function(j, k) {
                    if (k.bcid == old_bcid) {
                        index = j;
                        return false;
                    }
                });
                var proList_update = $.extend((_t.modifyProDialog.copy_moduleData.data['prolist'])[index], {
                    'picurl': picUrl
                });

                _t.modifyProDialog.copy_moduleData.data['prolist'].splice(index, 1, proList_update);

                //为保证原图上传和裁切上传来回切换时，这个公用变量一直存在，则再切换成原图上传时将改变量清空
                _t.picParam = "";
            }

        });

        /**
         * 外链文本框失去焦点保存
         */
        _t.linkUrlInput.on('blur', function() {
            var $this = $(this);
            var updateObj = _t.proListContainer.find(".changeImg a[class='cBtnCur']").closest('li');
            if (updateObj.length == 0) return false;
            //修改对象的linkUrl
            var orginalLinkUrl = updateObj.find(".picbox a").attr('data-href');
            //修改对象的bcid
            var old_bcid = updateObj.find(".changeImg a").attr("data-bcid");
            //校验外链是否有效
            var linkUrl = _t.validateProLinkUrl(orginalLinkUrl, $.trim($this.val()));
            //更新被修改对象链接
            updateObj.find(".picbox a").attr("data-href", linkUrl);
            //更新数据（保证单产品和批量产品数据同步）
            var index;
            $.each(_t.modifyProDialog.copy_moduleData.data['prolist'], function(j, k) {
                if (k.bcid == old_bcid) {
                    index = j;
                    return false;
                }
            });
            var proList_update = $.extend((_t.modifyProDialog.copy_moduleData.data['prolist'])[index], {
                'linkurl': linkUrl
            });

            //更新_t.modifyProDialog.copy_moduleData数据
            _t.modifyProDialog.copy_moduleData.data['prolist'].splice(index, 1, proList_update);

        });


        /**
         * 批量上传产品操作
         */
        $(_t.modifyProDialog.node).find("[data-name='batchUploadProBtn']").on('click', function() {
            _t.createBatchProDialog(_t.proBatchDialogWrap);
        });

        /**
         * 保存
         */
        _t.saveProListBtn.on('click', function() {
            _t.isSaveProList = true;

            if (_t.modifyProDialog.copy_moduleData && _t.modifyProDialog.copy_moduleData.data['prolist'].length < 3) {
                _t.createDialog('轮播产品不能少于3个！请补足');
                return false;
            }
            _t.copy_moduleData.data['prolist'] = _t.modifyProDialog.copy_moduleData.data['prolist'].slice(0, _t.modifyProDialog.copy_moduleData.data['prolist'].length);
            _t.modifyProDialog.close().remove();

            //如果jcrop存在，销毁
            if (_t.jcrop) _t.jcrop.destroy();
            //预览图片层销毁
            $("#previewContainer").remove();
            //上传的图片恢复默认
            if ($(_t.modifyProDialog.node).find("#imgContainer").length > 0) {
                $(_t.modifyProDialog.node).find("#imgContainer").remove();
            }
            _t.picParam = "";
            //$(_t.modifyProDialog.node).find("#imgContainer").removeAttr("src");
        });

        /**
         * 关闭、取消弹框
         */
        _t.closeAndCancelDialogBtn_modify.on('click', function() {
            _t.isSaveProList = false;

            //关闭取消时将已选产品和已选个数还原
            _t.modifyProDialog.copy_moduleData = null;
            _t.selectCount = _t.copy_moduleData.data.prolist.length;

            //如果jcrop存在，销毁
            if (_t.jcrop) _t.jcrop.destroy();
            //预览图片层销毁
            $("#previewContainer").remove();
            //上传的图片恢复默认
            if ($(_t.modifyProDialog.node).find("#imgContainer").length > 0) {
                $(_t.modifyProDialog.node).find("#imgContainer").remove();
            }
            _t.picParam = "";
            //$(_t.modifyProDialog.node).find("#imgContainer").removeAttr("src");

            _t.modifyProDialog.close().remove();

        });

    },

    /**
     * 本地上传
     */
    locateUploadPic: function() {
        var _t = this;

        var webupload = $.extend({}, _t.webuploderObj, {
            compress: false,
            pick: $(_t.modifyProDialog.node).find("a[data-name='locateUpload']").selector
        });

        var uploader = webuploader.create(webupload);

        //校验不通过
        uploader.on('error', function(type) {
            if (type == 'Q_TYPE_DENIED') {
                _t.createDialog('只能上传jpg、jpeg、gif、png格式的图片');
            } else if (type == 'Q_EXCEED_SIZE_LIMIT' || type == 'F_EXCEED_SIZE') {
                _t.createDialog('上传图片不能超过5M');
            } else {
                _t.createDialog('上传失败请重新上传！');
            }
        });

        //上传成功
        uploader.on('uploadSuccess', function(file, res) {
            if (res.state === 0) {
                _t.createDialog(res.message);
                return false;
            }

            //为了防止IE8、IE9的img标签有个默认标志，把img标签改为图片上传成功之后创建的形式
            var imgCon = "";
            if (_t.picCropperDiv.find("#imgContainer").length > 0) {
                imgCon = _t.picCropperDiv.find("#imgContainer");
            } else {
                imgCon = $('<img>', {
                    'id': 'imgContainer'
                }).appendTo(_t.picCropperDiv.find('.cutImg p'));
            }

            imgCon.attr('src', res.result.url);

            //使图片在容器中以全部填充的形式显示
            //var img = _t.picCropperDiv.find("#imgContainer");

            _t.getImageWidth(res.result.url, function(w, h) {

                var $imgWidth = w,
                    $imgHeight = h,
                    $wrapWidth = _t.picCropperDiv.find("#imgContainer").closest(".cutImg").width(),
                    $wrapHeight = _t.picCropperDiv.find("#imgContainer").closest(".cutImg").height();

                //util.resizeImage(img,$imgWidth,$imgHeight,$wrapWidth,$wrapHeight);

                $(_t.modifyProDialog.node).find("[data-type='cropper']").show();

                /**原图或裁剪方式切换*/
                _t.orginalOrCropFun($imgWidth, $imgHeight);

            });



        });
    },

    /**
     * 原图或裁剪方式切换
     */
    orginalOrCropFun: function(width, height) {
        var _t = this;
        _t.picCropperDiv.find('.radioImg').unbind('click').on('click', function() {
            var $this = $(this);
            var siblings = $this.closest('li').siblings('li').find('.radioImg');
            $this.addClass('curradioImg');
            if (siblings.hasClass('curradioImg')) {
                siblings.removeClass('curradioImg');
            }
            var img = $(_t.modifyProDialog.node).find("#imgContainer");

            if (_t.jcrop) _t.jcrop.destroy();
            $("#previewContainer").remove();

            if ($this.attr("data-type") == "cropper") {

                if (!img.attr("src")) {
                    _t.createDialog("请先上传图片再裁剪");
                    return false;
                }
                //创建预览区域
                creatPreviewContainer(img);

                //放图片容器
                var imgWrap = _t.picCropperDiv.find(".cutImg p");

                //启动裁剪工具Jcrop
                var boundx, boundy, $pcnt, $pimg, x, y;
                $pcnt = $("#previewContainer");
                $pimg = $pcnt.find("img");
                x = $pcnt.width();
                y = $pcnt.height();

                img.Jcrop({
                    boxWidth: imgWrap.width(),
                    boxHeight: imgWrap.height(),
                    bgFade: true,
                    bgOpacity: 0.5,
                    aspectRatio: 1,
                    onChange: updatePreview,
                    onSelect: updatePreview
                }, function() {
                    _t.jcrop = this;
                    var bounds = _t.jcrop.getBounds();
                    boundx = bounds[0];
                    boundy = bounds[1];

                    //设置图片居中
                    var jcropHolder = $('.jcrop-holder');
                    jcropHolder.css({
                        // top: (Math.abs(imgWrap.height() - jcropHolder.height())) / 2,
                        left: (Math.abs(imgWrap.width() - jcropHolder.width())) / 2
                    });
                });

                /**
                 * 更新预览区
                 * @param c（回调返回值)
                 */
                function updatePreview(c) {
                    var radio = width / boundx;
                    _t.picParam = {
                        x: c.x * radio,
                        y: c.y * radio,
                        x2: c['x2'] * radio,
                        y2: c['y2'] * radio
                    };
                    if (parseInt(c.w) > 0) {
                        var rx = x / c.w;
                        var ry = y / c.h;

                        $pimg.css({
                            width: Math.round(rx * boundx) + 'px',
                            height: Math.round(ry * boundy) + 'px',
                            marginLeft: '-' + Math.round(rx * c.x) + 'px',
                            marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    }
                };

                /**
                 * 创建预览容器
                 */
                function creatPreviewContainer(img) {
                    var imgSrc = img.attr('src');
                    var top = img.parent().offset().top;
                    var left = img.parent().offset().left;
                    var div = "<div class='preview-box' id='previewContainer'><img class='jcrop-preview'  src=" + imgSrc + " ></div>";

                    $(div).css({
                        "position": 'absolute',
                        "left": left + 404 + 'px',
                        "top": top + 60 + 'px',
                        "width": '280px',
                        "height": '280px',
                        "z-index": 1100,
                        "overflow": "hidden"
                    }).appendTo('body');

                    //图片等比例适应容器大小
                    util.resizeImage($("#previewContainer").find("img"), width, height, 280, 280);

                }

            } else {
                if (_t.jcrop) _t.jcrop.destroy();
                $("#previewContainer").remove();
                //为了使图片居中
                img.removeAttr('style');
            }
        });
    },


    /**
     * 初始化已选产品
     * @param moduleData
     */
    initSelectProList: function(moduleData) {
        var _t = this;

        var count = _t.selectCount;

        //不够6张用空对象占位
        while (count < 6) {
            moduleData.data['prolist'].push({
                'picurl': "http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPicImg.jpg",
                'linkurl': "javascript:;"
            });
            count++;
        }

        //渲染单产品修改已有图片
        _t.renderDataToHtml(_t.proListContainer, _t.tempHtml['initSinglePro'], moduleData.data);
        //渲染批量插入产品已有图片
        _t.renderDataToHtml(_t.batchProListContainer, _t.tempHtml['initBatchPro'], moduleData.data);
    },


    /**
     * 创建单产品上传弹框
     * @param updataObj
     */
    createSingleProDialog: function(wrap, updateObj) {
        var _t = this;

        $.when(_t.getOnSaleData(_t.pageData)).done(function(res) {
            /**
             * 渲染在售商机页面
             */
            _t.createOnSaleHtml(res, wrap);

            /**
             * 创建选择单产品的弹框
             */
            _t.proSingleDialog = dialog({
                'title': '编辑内容>单张图片修改',
                content: _t.proSingleDialogWrap.html()
            }).showModal();
            _t.options.rendedCallback && _t.options.rendedCallback.call(_t);

            /**
             * 关闭选择产品弹框
             */
            $(_t.proSingleDialog.node).find('.t-close').on('click', function() {
                _t.proSingleDialog.close().remove();
            });

            /**
             * 单产品选择
             */
            _t.selectSingleProFunc(updateObj);

            /**
             * 渲染分页
             */
            _t.initPagnation(res.data.procount, _t.proSingleDialog.node, wrap);

            /**
             * 过滤在售商机
             */
            _t.filterProFunc(_t.proSingleDialog.node, _t.proSingleDialogWrap);
        }).fail(function(res) {

        });
    },

    /**
     * 创建批量上传产品弹框
     */
    createBatchProDialog: function(wrap) {
        var _t = this;
        $.when(_t.getOnSaleData(_t.pageData), _t.getOnSelectData()).done(function(res) {

            /**
             * 渲染在售商机页面
             */
            _t.createOnSaleHtml(res[0], wrap);

            /**
             * 创建选择批量产品的弹框
             */
            _t.proBatchDialog = dialog({
                'title': '编辑内容>编辑内容>批量插入产品>选择产品图片',
                content: _t.proBatchDialogWrap.html()
            }).showModal();
            _t.options.rendedCallback && _t.options.rendedCallback.call(_t);

            /**
             * 关闭选择产品弹框
             */
            $(_t.proBatchDialog.node).find('.t-close,.Cancel').on('click', function() {
                _t.proBatchDialog.close().remove();
            });

            /**
             * 批量产品选择
             */
            _t.selectBatchProFunc();

            /**
             * 取消选择的产品
             */
            _t.cancelBatchProFunc();

            /**
             * 渲染分页
             */
            _t.initPagnation(res[0].data.procount, _t.proBatchDialog.node);

            /**
             * 过滤在售商机
             */
            _t.filterProFunc(_t.proBatchDialog.node, _t.proBatchDialogWrap);

            /**
             * 保存已选商机
             */
            _t.saveBatchProFunc();
        }).fail(function(res) {

        });

    },

    /**
     * 获取在售商机接口数据
     * @param pageData
     * @returns {*}
     */
    getOnSaleData: function(pageData) {
        var _t = this;
        return $.ajax({
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            url: '/detail/turbine/action/GetSelectProductListAction/eventsubmit_doBusinchance/doBusinchance',
            data: pageData
        })
    },

    /**
     * 初始化已选商机数据
     * @returns {*}
     */
    getOnSelectData: function() {
        var _t = this;
        var defer = $.Deferred();
        var moudleData = $.extend(true, {}, _t.modifyProDialog.copy_moduleData);
        _t.selectCount = moudleData.data['prolist'].length;

        if (_t.selectCount == 0) {
            _t.proBatchDialogWrap.find(".seleRight dd").html("您可以选择<span>" + _t.totalCount + "条</span>产品显示在扩展橱窗");
            _t.proBatchDialogWrap.find("#noProListTip").show();
            _t.proBatchDialogWrap.find("#ProListDiv").hide();
        } else {
            _t.proBatchDialogWrap.find(".seleRight dd").html("您可以选择<b id='total_count'>" + _t.totalCount + "条</b>，已选择<span  id='select_count'>" + _t.selectCount + "条</span>");
            _t.proBatchDialogWrap.find("#noProListTip").hide();
            _t.proBatchDialogWrap.find("#ProListDiv").show();
        }

        //初始化已选列表
        _t.renderDataToHtml(_t.proBatchDialogWrap.find("#ProListDiv ul"), _t.tempHtml['isSelectPro'], moudleData.data);

        defer.resolve();

        return defer;
    },

    /**
     *渲染在售商机
     */
    createOnSaleHtml: function(res, wrap, flag, newParam) {
        var _t = this;
        if (res.state == 1) {
            if (res.data.prolist && res.data.prolist.length > 0) {
                $.each(res.data.prolist, function(k, v) {
                    var param = "";
                    if (newParam && typeof newParam == "object" && newParam['prolist'].length >= 0) {
                        param = newParam;
                    } else {
                        param = _t.modifyProDialog.copy_moduleData.data;
                    }
                    $.each(param['prolist'], function(m, n) {
                        if (v.bcid == n.bcid) {
                            v.isSelect = true;
                            return false;
                        }
                    })
                });
                if (wrap.find(".seleList p").length > 0) {
                    wrap.find(".seleList > p").remove();
                    if (wrap.find(".seleListCon dl").length == 0) {
                        wrap.find(".seleList").prepend('<dl><dt>' +
                            '<span class="seleTit1">产品信息</span>' +
                            '<span class="seleTit2">操作</span>' +
                            '</dt></dl>' +
                            '<div class="seleListCon"><dl></dl></div>');
                    }
                    _t.renderDataToHtml(wrap.find(".seleListCon dl"), _t.tempHtml['selectPro'], res.data);
                } else {
                    _t.renderDataToHtml(wrap.find(".seleListCon dl"), _t.tempHtml['selectPro'], res.data);
                }
            } else {
                if (flag && flag == "search") { //搜索无结果
                    wrap.find(".seleList").html('<p class="sLeftPrompt">未搜索到相关商品</p>');

                } else { //初始化无结果
                    wrap.find(".seleList").html('<p class="sLeftPrompt">商铺中暂无在售商品，<a href="http://my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cbusinonsale.html" target="_blank">请补充</a></p>')
                }
            }


        } else {
            _t.createDialog(res.message);
        }
    },

    /**
     * 选择在售商机
     */
    selectSingleProFunc: function(updateObj) {
        var _t = this;
        $(_t.proSingleDialog.node).on('click', 'button[type="submit"][data-bcid]', function() {
            var $this = $(this);

            if (!$this.hasClass('gBtn2')) {

                var title = $this.parent().siblings('.picboxTit').text(); //选择的产品标题
                var imgSrc = $this.parent().siblings('.picbox').find('img').attr('src'); //选择的产品图片链接
                var bcid = $this.attr('data-bcid');
                var linkUrl = 'http://b2b.hc360.com/supplyself/' + bcid + '.html';

                //产品轮播图片数据列表
                var proList_update = {
                    'bcid': bcid, //商机编号
                    'bcname': title, //商机标题
                    'picurl': imgSrc,
                    'linkurl': linkUrl
                };

                var old_bcid = updateObj.find('a[data-bcid]').attr('data-bcid');

                if (old_bcid) { //修改
                    var index;
                    $.each(_t.modifyProDialog.copy_moduleData.data['prolist'], function(j, k) {
                        if (k.bcid == old_bcid) {
                            index = j;
                            return false;
                        }
                    });
                    _t.modifyProDialog.copy_moduleData.data['prolist'].splice(index, 1, proList_update);
                } else { //新增
                    _t.selectCount++;
                    _t.modifyProDialog.copy_moduleData.data['prolist'].push(proList_update);
                }

                //改变按钮样式和文字
                $(this).addClass('gBtn2').text('已选择');

                //选择成功后，弹框关闭
                _t.proSingleDialog.close().remove();

                //默认没有选中要修改的商机，则上传本地图片隐藏
                $(_t.modifyProDialog.node).find('li[data-flag="picModify"]').hide();

                //修改已选产品
                _t.renderDataToHtml(updateObj, _t.tempHtml['initSinglePro'], {
                    'prolist': [proList_update]
                }, 'replace');
            }


        })
    },

    /**
     * 批量选择在售商机
     */
    selectBatchProFunc: function() {
        var _t = this;

        $(_t.proBatchDialog.node).on('click', 'button[type="submit"][data-bcid]', function() {
            var $this = $(this);

            if (_t.selectCount == _t.totalCount) {
                _t.createDialog('您选择的产品数已达上限');
                return false;
            }

            if (!$this.hasClass('gBtn2')) {
                var title = $this.parent().siblings('.picboxTit').text(); //选择的产品标题
                var imgSrc = $this.parent().siblings('.picbox').find('img').attr('src'); //选择的产品图片链接
                var bcid = $this.attr('data-bcid');
                var data = {
                    'prolist': [{
                        'bcid': bcid, //商机编号
                        'picurl': imgSrc,
                        'bcname': title
                    }]
                };

                //选择第一条在售商机时，改变提示文字，同时改变已选列表
                if (_t.proBatchDialogWrap.find("#ProListDiv").is(":hidden")) {
                    $(_t.proBatchDialog.node).find(".seleRight dd").html("您可以选择<b id='total_count'>" + _t.totalCount + "条</b>，已选择<span id='select_count'>1条</span>");
                    $(_t.proBatchDialog.node).find("#noProListTip").hide();
                    $(_t.proBatchDialog.node).find("#ProListDiv").show();
                }
                _t.renderDataToHtml($(_t.proBatchDialog.node).find("#ProListDiv ul"), _t.tempHtml['isSelectPro'], data, 'append');

                //改变按钮样式和文字
                $(this).addClass('gBtn2').text('已选择');

                //改变已选产品个数
                _t.selectCount++;
                $(_t.proBatchDialog.node).find("#select_count").text(_t.selectCount + '条');

            }


        })
    },

    /**
     * 取消选择的产品
     */
    cancelBatchProFunc: function() {
        var _t = this;

        $(_t.proBatchDialog.node).find('.seleRight').on('click', 'em[data-bcid]', function() {

            var $this = $(this);
            var bcid = $this.attr('data-bcid');

            //改变已选择产品个数
            if (!_t.selectCount) return false;
            _t.selectCount--;

            //改变已选择产品文字描述
            if (_t.selectCount > 0) {
                $(_t.proBatchDialog.node).find("#select_count").text(_t.selectCount + "条");
            } else {
                $(_t.proBatchDialog.node).find("#ProListDiv").hide();
                $(_t.proBatchDialog.node).find(".seleRight dd").html("您可以选择<span>" + _t.totalCount + "条</span>产品显示在扩展橱窗");
                $(_t.proBatchDialog.node).find("#noProListTip").show();
            }

            //移除取消选择的产品
            $this.closest('li').remove();

            //改变左侧取消选择的产品按钮样式
            $("button[type='submit'][data-bcid=" + bcid + "]").removeClass('gBtn2').text('选择');
        })
    },

    /**
     * 保存已选在售商机
     */
    saveBatchProFunc: function() {
        var _t = this;
        var moduleData = $.extend(true, {}, _t.modifyProDialog.copy_moduleData);

        $(_t.proBatchDialog.node).find(".Save").on('click', function() {

            var resultSalePro = [];
            if ($(_t.proBatchDialog.node).find("#ProListDiv").is(":visible")) {
                resultSalePro = $.map($(_t.proBatchDialog.node).find("#ProListDiv li"), function(v) {
                    return {
                        'bcid': $(v).find("em").attr("data-bcid"),
                        'bcname': $(v).find(".picboxTit").text(),
                        'picurl': $(v).find("img").attr("src"),
                        'linkurl': $(v).find('a').attr("href")
                            // 'deleted':$(v).attr("data-delete") || 0
                    }
                });
            }

            moduleData.data['prolist'] = resultSalePro;

            _t.modifyProDialog.copy_moduleData.data['prolist'] = resultSalePro.slice(0, resultSalePro.length);

            var count = _t.selectCount;
            //不够6张用空对象占位
            while (count < 6) {
                moduleData.data['prolist'].push({
                    'picurl': "http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPicImg.jpg",
                    'linkurl': "javascript:;"
                });
                count++;
            }
            _t.renderDataToHtml(_t.batchProListContainer, _t.tempHtml['initBatchPro'], moduleData.data);

            //关闭选择产品弹框
            _t.proBatchDialog.close().remove();
        })
    },

    /**
     * 初始化分页组件
     * @param totalCount    总条数
     */
    initPagnation: function(totalCount, dialog) {
        var _t = this;
        var pageContainer = "";
        if (totalCount < _t.pageData.pagesize || totalCount == _t.pageData.pagesize) {
            if ($(dialog).find('.pageList').length > 0) {
                $(dialog).find('.pageList').remove();
            }
            return false;
        }

        var pageContainer = $(dialog).find('.pageList').length > 0 ? $(dialog).find('.pageList') : $('<div>', {
            'class': 'pageList'
        }).appendTo($(dialog).find('.seleList'));

        pageContainer.pagination(totalCount, {
            num_display_entries: 5, //主体页数
            link_to: "#p__id__",
            items_per_page: _t.pageData.pagesize, //一页显示多少条
            prev_text: '&nbsp;',
            next_text: '&nbsp;',
            load_first_page: false, //首次不执行callback；
            callback: function(pageIndex) {
                //重新渲染数据
                var updateParam = {
                    pageindex: pageIndex + 1,
                    productname: encodeURIComponent($.trim($(dialog).find("[data-name='filterText']").val())) || ''
                };
                var resultData = $.extend({}, _t.pageData, updateParam);
                $.when(_t.getOnSaleData(resultData)).done(function(res) {

                    /**为保证分页之后多产品选择弹框已选择的数据在商机列表中是已选,重新获取右边已选商机*/
                    var newSelect = {
                        'prolist': []
                    };
                    if ($(dialog).find(".seleRight").length > 0) { //该弹框是多产品选择弹框
                        if ($(_t.proBatchDialog.node).find("#ProListDiv").is(":visible")) {
                            newSelect['prolist'] = $.map($(_t.proBatchDialog.node).find("#ProListDiv li"), function(v) {
                                return {
                                    'bcid': $(v).find("em").attr("data-bcid"),
                                    'bcname': $(v).find(".picboxTit").text(),
                                    'picurl': $(v).find("img").attr("src"),
                                    'linkurl': $(v).find('a').attr("href")
                                }
                            });
                        }
                    }
                    _t.createOnSaleHtml(res, $(dialog), "", newSelect);

                    /**保证分页之后滚动条滚动到顶部*/
                    $(dialog).find(".seleListCon").scrollTop(0);
                });
            }
        });

    },

    /**
     * 过滤筛选在售商机
     */
    filterProFunc: function(dialog, wrap) {
        var _t = this;
        $(dialog).find("button[data-name='searchBtn']").on('click', function() {

            var text = $.trim($(dialog).find("input[data-name='filterText']").val());

            //重新渲染数据
            var updateParam = {
                productname: encodeURIComponent(text)
            };
            var filterParam = $.extend({}, updateParam, _t.pageData);
            $.when(_t.getOnSaleData(filterParam)).done(function(res) {

                /**为保证过滤之后多产品选择弹框已选择的数据在商机列表中是已选,重新获取右边已选商机*/
                var newSelect = {
                    'prolist': []
                };
                if ($(dialog).find(".seleRight").length > 0) { //该弹框是多产品选择弹框
                    if ($(_t.proBatchDialog.node).find("#ProListDiv").is(":visible")) {
                        newSelect['prolist'] = $.map($(_t.proBatchDialog.node).find("#ProListDiv li"), function(v) {
                            return {
                                'bcid': $(v).find("em").attr("data-bcid"),
                                'bcname': $(v).find(".picboxTit").text(),
                                'picurl': $(v).find("img").attr("src"),
                                'linkurl': $(v).find('a').attr("href")
                            }
                        });
                    }
                }

                _t.createOnSaleHtml(res, $(dialog), 'search', newSelect);
                //重新渲染分页
                _t.initPagnation(res.data.procount, dialog, wrap);
            });

        });

    },

    /**
     * 渲染模板方法
     * @param container 被填充的Dom容器
     * @param temp  模板对象
     * @param param 模板数据
     * @param method 渲染方式 如替换、填充、追加
     */
    renderDataToHtml: function(container, temp, param, method) {
        //渲染模板
        var tempHtml = mustache.render(temp, param);
        //填充模板
        if (method == "replace") {
            container.replaceWith(tempHtml);
        } else if (method == "append") {
            container.append(tempHtml);
        } else {
            container.html(tempHtml);
        }

    },

    /**
     *  验证外链地址是否有效，无效则返回以前旧地址，否则返回新地址
     * @param oldUrl产品自带的地址
     * @param newUrl修改后的地址
     */
    validateProLinkUrl: function(oldUrl, newUrl) {
        var _t = this;
        if (!newUrl || newUrl == "") return oldUrl;
        var linkAttr = util.parseURL(newUrl);
        if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) return oldUrl;
        return linkAttr.source;
    },

    /**
     * 创建提示的弹框公用方法
     * @param content
     */
    createDialog: function(content) {
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

    /**
     * 获取图片实际大小
     * @param url
     * @param callback
     */
    getImageWidth: function(url, callback) {

        var img = new Image();
        img.onload = function() {
            callback(this.width, this.height);
        };
        img.src = url;

    },

    /***
     * 异步加载所有组件，返回一个延迟对象
     * @returns {*}
     */
    loadComponents: function() {
        var mustacheDef = $.Deferred(),
            paginationDef = $.Deferred(),
            webuploaderDef = $.Deferred(),
            owlCarouselDef = $.Deferred(),
            JcropDef = $.Deferred(),
            imgLiquidDef = $.Deferred();

        //模板引擎组件
        require.ensure([], function(require) {
            require('mustache');
            mustacheDef.resolve();
        }, 'components/mustache/mustache');

        //分页组件
        require.ensure([], function(require) {
            require('jquery_pagination');
            paginationDef.resolve();
        }, 'components/jquery.pagination');

        //上传图片组件
        require.ensure([], function(require) {
            require('webuploader');
            webuploaderDef.resolve();
        }, 'components/webuploader/webuploader');

        //图片轮播组件
        require.ensure([], function(require) {
            require('OwlCarousel');
            owlCarouselDef.resolve();
        }, 'components/OwlCarousel/OwlCarousel');

        //裁剪组件
        require.ensure([], function(require) {
            require('Jcrop');
            JcropDef.resolve();
        }, 'components/Jcrop/Jcrop');

        //图片自适应组件
        require.ensure([], function(require) {
            require('jquery_imgLiquid');
            imgLiquidDef.resolve();
        }, 'components/jquery_imgLiquid');

        return [mustacheDef, paginationDef, webuploaderDef, owlCarouselDef, JcropDef, imgLiquidDef];

    }

};


module.exports = FullAdsUtil;