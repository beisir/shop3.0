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
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/**
	 * Created by hc360 on 2017/9/25.
	 */
	/**
	 * Created by xyh on 2017/9/13.
	 *
	 */
	(function () {
	  $.fn.contactDialogDetail = function (options) {

	    return this.each(function (idx,_this) {
	      $.extend(true,options,{element:$(_this)});
	      var cDialog = new CDialog(options);
	      cDialog.init();
	    })
	  };


	  var CDialog = function (options) {

	    this.defaultOptions = {

	      /**是否是3y页面，默认是*/
	      is3y:true,

	      /**当前元素*/
	      element:'',

	      /**是否登录*/
	      isLogin:false,

	      /**联系人信息*/
	      contactInfo:{

	      },

	      /**要咨询的商机标题*/
	      inquiryTitle:'',

	      /**区分是否首页，首页是1，非首页是2*/
	      isbusin:2,

	      /**是否是相册大图页，默认不是*/
	      isAlbum:false
	    };

	    $.extend(this.defaultOptions,options);
	  };

	  CDialog.prototype = {
	    init:function () {
	      this.createDialogHtml();
	    },

	    /**
	     * 创建dom
	     */
	    createDialogHtml:function () {
	      var _this = this,
	        wrapper = '';


	      _this.defaultOptions.element.on('click',function () {

	        /**
	         * 登录与否区分手机号，登录显示全手机号，非登录手机号隐藏中间四位（如156****4123）
	         */
	        var originalPhone = _this.defaultOptions.contactInfo.mp;
	        var mobilephone = _this.defaultOptions.isLogin ? originalPhone : originalPhone.replace(/^(\d{3})\d{4}(\d+)/,'$1****$2');


	        /**
	         * 登录之后显示二维码，非登录验证手机号
	         */
	        var $deff = $.Deferred();
	        if(_this.defaultOptions.isLogin){
	          $.when(_this.getQRcodeByLogin()).done(function (res) {
	            $deff.resolve(res);
	          });

	        }else{
	          $deff.resolve(['<div class="cardBoxBot" node-name="noLoginBox">',
	            '<dl>',
	            '<dt>请验证您的手机号码，即刻<b>获取公司名片</b>，并获得更多<b>实力商家报价</b>！</dt>',
	            '<dd>',
	            '<input type="text" maxlength="11" node-name="phoneText" placeholder="请输入您的手机号码"><button type="submit" id="checkMobilePhone">验证</button>',
	            '<em class="warning"><strong></strong>请输入手机号码</em>',
	            '</dd>',
	            '</dl>',
	            '</div>'].join(''));
	        }

	        /**
	         * 先创建遮罩
	         */
	        _this.createMask();

	        wrapper = $('<div>',{
	          'class':'check-num-box'
	        });

	        $deff.done(function (html) {
	          var pageOneStr = [

	            '<div class="check-num" node-name="pageOneBox">',
	            '<div class="title" node-name="titleBox"><span class="t-left"></span>公司名片</div>',
	            '<a class="closeBtn"></a>',
	            '<div class="contactBoxNew" node-name="pageOneContactBox">',
	            '<div class="cardBox" node-name="cardBox">',
	            '<div class="cardBoxList">',
	            '<div class="pListNew tel2">',
	            '<b></b><span style="letter-spacing:0.5em;margin-right:-0.5em">手机号</span><em class="c-red" node-name="sellername">：'+ mobilephone +'</em>',
	            '</div>',
	            '<div class="pListNew name">',
	            '<b></b><span style="letter-spacing:0.5em;margin-right:-0.5em">联系人</span><em>：'+ _this.defaultOptions.contactInfo.contactor +'</em>',
	            '</div>',
	            '<div class="pListNew sate">',
	            '<b></b><span>公司名称</span><em>：'+ _this.defaultOptions.contactInfo.companyname +'</em>',
	            '</div>',
	            '</div>',
	            '</div>',

	            html+'</div>',
	            '</div>'
	          ];

	          wrapper.append(pageOneStr.join('')).appendTo("body").show();

	          _this.centerDialog(wrapper);
	          _this.bindEvent(wrapper);
	        })


	      });
	    },

	    /**
	     * 登录用户之后返回二维码的html片段
	     * @returns {*}
	     */
	    getQRcodeByLogin:function (phoneNumber) {

	      var _this = this,
	        deffer = $.Deferred(),
	        codeHtml = '';

	      inquiryParamVO.businTitle = inquiryParamVO.businTitle.length < 1 ? encodeURIComponent(_this.defaultOptions.inquiryTitle) : inquiryParamVO.businTitle;
	      var data = inquiryParamVO;
	      data.contact = encodeURIComponent(window.companyContactor||'');
	      data.CompanyName = encodeURIComponent(window.infoname || '');
	      data.comeUrl = window.location.href;
	      data.isbusin = _this.defaultOptions.isbusin ;
	      data.type = 15;
	      data.buyerSourceId = _this.defaultOptions.is3y ? "u_ff_msg_cj_3y" : "u_ff_msg_cj";
	      if (_this.defaultOptions.isbusin == 2) {
	        data.supcatName = encodeURIComponent(window.lastClass);
	      }

	      if(phoneNumber && phoneNumber.length>0){
	        data.telPhone = phoneNumber;
	      }
	      //临时的数据
	      if(data.telPhone == ''){
	        data.telPhone = '13611111111';
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
	                codeHtml = ['<div class="cardBoxBot2">',
	                  '<dl>',
	                  '<dt>扫描下方二维码，发送<b>公司名片</b>至手机，并实时接收<b>卖家回复</b>！</dt>',
	                  '<dd><div class="codeImgNew"><img src="'+ res.weChatPic +'"></div></dd>',
	                  '</dl>',
	                  '</div>'].join('');
	                deffer.resolve(codeHtml);
	              }else{
	                deffer.resolve('');
	              }
	            },
	            error: function() {
	              alert("网络异常，请稍后重试！");
	              deffer.resolve('');
	            }
	          });
	        }
	      }).fail(function () {
	        console.warn('Failed to get data,Please try again!');
	        deffer.resolve('');
	      });
	      return deffer;
	    },

	    /**
	     * 事件绑定
	     */
	    bindEvent:function (wrapper) {
	      var _this = this;

	      /**手机号文本框*/
	      var phoneText = wrapper.find('input[node-name="phoneText"]');

	      /**文本框输入限制*/
	      phoneText.keyup(function () {
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

	      /**错误信息点击隐藏*/
	      phoneText.siblings("em.warning").on('click',function () {
	        $(this).hide();
	        phoneText.focus();
	      });

	      /**
	       * 验证手机事件
	       */
	      wrapper.on('click','#checkMobilePhone',function () {
	        var $this = $(this);

	        if($this.attr('disabled')){
	          return false;
	        }
	        //防止重复提交
	        $this.attr('disabled',true);

	        if($.trim(phoneText.val()) == ''){
	          $this.siblings('em.warning').show();
	          return false;
	        }

	        if($this.siblings('em.warning').is(':visible')){
	          return false;
	        }

	        $.when(_this.getQRcodeByLogin(phoneText.val())).done(function (res) {
	          /**显示二维码*/
	          wrapper.find('[node-name="noLoginBox"]').replaceWith(res);
	          /**手机号显示全*/
	          wrapper.find('[node-name="sellername"]').text("："+_this.defaultOptions.contactInfo.mp);
	          /**发送到我的手机显示*/
	          wrapper.find('[node-name="titleBox"]').append('<span class="sent-me"><em></em><a href="javascript:void(0)" node-name="sendMyPhoneBtn">发送到我手机</a></span>');
	          /**电话无人接听显示*/
	          wrapper.find('[node-name="cardBox"]').prepend('<a href="javascript:void(0)" class="telRigLinkNew" node-name="noReplyBtn">电话无人接听怎么办？</a>');
	          /**按钮可用*/
	          $this.removeAttr('disabled');
	        });

	      });

	      /**
	       * 发送到我手机事件
	       */
	      wrapper.on('click','[node-name="sendMyPhoneBtn"]',function () {
	        /**第一页名片、无人接听弹层内容隐藏*/
	        wrapper.find('[node-name="pageOneContactBox"],[node-name="noReplyBox"]').hide();

	        /**发送到我手机弹层显示*/
	        if(wrapper.find('[node-name="pageOneBox"] [node-name="sendMyPhoneBox"]').length>0){
	          wrapper.find('[node-name="sendMyPhoneBox"]').show();

	          /**初始化弹层内容*/
	          wrapper.find('[node-name="telText"],[node-name="validCodeText"]').val('');
	          wrapper.find('p.hide').hide();
	        }else{
	          wrapper.find('[node-name="pageOneBox"]').append(_this.createSendMyPhoneHtml());
	        }

	        /**刷新验证码*/
	        _this.refreshValidcode(wrapper.find('[node-name="sendMyPhoneBox"]'));

	        /**事件绑定*/
	        _this.bindSendMyPhoneEvent(wrapper.find('[node-name="sendMyPhoneBox"]'),wrapper);

	      });

	      /**
	       * 无人接听事件
	       */
	      wrapper.on('click','[node-name="noReplyBtn"]',function () {
	        /**第一页名片、发送到我手机弹层内容隐藏*/
	        wrapper.find('[node-name="pageOneContactBox"],[node-name="sendMyPhoneBox"]').hide();

	        /**无人接听弹层显示*/
	        if(wrapper.find('[node-name="pageOneBox"] [node-name="noReplyBox"]').length>0){

	          wrapper.find('[node-name="noReplyBox"]').show();
	          wrapper.find('[node-name="noReplyBox"]').children(":eq(0)").show();
	          wrapper.find('[node-name="noReplyBox"]').children(":gt(0)").hide();

	          /**初始化弹层内容*/
	          wrapper.find('[node-name="noReplyBox"] [node-name="mpText"]').val('');
	          wrapper.find('[node-name="noReplyBox"] em.warning').hide();
	        }else{
	          wrapper.find('[node-name="pageOneBox"]').append(_this.createNoReplyHtml());
	        }

	        /**事件绑定*/
	        _this.bindNoReplyEvent(wrapper.find('[node-name="noReplyBox"]'),wrapper);

	      });

	      /**
	       * 第一页的关闭按钮,进入第二页
	       */
	      wrapper.on('click','[node-name="pageOneBox"] a.closeBtn',function () {
	        /**第一页隐藏*/
	        wrapper.find('[node-name="pageOneBox"]').hide();
	        /**第二页显示*/
	        wrapper.append(_this.createPageTwoHtml());
	        /**使弹框居中显示*/
	        _this.centerDialog(wrapper);
	        /**绑定第二页事件*/
	        _this.bindPageTwoEvent(wrapper);

	      });

	      /**
	       * 第二页关闭按钮事件
	       */
	      wrapper.on('click','[node-name="pageTwoBox"] a.closeBtn',function () {
	        /**弹层关闭*/
	        wrapper.remove();
	        /**遮罩隐藏*/
	        $('.dAlertBoxBg').remove();

	      });


	    },


	    /**
	     * 创建第二页弹框内容
	     * @returns {string}
	     */
	    createPageTwoHtml:function () {

	      var twoHtml = [
	        '<div class="check-num" node-name="pageTwoBox">',
	        '<a class="closeBtn"></a>',
	        '<div class="dAlertBoxCon2">',
	        '<div class="dSuccBox">',
	        '<dl>',
	        '<dt>完善询价单信息</dt>',
	        '<dd>有助于更快速的为您匹配满意的供应商！</dd>',
	        '</dl>',
	        '</div>',
	        '<div class="freeConBox">',
	        '<ul>',
	        '<li>',
	        '<span><b>*</b>采购产品：</span>',
	        '<div class="fConRig xjIBox">',
	        '<input type="text" class="telInput">',
	        '<em class="warning" style="display: none;"><strong></strong>请输入产品名称</em>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span><b>*</b>采购数量：</span>',
	        '<div class="fConRig xjIBox">',
	        '<input type="text" class="telInput">',
	        '<em class="warning" style="display: none;"><strong></strong>请输入采购数量</em>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span><b>*</b>采购截止日期：</span>',
	        '<div class="fConRig xjIBox">',
	        '<input type="text" class="telInput" value="" node-name="buyToDate">',
	        '<b class=""></b>',
	        '<em class="warning" style="display: none;"><strong></strong>请选择采购截止日期</em>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span class="pTop15">更多描述：</span>',
	        '<div class="fConRig">',
	        '<textarea placeholder="方便更好的为您匹配供应商，如：采购写字楼所用的工作椅500把"></textarea>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span><b>*</b>手机号：</span>',
	        '<div class="fConRig xjIBox">',
	        '<input type="text" class="telInput" node-name="detailMP">',
	        '<em class="warning" style="display: none;"><strong></strong>请输入正确的手机号码</em>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span><b>*</b>验证码：</span>',
	        '<div class="fConRig xjIBox hei70">',
	        '<input type="text" tabindex="2" placeholder="请输入验证码" class="codeInput w100" maxlength="4">',
	        '<span class="codeImgNew"><img id="validate_img" title="验证码" src="//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=1490168767568"></span>',
	        '<a class="codeLink" id="refresh_Img">看不清，换一张</a>',
	        '<em class="warning" id="graphicCode_Tip" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入验证码</em>',
	        '</div>',
	        '</li>',
	        '<li>',
	        '<span><b>*</b>短信验证码：</span>',
	        '<div class="fConRig xjIBox hei70">',
	        '<input type="text" class="codeInput" value="请输入验证码">',
	        '<button type="submit" class="codeBtnNew" style="display:none;">获取验证码</button>',
	        '<button type="submit" class="codeBtnGray">获取验证码</button>',
	        '<p class="codePromptNew">为了安全，请输入验证码，我们将优先处理您的需求！</p>',
	        '<em class="warning" style="display: none;"><strong></strong>请输入验证码</em>',
	        '</div>',
	        '</li>',
	        '</ul>',
	        '<div class="alertBtnBox2"><button type="submit">确定发送</button></div>',
	        '</div>',
	        '</div>',
	        '</div>'
	      ].join('');

	      return twoHtml;
	    },

	    /**
	     * 创建发送到我手机弹框内容
	     */
	    createSendMyPhoneHtml:function () {
	      var phoneHtml = [
	        '<div class="contactBoxNew" node-name="sendMyPhoneBox">',
	        '<div class="sendTel">',
	        '<div class="p num">',
	        '<span>手机号码</span>:',
	        '<input class="text-num" type="text" maxlength="11" node-name="telText">',
	        '<p class="hide" style="display:none;">',
	        '<strong></strong>手机号码格式错误，请重新输入！',
	        '</p>',
	        '</div>',
	        '<div class="p num yanzm">',
	        '<span style="letter-spacing:0.5em;margin-right:-0.5em">验证码</span>:',
	        '<input type="hidden" node-name="validCode-seed">',
	        '<input class="text-num" type="text" maxlength="4" node-name="validCodeText">',
	        '<div class="yanzm-img">',
	        '<img width="110" node-name="validCodeImg" height="40" id="validate_map" title="验证码" src="//detail.b2b.hc360.com/detail/ValidImage.jsp?Seed=0.29667985887426007">',
	        '</div>',
	        '<a href="javascript:;" class="change-more">换一换</a>',
	        '<p class="hide" style="display:none;">',
	        '<strong></strong>请输入正确的验证码',
	        '</p>',
	        '</div>',
	        '<div class="button1">',
	        '<a href="javascript:void(0)" node-name="cancelBtn">取消</a>',
	        '</div>',
	        '<div class="button2">',
	        '<a href="javascript:void(0)" node-name="confirmBtn">确认</a>',
	        '</div>',
	        '</div>',
	        '</div>'
	      ].join('');

	      return phoneHtml;
	    },

	    /**
	     * 创建电话无人接听弹框内容
	     */
	    createNoReplyHtml:function () {
	      var noReplyHtml = [
	        '<div class="contactBoxNew" node-name="noReplyBox">',
	        '<div class="cInfoListBox2">',
	        '<ul>',
	        '<li><p>请输入手机号码，我们将通知卖家尽快联系您，同时为你提供更多1对1采购服务！</p></li>',
	        '<li>',
	        '<span>您的手机号码：</span>',
	        '<div class="rigIbox"><input type="text" maxlength="11" node-name="mpText"><em class="warning" style="display: none;"><strong></strong>请输入正确手机号码</em></div>',
	        '</li>',
	        '<li>',
	        '<div class="IngoBtnBox4">',
	        '<div class="button1"><a href="javascript:void(0)" node-name="cancelBtn">取消</a></div>',
	        '<div class="button2"><a href="javascript:void(0)" node-name="confirmBtn">确认发送</a></div>',
	        '</div>',
	        '</li>',
	        '</ul>',
	        '</div>',
	        '</div>'
	      ].join('');
	      return noReplyHtml;
	    },

	    /**
	     * 发送到我手机之后成功弹层内容
	     * @param codeUrl
	     * @returns {string}
	     */
	    createMyPhoneSuccessHtml:function (codeUrl) {

	      return [
	        '<div class="contactSucc" node-name="myPhone-success">',
	        '<div class="tcbx1">',
	        '<p class="tcbx1-1"> <span></span>发送成功！</p>',
	        '<p class="tcbx1-2">慧聪已向您发送了短信，请查收！</p>',
	        '</div>',
	        '</div>',

	        '<div class="cardBoxBot2" node-name="myPhone-code">',
	        '<dl>',
	        '<dt>您还可以扫码关注“慧聪采购”，接收<b>卖家名片</b>，与卖家保持<b>实时沟通</b>！</dt>',
	        '<dd><div class="codeImgNew"><img src="'+ codeUrl +'"></div></dd>',
	        '</dl>',
	        '</div>'
	      ].join('');
	    },


	    /**
	     * 发送到我的手机失败弹层内容
	     * @param type
	     * @returns {string}
	     */
	    createMyPhoneFailHtml:function (type) {

	      var failHtml = [];

	      if(type = 2){
	        failHtml = [
	          '<div id="sendFail2" class="word1" node-name="myPhone-fail3">',
	          '<div class="tcbx1">',
	          '<p class="tcbx1-1 error_num num_tip_no">',
	          '超过次数限制!',
	          '</p>',
	          '<p class="tcbx1-2 tc">',
	          '您也可以<a rel="nofollow" href="http://my.b2b.hc360.com/my/turbine/template/buycenter,business,supplydetailedit.html">发布采购计划</a>，让卖家主动找您！',
	          '</p>',
	          '</div>',
	          '</div>'
	        ];
	      }else if(type = 3){
	        failHtml = [
	          '<div id="sendFail3" class="word1" node-name="myPhone-fail2">',
	          '<div class="tcbx1">',
	          '<p class="tcbx1-1 error_num">',
	          '超过次数限制!<em>未登录用户仅可免费使用5次。</em>',
	          '</p>',
	          '<p class="tcbx1-2 tc" id="returnUrlNav"><a href="http://sso.hc360.com/ssologin?logincode=3&amp;loginparam=supplyend_ssotop&amp;ReturnURL=http://b2b.hc360.com/supplyself/521792640.html">登录</a>或<a href="javascript:varifyIdentity(2);">验证身份</a>，获得更多的使用权限！</p>',
	          '</div>',
	          '</div>'
	        ];
	      }

	      return failHtml.join('');
	    },

	    /**
	     * 刷新验证码
	     */
	    refreshValidcode:function (sendMyPhoneWrap) {
	      $.ajax({
	        type: "GET",
	        url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MsgDownloadAjaxAction/eventsubmit_dorefreshvalicode/doRefreshvalicode?callback=?",
	        dataType: "jsonp",
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
	        data: {},
	        timeout: 2000,
	        success: function(data) {
	          if(data && data.resultStr.length>0){
	            var s = data.resultStr.split(",");
	            if (s[0] == "validcode" && s.length == 3) {
	              sendMyPhoneWrap.find('[node-name="validCode-seed"]').val(s[1]);
	              sendMyPhoneWrap.find('[node-name="validCodeImg"]').attr('src',"//wsdetail.b2b.hc360.com/ValidImage.jsp?Seed=" + s[2]);
	            }
	          }
	        }
	      });
	    },

	    /**
	     * 绑定发送到我手机弹层中事件
	     * @param sendMyPhoneWrap [发送到我手机弹层的wrap]
	     */
	    bindSendMyPhoneEvent:function (sendMyPhoneWrap) {
	      var _this = this;

	      var telText = sendMyPhoneWrap.find('[node-name="telText"]');
	      var validCodeText = sendMyPhoneWrap.find('[node-name="validCodeText"]');

	      /**验证手机号*/
	      telText.keyup(function () {
	        this.value=this.value.replace(/\D/g,'')
	      }).blur(function () {
	        if(!(/^1(3|5|7|8)\d{9}$/.test(this.value))){
	          $(this).siblings("p.hide").show();
	        }
	      });

	      /**验证码只允许输入数字*/
	      validCodeText.keyup(function () {
	        this.value=this.value.replace(/\D/g,'')
	      }).blur(function () {
	        if(this.value == ''){
	          $(this).siblings("p.hide").show();
	        }
	      });

	      /**错误信息点击事件*/
	      sendMyPhoneWrap.find('p.hide').on('click',function () {
	        var $this = $(this);
	        $this.hide();
	        $this.siblings('input[node-name]').focus();
	      });

	      /**取消按钮事件*/
	      sendMyPhoneWrap.find('[node-name="cancelBtn"]').on('click',function () {
	        sendMyPhoneWrap.hide();
	        sendMyPhoneWrap.siblings('[node-name="pageOneContactBox"]').show();
	      });

	      /**确认按钮事件*/
	      sendMyPhoneWrap.find('[node-name="confirmBtn"]').on('click',function () {
	        var $this = $(this);

	        /**手机号不为空*/
	        if($.trim(telText.val()) == ""){
	          telText.siblings('p.hide').show();
	          return false;
	        }

	        /**验证码不为空*/
	        if($.trim(validCodeText.val()) == ""){
	          validCodeText.siblings('p.hide').show();
	          return false;
	        }

	        /**有错误提示返回*/
	        if(sendMyPhoneWrap.find('p.hide').is(':visible')){
	          return false;
	        }

	        /**防止重复提交*/
	        if($this.attr('disabled')){
	          return false;
	        }
	        $this.attr('disabled',true);

	        var ajaxData = {
	          "LoginTicket": $.trim(sendMyPhoneWrap.find('[node-name="validCode-seed"]').val()),
	          "ValidKey": $.trim(validCodeText.val()),
	          "cellphone": $.trim(telText.val())
	        };

	        if (window.pageIndex == 1) {
	          $.extend(ajaxData,{
	            "downloadSource": 1,
	            "providerId": commonCompanyObject_providerId
	          });
	        } else if (window.pageIndex == 2) {
	          $.extend(ajaxData,{
	            "downloadSource": 3,
	            "bcId": supplyInfo_bcId,
	            "providerId": company_providerId
	          });
	        } else {
	          $.extend(ajaxData,{
	            "downloadSource": 2,
	            "providerId": commonCompanyObject_providerId
	          });
	        }

	        $.ajax({
	          type: "GET",
	          url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MsgDownloadAjaxAction/eventsubmit_domsgdownload/doMsgdownload?callback=?",
	          data: ajaxData,
	          dataType: "jsonp",
	          contentType: "application/x-www-form-urlencoded; charset=utf-8",
	          timeout: 2000,
	          success:function (result) {
	            if (result.tip == "0") {
	              sendMyPhoneWrap.find('[node-name="validCodeText"]').siblings('p.hide').show();
	              _this.refreshValidcode(sendMyPhoneWrap);
	              sendMyPhoneWrap.find('[node-name="confirmBtn"]').removeAttr('disabled');
	            } else if (result.tip == "1") {
	              _this.createMyPhoneSuccessHtml(wrap.find('[node-name="pageOneContactBox"] .codeImgNew img').attr('src'));
	            } else if (result.tip == "2") {
	              _this.siblings('[node-name="myPhone-success"],[node-name="myPhone-code"],[node-name="myPhone-fail3"]').hide();
	              _this.createMyPhoneFailHtml(2);
	              sendMyPhoneWrap.find('[node-name="confirmBtn"]').removeAttr('disabled');
	            } else if (result.tip == "3") {
	              _this.siblings('[node-name="myPhone-success"],[node-name="myPhone-code"],[node-name="myPhone-fail2"]').hide();
	              _this.createMyPhoneFailHtml(3);
	              sendMyPhoneWrap.find('[node-name="confirmBtn"]').removeAttr('disabled');
	            }
	          },
	          error:function () {
	            alert('网络异常，请稍后重试！');
	            sendMyPhoneWrap.find('[node-name="confirmBtn"]').removeAttr('disabled');
	          }
	        })


	      });



	    },

	    /**
	     * 绑定电话无人接听弹层中事件
	     * @param noReplyWrap [电话无人接听弹层的wrap]
	     */
	    bindNoReplyEvent:function (noReplyWrap,wrap) {
	      var _this = this,
	        mpText = noReplyWrap.find('[node-name="mpText"]');

	      /**取消按钮事件*/
	      noReplyWrap.find('[node-name="cancelBtn"]').on('click',function () {
	        noReplyWrap.hide();
	        noReplyWrap.siblings('[node-name="pageOneContactBox"]').show();
	      });

	      /**验证手机号*/
	      mpText.keyup(function () {
	        this.value=this.value.replace(/\D/g,'')
	      }).blur(function () {
	        if(!(/^1(3|5|7|8)\d{9}$/.test(this.value))){
	          $(this).siblings('em.warning').show();
	        }
	      });

	      /**错误信息点击隐藏*/
	      mpText.siblings("em.warning").on('click',function () {
	        $(this).hide();
	        mpText.focus();
	      });

	      /**确定按钮事件*/
	      noReplyWrap.find('[node-name="confirmBtn"]').on('click',function () {
	        var $this = $(this);

	        /**手机号不为空*/
	        if($.trim(mpText.val()) == ''){
	          mpText.siblings('em.warning').show();
	          return false;
	        }

	        /**有错误提示返回*/
	        if(noReplyWrap.find('em.warning').is(':visible')){
	          return false;
	        }

	        /**防止重复提交*/
	        if($this.attr('disabled')){
	          return false;
	        }
	        $this.attr('disabled',true);

	        var plantitle = _this.defaultOptions.isAlbum ? encodeURIComponent("手机号码为" + mpText.val() + "的用户对您商品感兴趣") : encodeURIComponent(_this.defaultOptions.inquiryTitle);

	        $.ajax({
	          url: '//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform',
	          data: {
	            type: 24,
	            pid: inquiryParamVO.sellerProviderId,
	            comeUrl: window.location.href,
	            buyerSourceId: _this.defaultOptions.is3y ? "u_ff_msg_cj_3y" : "u_ff_msg_cj",
	            MP: $.trim(mpText.val()),
	            companyName:encodeURIComponent(window.infoname) || "",
	            plantitle: plantitle || ""
	          },
	          dataType: "jsonp",
	          jsonpCallback: 'callback',
	          success: function(data) {
	            if (data.code == 1) {//成功

	              //无人接听页面隐藏
	              noReplyWrap.children(":eq(0)").hide();

	              //成功页面显示
	              if(noReplyWrap.find('[node-name="noReply-success"]').length>0){
	                noReplyWrap.find('[node-name="noReply-success"]').show();
	                noReplyWrap.find('[node-name="noReply-success"]').siblings('.cardBoxBot2').show();
	              }else{
	                var successHtml = [
	                  '<div class="contactSucc" node-name="noReply-success">',
	                  '<div class="tcbx1">',
	                  '<p class="tcbx1-1"> <span></span>发送成功！</p>',
	                  '<p class="tcbx1-2">慧聪已收到您的需求，我们会尽快会通知卖家联系您，同时会派出采购专员1对1为您提供服务，请您耐心等待。</p>',
	                  '</div>',
	                  '</div>',
	                  '<div class="cardBoxBot2" node-name="noReply-code">',
	                  '<dl>',
	                  '<dt>您还可以扫码关注“慧聪采购”，接收<b>卖家名片</b>，与卖家保持<b>实时沟通</b>！</dt>',
	                  '<dd><div class="codeImgNew"><img src="'+ wrap.find('[node-name="pageOneContactBox"] .codeImgNew img').attr('src')+'"></div></dd>',
	                  '</dl>',
	                  '</div>'
	                ].join('');
	                noReplyWrap.append(successHtml);
	              }
	              //居中弹层内容
	              _this.centerDialog(wrap);

	              $this.removeAttr("disabled");

	            } else if (data.code == 3) {
	              //自己给自己留言
	              alert("不能给自己留言");
	              $this.removeAttr("disabled");
	            } else {
	              alert("操作频繁，请稍后再试");
	              $this.removeAttr("disabled");
	            }
	          },
	          error: function(res) {
	            alert("网络异常，请稍后再试");
	            $this.removeAttr("disabled");
	          }
	        });

	      });
	    },

	    /**
	     * 第二页事件绑定
	     * @param wrap 弹框弹层wrap
	     * @param phone 第一页手机号
	     */
	    bindPageTwoEvent:function (wrap) {
	      var _this = this;
	      /**第二页弹层wrap*/
	      var twoWrap = wrap.find('[node-name="pageTwoBox"]');

	      /**若用户登录状态下，直接获取注册时的手机号，没有则为空*/
	      if(_this.defaultOptions.isLogin){
	        twoWrap.find('[node-name="detailMP"]').val(window.inquiryParamVO.telPhone)
	      }

	      //初始化日期控件
	      HC.W.load('datepicker', function() {
	        $.datepicker.regional['zh-CN'] = {
	          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
	            '七月', '八月', '九月', '十月', '十一月', '十二月'
	          ],
	          monthNamesShort: ['一', '二', '三', '四', '五', '六',
	            '七', '八', '九', '十', '十一', '十二'
	          ],
	          dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	          dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	          dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
	          dateFormat: 'yy-mm-dd'
	        };
	        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

	        var tom1 = new Date();
	        tom1.setDate(tom1.getDate() + 1);

	        twoWrap.find('[node-name="buyToDate"]').datepicker({
	          minDate: tom1
	        });

	      });



	    },


	    /**
	     * 获取场景id和二维码
	     * @returns {*}
	     */
	    getweChatDef:function () {

	      return $.ajax({
	        url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
	        type: "GET",
	        dataType: "jsonp",
	        jsonpCallback: 'callback'
	      });

	    },

	    /**
	     * 创建遮罩
	     */
	    createMask:function () {
	      var downWrap = $('.dAlertBoxBg');
	      if (downWrap.length == 0) {
	        downWrap = $('<div>', {
	          'class': 'dAlertBoxBg'
	        }).appendTo("body").show();
	      } else {
	        downWrap.show();
	      }
	    },

	    /**
	     * 使弹框居中
	     * @param opt
	     */
	    centerDialog:function (opt) {
	      var winH = $(window).height();
	      var winW = $(window).width();
	      var hScroll = $(window).scrollTop();
	      var selfH = opt.height();
	      var selfW = opt.width();
	      winH = winH < selfH ? selfH + 100 : winH;
	      opt.css({
	        "position": "absolute",
	        "left": (winW - selfW) / 2 + "px",
	        "top": (winH - selfH) / 2 + hScroll + "px",
	        "z-index": 1000001
	      })
	    }


	  };

	})();


/***/ })
/******/ ]);