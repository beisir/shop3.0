var page = require('./page');
require('./common/topbar');
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
                url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
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
                    $.getScript('//style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js',function(){
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
                url: '//detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=sendMyPhoneHtml',
                dataType: 'jsonp',
                success: function (data) {
                    that.sendMyPhoneHtml = data;
                    $('.contact3Btn').append(data);
                    if(!that.msgDownload){
                        $.getScript('//style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js',function(){
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
        HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

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
          url: "//order.b2b.hc360.com/brandneworder/checkbuslinks.html",
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

        /*if(window.iflogin){
          $('#checkMobilePhoneBox').children('dl:eq(0)').hide();
          $.when(that.getQRcodeByLogin()).done(function (res) {
            $('#checkMobilePhoneBox').append(res[0]);
          })

        }else{*/
          that.checkMobilePhone();
       /* }*/

    },

    /**
     * 校验手机号
     */
    checkMobilePhone:function () {
        var _this = this,
          checkCon = $('#checkMobilePhoneBox'),
          phoneInput = checkCon.find('input'),
          checkBtn = checkCon.find('[node-name="checkBtn"]');

      /**
       * 手机号校验
       */
      phoneInput.keyup(function () {
          this.value=this.value.replace(/\D/g,'')
        }).blur(function () {
          if(this.value == ""){
            $(this).siblings('em.warning').show();
          }else{
            if(!(/^1(3|5|7|8)\d{9}$/.test(this.value))){
              $(this).siblings('em.warning').show();
            }
          }
        });

      phoneInput.siblings('em.warning').on('click',function () {
        var $this = $(this);
        $this.hide();
        $this.siblings('input').focus();
      });


      checkBtn.on('click',function () {
        var $this = $(this);
        if($this.attr('disabled')){
          return false;
        }
        //防止重复提交
        $this.attr('disabled',true);

        if($.trim(phoneInput.val()) == ''){
          $this.siblings('em.warning').show();
          $this.removeAttr('disabled');
          return false;
        }

        if($this.siblings('em.warning').is(':visible')){
          $this.removeAttr('disabled');
          return false;
        }

        $.when(_this.getQRcodeByLogin(phoneInput.val())).done(function (res) {

          /**验证手机号隐藏*/
          checkCon.children(":eq(0)").hide();
          /**显示二维码*/
          checkCon.append(res[0]);

          /**电话显示全*/
          if($("input#telephone_id") && $("input#telephone_id").length>0){
            var telephoneVal = $.trim($("input#telephone_id").val());
            checkCon.siblings('.ContacCon3').find('[node-name="telephone"]').text(telephoneVal);
          }

          /**手机号显示全*/
          if($("input#mp_id") && $("input#mp_id").length>0){
            var mpVal = $.trim($("input#mp_id").val());
            checkCon.siblings('.ContacCon3').find('[node-name="mp"]').text(mpVal);
          }

          /**其他电话显示全*/
          if($("input#otherTelephone_id") && $("input#otherTelephone_id").length>0){
            var otherTelVal = $.trim($("input#otherTelephone_id").val());
            checkCon.siblings('.ContacCon3').find('[node-name="otherTelephone"]').text(otherTelVal);
          }

          /**传真显示全*/
          if($("input#fax_id") && $("input#fax_id").length>0){
            var faxVal = $.trim($("input#fax_id").val());
            checkCon.siblings('.ContacCon3').find('[node-name="fax"]').text(faxVal);
          }

          /**显示扫码发送名片至手机*/

          var _html = ['<div class="sendCon" id="sendCardToPhone">扫码发送名片至手机',
          '<div class="sendCodeImg" style="display: none"><img src="'+ res[1]+'"/></div>',
          '</div>'].join('');
          checkCon.siblings('.ContacCon3').find('li:eq(0)').append(_html);

          $('#sendCardToPhone').hover(function () {
            var $this = $(this);
            $this.children().show();
          },function () {
            var $this = $(this);
            $this.children().hide();
          })

        });

      })



    },


  /**
   * 获取登陆之后的html延迟对象
   * @param phoneNumber
   * @returns {*}
   */
  getQRcodeByLogin:function (phoneNumber) {
    var _this = this,
      deffer = $.Deferred(),
      codeHtml = '',businTitle = '';

    /**
     * 商机标题选取规则
     * 先取最近搜索词，没有取该用户最近浏览商机标题，再没有取该商铺主营产品或行业
     */
    // if(HC.util.cookie.get('searchWord') && HC.util.cookie.get('searchWord').length>0){
    //   var arr = (HC.util.cookie.get('searchWord') || '').split(',');
    //   businTitle = arr[arr.length-1];
    // }else{
      if(_this.getLatestBrowseBusTitle() != '' && _this.getLatestBrowseBusTitle().length>0){
        businTitle = _this.getLatestBrowseBusTitle();
      }else{
        if(inquiryParamVO.mainProducts && inquiryParamVO.mainProducts != '' && inquiryParamVO.mainProducts.length>0){
          businTitle = (inquiryParamVO.mainProducts ||'').split(',')[0];
        }else{
          businTitle = (inquiryParamVO.areaName ||'').split(',')[0] ||'';
        }

      }
    // }

    var data = inquiryParamVO;
    data.contact = encodeURIComponent(window.companyContactor||'');
    data.CompanyName = encodeURIComponent(window.infoname || '');
    data.comeUrl = window.location.href;
    data.type = 27;
    data.buyerSourceId =  "detail_information_shop_company";
    data.isbusin = 2;
    data.businTitle = encodeURIComponent(businTitle);
    if(phoneNumber && phoneNumber.length>0){
      data.telPhone = phoneNumber;
    }

    $.when(_this.getweChatDef()).done(function (res) {

      if(res && res.senceid){

        $.extend(data, { qrcodeid: res.senceid });

        $.ajax({
          type: "get",
          url: "//my.b2b.hc360.com/my/turbine/action/favorites.Favorite_PurchaseAction/eventsubmit_doPerform/doPerform?",
          data: data,
          dataType: 'jsonp',
          jsonp: "jsoncallback",
          timeout: 3000,
          success: function(result) {
            if (result.code == "yes") {

              codeHtml = ['<dl>',
              '<dt>扫描下方二维码，发送<b>公司名片</b>至手机，并实时接收<b>卖家回复！</b><span class="bounce"><img src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/handIco.png"></span></dt>',
                '<dd><div class="codeImgNew2"><img src="'+ res.weChatPic +'"></div></dd>',
              '</dl>'].join('');
              var ress = [codeHtml,res.weChatPic];
              deffer.resolve(ress);
            }else{
              deffer.resolve('');
            }
          },
          error: function() {
            alert("网络异常，请稍后重试！");
            deffer.resolve('');
          }
        });
      }else{
        $('#checkMobilePhoneBox').find('[node-name="checkBtn"]').removeAttr('disabled');
      }
    }).fail(function () {
      console.warn('Failed to get data,Please try again!');
      deffer.resolve('');
    });
    return deffer;
  },

  /**
   * 获取最新浏览的商机标题
   * @returns {string}
   */
  getLatestBrowseBusTitle:function () {
    var str = '',_this=this,latestBusTitle = '';
    str=_this.getCookie('productHistory');
    if(str && str.length>0 && str != ''){
      var arr = str.split("@");
      var list = arr[0].split(";&;");
      if(list && list.length>0 && list != ''){
        var obj = list[0].split("#&#");
        latestBusTitle = obj[1];
      }
    }

    return latestBusTitle;
  },

  /**
   * 获取cookie
   * @param Name
   * @returns {string}
   */
  getCookie:function(Name) {
    var m = "";
    if (window.RegExp) {
      var re = new RegExp(";\\s*" + Name + "=([^;]*)", "i");
      m = re.exec(';' + document.cookie);
    }
    return (m ? unescape(m[1]) : "");
  },

  /**
   * 获取场景二维码延迟对象
   * @returns {*}
   */
  getweChatDef:function () {
    return $.ajax({
      url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
      type: "GET",
      dataType: "jsonp",
      data:{
        imid:'hc360-hfb'//测试环境“test-wsc”,正式环境“hc360-hfb”
      },
      jsonpCallback: 'callback'
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
