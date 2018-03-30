;(function ($){
    window.company_username = 'anfang01'
    /**
     * [$.fn.queryDialog 封装jquery插件 pc及时沟通弹框插件 ]
     * [-------------------------------------------------]
     */
    $.fn.queryDialog = function(options) {
        // 判断当前jquery 类级别方法是否有cookie 没有则引入 $.cookie类级别插件;
        if (typeof $.cookie !== undefined) {
            $.getScript('//style.org.hc360.cn/js/build/source/widgets/jquery.cookie.js');
        };

        return this.each(function(index, _this) {
            $.extend(true, options, {
                element: $(_this)
            });
            var qDialog = new QDialog(options).init();
        });
    };

    var QDialog = function (options){
        // 默认参数
        this.defaultOptions = {
            is3y: false,            // 是否是为3y页面，默认不是
            isBindWX: false,        // 是否绑定微信，默认不绑定
            element: '',            // 当前点击事件弹出框 触发元素
            companyName: '',        // 公司名称
            interval: '',           // 定时器
            consultContainer: '',   // 在线咨询弹框最外包裹层
            providerId:''           // 暂定为商户id
        };
        $.extend(this.defaultOptions, options);
    };
    /**
     * [QDialog.prototype {Object}]
     * [将所有的QDialog弹框所需要用到的方法模块挂载在QDialog原型上 通过this指针访问]
     * [-------------------------------------------------]
     */
    QDialog.prototype = {
        /**
         * [QDialog.init {Function}]
         * [初始化函数 ]
         * [-------------------------------------------------]
         */
        init: function (){
            console.log(this.defaultOptions);
            this.createDialogHtml();
        },
        createDialogHtml: function (){
            var _this = this,
                dialogParams = this.defaultOptions;
            // 初始化点击事件
            dialogParams.element.on('click', function (){
                var _self = $(this),    // 当前点击元素
                    sceneId = '',
                    // 微信默认二维码
                    codeUrl = '//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg';
                // 防止重复点击
                if (_self.prop('isopen')){
                    return false;
                };
                _self.prop('isopen', true);
                // jQuery 版本的Promise对象 {"test-wsc": "测试环境","hc360-hfb": "正式环境"};
                $.when(_this.getChatWXDef('hc360-hfb')).done(function (res){
                    console.log(res);
                    sceneId = res.sceneid;
                    codeUrl = res.weChatPic;
                    // 创建遮罩层
                    $('<div class="dAlertBoxBg consultBg"></div>').appendTo('body');
                    // 当当前页面 不为3亿页面的时候
                    if (!dialogParams.is3y){
                        // Promise 请求数据检测当前用户是否绑定微信
                        $.when(_this.getBindStatusDef()).done(function (result){
                            // {code == 200 ? '则为绑定微信用户': '不绑定' }
                            if (result && result.code === 200){
                                dialogParams.isBindWX = true;
                            };

                            var tipWord = !_this.defaultOptions.isBindWX ? '关注慧聪采购<br>找好货，更方便' : '商家回复慢？<br>可扫码微信接收回复信息';
                            //  创建并添加包裹 弹框内容元素标签
                            dialogParams.consultContainer = $('<div>', {
                                'class': 'Consultation',
                                'data-node-name': 'queryDialog',
                                'data-startTime': _this.getDateTime(true)
                            }).appendTo('body');
                            // 获取包裹弹框元素
                            var wrap = dialogParams.consultContainer;
                            // 获取弹框HTML 标签字符串
                            var dialogHtml = _this.templateHTML(dialogParams.companyName, codeUrl, tipWord, sceneId);
                            wrap.append(dialogHtml);

                            // 获取聊天记录 {函数内调用函数  更改this指向，通过bind改变this指向}
                            _this.getHistoryMsg(_this.chatRecord.bind(_this));

                            if(_this.defaultOptions.isBindWX){

                                // 每隔10s请求获取聊天记录接口
                                _this.defaultOptions.interval = setInterval(function () {
                                    // _this.loopGetMsgPer10s(consultWrap);
                                }, 10000);
                            }
                            _this.bindEvent(consultWrap);
                        }).fail(function (){
                            console.warn("获取微信绑定状态失败，请稍后重试！")
                        });
                    } else {
                        dialogParams.consultContainer = $("<div>", {
                            "class": "Consultation syConsul",
                            "data-node-name": "queryDialog",
                            "data-startTime": _this.getDateTime(true)
                        }).appendTo("body").show();
                        var consultWrap = dialogParams.consultContainer;
                        var dialogHtmlElse = _this.templateHTMLelse();
                        consultWrap.append(dialogHtmlElse);
                        _this.getHistoryMsg(_this.chatRecord.bind(_this));
                        // 从 503 开始
                        // _this.bindEvent(consultWrap);
                    }

                });
            });
        },
        getMsgContent:function () {
            var _this = this;
            return $.ajax({
                url:'//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg',
                type:'GET',
                timeout:5000,
                data: {
                    // buyid: $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
                    buyid: 'YK1522403181776',
                    isLogon: $.cookie('LoginID') ? "1":"0",
                    spid: _this.defaultOptions.providerId
                },
                dataType: "jsonp",
                jsonpCallback: 'callback'
            });
        },
        getHistoryMsg: function (callback) {
            var _this = this;
            $.when(_this.getMsgContent()).done(function (msgList) {
                if (msgList && msgList.length > 0) {
                    var sceneid = msgList[0].qrcodeid;//该场景id如果有，表示以前有聊天记录，不需新生成场景id
                    //将旧的场景id替换新生成的场景id
                    $('button[data-node-name="subtn"]').attr('data-sceneid',sceneid);
                    for(var i=0;i<msgList.length;i++) {
                        if(msgList[i].infokind == "0") {//买家信息在右边
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
                            ].join('');
                            $("#cInnerBox").append(buyerMsg);
                        } else if (msgList[i].infokind == "1"){//卖家信息在左边
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
                                '</div>'].join('');
                            $("#cInnerBox").append(sellerMsg);
                        }
                    };
                    // 只有满足一页的临界值时，显示查看更多按钮,小于一页临界值时默认没有更多数据了
                    if(res.length == 15){
                        $("#cInnerBox").prepend('<p class="moreList"><a href="javascript:;">点击查看更多</a></p>');
                    };

                    // 用旧的场景id获取旧的二维码
                    var codeUrlDom = $('[node-name="friendlyTip"]').find('dl dt img');
                    var defaultCodePath = '//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg';
                    if(_this.defaultOptions.isBindWX){
                        $.when(_this.getCodeUrlBySceneid(sceneid)).done(function (res) {
                            if(res && res.weChatPic) {
                                codeUrlDom.attr('src',res.weChatPic);
                            } else {
                            //还用默认的二维码
                                codeUrlDom.attr('src', defaultCodePath);
                            };
                        }).fail(function () {
                            //获取失败时，还用默认的二维码
                            codeUrlDom.attr('src', defaultCodePath);
                        })
                    } else {
                        codeUrlDom.attr('src', defaultCodePath);
                    }
                }
                // 使聊天记录窗口滚动条滚到最底部
                $('#cInnerBox').scrollTop( $('#cInnerBox')[0].scrollHeight );
                if (callback) {
                    callback();
                };
            }).fail(function () {
                console.log('Failed to obtain data,Please try again later!');
            });
        },
        /**
         * [getChatWXDef {Function}]
         * [ajax 请求数据 second ,codeUrl ]
         * [-------------------------------------------------]
         */
        getChatWXDef: function (imid){
            return $.ajax({
                url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
                type: "GET",
                dataType: "jsonp",
                jsonpCallback: 'callback',
                data:{
                    imid: imid //测试环境“test-wsc”,正式环境“hc360-hfb”
                }
            });
        },
        /**
         * [getCodeUrlBySceneid {Function}]
         * [根据场景id获取二维码 ]
         * [params: {sceneid: ''} ]
         * [-------------------------------------------------]
         */
        getCodeUrlBySceneid:function (sceneid) {
            return $.ajax({
                url: '//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dochatingpicid/doChatingpicid',
                type: 'GET',
                data:{
                    senceid: sceneid,
                    imid: 'hc360-hfb' //测试环境“test-wsc”,正式环境“hc360-hfb”
                },
                dataType: "jsonp",
                jsonpCallback: 'callback'
            });
        },
        /**
         * [getBindStatusDef {Function}]
         * [ajax 请求数据判断当前用户是否绑定微信 ]
         * [-------------------------------------------------]
         */
        getBindStatusDef: function (){
            return $.ajax({
                url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
                dataType:"jsonp",
                data: {
                    "imid": window.company_username || window.welfarename || window.userName
                }
            });
        },
        /**
         * [getDateTime {Function}]
         * [ajax 获取当前时间 年月天时分秒 ]
         * [params ：{isHasDate == true: '年月日时分秒': '时分秒'}]
         * [-------------------------------------------------]
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
                return Number(data) < 10 ? '0' + data: data;
            };
            if (isHasDate){
                return year + '-' +
                    Appendzero(month) + '-' +
                    Appendzero(day) + ' ' +
                    Appendzero(hours) + ':' +
                    Appendzero(minutes) + ':' +
                    Appendzero(seconds);
            } else {
                return Appendzero(hours) + ':' +
                    Appendzero(minutes) + ':' +
                    Appendzero(seconds);
            };
        },
        /**
         * [chatRecord {Function}]
         * [聊天记录模板字符串]
         * [params ：{companyName: '公司名称'}]
         * [-------------------------------------------------]
         */
        chatRecord: function(){
            var chatWord= [
                '<div class="clBoxLeft">',
                    '<em class="clImg"></em>',
                    '<div class="clImgRig">',
                        '<p class="clTime">店经理  '+this.getDateTime(true)+'</p>',
                        '<div class="ConsulList">',
                            '<em></em>',
                            '<p>你好，欢迎光临'+ this.defaultOptions.companyName +'，请发送您要咨询的内容。</p>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
            // 添加聊天记录到模板
            $("#cInnerBox").append(chatWord).scrollTop($('#cInnerBox')[0].scrollHeight);
            // id
            var buyid = $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '';
            $("#validcodeCon").find('.clCodeImg img').attr('src','//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date()+'&buyid='+buyid);
        },
        templateHTML: function (companyName, codeUrl, tipWord, sceneid){
            return ['<div class="ConsultationCon">',
                '<div class="mTitle">',
                    '<div class="mTitLeft">',
                        '<em></em>',
                        '<span class="borLeft">'+ companyName +'</span>',
                    '</div>',
                    '<span class="mCloseBtn" data-node-nane="closeInqueryDialog">关闭</span>',
                '</div>',
                '<div class="ConsulCon">',
                    '<div class="ConsulBox">',
                        '<div class="clTop" id="cInnerBox"></div>',
                        '<div class="clBot">',
                            '<div class="clBotText">',
                                '<textarea name="" data-node-name="area" placeholder="请在此直接输入您要采购的产品及其他需求"></textarea>',
                                '<p class="textareaLen" data-node-name="maxLen">还可以输入150字</p>',
                                '<p class="ProhibitedTxt" style="display: none;"><strong></strong>内容含有违禁词</p>',
                            '</div>',
                        '</div>',
                        '<div class="clBotInput">',
                            '<div id="mobilephoneCon">',
                                '<span><em>*</em>电话号码</span>',
                                '<div class="bInputBox">',
                                    '<input type="text" style="color: rgb(162, 162, 162);" maxLength="11" value="请输入手机号码" name="MP" data-node-name="MP">',
                                    '<em class="c-red warning isNull" style="display: none;"><strong></strong>手机号不能为空</em>',
                                    '<em class="c-red warning isError" style="display: none;"><strong></strong>请填写正确的手机号</em>',
                                '</div>',
                            '</div>',
                            '<div id="validcodeCon">',
                                '<span><em>*</em>验证码</span>',
                                '<div class="clCode">',
                                    '<input type="text" class="w210" style="color:#999999;"maxLength="4" value="验证码" data-node-name="validCodeInput">',
                                    '<em class="c-red warning isNull" style="display: none;"><strong></strong>验证码不为空</em>',
                                    '<em class="c-red warning isError" style="display: none;"><strong></strong>验证码错误</em>',
                                    '<span class="clCodeImg"><img src=""></span>',
                                '</div>',
                            '</div>',
                            '<button type="submit" data-node-name="subtn" isappear="true" data-sceneid="'+ sceneid+'">发送</button>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="rigIphone" node-name="friendlyTip">',
                '<div class="rigCodeBox">',
                    '<dl>',
                        '<dt><img src="'+ codeUrl +'"></dt>',
                        '<dd>'+ tipWord +'</dd>',
                    '</dl>',
                '</div>',
            '</div>'].join('');
        },
        templateHTMLelse: function (){
            return [
                '<div class="ConsultationCon">',
                    '<div class="mTitle">',
                        '<div class="mTitLeft">',
                            '<em></em>',
                            '<span class="borLeft">'+ _this.defaultOptions.companyName +'</span>',
                        '</div>',
                        '<span class="mCloseBtn" data-node-nane="closeInqueryDialog">关闭</span>',
                    '</div>',
                    '<div class="ConsulCon">',
                        '<div class="ConsulBox">',
                            '<div class="clTop" id="cInnerBox"></div>',
                            '<div class="clBot">',
                                '<div class="clBotText">',
                                    '<textarea name="" data-node-name="area" placeholder="请在此直接输入您要采购的产品及其他需求"></textarea>',
                                    '<p class="textareaLen" data-node-name="maxLen">还可以输入150字</p>',
                                    '<p class="ProhibitedTxt" style="display: none;"><strong></strong>内容含有违禁词</p>',
                                '</div>',
                            '</div>',
                            '<div class="clBotInput">',
                                '<div id="mobilephoneCon">',
                                    '<span><em>*</em>电话号码</span>',
                                    '<div class="bInputBox">',
                                        '<input type="text" style="color: rgb(162, 162, 162);" maxLength="11" value="请输入手机号码" name="MP" data-node-name="MP">',
                                        '<em class="c-red warning isNull" style="display: none;"><strong></strong>手机号不能为空</em>',
                                        '<em class="c-red warning isError" style="display: none;"><strong></strong>请填写正确的手机号</em>',
                                    '</div>',
                                '</div>',
                                '<div id="validcodeCon">',
                                    '<span><em>*</em>验证码</span>',
                                    '<div class="clCode">',
                                        '<input type="text" class="w210" style="color:#999999;"maxLength="4" value="验证码" data-node-name="validCodeInput">',
                                        '<em class="c-red warning isNull" style="display: none;"><strong></strong>验证码不为空</em>',
                                        '<em class="c-red warning isError" style="display: none;"><strong></strong>验证码错误</em>',
                                        '<span class="clCodeImg"><img src=""></span>',
                                    '</div>',
                                '</div>',
                                '<button type="submit" data-node-name="subtn" isappear="true" data-sceneid="'+ sceneid+'">发送</button>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="rigIphone" node-name="friendlyTip">',
                    '<div class="rigCodeBox">',
                        '<dl>',
                            '<dt><img src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg"></dt>',
                            '<dd>关注慧聪采购<br>找好货，更方便</dd>',
                        '</dl>',
                    '</div>',
                '</div>'
            ].join('');
        }

    };
})(jQuery);
