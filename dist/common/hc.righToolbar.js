webpackJsonp([31],{

/***/ 148:
/***/ (function(module, exports) {

	/**
	 * 全网统一右侧工具条
	 * Created by 姜艳云 on 2016/10/26.
	 */

	/**
	 * 加载cookie
	 */
	if (typeof $.cookie != "function") {
	    $.getScript('//style.org.hc360.cn/js/build/source/widgets/jquery.cookie.js');
	}
	/**
	 * 定义默认参数
	 * @type {{pageType: string, id: string}}
	 * @private
	 */
	var _defaultParam = {
	    pageType: "supplydetailself",
	    id: ""
	};
	/**
	 * 定义右侧工具条
	 */
	var rightSidebar = {
	        init: function(param) {
	            var that = this;
	            /***
	             * 是否是3亿，如果是1表示是三亿，0表示不是三亿
	             */
	            that.is3y = param.is3y == 1 ? true : false;
	            /**
	             * 合并param参数
	             */
	            that.option = $.extend({}, _defaultParam, param);

	            var flag;
	            $.when($.ajax({
	                    url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
	                    dataType:"jsonp",
	                    data:{"imid":window.company_username||window.welfarename || window.userName }
	                })
	            ).done(function (res) {
	                flag=res.code=="200";
	                flag ? initHtml("//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/wxIco.gif","微信","//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_3.gif"):initHtml();
	            }).fail(function () {
	                initHtml();
	            });

	            function initHtml(imgSrc,wText,msgImgSrc) {

	                /**
	                 * 初始化页面Dom元素
	                 */
	                that.createSidebarHtml(imgSrc,wText,msgImgSrc);
	                /**
	                 * 初始化返回顶部是否显示
	                 */
	                that.gotoTopFn($("#gotoTop").offset().top);
	                /**
	                 * 初始化qq列表
	                 */
	                that.initQQToll();
	                /**
	                 * 绑定操作事件
	                 */
	                that.bindEvent();

	                //绑定状态下5秒钟之后提示卖家微信在线
	                if(imgSrc && wText && msgImgSrc){
	                    setTimeout(function () {
	                        $("[node-id='weix']").append('<a class="wxAlert">卖家微信在线</a>');
	                    },5000);
	                }
	            }
	        },
	        /***
	         * 创建右侧工具条html
	         */
	        createSidebarHtml: function(imgSrc,wText,msgImgSrc) {

	            if(!imgSrc && !wText && !msgImgSrc){
	                imgSrc = "//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_1.gif";
	                wText = "在线咨询";
	                msgImgSrc = "//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_2.gif";
	            }

	            /**
	             *  webtrends监测点[在线咨询]
	             */
	            var consultWbt = 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_online_chat\')"',
	                /**
	                 * webtrends监测点[一键开店]
	                 */
	                openShopWbt = 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_open_shop\')"',
	                /**
	                 * webtrends监测点[返回顶部]
	                 * @type {string}
	                 */
	                backtopWbt = 'onmousedown="return hcclick(\'?hcdetail_supply=supplyself_backtop\')"',
	                /**
	                 *  congos监测点[在线咨询]
	                 * @type {string}
	                 */
	                consultStr = 'onclick="HC.UBA.sendUserlogsElement(\'' + this.getUserLog("consult") + '\')"',
	                /**
	                 * congos监测点[立即留言]
	                 * @type {string}
	                 */
	                messageStr = 'onclick="HC.UBA.sendUserlogsElement(\'' + this.getLog("message") + '\')"',
	                /**
	                 * 右侧工具条包裹元素
	                 */
	                rightBox = $('<div>', {
	                    'class': 'fix-right-box'
	                }).appendTo("body"),
	                /***
	                 *  在线咨询 qq 立即留言  包裹元素
	                 */
	                rightTop = $('<div>', {
	                    'class': 'fix-right'
	                }).appendTo(rightBox),
	                /***
	                 *  返回顶部 包裹元素
	                 */
	                rightBottom = $('<div>', {
	                    'class': 'fix-right'
	                }).appendTo(rightBox).hide();
	            /**
	             *  在线咨询HTML
	             * @type {string[]}
	             */
	            var consult = [
	                '<div class="every weix" node-id="weix">',
	                '<a href="javascript:;"' + consultStr + 'class="every-a"' + consultWbt + ' id="OnlineBtn">',
	                '<img class="icon" src="'+ imgSrc +'" height="37" width="43" alt="">',
	                '<span>'+ wText +'</span>',
	                '</a>',
	                '</div>'
	            ];
	            /**
	             * 立即留言HTML
	             * @type {string[]}
	             */
	            var message = [
	                '<div class="every">',
	                '<a href="javascript:;" class="every-a"' + messageStr + ' id="proMessage">',
	                '<img class="icon" src="'+ msgImgSrc +'" height="37" width="43" alt="">',
	                '<span class="border-none">立即留言</span>',
	                '</a>',
	                '</div>'
	            ];

	            /**
	             * 返回顶部HTML
	             * @type {string[]}
	             */
	            var returnTop = [
	                '<div class="every top"  id="gotoTop" style="display: none">',
	                '<a href="#"' + backtopWbt + ' class="every-a">',
	                '<img class="icon" src="//style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/p-top.png" height="37" width="43" alt="">',
	                '<span class="border-none">返回顶部</span>',
	                '</a>',
	                '</div>'
	            ];
	            /***
	             * 一键开店HTML
	             * @type {string[]}
	             */
	            var fixRightTwo = [
	                '<div class="R-top">',
	                '<a href="http://my.b2b.hc360.com/my/turbine/template/firstview,reg_first.html?sourcetypeid=3731"' + openShopWbt + ' target="_blank"><img class="icon" src="//style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/R-top.png" alt="" height="64" width="73"></a>',
	                '</div>'
	            ];
	            /***
	             * 初始化在线咨询,立即留言,返回顶部
	             */
	            rightTop.append(consult.join('')).append(message.join(''));
	            rightBottom.append(returnTop.join(''));
	            /***
	             * 一键开店按钮，在未登录状态下显示，点击链接不变；已登录状态下  不显示一键开店按钮。
	             */
	            if (typeof $.cookie == 'function') {
	                if (!$.cookie('LoginID') && !$.cookie("HC360.SSOUser")) {
	                    $('.fix-right-box').prepend(fixRightTwo.join(''));
	                }
	            }
	        },
	        /**
	         * 绑定右侧工具条操作事件
	         */
	        bindEvent: function() {
	            var that = this;
	            HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

	              $('#OnlineBtn').queryDialog({
	                is3y:window.scyps.sc.is3y=="1" ? true : false,
	                companyName:window.infoname || '',
	                providerId:window.scyps.sc.providerId
	              });

	            });
	            /***
	             * 点击在线咨询,弹出咨询弹层并且执行页面上的方法 （页面方法执行是刘淑珍和刘洪涛的需求 ）
	             */
	            /*$('body').on('click','#OnlineBtn,#contactChat',function() {
	            // $('#OnlineBtn').parent().click(function() {

	                var $this = $(this);

	                //防止重复提交
	                if($this.attr('isopen')){
	                    return false;
	                }

	                $this.attr('isopen',true);


	                that.onlineConsult(function () {
	                    $this.removeAttr('isopen');
	                });

	                // $.when(getChatCodeInfo()).done(function (res) {
	                //     if(res && res.senceid){
	                //         that.onlineConsult(res.senceid,res.weChatPic);
	                //     }else{
	                //         that.onlineConsult('','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png');
	                //     }
	                //     $this.removeAttr('isopen');
	                // }).fail(function () {
	                //     that.onlineConsult('','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png');
	                //     $this.removeAttr('isopen');
	                // });

	                //that.onlineConsult();

	            });*/


	            /**点击立即留言,弹出立即留言弹层  执行页面上的方法（页面方法执行是刘淑珍和刘洪涛的需求 ）*/
	            $('#proMessage').click(function() {
	                that.messageDialog();
	            });

	            /**
	             * 滚动的时候初始化返回顶部
	             */
	            $(window).scroll(function() {
	                that.gotoTopFn($(this).scrollTop());
	            });
	            /***
	             * 显示qq列表
	             */
	            $("body").on('mouseenter', '.every.qq', function() {
	                $('.qq-tk').show();
	                clearInterval(that.timer);
	            }).on('mouseleave', '.every.qq', function() {
	                that.timer = setTimeout(function() {
	                    $('.qq-tk').hide();
	                }, 50);
	            });

	            if (that.is3y) {
	                $("body").on("click", ".every.qq", function(evt) {
	                    $('[data-query="qqTalk"]').show();
	                    $(".b-blue").trigger("click");
	                    evt.preventDefault();
	                });
	            }
	        },
	        /***
	         * 在线咨询
	         */
	        onlineConsult: function(callback) {
	            var that = this,
	                downWrap = $('.dAlertBoxBg'),
	                sceneid='',
	                codeUrl='//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png',
	                deffer=$.Deferred();
	            /***
	             * 获取二维码图片地址
	             */
	            $.ajax({
	                url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
	                type:"GET",
	                dataType:"jsonp",
	                jsonpCallback:'callback'
	            }).done(function (res) {
	                if(res && res.senceid){
	                    sceneid=res.senceid;
	                    codeUrl=res.weChatPic;
	                }
	                deffer.resolve();
	            }).fail(function () {
	                deffer.resolve();
	            });

	            /****
	             * 延迟对象解决
	             */
	            $.when(deffer).done(function () {
	                /***
	                 * 显示遮罩
	                 * @type {*|HTMLElement}
	                 */
	                if (downWrap.length == 0) {
	                    downWrap = $('<div>', {
	                        'class': 'dAlertBoxBg consultBg'
	                    }).appendTo("body").show();
	                } else {
	                    downWrap.show();
	                }
	                /***
	                 * 禁止页面滚动
	                 */
	                $('html').css('overflow-y', 'hidden');
	                that.consultWrap = $("<div>", {
	                    "class": "Consultation",
	                    "data-startTime":that.getDateTime(true)
	                }).appendTo("body").show();

	                //渲染弹框固定页面
	                var fixStr = [
	                    '<div class="mTitle">',
	                    '<div class="mTitLeft">',
	                    '<em></em>',
	                    '<span>小慧</span>',
	                    '<span class="borLeft">'+ that.companyName +'</span>',
	                    '</div>',
	                    '<span class="mCloseBtn" ele-type="closeWindow" data-picUrl="'+ codeUrl +'">关闭</span>',
	                    '</div>',

	                    '<div class="ConsulCon">',
	                    '<div class="ConsulBox">',

	                    '<div class="clTop" id="cInnerBox">',

	                    '</div>',

	                    '<div class="clBot">',
	                    '<div class="clBotText">',
	                    '<textarea name="" placeholder="请在此直接输入您要采购的产品及其他需求" data-node-name="area"></textarea>',
	                    '<p class="textareaLen" data-node-name="maxLen">还可以输入150字</p>',
	                    '<p class="ProhibitedTxt" data-promptInfo><strong></strong>内容含有违禁词</p>',
	                    '</div>',
	                    '</div>',

	                    '<div class="clBotInput">',

	                    '<div id="mobilephoneCon">',
	                    '<span><em>*</em>您的手机号</span>',
	                    '<div class="bInputBox">',
	                    '<input type="text" style="color:#999999;" value="请输入手机号码" name="MP" data-node-name="MP"/>' +
	                    '<em class="c-red warning isNull" data-promptInfo><strong></strong>手机号不能为空</em>',
	                    '<em class="c-red warning isError" data-promptInfo><strong></strong>请填写正确的手机号</em>',
	                    '</div>',
	                    '</div>',


	                    '<div id="validcodeCon" style="display: none">',
	                    '<span><em>*</em>验证码</span>',
	                    '<div class="clCode">',
	                    '<input type="text" class="w210" style="color:#999999;" value="请输入验证码" data-node-name="validCodeInput">',
	                    '<em class="c-red warning isNull" data-promptInfo><strong></strong>验证码不为空</em>',
	                    '<em class="c-red warning isError" data-promptInfo><strong></strong>验证码错误</em>',
	                    '<span class="clCodeImg">',
	                    '<img src="//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date().getTime() +'">' +
	                    '</span>',
	                    '</div>',
	                    '</div>',

	                    '<button type="submit" data-node-name="subtn" data-sceneid="'+ sceneid+'">发送</button>',
	                    '</div>',

	                    '</div>',
	                    '</div>'
	                ];
	                $('.Consultation').append(fixStr.join(''));

	                //获取聊天记录
	                that.getHistoryMsg(function () {
	                    /**
	                     * 聊天窗口只要一打开，有无聊天记录都在后面添加一句问候语
	                     * @type {[*]}
	                     */
	                    var hiMsg = [
	                        '<div class="clBoxLeft">',
	                        '<em class="clImg"></em>',
	                        '<div class="clImgRig">',
	                        '<p class="clTime">店经理  '+that.getDateTime(true)+'</p>',
	                        '<div class="ConsulList">',
	                        '<em></em>',
	                        '<p>你好，欢迎光临'+that.companyName+'，请发送您要咨询的内容。</p>',
	                        '</div>',
	                        '</div>',
	                        '</div>'
	                    ];
	                    $("#cInnerBox").append(hiMsg.join('')).scrollTop( $('#cInnerBox')[0].scrollHeight );
	                });

	                /**
	                 * 每隔10s请求获取聊天记录接口
	                 * @type {number}
	                 */
	                that.option.interval = setInterval(function () {
	                    that.loopGetMsgPer10s();
	                },10000);

	                that.onlineFormValidation();
	                $('[ele-type="closeWindow"]').click(function() { //在线咨询弹框
	                    var codeUrl = $(this).attr('data-picUrl');
	                    $('.Consultation').remove();
	                    $('html').css('overflow-y', 'auto'); //取消禁止页面滚动
	                    $('.dAlertBoxBg.consultBg').hide();

	                    /**
	                     * 在线咨询弹窗关闭时，请求获取聊天记录停止
	                     */
	                    if(that.option.interval){
	                        clearInterval(that.option.interval);
	                    }

	                    //友情提示弹框出现
	                    if($("#friendlyTip").length>0){
	                        $("#friendlyTip,.consultBg").show();
	                    }else{
	                        var friendlyDialog = [
	                            '<div class="dAlertBoxBg consultBg" style=" display:block;"></div>',
	                            '<div class="Consultation" id="friendlyTip">',
	                            '<a class="clCloseBtn"></a>',
	                            '<h3>温馨提示</h3>',
	                            '<div class="ConsulRig">',
	                            '<dl>',
	                            '<dt><img src="'+ codeUrl  +'"></dt>',
	                            '<dd>微信扫描上方二维码，手机随时随地接收卖家回复</dd>',
	                            '</dl>',
	                            '</div>',
	                            '</div>'
	                        ];
	                        $(friendlyDialog.join('')).appendTo('body');
	                    }

	                });

	                //友情提示弹框关闭事件
	                $("body").on('click','#friendlyTip a.clCloseBtn',function () {
	                    $('#friendlyTip').siblings('.consultBg:visible').remove();
	                    $('#friendlyTip').remove();
	                });

	                //查看更多历史记录
	                $("#cInnerBox").on('click','p.moreList',function () {

	                    var $this = $(this);
	                    var minMsgId = $(this).next('div').attr('data-id') || $(this).next('div.moreHistory').children(':first').attr('data-id');//最早的消息id

	                    $.ajax({
	                        url:"//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",
	                        type:"GET",
	                        timeout:3000,
	                        data:{
	                            isLogon : $.cookie('LoginID') ? "1":"0",
	                            buyid: $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',
	                            spid:that.option.providerId,
	                            minid:minMsgId
	                        },
	                        dataType:"jsonp",
	                        jsonpCallback:'callback',
	                        success:function (res) {
	                            if(res && res.length > 0) {
	                                $this.after('<div class="moreHistory"></div>');
	                                var msgList = res;
	                                for (var i = 0; i < msgList.length; i++) {
	                                    if (msgList[i].infokind == "0") {//买家信息在右边

	                                        var buyerMsg = [
	                                            '<div class="clBoxRig" data-id="' + msgList[i].id + '">',
	                                            '<em class="clImg"></em>',
	                                            '<div class="clImgRig">',
	                                            '<p class="clTime">我  ' + msgList[i].createtime + '</p>',
	                                            '<div class="ConsulList">',
	                                            '<em></em>',
	                                            '<p>' + msgList[i].purchaseinfo + '</p>',
	                                            '</div>',
	                                            '</div>',
	                                            '</div>'
	                                        ];
	                                        $('.moreHistory:eq(0)').append(buyerMsg.join(''));

	                                    } else if (msgList[i].infokind == "1") {//卖家信息在左边

	                                        var sellerMsg = [
	                                            '<div class="clBoxLeft" data-id="' + msgList[i].id + '">',
	                                            '<em class="clImg"></em>',
	                                            '<div class="clImgRig">',
	                                            '<p class="clTime">店经理  ' + msgList[i].createtime + '</p>',
	                                            '<div class="ConsulList">',
	                                            '<em></em>',
	                                            '<p>' + msgList[i].purchaseinfo + '</p>',
	                                            '</div>',
	                                            '</div>',
	                                            '</div>'
	                                        ];
	                                        $('.moreHistory:eq(0)').append(sellerMsg.join(''));
	                                    }

	                                    //不满足一页数据，默认没有更多数据了，此时隐藏查看更多按钮
	                                    if (res.length < 15) {
	                                        $this.remove();
	                                    }
	                                }
	                            }
	                        },
	                        error:function () {
	                            alert('网络异常，请稍后重试！');
	                        }

	                    });


	                });

	                //验证码点击图片换一换
	                $('[data-starttime]').on('click','.clCodeImg',function () {
	                    var $this = $(this);
	                    $(this).find('img').attr('src','//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date().getTime());
	                });


	                callback&&callback();
	            });
	        },


	        /**
	         * 请求获取在线咨询的聊天内容接口
	         */
	        getMsgContent:function () {
	            var _this = this;
	            return $.ajax({
	                url:'//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg',
	                type:'GET',
	                timeout:3000,
	                data:{
	                    buyid:$.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
	                    isLogon: $.cookie('LoginID') ? "1":"0",
	                    spid:_this.option.providerId
	                },
	                dataType:"jsonp",
	                jsonpCallback:'callback'
	            });
	        },

	        /**
	         * 计算两个时间之差
	         * @param startDate
	         * @param endDate
	         */
	        getDateDifference:function (startDate,endDate) {
	            if(startDate>endDate) {
	                console.log("开始时间不能大于结束时间！");
	                return false;
	            }

	            //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
	            var begin1=startDate.substr(0,10).split("-");
	            var end1=endDate.substr(0,10).split("-");

	            //将拆分的数组重新组合，并实例成化新的日期对象
	            var date1=new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
	            var date2=new Date(end1[1] + - + end1[2] + - + end1[0]);

	            //得到两个日期之间的差值m，以分钟为单位
	            var m=parseInt(Math.abs(date2-date1)/1000/60);

	            //小时数和分钟数相加得到总的分钟数
	            var min1=parseInt(startDate.substr(11,2))*60+parseInt(startDate.substr(14,2));
	            var min2=parseInt(endDate.substr(11,2))*60+parseInt(endDate.substr(14,2));

	            //两个分钟数相减得到时间部分的差值，以分钟为单位
	            var n=min2-min1;

	            //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
	            var minutes=m+n;
	            return minutes;
	        },

	        /**
	         * 根据场景id获取二维码
	         * @param sceneid
	         * @returns {*}
	         */
	        getCodeUrlBySceneid:function (sceneid) {

	            return $.ajax({
	                url:'//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dochatingpicid/doChatingpicid',
	                type:'GET',
	                data:{
	                    senceid:sceneid
	                },
	                dataType:"jsonp",
	                jsonpCallback:'callback'
	            })
	         },

	        /**
	         *
	         * @param callback
	         */
	        getHistoryMsg:function (callback) {
	            var _this = this;
	            $.when(_this.getMsgContent()).done(function (res) {

	                if(res && res.length > 0){
	                    var msgList = res,
	                        sceneid = msgList[0].qrcodeid;//该场景id如果有，表示以前有聊天记录，不需新生成场景id

	                    //将旧的场景id替换新生成的场景id
	                    $('button[data-node-name="subtn"]').attr('data-sceneid',sceneid);

	                    for(var i=0;i<msgList.length;i++){
	                        if(msgList[i].infokind == "0"){//买家信息在右边

	                            var buyerMsg = [
	                                '<div class="clBoxRig" data-id="'+ msgList[i].id +'">',
	                                '<em class="clImg"></em>',
	                                '<div class="clImgRig">',
	                                '<p class="clTime">我  <span>'+ msgList[i].createtime+'</span></p>',
	                                '<div class="ConsulList">',
	                                '<em></em>',
	                                '<p>'+ msgList[i].purchaseinfo || '' +'</p>',
	                                '</div>',
	                                '</div>',
	                                '</div>'
	                            ];
	                            $("#cInnerBox").append(buyerMsg.join(''));

	                        }else if(msgList[i].infokind == "1"){//卖家信息在左边

	                            var sellerMsg = [
	                                '<div class="clBoxLeft" data-id="'+ msgList[i].id +'">',
	                                '<em class="clImg"></em>',
	                                '<div class="clImgRig">',
	                                '<p class="clTime">店经理  <span>'+ msgList[i].createtime+'</span></p>',
	                                '<div class="ConsulList">',
	                                '<em></em>',
	                                '<p>'+ msgList[i].purchaseinfo || '' +'</p>',
	                                '</div>',
	                                '</div>',
	                                '</div>'
	                            ];
	                            $("#cInnerBox").append(sellerMsg.join(''));
	                        }
	                    }

	                    if(res.length == 15){//只有满足一页的临界值时，显示查看更多按钮,小于一页临界值时默认没有更多数据了

	                        $("#cInnerBox").prepend('<p class="moreList"><a href="javascript:;">点击查看更多</a></p>');
	                    }

	                    //用旧的场景id获取旧的二维码
	                    var codeUrlDom = $('span[ele-type="closeWindow"]');
	                    $.when(_this.getCodeUrlBySceneid(sceneid)).done(function (res) {
	                        codeUrlDom.attr('data-picurl',res.weChatPic);
	                    }).fail(function () {
	                        //获取失败时，还用默认的二维码
	                        codeUrlDom.attr('data-picurl','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png');
	                    })
	                }

	                /**
	                 * 使聊天记录窗口滚动条滚到最底部
	                 */
	                $('#cInnerBox').scrollTop( $('#cInnerBox')[0].scrollHeight );

	                if(callback){
	                    callback();
	                }

	            }).fail(function () {
	                console.log('Failed to obtain data,Please try again later!');
	            });
	        },

	        /**
	         * 每隔10s中请求获取在线咨询的聊天内容
	         */
	        loopGetMsgPer10s:function () {

	            var _this = this;
	            $.ajax({
	                url:'//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGetpollintervalmsg/doGetpollintervalmsg',
	                type:'GET',
	                timeout:5000,
	                data:{
	                    buyid:$.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
	                    isLogon: $.cookie('LoginID') ? "1":"0",
	                    spid:_this.option.providerId,
	                    maxBpID:$('#cInnerBox').children(".clBoxRig:last").attr('data-id') || '',
	                    maxSpID:$('#cInnerBox').children(".clBoxLeft[data-id]:last").attr('data-id') || ''
	                    // msgID:$('#cInnerBox').children(".clBoxLeft[data-id]:last").attr('data-id')//最新的一条消息id
	                },
	                dataType:"jsonp",
	                jsonpCallback:'callback',
	                success:function (res) {

	                    //为了防止页面恰好轮询，此时关闭了聊天窗口，再进行以下逻辑js报错
	                    if($("#cInnerBox").length == 0){
	                        return false;
	                    }

	                    if(res && res.length > 0){
	                        var msgList = res;
	                        for(var i=0;i<msgList.length;i++){
	                            if(msgList[i].infokind == "0"){//买家信息在右边

	                                var buyerMsg = [
	                                    '<div class="clBoxRig" data-id="'+ msgList[i].id +'">',
	                                    '<em class="clImg"></em>',
	                                    '<div class="clImgRig">',
	                                    '<p class="clTime">我  <span>'+ msgList[i].createtime+'</span></p>',
	                                    '<div class="ConsulList">',
	                                    '<em></em>',
	                                    '<p>'+ msgList[i].purchaseinfo || '' +'</p>',
	                                    '</div>',
	                                    '</div>',
	                                    '</div>'
	                                ];
	                                $("#cInnerBox").append(buyerMsg.join(''));

	                            }else if(msgList[i].infokind == "1"){//卖家信息在左边

	                                var sellerMsg = [
	                                    '<div class="clBoxLeft" data-id="'+ msgList[i].id +'">',
	                                    '<em class="clImg"></em>',
	                                    '<div class="clImgRig">',
	                                    '<p class="clTime">店经理  <span>'+ msgList[i].createtime+'</span></p>',
	                                    '<div class="ConsulList">',
	                                    '<em></em>',
	                                    '<p>'+ msgList[i].purchaseinfo || '' +'</p>',
	                                    '</div>',
	                                    '</div>',
	                                    '</div>'
	                                ];
	                                $("#cInnerBox").append(sellerMsg.join(''));
	                            }

	                            if(i == msgList.length - 1){//有轮询数据返回时，轮询的最后一条数据时间为基准点
	                                _this.lastMsgTime = msgList[i].createtime;
	                            }

	                        }

	                        /**
	                         * 使聊天记录窗口滚动条滚到最底部
	                         */
	                        $('#cInnerBox').scrollTop( $('#cInnerBox')[0].scrollHeight );

	                    }else{//无轮询数据返回时，则默认最新的数据时间为基准点

	                        _this.lastMsgTime = $('#cInnerBox').children("[data-id]:last").find('p.clTime span').text();

	                    }

	                    /**
	                     * 比较打开窗口时间和聊天最新记录时间最大的作为弹窗关闭基准点时间
	                     */
	                    var startDialogTime = $('.Consultation:visible').attr('data-starttime');//聊天窗口打开时间
	                    var timeLevel = compareToGetMaxDate(startDialogTime,_this.lastMsgTime);//获取基准点时间
	                    var currentDate = _this.getDateTime(true);//当前时间

	                    //获取当前时间和基准点时间之差
	                    var timeDiff = _this.getDateDifference(timeLevel,currentDate);

	                    //如果时间差超过30分钟，则关闭该聊天窗口给予友情提示
	                    if(timeDiff >= 30){

	                        $('[ele-type="closeWindow"]').trigger("click");

	                    }


	                },
	                error:function () {
	                    alert('网络异常，请稍后重试！');
	                }
	            });


	            function compareToGetMaxDate(t1,t2){
	                if(!t2){
	                    return t1;
	                }
	                var date1 = Date.parse(new Date(t1.replace(/-/g,'/')));
	                var date2 = Date.parse(new Date(t2.replace(/-/g,'/')));
	                if(date1 - date2 > 0){
	                    return t1;
	                }else{
	                    return t2;
	                }
	            }
	        },

	        /***
	         * 在线咨询的表单验证
	         */
	        onlineFormValidation: function() {
	            var that = this,
	                focusColor = '#333333',
	                blurColor = '#a2a2a2';
	            /***
	             * 错误提示，提示消失，输入框获得焦点
	             */
	            that.consultWrap.find('[data-promptInfo]').on('click', function() {
	                $(this).closest('div').find('[data-node-name]').focus();
	            });
	            /***
	             * 定义表单验证对象
	             * @type {{MP: {selector: string, defaultValue: string, reg: RegExp, notInput: RegExp, maxLen: number}, contentArea: {selector: string, defaultValue: string, notInput: RegExp, maxLen: number}}}
	             */
	            that.elements = {
	                MP: { //手机号码
	                    selector: 'input[data-node-name="MP"]',
	                    defaultValue: '请输入手机号码',
	                    reg: /^1\d{10}$/,
	                    notInput: /\D+/g,
	                    maxLen: 11
	                },
	                contentArea: { //内容
	                    selector: '[data-node-name="area"]',
	                    defaultValue: '请在此直接输入您要采购的产品及其他需求',
	                    notInput: /[§〃〓○△▲◎☆★◇◆□■▽▼㊣︿︹︽_﹁﹃︻︶︸﹀︺︾ˉ﹂﹄︼★]/g,
	                    maxLen: 150
	                },
	                validCode:{
	                    selector:'input[data-node-name="validCodeInput"]',
	                    defaultValue:'请输入验证码',
	                    notInput:/\D+/g,
	                    maxLen: 4,
	                    isMast:true
	                }
	            };
	            $.each(that.elements, function(key, val) {
	                var ele = $(val.selector),
	                    _default = val.defaultValue,
	                    reg = val.reg,
	                    maxLen = val.maxLen;
	                ele.on('focus', function() {
	                    var eleval = $(this).val();
	                    /***
	                     * 如果输入框为空或者为默认，输入框为空，并且改变颜色
	                     */
	                    if (eleval == _default || eleval == '') {
	                        $(this).val('').css('color', focusColor);
	                    }
	                    /**
	                     * 隐藏错误提示
	                     */
	                    $(this).closest('div').find('[data-promptInfo]').hide();
	                }).on('blur', function() {
	                    var eleVal = $(this).val();
	                    if (key == 'MP') {
	                        /**
	                         * 如果是手机，做非空和正则校验
	                         */
	                        if (eleVal == "") {
	                            $(this).val(_default).css('color', blurColor);
	                            $(this).parent().find('em.isNull').show();
	                        }
	                        (!reg.test(eleVal)) ? $(this).parent().find('em.isError').show(): '';
	                    } else {
	                        /***
	                         * 如果不是必填项，为空的时候，填写默认文字
	                         */
	                        if(key == 'contentArea'){
	                            eleVal == "" ? $(this).attr('placeholder',_default) : '';
	                        }else{
	                            eleVal == "" ? $(this).val(_default).css('color', blurColor) : '';
	                        }

	                    }
	                }).on('change keyup', function() {
	                    var eleVal = $(this).val();
	                    /**
	                     * 替换掉不能输入的字符
	                     */
	                    val.notInput ? $(this).val(eleVal.replace(val.notInput, '')) : '';
	                    /**
	                     * 输入字符超过长度截取字符串
	                     */
	                    eleVal.length > maxLen ? $(this).val(eleVal.substr(0, maxLen)) : '';
	                    /***
	                     * 如果当前区域是内容区域，及时显示还剩下多少可以输入的字符
	                     */
	                    if (key == 'contentArea') {
	                        var len = val.maxLen - eleVal.length;
	                        $(this).closest('div').find('[data-node-name="maxLen"]').html('还可以输入' + len + '字');
	                    }
	                });
	            });

	            that.consultWrap.find('[data-node-name="subtn"]').click(function() {
	                //that.submitFrom();
	                var $this = $(this);
	                $this.addClass('cGrayBtn').attr("disabled", "disabled");
	                that.submitOnlineForm($this.attr("data-sceneid") || '');
	            });

	        },

	        /**
	         * 在线咨询提交
	         */
	        submitOnlineForm:function (sceneid) {

	            var _this = this,
	                flag=true,
	                contentWrap = _this.consultWrap.find('[data-node-name="area"]'),
	                mpWrap = _this.consultWrap.find('[data-node-name="MP"]');//联系人姓名;

	            var companyCount='';//公司名称
	            var contacter = '';
	            var phoneZone = $("#mobilephoneCon");
	            var validCodeZone = $('#validcodeCon');

	            $.each(_this.elements, function(key, val) {
	                $(val.selector).focus().blur();
	            });

	            if($.trim(contentWrap.val()) == ""){
	                alert('请输入聊天内容！');
	                flag = false;
	            }

	            /**
	             * 手机号区域可见时，验证手机号有没有错误提示信息
	             */
	            if(phoneZone.is(':visible')){
	                if(phoneZone.find('.bInputBox em.warning').is(':visible')){
	                    flag = false;
	                }
	            }

	            /**
	             * 验证码区域可见时，验证验证码有没有错误提示信息
	             */
	            if(validCodeZone.is(':visible')){
	                if(validCodeZone.find('.clCode em.warning').is(':visible')){
	                    flag = false;
	                }

	            }

	            _this.forVal = {
	                plantitle: contentWrap.val(),
	                contacter: contacter,
	                MP: mpWrap.val(),
	                name: companyCount
	            };

	            if(flag){

	                if(validCodeZone.is(':visible')){//验证码区域可见才校验验证码，否则直接发送聊天请求
	                    //验证通过之后向后台发送请求校验验证码是否正确，验证码正确之后，再发送聊天请求
	                    $.ajax({
	                        type: "GET",
	                        url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
	                        dataType: "jsonp",
	                        data:{
	                            picCode:$.trim($(_this.elements.validCode.selector).val())
	                        },
	                        timeout: 2000,
	                        async: false,
	                        success: function(res) {
	                            if(res.code == 0){
	                                sendMessage();
	                            }else{
	                                //错误信息提示
	                                validCodeZone.find('.clCode em.isError').show();
	                                //验证码图片更换
	                                validCodeZone.find('.clCodeImg img').attr('src','//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date='+new Date().getTime());
	                                //发送按钮置为可用状态
	                                $('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
	                            }
	                        },
	                        error: function() {
	                            alert("网络异常，请重试");
	                        }
	                    });
	                }else{
	                    sendMessage();
	                }

	            }else{//有警告信息时，再将发送按钮置为可用状态

	                $('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
	            }

	            function sendMessage() {
	                $.ajax({
	                    url:"//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doSendmsg/doSendmsg",
	                    type:"GET",
	                    timeout:5000,
	                    data:{
	                        isLogon : $.cookie('LoginID') ? "1":"0",
	                        buyid: $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',
	                        spid:_this.option.providerId,
	                        MP:encodeURIComponent(mpWrap.val()),
	                        plantitle:encodeURIComponent(contentWrap.val()),
	                        contacter:encodeURIComponent(contacter),
	                        introduce:encodeURIComponent(contentWrap.val()),
	                        qrcodeid:sceneid
	                    },
	                    dataType:"jsonp",
	                    jsonpCallback:'callback',
	                    success:function(res){
	                        if(res){

	                            if(res.code == 0){
	                                alert("发送失败，稍后重试！")
	                            }else if(res.code == 1){

	                                if(res.cntADay > 0){
	                                    //首次之后手机号不用再输
	                                    $('#mobilephoneCon').hide();

	                                    //发送成功之后内容框字数还原
	                                    contentWrap.siblings('p.textareaLen').text('还可以输入150字');

	                                    if((res.cntADay)%5 == 0){//默认验证码不显示，模5需要输入验证码
	                                        $('#validcodeCon').show().find('.clCodeImg').trigger('click');
	                                        $('#validcodeCon').find('[data-node-name="validCodeInput"]').val("");
	                                        $('#validcodeCon').find('em.warning').hide();
	                                    }else{
	                                        $('#validcodeCon').hide();
	                                    }

	                                    //消息发送成功后，将消息渲染到面板上
	                                    _this.MessageContent(res.msgId);

	                                    //滚动条滚到最底部
	                                    $("#cInnerBox").scrollTop( $('#cInnerBox')[0].scrollHeight);

	                                    //将发送按钮置为可用状态
	                                    $('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
	                                }

	                            }else if(res.code == 3){
	                                alert("您不能给自己发留言！");
	                            }else{
	                                alert("留言次数超限，稍后重试！");
	                            }

	                        }
	                    },
	                    error:function(res){
	                        alert('网络异常，请稍后重试！');
	                    }
	                })
	            }

	        },

	        /***
	         * 在线咨询
	         */
	        submitFrom: function() {
	            var that = this,
	                flag = true,
	                contentWrap = that.consultWrap.find('[data-node-name="area"]'),
	                mpWrap = that.consultWrap.find('[data-node-name="MP"]');
	            $.each(that.elements, function(key, val) {
	                $(val.selector).focus().blur();
	            });
	            $.each(that.elements, function(key, val) {
	                if ($(val.selector).closest('div').find('[data-promptInfo]').is(":visible")) {
	                    flag = false;
	                }
	            });
	            /***
	             * 如果输入内容为默认话术，则赋值为空
	             */
	            if (contentWrap.val() == that.elements.contentArea.defaultValue) {
	                contentWrap.val("");
	            }
	            if (flag) {
	                var companyCount = ''; //公司名称
	                var contacter = ''; //联系人姓名
	                that.formDatas = {
	                    plantitle: encodeURIComponent(contentWrap.val()),
	                    contacter: encodeURIComponent(contacter),
	                    MP: encodeURIComponent(mpWrap.val()),
	                    name: encodeURIComponent(companyCount),
	                    pid: that.option.providerId,
	                    comeUrl: window.location.href,
	                    buyerSourceId: that.option.is3y == 1 ? "my_online_message_3y" : "my_online_message"
	                };
	                that.forVal = {
	                    plantitle: contentWrap.val(),
	                    contacter: contacter,
	                    MP: mpWrap.val(),
	                    name: companyCount
	                };
	                if (contentWrap.val().search(/\S*(?:\(\u5fae\)\s{0,2}\(\u4fe1\)|（\u5fae）\s{0,2}（\u4fe1）|\u5fae\u4fe1)\S*/) != -1) {
	                    $('.ProhibitedTxt').show();
	                } else {
	                    /**
	                     * 以下是高松需求，开发：xyh
	                     */
	                    //获取微信场景id和微信二维码图片链接
	                    $.ajax({
	                        url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
	                        type:"GET",
	                        dataType:"jsonp",
	                        jsonpCallback:'callback',
	                        success:function(res){
	                            if(res){
	                                doPeformAjax(res.senceid,res.weChatPic);
	                            }else{
	                                doPeformAjax();
	                            }
	                        },
	                        error:function(res){
	                            doPeformAjax();
	                        }
	                    });

	                }
	            };

	            /**
	             *在线咨询发送接口
	             */
	            function doPeformAjax(isGetSenceid,url) {
	                $.ajax({
	                    url: "//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",
	                    type: "GET",
	                    data: {
	                        plantitle: encodeURIComponent(contentWrap.val())
	                    },
	                    dataType: "jsonp",
	                    success: function(response) {
	                        if (response.code == 0) {
	                            $('p.ProhibitedTxt').show();
	                        } else {
	                            $.extend(that.formDatas,{qrcodeid:isGetSenceid || ''});
	                            $.ajax({
	                                url: '//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform?',
	                                data: that.formDatas,
	                                dataType: "jsonp",
	                                jsonpCallback: 'callback',
	                                success: function(data) {
	                                    if (data.code == 1) {
	                                        $('button[ele-type="subtn"]').addClass('cGrayBtn');
	                                        $('button[ele-type="subtn"]').attr("disabled", "disabled");
	                                        that.MessageContent();
	                                        contentWrap.find('[data-node-name="maxLen"]').html('还可以输入150字');

	                                        //改变二维码图片
	                                        if(isGetSenceid){
	                                            $(".ConsulRig dt img").attr("src",url).css({width:'185px',height:'187px'});
	                                            $(".ConsulRig dd").html('您好，微信扫码二维码，微信可随时接收消息回复');
	                                        }

	                                    }else {
	                                        alert("操作频繁，请稍后再试");
	                                        $('[ele-type="closeWindow"]').trigger("click");
	                                        $('html').css('overflow-y', 'auto'); //取消禁止页面滚动
	                                        $('button[ele-type="subtn"]').removeClass('cGrayBtn');
	                                        $('button[ele-type="subtn"]').removeAttr("disabled");
	                                    }
	                                }
	                            });
	                        }
	                    }
	                });
	            }

	        },
	        /***
	         * 留言成功后
	         * @constructor
	         */
	        MessageContent: function(msgId) {
	            var that = this;
	            var MessageStr = '',
	                replyStr = '';
	            MessageStr += '<div class="clBoxRig inputCount" data-id="'+ msgId +'">' +
	                '<em class="clImg"></em>' +
	                '<div class="clImgRig">' +
	                '<p class="name clTime">我 ' + that.getDateTime(true) + '</p>' +
	                '<div class="ConsulList">' +
	                '<em></em>' +
	                '<p>' + that.forVal.plantitle + '</p>' +
	                //'<p>咨询内容：' + that.forVal.plantitle + '</p>' +
	                //'<p>手机号：' + that.forVal.MP + '</p>' +
	                '</div>' +
	                '</div>' +
	                '</div>';

	            $('#cInnerBox').append(MessageStr);
	            //清空输入框
	            $('textarea[data-node-name="area"]').val('');
	            $.each(that.elements, function(key, val) {
	                $(val.selector).css('color', 'gray');
	            });
	        },
	        /***
	         * 获得当前时间
	         * @returns {string}
	         */
	        getDateTime: function(isHasDate) {
	            var dataStr = new Date(),
	                year = dataStr.getFullYear(),
	                month = dataStr.getMonth() + 1,
	                day = dataStr.getDate(),
	                hours = dataStr.getHours(),
	                minutes = dataStr.getMinutes(),
	                seconds = dataStr.getSeconds();

	            function Appendzero(data) {
	                if (Number(data) < 10) {
	                    data = '0' + data;
	                }
	                return data;

	            }
	            if(isHasDate){
	                return year+'-'+Appendzero(month)+'-'+Appendzero(day)+' '+Appendzero(hours)+':'+Appendzero(minutes)+':'+Appendzero(seconds);
	            }else{
	                return Appendzero(hours) + ':' + Appendzero(minutes) + ':' + Appendzero(seconds);
	            }

	        },
	        /***
	         * 立即留言
	         */
	        messageDialog: function() {
	            /***
	             * 显示遮罩
	             * @type {*|HTMLElement}
	             */
	            var downWrap = $('.down');
	            if (downWrap.length == 0) {
	                downWrap = $('<div>', {
	                    'class': 'down'
	                }).appendTo("body").show();
	            } else {
	                downWrap.show();
	            }
	            /***
	             * 禁止页面滚动
	             */
	            $('html').css('overflow-y', 'hidden');
	            /***
	             * 立即留言包裹div
	             */
	            this.messageWrap = $('[data-node-name="messageWrap"]');
	            if (this.messageWrap.length == 0) {
	                this.messageWrap = $("<div>", {
	                    "class": "proMessage"
	                }).attr('data-node-name', 'messageWrap').appendTo("body").show();
	                /**
	                 * 留言标题
	                 * @type {string[]}
	                 */
	                var titleStr = [
	                    '<div class="mTitle">',
	                    '<strong>我要留言</strong>',
	                    '<span class="mCloseBtn">关闭</span>',
	                    '</div>'
	                ];
	                /**
	                 * 留言内容
	                 * @type {string[]}
	                 */
	                var contentStr = [
	                    '<div class="proMessCon">',
	                    '<form data-node-name="mesageForm">',
	                    '<div class="proMtop">',
	                    '<p>注：1.商家会在24小时内与您联系，请确保手机畅通。</p>',
	                    '<p class="in2em">2.慧聪网会确保您的手机号码不被泄露给其他平台，请放心填写。</p>',
	                    '</div>',
	                    '<div class="proMList">',
	                    '<ul>',
	                    '<li><span class="mListLeft">公司名称：</span>',
	                    '<div class="mListRig" title=' + (this.is3y == '1' ? window.companyName : this.companyName) + '>' + (this.is3y == '1' ? window.companyName : this.companyName) + '</div>',
	                    '</li>',
	                    '<li id="prodMesCont">',
	                    '<span class="mListLeft">询价产品：</span>',
	                    '<div class="mListRig" id="prodMesTitle"></div>',
	                    '</li>',
	                    '<li>',
	                    '<span class="mListLeft">留言主题：</span>',
	                    '<div class="mListRig" id="quckSelector">',
	                    '<span>价格</span>',
	                    '<span>商品详情</span>',
	                    '<span>物流与发货时间</span>',
	                    '<span>售后</span>',
	                    '</div>',
	                    '</li>',
	                    '<li class="pBot30">',
	                    '<span class="mListLeft letter2"><em>*</em>留言详情：</span>',
	                    '<div class="mListRig">',
	                    '<textarea data-node-name="messageContent" placeholder="可自定义留言内容，也可选择留言主题，快捷输入内容"  maxlen="200"></textarea>',
	                    '<em class="c-red warning foctextarea"><strong></strong>请输入留言内容</em>',
	                    '<em class="c-red warning foctextarea banned"><strong></strong>内容含有违禁词</em>',
	                    '</div>',
	                    '</li>',
	                    '<li class="pBot30">',

	                    '<div class="mTelCon">',
	                    '<span class="mListLeft letter2"><em>*</em>手机号码：</span>',
	                    '<div class="mListRig">',
	                    '<input data-node-name="messagePhone"  type="tel"  maxlen="11"/><em class="c-red warning focphone"><strong></strong>请输入正确号码</em>',
	                    '</div>',
	                    '</div>',

	                    '<div class="mCodeCon">',
	                    '<span class="mListLeft"><em>*</em>验证码：</span>',
	                    '<div class="mListRig">',
	                    '<input id="validCode" data-node-name="validCode" maxlen="4" type="text" maxlength="4">',
	                    '<em class="c-red warning focValidCode"><strong></strong>请正确输入</em>',
	                    '<a href="javascript:;" data-id="validateCodeImg">',
	                    '<img src="//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date().getTime() +'>',
	                    '</a>',
	                    '</div>',
	                    '</div>',

	                    '</li>',
	                    '<li class="pBot30">',
	                    '<span class="mListLeft letter0">如何称呼您：</span>',
	                    '<div class="mListRig">',
	                    '<input data-node-name="messageContact" type="text" maxlen="5"/>',
	                    '</div>',
	                    '</li>',
	                    '</ul>',
	                    '<div class="mBtnBox">',
	                    '<button id="proMessSubmitBtn" type="button">发送留言</button>',
	                    '</div>',
	                    '</div>',
	                    '</form>',
	                    '</div>'
	                ];
	                /**
	                 * 留言成功
	                 * @type {string[]}
	                 */
	                var proSuccStr = [
	                    '<div class="mSuccBox" style="display: none">',
	                    '<em></em>',
	                    '<p class="mSuccPrompt">关注后，卖家反馈会通过<span>微信公众号</span>发送到您的手机！</p>',
	                    '<div class="mCodeImg" id="wechatContainer">',
	                    '<img src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/mCodeImg.png" />',
	                    '<p>扫描二维码</p>',
	                    '</div>',
	                    // '<p class="codePrompt">关注后，报价结果会通过<span>微信公众号</span>发送到您的手机！</p>',
	                    '<div class="mSuccBtnBox">',
	                    '<button id="clearDown" type="submit">确定</button>',
	                    '<button id="proMessMoreBtn" type="submit" class="moreBtn">更多相关推荐</button>',
	                    '</div>',
	                    '</div>'
	                ];
	                this.messageWrap.append(titleStr.join("")).append(contentStr.join("")).append(proSuccStr.join(""));
	                /**
	                 * 初始化询价产品    productTitle 终极页面的商品标题， titleConList 大图页面商品标题     如果都没有，不显示询价产品
	                 */
	                if (this.is3y == 1) {
	                    var productTitle = $('a[data-useractivelogs="UserBehavior_supplyself_nowposition"]').html(),
	                        titleConList = $('.position>a.list-link').html();
	                } else {
	                    var productTitle = $('#comTitle').html(),
	                        titleConList = $('.titleCon span').html();
	                }
	                if (productTitle != null && productTitle != "") {
	                    $('#prodMesTitle').html(productTitle);
	                    $('#prodMesTitle').attr("title", productTitle);
	                } else if (titleConList != null && titleConList != "") {
	                    $('#prodMesTitle').html(titleConList);
	                    $('#prodMesTitle').attr("title", titleConList);
	                } else {
	                    $('#prodMesCont').hide();
	                }
	                this.messageEvent();
	            } else {
	                /***
	                 * 重置快捷留言选择项目
	                 */
	                this.messageWrap.find('#quckSelector span').removeClass('seleCur');
	                /***
	                 * 隐藏所有错误元素
	                 */
	                this.messageWrap.find('em.warning').hide();
	                /***
	                 * 显示留言内容，隐藏留言成功
	                 */
	                this.messageWrap.find('.mSuccBox').hide().end().find('.proMessCon').show();
	                /***
	                 * 重置表单
	                 */
	                this.messageWrap.find('[data-node-name="mesageForm"]')[0].reset();
	                this.messageWrap.show();
	            }
	        },
	        /**
	         * 立即留言的操作事件
	         */
	        messageEvent: function() {
	            var that = this,
	                /**
	                 * 关闭按钮
	                 */
	                closeMessageBtn = that.messageWrap.find('.mCloseBtn'),
	                /***
	                 * 发送留言按钮
	                 */
	                messageSubmit = that.messageWrap.find('#proMessSubmitBtn'),

	                /**
	                 * 验证码图片换一换按钮
	                 */
	                codeImgChange = that.messageWrap.find('a[data-id="validateCodeImg"]'),

	                /***
	                 * 快捷留言项
	                 */
	                messageTypeList = that.messageWrap.find('#quckSelector span');
	            /***
	             * 留言默认显示内容
	             * @type {string}
	             */
	            that.defaultTextarea = '可自定义留言内容，也可选择留言主题，快捷输入内容';
	            /**
	             * 关闭弹层
	             */
	            closeMessageBtn.click(function() {
	                $('.down').hide();
	                that.messageWrap.hide();
	                $('html').css('overflow-y', 'auto');
	            });
	            /**
	             * 验证码图片换一换
	             */
	            codeImgChange.on('click',function () {
	                $(this).find('img').attr('src',"//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+new Date().getTime());
	            });

	            /***
	             * 快捷留言
	             */
	            messageTypeList.click(function() {
	                that.quickMessage($(this));
	            });
	            /***
	             * 表单验证
	             */
	            that.messageFormValidat();

	            /***
	             * 发送留言
	             */
	            messageSubmit.click(function() {
	                that.sendMessage();
	            });
	            /***
	             * 点击红色警告，红色提示消失，输入框获得焦点
	             */
	            that.messageWrap.find('em').click(function() {
	                $(this).hide();
	                $(this).parent().find('[maxlen]').focus();
	            });

	        },
	        /***
	         * 点击发送留言操作事件
	         */
	        sendMessage: function() {
	            var that = this,
	                flag = true,
	                /***
	                 * 手机号码
	                 */
	                messagePhone = that.messageWrap.find('[data-node-name="messagePhone"]'),
	                phoneVal = $.trim(messagePhone.val()),
	                /***
	                 * 留言详情
	                 */
	                messageTextarea = this.messageWrap.find('[data-node-name="messageContent"]'),
	                textareaVal = $.trim(messageTextarea.val()),
	                /***
	                 * 联系人
	                 */
	                messageContactVal = $.trim(this.messageWrap.find('[data-node-name="messageContact"]').val()),

	                /**
	                 * 验证码
	                 */
	                validCodeVal = $.trim(this.messageWrap.find('[id="validCode"]').val());

	            /***
	             * 留言详情非空验证
	             */
	            if (textareaVal.length == 0 || textareaVal == this.defaultTextarea) {
	                messageTextarea.parent().find('em').eq(0).show();
	                flag = false;
	            }
	            /***
	             * 留言详情是否含有违禁词
	             */
	            if (textareaVal.search(/\S*(?:\(\u5fae\)\s{0,2}\(\u4fe1\)|（\u5fae）\s{0,2}（\u4fe1）|\u5fae\u4fe1)\S*/) != -1) {
	                messageTextarea.parent().find('em').eq(1).show();
	                flag = false;
	            }
	            /***
	             * 手机号码非空验证
	             */
	            if (phoneVal.length == 0 || (!/^1\d{10}$/.test(phoneVal))) {
	                messagePhone.parent().find('em.warning').show();
	                flag = false;
	            }

	            /**
	             * 验证码非空验证
	             */
	            if(validCodeVal == "" || validCodeVal.length<1){
	                this.messageWrap.find('#validCode').parent().find('em.warning').show();
	                flag = false;
	            }

	            if (flag) {

	                //验证码校验正确性
	                jQuery.ajax({
	                    type: "GET",
	                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
	                    dataType: "jsonp",
	                    data:{
	                        picCode:$.trim(validCodeVal)
	                    },
	                    timeout: 2000,
	                    async: false,
	                    success: function(res) {
	                        if(res.code == 0){
	                            submitAjax();
	                        }else{
	                            that.messageWrap.find('#validCode').parent().find('em.warning').show();
	                        }
	                    },
	                    error: function() {
	                        alert("网络异常，请重试");
	                    }
	                });
	            }

	            function submitAjax() {
	                var companyNameVal = that.is3y ? companyName : that.companyName,
	                    proHtml = $.trim($('#prodMesTitle').html()),
	                    typeVal = that.is3y ? 11 : 4,
	                    sourceId = that.is3y ? "detail_company_message_3y" : "detail_company_message";
	                var submitProDatas = {
	                    type: typeVal,
	                    plantitle: proHtml == null ? encodeURIComponent(that.companyName) : encodeURIComponent(proHtml), //询价产品名称
	                    contacter: encodeURIComponent(messageContactVal), //如何称呼您
	                    MP: encodeURIComponent(phoneVal), //手机号码
	                    introduce: encodeURIComponent(textareaVal), //留言详情内容
	                    companyName: encodeURIComponent(companyNameVal), //公司名称
	                    pid: that.option.providerId, //用户公司id
	                    comeUrl: window.location.href, //来源
	                    buyerSourceId: sourceId //卖家库来源
	                };
	                /***
	                 * 辛彦绘和张帆的发版，增加获取微信场景id和微信二维码图片链接
	                 */
	                $.ajax({
	                    url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
	                    type: "GET",
	                    dataType: "jsonp",
	                    jsonpCallback: 'callback',
	                    success: function(res) {
	                        if (res) {
	                            $.extend(submitProDatas, {
	                                qrcodeid: res.senceid
	                            });
	                            that.ajaxFun(submitProDatas, res.senceid, res.weChatPic);
	                        } else {
	                            that.ajaxFun(submitProDatas);
	                        }
	                    },
	                    error: function() {
	                        that.ajaxFun(submitProDatas);
	                    }
	                });
	            }

	        },
	        ajaxFun: function(_data, isGetSenceid, url) {
	            var that = this,
	                /** 留言详情 **/
	                messageTextarea = this.messageWrap.find('[data-node-name="messageContent"]'),
	                textareaVal = $.trim(messageTextarea.val()),
	                /** 关闭按钮 **/
	                closeMessageBtn = that.messageWrap.find('.mCloseBtn');
	            $.ajax({
	                url: "//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",
	                type: "GET",
	                data: {
	                    plantitle: encodeURIComponent(textareaVal) //留言详情内容
	                },
	                dataType: "jsonp",
	                success: function(response) {
	                    /**
	                     * code==0,表示有违禁词
	                     */
	                    if (response.code == 0) {
	                        messageTextarea.parent().find('em.banned').show();
	                    } else {
	                        $.ajax({
	                            url: '//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform',
	                            data: _data,
	                            dataType: "jsonp",
	                            jsonpCallback: 'callback',
	                            success: function(data) {
	                                if (data.code == 1) {
	                                    that.submitProMesSuccess();
	                                    //若isGetSenceid存在替换二维码链接
	                                    if (isGetSenceid) {
	                                        $("#wechatContainer img").attr("src", url).css({
	                                            width: '140px',
	                                            height: '140px'
	                                        });
	                                    }
	                                } else if (data.code == 3) {
	                                    alert("不能给自己留言");
	                                    /***
	                                     * 关闭弹层，取消禁止页面滚动
	                                     */
	                                    closeMessageBtn.trigger("click");
	                                    $('html').css('overflow-y', 'auto');
	                                } else {
	                                    /***
	                                     * 关闭弹层，取消禁止页面滚动
	                                     */
	                                    alert("操作频繁，请稍后再试");
	                                    closeMessageBtn.trigger("click");
	                                    $('html').css('overflow-y', 'auto');
	                                }
	                            }
	                        });
	                    }
	                }
	            });
	        },
	        /***
	         * 立即留言提交成功
	         */
	        submitProMesSuccess: function() {
	            var that = this;
	            /***
	             * 隐藏留言表单
	             */
	            this.messageWrap.find('.proMessCon').hide();
	            /***
	             * 显示留言成功
	             */
	            this.messageWrap.find('.mSuccBox').show();
	            /***
	             * 更多相关推荐按钮
	             */
	            $('#proMessMoreBtn').on('click', function() {
	                var newurl = '';
	                if (that.is3y) {
	                    var origin;
	                    if (typeof company_username === 'undefined' || company_username === null || company_username === '') {
	                        origin = welfarename;
	                    } else {
	                        origin = company_username;
	                    }
	                    newurl = "//" + origin + ".b2b.hc360.com/shop/businwindow.html";
	                } else {
	                    //获取地址前缀判断用哪个对象存在，再拼接成供应产品的地址
	                    if (typeof company_username === 'undefined' || company_username === null || company_username === '') {
	                        if (typeof userName === 'undefined' || userName === null || userName === '') {
	                            newurl = businUrl;
	                        } else {
	                            newurl = "//" + userName + ".b2b.hc360.com/shop/businwindow.html";
	                        }
	                    } else {
	                        newurl = "//" + company_username + ".b2b.hc360.com/shop/businwindow.html";
	                    }
	                }
	                window.open(newurl);
	            });
	            /***
	             * 确定按钮
	             */
	            $('#clearDown').on('click', function() {
	                that.messageWrap.hide();
	                $('html').css('overflow-y', 'auto');
	                $('.down').hide();
	            });
	        },
	        /***
	         * 表单验证
	         */
	        messageFormValidat: function() {
	            this.messageWrap.on('focus', '[maxlen]', function() {
	                $(this).parent().find('em').hide();
	            }).on('change keyup', '[maxlen]', function() {
	                var maxLen = $(this).attr('maxlen'),
	                    reg = null,
	                    inputType = $(this).attr('data-node-name'),
	                    eleVal = $(this).val();
	                /***
	                 * 当前是手机号码输入框不能输入/\D/，当前是联系人不能输入[^a-zA-Z\s\u4e00-\u9fa5]
	                 */
	                if (inputType == 'messagePhone') {
	                    reg = /\D/g;
	                } else if (inputType == 'messageContact') {
	                    reg = /[^a-zA-Z\s\u4e00-\u9fa5]/g;
	                } else if( inputType == 'validCode'){
	                    reg = /\D/g;
	                }
	                reg != undefined ? $(this).val(eleVal.replace(reg, '')) : '';
	                /***
	                 * 限制字数长度
	                 */
	                eleVal.length > maxLen ? $(this).val(eleVal.substr(0, maxLen)) : '';
	            });
	        },
	        /***
	         * 快捷留言
	         */
	        quickMessage: function(me) {
	            var
	            /***
	             * 快捷留言内容
	             * @type {string[]}
	             */
	                messageValue = [
	                    '很喜欢贵公司的商品，可否给个真实的商品报价',
	                    '你好：很喜欢贵公司的商品，是否可以给个详细介绍看看',
	                    '想购买贵公司的商品，请问用的物流、发货时间是什么',
	                    '请问咱们商品的售后是如何处理的，免费维修是多长时间'
	                ],

	                /***
	                 * 留言详情
	                 */
	                messageTextarea = this.messageWrap.find('[data-node-name="messageContent"]'),
	                /***
	                 * 根据点击的留言类型，得到留言内容正则
	                 */
	                index = me.index(),
	                reg = new RegExp(messageValue[index], 'g'),
	                /**
	                 * 错误信息
	                 */
	                errorWrap = messageTextarea.parent().find('em'),
	                /***
	                 * 留言详情内容
	                 */
	                textareaVal = messageTextarea.val();
	            /***
	             * 切换选中和未选中
	             */
	            if (me.hasClass('seleCur')) {
	                me.removeClass('seleCur');
	                textareaVal = textareaVal.replace(reg, '');
	                errorWrap.hide();
	            } else {
	                me.addClass('seleCur');
	                textareaVal = textareaVal + messageValue[index];
	                errorWrap.hide();
	            }
	            /***
	             * 更新留言内容，并且改变字体颜色
	             */
	            textareaVal !== this.defaultTextarea ? messageTextarea.val(textareaVal) : '';
	        },
	        /**
	         * 初始化qq列表
	         */
	        initQQToll: function() {
	            var that = this;
	           // var qqSrc = flag ? "//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/qqIco.gif" :"//style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/p-qq.png";
	            var qq = [
	                    '<div class="every qq" node-name="qqList">',
	                    '<a href="#" class="every-a">',
	                    '<img class="icon" src="//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/qqIco.gif" height="37" width="43" alt="">',
	                    '<span>QQ</span>',
	                    '</a>',
	                    '<div class="qq-tk">',
	                    '</div>',
	                    '</div>'
	                ];
	            /**
	             * 获取三亿qq列表的Ajax的url和data
	             */
	            if (that.is3y) {
	                var username = window['userName'] || window['welfarename'] || '',
	                    param = {
	                        providerid: this.option.providerId,
	                        name: username,
	                        contactor: window['contactor'] || '',
	                        duty: window['duty'] || '',
	                        page: Number(window['page_no']) || 0,
	                        supercatid: window['lastClassId'] || 0,
	                        IsAliHot: window['IsAliHot'] || ''
	                    },
	                    _url = '//b2b.hc360.com/qqser/' + username + '.html';

	            } else {
	                /**
	                 * 获取自发qq列表的Ajax的url和data
	                 */
	                var param = {
	                        providerId: this.option.providerId
	                    },
	                    _url = '//detail.b2b.hc360.com/detail/turbine/template/saleser,qqser.html';
	            }
	            $.ajax({
	                url: _url,
	                type: 'GET',
	                data: param,
	                dataType: "jsonp",
	                jsonp: 'jsoncallback',
	                success: function(result) {
	                    that.qqlist = result.listQQ;
	                    that.companyName = that.is3y ? (window['companyName'] || '') : result.companyName;
	                    if (that.is3y) {
	                        var $qqTalk = $('[data-query="qqTalk"]'),
	                            $qqTalkA = $qqTalk.find("a"),
	                            $qqTalkImg = $qqTalk.find("img");
	                    }
	                    var qqListHtml = '<ul>';
	                    if (that.qqlist && that.qqlist.length > 0) {
	                        if (that.is3y) {
	                            $qqTalkA.attr("href", '//wpa.qq.com/msgrd?v=3&uin=' + that.qqlist[0].qq + '&site=qq&menu=yes');
	                            $qqTalkImg.attr("src", "//wpa.qq.com/pa?p=2:" + that.qqlist[0].qq + ":51");
	                        }
	                        $('div[node-id="weix"]').after(qq.join(''));
	                        $.each(that.qqlist, function(index, item) {
	                            qqListHtml += "<li><a href='//wpa.qq.com/msgrd?v=3&uin=" + item.qq + "&site=qq&menu=yes' target='_blank' onmousedown=\"HC.UBA.sendUserlogsElement('" + that.getUserLog("qq", index + 1) + "')\"><img border='0' src='//wpa.qq.com/pa?p=2:" + item.qq + ":51' title='" + item.qqalias + "'/></a></li>";
	                        });
	                    }
	                    qqListHtml += '</ul>';
	                    $('[node-name="qqList"] .qq-tk').append(qqListHtml);
	                },
	                error: function() {
	                    throw new Error("拉取qq接口失败！");
	                }
	            });
	        },
	        /**
	         * 获取qq和在线咨询监测点值
	         * @param listType
	         * @param pos
	         * @returns {string}
	         */
	        getUserLog: function(listType, pos) {
	            var temp = '',
	                scypsParam = this.option,
	                userId = scypsParam.userId,
	                type = scypsParam.pageType,
	                pos = pos ? '_' + pos : '';
	            if (type === "shop" || type === "pics") {
	                if (scypsParam.ismmt || window.ismmt) {
	                    temp = "UserBehavior_detail_" + listType + "_kf" + pos + "?detailuserid=" + userId; //收费商铺
	                } else {
	                    temp = "UserBehavior_detail_" + listType + "_kf" + pos + "_free?detailuserid=" + userId; //免费商铺
	                }
	            } else if (type === "supplydetailself") {
	                if (scypsParam.isTS) {
	                    temp = "UserBehavior_supplyself_" + listType + "_kf" + pos + "_transaction?detailbcid=" + userId; //支持在线交易
	                } else {
	                    temp = "UserBehavior_supplyself_" + listType + "_kf" + pos + "?detailbcid=" + userId; //不支持在线交易
	                }
	            }
	            return temp;
	        },
	        /***
	         * 获取立即留言监测点值
	         */
	        getLog: function(listType) {
	            var that = this,
	                temp = '',
	                scypsParam = that.option,
	                userId = scypsParam.userId,
	                type = scypsParam.pageType;
	            if (type === "shop" || type === "pics") {
	                if (scypsParam.ismmt || window.ismmt) {
	                    /*** 收费商铺 **/
	                    temp = "UserBehavior_detail_" + listType + "_float" + "?detailuserid=" + userId;
	                } else {
	                    /*** 免费商铺  **/
	                    temp = "UserBehavior_detail_" + listType + "_float_free" + "?detailuserid=" + userId;
	                }
	            } else if (type === "supplydetailself") {
	                if (scypsParam.isTS) {
	                    /** 支持在线交易 **/
	                    temp = "UserBehavior_supplyself_" + listType + "_float_transaction" + "?detailbcid=" + userId;
	                } else {
	                    /*** 不支持在线交易 **/
	                    temp = "UserBehavior_supplyself_" + listType + "_float" + "?detailbcid=" + userId;
	                }
	            }
	            return temp;
	        },
	        /***
	         * 初始化返回顶部是否显示
	         * @param selfTop
	         */
	        gotoTopFn: function(selfTop) {
	            var fix = $('.fix-right').eq(1);
	            if (selfTop > ($(window).height() / 3)) {
	                $("#gotoTop").show();
	                if (fix.is(":hidden")) {
	                    fix.show()
	                }
	            } else {
	                $("#gotoTop").hide();
	                fix.hide();
	            }
	        }
	    }
	    /***
	     * 导出工具条
	     */
	module.exports = rightSidebar


/***/ })

});