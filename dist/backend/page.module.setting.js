webpackJsonp([2],{

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./module_ads": 52,
		"./module_ads.js": 52,
		"./module_album_window": 62,
		"./module_album_window.js": 62,
		"./module_banner_ads": 63,
		"./module_banner_ads.js": 63,
		"./module_banner_products": 64,
		"./module_banner_products.js": 64,
		"./module_banner_widescreen_ads": 68,
		"./module_banner_widescreen_ads.js": 68,
		"./module_certificate": 69,
		"./module_certificate.js": 69,
		"./module_company_album": 70,
		"./module_company_album.js": 70,
		"./module_company_dynamic": 71,
		"./module_company_dynamic.js": 71,
		"./module_company_intro": 72,
		"./module_company_intro.js": 72,
		"./module_contact_us": 73,
		"./module_contact_us.js": 73,
		"./module_crumbs": 74,
		"./module_crumbs.js": 74,
		"./module_custom": 75,
		"./module_custom.js": 75,
		"./module_custom_video": 77,
		"./module_custom_video.js": 77,
		"./module_customchannel": 78,
		"./module_customchannel.js": 78,
		"./module_extend_window": 79,
		"./module_extend_window.js": 79,
		"./module_feedback": 80,
		"./module_feedback.js": 80,
		"./module_friendship_link": 81,
		"./module_friendship_link.js": 81,
		"./module_latest_supply": 82,
		"./module_latest_supply.js": 82,
		"./module_mmt_archives": 83,
		"./module_mmt_archives.js": 83,
		"./module_navigation": 84,
		"./module_navigation.js": 84,
		"./module_prod_classify": 85,
		"./module_prod_classify.js": 85,
		"./module_prod_window": 86,
		"./module_prod_window.js": 86,
		"./module_prof_window": 87,
		"./module_prof_window.js": 87,
		"./module_sign": 88,
		"./module_sign.js": 88,
		"./module_widescreen_custom": 89,
		"./module_widescreen_custom.js": 89
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 51;


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 *  Created by xyh on 2016/9/19.
	 * [util 导入通用工具函数模块]
	 * @type {Object}
	 */
	var util = __webpack_require__(53);

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
	        swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf?t=' + Math.random(),
	        server: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //上传文件服务接口地址
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
	            var previewUrl = "//style.org.hc360.cn/js/module/shop3.0/dist/backend/preview/module_ads.html?" + param;
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
	                        url: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //用于文件上传的服务器端请求地址
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
	                'picurl': "//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPicImg.jpg",
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
	                    wrap.find(".seleList").html('<p class="sLeftPrompt">商铺中暂无在售商品，<a href="//my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cbusinonsale.html" target="_blank">请补充</a></p>')
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
	                var linkUrl = '//b2b.hc360.com/supplyself/' + bcid + '.html';

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
	                    'picurl': "//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPicImg.jpg",
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
	        __webpack_require__.e/* nsure */(3, function(require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });

	        //分页组件
	        __webpack_require__.e/* nsure */(4, function(require) {
	            __webpack_require__(56);
	            paginationDef.resolve();
	        });

	        //上传图片组件
	        __webpack_require__.e/* nsure */(5, function(require) {
	            __webpack_require__(57);
	            webuploaderDef.resolve();
	        });

	        //图片轮播组件
	        __webpack_require__.e/* nsure */(6, function(require) {
	            __webpack_require__(59);
	            owlCarouselDef.resolve();
	        });

	        //裁剪组件
	        __webpack_require__.e/* nsure */(7, function(require) {
	            __webpack_require__(61);
	            JcropDef.resolve();
	        });

	        //图片自适应组件
	        __webpack_require__.e/* nsure */(1, function(require) {
	            __webpack_require__(44);
	            imgLiquidDef.resolve();
	        });

	        return [mustacheDef, paginationDef, webuploaderDef, owlCarouselDef, JcropDef, imgLiquidDef];

	    }

	};


	module.exports = FullAdsUtil;

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	/**
	 * Created by xyh on 2016/9/27.
	 * [相册橱窗模块设置]
	 */
	var AlbumWindowUtil = function(settions, html, options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>相册橱窗'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder_albWin"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	AlbumWindowUtil.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1 : 0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title':title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });

	    }
	};

	module.exports = AlbumWindowUtil;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [util 导入通用工具函数模块]
	 * @type {Object}
	 */
	var util = __webpack_require__(53);

	/**
	 * [bannerAd 扩展广告设置模块]
	 * @param  {Object} moduleEntity [模块业务对象]
	 * @param  {String} html         [模块设置表单HTML]
	 * @param  {Object} options      [模块设置配置项]
	 * @return {Object}              [description]
	 */
	function bannerAd(moduleEntity, html, options) {
	    var _this = this;

	    /**
	     * [html 初始化模块设置对象属性]
	     * @type {[type]}
	     */
	    _this.html = html;
	    _this.moduleEntity = moduleEntity;
	    _this.formData = $.extend(true, {}, moduleEntity.dataEntity.data);

	    /**
	     * [options 配置项]
	     * @type {Object}
	     */
	    _this.options = $.extend({

	        /**
	         * [webuploader 默认上传组件配置]
	         * @type {Object}
	         */
	        webuploader: {
	            server: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //上传文件服务接口地址
	            formData: {

	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || '',
	                /***
	                 * 是否限制宽高
	                 */
	                widthHeightLimitFlag: 1,
	                /***
	                 * 最小宽度
	                 */
	                widthMinLimit: '0',
	                /***
	                 * 最大宽度
	                 */
	                widthMaxLimit: '952',
	                /***
	                 * 最小高度
	                 */
	                heightMinLimit: '0',
	                /***
	                 * 最大高度
	                 */
	                heightMaxLimit: '800'
	            },
	            fileVal: 'file',
	            pick: {
	                multiple: false
	            },
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg'
	            },
	            threads: 1,
	            compress: false, //是否启用图片压缩
	            /** 360安全浏览器限制了跨域flash文件的访问权限，所以如果要兼容该浏览器，需要将swf文件放置到页面所在域] */
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf?t=' + Math.random(),
	            // swf: '//b2b.hc360.com/components/webuploader/webuploader.swf?t=' + Math.random(),
	            disableGlobalDnd: true, // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	            fileSizeLimit: 5 * 1024 * 1024, // 验证文件总大小是否超出限制（此处设置为5M）
	            duplicate: true, //是否可以上传重复文件，默认为false
	            auto: false //设置为 true 后，不需要手动调用上传，有文件选择即开始上传
	        }
	    }, options || {});

	    /**
	     * [_deferreds 获取组件延迟对象数组]
	     * @type {Array}
	     */
	    var _deferreds = _this.getComponentDeferred();
	    $.when.apply(null, _deferreds).done(function() {

	        /**
	         * 组建加载完成后开始初始化
	         */
	        _this.init();
	    });
	}

	/**
	 * [init 初始化]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.init = function() {
	    var _this = this;

	    /**
	     * [dialogEntity 创建弹框对象]
	     * @type {Object}
	     */
	    _this.dialogEntity = dialog({
	        content: _this.html,
	        title: '编辑内容>扩展广告'
	    }).showModal();

	    /**
	     * 执行渲染完成回调
	     */
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);

	    /**
	     * [获取页面元素]
	     */
	    $(_this.dialogEntity.node).find('[data-element-name]').each(function(index, element) {
	        var _elementName = $.trim($(element).attr('data-element-name'));
	        if (_elementName && (!_this[_elementName])) {
	            _this[_elementName] = $('[data-element-name="' + _elementName + '"]');
	        }
	    });

	    /**
	     * [初始化图片上传区域]
	     */
	    _this.wrapUnselected.show();
	    _this.wrapSelected.hide();
	    _this.imgAD.removeAttr('src');
	    if ($.trim(_this.formData['picurl'])) {
	        _this.wrapUnselected.hide();
	        _this.wrapSelected.show();
	        _this.imgAD.attr('src', _this.formData['picurl']);

	        /**
	         * 使图片在容器中以全部填充的形式显示
	         */
	        // _this.imgAD.parent().imgLiquid({
	        // 	fill: true
	        // });

	        /**
	         * 设置预览图片按钮链接
	         */
	        _this.btnPreview.attr({
	            href: _this.formData['picurl'],
	            target: "_blank"
	        });
	    }

	    /**
	     * [txtLink 填充链接地址]
	     * @type {String}
	     */
	    _this.txtLink.val('');
	    if ($.trim(_this.formData['linkurl'])) {
	        _this.txtLink.val(_this.formData['linkurl']);
	    }

	    /**
	     * 上传区域默认隐藏
	     */
	    _this.wrapUpload.hide();

	    /**
	     * 绑定元素事件
	     */
	    _this.bindEvent();
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.bindEvent = function() {
	    var _this = this;

	    /**
	     * [绑定 选择图片 按钮点击事件]
	     */
	    _this.btnShowSelectArea.click(function(event) {
	        _this.wrapUnselected.hide();
	        /***
	         * 初始化选择图片的标题
	         */
	        _this.imgTitle.html('未选择任何文件');
	        _this.wrapUpload.show();
	    });

	    /**
	     * [绑定 撤销 按钮点击事件]
	     */
	    _this.btnHideSelectArea.click(function(event) {
	        _this.wrapUnselected.show();
	        _this.wrapUpload.hide();
	    });

	    /**
	     * [绑定 保存 按钮点击事件]
	     */
	    _this.btnSave.click(function(event) {

	        /**
	         * 获取表单数据
	         */
	        _this.formData['linkurl'] = _this.txtLink.val();
	        // _this.formData['picurl'] = _this.imgAD.attr('src')||'';

	        /**
	         * [验证数据]
	         */
	        if (!_this.validate()) {
	            return false;
	        }

	        /**
	         * [_params 请求参数]
	         * @type {[type]}
	         */
	        var _params = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        'picurl': _this.formData['picurl'], //图片地址
	                        'linkurl': _this.formData['linkurl'] //链接地址
	                    }
	                }
	            },

	            /**
	             * [_callee 正在执行函数引用]
	             * @type {Function}
	             */
	            _callee = arguments.callee;

	        /**
	         * [operatedata 更新请求参数]
	         * @type {Object}
	         */
	        _params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
	        //_params.operatedata = JSON.stringify(_params.operatedata);

	        /**
	         * [保存模块配置]
	         */
	        _this.moduleEntity.update({
	            data: _params.operatedata.data
	        }, function() {

	            /**
	             * 模块更新成功后移除当前模块设置弹出框
	             */
	            _this.dialogEntity.remove();
	        });

	    });

	    /**
	     * [绑定 取消 关闭 按钮点击事件]
	     */
	    _this.btnCancel.click(function(event) {
	        _this.dialogEntity.remove();

	        /**
	         * 销毁 webuploader 对象实例
	         */
	        _this.webuploaderEntity && _this.webuploaderEntity.destroy();
	    });

	    /**
	     * [绑定 上传 按钮点击事件]
	     */
	    _this.btnUpload.click(function(event) {

	        /**
	         * [未选择文件时提示]
	         */
	        if (_this.webuploaderEntity.getFiles().length === 0) {
	            dialog({
	                title: '提示',
	                content: '未选择任何文件',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	            return;
	        }

	        _this.webuploaderEntity && _this.webuploaderEntity.upload();
	    });

	    /**
	     * [检测浏览器是否支持 webuploader 上传组件]
	     */
	    if (!_this.detectBrowserSupport()) {
	        return;
	    }

	    /**
	     * [webuploaderSettings 初始化上传组件配置]
	     * @type {Object}
	     */
	    var webuploaderSettings = $.extend(_this.options.webuploader, {
	        pick: {
	            id: _this.btnSelect.selector
	        }
	    });

	    /**
	     * [webuploaderEntity 实例化上传组件对象实例]
	     * @type {webuploader}
	     */
	    _this.webuploaderEntity = webuploader.create(webuploaderSettings);

	    /** 添加进来图片,修改图片标题 **/
	    _this.webuploaderEntity.on('fileQueued', function(file) {
	        _this.imgTitle.html(file.name);
	    });
	    /**
	     * [监听文件上传后接收服务器响应事件]
	     */
	    _this.webuploaderEntity.on('uploadAccept', function(obj, ret) {
	        var _json = ret || {},
	            _result = false;

	        /**
	         * [文件上传成功]
	         */
	        if (_json.state === 'true') {

	            /**
	             * 更新缓存中的数据
	             */
	            _this.formData['picurl'] = _json.result.url;

	            /**
	             * 显示上传后的图片
	             */
	            _this.imgAD.attr('src', _json.result.url);

	            /**
	             * 设置预览图片按钮链接
	             */
	            _this.btnPreview.attr({
	                href: _this.formData['picurl'],
	                target: "_blank"
	            });

	            /**
	             * 使图片在容器中以全部填充的形式显示
	             */
	            _this.imgAD.parent().imgLiquid({
	                fill: false
	            });

	            /**
	             * 隐藏选择图片区域，显示上传图片区域
	             */
	            _this.wrapSelected.show();
	            _this.wrapUpload.hide();
	        }
	        /**
	         * 文件上传失败
	         */
	        else {
	            _this.webuploaderEntity.trigger('error', 'CUSTOM', _json.error.message);
	        }

	        return _result;
	    });

	    /**
	     * [监听上传错误事件，以显示上传错误信息]
	     */
	    _this.webuploaderEntity.on('error', function() {

	        /**
	         * [errorSettings 错误信息枚举列表]
	         * @type {Object}
	         */
	        var _errorSettings = {
	            'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
	            'Q_EXCEED_SIZE_LIMIT': '上传文件大小超过上限！',
	            'Q_TYPE_DENIED': '上传文件类型错误，请重新选择上传！',
	            'F_DUPLICATE': '上传文件重复了请重新选择上传！',
	            'OTHER': '上传失败请重新上传！',
	            'CUSTOM': ''
	        };

	        /** [显示错误信息] */
	        var errorCode = arguments[0] || 'OTHER';
	        dialog({
	            title: '提示',
	            content: _errorSettings[errorCode] || arguments[1] || '',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	    });
	};

	/**
	 * [validate 验证数据]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.validate = function() {
	    var _this = this;

	    /**
	     * [验证图片是否非空]
	     */
	    if (!$.trim(_this.formData['picurl'])) {
	        dialog({
	            title: '提示',
	            content: '请上传图片！',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	        return false;
	    }

	    /**
	     * [链接地址非空时，验证地址是否外链]
	     */
	    if ($.trim(_this.formData['linkurl'])) {

	        /**
	         * [linkAttr 获取指定链接地址的相关属性]
	         * @type {Object}
	         */
	        var linkAttr = util.parseURL(_this.formData['linkurl']);
	        if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
	            dialog({
	                title: '提示',
	                content: '不能链接慧聪网以外地址！',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();

	            /**
	             * 清空链接地址文本框
	             */
	            _this.txtLink.val('');
	            return false;
	        } else {
	            /**
	             * 填充带有协议的url地址
	             */
	            _this.txtLink.val(linkAttr.source);
	            _this.formData['linkurl'] = linkAttr.source;
	        }
	    }

	    return true;
	};

	/**
	 * [getComponentDeferred 加载组件]
	 * @return {Array} [延迟对象数组]
	 */
	bannerAd.prototype.getComponentDeferred = function() {
	    var _this = this;

	    /**
	     * [webuploaderDeferred 创建加载 webuploader 延迟对象]
	     * @type {Object}
	     */
	    var webuploaderDeferred = $.Deferred();
	    __webpack_require__.e/* nsure */(5, function(require) {
	        __webpack_require__(57);
	        webuploaderDeferred.resolve();
	    });

	    /**
	     * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
	     * @type {Object}
	     */
	    var imgLiquidDeferred = $.Deferred();
	    __webpack_require__.e/* nsure */(1, function(require) {
	        __webpack_require__(44);
	        imgLiquidDeferred.resolve();
	    });

	    return [webuploaderDeferred, imgLiquidDeferred];
	};

	/**
	 * [detectBrowserSupport 检测浏览器兼容性]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.detectBrowserSupport = function() {
	    var _this = this;
	    var _flashVersion = (function() {
	        var version;
	        try {
	            version = navigator.plugins['Shockwave Flash'];
	            version = version.description;
	        } catch (ex) {
	            try {
	                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
	                    .GetVariable('$version');
	            } catch (ex2) {
	                version = '0.0';
	            }
	        }
	        version = version.match(/\d+/g);
	        return parseFloat(version[0] + '.' + version[1], 10);
	    })();

	    /**
	     * [若当前浏览器是IE且未安装flash插件]
	     */
	    if (!webuploader.Uploader.support('flash') && webuploader.browser.ie) {

	        /**
	         * [安装了flash但是版本过低]
	         */
	        if (_flashVersion) {
	            (function(container) {
	                window['expressinstallcallback'] = function(state) {
	                    switch (state) {
	                        case 'Download.Cancelled':
	                            alert('您取消了更新！');
	                            break;

	                        case 'Download.Failed':
	                            alert('安装失败');
	                            break;

	                        default:
	                            alert('安装已成功，请刷新！');
	                            break;
	                    }
	                    delete window['expressinstallcallback'];
	                };

	                var swf = '//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/expressInstall.swf';
	                var html = '<object type="application/' +
	                    'x-shockwave-flash" data="' + swf + '" ';

	                if (webuploader.browser.ie) {
	                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
	                }

	                html += 'width="100%" height="100%" style="outline:0">' +
	                    '<param name="movie" value="' + swf + '" />' +
	                    '<param name="wmode" value="transparent" />' +
	                    '<param name="allowscriptaccess" value="always" />' +
	                    '</object>';

	                container.html(html);

	            })(_this.btnSelect);
	        } else {

	            /**
	             * [未安装时，提示安装]
	             * @param  {String} $('<a href          [description]
	             * @return {[type]}       [description]
	             */
	            _this.btnSelect.replaceWith($('<a href="//www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/getFlashPlayer.jpg" /></a>'));
	        }
	        return false;
	    } else if (!webuploader.Uploader.support()) {

	        /**
	         * 图片上传组件不支持当前浏览器
	         */
	        dialog({
	            title: '提示',
	            content: '图片上传组件不支持您的浏览器！',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	        return false;
	    }
	    return true;
	};

	module.exports = bannerAd;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/10/9.
	 *
	 *  [通栏产品]
	 */
	var tool = __webpack_require__(65),
	    util = __webpack_require__(53);
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
	        __webpack_require__.e/* nsure */(3, function (require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });
	        __webpack_require__.e/* nsure */(4, function (require) {
	            __webpack_require__(56);
	            paginationDef.resolve();
	        });
	        return [mustacheDef, paginationDef];
	    }

	}
	module.exports = banProduct;


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [util 导入通用工具函数模块]
	 * @type {Object}
	 */
	var util = __webpack_require__(53),
	    moduleUtil = __webpack_require__(65);

	/**
	 * [bannerAd 扩展广告设置模块]
	 * @param  {Object} moduleEntity [模块业务对象]
	 * @param  {String} html         [模块设置表单HTML]
	 * @param  {Object} options      [模块设置配置项]
	 * @return {Object}              [description]
	 */
	function bannerAd(moduleEntity, html, options) {
	    var _this = this;

	    /**
	     * [html 初始化模块设置对象属性]
	     * @type {[type]}
	     */
	    _this.html = html;
	    _this.moduleEntity = moduleEntity;
	    _this.formData = $.extend(true, {}, moduleEntity.dataEntity.data);

	    /**
	     * [options 配置项]
	     * @type {Object}
	     */
	    _this.options = $.extend({

	        /**
	         * [webuploader 默认上传组件配置]
	         * @type {Object}
	         */
	        webuploader: {
	            server: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //上传文件服务接口地址
	            formData: {

	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || '',
	                /***
	                 * 是否限制宽高
	                 */
	                widthHeightLimitFlag: 1,
	                /***
	                 * 最小宽度
	                 */
	                widthMinLimit: '0',
	                /***
	                 * 最大宽度
	                 */
	                widthMaxLimit: '1920',
	                /***
	                 * 最小高度
	                 */
	                heightMinLimit: '0',
	                /***
	                 * 最大高度
	                 */
	                heightMaxLimit: '800'
	            },
	            fileVal: 'file',
	            pick: {
	                multiple: false
	            },
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg'
	            },
	            threads: 1,
	            compress: false, //是否启用图片压缩
	            /** 360安全浏览器限制了跨域flash文件的访问权限，所以如果要兼容该浏览器，需要将swf文件放置到页面所在域] */
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf?t=' + Math.random(),
	            // swf: '//b2b.hc360.com/components/webuploader/webuploader.swf?t=' + Math.random(),
	            disableGlobalDnd: true, // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
	            fileSizeLimit: 5 * 1024 * 1024, // 验证文件总大小是否超出限制（此处设置为5M）
	            duplicate: true, //是否可以上传重复文件，默认为false
	            auto: false //设置为 true 后，不需要手动调用上传，有文件选择即开始上传
	        }
	    }, options || {});

	    /**
	     * [_deferreds 获取组件延迟对象数组]
	     * @type {Array}
	     */
	    var _deferreds = _this.getComponentDeferred();
	    $.when.apply(null, _deferreds).done(function() {

	        /**
	         * 组建加载完成后开始初始化
	         */
	        _this.init();
	    });
	}

	/**
	 * [init 初始化]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.init = function() {
	    var _this = this,
	        _url = _this.formData['picurl'] || '';

	    /**
	     * [_url 从样式字符串中解析出图片路径]
	     * @type {[type]}
	     */
	    _url = moduleUtil.getBgUrl(moduleUtil.serializeStyle(_url)['background-image'] || '');
	    _this.formData['picurl'] = _url;

	    /**
	     * [dialogEntity 创建弹框对象]
	     * @type {Object}
	     */
	    _this.dialogEntity = dialog({
	        content: _this.html,
	        title: '编辑内容>宽屏扩展广告'
	    }).showModal();

	    /**
	     * 执行渲染完成回调
	     */
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);

	    /**
	     * [获取页面元素]
	     */
	    $(_this.dialogEntity.node).find('[data-element-name]').each(function(index, element) {
	        var _elementName = $.trim($(element).attr('data-element-name'));
	        if (_elementName && (!_this[_elementName])) {
	            _this[_elementName] = $('[data-element-name="' + _elementName + '"]');
	        }
	    });

	    /**
	     * [初始化图片上传区域]
	     */
	    _this.wrapUnselected.show();
	    _this.wrapSelected.hide();
	    _this.imgAD.removeAttr('src');
	    if (_url) {
	        _this.wrapUnselected.hide();
	        _this.wrapSelected.show();
	        _this.imgAD.attr('src', _url);

	        /**
	         * 使图片在容器中以全部填充的形式显示
	         */
	        // _this.imgAD.parent().imgLiquid({
	        // 	fill: true
	        // });

	        /**
	         * 设置预览图片按钮链接
	         */
	        _this.btnPreview.attr({
	            href: _url,
	            target: "_blank"
	        });
	    }

	    /**
	     * [txtLink 填充链接地址]
	     * @type {String}
	     */
	    _this.txtLink.val('');
	    if ($.trim(_this.formData['linkurl'])) {
	        _this.txtLink.val(_this.formData['linkurl']);
	    }

	    /**
	     * 上传区域默认隐藏
	     */
	    _this.wrapUpload.hide();

	    /**
	     * 绑定元素事件
	     */
	    _this.bindEvent();
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.bindEvent = function() {
	    var _this = this;

	    /**
	     * [绑定 选择图片 按钮点击事件]
	     */
	    _this.btnShowSelectArea.click(function(event) {
	        _this.wrapUnselected.hide();
	        /***
	         * 初始化选择图片的标题
	         */
	        _this.imgTitle.html('未选择任何文件');
	        _this.wrapUpload.show();
	    });

	    /**
	     * [绑定 撤销 按钮点击事件]
	     */
	    _this.btnHideSelectArea.click(function(event) {
	        _this.wrapUnselected.show();
	        _this.wrapUpload.hide();
	    });

	    /**
	     * [绑定 保存 按钮点击事件]
	     */
	    _this.btnSave.click(function(event) {

	        /**
	         * 获取表单数据
	         */
	        _this.formData['linkurl'] = _this.txtLink.val();
	        // _this.formData['picurl'] = _this.imgAD.attr('src')||'';

	        /**
	         * [验证数据]
	         */
	        if (!_this.validate()) {
	            return false;
	        }

	        /**
	         * [_deferred 获取完图片高度后再进行保存操作]
	         * @type {[type]}
	         */
	        var _deferred = _this.getMaxHeightDeferred(_this.formData['picurl']);
	        _deferred.done(function(_height) {

	            /**
	             * [_params 请求参数]
	             * @type {[type]}
	             */
	            var _params = {
	                    'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                    'operatedata': { //操作内容
	                        'providerid': pageEntity.providerid, //商铺编号
	                        'username': pageEntity.username, //商铺用户名
	                        'data': {
	                            'picurl': 'background-image:url(' + _this.formData['picurl'] + ');height:' + _height + 'px;', //图片地址
	                            'linkurl': _this.formData['linkurl'] //链接地址
	                        }
	                    }
	                },

	                /**
	                 * [_callee 正在执行函数引用]
	                 * @type {Function}
	                 */
	                _callee = arguments.callee;

	            /**
	             * [operatedata 更新请求参数]
	             * @type {Object}
	             */
	            _params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
	            //_params.operatedata = JSON.stringify(_params.operatedata);

	            /**
	             * [保存模块配置]
	             */
	            _this.moduleEntity.update({
	                data: _params.operatedata.data
	            }, function() {

	                /**
	                 * 模块更新成功后移除当前模块设置弹出框
	                 */
	                _this.dialogEntity.remove();
	            });

	        });
	    });

	    /**
	     * [绑定 取消 关闭 按钮点击事件]
	     */
	    _this.btnCancel.click(function(event) {
	        _this.dialogEntity.remove();

	        /**
	         * 销毁 webuploader 对象实例
	         */
	        _this.webuploaderEntity && _this.webuploaderEntity.destroy();
	    });

	    /**
	     * [绑定 上传 按钮点击事件]
	     */
	    _this.btnUpload.click(function(event) {

	        /**
	         * [未选择文件时提示]
	         */
	        if (_this.webuploaderEntity.getFiles().length === 0) {
	            dialog({
	                title: '提示',
	                content: '未选择任何文件',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	            return;
	        }

	        _this.webuploaderEntity && _this.webuploaderEntity.upload();
	    });

	    /**
	     * [检测浏览器是否支持 webuploader 上传组件]
	     */
	    if (!_this.detectBrowserSupport()) {
	        return;
	    }

	    /**
	     * [webuploaderSettings 初始化上传组件配置]
	     * @type {Object}
	     */
	    var webuploaderSettings = $.extend(_this.options.webuploader, {
	        pick: {
	            id: _this.btnSelect.selector
	        }
	    });

	    /**
	     * [webuploaderEntity 实例化上传组件对象实例]
	     * @type {webuploader}
	     */
	    _this.webuploaderEntity = webuploader.create(webuploaderSettings);

	    /** 添加进来图片,修改图片标题 **/
	    _this.webuploaderEntity.on('fileQueued', function(file) {
	        _this.imgTitle.html(file.name);
	    });
	    /**
	     * [监听文件上传后接收服务器响应事件]
	     */
	    _this.webuploaderEntity.on('uploadAccept', function(obj, ret) {
	        var _json = ret || {},
	            _result = false;

	        /**
	         * [文件上传成功]
	         */
	        if (_json.state === 'true') {

	            /**
	             * 更新缓存中的数据
	             */
	            _this.formData['picurl'] = _json.result.url;

	            /**
	             * 显示上传后的图片
	             */
	            _this.imgAD.attr('src', _json.result.url);

	            /**
	             * 设置预览图片按钮链接
	             */
	            _this.btnPreview.attr({
	                href: _this.formData['picurl'],
	                target: "_blank"
	            });

	            /**
	             * 使图片在容器中以全部填充的形式显示
	             */
	            _this.imgAD.parent().imgLiquid({
	                fill: false
	            });

	            /**
	             * 隐藏选择图片区域，显示上传图片区域
	             */
	            _this.wrapSelected.show();
	            _this.wrapUpload.hide();
	        }
	        /**
	         * 文件上传失败
	         */
	        else {
	            _this.webuploaderEntity.trigger('error', 'CUSTOM', _json.error.message);
	        }

	        return _result;
	    });

	    /**
	     * [监听上传错误事件，以显示上传错误信息]
	     */
	    _this.webuploaderEntity.on('error', function() {

	        /**
	         * [errorSettings 错误信息枚举列表]
	         * @type {Object}
	         */
	        var _errorSettings = {
	            'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
	            'Q_EXCEED_SIZE_LIMIT': '上传文件大小超过上限！',
	            'Q_TYPE_DENIED': '上传文件类型错误，请重新选择上传！',
	            'F_DUPLICATE': '上传文件重复了请重新选择上传！',
	            'OTHER': '上传失败请重新上传！',
	            'CUSTOM': ''
	        };

	        /** [显示错误信息] */
	        var errorCode = arguments[0] || 'OTHER';
	        dialog({
	            title: '提示',
	            content: _errorSettings[errorCode] || arguments[1] || '',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	    });
	};

	/**
	 * [validate 验证数据]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.validate = function() {
	    var _this = this;

	    /**
	     * [验证图片是否非空]
	     */
	    if (!$.trim(_this.formData['picurl'])) {
	        dialog({
	            title: '提示',
	            content: '请上传图片！',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	        return false;
	    }

	    /**
	     * [链接地址非空时，验证地址是否外链]
	     */
	    if ($.trim(_this.formData['linkurl'])) {

	        /**
	         * [linkAttr 获取指定链接地址的相关属性]
	         * @type {Object}
	         */
	        var linkAttr = util.parseURL(_this.formData['linkurl']);
	        if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
	            dialog({
	                title: '提示',
	                content: '不能链接慧聪网以外地址！',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();

	            /**
	             * 清空链接地址文本框
	             */
	            _this.txtLink.val('');
	            return false;
	        } else {
	            /**
	             * 填充带有协议的url地址
	             */
	            _this.txtLink.val(linkAttr.source);
	            _this.formData['linkurl'] = linkAttr.source;
	        }
	    }

	    return true;
	};

	/**
	 * [getComponentDeferred 加载组件]
	 * @return {Array} [延迟对象数组]
	 */
	bannerAd.prototype.getComponentDeferred = function() {
	    var _this = this;

	    /**
	     * [webuploaderDeferred 创建加载 webuploader 延迟对象]
	     * @type {Object}
	     */
	    var webuploaderDeferred = $.Deferred();
	    __webpack_require__.e/* nsure */(5, function(require) {
	        __webpack_require__(57);
	        webuploaderDeferred.resolve();
	    });

	    /**
	     * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
	     * @type {Object}
	     */
	    var imgLiquidDeferred = $.Deferred();
	    __webpack_require__.e/* nsure */(1, function(require) {
	        __webpack_require__(44);
	        imgLiquidDeferred.resolve();
	    });

	    return [webuploaderDeferred, imgLiquidDeferred];
	};

	/**
	 * [detectBrowserSupport 检测浏览器兼容性]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.detectBrowserSupport = function() {
	    var _this = this;
	    var _flashVersion = (function() {
	        var version;
	        try {
	            version = navigator.plugins['Shockwave Flash'];
	            version = version.description;
	        } catch (ex) {
	            try {
	                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
	                    .GetVariable('$version');
	            } catch (ex2) {
	                version = '0.0';
	            }
	        }
	        version = version.match(/\d+/g);
	        return parseFloat(version[0] + '.' + version[1], 10);
	    })();

	    /**
	     * [若当前浏览器是IE且未安装flash插件]
	     */
	    if (!webuploader.Uploader.support('flash') && webuploader.browser.ie) {

	        /**
	         * [安装了flash但是版本过低]
	         */
	        if (_flashVersion) {
	            (function(container) {
	                window['expressinstallcallback'] = function(state) {
	                    switch (state) {
	                        case 'Download.Cancelled':
	                            alert('您取消了更新！');
	                            break;

	                        case 'Download.Failed':
	                            alert('安装失败');
	                            break;

	                        default:
	                            alert('安装已成功，请刷新！');
	                            break;
	                    }
	                    delete window['expressinstallcallback'];
	                };

	                var swf = '//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/expressInstall.swf';
	                var html = '<object type="application/' +
	                    'x-shockwave-flash" data="' + swf + '" ';

	                if (webuploader.browser.ie) {
	                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
	                }

	                html += 'width="100%" height="100%" style="outline:0">' +
	                    '<param name="movie" value="' + swf + '" />' +
	                    '<param name="wmode" value="transparent" />' +
	                    '<param name="allowscriptaccess" value="always" />' +
	                    '</object>';

	                container.html(html);

	            })(_this.btnSelect);
	        } else {

	            /**
	             * [未安装时，提示安装]
	             * @param  {String} $('<a href          [description]
	             * @return {[type]}       [description]
	             */
	            _this.btnSelect.replaceWith($('<a href="//www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/getFlashPlayer.jpg" /></a>'));
	        }
	        return false;
	    } else if (!webuploader.Uploader.support()) {

	        /**
	         * 图片上传组件不支持当前浏览器
	         */
	        dialog({
	            title: '提示',
	            content: '图片上传组件不支持您的浏览器！',
	            okValue: '确定',
	            ok: function() {
	                this.remove();
	            }
	        }).showModal();
	        return false;
	    }
	    return true;
	};

	/**
	 * [getMaxHeightDeferred 获取图片高度延迟对象]
	 * @return {[type]} [description]
	 */
	bannerAd.prototype.getMaxHeightDeferred = function(picurl) {
	    var _this = this;
	    var heightDef = $.Deferred();
	    var imgUrl = picurl;
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
	    return heightDef;
	};

	module.exports = bannerAd;

/***/ }),

/***/ 69:
/***/ (function(module, exports) {

	/**
	 * [certificate 信誉证书模块]
	 * @param  {[type]} moduleEntity [模块业务对象]
	 * @param  {[type]} html         [模块设置表单HTMl]
	 * @return {[type]}              [description]
	 */
	function certificate(moduleEntity, html, options) {
	    var _this = this;
	    _this.moduleEntity = moduleEntity;
	    _this.dialogEntity = dialog({
	        content: html,
	        title: '编辑内容>信誉证书'
	    }).showModal();
	    _this.options = $.extend({}, options || {});
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.btnCancel = $(_this.dialogEntity.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.btnSave = $(_this.dialogEntity.node).find(".Save"); //弹框的保存按钮
	    _this.chkShowTitleAndBorder = $(_this.dialogEntity.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.txtTitle = $(_this.dialogEntity.node).find("input[name='title']"); //标题文本框
	    _this.displayOptions = $('.radioBox span.radioCon');
	    _this.btnPreview = $(_this.dialogEntity.node).find("#btnPreview"); //预览效果按钮

	    /**
	     * 初始化弹出框数据
	     */
	    _this.initData();

	    /**
	     * 绑定弹出框事件
	     */
	    _this.bindEvent();
	}

	/**
	 * [init 模块初始化]
	 * @return {[type]} [description]
	 */
	certificate.prototype.initData = function() {
	    var _this = this;
	    _this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
	    var showTitleAndBorder = parseInt(_this.moduleEntity.dataEntity.data.showTitleAndBorder) || 0;
	    if (showTitleAndBorder) {
	        _this.chkShowTitleAndBorder.addClass('curChosen');
	    }else{
	        _this.chkShowTitleAndBorder.removeClass('curChosen');
	    }

	    _this.displayOptions.filter('[data-val="' + _this.moduleEntity.dataEntity.data.type + '"]').addClass('curRadioBox').siblings().removeClass('curRadioBox');
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	certificate.prototype.bindEvent = function() {
	    var _this = this;

	    /**
	     * [绑定关闭、取消按钮点击事件]
	     */
	    _this.btnCancel.on('click', function() {
	        _this.dialogEntity.remove();
	    });

	    /**
	     * [绑定板块标题栏和边栏是否选中复选框点击事件]
	     */
	    _this.chkShowTitleAndBorder.on('click', function() {
	        $(this).toggleClass("curChosen");
	    });

	    /**
	     * [绑定显示设置切换事件]
	     */
	    _this.displayOptions.click(function(event) {
	        $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
	    });

	    /**
	     * [绑定保存按钮点击事件]
	     */
	    _this.btnSave.click(function(event) {

	        /**
	         * [_title 获取标题]
	         * @type {String}
	         */
	        var _title = $.trim(_this.txtTitle.val()),

	            /**
	             * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
	             * @type {Boolean}
	             */
	            _showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1 : 0,

	            /**
	             * [_type 显示设置]
	             * @type {String}
	             */
	            _type = _this.displayOptions.filter('span.curRadioBox').length ? _this.displayOptions.filter('span.curRadioBox').attr('data-val') : 0,

	            /**
	             * [_params 请求参数]
	             * @type {Object}
	             */
	            _params = {
	                //'title': encodeURIComponent(_title),
	                'title': _title,
	                'showTitleAndBorder': _showTitleAndBorder,
	                'type': _type
	            };

	        /**
	         * [验证标题非空]
	         */
	        if (_title.length === 0 || _title.length > 5) {
	            var _content = (_title.length === 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
	            dialog({
	                title: '提示',
	                content: _content,
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	            return false;
	        }

	        /**
	         * [保存模块配置]
	         */
	        _this.moduleEntity.update({
	            data: _params
	        }, function() {

	            /**
	             * 模块更新成功后移除当前模块设置弹出框
	             */
	            _this.dialogEntity.remove();
	        });
	    });

	    /**
	     * [绑定预览效果按钮点击事件]
	     */
	    _this.btnPreview.click(function(event) {
	        var $this = $(this),

	            /**
	             * [_title 获取标题]
	             * @type {String}
	             */
	            _title = $.trim(_this.txtTitle.val()),

	            /**
	             * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
	             * @type {Boolean}
	             */
	            _showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1 : 0,

	            /**
	             * [_type 显示设置]
	             * @type {String}
	             */
	            _type = _this.displayOptions.filter('span.curRadioBox').length ? _this.displayOptions.filter('span.curRadioBox').attr('data-val') : 0;

	        /**
	         * [验证标题非空]
	         */
	        if (_title.length === 0 || _title.length > 5) {
	            var _content = (_title.length === 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
	            dialog({
	                title: '提示',
	                content: _content,
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	            return false;
	        }

	        /**
	         * [data 更新模块设置]
	         * @type {Object}
	         */
	        _this.moduleEntity.dataEntity.data = {
	            'title': _title,
	            'showTitleAndBorder': _showTitleAndBorder,
	            'type': _type
	        };

	        /**
	         * [previewUrl 预览页面地址]
	         * @type {String}
	         */
	        var previewUrl = '//style.org.hc360.cn/js/module/shop3.0/dist/backend/preview/module_certificate.html?params={{params}}',

	            /**
	             * [params 传递到预览页的参数]
	             * @type {Object}
	             */
	            params = {

	                /**
	                 * [data 荣誉证书数据]
	                 * @type {Array}
	                 */
	                data: [],

	                /**
	                 * [layout 当前页面布局 //布局枚举值，1：侧栏在左，2：侧栏在右；]
	                 * @type {Number}
	                 */
	                layout: window.pageEntity.layout || 1,

	                /**
	                 * [entity 模块所属区域标识符]
	                 * @type {Object}
	                 */
	                entity: $.extend(true, {}, _this.moduleEntity.dataEntity, {
	                    data: {
	                        'title': _title,
	                        'showTitleAndBorder': _showTitleAndBorder,
	                        'type': _type
	                    }
	                }),

	                /**
	                 * [style 获取当前公共模板样式表地址]
	                 * @type {String}
	                 */
	                style: $('#lnkThemeStyle').attr('href') || ''
	            };

	        /**
	         * [解析模块数据]
	         */
	        _this.moduleEntity.htmlEntity.find('li').each(function(index, el) {
	            var $el = $(el);
	            params.data.push({
	                title: $el.find('p').text() || '', //荣誉证书标题
	                pic: $el.find('img').attr('src') || '', //荣誉证书图片地址
	                link: $el.find('a:first').attr('href') //荣誉证书链接地址
	            });
	        });

	        /**
	         * 设置预览效果按钮链接地址
	         */
	        try {
	            $this.attr('href', previewUrl.replace(/{{params}}/ig, encodeURIComponent(JSON.stringify(params))));
	        } catch (ex) {}

	    });
	};

	module.exports = certificate;

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	/**
	 * [companyAlbum 公司相册模块]
	 * @param  {[type]} moduleEntity [模块业务对象]
	 * @param  {[type]} html         [模块设置表单HTMl]
	 * @return {[type]}              [description]
	 */
	function companyAlbum(moduleEntity, html, options) {
		var _this = this;
		_this.moduleEntity = moduleEntity;
		_this.dialogEntity = dialog({
			content: html,
			title:'编辑内容>公司相册'
		}).showModal();
		_this.options = $.extend({

		}, options || {});
		_this.options.rendedCallback && _this.options.rendedCallback.call(_this);
		_this.btnCancel = $(_this.dialogEntity.node).find(".t-close,.Cancel"); //关闭、取消按钮
		_this.btnSave = $(_this.dialogEntity.node).find(".Save"); //弹框的保存按钮
		_this.chkShowTitleAndBorder = $(_this.dialogEntity.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
		_this.txtTitle = $(_this.dialogEntity.node).find("input[name='title']"); //标题文本框

		/**
		 * 初始化弹出框数据
		 */
		_this.initData();

		/**
		 * 绑定弹出框事件
		 */
		_this.bindEvent();
	}

	/**
	 * [init 模块初始化]
	 * @return {[type]} [description]
	 */
	companyAlbum.prototype.initData = function() {
		var _this = this;
		_this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
		var showTitleAndBorder = parseInt(_this.moduleEntity.dataEntity.data.showTitleAndBorder) || 0;
		if (showTitleAndBorder) {
			_this.chkShowTitleAndBorder.addClass('curChosen');
		}else{
	        _this.chkShowTitleAndBorder.removeClass('curChosen');
		}
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	companyAlbum.prototype.bindEvent = function() {
		var _this = this;

		/**
		 * [绑定关闭、取消按钮点击事件]
		 */
		_this.btnCancel.on('click', function() {
			_this.dialogEntity.remove();
		});

		/**
		 * [绑定板块标题栏和边栏是否选中复选框点击事件]
		 */
		_this.chkShowTitleAndBorder.on('click', function() {
			$(this).toggleClass("curChosen");
		});

		/**
		 * [绑定保存按钮点击事件]
		 */
		_this.btnSave.click(function(event) {

			/**
			 * [_title 获取标题]
			 * @type {String}
			 */
			var _title = $.trim(_this.txtTitle.val()),

				/**
				 * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
				 * @type {Boolean}
				 */
				_showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1:0,

				/**
				 * [_params 请求参数]
				 * @type {[type]}
				 */
				_params = {
					'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
					'operatedata': { //操作内容
						'providerid': pageEntity.providerid, //商铺编号
						'username': pageEntity.username, //商铺用户名
						'data': {
							//'title': encodeURIComponent(_title),
							'title': _title,
							'showTitleAndBorder': _showTitleAndBorder
						}
					}
				},

				/**
				 * [_callee 正在执行函数引用]
				 * @type {Function}
				 */
				_callee = arguments.callee;

			/**
			 * [operatedata 更新请求参数]
			 * @type {Object}
			 */
			_params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
			//_params.operatedata=JSON.stringify(_params.operatedata);

			/**
			 * [验证标题非空]
			 */
			if (_title.length === 0) {
				dialog({
					title: '提示',
					content: '标题不能为空！',
					okValue: '确定',
					ok: function() {
						this.remove();
					}
				}).showModal();
				return false;
			}


			/**
			 * [保存模块配置]
			 */
			_this.moduleEntity.update({data:_params.operatedata.data},function(){

				_this.dialogEntity.close().remove();

			});


		});
	};

	module.exports = companyAlbum;

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [公司动态]
	 */
	// console.log('module_company_dynamic loaded');
	//
	// module.exports=function(){
	// 	console.log('module_company_dynamic executed');
	// };
	var company_dynamic = function(settions,html, options) {
		var _this = this;
		_this.module = settions;
		_this.moduleBox = settions.htmlEntity; //模块对象
		_this.moduleData = settions.dataEntity; //模块配置数据
		_this.editDialog = dialog({
			content: html,
			title:'编辑内容>公司动态'
		}).showModal(); //弹框显示
		_this.options = options || {};
		_this.options.rendedCallback && _this.options.rendedCallback.call(_this);
		_this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
		_this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
		_this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
		_this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
		//初始化数据
		_this.initModuleData();
		//操作数据
		_this.operateModuleData();
	};
	company_dynamic.prototype = {

		/**
		 * 初始化数据
		 */
		initModuleData: function() {
			var _t = this;
			_t.titleInput.val(_t.moduleData.data.title);
			var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
			if (showTitleAndBorder) {
				_t.showTitleAndBorderRadio.addClass('curChosen');
			}else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
			}
		},

		/**
		 * 操作数据
		 */
		operateModuleData: function() {
			var _t = this;
			//关闭、取消弹框
			_t.closeAndCancelDialogBtn.on('click', function() {
				_t.editDialog.close().remove();
			});
			//板块标题栏和边栏是否选中
			_t.showTitleAndBorderRadio.on('click', function() {
				$(this).toggleClass("curChosen");
				// $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
			});
			//弹框的保存
			_t.saveDialogBtn.on('click', function() {
				var title = $.trim(_t.titleInput.val());
				var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
				if (title.length === 0) {
					dialog({
						title: '提示',
						content: '标题不能为空！',
						okValue: '确定',
						ok: function() {
							this.close().remove();
						}
					}).showModal();
					return false;
				}
				var updateParam = {
					'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
					'operatedata': { //操作内容
						'providerid': pageEntity.providerid, //商铺编号
						'username': pageEntity.username, //商铺用户名
						'data': {
							//'title': encodeURIComponent(title),
							'title': title,
							'showTitleAndBorder': isshow
						} //模块配置数据
					}
				};
				updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

				_t.module.update({data:updateParam.data},function(){

					_t.editDialog.close().remove();

				});

			});

		}
	};

	module.exports = company_dynamic;


/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [公司介绍]
	 */
	// console.log('module_company_dynamic loaded');
	//
	// module.exports=function(){
	// 	console.log('module_company_dynamic executed');
	// };

	var CompanyIntro = function(settions, html, options) {
		var _this = this;
		_this.module = settions;
		_this.moduleBox = settions.htmlEntity; //模块对象
		_this.moduleData = settions.dataEntity; //模块配置数据
		_this.editDialog = dialog({
			content: html,
			title:'编辑内容>公司介绍'
		}).showModal(); //弹框显示
		_this.options = options || {};
		_this.options.rendedCallback && _this.options.rendedCallback.call(_this);
		_this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
		_this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
		_this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
		_this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
		//初始化数据
		_this.initModuleData();
		//操作数据
		_this.operateModuleData();
	};
	CompanyIntro.prototype = {

		/**
		 * 初始化数据
		 */
		initModuleData: function() {
			var _t = this;
			_t.titleInput.val(_t.moduleData.data.title);
			var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
			if (showTitleAndBorder) {
				_t.showTitleAndBorderRadio.addClass('curChosen');
			}else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
			}
		},

		/**
		 * 操作数据
		 */
		operateModuleData: function() {
			var _t = this;
			//关闭、取消弹框
			_t.closeAndCancelDialogBtn.on('click', function() {
				_t.editDialog.close().remove();
			});
			//板块标题栏和边栏是否选中
			_t.showTitleAndBorderRadio.on('click', function() {
				$(this).toggleClass("curChosen");
				// $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
			});
			//弹框的保存
			_t.saveDialogBtn.on('click', function() {
				var title = $.trim(_t.titleInput.val());
				var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
				if (title.length === 0) {
					dialog({
						title: '提示',
						content: '标题不能为空！',
						okValue: '确定',
						ok: function() {
							this.close().remove();
						}
					}).showModal();
					return false;
				}
				var updateParam = {
					'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
					'operatedata': { //操作内容
						'providerid': pageEntity.providerid, //商铺编号
						'username': pageEntity.username, //商铺用户名
						'data': {
							//'title': encodeURIComponent(title),
							'title': title,
							'showTitleAndBorder': isshow
						} //模块配置数据
					}
				};
				updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

				_t.module.update({data:updateParam.data},function(){

					_t.editDialog.close().remove();

				});

			});

		}
	};

	module.exports = CompanyIntro;


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [联系我们]
	 */
	var contactUs = function(settions,html, options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>联系我们'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	contactUs.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	            // $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });

	    }
	};

	module.exports = contactUs;


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [面包屑]
	 */
	var tool = __webpack_require__(65);
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
	        __webpack_require__.e/* nsure */(3, function (require) {
	            __webpack_require__(54);
	            /**
	             * 创建弹层触发一个回调函数；汪浩让第一个弹层出现的时候加的；
	             */
	            that.option.rendedCallback && that.option.rendedCallback.call(that);

	            that.searchDialog = dialog({
	                content: mustache.render(html, configData),
	                title: '编辑内容>搜索栏'
	            }).showModal();

	            that.bindEvent();

	        });
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

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [util 引入工具模块]
	 * @type {Object}
	 */
	var util = __webpack_require__(53);

	/**
	 * [custom 自定义模块]
	 * @param  {[type]} moduleEntity [模块业务对象]
	 * @param  {[type]} html         [模块设置表单HTMl]
	 * @return {[type]}              [description]
	 */
	function custom(moduleEntity, html, options) {
	  var _this = this;
	  _this.moduleEntity = moduleEntity;

	  _this.dialogEntity = dialog({
	    content: html,
	    title: '编辑内容>自定义内容'
	  }).showModal();
	  _this.options = $.extend({

	    /**
	     * [contentMaxLengthLimit 不同区域内容长度限制]
	     * @type {Object}
	     */
	    // contentMaxLengthLimit: {
	    // 	'region_percent_25': 5000,
	    // 	'region_percent_75': 30000,
	    // 	'region_full_widescreen': 40000
	    // }
	  }, options || {});
	  _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	  _this.dialogHtmlEntity = $(_this.dialogEntity.node);
	  _this.btnCancel = _this.dialogHtmlEntity.find(".t-close,.Cancel"); //关闭、取消按钮
	  _this.btnSave = _this.dialogHtmlEntity.find(".Save"); //弹框的保存按钮
	  _this.chkShowTitleAndBorder = _this.dialogHtmlEntity.find("#titleAndBorder"); //板块标题栏和边栏是否选中
	  _this.txtTitle = _this.dialogHtmlEntity.find("input[name='title']"); //标题文本框
	  _this.txtContent = _this.dialogHtmlEntity.find('textarea[name="content"]');
	  // _this.contentMaxLengthPrompt = _this.dialogHtmlEntity.find('.textPrompt'); //用户可输入字符数量提示元素
	  /**
	   * [异步加载 KindEditor 组件后再继续模块初始化]
	   */
	  __webpack_require__.e/* nsure */(9, function(require) {

	    /**
	     * 加载 KindEditor 组件
	     */
	    __webpack_require__(76);

	    /**
	     * 初始化弹出框数据
	     */
	    _this.initData();

	    /**
	     * 绑定弹出框事件
	     */
	    _this.bindEvent();

	  });
	}

	/**
	 * [init 模块初始化]
	 * @return {[type]} [description]
	 */
	custom.prototype.initData = function() {
	  var _this = this,
	    _cssPath = [];

	  /**
	   * 获取当前页面的所以外链样式表，并初始化到富文本编辑器中，以使编辑器中的展示效果和真实页面效果一致
	   */
	  // $('link[rel="stylesheet"]').each(function(index, style) {
	  // 	var _href = $.trim($(style).attr('href'));
	  // 	if (_href.length) {
	  // 		_cssPath.push(_href);
	  // 	}
	  // });

	  /**
	   * [获取自定义内容后开始初始化数据]
	   */
	  _this.getContentDeferred().always(function() {
	    _this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
	    if (Number(_this.moduleEntity.dataEntity.data.showTitleAndBorder)) {
	      _this.chkShowTitleAndBorder.addClass('curChosen');
	    } else {
	      _this.chkShowTitleAndBorder.removeClass('curChosen');
	    }

	    /**
	     * 显示用户可输入字符数量提示元素
	     */
	    // _this.contentMaxLengthPrompt.show();

	    /**
	     * [加载富文本编辑器]
	     */
	    _this.editorEntity = KindEditor.create(_this.txtContent, {
	      resizeType: 1, //2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
	      width: '100%',
	      height: 300,
	      items: [
	        'source', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
	        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
	        'insertunorderedlist', 'link', 'unlink'
	      ],
	      cssPath: ['//style.org.hc360.com/css/detail/mysite/siteconfig/newPro/mallBase.css'],
	      afterChange: function() {

	        /**
	         * 更新用户可输入字符数量
	         */
	        // _this.contentMaxLengthPrompt.find('em').text((_this.options.contentMaxLengthLimit[_this.moduleEntity.regionEntity.identifier] || 5000) - this.count('html'));
	      },
	      filterMode: false // 关闭过滤模式
	    });

	    /**
	     * 初始化富文本编辑器
	     */
	    _this.editorEntity.html(_this.moduleEntity.dataEntity.data.content);

	    /**
	     * IE9失去焦点的问题
	     */
	    _this.editorEntity.focus();
	  });
	};

	/**
	 * [getContentDeferred 自定义内容获取延迟对象]
	 * @return {[type]} [description]
	 */
	custom.prototype.getContentDeferred = function() {
	  var _this = this;

	  /**
	   * [返回自定义内容获取延迟对象]
	   */
	  var xhr = $.ajax({
	    url: '/detail/turbine/action/GetCustomContentAction/eventsubmit_doGetcustomcontent/doGetcustomcontent',
	    type: 'get',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    data: {
	      providerid: _this.moduleEntity.regionEntity.pageEntity.providerid,
	      area: _this.moduleEntity.regionEntity.identifier,
	      moduleid: _this.moduleEntity.dataEntity.moduleid,
	      windowtype: _this.moduleEntity.dataEntity.windowtype,
	      modulemark:_this.txtContent.attr('data-flag') ? _this.moduleEntity.identifier : ''
	    }
	  });

	  /**
	   * [定义延迟对象成功回调函数]
	   */
	  xhr.done(function(json) {
	    if (!!Number(json.state)) {

	      /**
	       * [content 更新模块数据]
	       */
	      //_this.moduleEntity.dataEntity.data.content = decodeURIComponent(json.data) || '';
	      _this.moduleEntity.dataEntity.data.content = json.data || '';
	    }
	  });

	  return xhr;
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	custom.prototype.bindEvent = function() {
	  var _this = this;

	  /**
	   * [绑定关闭、取消按钮点击事件]
	   */
	  _this.btnCancel.on('click', function() {
	    _this.dialogEntity.remove();
	  });

	  /**
	   * [绑定板块标题栏和边栏是否选中复选框点击事件]
	   */
	  _this.chkShowTitleAndBorder.on('click', function() {
	    $(this).toggleClass("curChosen");
	  });

	  /**
	   * [绑定保存按钮点击事件]
	   */
	  _this.btnSave.click(function(event) {

	    /**
	     * [_title 获取标题]
	     * @type {String}
	     */
	    var _title = $.trim(_this.txtTitle.val()),

	      /**
	       * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
	       * @type {Boolean}
	       */
	      _showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1 : 0,

	      /**
	       * [_contentMaxLengthLimit 区域内容长度限制]
	       * @type {Number}
	       */
	      // _contentMaxLengthLimit = _this.options.contentMaxLengthLimit[_this.moduleEntity.regionEntity.identifier] || 5000,

	      /**
	       * [_params 请求参数，不包含内容，内容通过单独接口保存]
	       * @type {[type]}
	       */
	      _params = {
	        //'title': encodeURIComponent(_title),
	        'title': _this.txtTitle.length ? _title : '',
	        'showTitleAndBorder': _this.chkShowTitleAndBorder.length ? _showTitleAndBorder : 0,
	        'content': ''
	      },

	      /**
	       * [_callee 正在执行函数引用]
	       * @type {Function}
	       */
	      _callee = arguments.callee;

	    /**
	     * [验证标题非空]
	     */
	    if (_this.txtTitle.length && (_title.length === 0)) {
	      dialog({
	        title: '提示',
	        content: '标题不能为空！',
	        okValue: '确定',
	        ok: function() {
	          this.remove();
	        }
	      }).showModal();
	      return false;
	    }

	    /**
	     * [验证标题字数上限]
	     */
	    if (_this.txtTitle.length && (_title.length > 5)) {
	      dialog({
	        title: '提示',
	        content: '标题最多输入5个字符',
	        okValue: '确定',
	        ok: function() {
	          this.remove();
	        }
	      }).showModal();
	      return false;
	    }

	    /**
	     * [验证内容字数上限]
	     */
	    // if (_this.editorEntity.count('html') > _contentMaxLengthLimit) {
	    // 	dialog({
	    // 		title: '提示',
	    // 		content: '内容最多输入' + _contentMaxLengthLimit + '个字符',
	    // 		okValue: '确定',
	    // 		ok: function() {
	    // 			this.remove();
	    // 		}
	    // 	}).showModal();
	    // 	return false;
	    // }

	    /**
	     * 过滤外网链接地址
	     */
	    var tempHtmlEntity = $('<div>').html(_this.editorEntity.html());
	    tempHtmlEntity.find('a').each(function(index, el) {
	      var linkAttr = util.parseURL($(el).attr('href'));
	      if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
	        el.href = '#';
	      }
	    });
	    _params.content = tempHtmlEntity.html();

	    /**
	     * [保存模块配置]
	     */
	    _this.moduleEntity.update({
	      data: _params
	    }, function() {

	      /**
	       * 模块更新成功后移除当前模块设置弹出框
	       */
	      _this.dialogEntity.remove();
	    });
	  });
	};

	module.exports = custom;


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by hc360 on 2017/8/15.
	 */
	module.exports = __webpack_require__(75);


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [util 引入工具模块]
	 * @type {Object}
	 */
	var util = __webpack_require__(53);

	/**
	 * [customchannel 自定义模块]
	 * @param  {[type]} moduleEntity [模块业务对象]
	 * @param  {[type]} html         [模块设置表单HTMl]
	 * @return {[type]}              [description]
	 */
	function customchannel(moduleEntity, html, options) {
	    var _this = this;
	    _this.moduleEntity = moduleEntity;
	    _this.dialogEntity = dialog({
	        content: html,
	        title: '编辑内容>自定义频道'
	    }).showModal();
	    _this.options = $.extend({

	        /**
	         * [contentMaxLengthLimit 内容长度限制]
	         * @type {Object}
	         */
	        contentMaxLengthLimit: 20000
	    }, options || {});
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.dialogHtmlEntity = $(_this.dialogEntity.node);
	    _this.btnCancel = _this.dialogHtmlEntity.find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.btnSave = _this.dialogHtmlEntity.find(".Save"); //弹框的保存按钮
	    _this.txtContent = _this.dialogHtmlEntity.find('textarea[name="content"]'); //内容文本框
	    _this.contentWrap = _this.moduleEntity.htmlEntity.find('#contents'); //模块内容包裹元素
	    _this.contentContainer = _this.moduleEntity.htmlEntity.find('textarea[name="contents"]'); //模块数据包裹元素
	    _this.contentMaxLengthPrompt = _this.dialogHtmlEntity.find('.textPrompt'); //用户可输入字符数量元素

	    /**
	     * [异步加载 KindEditor 组件后再继续模块初始化]
	     */
	    __webpack_require__.e/* nsure */(9, function(require) {

	        /**
	         * 加载 KindEditor 组件
	         */
	        __webpack_require__(76);

	        /**
	         * 初始化弹出框数据
	         */
	        _this.initData();

	        /**
	         * 绑定弹出框事件
	         */
	        _this.bindEvent();

	    });
	}

	/**
	 * [init 模块初始化]
	 * @return {[type]} [description]
	 */
	customchannel.prototype.initData = function() {
	    var _this = this;

	    /**
	     * [content 更新模块数据]
	     */
	    _this.moduleEntity.dataEntity.content = _this.contentWrap.html();

	    /**
	     * 显示用户可输入字符数量提示元素
	     */
	    _this.contentMaxLengthPrompt.show();

	    /**
	     * [加载富文本编辑器]
	     */
	    _this.editorEntity = KindEditor.create(_this.txtContent, {
	        resizeType: 1, //2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
	        width: '100%',
	        height: 300,
	        items: [
	            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
	            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
	            'insertunorderedlist', 'link'
	        ],
	        afterChange: function() {

	            /**
	             * 更新用户可输入字符数量
	             */
	            _this.contentMaxLengthPrompt.find('em').text(_this.options.contentMaxLengthLimit - this.count('html')).show();
	        }
	    });

	    /**
	     * 初始化富文本编辑器
	     */
	    _this.editorEntity.html(_this.contentContainer.val());

	    /**
	     * IE9失去焦点的问题
	     */
	    _this.editorEntity.focus();
	};

	/**
	 * [getContentUpdateDeferred 获取内容更新延迟对象]
	 * @param  {Object} param [更新内容参数]
	 * @return {Object}       [description]
	 */
	customchannel.prototype.getContentUpdateDeferred = function(param) {
	    var _this = this;

	    return $.ajax({
	        //url: '/detail/turbine/action/ajax.TemplateAjaxAction/eventsubmit_doEditcontent/doEditcontent',
	        url: '/detail/turbine/action/SaveCustomContentAction/eventsubmit_doSave/doSave',
	        type: 'post',
	        dataType: 'text',
	        data: param || {}
	    });
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	customchannel.prototype.bindEvent = function() {
	    var _this = this;

	    /**
	     * [绑定关闭、取消按钮点击事件]
	     */
	    _this.btnCancel.on('click', function() {
	        _this.dialogEntity.remove();
	    });

	    /**
	     * [绑定保存按钮点击事件]
	     */
	    _this.btnSave.click(function(event) {

	        /**
	         * [_contentMaxLengthLimit 区域内容长度限制]
	         * @type {Number}
	         */
	        var _contentMaxLengthLimit = _this.options.contentMaxLengthLimit,

	            /**
	             * [_params 请求参数]
	             */
	            _params = {
	                customizeType: _this.moduleEntity.dataEntity.type,
	                providerid: window.providerId,
	                customizeContent: ''
	            },

	            /**
	             * [_callee 正在执行函数引用]
	             * @type {Function}
	             */
	            _callee = arguments.callee;

	        /**
	         * [验证内容字数上限]
	         */
	        if (_this.editorEntity.count('html') > _contentMaxLengthLimit) {
	            dialog({
	                title: '提示',
	                content: '内容最多输入' + _contentMaxLengthLimit + '个字符',
	                okValue: '确定',
	                ok: function() {
	                    this.remove();
	                }
	            }).showModal();
	            return false;
	        }

	        /**
	         * 过滤外网链接地址
	         */
	        var tempHtmlEntity = $('<div>').html(_this.editorEntity.html());
	        tempHtmlEntity.find('a').each(function(index, el) {
	            var linkAttr = util.parseURL(el.href);
	            if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
	                el.href = '#';
	            }
	        });
	        _params.customizeContent = encodeURIComponent(tempHtmlEntity.html());

	        /**
	         * [loadingDialogEntity 显示加载中的遮罩层]
	         * @type {Object}
	         */
	        var loadingDialogEntity = dialog({
	            content: '<span class="ui-dialog-loading">加载中..</span>'
	        }).showModal();

	        /**
	         * [保存模块配置]
	         */
	        $.when(_this.getContentUpdateDeferred(_params)).done(function(data) {

	            /**
	             * 执行模块渲染逻辑
	             */
	            _this.contentWrap.html(data);

	            /**
	             * 更新模块数据
	             */
	            _this.contentContainer.val(data);

	            /**
	             * 模块更新成功后移除当前模块设置弹出框
	             */
	            _this.dialogEntity.remove();
	        }).always(function() {

	            /**
	             * 删除加载中弹出框
	             */
	            loadingDialogEntity.remove();
	        });
	    });
	};

	module.exports = customchannel;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by xyh on 2016/9/27.
	 * [扩展橱窗模块设置]
	 */
	var util = __webpack_require__(53);
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
	                    wrap.find(".seleList").html('<p class="sLeftPrompt">商铺中暂无在售商品，<a href="//my.b2b.hc360.com/my/turbine/template/corcenter%2Cbusiness%2Cstepsupplyfirst.html" target="_blank">请补充</a></p>');
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

	        __webpack_require__.e/* nsure */(3, function (require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });

	        __webpack_require__.e/* nsure */(4, function (require) {
	            __webpack_require__(56);
	            paginationDef.resolve();
	        });

	        return [mustacheDef, paginationDef];
	    }

	};

	module.exports = ExtendWindowUtil;

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	/**
	 * Created by xyh on 2016/9/22.
	 * [客户留言模块设置]
	 */
	var CustomerMesUtil = function(settions, html,options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>客户留言'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	CustomerMesUtil.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1 : 0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });

	    }
	};

	module.exports = CustomerMesUtil;

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [友情链接]
	 */
	var firendship = function(settions, html, options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>友情链接'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	firendship.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	            // $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });

	    }
	};

	module.exports = firendship;


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

	/**
	 * [latestSupply 最新供应模块]
	 * @param  {[type]} moduleEntity [模块业务对象]
	 * @param  {[type]} html         [模块设置表单HTMl]
	 * @return {[type]}              [description]
	 */
	function latestSupply(moduleEntity, html, options) {
		var _this = this;
		_this.moduleEntity = moduleEntity;
		_this.dialogEntity = dialog({
			content: html,
			title:'编辑内容>最新供应'
		}).showModal();
		_this.options = options || {};
		_this.options.rendedCallback && _this.options.rendedCallback.call(_this);
		_this.btnCancel = $(_this.dialogEntity.node).find(".t-close,.Cancel"); //关闭、取消按钮
		_this.btnSave = $(_this.dialogEntity.node).find(".Save"); //弹框的保存按钮
		_this.chkShowTitleAndBorder = $(_this.dialogEntity.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
		_this.txtTitle = $(_this.dialogEntity.node).find("input[name='title']"); //标题文本框

		/**
		 * 初始化弹出框数据
		 */
		_this.initData();

		/**
		 * 绑定弹出框事件
		 */
		_this.bindEvent();
	}

	/**
	 * [init 模块初始化]
	 * @return {[type]} [description]
	 */
	latestSupply.prototype.initData = function() {
		var _this = this;
		_this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
		var showTitleAndBorder = parseInt(_this.moduleEntity.dataEntity.data.showTitleAndBorder) || 0;
		if (showTitleAndBorder) {
			_this.chkShowTitleAndBorder.addClass('curChosen');
		}else{
	        _this.chkShowTitleAndBorder.removeClass('curChosen');
		}
	};

	/**
	 * [bindEvent 绑定事件]
	 * @return {[type]} [description]
	 */
	latestSupply.prototype.bindEvent = function() {
		var _this = this;

		/**
		 * [绑定关闭、取消按钮点击事件]
		 */
		_this.btnCancel.on('click', function() {
			_this.dialogEntity.remove();
		});

		/**
		 * [绑定板块标题栏和边栏是否选中复选框点击事件]
		 */
		_this.chkShowTitleAndBorder.on('click', function() {
			$(this).toggleClass("curChosen");
		});

		/**
		 * [绑定保存按钮点击事件]
		 */
		_this.btnSave.click(function(event) {

			/**
			 * [_title 获取标题]
			 * @type {String}
			 */
			var _title = $.trim(_this.txtTitle.val()),

				/**
				 * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
				 * @type {Boolean}
				 */
				_showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1:0,

				/**
				 * [_params 请求参数]
				 * @type {[type]}
				 */
				_params = {
					'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
					'operatedata': { //操作内容
						'providerid': pageEntity.providerid, //商铺编号
						'username': pageEntity.username, //商铺用户名
						'data': {
							//'title': encodeURIComponent(_title),
							'title': _title,
							'showTitleAndBorder': _showTitleAndBorder
						}
					}
				},

				/**
				 * [_callee 正在执行函数引用]
				 * @type {Function}
				 */
				_callee = arguments.callee;

			/**
			 * [operatedata 更新请求参数]
			 * @type {Object}
			 */
			_params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
			//_params.operatedata=JSON.stringify(_params.operatedata);

			/**
			 * [验证标题非空]
			 */
			if (_title.length === 0) {
				dialog({
					title: '提示',
					content: '标题不能为空！',
					okValue: '确定',
					ok: function() {
						this.remove();
					}
				}).showModal();
				return false;
			}

			/**
			 * [保存模块配置]
			 */
			_this.moduleEntity.update({data:_params.operatedata.data},function(){

				_this.dialogEntity.close().remove();

			});

		});
	};

	module.exports = latestSupply;

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [买卖通档案]
	 */
	var mmtArchives = function(settions, html, options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>买卖通档案'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	mmtArchives.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        // _t.titleInput.val(decodeURIComponent(_t.moduleData.data.title));
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	            // $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });


	        });

	    }
	};

	module.exports = mmtArchives;


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/9/29.
	 *
	 * [导航栏]
	 */
	var tool = __webpack_require__(65);
	var navigation = function(data, html, obj) {
	    /***
	     * 图片上传地址
	     */
	    this.uploadUrl = '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd';
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

	    /***
	     * 选中按钮样式设置 selectedStyleSet
	     */
	    this.selectedStyleSet = tool.formatDate(this.moduleData.button.selected);

	    /**
	     * 未选中按钮样式设置
	     * @type {*|{}}
	     */
	    this.unSelectedStyleSet = tool.formatDate(this.moduleData.button.unselected);

	    /**
	     * 边线类型
	     *
	     */
	    this.borderType = {
	        none: '无边框',
	        solid: '实线',
	        dashed: '点线'
	    };

	    /**
	     * [navBackgroundColor 导航背景颜色]
	     * @type {[type]}
	     */
	    this.navBackgroundColor = tool.serializeStyle(this.moduleData['background'])['background'] || '';

	    /** 初始化弹层 **/
	    this.initLayer(html);
	};
	navigation.prototype = {
	    constructor: navigation,
	    /****
	     * 初始化弹框
	     */
	    initLayer: function(html) {
	        var that = this,
	            selectedData = that.selectedStyleSet,
	            unSelectedData = that.unSelectedStyleSet;
	        /***
	         * 模板引擎配置数据
	         *
	         */
	        var configData = {
	            "fontType": ['宋体', '仿宋', '黑体', '楷体'],
	            "fontSize": ['12', '14', '16'],
	            /** 选中字体颜色和边框颜色 **/
	            "selectedColor": selectedData.color,
	            "selectedBorderColor": selectedData.border ? selectedData.border.split(" ")[2] : "",
	            /** 未选中字体颜色和边框颜色 **/
	            "unSelectedColor": unSelectedData.color,
	            "unSelectedBorderColor": unSelectedData.border ? unSelectedData.border.split(" ")[2] : "",
	            /***
	             * 选中背景
	             */
	            'selectBackground': selectedData ? tool.getBgUrl(selectedData["background"]) : undefined,
	            /***
	             * 未选中背景
	             */
	            'unSelectBackground': unSelectedData ? tool.getBgUrl(unSelectedData["background"]) : undefined,
	            /**
	             * 导航栏背景
	             */
	            'navBackground': tool.getBgUrl(that.moduleData['background']),
	            'navBackgroundColor': that.navBackgroundColor,
	            /** 边框类型 **/
	            "borderType": ['无边框', '实线', '点线'],
	            /**
	             * 设置选择的字体类型初始值
	             */
	            "setSelectFontType": function() {
	                return tool.setFontType(selectedData, '宋体', this);
	            },
	            /**
	             * 设置选择的字号初始值
	             */
	            "setSelectFontSize": function() {
	                return tool.setFontSize(selectedData, '12', this);
	            },

	            /**
	             * 设置选择的否加粗初始值
	             */
	            "setSelectFontBold": function() {
	                return tool.setFontBold(selectedData);
	            },

	            /**
	             * 设置选择的是否倾斜初始值
	             */
	            "setSelectFontStyle": function() {
	                return tool.setFontStyle(selectedData);
	            },

	            /**
	             * 设置选择的边框初始值
	             */
	            "setSelectBorderType": function() {
	                var _border = selectedData["border"],
	                    borderStyle = _border ? _border.split(" ")[1] : "none";
	                if (this == that.borderType[borderStyle]) {
	                    return '<option selected>' + this + '</option>';
	                } else {
	                    return '<option>' + this + '</option>';
	                }
	            },
	            /**
	             * 设置未选择的字体类型初始值
	             */
	            "unSelectFontType": function() {
	                return tool.setFontType(unSelectedData, '宋体', this);
	            },

	            /**
	             * 设置未选择的字号初始值
	             */
	            "unSelectFontSize": function() {
	                return tool.setFontSize(unSelectedData, '12', this);
	            },

	            /**
	             * 设置未选择的是否加粗初始值
	             */
	            "unSelectFontBold": function() {
	                return tool.setFontBold(unSelectedData);
	            },

	            /**
	             * 设置未选择的是否倾斜初始值
	             */
	            "unSelectFontStyle": function() {
	                return tool.setFontStyle(unSelectedData);
	            },

	            /**
	             * 设置未选择的边框初始值
	             */
	            "unSelectBorderType": function() {
	                var _border = unSelectedData["border"],
	                    borderStyle = _border ? _border.split(" ")[1] : "none";
	                if (this == that.borderType[borderStyle]) {
	                    return '<option selected>' + this + '</option>';
	                } else {
	                    return '<option>' + this + '</option>';
	                }
	            }
	        };

	        /**
	         * [异步加载 mustache 组件后再继续模块初始化]
	         */
	        __webpack_require__.e/* nsure */(3, function(require) {
	            __webpack_require__(54);

	            /**
	             * 创建弹层触发一个回调函数；汪浩让第一个弹层出现的时候加的；
	             */
	            that.option.rendedCallback && that.option.rendedCallback.call(that);

	            that.navDialog = dialog({
	                content: mustache.render(html, configData),
	                title: '编辑内容>导航栏'
	            }).showModal();

	            /** 导航栏弹框元素 **/
	            that.nav = $(that.navDialog.node);

	            /** 导航按钮设置区域 **/
	            that.navBtnSet = that.nav.find('[node-name="navBtnSet"]');

	            /** 导航栏背景设置区域 **/
	            that.navBgSet = that.nav.find('[node-name="navBgSet"]');

	            that.bindEvent();

	        });
	    },
	    /****
	     * 绑定弹层操作事件
	     */
	    bindEvent: function() {
	        var that = this;
	        /**
	         * 选中未选中按钮切换区域
	         */
	        var btnCheck = that.navBtnSet.find('[node-name="btnCheck"]');

	        /**
	         * 选中未选中内容按钮切换区域
	         */
	        var navContainer = that.navBtnSet.find('[node-name="navContainer"]');

	        /**
	         * 选中区域
	         */
	        var selectWrap = navContainer.find('[node-name="checkBtnSet"]');

	        /** 未选中区域 **/
	        var unSelectWrap = navContainer.find('[node-name="uncheckBtnSet"]');

	        /***
	         *  关闭弹层  保存  取消
	         */
	        that.nav.on('click', '.t-close,.Cancel', function() {
	            that.navDialog.close().remove();
	        });

	        /****
	         * 弹层设置保存
	         */
	        that.nav.on('click', '.Save', function() {
	            that.dialogSetSave();
	        });

	        /****
	         *  选中和未选中切换
	         */
	        btnCheck.on('click', 'span', function() {
	            btnCheck.find('span').removeClass();
	            $(this).addClass('checked').siblings().addClass('unchecked');
	            navContainer.find('.layout-info').hide().eq($(this).index()).show();
	        });
	        /***
	         * 加粗，斜体，点击切换
	         */
	        that.navBtnSet.on('click', '.checkBox', function() {
	            if ($(this).hasClass('curCheckBox')) {
	                $(this).removeClass('curCheckBox');
	            } else {
	                $(this).addClass('curCheckBox');
	            }
	        });
	        /**
	         * 导航按钮和导航栏背景 默认和自定义切换
	         */
	        that.nav.on('click', '.radioCon,.sp-replacer', function() {
	            var customBox = $(this).parent('.radioBox').next('.pic-box');
	            var selectePicBox = customBox.next('.navimg-file-box');
	            $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
	            if ($(this).index() == 2) {
	                customBox.show();
	            } else {
	                customBox.hide();
	                selectePicBox.hide();
	            }
	        });

	        /***
	         * 初始化选中字体颜色选择器
	         */
	        tool.createColorpicker(
	            selectWrap.find('[node-name="fontCorlorJoe"]'),
	            that.selectedStyleSet["color"],
	            that.navDialog
	        );

	        /***
	         * 初始化选中边框颜色选择器
	         */
	        tool.createColorpicker(
	            selectWrap.find('[node-name="borderColorJoe"]'),
	            that.selectedStyleSet["border-color"],
	            that.navDialog
	        );

	        /***
	         * 初始化没有选中的字体颜色选择器
	         */
	        tool.createColorpicker(
	            unSelectWrap.find('[node-name="fontCorlorJoe"]'),
	            that.unSelectedStyleSet["color"],
	            that.navDialog
	        );

	        /***
	         * 初始化没有选中的边框颜色选择器
	         */
	        tool.createColorpicker(
	            unSelectWrap.find('[node-name="borderColorJoe"]'),
	            that.unSelectedStyleSet["border-color"],
	            that.navDialog
	        );

	        /**
	         * [初始化导航栏背景设置的背景色选择器]
	         */
	        tool.createColorpicker(
	            that.navBgSet.find('[node-name="bgColorJoe"]'),
	            that.navBackgroundColor,
	            that.navDialog,
	            null,
	            function(color) {
	                var radioWrap = $(this).closest('.radioCon'),
	                    customBox = $(this).closest('.radioBox').next('.pic-box'),
	                    selectePicBox = customBox.next('.navimg-file-box');
	                radioWrap.addClass('curRadioBox').siblings().removeClass('curRadioBox');
	                customBox.hide();
	                selectePicBox.hide();
	            }
	        );

	        /**
	         * 点击选择图片出现选择文件，初始化了选中和未选中，还有导航栏背景
	         */
	        var checkImg = this.nav.find('[node-name="imgUpload"]');
	        checkImg.click(function() {
	            $(this).parent('.pic-box').hide();
	            $(this).parents('.layout-info-con').find('.navimg-file-box').show();
	        });

	        /**
	         * 撤销选择文件，初始化了选中和未选中，还有导航栏背景
	         */
	        var undo = this.nav.find('[node-name="undo"]');
	        undo.click(function() {
	            $(this).parents('.navimg-file-box').find('span.txt').html('未选择任何文件').end().hide();
	            $(this).parents('.layout-info-con').find('.pic-box').show();
	        });

	        /**
	         * 初始化选中按钮背景图片上传
	         */
	        this.btnBgUpload('#checkImgUpload', selectWrap);

	        /**
	         * 初始化未选中按钮背景图片上传
	         */
	        this.btnBgUpload('#unCheckImgUpload', unSelectWrap);

	        this.navBgUpload();
	    },
	    /**
	     * 弹层设置保存
	     */
	    dialogSetSave: function() {
	        var that = this,
	            moduleData = {},
	            picBox = that.navBgSet.find('.pic-box');

	        /**
	         * [bgColorChecked 导航栏背景设置是否选中]
	         * @type {Boolean}
	         */
	        var bgColorChecked = that.navBgSet.find('.radioBox .curRadioBox').index() === 1,

	            /**
	             * [bgColorValue 导航栏背景色值]
	             * @type {[type]}
	             */
	            bgColorValue = that.navBgSet.find('[node-name="bgColorJoe"]').attr('data-color');
	        moduleData.button = {
	            "selected": that.formData('[node-name="checkBtnSet"]'),
	            "unselected": that.formData('[node-name="uncheckBtnSet"]')
	        };

	        if (picBox.is(":visible")) {
	            moduleData.background = 'background:url(' + picBox.find('.picUpdetaImg img').attr('src') + ')';
	        } else if (bgColorChecked && bgColorValue) {
	            moduleData.background = 'background:' + bgColorValue + ';';
	        } else {
	            moduleData.background = '';
	        }
	        //模块的保存
	        that.moduleEntity.update({
	            data: moduleData
	        }, function() {

	            that.navDialog.close().remove();
	        });
	    },
	    /***
	     * 导航按钮背景上传
	     * @param id  触发上传的id
	     * @param wrap 选中和未选中的外层div
	     */
	    btnBgUpload: function(id, checkeWrap) {
	        var that = this,
	            /** 上传图片展示区域 **/
	            pictureShow = checkeWrap.find('.pic-box'),
	            /** 上传图片操作区域 **/
	            pictureOperat = checkeWrap.find('.navimg-file-box'),
	            /** logo图片标题区域 **/
	            titleWrap = pictureOperat.find('span.txt'),
	            /** 上传按钮 **/
	            upload = pictureOperat.find('[node-name="upload"]'),
	            /** 默认logoTile **/
	            defaultTilte = "未选择任何文件";
	        var webuploderObj = {
	            // swf文件路径
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
	            // 文件接收服务端。
	            server: that.uploadUrl,
	            // 选择文件的按钮。可选。
	            pick: {
	                id: id,
	                multiple: false //关闭多个文件传输的功能
	            },
	            formData: {
	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || ''
	            },
	            //设置文件上传域的name。
	            fileVal: "file",
	            //最多支持上传一个图片
	            threads: 1,
	            //限制单个文件大小
	            fileSingleSizeLimit: 100 * 1024, // 100 k
	            // 只允许选择图片文件。
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,png',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
	            },
	            compress: false,
	            duplicate: true, //是否可以上传重复文件，默认为undefined
	            //禁掉整个页面的拖拽功能
	            disableGlobalDnd: true
	        };
	        tool.createWebuploder(webuploderObj, upload, titleWrap, defaultTilte, function(img) {
	            titleWrap.html('未选择任何文件').end().hide();
	            pictureShow.show().find('.picUpdetaImg p').empty().append(img);
	        });
	    },
	    /***
	     * 导航栏背景上传
	     */
	    navBgUpload: function() {
	        var that = this,
	            /** 上传图片展示区域 **/
	            pictureShow = this.navBgSet.find('.pic-box'),
	            /** 上传图片操作区域 **/
	            pictureOperat = this.navBgSet.find('.navimg-file-box'),
	            /** logo图片标题区域 **/
	            titleWrap = pictureOperat.find('span.txt'),
	            /** 上传按钮 **/
	            upload = pictureOperat.find('[node-name="upload"]'),
	            /** 默认logoTile **/
	            defaultTilte = "未选择任何文件";
	        var webuploderObj = {
	            // swf文件路径
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
	            // 文件接收服务端。
	            server: that.uploadUrl,
	            // 选择文件的按钮。可选。
	            pick: {
	                id: '#navBgUpload',
	                multiple: false //关闭多个文件传输的功能
	            },
	            formData: {
	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || ''
	            },
	            //设置文件上传域的name。
	            fileVal: "file",
	            //最多支持上传一个图片
	            threads: 1,
	            //限制单个文件大小
	            fileSingleSizeLimit: 100 * 1024, // 100 k
	            // 只允许选择图片文件。
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,png',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
	            },
	            compress: false,
	            duplicate: true, //是否可以上传重复文件，默认为undefined
	            //禁掉整个页面的拖拽功能
	            disableGlobalDnd: true
	        };
	        tool.createWebuploder(webuploderObj, upload, titleWrap, defaultTilte, function(img) {
	            titleWrap.html('未选择任何文件').end().hide();
	            pictureShow.show().find('.picUpdetaImg p').empty().append(img);
	        });
	    },
	    /**
	     *  结构化选择和未选择的数据
	     * @param wrap  选择和未选择warp
	     * @returns {string}
	     */
	    formData: function(wrap) {
	        var that = this,
	            companyString = "",
	            checkWrap = that.nav.find(wrap),
	            radioBox = checkWrap.find('.radioBox>span.radioCon'),
	            checkBox = checkWrap.find('.checkBox'),
	            /** 自定义背景路径 **/
	            backgroundSrc = checkWrap.find('.pic-box .picUpdetaImg img').attr('src'),
	            /** 边框类型 **/
	            borderStyle = that.getBorderType(checkWrap.find('[name="borderStyle"] option:selected').html()),
	            /** 边框颜色 **/
	            borderColor = checkWrap.find('[node-name="borderColorJoe"]').attr('data-color'),
	            navSetObj = {
	                "font-family": checkWrap.find('[name="wordType"] option:selected').html(),
	                "font-size": checkWrap.find('[name="wordSize"] option:selected').html() + 'px',
	                "font-weight": checkBox.eq(0).hasClass("curCheckBox") ? "bold" : "normal",
	                "font-style": checkBox.eq(1).hasClass("curCheckBox") ? "italic" : "normal",
	                "color": checkWrap.find('[node-name="fontCorlorJoe"]').attr('data-color'),
	                "border": '1px ' + borderStyle + ' ' + borderColor
	            };

	        /***
	         * 如果选中的是默认背景，background是“”；
	         */
	        if (radioBox.eq(0).hasClass('curRadioBox')) {
	            navSetObj.background = "";
	        } else {
	            backgroundSrc ? (navSetObj.background = 'url(' + backgroundSrc + ')') : (navSetObj.background = "");
	        }

	        for (var key in navSetObj) {
	            companyString += key + ':' + navSetObj[key] + ';';
	        }
	        return companyString;
	    },
	    /***
	     * 获取页面上的边框类型，转换成css
	     * @param value 边框类型
	     * @returns {string}
	     */
	    getBorderType: function(value) {
	        var borderType = '';
	        $.each(this.borderType, function(key, val) {
	            if (value == val) {
	                borderType = key;
	                return false;
	            }
	        });
	        return borderType;
	    }
	};
	module.exports = navigation;

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

	/**
	 * Created by StarLikeRain on 28/09/2016.
	 * [产品分类]
	 */
	var prodClassify = function(settions, html, options) {
	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>产品分类'
	    }).showModal(); //弹框显示
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};
	prodClassify.prototype = {

	    /**
	     * 初始化数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close().remove();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	            // $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1 : 0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });

	    }
	};

	module.exports = prodClassify;


/***/ }),

/***/ 86:
/***/ (function(module, exports) {

	/**
	 * Created by xyh on 2016/9/26.
	 * [产品橱窗模块设置]
	 */
	var ProdWindowUtil = function(settions,html,options) {

	    var _this = this;
	    _this.module = settions;
	    _this.moduleBox = settions.htmlEntity; //模块对象
	    _this.moduleData = settions.dataEntity; //模块配置数据
	    //弹框显示
	    _this.editDialog = dialog({
	        content: html,
	        title:'编辑内容>产品橱窗'
	    }).showModal();
	    _this.options = options || {};
	    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
	    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
	    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder_proWin"); //板块标题栏和边栏是否选中
	    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
	    //初始化数据
	    _this.initModuleData();
	    //操作数据
	    _this.operateModuleData();
	};

	ProdWindowUtil.prototype = {

	    /**
	     * 初始化模块数据
	     */
	    initModuleData: function() {
	        var _t = this;
	        _t.titleInput.val(_t.moduleData.data.title);
	        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
	        if (showTitleAndBorder) {
	            _t.showTitleAndBorderRadio.addClass('curChosen');
	        }else{
	            _t.showTitleAndBorderRadio.removeClass('curChosen');
	        }
	    },

	    /**
	     * 操作模块数据
	     */
	    operateModuleData: function() {
	        var _t = this;
	        //关闭、取消弹框
	        _t.closeAndCancelDialogBtn.on('click', function() {
	            _t.editDialog.close();
	        });
	        //板块标题栏和边栏是否选中
	        _t.showTitleAndBorderRadio.on('click', function() {
	            $(this).toggleClass("curChosen");
	        });
	        //弹框的保存
	        _t.saveDialogBtn.on('click', function() {
	            var title = $.trim(_t.titleInput.val());
	            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
	            if (title.length === 0) {
	                dialog({
	                    title: '提示',
	                    content: '标题不能为空！',
	                    okValue: '确定',
	                    ok: function() {
	                        this.close().remove();
	                    }
	                }).showModal();
	                return false;
	            }
	            var updateParam = {
	                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
	                'operatedata': { //操作内容
	                    'providerid': pageEntity.providerid, //商铺编号
	                    'username': pageEntity.username, //商铺用户名
	                    'data': {
	                        //'title': encodeURIComponent(title),
	                        'title': title,
	                        'showTitleAndBorder': isshow
	                    } //模块配置数据
	                }
	            };
	            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);
	            _t.module.update({data:updateParam.data},function(){

	                _t.editDialog.close().remove();

	            });

	        });
	    }

	};

	module.exports = ProdWindowUtil;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/10/11.
	 *  [专业橱窗]
	 */

	/**
	 *  加载工具类
	 */
	var tool = __webpack_require__(65),
	    util = __webpack_require__(53);

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
	        __webpack_require__.e/* nsure */(3, function (require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });
	        __webpack_require__.e/* nsure */(4, function (require) {
	            __webpack_require__(56);
	            paginationDef.resolve();
	        });
	        return [mustacheDef, paginationDef];
	    }

	}
	module.exports = professionWin



/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 姜艳云 on 2016/9/22.
	 *
	 * [公司招牌]
	 */
	var tool = __webpack_require__(65);
	var signature = function(data, html, obj) {

	    this.moduleEntity = data;

	    /***
	     * 图片上传地址
	     */
	    this.uploadUrl = '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd';
	    /**
	     * 模块数据
	     */
	    this.moduleData = data.dataEntity.data;

	    /****
	     * 配置对象
	     * @type {*|{}}
	     */
	    this.option = obj || {};

	    var that = this;
	    that.def = this.loadComponents();
	    $.when.apply(null, that.def).done(function() {
	        that.initLayer(html);
	    });
	};

	signature.prototype = {
	    constructor: signature,
	    /***
	     * 根据 that.dataEntity.data 初始化公司招牌弹层默认值；
	     * @param date  弹层的html
	     */
	    initLayer: function(date) {
	        var that = this,
	            /***
	             * 招牌背景设置
	             */
	            backgUrl = that.moduleData["backgroundurl"],
	            /**
	             * 公司名称设置
	             */
	            companyName = tool.formatDate(that.moduleData["companyname"]),
	            /**
	             * 招牌背景url
	             */
	            bjUrlCss = backgUrl == "" ? "" : (tool.getBgUrl(backgUrl) || ''),

	            /**
	             * [styleObject 解析样式]
	             * @type {[type]}
	             */
	            styleObject = tool.serializeStyle(backgUrl),

	            /**
	             * [signHeight 招牌高度，默认为110]
	             * @type {[type]}
	             */
	            signHeight = parseInt(styleObject['height']) || 110;


	        /***
	         * 模板引擎配置数据
	         */
	        var
	            configData = {
	                "fontType": ['宋体', '仿宋', '黑体', '楷体'],
	                "fontSize": ['12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],
	                "signHeight": [{
	                    text: '110像素',
	                    val: 110
	                }, {
	                    text: '130像素',
	                    val: 130
	                }, {
	                    text: '150像素',
	                    val: 150
	                }],
	                "height": signHeight,
	                "logourl": that.moduleData.logourl,
	                "defaultBg": pageEntity.template.BrandImage, //默认招牌背景图【defaultBg】
	                "companyname": companyName,
	                "backgroundCollor": companyName.color ? companyName.color : "#2399fe", //默认公司名称背景色
	                /** 是否显示公司名称 **/
	                "showCompanyName": function() {
	                    var fontSize = companyName["display"];
	                    if (fontSize != "none") {
	                        return 'curCheckBox';
	                    }
	                },
	                /***
	                 * 是否显示删除按钮
	                 */
	                "isShowDel": function() {
	                    var _logo = that.moduleData.logourl;
	                    if (_logo) {
	                        return 'block';
	                    } else {
	                        return 'none';
	                    }
	                },
	                /***
	                 * 是否显示自定义招牌的图片
	                 * @returns {*}
	                 */
	                isShowUserImg: function() {
	                    if (backgUrl) {
	                        return 'block';
	                    } else {
	                        return 'none';
	                    }
	                },
	                /** 设置字号初始值 **/
	                "setFontSize": function() {
	                    return tool.setFontSize(companyName, 30, this);
	                },
	                /** 设置字体类型初始值 **/
	                "setFontType": function() {
	                    return tool.setFontType(companyName, "宋体", this);
	                },
	                /** 设置是否加粗初始值 **/
	                "setFontBold": function() {
	                    return tool.setFontBold(companyName);
	                },
	                /** 设置是否倾斜初始值 **/
	                "setFontStyle": function() {
	                    return tool.setFontStyle(companyName);
	                },
	                /** 设置默认招牌背景 **/
	                "setDefaultSign": function() {
	                    if (bjUrlCss == "") {
	                        return 'curRadioBox';
	                    }
	                },
	                "signSelectedHeight": function() {
	                    if (this.val == signHeight) {
	                        return 'curRadioBox';
	                    }
	                },
	                /** 设置自定义招牌背景 **/
	                "setUserSign": function() {
	                    if (bjUrlCss != "") {
	                        return 'curRadioBox';
	                    }
	                },
	                /** 初始化默认背景和自定义的内容显示 **/
	                "showUserSign": function() {
	                    return function(text, render) {
	                        if (render(text) == 'curRadioBox') {
	                            return 'block';
	                        } else {
	                            return 'none';
	                        }
	                    };
	                },
	                /** 自定义招牌 显示自定义招牌图片 **/
	                "signBjImg": function() {
	                    return function(text, render) {
	                        if (render(text) == 'curRadioBox') {
	                            return bjUrlCss;
	                        }
	                    };
	                }
	            };
	        /**
	         * 创建弹层触发一个回调函数；
	         */
	        that.option.rendedCallback && that.option.rendedCallback.call(that);

	        /**
	         * 初始化公司招牌弹层
	         */
	        that.signDialog = dialog({
	            content: mustache.render(date, configData),
	            title: '编辑内容>公司招牌'
	        }).showModal();

	        /** 公司招牌弹框元素 **/
	        that.sign = $(that.signDialog.node);

	        /** 公司logo元素 **/
	        that.logo = $('[node-name="companyLogo"]', that.sign);

	        /** 公司名称元素 **/
	        that.companyName = $('[node-name="companyName"]', that.sign);

	        /**
	         * [signHeight 招牌高度]
	         * @type {[type]}
	         */
	        that.signHeight = $('[node-name="signHeight"]', that.sign);
	        that.signHeightLimit = signHeight;

	        /** 招牌背景元素 **/
	        that.signList = $('[node-name="signList"]', that.sign);

	        /** 绑定各种事件 **/
	        that.bindEvent();

	        /***
	         * 点击颜色初始化colorjoe
	         */
	        tool.createColorpicker(that.companyName.find('[node-name="colorjoe"]'), companyName["color"], that.signDialog);

	    },
	    /***
	     * 绑定事件
	     */
	    bindEvent: function() {
	        var that = this;
	        /***
	         *  关闭弹层
	         */
	        that.sign.on('click', '.t-close,.Cancel', function() {
	            that.signDialog.close().remove();
	        });

	        /***
	         * 公司名称,加粗，斜体，点击切换
	         */
	        that.companyName.on('click', '.checkBox', function() {
	            if ($(this).hasClass('curCheckBox')) {
	                $(this).removeClass('curCheckBox');
	            } else {
	                $(this).addClass('curCheckBox');
	            }
	        });
	        /***
	         * 默认和自定义招牌切换
	         */
	        that.signList.on('click', '.radioCon', function() {
	            var index = $(this).index();
	            var _defaultSign = $('[node-name="defaultSign"]');
	            var userSign = $('[node-name="userSign"]');
	            if (!$(this).hasClass('curRadioBox')) {
	                $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
	                if (index == 0) {
	                    _defaultSign.show();
	                    userSign.hide();
	                } else if (index == 1) {
	                    userSign.show();
	                    _defaultSign.hide();
	                }
	            }
	        });
	        /**
	         * [切换选中样式]
	         */
	        that.signHeight.on('click', '.radioCon', function() {
	            var _this = $(this),
	                _val = $(this).attr('data-val') || '';
	            if (!_this.hasClass('curRadioBox')) {
	                _this.addClass('curRadioBox').siblings().removeClass('curRadioBox');
	                that.signList.find('.wrapSignHeight').text(_val);
	            }

	            /**自定义招牌展示区域**/
	            var userSign = $('[node-name="userSign"]', that.signList),

	                /**选择文件区域**/
	                operateUserSign = userSign.find('.updown-file-box'),

	                /**上传完成后图片标题；**/
	                signBjTitle = operateUserSign.find('.txt');

	            /**
	             * 修改上传图高度上线
	             */
	            if (that.uploadEntity) {

	                /**
	                 * [若第一次选择的招牌高度导致上传文件失败，第二次选择正确的高度后，不用再选择文件，直接点击上传即可]
	                 */
	                var _files = that.uploadEntity.getFiles(),
	                    _file_last = _files[_files.length - 1];
	                if (_file_last && (_file_last.getStatus() === 'error') && _file_last.name === signBjTitle.text()) {
	                    _file_last.setStatus('queued');
	                }
	                that.uploadEntity.options.formData['heightMaxLimit'] = _val;
	            }
	        });
	        this.logoUpload();
	        this.trademarkUpload();
	        this.saveModuleData();
	    },
	    /***
	     *  公司LOGO 上传，删除等操作
	     */
	    logoUpload: function() {
	        var that = this,
	            /** 上传图片展示区域 **/
	            logoShow = $('.logo-box', that.logo),
	            /** 选择文件区域 **/
	            uploadLogo = $('.updown-file-box', that.logo),
	            /** 上传按钮 **/
	            upload = $('[node-name="upload"]', uploadLogo),
	            /** 删除按钮 **/
	            aDelBtn = $('.aDelBtn', that.logo),
	            /** 撤销按钮 **/
	            undo = $('[node-name="undo"]', uploadLogo),
	            /** logo图片标题区域 **/
	            logoTitle = $('.txt', uploadLogo),
	            /** 默认logoTile **/
	            defaultTilte = "未选择任何文件";
	        /**
	         * 删除logo
	         */
	        aDelBtn.click(function() {
	            $('.com-logo', that.logo).find('p').html('');
	            /***
	             * 隐藏删除按钮
	             */
	            aDelBtn.hide();
	        });
	        /** 上传按钮切换到上传操作区域 **/
	        $('.uploadBtn', that.logo).click(function() {
	            logoShow.hide();
	            uploadLogo.show();
	        });
	        /** 撤销上传 **/
	        undo.click(function() {
	            var _img = logoShow.show().find('.com-logo p img');
	            /***
	             * 修改默认标题
	             */
	            logoTitle.html(defaultTilte);
	            /***
	             * 隐藏选择文件区域
	             */
	            uploadLogo.hide();
	            /***
	             * 显示选择图片区域
	             */
	            logoShow.show();
	            /***
	             * 如果没有上传图片，隐藏删除按钮
	             */
	            if (_img.length == 0 || (!_img.attr('src'))) {
	                aDelBtn.hide();
	            }
	            return false;
	        });
	        /****
	         * 初始化上传组件
	         */
	        var webuploderObj = {
	            // swf文件路径
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
	            // 文件接收服务端。
	            server: that.uploadUrl,
	            // 选择文件的按钮。可选。
	            pick: {
	                id: '#logoUploadBtn',
	                multiple: false //关闭多个文件传输的功能
	            },
	            formData: {
	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || ''
	            },
	            //设置文件上传域的name。
	            fileVal: "file",
	            //最多支持上传一个图片
	            threads: 1,
	            //限制单个文件大小
	            fileSingleSizeLimit: 200 * 1024, // 200 k
	            // 只允许选择图片文件。
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,png',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
	            },
	            compress: false,
	            duplicate: true, //是否可以上传重复文件，默认为undefined
	            //禁掉整个页面的拖拽功能
	            disableGlobalDnd: true
	        };
	        tool.createWebuploder(webuploderObj, upload, logoTitle, defaultTilte, function(img) {
	            /***
	             * 修改成默认图片标题
	             */
	            logoTitle.html('未选择任何文件').end().hide();
	            /***
	             * 显示删除按钮
	             */
	            aDelBtn.show();
	            /***
	             * 更新logo
	             */
	            logoShow.show().find('.com-logo p').empty().append(img);
	        });

	    },
	    /***
	     *  招牌背景 上传，删除等操作
	     */
	    trademarkUpload: function() {
	        var that = this,
	            /**自定义招牌展示区域**/
	            userSign = $('[node-name="userSign"]', that.signList),

	            /**选择图片区域**/
	            showUserSign = userSign.find('.updown-pic'),

	            /**选择图片按钮**/
	            selectImgBtn = showUserSign.find('.uploadBtn'),

	            /**选择文件区域**/
	            operateUserSign = userSign.find('.updown-file-box'),

	            /** 自定义招牌显示区域**/
	            customImg = userSign.find('[node-name="customImg"]'),

	            /** 上传按钮**/
	            upload = operateUserSign.find('[node-name="upload"]'),

	            /**撤销按钮**/
	            undo = operateUserSign.find('[node-name="undo"]'),

	            /**上传完成后图片标题；**/
	            signBjTitle = operateUserSign.find('.txt'),

	            /****
	             * 默认标题
	             */
	            defaultTilte = '未选择任何文件';
	        /***
	         * 选择图片
	         */
	        selectImgBtn.click(function() {
	            showUserSign.hide();
	            operateUserSign.show();
	        });
	        /** 撤销上传 **/
	        undo.click(function() {
	            var _img = customImg.find('[noda-name="imgShowWrap"] img');
	            /***
	             * 初始化默认标题
	             */
	            signBjTitle.html(defaultTilte);
	            /** 隐藏选择文件区域 ***/
	            operateUserSign.hide();

	            /** 如果没有上传图片，或者图片的src==“”，隐藏自定义招牌图片显示区域 ***/
	            if (_img.length == 0 || (!_img.attr('src'))) {
	                customImg.hide();
	            }

	            /** 显示选择图片区域**/
	            showUserSign.show();
	            return false;
	        });
	        /****
	         * 初始化上传组件
	         */
	        var webuploderObj = {
	            // swf文件路径
	            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
	            // 文件接收服务端。
	            server: that.uploadUrl,
	            // 选择文件的按钮。可选。
	            pick: {
	                id: '#signUploadBtn',
	                multiple: false //关闭多个文件传输的功能
	            },
	            formData: {
	                /**
	                 * [operType 操作类型设置为上传图片]
	                 */
	                operType: 'upload',

	                /**
	                 * [picstr 加密信息picstr]
	                 * @type {String}
	                 */
	                picstr: $('#picstr').val() || '',
	                /***
	                 * 是否限制宽高
	                 */
	                widthHeightLimitFlag: 1,
	                /***
	                 * 最小宽度
	                 */
	                widthMinLimit: '0',
	                /***
	                 * 最大宽度
	                 */
	                widthMaxLimit: '1920',
	                /***
	                 * 最小高度
	                 */
	                heightMinLimit: '0',
	                /***
	                 * 最大高度
	                 */
	                heightMaxLimit: that.signHeightLimit
	            },
	            //设置文件上传域的name。
	            fileVal: "file",
	            //最多支持上传一个图片
	            threads: 1,
	            //限制单个文件大小
	            fileSingleSizeLimit: 5 * 1024 * 1024, // 5 M
	            // 只允许选择图片文件。
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,png',
	                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
	            },
	            compress: false,
	            duplicate: true, //是否可以上传重复文件，默认为undefined
	            disableGlobalDnd: true
	        };
	        tool.createWebuploder(webuploderObj, upload, signBjTitle, defaultTilte, function(img) {
	            /***
	             * 修改选择文件区域的标题，隐藏选择文件区域
	             */
	            operateUserSign.find('.txt').html('未选择任何文件').end().hide();
	            /***
	             * 显示上传图片区域
	             */
	            showUserSign.show();
	            /***
	             * 更新图片
	             */
	            customImg.show().find('[noda-name="imgShowWrap"]').empty().append(img);
	        }, function(uploadEntity) {
	            that.uploadEntity = uploadEntity;
	        });
	    },

	    /***
	     * 保存弹框的数据
	     */
	    saveModuleData: function() {
	        var that = this;
	        that.sign.find('.Save').click(function() {
	            var _src = that.logo.find('.com-logo img').attr('src'),
	                _data = {
	                    logourl: _src ? _src : "",
	                    companyname: that.assemblyCompanyDate(),
	                    backgroundurl: that.assemblySignBj(),
	                    brandimage: pageEntity.template.BrandImage
	                };

	            //模块保存
	            that.moduleEntity.update({
	                data: _data
	            }, function() {

	                that.signDialog.close().remove();
	            });

	        });
	    },
	    /***
	     * 根据弹框的设置。拼接companyname，返回拼接好的公司名称的设置字符串；
	     * @returns {string}
	     */
	    assemblyCompanyDate: function() {
	        var that = this;
	        var checkBox = that.companyName.find('.checkBox');
	        var companySite = {
	            "display": checkBox.eq(0).hasClass("curCheckBox") ? "" : "none",
	            "font-family": $('[name="wordType"] option:selected').html(),
	            "font-size": $('[name="wordSize"] option:selected').html() + "px",
	            "font-weight": checkBox.eq(1).hasClass("curCheckBox") ? "bold" : "normal",
	            "font-style": checkBox.eq(2).hasClass("curCheckBox") ? "italic" : "normal",
	            "color": that.companyName.find('[node-name="colorjoe"]').attr('data-color')
	        };
	        var companyString = "";
	        for (var key in companySite) {
	            companyString += key + ':' + companySite[key] + ';';
	        }
	        return companyString;
	    },
	    /****
	     * 返回用户选择的招牌背景
	     */
	    assemblySignBj: function() {
	        var _arr = [];
	        var radioCon = this.signList.find('.radioBox .radioCon');
	        // 默认招牌
	        if (!radioCon.eq(0).hasClass('curRadioBox')) {
	            // 自定义
	            var _src = this.signList.find('[node-name="userSign"] .signBg-pic img').attr('src');
	            if (_src != "") {
	                _arr.push('background:url(' + _src + ') no-repeat center center');
	            }
	        }

	        /**
	         * 招牌高度
	         */
	        var _radioSignHeight = this.signHeight.find('.curRadioBox').first();
	        if (_radioSignHeight.length) {
	            _arr.push('height:' + _radioSignHeight.attr('data-val') + 'px;');
	        }

	        /**
	         * 返回解析后的样式字符串
	         */
	        return _arr.join(';');
	    },
	    loadComponents: function() {
	        var mustacheDef = $.Deferred();
	        __webpack_require__.e/* nsure */(3, function(require) {
	            __webpack_require__(54);
	            mustacheDef.resolve();
	        });

	        /**
	         * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
	         * @type {Object}
	         */
	        var imgLiquidDeferred = $.Deferred();
	        __webpack_require__.e/* nsure */(1, function(require) {
	            __webpack_require__(44);
	            imgLiquidDeferred.resolve();
	        });

	        return [mustacheDef, imgLiquidDeferred];
	    }

	};
	module.exports = signature;

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * [exports 导出同自定义模块]
	 * @type {[type]}
	 */
	module.exports = __webpack_require__(75);

/***/ })

});