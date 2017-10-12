/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//style.org.hc360.cn/js/module/shop3.0/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by hc360 on 2017/5/24.
	 */

	__webpack_require__(4);
	__webpack_require__(21);
	__webpack_require__(59);

	__webpack_require__(98);

	(function($) {

	    var window = $(window);
	    $.fn.swapPic = function(options) {
	        new swapPic(this, options);
	    };
	    swapPic = function(el, options) {
	        var obj = this;
	        obj.el = el;
	        var settings = $.extend({}, $.swapPic.defaults, options || {});
	        var num = 0,
	            page = 0,
	            len = 0,
	            piclist = null,
	            img_num = 0;
	        $.extend(obj, {
	            init: function() {
	                var left = settings.preBtn;
	                var right = settings.nexBtn;
	                piclist = $(obj.el).find("li");
	                img_num = piclist.length;
	                len = settings.showNum;
	                page = img_num % len === 0 ? img_num / len : parseInt(img_num / len) + 1;
	                obj.changeBtn();
	                if (left && right) {
	                    left.bind("click", function() {
	                        num--;
	                        num = (num < 0 ? 0 : num);
	                        obj.palyImg();
	                        obj.changeBtn();
	                    });
	                    right.bind("click", function() {
	                        num++;
	                        num = (num > (page - 1) ? (page - 1) : num);
	                        obj.palyImg();
	                        obj.changeBtn();
	                    });
	                }
	            },
	            palyImg: function() {
	                if (img_num > len) { //判断是否需要分页切换
	                    if (num > 0 || num < page - 1) {
	                        if (settings.direct == "horizontal") { //水平方向切换
	                            $(obj.el).animate({
	                                "marginLeft": (-$(piclist[0]).outerWidth() * len * num)
	                            }, settings.animtSpeed);
	                        } else if (settings.direct == "vertical") { //垂直方向切换
	                            $(obj.el).animate({
	                                "marginTop": (-$(piclist[0]).outerHeight() * len * num)
	                            }, settings.animtSpeed);
	                        }
	                    }
	                }
	            },
	            changeBtn: function() {
	                var left = settings.preBtn;
	                var right = settings.nexBtn;
	                if (settings.btnLClass && settings.btnRClass) {
	                    left.removeClass(settings.disBtnLClass);
	                    left.addClass(settings.btnLClass);
	                    right.removeClass(settings.disBtnRClass);
	                    right.addClass(settings.btnRClass);
	                    if (num === 0) {
	                        left.removeClass(settings.btnLClass);
	                        left.addClass(settings.disBtnLClass);
	                    }
	                    if (num === (page - 1) || img_num === 0) {
	                        right.removeClass(settings.btnRClass);
	                        right.addClass(settings.disBtnRClass);
	                    }
	                }
	            }
	        });
	        if (el.length > 0) {
	            obj.init();
	        }
	    }
	    $.swapPic = {
	        defaults: {
	            animtSpeed: 1000,
	            direct: "horizontal"
	        }
	    }
	})(jQuery);

	(function($) {

	    var Commodity = function Commodity() {

	    };

	    Commodity.prototype = {

	        init: function() {

	            var _this = this;

	            $("input[type='text'],textarea").placeholder();

	            /**
	             * 异步加载右侧工具条
	             */
	            _this.loadRightToolbar();

	            /**
	             * 异步加载头部导航条
	             */
	            _this.loadTopNav();

	            /**
	             * 异步加载搜索条
	             */
	            _this.loadSearchMod();

	            /**
	             * 大图页产品轮播事件
	             */
	            _this.bigImgBindEvent();

	            /**
	             * 立即询价
	             */
	            _this.inqueryPriceRightNow();

	            /**
	             * 查看联系方式
	             */
	            if(parseInt(window.memTypeId) < 4){

	              $.ajax({
	                type: "GET",
	                url: "//wsdetail.b2b.hc360.com//youker/single/"+(window.scyps || {}).sc.providerId,
	                dataType: "jsonp",
	                contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                jsonp: "callback",
	                success:function (res) {
	                  if(res){
	                    /**
	                     * 初始化“查看联系方式”弹层
	                     */
	                    HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-detail-contactInfo.dialog.js',function () {

	                      $('[data-query="contactBtn"]').contactDialogDetail({
	                        is3y:false,
	                        isLogin:window.iflogin || false,
	                        contactInfo:{
	                          mp:[res.mp,res.telephone,res.telephone400,res.otherTelephone],//卖家电话集合
	                          contactor:(res.contactor ||'') +' '+(res.duty||''),
	                          companyname:res.name||''
	                        },
	                        inquiryTitle:$.trim($("#inquiryTitle").val()),
	                        isbusin:2,//区分是否首页，首页是1，非首页是2,
	                        providerId:window.scyps.sc.providerId,
	                        /**商机id*/
	                        businessId:window.supplyBcId,
	                        /**验证手机号监测点值*/
	                        checkMPClick:'UserBehavior_detail_contact_mobileverify_pics_free?detailbcid=',
	                        /**电话无人接听按钮监测点值*/
	                        noAnswerClick:'UserBehavior_detail_contact_noanswer_pics_free?detailbcid=',
	                        /**发送到我手机按钮监测点值*/
	                        sendPhoneClick:'UserBehavior_detail_contact_sendtomobile_pics_free?detailbcid=',
	                        /**完善提交按钮监测点值*/
	                        submitAllClick:'UserBehavior_detail_contact_detailedpurchase_pics_free?detailbcid='
	                      });

	                    });
	                  }

	                },
	                error:function () {
	                  alert('网络异常，请稍后重试！')
	                }
	              });


	            }else{
	              _this.toFindContact();
	            }


	            /**
	             * 我的浏览记录模块
	             */
	            _this.myBrowseHistory();

	            /**
	             * 相关推荐模块显示和隐藏
	             */
	            _this.recommendShowOrNot();

	            /**
	             * 加载相关商品推荐模块
	             */
	            //_this.loadRecommendInshopOrNot();

	            /**
	             * 异步加载优质商品推荐模块
	             */
	            _this.loadSuperiorRecommend();

	            /**
	             * 优质推荐模块和下面广告跟随滚动条滚动变为漂浮状态
	             */
	            _this.moduleFloat();

	            /**
	             * 添加微信图标
	             */
	            _this.addWeixinIcon();

	            /**
	             * 顶部条出现
	             */
	            _this.addTopIcon();

	            /**
	             * 询底价
	             */
	            _this.queryPrice();


	        },

	        /**
	         * 异步加载右侧工具条方法
	         */
	        loadRightToolbar: function() {

	            if (typeof scyps !== undefined) {
	                if (scyps.sc.is3y === "0") {
	                    var qqsrc = "//style.org.hc360.cn/js/module/detail/companyService/hc.righToolbar.min.js";
	                }
	                HC.HUB.addScript(qqsrc, function() { //企业客服异步加载
	                    $.fn.rightSidebar.init(scyps.sc);
	                });
	            }
	        },

	        /**
	         * 加载头部导航条方法
	         */
	        loadTopNav: function() {

	            if (!window.scyps || scyps.sc.is3y !== "1") {
	                HC.HUB.addScript('//style.org.hc360.cn/js/build/source/widgets/flowconfig/hc.flowconfig.min.js', function() {
	                    HC.W.load('topnav', function() {
	                        var topNavList = $('.webTopNav');
	                        if (topNavList && topNavList.length > 0) {
	                            topnav.init(false, 'narrow');
	                            $('#wrapInner').append(topNavList);
	                            topNavList.css({
	                                "top": "0",
	                                "position": "static"
	                            });
	                        }
	                    })
	                });
	            }

	        },

	        /**
	         * 加载搜索模块方法
	         */
	        loadSearchMod: function() {

	            //加载搜索框
	            HC.W.load('searchModule', function() {
	                $('#searchMod').length > 0 && $('#searchMod').searchModule({
	                    className: 'defaultSearch2',
	                    searchOur: 1,
	                    shopOurUrl: businUrl + "?flag=busin",
	                    userlogs: {
	                        input: 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_topsearch_input\')"', //input
	                        searchCookie: 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_topsearch_sh\')"', //cookie词
	                        searchLink: 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_topsearch_aw\')"', // 联想词
	                        ourBtn: 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_topsearchmy_1\')"', //搜本店
	                        allBtn: 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_topsearchall\')"' //搜全站
	                    }
	                });

	            });
	        },

	        /**
	         * 产品大图模块事件绑定
	         */
	        bigImgBindEvent: function() {

	            var imgContainer = $("#bigImgContainer"),
	                imgCon = $("#bigImgCon"),
	                smallImgContainer = $('#smallImgContainer'),
	                smallImgCon = $("#smallImgCon"),
	                baiduAds = imgCon.siblings('[data-name="ads_baidu"]'),
	                lastProClick = window.ismmt ? "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_last_commodity_1')" : "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_last_commodity_2')";
	            nextProClick = window.ismmt ? "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_Next_commodity_1')" : "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_Next_commodity_2')";

	            //大图轮播
	            imgCon.owlCarousel({
	                singleItem: true,
	                loop: false,
	                afterAction: function() {

	                    var index = imgCon.find('.owl-pagination .active').index();

	                    //小图加亮选中,跳转到指定小图
	                    smallImgCon.find('.owl-item span').removeClass('imgCur');
	                    smallImgCon.find(".owl-item:eq(" + index + ")").find("span").addClass("imgCur");
	                    smallImgCon.trigger("owl.goTo", index);

	                    //无“下一件商品”字样出现时修改右按钮监测点
	                    if (baiduAds.is(':hidden')) {
	                        imgContainer.find('#nextBtn em').hide();
	                        imgContainer.find('#nextBtn a').attr({ 'href': 'javascript:;', 'onclick': 'return hcclick("?hcdetail_enterpriselog=supplyself_viewpics_bigimgright");' });
	                    }

	                    //是第一个，出现“上一件商品”字样
	                    if (index == 0) {
	                        if (window.showLastEm) {
	                            imgContainer.find('#prevBtn em').show().text('上一件商品');
	                            //有“上一件商品”字样出现时修改左按钮监测点
	                            imgContainer.find('#prevBtn a').attr({ 'href': window.lastHtml, 'onclick': lastProClick });
	                        } else {
	                            //无“上一件商品”字样出现时修改左按钮监测点
	                            imgContainer.find('#prevBtn em').hide();
	                            imgContainer.find('#prevBtn a').attr({ 'href': 'javascript:;', 'onclick': 'return hcclick("?hcdetail_enterpriselog=supplyself_viewpics_bigimgleft");' });
	                        }
	                    } else {
	                        //无“上一件商品”字样出现时修改左按钮监测点
	                        imgContainer.find('#prevBtn em').hide();
	                        imgContainer.find('#prevBtn a').attr({ 'href': 'javascript:;', 'onclick': 'return hcclick("?hcdetail_enterpriselog=supplyself_viewpics_bigimgleft");' });
	                    }

	                }
	            });

	            //小图轮播
	            smallImgCon.owlCarousel({
	                items: 4,
	                afterAction: function() {
	                    /*var index = smallImgCon.find('.owl-pagination .active').index();

	                    //是最后一个，将向右按钮变为不可用
	                    if(smallImgCon.children(":eq("+ index +")").is(smallImgCon.children(":last"))){
	                        smallImgContainer.find('.ImgRigArrow').hide().siblings('.rigNimg').show();
	                    }else{
	                        smallImgContainer.find('.rigNimg').hide().siblings('.ImgRigArrow').show();
	                    }

	                    //是第一个，将向左按钮变为不可用
	                    if(smallImgCon.children(":eq("+ index +")").is(smallImgCon.children(":first"))){
	                        smallImgContainer.find('.leftNimg').show().siblings('.ImgLeftArrow').hide();
	                    }else{
	                        smallImgContainer.find('.ImgLeftArrow').show().siblings('.leftNimg').hide();
	                    }*/
	                }
	            });

	            //大图向左移动
	            imgContainer.on('click', '#prevBtn,a.imgLeft', function(e) {

	                //隐藏“下一件商品”字样，修改右按钮监测点
	                imgContainer.find('#nextBtn em').hide();
	                imgContainer.find('#nextBtn a').attr({ 'href': 'javascript:;', 'onclick': 'return hcclick("?hcdetail_enterpriselog=supplyself_viewpics_bigimgright");' });

	                if (baiduAds.is(':visible')) {
	                    baiduAds.hide();

	                    //因为前几帧有百度鼠标悬浮式广告(baiduImagePlus)，为了向左移动时候能显示该广告，需要把前几帧的包裹元素显示
	                    imgCon.show();

	                    imgCon.trigger("owl.goTo", imgCon.find('.owl-item').length - 1);
	                    //当仅有一张图片时，显示“上一件商品”字样，修改左按钮监测点
	                    e.preventDefault();
	                    if (imgCon.find('.owl-item').length == 1) {
	                        if (window.showLastEm) {
	                            imgContainer.find('#prevBtn em').text('上一件商品').show();
	                            imgContainer.find('#prevBtn a').attr({ 'href': window.lastHtml, 'onclick': lastProClick });
	                        }

	                    }
	                } else {
	                    //如果出现“上一件商品”时再点击禁止轮播，点击此按钮直接跳转到“上一件商品”的链接地址，否则可以轮播
	                    if (imgContainer.find('#prevBtn em').is(':hidden')) {
	                        e.preventDefault();
	                        imgCon.trigger("owl.prev");
	                    }
	                }

	            });

	            //大图向右移动
	            imgContainer.on('click', '#nextBtn,a.imgRight', function(e) {


	                if (baiduAds.is(':hidden') && imgCon.find('.owl-item').length - 1 == imgCon.find('.owl-pagination .active').index()) { //当仅有一张图片并且百度广告隐藏的
	                    //百度广告显示
	                    baiduAds.show();

	                    //因为前几帧有百度鼠标悬浮式广告(baiduImagePlus)，为了能遮住该广告，需要把前几帧的包裹元素隐藏
	                    imgCon.hide();

	                    e.preventDefault();
	                    //“上一件商品”隐藏，修改左按钮监测点
	                    imgContainer.find('#prevBtn em').hide();
	                    imgContainer.find('#prevBtn a').attr({ 'href': 'javascript:;', 'onclick': 'return hcclick("?hcdetail_enterpriselog=supplyself_viewpics_bigimgleft");' });

	                    if (window.showNextEm) {
	                        imgContainer.find('#nextBtn em').show().text('下一件商品');
	                        imgContainer.find('#nextBtn a').attr({ 'href': window.nextHtml, 'onclick': nextProClick });
	                    }

	                } else {
	                    if(baiduAds.is(':hidden')){
	                        //如果出现“下一件商品”时再点击禁止轮播，点击此按钮直接跳转到“下一件商品”的链接地址，否则可以轮播
	                        if (imgContainer.find('#nextBtn em').is(':hidden') || imgCon.siblings().length == 0) {
	                            imgCon.trigger("owl.next");
	                        }
	                    }

	                }
	            });

	            //小图向左移动
	            smallImgContainer.on('click', '.ImgLeftArrow', function() {
	                smallImgCon.trigger("owl.prev");
	            });

	            //小图向右移动
	            smallImgContainer.on('click', '.ImgRigArrow', function() {
	                smallImgCon.trigger("owl.next");
	            });

	            //小图的点击事件
	            smallImgCon.on('click', 'li', function(e) {
	                e.stopPropagation();
	                var $this = $(this);

	                baiduAds.hide();

	                //因为前几帧有百度鼠标悬浮式广告(baiduImagePlus)，为了向左移动时候能显示该广告，需要把前几帧的包裹元素显示
	                imgCon.show();

	                //点击的小图加亮
	                $this.parent('.owl-item').siblings('.owl-item').find('span').removeClass('imgCur');
	                $this.find('span').addClass('imgCur');

	                //大图跳转到小图对应的大图
	                var index = $this.parent().index();
	                imgCon.trigger("owl.goTo", index);
	            });

	        },

	        /**
	         * 立即询价
	         */
	        inqueryPriceRightNow: function() {

	            var _this = this,
	                proName = $.trim($(".titBox span a").text()), //产品名称
	                $inquiryBox = $("#inquiryMessageDialog"),
	                pageOne_title = $("#inquiryMessageDialog").find("input[name='proTitle']"), //第一页产品名称
	                pageOne_tel = $("#inquiryMessageDialog").find("input[name='buyerTel']"), //第一页手机号
	                pageOne_submit = $("#inquiryMessageDialog").find("#inquirymit"), //第一页提交按钮
	                pageTwo_submit = $("#inquiryMessageDialog").find("#inquirysub"), //第二页提交按钮 --点击提交合并发送两页的数据
	                pageOne_content = $("#inquiryMessageDialog").find(".dAlertBoxCon2:eq(0)"), //第一页内容
	                pageTwo_content = $("#inquiryMessageDialog").find(".dAlertBoxCon2:eq(1)"), //第二页内容
	                pageTwo_textarea = $("#inquiryMessageDialog").find("textarea"), //第二页用途描述
	                pageThree_content = $("#inquiryMessageDialog").find(".dAlertBoxCon2:eq(2)"), //第三页内容
	                pageTwo_tel = $('#inquiryMessageDialog').find("#telnumber"), //第二页手机号
	                pageTwo_valiImg = $("#inquiryMessageDialog").find("#validate_img"), //验证码图片
	                pageTwo_imgCode = $('#inquiryMessageDialog').find('#inquriycaptcha'), //第二页图形验证码输入框
	                pageTwo_code = $('#inquiryMessageDialog').find("#valid_Code"), //第二页手机验证码输入框
	                pageTwo_getcode = $('#inquiryMessageDialog').find("#phoneGet_Code"), //第二页获取短信验证码
	                pageTwo_closeBtn = $('#inquiryMessageDialog').find('#closePageTwo'), //第二页关闭按钮(如果第二页未提交点击关闭，则发送第一页的数据)
	                pageTwo_phoerror = $('#inquiryMessageDialog').find('#validCode_Tip'), //手机验证码错误提示
	                pageOne_closeBtn = $('#inquiryMessageDialog').find('a[data-close="1"]'), //第一页关闭按钮
	                pageThree_closeBtn = $('#inquiryMessageDialog').find('a[data-close="3"]'), //第三页关闭按钮
	                timer, //发送按钮定时器
	                pageOne_data = {}, //第一页提交数据
	                pageTwo_data = {}; //第二页提交数据

	            $("#immediateInquiry").on('click', function() {
	                pageThree_content.hide();
	                pageThree_closeBtn.hide();
	                pageOne_closeBtn.show();

	                _this.initDialogBox($inquiryBox);
	                _this.createMask();
	                $inquiryBox.show();

	            });

	            if (proName != "" && proName.length > 0) { //产品名称自动填充
	                pageOne_title.val(proName);
	            }

	            //验证产品名称不能为空
	            pageOne_title.on('blur', function() {
	                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                    $(this).parent().append("<em><strong></strong>请输入采购产品名称</em>");
	                }
	            });
	            //手机号只能输入数字
	            pageOne_tel.on('keyup', function() {
	                var v = $.trim(this.value.replace(/\D/g, ""));
	                this.value = v.length > 11 ? v.substring(0, 11) : v;
	            });
	            pageOne_tel.on('blur', function() {
	                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                    $(this).parent().append("<em><strong></strong>请输入手机号码</em>");
	                } else {
	                    if (!/^1\d{10}/i.test($(this).val())) {
	                        $(this).parent().append("<em><strong></strong>请输入正确手机号</em>");
	                    }
	                }
	            });
	            //重新输入产品名称
	            pageOne_title.parent().on('click', function() {
	                if ($(this).find("em").length > 0) {
	                    $(this).find("em").remove();
	                    pageOne_title.focus();
	                }
	            });
	            //重新输入手机号
	            pageOne_tel.parent().on('click', function() {
	                if ($(this).find("em").length > 0) {
	                    $(this).find("em").remove();
	                    pageOne_tel.focus();
	                }
	            });

	            //第二页校验采购产品
	            var secondProduct = $("#inquiryMessageDialog").find('#secProductInput');
	            secondProduct.on('keyup', function() {
	                var v = $.trim(this.value.replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, ""));
	                this.value = v;
	            });
	            secondProduct.on('blur', function() {
	                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                    $(this).parent().find("em.warning").show();
	                }
	            });
	            secondProduct.parent().on('click', function() {
	                var warntip = $(this).find('em.warning');
	                if (warntip.is(":visible")) {
	                    warntip.hide();
	                }
	                secondProduct.focus();
	            });

	            //第二页校验采购数量
	            var secondProductNum = $("#inquiryMessageDialog").find('#amountInputnum');
	            secondProductNum.on('keyup', function() { //限制输入大于0 的数字
	                var parnt = /^[1-9]\d*(\.\d+)?$/;
	                if (!parnt.exec(this.value)) {
	                    this.value = "";
	                }
	            });
	            secondProductNum.on('blur', function() { //不为空校验
	                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                    $(this).parent().find("em.warning").show();
	                }
	            });
	            secondProductNum.parent().on('click', function() { //重新输入
	                var warntip = $(this).find('em.warning');
	                if (warntip.is(":visible")) {
	                    warntip.hide();
	                }
	                secondProductNum.focus();
	            });

	            //初始化日期插件
	            HC.W.load('wdatepicker', function() {
	                $("#buyToDate").on('focus', function() {
	                    var tom1 = new Date();
	                    tom1.setDate(tom1.getDate() + 1);
	                    WdatePicker({
	                        dateFmt: 'yyyy-MM-dd',
	                        minDate: tom1
	                    });
	                });
	            });

	            //日期错误信息消失
	            $("#buyToDate").parent().on('click', function() {
	                var $this = $(this);
	                $this.find('em.warning').hide();
	            });

	            //更多描述不允许输入特殊字符
	            pageTwo_textarea.on('keyup', function() {
	                var v = $.trim(this.value.replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, ""));
	                this.value = v;
	            });

	            //第二页手机号只能限制输入1开头的数字
	            pageTwo_tel.on('keyup', function() {
	                var v = $.trim(this.value.replace(/\D/g, ""));
	                this.value = v.length > 11 ? v.substring(0, 11) : v;
	            });
	            pageTwo_tel.on('blur', function() {
	                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                    $(this).parent().find("em.warning").show();
	                } else {
	                    if (!/^1\d{10}/i.test($(this).val())) {
	                        $(this).parent().find("em.warning").show();
	                    }
	                }
	            });
	            //第二页重新输入手机号--dongfuxia
	            pageTwo_tel.parent().on('click', function() {
	                if ($(this).find("em.warning").show()) {
	                    $(this).find("em.warning").hide();
	                }
	                pageTwo_tel.focus();
	            });
	            //重新输入验证码--dongfuxia
	            pageTwo_code.parent().on('click', function() {
	                if ($(this).find("em.warning").show()) {
	                    $(this).find("em.warning").hide();
	                }
	                pageTwo_code.focus();
	            });

	            //图形验证码输入框校验
	            pageTwo_imgCode.parent().on("click", function() { //点击输入框错误提示消失
	                $(this).find("em.warning").hide();
	                pageTwo_imgCode.focus();

	            });
	            //点击短信验证码发送按钮
	            pageTwo_getcode.on('click', function() {
	                //先验证图形，成功在触发发送验证码事件
	                if ($.trim(pageTwo_imgCode.val()) == "") {
	                    //验证码不能为空
	                    pageTwo_imgCode.parent().find("em.warning").show().html("<strong></strong>请输入验证码");
	                } else {
	                    //校验图形验证码
	                    imgValiInput();
	                }
	            });
	            //验证码刷新
	            $("#refresh_Img").on("click", function() {
	                pageTwo_valiImg.attr("src", "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
	            });
	            //按钮发送倒计时
	            function settime(val, count) {
	                if (count == 0) {
	                    val.removeAttr("disabled");
	                    val.html("免费获取验证码");
	                    pageTwo_getcode.removeClass("codeBtnGray");
	                    pageTwo_getcode.addClass("codeBtnNew");
	                    count = 60;
	                    clearTimeout(timer);
	                    return false;
	                } else {
	                    val.html("重新发送(" + count + ")");
	                    count--;
	                }
	                timer = setTimeout(function() {
	                    settime(val, count);
	                }, 1000);
	            }

	            var initParam = {
	                pOne: pageOne_content,
	                pTwo: pageTwo_content,
	                titleLoc: pageOne_title,
	                title: proName,
	                tel: pageOne_tel,
	                desc: pageTwo_textarea,
	                amount: $("#inquiryMessageDialog").find("#amountInputnum"),
	                //price: $("[data-query='CP_value']"),
	                closeBtn: $("#inquiryMessageDialog").find("[data-query='clearMask']"),
	                pThree: pageThree_content //第三页内容
	            };
	            //关闭按钮
	            $('#inquiryMessageDialog').on("click", '[data-query="clearMask"]', function(evt) {
	                if ($(this).attr("id") == 'closePageTwo') {
	                    //先关闭第二页按钮先发送第一页数据。再初始化弹框数据
	                    sendPageData(pageOne_data);
	                    initParam = $.extend(initParam, {
	                        buytype: true, //采购类型
	                        vailcode: true, //验证码
	                        countdown: true //清空倒计时
	                    });
	                }
	                if ($(this).attr("data-close") == "3") {
	                    //关闭第二页弹框
	                    initParam = $.extend(initParam, {
	                        buytype: true, //采购类型
	                        vailcode: true, //验证码
	                        countdown: true //清空倒计时
	                    });
	                }
	                closeDialog(initParam);
	                if ($(this).parent().parent().attr('id') == "corMessageDialog") {
	                    $(this).parent().children('.title,.word1,.word-box').show();
	                    $(this).parent().children('#sendSuccess2,#sendSuccess3').hide();
	                    $("#InqueryMobile").val("");
	                }
	                evt.preventDefault();

	            });

	            //第一页提交(不提交到数据库，带到第二页面)
	            pageOne_submit.unbind('click').click(function() {
	                var isOrNot = validateOneTitleAndTel(pageOne_title, pageOne_tel);
	                if (isOrNot) { //验证通过
	                    //初始化采购产品
	                    secondProduct.val("");
	                    //初始化采购数量
	                    secondProductNum.val("");
	                    //初始化截止日期
	                    $("#buyToDate").val("");
	                    //默认隐藏提示层
	                    pageTwo_content.find('em.warning').hide();

	                    var data = {
	                        areaName: "",
	                        areaid: inquiryParamVO.areaid,
	                        businId: inquiryParamVO.businId,
	                        businTitle: encodeURIComponent($.trim(pageOne_title.val())),
	                        comeUrl: "",
	                        companyName: "",
	                        contact: "",
	                        isbusin: "",
	                        sellerProviderId: scyps.sc.providerId,
	                        supcatId: inquiryParamVO.supcatId,
	                        supcatName: "",
	                        sysFlag: "",
	                        telPhone: $.trim(pageOne_tel.val()),
	                        /*purchasePrice: "",*/
	                        purchaseInfo: "",
	                        type: 1,
	                        buyerSourceId: 'detail_short_inquiry',
	                        charset: 'utf8'
	                    };
	                    pageOne_data = data; //将第一页数据赋给变量第一页数据 --dongfuxia
	                    pageOne_content.hide();
	                    pageOne_closeBtn.hide(); //关闭按钮隐藏
	                    //图形验证码初始化
	                    pageTwo_valiImg.attr("src", "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
	                    //改变弹框位置--dongfuxia
	                    $inquiryBox.hide();
	                    pageTwo_content.show();
	                    initDialogBox($inquiryBox);
	                    pageTwo_closeBtn.show();
	                    $inquiryBox.show();
	                    //第二页手机号码默认为第一页输入手机号--dongfuxia
	                    pageTwo_tel.val($.trim(pageOne_tel.val()));

	                    //第二页提交
	                    pageTwo_submit.unbind('click').click(function() {
	                        //采购产品不为空
	                        if ($.trim(secondProduct.val()) == "" || $.trim(secondProduct.val()).length < 1) {
	                            secondProduct.parent().find('em.warning').show();
	                        }

	                        //采购数量不为空
	                        if ($.trim(secondProductNum.val()) == "" || $.trim(secondProductNum.val()).length < 1) {
	                            secondProductNum.parent().find('em.warning').show();
	                        }

	                        //采购截止日期不为空
	                        if ($.trim($("#buyToDate").val()) == "" || $.trim($("#buyToDate").val()).length < 1) {
	                            $("#buyToDate").parent().find('em.warning').show();
	                        }

	                        //图形验证码不为空
	                        if ($.trim(pageTwo_imgCode.val()) == "" || $.trim(pageTwo_imgCode.val()).length < 1) {
	                            pageTwo_imgCode.parent().find('em.warning').html('<strong></strong>请输入验证码').show();
	                        }

	                        //短信验证码不为空
	                        if ($.trim(pageTwo_code.val()) == "" || $.trim(pageTwo_code.val()).length < 1) {
	                            pageTwo_code.parent().find('em.warning').show();
	                        }

	                        if ($('em.warning').is(':visible')) {
	                            return false;
	                        }
	                        //校验短信验证码输入框是否正确
	                        jQuery.ajax({
	                            type: "GET",
	                            url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",
	                            dataType: "jsonp",
	                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                            data: {
	                                code: $.trim(pageTwo_code.val()),
	                                phone: pageTwo_tel.val()
	                            },
	                            timeout: 2000,
	                            async: false,
	                            success: function(res) {
	                                if (res.code == 1) { //发送手机验证码成功 code   1成功; 2验证失败；3.验证失败验证码不一致；4.验证失败已过期
	                                    pageTwo_phoerror.hide().html("<strong></strong>请输入验证码");

	                                    var param = $.extend(data, {
	                                        purchaseInfo: encodeURIComponent(pageTwo_textarea.val()),
	                                        inquiryNum: $.trim(secondProductNum.val()),
	                                        deadline: $.trim($("#buyToDate").val()),
	                                        product: encodeURIComponent($.trim(secondProduct.val()))
	                                    });
	                                    //判断第一页和第二页手机号是否一致，如果不一致，则发送两次请求，如果一致，则发送一次
	                                    if (pageOne_data.telPhone == $.trim(pageTwo_tel.val())) {
	                                        pageTwo_data = param; //将扩展数据赋给第二页数据
	                                        sendPageData(pageTwo_data); //提交第二页数据
	                                    } else {
	                                        //sendPageData(pageOne_data);
	                                        param.telPhone = $.trim(pageTwo_tel.val());
	                                        pageTwo_data = param;
	                                        sendPageData(pageTwo_data);
	                                    }
	                                } else if (res.code == 2) {
	                                    pageTwo_phoerror.show().html("<strong></strong>验证失败");
	                                } else if (res.code == 3) {
	                                    pageTwo_phoerror.show().html("<strong></strong>验证失败验证码不一致");
	                                } else if (res.code == 4) {
	                                    pageTwo_phoerror.show().html("<strong></strong>验证失败已过期");
	                                }
	                            },
	                            error: function() {
	                                alert("网络异常，请重试");
	                            }
	                        });
	                    });
	                }
	            });

	            //初始化弹框
	            function initDialogBox(opt) {
	                var winH = $(window).height(),
	                    winW = $(window).width(),
	                    hScroll = $(window).scrollTop(),
	                    selfH = opt.height(),
	                    selfW = opt.width();
	                winH = winH < selfH ? selfH + 100 : winH;
	                opt.css({
	                    "position": "absolute",
	                    "left": (winW - selfW) / 2 + "px",
	                    "top": (winH - selfH) / 2 + hScroll + "px",
	                    "z-index": 120001
	                })
	            }

	            //校验图片验证码输入框的值
	            function imgValiInput() {
	                jQuery.ajax({
	                    type: "GET",
	                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
	                    dataType: "jsonp",
	                    data: {
	                        picCode: $.trim(pageTwo_imgCode.val())
	                    },
	                    timeout: 2000,
	                    async: false,
	                    success: function(res) {
	                        if (res.code == 0) {
	                            //验证成功
	                            pageTwo_imgCode.parent().find("em.warning").hide().html("<strong></strong>请输入验证码");
	                            //发送验证码
	                            if ($.trim(pageTwo_tel.val()) == "") {
	                                pageTwo_tel.parent().find("em.warning").show();
	                            } else {
	                                sendPhoneValiCode($.trim(pageTwo_imgCode.val()));
	                            }
	                        } else {
	                            //验证失败
	                            pageTwo_imgCode.parent().find("em.warning").show().html("<strong></strong>验证码错误");
	                        }

	                    },
	                    error: function() {
	                        alert("网络异常，请重试");
	                    }
	                });
	            }

	            //点击发送短信验证码
	            function sendPhoneValiCode(piccode) {
	                jQuery.ajax({
	                    type: "GET",
	                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",
	                    dataType: "jsonp",
	                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                    jsonp: "callback",
	                    data: {
	                        picCode: piccode,
	                        phone: pageTwo_tel.val()
	                    },
	                    timeout: 2000,
	                    async: false,
	                    success: function(res) {
	                        if (res.code == 1) { //发送手机验证码成功
	                            //按钮置灰，60秒后恢复
	                            pageTwo_getcode.removeClass("codeBtnNew");
	                            pageTwo_getcode.addClass("codeBtnGray");
	                            pageTwo_getcode.attr("disabled");
	                            settime(pageTwo_getcode, 60); //发送按钮点击成功后置灰设置倒计时
	                        } else if (res.code == 2) {
	                            pageTwo_phoerror.show().html("<strong></strong>每天发送次数超过上限");
	                        } else if (res.code == 3) {
	                            pageTwo_phoerror.show().html("<strong></strong>发送验证码失败");
	                        } else if (res.code == 4) {
	                            pageTwo_phoerror.show().html("<strong></strong>验证码失败，请重新获取");
	                        } else { //res==5
	                            pageTwo_phoerror.show().html("<strong></strong>图形验证码不正确");
	                        }
	                    },
	                    error: function() {
	                        alert("网络异常，请重试");
	                    }
	                });
	            }

	            //发送询价单ajax
	            function sendPageData(pageData) {
	                $.ajax({
	                    type: "GET",
	                    url: "http://my.b2b.hc360.com/my/turbine/action/inquiry.InquiryAction/eventsubmit_doPerform/doperform?callback=?",
	                    dataType: "jsonp",
	                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                    data: pageData,
	                    jsonp: "callback",
	                    success: function(res) {
	                        if (res && res.code == "yes") {
	                            //如果是点击第二页关闭后数据提交
	                            if (pageData.inquiryNum == undefined) {
	                                pageOne_content.show();
	                            } else {
	                                //第二页发送成功后页面展示
	                                pageTwo_content.hide(); //第二页隐藏
	                                pageThree_content.show(); //第三页显示
	                                pageTwo_closeBtn.hide();
	                                pageThree_closeBtn.show();
	                            }
	                        } else if (res && res.code == "self") {
	                            alert("您不能给自己发询价单！");
	                        } else {
	                            alert("网络异常，请稍后重试！");
	                        }
	                    },
	                    error: function() {
	                        alert("网络异常，请稍后重试！");
	                    }
	                });
	            }

	            //验证产品名称和手机号方法
	            function validateOneTitleAndTel(loc1, loc2) {
	                var flag = true;
	                //产品名称不为空,并且过滤关键词
	                if ($.trim(loc1.val()) == "" || loc1.val().length == 0) {
	                    loc1.parent().append("<em><strong></strong>请输入采购产品名称</em>");
	                    flag = false;
	                } else { //过滤关键词
	                    $.ajax({
	                        url: "http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",
	                        type: "GET",
	                        data: {
	                            plantitle: encodeURIComponent(loc1.val())
	                        },
	                        dataType: "jsonp",
	                        success: function(res) {
	                            if (res.code == 0) {
	                                loc1.parent().append("<em><strong>产品名称含有违禁词</strong></em>");
	                                flag = false;
	                            }
	                        }
	                    })
	                }
	                //手机号不为空并且格式正确
	                if ($.trim(loc2.val()) == "" || loc2.val().length == 0) {
	                    loc2.parent().append("<em><strong></strong>请输入手机号码</em>");
	                    flag = false;
	                } else {
	                    if (!/^1\d{10}/i.test(loc2.val())) {
	                        loc2.parent().append("<em><strong></strong>请输入正确手机号</em>");
	                        flag = false;
	                    }
	                }
	                return flag;
	            };

	            //关闭弹框
	            function closeDialog(param) { //关闭弹框初始化弹框内容--dongfuxia
	                $inquiryBox.hide();
	                $("#mask").remove();
	                if (param) {
	                    //弹层关闭初始化第一页显示，第二、三页隐藏
	                    param.pOne.show();
	                    param.pTwo.hide();
	                    param.pThree.hide();
	                    //初始化产品名称
	                    if (param.title != "") param.titleLoc.val(param.title);
	                    if (param.titleLoc.parent().find("em").length > 0) param.titleLoc.parent().find("em").remove();
	                    param.tel.val(""); //初始化联系电话
	                    if (param.tel.parent().find("em").length > 0) param.tel.parent().find("em").remove();
	                    param.amount.val(1); //初始化采购数量
	                    param.desc.val(""); //初始化用途描述
	                    if (param.vailcode) { //清空验证码
	                        pageTwo_imgCode.val(""); //图形验证码
	                        pageTwo_code.val(""); //短信验证码
	                    }
	                    if (param.countdown) {
	                        settime(pageTwo_getcode, 0);
	                        return false;
	                    }
	                }
	            }

	        },

	        /**
	         * 询底价
	         */
	        queryPrice:function () {

	          /**
	           * 初始化询底价按钮
	           */
	          HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

	            $('[data-name="inquiryPrice"]').queryDialog({
	              is3y:window.scyps.sc.is3y=="1" ? true : false,
	              companyName:window.infoname || '',
	              providerId:window.scyps.sc.providerId
	            });

	          });

	        },

	        /**
	         * 查看联系方式
	         */
	        toFindContact: function() {

	            var _this = this,
	                $contactBox = $("#corMessageDialog"),
	                $sendMsgBox = $("#dialogSendMessage"),
	                $warning = $(".warning"),
	                $phone = $("#InqueryMobile"),
	                $cellphoneNumber = $("#cellphoneNumber"), //发送名片，手机号
	                $captcha = $("#captcha"), //验证码
	                $cellPhoneNumError = $("#cellPhoneNumError"),
	                $validateError = $("#validate_error"),
	                $errorTipInquiry = $(".inquiry_form_con_tip"),
	                $back = $('[data-query="back1"]'), //查看联系方式返回按钮
	                $info = $("#dialogCorMessage"),
	                $sendMsgToMobile = $('[data-query="sendMSGToMobile"]');

	            $("#findContact").on('click', function() {
	                _this.initDialogBox($contactBox);
	                _this.createMask();
	                $contactBox.show();
	            });

	            $warning.on("click", function(evt) {
	              $(this).hide();
	              $(this).closest("div").find("input").focus();
	            });

	            $('#subtnonce').on('click', function() {
	                submitInquiryMobile(this);
	            });

	            //手机提交代码开始
	            var timedown_mobile = 5;

	            submit_mobile_time = function(o) {
	                if (timedown_mobile == 0) {
	                    //o.removeAttribute("disabled");
	                    timedown_mobile = 5;
	                } else {
	                    //o.setAttribute("disabled", true);
	                    timedown_mobile--;
	                    setTimeout(function() {
	                        submit_mobile_time(o)
	                    }, 1000);
	                }
	            };

	            function submitInquiryMobile(o) {
	                var $phone = $("#InqueryMobile");
	                var flag = /^1\d{10}/.test($phone.val());
	                if ($phone.val() != '' && flag) {
	                    if (timedown_mobile == 5) {
	                        inquiryParamVO.telPhone = $phone.val();
	                        inquiryParamVO.type = 2;
	                        inquiryParamVO.businTitle = encodeURIComponent($("#inquiryTitle").val());
	                        inquiryParamVO.charset = "utf8";
	                        inquiryParamVO.buyerSourceId = "detail_information";
	                        saveInquiryMobile($.trim($phone.val()));

	                        //按钮冻结5s
	                        submit_mobile_time(o);
	                    } else {
	                        alert("您的操作过于频繁，请稍后再试");
	                    }
	                } else {
	                    $phone.val('');
	                    jQuery("#InqueryMobile").closest("div").find(".warning").show();
	                    jQuery("button[rel=btnSubmitMobile]").attr("disabled", "disabled");
	                }
	            }

	            //发布询价  2015.08.07---by dongjian
	            function saveInquiryMobile(phoneNum) {
	                var $sendSuccess = $("#sendSuccess2");
	                if (inquiryParamVO == '' || inquiryParamVO.telPhone == '' ||
	                    isNaN(inquiryParamVO.telPhone) || inquiryParamVO.telPhone.length != 11) {
	                    jQuery("button[rel=btnSubmitMobile]").attr("disabled", "disabled");
	                    return false;
	                } else {
	                    jQuery("button[rel=btnSubmitMobile]").removeAttr("disabled");
	                }
	                var url = "http://my.b2b.hc360.com/my/turbine/action/inquiry.InquiryAction/eventsubmit_doPerform/doperform?callback=?";

	                var $textarea = jQuery("#inquiryTitle");

	                if (false) {
	                    checkTitleError()
	                } else {
	                    jQuery.ajax({
	                        url: "http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",
	                        type: "GET",
	                        data: {
	                            plantitle: encodeURIComponent($textarea.val())
	                        },
	                        dataType: "jsonp",
	                        success: function(response) {

	                            var pageOneData = $.extend(true, {}, inquiryParamVO);
	                            $("#corMessageDialog").css('top', $("#corMessageDialog").offset().top - 100 + 'px');
	                            $sendSuccess.show().siblings(":not(.closeBtn)").hide();

	                            //完善提交
	                            var secProduct = $sendSuccess.find('#secProductInput1'); //采购产品
	                            var secProductNum = $sendSuccess.find('#amountInputnum1'); //采购数量
	                            var secDeadLine = $sendSuccess.find('#buyToDate1'); //采购截止日期
	                            var secDesc = $sendSuccess.find('textarea'); //更多描述
	                            var secDTel = $sendSuccess.find('#telnumber1'); //手机号
	                            var validCodeInput = $sendSuccess.find('#inquriycaptcha1'); //图形验证码
	                            var msgCodeInput = $sendSuccess.find('#valid_Code1'); //短信验证码
	                            var msgCodeBtn = $sendSuccess.find('#phoneGet_Code1'); //获取短信验证码安妮
	                            var msgError = $sendSuccess.find("#validCode_Tip1"); //短信验证码错误提示
	                            var secSubmitBtn = $sendSuccess.find("#inquirysub1"); //完善提交按钮

	                            //初始化数据
	                            secProduct.val("");
	                            secProductNum.val("");
	                            secDeadLine.val("");
	                            secDesc.val("");
	                            validCodeInput.val("");
	                            msgCodeInput.val("");
	                            $sendSuccess.find('em.warning').hide();

	                            //第一步手机号自动填充第二步
	                            secDTel.val(phoneNum);
	                            //图形验证码初始化
	                            $("#validate_img1").attr("src", "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());


	                            /**
	                             * 采购产品校验
	                             */
	                            secProduct.on('keyup', function() {
	                                var v = $.trim(this.value.replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, ""));
	                                this.value = v;
	                            });
	                            secProduct.on('blur', function() {
	                                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                                    $(this).parent().find("em.warning").show();
	                                }
	                            });
	                            secProduct.parent().on('click', function() {
	                                var warntip = $(this).find('em.warning');
	                                if (warntip.is(":visible")) {
	                                    warntip.hide();
	                                }
	                                secProduct.focus();
	                            });

	                            /**
	                             * 采购数量校验
	                             */
	                            secProductNum.on('keyup', function() { //限制输入大于0 的数字
	                                var parnt = /^[1-9]\d*(\.\d+)?$/;
	                                if (!parnt.exec(this.value)) {
	                                    this.value = "";
	                                }
	                            });
	                            secProductNum.on('blur', function() { //不为空校验
	                                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                                    $(this).parent().find("em.warning").show();
	                                }
	                            });
	                            secProductNum.parent().on('click', function() { //重新输入
	                                var warntip = $(this).find('em.warning');
	                                if (warntip.is(":visible")) {
	                                    warntip.hide();
	                                }
	                                secProductNum.focus();
	                            });

	                            //初始化日期插件
	                            HC.W.load('wdatepicker', function() {
	                                $("#buyToDate1").on('focus', function() {
	                                    var tom = new Date();
	                                    tom.setDate(tom.getDate() + 1);
	                                    WdatePicker({
	                                        dateFmt: 'yyyy-MM-dd',
	                                        minDate: tom
	                                    });
	                                });
	                            });

	                            //日期错误信息消失
	                            $("#buyToDate1").parent().on('click', function() {
	                                var $this = $(this);
	                                $this.find('em.warning').hide();
	                            });

	                            /**
	                             * 更多描述不允许输入特殊字符
	                             */
	                            secDesc.on('keyup', function() {
	                                var v = $.trim(this.value.replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, ""));
	                                this.value = v;
	                            });

	                            /**
	                             *手机号校验
	                             */
	                            secDTel.on('keyup', function() {
	                                var v = $.trim(this.value.replace(/\D/g, ""));
	                                this.value = v.length > 11 ? v.substring(0, 11) : v;
	                            });
	                            secDTel.on('blur', function() {
	                                if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
	                                    $(this).parent().find("em.warning").show();
	                                } else {
	                                    if (!/^1\d{10}/i.test($(this).val())) {
	                                        $(this).parent().find("em.warning").show();
	                                    }
	                                }
	                            });
	                            secDTel.parent().on('click', function() {
	                                if ($(this).find("em.warning").show()) {
	                                    $(this).find("em.warning").hide();
	                                }
	                                secDTel.focus();
	                            });

	                            //重新输入验证码
	                            validCodeInput.parent().on('click', function() {
	                                if ($(this).find("em.warning").show()) {
	                                    $(this).find("em.warning").hide();
	                                }
	                                validCodeInput.focus();
	                            });

	                            msgCodeInput.siblings('em.warning').on('click', function() {
	                                /*if($(this).parent().find("em.warning").show()){
	                                    $(this).parent().find("em.warning").hide();
	                                }*/
	                                $(this).hide();
	                                msgCodeInput.focus();
	                            });


	                            //点击短信验证码发送按钮
	                            msgCodeBtn.unbind('click').bind('click', function() {
	                                //先验证图形，成功在触发发送验证码事件
	                                if ($.trim(validCodeInput.val()) == "") {
	                                    //验证码不能为空
	                                    validCodeInput.parent().find("em.warning").show().html("<strong></strong>请输入验证码");
	                                } else {
	                                    //校验图形验证码
	                                    imgValiInput();
	                                }
	                            });
	                            //验证码刷新
	                            $("#refresh_Img1").on("click", function() {
	                                $("#validate_img1").attr("src", "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
	                            });


	                            cleanInquiryParam();

	                            //校验图片验证码输入框的值
	                            function imgValiInput() {
	                                jQuery.ajax({
	                                    type: "GET",
	                                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
	                                    dataType: "jsonp",
	                                    data: {
	                                        picCode: $.trim(validCodeInput.val())
	                                    },
	                                    timeout: 2000,
	                                    async: false,
	                                    success: function(res) {
	                                        if (res.code == 0) {
	                                            //验证成功
	                                            validCodeInput.parent().find("em.warning").hide().html("<strong></strong>请输入验证码");
	                                            //发送验证码
	                                            if ($.trim(secDTel.val()) == "") {
	                                                secDTel.parent().find("em.warning").show();
	                                            } else {
	                                                sendPhoneValiCode($.trim(validCodeInput.val()));
	                                            }
	                                        } else {
	                                            //验证失败
	                                            validCodeInput.parent().find("em.warning").show().html("<strong></strong>验证码错误");
	                                        }

	                                    },
	                                    error: function() {
	                                        alert("网络异常，请重试");
	                                    }
	                                });
	                            }

	                            var timer1 = null;

	                            //按钮发送倒计时
	                            function settime1(val, count) {
	                                if (count == 0) {
	                                    val.removeAttr("disabled");
	                                    val.html("免费获取验证码");
	                                    msgCodeBtn.removeClass("codeBtnGray").addClass("codeBtnNew");
	                                    count = 60;
	                                    clearTimeout(timer1);
	                                    return false;
	                                } else {
	                                    val.html("重新发送(" + count + ")");
	                                    count--;
	                                }
	                                timer1 = setTimeout(function() {
	                                    settime1(val, count);
	                                }, 1000);
	                            }

	                            //点击发送短信验证码
	                            function sendPhoneValiCode(piccode) {
	                                jQuery.ajax({
	                                    type: "GET",
	                                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",
	                                    dataType: "jsonp",
	                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                                    jsonp: "callback",
	                                    data: {
	                                        picCode: piccode,
	                                        phone: $.trim(secDTel.val())
	                                    },
	                                    timeout: 2000,
	                                    async: false,
	                                    success: function(res) {
	                                        if (res.code == 1) { //发送手机验证码成功
	                                            //按钮置灰，60秒后恢复
	                                            $sendSuccess.find("#phoneGet_Code1").removeClass("codeBtnNew").addClass("codeBtnGray").attr("disabled");
	                                            settime1(msgCodeBtn, 60); //发送按钮点击成功后置灰设置倒计时
	                                        } else if (res.code == 2) {
	                                            msgError.show().html("<strong></strong>每天发送次数超过上限");
	                                        } else if (res.code == 3) {
	                                            msgError.find("#validCode_Tip1").show().html("<strong></strong>发送验证码失败");
	                                        } else if (res.code == 4) {
	                                            msgError.find("#validCode_Tip1").show().html("<strong></strong>验证码失败，请重新获取");
	                                        } else { //res==5
	                                            msgError.find("#validCode_Tip1").show().html("<strong></strong>图形验证码不正确");
	                                        }
	                                    },
	                                    error: function() {
	                                        alert("网络异常，请重试");
	                                    }
	                                });
	                            }

	                            //完善提交
	                            secSubmitBtn.unbind('click').on('click', function() {
	                                //采购产品不为空
	                                if ($.trim(secProduct.val()) == "" || $.trim(secProduct.val()).length < 1) {
	                                    secProduct.parent().find('em.warning').show();
	                                }

	                                //采购数量不为空
	                                if ($.trim(secProductNum.val()) == "" || $.trim(secProductNum.val()).length < 1) {
	                                    secProductNum.parent().find('em.warning').show();
	                                }

	                                //采购截止日期不为空
	                                if ($.trim(secDeadLine.val()) == "" || $.trim(secDeadLine.val()).length < 1) {
	                                    secDeadLine.parent().find('em.warning').show();
	                                }

	                                //图形验证码不为空
	                                if ($.trim(validCodeInput.val()) == "" || $.trim(validCodeInput.val()).length < 1) {
	                                    validCodeInput.parent().find('em.warning').html('<strong></strong>请输入验证码').show();
	                                }

	                                //短信验证码不为空
	                                if ($.trim(msgCodeInput.val()) == "" || $.trim(msgCodeInput.val()).length < 1) {
	                                    msgCodeInput.parent().find('em.warning').show();
	                                }
	                                //有警告提示，返回
	                                if ($sendSuccess.find('em.warning').is(':visible')) {
	                                    return false;
	                                }

	                                //校验短信验证码输入框是否正确
	                                jQuery.ajax({
	                                    type: "GET",
	                                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",
	                                    dataType: "jsonp",
	                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                                    data: {
	                                        code: $.trim(msgCodeInput.val()),
	                                        phone: secDTel.val()
	                                    },
	                                    timeout: 2000,
	                                    async: false,
	                                    success: function(res) {
	                                        if (res.code == 1) { //发送手机验证码成功 code   1成功; 2验证失败；3.验证失败验证码不一致；4.验证失败已过期
	                                            msgError.hide().html("<strong></strong>请输入验证码");

	                                            var pageTwoData = $.extend(true, {}, pageOneData, {
	                                                purchaseInfo: encodeURIComponent(secDesc.val()),
	                                                inquiryNum: $.trim(secProductNum.val()),
	                                                deadline: $.trim(secDeadLine.val()),
	                                                product: encodeURIComponent($.trim(secProduct.val()))
	                                            });


	                                            //判断第一页和第二页手机号是否一致，如果不一致，则发送两次请求，如果一致，则发送一次，需求去掉
	                                            // if(pageOneData.telPhone == $.trim(secDTel.val())){
	                                            //     sendPageData1(pageTwoData);//提交第二页数据
	                                            // }else{
	                                            //     sendPageData1(pageOneData);
	                                            pageTwoData.telPhone = $.trim(secDTel.val());
	                                            sendPageData1(pageTwoData);
	                                            // }
	                                        } else if (res.code == 2) {
	                                            msgError.show().html("<strong></strong>验证失败");
	                                        } else if (res.code == 3) {
	                                            msgError.show().html("<strong></strong>验证失败验证码不一致");
	                                        } else if (res.code == 4) {
	                                            msgError.show().html("<strong></strong>验证失败已过期");
	                                        }
	                                    },
	                                    error: function() {
	                                        alert("网络异常，请重试");
	                                    }
	                                });

	                            });

	                            //第二步点击关闭按钮时，只提交第一步数据
	                            $("#corMessageDialog").find('[data-query="clearMask"]:visible').unbind('click').on('click', function() {
	                                if ($(this).siblings("#sendSuccess2").is(":visible")) {
	                                    sendPageData1(pageOneData, true);
	                                }
	                            });

	                            //发送询价单ajax
	                            function sendPageData1(pageData, flag) {
	                                $.ajax({
	                                    type: "GET",
	                                    url: "http://my.b2b.hc360.com/my/turbine/action/inquiry.InquiryAction/eventsubmit_doPerform/doperform?callback=?",
	                                    dataType: "jsonp",
	                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                                    data: pageData,
	                                    jsonp: "callback",
	                                    success: function(res) {
	                                        if (res && res.code == "yes") {
	                                            if (!flag) {
	                                                $("#sendSuccess3").show().siblings(":not(.closeBtn)").hide();
	                                            }
	                                            settime1(msgCodeBtn, 0);
	                                        } else if (res && res.code == "self") {
	                                            alert("您不能给自己发询价单！");
	                                        } else {
	                                            alert("网络异常，请稍后重试！");
	                                        }
	                                    },
	                                    error: function() {
	                                        alert("网络异常，请稍后重试！");
	                                    }
	                                });
	                            }

	                        },
	                        error: function() {
	                            alert("网络异常，请重试");
	                        }
	                    });
	                }

	                function checkTitleError() {
	                    var $div = $textarea.closest("div");
	                    $textarea.val("");
	                    $div.find(".warning").text("内容含有违禁词").show();
	                }

	            };

	            var cleanInquiryParam = function() {
	                inquiryParamVO.purchaseInfo = "";
	                inquiryParamVO.purchasePrice = "";
	                inquiryParamVO.inquiryNum = "";
	                inquiryParamVO.businTitle = "";
	                jQuery("input[rel=txtInquiryNum]").val("1");
	                jQuery("textarea[rel=ttContent]").val("");
	                jQuery("input[rel=txtInquiryPrice]").val("");
	                jQuery("p[rel=tipInquiryNum]").html("");
	                jQuery('[data-query="customPriceInput"]').val("");
	                jQuery('[data-query="CP_value"]').val("");
	            };

	            /**
	             * 电话无人接听   2016.12.22  开发:xyh  产品:杨靖宇
	             */
	            $("#noAnswerBtn").on('click', function() {
	                var infoList = $("#cInfoListBox2");
	                infoList.show().siblings("#dialogCorMessage").hide();

	                //手机号
	                var noanswerPhone = infoList.find(".rigIbox input");
	                noanswerPhone.siblings(".warning").hide();
	                //验证手机号
	                noanswerPhone.keyup(function() {
	                    var v = $.trim(this.value.replace(/\D/g, ""));
	                    this.value = v.length > 11 ? v.substring(0, 11) : v;
	                }).focus(function() {
	                    $(this).siblings(".warning").hide();
	                }).blur(function() {
	                    if ($.trim(this.value) == "") {
	                        $(this).siblings(".warning").html('<em class="warning"><strong></strong>请输入手机号码</em>').show();
	                    }
	                    if (!/^1\d{10}/.test(this.value)) {
	                        $(this).siblings(".warning").html('<em class="warning"><strong></strong>请输入正确的手机号码</em>').show();
	                    }
	                });

	                //取消操作
	                infoList.find(".IngoBtnBox4 button:eq(0)").on('click', function() {
	                    infoList.hide().siblings("#dialogCorMessage").show();
	                });

	                //确认发送操作
	                infoList.find(".IngoBtnBox4 button:eq(1)").on('click', function() {
	                    if ($.trim(noanswerPhone.val()) == "") {
	                        noanswerPhone.siblings(".warning").html('<em class="warning"><strong></strong>请输入手机号码</em>').show();
	                        return false;
	                    }
	                    if (noanswerPhone.siblings(".warning").is(":visible")) return false;
	                    var noAnswerData = {
	                        type: 24,
	                        plantitle: encodeURIComponent($.trim($("#inquiryTitle").val())),
	                        MP: $.trim(noanswerPhone.val()),
	                        companyName: encodeURIComponent(window.infoname) || "",
	                        pid: inquiryParamVO.sellerProviderId,
	                        comeUrl: window.location.href,
	                        buyerSourceId: "u_ff_msg_cj"
	                    };
	                    $.ajax({
	                        url: 'http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform',
	                        data: noAnswerData,
	                        dataType: "jsonp",
	                        jsonpCallback: 'callback',
	                        success: function(data) {
	                            if (data.code == 1) {
	                                //页面显示提交成功后的信息内容
	                                infoList.hide().siblings("#succBoxNew").show();
	                                noanswerPhone.val("");
	                            } else if (data.code == 3) {
	                                //自己给自己留言
	                                alert("不能给自己留言");
	                            } else {
	                                alert("操作频繁，请稍后再试");
	                            }
	                        },
	                        error: function(res) {
	                            alert("网络异常，请稍后再试");
	                        }
	                    });

	                });

	            });

	            $sendMsgBox.css({
	                "top": "-100px"
	            });
	            //查看联系方式 手机验证
	            $phone.on("keyup", function() {
	                var v = $.trim(this.value.replace(/\D/g, ""));
	                this.value = v.length > 11 ? v.substring(0, 11) : v;
	            });
	            $phone.focus(function() {
	                this.value = this.value == "请输入11位手机号码" ? "" : this.value;
	                $(this).closest("div").find(".warning").hide();
	            }).blur(function() {
	                this.value = this.value == "" ? "请输入11位手机号码" : this.value;
	                if (!/^1\d{10}/.test(this.value) && this.value !== "请输入11位手机号码") {
	                    $(this).closest("div").find(".warning").show()
	                }
	            });

	            $cellphoneNumber.on("keyup", function() {
	                var v = $.trim(this.value.replace(/\D/g, ""));
	                this.value = v.length > 11 ? v.substring(0, 11) : v;
	            });
	            $cellphoneNumber.focus(function() {
	                this.value = this.value == "请输入11位手机号码" ? "" : this.value;
	                $(this).closest("div").find("p").hide();
	            }).blur(function() {
	                this.value = this.value == "" ? "请输入11位手机号码" : this.value;
	                if (!/^1\d{10}/.test(this.value) && this.value !== "请输入11位手机号码") {
	                    $(this).val("");
	                    $(this).closest("div").find("p").show()
	                }
	            });
	            //验证码
	            $captcha.on("keyup", function() {
	                this.value = this.value.replace(/\W/g, "");
	            }).on("focus", function() {
	                $validateError.hide();
	            }).on("blur", function() {
	                if ($.trim(this.value).length < 1) {
	                    $validateError.show();
	                }
	            });

	            $validateError.on("click", function() {
	                $(this).hide();
	                $captcha.focus();
	            });
	            $cellPhoneNumError.on("click", function() {
	                $(this).hide();
	                $(this).closest("div").find("input").focus();
	            });

	            //关闭按钮
	            $('#corMessageDialog').on("click", '[data-query="clearMask"]', function(evt) {

	                $(this).parent().children('.title,.word1,.word-box').show();
	                $(this).parent().children('#sendSuccess2,#sendSuccess3').hide();
	                $('#cInfoListBox2,#dialogSendMessage').hide();
	                $('#dialogCorMessage').show();
	                $("#InqueryMobile").val("");

	                $contactBox.hide();
	                $("#mask").remove();
	                evt.preventDefault()
	            });
	            //发送到手机
	            $sendMsgToMobile.on("click", function(evt) {
	                $sendMsgBox.siblings().hide();
	                $sendMsgBox.show();
	                $("#cellphoneNumber").val("");
	                $("#captcha").val("");
	                $("a[id='refresh'][class='change-more']").trigger('click');
	                $sendMsgBox.animate({
	                    top: "0px"
	                }, 400);
	                evt.preventDefault();
	            });
	            //查看联系方式模块 返回按钮
	            $back.on("click", function(evt) {
	                $info.show();
	                $info.siblings().hide();
	                $sendMsgBox.animate({
	                    top: "-100px"
	                }, 400);
	                evt.preventDefault();
	            });

	            $errorTipInquiry.on("click", function() {
	                $(this).hide();
	                $(this).closest("li").find("input").focus();
	            });

	        },

	        /**
	         * 创建遮罩层
	         */
	        createMask: function() {

	            var $ele = $("<div id='mask'></div>");
	            var $eleHeight = $(document).height();
	            $ele.css({
	                "position": "absolute",
	                "top": 0,
	                "height": $eleHeight + "px",
	                "left": 0,
	                "right": 0,
	                "z-index": 110001,
	                "background": "black",
	                "opacity": 0.6,
	                "filter": "alpha(opacity=60)"
	            });
	            $("body").append($ele);
	        },

	        /**
	         * 初始化弹框
	         * @param opt
	         */
	        initDialogBox: function(opt) {
	            var winH = $(window).height(),
	                winW = $(window).width(),
	                hScroll = $(window).scrollTop(),
	                selfH = opt.height(),
	                selfW = opt.width();
	            winH = winH < selfH ? selfH + 100 : winH;
	            opt.css({
	                "position": "absolute",
	                "left": (winW - selfW) / 2 + "px",
	                "top": (winH - selfH) / 2 + hScroll + "px",
	                "z-index": 120001
	            })
	        },

	        /**
	         * 我的浏览记录模块
	         */
	        myBrowseHistory: function() {

	            var picNum = {
	                relatedM: 16,
	                historyM: 8
	            }; //数量限制

	            HC.HUB.addEvent(window, function() {
	                if (window.localStorage) {
	                    initHistory();
	                }
	               /* else {
	                    HC.LDS.loadedCB(function() {
	                        initHistory();
	                    });
	                }*/
	            }, 'load');

	            //我的浏览记录模块
	            function initHistory() {
	                var str = "";
	                if (window.localStorage) {
	                    str = window.localStorage.productHistory;
	                }
	                /*else {
	                    str = HC.LS.get("productHistory");
	                }*/
	                var html = "",
	                    arrList = new Array(); //接收所有商品历史信息的数组
	                if (str && str !== "") {
	                    var arr = str.split("@");
	                    var list = arr[1].split(";&;");
	                    arrList.push(arr[0]);
	                    for (var i = 0; i < list.length; i++) {
	                        arrList.push(list[i]);
	                    }
	                    if (arrList.length > 0 && arrList != "") {
	                        for (var i = 0; i < arrList.length; i++) {
	                            var obj = arrList[i].split("#&#");
	                            if (i < picNum.historyM && obj.length > 1) {
	                                html = html + "<li><dl>" + "<dt class='item-similar-img'><a href='//b2b.hc360.com/supplyself/" + obj[0] + ".html' title='" + obj[1] + "' target='_blank' onclick='return hcclick(\"?hcdetail_enterpriselog=supplyself_viewpics_history\")'><img src='" + obj[2] + "' alt='" + obj[1] + "' onload='resizeImg(this,140,140)' onerror='imgonerror(this);' ></a></dt>" + "<dd class='item-similar-txt'><a href='//b2b.hc360.com/supplyself/" + obj[0] + ".html' title='" + obj[1] + "' target='_blank' onclick='return hcclick(\"?hcdetail_enterpriselog=supplyself_viewpics_history\")'>" + obj[1] + "</a></dd>" + "<dd class='item-similar-price'>" + obj[3] + "</dd>";
	                                /*if (obj[4] === "1") {
	                                    html = html + "<dd class='item-similar-numb'><span></span></dd>";
	                                }*/
	                                html = html + "</dl></li>";
	                            }
	                        }
	                        if (html !== "") {
	                            $("#historyList").html(html);
	                        }
	                        $("#historyMod").css({
	                            display: "block"
	                        });
	                    } else {
	                        $("#historyMod").css({
	                            display: "none"
	                        });
	                    }
	                }
	            }
	        },

	        /**
	         * 相关推荐显示或隐藏
	         */
	        recommendShowOrNot: function() {

	            //显示更多
	            $("#releventRec").on('click', '.reListShow', function() {
	                var $this = $(this);
	                $this.parent().children('ul:gt(1)').show();
	                $this.hide().siblings('.reListHide').show();
	            });
	            //隐藏
	            $("#releventRec").on('click', '.reListHide', function() {
	                var $this = $(this);
	                $this.parent().children('ul:gt(1)').hide();
	                $this.hide().siblings('.reListShow').show();
	            });
	        },

	        /**
	         * 加载优质商品推荐模块
	         */
	        loadSuperiorRecommend: function() {

	            $("#otherList li").mouseover(function() {
	                $(this).addClass("curHide");
	                $(this).siblings("li").removeClass("curHide");
	            });

	            /*var _this = this,
	                picNum = {
	                    relatedM : 16
	                };
	            $.when(_this.recommendAjax()).done(function (dataArr) {
	                if (dataArr && dataArr.success == "1") { //获得数据成功

	                    var recommendData = dataArr.productList;

	                    /!*$("#relatedList").swapPic({ //添加图片切换效果
	                        //默认水平方向展示
	                        preBtn: $("#relatedPre"),
	                        nexBtn: $("#relatedNex"),
	                        disBtnLClass: "dis-pro-scroll-l",
	                        btnLClass: "able-pro-scroll-l",
	                        disBtnRClass: "dis-pro-scroll-r",
	                        btnRClass: "able-pro-scroll-r",
	                        showNum: 4,
	                        animtSpeed: 600
	                    });*!/

	                    recommend(recommendData);
	                }
	            }).fail(function () {

	            });

	            //优质商机推荐模块
	            function recommend(recommendData) {
	                if (recommendData && recommendData.length > 0) {
	                    if (recommendData.length <= picNum.relatedM) {
	                        $('.RightBot').hide();
	                    } else {
	                        var dataArr = recommendData.slice(picNum.relatedM, picNum.relatedM + 5),
	                            htmlStr = '';
	                        for (var i = 0; i < dataArr.length; i++) {
	                            var obj = dataArr[i],
	                                emHtml = '',
	                                title = obj.title.replaceAll("\\+", " ");
	                            if (i < 3) {
	                                emHtml = '<em class="curEm">' + (i + 1) + '</em>';
	                            } else {
	                                emHtml = '<em>' + (i + 1) + '</em>';
	                            }
	                            htmlStr += i == 0 ? '<li class="curHide">' : '<li>';
	                            htmlStr += emHtml + '<div class="hideImg"><a href="' + obj.url + '" onclick="return hcclick(\'?hcdetail_enterpriselog=supplyself_viewpics_youzhi\')" target="_blank"><img src="' + obj.imgUrlBig + '" onerror="imgonerror(this)" /></a></div><span><a href="' + obj.url + '" onclick="return hcclick(\'?hcdetail_enterpriselog=supplyself_viewpics_youzhi\')" target="_blank">' + decodeURIComponent(title) + '</a></span></li>'
	                        }
	                        $('#otherList').html(htmlStr);
	                        $("#otherList li").mouseover(function() {
	                            $(this).addClass("curHide");
	                            $(this).siblings("li").removeClass("curHide");
	                        });
	                    }
	                }

	            }

	            String.prototype.replaceAll = function(s1, s2) { //正则匹配替换
	                return this.replace(new RegExp(s1, "gm"), s2);
	            }*/
	        },

	        /**
	         * 店内相关商品推荐（区分收费和付费，收费：“店内相关商品”，免费：“相关商品推荐”）
	         */
	        loadRecommendInshopOrNot: function() {

	            var _this = this,
	                memTypeValue = 4, //会员和非会员的临界值 0 1 2 3 4 是四种会员
	                otherIdArr = new Array(),
	                relatedIdArr = new Array(),
	                objHeight = {};
	            initCache = {
	                relatedM: "0"
	            };

	            if ($("#relatedMod").length > 0) {
	                objHeight.relatedMod = $("#relatedMod").offset().top;
	            }
	            try {
	                initRelated();
	            } catch (e) {};
	            $(window).scroll(function() {
	                if (iscrollShow(objHeight.relatedMod) && moduleConf.relatedM.isShow === "1") {
	                    initRelated();
	                };
	            });

	            function iscrollShow(obj) {
	                var disT = obj ? obj : 0,
	                    windT = $(window).height() + $(window).scrollTop();
	                if (disT <= windT) {
	                    return true;
	                } else {
	                    return false;
	                }
	            }

	            function initRelated() {

	                var len = $("#relatedList").find("li").length;
	                if (len === 0 && initCache.relatedM === "0") { //是否缓存
	                    initCache.relatedM = "1";
	                    $.when(_this.recommendAjax()).done(function(dataArr) {
	                        if (dataArr && dataArr.success == "1") { //获得数据成功
	                            recommendData = dataArr.productList;
	                            var list = dataArr.productList;
	                            var html = "",
	                                useLog = "hcdetail_enterpriselog=supplyself_viewpics_tuijian";
	                            if (typeof is3y !== 'undefined' && is3y) {
	                                useLog = "hcdetail_enterpriselog=supplyself_viewpics_tuijian_sy";
	                            }
	                            if (list && list.length > 3 || (parseInt(memTypeId) < memTypeValue && list.length > 0)) { //满足大于3个才显示
	                                if (parseInt(memTypeId) < memTypeValue) { //非会员
	                                    $("#relatedTitle").html("相关商品推荐");
	                                    $("#relatedMod .moreProduct").css({
	                                        display: "none"
	                                    });
	                                } else {
	                                    $("#relatedTitle").html("店内相关商品");
	                                }
	                                for (var i = 0; i < list.length; i++) {
	                                    var obj = list[i];
	                                    if ($.inArray(obj, otherIdArr) === -1 && relatedIdArr.length < 12) {
	                                        relatedIdArr.push(obj.bcId);
	                                        var title = obj.title.replaceAll("\\+", " "),
	                                            price = obj.price; //正则匹配空格，因为utf-8传输转换的时候，已经匹配成了一个+
	                                        var pos = price.indexOf(".");
	                                        if (pos === -1) {
	                                            price = obj.price + ".00";
	                                        } else {
	                                            price = obj.price.indexOf(".") + 3 <= obj.price.length ? obj.price : obj.price + "0";
	                                        }
	                                        html = html + "<li id='" + obj.bcId + "'><div class='item-list-img'>" +
	                                            "<table cellspacing='0' cellpadding='0' border='0' width='100%'>" +
	                                            "<tbody><tr><td valign='middle' align='center'>" +
	                                            "<a title='" + decodeURIComponent(title) + "' href='" + obj.url + "' target='_blank' onmousedown='HC.UBA.sendUserlogsElement(\"UserBehavior_pics_llb_1_" + (i + 1) + "?detailbcid=" + obj.bcId + "\")' onclick='return hcclick(\"?" + useLog + "\")' data-exposurelog='###gg_pics_llb_1_" + (i + 1) + "?detailbcid=" + obj.bcId + "'>" +
	                                            "<img style='display: inline;' alt='" + decodeURIComponent(title) + "' src='" + obj.imgUrlBig + "' onerror='imgonerror(this)'>" +
	                                            "</a></td></tr></tbody></table> </div>" +
	                                            "<div class='item-price'>" + ((obj.price && parseFloat(obj.price) !== 0) ? ("<strong>￥</strong>" + price + (obj.unit && obj.unit !== "" ? "/" + decodeURIComponent(obj.unit) : "")) : "面议") + "</div>" + "<div class='item-list-txt'><a href='" + obj.url + "' title='" + decodeURIComponent(title) + "' target='_blank' onclick='return hcclick(\"?" + useLog + "\")'>" + decodeURIComponent(title) + "</a>";
	                                        if (obj.hasOnline === "1") {
	                                            html = html + "<div class='pro-sell-numb'><em>&nbsp;</em></div>";
	                                        }
	                                        html = html + "</div></li>";
	                                    }
	                                }
	                                if (html !== "") {
	                                    $("#relatedList").html(html);
	                                }
	                                $("#relatedMod").css({
	                                    display: "block"
	                                });
	                            } else {
	                                $("#relatedMod").css({
	                                    display: "none"
	                                });
	                            }
	                            /*$("#relatedList").swapPic({ //添加图片切换效果
	                                //默认水平方向展示
	                                preBtn: $("#relatedPre"),
	                                nexBtn: $("#relatedNex"),
	                                disBtnLClass: "dis-pro-scroll-l",
	                                btnLClass: "able-pro-scroll-l",
	                                disBtnRClass: "dis-pro-scroll-r",
	                                btnRClass: "able-pro-scroll-r",
	                                showNum: 4,
	                                animtSpeed: 600
	                            });*/
	                            //recommend();
	                        } else {
	                            $("#relatedMod").css({
	                                display: "none"
	                            });
	                            $(".RightBot").css({
	                                display: "none"
	                            });
	                        }
	                    }).fail(function() {
	                        $("#relatedMod").css({
	                            display: "none"
	                        });
	                        $(".RightBot").css({
	                            display: "none"
	                        });
	                    });

	                }

	            }

	            String.prototype.replaceAll = function(s1, s2) { //正则匹配替换
	                return this.replace(new RegExp(s1, "gm"), s2);
	            }

	        },

	        /**
	         * 优质推荐模块下面的（包括优质推荐）当滚动条滚动时变为固定
	         */
	        moduleFloat: function() {

	            var superModule = $('.ImgRightBox'),
	                adsModule = $('.rigAdBot'),
	                orginalH_1 = (superModule && superModule.length > 0) ? superModule.offset().top : 0,
	                orginalH_2 = (adsModule && adsModule.length > 0) ? adsModule.offset().top : 0,
	                leftOffset = (superModule && superModule.length > 0) ? superModule.offset().left + 'px' : ((adsModule && adsModule.length > 0) ? adsModule.offset().left + 'px' : '0px');

	            $(window).scroll(function() {

	                if ((!superModule || superModule.length == 0) && (!adsModule || adsModule.length == 0)) {
	                    return false;
	                }

	                var scrollHeight = orginalH_1 ? orginalH_1 : orginalH_2;

	                if ($(window).scrollTop() >= scrollHeight) {

	                    if (superModule && superModule.length > 0) {
	                        superModule.css({
	                            'position': 'fixed',
	                            'top': '0px',
	                            'left': leftOffset
	                        });
	                    }

	                    if (adsModule && adsModule.length > 0) {
	                        adsModule.css({
	                            'position': 'fixed',
	                            'top': (superModule && superModule.length > 0) ? superModule.height() + 25 + 'px' : '0px',
	                            'left': leftOffset
	                        })
	                    }

	                } else {

	                    if (superModule && superModule.length > 0) {
	                        superModule.css({
	                            'position': 'static',
	                            'top': orginalH_1 + 'px',
	                            'left': leftOffset
	                        });
	                    }

	                    if (adsModule && adsModule.length > 0) {
	                        adsModule.css({
	                            'position': 'static',
	                            'top': orginalH_2 + 'px',
	                            'left': leftOffset
	                        })
	                    }
	                }
	            });

	        },

	        recommendAjax: function() {

	            return $.ajax({
	                url: '//detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doProdbysupply/doProdbysupply',
	                data: {
	                    bcId: window.supplyBcId,
	                    listType: "relatedList",
	                    username: window.userName,
	                    memTypeId: window.memTypeId,
	                    supCat: encodeURIComponent(window.lastClass)
	                },
	                timeout: 3000,
	                scriptCharset: "utf-8",
	                dataType: "jsonp",
	                jsonp: 'jsoncallback'
	            })
	        },

	        /**
	         * 与微信绑定时添加微信图标
	         */
	        addWeixinIcon: function () {

	            var _this = this,
	                bindClick = window.ismmt ? "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_wxicon_1')":"HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_ wxicon_2')",
	                nobindClick = window.ismmt ? "HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_zxicon_1')":"HC.UBA.sendUserlogsElement('UserBehavior_supplyself_viewPics_ zxicon_2')";

	            $.when(_this.bindStateAjax()).done(function (res) {
	                if(res && res.code=="200"){
	                    $('#contactIcon').append('<a class="rigWX" id="cicon" rel="nofollow" href="javascript:;" onclick="'+ bindClick +'"></a>')
	                }else{
	                    $('#contactIcon').append('<a class="rigZX" id="cicon" rel="nofollow" href="javascript:;" onclick="'+ nobindClick +'"></a>')
	                }
	              /**
	               * 初始化微信弹框
	               */
	              HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

	                $('#cicon').queryDialog({
	                  is3y:window.scyps.sc.is3y=="1" ? true : false,
	                  companyName:window.infoname || '',
	                  providerId:window.scyps.sc.providerId
	                });

	              });
	            }).fail(function () {
	                $('#contactIcon').append('<a class="rigZX" id="cicon" rel="nofollow" href="javascript:;" onclick="'+ nobindClick +'"></a>')
	              /**
	               * 初始化微信弹框
	               */
	              HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

	                $('#cicon').queryDialog({
	                  is3y:window.scyps.sc.is3y=="1" ? true : false,
	                  companyName:window.infoname || '',
	                  providerId:window.scyps.sc.providerId
	                });

	              });
	            });



	        },

	        /**
	         * 是否与微信绑定
	         * @returns {*}
	         */
	        bindStateAjax: function () {

	            return $.ajax({
	                url: '//madata.hc360.com/mobileweb/m/get/bindstatus',
	                data: {"imid":window.company_username||window.welfarename},
	                timeout: 3000,
	                dataType: "jsonp"
	            })
	        },

	        addTopIcon: function () {
	            /*
	            * 操作顶部搜索条
	            *
	            * 买家还在看的文字内容
	            */
	            var S$array = ['大全', '价格', '多少钱', '批发', '厂家直销', '热销', '大量供应', '优质'];
	            var eachBuyerWatching = $('.topMoveSearch-hook'); //买家还在看 list

	            for (var i = 0; i < eachBuyerWatching.length; i++) {
	                var qwioej = eachBuyerWatching.eq(i).html(); //每个a的内html
	                var aaatitle = eachBuyerWatching.eq(i).attr('title'); // 每个a的title属性
	                if (i >= 4) {
	                    eachBuyerWatching.eq(i).html(S$array[i] + qwioej);
	                    eachBuyerWatching.eq(i).attr('title', S$array[i] + aaatitle);
	                    continue;
	                }
	                eachBuyerWatching.eq(i).html(qwioej + S$array[i]);
	                eachBuyerWatching.eq(i).attr('title', aaatitle + S$array[i]);
	            }

	                /** [滚动加载所有异步模块] */
	            $(window).scroll(function (e) {
	                try {
	                    window.timer = setTimeout(function () {

	                        /** [重新定位顶部浮动搜索条位置] */
	                        repositionTopFloatSearchBar();

	                    }, 300);
	                } catch (e) {
	                }
	            }).trigger('scroll');
	            function repositionTopFloatSearchBar() {

	                var wrap = $('#topFollowSearch'),
	                referenceWrap = ($('.proTopBox2') && $('.proTopBox2').length >0) ?  $('.proTopBox2'): $('.proTopBox');

	                /**
	                * 从外网进入到商品终极页，在顶部搜索文本框内显示商品核心词。
	                * 内网进入到商品终极页，在顶部搜索文本框内显示最后一次搜索词。
	                */
	                var txtTopKeyword = $('#w');
	                if (!judgeReferrer('hc360.com')) {
	                    window.productWord && txtTopKeyword.val(window.productWord);
	                } else {
	                    var _keyword = HC.getCookie('hclastsearchkeyword') || window.productWord || '';
	                    _keyword && txtTopKeyword.val(_keyword);
	                }
	                    /** @type {Object} [获取文档jQuery对象] */
	                var doc = $(document);
	                if (doc.scrollTop() >= 100) {
	                    // wrap.slideDown('slow');
	                    wrap.show();

	                } else {
	                    // wrap.slideUp('slow');
	                    wrap.hide();
	                }
	            };
	                function judgeReferrer(host) {

	                /**
	                * [referrer 获取访前地址]
	                */
	                var referrer = document.referrer || '';

	                /**
	                * [来源为空，判断为非来自指定host]
	                */
	                if (!referrer) {
	                    return true;
	                }

	                /**
	                * [判断来源host是否与指定host相匹配]
	                * @type {[type]}
	                */
	                var hostname = $('<a>').attr('href', referrer)[0].hostname;
	                var regexp = new RegExp(host, 'ig');
	                if (regexp.test(hostname)) {
	                    return true;
	                }
	                return false;
	            };

	            function encodeToGb2312(str){
	                var strOut="";
	                for(var i = 0; i < str.length; i++){
	                    var c = str.charAt(i);
	                    var code = str.charCodeAt(i);
	                    if(c==" ") strOut +="+";
	                    else if(code >= 19968 && code <= 40869){
	                        index = code - 19968;
	                        strOut += "%" + z.substr(index*4,2) + "%" + z.substr(index*4+2,2);
	                    }
	                    else{
	                        strOut += "%" + str.charCodeAt(i).toString(16);
	                    }
	                }
	                return strOut;
	            }

	            var z='D2BBB6A18140C6DF814181428143CDF2D5C9C8FDC9CFCFC2D8A2B2BBD3EB8144D8A4B3F38145D7A8C7D2D8A7CAC08146C7F0B1FBD2B5B4D4B6ABCBBFD8A9814781488149B6AA814AC1BDD1CF814BC9A5D8AD814CB8F6D1BEE3DCD6D0814D814EB7E1814FB4AE8150C1D98151D8BC8152CDE8B5A4CEAAD6F78153C0F6BED9D8AF815481558156C4CB8157BEC38158D8B1C3B4D2E58159D6AECEDAD5A7BAF5B7A6C0D6815AC6B9C5D2C7C7815BB9D4815CB3CBD2D2815D815ED8BFBEC5C6F2D2B2CFB0CFE7815F816081618162CAE981638164D8C081658166816781688169816AC2F2C2D2816BC8E9816C816D816E816F817081718172817381748175C7AC8176817781788179817A817B817CC1CB817DD3E8D5F9817ECAC2B6FED8A1D3DABFF78180D4C6BBA5D8C1CEE5BEAE81818182D8A88183D1C7D0A9818481858186D8BDD9EFCDF6BFBA8187BDBBBAA5D2E0B2FABAE0C4B68188CFEDBEA9CDA4C1C18189818A818BC7D7D9F1818CD9F4818D818E818F8190C8CBD8E9819181928193D2DACAB2C8CAD8ECD8EAD8C6BDF6C6CDB3F08194D8EBBDF1BDE98195C8D4B4D381968197C2D88198B2D6D7D0CACBCBFBD5CCB8B6CFC98199819A819BD9DAD8F0C7AA819CD8EE819DB4FAC1EED2D4819E819FD8ED81A0D2C7D8EFC3C781A181A281A3D1F681A4D6D9D8F281A5D8F5BCFEBCDB81A681A781A8C8CE81A9B7DD81AAB7C281ABC6F381AC81AD81AE81AF81B081B181B2D8F8D2C181B381B4CEE9BCBFB7FCB7A5D0DD81B581B681B781B881B9D6DAD3C5BBEFBBE1D8F181BA81BBC9A1CEB0B4AB81BCD8F381BDC9CBD8F6C2D7D8F781BE81BFCEB1D8F981C081C181C2B2AEB9C081C3D9A381C4B0E981C5C1E681C6C9EC81C7CBC581C8CBC6D9A481C981CA81CB81CC81CDB5E881CE81CFB5AB81D081D181D281D381D481D5CEBBB5CDD7A1D7F4D3D381D6CCE581D7BACE81D8D9A2D9DCD3E0D8FDB7F0D7F7D8FED8FAD9A1C4E381D981DAD3B6D8F4D9DD81DBD8FB81DCC5E581DD81DEC0D081DF81E0D1F0B0DB81E181E2BCD1D9A681E3D9A581E481E581E681E7D9ACD9AE81E8D9ABCAB981E981EA81EBD9A9D6B681EC81ED81EEB3DED9A881EFC0FD81F0CACC81F1D9AA81F2D9A781F381F4D9B081F581F6B6B181F781F881F9B9A981FAD2C081FB81FCCFC081FD81FEC2C28240BDC4D5ECB2E0C7C8BFEBD9AD8241D9AF8242CEEABAEE82438244824582468247C7D682488249824A824B824C824D824E824F8250B1E3825182528253B4D9B6EDD9B48254825582568257BFA182588259825AD9DEC7CEC0FED9B8825B825C825D825E825FCBD7B7FD8260D9B58261D9B7B1A3D3E1D9B98262D0C58263D9B682648265D9B18266D9B2C1A9D9B382678268BCF3D0DEB8A98269BEE3826AD9BD826B826C826D826ED9BA826FB0B3827082718272D9C28273827482758276827782788279827A827B827C827D827E8280D9C4B1B68281D9BF82828283B5B98284BEF3828582868287CCC8BAF2D2D08288D9C38289828ABDE8828BB3AB828C828D828ED9C5BEEB828FD9C6D9BBC4DF8290D9BED9C1D9C0829182928293829482958296829782988299829A829BD5AE829CD6B5829DC7E3829E829F82A082A1D9C882A282A382A4BCD9D9CA82A582A682A7D9BC82A8D9CBC6AB82A982AA82AB82AC82ADD9C982AE82AF82B082B1D7F682B2CDA382B382B482B582B682B782B882B982BABDA182BB82BC82BD82BE82BF82C0D9CC82C182C282C382C482C582C682C782C882C9C5BCCDB582CA82CB82CCD9CD82CD82CED9C7B3A5BFFE82CF82D082D182D2B8B582D382D4C0FC82D582D682D782D8B0F882D982DA82DB82DC82DD82DE82DF82E082E182E282E382E482E582E682E782E882E982EA82EB82EC82EDB4F682EED9CE82EFD9CFB4A2D9D082F082F1B4DF82F282F382F482F582F6B0C182F782F882F982FA82FB82FC82FDD9D1C9B582FE8340834183428343834483458346834783488349834A834B834C834D834E834F83508351CFF1835283538354835583568357D9D283588359835AC1C5835B835C835D835E835F836083618362836383648365D9D6C9AE8366836783688369D9D5D9D4D9D7836A836B836C836DCBDB836EBDA9836F8370837183728373C6A7837483758376837783788379837A837B837C837DD9D3D9D8837E83808381D9D9838283838384838583868387C8E583888389838A838B838C838D838E838F839083918392839383948395C0DC8396839783988399839A839B839C839D839E839F83A083A183A283A383A483A583A683A783A883A983AA83AB83AC83AD83AE83AF83B083B183B2B6F9D8A3D4CA83B3D4AAD0D6B3E4D5D783B4CFC8B9E283B5BFCB83B6C3E283B783B883B9B6D283BA83BBCDC3D9EED9F083BC83BD83BEB5B383BFB6B583C083C183C283C383C4BEA483C583C6C8EB83C783C8C8AB83C983CAB0CBB9ABC1F9D9E283CBC0BCB9B283CCB9D8D0CBB1F8C6E4BEDFB5E4D7C883CDD1F8BCE6CADE83CE83CFBCBDD9E6D8E783D083D1C4DA83D283D3B8D4C8BD83D483D5B2E1D4D983D683D783D883D9C3B083DA83DBC3E1DAA2C8DF83DCD0B483DDBEFCC5A983DE83DF83E0B9DA83E1DAA383E2D4A9DAA483E383E483E583E683E7D9FBB6AC83E883E9B7EBB1F9D9FCB3E5BEF683EABFF6D2B1C0E483EB83EC83EDB6B3D9FED9FD83EE83EFBEBB83F083F183F2C6E083F3D7BCDAA183F4C1B983F5B5F2C1E883F683F7BCF583F8B4D583F983FA83FB83FC83FD83FE844084418442C1DD8443C4FD84448445BCB8B7B284468447B7EF84488449844A844B844C844DD9EC844EC6BE844FBFADBBCB84508451B5CA8452DBC9D0D78453CDB9B0BCB3F6BBF7DBCABAAF8454D4E4B5B6B5F3D8D6C8D084558456B7D6C7D0D8D78457BFAF84588459DBBBD8D8845A845BD0CCBBAE845C845D845EEBBEC1D0C1F5D4F2B8D5B4B4845FB3F584608461C9BE846284638464C5D0846584668467C5D9C0FB8468B1F08469D8D9B9CE846AB5BD846B846CD8DA846D846ED6C6CBA2C8AFC9B2B4CCBFCC846FB9F48470D8DBD8DCB6E7BCC1CCEA847184728473847484758476CFF78477D8DDC7B084788479B9D0BDA3847A847BCCDE847CC6CA847D847E848084818482D8E08483D8DE84848485D8DF848684878488B0FE8489BEE7848ACAA3BCF4848B848C848D848EB8B1848F8490B8EE849184928493849484958496849784988499849AD8E2849BBDCB849CD8E4D8E3849D849E849F84A084A1C5FC84A284A384A484A584A684A784A8D8E584A984AAD8E684AB84AC84AD84AE84AF84B084B1C1A684B2C8B0B0ECB9A6BCD3CEF1DBBDC1D384B384B484B584B6B6AFD6FAC5ACBDD9DBBEDBBF84B784B884B9C0F8BEA2C0CD84BA84BB84BC84BD84BE84BF84C084C184C284C3DBC0CAC684C484C584C6B2AA84C784C884C9D3C284CAC3E384CBD1AB84CC84CD84CE84CFDBC284D0C0D584D184D284D3DBC384D4BFB184D584D684D784D884D984DAC4BC84DB84DC84DD84DEC7DA84DF84E084E184E284E384E484E584E684E784E884E9DBC484EA84EB84EC84ED84EE84EF84F084F1D9E8C9D784F284F384F4B9B4CEF0D4C884F584F684F784F8B0FCB4D284F9D0D984FA84FB84FC84FDD9E984FEDECBD9EB8540854185428543D8B0BBAFB1B18544B3D7D8CE85458546D4D185478548BDB3BFEF8549CFBB854A854BD8D0854C854D854EB7CB854F85508551D8D185528553855485558556855785588559855A855BC6A5C7F8D2BD855C855DD8D2C4E4855ECAAE855FC7A78560D8A68561C9FDCEE7BBDCB0EB856285638564BBAAD0AD8565B1B0D7E4D7BF8566B5A5C2F4C4CF85678568B2A98569B2B7856AB1E5DFB2D5BCBFA8C2ACD8D5C2B1856BD8D4CED4856CDAE0856DCEC0856E856FD8B4C3AED3A1CEA38570BCB4C8B4C2D18571BEEDD0B68572DAE18573857485758576C7E485778578B3A78579B6F2CCFCC0FA857A857BC0F7857CD1B9D1E1D8C7857D857E85808581858285838584B2DE85858586C0E58587BAF185888589D8C8858AD4AD858B858CCFE1D8C9858DD8CACFC3858EB3F8BEC7858F859085918592D8CB8593859485958596859785988599DBCC859A859B859C859DC8A5859E859F85A0CFD885A1C8FEB2CE85A285A385A485A585A6D3D6B2E6BCB0D3D1CBABB7B485A785A885A9B7A285AA85ABCAE585ACC8A1CADCB1E4D0F085ADC5D185AE85AF85B0DBC5B5FE85B185B2BFDAB9C5BEE4C1ED85B3DFB6DFB5D6BBBDD0D5D9B0C8B6A3BFC9CCA8DFB3CAB7D3D285B4D8CFD2B6BAC5CBBECCBE85B5DFB7B5F0DFB485B685B785B8D3F585B9B3D4B8F785BADFBA85BBBACFBCAAB5F585BCCDACC3FBBAF3C0F4CDC2CFF2DFB8CFC585BDC2C0DFB9C2F085BE85BF85C0BEFD85C1C1DFCDCCD2F7B7CDDFC185C2DFC485C385C4B7F1B0C9B6D6B7D485C5BAACCCFDBFD4CBB1C6F485C6D6A8DFC585C7CEE2B3B385C885C9CEFCB4B585CACEC7BAF085CBCEE185CCD1BD85CD85CEDFC085CF85D0B4F485D1B3CA85D2B8E6DFBB85D385D485D585D6C4C585D7DFBCDFBDDFBEC5BBDFBFDFC2D4B1DFC385D8C7BACED885D985DA85DB85DC85DDC4D885DEDFCA85DFDFCF85E0D6DC85E185E285E385E485E585E685E785E8DFC9DFDACEB685E9BAC7DFCEDFC8C5DE85EA85EBC9EBBAF4C3FC85EC85EDBED785EEDFC685EFDFCD85F0C5D885F185F285F385F4D5A6BACD85F5BECCD3BDB8C085F6D6E485F7DFC7B9BEBFA785F885F9C1FCDFCBDFCC85FADFD085FB85FC85FD85FE8640DFDBDFE58641DFD7DFD6D7C9DFE3DFE4E5EBD2A7DFD28642BFA98643D4DB8644BFC8DFD4864586468647CFCC86488649DFDD864AD1CA864BDFDEB0A7C6B7DFD3864CBAE5864DB6DFCDDBB9FED4D5864E864FDFDFCFECB0A5DFE7DFD1D1C6DFD5DFD8DFD9DFDC8650BBA98651DFE0DFE18652DFE2DFE6DFE8D3B486538654865586568657B8E7C5B6DFEAC9DAC1A8C4C486588659BFDECFF8865A865B865CD5DCDFEE865D865E865F866086618662B2B88663BADFDFEC8664DBC18665D1E48666866786688669CBF4B4BD866AB0A6866B866C866D866E866FDFF1CCC6DFF286708671DFED867286738674867586768677DFE986788679867A867BDFEB867CDFEFDFF0BBBD867D867EDFF386808681DFF48682BBA38683CADBCEA8E0A7B3AA8684E0A6868586868687E0A186888689868A868BDFFE868CCDD9DFFC868DDFFA868EBFD0D7C4868FC9CC86908691DFF8B0A186928693869486958696DFFD869786988699869ADFFBE0A2869B869C869D869E869FE0A886A086A186A286A3B7C886A486A5C6A1C9B6C0B2DFF586A686A7C5BE86A8D8C4DFF9C4F686A986AA86AB86AC86AD86AEE0A3E0A4E0A5D0A586AF86B0E0B4CCE486B1E0B186B2BFA6E0AFCEB9E0ABC9C686B386B4C0AEE0AEBAEDBAB0E0A986B586B686B7DFF686B8E0B386B986BAE0B886BB86BC86BDB4ADE0B986BE86BFCFB2BAC886C0E0B086C186C286C386C486C586C686C7D0FA86C886C986CA86CB86CC86CD86CE86CF86D0E0AC86D1D4FB86D2DFF786D3C5E786D4E0AD86D5D3F786D6E0B6E0B786D786D886D986DA86DBE0C4D0E186DC86DD86DEE0BC86DF86E0E0C9E0CA86E186E286E3E0BEE0AAC9A4E0C186E4E0B286E586E686E786E886E9CAC8E0C386EAE0B586EBCECB86ECCBC3E0CDE0C6E0C286EDE0CB86EEE0BAE0BFE0C086EF86F0E0C586F186F2E0C7E0C886F3E0CC86F4E0BB86F586F686F786F886F9CBD4E0D586FAE0D6E0D286FB86FC86FD86FE87408741E0D0BCCE87428743E0D18744B8C2D8C587458746874787488749874A874B874CD0EA874D874EC2EF874F8750E0CFE0BD875187528753E0D4E0D387548755E0D78756875787588759E0DCE0D8875A875B875CD6F6B3B0875DD7EC875ECBBB875F8760E0DA8761CEFB876287638764BAD987658766876787688769876A876B876C876D876E876F8770E0E1E0DDD2AD87718772877387748775E0E287768777E0DBE0D9E0DF87788779E0E0877A877B877C877D877EE0DE8780E0E4878187828783C6F7D8ACD4EBE0E6CAC98784878587868787E0E587888789878A878BB8C1878C878D878E878FE0E7E0E887908791879287938794879587968797E0E9E0E387988799879A879B879C879D879EBABFCCE7879F87A087A1E0EA87A287A387A487A587A687A787A887A987AA87AB87AC87AD87AE87AF87B0CFF987B187B287B387B487B587B687B787B887B987BA87BBE0EB87BC87BD87BE87BF87C087C187C2C8C287C387C487C587C6BDC087C787C887C987CA87CB87CC87CD87CE87CF87D087D187D287D3C4D287D487D587D687D787D887D987DA87DB87DCE0EC87DD87DEE0ED87DF87E0C7F4CBC487E1E0EEBBD8D8B6D2F2E0EFCDC587E2B6DA87E387E487E587E687E787E8E0F187E9D4B087EA87EBC0A7B4D187EC87EDCEA7E0F087EE87EF87F0E0F2B9CC87F187F2B9FACDBCE0F387F387F487F5C6D4E0F487F6D4B287F7C8A6E0F6E0F587F887F987FA87FB87FC87FD87FE8840884188428843884488458846884788488849E0F7884A884BCDC1884C884D884ECAA5884F885088518852D4DADBD7DBD98853DBD8B9E7DBDCDBDDB5D888548855DBDA8856885788588859885ADBDBB3A1DBDF885B885CBBF8885DD6B7885EDBE0885F886088618862BEF988638864B7BB8865DBD0CCAEBFB2BBB5D7F8BFD38866886788688869886ABFE9886B886CBCE1CCB3DBDEB0D3CEEBB7D8D7B9C6C2886D886EC0A4886FCCB98870DBE7DBE1C6BADBE38871DBE88872C5F7887388748875DBEA88768877DBE9BFC088788879887ADBE6DBE5887B887C887D887E8880B4B9C0ACC2A2DBE2DBE48881888288838884D0CDDBED88858886888788888889C0DDDBF2888A888B888C888D888E888F8890B6E28891889288938894DBF3DBD2B9B8D4ABDBEC8895BFD1DBF08896DBD18897B5E68898DBEBBFE58899889A889BDBEE889CDBF1889D889E889FDBF988A088A188A288A388A488A588A688A788A8B9A1B0A388A988AA88AB88AC88AD88AE88AFC2F188B088B1B3C7DBEF88B288B3DBF888B4C6D2DBF488B588B6DBF5DBF7DBF688B788B8DBFE88B9D3F2B2BA88BA88BB88BCDBFD88BD88BE88BF88C088C188C288C388C4DCA488C5DBFB88C688C788C888C9DBFA88CA88CB88CCDBFCC5E0BBF988CD88CEDCA388CF88D0DCA588D1CCC388D288D388D4B6D1DDC088D588D688D7DCA188D8DCA288D988DA88DBC7B588DC88DD88DEB6E988DF88E088E1DCA788E288E388E488E5DCA688E6DCA9B1A488E788E8B5CC88E988EA88EB88EC88EDBFB088EE88EF88F088F188F2D1DF88F388F488F588F6B6C288F788F888F988FA88FB88FC88FD88FE894089418942894389448945DCA88946894789488949894A894B894CCBFAEBF3894D894E894FCBDC89508951CBFE895289538954CCC189558956895789588959C8FB895A895B895C895D895E895FDCAA89608961896289638964CCEEDCAB89658966896789688969896A896B896C896D896E896F897089718972897389748975DBD38976DCAFDCAC8977BEB38978CAFB8979897A897BDCAD897C897D897E89808981898289838984C9CAC4B989858986898789888989C7BDDCAE898A898B898CD4F6D0E6898D898E898F89908991899289938994C4ABB6D589958996899789988999899A899B899C899D899E899F89A089A189A289A389A489A589A6DBD489A789A889A989AAB1DA89AB89AC89ADDBD589AE89AF89B089B189B289B389B489B589B689B789B8DBD689B989BA89BBBABE89BC89BD89BE89BF89C089C189C289C389C489C589C689C789C889C9C8C089CA89CB89CC89CD89CE89CFCABFC8C989D0D7B389D1C9F989D289D3BFC789D489D5BAF889D689D7D2BC89D889D989DA89DB89DC89DD89DE89DFE2BA89E0B4A689E189E2B1B889E389E489E589E689E7B8B489E8CFC489E989EA89EB89ECD9E7CFA6CDE289ED89EED9EDB6E089EFD2B989F089F1B9BB89F289F389F489F5E2B9E2B789F6B4F389F7CCECCCABB7F289F8D8B2D1EBBABB89F9CAA789FA89FBCDB789FC89FDD2C4BFE4BCD0B6E189FEDEC58A408A418A428A43DEC6DBBC8A44D1D98A458A46C6E6C4CEB7EE8A47B7DC8A488A49BFFCD7E08A4AC6F58A4B8A4CB1BCDEC8BDB1CCD7DECA8A4DDEC98A4E8A4F8A508A518A52B5EC8A53C9DD8A548A55B0C28A568A578A588A598A5A8A5B8A5C8A5D8A5E8A5F8A608A618A62C5AEC5AB8A63C4CC8A64BCE9CBFD8A658A668A67BAC38A688A698A6AE5F9C8E7E5FACDFD8A6BD7B1B8BEC2E88A6CC8D18A6D8A6EE5FB8A6F8A708A718A72B6CABCCB8A738A74D1FDE6A18A75C3EE8A768A778A788A79E6A48A7A8A7B8A7C8A7DE5FEE6A5CDD78A7E8A80B7C1E5FCE5FDE6A38A818A82C4DDE6A88A838A84E6A78A858A868A878A888A898A8AC3C38A8BC6DE8A8C8A8DE6AA8A8E8A8F8A908A918A928A938A94C4B78A958A968A97E6A2CABC8A988A998A9A8A9BBDE3B9C3E6A6D0D5CEAF8A9C8A9DE6A9E6B08A9ED2A68A9FBDAAE6AD8AA08AA18AA28AA38AA4E6AF8AA5C0D18AA68AA7D2CC8AA88AA98AAABCA78AAB8AAC8AAD8AAE8AAF8AB08AB18AB28AB38AB48AB58AB6E6B18AB7D2F68AB88AB98ABAD7CB8ABBCDFE8ABCCDDEC2A6E6ABE6ACBDBFE6AEE6B38ABD8ABEE6B28ABF8AC08AC18AC2E6B68AC3E6B88AC48AC58AC68AC7C4EF8AC88AC98ACAC4C88ACB8ACCBEEAC9EF8ACD8ACEE6B78ACFB6F08AD08AD18AD2C3E48AD38AD48AD58AD68AD78AD88AD9D3E9E6B48ADAE6B58ADBC8A28ADC8ADD8ADE8ADF8AE0E6BD8AE18AE28AE3E6B98AE48AE58AE68AE78AE8C6C58AE98AEACDF1E6BB8AEB8AEC8AED8AEE8AEF8AF08AF18AF28AF38AF4E6BC8AF58AF68AF78AF8BBE98AF98AFA8AFB8AFC8AFD8AFE8B40E6BE8B418B428B438B44E6BA8B458B46C0B78B478B488B498B4A8B4B8B4C8B4D8B4E8B4FD3A4E6BFC9F4E6C38B508B51E6C48B528B538B548B55D0F68B568B578B588B598B5A8B5B8B5C8B5D8B5E8B5F8B608B618B628B638B648B658B668B67C3BD8B688B698B6A8B6B8B6C8B6D8B6EC3C4E6C28B6F8B708B718B728B738B748B758B768B778B788B798B7A8B7B8B7CE6C18B7D8B7E8B808B818B828B838B84E6C7CFB18B85EBF48B868B87E6CA8B888B898B8A8B8B8B8CE6C58B8D8B8EBCDEC9A98B8F8B908B918B928B938B94BCB58B958B96CFD38B978B988B998B9A8B9BE6C88B9CE6C98B9DE6CE8B9EE6D08B9F8BA08BA1E6D18BA28BA38BA4E6CBB5D58BA5E6CC8BA68BA7E6CF8BA88BA9C4DB8BAAE6C68BAB8BAC8BAD8BAE8BAFE6CD8BB08BB18BB28BB38BB48BB58BB68BB78BB88BB98BBA8BBB8BBC8BBD8BBE8BBF8BC08BC18BC28BC38BC48BC58BC6E6D28BC78BC88BC98BCA8BCB8BCC8BCD8BCE8BCF8BD08BD18BD2E6D4E6D38BD38BD48BD58BD68BD78BD88BD98BDA8BDB8BDC8BDD8BDE8BDF8BE08BE18BE28BE38BE48BE58BE68BE78BE88BE98BEA8BEB8BECE6D58BEDD9F88BEE8BEFE6D68BF08BF18BF28BF38BF48BF58BF68BF7E6D78BF88BF98BFA8BFB8BFC8BFD8BFE8C408C418C428C438C448C458C468C47D7D3E6DD8C48E6DEBFD7D4D08C49D7D6B4E6CBEFE6DAD8C3D7CED0A28C4AC3CF8C4B8C4CE6DFBCBEB9C2E6DBD1A78C4D8C4EBAA2C2CF8C4FD8AB8C508C518C52CAEBE5EE8C53E6DC8C54B7F58C558C568C578C58C8E68C598C5AC4F58C5B8C5CE5B2C4FE8C5DCBFCE5B3D5AC8C5ED3EECAD8B0B28C5FCBCECDEA8C608C61BAEA8C628C638C64E5B58C65E5B48C66D7DAB9D9D6E6B6A8CDF0D2CBB1A6CAB58C67B3E8C9F3BFCDD0FBCAD2E5B6BBC28C688C698C6ACFDCB9AC8C6B8C6C8C6D8C6ED4D78C6F8C70BAA6D1E7CFFCBCD28C71E5B7C8DD8C728C738C74BFEDB1F6CBDE8C758C76BCC58C77BCC4D2FAC3DCBFDC8C788C798C7A8C7BB8BB8C7C8C7D8C7EC3C28C80BAAED4A28C818C828C838C848C858C868C878C888C89C7DEC4AFB2EC8C8AB9D18C8B8C8CE5BBC1C88C8D8C8ED5AF8C8F8C908C918C928C93E5BC8C94E5BE8C958C968C978C988C998C9A8C9BB4E7B6D4CBC2D1B0B5BC8C9C8C9DCAD98C9EB7E28C9F8CA0C9E48CA1BDAB8CA28CA3CEBED7F08CA48CA58CA68CA7D0A18CA8C9D98CA98CAAB6FBE6D8BCE28CABB3BE8CACC9D08CADE6D9B3A28CAE8CAF8CB08CB1DECC8CB2D3C8DECD8CB3D2A28CB48CB58CB68CB7DECE8CB88CB98CBA8CBBBECD8CBC8CBDDECF8CBE8CBF8CC0CAACD2FCB3DFE5EAC4E1BEA1CEB2C4F2BED6C6A8B2E38CC18CC2BED38CC38CC4C7FCCCEBBDECCEDD8CC58CC6CABAC6C1E5ECD0BC8CC78CC88CC9D5B98CCA8CCB8CCCE5ED8CCD8CCE8CCF8CD0CAF48CD1CDC0C2C58CD2E5EF8CD3C2C4E5F08CD48CD58CD68CD78CD88CD98CDAE5F8CDCD8CDBC9BD8CDC8CDD8CDE8CDF8CE08CE18CE2D2D9E1A88CE38CE48CE58CE6D3EC8CE7CBEAC6F18CE88CE98CEA8CEB8CECE1AC8CED8CEE8CEFE1A7E1A98CF08CF1E1AAE1AF8CF28CF3B2ED8CF4E1ABB8DAE1ADE1AEE1B0B5BAE1B18CF58CF68CF78CF88CF9E1B3E1B88CFA8CFB8CFC8CFD8CFED1D28D40E1B6E1B5C1EB8D418D428D43E1B78D44D4C08D45E1B28D46E1BAB0B68D478D488D498D4AE1B48D4BBFF98D4CE1B98D4D8D4EE1BB8D4F8D508D518D528D538D54E1BE8D558D568D578D588D598D5AE1BC8D5B8D5C8D5D8D5E8D5F8D60D6C58D618D628D638D648D658D668D67CFBF8D688D69E1BDE1BFC2CD8D6AB6EB8D6BD3F88D6C8D6DC7CD8D6E8D6FB7E58D708D718D728D738D748D758D768D778D788D79BEFE8D7A8D7B8D7C8D7D8D7E8D80E1C0E1C18D818D82E1C7B3E78D838D848D858D868D878D88C6E98D898D8A8D8B8D8C8D8DB4DE8D8ED1C28D8F8D908D918D92E1C88D938D94E1C68D958D968D978D988D99E1C58D9AE1C3E1C28D9BB1C08D9C8D9D8D9ED5B8E1C48D9F8DA08DA18DA28DA3E1CB8DA48DA58DA68DA78DA88DA98DAA8DABE1CCE1CA8DAC8DAD8DAE8DAF8DB08DB18DB28DB3EFFA8DB48DB5E1D3E1D2C7B68DB68DB78DB88DB98DBA8DBB8DBC8DBD8DBE8DBF8DC0E1C98DC18DC2E1CE8DC3E1D08DC48DC58DC68DC78DC88DC98DCA8DCB8DCC8DCD8DCEE1D48DCFE1D1E1CD8DD08DD1E1CF8DD28DD38DD48DD5E1D58DD68DD78DD88DD98DDA8DDB8DDC8DDD8DDE8DDF8DE08DE18DE2E1D68DE38DE48DE58DE68DE78DE88DE98DEA8DEB8DEC8DED8DEE8DEF8DF08DF18DF28DF38DF48DF58DF68DF78DF8E1D78DF98DFA8DFBE1D88DFC8DFD8DFE8E408E418E428E438E448E458E468E478E488E498E4A8E4B8E4C8E4D8E4E8E4F8E508E518E528E538E548E55E1DA8E568E578E588E598E5A8E5B8E5C8E5D8E5E8E5F8E608E618E62E1DB8E638E648E658E668E678E688E69CEA18E6A8E6B8E6C8E6D8E6E8E6F8E708E718E728E738E748E758E76E7DD8E77B4A8D6DD8E788E79D1B2B3B28E7A8E7BB9A4D7F3C7C9BEDEB9AE8E7CCED78E7D8E7EB2EEDBCF8E80BCBAD2D1CBC8B0CD8E818E82CFEF8E838E848E858E868E87D9E3BDED8E888E89B1D2CAD0B2BC8E8ACBA7B7AB8E8BCAA68E8C8E8D8E8ECFA38E8F8E90E0F8D5CAE0FB8E918E92E0FAC5C1CCFB8E93C1B1E0F9D6E3B2AFD6C4B5DB8E948E958E968E978E988E998E9A8E9BB4F8D6A18E9C8E9D8E9E8E9F8EA0CFAFB0EF8EA18EA2E0FC8EA38EA48EA58EA68EA7E1A1B3A38EA88EA9E0FDE0FEC3B18EAA8EAB8EAC8EADC3DD8EAEE1A2B7F98EAF8EB08EB18EB28EB38EB4BBCF8EB58EB68EB78EB88EB98EBA8EBBE1A3C4BB8EBC8EBD8EBE8EBF8EC0E1A48EC18EC2E1A58EC38EC4E1A6B4B18EC58EC68EC78EC88EC98ECA8ECB8ECC8ECD8ECE8ECF8ED08ED18ED28ED3B8C9C6BDC4EA8ED4B2A28ED5D0D28ED6E7DBBBC3D3D7D3C48ED7B9E3E2CF8ED88ED98EDAD7AF8EDBC7ECB1D38EDC8EDDB4B2E2D18EDE8EDF8EE0D0F2C2AEE2D08EE1BFE2D3A6B5D7E2D2B5EA8EE2C3EDB8FD8EE3B8AE8EE4C5D3B7CFE2D48EE58EE68EE78EE8E2D3B6C8D7F98EE98EEA8EEB8EEC8EEDCDA58EEE8EEF8EF08EF18EF2E2D88EF3E2D6CAFCBFB5D3B9E2D58EF48EF58EF68EF7E2D78EF88EF98EFA8EFB8EFC8EFD8EFE8F408F418F42C1AEC0C88F438F448F458F468F478F48E2DBE2DAC0AA8F498F4AC1CE8F4B8F4C8F4D8F4EE2DC8F4F8F508F518F528F538F548F558F568F578F588F598F5AE2DD8F5BE2DE8F5C8F5D8F5E8F5F8F608F618F628F638F64DBC88F65D1D3CDA28F668F67BDA88F688F698F6ADEC3D8A5BFAADBCDD2ECC6FAC5AA8F6B8F6C8F6DDEC48F6EB1D7DFAE8F6F8F708F71CABD8F72DFB18F73B9AD8F74D2FD8F75B8A5BAEB8F768F77B3DA8F788F798F7AB5DCD5C58F7B8F7C8F7D8F7EC3D6CFD2BBA18F80E5F3E5F28F818F82E5F48F83CDE48F84C8F58F858F868F878F888F898F8A8F8BB5AFC7BF8F8CE5F68F8D8F8E8F8FECB08F908F918F928F938F948F958F968F978F988F998F9A8F9B8F9C8F9D8F9EE5E68F9FB9E9B5B18FA0C2BCE5E8E5E7E5E98FA18FA28FA38FA4D2CD8FA58FA68FA7E1EAD0CE8FA8CDAE8FA9D1E58FAA8FABB2CAB1EB8FACB1F2C5ED8FAD8FAED5C3D3B08FAFE1DC8FB08FB18FB2E1DD8FB3D2DB8FB4B3B9B1CB8FB58FB68FB7CDF9D5F7E1DE8FB8BEB6B4FD8FB9E1DFBADCE1E0BBB2C2C9E1E18FBA8FBB8FBCD0EC8FBDCDBD8FBE8FBFE1E28FC0B5C3C5C7E1E38FC18FC2E1E48FC38FC48FC58FC6D3F98FC78FC88FC98FCA8FCB8FCCE1E58FCDD1AD8FCE8FCFE1E6CEA28FD08FD18FD28FD38FD48FD5E1E78FD6B5C28FD78FD88FD98FDAE1E8BBD58FDB8FDC8FDD8FDE8FDFD0C4E2E0B1D8D2E48FE08FE1E2E18FE28FE3BCC9C8CC8FE4E2E3ECFEECFDDFAF8FE58FE68FE7E2E2D6BECDFCC3A68FE88FE98FEAE3C38FEB8FECD6D2E2E78FED8FEEE2E88FEF8FF0D3C78FF18FF2E2ECBFEC8FF3E2EDE2E58FF48FF5B3C08FF68FF78FF8C4EE8FF98FFAE2EE8FFB8FFCD0C38FFDBAF6E2E9B7DEBBB3CCACCBCBE2E4E2E6E2EAE2EB8FFE90409041E2F790429043E2F4D4F5E2F390449045C5AD9046D5FAC5C2B2C090479048E2EF9049E2F2C1AFCBBC904A904BB5A1E2F9904C904D904EBCB1E2F1D0D4D4B9E2F5B9D6E2F6904F90509051C7D390529053905490559056E2F0905790589059905A905BD7DCEDA1905C905DE2F8905EEDA5E2FECAD1905F906090619062906390649065C1B59066BBD090679068BFD69069BAE3906A906BCBA1906C906D906EEDA6EDA3906F9070EDA29071907290739074BBD6EDA7D0F490759076EDA4BADEB6F7E3A1B6B2CCF1B9A79077CFA2C7A190789079BFD2907A907BB6F1907CE2FAE2FBE2FDE2FCC4D5E3A2907DD3C1907E90809081E3A7C7C49082908390849085CFA490869087E3A9BAB790889089908A908BE3A8908CBBDA908DE3A3908E908F9090E3A4E3AA9091E3A69092CEF2D3C690939094BBBC90959096D4C39097C4FA90989099EDA8D0FCE3A5909AC3F5909BE3ADB1AF909CE3B2909D909E909FBCC290A090A1E3ACB5BF90A290A390A490A590A690A790A890A9C7E9E3B090AA90AB90ACBEAACDEF90AD90AE90AF90B090B1BBF390B290B390B4CCE890B590B6E3AF90B7E3B190B8CFA7E3AE90B9CEA9BBDD90BA90BB90BC90BD90BEB5EBBEE5B2D2B3CD90BFB1B9E3ABB2D1B5ACB9DFB6E890C090C1CFEBE3B790C2BBCC90C390C4C8C7D0CA90C590C690C790C890C9E3B8B3EE90CA90CB90CC90CDEDA990CED3FAD3E490CF90D090D1EDAAE3B9D2E290D290D390D490D590D6E3B590D790D890D990DAD3DE90DB90DC90DD90DEB8D0E3B390DF90E0E3B6B7DF90E1E3B4C0A290E290E390E4E3BA90E590E690E790E890E990EA90EB90EC90ED90EE90EF90F090F190F290F390F490F590F690F7D4B890F890F990FA90FB90FC90FD90FE9140B4C89141E3BB9142BBC59143C9F791449145C9E5914691479148C4BD9149914A914B914C914D914E914FEDAB9150915191529153C2FD9154915591569157BBDBBFAE91589159915A915B915C915D915ECEBF915F916091619162E3BC9163BFB6916491659166916791689169916A916B916C916D916E916F9170917191729173917491759176B1EF91779178D4F79179917A917B917C917DE3BE917E9180918191829183918491859186EDAD918791889189918A918B918C918D918E918FE3BFBAA9EDAC91909191E3BD91929193919491959196919791989199919A919BE3C0919C919D919E919F91A091A1BAB691A291A391A4B6AE91A591A691A791A891A9D0B891AAB0C3EDAE91AB91AC91AD91AE91AFEDAFC0C191B0E3C191B191B291B391B491B591B691B791B891B991BA91BB91BC91BD91BE91BF91C091C1C5B391C291C391C491C591C691C791C891C991CA91CB91CC91CD91CE91CFE3C291D091D191D291D391D491D591D691D791D8DCB291D991DA91DB91DC91DD91DEEDB091DFB8EA91E0CEECEAA7D0E7CAF9C8D6CFB7B3C9CED2BDE491E191E2E3DEBBF2EAA8D5BD91E3C6DDEAA991E491E591E6EAAA91E7EAACEAAB91E8EAAEEAAD91E991EA91EB91ECBDD891EDEAAF91EEC2BE91EF91F091F191F2B4C1B4F791F391F4BBA791F591F691F791F891F9ECE6ECE5B7BFCBF9B1E291FAECE791FB91FC91FDC9C8ECE8ECE991FECAD6DED0B2C5D4FA92409241C6CBB0C7B4F2C8D3924292439244CDD092459246BFB8924792489249924A924B924C924DBFDB924E924FC7A4D6B49250C0A9DED1C9A8D1EFC5A4B0E7B3B6C8C592519252B0E292539254B7F692559256C5FA92579258B6F39259D5D2B3D0BCBC925A925B925CB3AD925D925E925F9260BEF1B0D1926192629263926492659266D2D6CAE3D7A59267CDB6B6B6BFB9D5DB9268B8A7C5D79269926A926BDED2BFD9C2D5C7C0926CBBA4B1A8926D926EC5EA926F9270C5FBCCA79271927292739274B1A7927592769277B5D692789279927AC4A8927BDED3D1BAB3E9927CC3F2927D927EB7F79280D6F4B5A3B2F0C4B4C4E9C0ADDED49281B0E8C5C4C1E09282B9D59283BEDCCDD8B0CE9284CDCFDED6BED0D7BEDED5D5D0B0DD92859286C4E292879288C2A3BCF09289D3B5C0B9C5A1B2A6D4F1928A928BC0A8CAC3DED7D5FC928CB9B0928DC8ADCBA9928EDED9BFBD928F929092919292C6B4D7A7CAB0C4C39293B3D6B9D29294929592969297D6B8EAFCB0B492989299929A929BBFE6929C929DCCF4929E929F92A092A1CDDA92A292A392A4D6BFC2CE92A5CECECCA2D0AEC4D3B5B2DED8D5F5BCB7BBD392A692A7B0A492A8C5B2B4EC92A992AA92ABD5F192AC92ADEAFD92AE92AF92B092B192B292B3DEDACDA692B492B5CDEC92B692B792B892B9CEE6DEDC92BACDB1C0A692BB92BCD7BD92BDDEDBB0C6BAB4C9D3C4F3BEE892BE92BF92C092C1B2B692C292C392C492C592C692C792C892C9C0CCCBF092CABCF1BBBBB5B792CB92CC92CDC5F592CEDEE692CF92D092D1DEE3BEDD92D292D3DEDF92D492D592D692D7B4B7BDDD92D892D9DEE0C4ED92DA92DB92DC92DDCFC692DEB5E092DF92E092E192E2B6DECADAB5F4DEE592E3D5C692E4DEE1CCCDC6FE92E5C5C592E692E792E8D2B492E9BEF292EA92EB92EC92ED92EE92EF92F0C2D392F1CCBDB3B892F2BDD392F3BFD8CDC6D1DAB4EB92F4DEE4DEDDDEE792F5EAFE92F692F7C2B0DEE292F892F9D6C0B5A792FAB2F492FBDEE892FCDEF292FD92FE934093419342DEED9343DEF193449345C8E0934693479348D7E1DEEFC3E8CCE19349B2E5934A934B934CD2BE934D934E934F9350935193529353DEEE9354DEEBCED59355B4A79356935793589359935ABFABBEBE935B935CBDD2935D935E935F9360DEE99361D4AE9362DEDE9363DEEA9364936593669367C0BF9368DEECB2F3B8E9C2A79369936ABDC1936B936C936D936E936FDEF5DEF893709371B2ABB4A493729373B4EAC9A6937493759376937793789379DEF6CBD1937AB8E3937BDEF7DEFA937C937D937E9380DEF9938193829383CCC29384B0E1B4EE93859386938793889389938AE5BA938B938C938D938E938FD0AF93909391B2EB9392EBA19393DEF493949395C9E3DEF3B0DAD2A1B1F79396CCAF939793989399939A939B939C939DDEF0939ECBA4939F93A093A1D5AA93A293A393A493A593A6DEFB93A793A893A993AA93AB93AC93AD93AEB4DD93AFC4A693B093B193B2DEFD93B393B493B593B693B793B893B993BA93BB93BCC3FEC4A1DFA193BD93BE93BF93C093C193C293C3C1CC93C4DEFCBEEF93C5C6B293C693C793C893C993CA93CB93CC93CD93CEB3C5C8F693CF93D0CBBADEFE93D193D2DFA493D393D493D593D6D7B293D793D893D993DA93DBB3B793DC93DD93DE93DFC1C393E093E1C7CBB2A5B4E993E2D7AB93E393E493E593E6C4EC93E7DFA2DFA393E8DFA593E9BAB393EA93EB93ECDFA693EDC0DE93EE93EFC9C393F093F193F293F393F493F593F6B2D9C7E693F7DFA793F8C7DC93F993FA93FB93FCDFA8EBA293FD93FE944094419442CBD3944394449445DFAA9446DFA99447B2C194489449944A944B944C944D944E944F9450945194529453945494559456945794589459945A945B945C945D945E945F9460C5CA94619462946394649465946694679468DFAB9469946A946B946C946D946E946F9470D4DC94719472947394749475C8C19476947794789479947A947B947C947D947E948094819482DFAC94839484948594869487BEF094889489DFADD6A7948A948B948C948DEAB7EBB6CAD5948ED8FCB8C4948FB9A594909491B7C5D5FE94929493949494959496B9CA94979498D0A7F4CD9499949AB5D0949B949CC3F4949DBEC8949E949F94A0EBB7B0BD94A194A2BDCC94A3C1B294A4B1D6B3A894A594A694A7B8D2C9A294A894A9B6D894AA94AB94AC94ADEBB8BEB494AE94AF94B0CAFD94B1C7C394B2D5FB94B394B4B7F394B594B694B794B894B994BA94BB94BC94BD94BE94BF94C094C194C294C3CEC494C494C594C6D5ABB1F394C794C894C9ECB3B0DF94CAECB594CB94CC94CDB6B794CEC1CF94CFF5FAD0B194D094D1D5E594D2CED394D394D4BDEFB3E294D5B8AB94D6D5B694D7EDBD94D8B6CF94D9CBB9D0C294DA94DB94DC94DD94DE94DF94E094E1B7BD94E294E3ECB6CAA994E494E594E6C5D494E7ECB9ECB8C2C3ECB794E894E994EA94EBD0FDECBA94ECECBBD7E594ED94EEECBC94EF94F094F1ECBDC6EC94F294F394F494F594F694F794F894F9CEDE94FABCC894FB94FCC8D5B5A9BEC9D6BCD4E794FD94FED1AED0F1EAB8EAB9EABABAB59540954195429543CAB1BFF595449545CDFA9546954795489549954AEAC0954BB0BAEABE954C954DC0A5954E954F9550EABB9551B2FD9552C3F7BBE8955395549555D2D7CEF4EABF955695579558EABC9559955A955BEAC3955CD0C7D3B3955D955E955F9560B4BA9561C3C1D7F29562956395649565D5D19566CAC79567EAC595689569EAC4EAC7EAC6956A956B956C956D956ED6E7956FCFD495709571EACB9572BBCE9573957495759576957795789579BDFAC9CE957A957BEACC957C957DC9B9CFFEEACAD4CEEACDEACF957E9580CDED9581958295839584EAC99585EACE95869587CEEE9588BBDE9589B3BF958A958B958C958D958EC6D5BEB0CEFA958F95909591C7E79592BEA7EAD095939594D6C7959595969597C1C095989599959AD4DD959BEAD1959C959DCFBE959E959F95A095A1EAD295A295A395A495A5CAEE95A695A795A895A9C5AFB0B595AA95AB95AC95AD95AEEAD495AF95B095B195B295B395B495B595B695B7EAD3F4DF95B895B995BA95BB95BCC4BA95BD95BE95BF95C095C1B1A995C295C395C495C5E5DF95C695C795C895C9EAD595CA95CB95CC95CD95CE95CF95D095D195D295D395D495D595D695D795D895D995DA95DB95DC95DD95DE95DF95E095E195E295E3CAEF95E4EAD6EAD7C6D895E595E695E795E895E995EA95EB95ECEAD895ED95EEEAD995EF95F095F195F295F395F4D4BB95F5C7FAD2B7B8FC95F695F7EAC295F8B2DC95F995FAC2FC95FBD4F8CCE6D7EE95FC95FD95FE9640964196429643D4C2D3D0EBC3C5F39644B7FE96459646EBD4964796489649CBB7EBDE964AC0CA964B964C964DCDFB964EB3AF964FC6DA965096519652965396549655EBFC9656C4BE9657CEB4C4A9B1BED4FD9658CAF59659D6EC965A965BC6D3B6E4965C965D965E965FBBFA96609661D0E096629663C9B19664D4D3C8A896659666B8CB9667E8BEC9BC96689669E8BB966AC0EED0D3B2C4B4E5966BE8BC966C966DD5C8966E966F967096719672B6C59673E8BDCAF8B8DCCCF5967496759676C0B496779678D1EEE8BFE8C29679967ABABC967BB1ADBDDC967CEABDE8C3967DE8C6967EE8CB9680968196829683E8CC9684CBC9B0E59685BCAB96869687B9B996889689E8C1968ACDF7968BE8CA968C968D968E968FCEF69690969196929693D5ED9694C1D6E8C49695C3B69696B9FBD6A6E8C8969796989699CAE0D4E6969AE8C0969BE8C5E8C7969CC7B9B7E3969DE8C9969EBFDDE8D2969F96A0E8D796A1E8D5BCDCBCCFE8DB96A296A396A496A596A696A796A896A9E8DE96AAE8DAB1FA96AB96AC96AD96AE96AF96B096B196B296B396B4B0D8C4B3B8CCC6E2C8BEC8E196B596B696B7E8CFE8D4E8D696B8B9F1E8D8D7F596B9C4FB96BAE8DC96BB96BCB2E996BD96BE96BFE8D196C096C1BCED96C296C3BFC2E8CDD6F996C4C1F8B2F196C596C696C796C896C996CA96CB96CCE8DF96CDCAC1E8D996CE96CF96D096D1D5A496D2B1EAD5BBE8CEE8D0B6B0E8D396D3E8DDC0B896D4CAF796D5CBA896D696D7C6DCC0F596D896D996DA96DB96DCE8E996DD96DE96DFD0A396E096E196E296E396E496E596E6E8F2D6EA96E796E896E996EA96EB96EC96EDE8E0E8E196EE96EF96F0D1F9BACBB8F996F196F2B8F1D4D4E8EF96F3E8EEE8ECB9F0CCD2E8E6CEA6BFF296F4B0B8E8F1E8F096F5D7C096F6E8E496F7CDA9C9A396F8BBB8BDDBE8EA96F996FA96FB96FC96FD96FE9740974197429743E8E2E8E3E8E5B5B5E8E7C7C5E8EBE8EDBDB0D7AE9744E8F897459746974797489749974A974B974CE8F5974DCDB0E8F6974E974F9750975197529753975497559756C1BA9757E8E89758C3B7B0F09759975A975B975C975D975E975F9760E8F4976197629763E8F7976497659766B9A3976797689769976A976B976C976D976E976F9770C9D2977197729773C3CECEE0C0E69774977597769777CBF39778CCDDD0B59779977ACAE1977BE8F3977C977D977E9780978197829783978497859786BCEC9787E8F997889789978A978B978C978DC3DE978EC6E5978FB9F79790979197929793B0F497949795D7D897969797BCAC9798C5EF9799979A979B979C979DCCC4979E979FE9A697A097A197A297A397A497A597A697A797A897A9C9AD97AAE9A2C0E297AB97AC97ADBFC397AE97AF97B0E8FEB9D797B1E8FB97B297B397B497B5E9A497B697B797B8D2CE97B997BA97BB97BC97BDE9A397BED6B2D7B597BFE9A797C0BDB797C197C297C397C497C597C697C797C897C997CA97CB97CCE8FCE8FD97CD97CE97CFE9A197D097D197D297D397D497D597D697D7CDD697D897D9D2AC97DA97DB97DCE9B297DD97DE97DF97E0E9A997E197E297E3B4AA97E4B4BB97E597E6E9AB97E797E897E997EA97EB97EC97ED97EE97EF97F097F197F297F397F497F597F697F7D0A897F897F9E9A597FA97FBB3FE97FC97FDE9ACC0E397FEE9AA98409841E9B998429843E9B89844984598469847E9AE98489849E8FA984A984BE9A8984C984D984E984F9850BFACE9B1E9BA98519852C2A5985398549855E9AF9856B8C59857E9AD9858D3DCE9B4E9B5E9B79859985A985BE9C7985C985D985E985F98609861C0C6E9C598629863E9B098649865E9BBB0F19866986798689869986A986B986C986D986E986FE9BCD5A598709871E9BE9872E9BF987398749875E9C198769877C1F198789879C8B6987A987B987CE9BD987D987E988098819882E9C29883988498859886988798889889988AE9C3988BE9B3988CE9B6988DBBB1988E988F9890E9C0989198929893989498959896BCF7989798989899E9C4E9C6989A989B989C989D989E989F98A098A198A298A398A498A5E9CA98A698A798A898A9E9CE98AA98AB98AC98AD98AE98AF98B098B198B298B3B2DB98B4E9C898B598B698B798B898B998BA98BB98BC98BD98BEB7AE98BF98C098C198C298C398C498C598C698C798C898C998CAE9CBE9CC98CB98CC98CD98CE98CF98D0D5C198D1C4A398D298D398D498D598D698D7E9D898D8BAE198D998DA98DB98DCE9C998DDD3A398DE98DF98E0E9D498E198E298E398E498E598E698E7E9D7E9D098E898E998EA98EB98ECE9CF98ED98EEC7C198EF98F098F198F298F398F498F598F6E9D298F798F898F998FA98FB98FC98FDE9D9B3C898FEE9D399409941994299439944CFF0994599469947E9CD99489949994A994B994C994D994E994F995099519952B3F79953995499559956995799589959E9D6995A995BE9DA995C995D995ECCB4995F99609961CFAD99629963996499659966996799689969996AE9D5996BE9DCE9DB996C996D996E996F9970E9DE99719972997399749975997699779978E9D19979997A997B997C997D997E99809981E9DD9982E9DFC3CA9983998499859986998799889989998A998B998C998D998E998F9990999199929993999499959996999799989999999A999B999C999D999E999F99A099A199A299A399A499A599A699A799A899A999AA99AB99AC99AD99AE99AF99B099B199B299B399B499B599B699B799B899B999BA99BB99BC99BD99BE99BF99C099C199C299C399C499C599C699C799C899C999CA99CB99CC99CD99CE99CF99D099D199D299D399D499D599D699D799D899D999DA99DB99DC99DD99DE99DF99E099E199E299E399E499E599E699E799E899E999EA99EB99EC99ED99EE99EF99F099F199F299F399F499F5C7B7B4CEBBB6D0C0ECA399F699F7C5B799F899F999FA99FB99FC99FD99FE9A409A419A42D3FB9A439A449A459A46ECA49A47ECA5C6DB9A489A499A4ABFEE9A4B9A4C9A4D9A4EECA69A4F9A50ECA7D0AA9A51C7B89A529A53B8E89A549A559A569A579A589A599A5A9A5B9A5C9A5D9A5E9A5FECA89A609A619A629A639A649A659A669A67D6B9D5FDB4CBB2BDCEE4C6E79A689A69CDE19A6A9A6B9A6C9A6D9A6E9A6F9A709A719A729A739A749A759A769A77B4F59A78CBC0BCDF9A799A7A9A7B9A7CE9E2E9E3D1EAE9E59A7DB4F9E9E49A7ED1B3CAE2B2D09A80E9E89A819A829A839A84E9E6E9E79A859A86D6B39A879A889A89E9E9E9EA9A8A9A8B9A8C9A8D9A8EE9EB9A8F9A909A919A929A939A949A959A96E9EC9A979A989A999A9A9A9B9A9C9A9D9A9EECAFC5B9B6CE9A9FD2F39AA09AA19AA29AA39AA49AA59AA6B5EE9AA7BBD9ECB19AA89AA9D2E39AAA9AAB9AAC9AAD9AAECEE39AAFC4B89AB0C3BF9AB19AB2B6BED8B9B1C8B1CFB1D1C5FE9AB3B1D09AB4C3AB9AB59AB69AB79AB89AB9D5B19ABA9ABB9ABC9ABD9ABE9ABF9AC09AC1EBA4BAC19AC29AC39AC4CCBA9AC59AC69AC7EBA59AC8EBA79AC99ACA9ACBEBA89ACC9ACD9ACEEBA69ACF9AD09AD19AD29AD39AD49AD5EBA9EBABEBAA9AD69AD79AD89AD99ADAEBAC9ADBCACFD8B5C3F19ADCC3A5C6F8EBADC4CA9ADDEBAEEBAFEBB0B7D59ADE9ADF9AE0B7FA9AE1EBB1C7E29AE2EBB39AE3BAA4D1F5B0B1EBB2EBB49AE49AE59AE6B5AAC2C8C7E89AE7EBB59AE8CBAEE3DF9AE99AEAD3C09AEB9AEC9AED9AEED9DB9AEF9AF0CDA1D6ADC7F39AF19AF29AF3D9E0BBE39AF4BABAE3E29AF59AF69AF79AF89AF9CFAB9AFA9AFB9AFCE3E0C9C79AFDBAB99AFE9B409B41D1B4E3E1C8EAB9AFBDADB3D8CEDB9B429B43CCC09B449B459B46E3E8E3E9CDF49B479B489B499B4A9B4BCCAD9B4CBCB39B4DE3EA9B4EE3EB9B4F9B50D0DA9B519B529B53C6FBB7DA9B549B55C7DFD2CACED69B56E3E4E3EC9B57C9F2B3C19B589B59E3E79B5A9B5BC6E3E3E59B5C9B5DEDB3E3E69B5E9B5F9B609B61C9B39B62C5E69B639B649B65B9B59B66C3BB9B67E3E3C5BDC1A4C2D9B2D79B68E3EDBBA6C4AD9B69E3F0BEDA9B6A9B6BE3FBE3F5BAD39B6C9B6D9B6E9B6FB7D0D3CD9B70D6CED5D3B9C1D5B4D1D89B719B729B739B74D0B9C7F69B759B769B77C8AAB2B49B78C3DA9B799B7A9B7BE3EE9B7C9B7DE3FCE3EFB7A8E3F7E3F49B7E9B809B81B7BA9B829B83C5A29B84E3F6C5DDB2A8C6FC9B85C4E09B869B87D7A29B88C0E1E3F99B899B8AE3FAE3FDCCA9E3F39B8BD3BE9B8CB1C3EDB4E3F1E3F29B8DE3F8D0BAC6C3D4F3E3FE9B8E9B8FBDE09B909B91E4A79B929B93E4A69B949B959B96D1F3E4A39B97E4A99B989B999B9AC8F79B9B9B9C9B9D9B9ECFB49B9FE4A8E4AEC2E59BA09BA1B6B49BA29BA39BA49BA59BA69BA7BDF29BA8E4A29BA99BAABAE9E4AA9BAB9BACE4AC9BAD9BAEB6FDD6DEE4B29BAFE4AD9BB09BB19BB2E4A19BB3BBEECDDDC7A2C5C99BB49BB5C1F79BB6E4A49BB7C7B3BDACBDBDE4A59BB8D7C7B2E29BB9E4ABBCC3E4AF9BBABBEBE4B0C5A8E4B19BBB9BBC9BBD9BBED5E3BFA39BBFE4BA9BC0E4B79BC1E4BB9BC29BC3E4BD9BC49BC5C6D69BC69BC7BAC6C0CB9BC89BC99BCAB8A1E4B49BCB9BCC9BCD9BCED4A19BCF9BD0BAA3BDFE9BD19BD29BD3E4BC9BD49BD59BD69BD79BD8CDBF9BD99BDAC4F99BDB9BDCCFFBC9E69BDD9BDED3BF9BDFCFD19BE09BE1E4B39BE2E4B8E4B9CCE99BE39BE49BE59BE69BE7CCCE9BE8C0D4E4B5C1B0E4B6CED09BE9BBC1B5D39BEAC8F3BDA7D5C7C9ACB8A2E4CA9BEB9BECE4CCD1C49BED9BEED2BA9BEF9BF0BAAD9BF19BF2BAD49BF39BF49BF59BF69BF79BF8E4C3B5ED9BF99BFA9BFBD7CDE4C0CFFDE4BF9BFC9BFD9BFEC1DCCCCA9C409C419C429C43CAE79C449C459C469C47C4D79C48CCD4E4C89C499C4A9C4BE4C7E4C19C4CE4C4B5AD9C4D9C4ED3D99C4FE4C69C509C519C529C53D2F9B4E39C54BBB49C559C56C9EE9C57B4BE9C589C599C5ABBEC9C5BD1CD9C5CCCEDEDB59C5D9C5E9C5F9C609C619C629C639C64C7E59C659C669C679C68D4A89C69E4CBD7D5E4C29C6ABDA5E4C59C6B9C6CD3E69C6DE4C9C9F89C6E9C6FE4BE9C709C71D3E59C729C73C7FEB6C99C74D4FCB2B3E4D79C759C769C77CEC29C78E4CD9C79CEBC9C7AB8DB9C7B9C7CE4D69C7DBFCA9C7E9C809C81D3CE9C82C3EC9C839C849C859C869C879C889C899C8AC5C8E4D89C8B9C8C9C8D9C8E9C8F9C909C919C92CDC4E4CF9C939C949C959C96E4D4E4D59C97BAFE9C98CFE69C999C9AD5BF9C9B9C9C9C9DE4D29C9E9C9F9CA09CA19CA29CA39CA49CA59CA69CA79CA8E4D09CA99CAAE4CE9CAB9CAC9CAD9CAE9CAF9CB09CB19CB29CB39CB49CB59CB69CB79CB89CB9CDE5CAAA9CBA9CBB9CBCC0A39CBDBDA6E4D39CBE9CBFB8C89CC09CC19CC29CC39CC4E4E7D4B49CC59CC69CC79CC89CC99CCA9CCBE4DB9CCC9CCD9CCEC1EF9CCF9CD0E4E99CD19CD2D2E79CD39CD4E4DF9CD5E4E09CD69CD7CFAA9CD89CD99CDA9CDBCBDD9CDCE4DAE4D19CDDE4E59CDEC8DCE4E39CDF9CE0C4E7E4E29CE1E4E19CE29CE39CE4B3FCE4E89CE59CE69CE79CE8B5E19CE99CEA9CEBD7CC9CEC9CED9CEEE4E69CEFBBAC9CF0D7D2CCCFEBF89CF1E4E49CF29CF3B9F69CF49CF59CF6D6CDE4D9E4DCC2FAE4DE9CF7C2CBC0C4C2D09CF8B1F5CCB29CF99CFA9CFB9CFC9CFD9CFE9D409D419D429D43B5CE9D449D459D469D47E4EF9D489D499D4A9D4B9D4C9D4D9D4E9D4FC6AF9D509D519D52C6E19D539D54E4F59D559D569D579D589D59C2A99D5A9D5B9D5CC0ECD1DDE4EE9D5D9D5E9D5F9D609D619D629D639D649D659D66C4AE9D679D689D69E4ED9D6A9D6B9D6C9D6DE4F6E4F4C2FE9D6EE4DD9D6FE4F09D70CAFE9D71D5C49D729D73E4F19D749D759D769D779D789D799D7AD1FA9D7B9D7C9D7D9D7E9D809D819D82E4EBE4EC9D839D849D85E4F29D86CEAB9D879D889D899D8A9D8B9D8C9D8D9D8E9D8F9D90C5CB9D919D929D93C7B19D94C2BA9D959D969D97E4EA9D989D999D9AC1CA9D9B9D9C9D9D9D9E9D9F9DA0CCB6B3B19DA19DA29DA3E4FB9DA4E4F39DA59DA69DA7E4FA9DA8E4FD9DA9E4FC9DAA9DAB9DAC9DAD9DAE9DAF9DB0B3CE9DB19DB29DB3B3BAE4F79DB49DB5E4F9E4F8C5EC9DB69DB79DB89DB99DBA9DBB9DBC9DBD9DBE9DBF9DC09DC19DC2C0BD9DC39DC49DC59DC6D4E89DC79DC89DC99DCA9DCBE5A29DCC9DCD9DCE9DCF9DD09DD19DD29DD39DD49DD59DD6B0C49DD79DD8E5A49DD99DDAE5A39DDB9DDC9DDD9DDE9DDF9DE0BCA49DE1E5A59DE29DE39DE49DE59DE69DE7E5A19DE89DE99DEA9DEB9DEC9DED9DEEE4FEB1F49DEF9DF09DF19DF29DF39DF49DF59DF69DF79DF89DF9E5A89DFAE5A9E5A69DFB9DFC9DFD9DFE9E409E419E429E439E449E459E469E47E5A7E5AA9E489E499E4A9E4B9E4C9E4D9E4E9E4F9E509E519E529E539E549E559E569E579E589E599E5A9E5B9E5C9E5D9E5E9E5F9E609E619E629E639E649E659E669E679E68C6D99E699E6A9E6B9E6C9E6D9E6E9E6F9E70E5ABE5AD9E719E729E739E749E759E769E77E5AC9E789E799E7A9E7B9E7C9E7D9E7E9E809E819E829E839E849E859E869E879E889E89E5AF9E8A9E8B9E8CE5AE9E8D9E8E9E8F9E909E919E929E939E949E959E969E979E989E999E9A9E9B9E9C9E9D9E9EB9E09E9F9EA0E5B09EA19EA29EA39EA49EA59EA69EA79EA89EA99EAA9EAB9EAC9EAD9EAEE5B19EAF9EB09EB19EB29EB39EB49EB59EB69EB79EB89EB99EBABBF0ECE1C3F09EBBB5C6BBD29EBC9EBD9EBE9EBFC1E9D4EE9EC0BEC49EC19EC29EC3D7C69EC4D4D6B2D3ECBE9EC59EC69EC79EC8EAC19EC99ECA9ECBC2AFB4B69ECC9ECD9ECED1D79ECF9ED09ED1B3B49ED2C8B2BFBBECC09ED39ED4D6CB9ED59ED6ECBFECC19ED79ED89ED99EDA9EDB9EDC9EDD9EDE9EDF9EE09EE19EE29EE3ECC5BEE6CCBFC5DABEBC9EE4ECC69EE5B1FE9EE69EE79EE8ECC4D5A8B5E39EE9ECC2C1B6B3E39EEA9EEBECC3CBB8C0C3CCFE9EEC9EED9EEE9EEFC1D29EF0ECC89EF19EF29EF39EF49EF59EF69EF79EF89EF99EFA9EFB9EFC9EFDBAE6C0D39EFED6F29F409F419F42D1CC9F439F449F459F46BFBE9F47B7B3C9D5ECC7BBE29F48CCCCBDFDC8C89F49CFA99F4A9F4B9F4C9F4D9F4E9F4F9F50CDE99F51C5EB9F529F539F54B7E99F559F569F579F589F599F5A9F5B9F5C9F5D9F5E9F5FD1C9BAB89F609F619F629F639F64ECC99F659F66ECCA9F67BBC0ECCB9F68ECE2B1BAB7D99F699F6A9F6B9F6C9F6D9F6E9F6F9F709F719F729F73BDB99F749F759F769F779F789F799F7A9F7BECCCD1E6ECCD9F7C9F7D9F7E9F80C8BB9F819F829F839F849F859F869F879F889F899F8A9F8B9F8C9F8D9F8EECD19F8F9F909F919F92ECD39F93BBCD9F94BCE59F959F969F979F989F999F9A9F9B9F9C9F9D9F9E9F9F9FA09FA1ECCF9FA2C9B79FA39FA49FA59FA69FA7C3BA9FA8ECE3D5D5ECD09FA99FAA9FAB9FAC9FADD6F39FAE9FAF9FB0ECD2ECCE9FB19FB29FB39FB4ECD49FB5ECD59FB69FB7C9BF9FB89FB99FBA9FBB9FBC9FBDCFA89FBE9FBF9FC09FC19FC2D0DC9FC39FC49FC59FC6D1AC9FC79FC89FC99FCAC8DB9FCB9FCC9FCDECD6CEF59FCE9FCF9FD09FD19FD2CAECECDA9FD39FD49FD59FD69FD79FD89FD9ECD99FDA9FDB9FDCB0BE9FDD9FDE9FDF9FE09FE19FE2ECD79FE3ECD89FE49FE59FE6ECE49FE79FE89FE99FEA9FEB9FEC9FED9FEE9FEFC8BC9FF09FF19FF29FF39FF49FF59FF69FF79FF89FF9C1C79FFA9FFB9FFC9FFD9FFEECDCD1E0A040A041A042A043A044A045A046A047A048A049ECDBA04AA04BA04CA04DD4EFA04EECDDA04FA050A051A052A053A054DBC6A055A056A057A058A059A05AA05BA05CA05DA05EECDEA05FA060A061A062A063A064A065A066A067A068A069A06AB1ACA06BA06CA06DA06EA06FA070A071A072A073A074A075A076A077A078A079A07AA07BA07CA07DA07EA080A081ECDFA082A083A084A085A086A087A088A089A08AA08BECE0A08CD7A6A08DC5C0A08EA08FA090EBBCB0AEA091A092A093BEF4B8B8D2AFB0D6B5F9A094D8B3A095CBACA096E3DDA097A098A099A09AA09BA09CA09DC6ACB0E6A09EA09FA0A0C5C6EBB9A0A1A0A2A0A3A0A4EBBAA0A5A0A6A0A7EBBBA0A8A0A9D1C0A0AAC5A3A0ABEAF2A0ACC4B2A0ADC4B5C0CEA0AEA0AFA0B0EAF3C4C1A0B1CEEFA0B2A0B3A0B4A0B5EAF0EAF4A0B6A0B7C9FCA0B8A0B9C7A3A0BAA0BBA0BCCCD8CEFEA0BDA0BEA0BFEAF5EAF6CFACC0E7A0C0A0C1EAF7A0C2A0C3A0C4A0C5A0C6B6BFEAF8A0C7EAF9A0C8EAFAA0C9A0CAEAFBA0CBA0CCA0CDA0CEA0CFA0D0A0D1A0D2A0D3A0D4A0D5A0D6EAF1A0D7A0D8A0D9A0DAA0DBA0DCA0DDA0DEA0DFA0E0A0E1A0E2C8AEE1EBA0E3B7B8E1ECA0E4A0E5A0E6E1EDA0E7D7B4E1EEE1EFD3CCA0E8A0E9A0EAA0EBA0ECA0EDA0EEE1F1BFF1E1F0B5D2A0EFA0F0A0F1B1B7A0F2A0F3A0F4A0F5E1F3E1F2A0F6BAFCA0F7E1F4A0F8A0F9A0FAA0FBB9B7A0FCBED1A0FDA0FEAA40AA41C4FCAA42BADDBDC6AA43AA44AA45AA46AA47AA48E1F5E1F7AA49AA4AB6C0CFC1CAA8E1F6D5F8D3FCE1F8E1FCE1F9AA4BAA4CE1FAC0EAAA4DE1FEE2A1C0C7AA4EAA4FAA50AA51E1FBAA52E1FDAA53AA54AA55AA56AA57AA58E2A5AA59AA5AAA5BC1D4AA5CAA5DAA5EAA5FE2A3AA60E2A8B2FEE2A2AA61AA62AA63C3CDB2C2E2A7E2A6AA64AA65E2A4E2A9AA66AA67E2ABAA68AA69AA6AD0C9D6EDC3A8E2ACAA6BCFD7AA6CAA6DE2AEAA6EAA6FBAEFAA70AA71E9E0E2ADE2AAAA72AA73AA74AA75BBABD4B3AA76AA77AA78AA79AA7AAA7BAA7CAA7DAA7EAA80AA81AA82AA83E2B0AA84AA85E2AFAA86E9E1AA87AA88AA89AA8AE2B1AA8BAA8CAA8DAA8EAA8FAA90AA91AA92E2B2AA93AA94AA95AA96AA97AA98AA99AA9AAA9BAA9CAA9DE2B3CCA1AA9EE2B4AA9FAAA0AB40AB41AB42AB43AB44AB45AB46AB47AB48AB49AB4AAB4BE2B5AB4CAB4DAB4EAB4FAB50D0FEAB51AB52C2CAAB53D3F1AB54CDF5AB55AB56E7E0AB57AB58E7E1AB59AB5AAB5BAB5CBEC1AB5DAB5EAB5FAB60C2EAAB61AB62AB63E7E4AB64AB65E7E3AB66AB67AB68AB69AB6AAB6BCDE6AB6CC3B5AB6DAB6EE7E2BBB7CFD6AB6FC1E1E7E9AB70AB71AB72E7E8AB73AB74E7F4B2A3AB75AB76AB77AB78E7EAAB79E7E6AB7AAB7BAB7CAB7DAB7EE7ECE7EBC9BAAB80AB81D5E4AB82E7E5B7A9E7E7AB83AB84AB85AB86AB87AB88AB89E7EEAB8AAB8BAB8CAB8DE7F3AB8ED6E9AB8FAB90AB91AB92E7EDAB93E7F2AB94E7F1AB95AB96AB97B0E0AB98AB99AB9AAB9BE7F5AB9CAB9DAB9EAB9FABA0AC40AC41AC42AC43AC44AC45AC46AC47AC48AC49AC4AC7F2AC4BC0C5C0EDAC4CAC4DC1F0E7F0AC4EAC4FAC50AC51E7F6CBF6AC52AC53AC54AC55AC56AC57AC58AC59AC5AE8A2E8A1AC5BAC5CAC5DAC5EAC5FAC60D7C1AC61AC62E7FAE7F9AC63E7FBAC64E7F7AC65E7FEAC66E7FDAC67E7FCAC68AC69C1D5C7D9C5FDC5C3AC6AAC6BAC6CAC6DAC6EC7EDAC6FAC70AC71AC72E8A3AC73AC74AC75AC76AC77AC78AC79AC7AAC7BAC7CAC7DAC7EAC80AC81AC82AC83AC84AC85AC86E8A6AC87E8A5AC88E8A7BAF7E7F8E8A4AC89C8F0C9AAAC8AAC8BAC8CAC8DAC8EAC8FAC90AC91AC92AC93AC94AC95AC96E8A9AC97AC98B9E5AC99AC9AAC9BAC9CAC9DD1FEE8A8AC9EAC9FACA0AD40AD41AD42E8AAAD43E8ADE8AEAD44C1A7AD45AD46AD47E8AFAD48AD49AD4AE8B0AD4BAD4CE8ACAD4DE8B4AD4EAD4FAD50AD51AD52AD53AD54AD55AD56AD57AD58E8ABAD59E8B1AD5AAD5BAD5CAD5DAD5EAD5FAD60AD61E8B5E8B2E8B3AD62AD63AD64AD65AD66AD67AD68AD69AD6AAD6BAD6CAD6DAD6EAD6FAD70AD71E8B7AD72AD73AD74AD75AD76AD77AD78AD79AD7AAD7BAD7CAD7DAD7EAD80AD81AD82AD83AD84AD85AD86AD87AD88AD89E8B6AD8AAD8BAD8CAD8DAD8EAD8FAD90AD91AD92B9CFAD93F0ACAD94F0ADAD95C6B0B0EAC8BFAD96CDDFAD97AD98AD99AD9AAD9BAD9CAD9DCECDEAB1AD9EAD9FADA0AE40EAB2AE41C6BFB4C9AE42AE43AE44AE45AE46AE47AE48EAB3AE49AE4AAE4BAE4CD5E7AE4DAE4EAE4FAE50AE51AE52AE53AE54DDF9AE55EAB4AE56EAB5AE57EAB6AE58AE59AE5AAE5BB8CADFB0C9F5AE5CCCF0AE5DAE5EC9FAAE5FAE60AE61AE62AE63C9FBAE64AE65D3C3CBA6AE66B8A6F0AEB1C2AE67E5B8CCEFD3C9BCD7C9EAAE68B5E7AE69C4D0B5E9AE6AEEAEBBADAE6BAE6CE7DEAE6DEEAFAE6EAE6FAE70AE71B3A9AE72AE73EEB2AE74AE75EEB1BDE7AE76EEB0CEB7AE77AE78AE79AE7AC5CFAE7BAE7CAE7DAE7EC1F4DBCEEEB3D0F3AE80AE81AE82AE83AE84AE85AE86AE87C2D4C6E8AE88AE89AE8AB7ACAE8BAE8CAE8DAE8EAE8FAE90AE91EEB4AE92B3EBAE93AE94AE95BBFBEEB5AE96AE97AE98AE99AE9AE7DCAE9BAE9CAE9DEEB6AE9EAE9FBDAEAEA0AF40AF41AF42F1E2AF43AF44AF45CAE8AF46D2C9F0DAAF47F0DBAF48F0DCC1C6AF49B8EDBECEAF4AAF4BF0DEAF4CC5B1F0DDD1F1AF4DF0E0B0CCBDEAAF4EAF4FAF50AF51AF52D2DFF0DFAF53B4AFB7E8F0E6F0E5C6A3F0E1F0E2B4C3AF54AF55F0E3D5EEAF56AF57CCDBBED2BCB2AF58AF59AF5AF0E8F0E7F0E4B2A1AF5BD6A2D3B8BEB7C8ACAF5CAF5DF0EAAF5EAF5FAF60AF61D1F7AF62D6CCBADBF0E9AF63B6BBAF64AF65CDB4AF66AF67C6A6AF68AF69AF6AC1A1F0EBF0EEAF6BF0EDF0F0F0ECAF6CBBBEF0EFAF6DAF6EAF6FAF70CCB5F0F2AF71AF72B3D5AF73AF74AF75AF76B1D4AF77AF78F0F3AF79AF7AF0F4F0F6B4E1AF7BF0F1AF7CF0F7AF7DAF7EAF80AF81F0FAAF82F0F8AF83AF84AF85F0F5AF86AF87AF88AF89F0FDAF8AF0F9F0FCF0FEAF8BF1A1AF8CAF8DAF8ECEC1F1A4AF8FF1A3AF90C1F6F0FBCADDAF91AF92B4F1B1F1CCB1AF93F1A6AF94AF95F1A7AF96AF97F1ACD5CEF1A9AF98AF99C8B3AF9AAF9BAF9CF1A2AF9DF1ABF1A8F1A5AF9EAF9FF1AAAFA0B040B041B042B043B044B045B046B0A9F1ADB047B048B049B04AB04BB04CF1AFB04DF1B1B04EB04FB050B051B052F1B0B053F1AEB054B055B056B057D1A2B058B059B05AB05BB05CB05DB05EF1B2B05FB060B061F1B3B062B063B064B065B066B067B068B069B9EFB06AB06BB5C7B06CB0D7B0D9B06DB06EB06FD4EDB070B5C4B071BDD4BBCAF0A7B072B073B8DEB074B075F0A8B076B077B0A8B078F0A9B079B07ACDEEB07BB07CF0AAB07DB07EB080B081B082B083B084B085B086B087F0ABB088B089B08AB08BB08CB08DB08EB08FB090C6A4B091B092D6E5F1E4B093F1E5B094B095B096B097B098B099B09AB09BB09CB09DC3F3B09EB09FD3DBB0A0B140D6D1C5E8B141D3AFB142D2E6B143B144EEC1B0BBD5B5D1CEBCE0BAD0B145BFF8B146B8C7B5C1C5CCB147B148CAA2B149B14AB14BC3CBB14CB14DB14EB14FB150EEC2B151B152B153B154B155B156B157B158C4BFB6A2B159EDECC3A4B15AD6B1B15BB15CB15DCFE0EDEFB15EB15FC5CEB160B6DCB161B162CAA1B163B164EDEDB165B166EDF0EDF1C3BCB167BFB4B168EDEEB169B16AB16BB16CB16DB16EB16FB170B171B172B173EDF4EDF2B174B175B176B177D5E6C3DFB178EDF3B179B17AB17BEDF6B17CD5A3D1A3B17DB17EB180EDF5B181C3D0B182B183B184B185B186EDF7BFF4BEECEDF8B187CCF7B188D1DBB189B18AB18BD7C5D5F6B18CEDFCB18DB18EB18FEDFBB190B191B192B193B194B195B196B197EDF9EDFAB198B199B19AB19BB19CB19DB19EB19FEDFDBEA6B1A0B240B241B242B243CBAFEEA1B6BDB244EEA2C4C0B245EDFEB246B247BDDEB2C7B248B249B24AB24BB24CB24DB24EB24FB250B251B252B253B6C3B254B255B256EEA5D8BAEEA3EEA6B257B258B259C3E9B3F2B25AB25BB25CB25DB25EB25FEEA7EEA4CFB9B260B261EEA8C2F7B262B263B264B265B266B267B268B269B26AB26BB26CB26DEEA9EEAAB26EDEABB26FB270C6B3B271C7C6B272D6F5B5C9B273CBB2B274B275B276EEABB277B278CDABB279EEACB27AB27BB27CB27DB27ED5B0B280EEADB281F6C4B282B283B284B285B286B287B288B289B28AB28BB28CB28DB28EDBC7B28FB290B291B292B293B294B295B296B297B4A3B298B299B29AC3ACF1E6B29BB29CB29DB29EB29FCAB8D2D3B2A0D6AAB340EFF2B341BED8B342BDC3EFF3B6CCB0ABB343B344B345B346CAAFB347B348EDB6B349EDB7B34AB34BB34CB34DCEF9B7AFBFF3EDB8C2EBC9B0B34EB34FB350B351B352B353EDB9B354B355C6F6BFB3B356B357B358EDBCC5F8B359D1D0B35AD7A9EDBAEDBBB35BD1E2B35CEDBFEDC0B35DEDC4B35EB35FB360EDC8B361EDC6EDCED5E8B362EDC9B363B364EDC7EDBEB365B366C5E9B367B368B369C6C6B36AB36BC9E9D4D2EDC1EDC2EDC3EDC5B36CC0F9B36DB4A1B36EB36FB370B371B9E8B372EDD0B373B374B375B376EDD1B377EDCAB378EDCFB379CEF8B37AB37BCBB6EDCCEDCDB37CB37DB37EB380B381CFF5B382B383B384B385B386B387B388B389B38AB38BB38CB38DEDD2C1F2D3B2EDCBC8B7B38EB38FB390B391B392B393B394B395BCEFB396B397B398B399C5F0B39AB39BB39CB39DB39EB39FB3A0B440B441B442EDD6B443B5EFB444B445C2B5B0ADCBE9B446B447B1AEB448EDD4B449B44AB44BCDEBB5E2B44CEDD5EDD3EDD7B44DB44EB5FAB44FEDD8B450EDD9B451EDDCB452B1CCB453B454B455B456B457B458B459B45AC5F6BCEEEDDACCBCB2EAB45BB45CB45DB45EEDDBB45FB460B461B462C4EBB463B464B4C5B465B466B467B0F5B468B469B46AEDDFC0DAB4E8B46BB46CB46DB46EC5CDB46FB470B471EDDDBFC4B472B473B474EDDEB475B476B477B478B479B47AB47BB47CB47DB47EB480B481B482B483C4A5B484B485B486EDE0B487B488B489B48AB48BEDE1B48CEDE3B48DB48EC1D7B48FB490BBC7B491B492B493B494B495B496BDB8B497B498B499EDE2B49AB49BB49CB49DB49EB49FB4A0B540B541B542B543B544B545EDE4B546B547B548B549B54AB54BB54CB54DB54EB54FEDE6B550B551B552B553B554EDE5B555B556B557B558B559B55AB55BB55CB55DB55EB55FB560B561B562B563EDE7B564B565B566B567B568CABEECEAC0F1B569C9E7B56AECEBC6EEB56BB56CB56DB56EECECB56FC6EDECEDB570B571B572B573B574B575B576B577B578ECF0B579B57AD7E6ECF3B57BB57CECF1ECEEECEFD7A3C9F1CBEEECF4B57DECF2B57EB580CFE9B581ECF6C6B1B582B583B584B585BCC0B586ECF5B587B588B589B58AB58BB58CB58DB5BBBBF6B58EECF7B58FB590B591B592B593D9F7BDFBB594B595C2BBECF8B596B597B598B599ECF9B59AB59BB59CB59DB8A3B59EB59FB5A0B640B641B642B643B644B645B646ECFAB647B648B649B64AB64BB64CB64DB64EB64FB650B651B652ECFBB653B654B655B656B657B658B659B65AB65BB65CB65DECFCB65EB65FB660B661B662D3EDD8AEC0EBB663C7DDBACCB664D0E3CBBDB665CDBAB666B667B8D1B668B669B1FCB66AC7EFB66BD6D6B66CB66DB66EBFC6C3EBB66FB670EFF5B671B672C3D8B673B674B675B676B677B678D7E2B679B67AB67BEFF7B3D3B67CC7D8D1EDB67DD6C8B67EEFF8B680EFF6B681BBFDB3C6B682B683B684B685B686B687B688BDD5B689B68AD2C6B68BBBE0B68CB68DCFA1B68EEFFCEFFBB68FB690EFF9B691B692B693B694B3CCB695C9D4CBB0B696B697B698B699B69AEFFEB69BB69CB0DEB69DB69ED6C9B69FB6A0B740EFFDB741B3EDB742B743F6D5B744B745B746B747B748B749B74AB74BB74CB74DB74EB74FB750B751B752CEC8B753B754B755F0A2B756F0A1B757B5BEBCDABBFCB758B8E5B759B75AB75BB75CB75DB75EC4C2B75FB760B761B762B763B764B765B766B767B768F0A3B769B76AB76BB76CB76DCBEBB76EB76FB770B771B772B773B774B775B776B777B778B779B77AB77BB77CB77DB77EB780B781B782B783B784B785B786F0A6B787B788B789D1A8B78ABEBFC7EEF1B6F1B7BFD5B78BB78CB78DB78EB4A9F1B8CDBBB78FC7D4D5ADB790F1B9B791F1BAB792B793B794B795C7CFB796B797B798D2A4D6CFB799B79AF1BBBDD1B4B0BEBDB79BB79CB79DB4DCCED1B79EBFDFF1BDB79FB7A0B840B841BFFAF1BCB842F1BFB843B844B845F1BEF1C0B846B847B848B849B84AF1C1B84BB84CB84DB84EB84FB850B851B852B853B854B855C1FEB856B857B858B859B85AB85BB85CB85DB85EB85FB860C1A2B861B862B863B864B865B866B867B868B869B86ACAFAB86BB86CD5BEB86DB86EB86FB870BEBABEB9D5C2B871B872BFA2B873CDAFF1B5B874B875B876B877B878B879BDDFB87AB6CBB87BB87CB87DB87EB880B881B882B883B884D6F1F3C3B885B886F3C4B887B8CDB888B889B88AF3C6F3C7B88BB0CAB88CF3C5B88DF3C9CBF1B88EB88FB890F3CBB891D0A6B892B893B1CAF3C8B894B895B896F3CFB897B5D1B898B899F3D7B89AF3D2B89BB89CB89DF3D4F3D3B7FBB89EB1BFB89FF3CEF3CAB5DAB8A0F3D0B940B941F3D1B942F3D5B943B944B945B946F3CDB947BCE3B948C1FDB949F3D6B94AB94BB94CB94DB94EB94FF3DAB950F3CCB951B5C8B952BDEEF3DCB953B954B7A4BFF0D6FECDB2B955B4F0B956B2DFB957F3D8B958F3D9C9B8B959F3DDB95AB95BF3DEB95CF3E1B95DB95EB95FB960B961B962B963B964B965B966B967F3DFB968B969F3E3F3E2B96AB96BF3DBB96CBFEAB96DB3EFB96EF3E0B96FB970C7A9B971BCF2B972B973B974B975F3EBB976B977B978B979B97AB97BB97CB9BFB97DB97EF3E4B980B981B982B2ADBBFEB983CBE3B984B985B986B987F3EDF3E9B988B989B98AB9DCF3EEB98BB98CB98DF3E5F3E6F3EAC2E1F3ECF3EFF3E8BCFDB98EB98FB990CFE4B991B992F3F0B993B994B995F3E7B996B997B998B999B99AB99BB99CB99DF3F2B99EB99FB9A0BA40D7ADC6AABA41BA42BA43BA44F3F3BA45BA46BA47BA48F3F1BA49C2A8BA4ABA4BBA4CBA4DBA4EB8DDF3F5BA4FBA50F3F4BA51BA52BA53B4DBBA54BA55BA56F3F6F3F7BA57BA58BA59F3F8BA5ABA5BBA5CC0BABA5DBA5EC0E9BA5FBA60BA61BA62BA63C5F1BA64BA65BA66BA67F3FBBA68F3FABA69BA6ABA6BBA6CBA6DBA6EBA6FBA70B4D8BA71BA72BA73F3FEF3F9BA74BA75F3FCBA76BA77BA78BA79BA7ABA7BF3FDBA7CBA7DBA7EBA80BA81BA82BA83BA84F4A1BA85BA86BA87BA88BA89BA8AF4A3BBC9BA8BBA8CF4A2BA8DBA8EBA8FBA90BA91BA92BA93BA94BA95BA96BA97BA98BA99F4A4BA9ABA9BBA9CBA9DBA9EBA9FB2BEF4A6F4A5BAA0BB40BB41BB42BB43BB44BB45BB46BB47BB48BB49BCAEBB4ABB4BBB4CBB4DBB4EBB4FBB50BB51BB52BB53BB54BB55BB56BB57BB58BB59BB5ABB5BBB5CBB5DBB5EBB5FBB60BB61BB62BB63BB64BB65BB66BB67BB68BB69BB6ABB6BBB6CBB6DBB6EC3D7D9E1BB6FBB70BB71BB72BB73BB74C0E0F4CCD7D1BB75BB76BB77BB78BB79BB7ABB7BBB7CBB7DBB7EBB80B7DBBB81BB82BB83BB84BB85BB86BB87F4CEC1A3BB88BB89C6C9BB8AB4D6D5B3BB8BBB8CBB8DF4D0F4CFF4D1CBDABB8EBB8FF4D2BB90D4C1D6E0BB91BB92BB93BB94B7E0BB95BB96BB97C1B8BB98BB99C1BBF4D3BEACBB9ABB9BBB9CBB9DBB9EB4E2BB9FBBA0F4D4F4D5BEABBC40BC41F4D6BC42BC43BC44F4DBBC45F4D7F4DABC46BAFDBC47F4D8F4D9BC48BC49BC4ABC4BBC4CBC4DBC4EB8E2CCC7F4DCBC4FB2DABC50BC51C3D3BC52BC53D4E3BFB7BC54BC55BC56BC57BC58BC59BC5AF4DDBC5BBC5CBC5DBC5EBC5FBC60C5B4BC61BC62BC63BC64BC65BC66BC67BC68F4E9BC69BC6ACFB5BC6BBC6CBC6DBC6EBC6FBC70BC71BC72BC73BC74BC75BC76BC77BC78CEC9BC79BC7ABC7BBC7CBC7DBC7EBC80BC81BC82BC83BC84BC85BC86BC87BC88BC89BC8ABC8BBC8CBC8DBC8ECBD8BC8FCBF7BC90BC91BC92BC93BDF4BC94BC95BC96D7CFBC97BC98BC99C0DBBC9ABC9BBC9CBC9DBC9EBC9FBCA0BD40BD41BD42BD43BD44BD45BD46BD47BD48BD49BD4ABD4BBD4CBD4DBD4EBD4FBD50BD51BD52BD53BD54BD55BD56BD57BD58BD59BD5ABD5BBD5CBD5DBD5EBD5FBD60BD61BD62BD63BD64BD65BD66BD67BD68BD69BD6ABD6BBD6CBD6DBD6EBD6FBD70BD71BD72BD73BD74BD75BD76D0F5BD77BD78BD79BD7ABD7BBD7CBD7DBD7EF4EABD80BD81BD82BD83BD84BD85BD86BD87BD88BD89BD8ABD8BBD8CBD8DBD8EBD8FBD90BD91BD92BD93BD94BD95BD96BD97BD98BD99BD9ABD9BBD9CBD9DBD9EBD9FBDA0BE40BE41BE42BE43BE44BE45BE46BE47BE48BE49BE4ABE4BBE4CF4EBBE4DBE4EBE4FBE50BE51BE52BE53F4ECBE54BE55BE56BE57BE58BE59BE5ABE5BBE5CBE5DBE5EBE5FBE60BE61BE62BE63BE64BE65BE66BE67BE68BE69BE6ABE6BBE6CBE6DBE6EBE6FBE70BE71BE72BE73BE74BE75BE76BE77BE78BE79BE7ABE7BBE7CBE7DBE7EBE80BE81BE82BE83BE84BE85BE86BE87BE88BE89BE8ABE8BBE8CBE8DBE8EBE8FBE90BE91BE92BE93BE94BE95BE96BE97BE98BE99BE9ABE9BBE9CBE9DBE9EBE9FBEA0BF40BF41BF42BF43BF44BF45BF46BF47BF48BF49BF4ABF4BBF4CBF4DBF4EBF4FBF50BF51BF52BF53BF54BF55BF56BF57BF58BF59BF5ABF5BBF5CBF5DBF5EBF5FBF60BF61BF62BF63BF64BF65BF66BF67BF68BF69BF6ABF6BBF6CBF6DBF6EBF6FBF70BF71BF72BF73BF74BF75BF76BF77BF78BF79BF7ABF7BBF7CBF7DBF7EBF80F7E3BF81BF82BF83BF84BF85B7B1BF86BF87BF88BF89BF8AF4EDBF8BBF8CBF8DBF8EBF8FBF90BF91BF92BF93BF94BF95BF96BF97BF98BF99BF9ABF9BBF9CBF9DBF9EBF9FBFA0C040C041C042C043C044C045C046C047C048C049C04AC04BC04CC04DC04EC04FC050C051C052C053C054C055C056C057C058C059C05AC05BC05CC05DC05EC05FC060C061C062C063D7EBC064C065C066C067C068C069C06AC06BC06CC06DC06EC06FC070C071C072C073C074C075C076C077C078C079C07AC07BF4EEC07CC07DC07EE6F9BEC0E6FABAECE6FBCFCBE6FCD4BCBCB6E6FDE6FEBCCDC8D2CEB3E7A1C080B4BFE7A2C9B4B8D9C4C9C081D7DDC2DAB7D7D6BDCEC6B7C4C082C083C5A6E7A3CFDFE7A4E7A5E7A6C1B7D7E9C9F0CFB8D6AFD6D5E7A7B0EDE7A8E7A9C9DCD2EFBEADE7AAB0F3C8DEBDE1E7ABC8C6C084E7ACBBE6B8F8D1A4E7ADC2E7BEF8BDCACDB3E7AEE7AFBEEED0E5C085CBE7CCD0BCCCE7B0BCA8D0F7E7B1C086D0F8E7B2E7B3B4C2E7B4E7B5C9FECEACC3E0E7B7B1C1B3F1C087E7B8E7B9D7DBD5C0E7BAC2CCD7BAE7BBE7BCE7BDBCEAC3E5C0C2E7BEE7BFBCA9C088E7C0E7C1E7B6B6D0E7C2C089E7C3E7C4BBBAB5DEC2C6B1E0E7C5D4B5E7C6B8BFE7C8E7C7B7ECC08AE7C9B2F8E7CAE7CBE7CCE7CDE7CEE7CFE7D0D3A7CBF5E7D1E7D2E7D3E7D4C9C9E7D5E7D6E7D7E7D8E7D9BDC9E7DAF3BEC08BB8D7C08CC8B1C08DC08EC08FC090C091C092C093F3BFC094F3C0F3C1C095C096C097C098C099C09AC09BC09CC09DC09EB9DECDF8C09FC0A0D8E8BAB1C140C2DEEEB7C141B7A3C142C143C144C145EEB9C146EEB8B0D5C147C148C149C14AC14BEEBBD5D6D7EFC14CC14DC14ED6C3C14FC150EEBDCAF0C151EEBCC152C153C154C155EEBEC156C157C158C159EEC0C15AC15BEEBFC15CC15DC15EC15FC160C161C162C163D1F2C164C7BCC165C3C0C166C167C168C169C16AB8E1C16BC16CC16DC16EC16FC1E7C170C171F4C6D0DFF4C7C172CFDBC173C174C8BAC175C176F4C8C177C178C179C17AC17BC17CC17DF4C9F4CAC17EF4CBC180C181C182C183C184D9FAB8FEC185C186E5F1D3F0C187F4E0C188CECCC189C18AC18BB3E1C18CC18DC18EC18FF1B4C190D2EEC191F4E1C192C193C194C195C196CFE8F4E2C197C198C7CCC199C19AC19BC19CC19DC19EB5D4B4E4F4E4C19FC1A0C240F4E3F4E5C241C242F4E6C243C244C245C246F4E7C247BAB2B0BFC248F4E8C249C24AC24BC24CC24DC24EC24FB7ADD2EDC250C251C252D2ABC0CFC253BFBCEBA3D5DFEAC8C254C255C256C257F1F3B6F8CBA3C258C259C4CDC25AF1E7C25BF1E8B8FBF1E9BAC4D4C5B0D2C25CC25DF1EAC25EC25FC260F1EBC261F1ECC262C263F1EDF1EEF1EFF1F1F1F0C5D5C264C265C266C267C268C269F1F2C26AB6FAC26BF1F4D2AEDEC7CBCAC26CC26DB3DCC26EB5A2C26FB9A2C270C271C4F4F1F5C272C273F1F6C274C275C276C1C4C1FBD6B0F1F7C277C278C279C27AF1F8C27BC1AAC27CC27DC27EC6B8C280BEDBC281C282C283C284C285C286C287C288C289C28AC28BC28CC28DC28EF1F9B4CFC28FC290C291C292C293C294F1FAC295C296C297C298C299C29AC29BC29CC29DC29EC29FC2A0C340EDB2EDB1C341C342CBE0D2DEC343CBC1D5D8C344C8E2C345C0DFBCA1C346C347C348C349C34AC34BEBC1C34CC34DD0A4C34ED6E2C34FB6C7B8D8EBC0B8CEC350EBBFB3A6B9C9D6ABC351B7F4B7CAC352C353C354BCE7B7BEEBC6C355EBC7B0B9BFCFC356EBC5D3FDC357EBC8C358C359EBC9C35AC35BB7CEC35CEBC2EBC4C9F6D6D7D5CDD0B2EBCFCEB8EBD0C35DB5A8C35EC35FC360C361C362B1B3EBD2CCA5C363C364C365C366C367C368C369C5D6EBD3C36AEBD1C5DFEBCECAA4EBD5B0FBC36BC36CBAFAC36DC36ED8B7F1E3C36FEBCAEBCBEBCCEBCDEBD6E6C0EBD9C370BFE8D2C8EBD7EBDCB8ECEBD8C371BDBAC372D0D8C373B0B7C374EBDDC4DCC375C376C377C378D6ACC379C37AC37BB4E0C37CC37DC2F6BCB9C37EC380EBDAEBDBD4E0C6EAC4D4EBDFC5A7D9F5C381B2B1C382EBE4C383BDC5C384C385C386EBE2C387C388C389C38AC38BC38CC38DC38EC38FC390C391C392C393EBE3C394C395B8ACC396CDD1EBE5C397C398C399EBE1C39AC1B3C39BC39CC39DC39EC39FC6A2C3A0C440C441C442C443C444C445CCF3C446EBE6C447C0B0D2B8EBE7C448C449C44AB8AFB8ADC44BEBE8C7BBCDF3C44CC44DC44EEBEAEBEBC44FC450C451C452C453EBEDC454C455C456C457D0C8C458EBF2C459EBEEC45AC45BC45CEBF1C8F9C45DD1FCEBECC45EC45FEBE9C460C461C462C463B8B9CFD9C4E5EBEFEBF0CCDACDC8B0F2C464EBF6C465C466C467C468C469EBF5C46AB2B2C46BC46CC46DC46EB8E0C46FEBF7C470C471C472C473C474C475B1ECC476C477CCC5C4A4CFA5C478C479C47AC47BC47CEBF9C47DC47EECA2C480C5F2C481EBFAC482C483C484C485C486C487C488C489C9C5C48AC48BC48CC48DC48EC48FE2DFEBFEC490C491C492C493CDCEECA1B1DBD3B7C494C495D2DCC496C497C498EBFDC499EBFBC49AC49BC49CC49DC49EC49FC4A0C540C541C542C543C544C545C546C547C548C549C54AC54BC54CC54DC54EB3BCC54FC550C551EAB0C552C553D7D4C554F4ABB3F4C555C556C557C558C559D6C1D6C2C55AC55BC55CC55DC55EC55FD5E9BECAC560F4A7C561D2A8F4A8F4A9C562F4AABECBD3DFC563C564C565C566C567C9E0C9E1C568C569F3C2C56ACAE6C56BCCF2C56CC56DC56EC56FC570C571E2B6CBB4C572CEE8D6DBC573F4ADF4AEF4AFC574C575C576C577F4B2C578BABDF4B3B0E3F4B0C579F4B1BDA2B2D5C57AF4B6F4B7B6E6B2B0CFCFF4B4B4ACC57BF4B5C57CC57DF4B8C57EC580C581C582C583F4B9C584C585CDA7C586F4BAC587F4BBC588C589C58AF4BCC58BC58CC58DC58EC58FC590C591C592CBD2C593F4BDC594C595C596C597F4BEC598C599C59AC59BC59CC59DC59EC59FF4BFC5A0C640C641C642C643F4DEC1BCBCE8C644C9ABD1DEE5F5C645C646C647C648DCB3D2D5C649C64ADCB4B0ACDCB5C64BC64CBDDAC64DDCB9C64EC64FC650D8C2C651DCB7D3F3C652C9D6DCBADCB6C653DCBBC3A2C654C655C656C657DCBCDCC5DCBDC658C659CEDFD6A5C65ADCCFC65BDCCDC65CC65DDCD2BDE6C2ABC65EDCB8DCCBDCCEDCBEB7D2B0C5DCC7D0BEDCC1BBA8C65FB7BCDCCCC660C661DCC6DCBFC7DBC662C663C664D1BFDCC0C665C666DCCAC667C668DCD0C669C66ACEADDCC2C66BDCC3DCC8DCC9B2D4DCD1CBD5C66CD4B7DCDBDCDFCCA6DCE6C66DC3E7DCDCC66EC66FBFC1DCD9C670B0FAB9B6DCE5DCD3C671DCC4DCD6C8F4BFE0C672C673C674C675C9BBC676C677C678B1BDC679D3A2C67AC67BDCDAC67CC67DDCD5C67EC6BBC680DCDEC681C682C683C684C685D7C2C3AFB7B6C7D1C3A9DCE2DCD8DCEBDCD4C686C687DCDDC688BEA5DCD7C689DCE0C68AC68BDCE3DCE4C68CDCF8C68DC68EDCE1DDA2DCE7C68FC690C691C692C693C694C695C696C697C698BCEBB4C4C699C69AC3A3B2E7DCFAC69BDCF2C69CDCEFC69DDCFCDCEED2F0B2E8C69EC8D7C8E3DCFBC69FDCEDC6A0C740C741DCF7C742C743DCF5C744C745BEA3DCF4C746B2DDC747C748C749C74AC74BDCF3BCF6DCE8BBC4C74CC0F3C74DC74EC74FC750C751BCD4DCE9DCEAC752DCF1DCF6DCF9B5B4C753C8D9BBE7DCFEDCFDD3ABDDA1DDA3DDA5D2F1DDA4DDA6DDA7D2A9C754C755C756C757C758C759C75ABAC9DDA9C75BC75CDDB6DDB1DDB4C75DC75EC75FC760C761C762C763DDB0C6CEC764C765C0F2C766C767C768C769C9AFC76AC76BC76CDCECDDAEC76DC76EC76FC770DDB7C771C772DCF0DDAFC773DDB8C774DDACC775C776C777C778C779C77AC77BDDB9DDB3DDADC4AAC77CC77DC77EC780DDA8C0B3C1ABDDAADDABC781DDB2BBF1DDB5D3A8DDBAC782DDBBC3A7C783C784DDD2DDBCC785C786C787DDD1C788B9BDC789C78ABED5C78BBEFAC78CC78DBACAC78EC78FC790C791DDCAC792DDC5C793DDBFC794C795C796B2CBDDC3C797DDCBB2A4DDD5C798C799C79ADDBEC79BC79CC79DC6D0DDD0C79EC79FC7A0C840C841DDD4C1E2B7C6C842C843C844C845C846DDCEDDCFC847C848C849DDC4C84AC84BC84CDDBDC84DDDCDCCD1C84EDDC9C84FC850C851C852DDC2C3C8C6BCCEAEDDCCC853DDC8C854C855C856C857C858C859DDC1C85AC85BC85CDDC6C2DCC85DC85EC85FC860C861C862D3A9D3AADDD3CFF4C8F8C863C864C865C866C867C868C869C86ADDE6C86BC86CC86DC86EC86FC870DDC7C871C872C873DDE0C2E4C874C875C876C877C878C879C87AC87BDDE1C87CC87DC87EC880C881C882C883C884C885C886DDD7C887C888C889C88AC88BD6F8C88CDDD9DDD8B8F0DDD6C88DC88EC88FC890C6CFC891B6ADC892C893C894C895C896DDE2C897BAF9D4E1DDE7C898C899C89AB4D0C89BDDDAC89CBFFBDDE3C89DDDDFC89EDDDDC89FC8A0C940C941C942C943C944B5D9C945C946C947C948DDDBDDDCDDDEC949BDAFDDE4C94ADDE5C94BC94CC94DC94EC94FC950C951C952DDF5C953C3C9C954C955CBE2C956C957C958C959DDF2C95AC95BC95CC95DC95EC95FC960C961C962C963C964C965C966D8E1C967C968C6D1C969DDF4C96AC96BC96CD5F4DDF3DDF0C96DC96EDDECC96FDDEFC970DDE8C971C972D0EEC973C974C975C976C8D8DDEEC977C978DDE9C979C97ADDEACBF2C97BDDEDC97CC97DB1CDC97EC980C981C982C983C984C0B6C985BCBBDDF1C986C987DDF7C988DDF6DDEBC989C98AC98BC98CC98DC5EEC98EC98FC990DDFBC991C992C993C994C995C996C997C998C999C99AC99BDEA4C99CC99DDEA3C99EC99FC9A0CA40CA41CA42CA43CA44CA45CA46CA47CA48DDF8CA49CA4ACA4BCA4CC3EFCA4DC2FBCA4ECA4FCA50D5E1CA51CA52CEB5CA53CA54CA55CA56DDFDCA57B2CCCA58CA59CA5ACA5BCA5CCA5DCA5ECA5FCA60C4E8CADFCA61CA62CA63CA64CA65CA66CA67CA68CA69CA6AC7BEDDFADDFCDDFEDEA2B0AAB1CECA6BCA6CCA6DCA6ECA6FDEACCA70CA71CA72CA73DEA6BDB6C8EFCA74CA75CA76CA77CA78CA79CA7ACA7BCA7CCA7DCA7EDEA1CA80CA81DEA5CA82CA83CA84CA85DEA9CA86CA87CA88CA89CA8ADEA8CA8BCA8CCA8DDEA7CA8ECA8FCA90CA91CA92CA93CA94CA95CA96DEADCA97D4CCCA98CA99CA9ACA9BDEB3DEAADEAECA9CCA9DC0D9CA9ECA9FCAA0CB40CB41B1A1DEB6CB42DEB1CB43CB44CB45CB46CB47CB48CB49DEB2CB4ACB4BCB4CCB4DCB4ECB4FCB50CB51CB52CB53CB54D1A6DEB5CB55CB56CB57CB58CB59CB5ACB5BDEAFCB5CCB5DCB5EDEB0CB5FD0BDCB60CB61CB62DEB4CAEDDEB9CB63CB64CB65CB66CB67CB68DEB8CB69DEB7CB6ACB6BCB6CCB6DCB6ECB6FCB70DEBBCB71CB72CB73CB74CB75CB76CB77BDE5CB78CB79CB7ACB7BCB7CB2D8C3EACB7DCB7EDEBACB80C5BACB81CB82CB83CB84CB85CB86DEBCCB87CB88CB89CB8ACB8BCB8CCB8DCCD9CB8ECB8FCB90CB91B7AACB92CB93CB94CB95CB96CB97CB98CB99CB9ACB9BCB9CCB9DCB9ECB9FCBA0CC40CC41D4E5CC42CC43CC44DEBDCC45CC46CC47CC48CC49DEBFCC4ACC4BCC4CCC4DCC4ECC4FCC50CC51CC52CC53CC54C4A2CC55CC56CC57CC58DEC1CC59CC5ACC5BCC5CCC5DCC5ECC5FCC60CC61CC62CC63CC64CC65CC66CC67CC68DEBECC69DEC0CC6ACC6BCC6CCC6DCC6ECC6FCC70CC71CC72CC73CC74CC75CC76CC77D5BACC78CC79CC7ADEC2CC7BCC7CCC7DCC7ECC80CC81CC82CC83CC84CC85CC86CC87CC88CC89CC8ACC8BF2AEBBA2C2B2C5B0C2C7CC8CCC8DF2AFCC8ECC8FCC90CC91CC92D0E9CC93CC94CC95D3DDCC96CC97CC98EBBDCC99CC9ACC9BCC9CCC9DCC9ECC9FCCA0B3E6F2B0CD40F2B1CD41CD42CAADCD43CD44CD45CD46CD47CD48CD49BAE7F2B3F2B5F2B4CBE4CFBAF2B2CAB4D2CFC2ECCD4ACD4BCD4CCD4DCD4ECD4FCD50CEC3F2B8B0F6F2B7CD51CD52CD53CD54CD55F2BECD56B2CFCD57CD58CD59CD5ACD5BCD5CD1C1F2BACD5DCD5ECD5FCD60CD61F2BCD4E9CD62CD63F2BBF2B6F2BFF2BDCD64F2B9CD65CD66F2C7F2C4F2C6CD67CD68F2CAF2C2F2C0CD69CD6ACD6BF2C5CD6CCD6DCD6ECD6FCD70D6FBCD71CD72CD73F2C1CD74C7F9C9DFCD75F2C8B9C6B5B0CD76CD77F2C3F2C9F2D0F2D6CD78CD79BBD7CD7ACD7BCD7CF2D5CDDCCD7DD6EBCD7ECD80F2D2F2D4CD81CD82CD83CD84B8F2CD85CD86CD87CD88F2CBCD89CD8ACD8BF2CEC2F9CD8CD5DDF2CCF2CDF2CFF2D3CD8DCD8ECD8FF2D9D3BCCD90CD91CD92CD93B6EACD94CAF1CD95B7E4F2D7CD96CD97CD98F2D8F2DAF2DDF2DBCD99CD9AF2DCCD9BCD9CCD9DCD9ED1D1F2D1CD9FCDC9CDA0CECFD6A9CE40F2E3CE41C3DBCE42F2E0CE43CE44C0AFF2ECF2DECE45F2E1CE46CE47CE48F2E8CE49CE4ACE4BCE4CF2E2CE4DCE4EF2E7CE4FCE50F2E6CE51CE52F2E9CE53CE54CE55F2DFCE56CE57F2E4F2EACE58CE59CE5ACE5BCE5CCE5DCE5ED3ACF2E5B2F5CE5FCE60F2F2CE61D0ABCE62CE63CE64CE65F2F5CE66CE67CE68BBC8CE69F2F9CE6ACE6BCE6CCE6DCE6ECE6FF2F0CE70CE71F2F6F2F8F2FACE72CE73CE74CE75CE76CE77CE78CE79F2F3CE7AF2F1CE7BCE7CCE7DBAFBCE7EB5FBCE80CE81CE82CE83F2EFF2F7F2EDF2EECE84CE85CE86F2EBF3A6CE87F3A3CE88CE89F3A2CE8ACE8BF2F4CE8CC8DACE8DCE8ECE8FCE90CE91F2FBCE92CE93CE94F3A5CE95CE96CE97CE98CE99CE9ACE9BC3F8CE9CCE9DCE9ECE9FCEA0CF40CF41CF42F2FDCF43CF44F3A7F3A9F3A4CF45F2FCCF46CF47CF48F3ABCF49F3AACF4ACF4BCF4CCF4DC2DDCF4ECF4FF3AECF50CF51F3B0CF52CF53CF54CF55CF56F3A1CF57CF58CF59F3B1F3ACCF5ACF5BCF5CCF5DCF5EF3AFF2FEF3ADCF5FCF60CF61CF62CF63CF64CF65F3B2CF66CF67CF68CF69F3B4CF6ACF6BCF6CCF6DF3A8CF6ECF6FCF70CF71F3B3CF72CF73CF74F3B5CF75CF76CF77CF78CF79CF7ACF7BCF7CCF7DCF7ED0B7CF80CF81CF82CF83F3B8CF84CF85CF86CF87D9F9CF88CF89CF8ACF8BCF8CCF8DF3B9CF8ECF8FCF90CF91CF92CF93CF94CF95F3B7CF96C8E4F3B6CF97CF98CF99CF9AF3BACF9BCF9CCF9DCF9ECF9FF3BBB4C0CFA0D040D041D042D043D044D045D046D047D048D049D04AD04BD04CD04DEEC3D04ED04FD050D051D052D053F3BCD054D055F3BDD056D057D058D1AAD059D05AD05BF4ACD0C6D05CD05DD05ED05FD060D061D0D0D1DCD062D063D064D065D066D067CFCED068D069BDD6D06AD1C3D06BD06CD06DD06ED06FD070D071BAE2E1E9D2C2F1C2B2B9D072D073B1EDF1C3D074C9C0B3C4D075D9F2D076CBA5D077F1C4D078D079D07AD07BD6D4D07CD07DD07ED080D081F1C5F4C0F1C6D082D4ACF1C7D083B0C0F4C1D084D085F4C2D086D087B4FCD088C5DBD089D08AD08BD08CCCBBD08DD08ED08FD0E4D090D091D092D093D094CDE0D095D096D097D098D099F1C8D09AD9F3D09BD09CD09DD09ED09FD0A0B1BBD140CFAED141D142D143B8A4D144D145D146D147D148F1CAD149D14AD14BD14CF1CBD14DD14ED14FD150B2C3C1D1D151D152D7B0F1C9D153D154F1CCD155D156D157D158F1CED159D15AD15BD9F6D15CD2E1D4A3D15DD15EF4C3C8B9D15FD160D161D162D163F4C4D164D165F1CDF1CFBFE3F1D0D166D167F1D4D168D169D16AD16BD16CD16DD16EF1D6F1D1D16FC9D1C5E1D170D171D172C2E3B9FCD173D174F1D3D175F1D5D176D177D178B9D3D179D17AD17BD17CD17DD17ED180F1DBD181D182D183D184D185BAD6D186B0FDF1D9D187D188D189D18AD18BF1D8F1D2F1DAD18CD18DD18ED18FD190F1D7D191D192D193C8ECD194D195D196D197CDCAF1DDD198D199D19AD19BE5BDD19CD19DD19EF1DCD19FF1DED1A0D240D241D242D243D244D245D246D247D248F1DFD249D24ACFE5D24BD24CD24DD24ED24FD250D251D252D253D254D255D256D257D258D259D25AD25BD25CD25DD25ED25FD260D261D262D263F4C5BDF3D264D265D266D267D268D269F1E0D26AD26BD26CD26DD26ED26FD270D271D272D273D274D275D276D277D278D279D27AD27BD27CD27DF1E1D27ED280D281CEF7D282D2AAD283F1FBD284D285B8B2D286D287D288D289D28AD28BD28CD28DD28ED28FD290D291D292D293D294D295D296D297D298D299D29AD29BD29CD29DD29ED29FD2A0D340D341D342D343D344D345D346D347D348D349D34AD34BD34CD34DD34ED34FD350D351D352D353D354D355D356D357D358D359D35AD35BD35CD35DD35EBCFBB9DBD35FB9E6C3D9CAD3EAE8C0C0BEF5EAE9EAEAEAEBD360EAECEAEDEAEEEAEFBDC7D361D362D363F5FBD364D365D366F5FDD367F5FED368F5FCD369D36AD36BD36CBDE2D36DF6A1B4A5D36ED36FD370D371F6A2D372D373D374F6A3D375D376D377ECB2D378D379D37AD37BD37CD37DD37ED380D381D382D383D384D1D4D385D386D387D388D389D38AD9EAD38BD38CD38DD38ED38FD390D391D392D393D394D395D396D397D398D399D39AD39BD39CD39DD39ED39FD3A0D440D441D442D443D444D445D446D447D448D449D44AD44BD44CD44DD44ED44FD450D451D452D453D454D455D456D457D458D459D45AD45BD45CD45DD45ED45FF6A4D460D461D462D463D464D465D466D467D468EEBAD469D46AD46BD46CD46DD46ED46FD470D471D472D473D474D475D476D477D478D479D47AD47BD47CD47DD47ED480D481D482D483D484D485D486D487D488D489D48AD48BD48CD48DD48ED48FD490D491D492D493D494D495D496D497D498D499D5B2D49AD49BD49CD49DD49ED49FD4A0D540D541D542D543D544D545D546D547D3FECCDCD548D549D54AD54BD54CD54DD54ED54FCAC4D550D551D552D553D554D555D556D557D558D559D55AD55BD55CD55DD55ED55FD560D561D562D563D564D565D566D567D568D569D56AD56BD56CD56DD56ED56FD570D571D572D573D574D575D576D577D578D579D57AD57BD57CD57DD57ED580D581D582D583D584D585D586D587D588D589D58AD58BD58CD58DD58ED58FD590D591D592D593D594D595D596D597D598D599D59AD59BD59CD59DD59ED59FD5A0D640D641D642D643D644D645D646D647D648D649D64AD64BD64CD64DD64ED64FD650D651D652D653D654D655D656D657D658D659D65AD65BD65CD65DD65ED65FD660D661D662E5C0D663D664D665D666D667D668D669D66AD66BD66CD66DD66ED66FD670D671D672D673D674D675D676D677D678D679D67AD67BD67CD67DD67ED680D681F6A5D682D683D684D685D686D687D688D689D68AD68BD68CD68DD68ED68FD690D691D692D693D694D695D696D697D698D699D69AD69BD69CD69DD69ED69FD6A0D740D741D742D743D744D745D746D747D748D749D74AD74BD74CD74DD74ED74FD750D751D752D753D754D755D756D757D758D759D75AD75BD75CD75DD75ED75FBEAFD760D761D762D763D764C6A9D765D766D767D768D769D76AD76BD76CD76DD76ED76FD770D771D772D773D774D775D776D777D778D779D77AD77BD77CD77DD77ED780D781D782D783D784D785D786D787D788D789D78AD78BD78CD78DD78ED78FD790D791D792D793D794D795D796D797D798DAA5BCC6B6A9B8BCC8CFBCA5DAA6DAA7CCD6C8C3DAA8C6FDD799D1B5D2E9D1B6BCC7D79ABDB2BBE4DAA9DAAAD1C8DAABD0EDB6EFC2DBD79BCBCFB7EDC9E8B7C3BEF7D6A4DAACDAADC6C0D7E7CAB6D79CD5A9CBDFD5EFDAAED6DFB4CADAB0DAAFD79DD2EBDAB1DAB2DAB3CAD4DAB4CAABDAB5DAB6B3CFD6EFDAB7BBB0B5AEDAB8DAB9B9EED1AFD2E8DABAB8C3CFEAB2EFDABBDABCD79EBDEBCEDCD3EFDABDCEF3DABED3D5BBE5DABFCBB5CBD0DAC0C7EBD6EEDAC1C5B5B6C1DAC2B7CCBFCEDAC3DAC4CBADDAC5B5F7DAC6C1C2D7BBDAC7CCB8D79FD2EAC4B1DAC8B5FDBBD1DAC9D0B3DACADACBCEBDDACCDACDDACEB2F7DAD1DACFD1E8DAD0C3D5DAD2D7A0DAD3DAD4DAD5D0BBD2A5B0F9DAD6C7ABDAD7BDF7C3A1DAD8DAD9C3FDCCB7DADADADBC0BEC6D7DADCDADDC7B4DADEDADFB9C8D840D841D842D843D844D845D846D847D848BBEDD849D84AD84BD84CB6B9F4F8D84DF4F9D84ED84FCDE3D850D851D852D853D854D855D856D857F5B9D858D859D85AD85BEBE0D85CD85DD85ED85FD860D861CFF3BBBFD862D863D864D865D866D867D868BAC0D4A5D869D86AD86BD86CD86DD86ED86FE1D9D870D871D872D873F5F4B1AAB2F2D874D875D876D877D878D879D87AF5F5D87BD87CF5F7D87DD87ED880BAD1F5F6D881C3B2D882D883D884D885D886D887D888F5F9D889D88AD88BF5F8D88CD88DD88ED88FD890D891D892D893D894D895D896D897D898D899D89AD89BD89CD89DD89ED89FD8A0D940D941D942D943D944D945D946D947D948D949D94AD94BD94CD94DD94ED94FD950D951D952D953D954D955D956D957D958D959D95AD95BD95CD95DD95ED95FD960D961D962D963D964D965D966D967D968D969D96AD96BD96CD96DD96ED96FD970D971D972D973D974D975D976D977D978D979D97AD97BD97CD97DD97ED980D981D982D983D984D985D986D987D988D989D98AD98BD98CD98DD98ED98FD990D991D992D993D994D995D996D997D998D999D99AD99BD99CD99DD99ED99FD9A0DA40DA41DA42DA43DA44DA45DA46DA47DA48DA49DA4ADA4BDA4CDA4DDA4EB1B4D5EAB8BADA4FB9B1B2C6D4F0CFCDB0DCD5CBBBF5D6CAB7B7CCB0C6B6B1E1B9BAD6FCB9E1B7A1BCFAEADAEADBCCF9B9F3EADCB4FBC3B3B7D1BAD8EADDD4F4EADEBCD6BBDFEADFC1DEC2B8D4DFD7CAEAE0EAE1EAE4EAE2EAE3C9DEB8B3B6C4EAE5CAEAC9CDB4CDDA50DA51E2D9C5E2EAE6C0B5DA52D7B8EAE7D7ACC8FCD8D3D8CDD4DEDA53D4F9C9C4D3AEB8D3B3E0DA54C9E2F4F6DA55DA56DA57BAD5DA58F4F7DA59DA5AD7DFDA5BDA5CF4F1B8B0D5D4B8CFC6F0DA5DDA5EDA5FDA60DA61DA62DA63DA64DA65B3C3DA66DA67F4F2B3ACDA68DA69DA6ADA6BD4BDC7F7DA6CDA6DDA6EDA6FDA70F4F4DA71DA72F4F3DA73DA74DA75DA76DA77DA78DA79DA7ADA7BDA7CCCCBDA7DDA7EDA80C8A4DA81DA82DA83DA84DA85DA86DA87DA88DA89DA8ADA8BDA8CDA8DF4F5DA8ED7E3C5BFF5C0DA8FDA90F5BBDA91F5C3DA92F5C2DA93D6BAF5C1DA94DA95DA96D4BEF5C4DA97F5CCDA98DA99DA9ADA9BB0CFB5F8DA9CF5C9F5CADA9DC5DCDA9EDA9FDAA0DB40F5C5F5C6DB41DB42F5C7F5CBDB43BEE0F5C8B8FADB44DB45DB46F5D0F5D3DB47DB48DB49BFE7DB4AB9F2F5BCF5CDDB4BDB4CC2B7DB4DDB4EDB4FCCF8DB50BCF9DB51F5CEF5CFF5D1B6E5F5D2DB52F5D5DB53DB54DB55DB56DB57DB58DB59F5BDDB5ADB5BDB5CF5D4D3BBDB5DB3ECDB5EDB5FCCA4DB60DB61DB62DB63F5D6DB64DB65DB66DB67DB68DB69DB6ADB6BF5D7BEE1F5D8DB6CDB6DCCDFF5DBDB6EDB6FDB70DB71DB72B2C8D7D9DB73F5D9DB74F5DAF5DCDB75F5E2DB76DB77DB78F5E0DB79DB7ADB7BF5DFF5DDDB7CDB7DF5E1DB7EDB80F5DEF5E4F5E5DB81CCE3DB82DB83E5BFB5B8F5E3F5E8CCA3DB84DB85DB86DB87DB88F5E6F5E7DB89DB8ADB8BDB8CDB8DDB8EF5BEDB8FDB90DB91DB92DB93DB94DB95DB96DB97DB98DB99DB9AB1C4DB9BDB9CF5BFDB9DDB9EB5C5B2E4DB9FF5ECF5E9DBA0B6D7DC40F5EDDC41F5EADC42DC43DC44DC45DC46F5EBDC47DC48B4DADC49D4EADC4ADC4BDC4CF5EEDC4DB3F9DC4EDC4FDC50DC51DC52DC53DC54F5EFF5F1DC55DC56DC57F5F0DC58DC59DC5ADC5BDC5CDC5DDC5EF5F2DC5FF5F3DC60DC61DC62DC63DC64DC65DC66DC67DC68DC69DC6ADC6BC9EDB9AADC6CDC6DC7FBDC6EDC6FB6E3DC70DC71DC72DC73DC74DC75DC76CCC9DC77DC78DC79DC7ADC7BDC7CDC7DDC7EDC80DC81DC82DC83DC84DC85DC86DC87DC88DC89DC8AEAA6DC8BDC8CDC8DDC8EDC8FDC90DC91DC92DC93DC94DC95DC96DC97DC98DC99DC9ADC9BDC9CDC9DDC9EDC9FDCA0DD40DD41DD42DD43DD44DD45DD46DD47DD48DD49DD4ADD4BDD4CDD4DDD4EDD4FDD50DD51DD52DD53DD54DD55DD56DD57DD58DD59DD5ADD5BDD5CDD5DDD5EDD5FDD60DD61DD62DD63DD64DD65DD66DD67DD68DD69DD6ADD6BDD6CDD6DDD6EDD6FDD70DD71DD72DD73DD74DD75DD76DD77DD78DD79DD7ADD7BDD7CDD7DDD7EDD80DD81DD82DD83DD84DD85DD86DD87DD88DD89DD8ADD8BDD8CDD8DDD8EDD8FDD90DD91DD92DD93DD94DD95DD96DD97DD98DD99DD9ADD9BDD9CDD9DDD9EDD9FDDA0DE40DE41DE42DE43DE44DE45DE46DE47DE48DE49DE4ADE4BDE4CDE4DDE4EDE4FDE50DE51DE52DE53DE54DE55DE56DE57DE58DE59DE5ADE5BDE5CDE5DDE5EDE5FDE60B3B5D4FEB9ECD0F9DE61E9EDD7AAE9EEC2D6C8EDBAE4E9EFE9F0E9F1D6E1E9F2E9F3E9F5E9F4E9F6E9F7C7E1E9F8D4D8E9F9BDCEDE62E9FAE9FBBDCFE9FCB8A8C1BEE9FDB1B2BBD4B9F5E9FEDE63EAA1EAA2EAA3B7F8BCADDE64CAE4E0CED4AFCFBDD5B7EAA4D5DEEAA5D0C1B9BCDE65B4C7B1D9DE66DE67DE68C0B1DE69DE6ADE6BDE6CB1E6B1E7DE6DB1E8DE6EDE6FDE70DE71B3BDC8E8DE72DE73DE74DE75E5C1DE76DE77B1DFDE78DE79DE7AC1C9B4EFDE7BDE7CC7A8D3D8DE7DC6F9D1B8DE7EB9FDC2F5DE80DE81DE82DE83DE84D3ADDE85D4CBBDFCDE86E5C2B7B5E5C3DE87DE88BBB9D5E2DE89BDF8D4B6CEA5C1ACB3D9DE8ADE8BCCF6DE8CE5C6E5C4E5C8DE8DE5CAE5C7B5CFC6C8DE8EB5FCE5C5DE8FCAF6DE90DE91E5C9DE92DE93DE94C3D4B1C5BCA3DE95DE96DE97D7B7DE98DE99CDCBCBCDCACACCD3E5CCE5CBC4E6DE9ADE9BD1A1D1B7E5CDDE9CE5D0DE9DCDB8D6F0E5CFB5DDDE9ECDBEDE9FE5D1B6BADEA0DF40CDA8B9E4DF41CAC5B3D1CBD9D4ECE5D2B7EADF42DF43DF44E5CEDF45DF46DF47DF48DF49DF4AE5D5B4FEE5D6DF4BDF4CDF4DDF4EDF4FE5D3E5D4DF50D2DDDF51DF52C2DFB1C6DF53D3E2DF54DF55B6DDCBECDF56E5D7DF57DF58D3F6DF59DF5ADF5BDF5CDF5DB1E9DF5EB6F4E5DAE5D8E5D9B5C0DF5FDF60DF61D2C5E5DCDF62DF63E5DEDF64DF65DF66DF67DF68DF69E5DDC7B2DF6AD2A3DF6BDF6CE5DBDF6DDF6EDF6FDF70D4E2D5DADF71DF72DF73DF74DF75E5E0D7F1DF76DF77DF78DF79DF7ADF7BDF7CE5E1DF7DB1DCD1FBDF7EE5E2E5E4DF80DF81DF82DF83E5E3DF84DF85E5E5DF86DF87DF88DF89DF8AD2D8DF8BB5CBDF8CE7DFDF8DDAF5DF8EDAF8DF8FDAF6DF90DAF7DF91DF92DF93DAFAD0CFC4C7DF94DF95B0EEDF96DF97DF98D0B0DF99DAF9DF9AD3CABAAADBA2C7F1DF9BDAFCDAFBC9DBDAFDDF9CDBA1D7DEDAFEC1DADF9DDF9EDBA5DF9FDFA0D3F4E040E041DBA7DBA4E042DBA8E043E044BDBCE045E046E047C0C9DBA3DBA6D6A3E048DBA9E049E04AE04BDBADE04CE04DE04EDBAEDBACBAC2E04FE050E051BFA4DBABE052E053E054DBAAD4C7B2BFE055E056DBAFE057B9F9E058DBB0E059E05AE05BE05CB3BBE05DE05EE05FB5A6E060E061E062E063B6BCDBB1E064E065E066B6F5E067DBB2E068E069E06AE06BE06CE06DE06EE06FE070E071E072E073E074E075E076E077E078E079E07AE07BB1C9E07CE07DE07EE080DBB4E081E082E083DBB3DBB5E084E085E086E087E088E089E08AE08BE08CE08DE08EDBB7E08FDBB6E090E091E092E093E094E095E096DBB8E097E098E099E09AE09BE09CE09DE09EE09FDBB9E0A0E140DBBAE141E142D3CFF4FAC7F5D7C3C5E4F4FCF4FDF4FBE143BEC6E144E145E146E147D0EFE148E149B7D3E14AE14BD4CDCCAAE14CE14DF5A2F5A1BAA8F4FECBD6E14EE14FE150F5A4C0D2E151B3EAE152CDAAF5A5F5A3BDB4F5A8E153F5A9BDCDC3B8BFE1CBE1F5AAE154E155E156F5A6F5A7C4F0E157E158E159E15AE15BF5ACE15CB4BCE15DD7EDE15EB4D7F5ABF5AEE15FE160F5ADF5AFD0D1E161E162E163E164E165E166E167C3D1C8A9E168E169E16AE16BE16CE16DF5B0F5B1E16EE16FE170E171E172E173F5B2E174E175F5B3F5B4F5B5E176E177E178E179F5B7F5B6E17AE17BE17CE17DF5B8E17EE180E181E182E183E184E185E186E187E188E189E18AB2C9E18BD3D4CACDE18CC0EFD6D8D2B0C1BFE18DBDF0E18EE18FE190E191E192E193E194E195E196E197B8AAE198E199E19AE19BE19CE19DE19EE19FE1A0E240E241E242E243E244E245E246E247E248E249E24AE24BE24CE24DE24EE24FE250E251E252E253E254E255E256E257E258E259E25AE25BE25CE25DE25EE25FE260E261E262E263E264E265E266E267E268E269E26AE26BE26CE26DE26EE26FE270E271E272E273E274E275E276E277E278E279E27AE27BE27CE27DE27EE280E281E282E283E284E285E286E287E288E289E28AE28BE28CE28DE28EE28FE290E291E292E293E294E295E296E297E298E299E29AE29BE29CE29DE29EE29FE2A0E340E341E342E343E344E345E346E347E348E349E34AE34BE34CE34DE34EE34FE350E351E352E353E354E355E356E357E358E359E35AE35BE35CE35DE35EE35FE360E361E362E363E364E365E366E367E368E369E36AE36BE36CE36DBCF8E36EE36FE370E371E372E373E374E375E376E377E378E379E37AE37BE37CE37DE37EE380E381E382E383E384E385E386E387F6C6E388E389E38AE38BE38CE38DE38EE38FE390E391E392E393E394E395E396E397E398E399E39AE39BE39CE39DE39EE39FE3A0E440E441E442E443E444E445F6C7E446E447E448E449E44AE44BE44CE44DE44EE44FE450E451E452E453E454E455E456E457E458E459E45AE45BE45CE45DE45EF6C8E45FE460E461E462E463E464E465E466E467E468E469E46AE46BE46CE46DE46EE46FE470E471E472E473E474E475E476E477E478E479E47AE47BE47CE47DE47EE480E481E482E483E484E485E486E487E488E489E48AE48BE48CE48DE48EE48FE490E491E492E493E494E495E496E497E498E499E49AE49BE49CE49DE49EE49FE4A0E540E541E542E543E544E545E546E547E548E549E54AE54BE54CE54DE54EE54FE550E551E552E553E554E555E556E557E558E559E55AE55BE55CE55DE55EE55FE560E561E562E563E564E565E566E567E568E569E56AE56BE56CE56DE56EE56FE570E571E572E573F6C9E574E575E576E577E578E579E57AE57BE57CE57DE57EE580E581E582E583E584E585E586E587E588E589E58AE58BE58CE58DE58EE58FE590E591E592E593E594E595E596E597E598E599E59AE59BE59CE59DE59EE59FF6CAE5A0E640E641E642E643E644E645E646E647E648E649E64AE64BE64CE64DE64EE64FE650E651E652E653E654E655E656E657E658E659E65AE65BE65CE65DE65EE65FE660E661E662F6CCE663E664E665E666E667E668E669E66AE66BE66CE66DE66EE66FE670E671E672E673E674E675E676E677E678E679E67AE67BE67CE67DE67EE680E681E682E683E684E685E686E687E688E689E68AE68BE68CE68DE68EE68FE690E691E692E693E694E695E696E697E698E699E69AE69BE69CE69DF6CBE69EE69FE6A0E740E741E742E743E744E745E746E747F7E9E748E749E74AE74BE74CE74DE74EE74FE750E751E752E753E754E755E756E757E758E759E75AE75BE75CE75DE75EE75FE760E761E762E763E764E765E766E767E768E769E76AE76BE76CE76DE76EE76FE770E771E772E773E774E775E776E777E778E779E77AE77BE77CE77DE77EE780E781E782E783E784E785E786E787E788E789E78AE78BE78CE78DE78EE78FE790E791E792E793E794E795E796E797E798E799E79AE79BE79CE79DE79EE79FE7A0E840E841E842E843E844E845E846E847E848E849E84AE84BE84CE84DE84EF6CDE84FE850E851E852E853E854E855E856E857E858E859E85AE85BE85CE85DE85EE85FE860E861E862E863E864E865E866E867E868E869E86AE86BE86CE86DE86EE86FE870E871E872E873E874E875E876E877E878E879E87AF6CEE87BE87CE87DE87EE880E881E882E883E884E885E886E887E888E889E88AE88BE88CE88DE88EE88FE890E891E892E893E894EEC4EEC5EEC6D5EBB6A4EEC8EEC7EEC9EECAC7A5EECBEECCE895B7B0B5F6EECDEECFE896EECEE897B8C6EED0EED1EED2B6DBB3AED6D3C4C6B1B5B8D6EED3EED4D4BFC7D5BEFBCED9B9B3EED6EED5EED8EED7C5A5EED9EEDAC7AEEEDBC7AFEEDCB2A7EEDDEEDEEEDFEEE0EEE1D7EAEEE2EEE3BCD8EEE4D3CBCCFAB2ACC1E5EEE5C7A6C3ADE898EEE6EEE7EEE8EEE9EEEAEEEBEEECE899EEEDEEEEEEEFE89AE89BEEF0EEF1EEF2EEF4EEF3E89CEEF5CDADC2C1EEF6EEF7EEF8D5A1EEF9CFB3EEFAEEFBE89DEEFCEEFDEFA1EEFEEFA2B8F5C3FAEFA3EFA4BDC2D2BFB2F9EFA5EFA6EFA7D2F8EFA8D6FDEFA9C6CCE89EEFAAEFABC1B4EFACCFFACBF8EFAEEFADB3FAB9F8EFAFEFB0D0E2EFB1EFB2B7E6D0BFEFB3EFB4EFB5C8F1CCE0EFB6EFB7EFB8EFB9EFBAD5E0EFBBB4EDC3AAEFBCE89FEFBDEFBEEFBFE8A0CEFDEFC0C2E0B4B8D7B6BDF5E940CFC7EFC3EFC1EFC2EFC4B6A7BCFCBEE2C3CCEFC5EFC6E941EFC7EFCFEFC8EFC9EFCAC7C2EFF1B6CDEFCBE942EFCCEFCDB6C6C3BEEFCEE943EFD0EFD1EFD2D5F2E944EFD3C4F7E945EFD4C4F8EFD5EFD6B8E4B0F7EFD7EFD8EFD9E946EFDAEFDBEFDCEFDDE947EFDEBEB5EFE1EFDFEFE0E948EFE2EFE3C1CDEFE4EFE5EFE6EFE7EFE8EFE9EFEAEFEBEFECC0D8E949EFEDC1ADEFEEEFEFEFF0E94AE94BCFE2E94CE94DE94EE94FE950E951E952E953B3A4E954E955E956E957E958E959E95AE95BE95CE95DE95EE95FE960E961E962E963E964E965E966E967E968E969E96AE96BE96CE96DE96EE96FE970E971E972E973E974E975E976E977E978E979E97AE97BE97CE97DE97EE980E981E982E983E984E985E986E987E988E989E98AE98BE98CE98DE98EE98FE990E991E992E993E994E995E996E997E998E999E99AE99BE99CE99DE99EE99FE9A0EA40EA41EA42EA43EA44EA45EA46EA47EA48EA49EA4AEA4BEA4CEA4DEA4EEA4FEA50EA51EA52EA53EA54EA55EA56EA57EA58EA59EA5AEA5BC3C5E3C5C9C1E3C6EA5CB1D5CECAB4B3C8F2E3C7CFD0E3C8BCE4E3C9E3CAC3C6D5A2C4D6B9EBCEC5E3CBC3F6E3CCEA5DB7A7B8F3BAD2E3CDE3CED4C4E3CFEA5EE3D0D1CBE3D1E3D2E3D3E3D4D1D6E3D5B2FBC0BBE3D6EA5FC0ABE3D7E3D8E3D9EA60E3DAE3DBEA61B8B7DAE2EA62B6D3EA63DAE4DAE3EA64EA65EA66EA67EA68EA69EA6ADAE6EA6BEA6CEA6DC8EEEA6EEA6FDAE5B7C0D1F4D2F5D5F3BDD7EA70EA71EA72EA73D7E8DAE8DAE7EA74B0A2CDD3EA75DAE9EA76B8BDBCCAC2BDC2A4B3C2DAEAEA77C2AAC4B0BDB5EA78EA79CFDEEA7AEA7BEA7CDAEBC9C2EA7DEA7EEA80EA81EA82B1DDEA83EA84EA85DAECEA86B6B8D4BAEA87B3FDEA88EA89DAEDD4C9CFD5C5E3EA8ADAEEEA8BEA8CEA8DEA8EEA8FDAEFEA90DAF0C1EACCD5CFDDEA91EA92EA93EA94EA95EA96EA97EA98EA99EA9AEA9BEA9CEA9DD3E7C2A1EA9EDAF1EA9FEAA0CBE5EB40DAF2EB41CBE6D2FEEB42EB43EB44B8F4EB45EB46DAF3B0AFCFB6EB47EB48D5CFEB49EB4AEB4BEB4CEB4DEB4EEB4FEB50EB51EB52CBEDEB53EB54EB55EB56EB57EB58EB59EB5ADAF4EB5BEB5CE3C4EB5DEB5EC1A5EB5FEB60F6BFEB61EB62F6C0F6C1C4D1EB63C8B8D1E3EB64EB65D0DBD1C5BCAFB9CDEB66EFF4EB67EB68B4C6D3BAF6C2B3FBEB69EB6AF6C3EB6BEB6CB5F1EB6DEB6EEB6FEB70EB71EB72EB73EB74EB75EB76F6C5EB77EB78EB79EB7AEB7BEB7CEB7DD3EAF6A7D1A9EB7EEB80EB81EB82F6A9EB83EB84EB85F6A8EB86EB87C1E3C0D7EB88B1A2EB89EB8AEB8BEB8CCEEDEB8DD0E8F6ABEB8EEB8FCFF6EB90F6AAD5F0F6ACC3B9EB91EB92EB93BBF4F6AEF6ADEB94EB95EB96C4DEEB97EB98C1D8EB99EB9AEB9BEB9CEB9DCBAAEB9ECFBCEB9FEBA0EC40EC41EC42EC43EC44EC45EC46EC47EC48F6AFEC49EC4AF6B0EC4BEC4CF6B1EC4DC2B6EC4EEC4FEC50EC51EC52B0D4C5F9EC53EC54EC55EC56F6B2EC57EC58EC59EC5AEC5BEC5CEC5DEC5EEC5FEC60EC61EC62EC63EC64EC65EC66EC67EC68EC69C7E0F6A6EC6AEC6BBEB8EC6CEC6DBEB2EC6EB5E5EC6FEC70B7C7EC71BFBFC3D2C3E6EC72EC73D8CCEC74EC75EC76B8EFEC77EC78EC79EC7AEC7BEC7CEC7DEC7EEC80BDF9D1A5EC81B0D0EC82EC83EC84EC85EC86F7B0EC87EC88EC89EC8AEC8BEC8CEC8DEC8EF7B1EC8FEC90EC91EC92EC93D0ACEC94B0B0EC95EC96EC97F7B2F7B3EC98F7B4EC99EC9AEC9BC7CAEC9CEC9DEC9EEC9FECA0ED40ED41BECFED42ED43F7B7ED44ED45ED46ED47ED48ED49ED4AF7B6ED4BB1DEED4CF7B5ED4DED4EF7B8ED4FF7B9ED50ED51ED52ED53ED54ED55ED56ED57ED58ED59ED5AED5BED5CED5DED5EED5FED60ED61ED62ED63ED64ED65ED66ED67ED68ED69ED6AED6BED6CED6DED6EED6FED70ED71ED72ED73ED74ED75ED76ED77ED78ED79ED7AED7BED7CED7DED7EED80ED81CEA4C8CDED82BAABE8B8E8B9E8BABEC2ED83ED84ED85ED86ED87D2F4ED88D4CFC9D8ED89ED8AED8BED8CED8DED8EED8FED90ED91ED92ED93ED94ED95ED96ED97ED98ED99ED9AED9BED9CED9DED9EED9FEDA0EE40EE41EE42EE43EE44EE45EE46EE47EE48EE49EE4AEE4BEE4CEE4DEE4EEE4FEE50EE51EE52EE53EE54EE55EE56EE57EE58EE59EE5AEE5BEE5CEE5DEE5EEE5FEE60EE61EE62EE63EE64EE65EE66EE67EE68EE69EE6AEE6BEE6CEE6DEE6EEE6FEE70EE71EE72EE73EE74EE75EE76EE77EE78EE79EE7AEE7BEE7CEE7DEE7EEE80EE81EE82EE83EE84EE85EE86EE87EE88EE89EE8AEE8BEE8CEE8DEE8EEE8FEE90EE91EE92EE93EE94EE95EE96EE97EE98EE99EE9AEE9BEE9CEE9DEE9EEE9FEEA0EF40EF41EF42EF43EF44EF45D2B3B6A5C7EAF1FCCFEECBB3D0EBE7EFCDE7B9CBB6D9F1FDB0E4CBCCF1FED4A4C2ADC1ECC6C4BEB1F2A1BCD5EF46F2A2F2A3EF47F2A4D2C3C6B5EF48CDC7F2A5EF49D3B1BFC5CCE2EF4AF2A6F2A7D1D5B6EEF2A8F2A9B5DFF2AAF2ABEF4BB2FCF2ACF2ADC8A7EF4CEF4DEF4EEF4FEF50EF51EF52EF53EF54EF55EF56EF57EF58EF59EF5AEF5BEF5CEF5DEF5EEF5FEF60EF61EF62EF63EF64EF65EF66EF67EF68EF69EF6AEF6BEF6CEF6DEF6EEF6FEF70EF71B7E7EF72EF73ECA9ECAAECABEF74ECACEF75EF76C6AEECADECAEEF77EF78EF79B7C9CAB3EF7AEF7BEF7CEF7DEF7EEF80EF81E2B8F7CFEF82EF83EF84EF85EF86EF87EF88EF89EF8AEF8BEF8CEF8DEF8EEF8FEF90EF91EF92EF93EF94EF95EF96EF97EF98EF99EF9AEF9BEF9CEF9DEF9EEF9FEFA0F040F041F042F043F044F7D0F045F046B2CDF047F048F049F04AF04BF04CF04DF04EF04FF050F051F052F053F054F055F056F057F058F059F05AF05BF05CF05DF05EF05FF060F061F062F063F7D1F064F065F066F067F068F069F06AF06BF06CF06DF06EF06FF070F071F072F073F074F075F076F077F078F079F07AF07BF07CF07DF07EF080F081F082F083F084F085F086F087F088F089F7D3F7D2F08AF08BF08CF08DF08EF08FF090F091F092F093F094F095F096E2BBF097BCA2F098E2BCE2BDE2BEE2BFE2C0E2C1B7B9D2FBBDA4CACEB1A5CBC7F099E2C2B6FCC8C4E2C3F09AF09BBDC8F09CB1FDE2C4F09DB6F6E2C5C4D9F09EF09FE2C6CFDAB9DDE2C7C0A1F0A0E2C8B2F6F140E2C9F141C1F3E2CAE2CBC2F8E2CCE2CDE2CECAD7D8B8D9E5CFE3F142F143F144F145F146F147F148F149F14AF14BF14CF0A5F14DF14EDCB0F14FF150F151F152F153F154F155F156F157F158F159F15AF15BF15CF15DF15EF15FF160F161F162F163F164F165F166F167F168F169F16AF16BF16CF16DF16EF16FF170F171F172F173F174F175F176F177F178F179F17AF17BF17CF17DF17EF180F181F182F183F184F185F186F187F188F189F18AF18BF18CF18DF18EF18FF190F191F192F193F194F195F196F197F198F199F19AF19BF19CF19DF19EF19FF1A0F240F241F242F243F244F245F246F247F248F249F24AF24BF24CF24DF24EF24FF250F251F252F253F254F255F256F257F258F259F25AF25BF25CF25DF25EF25FF260F261F262F263F264F265F266F267F268F269F26AF26BF26CF26DF26EF26FF270F271F272F273F274F275F276F277F278F279F27AF27BF27CF27DF27EF280F281F282F283F284F285F286F287F288F289F28AF28BF28CF28DF28EF28FF290F291F292F293F294F295F296F297F298F299F29AF29BF29CF29DF29EF29FF2A0F340F341F342F343F344F345F346F347F348F349F34AF34BF34CF34DF34EF34FF350F351C2EDD4A6CDD4D1B1B3DBC7FDF352B2B5C2BFE6E0CABBE6E1E6E2BED4E6E3D7A4CDD5E6E5BCDDE6E4E6E6E6E7C2EEF353BDBEE6E8C2E6BAA7E6E9F354E6EAB3D2D1E9F355F356BFA5E6EBC6EFE6ECE6EDF357F358E6EEC6ADE6EFF359C9A7E6F0E6F1E6F2E5B9E6F3E6F4C2E2E6F5E6F6D6E8E6F7F35AE6F8B9C7F35BF35CF35DF35EF35FF360F361F7BBF7BAF362F363F364F365F7BEF7BCBAA1F366F7BFF367F7C0F368F369F36AF7C2F7C1F7C4F36BF36CF7C3F36DF36EF36FF370F371F7C5F7C6F372F373F374F375F7C7F376CBE8F377F378F379F37AB8DFF37BF37CF37DF37EF380F381F7D4F382F7D5F383F384F385F386F7D6F387F388F389F38AF7D8F38BF7DAF38CF7D7F38DF38EF38FF390F391F392F393F394F395F7DBF396F7D9F397F398F399F39AF39BF39CF39DD7D7F39EF39FF3A0F440F7DCF441F442F443F444F445F446F7DDF447F448F449F7DEF44AF44BF44CF44DF44EF44FF450F451F452F453F454F7DFF455F456F457F7E0F458F459F45AF45BF45CF45DF45EF45FF460F461F462DBCBF463F464D8AAF465F466F467F468F469F46AF46BF46CE5F7B9EDF46DF46EF46FF470BFFDBBEAF7C9C6C7F7C8F471F7CAF7CCF7CBF472F473F474F7CDF475CEBAF476F7CEF477F478C4A7F479F47AF47BF47CF47DF47EF480F481F482F483F484F485F486F487F488F489F48AF48BF48CF48DF48EF48FF490F491F492F493F494F495F496F497F498F499F49AF49BF49CF49DF49EF49FF4A0F540F541F542F543F544F545F546F547F548F549F54AF54BF54CF54DF54EF54FF550F551F552F553F554F555F556F557F558F559F55AF55BF55CF55DF55EF55FF560F561F562F563F564F565F566F567F568F569F56AF56BF56CF56DF56EF56FF570F571F572F573F574F575F576F577F578F579F57AF57BF57CF57DF57EF580F581F582F583F584F585F586F587F588F589F58AF58BF58CF58DF58EF58FF590F591F592F593F594F595F596F597F598F599F59AF59BF59CF59DF59EF59FF5A0F640F641F642F643F644F645F646F647F648F649F64AF64BF64CF64DF64EF64FF650F651F652F653F654F655F656F657F658F659F65AF65BF65CF65DF65EF65FF660F661F662F663F664F665F666F667F668F669F66AF66BF66CF66DF66EF66FF670F671F672F673F674F675F676F677F678F679F67AF67BF67CF67DF67EF680F681F682F683F684F685F686F687F688F689F68AF68BF68CF68DF68EF68FF690F691F692F693F694F695F696F697F698F699F69AF69BF69CF69DF69EF69FF6A0F740F741F742F743F744F745F746F747F748F749F74AF74BF74CF74DF74EF74FF750F751F752F753F754F755F756F757F758F759F75AF75BF75CF75DF75EF75FF760F761F762F763F764F765F766F767F768F769F76AF76BF76CF76DF76EF76FF770F771F772F773F774F775F776F777F778F779F77AF77BF77CF77DF77EF780D3E3F781F782F6CFF783C2B3F6D0F784F785F6D1F6D2F6D3F6D4F786F787F6D6F788B1ABF6D7F789F6D8F6D9F6DAF78AF6DBF6DCF78BF78CF78DF78EF6DDF6DECFCAF78FF6DFF6E0F6E1F6E2F6E3F6E4C0F0F6E5F6E6F6E7F6E8F6E9F790F6EAF791F6EBF6ECF792F6EDF6EEF6EFF6F0F6F1F6F2F6F3F6F4BEA8F793F6F5F6F6F6F7F6F8F794F795F796F797F798C8FAF6F9F6FAF6FBF6FCF799F79AF6FDF6FEF7A1F7A2F7A3F7A4F7A5F79BF79CF7A6F7A7F7A8B1EEF7A9F7AAF7ABF79DF79EF7ACF7ADC1DBF7AEF79FF7A0F7AFF840F841F842F843F844F845F846F847F848F849F84AF84BF84CF84DF84EF84FF850F851F852F853F854F855F856F857F858F859F85AF85BF85CF85DF85EF85FF860F861F862F863F864F865F866F867F868F869F86AF86BF86CF86DF86EF86FF870F871F872F873F874F875F876F877F878F879F87AF87BF87CF87DF87EF880F881F882F883F884F885F886F887F888F889F88AF88BF88CF88DF88EF88FF890F891F892F893F894F895F896F897F898F899F89AF89BF89CF89DF89EF89FF8A0F940F941F942F943F944F945F946F947F948F949F94AF94BF94CF94DF94EF94FF950F951F952F953F954F955F956F957F958F959F95AF95BF95CF95DF95EF95FF960F961F962F963F964F965F966F967F968F969F96AF96BF96CF96DF96EF96FF970F971F972F973F974F975F976F977F978F979F97AF97BF97CF97DF97EF980F981F982F983F984F985F986F987F988F989F98AF98BF98CF98DF98EF98FF990F991F992F993F994F995F996F997F998F999F99AF99BF99CF99DF99EF99FF9A0FA40FA41FA42FA43FA44FA45FA46FA47FA48FA49FA4AFA4BFA4CFA4DFA4EFA4FFA50FA51FA52FA53FA54FA55FA56FA57FA58FA59FA5AFA5BFA5CFA5DFA5EFA5FFA60FA61FA62FA63FA64FA65FA66FA67FA68FA69FA6AFA6BFA6CFA6DFA6EFA6FFA70FA71FA72FA73FA74FA75FA76FA77FA78FA79FA7AFA7BFA7CFA7DFA7EFA80FA81FA82FA83FA84FA85FA86FA87FA88FA89FA8AFA8BFA8CFA8DFA8EFA8FFA90FA91FA92FA93FA94FA95FA96FA97FA98FA99FA9AFA9BFA9CFA9DFA9EFA9FFAA0FB40FB41FB42FB43FB44FB45FB46FB47FB48FB49FB4AFB4BFB4CFB4DFB4EFB4FFB50FB51FB52FB53FB54FB55FB56FB57FB58FB59FB5AFB5BC4F1F0AFBCA6F0B0C3F9FB5CC5B8D1BBFB5DF0B1F0B2F0B3F0B4F0B5D1BCFB5ED1ECFB5FF0B7F0B6D4A7FB60CDD2F0B8F0BAF0B9F0BBF0BCFB61FB62B8EBF0BDBAE8FB63F0BEF0BFBEE9F0C0B6ECF0C1F0C2F0C3F0C4C8B5F0C5F0C6FB64F0C7C5F4FB65F0C8FB66FB67FB68F0C9FB69F0CAF7BDFB6AF0CBF0CCF0CDFB6BF0CEFB6CFB6DFB6EFB6FF0CFBAD7FB70F0D0F0D1F0D2F0D3F0D4F0D5F0D6F0D8FB71FB72D3A5F0D7FB73F0D9FB74FB75FB76FB77FB78FB79FB7AFB7BFB7CFB7DF5BAC2B9FB7EFB80F7E4FB81FB82FB83FB84F7E5F7E6FB85FB86F7E7FB87FB88FB89FB8AFB8BFB8CF7E8C2B4FB8DFB8EFB8FFB90FB91FB92FB93FB94FB95F7EAFB96F7EBFB97FB98FB99FB9AFB9BFB9CC2F3FB9DFB9EFB9FFBA0FC40FC41FC42FC43FC44FC45FC46FC47FC48F4F0FC49FC4AFC4BF4EFFC4CFC4DC2E9FC4EF7E1F7E2FC4FFC50FC51FC52FC53BBC6FC54FC55FC56FC57D9E4FC58FC59FC5ACAF2C0E8F0A4FC5BBADAFC5CFC5DC7ADFC5EFC5FFC60C4ACFC61FC62F7ECF7EDF7EEFC63F7F0F7EFFC64F7F1FC65FC66F7F4FC67F7F3FC68F7F2F7F5FC69FC6AFC6BFC6CF7F6FC6DFC6EFC6FFC70FC71FC72FC73FC74FC75EDE9FC76EDEAEDEBFC77F6BCFC78FC79FC7AFC7BFC7CFC7DFC7EFC80FC81FC82FC83FC84F6BDFC85F6BEB6A6FC86D8BEFC87FC88B9C4FC89FC8AFC8BD8BBFC8CDCB1FC8DFC8EFC8FFC90FC91FC92CAF3FC93F7F7FC94FC95FC96FC97FC98FC99FC9AFC9BFC9CF7F8FC9DFC9EF7F9FC9FFCA0FD40FD41FD42FD43FD44F7FBFD45F7FAFD46B1C7FD47F7FCF7FDFD48FD49FD4AFD4BFD4CF7FEFD4DFD4EFD4FFD50FD51FD52FD53FD54FD55FD56FD57C6EBECB4FD58FD59FD5AFD5BFD5CFD5DFD5EFD5FFD60FD61FD62FD63FD64FD65FD66FD67FD68FD69FD6AFD6BFD6CFD6DFD6EFD6FFD70FD71FD72FD73FD74FD75FD76FD77FD78FD79FD7AFD7BFD7CFD7DFD7EFD80FD81FD82FD83FD84FD85B3DDF6B3FD86FD87F6B4C1E4F6B5F6B6F6B7F6B8F6B9F6BAC8A3F6BBFD88FD89FD8AFD8BFD8CFD8DFD8EFD8FFD90FD91FD92FD93C1FAB9A8EDE8FD94FD95FD96B9EAD9DFFD97FD98FD99FD9AFD9';
	            $("#similarBut").click( function () {
	                var icon = encodeURI(encodeToGb2312($('#w').val()));
	                $(this).attr("href","//z.hc360.com/p4psearch/search.html?key=" + icon );

	            });
	        }

	    };

	    $(function() {

	        new Commodity().init();

	        //点击发送到我的手机加载contact_msgDownload这个js
	        HC.HUB.addScript('//style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js'); //发送手机功能js

	    })
	})(jQuery);


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v1.9.1
	 * //jquery.com/
	 *
	 * Includes Sizzle.js
	 * //sizzlejs.com/
	 *
	 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * //jquery.org/license
	 *
	 * Date: 2013-2-4
	 */
	(function(window, undefined) {

		// Can't do this because several apps including ASP.NET trace
		// the stack via arguments.caller.callee and Firefox dies if
		// you try to trace through "use strict" call chains. (#13335)
		// Support: Firefox 18+
		//"use strict";
		var
		// The deferred used on DOM ready
			readyList,

			// A central reference to the root jQuery(document)
			rootjQuery,

			// Support: IE<9
			// For `typeof node.method` instead of `node.method !== undefined`
			core_strundefined = typeof undefined,

			// Use the correct document accordingly with window argument (sandbox)
			document = window.document,
			location = window.location,

			// Map over jQuery in case of overwrite
			_jQuery = window.jQuery,

			// Map over the $ in case of overwrite
			_$ = window.$,

			// [[Class]] -> type pairs
			class2type = {},

			// List of deleted data cache ids, so we can reuse them
			core_deletedIds = [],

			core_version = "1.9.1",

			// Save a reference to some core methods
			core_concat = core_deletedIds.concat,
			core_push = core_deletedIds.push,
			core_slice = core_deletedIds.slice,
			core_indexOf = core_deletedIds.indexOf,
			core_toString = class2type.toString,
			core_hasOwn = class2type.hasOwnProperty,
			core_trim = core_version.trim,

			// Define a local copy of jQuery
			jQuery = function(selector, context) {
				// The jQuery object is actually just the init constructor 'enhanced'
				return new jQuery.fn.init(selector, context, rootjQuery);
			},

			// Used for matching numbers
			core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

			// Used for splitting on whitespace
			core_rnotwhite = /\S+/g,

			// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
			rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

			// A simple way to check for HTML strings
			// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
			// Strict HTML recognition (#11290: must start with <)
			rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

			// Match a standalone tag
			rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

			// JSON RegExp
			rvalidchars = /^[\],:{}\s]*$/,
			rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
			rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

			// Matches dashed string for camelizing
			rmsPrefix = /^-ms-/,
			rdashAlpha = /-([\da-z])/gi,

			// Used by jQuery.camelCase as callback to replace()
			fcamelCase = function(all, letter) {
				return letter.toUpperCase();
			},

			// The ready event handler
			completed = function(event) {

				// readyState === "complete" is good enough for us to call the dom ready in oldIE
				if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
					detach();
					jQuery.ready();
				}
			},
			// Clean-up method for dom ready events
			detach = function() {
				if (document.addEventListener) {
					document.removeEventListener("DOMContentLoaded", completed, false);
					window.removeEventListener("load", completed, false);

				} else {
					document.detachEvent("onreadystatechange", completed);
					window.detachEvent("onload", completed);
				}
			};

		jQuery.fn = jQuery.prototype = {
			// The current version of jQuery being used
			jquery: core_version,

			constructor: jQuery,
			init: function(selector, context, rootjQuery) {
				var match, elem;

				// HANDLE: $(""), $(null), $(undefined), $(false)
				if (!selector) {
					return this;
				}

				// Handle HTML strings
				if (typeof selector === "string") {
					if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
						// Assume that strings that start and end with <> are HTML and skip the regex check
						match = [null, selector, null];

					} else {
						match = rquickExpr.exec(selector);
					}

					// Match html or make sure no context is specified for #id
					if (match && (match[1] || !context)) {

						// HANDLE: $(html) -> $(array)
						if (match[1]) {
							context = context instanceof jQuery ? context[0] : context;

							// scripts is true for back-compat
							jQuery.merge(this, jQuery.parseHTML(
								match[1],
								context && context.nodeType ? context.ownerDocument || context : document,
								true
							));

							// HANDLE: $(html, props)
							if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
								for (match in context) {
									// Properties of context are called as methods if possible
									if (jQuery.isFunction(this[match])) {
										this[match](context[match]);

										// ...and otherwise set as attributes
									} else {
										this.attr(match, context[match]);
									}
								}
							}

							return this;

							// HANDLE: $(#id)
						} else {
							elem = document.getElementById(match[2]);

							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							if (elem && elem.parentNode) {
								// Handle the case where IE and Opera return items
								// by name instead of ID
								if (elem.id !== match[2]) {
									return rootjQuery.find(selector);
								}

								// Otherwise, we inject the element directly into the jQuery object
								this.length = 1;
								this[0] = elem;
							}

							this.context = document;
							this.selector = selector;
							return this;
						}

						// HANDLE: $(expr, $(...))
					} else if (!context || context.jquery) {
						return (context || rootjQuery).find(selector);

						// HANDLE: $(expr, context)
						// (which is just equivalent to: $(context).find(expr)
					} else {
						return this.constructor(context).find(selector);
					}

					// HANDLE: $(DOMElement)
				} else if (selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this;

					// HANDLE: $(function)
					// Shortcut for document ready
				} else if (jQuery.isFunction(selector)) {
					return rootjQuery.ready(selector);
				}

				if (selector.selector !== undefined) {
					this.selector = selector.selector;
					this.context = selector.context;
				}

				return jQuery.makeArray(selector, this);
			},

			// Start with an empty selector
			selector: "",

			// The default length of a jQuery object is 0
			length: 0,

			// The number of elements contained in the matched element set
			size: function() {
				return this.length;
			},

			toArray: function() {
				return core_slice.call(this);
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function(num) {
				return num == null ?

					// Return a 'clean' array
					this.toArray() :

					// Return just the object
					(num < 0 ? this[this.length + num] : this[num]);
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
			pushStack: function(elems) {

				// Build a new jQuery matched element set
				var ret = jQuery.merge(this.constructor(), elems);

				// Add the old object onto the stack (as a reference)
				ret.prevObject = this;
				ret.context = this.context;

				// Return the newly-formed element set
				return ret;
			},

			// Execute a callback for every element in the matched set.
			// (You can seed the arguments with an array of args, but this is
			// only used internally.)
			each: function(callback, args) {
				return jQuery.each(this, callback, args);
			},

			ready: function(fn) {
				// Add the callback
				jQuery.ready.promise().done(fn);

				return this;
			},

			slice: function() {
				return this.pushStack(core_slice.apply(this, arguments));
			},

			first: function() {
				return this.eq(0);
			},

			last: function() {
				return this.eq(-1);
			},

			eq: function(i) {
				var len = this.length,
					j = +i + (i < 0 ? len : 0);
				return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
			},

			map: function(callback) {
				return this.pushStack(jQuery.map(this, function(elem, i) {
					return callback.call(elem, i, elem);
				}));
			},

			end: function() {
				return this.prevObject || this.constructor(null);
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: core_push,
			sort: [].sort,
			splice: [].splice
		};

		// Give the init function the jQuery prototype for later instantiation
		jQuery.fn.init.prototype = jQuery.fn;

		jQuery.extend = jQuery.fn.extend = function() {
			var src, copyIsArray, copy, name, options, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// extend jQuery itself if only one argument is passed
			if (length === i) {
				target = this;
				--i;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];

							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = jQuery.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.extend({
			noConflict: function(deep) {
				if (window.$ === jQuery) {
					window.$ = _$;
				}

				if (deep && window.jQuery === jQuery) {
					window.jQuery = _jQuery;
				}

				return jQuery;
			},

			// Is the DOM ready to be used? Set to true once it occurs.
			isReady: false,

			// A counter to track how many items to wait for before
			// the ready event fires. See #6781
			readyWait: 1,

			// Hold (or release) the ready event
			holdReady: function(hold) {
				if (hold) {
					jQuery.readyWait++;
				} else {
					jQuery.ready(true);
				}
			},

			// Handle when the DOM is ready
			ready: function(wait) {

				// Abort if there are pending holds or we're already ready
				if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
					return;
				}

				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if (!document.body) {
					return setTimeout(jQuery.ready);
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If a normal DOM Ready event fired, decrement, and wait if need be
				if (wait !== true && --jQuery.readyWait > 0) {
					return;
				}

				// If there are functions bound, to execute
				readyList.resolveWith(document, [jQuery]);

				// Trigger any bound ready events
				if (jQuery.fn.trigger) {
					jQuery(document).trigger("ready").off("ready");
				}
			},

			// See test/unit/core.js for details concerning isFunction.
			// Since version 1.3, DOM methods and functions like alert
			// aren't supported. They return false on IE (#2968).
			isFunction: function(obj) {
				return jQuery.type(obj) === "function";
			},

			isArray: Array.isArray || function(obj) {
				return jQuery.type(obj) === "array";
			},

			isWindow: function(obj) {
				return obj != null && obj == obj.window;
			},

			isNumeric: function(obj) {
				return !isNaN(parseFloat(obj)) && isFinite(obj);
			},

			type: function(obj) {
				if (obj == null) {
					return String(obj);
				}
				return typeof obj === "object" || typeof obj === "function" ?
					class2type[core_toString.call(obj)] || "object" :
					typeof obj;
			},

			isPlainObject: function(obj) {
				// Must be an Object.
				// Because of IE, we also have to check the presence of the constructor property.
				// Make sure that DOM nodes and window objects don't pass through, as well
				if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
					return false;
				}

				try {
					// Not own constructor property must be Object
					if (obj.constructor &&
						!core_hasOwn.call(obj, "constructor") &&
						!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
						return false;
					}
				} catch (e) {
					// IE8,9 Will throw exceptions on certain host objects #9897
					return false;
				}

				// Own properties are enumerated firstly, so to speed up,
				// if last one is own, then all properties are own.

				var key;
				for (key in obj) {}

				return key === undefined || core_hasOwn.call(obj, key);
			},

			isEmptyObject: function(obj) {
				var name;
				for (name in obj) {
					return false;
				}
				return true;
			},

			error: function(msg) {
				throw new Error(msg);
			},

			// data: string of html
			// context (optional): If specified, the fragment will be created in this context, defaults to document
			// keepScripts (optional): If true, will include scripts passed in the html string
			parseHTML: function(data, context, keepScripts) {
				if (!data || typeof data !== "string") {
					return null;
				}
				if (typeof context === "boolean") {
					keepScripts = context;
					context = false;
				}
				context = context || document;

				var parsed = rsingleTag.exec(data),
					scripts = !keepScripts && [];

				// Single tag
				if (parsed) {
					return [context.createElement(parsed[1])];
				}

				parsed = jQuery.buildFragment([data], context, scripts);
				if (scripts) {
					jQuery(scripts).remove();
				}
				return jQuery.merge([], parsed.childNodes);
			},

			parseJSON: function(data) {
				// Attempt to parse using the native JSON parser first
				if (window.JSON && window.JSON.parse) {
					return window.JSON.parse(data);
				}

				if (data === null) {
					return data;
				}

				if (typeof data === "string") {

					// Make sure leading/trailing whitespace is removed (IE can't handle it)
					data = jQuery.trim(data);

					if (data) {
						// Make sure the incoming data is actual JSON
						// Logic borrowed from //json.org/json2.js
						if (rvalidchars.test(data.replace(rvalidescape, "@")
								.replace(rvalidtokens, "]")
								.replace(rvalidbraces, ""))) {

							return (new Function("return " + data))();
						}
					}
				}

				jQuery.error("Invalid JSON: " + data);
			},

			// Cross-browser xml parsing
			parseXML: function(data) {
				var xml, tmp;
				if (!data || typeof data !== "string") {
					return null;
				}
				try {
					if (window.DOMParser) { // Standard
						tmp = new DOMParser();
						xml = tmp.parseFromString(data, "text/xml");
					} else { // IE
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = "false";
						xml.loadXML(data);
					}
				} catch (e) {
					xml = undefined;
				}
				if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
					jQuery.error("Invalid XML: " + data);
				}
				return xml;
			},

			noop: function() {},

			// Evaluates a script in a global context
			// Workarounds based on findings by Jim Driscoll
			// //weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
			globalEval: function(data) {
				if (data && jQuery.trim(data)) {
					// We use execScript on Internet Explorer
					// We use an anonymous function so that context is window
					// rather than jQuery in Firefox
					(window.execScript || function(data) {
						window["eval"].call(window, data);
					})(data);
				}
			},

			// Convert dashed to camelCase; used by the css and data modules
			// Microsoft forgot to hump their vendor prefix (#9572)
			camelCase: function(string) {
				return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
			},

			nodeName: function(elem, name) {
				return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
			},

			// args is for internal usage only
			each: function(obj, callback, args) {
				var value,
					i = 0,
					length = obj.length,
					isArray = isArraylike(obj);

				if (args) {
					if (isArray) {
						for (; i < length; i++) {
							value = callback.apply(obj[i], args);

							if (value === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							value = callback.apply(obj[i], args);

							if (value === false) {
								break;
							}
						}
					}

					// A special, fast, case for the most common use of each
				} else {
					if (isArray) {
						for (; i < length; i++) {
							value = callback.call(obj[i], i, obj[i]);

							if (value === false) {
								break;
							}
						}
					} else {
						for (i in obj) {
							value = callback.call(obj[i], i, obj[i]);

							if (value === false) {
								break;
							}
						}
					}
				}

				return obj;
			},

			// Use native String.trim function wherever possible
			trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
				function(text) {
					return text == null ?
						"" :
						core_trim.call(text);
				} :

				// Otherwise use our own trimming functionality
				function(text) {
					return text == null ?
						"" :
						(text + "").replace(rtrim, "");
				},

			// results is for internal usage only
			makeArray: function(arr, results) {
				var ret = results || [];

				if (arr != null) {
					if (isArraylike(Object(arr))) {
						jQuery.merge(ret,
							typeof arr === "string" ?
							[arr] : arr
						);
					} else {
						core_push.call(ret, arr);
					}
				}

				return ret;
			},

			inArray: function(elem, arr, i) {
				var len;

				if (arr) {
					if (core_indexOf) {
						return core_indexOf.call(arr, elem, i);
					}

					len = arr.length;
					i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

					for (; i < len; i++) {
						// Skip accessing in sparse arrays
						if (i in arr && arr[i] === elem) {
							return i;
						}
					}
				}

				return -1;
			},

			merge: function(first, second) {
				var l = second.length,
					i = first.length,
					j = 0;

				if (typeof l === "number") {
					for (; j < l; j++) {
						first[i++] = second[j];
					}
				} else {
					while (second[j] !== undefined) {
						first[i++] = second[j++];
					}
				}

				first.length = i;

				return first;
			},

			grep: function(elems, callback, inv) {
				var retVal,
					ret = [],
					i = 0,
					length = elems.length;
				inv = !!inv;

				// Go through the array, only saving the items
				// that pass the validator function
				for (; i < length; i++) {
					retVal = !!callback(elems[i], i);
					if (inv !== retVal) {
						ret.push(elems[i]);
					}
				}

				return ret;
			},

			// arg is for internal usage only
			map: function(elems, callback, arg) {
				var value,
					i = 0,
					length = elems.length,
					isArray = isArraylike(elems),
					ret = [];

				// Go through the array, translating each of the items to their
				if (isArray) {
					for (; i < length; i++) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret[ret.length] = value;
						}
					}

					// Go through every key on the object,
				} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret[ret.length] = value;
						}
					}
				}

				// Flatten any nested arrays
				return core_concat.apply([], ret);
			},

			// A global GUID counter for objects
			guid: 1,

			// Bind a function to a context, optionally partially applying any
			// arguments.
			proxy: function(fn, context) {
				var args, proxy, tmp;

				if (typeof context === "string") {
					tmp = fn[context];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if (!jQuery.isFunction(fn)) {
					return undefined;
				}

				// Simulated bind
				args = core_slice.call(arguments, 2);
				proxy = function() {
					return fn.apply(context || this, args.concat(core_slice.call(arguments)));
				};

				// Set the guid of unique handler to the same of original handler, so it can be removed
				proxy.guid = fn.guid = fn.guid || jQuery.guid++;

				return proxy;
			},

			// Multifunctional method to get and set values of a collection
			// The value/s can optionally be executed if it's a function
			access: function(elems, fn, key, value, chainable, emptyGet, raw) {
				var i = 0,
					length = elems.length,
					bulk = key == null;

				// Sets many values
				if (jQuery.type(key) === "object") {
					chainable = true;
					for (i in key) {
						jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
					}

					// Sets one value
				} else if (value !== undefined) {
					chainable = true;

					if (!jQuery.isFunction(value)) {
						raw = true;
					}

					if (bulk) {
						// Bulk operations run against the entire set
						if (raw) {
							fn.call(elems, value);
							fn = null;

							// ...except when executing function values
						} else {
							bulk = fn;
							fn = function(elem, key, value) {
								return bulk.call(jQuery(elem), value);
							};
						}
					}

					if (fn) {
						for (; i < length; i++) {
							fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
						}
					}
				}

				return chainable ?
					elems :

					// Gets
					bulk ?
					fn.call(elems) :
					length ? fn(elems[0], key) : emptyGet;
			},

			now: function() {
				return (new Date()).getTime();
			}
		});

		jQuery.ready.promise = function(obj) {
			if (!readyList) {

				readyList = jQuery.Deferred();

				// Catch cases where $(document).ready() is called after the browser event has already occurred.
				// we once tried to use readyState "interactive" here, but it caused issues like the one
				// discovered by ChrisS here: //bugs.jquery.com/ticket/12282#comment:15
				if (document.readyState === "complete") {
					// Handle it asynchronously to allow scripts the opportunity to delay ready
					setTimeout(jQuery.ready);

					// Standards-based browsers support DOMContentLoaded
				} else if (document.addEventListener) {
					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", completed, false);

					// A fallback to window.onload, that will always work
					window.addEventListener("load", completed, false);

					// If IE event model is used
				} else {
					// Ensure firing before onload, maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", completed);

					// A fallback to window.onload, that will always work
					window.attachEvent("onload", completed);

					// If IE and not a frame
					// continually check to see if the document is ready
					var top = false;

					try {
						top = window.frameElement == null && document.documentElement;
					} catch (e) {}

					if (top && top.doScroll) {
						(function doScrollCheck() {
							if (!jQuery.isReady) {

								try {
									// Use the trick by Diego Perini
									// //javascript.nwbox.com/IEContentLoaded/
									top.doScroll("left");
								} catch (e) {
									return setTimeout(doScrollCheck, 50);
								}

								// detach all dom ready events
								detach();

								// and execute any waiting functions
								jQuery.ready();
							}
						})();
					}
				}
			}
			return readyList.promise(obj);
		};

		// Populate the class2type map
		jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

		function isArraylike(obj) {
			var length = obj.length,
				type = jQuery.type(obj);

			if (jQuery.isWindow(obj)) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}

			return type === "array" || type !== "function" &&
				(length === 0 ||
					typeof length === "number" && length > 0 && (length - 1) in obj);
		}

		// All jQuery objects should point back to these
		rootjQuery = jQuery(document);
		// String to Object options format cache
		var optionsCache = {};

		// Convert String-formatted options into Object-formatted ones and store in cache
		function createOptions(options) {
			var object = optionsCache[options] = {};
			jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
				object[flag] = true;
			});
			return object;
		}

		/*
		 * Create a callback list using the following parameters:
		 *
		 *	options: an optional list of space-separated options that will change how
		 *			the callback list behaves or a more traditional option object
		 *
		 * By default a callback list will act like an event callback list and can be
		 * "fired" multiple times.
		 *
		 * Possible options:
		 *
		 *	once:			will ensure the callback list can only be fired once (like a Deferred)
		 *
		 *	memory:			will keep track of previous values and will call any callback added
		 *					after the list has been fired right away with the latest "memorized"
		 *					values (like a Deferred)
		 *
		 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
		 *
		 *	stopOnFalse:	interrupt callings when a callback returns false
		 *
		 */
		jQuery.Callbacks = function(options) {

			// Convert options from String-formatted to Object-formatted if needed
			// (we check in cache first)
			options = typeof options === "string" ?
				(optionsCache[options] || createOptions(options)) :
				jQuery.extend({}, options);

			var // Flag to know if list is currently firing
				firing,
				// Last fire value (for non-forgettable lists)
				memory,
				// Flag to know if list was already fired
				fired,
				// End of the loop when firing
				firingLength,
				// Index of currently firing callback (modified by remove if needed)
				firingIndex,
				// First callback to fire (used internally by add and fireWith)
				firingStart,
				// Actual callback list
				list = [],
				// Stack of fire calls for repeatable lists
				stack = !options.once && [],
				// Fire callbacks
				fire = function(data) {
					memory = options.memory && data;
					fired = true;
					firingIndex = firingStart || 0;
					firingStart = 0;
					firingLength = list.length;
					firing = true;
					for (; list && firingIndex < firingLength; firingIndex++) {
						if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
							memory = false; // To prevent further calls using add
							break;
						}
					}
					firing = false;
					if (list) {
						if (stack) {
							if (stack.length) {
								fire(stack.shift());
							}
						} else if (memory) {
							list = [];
						} else {
							self.disable();
						}
					}
				},
				// Actual Callbacks object
				self = {
					// Add a callback or a collection of callbacks to the list
					add: function() {
						if (list) {
							// First, we save the current length
							var start = list.length;
							(function add(args) {
								jQuery.each(args, function(_, arg) {
									var type = jQuery.type(arg);
									if (type === "function") {
										if (!options.unique || !self.has(arg)) {
											list.push(arg);
										}
									} else if (arg && arg.length && type !== "string") {
										// Inspect recursively
										add(arg);
									}
								});
							})(arguments);
							// Do we need to add the callbacks to the
							// current firing batch?
							if (firing) {
								firingLength = list.length;
								// With memory, if we're not firing then
								// we should call right away
							} else if (memory) {
								firingStart = start;
								fire(memory);
							}
						}
						return this;
					},
					// Remove a callback from the list
					remove: function() {
						if (list) {
							jQuery.each(arguments, function(_, arg) {
								var index;
								while ((index = jQuery.inArray(arg, list, index)) > -1) {
									list.splice(index, 1);
									// Handle firing indexes
									if (firing) {
										if (index <= firingLength) {
											firingLength--;
										}
										if (index <= firingIndex) {
											firingIndex--;
										}
									}
								}
							});
						}
						return this;
					},
					// Check if a given callback is in the list.
					// If no argument is given, return whether or not list has callbacks attached.
					has: function(fn) {
						return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
					},
					// Remove all callbacks from the list
					empty: function() {
						list = [];
						return this;
					},
					// Have the list do nothing anymore
					disable: function() {
						list = stack = memory = undefined;
						return this;
					},
					// Is it disabled?
					disabled: function() {
						return !list;
					},
					// Lock the list in its current state
					lock: function() {
						stack = undefined;
						if (!memory) {
							self.disable();
						}
						return this;
					},
					// Is it locked?
					locked: function() {
						return !stack;
					},
					// Call all callbacks with the given context and arguments
					fireWith: function(context, args) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (list && (!fired || stack)) {
							if (firing) {
								stack.push(args);
							} else {
								fire(args);
							}
						}
						return this;
					},
					// Call all the callbacks with the given arguments
					fire: function() {
						self.fireWith(this, arguments);
						return this;
					},
					// To know if the callbacks have already been called at least once
					fired: function() {
						return !!fired;
					}
				};

			return self;
		};
		jQuery.extend({

			Deferred: function(func) {
				var tuples = [
						// action, add listener, listener list, final state
						["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
						["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
						["notify", "progress", jQuery.Callbacks("memory")]
					],
					state = "pending",
					promise = {
						state: function() {
							return state;
						},
						always: function() {
							deferred.done(arguments).fail(arguments);
							return this;
						},
						then: function( /* fnDone, fnFail, fnProgress */ ) {
							var fns = arguments;
							return jQuery.Deferred(function(newDefer) {
								jQuery.each(tuples, function(i, tuple) {
									var action = tuple[0],
										fn = jQuery.isFunction(fns[i]) && fns[i];
									// deferred[ done | fail | progress ] for forwarding actions to newDefer
									deferred[tuple[1]](function() {
										var returned = fn && fn.apply(this, arguments);
										if (returned && jQuery.isFunction(returned.promise)) {
											returned.promise()
												.done(newDefer.resolve)
												.fail(newDefer.reject)
												.progress(newDefer.notify);
										} else {
											newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
										}
									});
								});
								fns = null;
							}).promise();
						},
						// Get a promise for this deferred
						// If obj is provided, the promise aspect is added to the object
						promise: function(obj) {
							return obj != null ? jQuery.extend(obj, promise) : promise;
						}
					},
					deferred = {};

				// Keep pipe for back-compat
				promise.pipe = promise.then;

				// Add list-specific methods
				jQuery.each(tuples, function(i, tuple) {
					var list = tuple[2],
						stateString = tuple[3];

					// promise[ done | fail | progress ] = list.add
					promise[tuple[1]] = list.add;

					// Handle state
					if (stateString) {
						list.add(function() {
							// state = [ resolved | rejected ]
							state = stateString;

							// [ reject_list | resolve_list ].disable; progress_list.lock
						}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
					}

					// deferred[ resolve | reject | notify ]
					deferred[tuple[0]] = function() {
						deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
						return this;
					};
					deferred[tuple[0] + "With"] = list.fireWith;
				});

				// Make the deferred a promise
				promise.promise(deferred);

				// Call given func if any
				if (func) {
					func.call(deferred, deferred);
				}

				// All done!
				return deferred;
			},

			// Deferred helper
			when: function(subordinate /* , ..., subordinateN */ ) {
				var i = 0,
					resolveValues = core_slice.call(arguments),
					length = resolveValues.length,

					// the count of uncompleted subordinates
					remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

					// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
					deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

					// Update function for both resolve and progress values
					updateFunc = function(i, contexts, values) {
						return function(value) {
							contexts[i] = this;
							values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
							if (values === progressValues) {
								deferred.notifyWith(contexts, values);
							} else if (!(--remaining)) {
								deferred.resolveWith(contexts, values);
							}
						};
					},

					progressValues, progressContexts, resolveContexts;

				// add listeners to Deferred subordinates; treat others as resolved
				if (length > 1) {
					progressValues = new Array(length);
					progressContexts = new Array(length);
					resolveContexts = new Array(length);
					for (; i < length; i++) {
						if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
							resolveValues[i].promise()
								.done(updateFunc(i, resolveContexts, resolveValues))
								.fail(deferred.reject)
								.progress(updateFunc(i, progressContexts, progressValues));
						} else {
							--remaining;
						}
					}
				}

				// if we're not waiting on anything, resolve the master
				if (!remaining) {
					deferred.resolveWith(resolveContexts, resolveValues);
				}

				return deferred.promise();
			}
		});
		jQuery.support = (function() {

			var support, all, a,
				input, select, fragment,
				opt, eventName, isSupported, i,
				div = document.createElement("div");

			// Setup
			div.setAttribute("className", "t");
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			// Support tests won't run in some limited or non-browser environments
			all = div.getElementsByTagName("*");
			a = div.getElementsByTagName("a")[0];
			if (!all || !a || !all.length) {
				return {};
			}

			// First batch of tests
			select = document.createElement("select");
			opt = select.appendChild(document.createElement("option"));
			input = div.getElementsByTagName("input")[0];

			a.style.cssText = "top:1px;float:left;opacity:.5";
			support = {
				// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
				getSetAttribute: div.className !== "t",

				// IE strips leading whitespace when .innerHTML is used
				leadingWhitespace: div.firstChild.nodeType === 3,

				// Make sure that tbody elements aren't automatically inserted
				// IE will insert them into empty tables
				tbody: !div.getElementsByTagName("tbody").length,

				// Make sure that link elements get serialized correctly by innerHTML
				// This requires a wrapper element in IE
				htmlSerialize: !!div.getElementsByTagName("link").length,

				// Get the style information from getAttribute
				// (IE uses .cssText instead)
				style: /top/.test(a.getAttribute("style")),

				// Make sure that URLs aren't manipulated
				// (IE normalizes it by default)
				hrefNormalized: a.getAttribute("href") === "/a",

				// Make sure that element opacity exists
				// (IE uses filter instead)
				// Use a regex to work around a WebKit issue. See #5145
				opacity: /^0.5/.test(a.style.opacity),

				// Verify style float existence
				// (IE uses styleFloat instead of cssFloat)
				cssFloat: !!a.style.cssFloat,

				// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
				checkOn: !!input.value,

				// Make sure that a selected-by-default option has a working selected property.
				// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
				optSelected: opt.selected,

				// Tests for enctype support on a form (#6743)
				enctype: !!document.createElement("form").enctype,

				// Makes sure cloning an html5 element does not cause problems
				// Where outerHTML is undefined, this still works
				html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",

				// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
				boxModel: document.compatMode === "CSS1Compat",

				// Will be defined later
				deleteExpando: true,
				noCloneEvent: true,
				inlineBlockNeedsLayout: false,
				shrinkWrapBlocks: false,
				reliableMarginRight: true,
				boxSizingReliable: true,
				pixelPosition: false
			};

			// Make sure checked status is properly cloned
			input.checked = true;
			support.noCloneChecked = input.cloneNode(true).checked;

			// Make sure that the options inside disabled selects aren't marked as disabled
			// (WebKit marks them as disabled)
			select.disabled = true;
			support.optDisabled = !opt.disabled;

			// Support: IE<9
			try {
				delete div.test;
			} catch (e) {
				support.deleteExpando = false;
			}

			// Check if we can trust getAttribute("value")
			input = document.createElement("input");
			input.setAttribute("value", "");
			support.input = input.getAttribute("value") === "";

			// Check if an input maintains its value after becoming a radio
			input.value = "t";
			input.setAttribute("type", "radio");
			support.radioValue = input.value === "t";

			// #11217 - WebKit loses check when the name is after the checked attribute
			input.setAttribute("checked", "t");
			input.setAttribute("name", "t");

			fragment = document.createDocumentFragment();
			fragment.appendChild(input);

			// Check if a disconnected checkbox will retain its checked
			// value of true after appended to the DOM (IE6/7)
			support.appendChecked = input.checked;

			// WebKit doesn't clone checked state correctly in fragments
			support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

			// Support: IE<9
			// Opera does not clone events (and typeof div.attachEvent === undefined).
			// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
			if (div.attachEvent) {
				div.attachEvent("onclick", function() {
					support.noCloneEvent = false;
				});

				div.cloneNode(true).click();
			}

			// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
			// Beware of CSP restrictions (//developer.mozilla.org/en/Security/CSP), test/csp.php
			for (i in {
					submit: true,
					change: true,
					focusin: true
				}) {
				div.setAttribute(eventName = "on" + i, "t");

				support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
			}

			div.style.backgroundClip = "content-box";
			div.cloneNode(true).style.backgroundClip = "";
			support.clearCloneStyle = div.style.backgroundClip === "content-box";

			// Run tests that need a body at doc ready
			jQuery(function() {
				var container, marginDiv, tds,
					divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
					body = document.getElementsByTagName("body")[0];

				if (!body) {
					// Return for frameset docs that don't have a body
					return;
				}

				container = document.createElement("div");
				container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

				body.appendChild(container).appendChild(div);

				// Support: IE8
				// Check if table cells still have offsetWidth/Height when they are set
				// to display:none and there are still other visible table cells in a
				// table row; if so, offsetWidth/Height are not reliable for use when
				// determining if an element has been hidden directly using
				// display:none (it is still safe to use offsets if a parent element is
				// hidden; don safety goggles and see bug #4512 for more information).
				div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
				tds = div.getElementsByTagName("td");
				tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
				isSupported = (tds[0].offsetHeight === 0);

				tds[0].style.display = "";
				tds[1].style.display = "none";

				// Support: IE8
				// Check if empty table cells still have offsetWidth/Height
				support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);

				// Check box-sizing and margin behavior
				div.innerHTML = "";
				div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
				support.boxSizing = (div.offsetWidth === 4);
				support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);

				// Use window.getComputedStyle because jsdom on node.js will break without it.
				if (window.getComputedStyle) {
					support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
					support.boxSizingReliable = (window.getComputedStyle(div, null) || {
						width: "4px"
					}).width === "4px";

					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// Fails in WebKit before Feb 2011 nightlies
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					marginDiv = div.appendChild(document.createElement("div"));
					marginDiv.style.cssText = div.style.cssText = divReset;
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";

					support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
				}

				if (typeof div.style.zoom !== core_strundefined) {
					// Support: IE<8
					// Check if natively block-level elements act like inline-block
					// elements when setting their display to 'inline' and giving
					// them layout
					div.innerHTML = "";
					div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
					support.inlineBlockNeedsLayout = (div.offsetWidth === 3);

					// Support: IE6
					// Check if elements with layout shrink-wrap their children
					div.style.display = "block";
					div.innerHTML = "<div></div>";
					div.firstChild.style.width = "5px";
					support.shrinkWrapBlocks = (div.offsetWidth !== 3);

					if (support.inlineBlockNeedsLayout) {
						// Prevent IE 6 from affecting layout for positioned elements #11048
						// Prevent IE from shrinking the body in IE 7 mode #12869
						// Support: IE<8
						body.style.zoom = 1;
					}
				}

				body.removeChild(container);

				// Null elements to avoid leaks in IE
				container = div = tds = marginDiv = null;
			});

			// Null elements to avoid leaks in IE
			all = select = fragment = opt = a = input = null;

			return support;
		})();

		var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
			rmultiDash = /([A-Z])/g;

		function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
			if (!jQuery.acceptData(elem)) {
				return;
			}

			var thisCache, ret,
				internalKey = jQuery.expando,
				getByName = typeof name === "string",

				// We have to handle DOM nodes and JS objects differently because IE6-7
				// can't GC object references properly across the DOM-JS boundary
				isNode = elem.nodeType,

				// Only DOM nodes need the global jQuery cache; JS object data is
				// attached directly to the object so GC can occur automatically
				cache = isNode ? jQuery.cache : elem,

				// Only defining an ID for JS objects if its cache already exists allows
				// the code to shortcut on the same path as a DOM node with no cache
				id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

			// Avoid doing any more work than we need to when trying to get data on an
			// object that has no data at all
			if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
				return;
			}

			if (!id) {
				// Only DOM nodes need a new unique ID for each element since their data
				// ends up in the global cache
				if (isNode) {
					elem[internalKey] = id = core_deletedIds.pop() || jQuery.guid++;
				} else {
					id = internalKey;
				}
			}

			if (!cache[id]) {
				cache[id] = {};

				// Avoids exposing jQuery metadata on plain JS objects when the object
				// is serialized using JSON.stringify
				if (!isNode) {
					cache[id].toJSON = jQuery.noop;
				}
			}

			// An object can be passed to jQuery.data instead of a key/value pair; this gets
			// shallow copied over onto the existing cache
			if (typeof name === "object" || typeof name === "function") {
				if (pvt) {
					cache[id] = jQuery.extend(cache[id], name);
				} else {
					cache[id].data = jQuery.extend(cache[id].data, name);
				}
			}

			thisCache = cache[id];

			// jQuery data() is stored in a separate object inside the object's internal data
			// cache in order to avoid key collisions between internal data and user-defined
			// data.
			if (!pvt) {
				if (!thisCache.data) {
					thisCache.data = {};
				}

				thisCache = thisCache.data;
			}

			if (data !== undefined) {
				thisCache[jQuery.camelCase(name)] = data;
			}

			// Check for both converted-to-camel and non-converted data property names
			// If a data property was specified
			if (getByName) {

				// First Try to find as-is property data
				ret = thisCache[name];

				// Test for null|undefined property data
				if (ret == null) {

					// Try to find the camelCased property
					ret = thisCache[jQuery.camelCase(name)];
				}
			} else {
				ret = thisCache;
			}

			return ret;
		}

		function internalRemoveData(elem, name, pvt) {
			if (!jQuery.acceptData(elem)) {
				return;
			}

			var i, l, thisCache,
				isNode = elem.nodeType,

				// See jQuery.data for more information
				cache = isNode ? jQuery.cache : elem,
				id = isNode ? elem[jQuery.expando] : jQuery.expando;

			// If there is already no cache entry for this object, there is no
			// purpose in continuing
			if (!cache[id]) {
				return;
			}

			if (name) {

				thisCache = pvt ? cache[id] : cache[id].data;

				if (thisCache) {

					// Support array or space separated string names for data keys
					if (!jQuery.isArray(name)) {

						// try the string as a key before any manipulation
						if (name in thisCache) {
							name = [name];
						} else {

							// split the camel cased version by spaces unless a key with the spaces exists
							name = jQuery.camelCase(name);
							if (name in thisCache) {
								name = [name];
							} else {
								name = name.split(" ");
							}
						}
					} else {
						// If "name" is an array of keys...
						// When data is initially created, via ("key", "val") signature,
						// keys will be converted to camelCase.
						// Since there is no way to tell _how_ a key was added, remove
						// both plain key and camelCase key. #12786
						// This will only penalize the array argument path.
						name = name.concat(jQuery.map(name, jQuery.camelCase));
					}

					for (i = 0, l = name.length; i < l; i++) {
						delete thisCache[name[i]];
					}

					// If there is no data left in the cache, we want to continue
					// and let the cache object itself get destroyed
					if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
						return;
					}
				}
			}

			// See jQuery.data for more information
			if (!pvt) {
				delete cache[id].data;

				// Don't destroy the parent cache unless the internal data object
				// had been the only thing left in it
				if (!isEmptyDataObject(cache[id])) {
					return;
				}
			}

			// Destroy the cache
			if (isNode) {
				jQuery.cleanData([elem], true);

				// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
			} else if (jQuery.support.deleteExpando || cache != cache.window) {
				delete cache[id];

				// When all else fails, null
			} else {
				cache[id] = null;
			}
		}

		jQuery.extend({
			cache: {},

			// Unique for each copy of jQuery on the page
			// Non-digits removed to match rinlinejQuery
			expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),

			// The following elements throw uncatchable exceptions if you
			// attempt to add expando properties to them.
			noData: {
				"embed": true,
				// Ban all objects except for Flash (which handle expandos)
				"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
				"applet": true
			},

			hasData: function(elem) {
				elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
				return !!elem && !isEmptyDataObject(elem);
			},

			data: function(elem, name, data) {
				return internalData(elem, name, data);
			},

			removeData: function(elem, name) {
				return internalRemoveData(elem, name);
			},

			// For internal use only.
			_data: function(elem, name, data) {
				return internalData(elem, name, data, true);
			},

			_removeData: function(elem, name) {
				return internalRemoveData(elem, name, true);
			},

			// A method for determining if a DOM node can handle the data expando
			acceptData: function(elem) {
				// Do not set data on non-element because it will not be cleared (#8335).
				if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
					return false;
				}

				var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];

				// nodes accept data unless otherwise specified; rejection can be conditional
				return !noData || noData !== true && elem.getAttribute("classid") === noData;
			}
		});

		jQuery.fn.extend({
			data: function(key, value) {
				var attrs, name,
					elem = this[0],
					i = 0,
					data = null;

				// Gets all values
				if (key === undefined) {
					if (this.length) {
						data = jQuery.data(elem);

						if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
							attrs = elem.attributes;
							for (; i < attrs.length; i++) {
								name = attrs[i].name;

								if (!name.indexOf("data-")) {
									name = jQuery.camelCase(name.slice(5));

									dataAttr(elem, name, data[name]);
								}
							}
							jQuery._data(elem, "parsedAttrs", true);
						}
					}

					return data;
				}

				// Sets multiple values
				if (typeof key === "object") {
					return this.each(function() {
						jQuery.data(this, key);
					});
				}

				return jQuery.access(this, function(value) {

					if (value === undefined) {
						// Try to fetch any internally stored data first
						return elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
					}

					this.each(function() {
						jQuery.data(this, key, value);
					});
				}, null, value, arguments.length > 1, null, true);
			},

			removeData: function(key) {
				return this.each(function() {
					jQuery.removeData(this, key);
				});
			}
		});

		function dataAttr(elem, key, data) {
			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if (data === undefined && elem.nodeType === 1) {

				var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

				data = elem.getAttribute(name);

				if (typeof data === "string") {
					try {
						data = data === "true" ? true :
							data === "false" ? false :
							data === "null" ? null :
							// Only convert to a number if it doesn't change the string
							+data + "" === data ? +data :
							rbrace.test(data) ? jQuery.parseJSON(data) :
							data;
					} catch (e) {}

					// Make sure we set the data so it isn't changed later
					jQuery.data(elem, key, data);

				} else {
					data = undefined;
				}
			}

			return data;
		}

		// checks a cache object for emptiness
		function isEmptyDataObject(obj) {
			var name;
			for (name in obj) {

				// if the public data object is empty, the private is still empty
				if (name === "data" && jQuery.isEmptyObject(obj[name])) {
					continue;
				}
				if (name !== "toJSON") {
					return false;
				}
			}

			return true;
		}
		jQuery.extend({
			queue: function(elem, type, data) {
				var queue;

				if (elem) {
					type = (type || "fx") + "queue";
					queue = jQuery._data(elem, type);

					// Speed up dequeue by getting out quickly if this is just a lookup
					if (data) {
						if (!queue || jQuery.isArray(data)) {
							queue = jQuery._data(elem, type, jQuery.makeArray(data));
						} else {
							queue.push(data);
						}
					}
					return queue || [];
				}
			},

			dequeue: function(elem, type) {
				type = type || "fx";

				var queue = jQuery.queue(elem, type),
					startLength = queue.length,
					fn = queue.shift(),
					hooks = jQuery._queueHooks(elem, type),
					next = function() {
						jQuery.dequeue(elem, type);
					};

				// If the fx queue is dequeued, always remove the progress sentinel
				if (fn === "inprogress") {
					fn = queue.shift();
					startLength--;
				}

				hooks.cur = fn;
				if (fn) {

					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					// clear up the last queue stop function
					delete hooks.stop;
					fn.call(elem, next, hooks);
				}

				if (!startLength && hooks) {
					hooks.empty.fire();
				}
			},

			// not intended for public consumption - generates a queueHooks object, or returns the current one
			_queueHooks: function(elem, type) {
				var key = type + "queueHooks";
				return jQuery._data(elem, key) || jQuery._data(elem, key, {
					empty: jQuery.Callbacks("once memory").add(function() {
						jQuery._removeData(elem, type + "queue");
						jQuery._removeData(elem, key);
					})
				});
			}
		});

		jQuery.fn.extend({
			queue: function(type, data) {
				var setter = 2;

				if (typeof type !== "string") {
					data = type;
					type = "fx";
					setter--;
				}

				if (arguments.length < setter) {
					return jQuery.queue(this[0], type);
				}

				return data === undefined ?
					this :
					this.each(function() {
						var queue = jQuery.queue(this, type, data);

						// ensure a hooks for this queue
						jQuery._queueHooks(this, type);

						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
			},
			dequeue: function(type) {
				return this.each(function() {
					jQuery.dequeue(this, type);
				});
			},
			// Based off of the plugin by Clint Helfers, with permission.
			// //blindsignals.com/index.php/2009/07/jquery-delay/
			delay: function(time, type) {
				time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
				type = type || "fx";

				return this.queue(type, function(next, hooks) {
					var timeout = setTimeout(next, time);
					hooks.stop = function() {
						clearTimeout(timeout);
					};
				});
			},
			clearQueue: function(type) {
				return this.queue(type || "fx", []);
			},
			// Get a promise resolved when queues of a certain type
			// are emptied (fx is the type by default)
			promise: function(type, obj) {
				var tmp,
					count = 1,
					defer = jQuery.Deferred(),
					elements = this,
					i = this.length,
					resolve = function() {
						if (!(--count)) {
							defer.resolveWith(elements, [elements]);
						}
					};

				if (typeof type !== "string") {
					obj = type;
					type = undefined;
				}
				type = type || "fx";

				while (i--) {
					tmp = jQuery._data(elements[i], type + "queueHooks");
					if (tmp && tmp.empty) {
						count++;
						tmp.empty.add(resolve);
					}
				}
				resolve();
				return defer.promise(obj);
			}
		});
		var nodeHook, boolHook,
			rclass = /[\t\r\n]/g,
			rreturn = /\r/g,
			rfocusable = /^(?:input|select|textarea|button|object)$/i,
			rclickable = /^(?:a|area)$/i,
			rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
			ruseDefault = /^(?:checked|selected)$/i,
			getSetAttribute = jQuery.support.getSetAttribute,
			getSetInput = jQuery.support.input;

		jQuery.fn.extend({
			attr: function(name, value) {
				return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
			},

			removeAttr: function(name) {
				return this.each(function() {
					jQuery.removeAttr(this, name);
				});
			},

			prop: function(name, value) {
				return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
			},

			removeProp: function(name) {
				name = jQuery.propFix[name] || name;
				return this.each(function() {
					// try/catch handles cases where IE balks (such as removing a property on window)
					try {
						this[name] = undefined;
						delete this[name];
					} catch (e) {}
				});
			},

			addClass: function(value) {
				var classes, elem, cur, clazz, j,
					i = 0,
					len = this.length,
					proceed = typeof value === "string" && value;

				if (jQuery.isFunction(value)) {
					return this.each(function(j) {
						jQuery(this).addClass(value.call(this, j, this.className));
					});
				}

				if (proceed) {
					// The disjunction here is for better compressibility (see removeClass)
					classes = (value || "").match(core_rnotwhite) || [];

					for (; i < len; i++) {
						elem = this[i];
						cur = elem.nodeType === 1 && (elem.className ?
							(" " + elem.className + " ").replace(rclass, " ") :
							" "
						);

						if (cur) {
							j = 0;
							while ((clazz = classes[j++])) {
								if (cur.indexOf(" " + clazz + " ") < 0) {
									cur += clazz + " ";
								}
							}
							elem.className = jQuery.trim(cur);

						}
					}
				}

				return this;
			},

			removeClass: function(value) {
				var classes, elem, cur, clazz, j,
					i = 0,
					len = this.length,
					proceed = arguments.length === 0 || typeof value === "string" && value;

				if (jQuery.isFunction(value)) {
					return this.each(function(j) {
						jQuery(this).removeClass(value.call(this, j, this.className));
					});
				}
				if (proceed) {
					classes = (value || "").match(core_rnotwhite) || [];

					for (; i < len; i++) {
						elem = this[i];
						// This expression is here for better compressibility (see addClass)
						cur = elem.nodeType === 1 && (elem.className ?
							(" " + elem.className + " ").replace(rclass, " ") :
							""
						);

						if (cur) {
							j = 0;
							while ((clazz = classes[j++])) {
								// Remove *all* instances
								while (cur.indexOf(" " + clazz + " ") >= 0) {
									cur = cur.replace(" " + clazz + " ", " ");
								}
							}
							elem.className = value ? jQuery.trim(cur) : "";
						}
					}
				}

				return this;
			},

			toggleClass: function(value, stateVal) {
				var type = typeof value,
					isBool = typeof stateVal === "boolean";

				if (jQuery.isFunction(value)) {
					return this.each(function(i) {
						jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
					});
				}

				return this.each(function() {
					if (type === "string") {
						// toggle individual class names
						var className,
							i = 0,
							self = jQuery(this),
							state = stateVal,
							classNames = value.match(core_rnotwhite) || [];

						while ((className = classNames[i++])) {
							// check each className given, space separated list
							state = isBool ? state : !self.hasClass(className);
							self[state ? "addClass" : "removeClass"](className);
						}

						// Toggle whole class name
					} else if (type === core_strundefined || type === "boolean") {
						if (this.className) {
							// store className if set
							jQuery._data(this, "__className__", this.className);
						}

						// If the element has a class name or if we're passed "false",
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
					}
				});
			},

			hasClass: function(selector) {
				var className = " " + selector + " ",
					i = 0,
					l = this.length;
				for (; i < l; i++) {
					if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
						return true;
					}
				}

				return false;
			},

			val: function(value) {
				var ret, hooks, isFunction,
					elem = this[0];

				if (!arguments.length) {
					if (elem) {
						hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

						if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
							return ret;
						}

						ret = elem.value;

						return typeof ret === "string" ?
							// handle most common string cases
							ret.replace(rreturn, "") :
							// handle cases where value is null/undef or number
							ret == null ? "" : ret;
					}

					return;
				}

				isFunction = jQuery.isFunction(value);

				return this.each(function(i) {
					var val,
						self = jQuery(this);

					if (this.nodeType !== 1) {
						return;
					}

					if (isFunction) {
						val = value.call(this, i, self.val());
					} else {
						val = value;
					}

					// Treat null/undefined as ""; convert numbers to string
					if (val == null) {
						val = "";
					} else if (typeof val === "number") {
						val += "";
					} else if (jQuery.isArray(val)) {
						val = jQuery.map(val, function(value) {
							return value == null ? "" : value + "";
						});
					}

					hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

					// If set returns undefined, fall back to normal setting
					if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
						this.value = val;
					}
				});
			}
		});

		jQuery.extend({
			valHooks: {
				option: {
					get: function(elem) {
						// attributes.value is undefined in Blackberry 4.7 but
						// uses .value. See #6932
						var val = elem.attributes.value;
						return !val || val.specified ? elem.value : elem.text;
					}
				},
				select: {
					get: function(elem) {
						var value, option,
							options = elem.options,
							index = elem.selectedIndex,
							one = elem.type === "select-one" || index < 0,
							values = one ? null : [],
							max = one ? index + 1 : options.length,
							i = index < 0 ?
							max :
							one ? index : 0;

						// Loop through all the selected options
						for (; i < max; i++) {
							option = options[i];

							// oldIE doesn't update selected after form reset (#2551)
							if ((option.selected || i === index) &&
								// Don't return options that are disabled or in a disabled optgroup
								(jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
								(!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

								// Get the specific value for the option
								value = jQuery(option).val();

								// We don't need an array for one selects
								if (one) {
									return value;
								}

								// Multi-Selects return an array
								values.push(value);
							}
						}

						return values;
					},

					set: function(elem, value) {
						var values = jQuery.makeArray(value);

						jQuery(elem).find("option").each(function() {
							this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
						});

						if (!values.length) {
							elem.selectedIndex = -1;
						}
						return values;
					}
				}
			},

			attr: function(elem, name, value) {
				var hooks, notxml, ret,
					nType = elem.nodeType;

				// don't get/set attributes on text, comment and attribute nodes
				if (!elem || nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				// Fallback to prop when attributes are not supported
				if (typeof elem.getAttribute === core_strundefined) {
					return jQuery.prop(elem, name, value);
				}

				notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

				// All attributes are lowercase
				// Grab necessary hook if one is defined
				if (notxml) {
					name = name.toLowerCase();
					hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
				}

				if (value !== undefined) {

					if (value === null) {
						jQuery.removeAttr(elem, name);

					} else if (hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;

					} else {
						elem.setAttribute(name, value + "");
						return value;
					}

				} else if (hooks && notxml && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;

				} else {

					// In IE9+, Flash objects don't have .getAttribute (#12945)
					// Support: IE9+
					if (typeof elem.getAttribute !== core_strundefined) {
						ret = elem.getAttribute(name);
					}

					// Non-existent attributes return null, we normalize to undefined
					return ret == null ?
						undefined :
						ret;
				}
			},

			removeAttr: function(elem, value) {
				var name, propName,
					i = 0,
					attrNames = value && value.match(core_rnotwhite);

				if (attrNames && elem.nodeType === 1) {
					while ((name = attrNames[i++])) {
						propName = jQuery.propFix[name] || name;

						// Boolean attributes get special treatment (#10870)
						if (rboolean.test(name)) {
							// Set corresponding property to false for boolean attributes
							// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
							if (!getSetAttribute && ruseDefault.test(name)) {
								elem[jQuery.camelCase("default-" + name)] =
									elem[propName] = false;
							} else {
								elem[propName] = false;
							}

							// See #9699 for explanation of this approach (setting first, then removal)
						} else {
							jQuery.attr(elem, name, "");
						}

						elem.removeAttribute(getSetAttribute ? name : propName);
					}
				}
			},

			attrHooks: {
				type: {
					set: function(elem, value) {
						if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
							// Setting the type on a radio button after the value resets the value in IE6-9
							// Reset value to default in case type is set after value during creation
							var val = elem.value;
							elem.setAttribute("type", value);
							if (val) {
								elem.value = val;
							}
							return value;
						}
					}
				}
			},

			propFix: {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},

			prop: function(elem, name, value) {
				var ret, hooks, notxml,
					nType = elem.nodeType;

				// don't get/set properties on text, comment and attribute nodes
				if (!elem || nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

				if (notxml) {
					// Fix name and attach hooks
					name = jQuery.propFix[name] || name;
					hooks = jQuery.propHooks[name];
				}

				if (value !== undefined) {
					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;

					} else {
						return (elem[name] = value);
					}

				} else {
					if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
						return ret;

					} else {
						return elem[name];
					}
				}
			},

			propHooks: {
				tabIndex: {
					get: function(elem) {
						// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
						// //fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
						var attributeNode = elem.getAttributeNode("tabindex");

						return attributeNode && attributeNode.specified ?
							parseInt(attributeNode.value, 10) :
							rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
							0 :
							undefined;
					}
				}
			}
		});

		// Hook for boolean attributes
		boolHook = {
			get: function(elem, name) {
				var
				// Use .prop to determine if this attribute is understood as boolean
					prop = jQuery.prop(elem, name),

					// Fetch it accordingly
					attr = typeof prop === "boolean" && elem.getAttribute(name),
					detail = typeof prop === "boolean" ?

					getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test(name) ?
					elem[jQuery.camelCase("default-" + name)] :
					!!attr :

					// fetch an attribute node for properties not recognized as boolean
					elem.getAttributeNode(name);

				return detail && detail.value !== false ?
					name.toLowerCase() :
					undefined;
			},
			set: function(elem, value, name) {
				if (value === false) {
					// Remove boolean attributes when set to false
					jQuery.removeAttr(elem, name);
				} else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
					// IE<8 needs the *property* name
					elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

					// Use defaultChecked and defaultSelected for oldIE
				} else {
					elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
				}

				return name;
			}
		};

		// fix oldIE value attroperty
		if (!getSetInput || !getSetAttribute) {
			jQuery.attrHooks.value = {
				get: function(elem, name) {
					var ret = elem.getAttributeNode(name);
					return jQuery.nodeName(elem, "input") ?

						// Ignore the value *property* by using defaultValue
						elem.defaultValue :

						ret && ret.specified ? ret.value : undefined;
				},
				set: function(elem, value, name) {
					if (jQuery.nodeName(elem, "input")) {
						// Does not return so that setAttribute is also used
						elem.defaultValue = value;
					} else {
						// Use nodeHook if defined (#1954); otherwise setAttribute is fine
						return nodeHook && nodeHook.set(elem, value, name);
					}
				}
			};
		}

		// IE6/7 do not support getting/setting some attributes with get/setAttribute
		if (!getSetAttribute) {

			// Use this for any attribute in IE6/7
			// This fixes almost every IE6/7 issue
			nodeHook = jQuery.valHooks.button = {
				get: function(elem, name) {
					var ret = elem.getAttributeNode(name);
					return ret && (name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified) ?
						ret.value :
						undefined;
				},
				set: function(elem, value, name) {
					// Set the existing or create a new attribute node
					var ret = elem.getAttributeNode(name);
					if (!ret) {
						elem.setAttributeNode(
							(ret = elem.ownerDocument.createAttribute(name))
						);
					}

					ret.value = value += "";

					// Break association with cloned elements by also using setAttribute (#9646)
					return name === "value" || value === elem.getAttribute(name) ?
						value :
						undefined;
				}
			};

			// Set contenteditable to false on removals(#10429)
			// Setting to empty string throws an error as an invalid value
			jQuery.attrHooks.contenteditable = {
				get: nodeHook.get,
				set: function(elem, value, name) {
					nodeHook.set(elem, value === "" ? false : value, name);
				}
			};

			// Set width and height to auto instead of 0 on empty string( Bug #8150 )
			// This is for removals
			jQuery.each(["width", "height"], function(i, name) {
				jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
					set: function(elem, value) {
						if (value === "") {
							elem.setAttribute(name, "auto");
							return value;
						}
					}
				});
			});
		}


		// Some attributes require a special call on IE
		// //msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!jQuery.support.hrefNormalized) {
			jQuery.each(["href", "src", "width", "height"], function(i, name) {
				jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
					get: function(elem) {
						var ret = elem.getAttribute(name, 2);
						return ret == null ? undefined : ret;
					}
				});
			});

			// href/src property should get the full normalized URL (#10299/#12915)
			jQuery.each(["href", "src"], function(i, name) {
				jQuery.propHooks[name] = {
					get: function(elem) {
						return elem.getAttribute(name, 4);
					}
				};
			});
		}

		if (!jQuery.support.style) {
			jQuery.attrHooks.style = {
				get: function(elem) {
					// Return undefined in the case of empty string
					// Note: IE uppercases css property names, but if we were to .toLowerCase()
					// .cssText, that would destroy case senstitivity in URL's, like in "background"
					return elem.style.cssText || undefined;
				},
				set: function(elem, value) {
					return (elem.style.cssText = value + "");
				}
			};
		}

		// Safari mis-reports the default selected property of an option
		// Accessing the parent's selectedIndex property fixes it
		if (!jQuery.support.optSelected) {
			jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
				get: function(elem) {
					var parent = elem.parentNode;

					if (parent) {
						parent.selectedIndex;

						// Make sure that it also works with optgroups, see #5701
						if (parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
					}
					return null;
				}
			});
		}

		// IE6/7 call enctype encoding
		if (!jQuery.support.enctype) {
			jQuery.propFix.enctype = "encoding";
		}

		// Radios and checkboxes getter/setter
		if (!jQuery.support.checkOn) {
			jQuery.each(["radio", "checkbox"], function() {
				jQuery.valHooks[this] = {
					get: function(elem) {
						// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
						return elem.getAttribute("value") === null ? "on" : elem.value;
					}
				};
			});
		}
		jQuery.each(["radio", "checkbox"], function() {
			jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
				set: function(elem, value) {
					if (jQuery.isArray(value)) {
						return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
					}
				}
			});
		});
		var rformElems = /^(?:input|select|textarea)$/i,
			rkeyEvent = /^key/,
			rmouseEvent = /^(?:mouse|contextmenu)|click/,
			rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
			rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}

		/*
		 * Helper functions for managing events -- not part of the public interface.
		 * Props to Dean Edwards' addEvent library for many of the ideas.
		 */
		jQuery.event = {

			global: {},

			add: function(elem, types, handler, data, selector) {
				var tmp, events, t, handleObjIn,
					special, eventHandle, handleObj,
					handlers, type, namespaces, origType,
					elemData = jQuery._data(elem);

				// Don't attach events to noData or text/comment nodes (but allow plain objects)
				if (!elemData) {
					return;
				}

				// Caller can pass in an object of custom data in lieu of the handler
				if (handler.handler) {
					handleObjIn = handler;
					handler = handleObjIn.handler;
					selector = handleObjIn.selector;
				}

				// Make sure that the handler has a unique ID, used to find/remove it later
				if (!handler.guid) {
					handler.guid = jQuery.guid++;
				}

				// Init the element's event structure and main handler, if this is the first
				if (!(events = elemData.events)) {
					events = elemData.events = {};
				}
				if (!(eventHandle = elemData.handle)) {
					eventHandle = elemData.handle = function(e) {
						// Discard the second event of a jQuery.event.trigger() and
						// when an event is called after a page has unloaded
						return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
							jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
							undefined;
					};
					// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
					eventHandle.elem = elem;
				}

				// Handle multiple events separated by a space
				// jQuery(...).bind("mouseover mouseout", fn);
				types = (types || "").match(core_rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// If event changes its type, use the special event handlers for the changed type
					special = jQuery.event.special[type] || {};

					// If selector defined, determine special event api type, otherwise given type
					type = (selector ? special.delegateType : special.bindType) || type;

					// Update special based on newly reset type
					special = jQuery.event.special[type] || {};

					// handleObj is passed to all event handlers
					handleObj = jQuery.extend({
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext: selector && jQuery.expr.match.needsContext.test(selector),
						namespace: namespaces.join(".")
					}, handleObjIn);

					// Init the event handler queue if we're the first
					if (!(handlers = events[type])) {
						handlers = events[type] = [];
						handlers.delegateCount = 0;

						// Only use addEventListener/attachEvent if the special events handler returns false
						if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
							// Bind the global event handler to the element
							if (elem.addEventListener) {
								elem.addEventListener(type, eventHandle, false);

							} else if (elem.attachEvent) {
								elem.attachEvent("on" + type, eventHandle);
							}
						}
					}

					if (special.add) {
						special.add.call(elem, handleObj);

						if (!handleObj.handler.guid) {
							handleObj.handler.guid = handler.guid;
						}
					}

					// Add to the element's handler list, delegates in front
					if (selector) {
						handlers.splice(handlers.delegateCount++, 0, handleObj);
					} else {
						handlers.push(handleObj);
					}

					// Keep track of which events have ever been used, for event optimization
					jQuery.event.global[type] = true;
				}

				// Nullify elem to prevent memory leaks in IE
				elem = null;
			},

			// Detach an event or set of events from an element
			remove: function(elem, types, handler, selector, mappedTypes) {
				var j, handleObj, tmp,
					origCount, t, events,
					special, handlers, type,
					namespaces, origType,
					elemData = jQuery.hasData(elem) && jQuery._data(elem);

				if (!elemData || !(events = elemData.events)) {
					return;
				}

				// Once for each type.namespace in types; type may be omitted
				types = (types || "").match(core_rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// Unbind all events (on this namespace, if provided) for the element
					if (!type) {
						for (type in events) {
							jQuery.event.remove(elem, type + types[t], handler, selector, true);
						}
						continue;
					}

					special = jQuery.event.special[type] || {};
					type = (selector ? special.delegateType : special.bindType) || type;
					handlers = events[type] || [];
					tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

					// Remove matching events
					origCount = j = handlers.length;
					while (j--) {
						handleObj = handlers[j];

						if ((mappedTypes || origType === handleObj.origType) &&
							(!handler || handler.guid === handleObj.guid) &&
							(!tmp || tmp.test(handleObj.namespace)) &&
							(!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
							handlers.splice(j, 1);

							if (handleObj.selector) {
								handlers.delegateCount--;
							}
							if (special.remove) {
								special.remove.call(elem, handleObj);
							}
						}
					}

					// Remove generic event handler if we removed something and no more handlers exist
					// (avoids potential for endless recursion during removal of special event handlers)
					if (origCount && !handlers.length) {
						if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
							jQuery.removeEvent(elem, type, elemData.handle);
						}

						delete events[type];
					}
				}

				// Remove the expando if it's no longer used
				if (jQuery.isEmptyObject(events)) {
					delete elemData.handle;

					// removeData also checks for emptiness and clears the expando if empty
					// so use it instead of delete
					jQuery._removeData(elem, "events");
				}
			},

			trigger: function(event, data, elem, onlyHandlers) {
				var handle, ontype, cur,
					bubbleType, special, tmp, i,
					eventPath = [elem || document],
					type = core_hasOwn.call(event, "type") ? event.type : event,
					namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

				cur = tmp = elem = elem || document;

				// Don't do events on text and comment nodes
				if (elem.nodeType === 3 || elem.nodeType === 8) {
					return;
				}

				// focus/blur morphs to focusin/out; ensure we're not firing them right now
				if (rfocusMorph.test(type + jQuery.event.triggered)) {
					return;
				}

				if (type.indexOf(".") >= 0) {
					// Namespaced trigger; create a regexp to match event type in handle()
					namespaces = type.split(".");
					type = namespaces.shift();
					namespaces.sort();
				}
				ontype = type.indexOf(":") < 0 && "on" + type;

				// Caller can pass in a jQuery.Event object, Object, or just an event type string
				event = event[jQuery.expando] ?
					event :
					new jQuery.Event(type, typeof event === "object" && event);

				event.isTrigger = true;
				event.namespace = namespaces.join(".");
				event.namespace_re = event.namespace ?
					new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
					null;

				// Clean up the event in case it is being reused
				event.result = undefined;
				if (!event.target) {
					event.target = elem;
				}

				// Clone any incoming data and prepend the event, creating the handler arg list
				data = data == null ?
					[event] :
					jQuery.makeArray(data, [event]);

				// Allow special events to draw outside the lines
				special = jQuery.event.special[type] || {};
				if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
					return;
				}

				// Determine event propagation path in advance, per W3C events spec (#9951)
				// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
				if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

					bubbleType = special.delegateType || type;
					if (!rfocusMorph.test(bubbleType + type)) {
						cur = cur.parentNode;
					}
					for (; cur; cur = cur.parentNode) {
						eventPath.push(cur);
						tmp = cur;
					}

					// Only add window if we got to document (e.g., not plain obj or detached DOM)
					if (tmp === (elem.ownerDocument || document)) {
						eventPath.push(tmp.defaultView || tmp.parentWindow || window);
					}
				}

				// Fire handlers on the event path
				i = 0;
				while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

					event.type = i > 1 ?
						bubbleType :
						special.bindType || type;

					// jQuery handler
					handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
					if (handle) {
						handle.apply(cur, data);
					}

					// Native handler
					handle = ontype && cur[ontype];
					if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
						event.preventDefault();
					}
				}
				event.type = type;

				// If nobody prevented the default action, do it now
				if (!onlyHandlers && !event.isDefaultPrevented()) {

					if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) &&
						!(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {

						// Call a native DOM method on the target with the same name name as the event.
						// Can't use an .isFunction() check here because IE6/7 fails that test.
						// Don't do default actions on window, that's where global variables be (#6170)
						if (ontype && elem[type] && !jQuery.isWindow(elem)) {

							// Don't re-trigger an onFOO event when we call its FOO() method
							tmp = elem[ontype];

							if (tmp) {
								elem[ontype] = null;
							}

							// Prevent re-triggering of the same event, since we already bubbled it above
							jQuery.event.triggered = type;
							try {
								elem[type]();
							} catch (e) {
								// IE<9 dies on focus/blur to hidden element (#1486,#12518)
								// only reproducible on winXP IE8 native, not IE9 in IE8 mode
							}
							jQuery.event.triggered = undefined;

							if (tmp) {
								elem[ontype] = tmp;
							}
						}
					}
				}

				return event.result;
			},

			dispatch: function(event) {

				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix(event);

				var i, ret, handleObj, matched, j,
					handlerQueue = [],
					args = core_slice.call(arguments),
					handlers = (jQuery._data(this, "events") || {})[event.type] || [],
					special = jQuery.event.special[event.type] || {};

				// Use the fix-ed jQuery.Event rather than the (read-only) native event
				args[0] = event;
				event.delegateTarget = this;

				// Call the preDispatch hook for the mapped type, and let it bail if desired
				if (special.preDispatch && special.preDispatch.call(this, event) === false) {
					return;
				}

				// Determine handlers
				handlerQueue = jQuery.event.handlers.call(this, event, handlers);

				// Run delegates first; they may want to stop propagation beneath us
				i = 0;
				while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
					event.currentTarget = matched.elem;

					j = 0;
					while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

						// Triggered event must either 1) have no namespace, or
						// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
						if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

							event.handleObj = handleObj;
							event.data = handleObj.data;

							ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
								.apply(matched.elem, args);

							if (ret !== undefined) {
								if ((event.result = ret) === false) {
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}

				// Call the postDispatch hook for the mapped type
				if (special.postDispatch) {
					special.postDispatch.call(this, event);
				}

				return event.result;
			},

			handlers: function(event, handlers) {
				var sel, handleObj, matches, i,
					handlerQueue = [],
					delegateCount = handlers.delegateCount,
					cur = event.target;

				// Find delegate handlers
				// Black-hole SVG <use> instance trees (#13180)
				// Avoid non-left-click bubbling in Firefox (#3861)
				if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

					for (; cur != this; cur = cur.parentNode || this) {

						// Don't check non-elements (#13208)
						// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
						if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
							matches = [];
							for (i = 0; i < delegateCount; i++) {
								handleObj = handlers[i];

								// Don't conflict with Object.prototype properties (#13203)
								sel = handleObj.selector + " ";

								if (matches[sel] === undefined) {
									matches[sel] = handleObj.needsContext ?
										jQuery(sel, this).index(cur) >= 0 :
										jQuery.find(sel, this, null, [cur]).length;
								}
								if (matches[sel]) {
									matches.push(handleObj);
								}
							}
							if (matches.length) {
								handlerQueue.push({
									elem: cur,
									handlers: matches
								});
							}
						}
					}
				}

				// Add the remaining (directly-bound) handlers
				if (delegateCount < handlers.length) {
					handlerQueue.push({
						elem: this,
						handlers: handlers.slice(delegateCount)
					});
				}

				return handlerQueue;
			},

			fix: function(event) {
				if (event[jQuery.expando]) {
					return event;
				}

				// Create a writable copy of the event object and normalize some properties
				var i, prop, copy,
					type = event.type,
					originalEvent = event,
					fixHook = this.fixHooks[type];

				if (!fixHook) {
					this.fixHooks[type] = fixHook =
						rmouseEvent.test(type) ? this.mouseHooks :
						rkeyEvent.test(type) ? this.keyHooks : {};
				}
				copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

				event = new jQuery.Event(originalEvent);

				i = copy.length;
				while (i--) {
					prop = copy[i];
					event[prop] = originalEvent[prop];
				}

				// Support: IE<9
				// Fix target property (#1925)
				if (!event.target) {
					event.target = originalEvent.srcElement || document;
				}

				// Support: Chrome 23+, Safari?
				// Target should not be a text node (#504, #13143)
				if (event.target.nodeType === 3) {
					event.target = event.target.parentNode;
				}

				// Support: IE<9
				// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
				event.metaKey = !!event.metaKey;

				return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
			},

			// Includes some event props shared by KeyEvent and MouseEvent
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

			fixHooks: {},

			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(event, original) {

					// Add which for key events
					if (event.which == null) {
						event.which = original.charCode != null ? original.charCode : original.keyCode;
					}

					return event;
				}
			},

			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(event, original) {
					var body, eventDoc, doc,
						button = original.button,
						fromElement = original.fromElement;

					// Calculate pageX/Y if missing and clientX/Y available
					if (event.pageX == null && original.clientX != null) {
						eventDoc = event.target.ownerDocument || document;
						doc = eventDoc.documentElement;
						body = eventDoc.body;

						event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
						event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
					}

					// Add relatedTarget, if necessary
					if (!event.relatedTarget && fromElement) {
						event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
					}

					// Add which for click: 1 === left; 2 === middle; 3 === right
					// Note: button is not normalized, so don't use it
					if (!event.which && button !== undefined) {
						event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
					}

					return event;
				}
			},

			special: {
				load: {
					// Prevent triggered image.load events from bubbling to window.load
					noBubble: true
				},
				click: {
					// For checkbox, fire native event so checked state will be right
					trigger: function() {
						if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
							this.click();
							return false;
						}
					}
				},
				focus: {
					// Fire native event if possible so blur/focus sequence is correct
					trigger: function() {
						if (this !== document.activeElement && this.focus) {
							try {
								this.focus();
								return false;
							} catch (e) {
								// Support: IE<9
								// If we error on focus to hidden element (#1486, #12518),
								// let .trigger() run the handlers
							}
						}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function() {
						if (this === document.activeElement && this.blur) {
							this.blur();
							return false;
						}
					},
					delegateType: "focusout"
				},

				beforeunload: {
					postDispatch: function(event) {

						// Even when returnValue equals to undefined Firefox will still show alert
						if (event.result !== undefined) {
							event.originalEvent.returnValue = event.result;
						}
					}
				}
			},

			simulate: function(type, elem, event, bubble) {
				// Piggyback on a donor event to simulate a different one.
				// Fake originalEvent to avoid donor's stopPropagation, but if the
				// simulated event prevents default then we do the same on the donor.
				var e = jQuery.extend(
					new jQuery.Event(),
					event, {
						type: type,
						isSimulated: true,
						originalEvent: {}
					}
				);
				if (bubble) {
					jQuery.event.trigger(e, null, elem);
				} else {
					jQuery.event.dispatch.call(elem, e);
				}
				if (e.isDefaultPrevented()) {
					event.preventDefault();
				}
			}
		};

		jQuery.removeEvent = document.removeEventListener ?
			function(elem, type, handle) {
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handle, false);
				}
			} :
			function(elem, type, handle) {
				var name = "on" + type;

				if (elem.detachEvent) {

					// #8545, #7054, preventing memory leaks for custom events in IE6-8
					// detachEvent needed property on element, by name of that event, to properly expose it to GC
					if (typeof elem[name] === core_strundefined) {
						elem[name] = null;
					}

					elem.detachEvent(name, handle);
				}
			};

		jQuery.Event = function(src, props) {
			// Allow instantiation without the 'new' keyword
			if (!(this instanceof jQuery.Event)) {
				return new jQuery.Event(src, props);
			}

			// Event object
			if (src && src.type) {
				this.originalEvent = src;
				this.type = src.type;

				// Events bubbling up the document may have been marked as prevented
				// by a handler lower down the tree; reflect the correct value.
				this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
					src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

				// Event type
			} else {
				this.type = src;
			}

			// Put explicitly provided properties onto the event object
			if (props) {
				jQuery.extend(this, props);
			}

			// Create a timestamp if incoming event doesn't have one
			this.timeStamp = src && src.timeStamp || jQuery.now();

			// Mark it as fixed
			this[jQuery.expando] = true;
		};

		// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
		// //www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
		jQuery.Event.prototype = {
			isDefaultPrevented: returnFalse,
			isPropagationStopped: returnFalse,
			isImmediatePropagationStopped: returnFalse,

			preventDefault: function() {
				var e = this.originalEvent;

				this.isDefaultPrevented = returnTrue;
				if (!e) {
					return;
				}

				// If preventDefault exists, run it on the original event
				if (e.preventDefault) {
					e.preventDefault();

					// Support: IE
					// Otherwise set the returnValue property of the original event to false
				} else {
					e.returnValue = false;
				}
			},
			stopPropagation: function() {
				var e = this.originalEvent;

				this.isPropagationStopped = returnTrue;
				if (!e) {
					return;
				}
				// If stopPropagation exists, run it on the original event
				if (e.stopPropagation) {
					e.stopPropagation();
				}

				// Support: IE
				// Set the cancelBubble property of the original event to true
				e.cancelBubble = true;
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = returnTrue;
				this.stopPropagation();
			}
		};

		// Create mouseenter/leave events using mouseover/out and event-time checks
		jQuery.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(orig, fix) {
			jQuery.event.special[orig] = {
				delegateType: fix,
				bindType: fix,

				handle: function(event) {
					var ret,
						target = this,
						related = event.relatedTarget,
						handleObj = event.handleObj;

					// For mousenter/leave call the handler if related is outside the target.
					// NB: No relatedTarget if the mouse left/entered the browser window
					if (!related || (related !== target && !jQuery.contains(target, related))) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply(this, arguments);
						event.type = fix;
					}
					return ret;
				}
			};
		});

		// IE submit delegation
		if (!jQuery.support.submitBubbles) {

			jQuery.event.special.submit = {
				setup: function() {
					// Only need this for delegated form submit events
					if (jQuery.nodeName(this, "form")) {
						return false;
					}

					// Lazy-add a submit handler when a descendant form may potentially be submitted
					jQuery.event.add(this, "click._submit keypress._submit", function(e) {
						// Node name check avoids a VML-related crash in IE (#9807)
						var elem = e.target,
							form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
						if (form && !jQuery._data(form, "submitBubbles")) {
							jQuery.event.add(form, "submit._submit", function(event) {
								event._submit_bubble = true;
							});
							jQuery._data(form, "submitBubbles", true);
						}
					});
					// return undefined since we don't need an event listener
				},

				postDispatch: function(event) {
					// If form was submitted by the user, bubble the event up the tree
					if (event._submit_bubble) {
						delete event._submit_bubble;
						if (this.parentNode && !event.isTrigger) {
							jQuery.event.simulate("submit", this.parentNode, event, true);
						}
					}
				},

				teardown: function() {
					// Only need this for delegated form submit events
					if (jQuery.nodeName(this, "form")) {
						return false;
					}

					// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
					jQuery.event.remove(this, "._submit");
				}
			};
		}

		// IE change delegation and checkbox/radio fix
		if (!jQuery.support.changeBubbles) {

			jQuery.event.special.change = {

				setup: function() {

					if (rformElems.test(this.nodeName)) {
						// IE doesn't fire change on a check/radio until blur; trigger it on click
						// after a propertychange. Eat the blur-change in special.change.handle.
						// This still fires onchange a second time for check/radio after blur.
						if (this.type === "checkbox" || this.type === "radio") {
							jQuery.event.add(this, "propertychange._change", function(event) {
								if (event.originalEvent.propertyName === "checked") {
									this._just_changed = true;
								}
							});
							jQuery.event.add(this, "click._change", function(event) {
								if (this._just_changed && !event.isTrigger) {
									this._just_changed = false;
								}
								// Allow triggered, simulated change events (#11500)
								jQuery.event.simulate("change", this, event, true);
							});
						}
						return false;
					}
					// Delegated event; lazy-add a change handler on descendant inputs
					jQuery.event.add(this, "beforeactivate._change", function(e) {
						var elem = e.target;

						if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
							jQuery.event.add(elem, "change._change", function(event) {
								if (this.parentNode && !event.isSimulated && !event.isTrigger) {
									jQuery.event.simulate("change", this.parentNode, event, true);
								}
							});
							jQuery._data(elem, "changeBubbles", true);
						}
					});
				},

				handle: function(event) {
					var elem = event.target;

					// Swallow native change events from checkbox/radio, we already triggered them above
					if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
						return event.handleObj.handler.apply(this, arguments);
					}
				},

				teardown: function() {
					jQuery.event.remove(this, "._change");

					return !rformElems.test(this.nodeName);
				}
			};
		}

		// Create "bubbling" focus and blur events
		if (!jQuery.support.focusinBubbles) {
			jQuery.each({
				focus: "focusin",
				blur: "focusout"
			}, function(orig, fix) {

				// Attach a single capturing handler while someone wants focusin/focusout
				var attaches = 0,
					handler = function(event) {
						jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
					};

				jQuery.event.special[fix] = {
					setup: function() {
						if (attaches++ === 0) {
							document.addEventListener(orig, handler, true);
						}
					},
					teardown: function() {
						if (--attaches === 0) {
							document.removeEventListener(orig, handler, true);
						}
					}
				};
			});
		}

		jQuery.fn.extend({

			on: function(types, selector, data, fn, /*INTERNAL*/ one) {
				var type, origFn;

				// Types can be a map of types/handlers
				if (typeof types === "object") {
					// ( types-Object, selector, data )
					if (typeof selector !== "string") {
						// ( types-Object, data )
						data = data || selector;
						selector = undefined;
					}
					for (type in types) {
						this.on(type, selector, data, types[type], one);
					}
					return this;
				}

				if (data == null && fn == null) {
					// ( types, fn )
					fn = selector;
					data = selector = undefined;
				} else if (fn == null) {
					if (typeof selector === "string") {
						// ( types, selector, fn )
						fn = data;
						data = undefined;
					} else {
						// ( types, data, fn )
						fn = data;
						data = selector;
						selector = undefined;
					}
				}
				if (fn === false) {
					fn = returnFalse;
				} else if (!fn) {
					return this;
				}

				if (one === 1) {
					origFn = fn;
					fn = function(event) {
						// Can use an empty set, since event contains the info
						jQuery().off(event);
						return origFn.apply(this, arguments);
					};
					// Use same guid so caller can remove using origFn
					fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
				}
				return this.each(function() {
					jQuery.event.add(this, types, fn, data, selector);
				});
			},
			one: function(types, selector, data, fn) {
				return this.on(types, selector, data, fn, 1);
			},
			off: function(types, selector, fn) {
				var handleObj, type;
				if (types && types.preventDefault && types.handleObj) {
					// ( event )  dispatched jQuery.Event
					handleObj = types.handleObj;
					jQuery(types.delegateTarget).off(
						handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
						handleObj.selector,
						handleObj.handler
					);
					return this;
				}
				if (typeof types === "object") {
					// ( types-object [, selector] )
					for (type in types) {
						this.off(type, selector, types[type]);
					}
					return this;
				}
				if (selector === false || typeof selector === "function") {
					// ( types [, fn] )
					fn = selector;
					selector = undefined;
				}
				if (fn === false) {
					fn = returnFalse;
				}
				return this.each(function() {
					jQuery.event.remove(this, types, fn, selector);
				});
			},

			bind: function(types, data, fn) {
				return this.on(types, null, data, fn);
			},
			unbind: function(types, fn) {
				return this.off(types, null, fn);
			},

			delegate: function(selector, types, data, fn) {
				return this.on(types, selector, data, fn);
			},
			undelegate: function(selector, types, fn) {
				// ( namespace ) or ( selector, types [, fn] )
				return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
			},

			trigger: function(type, data) {
				return this.each(function() {
					jQuery.event.trigger(type, data, this);
				});
			},
			triggerHandler: function(type, data) {
				var elem = this[0];
				if (elem) {
					return jQuery.event.trigger(type, data, elem, true);
				}
			}
		});
		/*!
		 * Sizzle CSS Selector Engine
		 * Copyright 2012 jQuery Foundation and other contributors
		 * Released under the MIT license
		 * //sizzlejs.com/
		 */
		(function(window, undefined) {

			var i,
				cachedruns,
				Expr,
				getText,
				isXML,
				compile,
				hasDuplicate,
				outermostContext,

				// Local document vars
				setDocument,
				document,
				docElem,
				documentIsXML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,
				sortOrder,

				// Instance-specific data
				expando = "sizzle" + -(new Date()),
				preferredDoc = window.document,
				support = {},
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),

				// General-purpose constants
				strundefined = typeof undefined,
				MAX_NEGATIVE = 1 << 31,

				// Array methods
				arr = [],
				pop = arr.pop,
				push = arr.push,
				slice = arr.slice,
				// Use a stripped-down indexOf if we can't use a native one
				indexOf = arr.indexOf || function(elem) {
					var i = 0,
						len = this.length;
					for (; i < len; i++) {
						if (this[i] === elem) {
							return i;
						}
					}
					return -1;
				},


				// Regular expressions

				// Whitespace characters //www.w3.org/TR/css3-selectors/#whitespace
				whitespace = "[\\x20\\t\\r\\n\\f]",
				// //www.w3.org/TR/css3-syntax/#characters
				characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

				// Loosely modeled on CSS identifier characters
				// An unquoted value should be a CSS identifier //www.w3.org/TR/css3-selectors/#attribute-selectors
				// Proper syntax: //www.w3.org/TR/CSS21/syndata.html#value-def-identifier
				identifier = characterEncoding.replace("w", "w#"),

				// Acceptable operators //www.w3.org/TR/selectors/#attribute-selectors
				operators = "([*^$|!~]?=)",
				attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
				"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

				// Prefer arguments quoted,
				//   then not containing pseudos/brackets,
				//   then attribute selectors/non-parenthetical expressions,
				//   then anything else
				// These preferences are here to reduce the number of selectors
				//   needing tokenize in the PSEUDO preFilter
				pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

				// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
				rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

				rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
				rpseudo = new RegExp(pseudos),
				ridentifier = new RegExp("^" + identifier + "$"),

				matchExpr = {
					"ID": new RegExp("^#(" + characterEncoding + ")"),
					"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
					"NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
					"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
					"ATTR": new RegExp("^" + attributes),
					"PSEUDO": new RegExp("^" + pseudos),
					"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i"),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
				},

				rsibling = /[\x20\t\r\n\f]*[+~]/,

				rnative = /^[^{]+\{\s*\[native code/,

				// Easily-parseable/retrievable ID or TAG or CLASS selectors
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,

				rescape = /'|\\/g,
				rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

				// CSS escapes //www.w3.org/TR/CSS21/syndata.html#escaped-characters
				runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
				funescape = function(_, escaped) {
					var high = "0x" + escaped - 0x10000;
					// NaN means non-codepoint
					return high !== high ?
						escaped :
						// BMP codepoint
						high < 0 ?
						String.fromCharCode(high + 0x10000) :
						// Supplemental Plane codepoint (surrogate pair)
						String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
				};

			// Use a stripped-down slice if we can't use a native one
			try {
				slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
			} catch (e) {
				slice = function(i) {
					var elem,
						results = [];
					while ((elem = this[i++])) {
						results.push(elem);
					}
					return results;
				};
			}

			/**
			 * For feature detection
			 * @param {Function} fn The function to test for native support
			 */
			function isNative(fn) {
				return rnative.test(fn + "");
			}

			/**
			 * Create key-value caches of limited size
			 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
			 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
			 *	deleting the oldest entry
			 */
			function createCache() {
				var cache,
					keys = [];

				return (cache = function(key, value) {
					// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
					if (keys.push(key += " ") > Expr.cacheLength) {
						// Only keep the most recent entries
						delete cache[keys.shift()];
					}
					return (cache[key] = value);
				});
			}

			/**
			 * Mark a function for special use by Sizzle
			 * @param {Function} fn The function to mark
			 */
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}

			/**
			 * Support testing using an element
			 * @param {Function} fn Passed the created div and expects a boolean result
			 */
			function assert(fn) {
				var div = document.createElement("div");

				try {
					return fn(div);
				} catch (e) {
					return false;
				} finally {
					// release memory in IE
					div = null;
				}
			}

			function Sizzle(selector, context, results, seed) {
				var match, elem, m, nodeType,
					// QSA vars
					i, groups, old, nid, newContext, newSelector;

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}

				context = context || document;
				results = results || [];

				if (!selector || typeof selector !== "string") {
					return results;
				}

				if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
					return [];
				}

				if (!documentIsXML && !seed) {

					// Shortcuts
					if ((match = rquickExpr.exec(selector))) {
						// Speed-up: Sizzle("#ID")
						if ((m = match[1])) {
							if (nodeType === 9) {
								elem = context.getElementById(m);
								// Check parentNode to catch when Blackberry 4.6 returns
								// nodes that are no longer in the document #6963
								if (elem && elem.parentNode) {
									// Handle the case where IE, Opera, and Webkit return items
									// by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}
							} else {
								// Context is not a document
								if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
									contains(context, elem) && elem.id === m) {
									results.push(elem);
									return results;
								}
							}

							// Speed-up: Sizzle("TAG")
						} else if (match[2]) {
							push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
							return results;

							// Speed-up: Sizzle(".CLASS")
						} else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
							push.apply(results, slice.call(context.getElementsByClassName(m), 0));
							return results;
						}
					}

					// QSA path
					if (support.qsa && !rbuggyQSA.test(selector)) {
						old = true;
						nid = expando;
						newContext = context;
						newSelector = nodeType === 9 && selector;

						// qSA works strangely on Element-rooted queries
						// We can work around this by specifying an extra ID on the root
						// and working up from there (Thanks to Andrew Dupont for the technique)
						// IE 8 doesn't work on object elements
						if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
							groups = tokenize(selector);

							if ((old = context.getAttribute("id"))) {
								nid = old.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid);
							}
							nid = "[id='" + nid + "'] ";

							i = groups.length;
							while (i--) {
								groups[i] = nid + toSelector(groups[i]);
							}
							newContext = rsibling.test(selector) && context.parentNode || context;
							newSelector = groups.join(",");
						}

						if (newSelector) {
							try {
								push.apply(results, slice.call(newContext.querySelectorAll(
									newSelector
								), 0));
								return results;
							} catch (qsaError) {} finally {
								if (!old) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}

				// All others
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}

			/**
			 * Detect xml
			 * @param {Element|Object} elem An element or a document
			 */
			isXML = Sizzle.isXML = function(elem) {
				// documentElement is verified for cases where it doesn't yet exist
				// (such as loading iframes in IE - #4833)
				var documentElement = elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};

			/**
			 * Sets document-related variables once based on the current document
			 * @param {Element|Object} [doc] An element or document object to use to set the document
			 * @returns {Object} Returns the current document
			 */
			setDocument = Sizzle.setDocument = function(node) {
				var doc = node ? node.ownerDocument || node : preferredDoc;

				// If no document and documentElement is available, return
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}

				// Set our document
				document = doc;
				docElem = doc.documentElement;

				// Support tests
				documentIsXML = isXML(doc);

				// Check if getElementsByTagName("*") returns only elements
				support.tagNameNoComments = assert(function(div) {
					div.appendChild(doc.createComment(""));
					return !div.getElementsByTagName("*").length;
				});

				// Check if attributes should be retrieved by attribute nodes
				support.attributes = assert(function(div) {
					div.innerHTML = "<select></select>";
					var type = typeof div.lastChild.getAttribute("multiple");
					// IE8 returns a string for some attributes even when not present
					return type !== "boolean" && type !== "string";
				});

				// Check if getElementsByClassName can be trusted
				support.getByClassName = assert(function(div) {
					// Opera can't find a second classname (in 9.6)
					div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
					if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
						return false;
					}

					// Safari 3.2 caches class attributes and doesn't catch changes
					div.lastChild.className = "e";
					return div.getElementsByClassName("e").length === 2;
				});

				// Check if getElementById returns elements by name
				// Check if getElementsByName privileges form controls or returns elements by ID
				support.getByName = assert(function(div) {
					// Inject content
					div.id = expando + 0;
					div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
					docElem.insertBefore(div, docElem.firstChild);

					// Test
					var pass = doc.getElementsByName &&
						// buggy browsers will return fewer than the correct 2
						doc.getElementsByName(expando).length === 2 +
						// buggy browsers will return more than the correct 0
						doc.getElementsByName(expando + 0).length;
					support.getIdNotName = !doc.getElementById(expando);

					// Cleanup
					docElem.removeChild(div);

					return pass;
				});

				// IE6/7 return modified attributes
				Expr.attrHandle = assert(function(div) {
					div.innerHTML = "<a href='#'></a>";
					return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
						div.firstChild.getAttribute("href") === "#";
				}) ? {} : {
					"href": function(elem) {
						return elem.getAttribute("href", 2);
					},
					"type": function(elem) {
						return elem.getAttribute("type");
					}
				};

				// ID find and filter
				if (support.getIdNotName) {
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== strundefined && !documentIsXML) {
							var m = context.getElementById(id);
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							return m && m.parentNode ? [m] : [];
						}
					};
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
				} else {
					Expr.find["ID"] = function(id, context) {
						if (typeof context.getElementById !== strundefined && !documentIsXML) {
							var m = context.getElementById(id);

							return m ?
								m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
								[m] :
								undefined :
								[];
						}
					};
					Expr.filter["ID"] = function(id) {
						var attrId = id.replace(runescape, funescape);
						return function(elem) {
							var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
				}

				// Tag
				Expr.find["TAG"] = support.tagNameNoComments ?
					function(tag, context) {
						if (typeof context.getElementsByTagName !== strundefined) {
							return context.getElementsByTagName(tag);
						}
					} :
					function(tag, context) {
						var elem,
							tmp = [],
							i = 0,
							results = context.getElementsByTagName(tag);

						// Filter out possible comments
						if (tag === "*") {
							while ((elem = results[i++])) {
								if (elem.nodeType === 1) {
									tmp.push(elem);
								}
							}

							return tmp;
						}
						return results;
					};

				// Name
				Expr.find["NAME"] = support.getByName && function(tag, context) {
					if (typeof context.getElementsByName !== strundefined) {
						return context.getElementsByName(name);
					}
				};

				// Class
				Expr.find["CLASS"] = support.getByClassName && function(className, context) {
					if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) {
						return context.getElementsByClassName(className);
					}
				};

				// QSA and matchesSelector support

				// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
				rbuggyMatches = [];

				// qSa(:focus) reports false when true (Chrome 21),
				// no need to also add to buggyMatches since matches checks buggyQSA
				// A support test would require too much code (would include document ready)
				rbuggyQSA = [":focus"];

				if ((support.qsa = isNative(doc.querySelectorAll))) {
					// Build QSA regex
					// Regex strategy adopted from Diego Perini
					assert(function(div) {
						// Select is set to empty string on purpose
						// This is to test IE's treatment of not explictly
						// setting a boolean content attribute,
						// since its presence should be enough
						// //bugs.jquery.com/ticket/12359
						div.innerHTML = "<select><option selected=''></option></select>";

						// IE8 - Some boolean attributes are not treated correctly
						if (!div.querySelectorAll("[selected]").length) {
							rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
						}

						// Webkit/Opera - :checked should return selected option elements
						// //www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}
					});

					assert(function(div) {

						// Opera 10-12/IE8 - ^= $= *= and empty values
						// Should not select anything
						div.innerHTML = "<input type='hidden' i=''/>";
						if (div.querySelectorAll("[i^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
						}

						// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
						// IE8 throws error here and will not see later tests
						if (!div.querySelectorAll(":enabled").length) {
							rbuggyQSA.push(":enabled", ":disabled");
						}

						// Opera 10-11 does not throw on post-comma invalid pseudos
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}

				if ((support.matchesSelector = isNative((matches = docElem.matchesSelector ||
						docElem.mozMatchesSelector ||
						docElem.webkitMatchesSelector ||
						docElem.oMatchesSelector ||
						docElem.msMatchesSelector)))) {

					assert(function(div) {
						// Check to see if it's possible to do matchesSelector
						// on a disconnected node (IE 9)
						support.disconnectedMatch = matches.call(div, "div");

						// This should fail with an exception
						// Gecko does not error, returns false instead
						matches.call(div, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}

				rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches = new RegExp(rbuggyMatches.join("|"));

				// Element contains another
				// Purposefully does not implement inclusive descendent
				// As in, an element does not contain itself
				contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
					function(a, b) {
						var adown = a.nodeType === 9 ? a.documentElement : a,
							bup = b && b.parentNode;
						return a === bup || !!(bup && bup.nodeType === 1 && (
							adown.contains ?
							adown.contains(bup) :
							a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
						));
					} :
					function(a, b) {
						if (b) {
							while ((b = b.parentNode)) {
								if (b === a) {
									return true;
								}
							}
						}
						return false;
					};

				// Document order sorting
				sortOrder = docElem.compareDocumentPosition ?
					function(a, b) {
						var compare;

						if (a === b) {
							hasDuplicate = true;
							return 0;
						}

						if ((compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b))) {
							if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
								if (a === doc || contains(preferredDoc, a)) {
									return -1;
								}
								if (b === doc || contains(preferredDoc, b)) {
									return 1;
								}
								return 0;
							}
							return compare & 4 ? -1 : 1;
						}

						return a.compareDocumentPosition ? -1 : 1;
					} :
					function(a, b) {
						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [a],
							bp = [b];

						// Exit early if the nodes are identical
						if (a === b) {
							hasDuplicate = true;
							return 0;

							// Parentless nodes are either documents or disconnected
						} else if (!aup || !bup) {
							return a === doc ? -1 :
								b === doc ? 1 :
								aup ? -1 :
								bup ? 1 :
								0;

							// If the nodes are siblings, we can do a quick check
						} else if (aup === bup) {
							return siblingCheck(a, b);
						}

						// Otherwise we need full lists of their ancestors for comparison
						cur = a;
						while ((cur = cur.parentNode)) {
							ap.unshift(cur);
						}
						cur = b;
						while ((cur = cur.parentNode)) {
							bp.unshift(cur);
						}

						// Walk down the tree looking for a discrepancy
						while (ap[i] === bp[i]) {
							i++;
						}

						return i ?
							// Do a sibling check if the nodes have a common ancestor
							siblingCheck(ap[i], bp[i]) :

							// Otherwise nodes in our document sort first
							ap[i] === preferredDoc ? -1 :
							bp[i] === preferredDoc ? 1 :
							0;
					};

				// Always assume the presence of duplicates if sort doesn't
				// pass them to our comparison function (as in Google Chrome).
				hasDuplicate = false;
				[0, 0].sort(sortOrder);
				support.detectDuplicates = hasDuplicate;

				return document;
			};

			Sizzle.matches = function(expr, elements) {
				return Sizzle(expr, null, null, elements);
			};

			Sizzle.matchesSelector = function(elem, expr) {
				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				// Make sure that attribute selectors are quoted
				expr = expr.replace(rattributeQuotes, "='$1']");

				// rbuggyQSA always contains :focus, so no need for an existence check
				if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
					try {
						var ret = matches.call(elem, expr);

						// IE 9's matchesSelector returns false on disconnected nodes
						if (ret || support.disconnectedMatch ||
							// As well, disconnected nodes are said to be in a document
							// fragment in IE 9
							elem.document && elem.document.nodeType !== 11) {
							return ret;
						}
					} catch (e) {}
				}

				return Sizzle(expr, document, null, [elem]).length > 0;
			};

			Sizzle.contains = function(context, elem) {
				// Set document vars if needed
				if ((context.ownerDocument || context) !== document) {
					setDocument(context);
				}
				return contains(context, elem);
			};

			Sizzle.attr = function(elem, name) {
				var val;

				// Set document vars if needed
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}

				if (!documentIsXML) {
					name = name.toLowerCase();
				}
				if ((val = Expr.attrHandle[name])) {
					return val(elem);
				}
				if (documentIsXML || support.attributes) {
					return elem.getAttribute(name);
				}
				return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ?
					name :
					val && val.specified ? val.value : null;
			};

			Sizzle.error = function(msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};

			// Document sorting and removing duplicates
			Sizzle.uniqueSort = function(results) {
				var elem,
					duplicates = [],
					i = 1,
					j = 0;

				// Unless we *know* we can detect duplicates, assume their presence
				hasDuplicate = !support.detectDuplicates;
				results.sort(sortOrder);

				if (hasDuplicate) {
					for (;
						(elem = results[i]); i++) {
						if (elem === results[i - 1]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}

				return results;
			};

			function siblingCheck(a, b) {
				var cur = b && a,
					diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

				// Use IE sourceIndex if available on both nodes
				if (diff) {
					return diff;
				}

				// Check if b follows a
				if (cur) {
					while ((cur = cur.nextSibling)) {
						if (cur === b) {
							return -1;
						}
					}
				}

				return a ? 1 : -1;
			}

			// Returns a function to use in pseudos for input types
			function createInputPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}

			// Returns a function to use in pseudos for buttons
			function createButtonPseudo(type) {
				return function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}

			// Returns a function to use in pseudos for positionals
			function createPositionalPseudo(fn) {
				return markFunction(function(argument) {
					argument = +argument;
					return markFunction(function(seed, matches) {
						var j,
							matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;

						// Match elements found at the specified indexes
						while (i--) {
							if (seed[(j = matchIndexes[i])]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}

			/**
			 * Utility function for retrieving the text value of an array of DOM nodes
			 * @param {Array|Element} elem
			 */
			getText = Sizzle.getText = function(elem) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;

				if (!nodeType) {
					// If no nodeType, this is expected to be an array
					for (;
						(node = elem[i]); i++) {
						// Do not traverse comment nodes
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (see #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse its children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				// Do not include comment or processing instruction nodes

				return ret;
			};

			Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength: 50,

				createPseudo: markFunction,

				match: matchExpr,

				find: {},

				relative: {
					">": {
						dir: "parentNode",
						first: true
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: true
					},
					"~": {
						dir: "previousSibling"
					}
				},

				preFilter: {
					"ATTR": function(match) {
						match[1] = match[1].replace(runescape, funescape);

						// Move the given value to match[3] whether quoted or unquoted
						match[3] = (match[4] || match[5] || "").replace(runescape, funescape);

						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}

						return match.slice(0, 4);
					},

					"CHILD": function(match) {
						/* matches from matchExpr["CHILD"]
							1 type (only|nth|...)
							2 what (child|of-type)
							3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
							4 xn-component of xn+y argument ([+-]?\d*n|)
							5 sign of xn-component
							6 x of xn-component
							7 sign of y-component
							8 y of y-component
						*/
						match[1] = match[1].toLowerCase();

						if (match[1].slice(0, 3) === "nth") {
							// nth-* requires argument
							if (!match[3]) {
								Sizzle.error(match[0]);
							}

							// numeric x and y parameters for Expr.filter.CHILD
							// remember that false/true cast respectively to 0/1
							match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +((match[7] + match[8]) || match[3] === "odd");

							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}

						return match;
					},

					"PSEUDO": function(match) {
						var excess,
							unquoted = !match[5] && match[2];

						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}

						// Accept quoted arguments as-is
						if (match[4]) {
							match[2] = match[4];

							// Strip excess characters from unquoted arguments
						} else if (unquoted && rpseudo.test(unquoted) &&
							// Get excess from tokenize (recursively)
							(excess = tokenize(unquoted, true)) &&
							// advance to the next closing parenthesis
							(excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

							// excess is a negative index
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}

						// Return only captures needed by the pseudo filter method (type and argument)
						return match.slice(0, 3);
					}
				},

				filter: {

					"TAG": function(nodeName) {
						if (nodeName === "*") {
							return function() {
								return true;
							};
						}

						nodeName = nodeName.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
					},

					"CLASS": function(className) {
						var pattern = classCache[className + " "];

						return pattern ||
							(pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
							classCache(className, function(elem) {
								return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
							});
					},

					"ATTR": function(name, operator, check) {
						return function(elem) {
							var result = Sizzle.attr(elem, name);

							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check :
								operator === "!=" ? result !== check :
								operator === "^=" ? check && result.indexOf(check) === 0 :
								operator === "*=" ? check && result.indexOf(check) > -1 :
								operator === "$=" ? check && result.slice(-check.length) === check :
								operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
								operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
								false;
						};
					},

					"CHILD": function(type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";

						return first === 1 && last === 0 ?

							// Shortcut for :nth-*(n)
							function(elem) {
								return !!elem.parentNode;
							} :

							function(elem, context, xml) {
								var cache, outerCache, node, diff, nodeIndex, start,
									dir = simple !== forward ? "nextSibling" : "previousSibling",
									parent = elem.parentNode,
									name = ofType && elem.nodeName.toLowerCase(),
									useCache = !xml && !ofType;

								if (parent) {

									// :(first|last|only)-(child|of-type)
									if (simple) {
										while (dir) {
											node = elem;
											while ((node = node[dir])) {
												if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
													return false;
												}
											}
											// Reverse direction for :only-* (if we haven't yet done so)
											start = dir = type === "only" && !start && "nextSibling";
										}
										return true;
									}

									start = [forward ? parent.firstChild : parent.lastChild];

									// non-xml :nth-child(...) stores cache data on `parent`
									if (forward && useCache) {
										// Seek `elem` from a previously-cached index
										outerCache = parent[expando] || (parent[expando] = {});
										cache = outerCache[type] || [];
										nodeIndex = cache[0] === dirruns && cache[1];
										diff = cache[0] === dirruns && cache[2];
										node = nodeIndex && parent.childNodes[nodeIndex];

										while ((node = ++nodeIndex && node && node[dir] ||

												// Fallback to seeking `elem` from the start
												(diff = nodeIndex = 0) || start.pop())) {

											// When found, cache indexes on `parent` and break
											if (node.nodeType === 1 && ++diff && node === elem) {
												outerCache[type] = [dirruns, nodeIndex, diff];
												break;
											}
										}

										// Use previously-cached element index if available
									} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
										diff = cache[1];

										// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
									} else {
										// Use the same loop as above to seek `elem` from the start
										while ((node = ++nodeIndex && node && node[dir] ||
												(diff = nodeIndex = 0) || start.pop())) {

											if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
												// Cache the index of each encountered element
												if (useCache) {
													(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
												}

												if (node === elem) {
													break;
												}
											}
										}
									}

									// Incorporate the offset, then check against cycle size
									diff -= last;
									return diff === first || (diff % first === 0 && diff / first >= 0);
								}
							};
					},

					"PSEUDO": function(pseudo, argument) {
						// pseudo-class names are case-insensitive
						// //www.w3.org/TR/selectors/#pseudo-classes
						// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
						// Remember that setFilters inherits from pseudos
						var args,
							fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
							Sizzle.error("unsupported pseudo: " + pseudo);

						// The user may use createPseudo to indicate that
						// arguments are needed to create the filter function
						// just as Sizzle does
						if (fn[expando]) {
							return fn(argument);
						}

						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
								markFunction(function(seed, matches) {
									var idx,
										matched = fn(seed, argument),
										i = matched.length;
									while (i--) {
										idx = indexOf.call(seed, matched[i]);
										seed[idx] = !(matches[idx] = matched[i]);
									}
								}) :
								function(elem) {
									return fn(elem, 0, args);
								};
						}

						return fn;
					}
				},

				pseudos: {
					// Potentially complex pseudos
					"not": markFunction(function(selector) {
						// Trim the selector passed to compile
						// to avoid treating leading and trailing
						// spaces as combinators
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));

						return matcher[expando] ?
							markFunction(function(seed, matches, context, xml) {
								var elem,
									unmatched = matcher(seed, null, xml, []),
									i = seed.length;

								// Match elements unmatched by `matcher`
								while (i--) {
									if ((elem = unmatched[i])) {
										seed[i] = !(matches[i] = elem);
									}
								}
							}) :
							function(elem, context, xml) {
								input[0] = elem;
								matcher(input, null, xml, results);
								return !results.pop();
							};
					}),

					"has": markFunction(function(selector) {
						return function(elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),

					"contains": markFunction(function(text) {
						return function(elem) {
							return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
						};
					}),

					// "Whether an element is represented by a :lang() selector
					// is based solely on the element's language value
					// being equal to the identifier C,
					// or beginning with the identifier C immediately followed by "-".
					// The matching of C against the element's language value is performed case-insensitively.
					// The identifier C does not have to be a valid language name."
					// //www.w3.org/TR/selectors/#lang-pseudo
					"lang": markFunction(function(lang) {
						// lang value must be a valid identifider
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							var elemLang;
							do {
								if ((elemLang = documentIsXML ?
										elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
										elem.lang)) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),

					// Miscellaneous
					"target": function(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},

					"root": function(elem) {
						return elem === docElem;
					},

					"focus": function(elem) {
						return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled": function(elem) {
						return elem.disabled === false;
					},

					"disabled": function(elem) {
						return elem.disabled === true;
					},

					"checked": function(elem) {
						// In CSS3, :checked should return both checked and selected elements
						// //www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
					},

					"selected": function(elem) {
						// Accessing this property makes selected-by-default
						// options in Safari work properly
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty": function(elem) {
						// //www.w3.org/TR/selectors/#empty-pseudo
						// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
						//   not comment, processing instructions, or others
						// Thanks to Diego Perini for the nodeName shortcut
						//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
								return false;
							}
						}
						return true;
					},

					"parent": function(elem) {
						return !Expr.pseudos["empty"](elem);
					},

					// Element/input types
					"header": function(elem) {
						return rheader.test(elem.nodeName);
					},

					"input": function(elem) {
						return rinputs.test(elem.nodeName);
					},

					"button": function(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button" || name === "button";
					},

					"text": function(elem) {
						var attr;
						// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
						// use getAttribute instead to test this case
						return elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&
							((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
					},

					// Position-in-collection
					"first": createPositionalPseudo(function() {
						return [0];
					}),

					"last": createPositionalPseudo(function(matchIndexes, length) {
						return [length - 1];
					}),

					"eq": createPositionalPseudo(function(matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),

					"even": createPositionalPseudo(function(matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"odd": createPositionalPseudo(function(matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};

			// Add button/input type pseudos
			for (i in {
					radio: true,
					checkbox: true,
					file: true,
					password: true,
					image: true
				}) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in {
					submit: true,
					reset: true
				}) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}

			function tokenize(selector, parseOnly) {
				var matched, match, tokens, type,
					soFar, groups, preFilters,
					cached = tokenCache[selector + " "];

				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}

				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;

				while (soFar) {

					// Comma and first run
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							// Don't consume trailing commas as valid
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push(tokens = []);
					}

					matched = false;

					// Combinators
					if ((match = rcombinators.exec(soFar))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							// Cast descendant combinators to space
							type: match[0].replace(rtrim, " ")
						});
						soFar = soFar.slice(matched.length);
					}

					// Filters
					for (type in Expr.filter) {
						if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
								(match = preFilters[type](match)))) {
							matched = match.shift();
							tokens.push({
								value: matched,
								type: type,
								matches: match
							});
							soFar = soFar.slice(matched.length);
						}
					}

					if (!matched) {
						break;
					}
				}

				// Return the length of the invalid excess
				// if we're just parsing
				// Otherwise, throw an error or return tokens
				return parseOnly ?
					soFar.length :
					soFar ?
					Sizzle.error(selector) :
					// Cache the tokens
					tokenCache(selector, groups).slice(0);
			}

			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}

			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;

				return combinator.first ?
					// Check against closest ancestor/preceding element
					function(elem, context, xml) {
						while ((elem = elem[dir])) {
							if (elem.nodeType === 1 || checkNonElements) {
								return matcher(elem, context, xml);
							}
						}
					} :

					// Check against all ancestor/preceding elements
					function(elem, context, xml) {
						var data, cache, outerCache,
							dirkey = dirruns + " " + doneName;

						// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
						if (xml) {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									if (matcher(elem, context, xml)) {
										return true;
									}
								}
							}
						} else {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									outerCache = elem[expando] || (elem[expando] = {});
									if ((cache = outerCache[dir]) && cache[0] === dirkey) {
										if ((data = cache[1]) === true || data === cachedruns) {
											return data === true;
										}
									} else {
										cache = outerCache[dir] = [dirkey];
										cache[1] = matcher(elem, context, xml) || cachedruns;
										if (cache[1] === true) {
											return true;
										}
									}
								}
							}
						}
					};
			}

			function elementMatcher(matchers) {
				return matchers.length > 1 ?
					function(elem, context, xml) {
						var i = matchers.length;
						while (i--) {
							if (!matchers[i](elem, context, xml)) {
								return false;
							}
						}
						return true;
					} :
					matchers[0];
			}

			function condense(unmatched, map, filter, context, xml) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;

				for (; i < len; i++) {
					if ((elem = unmatched[i])) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}

				return newUnmatched;
			}

			function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function(seed, results, context, xml) {
					var temp, i, elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,

						// Get initial elements from seed or context
						elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

						// Prefilter to get matcher input, preserving a map for seed-results synchronization
						matcherIn = preFilter && (seed || !selector) ?
						condense(elems, preMap, preFilter, context, xml) :
						elems,

						matcherOut = matcher ?
						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || (seed ? preFilter : preexisting || postFilter) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
						matcherIn;

					// Find primary matches
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}

					// Apply postFilter
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);

						// Un-match failing elements by moving them back to matcherIn
						i = temp.length;
						while (i--) {
							if ((elem = temp[i])) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}

					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								// Get the final matcherOut by condensing this intermediate into postFinder contexts
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i])) {
										// Restore matcherIn since elem is not yet a final match
										temp.push((matcherIn[i] = elem));
									}
								}
								postFinder(null, (matcherOut = []), temp, xml);
							}

							// Move matched elements from seed to results to keep them synchronized
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

									seed[temp] = !(results[temp] = elem);
								}
							}
						}

						// Add elements to results, through postFinder if defined
					} else {
						matcherOut = condense(
							matcherOut === results ?
							matcherOut.splice(preexisting, matcherOut.length) :
							matcherOut
						);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}

			function matcherFromTokens(tokens) {
				var checkContext, matcher, j,
					len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,

					// The foundational matcher ensures that elements are reachable from top-level context(s)
					matchContext = addCombinator(function(elem) {
						return elem === checkContext;
					}, implicitRelative, true),
					matchAnyContext = addCombinator(function(elem) {
						return indexOf.call(checkContext, elem) > -1;
					}, implicitRelative, true),
					matchers = [function(elem, context, xml) {
						return (!leadingRelative && (xml || context !== outermostContext)) || (
							(checkContext = context).nodeType ?
							matchContext(elem, context, xml) :
							matchAnyContext(elem, context, xml));
					}];

				for (; i < len; i++) {
					if ((matcher = Expr.relative[tokens[i].type])) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

						// Return special upon seeing a positional matcher
						if (matcher[expando]) {
							// Find the next relative operator (if any) for proper handling
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher(matchers),
								i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"),
								matcher,
								i < j && matcherFromTokens(tokens.slice(i, j)),
								j < len && matcherFromTokens((tokens = tokens.slice(j))),
								j < len && toSelector(tokens)
							);
						}
						matchers.push(matcher);
					}
				}

				return elementMatcher(matchers);
			}

			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				// A counter to specify which element is currently being matched
				var matcherCachedRuns = 0,
					bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function(seed, context, xml, results, expandContext) {
						var elem, j, matcher,
							setMatched = [],
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							outermost = expandContext != null,
							contextBackup = outermostContext,
							// We must always have either seed elements or context
							elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
							// Use integer dirruns iff this is the outermost matcher
							dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

						if (outermost) {
							outermostContext = context !== document && context;
							cachedruns = matcherCachedRuns;
						}

						// Add elements passing elementMatchers directly to results
						// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
						for (;
							(elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								while ((matcher = elementMatchers[j++])) {
									if (matcher(elem, context, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
									cachedruns = ++matcherCachedRuns;
								}
							}

							// Track unmatched elements for set filters
							if (bySet) {
								// They will have gone through all possible matchers
								if ((elem = !matcher && elem)) {
									matchedCount--;
								}

								// Lengthen the array for every element, matched or not
								if (seed) {
									unmatched.push(elem);
								}
							}
						}

						// Apply set filters to unmatched elements
						matchedCount += i;
						if (bySet && i !== matchedCount) {
							j = 0;
							while ((matcher = setMatchers[j++])) {
								matcher(unmatched, setMatched, context, xml);
							}

							if (seed) {
								// Reintegrate element matches to eliminate the need for sorting
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}

								// Discard index placeholder values to get only actual matches
								setMatched = condense(setMatched);
							}

							// Add matches to results
							push.apply(results, setMatched);

							// Seedless set matches succeeding multiple successful matchers stipulate sorting
							if (outermost && !seed && setMatched.length > 0 &&
								(matchedCount + setMatchers.length) > 1) {

								Sizzle.uniqueSort(results);
							}
						}

						// Override manipulation of globals by nested matchers
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}

						return unmatched;
					};

				return bySet ?
					markFunction(superMatcher) :
					superMatcher;
			}

			compile = Sizzle.compile = function(selector, group /* Internal Use Only */ ) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];

				if (!cached) {
					// Generate a function of recursive functions that can be used to check each element
					if (!group) {
						group = tokenize(selector);
					}
					i = group.length;
					while (i--) {
						cached = matcherFromTokens(group[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}

					// Cache the compiled function
					cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
				}
				return cached;
			};

			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}

			function select(selector, context, results, seed) {
				var i, tokens, token, type, find,
					match = tokenize(selector);

				if (!seed) {
					// Try to minimize operations if there is only one group
					if (match.length === 1) {

						// Take a shortcut and set the context if the root selector is an ID
						tokens = match[0] = match[0].slice(0);
						if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
							context.nodeType === 9 && !documentIsXML &&
							Expr.relative[tokens[1].type]) {

							context = Expr.find["ID"](token.matches[0].replace(runescape, funescape), context)[0];
							if (!context) {
								return results;
							}

							selector = selector.slice(tokens.shift().value.length);
						}

						// Fetch a seed set for right-to-left matching
						i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
						while (i--) {
							token = tokens[i];

							// Abort if we hit a combinator
							if (Expr.relative[(type = token.type)]) {
								break;
							}
							if ((find = Expr.find[type])) {
								// Search, expanding context for leading sibling combinators
								if ((seed = find(
										token.matches[0].replace(runescape, funescape),
										rsibling.test(tokens[0].type) && context.parentNode || context
									))) {

									// If seed is empty or no tokens remain, we can return early
									tokens.splice(i, 1);
									selector = seed.length && toSelector(tokens);
									if (!selector) {
										push.apply(results, slice.call(seed, 0));
										return results;
									}

									break;
								}
							}
						}
					}
				}

				// Compile and execute a filtering function
				// Provide `match` to avoid retokenization if we modified the selector above
				compile(selector, match)(
					seed,
					context,
					documentIsXML,
					results,
					rsibling.test(selector)
				);
				return results;
			}

			// Deprecated
			Expr.pseudos["nth"] = Expr.pseudos["eq"];

			// Easy API for creating new setFilters
			function setFilters() {}
			Expr.filters = setFilters.prototype = Expr.pseudos;
			Expr.setFilters = new setFilters();

			// Initialize with the default document
			setDocument();

			// Override sizzle attribute retrieval
			Sizzle.attr = jQuery.attr;
			jQuery.find = Sizzle;
			jQuery.expr = Sizzle.selectors;
			jQuery.expr[":"] = jQuery.expr.pseudos;
			jQuery.unique = Sizzle.uniqueSort;
			jQuery.text = Sizzle.getText;
			jQuery.isXMLDoc = Sizzle.isXML;
			jQuery.contains = Sizzle.contains;


		})(window);
		var runtil = /Until$/,
			rparentsprev = /^(?:parents|prev(?:Until|All))/,
			isSimple = /^.[^:#\[\.,]*$/,
			rneedsContext = jQuery.expr.match.needsContext,
			// methods guaranteed to produce a unique set when starting from a unique set
			guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};

		jQuery.fn.extend({
			find: function(selector) {
				var i, ret, self,
					len = this.length;

				if (typeof selector !== "string") {
					self = this;
					return this.pushStack(jQuery(selector).filter(function() {
						for (i = 0; i < len; i++) {
							if (jQuery.contains(self[i], this)) {
								return true;
							}
						}
					}));
				}

				ret = [];
				for (i = 0; i < len; i++) {
					jQuery.find(selector, this[i], ret);
				}

				// Needed because $( selector, context ) becomes $( context ).find( selector )
				ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
				ret.selector = (this.selector ? this.selector + " " : "") + selector;
				return ret;
			},

			has: function(target) {
				var i,
					targets = jQuery(target, this),
					len = targets.length;

				return this.filter(function() {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(this, targets[i])) {
							return true;
						}
					}
				});
			},

			not: function(selector) {
				return this.pushStack(winnow(this, selector, false));
			},

			filter: function(selector) {
				return this.pushStack(winnow(this, selector, true));
			},

			is: function(selector) {
				return !!selector && (
					typeof selector === "string" ?
					// If this is a positional/relative selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					rneedsContext.test(selector) ?
					jQuery(selector, this.context).index(this[0]) >= 0 :
					jQuery.filter(selector, this).length > 0 :
					this.filter(selector).length > 0);
			},

			closest: function(selectors, context) {
				var cur,
					i = 0,
					l = this.length,
					ret = [],
					pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
					jQuery(selectors, context || this.context) :
					0;

				for (; i < l; i++) {
					cur = this[i];

					while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
						if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
							ret.push(cur);
							break;
						}
						cur = cur.parentNode;
					}
				}

				return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
			},

			// Determine the position of an element within
			// the matched set of elements
			index: function(elem) {

				// No argument, return index in parent
				if (!elem) {
					return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
				}

				// index in selector
				if (typeof elem === "string") {
					return jQuery.inArray(this[0], jQuery(elem));
				}

				// Locate the position of the desired element
				return jQuery.inArray(
					// If it receives a jQuery object, the first element is used
					elem.jquery ? elem[0] : elem, this);
			},

			add: function(selector, context) {
				var set = typeof selector === "string" ?
					jQuery(selector, context) :
					jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
					all = jQuery.merge(this.get(), set);

				return this.pushStack(jQuery.unique(all));
			},

			addBack: function(selector) {
				return this.add(selector == null ?
					this.prevObject : this.prevObject.filter(selector)
				);
			}
		});

		jQuery.fn.andSelf = jQuery.fn.addBack;

		function sibling(cur, dir) {
			do {
				cur = cur[dir];
			} while (cur && cur.nodeType !== 1);

			return cur;
		}

		jQuery.each({
			parent: function(elem) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function(elem) {
				return jQuery.dir(elem, "parentNode");
			},
			parentsUntil: function(elem, i, until) {
				return jQuery.dir(elem, "parentNode", until);
			},
			next: function(elem) {
				return sibling(elem, "nextSibling");
			},
			prev: function(elem) {
				return sibling(elem, "previousSibling");
			},
			nextAll: function(elem) {
				return jQuery.dir(elem, "nextSibling");
			},
			prevAll: function(elem) {
				return jQuery.dir(elem, "previousSibling");
			},
			nextUntil: function(elem, i, until) {
				return jQuery.dir(elem, "nextSibling", until);
			},
			prevUntil: function(elem, i, until) {
				return jQuery.dir(elem, "previousSibling", until);
			},
			siblings: function(elem) {
				return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
			},
			children: function(elem) {
				return jQuery.sibling(elem.firstChild);
			},
			contents: function(elem) {
				return jQuery.nodeName(elem, "iframe") ?
					elem.contentDocument || elem.contentWindow.document :
					jQuery.merge([], elem.childNodes);
			}
		}, function(name, fn) {
			jQuery.fn[name] = function(until, selector) {
				var ret = jQuery.map(this, fn, until);

				if (!runtil.test(name)) {
					selector = until;
				}

				if (selector && typeof selector === "string") {
					ret = jQuery.filter(selector, ret);
				}

				ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;

				if (this.length > 1 && rparentsprev.test(name)) {
					ret = ret.reverse();
				}

				return this.pushStack(ret);
			};
		});

		jQuery.extend({
			filter: function(expr, elems, not) {
				if (not) {
					expr = ":not(" + expr + ")";
				}

				return elems.length === 1 ?
					jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] :
					jQuery.find.matches(expr, elems);
			},

			dir: function(elem, dir, until) {
				var matched = [],
					cur = elem[dir];

				while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
					if (cur.nodeType === 1) {
						matched.push(cur);
					}
					cur = cur[dir];
				}
				return matched;
			},

			sibling: function(n, elem) {
				var r = [];

				for (; n; n = n.nextSibling) {
					if (n.nodeType === 1 && n !== elem) {
						r.push(n);
					}
				}

				return r;
			}
		});

		// Implement the identical functionality for filter and not
		function winnow(elements, qualifier, keep) {

			// Can't pass null or undefined to indexOf in Firefox 4
			// Set to 0 to skip string check
			qualifier = qualifier || 0;

			if (jQuery.isFunction(qualifier)) {
				return jQuery.grep(elements, function(elem, i) {
					var retVal = !!qualifier.call(elem, i, elem);
					return retVal === keep;
				});

			} else if (qualifier.nodeType) {
				return jQuery.grep(elements, function(elem) {
					return (elem === qualifier) === keep;
				});

			} else if (typeof qualifier === "string") {
				var filtered = jQuery.grep(elements, function(elem) {
					return elem.nodeType === 1;
				});

				if (isSimple.test(qualifier)) {
					return jQuery.filter(qualifier, filtered, !keep);
				} else {
					qualifier = jQuery.filter(qualifier, filtered);
				}
			}

			return jQuery.grep(elements, function(elem) {
				return (jQuery.inArray(elem, qualifier) >= 0) === keep;
			});
		}

		function createSafeFragment(document) {
			var list = nodeNames.split("|"),
				safeFrag = document.createDocumentFragment();

			if (safeFrag.createElement) {
				while (list.length) {
					safeFrag.createElement(
						list.pop()
					);
				}
			}
			return safeFrag;
		}

		var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
			rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
			rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
			rleadingWhitespace = /^\s+/,
			rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			rtagName = /<([\w:]+)/,
			rtbody = /<tbody/i,
			rhtml = /<|&#?\w+;/,
			rnoInnerhtml = /<(?:script|style|link)/i,
			manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
			// checked="checked" or checked
			rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			rscriptType = /^$|\/(?:java|ecma)script/i,
			rscriptTypeMasked = /^true\/(.*)/,
			rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

			// We have to close these tags to support XHTML (#13200)
			wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				area: [1, "<map>", "</map>"],
				param: [1, "<object>", "</object>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

				// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
				// unless wrapped in a div with non-breaking characters in front of it.
				_default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
			},
			safeFragment = createSafeFragment(document),
			fragmentDiv = safeFragment.appendChild(document.createElement("div"));

		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		jQuery.fn.extend({
			text: function(value) {
				return jQuery.access(this, function(value) {
					return value === undefined ?
						jQuery.text(this) :
						this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
				}, null, value, arguments.length);
			},

			wrapAll: function(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function(i) {
						jQuery(this).wrapAll(html.call(this, i));
					});
				}

				if (this[0]) {
					// The elements to wrap the target around
					var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

					if (this[0].parentNode) {
						wrap.insertBefore(this[0]);
					}

					wrap.map(function() {
						var elem = this;

						while (elem.firstChild && elem.firstChild.nodeType === 1) {
							elem = elem.firstChild;
						}

						return elem;
					}).append(this);
				}

				return this;
			},

			wrapInner: function(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function(i) {
						jQuery(this).wrapInner(html.call(this, i));
					});
				}

				return this.each(function() {
					var self = jQuery(this),
						contents = self.contents();

					if (contents.length) {
						contents.wrapAll(html);

					} else {
						self.append(html);
					}
				});
			},

			wrap: function(html) {
				var isFunction = jQuery.isFunction(html);

				return this.each(function(i) {
					jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
				});
			},

			unwrap: function() {
				return this.parent().each(function() {
					if (!jQuery.nodeName(this, "body")) {
						jQuery(this).replaceWith(this.childNodes);
					}
				}).end();
			},

			append: function() {
				return this.domManip(arguments, true, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.appendChild(elem);
					}
				});
			},

			prepend: function() {
				return this.domManip(arguments, true, function(elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.insertBefore(elem, this.firstChild);
					}
				});
			},

			before: function() {
				return this.domManip(arguments, false, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this);
					}
				});
			},

			after: function() {
				return this.domManip(arguments, false, function(elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this.nextSibling);
					}
				});
			},

			// keepData is for internal use only--do not document
			remove: function(selector, keepData) {
				var elem,
					i = 0;

				for (;
					(elem = this[i]) != null; i++) {
					if (!selector || jQuery.filter(selector, [elem]).length > 0) {
						if (!keepData && elem.nodeType === 1) {
							jQuery.cleanData(getAll(elem));
						}

						if (elem.parentNode) {
							if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
								setGlobalEval(getAll(elem, "script"));
							}
							elem.parentNode.removeChild(elem);
						}
					}
				}

				return this;
			},

			empty: function() {
				var elem,
					i = 0;

				for (;
					(elem = this[i]) != null; i++) {
					// Remove element nodes and prevent memory leaks
					if (elem.nodeType === 1) {
						jQuery.cleanData(getAll(elem, false));
					}

					// Remove any remaining nodes
					while (elem.firstChild) {
						elem.removeChild(elem.firstChild);
					}

					// If this is a select, ensure that it displays empty (#12336)
					// Support: IE<9
					if (elem.options && jQuery.nodeName(elem, "select")) {
						elem.options.length = 0;
					}
				}

				return this;
			},

			clone: function(dataAndEvents, deepDataAndEvents) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

				return this.map(function() {
					return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
				});
			},

			html: function(value) {
				return jQuery.access(this, function(value) {
					var elem = this[0] || {},
						i = 0,
						l = this.length;

					if (value === undefined) {
						return elem.nodeType === 1 ?
							elem.innerHTML.replace(rinlinejQuery, "") :
							undefined;
					}

					// See if we can take a shortcut and just use innerHTML
					if (typeof value === "string" && !rnoInnerhtml.test(value) &&
						(jQuery.support.htmlSerialize || !rnoshimcache.test(value)) &&
						(jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
						!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

						value = value.replace(rxhtmlTag, "<$1></$2>");

						try {
							for (; i < l; i++) {
								// Remove element nodes and prevent memory leaks
								elem = this[i] || {};
								if (elem.nodeType === 1) {
									jQuery.cleanData(getAll(elem, false));
									elem.innerHTML = value;
								}
							}

							elem = 0;

							// If using innerHTML throws an exception, use the fallback method
						} catch (e) {}
					}

					if (elem) {
						this.empty().append(value);
					}
				}, null, value, arguments.length);
			},

			replaceWith: function(value) {
				var isFunc = jQuery.isFunction(value);

				// Make sure that the elements are removed from the DOM before they are inserted
				// this can help fix replacing a parent with child elements
				if (!isFunc && typeof value !== "string") {
					value = jQuery(value).not(this).detach();
				}

				return this.domManip([value], true, function(elem) {
					var next = this.nextSibling,
						parent = this.parentNode;

					if (parent) {
						jQuery(this).remove();
						parent.insertBefore(elem, next);
					}
				});
			},

			detach: function(selector) {
				return this.remove(selector, true);
			},

			domManip: function(args, table, callback) {

				// Flatten any nested arrays
				args = core_concat.apply([], args);

				var first, node, hasScripts,
					scripts, doc, fragment,
					i = 0,
					l = this.length,
					set = this,
					iNoClone = l - 1,
					value = args[0],
					isFunction = jQuery.isFunction(value);

				// We can't cloneNode fragments that contain checked, in WebKit
				if (isFunction || !(l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test(value))) {
					return this.each(function(index) {
						var self = set.eq(index);
						if (isFunction) {
							args[0] = value.call(this, index, table ? self.html() : undefined);
						}
						self.domManip(args, table, callback);
					});
				}

				if (l) {
					fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
					first = fragment.firstChild;

					if (fragment.childNodes.length === 1) {
						fragment = first;
					}

					if (first) {
						table = table && jQuery.nodeName(first, "tr");
						scripts = jQuery.map(getAll(fragment, "script"), disableScript);
						hasScripts = scripts.length;

						// Use the original fragment for the last item instead of the first because it can end up
						// being emptied incorrectly in certain situations (#8070).
						for (; i < l; i++) {
							node = fragment;

							if (i !== iNoClone) {
								node = jQuery.clone(node, true, true);

								// Keep references to cloned scripts for later restoration
								if (hasScripts) {
									jQuery.merge(scripts, getAll(node, "script"));
								}
							}

							callback.call(
								table && jQuery.nodeName(this[i], "table") ?
								findOrAppend(this[i], "tbody") :
								this[i],
								node,
								i
							);
						}

						if (hasScripts) {
							doc = scripts[scripts.length - 1].ownerDocument;

							// Reenable scripts
							jQuery.map(scripts, restoreScript);

							// Evaluate executable scripts on first document insertion
							for (i = 0; i < hasScripts; i++) {
								node = scripts[i];
								if (rscriptType.test(node.type || "") &&
									!jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

									if (node.src) {
										// Hope ajax is available...
										jQuery.ajax({
											url: node.src,
											type: "GET",
											dataType: "script",
											async: false,
											global: false,
											"throws": true
										});
									} else {
										jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
									}
								}
							}
						}

						// Fix #11809: Avoid leaking memory
						fragment = first = null;
					}
				}

				return this;
			}
		});

		function findOrAppend(elem, tag) {
			return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
		}

		// Replace/restore the type attribute of script elements for safe DOM manipulation
		function disableScript(elem) {
			var attr = elem.getAttributeNode("type");
			elem.type = (attr && attr.specified) + "/" + elem.type;
			return elem;
		}

		function restoreScript(elem) {
			var match = rscriptTypeMasked.exec(elem.type);
			if (match) {
				elem.type = match[1];
			} else {
				elem.removeAttribute("type");
			}
			return elem;
		}

		// Mark scripts as having already been evaluated
		function setGlobalEval(elems, refElements) {
			var elem,
				i = 0;
			for (;
				(elem = elems[i]) != null; i++) {
				jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
			}
		}

		function cloneCopyEvent(src, dest) {

			if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
				return;
			}

			var type, i, l,
				oldData = jQuery._data(src),
				curData = jQuery._data(dest, oldData),
				events = oldData.events;

			if (events) {
				delete curData.handle;
				curData.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}

			// make the cloned public data object a copy from the original
			if (curData.data) {
				curData.data = jQuery.extend({}, curData.data);
			}
		}

		function fixCloneNodeIssues(src, dest) {
			var nodeName, e, data;

			// We do not need to do anything for non-Elements
			if (dest.nodeType !== 1) {
				return;
			}

			nodeName = dest.nodeName.toLowerCase();

			// IE6-8 copies events bound via attachEvent when using cloneNode.
			if (!jQuery.support.noCloneEvent && dest[jQuery.expando]) {
				data = jQuery._data(dest);

				for (e in data.events) {
					jQuery.removeEvent(dest, e, data.handle);
				}

				// Event data gets referenced instead of copied if the expando gets copied too
				dest.removeAttribute(jQuery.expando);
			}

			// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
			if (nodeName === "script" && dest.text !== src.text) {
				disableScript(dest).text = src.text;
				restoreScript(dest);

				// IE6-10 improperly clones children of object elements using classid.
				// IE10 throws NoModificationAllowedError if parent is null, #12132.
			} else if (nodeName === "object") {
				if (dest.parentNode) {
					dest.outerHTML = src.outerHTML;
				}

				// This path appears unavoidable for IE9. When cloning an object
				// element in IE9, the outerHTML strategy above is not sufficient.
				// If the src has innerHTML and the destination does not,
				// copy the src.innerHTML into the dest.innerHTML. #10324
				if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
					dest.innerHTML = src.innerHTML;
				}

			} else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
				// IE6-8 fails to persist the checked state of a cloned checkbox
				// or radio button. Worse, IE6-7 fail to give the cloned element
				// a checked appearance if the defaultChecked value isn't also set

				dest.defaultChecked = dest.checked = src.checked;

				// IE6-7 get confused and end up setting the value of a cloned
				// checkbox/radio button to an empty string instead of "on"
				if (dest.value !== src.value) {
					dest.value = src.value;
				}

				// IE6-8 fails to return the selected option to the default selected
				// state when cloning options
			} else if (nodeName === "option") {
				dest.defaultSelected = dest.selected = src.defaultSelected;

				// IE6-8 fails to set the defaultValue to the correct value when
				// cloning other types of input fields
			} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
		}

		jQuery.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(name, original) {
			jQuery.fn[name] = function(selector) {
				var elems,
					i = 0,
					ret = [],
					insert = jQuery(selector),
					last = insert.length - 1;

				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true);
					jQuery(insert[i])[original](elems);

					// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
					core_push.apply(ret, elems.get());
				}

				return this.pushStack(ret);
			};
		});

		function getAll(context, tag) {
			var elems, elem,
				i = 0,
				found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") :
				typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") :
				undefined;

			if (!found) {
				for (found = [], elems = context.childNodes || context;
					(elem = elems[i]) != null; i++) {
					if (!tag || jQuery.nodeName(elem, tag)) {
						found.push(elem);
					} else {
						jQuery.merge(found, getAll(elem, tag));
					}
				}
			}

			return tag === undefined || tag && jQuery.nodeName(context, tag) ?
				jQuery.merge([context], found) :
				found;
		}

		// Used in buildFragment, fixes the defaultChecked property
		function fixDefaultChecked(elem) {
			if (manipulation_rcheckableType.test(elem.type)) {
				elem.defaultChecked = elem.checked;
			}
		}

		jQuery.extend({
			clone: function(elem, dataAndEvents, deepDataAndEvents) {
				var destElements, node, clone, i, srcElements,
					inPage = jQuery.contains(elem.ownerDocument, elem);

				if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
					clone = elem.cloneNode(true);

					// IE<=8 does not properly clone detached, unknown element nodes
				} else {
					fragmentDiv.innerHTML = elem.outerHTML;
					fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
				}

				if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
					(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

					// We eschew Sizzle here for performance reasons: //jsperf.com/getall-vs-sizzle/2
					destElements = getAll(clone);
					srcElements = getAll(elem);

					// Fix all IE cloning issues
					for (i = 0;
						(node = srcElements[i]) != null; ++i) {
						// Ensure that the destination node is not null; Fixes #9587
						if (destElements[i]) {
							fixCloneNodeIssues(node, destElements[i]);
						}
					}
				}

				// Copy the events from the original to the clone
				if (dataAndEvents) {
					if (deepDataAndEvents) {
						srcElements = srcElements || getAll(elem);
						destElements = destElements || getAll(clone);

						for (i = 0;
							(node = srcElements[i]) != null; i++) {
							cloneCopyEvent(node, destElements[i]);
						}
					} else {
						cloneCopyEvent(elem, clone);
					}
				}

				// Preserve script evaluation history
				destElements = getAll(clone, "script");
				if (destElements.length > 0) {
					setGlobalEval(destElements, !inPage && getAll(elem, "script"));
				}

				destElements = srcElements = node = null;

				// Return the cloned set
				return clone;
			},

			buildFragment: function(elems, context, scripts, selection) {
				var j, elem, contains,
					tmp, tag, tbody, wrap,
					l = elems.length,

					// Ensure a safe fragment
					safe = createSafeFragment(context),

					nodes = [],
					i = 0;

				for (; i < l; i++) {
					elem = elems[i];

					if (elem || elem === 0) {

						// Add nodes directly
						if (jQuery.type(elem) === "object") {
							jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

							// Convert non-html into a text node
						} else if (!rhtml.test(elem)) {
							nodes.push(context.createTextNode(elem));

							// Convert html into DOM nodes
						} else {
							tmp = tmp || safe.appendChild(context.createElement("div"));

							// Deserialize a standard representation
							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;

							tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

							// Descend through wrappers to the right content
							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild;
							}

							// Manually add leading whitespace removed by IE
							if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
								nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
							}

							// Remove IE's autoinserted <tbody> from table fragments
							if (!jQuery.support.tbody) {

								// String was a <table>, *may* have spurious <tbody>
								elem = tag === "table" && !rtbody.test(elem) ?
									tmp.firstChild :

									// String was a bare <thead> or <tfoot>
									wrap[1] === "<table>" && !rtbody.test(elem) ?
									tmp :
									0;

								j = elem && elem.childNodes.length;
								while (j--) {
									if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
										elem.removeChild(tbody);
									}
								}
							}

							jQuery.merge(nodes, tmp.childNodes);

							// Fix #12392 for WebKit and IE > 9
							tmp.textContent = "";

							// Fix #12392 for oldIE
							while (tmp.firstChild) {
								tmp.removeChild(tmp.firstChild);
							}

							// Remember the top-level container for proper cleanup
							tmp = safe.lastChild;
						}
					}
				}

				// Fix #11356: Clear elements from fragment
				if (tmp) {
					safe.removeChild(tmp);
				}

				// Reset defaultChecked for any radios and checkboxes
				// about to be appended to the DOM in IE 6/7 (#8060)
				if (!jQuery.support.appendChecked) {
					jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
				}

				i = 0;
				while ((elem = nodes[i++])) {

					// #4087 - If origin and destination elements are the same, and this is
					// that element, do not do anything
					if (selection && jQuery.inArray(elem, selection) !== -1) {
						continue;
					}

					contains = jQuery.contains(elem.ownerDocument, elem);

					// Append to fragment
					tmp = getAll(safe.appendChild(elem), "script");

					// Preserve script evaluation history
					if (contains) {
						setGlobalEval(tmp);
					}

					// Capture executables
					if (scripts) {
						j = 0;
						while ((elem = tmp[j++])) {
							if (rscriptType.test(elem.type || "")) {
								scripts.push(elem);
							}
						}
					}
				}

				tmp = null;

				return safe;
			},

			cleanData: function(elems, /* internal */ acceptData) {
				var elem, type, id, data,
					i = 0,
					internalKey = jQuery.expando,
					cache = jQuery.cache,
					deleteExpando = jQuery.support.deleteExpando,
					special = jQuery.event.special;

				for (;
					(elem = elems[i]) != null; i++) {

					if (acceptData || jQuery.acceptData(elem)) {

						id = elem[internalKey];
						data = id && cache[id];

						if (data) {
							if (data.events) {
								for (type in data.events) {
									if (special[type]) {
										jQuery.event.remove(elem, type);

										// This is a shortcut to avoid jQuery.event.remove's overhead
									} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
								}
							}

							// Remove cache only if it was not already removed by jQuery.event.remove
							if (cache[id]) {

								delete cache[id];

								// IE does not allow us to delete expando properties from nodes,
								// nor does it have a removeAttribute function on Document nodes;
								// we must handle all of these cases
								if (deleteExpando) {
									delete elem[internalKey];

								} else if (typeof elem.removeAttribute !== core_strundefined) {
									elem.removeAttribute(internalKey);

								} else {
									elem[internalKey] = null;
								}

								core_deletedIds.push(id);
							}
						}
					}
				}
			}
		});
		var iframe, getStyles, curCSS,
			ralpha = /alpha\([^)]*\)/i,
			ropacity = /opacity\s*=\s*([^)]*)/,
			rposition = /^(top|right|bottom|left)$/,
			// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
			// see here for display values: //developer.mozilla.org/en-US/docs/CSS/display
			rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			rmargin = /^margin/,
			rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
			rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
			rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
			elemdisplay = {
				BODY: "block"
			},

			cssShow = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			cssNormalTransform = {
				letterSpacing: 0,
				fontWeight: 400
			},

			cssExpand = ["Top", "Right", "Bottom", "Left"],
			cssPrefixes = ["Webkit", "O", "Moz", "ms"];

		// return a css property mapped to a potentially vendor prefixed property
		function vendorPropName(style, name) {

			// shortcut for names that are not vendor prefixed
			if (name in style) {
				return name;
			}

			// check for vendor prefixed names
			var capName = name.charAt(0).toUpperCase() + name.slice(1),
				origName = name,
				i = cssPrefixes.length;

			while (i--) {
				name = cssPrefixes[i] + capName;
				if (name in style) {
					return name;
				}
			}

			return origName;
		}

		function isHidden(elem, el) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
		}

		function showHide(elements, show) {
			var display, elem, hidden,
				values = [],
				index = 0,
				length = elements.length;

			for (; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}

				values[index] = jQuery._data(elem, "olddisplay");
				display = elem.style.display;
				if (show) {
					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if (!values[index] && display === "none") {
						elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if (elem.style.display === "" && isHidden(elem)) {
						values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
					}
				} else {

					if (!values[index]) {
						hidden = isHidden(elem);

						if (display && display !== "none" || !hidden) {
							jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
						}
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for (index = 0; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}
				if (!show || elem.style.display === "none" || elem.style.display === "") {
					elem.style.display = show ? values[index] || "" : "none";
				}
			}

			return elements;
		}

		jQuery.fn.extend({
			css: function(name, value) {
				return jQuery.access(this, function(elem, name, value) {
					var len, styles,
						map = {},
						i = 0;

					if (jQuery.isArray(name)) {
						styles = getStyles(elem);
						len = name.length;

						for (; i < len; i++) {
							map[name[i]] = jQuery.css(elem, name[i], false, styles);
						}

						return map;
					}

					return value !== undefined ?
						jQuery.style(elem, name, value) :
						jQuery.css(elem, name);
				}, name, value, arguments.length > 1);
			},
			show: function() {
				return showHide(this, true);
			},
			hide: function() {
				return showHide(this);
			},
			toggle: function(state) {
				var bool = typeof state === "boolean";

				return this.each(function() {
					if (bool ? state : isHidden(this)) {
						jQuery(this).show();
					} else {
						jQuery(this).hide();
					}
				});
			}
		});

		jQuery.extend({
			// Add in style property hooks for overriding the default
			// behavior of getting and setting a style property
			cssHooks: {
				opacity: {
					get: function(elem, computed) {
						if (computed) {
							// We should always get a number back from opacity
							var ret = curCSS(elem, "opacity");
							return ret === "" ? "1" : ret;
						}
					}
				}
			},

			// Exclude the following css properties to add px
			cssNumber: {
				"columnCount": true,
				"fillOpacity": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},

			// Add in properties whose names you wish to fix before
			// setting or getting the value
			cssProps: {
				// normalize float css property
				"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
			},

			// Get and set the style property on a DOM Node
			style: function(elem, name, value, extra) {
				// Don't set styles on text and comment nodes
				if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
					return;
				}

				// Make sure that we're working with the right name
				var ret, type, hooks,
					origName = jQuery.camelCase(name),
					style = elem.style;

				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

				// gets hook for the prefixed version
				// followed by the unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// Check if we're setting a value
				if (value !== undefined) {
					type = typeof value;

					// convert relative number strings (+= or -=) to relative numbers. #7345
					if (type === "string" && (ret = rrelNum.exec(value))) {
						value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
						// Fixes bug #9237
						type = "number";
					}

					// Make sure that NaN and null values aren't set. See: #7116
					if (value == null || type === "number" && isNaN(value)) {
						return;
					}

					// If a number was passed in, add 'px' to the (except for certain CSS properties)
					if (type === "number" && !jQuery.cssNumber[origName]) {
						value += "px";
					}

					// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
					// but it would mean to define eight (for every problematic property) identical functions
					if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
						style[name] = "inherit";
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

						// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
						// Fixes bug #5509
						try {
							style[name] = value;
						} catch (e) {}
					}

				} else {
					// If a hook was provided get the non-computed value from there
					if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
						return ret;
					}

					// Otherwise just get the value from the style object
					return style[name];
				}
			},

			css: function(elem, name, extra, styles) {
				var num, val, hooks,
					origName = jQuery.camelCase(name);

				// Make sure that we're working with the right name
				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

				// gets hook for the prefixed version
				// followed by the unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// If a hook was provided get the computed value from there
				if (hooks && "get" in hooks) {
					val = hooks.get(elem, true, extra);
				}

				// Otherwise, if a way to get the computed value exists, use that
				if (val === undefined) {
					val = curCSS(elem, name, styles);
				}

				//convert "normal" to computed value
				if (val === "normal" && name in cssNormalTransform) {
					val = cssNormalTransform[name];
				}

				// Return, converting to number if forced or a qualifier was provided and val looks numeric
				if (extra === "" || extra) {
					num = parseFloat(val);
					return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
				}
				return val;
			},

			// A method for quickly swapping in/out CSS properties to get correct calculations
			swap: function(elem, options, callback, args) {
				var ret, name,
					old = {};

				// Remember the old values, and insert the new ones
				for (name in options) {
					old[name] = elem.style[name];
					elem.style[name] = options[name];
				}

				ret = callback.apply(elem, args || []);

				// Revert the old values
				for (name in options) {
					elem.style[name] = old[name];
				}

				return ret;
			}
		});

		// NOTE: we've included the "window" in window.getComputedStyle
		// because jsdom on node.js will break without it.
		if (window.getComputedStyle) {
			getStyles = function(elem) {
				return window.getComputedStyle(elem, null);
			};

			curCSS = function(elem, name, _computed) {
				var width, minWidth, maxWidth,
					computed = _computed || getStyles(elem),

					// getPropertyValue is only needed for .css('filter') in IE9, see #12537
					ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
					style = elem.style;

				if (computed) {

					if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
						ret = jQuery.style(elem, name);
					}

					// A tribute to the "awesome hack by Dean Edwards"
					// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
					// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
					// this is against the CSSOM draft spec: //dev.w3.org/csswg/cssom/#resolved-values
					if (rnumnonpx.test(ret) && rmargin.test(name)) {

						// Remember the original values
						width = style.width;
						minWidth = style.minWidth;
						maxWidth = style.maxWidth;

						// Put in the new values to get a computed value out
						style.minWidth = style.maxWidth = style.width = ret;
						ret = computed.width;

						// Revert the changed values
						style.width = width;
						style.minWidth = minWidth;
						style.maxWidth = maxWidth;
					}
				}

				return ret;
			};
		} else if (document.documentElement.currentStyle) {
			getStyles = function(elem) {
				return elem.currentStyle;
			};

			curCSS = function(elem, name, _computed) {
				var left, rs, rsLeft,
					computed = _computed || getStyles(elem),
					ret = computed ? computed[name] : undefined,
					style = elem.style;

				// Avoid setting ret to empty string here
				// so we don't default to auto
				if (ret == null && style && style[name]) {
					ret = style[name];
				}

				// From the awesome hack by Dean Edwards
				// //erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

				// If we're not dealing with a regular pixel number
				// but a number that has a weird ending, we need to convert it to pixels
				// but not position css attributes, as those are proportional to the parent element instead
				// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
				if (rnumnonpx.test(ret) && !rposition.test(name)) {

					// Remember the original values
					left = style.left;
					rs = elem.runtimeStyle;
					rsLeft = rs && rs.left;

					// Put in the new values to get a computed value out
					if (rsLeft) {
						rs.left = elem.currentStyle.left;
					}
					style.left = name === "fontSize" ? "1em" : ret;
					ret = style.pixelLeft + "px";

					// Revert the changed values
					style.left = left;
					if (rsLeft) {
						rs.left = rsLeft;
					}
				}

				return ret === "" ? "auto" : ret;
			};
		}

		function setPositiveNumber(elem, value, subtract) {
			var matches = rnumsplit.exec(value);
			return matches ?
				// Guard against undefined "subtract", e.g., when used as in cssHooks
				Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
				value;
		}

		function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
			var i = extra === (isBorderBox ? "border" : "content") ?
				// If we already have the right measurement, avoid augmentation
				4 :
				// Otherwise initialize for horizontal or vertical properties
				name === "width" ? 1 : 0,

				val = 0;

			for (; i < 4; i += 2) {
				// both box models exclude margin, so add it if we want it
				if (extra === "margin") {
					val += jQuery.css(elem, extra + cssExpand[i], true, styles);
				}

				if (isBorderBox) {
					// border-box includes padding, so remove it if we want content
					if (extra === "content") {
						val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
					}

					// at this point, extra isn't border nor margin, so remove border
					if (extra !== "margin") {
						val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				} else {
					// at this point, extra isn't content, so add padding
					val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

					// at this point, extra isn't content nor padding, so add border
					if (extra !== "padding") {
						val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				}
			}

			return val;
		}

		function getWidthOrHeight(elem, name, extra) {

			// Start with offset property, which is equivalent to the border-box value
			var valueIsBorderBox = true,
				val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
				styles = getStyles(elem),
				isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

			// some non-html elements return undefined for offsetWidth, so check for null/undefined
			// svg - //bugzilla.mozilla.org/show_bug.cgi?id=649285
			// MathML - //bugzilla.mozilla.org/show_bug.cgi?id=491668
			if (val <= 0 || val == null) {
				// Fall back to computed then uncomputed css if necessary
				val = curCSS(elem, name, styles);
				if (val < 0 || val == null) {
					val = elem.style[name];
				}

				// Computed unit is not pixels. Stop here and return.
				if (rnumnonpx.test(val)) {
					return val;
				}

				// we need the check for style in case a browser which returns unreliable values
				// for getComputedStyle silently falls back to the reliable elem.style
				valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);

				// Normalize "", auto, and prepare for extra
				val = parseFloat(val) || 0;
			}

			// use the active box-sizing model to add/subtract irrelevant styles
			return (val +
				augmentWidthOrHeight(
					elem,
					name,
					extra || (isBorderBox ? "border" : "content"),
					valueIsBorderBox,
					styles
				)
			) + "px";
		}

		// Try to determine the default display value of an element
		function css_defaultDisplay(nodeName) {
			var doc = document,
				display = elemdisplay[nodeName];

			if (!display) {
				display = actualDisplay(nodeName, doc);

				// If the simple way fails, read from inside an iframe
				if (display === "none" || !display) {
					// Use the already-created iframe if possible
					iframe = (iframe ||
						jQuery("<iframe frameborder='0' width='0' height='0'/>")
						.css("cssText", "display:block !important")
					).appendTo(doc.documentElement);

					// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
					doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
					doc.write("<!doctype html><html><body>");
					doc.close();

					display = actualDisplay(nodeName, doc);
					iframe.detach();
				}

				// Store the correct default display
				elemdisplay[nodeName] = display;
			}

			return display;
		}

		// Called ONLY from within css_defaultDisplay
		function actualDisplay(name, doc) {
			var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
				display = jQuery.css(elem[0], "display");
			elem.remove();
			return display;
		}

		jQuery.each(["height", "width"], function(i, name) {
			jQuery.cssHooks[name] = {
				get: function(elem, computed, extra) {
					if (computed) {
						// certain elements can have dimension info if we invisibly show them
						// however, it must have a current display style that would benefit from this
						return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ?
							jQuery.swap(elem, cssShow, function() {
								return getWidthOrHeight(elem, name, extra);
							}) :
							getWidthOrHeight(elem, name, extra);
					}
				},

				set: function(elem, value, extra) {
					var styles = extra && getStyles(elem);
					return setPositiveNumber(elem, value, extra ?
						augmentWidthOrHeight(
							elem,
							name,
							extra,
							jQuery.support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
							styles
						) : 0
					);
				}
			};
		});

		if (!jQuery.support.opacity) {
			jQuery.cssHooks.opacity = {
				get: function(elem, computed) {
					// IE uses filters for opacity
					return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
						(0.01 * parseFloat(RegExp.$1)) + "" :
						computed ? "1" : "";
				},

				set: function(elem, value) {
					var style = elem.style,
						currentStyle = elem.currentStyle,
						opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
						filter = currentStyle && currentStyle.filter || style.filter || "";

					// IE has trouble with opacity if it does not have layout
					// Force it by setting the zoom level
					style.zoom = 1;

					// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
					// if value === "", then remove inline opacity #12685
					if ((value >= 1 || value === "") &&
						jQuery.trim(filter.replace(ralpha, "")) === "" &&
						style.removeAttribute) {

						// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
						// if "filter:" is present at all, clearType is disabled, we want to avoid this
						// style.removeAttribute is IE Only, but so apparently is this code path...
						style.removeAttribute("filter");

						// if there is no filter style applied in a css rule or unset inline opacity, we are done
						if (value === "" || currentStyle && !currentStyle.filter) {
							return;
						}
					}

					// otherwise, set new filter values
					style.filter = ralpha.test(filter) ?
						filter.replace(ralpha, opacity) :
						filter + " " + opacity;
				}
			};
		}

		// These hooks cannot be added until DOM ready because the support test
		// for it is not run until after DOM ready
		jQuery(function() {
			if (!jQuery.support.reliableMarginRight) {
				jQuery.cssHooks.marginRight = {
					get: function(elem, computed) {
						if (computed) {
							// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
							// Work around by temporarily setting element display to inline-block
							return jQuery.swap(elem, {
									"display": "inline-block"
								},
								curCSS, [elem, "marginRight"]);
						}
					}
				};
			}

			// Webkit bug: //bugs.webkit.org/show_bug.cgi?id=29084
			// getComputedStyle returns percent when specified for top/left/bottom/right
			// rather than make the css module depend on the offset module, we just check for it here
			if (!jQuery.support.pixelPosition && jQuery.fn.position) {
				jQuery.each(["top", "left"], function(i, prop) {
					jQuery.cssHooks[prop] = {
						get: function(elem, computed) {
							if (computed) {
								computed = curCSS(elem, prop);
								// if curCSS returns percentage, fallback to offset
								return rnumnonpx.test(computed) ?
									jQuery(elem).position()[prop] + "px" :
									computed;
							}
						}
					};
				});
			}

		});

		if (jQuery.expr && jQuery.expr.filters) {
			jQuery.expr.filters.hidden = function(elem) {
				// Support: Opera <= 12.12
				// Opera reports offsetWidths and offsetHeights less than zero on some elements
				return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
					(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
			};

			jQuery.expr.filters.visible = function(elem) {
				return !jQuery.expr.filters.hidden(elem);
			};
		}

		// These hooks are used by animate to expand properties
		jQuery.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(prefix, suffix) {
			jQuery.cssHooks[prefix + suffix] = {
				expand: function(value) {
					var i = 0,
						expanded = {},

						// assumes a single number if not a string
						parts = typeof value === "string" ? value.split(" ") : [value];

					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] =
							parts[i] || parts[i - 2] || parts[0];
					}

					return expanded;
				}
			};

			if (!rmargin.test(prefix)) {
				jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
			}
		});
		var r20 = /%20/g,
			rbracket = /\[\]$/,
			rCRLF = /\r?\n/g,
			rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
			rsubmittable = /^(?:input|select|textarea|keygen)/i;

		jQuery.fn.extend({
			serialize: function() {
				return jQuery.param(this.serializeArray());
			},
			serializeArray: function() {
				return this.map(function() {
						// Can add propHook for "elements" to filter or add form elements
						var elements = jQuery.prop(this, "elements");
						return elements ? jQuery.makeArray(elements) : this;
					})
					.filter(function() {
						var type = this.type;
						// Use .is(":disabled") so that fieldset[disabled] works
						return this.name && !jQuery(this).is(":disabled") &&
							rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
							(this.checked || !manipulation_rcheckableType.test(type));
					})
					.map(function(i, elem) {
						var val = jQuery(this).val();

						return val == null ?
							null :
							jQuery.isArray(val) ?
							jQuery.map(val, function(val) {
								return {
									name: elem.name,
									value: val.replace(rCRLF, "\r\n")
								};
							}) : {
								name: elem.name,
								value: val.replace(rCRLF, "\r\n")
							};
					}).get();
			}
		});

		//Serialize an array of form elements or a set of
		//key/values into a query string
		jQuery.param = function(a, traditional) {
			var prefix,
				s = [],
				add = function(key, value) {
					// If value is a function, invoke it and return its value
					value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
					s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
				};

			// Set traditional to true for jQuery <= 1.3.2 behavior.
			if (traditional === undefined) {
				traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
			}

			// If an array was passed in, assume that it is an array of form elements.
			if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
				// Serialize the form elements
				jQuery.each(a, function() {
					add(this.name, this.value);
				});

			} else {
				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for (prefix in a) {
					buildParams(prefix, a[prefix], traditional, add);
				}
			}

			// Return the resulting serialization
			return s.join("&").replace(r20, "+");
		};

		function buildParams(prefix, obj, traditional, add) {
			var name;

			if (jQuery.isArray(obj)) {
				// Serialize array item.
				jQuery.each(obj, function(i, v) {
					if (traditional || rbracket.test(prefix)) {
						// Treat each array item as a scalar.
						add(prefix, v);

					} else {
						// Item is non-scalar (array or object), encode its numeric index.
						buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
					}
				});

			} else if (!traditional && jQuery.type(obj) === "object") {
				// Serialize object item.
				for (name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
				}

			} else {
				// Serialize scalar item.
				add(prefix, obj);
			}
		}
		jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {

			// Handle event binding
			jQuery.fn[name] = function(data, fn) {
				return arguments.length > 0 ?
					this.on(name, null, data, fn) :
					this.trigger(name);
			};
		});

		jQuery.fn.hover = function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		};
		var
		// Document location
			ajaxLocParts,
			ajaxLocation,
			ajax_nonce = jQuery.now(),

			ajax_rquery = /\?/,
			rhash = /#.*$/,
			rts = /([?&])_=[^&]*/,
			rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
			// #7653, #8125, #8152: local protocol detection
			rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			rnoContent = /^(?:GET|HEAD)$/,
			rprotocol = /^\/\//,
			rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

			// Keep a copy of the old load method
			_load = jQuery.fn.load,

			/* Prefilters
			 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
			 * 2) These are called:
			 *    - BEFORE asking for a transport
			 *    - AFTER param serialization (s.data is a string if s.processData is true)
			 * 3) key is the dataType
			 * 4) the catchall symbol "*" can be used
			 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
			 */
			prefilters = {},

			/* Transports bindings
			 * 1) key is the dataType
			 * 2) the catchall symbol "*" can be used
			 * 3) selection will start with transport dataType and THEN go to "*" if needed
			 */
			transports = {},

			// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
			allTypes = "*/".concat("*");

		// #8138, IE may throw an exception when accessing
		// a field from window.location if document.domain has been set
		try {
			ajaxLocation = location.href;
		} catch (e) {
			// Use the href attribute of an A element
			// since IE will modify it given document.location
			ajaxLocation = document.createElement("a");
			ajaxLocation.href = "";
			ajaxLocation = ajaxLocation.href;
		}

		// Segment location into parts
		ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

		// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
		function addToPrefiltersOrTransports(structure) {

			// dataTypeExpression is optional and defaults to "*"
			return function(dataTypeExpression, func) {

				if (typeof dataTypeExpression !== "string") {
					func = dataTypeExpression;
					dataTypeExpression = "*";
				}

				var dataType,
					i = 0,
					dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];

				if (jQuery.isFunction(func)) {
					// For each dataType in the dataTypeExpression
					while ((dataType = dataTypes[i++])) {
						// Prepend if requested
						if (dataType[0] === "+") {
							dataType = dataType.slice(1) || "*";
							(structure[dataType] = structure[dataType] || []).unshift(func);

							// Otherwise append
						} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
					}
				}
			};
		}

		// Base inspection function for prefilters and transports
		function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

			var inspected = {},
				seekingTransport = (structure === transports);

			function inspect(dataType) {
				var selected;
				inspected[dataType] = true;
				jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
					var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
					if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
						options.dataTypes.unshift(dataTypeOrTransport);
						inspect(dataTypeOrTransport);
						return false;
					} else if (seekingTransport) {
						return !(selected = dataTypeOrTransport);
					}
				});
				return selected;
			}

			return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
		}

		// A special extend for ajax options
		// that takes "flat" options (not to be deep extended)
		// Fixes #9887
		function ajaxExtend(target, src) {
			var deep, key,
				flatOptions = jQuery.ajaxSettings.flatOptions || {};

			for (key in src) {
				if (src[key] !== undefined) {
					(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
				}
			}
			if (deep) {
				jQuery.extend(true, target, deep);
			}

			return target;
		}

		jQuery.fn.load = function(url, params, callback) {
			if (typeof url !== "string" && _load) {
				return _load.apply(this, arguments);
			}

			var selector, response, type,
				self = this,
				off = url.indexOf(" ");

			if (off >= 0) {
				selector = url.slice(off, url.length);
				url = url.slice(0, off);
			}

			// If it's a function
			if (jQuery.isFunction(params)) {

				// We assume that it's the callback
				callback = params;
				params = undefined;

				// Otherwise, build a param string
			} else if (params && typeof params === "object") {
				type = "POST";
			}

			// If we have elements to modify, make the request
			if (self.length > 0) {
				jQuery.ajax({
					url: url,

					// if "type" variable is undefined, then "GET" method will be used
					type: type,
					dataType: "html",
					data: params
				}).done(function(responseText) {

					// Save response for use in complete callback
					response = arguments;

					self.html(selector ?

						// If a selector was specified, locate the right elements in a dummy div
						// Exclude scripts to avoid IE 'Permission Denied' errors
						jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

						// Otherwise use the full result
						responseText);

				}).complete(callback && function(jqXHR, status) {
					self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
				});
			}

			return this;
		};

		// Attach a bunch of functions for handling common AJAX events
		jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
			jQuery.fn[type] = function(fn) {
				return this.on(type, fn);
			};
		});

		jQuery.each(["get", "post"], function(i, method) {
			jQuery[method] = function(url, data, callback, type) {
				// shift arguments if data argument was omitted
				if (jQuery.isFunction(data)) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				return jQuery.ajax({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				});
			};
		});

		jQuery.extend({

			// Counter for holding the number of active queries
			active: 0,

			// Last-Modified header cache for next request
			lastModified: {},
			etag: {},

			ajaxSettings: {
				url: ajaxLocation,
				type: "GET",
				isLocal: rlocalProtocol.test(ajaxLocParts[1]),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				/*
				timeout: 0,
				data: null,
				dataType: null,
				username: null,
				password: null,
				cache: null,
				throws: false,
				traditional: false,
				headers: {},
				*/

				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},

				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},

				responseFields: {
					xml: "responseXML",
					text: "responseText"
				},

				// Data converters
				// Keys separate source (or catchall "*") and destination types with a single space
				converters: {

					// Convert anything to text
					"* text": window.String,

					// Text to html (true = no transformation)
					"text html": true,

					// Evaluate text as a json expression
					"text json": jQuery.parseJSON,

					// Parse text as xml
					"text xml": jQuery.parseXML
				},

				// For options that shouldn't be deep extended:
				// you can add your own custom options here if
				// and when you create one that shouldn't be
				// deep extended (see ajaxExtend)
				flatOptions: {
					url: true,
					context: true
				}
			},

			// Creates a full fledged settings object into target
			// with both ajaxSettings and settings fields.
			// If target is omitted, writes into ajaxSettings.
			ajaxSetup: function(target, settings) {
				return settings ?

					// Building a settings object
					ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

					// Extending ajaxSettings
					ajaxExtend(jQuery.ajaxSettings, target);
			},

			ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
			ajaxTransport: addToPrefiltersOrTransports(transports),

			// Main method
			ajax: function(url, options) {

				// If url is an object, simulate pre-1.5 signature
				if (typeof url === "object") {
					options = url;
					url = undefined;
				}

				// Force options to be an object
				options = options || {};

				var // Cross-domain detection vars
					parts,
					// Loop variable
					i,
					// URL without anti-cache param
					cacheURL,
					// Response headers as string
					responseHeadersString,
					// timeout handle
					timeoutTimer,

					// To know if global events are to be dispatched
					fireGlobals,

					transport,
					// Response headers
					responseHeaders,
					// Create the final options object
					s = jQuery.ajaxSetup({}, options),
					// Callbacks context
					callbackContext = s.context || s,
					// Context for global events is callbackContext if it is a DOM node or jQuery collection
					globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
					jQuery(callbackContext) :
					jQuery.event,
					// Deferreds
					deferred = jQuery.Deferred(),
					completeDeferred = jQuery.Callbacks("once memory"),
					// Status-dependent callbacks
					statusCode = s.statusCode || {},
					// Headers (they are sent all at once)
					requestHeaders = {},
					requestHeadersNames = {},
					// The jqXHR state
					state = 0,
					// Default abort message
					strAbort = "canceled",
					// Fake xhr
					jqXHR = {
						readyState: 0,

						// Builds headers hashtable if needed
						getResponseHeader: function(key) {
							var match;
							if (state === 2) {
								if (!responseHeaders) {
									responseHeaders = {};
									while ((match = rheaders.exec(responseHeadersString))) {
										responseHeaders[match[1].toLowerCase()] = match[2];
									}
								}
								match = responseHeaders[key.toLowerCase()];
							}
							return match == null ? null : match;
						},

						// Raw string
						getAllResponseHeaders: function() {
							return state === 2 ? responseHeadersString : null;
						},

						// Caches the header
						setRequestHeader: function(name, value) {
							var lname = name.toLowerCase();
							if (!state) {
								name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
								requestHeaders[name] = value;
							}
							return this;
						},

						// Overrides response content-type header
						overrideMimeType: function(type) {
							if (!state) {
								s.mimeType = type;
							}
							return this;
						},

						// Status-dependent callbacks
						statusCode: function(map) {
							var code;
							if (map) {
								if (state < 2) {
									for (code in map) {
										// Lazy-add the new callback in a way that preserves old ones
										statusCode[code] = [statusCode[code], map[code]];
									}
								} else {
									// Execute the appropriate callbacks
									jqXHR.always(map[jqXHR.status]);
								}
							}
							return this;
						},

						// Cancel the request
						abort: function(statusText) {
							var finalText = statusText || strAbort;
							if (transport) {
								transport.abort(finalText);
							}
							done(0, finalText);
							return this;
						}
					};

				// Attach deferreds
				deferred.promise(jqXHR).complete = completeDeferred.add;
				jqXHR.success = jqXHR.done;
				jqXHR.error = jqXHR.fail;

				// Remove hash character (#7531: and string promotion)
				// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
				// Handle falsy url in the settings object (#10093: consistency with old signature)
				// We also use the url parameter if available
				s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

				// Alias method option to type as per ticket #12004
				s.type = options.method || options.type || s.method || s.type;

				// Extract dataTypes list
				s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];

				// A cross-domain request is in order when we have a protocol:host:port mismatch
				if (s.crossDomain == null) {
					parts = rurl.exec(s.url.toLowerCase());
					s.crossDomain = !!(parts &&
						(parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
							(parts[3] || (parts[1] === "http:" ? 80 : 443)) !=
							(ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443)))
					);
				}

				// Convert data if not already a string
				if (s.data && s.processData && typeof s.data !== "string") {
					s.data = jQuery.param(s.data, s.traditional);
				}

				// Apply prefilters
				inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

				// If request was aborted inside a prefilter, stop there
				if (state === 2) {
					return jqXHR;
				}

				// We can fire global events as of now if asked to
				fireGlobals = s.global;

				// Watch for a new set of requests
				if (fireGlobals && jQuery.active++ === 0) {
					jQuery.event.trigger("ajaxStart");
				}

				// Uppercase the type
				s.type = s.type.toUpperCase();

				// Determine if request has content
				s.hasContent = !rnoContent.test(s.type);

				// Save the URL in case we're toying with the If-Modified-Since
				// and/or If-None-Match header later on
				cacheURL = s.url;

				// More options handling for requests with no content
				if (!s.hasContent) {

					// If data is available, append data to url
					if (s.data) {
						cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
						// #9682: remove data so that it's not used in an eventual retry
						delete s.data;
					}

					// Add anti-cache in url if needed
					if (s.cache === false) {
						s.url = rts.test(cacheURL) ?

							// If there is already a '_' parameter, set its value
							cacheURL.replace(rts, "$1_=" + ajax_nonce++) :

							// Otherwise add one to the end
							cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
					}
				}

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if (s.ifModified) {
					if (jQuery.lastModified[cacheURL]) {
						jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
					}
					if (jQuery.etag[cacheURL]) {
						jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
					}
				}

				// Set the correct header, if data is being sent
				if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
					jqXHR.setRequestHeader("Content-Type", s.contentType);
				}

				// Set the Accepts header for the server, depending on the dataType
				jqXHR.setRequestHeader(
					"Accept",
					s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
					s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
					s.accepts["*"]
				);

				// Check for headers option
				for (i in s.headers) {
					jqXHR.setRequestHeader(i, s.headers[i]);
				}

				// Allow custom headers/mimetypes and early abort
				if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
					// Abort if not done already and return
					return jqXHR.abort();
				}

				// aborting is no longer a cancellation
				strAbort = "abort";

				// Install callbacks on deferreds
				for (i in {
						success: 1,
						error: 1,
						complete: 1
					}) {
					jqXHR[i](s[i]);
				}

				// Get transport
				transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

				// If no transport, we auto-abort
				if (!transport) {
					done(-1, "No Transport");
				} else {
					jqXHR.readyState = 1;

					// Send global event
					if (fireGlobals) {
						globalEventContext.trigger("ajaxSend", [jqXHR, s]);
					}
					// Timeout
					if (s.async && s.timeout > 0) {
						timeoutTimer = setTimeout(function() {
							jqXHR.abort("timeout");
						}, s.timeout);
					}

					try {
						state = 1;
						transport.send(requestHeaders, done);
					} catch (e) {
						// Propagate exception as error if not done
						if (state < 2) {
							done(-1, e);
							// Simply rethrow otherwise
						} else {
							throw e;
						}
					}
				}

				// Callback for when everything is done
				function done(status, nativeStatusText, responses, headers) {
					var isSuccess, success, error, response, modified,
						statusText = nativeStatusText;

					// Called once
					if (state === 2) {
						return;
					}

					// State is "done" now
					state = 2;

					// Clear timeout if it exists
					if (timeoutTimer) {
						clearTimeout(timeoutTimer);
					}

					// Dereference transport for early garbage collection
					// (no matter how long the jqXHR object will be used)
					transport = undefined;

					// Cache response headers
					responseHeadersString = headers || "";

					// Set readyState
					jqXHR.readyState = status > 0 ? 4 : 0;

					// Get response data
					if (responses) {
						response = ajaxHandleResponses(s, jqXHR, responses);
					}

					// If successful, handle type chaining
					if (status >= 200 && status < 300 || status === 304) {

						// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
						if (s.ifModified) {
							modified = jqXHR.getResponseHeader("Last-Modified");
							if (modified) {
								jQuery.lastModified[cacheURL] = modified;
							}
							modified = jqXHR.getResponseHeader("etag");
							if (modified) {
								jQuery.etag[cacheURL] = modified;
							}
						}

						// if no content
						if (status === 204) {
							isSuccess = true;
							statusText = "nocontent";

							// if not modified
						} else if (status === 304) {
							isSuccess = true;
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
							isSuccess = ajaxConvert(s, response);
							statusText = isSuccess.state;
							success = isSuccess.data;
							error = isSuccess.error;
							isSuccess = !error;
						}
					} else {
						// We extract error from statusText
						// then normalize statusText and status for non-aborts
						error = statusText;
						if (status || !statusText) {
							statusText = "error";
							if (status < 0) {
								status = 0;
							}
						}
					}

					// Set data for the fake xhr object
					jqXHR.status = status;
					jqXHR.statusText = (nativeStatusText || statusText) + "";

					// Success/Error
					if (isSuccess) {
						deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
					} else {
						deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
					}

					// Status-dependent callbacks
					jqXHR.statusCode(statusCode);
					statusCode = undefined;

					if (fireGlobals) {
						globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
					}

					// Complete
					completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

					if (fireGlobals) {
						globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
						// Handle the global AJAX counter
						if (!(--jQuery.active)) {
							jQuery.event.trigger("ajaxStop");
						}
					}
				}

				return jqXHR;
			},

			getScript: function(url, callback) {
				return jQuery.get(url, undefined, callback, "script");
			},

			getJSON: function(url, data, callback) {
				return jQuery.get(url, data, callback, "json");
			}
		});

		/* Handles responses to an ajax request:
		 * - sets all responseXXX fields accordingly
		 * - finds the right dataType (mediates between content-type and expected dataType)
		 * - returns the corresponding response
		 */
		function ajaxHandleResponses(s, jqXHR, responses) {
			var firstDataType, ct, finalDataType, type,
				contents = s.contents,
				dataTypes = s.dataTypes,
				responseFields = s.responseFields;

			// Fill responseXXX fields
			for (type in responseFields) {
				if (type in responses) {
					jqXHR[responseFields[type]] = responses[type];
				}
			}

			// Remove auto dataType and get content-type in the process
			while (dataTypes[0] === "*") {
				dataTypes.shift();
				if (ct === undefined) {
					ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
				}
			}

			// Check if we're dealing with a known content-type
			if (ct) {
				for (type in contents) {
					if (contents[type] && contents[type].test(ct)) {
						dataTypes.unshift(type);
						break;
					}
				}
			}

			// Check to see if we have a response for the expected dataType
			if (dataTypes[0] in responses) {
				finalDataType = dataTypes[0];
			} else {
				// Try convertible dataTypes
				for (type in responses) {
					if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
						finalDataType = type;
						break;
					}
					if (!firstDataType) {
						firstDataType = type;
					}
				}
				// Or just use first one
				finalDataType = finalDataType || firstDataType;
			}

			// If we found a dataType
			// We add the dataType to the list if needed
			// and return the corresponding response
			if (finalDataType) {
				if (finalDataType !== dataTypes[0]) {
					dataTypes.unshift(finalDataType);
				}
				return responses[finalDataType];
			}
		}

		// Chain conversions given the request and the original response
		function ajaxConvert(s, response) {
			var conv2, current, conv, tmp,
				converters = {},
				i = 0,
				// Work with a copy of dataTypes in case we need to modify it for conversion
				dataTypes = s.dataTypes.slice(),
				prev = dataTypes[0];

			// Apply the dataFilter if provided
			if (s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			// Create converters map with lowercased keys
			if (dataTypes[1]) {
				for (conv in s.converters) {
					converters[conv.toLowerCase()] = s.converters[conv];
				}
			}

			// Convert to each sequential dataType, tolerating list modification
			for (;
				(current = dataTypes[++i]);) {

				// There's only work to do if current dataType is non-auto
				if (current !== "*") {

					// Convert response if prev dataType is non-auto and differs from current
					if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] ||
										converters["* " + tmp[0]];
									if (conv) {
										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
											current = tmp[0];
											dataTypes.splice(i--, 0, current);
										}

										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s["throws"]) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}

					// Update prev for next iteration
					prev = current;
				}
			}

			return {
				state: "success",
				data: response
			};
		}
		// Install script dataType
		jQuery.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /(?:java|ecma)script/
			},
			converters: {
				"text script": function(text) {
					jQuery.globalEval(text);
					return text;
				}
			}
		});

		// Handle cache's special case and global
		jQuery.ajaxPrefilter("script", function(s) {
			if (s.cache === undefined) {
				s.cache = false;
			}
			if (s.crossDomain) {
				s.type = "GET";
				s.global = false;
			}
		});

		// Bind script tag hack transport
		jQuery.ajaxTransport("script", function(s) {

			// This transport only deals with cross domain requests
			if (s.crossDomain) {

				var script,
					head = document.head || jQuery("head")[0] || document.documentElement;

				return {

					send: function(_, callback) {

						script = document.createElement("script");

						script.async = true;

						if (s.scriptCharset) {
							script.charset = s.scriptCharset;
						}

						script.src = s.url;

						// Attach handlers for all browsers
						script.onload = script.onreadystatechange = function(_, isAbort) {

							if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

								// Handle memory leak in IE
								script.onload = script.onreadystatechange = null;

								// Remove the script
								if (script.parentNode) {
									script.parentNode.removeChild(script);
								}

								// Dereference the script
								script = null;

								// Callback if not abort
								if (!isAbort) {
									callback(200, "success");
								}
							}
						};

						// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
						// Use native DOM manipulation to avoid our domManip AJAX trickery
						head.insertBefore(script, head.firstChild);
					},

					abort: function() {
						if (script) {
							script.onload(undefined, true);
						}
					}
				};
			}
		});
		var oldCallbacks = [],
			rjsonp = /(=)\?(?=&|$)|\?\?/;

		// Default jsonp settings
		jQuery.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (ajax_nonce++));
				this[callback] = true;
				return callback;
			}
		});

		// Detect, normalize options and install callbacks for jsonp requests
		jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

			var callbackName, overwritten, responseContainer,
				jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
					"url" :
					typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
				);

			// Handle iff the expected data type is "jsonp" or we have a parameter to set
			if (jsonProp || s.dataTypes[0] === "jsonp") {

				// Get callback name, remembering preexisting value associated with it
				callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
					s.jsonpCallback() :
					s.jsonpCallback;

				// Insert callback into url or form data
				if (jsonProp) {
					s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
				} else if (s.jsonp !== false) {
					s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
				}

				// Use data converter to retrieve json after script execution
				s.converters["script json"] = function() {
					if (!responseContainer) {
						jQuery.error(callbackName + " was not called");
					}
					return responseContainer[0];
				};

				// force json dataType
				s.dataTypes[0] = "json";

				// Install callback
				overwritten = window[callbackName];
				window[callbackName] = function() {
					responseContainer = arguments;
				};

				// Clean-up function (fires after converters)
				jqXHR.always(function() {
					// Restore preexisting value
					window[callbackName] = overwritten;

					// Save back as free
					if (s[callbackName]) {
						// make sure that re-using the options doesn't screw things around
						s.jsonpCallback = originalSettings.jsonpCallback;

						// save the callback name for future use
						oldCallbacks.push(callbackName);
					}

					// Call if it was a function and we have a response
					if (responseContainer && jQuery.isFunction(overwritten)) {
						overwritten(responseContainer[0]);
					}

					responseContainer = overwritten = undefined;
				});

				// Delegate to script
				return "script";
			}
		});
		var xhrCallbacks, xhrSupported,
			xhrId = 0,
			// #5280: Internet Explorer will keep connections alive if we don't abort on unload
			xhrOnUnloadAbort = window.ActiveXObject && function() {
				// Abort all pending requests
				var key;
				for (key in xhrCallbacks) {
					xhrCallbacks[key](undefined, true);
				}
			};

		// Functions to create xhrs
		function createStandardXHR() {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {}
		}

		function createActiveXHR() {
			try {
				return new window.ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}

		// Create the request object
		// (This is still attached to ajaxSettings for backward compatibility)
		jQuery.ajaxSettings.xhr = window.ActiveXObject ?
			/* Microsoft failed to properly
			 * implement the XMLHttpRequest in IE7 (can't request local files),
			 * so we use the ActiveXObject when it is available
			 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
			 * we need a fallback.
			 */
			function() {
				return !this.isLocal && createStandardXHR() || createActiveXHR();
			} :
			// For all other browsers, use the standard XMLHttpRequest object
			createStandardXHR;

		// Determine support properties
		xhrSupported = jQuery.ajaxSettings.xhr();
		jQuery.support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
		xhrSupported = jQuery.support.ajax = !!xhrSupported;

		// Create transport if the browser can provide an xhr
		if (xhrSupported) {

			jQuery.ajaxTransport(function(s) {
				// Cross domain only allowed if supported through XMLHttpRequest
				if (!s.crossDomain || jQuery.support.cors) {

					var callback;

					return {
						send: function(headers, complete) {

							// Get a new xhr
							var handle, i,
								xhr = s.xhr();

							// Open the socket
							// Passing null username, generates a login popup on Opera (#2865)
							if (s.username) {
								xhr.open(s.type, s.url, s.async, s.username, s.password);
							} else {
								xhr.open(s.type, s.url, s.async);
							}

							// Apply custom fields if provided
							if (s.xhrFields) {
								for (i in s.xhrFields) {
									xhr[i] = s.xhrFields[i];
								}
							}

							// Override mime type if needed
							if (s.mimeType && xhr.overrideMimeType) {
								xhr.overrideMimeType(s.mimeType);
							}

							// X-Requested-With header
							// For cross-domain requests, seeing as conditions for a preflight are
							// akin to a jigsaw puzzle, we simply never set it to be sure.
							// (it can always be set on a per-request basis or even using ajaxSetup)
							// For same-domain requests, won't change header if already provided.
							if (!s.crossDomain && !headers["X-Requested-With"]) {
								headers["X-Requested-With"] = "XMLHttpRequest";
							}

							// Need an extra try/catch for cross domain requests in Firefox 3
							try {
								for (i in headers) {
									xhr.setRequestHeader(i, headers[i]);
								}
							} catch (err) {}

							// Do send the request
							// This may raise an exception which is actually
							// handled in jQuery.ajax (so no try/catch here)
							xhr.send((s.hasContent && s.data) || null);

							// Listener
							callback = function(_, isAbort) {
								var status, responseHeaders, statusText, responses;

								// Firefox throws exceptions when accessing properties
								// of an xhr when a network error occurred
								// //helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
								try {

									// Was never called and is aborted or complete
									if (callback && (isAbort || xhr.readyState === 4)) {

										// Only called once
										callback = undefined;

										// Do not keep as active anymore
										if (handle) {
											xhr.onreadystatechange = jQuery.noop;
											if (xhrOnUnloadAbort) {
												delete xhrCallbacks[handle];
											}
										}

										// If it's an abort
										if (isAbort) {
											// Abort it manually if needed
											if (xhr.readyState !== 4) {
												xhr.abort();
											}
										} else {
											responses = {};
											status = xhr.status;
											responseHeaders = xhr.getAllResponseHeaders();

											// When requesting binary data, IE6-9 will throw an exception
											// on any attempt to access responseText (#11426)
											if (typeof xhr.responseText === "string") {
												responses.text = xhr.responseText;
											}

											// Firefox throws an exception when accessing
											// statusText for faulty cross-domain requests
											try {
												statusText = xhr.statusText;
											} catch (e) {
												// We normalize with Webkit giving an empty statusText
												statusText = "";
											}

											// Filter status for non standard behaviors

											// If the request is local and we have data: assume a success
											// (success with no data won't get notified, that's the best we
											// can do given current implementations)
											if (!status && s.isLocal && !s.crossDomain) {
												status = responses.text ? 200 : 404;
												// IE - #1450: sometimes returns 1223 when it should be 204
											} else if (status === 1223) {
												status = 204;
											}
										}
									}
								} catch (firefoxAccessException) {
									if (!isAbort) {
										complete(-1, firefoxAccessException);
									}
								}

								// Call complete if needed
								if (responses) {
									complete(status, statusText, responses, responseHeaders);
								}
							};

							if (!s.async) {
								// if we're in sync mode we fire the callback
								callback();
							} else if (xhr.readyState === 4) {
								// (IE6 & IE7) if it's in cache and has been
								// retrieved directly we need to fire the callback
								setTimeout(callback);
							} else {
								handle = ++xhrId;
								if (xhrOnUnloadAbort) {
									// Create the active xhrs callbacks list if needed
									// and attach the unload handler
									if (!xhrCallbacks) {
										xhrCallbacks = {};
										jQuery(window).unload(xhrOnUnloadAbort);
									}
									// Add to list of active xhrs callbacks
									xhrCallbacks[handle] = callback;
								}
								xhr.onreadystatechange = callback;
							}
						},

						abort: function() {
							if (callback) {
								callback(undefined, true);
							}
						}
					};
				}
			});
		}
		var fxNow, timerId,
			rfxtypes = /^(?:toggle|show|hide)$/,
			rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
			rrun = /queueHooks$/,
			animationPrefilters = [defaultPrefilter],
			tweeners = {
				"*": [function(prop, value) {
					var end, unit,
						tween = this.createTween(prop, value),
						parts = rfxnum.exec(value),
						target = tween.cur(),
						start = +target || 0,
						scale = 1,
						maxIterations = 20;

					if (parts) {
						end = +parts[2];
						unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");

						// We need to compute starting value
						if (unit !== "px" && start) {
							// Iteratively approximate from a nonzero starting point
							// Prefer the current property, because this process will be trivial if it uses the same units
							// Fallback to end or a simple constant
							start = jQuery.css(tween.elem, prop, true) || end || 1;

							do {
								// If previous iteration zeroed out, double until we get *something*
								// Use a string for doubling factor so we don't accidentally see scale as unchanged below
								scale = scale || ".5";

								// Adjust and apply
								start = start / scale;
								jQuery.style(tween.elem, prop, start + unit);

								// Update scale, tolerating zero or NaN from tween.cur()
								// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
							} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
						}

						tween.unit = unit;
						tween.start = start;
						// If a +=/-= token was provided, we're doing a relative animation
						tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
					}
					return tween;
				}]
			};

		// Animations created synchronously will run synchronously
		function createFxNow() {
			setTimeout(function() {
				fxNow = undefined;
			});
			return (fxNow = jQuery.now());
		}

		function createTweens(animation, props) {
			jQuery.each(props, function(prop, value) {
				var collection = (tweeners[prop] || []).concat(tweeners["*"]),
					index = 0,
					length = collection.length;
				for (; index < length; index++) {
					if (collection[index].call(animation, prop, value)) {

						// we're done with this property
						return;
					}
				}
			});
		}

		function Animation(elem, properties, options) {
			var result,
				stopped,
				index = 0,
				length = animationPrefilters.length,
				deferred = jQuery.Deferred().always(function() {
					// don't match elem in the :animated selector
					delete tick.elem;
				}),
				tick = function() {
					if (stopped) {
						return false;
					}
					var currentTime = fxNow || createFxNow(),
						remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
						// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
						temp = remaining / animation.duration || 0,
						percent = 1 - temp,
						index = 0,
						length = animation.tweens.length;

					for (; index < length; index++) {
						animation.tweens[index].run(percent);
					}

					deferred.notifyWith(elem, [animation, percent, remaining]);

					if (percent < 1 && length) {
						return remaining;
					} else {
						deferred.resolveWith(elem, [animation]);
						return false;
					}
				},
				animation = deferred.promise({
					elem: elem,
					props: jQuery.extend({}, properties),
					opts: jQuery.extend(true, {
						specialEasing: {}
					}, options),
					originalProperties: properties,
					originalOptions: options,
					startTime: fxNow || createFxNow(),
					duration: options.duration,
					tweens: [],
					createTween: function(prop, end) {
						var tween = jQuery.Tween(elem, animation.opts, prop, end,
							animation.opts.specialEasing[prop] || animation.opts.easing);
						animation.tweens.push(tween);
						return tween;
					},
					stop: function(gotoEnd) {
						var index = 0,
							// if we are going to the end, we want to run all the tweens
							// otherwise we skip this part
							length = gotoEnd ? animation.tweens.length : 0;
						if (stopped) {
							return this;
						}
						stopped = true;
						for (; index < length; index++) {
							animation.tweens[index].run(1);
						}

						// resolve when we played the last frame
						// otherwise, reject
						if (gotoEnd) {
							deferred.resolveWith(elem, [animation, gotoEnd]);
						} else {
							deferred.rejectWith(elem, [animation, gotoEnd]);
						}
						return this;
					}
				}),
				props = animation.props;

			propFilter(props, animation.opts.specialEasing);

			for (; index < length; index++) {
				result = animationPrefilters[index].call(animation, elem, props, animation.opts);
				if (result) {
					return result;
				}
			}

			createTweens(animation, props);

			if (jQuery.isFunction(animation.opts.start)) {
				animation.opts.start.call(elem, animation);
			}

			jQuery.fx.timer(
				jQuery.extend(tick, {
					elem: elem,
					anim: animation,
					queue: animation.opts.queue
				})
			);

			// attach callbacks from options
			return animation.progress(animation.opts.progress)
				.done(animation.opts.done, animation.opts.complete)
				.fail(animation.opts.fail)
				.always(animation.opts.always);
		}

		function propFilter(props, specialEasing) {
			var value, name, index, easing, hooks;

			// camelCase, specialEasing and expand cssHook pass
			for (index in props) {
				name = jQuery.camelCase(index);
				easing = specialEasing[name];
				value = props[index];
				if (jQuery.isArray(value)) {
					easing = value[1];
					value = props[index] = value[0];
				}

				if (index !== name) {
					props[name] = value;
					delete props[index];
				}

				hooks = jQuery.cssHooks[name];
				if (hooks && "expand" in hooks) {
					value = hooks.expand(value);
					delete props[name];

					// not quite $.extend, this wont overwrite keys already present.
					// also - reusing 'index' from above because we have the correct "name"
					for (index in value) {
						if (!(index in props)) {
							props[index] = value[index];
							specialEasing[index] = easing;
						}
					}
				} else {
					specialEasing[name] = easing;
				}
			}
		}

		jQuery.Animation = jQuery.extend(Animation, {

			tweener: function(props, callback) {
				if (jQuery.isFunction(props)) {
					callback = props;
					props = ["*"];
				} else {
					props = props.split(" ");
				}

				var prop,
					index = 0,
					length = props.length;

				for (; index < length; index++) {
					prop = props[index];
					tweeners[prop] = tweeners[prop] || [];
					tweeners[prop].unshift(callback);
				}
			},

			prefilter: function(callback, prepend) {
				if (prepend) {
					animationPrefilters.unshift(callback);
				} else {
					animationPrefilters.push(callback);
				}
			}
		});

		function defaultPrefilter(elem, props, opts) {
			/*jshint validthis:true */
			var prop, index, length,
				value, dataShow, toggle,
				tween, hooks, oldfire,
				anim = this,
				style = elem.style,
				orig = {},
				handled = [],
				hidden = elem.nodeType && isHidden(elem);

			// handle queue: false promises
			if (!opts.queue) {
				hooks = jQuery._queueHooks(elem, "fx");
				if (hooks.unqueued == null) {
					hooks.unqueued = 0;
					oldfire = hooks.empty.fire;
					hooks.empty.fire = function() {
						if (!hooks.unqueued) {
							oldfire();
						}
					};
				}
				hooks.unqueued++;

				anim.always(function() {
					// doing this makes sure that the complete handler will be called
					// before this completes
					anim.always(function() {
						hooks.unqueued--;
						if (!jQuery.queue(elem, "fx").length) {
							hooks.empty.fire();
						}
					});
				});
			}

			// height/width overflow pass
			if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
				// Make sure that nothing sneaks out
				// Record all 3 overflow attributes because IE does not
				// change the overflow attribute when overflowX and
				// overflowY are set to the same value
				opts.overflow = [style.overflow, style.overflowX, style.overflowY];

				// Set display property to inline-block for height/width
				// animations on inline elements that are having width/height animated
				if (jQuery.css(elem, "display") === "inline" &&
					jQuery.css(elem, "float") === "none") {

					// inline-level elements accept inline-block;
					// block-level elements need to be inline with layout
					if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
						style.display = "inline-block";

					} else {
						style.zoom = 1;
					}
				}
			}

			if (opts.overflow) {
				style.overflow = "hidden";
				if (!jQuery.support.shrinkWrapBlocks) {
					anim.always(function() {
						style.overflow = opts.overflow[0];
						style.overflowX = opts.overflow[1];
						style.overflowY = opts.overflow[2];
					});
				}
			}


			// show/hide pass
			for (index in props) {
				value = props[index];
				if (rfxtypes.exec(value)) {
					delete props[index];
					toggle = toggle || value === "toggle";
					if (value === (hidden ? "hide" : "show")) {
						continue;
					}
					handled.push(index);
				}
			}

			length = handled.length;
			if (length) {
				dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}

				// store state if its toggle - enables .stop().toggle() to "reverse"
				if (toggle) {
					dataShow.hidden = !hidden;
				}
				if (hidden) {
					jQuery(elem).show();
				} else {
					anim.done(function() {
						jQuery(elem).hide();
					});
				}
				anim.done(function() {
					var prop;
					jQuery._removeData(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
				for (index = 0; index < length; index++) {
					prop = handled[index];
					tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
					orig[prop] = dataShow[prop] || jQuery.style(elem, prop);

					if (!(prop in dataShow)) {
						dataShow[prop] = tween.start;
						if (hidden) {
							tween.end = tween.start;
							tween.start = prop === "width" || prop === "height" ? 1 : 0;
						}
					}
				}
			}
		}

		function Tween(elem, options, prop, end, easing) {
			return new Tween.prototype.init(elem, options, prop, end, easing);
		}
		jQuery.Tween = Tween;

		Tween.prototype = {
			constructor: Tween,
			init: function(elem, options, prop, end, easing, unit) {
				this.elem = elem;
				this.prop = prop;
				this.easing = easing || "swing";
				this.options = options;
				this.start = this.now = this.cur();
				this.end = end;
				this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
			},
			cur: function() {
				var hooks = Tween.propHooks[this.prop];

				return hooks && hooks.get ?
					hooks.get(this) :
					Tween.propHooks._default.get(this);
			},
			run: function(percent) {
				var eased,
					hooks = Tween.propHooks[this.prop];

				if (this.options.duration) {
					this.pos = eased = jQuery.easing[this.easing](
						percent, this.options.duration * percent, 0, 1, this.options.duration
					);
				} else {
					this.pos = eased = percent;
				}
				this.now = (this.end - this.start) * eased + this.start;

				if (this.options.step) {
					this.options.step.call(this.elem, this.now, this);
				}

				if (hooks && hooks.set) {
					hooks.set(this);
				} else {
					Tween.propHooks._default.set(this);
				}
				return this;
			}
		};

		Tween.prototype.init.prototype = Tween.prototype;

		Tween.propHooks = {
			_default: {
				get: function(tween) {
					var result;

					if (tween.elem[tween.prop] != null &&
						(!tween.elem.style || tween.elem.style[tween.prop] == null)) {
						return tween.elem[tween.prop];
					}

					// passing an empty string as a 3rd parameter to .css will automatically
					// attempt a parseFloat and fallback to a string if the parse fails
					// so, simple values such as "10px" are parsed to Float.
					// complex values such as "rotate(1rad)" are returned as is.
					result = jQuery.css(tween.elem, tween.prop, "");
					// Empty strings, null, undefined and "auto" are converted to 0.
					return !result || result === "auto" ? 0 : result;
				},
				set: function(tween) {
					// use step hook for back compat - use cssHook if its there - use .style if its
					// available and use plain properties where available
					if (jQuery.fx.step[tween.prop]) {
						jQuery.fx.step[tween.prop](tween);
					} else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
						jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
					} else {
						tween.elem[tween.prop] = tween.now;
					}
				}
			}
		};

		// Remove in 2.0 - this supports IE8's panic based approach
		// to setting things on disconnected nodes

		Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
			set: function(tween) {
				if (tween.elem.nodeType && tween.elem.parentNode) {
					tween.elem[tween.prop] = tween.now;
				}
			}
		};

		jQuery.each(["toggle", "show", "hide"], function(i, name) {
			var cssFn = jQuery.fn[name];
			jQuery.fn[name] = function(speed, easing, callback) {
				return speed == null || typeof speed === "boolean" ?
					cssFn.apply(this, arguments) :
					this.animate(genFx(name, true), speed, easing, callback);
			};
		});

		jQuery.fn.extend({
			fadeTo: function(speed, to, easing, callback) {

				// show any hidden elements after setting opacity to 0
				return this.filter(isHidden).css("opacity", 0).show()

				// animate to the value specified
				.end().animate({
					opacity: to
				}, speed, easing, callback);
			},
			animate: function(prop, speed, easing, callback) {
				var empty = jQuery.isEmptyObject(prop),
					optall = jQuery.speed(speed, easing, callback),
					doAnimation = function() {
						// Operate on a copy of prop so per-property easing won't be lost
						var anim = Animation(this, jQuery.extend({}, prop), optall);
						doAnimation.finish = function() {
							anim.stop(true);
						};
						// Empty animations, or finishing resolves immediately
						if (empty || jQuery._data(this, "finish")) {
							anim.stop(true);
						}
					};
				doAnimation.finish = doAnimation;

				return empty || optall.queue === false ?
					this.each(doAnimation) :
					this.queue(optall.queue, doAnimation);
			},
			stop: function(type, clearQueue, gotoEnd) {
				var stopQueue = function(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd);
				};

				if (typeof type !== "string") {
					gotoEnd = clearQueue;
					clearQueue = type;
					type = undefined;
				}
				if (clearQueue && type !== false) {
					this.queue(type || "fx", []);
				}

				return this.each(function() {
					var dequeue = true,
						index = type != null && type + "queueHooks",
						timers = jQuery.timers,
						data = jQuery._data(this);

					if (index) {
						if (data[index] && data[index].stop) {
							stopQueue(data[index]);
						}
					} else {
						for (index in data) {
							if (data[index] && data[index].stop && rrun.test(index)) {
								stopQueue(data[index]);
							}
						}
					}

					for (index = timers.length; index--;) {
						if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
							timers[index].anim.stop(gotoEnd);
							dequeue = false;
							timers.splice(index, 1);
						}
					}

					// start the next in the queue if the last step wasn't forced
					// timers currently will call their complete callbacks, which will dequeue
					// but only if they were gotoEnd
					if (dequeue || !gotoEnd) {
						jQuery.dequeue(this, type);
					}
				});
			},
			finish: function(type) {
				if (type !== false) {
					type = type || "fx";
				}
				return this.each(function() {
					var index,
						data = jQuery._data(this),
						queue = data[type + "queue"],
						hooks = data[type + "queueHooks"],
						timers = jQuery.timers,
						length = queue ? queue.length : 0;

					// enable finishing flag on private data
					data.finish = true;

					// empty the queue first
					jQuery.queue(this, type, []);

					if (hooks && hooks.cur && hooks.cur.finish) {
						hooks.cur.finish.call(this);
					}

					// look for any active animations, and finish them
					for (index = timers.length; index--;) {
						if (timers[index].elem === this && timers[index].queue === type) {
							timers[index].anim.stop(true);
							timers.splice(index, 1);
						}
					}

					// look for any animations in the old queue and finish them
					for (index = 0; index < length; index++) {
						if (queue[index] && queue[index].finish) {
							queue[index].finish.call(this);
						}
					}

					// turn off finishing flag
					delete data.finish;
				});
			}
		});

		// Generate parameters to create a standard animation
		function genFx(type, includeWidth) {
			var which,
				attrs = {
					height: type
				},
				i = 0;

			// if we include width, step value is 1 to do all cssExpand values,
			// if we don't include width, step value is 2 to skip over Left and Right
			includeWidth = includeWidth ? 1 : 0;
			for (; i < 4; i += 2 - includeWidth) {
				which = cssExpand[i];
				attrs["margin" + which] = attrs["padding" + which] = type;
			}

			if (includeWidth) {
				attrs.opacity = attrs.width = type;
			}

			return attrs;
		}

		// Generate shortcuts for custom animations
		jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(name, props) {
			jQuery.fn[name] = function(speed, easing, callback) {
				return this.animate(props, speed, easing, callback);
			};
		});

		jQuery.speed = function(speed, easing, fn) {
			var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
				complete: fn || !fn && easing ||
					jQuery.isFunction(speed) && speed,
				duration: speed,
				easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
			};

			opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
				opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

			// normalize opt.queue - true/undefined/null -> "fx"
			if (opt.queue == null || opt.queue === true) {
				opt.queue = "fx";
			}

			// Queueing
			opt.old = opt.complete;

			opt.complete = function() {
				if (jQuery.isFunction(opt.old)) {
					opt.old.call(this);
				}

				if (opt.queue) {
					jQuery.dequeue(this, opt.queue);
				}
			};

			return opt;
		};

		jQuery.easing = {
			linear: function(p) {
				return p;
			},
			swing: function(p) {
				return 0.5 - Math.cos(p * Math.PI) / 2;
			}
		};

		jQuery.timers = [];
		jQuery.fx = Tween.prototype.init;
		jQuery.fx.tick = function() {
			var timer,
				timers = jQuery.timers,
				i = 0;

			fxNow = jQuery.now();

			for (; i < timers.length; i++) {
				timer = timers[i];
				// Checks the timer has not already been removed
				if (!timer() && timers[i] === timer) {
					timers.splice(i--, 1);
				}
			}

			if (!timers.length) {
				jQuery.fx.stop();
			}
			fxNow = undefined;
		};

		jQuery.fx.timer = function(timer) {
			if (timer() && jQuery.timers.push(timer)) {
				jQuery.fx.start();
			}
		};

		jQuery.fx.interval = 13;

		jQuery.fx.start = function() {
			if (!timerId) {
				timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
			}
		};

		jQuery.fx.stop = function() {
			clearInterval(timerId);
			timerId = null;
		};

		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		};

		// Back Compat <1.8 extension point
		jQuery.fx.step = {};

		if (jQuery.expr && jQuery.expr.filters) {
			jQuery.expr.filters.animated = function(elem) {
				return jQuery.grep(jQuery.timers, function(fn) {
					return elem === fn.elem;
				}).length;
			};
		}
		jQuery.fn.offset = function(options) {
			if (arguments.length) {
				return options === undefined ?
					this :
					this.each(function(i) {
						jQuery.offset.setOffset(this, options, i);
					});
			}

			var docElem, win,
				box = {
					top: 0,
					left: 0
				},
				elem = this[0],
				doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if (typeof elem.getBoundingClientRect !== core_strundefined) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow(doc);
			return {
				top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
				left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
			};
		};

		jQuery.offset = {

			setOffset: function(elem, options, i) {
				var position = jQuery.css(elem, "position");

				// set position first, in-case top/left are set even on static elem
				if (position === "static") {
					elem.style.position = "relative";
				}

				var curElem = jQuery(elem),
					curOffset = curElem.offset(),
					curCSSTop = jQuery.css(elem, "top"),
					curCSSLeft = jQuery.css(elem, "left"),
					calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
					props = {},
					curPosition = {},
					curTop, curLeft;

				// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
				if (calculatePosition) {
					curPosition = curElem.position();
					curTop = curPosition.top;
					curLeft = curPosition.left;
				} else {
					curTop = parseFloat(curCSSTop) || 0;
					curLeft = parseFloat(curCSSLeft) || 0;
				}

				if (jQuery.isFunction(options)) {
					options = options.call(elem, i, curOffset);
				}

				if (options.top != null) {
					props.top = (options.top - curOffset.top) + curTop;
				}
				if (options.left != null) {
					props.left = (options.left - curOffset.left) + curLeft;
				}

				if ("using" in options) {
					options.using.call(elem, props);
				} else {
					curElem.css(props);
				}
			}
		};


		jQuery.fn.extend({

			position: function() {
				if (!this[0]) {
					return;
				}

				var offsetParent, offset,
					parentOffset = {
						top: 0,
						left: 0
					},
					elem = this[0];

				// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
				if (jQuery.css(elem, "position") === "fixed") {
					// we assume that getBoundingClientRect is available when computed position is fixed
					offset = elem.getBoundingClientRect();
				} else {
					// Get *real* offsetParent
					offsetParent = this.offsetParent();

					// Get correct offsets
					offset = this.offset();
					if (!jQuery.nodeName(offsetParent[0], "html")) {
						parentOffset = offsetParent.offset();
					}

					// Add offsetParent borders
					parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
					parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
				}

				// Subtract parent offsets and element margins
				// note: when an element has margin: auto the offsetLeft and marginLeft
				// are the same in Safari causing offset.left to incorrectly be 0
				return {
					top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
					left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
				};
			},

			offsetParent: function() {
				return this.map(function() {
					var offsetParent = this.offsetParent || document.documentElement;
					while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
						offsetParent = offsetParent.offsetParent;
					}
					return offsetParent || document.documentElement;
				});
			}
		});


		// Create scrollLeft and scrollTop methods
		jQuery.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(method, prop) {
			var top = /Y/.test(prop);

			jQuery.fn[method] = function(val) {
				return jQuery.access(this, function(elem, method, val) {
					var win = getWindow(elem);

					if (val === undefined) {
						return win ? (prop in win) ? win[prop] :
							win.document.documentElement[method] :
							elem[method];
					}

					if (win) {
						win.scrollTo(!top ? val : jQuery(win).scrollLeft(),
							top ? val : jQuery(win).scrollTop()
						);

					} else {
						elem[method] = val;
					}
				}, method, val, arguments.length, null);
			};
		});

		function getWindow(elem) {
			return jQuery.isWindow(elem) ?
				elem :
				elem.nodeType === 9 ?
				elem.defaultView || elem.parentWindow :
				false;
		}
		// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		jQuery.each({
			Height: "height",
			Width: "width"
		}, function(name, type) {
			jQuery.each({
				padding: "inner" + name,
				content: type,
				"": "outer" + name
			}, function(defaultExtra, funcName) {
				// margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function(margin, value) {
					var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
						extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

					return jQuery.access(this, function(elem, type, value) {
						var doc;

						if (jQuery.isWindow(elem)) {
							// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
							// isn't a whole lot we can do. See pull request at this URL for discussion:
							// //github.com/jquery/jquery/pull/764
							return elem.document.documentElement["client" + name];
						}

						// Get document width or height
						if (elem.nodeType === 9) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
							// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
							return Math.max(
								elem.body["scroll" + name], doc["scroll" + name],
								elem.body["offset" + name], doc["offset" + name],
								doc["client" + name]
							);
						}

						return value === undefined ?
							// Get width or height on the element, requesting but not forcing parseFloat
							jQuery.css(elem, type, extra) :

							// Set width or height on the element
							jQuery.style(elem, type, value, extra);
					}, type, chainable ? margin : undefined, chainable, null);
				};
			});
		});
		// Limit scope pollution from any deprecated API
		// (function() {

		// })();
		// Expose jQuery to the global object
		window.jQuery = window.$ = jQuery;

		// Expose jQuery as an AMD module, but only for AMD loaders that
		// understand the issues with loading multiple versions of jQuery
		// in a page that all might call define(). The loader will indicate
		// they have special allowances for multiple jQuery versions by
		// specifying define.amd.jQuery = true. Register as a named module,
		// since jQuery can be concatenated with other files that may use define,
		// but not use a proper concatenation script that understands anonymous
		// AMD modules. A named AMD is safest and most robust way to register.
		// Lowercase jquery is used because AMD module names are derived from
		// file names, and jQuery is normally delivered in a lowercase file name.
		// Do this after creating the global so that if an AMD module wants to call
		// noConflict to hide this version of jQuery, it will work.
		if ("function" === "function" && __webpack_require__(5) && __webpack_require__(5).jQuery) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return jQuery;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}

	})(window);

	module.exports=jQuery;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Placeholder Plugin v2.3.1
	 * https://github.com/mathiasbynens/jquery-placeholder
	 *
	 * Copyright 2011, 2015 Mathias Bynens
	 * Released under the MIT license
	 */
	(function(factory) {
	    if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	        factory(require('jquery'));
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}(function($) {

	    /****
	     * Allows plugin behavior simulation in modern browsers for easier debugging. 
	     * When setting to true, use attribute "placeholder-x" rather than the usual "placeholder" in your inputs/textareas 
	     * i.e. <input type="text" placeholder-x="my placeholder text" />
	     */
	    var debugMode = false; 

	    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
	    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
	    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
	    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
	    var valHooks = $.valHooks;
	    var propHooks = $.propHooks;
	    var hooks;
	    var placeholder;
	    var settings = {};

	    if (isInputSupported && isTextareaSupported) {

	        placeholder = $.fn.placeholder = function() {
	            return this;
	        };

	        placeholder.input = true;
	        placeholder.textarea = true;

	    } else {

	        placeholder = $.fn.placeholder = function(options) {

	            var defaults = {customClass: 'placeholder'};
	            settings = $.extend({}, defaults, options);

	            return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']')
	                .not('.'+settings.customClass)
	                .not(':radio, :checkbox, [type=hidden]')
	                .bind({
	                    'focus.placeholder': clearPlaceholder,
	                    'blur.placeholder': setPlaceholder
	                })
	                .data('placeholder-enabled', true)
	                .trigger('blur.placeholder');
	        };

	        placeholder.input = isInputSupported;
	        placeholder.textarea = isTextareaSupported;

	        hooks = {
	            'get': function(element) {

	                var $element = $(element);
	                var $passwordInput = $element.data('placeholder-password');

	                if ($passwordInput) {
	                    return $passwordInput[0].value;
	                }

	                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
	            },
	            'set': function(element, value) {

	                var $element = $(element);
	                var $replacement;
	                var $passwordInput;

	                if (value !== '') {

	                    $replacement = $element.data('placeholder-textinput');
	                    $passwordInput = $element.data('placeholder-password');

	                    if ($replacement) {
	                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
	                        $replacement[0].value = value;

	                    } else if ($passwordInput) {
	                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
	                        element.value = value;
	                    }
	                }

	                if (!$element.data('placeholder-enabled')) {
	                    element.value = value;
	                    return $element;
	                }

	                if (value === '') {
	                    
	                    element.value = value;
	                    
	                    // Setting the placeholder causes problems if the element continues to have focus.
	                    if (element != safeActiveElement()) {
	                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
	                        setPlaceholder.call(element);
	                    }

	                } else {
	                    
	                    if ($element.hasClass(settings.customClass)) {
	                        clearPlaceholder.call(element);
	                    }

	                    element.value = value;
	                }
	                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
	                return $element;
	            }
	        };

	        if (!isInputSupported) {
	            valHooks.input = hooks;
	            propHooks.value = hooks;
	        }

	        if (!isTextareaSupported) {
	            valHooks.textarea = hooks;
	            propHooks.value = hooks;
	        }

	        $(function() {
	            // Look for forms
	            $(document).delegate('form', 'submit.placeholder', function() {
	                
	                // Clear the placeholder values so they don't get submitted
	                var $inputs = $('.'+settings.customClass, this).each(function() {
	                    clearPlaceholder.call(this, true, '');
	                });

	                setTimeout(function() {
	                    $inputs.each(setPlaceholder);
	                }, 10);
	            });
	        });

	        // Clear placeholder values upon page reload
	        $(window).bind('beforeunload.placeholder', function() {

	            var clearPlaceholders = true;

	            try {
	                // Prevent IE javascript:void(0) anchors from causing cleared values
	                if (document.activeElement.toString() === 'javascript:void(0)') {
	                    clearPlaceholders = false;
	                }
	            } catch (exception) { }

	            if (clearPlaceholders) {
	                $('.'+settings.customClass).each(function() {
	                    this.value = '';
	                });
	            }
	        });
	    }

	    function args(elem) {
	        // Return an object of element attributes
	        var newAttrs = {};
	        var rinlinejQuery = /^jQuery\d+$/;

	        $.each(elem.attributes, function(i, attr) {
	            if (attr.specified && !rinlinejQuery.test(attr.name)) {
	                newAttrs[attr.name] = attr.value;
	            }
	        });

	        return newAttrs;
	    }

	    function clearPlaceholder(event, value) {
	        
	        var input = this;
	        var $input = $(this);
	        
	        if (input.value === $input.attr((debugMode ? 'placeholder-x' : 'placeholder')) && $input.hasClass(settings.customClass)) {
	            
	            input.value = '';
	            $input.removeClass(settings.customClass);

	            if ($input.data('placeholder-password')) {

	                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
	                
	                // If `clearPlaceholder` was called from `$.valHooks.input.set`
	                if (event === true) {
	                    $input[0].value = value;

	                    return value;
	                }

	                $input.focus();

	            } else {
	                input == safeActiveElement() && input.select();
	            }
	        }
	    }

	    function setPlaceholder(event) {
	        var $replacement;
	        var input = this;
	        var $input = $(this);
	        var id = input.id;

	        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
	        if (event && event.type === 'blur' && $input.hasClass(settings.customClass)) {
	            return;
	        }

	        if (input.value === '') {
	            if (input.type === 'password') {
	                if (!$input.data('placeholder-textinput')) {
	                    
	                    try {
	                        $replacement = $input.clone().prop({ 'type': 'text' });
	                    } catch(e) {
	                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
	                    }

	                    $replacement
	                        .removeAttr('name')
	                        .data({
	                            'placeholder-enabled': true,
	                            'placeholder-password': $input,
	                            'placeholder-id': id
	                        })
	                        .bind('focus.placeholder', clearPlaceholder);

	                    $input
	                        .data({
	                            'placeholder-textinput': $replacement,
	                            'placeholder-id': id
	                        })
	                        .before($replacement);
	                }

	                input.value = '';
	                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

	            } else {
	                
	                var $passwordInput = $input.data('placeholder-password');

	                if ($passwordInput) {
	                    $passwordInput[0].value = '';
	                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
	                }
	            }

	            $input.addClass(settings.customClass);
	            $input[0].value = $input.attr((debugMode ? 'placeholder-x' : 'placeholder'));

	        } else {
	            $input.removeClass(settings.customClass);
	        }
	    }

	    function safeActiveElement() {
	        // Avoid IE9 `document.activeElement` of death
	        try {
	            return document.activeElement;
	        } catch (exception) {}
	    }
	}));


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["OwlCarousel"] = __webpack_require__(60);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

	/*
	 *  jQuery OwlCarousel v1.3.3
	 *
	 *  Copyright (c) 2013 Bartosz Wojciechowski
	 *  //www.owlgraphic.com/owlcarousel/
	 *
	 *  Licensed under MIT
	 *
	 */

	/*JS Lint helpers: */
	/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
	/*jslint nomen: true, continue:true */

	if (typeof Object.create !== "function") {
	    Object.create = function (obj) {
	        function F() {}
	        F.prototype = obj;
	        return new F();
	    };
	}
	(function ($, window, document) {

	    var Carousel = {
	        init : function (options, el) {
	            var base = this;

	            base.$elem = $(el);
	            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

	            base.userOptions = options;
	            base.loadContent();
	        },

	        loadContent : function () {
	            var base = this, url;

	            function getData(data) {
	                var i, content = "";
	                if (typeof base.options.jsonSuccess === "function") {
	                    base.options.jsonSuccess.apply(this, [data]);
	                } else {
	                    for (i in data.owl) {
	                        if (data.owl.hasOwnProperty(i)) {
	                            content += data.owl[i].item;
	                        }
	                    }
	                    base.$elem.html(content);
	                }
	                base.logIn();
	            }

	            if (typeof base.options.beforeInit === "function") {
	                base.options.beforeInit.apply(this, [base.$elem]);
	            }

	            if (typeof base.options.jsonPath === "string") {
	                url = base.options.jsonPath;
	                $.getJSON(url, getData);
	            } else {
	                base.logIn();
	            }
	        },

	        logIn : function () {
	            var base = this;

	            base.$elem.data({
	                "owl-originalStyles": base.$elem.attr("style"),
	                "owl-originalClasses": base.$elem.attr("class")
	            });

	            base.$elem.css({opacity: 0});
	            base.orignalItems = base.options.items;
	            base.checkBrowser();
	            base.wrapperWidth = 0;
	            base.checkVisible = null;
	            base.setVars();
	        },

	        setVars : function () {
	            var base = this;
	            if (base.$elem.children().length === 0) {return false; }
	            base.baseClass();
	            base.eventTypes();
	            base.$userItems = base.$elem.children();
	            base.itemsAmount = base.$userItems.length;
	            base.wrapItems();
	            base.$owlItems = base.$elem.find(".owl-item");
	            base.$owlWrapper = base.$elem.find(".owl-wrapper");
	            base.playDirection = "next";
	            base.prevItem = 0;
	            base.prevArr = [0];
	            base.currentItem = 0;
	            base.customEvents();
	            base.onStartup();
	        },

	        onStartup : function () {
	            var base = this;
	            base.updateItems();
	            base.calculateAll();
	            base.buildControls();
	            base.updateControls();
	            base.response();
	            base.moveEvents();
	            base.stopOnHover();
	            base.owlStatus();

	            if (base.options.transitionStyle !== false) {
	                base.transitionTypes(base.options.transitionStyle);
	            }
	            if (base.options.autoPlay === true) {
	                base.options.autoPlay = 5000;
	            }
	            base.play();

	            base.$elem.find(".owl-wrapper").css("display", "block");

	            if (!base.$elem.is(":visible")) {
	                base.watchVisibility();
	            } else {
	                base.$elem.css("opacity", 1);
	            }
	            base.onstartup = false;
	            base.eachMoveUpdate();
	            if (typeof base.options.afterInit === "function") {
	                base.options.afterInit.apply(this, [base.$elem]);
	            }
	        },

	        eachMoveUpdate : function () {
	            var base = this;

	            if (base.options.lazyLoad === true) {
	                base.lazyLoad();
	            }
	            if (base.options.autoHeight === true) {
	                base.autoHeight();
	            }
	            base.onVisibleItems();

	            if (typeof base.options.afterAction === "function") {
	                base.options.afterAction.apply(this, [base.$elem]);
	            }
	        },

	        updateVars : function () {
	            var base = this;
	            if (typeof base.options.beforeUpdate === "function") {
	                base.options.beforeUpdate.apply(this, [base.$elem]);
	            }
	            base.watchVisibility();
	            base.updateItems();
	            base.calculateAll();
	            base.updatePosition();
	            base.updateControls();
	            base.eachMoveUpdate();
	            if (typeof base.options.afterUpdate === "function") {
	                base.options.afterUpdate.apply(this, [base.$elem]);
	            }
	        },

	        reload : function () {
	            var base = this;
	            window.setTimeout(function () {
	                base.updateVars();
	            }, 0);
	        },

	        watchVisibility : function () {
	            var base = this;

	            if (base.$elem.is(":visible") === false) {
	                base.$elem.css({opacity: 0});
	                window.clearInterval(base.autoPlayInterval);
	                window.clearInterval(base.checkVisible);
	            } else {
	                return false;
	            }
	            base.checkVisible = window.setInterval(function () {
	                if (base.$elem.is(":visible")) {
	                    base.reload();
	                    base.$elem.animate({opacity: 1}, 200);
	                    window.clearInterval(base.checkVisible);
	                }
	            }, 500);
	        },

	        wrapItems : function () {
	            var base = this;
	            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
	            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
	            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
	            base.$elem.css("display", "block");
	        },

	        baseClass : function () {
	            var base = this,
	                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
	                hasThemeClass = base.$elem.hasClass(base.options.theme);

	            if (!hasBaseClass) {
	                base.$elem.addClass(base.options.baseClass);
	            }

	            if (!hasThemeClass) {
	                base.$elem.addClass(base.options.theme);
	            }
	        },

	        updateItems : function () {
	            var base = this, width, i;

	            if (base.options.responsive === false) {
	                return false;
	            }
	            if (base.options.singleItem === true) {
	                base.options.items = base.orignalItems = 1;
	                base.options.itemsCustom = false;
	                base.options.itemsDesktop = false;
	                base.options.itemsDesktopSmall = false;
	                base.options.itemsTablet = false;
	                base.options.itemsTabletSmall = false;
	                base.options.itemsMobile = false;
	                return false;
	            }

	            width = $(base.options.responsiveBaseWidth).width();

	            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
	                base.options.items = base.orignalItems;
	            }
	            if (base.options.itemsCustom !== false) {
	                //Reorder array by screen size
	                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

	                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
	                    if (base.options.itemsCustom[i][0] <= width) {
	                        base.options.items = base.options.itemsCustom[i][1];
	                    }
	                }

	            } else {

	                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
	                    base.options.items = base.options.itemsDesktop[1];
	                }

	                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
	                    base.options.items = base.options.itemsDesktopSmall[1];
	                }

	                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
	                    base.options.items = base.options.itemsTablet[1];
	                }

	                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
	                    base.options.items = base.options.itemsTabletSmall[1];
	                }

	                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
	                    base.options.items = base.options.itemsMobile[1];
	                }
	            }

	            //if number of items is less than declared
	            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
	                base.options.items = base.itemsAmount;
	            }
	        },

	        response : function () {
	            var base = this,
	                smallDelay,
	                lastWindowWidth;

	            if (base.options.responsive !== true) {
	                return false;
	            }
	            lastWindowWidth = $(window).width();

	            base.resizer = function () {
	                if ($(window).width() !== lastWindowWidth) {
	                    if (base.options.autoPlay !== false) {
	                        window.clearInterval(base.autoPlayInterval);
	                    }
	                    window.clearTimeout(smallDelay);
	                    smallDelay = window.setTimeout(function () {
	                        lastWindowWidth = $(window).width();
	                        base.updateVars();
	                    }, base.options.responsiveRefreshRate);
	                }
	            };
	            $(window).resize(base.resizer);
	        },

	        updatePosition : function () {
	            var base = this;
	            base.jumpTo(base.currentItem);
	            if (base.options.autoPlay !== false) {
	                base.checkAp();
	            }
	        },

	        appendItemsSizes : function () {
	            var base = this,
	                roundPages = 0,
	                lastItem = base.itemsAmount - base.options.items;

	            base.$owlItems.each(function (index) {
	                var $this = $(this);
	                $this
	                    .css({"width": base.itemWidth})
	                    .data("owl-item", Number(index));

	                if (index % base.options.items === 0 || index === lastItem) {
	                    if (!(index > lastItem)) {
	                        roundPages += 1;
	                    }
	                }
	                $this.data("owl-roundPages", roundPages);
	            });
	        },

	        appendWrapperSizes : function () {
	            var base = this,
	                width = base.$owlItems.length * base.itemWidth;

	            base.$owlWrapper.css({
	                "width": width * 2,
	                "left": 0
	            });
	            base.appendItemsSizes();
	        },

	        calculateAll : function () {
	            var base = this;
	            base.calculateWidth();
	            base.appendWrapperSizes();
	            base.loops();
	            base.max();
	        },

	        calculateWidth : function () {
	            var base = this;
	            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
	        },

	        max : function () {
	            var base = this,
	                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
	            if (base.options.items > base.itemsAmount) {
	                base.maximumItem = 0;
	                maximum = 0;
	                base.maximumPixels = 0;
	            } else {
	                base.maximumItem = base.itemsAmount - base.options.items;
	                base.maximumPixels = maximum;
	            }
	            return maximum;
	        },

	        min : function () {
	            return 0;
	        },

	        loops : function () {
	            var base = this,
	                prev = 0,
	                elWidth = 0,
	                i,
	                item,
	                roundPageNum;

	            base.positionsInArray = [0];
	            base.pagesInArray = [];

	            for (i = 0; i < base.itemsAmount; i += 1) {
	                elWidth += base.itemWidth;
	                base.positionsInArray.push(-elWidth);

	                if (base.options.scrollPerPage === true) {
	                    item = $(base.$owlItems[i]);
	                    roundPageNum = item.data("owl-roundPages");
	                    if (roundPageNum !== prev) {
	                        base.pagesInArray[prev] = base.positionsInArray[i];
	                        prev = roundPageNum;
	                    }
	                }
	            }
	        },

	        buildControls : function () {
	            var base = this;
	            if (base.options.navigation === true || base.options.pagination === true) {
	                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
	            }
	            if (base.options.pagination === true) {
	                base.buildPagination();
	            }
	            if (base.options.navigation === true) {
	                base.buildButtons();
	            }
	        },

	        buildButtons : function () {
	            var base = this,
	                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
	            base.owlControls.append(buttonsWrapper);

	            base.buttonPrev = $("<div/>", {
	                "class" : "owl-prev",
	                "html" : base.options.navigationText[0] || ""
	            });

	            base.buttonNext = $("<div/>", {
	                "class" : "owl-next",
	                "html" : base.options.navigationText[1] || ""
	            });

	            buttonsWrapper
	                .append(base.buttonPrev)
	                .append(base.buttonNext);

	            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
	                event.preventDefault();
	            });

	            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
	                event.preventDefault();
	                if ($(this).hasClass("owl-next")) {
	                    base.next();
	                } else {
	                    base.prev();
	                }
	            });
	        },

	        buildPagination : function () {
	            var base = this;

	            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
	            base.owlControls.append(base.paginationWrapper);

	            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
	                event.preventDefault();
	                if (Number($(this).data("owl-page")) !== base.currentItem) {
	                    base.goTo(Number($(this).data("owl-page")), true);
	                }
	            });
	        },

	        updatePagination : function () {
	            var base = this,
	                counter,
	                lastPage,
	                lastItem,
	                i,
	                paginationButton,
	                paginationButtonInner;

	            if (base.options.pagination === false) {
	                return false;
	            }

	            base.paginationWrapper.html("");

	            counter = 0;
	            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

	            for (i = 0; i < base.itemsAmount; i += 1) {
	                if (i % base.options.items === 0) {
	                    counter += 1;
	                    if (lastPage === i) {
	                        lastItem = base.itemsAmount - base.options.items;
	                    }
	                    paginationButton = $("<div/>", {
	                        "class" : "owl-page"
	                    });
	                    paginationButtonInner = $("<span></span>", {
	                        "text": base.options.paginationNumbers === true ? counter : "",
	                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
	                    });
	                    paginationButton.append(paginationButtonInner);

	                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
	                    paginationButton.data("owl-roundPages", counter);

	                    base.paginationWrapper.append(paginationButton);
	                }
	            }
	            base.checkPagination();
	        },
	        checkPagination : function () {
	            var base = this;
	            if (base.options.pagination === false) {
	                return false;
	            }
	            base.paginationWrapper.find(".owl-page").each(function () {
	                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
	                    base.paginationWrapper
	                        .find(".owl-page")
	                        .removeClass("active");
	                    $(this).addClass("active");
	                }
	            });
	        },

	        checkNavigation : function () {
	            var base = this;

	            if (base.options.navigation === false) {
	                return false;
	            }
	            if (base.options.rewindNav === false) {
	                if (base.currentItem === 0 && base.maximumItem === 0) {
	                    base.buttonPrev.addClass("disabled");
	                    base.buttonNext.addClass("disabled");
	                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
	                    base.buttonPrev.addClass("disabled");
	                    base.buttonNext.removeClass("disabled");
	                } else if (base.currentItem === base.maximumItem) {
	                    base.buttonPrev.removeClass("disabled");
	                    base.buttonNext.addClass("disabled");
	                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
	                    base.buttonPrev.removeClass("disabled");
	                    base.buttonNext.removeClass("disabled");
	                }
	            }
	        },

	        updateControls : function () {
	            var base = this;
	            base.updatePagination();
	            base.checkNavigation();
	            if (base.owlControls) {
	                if (base.options.items >= base.itemsAmount) {
	                    base.owlControls.hide();
	                } else {
	                    base.owlControls.show();
	                }
	            }
	        },

	        destroyControls : function () {
	            var base = this;
	            if (base.owlControls) {
	                base.owlControls.remove();
	            }
	        },

	        next : function (speed) {
	            var base = this;

	            if (base.isTransition) {
	                return false;
	            }

	            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
	            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
	                if (base.options.rewindNav === true) {
	                    base.currentItem = 0;
	                    speed = "rewind";
	                } else {
	                    base.currentItem = base.maximumItem;
	                    return false;
	                }
	            }
	            base.goTo(base.currentItem, speed);
	        },

	        prev : function (speed) {
	            var base = this;

	            if (base.isTransition) {
	                return false;
	            }

	            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
	                base.currentItem = 0;
	            } else {
	                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
	            }
	            if (base.currentItem < 0) {
	                if (base.options.rewindNav === true) {
	                    base.currentItem = base.maximumItem;
	                    speed = "rewind";
	                } else {
	                    base.currentItem = 0;
	                    return false;
	                }
	            }
	            base.goTo(base.currentItem, speed);
	        },

	        goTo : function (position, speed, drag) {
	            var base = this,
	                goToPixel;

	            if (base.isTransition) {
	                return false;
	            }
	            if (typeof base.options.beforeMove === "function") {
	                base.options.beforeMove.apply(this, [base.$elem]);
	            }
	            if (position >= base.maximumItem) {
	                position = base.maximumItem;
	            } else if (position <= 0) {
	                position = 0;
	            }

	            base.currentItem = base.owl.currentItem = position;
	            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
	                base.swapSpeed(0);
	                if (base.browser.support3d === true) {
	                    base.transition3d(base.positionsInArray[position]);
	                } else {
	                    base.css2slide(base.positionsInArray[position], 1);
	                }
	                base.afterGo();
	                base.singleItemTransition();
	                return false;
	            }
	            goToPixel = base.positionsInArray[position];

	            if (base.browser.support3d === true) {
	                base.isCss3Finish = false;

	                if (speed === true) {
	                    base.swapSpeed("paginationSpeed");
	                    window.setTimeout(function () {
	                        base.isCss3Finish = true;
	                    }, base.options.paginationSpeed);

	                } else if (speed === "rewind") {
	                    base.swapSpeed(base.options.rewindSpeed);
	                    window.setTimeout(function () {
	                        base.isCss3Finish = true;
	                    }, base.options.rewindSpeed);

	                } else {
	                    base.swapSpeed("slideSpeed");
	                    window.setTimeout(function () {
	                        base.isCss3Finish = true;
	                    }, base.options.slideSpeed);
	                }
	                base.transition3d(goToPixel);
	            } else {
	                if (speed === true) {
	                    base.css2slide(goToPixel, base.options.paginationSpeed);
	                } else if (speed === "rewind") {
	                    base.css2slide(goToPixel, base.options.rewindSpeed);
	                } else {
	                    base.css2slide(goToPixel, base.options.slideSpeed);
	                }
	            }
	            base.afterGo();
	        },

	        jumpTo : function (position) {
	            var base = this;
	            if (typeof base.options.beforeMove === "function") {
	                base.options.beforeMove.apply(this, [base.$elem]);
	            }
	            if (position >= base.maximumItem || position === -1) {
	                position = base.maximumItem;
	            } else if (position <= 0) {
	                position = 0;
	            }
	            base.swapSpeed(0);
	            if (base.browser.support3d === true) {
	                base.transition3d(base.positionsInArray[position]);
	            } else {
	                base.css2slide(base.positionsInArray[position], 1);
	            }
	            base.currentItem = base.owl.currentItem = position;
	            base.afterGo();
	        },

	        afterGo : function () {
	            var base = this;

	            base.prevArr.push(base.currentItem);
	            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
	            base.prevArr.shift(0);

	            if (base.prevItem !== base.currentItem) {
	                base.checkPagination();
	                base.checkNavigation();
	                base.eachMoveUpdate();

	                if (base.options.autoPlay !== false) {
	                    base.checkAp();
	                }
	            }
	            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
	                base.options.afterMove.apply(this, [base.$elem]);
	            }
	        },

	        stop : function () {
	            var base = this;
	            base.apStatus = "stop";
	            window.clearInterval(base.autoPlayInterval);
	        },

	        checkAp : function () {
	            var base = this;
	            if (base.apStatus !== "stop") {
	                base.play();
	            }
	        },

	        play : function () {
	            var base = this;
	            base.apStatus = "play";
	            if (base.options.autoPlay === false) {
	                return false;
	            }
	            window.clearInterval(base.autoPlayInterval);
	            base.autoPlayInterval = window.setInterval(function () {
	                base.next(true);
	            }, base.options.autoPlay);
	        },

	        swapSpeed : function (action) {
	            var base = this;
	            if (action === "slideSpeed") {
	                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
	            } else if (action === "paginationSpeed") {
	                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
	            } else if (typeof action !== "string") {
	                base.$owlWrapper.css(base.addCssSpeed(action));
	            }
	        },

	        addCssSpeed : function (speed) {
	            return {
	                "-webkit-transition": "all " + speed + "ms ease",
	                "-moz-transition": "all " + speed + "ms ease",
	                "-o-transition": "all " + speed + "ms ease",
	                "transition": "all " + speed + "ms ease"
	            };
	        },

	        removeTransition : function () {
	            return {
	                "-webkit-transition": "",
	                "-moz-transition": "",
	                "-o-transition": "",
	                "transition": ""
	            };
	        },

	        doTranslate : function (pixels) {
	            return {
	                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
	                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
	                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
	                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
	                "transform": "translate3d(" + pixels + "px, 0px,0px)"
	            };
	        },

	        transition3d : function (value) {
	            var base = this;
	            base.$owlWrapper.css(base.doTranslate(value));
	        },

	        css2move : function (value) {
	            var base = this;
	            base.$owlWrapper.css({"left" : value});
	        },

	        css2slide : function (value, speed) {
	            var base = this;

	            base.isCssFinish = false;
	            base.$owlWrapper.stop(true, true).animate({
	                "left" : value
	            }, {
	                duration : speed || base.options.slideSpeed,
	                complete : function () {
	                    base.isCssFinish = true;
	                }
	            });
	        },

	        checkBrowser : function () {
	            var base = this,
	                translate3D = "translate3d(0px, 0px, 0px)",
	                tempElem = document.createElement("div"),
	                regex,
	                asSupport,
	                support3d,
	                isTouch;

	            tempElem.style.cssText = "  -moz-transform:" + translate3D +
	                                  "; -ms-transform:"     + translate3D +
	                                  "; -o-transform:"      + translate3D +
	                                  "; -webkit-transform:" + translate3D +
	                                  "; transform:"         + translate3D;
	            regex = /translate3d\(0px, 0px, 0px\)/g;
	            asSupport = tempElem.style.cssText.match(regex);
	            support3d = (asSupport !== null && asSupport.length === 1);

	            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

	            base.browser = {
	                "support3d" : support3d,
	                "isTouch" : isTouch
	            };
	        },

	        moveEvents : function () {
	            var base = this;
	            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
	                base.gestures();
	                base.disabledEvents();
	            }
	        },

	        eventTypes : function () {
	            var base = this,
	                types = ["s", "e", "x"];

	            base.ev_types = {};

	            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
	                types = [
	                    "touchstart.owl mousedown.owl",
	                    "touchmove.owl mousemove.owl",
	                    "touchend.owl touchcancel.owl mouseup.owl"
	                ];
	            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
	                types = [
	                    "touchstart.owl",
	                    "touchmove.owl",
	                    "touchend.owl touchcancel.owl"
	                ];
	            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
	                types = [
	                    "mousedown.owl",
	                    "mousemove.owl",
	                    "mouseup.owl"
	                ];
	            }

	            base.ev_types.start = types[0];
	            base.ev_types.move = types[1];
	            base.ev_types.end = types[2];
	        },

	        disabledEvents :  function () {
	            var base = this;
	            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
	            base.$elem.on("mousedown.disableTextSelect", function (e) {
	                return $(e.target).is('input, textarea, select, option');
	            });
	        },

	        gestures : function () {
	            /*jslint unparam: true*/
	            var base = this,
	                locals = {
	                    offsetX : 0,
	                    offsetY : 0,
	                    baseElWidth : 0,
	                    relativePos : 0,
	                    position: null,
	                    minSwipe : null,
	                    maxSwipe: null,
	                    sliding : null,
	                    dargging: null,
	                    targetElement : null
	                };

	            base.isCssFinish = true;

	            function getTouches(event) {
	                if (event.touches !== undefined) {
	                    return {
	                        x : event.touches[0].pageX,
	                        y : event.touches[0].pageY
	                    };
	                }

	                if (event.touches === undefined) {
	                    if (event.pageX !== undefined) {
	                        return {
	                            x : event.pageX,
	                            y : event.pageY
	                        };
	                    }
	                    if (event.pageX === undefined) {
	                        return {
	                            x : event.clientX,
	                            y : event.clientY
	                        };
	                    }
	                }
	            }

	            function swapEvents(type) {
	                if (type === "on") {
	                    $(document).on(base.ev_types.move, dragMove);
	                    $(document).on(base.ev_types.end, dragEnd);
	                } else if (type === "off") {
	                    $(document).off(base.ev_types.move);
	                    $(document).off(base.ev_types.end);
	                }
	            }

	            function dragStart(event) {
	                var ev = event.originalEvent || event || window.event,
	                    position;

	                if (ev.which === 3) {
	                    return false;
	                }
	                if (base.itemsAmount <= base.options.items) {
	                    return;
	                }
	                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
	                    return false;
	                }
	                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
	                    return false;
	                }

	                if (base.options.autoPlay !== false) {
	                    window.clearInterval(base.autoPlayInterval);
	                }

	                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
	                    base.$owlWrapper.addClass("grabbing");
	                }

	                base.newPosX = 0;
	                base.newRelativeX = 0;

	                $(this).css(base.removeTransition());

	                position = $(this).position();
	                locals.relativePos = position.left;

	                locals.offsetX = getTouches(ev).x - position.left;
	                locals.offsetY = getTouches(ev).y - position.top;

	                swapEvents("on");

	                locals.sliding = false;
	                locals.targetElement = ev.target || ev.srcElement;
	            }

	            function dragMove(event) {
	                var ev = event.originalEvent || event || window.event,
	                    minSwipe,
	                    maxSwipe;

	                base.newPosX = getTouches(ev).x - locals.offsetX;
	                base.newPosY = getTouches(ev).y - locals.offsetY;
	                base.newRelativeX = base.newPosX - locals.relativePos;

	                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
	                    locals.dragging = true;
	                    base.options.startDragging.apply(base, [base.$elem]);
	                }

	                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
	                    if (ev.preventDefault !== undefined) {
	                        ev.preventDefault();
	                    } else {
	                        ev.returnValue = false;
	                    }
	                    locals.sliding = true;
	                }

	                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
	                    $(document).off("touchmove.owl");
	                }

	                minSwipe = function () {
	                    return base.newRelativeX / 5;
	                };

	                maxSwipe = function () {
	                    return base.maximumPixels + base.newRelativeX / 5;
	                };

	                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
	                if (base.browser.support3d === true) {
	                    base.transition3d(base.newPosX);
	                } else {
	                    base.css2move(base.newPosX);
	                }
	            }

	            function dragEnd(event) {
	                var ev = event.originalEvent || event || window.event,
	                    newPosition,
	                    handlers,
	                    owlStopEvent;

	                ev.target = ev.target || ev.srcElement;

	                locals.dragging = false;

	                if (base.browser.isTouch !== true) {
	                    base.$owlWrapper.removeClass("grabbing");
	                }

	                if (base.newRelativeX < 0) {
	                    base.dragDirection = base.owl.dragDirection = "left";
	                } else {
	                    base.dragDirection = base.owl.dragDirection = "right";
	                }

	                if (base.newRelativeX !== 0) {
	                    newPosition = base.getNewPosition();
	                    base.goTo(newPosition, false, "drag");
	                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
	                        $(ev.target).on("click.disable", function (ev) {
	                            ev.stopImmediatePropagation();
	                            ev.stopPropagation();
	                            ev.preventDefault();
	                            $(ev.target).off("click.disable");
	                        });
	                        handlers = $._data(ev.target, "events").click;
	                        owlStopEvent = handlers.pop();
	                        handlers.splice(0, 0, owlStopEvent);
	                    }
	                }
	                swapEvents("off");
	            }
	            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
	        },

	        getNewPosition : function () {
	            var base = this,
	                newPosition = base.closestItem();

	            if (newPosition > base.maximumItem) {
	                base.currentItem = base.maximumItem;
	                newPosition  = base.maximumItem;
	            } else if (base.newPosX >= 0) {
	                newPosition = 0;
	                base.currentItem = 0;
	            }
	            return newPosition;
	        },
	        closestItem : function () {
	            var base = this,
	                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
	                goal = base.newPosX,
	                closest = null;

	            $.each(array, function (i, v) {
	                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
	                    closest = v;
	                    if (base.options.scrollPerPage === true) {
	                        base.currentItem = $.inArray(closest, base.positionsInArray);
	                    } else {
	                        base.currentItem = i;
	                    }
	                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
	                    if (base.options.scrollPerPage === true) {
	                        closest = array[i + 1] || array[array.length - 1];
	                        base.currentItem = $.inArray(closest, base.positionsInArray);
	                    } else {
	                        closest = array[i + 1];
	                        base.currentItem = i + 1;
	                    }
	                }
	            });
	            return base.currentItem;
	        },

	        moveDirection : function () {
	            var base = this,
	                direction;
	            if (base.newRelativeX < 0) {
	                direction = "right";
	                base.playDirection = "next";
	            } else {
	                direction = "left";
	                base.playDirection = "prev";
	            }
	            return direction;
	        },

	        customEvents : function () {
	            /*jslint unparam: true*/
	            var base = this;
	            base.$elem.on("owl.next", function () {
	                base.next();
	            });
	            base.$elem.on("owl.prev", function () {
	                base.prev();
	            });
	            base.$elem.on("owl.play", function (event, speed) {
	                base.options.autoPlay = speed;
	                base.play();
	                base.hoverStatus = "play";
	            });
	            base.$elem.on("owl.stop", function () {
	                base.stop();
	                base.hoverStatus = "stop";
	            });
	            base.$elem.on("owl.goTo", function (event, item) {
	                base.goTo(item);
	            });
	            base.$elem.on("owl.jumpTo", function (event, item) {
	                base.jumpTo(item);
	            });
	        },

	        stopOnHover : function () {
	            var base = this;
	            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
	                base.$elem.on("mouseover", function () {
	                    base.stop();
	                });
	                base.$elem.on("mouseout", function () {
	                    if (base.hoverStatus !== "stop") {
	                        base.play();
	                    }
	                });
	            }
	        },

	        lazyLoad : function () {
	            var base = this,
	                i,
	                $item,
	                itemNumber,
	                $lazyImg,
	                follow;

	            if (base.options.lazyLoad === false) {
	                return false;
	            }
	            for (i = 0; i < base.itemsAmount; i += 1) {
	                $item = $(base.$owlItems[i]);

	                if ($item.data("owl-loaded") === "loaded") {
	                    continue;
	                }

	                itemNumber = $item.data("owl-item");
	                $lazyImg = $item.find(".lazyOwl");

	                if (typeof $lazyImg.data("src") !== "string") {
	                    $item.data("owl-loaded", "loaded");
	                    continue;
	                }
	                if ($item.data("owl-loaded") === undefined) {
	                    $lazyImg.hide();
	                    $item.addClass("loading").data("owl-loaded", "checked");
	                }
	                if (base.options.lazyFollow === true) {
	                    follow = itemNumber >= base.currentItem;
	                } else {
	                    follow = true;
	                }
	                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
	                    $lazyImg.each(function() {
	                        base.lazyPreload($item, $(this));
	                    });
	                }
	            }
	        },

	        lazyPreload : function ($item, $lazyImg) {
	            var base = this,
	                iterations = 0,
	                isBackgroundImg;

	            if ($lazyImg.prop("tagName") === "DIV") {
	                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
	                isBackgroundImg = true;
	            } else {
	                $lazyImg[0].src = $lazyImg.data("src");
	            }

	            function showImage() {
	                $item.data("owl-loaded", "loaded").removeClass("loading");
	                $lazyImg.removeAttr("data-src");
	                if (base.options.lazyEffect === "fade") {
	                    $lazyImg.fadeIn(400);
	                } else {
	                    $lazyImg.show();
	                }
	                if (typeof base.options.afterLazyLoad === "function") {
	                    base.options.afterLazyLoad.apply(this, [base.$elem]);
	                }
	            }

	            function checkLazyImage() {
	                iterations += 1;
	                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
	                    showImage();
	                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
	                    window.setTimeout(checkLazyImage, 100);
	                } else {
	                    showImage();
	                }
	            }

	            checkLazyImage();
	        },

	        autoHeight : function () {
	            var base = this,
	                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
	                iterations;

	            function addHeight() {
	                var $currentItem = $(base.$owlItems[base.currentItem]).height();
	                base.wrapperOuter.css("height", $currentItem + "px");
	                if (!base.wrapperOuter.hasClass("autoHeight")) {
	                    window.setTimeout(function () {
	                        base.wrapperOuter.addClass("autoHeight");
	                    }, 0);
	                }
	            }

	            function checkImage() {
	                iterations += 1;
	                if (base.completeImg($currentimg.get(0))) {
	                    addHeight();
	                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
	                    window.setTimeout(checkImage, 100);
	                } else {
	                    base.wrapperOuter.css("height", ""); //Else remove height attribute
	                }
	            }

	            if ($currentimg.get(0) !== undefined) {
	                iterations = 0;
	                checkImage();
	            } else {
	                addHeight();
	            }
	        },

	        completeImg : function (img) {
	            var naturalWidthType;

	            if (!img.complete) {
	                return false;
	            }
	            naturalWidthType = typeof img.naturalWidth;
	            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
	                return false;
	            }
	            return true;
	        },

	        onVisibleItems : function () {
	            var base = this,
	                i;

	            if (base.options.addClassActive === true) {
	                base.$owlItems.removeClass("active");
	            }
	            base.visibleItems = [];
	            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
	                base.visibleItems.push(i);

	                if (base.options.addClassActive === true) {
	                    $(base.$owlItems[i]).addClass("active");
	                }
	            }
	            base.owl.visibleItems = base.visibleItems;
	        },

	        transitionTypes : function (className) {
	            var base = this;
	            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
	            base.outClass = "owl-" + className + "-out";
	            base.inClass = "owl-" + className + "-in";
	        },

	        singleItemTransition : function () {
	            var base = this,
	                outClass = base.outClass,
	                inClass = base.inClass,
	                $currentItem = base.$owlItems.eq(base.currentItem),
	                $prevItem = base.$owlItems.eq(base.prevItem),
	                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
	                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
	                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

	            base.isTransition = true;

	            base.$owlWrapper
	                .addClass('owl-origin')
	                .css({
	                    "-webkit-transform-origin" : origin + "px",
	                    "-moz-perspective-origin" : origin + "px",
	                    "perspective-origin" : origin + "px"
	                });
	            function transStyles(prevPos) {
	                return {
	                    "position" : "relative",
	                    "left" : prevPos + "px"
	                };
	            }

	            $prevItem
	                .css(transStyles(prevPos, 10))
	                .addClass(outClass)
	                .on(animEnd, function () {
	                    base.endPrev = true;
	                    $prevItem.off(animEnd);
	                    base.clearTransStyle($prevItem, outClass);
	                });

	            $currentItem
	                .addClass(inClass)
	                .on(animEnd, function () {
	                    base.endCurrent = true;
	                    $currentItem.off(animEnd);
	                    base.clearTransStyle($currentItem, inClass);
	                });
	        },

	        clearTransStyle : function (item, classToRemove) {
	            var base = this;
	            item.css({
	                "position" : "",
	                "left" : ""
	            }).removeClass(classToRemove);

	            if (base.endPrev && base.endCurrent) {
	                base.$owlWrapper.removeClass('owl-origin');
	                base.endPrev = false;
	                base.endCurrent = false;
	                base.isTransition = false;
	            }
	        },

	        owlStatus : function () {
	            var base = this;
	            base.owl = {
	                "userOptions"   : base.userOptions,
	                "baseElement"   : base.$elem,
	                "userItems"     : base.$userItems,
	                "owlItems"      : base.$owlItems,
	                "currentItem"   : base.currentItem,
	                "prevItem"      : base.prevItem,
	                "visibleItems"  : base.visibleItems,
	                "isTouch"       : base.browser.isTouch,
	                "browser"       : base.browser,
	                "dragDirection" : base.dragDirection
	            };
	        },

	        clearEvents : function () {
	            var base = this;
	            base.$elem.off(".owl owl mousedown.disableTextSelect");
	            $(document).off(".owl owl");
	            $(window).off("resize", base.resizer);
	        },

	        unWrap : function () {
	            var base = this;
	            if (base.$elem.children().length !== 0) {
	                base.$owlWrapper.unwrap();
	                base.$userItems.unwrap().unwrap();
	                if (base.owlControls) {
	                    base.owlControls.remove();
	                }
	            }
	            base.clearEvents();
	            base.$elem.attr({
	                style: base.$elem.data("owl-originalStyles") || "",
	                'class': base.$elem.data("owl-originalClasses")
	            });
	        },

	        destroy : function () {
	            var base = this;
	            base.stop();
	            window.clearInterval(base.checkVisible);
	            base.unWrap();
	            base.$elem.removeData();
	        },

	        reinit : function (newOptions) {
	            var base = this,
	                options = $.extend({}, base.userOptions, newOptions);
	            base.unWrap();
	            base.init(options, base.$elem);
	        },

	        addItem : function (htmlString, targetPosition) {
	            var base = this,
	                position;

	            if (!htmlString) {return false; }

	            if (base.$elem.children().length === 0) {
	                base.$elem.append(htmlString);
	                base.setVars();
	                return false;
	            }
	            base.unWrap();
	            if (targetPosition === undefined || targetPosition === -1) {
	                position = -1;
	            } else {
	                position = targetPosition;
	            }
	            if (position >= base.$userItems.length || position === -1) {
	                base.$userItems.eq(-1).after(htmlString);
	            } else {
	                base.$userItems.eq(position).before(htmlString);
	            }

	            base.setVars();
	        },

	        removeItem : function (targetPosition) {
	            var base = this,
	                position;

	            if (base.$elem.children().length === 0) {
	                return false;
	            }
	            if (targetPosition === undefined || targetPosition === -1) {
	                position = -1;
	            } else {
	                position = targetPosition;
	            }

	            base.unWrap();
	            base.$userItems.eq(position).remove();
	            base.setVars();
	        }

	    };

	    $.fn.owlCarousel = function (options) {
	        return this.each(function () {
	            if ($(this).data("owl-init") === true) {
	                return false;
	            }
	            $(this).data("owl-init", true);
	            var carousel = Object.create(Carousel);
	            carousel.init(options, this);
	            $.data(this, "owlCarousel", carousel);
	        });
	    };

	    $.fn.owlCarousel.options = {

	        items : 5,
	        itemsCustom : false,
	        itemsDesktop : [1199, 4],
	        itemsDesktopSmall : [979, 3],
	        itemsTablet : [768, 2],
	        itemsTabletSmall : false,
	        itemsMobile : [479, 1],
	        singleItem : false,
	        itemsScaleUp : false,

	        slideSpeed : 200,
	        paginationSpeed : 800,
	        rewindSpeed : 1000,

	        autoPlay : false,
	        stopOnHover : false,

	        navigation : false,
	        navigationText : ["prev", "next"],
	        rewindNav : true,
	        scrollPerPage : false,

	        pagination : true,
	        paginationNumbers : false,

	        responsive : true,
	        responsiveRefreshRate : 200,
	        responsiveBaseWidth : window,

	        baseClass : "owl-carousel",
	        theme : "owl-theme",

	        lazyLoad : false,
	        lazyFollow : true,
	        lazyEffect : "fade",

	        autoHeight : false,

	        jsonPath : false,
	        jsonSuccess : false,

	        dragBeforeAnimFinish : true,
	        mouseDrag : true,
	        touchDrag : true,

	        addClassActive : false,
	        transitionStyle : false,

	        beforeUpdate : false,
	        afterUpdate : false,
	        beforeInit : false,
	        afterInit : false,
	        beforeMove : false,
	        afterMove : false,
	        afterAction : false,
	        startDragging : false,
	        afterLazyLoad: false
	    };
	}(jQuery, window, document));


/***/ }),

/***/ 98:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

/******/ });