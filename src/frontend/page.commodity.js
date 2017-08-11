/**
 * Created by hc360 on 2017/5/24.
 */

require('jquery');
require('jquery.placeholder');
require('OwlCarousel');

require('../../src/components/OwlCarousel/owl.carousel.css');

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

(function() {

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
            _this.toFindContact();

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

        },

        /**
         * 异步加载右侧工具条方法
         */
        loadRightToolbar: function() {

            if (typeof scyps !== undefined) {
                if (scyps.sc.is3y === "0") {
                    var qqsrc = "http://style.org.hc360.cn/js/module/detail/companyService/hc.righToolbar.min.js";
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
                HC.HUB.addScript('http://style.org.hc360.cn/js/build/source/widgets/flowconfig/hc.flowconfig.min.js', function() {
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
                pageTwo_valiImg.attr("src", "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
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
                    pageTwo_valiImg.attr("src", "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
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
                            url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",
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
                    url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
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
                    url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",
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
         * 查看联系方式
         */
        toFindContact: function() {

            var _this = this,
                $contactBox = $("#corMessageDialog"),
                $sendMsgBox = $("#dialogSendMessage"),
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

                if (!1) {
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
                            $("#validate_img1").attr("src", "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());


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
                                $("#validate_img1").attr("src", "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
                            });


                            cleanInquiryParam();

                            //校验图片验证码输入框的值
                            function imgValiInput() {
                                jQuery.ajax({
                                    type: "GET",
                                    url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
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
                                    url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",
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
                                    url: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",
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
                                html = html + "<li><dl>" + "<dt class='item-similar-img'><a href='http://b2b.hc360.com/supplyself/" + obj[0] + ".html' title='" + obj[1] + "' target='_blank' onclick='return hcclick(\"?hcdetail_enterpriselog=supplyself_viewpics_history\")'><img src='" + obj[2] + "' alt='" + obj[1] + "' onload='resizeImg(this,140,140)' onerror='imgonerror(this);' ></a></dt>" + "<dd class='item-similar-txt'><a href='http://b2b.hc360.com/supplyself/" + obj[0] + ".html' title='" + obj[1] + "' target='_blank' onclick='return hcclick(\"?hcdetail_enterpriselog=supplyself_viewpics_history\")'>" + obj[1] + "</a></dd>" + "<dd class='item-similar-price'>" + obj[3] + "</dd>";
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
                url: 'http://detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doProdbysupply/doProdbysupply',
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
            }).fail(function () {
                $('#contactIcon').append('<a class="rigZX" id="cicon" rel="nofollow" href="javascript:;" onclick="'+ nobindClick +'"></a>')
            })
            
        },

        /**
         * 是否与微信绑定
         * @returns {*}
         */
        bindStateAjax: function () {

            return $.ajax({
                url: 'http://madata.hc360.com/mobileweb/m/get/bindstatus',
                data: {"imid":window.company_username||window.welfarename},
                timeout: 3000,
                dataType: "jsonp"
            })
        }

    };

    $(function() {

        new Commodity().init();

        //点击发送到我的手机加载contact_msgDownload这个js
        HC.HUB.addScript('http://style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js'); //发送手机功能js

    })
})();
