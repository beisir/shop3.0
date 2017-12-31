/**
 * Created by HC360 on 2016/1/20.
 */
(function ($, window, undefined) {
    window.online=[];
    var ajaxUrl = {
        listData: "//wsdetail.b2b.hc360.com/qqser?jsoncallback=?"
    };
    var tool = {
        Cookie: {
            get: function (key, n) {
                var arr = document.cookie.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('=');
                    if (key == arr2[0]) {
                        return arr2[n]
                    }
                }
            },
            set: function (key, value, t) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + t);
                document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString();
            },
            del: function removeCookie(key) {
                setCookie(key, '', -1);
            }
        },
        setCookie: function (key, value, t) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + t);
            document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString();
        }
    };
    //在线咨询New
    var elements={
        MP:{//手机号码
            selector:'input[ele-type="MP"]',
            defaultValue:'请输入手机号码',
            reg:/^1\d{10}$/,
            notInput:/\D+/g,
            maxLen: 11,
            isMast:true
        },

        plantitle:{//内容
            selector:'textarea[ele-type="area"]',
            defaultValue:'请在此直接输入您要采购的产品及其他需求',
            notInput:/[§〃〓○△▲◎☆★◇◆□■▽▼㊣︿︹︽_﹁﹃︻︶︸﹀︺︾ˉ﹂﹄︼★]/g,
            maxLen: 150,
            isMast:false
        },

        validCode:{
            selector:'input[ele-type="validCodeInput"]',
            defaultValue:'请输入验证码',
            notInput:/\D+/g,
            maxLen: 4,
            isMast:true
        }

    };
    //即时留言弹框
    var promess = {
        content: { //立即留言内容
            selector: 'textarea[name="message-content"]',
            isMast: true,  //必填项
            maxLen: 200,   //长度
            defaultValue: '可自定义留言内容，也可选择留言主题，快捷输入内容'  //默认文字
        },
        phone: { //手机号
            selector: 'input[id="proPhone"]',
            reg: /^1\d{10}$/,
            notInput: /\D/g,
            isMast: true,
            maxLen: 11,
            defaultValue: ''
        },
        validCode:{
            selector: 'input[id="validCode"]',
            notInput: /\D/g,
            isMast: true,
            maxLen: 4,
            defaultValue: ''
        },
        contact: { //如何称呼您
            selector: 'input[node-type="contact"]',
            notInput: /[^a-zA-Z\s\u4e00-\u9fa5]/g,
            isMast: false,
            maxLen: 5,
            defaultValue:''
        }
    };
    $.fn.rightSidebar = {
        
        init: function (parm) {
            var that = this;
            that.options = $.extend($.fn.rightSidebar.defaults, parm);

            var container = [
                '<div class="fixedRifBox">',
                    '<div class="fix-right-box">',
                        '<div class="fix-right">',
                        '</div>',
                    '</div>',
                    '<div class="recordListBox">',
                        '<h3>我的浏览记录</h3>',
                        '<a href="javascript:void(0)" class="recordClose" id="closeHistory"></a>',
                        '<div class="recordListCon" id="recordWrap">',

                        '</div>',
                    '</div>',
                '</div>'
            ];

            $('body').append(container.join(''));

            //初始化立即咨询，立即留言
            var consultStr='onclick="HC.UBA.sendUserlogsElement(\''+that.getUserLog("consult")+'\')"';
            var messageStr='onclick="HC.UBA.sendUserlogsElement(\''+that.getLog("message")+'\')"';
            //webtrends监测点：在线咨询(consultWbt)，一键开店(openShopWbt)，返回顶部(backtopWbt)
            var consultWbt='onmousedown="return hcclick(\'?hcdetail_supply=supplyself_online_chat\')"';
            var openShopWbt='onmousedown="return hcclick(\'?hcdetail_supply=supplyself_open_shop\')"';
            var backtopWbt='onmousedown="return hcclick(\'?hcdetail_supply=supplyself_backtop\')"';
            
            //在线咨询
            var consult=[
                '<div class="every weix" node-id="weix">',
                '<a href="javascript:;"'+consultStr +'class="every-a"'+consultWbt+' id="OnlineBtn">',
                '<img class="icon" src="//style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_1.gif" height="37" width="43" alt="">',
                '<span>在线咨询</span>',
                '</a>',
                '</div>'
            ];
            //即时留言
            var message=[
                '<div class="every rigProMessage">',
                '<a href="javascript:;" class="every-a"'+messageStr+' id="proMessage">',
                '<span class="border-none">立即留言</span>',
                '</a>',
                '</div>'
            ];

            //浏览记录
            var browseHistory = [
                '<div class="every recordCon">',
                '<a href="javascript:;" class="every-a" id="historyRecord">',
                    '<span class="border-none" style="display:none;">浏览记录</span>',
                '</a>',
                '</div>'
            ]

            //订阅商机
            var srcLink = iflogin ? 'http://my.b2b.hc360.com/my/turbine/template/corcenter,subscibe,add_keywords.html?sorttag=0&keyword='+ supplyInfoJson.keyword  +'&supcatid='+pageBusinVO.supcatid : 'http://my.b2b.hc360.com/my/turbine/template/pubinfo,freesubscribe,free_subscribe.html?sorttag=0&keyword='+ supplyInfoJson.keyword +'&supcatid='+pageBusinVO.supcatid
            var subscribeBus = [
                '<div class="every subscribeCon">',
                    '<a href="'+ srcLink +'" target="_blank" class="every-a">',
                        '<span class="border-none" style="display:none;">订阅商机</span>',
                    '</a>',
                '</div>'             
            ]

            //返回顶部
            var returnTop=[
                '<div class="every top"  id="gotoTop" style="display: none">',
                '<a href="#"'+backtopWbt+' class="every-a">',
                '<img class="icon" src="//style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/p-top.png" height="37" width="43" alt="">',
                '<span class="border-none">返回顶部</span>',
                '</a>',
                '</div>'
            ];

            $('.fix-right').append(consult.join('')).append(message.join('')).append(browseHistory.join('')).append(subscribeBus.join('')).append(returnTop.join(''));

            //初始化QQ
            that.initQQToll();
            
            //绑定事件
            that.handle();
        },


        //绑定事件
        handle:function(){
            var that=this,
                timer=null;

            /**
             * 每个选项悬浮事件
             */
            $('.every .every-a').hover(function(){
                $(this).find('span').show();
            },function(){
                $(this).find('span').hide();
            })

            /**
             * 初始化在线咨询弹框
             */
            HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

                $('#OnlineBtn').queryDialog({
                    is3y:window.scyps.sc.is3y=="1" ? true : false,
                    companyName:window.infoname || '',
                    providerId:window.scyps.sc.providerId
                });

            });

            //即时留言弹框事件绑定
            $(document).on("click",'#proMessage,#nowmessage1,#nowmessage2,#nowmessage3,#nowmessage4,#nowmessage5',function(){
                that.proMessageFun();
                that.isProduct();
                that.submitProMes();
            });

            $("body").on('click','.mCloseBtn:not([data-node-nane="closeInqueryDialog"])',function(){   //移除即时留言弹框
                $('.proMessage').remove();
                $('html').css('overflow-y','auto');//取消禁止页面滚动
                $('.down').remove();
            }).on('mouseenter','.every.qq',function(){
                $('.qq-tk').show();
                clearInterval(timer);
            }).on('mouseleave','.every.qq',function(){
                timer=setTimeout(function(){
                    $('.qq-tk').hide();
                },50);
            }).on('click','em.focphone',function(){
                //点击红色警告，红色提示消失，输入框获得焦点
                $(this).hide();
                $('input[id="proPhone"]').focus();
            }).on('click','em.foctextarea',function(){
                //点击红色警告，红色提示消失，输入框获得焦点
                $(this).hide();
                $('textarea[name="message-content"]').focus();
            }).on('click','em.focValidCode',function(){
                //点击红色警告，红色提示消失，输入框获得焦点
                $(this).hide();
                $(this).siblings('input').focus();
            }).on('click','a[data-id="validateCodeImg"]',function () {
                //验证码输入框清空
                $(this).siblings('#validCode').val('');
                //验证码图片换一换
                $(this).find('img').attr("src","//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+new Date().getTime());
            });

            $("body").on("click","[data-ffuid]",function(){
                var _index = $(this).attr("ffindex"),ffuid = $(this).attr("data-ffuid");
                var bcid = $(this).attr("data-bcid"),embed,axobj = null,lastobj=null;
                _index=_index?_index:0;
                try {
                    if (HC.b.MSIE) {
                        axobj = new ActiveXObject("HCLogin.DetectHcIM");
                        lastobj = axobj;
                    } else{
                        axobj = navigator.mimeTypes["application/ocxcallerplugin"];
                        embed = document.createElement("embed");
                        embed.type = "application/ocxcallerplugin";
                        embed.style.cssText = "width:0;height:0;overflow:hidden;";
                        document.body.appendChild(embed);
                        lastobj = embed;
                    }
                } catch(error) {window.open("//www.im.hc360.com/up.html");}
                embed = lastobj;
                bcid = bcid?bcid: "";
                if (that.isHTTPS && !embed){
                    window.open("//style.org.hc360.cn/webFFPage/index.html?toimid=" + ffuid);
                }else if (embed){
                    if (2 == ffListState[_index]){
                        /*try {
                         embed.IMNewInterface ? embed.Send_Sms("OwnID:;TargetID:" + ffuid + ";Source:" + jQuery("#stylepagemark").attr("source") + ";PostFix:&bcid=" + bcid + ";") : embed.Send_Sms(ffuid)
                         }catch(eor) {}	*/
                        //原选逻辑，2016.1.14发版，产品杨静宇
                        window.fn.showMessage();
                        return false;
                    }else if(ffListState[_index]==0){
                        window.fn.showMessage();
                        return false;
                    }else{
                        try {
                            embed.IMNewInterface ? embed.chat_with_friend("OwnID:;TargetID:" + ffuid + ";Source:" + jQuery("#stylepagemark").attr("source") + ";PostFix:&bcid=" + bcid + ";") : embed.chat_with_friend(ffuid)
                        } catch(eor) {}
                    }
                }else{
                    window.open("//www.im.hc360.com/up.html");
                }
            });

            $(window).scroll(function(){
                var selfTop = $(this).scrollTop();
                that.goUp(selfTop);
            });

            //即时留言信息提交按钮事件绑定
            $("body").on('click','#proMessSubmitBtn',function(){
                that.submitProMessBtn();
                return false;
            })

            //浏览记录
            that.initHistory();
            var rightWrap = $('#closeHistory').closest('.fixedRifBox');
            $('#historyRecord').toggle(function(){
                rightWrap.addClass('rigW305');
            },function(){
                rightWrap.removeClass('rigW305');
            })
            $('#closeHistory').on('click',function(){
                rightWrap.removeClass('rigW305');
            })

        },

        //初始化浏览记录
        initHistory:function(){

            var historyStr= window.localStorage ? window.localStorage.productHistory : '';
            var hasnoHistory = ['<div class="recordListNo">',
                                '<em></em>',
                                '<p>暂无浏览足迹</p>',
                                '</div>'
                            ];
            var histroyHtml = '<ul>';
            if (historyStr && historyStr !== "") {
                var arr = historyStr.split("@");
                var list = arr[1].split(";&;");
                if (list.length > 0 && list != "") {
                    for (var i = 0; i < list.length; i++) {
                        var obj = list[i].split("#&#");
                        if (i < 16 && obj.length > 1) {
                            histroyHtml += '<li>';
                            histroyHtml += '<div class="recomImg">';
                            histroyHtml += '<a href="//b2b.hc360.com/supplyself/' + obj[0] + '.html" onmousedown="return hcclick(\'?hcdetail_supply=supplyself_check_history\')" title="' + obj[1] + '" target="_blank"><img src="' + obj[2] + '" alt="' + obj[1] + '" onload="resizeImg(this,100,100)" onerror="imgonerror(this)"></a>';
                            histroyHtml += '</div>';
                            histroyHtml += '<p>'+ obj[3] +'</p>'
                            histroyHtml += '</li>';
                        }
                    }

                    histroyHtml += '</ul>'

                    $('#recordWrap').append(histroyHtml);
                    
                }else{
                    $('#recordWrap').replaceWith(hasnoHistory.join(''))
                }
            } else{
                $('#recordWrap').replaceWith(hasnoHistory.join(''))
            }
        },

        //初始化扣扣列表
        initQQToll:function(){
            var self=this;
            var param = {providerId: this.options.providerId};
            var data = this.getData(ajaxUrl.listData,param);
            var qq=[
                '<div class="every qq" node-name="qqList">',
                '<a href="javascript:void(0)" class="every-a">',
                '<div class="qq-tk">',
                '</div>',
                '</div>'
            ];
            data.done(function(result){
                self.qqlist=result.listQQ;
                //self.fflist = result.listFF;
                self.companyName=result.companyName;
                var  qqArr='<ul>';
                if(self.qqlist&&self.qqlist.length>0){
                    $('div[node-id="weix"]').after(qq.join(''));
                    $.each(self.qqlist,function(index,item){
                        qqArr+="<li><a href='//wpa.qq.com/msgrd?v=3&uin="+item.qq+"&site=qq&menu=yes' target='_blank' onmousedown=\"HC.UBA.sendUserlogsElement('"+self.getUserLog("qq",index+1)+"')\"><img border='0' src='//style.org.hc360.com/images/detail/mysite/siteconfig/qqIco/qqIco1.gif' title='"+item.qqalias+"'/></a></li>";
                    })
                }
                qqArr+='</ul>';
                $('.qq-tk').append(qqArr);
                self.initQQFFMod();
                // if(self.options.pageType!=="supplydetailself"){//终极页
                //     self.initQQFFMod();
                // }
            })
        },
        //立即留言弹框方法
        proMessageFun: function(){
            $('<div>',{'class':'down'}).appendTo("body").show();
            $('html').css('overflow-y','hidden');//禁止页面滚动
            $("<div>",{"class":"proMessage"}).appendTo("body").show();
            var titleStr=[
                '<div class="mTitle">',
                '<strong>我要留言</strong>',
                '<span class="mCloseBtn">关闭</span>',
                '</div>'
            ];
            $('.proMessage').append(titleStr.join(''));

            var contentStr=[
                '<div class="proMessCon">',
                '<div class="proMtop">',
                '<p>注：1.商家会在24小时内与您联系，请确保手机畅通。</p>',
                '<p class="in2em">2.慧聪网会确保您的手机号码不被泄露给其他平台，请放心填写。</p>',
                '</div>',
                '<div class="proMList">',
                '<ul>',
                '<li><span class="mListLeft">公司名称：</span>',
                '<div class="mListRig" title='+this.companyName+'>'+this.companyName+'</div>',
                '</li>',
                '<li id="prodMesCont">',
                '<span class="mListLeft">询价产品：</span>',
                '<div class="mListRig" id="prodMesTitle" title="">美妍堂亮肤精油</div>',
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
                '<textarea name="message-content" placeholder="可自定义留言内容，也可选择留言主题，快捷输入内容"></textarea>',
                '<em class="c-red warning foctextarea"><strong></strong>请输入留言内容</em>',
                '<em class="c-red warning foctextarea banned"><strong></strong>内容含有违禁词</em>',
                '</div>',
                '</li>',
                '<li class="pBot30">',

                '<div class="mTelCon">',
                '<span class="mListLeft letter2"><em>*</em>手机号码：</span>',
                '<div class="mListRig">',
                '<input id="proPhone" type="tel" /><em class="c-red warning focphone"><strong></strong>请输入正确号码</em>',
                '</div>',
                '</div>',
                '<div class="mCodeCon">',
                '<span class="mListLeft"><em>*</em>验证码：</span>',
                '<div class="mListRig">',
                '<input id="validCode" type="text">',
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
                '<input node-type="contact" type="text" />',
                '</div>',
                '</li>',
                '</ul>',
                '<div class="mBtnBox">',
                '<button id="proMessSubmitBtn" type="submit">发送留言</button>',
                '</div>',
                '</div>',
                '</div>'
            ];

            $('.proMessage').append(contentStr.join(''));

            //添加留言成功内容
            var proSuccStr=[
                '<div class="mSuccBox">',
                '<em></em>',
                '<p class="mSuccPrompt">关注后，卖家反馈会通过<span>微信公众号</span>发送到您的手机！</p>',
                // '<p class="mSuccPrompt">留言发布成功，稍候卖家会与您电话沟通<br />请保持手机畅通，耐心等待反馈结果！</p>',
                '<div class="mCodeImg" id="wechatContainer">',
                '<img src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/mCodeImg.png" />',
                '<p>扫描二维码</p>',
                '</div>',
                // '<p class="codePrompt">关注后，卖家反馈会通过<span>微信公众号</span>发送到您的手机！</p>',
                '<div class="mSuccBtnBox">',
                '<button id="clearDown" type="submit">确定</button>',
                '<button id="proMessMoreBtn" type="submit" class="moreBtn">更多相关推荐</button>',
                '</div>',
                '</div>'
            ];
            $('.proMessage').append(proSuccStr.join(''));
            $('.mSuccBox').hide();
        },
        //判断是否显示询价商品标题：是则显示，否不显示；如果登录，则显示手机号码，不登录则不显示
        isProduct: function(){
            //获取商品标题
            var productTitle = $('#comTitle').html();
            var productTitles = $('.titleCon span').html();
            if (productTitle != "null" && productTitle != null && productTitle != "" && productTitle !=undefined ) {
                $('#prodMesTitle').html(productTitle) ;
                $('#prodMesTitle').attr("title",productTitle);
            } else if(productTitles != "null" && productTitles != null && productTitles != "" && productTitles !=undefined){
                $('#prodMesTitle').html(productTitles) ;
                $('#prodMesTitle').attr("title",productTitles);
            }else{
                $('#prodMesCont').remove();
            }
        },

        //即时留言表单验证
        submitProMes: function(){
            //留言主题标题和对应的内容
            var messageName = ['价格', '商品详情', '物流与发货时间', '售后'];
            var messageValue = ['很喜欢贵公司的商品，可否给个真实的商品报价', '你好：很喜欢贵公司的商品，是否可以给个详细介绍看看',
                '想购买贵公司的商品，请问用的物流、发货时间是什么', '请问咱们商品的售后是如何处理的，免费维修是多长时间'];
            //输入鼠标限制验证
            $.each(promess, function(key,val) {
                var ele = $(val.selector);
                ele.on('focus',function(){ //获得焦点
                    var vals=$(this).val();
                    if(vals==val.defaultValue||vals==''){
                        $(this).val('').css('color','black');
                    }
                    $(this).parent().find('em').hide();
                }).on('change keyup',function(){
                    var eleVal=$(this).val();
                    if (val.notInput) {
                        $(this).val(eleVal.replace(val.notInput, ''));
                    }
                    if(eleVal.length>val.maxLen){
                        $(this).val(eleVal.substr(0,val.maxLen));
                    }
                });
            });
            //快捷留言
            var Quick = (function () {
                var html = '',
                    quickBox = $('#quckSelector'),
                    content = promess["content"]["selector"];

                $.each(messageName, function (index, val) {
                    html += "<span>" + val + "</span>";
                });
                quickBox.html(html);
                quickBox.on('click', 'span', function (e) {
                    var index = $(this).index();
                    var contentVal = $(content).val()!=promess["content"]["defaultValue"]?$(content).val():'';
                    if($(this).hasClass('seleCur')){
                        $(this).removeClass('seleCur');
                        var reg=new RegExp(messageValue[index],'g');
                        contentVal=contentVal.replace(reg,'');
                        $('textarea[name="message-content"]').parent().find('em').hide();
                    }else{
                        $(this).addClass('seleCur');
                        contentVal=contentVal+messageValue[index];
                        $('textarea[name="message-content"]').parent().find('em').hide();
                    }
                    if(contentVal!==''){
                        $('textarea[name="message-content"]').parent().find('em').hide();
                        $(content).val(contentVal).css('color','black');
                    }else{
                        $(content).val(promess["content"]["defaultValue"]).css('color','gray');
                    }
                })
            })();
        },
        //即时留言表单提交
        submitProMessBtn: function(){
            var flag = true,that=this;
            //判断留言详情输入框和联系方式是否为空
            var phoneval =$(promess.phone.selector).val(),
                contentval = $(promess.content.selector).val(),
                validCodeVal = $(promess.validCode.selector).val();
            if(contentval == "" || contentval == promess.content.defaultValue){
                $('textarea[name="message-content"]').parent().find('em.warning').show();
                $('textarea[name="message-content"]').parent().find('em.banned').hide();
            }
            if(phoneval == "" || phoneval == promess.phone.defaultValue ||
                phoneval.length != 11 || !promess.phone.reg.test(phoneval)){
                $('input[id="proPhone"]').parent().find('em.warning').show();
            }
            if(validCodeVal == "" || validCodeVal.length<1 || promess.validCode.notInput.test(validCodeVal)){
                $(promess.validCode.selector).parent().find('em.warning').show();
            }

            //循环判断如果有警告提示是显示的，则停止运行
            $.each(promess,function(key,val){
                if($(val.selector).parent().find('em.warning').is(":visible")){
                    flag=false;
                }
            });

            if(flag){
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
                            $(promess.validCode.selector).parent().find('em.warning').show();
                        }
                    },
                    error: function() {
                        alert("网络异常，请重试");
                    }
                });

            }

            function submitAjax() {

                that.submitProDatas={
                    type:'4',
                    plantitle:encodeURIComponent($('#prodMesTitle').html()), //询价产品名称
                    contacter:encodeURIComponent($(promess.contact.selector).val()), //如何称呼您
                    MP:encodeURIComponent($(promess.phone.selector).val()),          //手机号码
                    introduce:encodeURIComponent($(promess.content.selector).val()), //留言详情内容
                    companyName:encodeURIComponent(that.companyName),                //公司名称
                    pid:that.options.providerId,                                     //用户公司id
                    comeUrl:window.location.href,                                    //来源
                    buyerSourceId:"detail_company_message"                           //卖家库来源
                };
                //判断询价产品为空的时候
                if(that.submitProDatas.plantitle == null || that.submitProDatas.plantitle == "null"){
                    that.submitProDatas.plantitle = that.submitProDatas.companyName;
                }
                //查询是否含有违禁词
                if($(promess.content.selector).val().search(/\S*(?:\(\u5fae\)\s{0,2}\(\u4fe1\)|（\u5fae）\s{0,2}（\u4fe1）|\u5fae\u4fe1)\S*/)!=-1){
                    //显示违禁词提示
                    $('textarea[name="message-content"]').parent().find('em.banned').show();
                }else{
                    //获取微信场景id和微信二维码图片链接
                    $.ajax({
                        url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
                        type:"GET",
                        dataType:"jsonp",
                        jsonpCallback:'callback',
                        success:function(res){
                            if(res){
                                $.extend(that.submitProDatas,{qrcodeid:res.senceid});
                                ajaxFun(res.senceid,res.weChatPic);
                            }else{
                                ajaxFun();
                            }
                        },
                        error:function(res){
                            ajaxFun();
                        }
                    })


                }

            }

            function ajaxFun(isGetSenceid,url){
                $.ajax({
                    url:"//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",
                    type:"GET",
                    data:{plantitle:encodeURIComponent($(promess.content.selector).val())},     //留言详情内容
                    dataType:"jsonp",
                    success:function(response){
                        if(response.code==0){
                            //显示违禁词提示
                            $('textarea[name="message-content"]').parent().find('em.banned').show();
                        }else{
                            //将信息提交到后台
                            $.ajax({
                                url:'//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform',
                                data:that.submitProDatas,
                                dataType:"jsonp",
                                jsonpCallback:'callback',
                                success:function(data){
                                    if(data.code==1){
                                        //页面显示提交成功后的信息内容
                                        that.submitProMesSuccess();
                                        //若isGetSenceid存在替换二维码链接
                                        if(isGetSenceid){
                                            $("#wechatContainer img").attr("src",url).css({width:'140px',height:'140px'});
                                        }
                                    }else if(data.code==3){
                                        //自己给自己留言
                                        alert("不能给自己留言");
                                        $('.mCloseBtn').trigger("click");
                                        $('html').css('overflow-y','auto');//取消禁止页面滚动
                                    }else{
                                        alert("操作频繁，请稍后再试");
                                        //关闭弹框
                                        $('.mCloseBtn').trigger("click");
                                        $('html').css('overflow-y','auto');//取消禁止页面滚动
                                    }
                                }
                            });
                        }
                    }
                });
            }

        },

        //立即留言成功信息显示
        submitProMesSuccess: function(){
            //留言弹框填写信息内容移除
            $('.proMessCon').remove();
            //留言成功信息显示
            $('.mSuccBox').show();
            //提交成功后按钮链接事件
            //更多相关推荐按钮
            $('#proMessMoreBtn').on('click',function(){
                //获取地址前缀判断用哪个对象存在，再拼接成供应产品的地址
                if(typeof company_username === 'undefined' || company_username === null || company_username === ''){
                    if (typeof userName === 'undefined' || userName === null || userName === '') {
                        var newurl = businUrl;
                    } else{
                        var newurl = "//"+userName+".b2b.hc360.com/shop/businwindow.html" ;
                    }
                }else{
                    var newurl = "//"+company_username+".b2b.hc360.com/shop/businwindow.html" ;
                }

                window.open(newurl);
            });
            //确定按钮
            $('#clearDown').on('click',function(){
                $('.proMessage').remove();
                $('html').css('overflow-y','auto');//取消禁止页面滚动
                $('.down').remove();
            })
        },

        //初始化联系我们的发发和qq列表
        initQQFFMod: function(){
            var self=this,str = new Array();
            str.push("<p class='current'>在线客服</p><ul>");
            var leng = self.qqlist.length;
            for(var i=0;i<leng;i++){
                var item = self.qqlist[i];
                str.push("<li><span>"+item.qqalias+"</span><a href='//wpa.qq.com/msgrd?v=3&uin="+item.qq+"&site=qq&menu=yes' target='_blank'  onmousedown=\"HC.UBA.sendUserlogsElement('"+self.getLog("qq","_"+(i+1))+"')\"><em></em></a></li>");
            }
            str.push("</ul><div class='fafa'>");
            str.push("<a  data-bcid='"+self.options.id+"' onmousedown=\"HC.UBA.sendUserlogsElement('"+self.getLog("fafa","_"+(1))+"')\"><img width='17' height='17' data-query=\"weixin\" align='absmiddle' src='//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/wxIco2.png' /></a>");

            str.push("</div>");
            $("#companyServiceMod").html(str.join(""));
            //self.getFFState();
        },
        //获取qq和在线咨询监测点值
        getUserLog: function(listType,pos){
            var self = this,temp='';
            var scypsParam = self.options;
            var type = scypsParam.pageType;
            pos=pos?'_'+pos:'';
            if(type==="shop"||type==="pics"){
                if(scypsParam.ismmt){
                    temp="UserBehavior_detail_"+listType+"_kf"+pos+"?detailuserid="+self.options.providerId;  //收费商铺
                }else{
                    temp="UserBehavior_detail_"+listType+"_kf"+pos+"_free?detailuserid="+self.options.providerId;//免费商铺
                }
            }else if(type==="supplydetailself"){
                if(scypsParam.isTS){
                    temp="UserBehavior_supplyself_"+listType+"_kf"+pos+"_transaction?detailbcid="+self.options.providerId;//支持在线交易
                }else{
                    temp="UserBehavior_supplyself_"+listType+"_kf"+pos+"?detailbcid="+self.options.providerId;//不支持在线交易
                }
            }
            return temp;
        },
        //获取立即留言和商铺左侧联系我们监测点值
        getLog: function(listType,pos){
            var self = this,temp='';
            var scypsParam = self.options;
            var type = scypsParam.pageType;
            pos = pos||'';
            if(type==="shop"||type==="pics"){
                if(scypsParam.ismmt){
                    temp = "UserBehavior_detail_"+listType+"_float"+pos+"?detailuserid="+self.options.providerId;//收费商铺
                }else{
                    temp = "UserBehavior_detail_"+listType+"_float_free"+pos+"?detailuserid="+self.options.providerId;//免费商铺
                }
            }else if(type==="supplydetailself"){
                if(scypsParam.isTS){
                    temp = "UserBehavior_supplyself_"+listType+"_float_transaction"+pos+"?detailbcid="+self.options.providerId;//支持在线交易
                }else{
                    temp = "UserBehavior_supplyself_"+listType+"_float"+pos+"?detailbcid="+self.options.providerId;//不支持在线交易
                }
            }
            return temp;
        },
        goUp: function(selfTop){
            var wh = $(window).height();
            var fix=$('.fix-right').eq(1);
            if(selfTop>(wh/3)){
                $("#gotoTop").show();
                if(fix.is(":hidden")){
                    fix.show()
                }
            }else{
                $("#gotoTop").hide();
                fix.hide();
            }
        },
        getData: function(url,param){
            return $.ajax({
                url: url,
                data: param,
                dataType: "jsonp"
            });
        }
    };
    $.fn.rightSidebar.defaults = {
        pageType: "supplydetailself",
        id: ""
    }

})(jQuery, window);
