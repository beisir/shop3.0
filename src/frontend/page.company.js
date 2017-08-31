var page = require('./page');

/**
 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
 * @type {Object}
 */
// require('./template/page.data')();

/**
 * 实例化页面业务对象
 */
var pageEntity = new page();
/***
 * 实例化页面的业务
 */
var page_contact_us = function () {
    /***
     * 给我留言按钮
     * @type {*|jQuery|HTMLElement}
     */
    this.messageBtn = $('[data-node-name=pageComMessage]');
    /***
     * 发送到我的手机按钮
     * @type {*|jQuery|HTMLElement}
     */
    //this.sendPhoneBtn = $('.telIcoNew a');
    this.sendPhoneBtn = $('[data-node-name=sendMsgToPhone]');

    this.initContactIcon();

    /***
     * 绑定事件
     */
    this.bindEvent();

};
page_contact_us.prototype = {

    /**
     * 初始化联系我们微信图标
     */
    initContactIcon:function () {
        $.when($.ajax({
                url: "http://madata.hc360.com/mobileweb/m/get/bindstatus",
                dataType:"jsonp",
                data:{"imid":window.userName||window.welfarename}
            })
        ).done(function (res) {
            flag=res.code=="200";
            if(flag){
                $('#contactChat').removeClass('contactChat').addClass('contactWX2');
            }
        }).fail(function () {
            console.warn('Error on Internet,Please try again later!');
        });
    },

    bindEvent: function () {
        var that = this,
            _companyTmLayerWei= $('#companyTmLayerWei');
        /***
         * 微信联系我
         */
        $('.wxIcoNew').mouseenter(function(){
            _companyTmLayerWei.show();
        }).mouseleave(function(){
            _companyTmLayerWei.hide();
        });

        /***
         * 扫描下载名片
         */
        $("#qrcode1").mouseenter(function(){
            $(this).find('.cxcode2').show();
        }).mouseleave(function(){
            $(this).find('.cxcode2').hide();
        });

        /**
         * 给我留言点击事件
         */
        that.messageBtn.click(function () {
            /**
             * 确认右侧工具条加载完成并完成初始化，再调用右侧工具条对象的相应方法
             */
            window.righToolbar && window.righToolbar.messageDialog && window.righToolbar.messageDialog();
        });
        /***
         * 添加我我商业伙伴 href链接http://my.b2b.hc360.com/my/turbine/template/corcenter,businfriend,busin_friends_invitemsg.html?traceaction=businfriend&chkProviderid=100021625044
         */

        /***
         * 发送到我的手机
         */
        that.sendPhoneBtn.click(function () {
            if(that.sendMyPhoneHtml){
                if(!that.msgDownload){
                    $.getScript('http://style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js',function(){
                        that.msgDownload=true;
                        resetCorMessage();
                    });
                }else{
                    resetCorMessage();
                }
                return;
            }
            /***
             * 获取发送手机html
             */
            $.ajax({
                url: 'http://detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=sendMyPhoneHtml',
                dataType: 'jsonp',
                success: function (data) {
                    that.sendMyPhoneHtml = data;
                    $('.contact3Btn').append(data);
                    if(!that.msgDownload){
                        $.getScript('http://style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js',function(){
                            that.msgDownload=true;
                            resetCorMessage();
                        });
                    }
                }
            });
        });

        /**
         * 初始化立即交谈按钮
         */
        HC.HUB.addScript('http://style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

            $('#contactChat').queryDialog({
              is3y:window.scyps.sc.is3y=="1" ? true : false,
              companyName:window.infoname || '',
              providerId:window.scyps.sc.providerId
            });

        });

        /**
         * [显示企业档案模块的 商盈通 图标逻辑]
         */
        $.ajax({
          type: "get",
          url: "http://order.b2b.hc360.com/brandneworder/checkbuslinks.html",
          data: {
            providerid: window.providerId
          },
          timeout: 3000,
          dataType: "jsonp",
          jsonp: "jsoncallback",
          success: function(result) {
            if (result) {
              if ($("#sytico").length > 0) {
                $("#sytico").show();
              } else if ($("#service-message").length > 0) {
                $("#service-message").show();
              }
            }
          },
          error: function(e) {}
        });

    }

};
/***
 * 初始化联系我们页面方法
 */
new page_contact_us();
/**
 * [pageEntity 将页面业务对象暴露到全局]
 * @type {Object}
 */
window.pageEntity = pageEntity;
