/**
 * 发布询价单弹框3y 
 * date:2018.1.4
 * author:辛彦绘
 */
(function($){
    $.fn.InqueryAlert = function(options){
        
        return this.each(function(idx,_this){
            $.extend(true, options, {element:$(_this)});
            var iAlert = new IAlert(options);
            iAlert.init();
        })
    }

    var IAlert = function(options){

        this.defaultOptions = {

            /**是否是3y, 默认是 */
            is3y : true,

            /**当前元素对象 */
            element : '',

            providerId : ''
        }

        $.extend(true,this.defaultOptions,options);
    }

    /**
     * 初始化
     */
    IAlert.prototype.init = function(){
        this.createAlertHtml();
    }

    /**
     * 创建弹层html
     */
    IAlert.prototype.createAlertHtml = function(){

        var _this = this;
        _this.defaultOptions.element.on('click',function(){

            /**创建遮罩 */
            _this.createMask();
              
            var container = $('<div>',{
                'class' : 'check-num-box syContactBox'
            }).appendTo("body").append('<div class="check-num" id="inqueryWrap"></div>').show();

            var  wrapper = $('#inqueryWrap');

            /**创建弹层 */
            var htmlArray = [
                '<div class="title borBottom"><span class="t-left"></span>询价单</div>',
                '<a class="closeBtn"></a>',
                '<div class="dAlertBoxCon2">',
                '<p class="topPrpmpt3">请您完善以下询价单信息，慧聪网会为您匹配更多优质、合适的供应商！</p>',
                '<div class="freeConBox">',
                    '<ul>',
                        '<li>',
                            '<span><b>*</b>采购产品：</span>',
                            '<div class="fConRig xjIBox">',
                                '<input type="text" node-name="buyProduct" class="telInput" placeholder="请输入采购产品名称" maxlength="50">',
                                '<em class="warning" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入采购产品</em>',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<span><b>*</b>采购数量/单位：</span>',
                            '<div class="fConRig xjIBox zIndex5">',
                                '<input type="text" placeholder="数量" node-name="buyAmount" class="telInput w120" maxlength="6" value="">',
                                '<div class="seleCon2" node-name="unitBox">',
                                    '<div class="tsCon">',	
                                        '<input class="sec-p" placeholder="单位" maxlength="6" node-name="buyUnit">	<s></s></div>',
                                        '<ul class="seleList" style="display:none;">',
                                            '<li>把</li><li>包</li><li>本</li><li>部</li><li>打</li><li>袋</li><li>单</li><li>吊</li><li>顶</li><li>对</li><li>组</li><li>尊</li>',
                                            '<li>吨</li><li>幅</li><li>个</li><li>根</li><li>公斤</li><li>公升</li><li>罐</li><li>毫米</li><li>毫升</li><li>盒</li><li>座</li>',
                                            '<li>架</li><li>件</li><li>节</li><li>具</li><li>卷</li><li>卡</li><li>棵</li><li>颗</li><li>克</li><li>块</li><li>款</li><li>株</li>',
                                            '<li>厘米</li><li>立方</li><li>立方根</li><li>粒</li><li>辆</li><li>路</li><li>码</li><li>枚</li><li>米</li><li>面</li><li>盆</li>',
                                            '<li>片</li><li>票</li><li>平方厘米</li><li>平方米</li><li>平方市尺</li><li>平方英尺</li><li>瓶</li><li>千克</li><li>升</li><li>束</li>',
                                            '<li>台</li><li>双</li><li>套</li><li>条</li><li>桶</li><li>头</li><li>箱</li><li>英寸</li><li>盏</li><li>张</li><li>支</li><li>只</li>',
                                        '</ul>',
                                '</div>',
                                '<em class="warning w120" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入采购数量</em>',
                                '<em class="warning w100" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请选择单位</em>',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<span><b>*</b>采购截止日期：</span>',
                            '<div class="fConRig xjIBox">',
                                '<input type="text" class="telInput" readonly="true" node-name="buyToDate" maxlength="11"> <b class=""></b>',
                                '<em class="warning" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请选择采购截止日期</em>',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<span class="pTop15">更多描述：</span>',
                            '<div class="fConRig">',
                                '<textarea placeholder="方便为您更快匹配到优质供应商，如：采购写字楼工作椅200把" maxlength="45" node-name="moreDesc"></textarea>',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<span><b>*</b>手机号：</span>',                    	
                            '<div class="fConRig xjIBox">',
                                '<input node-name="detailMP" maxlength="11" name="PHONE" class="telInput" onkeyup="this.value=this.value.replace(/\D/g,'+""+')" onkeypress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" type="text">',
                                '<em id="telnumberTip" class="warning" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入正确的手机号码</em>',
                            '</div>',
                        '</li>',  
                        '<li>',
                            '<span><b>*</b>验证码：</span>',
                            '<div class="fConRig xjIBox hei70">',
                                '<input type="text" tabindex="2" placeholder="请输入验证码" name="captcha" node-name="validate_input" class="codeInput w100" maxlength="4">',
                                '<span class="codeImgNew"><img id="validate_img" title="验证码" src="//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=1514513558489"></span>',
                                '<a class="codeLink" id="refresh_Img">看不清，换一张</a>',
                                '<em class="warning" id="graphicCode_Tip1" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入验证码</em>',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<span><b>*</b>短信验证码：</span>',
                            '<div class="fConRig xjIBox hei70">',
                                '<input node-name="msgcodeInput" maxlength="6" placeholder="请输入验证码" name="VALIDCODE" class="codeInput" onkeyup="this.value=this.value.replace(/\D/g,'+""+')" onkeypress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" type="text">',
                                '<button id="phoneGetCode" type="button" class="codeBtnNew" onmousedown="return hcclick('+"?hcdetail_supply=supplyself_check_2"+')">免费获取验证码</button>',
                                '<em class="warning" node-name="msgCodeTip" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>请输入验证码</em>',
                            '</div>',
                        '</li>',
                    '</ul>',
                    '<div class="alertBtnBox2"><a type="submit" onmousedown="return hcclick('+"?hcdetail_supply=supplyself_contact_delivery_2_3y"+')" node-name="submitAllBtn">立即发布</a></div>',
                    '</div>',
                '</div> '
                ];

            wrapper.append(htmlArray.join(''));

            _this.centerDialog(wrapper.parent('.syContactBox'))

            _this.bindEvent(wrapper)

        })


    }

    /**
     * 事件绑定
     */
    IAlert.prototype.bindEvent = function(wrapper){
        
        var _this = this;
        /**
         * 弹层关闭事件
         */
        wrapper.on('click','a.closeBtn',function () {
            /**弹层关闭*/
            wrapper.parent().remove();
            /**遮罩隐藏*/
            $('.dAlertBoxBg').remove();
        });

        /**采购产品blur事件，不为空校验*/
        var buyProduct  = wrapper.find('[node-name="buyProduct"]');
        buyProduct.on('blur',function () {
            if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
            $(this).siblings("em.warning").show();
            }
        });

        /**采购数量校验不为空且限制输入大于0 的数字*/
      var buyAmount = wrapper.find('[node-name="buyAmount"]');
      buyAmount.on('keyup', function() {
        var parnt = /^[1-9]\d*(\.\d+)?$/;
        if (!parnt.exec(this.value)) {
          this.value = "";
        }
      }).on('blur', function() { //不为空校验
        if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
          $(this).siblings("em.warning.w120").show();
        }
      });

      /**采购单位点击事件*/
      var unitInputBox = wrapper.find('[node-name="unitBox"] .tsCon');
      var buyUnit = wrapper.find('[node-name="buyUnit"]');
      var selectCon = unitInputBox.siblings('ul');
      unitInputBox.on('click',function (e) {
        e.stopPropagation();
        var $this = $(this);
        if($this.parent().siblings('em.warning.w100').is(":visible")){
          $this.parent().siblings('em.warning.w100').hide();
          buyUnit.focus();
        }
        selectCon.show();
      });

      //采购单位下拉点击空白处隐藏
      wrapper.on('click',function () {
        if(selectCon.is(':visible')){
          selectCon.hide();
          if(buyUnit.val() == "" || buyUnit.val().length ==0){
            selectCon.closest('[node-name="unitBox"]').siblings('em.warning.w100').show();
          }
        }
      });

      unitInputBox.siblings('ul').find('li').on('click',function () {
        var $this = $(this);
        buyUnit.val($this.text());
        unitInputBox.siblings('ul').hide();
      });

      /**采购单位不为空*/
      buyUnit.keyup(function () {
        var $this = $(this);
        var listItem = $(this).parent().siblings('ul').children();
        var inputValue = $.trim($this.val());

        if(inputValue.length>0){
          var pattern = new RegExp("^[\u4e00-\u9fa5]+$");
          if(!pattern.test(inputValue)){
            listItem.hide();
          }else{
            var nowValReg = new RegExp( "(" + inputValue + ")" );
            listItem.each(function(){
              var me = $(this);
              var notetext = me.text();
              if( !nowValReg.test( notetext ) ) {
                me.hide() ;
              }else{
                var filterword = RegExp.$1;
                me.html(filterword);
                me.show();
              }
            });
          }
        }else{

          listItem.show();
          listItem.parent().show();
        }

      }).blur(function() { //不为空校验
        if ($.trim($(this).val()) == "" || $(this).val().length == 0) {
          $(this).siblings("em.warning.w100").show();
        }
      });

      /**初始化日期控件*/
      var buyToDate = wrapper.find('[node-name="buyToDate"]');
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

        buyToDate.datepicker({
          minDate: tom1
        });

      });

      /**手机号校验*/
      var detailMP = wrapper.find('[node-name="detailMP"]');
      detailMP.keyup(function () {
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

      /**更多描述不允许输入特殊字符*/
      var moreDesc = wrapper.find('[node-name="moreDesc"]');
      moreDesc.on('keyup', function() {
        var v = $.trim(this.value.replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, ""));
        this.value = v;
      });

      /**验证码校验,限制输入数字，失去焦点不为空*/
      var validcodeInput = wrapper.find('[node-name="validate_input"]')
      validcodeInput.on('keyup', function() {
        this.value=this.value.replace(/\D/g,'')
      }).blur(function () {
        if(this.value == ""){
          $(this).siblings('em.warning').show();
        }
      });

      /**短信验证码校验，失去焦点不为空*/
      var msgcodeInput = wrapper.find('[node-name="msgcodeInput"]');
      msgcodeInput.blur(function () {
        if(this.value == ""){
          $(this).siblings('em.warning').show();
        }
      });

      /**错误提示点击事件*/
      wrapper.find('em.warning').on('click',function () {
        var $this = $(this);
        if($this.hasClass('w100')){//采购单位
          $this.hide().siblings('[node-name="unitBox"]').find('input[node-name]').focus();
        }else{
          $this.hide().siblings('input[node-name]').focus();
        }
      });

      /**验证码换一换*/
      var refreshImg = wrapper.find('#refresh_Img');
      refreshImg.on('click',function () {
        var $this = $(this);
        $this.siblings('.codeImgNew').find('img').attr("src", "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=" + new Date().getTime());
      });

      /**获取短信验证码事件*/
      var sendMsgCodeBtn = wrapper.find('#phoneGetCode');
      sendMsgCodeBtn.on('click',function () {
        if($.trim(validcodeInput.val()) == ''){
          validcodeInput.siblings('em.warning').show();
        }else{
          _this.checkValidCode(wrapper,$.trim(validcodeInput.val()))
        }
      });

      /**完善提交按钮事件*/
      var submitAllBtn = wrapper.find('[node-name="submitAllBtn"]');
      submitAllBtn.on('click',function () {

        /**采购产品不为空*/
        if($.trim(buyProduct.val()) == '' || buyProduct.val().length<1){
          buyProduct.siblings('em.warning').show();
          return false;
        }

        /**采购数量不为空*/
        if($.trim(buyAmount.val()) == '' || buyAmount.val().length<1){
          buyAmount.siblings('em.warning.w120').show();
          return false;
        }

        /**采购单位不为空*/
        if($.trim(buyUnit.val()) == '' || buyUnit.val().length<1){
          buyUnit.closest('.seleCon2').siblings('em.warning.w100').show();
          return false;
        }else{
          buyUnit.closest('.seleCon2').siblings('em.warning.w100').hide();
        }

        /**采购截止日期不为空*/
        if($.trim(buyToDate.val()) == '' || buyToDate.val().length<1){
          buyToDate.siblings('em.warning').show();
          return false;
        }

        /**手机号不为空*/
        if($.trim(detailMP.val()) == '' || detailMP.val().length<1){
          detailMP.siblings('em.warning').show();
          return false;
        }

        /**验证码不为空*/
        if($.trim(validcodeInput.val()) == '' || validcodeInput.val().length<1){
          validcodeInput.siblings('em.warning').show();
          return false;
        }

        /**短信验证码不为空*/
        if($.trim(msgcodeInput.val()) == '' || msgcodeInput.val().length<1){
          msgcodeInput.siblings('em.warning').show();
          return false;
        }

        /**若有错误提示显示，不提交*/
        if (wrapper.find('em.warning').is(':visible')) {
          return false;
        }

        $.when(_this.checkMsgCode(wrapper,$.trim(msgcodeInput.val()),$.trim(detailMP.val()))).done(function (res) {
          if(res.code == 1){
            msgcodeInput.siblings('em.warning').hide().html("<strong></strong>请输入验证码");

            var inquiryTitle = $("#inquiryTitle").val();
            inquiryParamVO.businTitle = inquiryParamVO.businTitle.length < 1 ? encodeURIComponent(jQuery("#inquiryTitle").val()) : inquiryParamVO.businTitle;
            var data = inquiryParamVO;
            var is3yFlag = typeof window.is3y == "undefined" ? window.scyps && window.scyps.sc.is3y : window.is3y;
            data.contact = '';
            data.CompanyName = encodeURIComponent(infoname);
            data.comeUrl = window.location.href;
            data.isbusin = 2;//3y以前msgDownloadAjax（2）方法中参数值为2
            data.type = 301;//15是给公司推送卖家名片  非15是慧聪留言
            data.telPhone = $.trim(detailMP.val());
            data.buyerSourceId = "detail_contact_inquiry_3y";
            data.supcatName = encodeURIComponent(window.lastClass);
            data.purchaseInfo = encodeURIComponent(moreDesc.val());
            data.inquiryNum = $.trim(buyAmount.val());
            data.deadline = $.trim(buyToDate.val());
            data.mobileCheck = true, //是否检验手机号，完善提交页面都是校验手机号的
            data.unit = encodeURIComponent($.trim(buyUnit.val())) //采购单位
            data.businTitle = encodeURIComponent($.trim(buyProduct.val()))

            // var sendData = {
            //   areaName: "",
            //   areaid: window.inquiryParamVO.areaid,
            //   businId: window.inquiryParamVO.businId,
            //   businTitle: encodeURIComponent($.trim(buyProduct.val())),
            //   comeUrl: window.location.href,
            //   companyName: "",
            //   isbusin: "",
            //   sellerProviderId: _this.defaultOptions.providerId,
            //   supcatId: window.inquiryParamVO.supcatId,
            //   supcatName: "",
            //   sysFlag: "",
            //   telPhone: $.trim(detailMP.val()),
            //   purchaseInfo:encodeURIComponent(moreDesc.val()),
            //   inquiryNum:$.trim(buyAmount.val()),
            //   deadline:$.trim(buyToDate.val()),
            //   product:encodeURIComponent(buyProduct.val()),
            //   type: 1,
            //   buyerSourceId: 'detail_short_inquiry',
            //   charset: 'utf8',
            //   mobileCheck:true, //是否检验手机号，完善提交页面都是校验手机号的
            //   unit:encodeURIComponent($.trim(buyUnit.val())) //采购单位
            // };
            _this.submitData(wrapper,data);
          }else if(res.code == 2){
            msgcodeInput.siblings('em.warning').show().html("<strong></strong>验证失败");
          }else if(res.code == 3){
            msgcodeInput.siblings('em.warning').show().html("<strong></strong>验证码错误");
          }else if(res.code == 4){
            msgcodeInput.siblings('em.warning').show().html("<strong></strong>验证失败已过期");
          }
        }).fail(function () {
          alert('网络异常，请稍后重试！')
        });


      })


    }

     /**
     * 校验短信验证码是否正确
     * @param wrap
     * @param msgCodeVal
     * @param mp
     */
    IAlert.prototype.checkMsgCode = function (wrap,msgCodeVal,mp) {
        return $.ajax({
          type: "GET",
          url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",
          dataType: "jsonp",
          contentType: "application/x-www-form-urlencoded; charset=utf-8",
          data: {
            code: msgCodeVal,
            phone: mp
          },
          timeout: 2000
        })
    }

    /**
     * 提交数据
     */
    IAlert.prototype.submitData = function (wrap,data) {

        var _this = this;
        $.when(_this.getweChatDef()).done(function(result){
            if(result && result.senceid){
                $.extend(data, { qrcodeid: result.senceid });
                $.ajax({
                    type: "GET",
                    url: "//my.b2b.hc360.com/my/turbine/action/favorites.Favorite_PurchaseAction/eventsubmit_doPerform/doPerform?",
                    dataType: "jsonp",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: data,
                    jsonp: "jsoncallback",
                    success: function(res) {
                      if (res && res.code == "yes") {
          
                          wrap.children(':not(".closeBtn")').remove();
                          var successHtml = [
                              '<div class="dAlertBoxCon2">',
                              '<div class="dSuccBox">',
                                  '<dl>',
                                      '<dt><em></em>发布成功！</dt>',
                                      '<dd>慧聪网会尽快派出采购专员1对1为您提供服务，请您保持电话畅通！</dd>',
                                  '</dl>',
                              '</div>',
                              '<div class="cardBoxBot2 grayBg">',
                                  '<dl>',
                                      '<dt>扫描下方二维码，关注慧聪采购，<b>实时接收优质供应商报价信息</b>！</dt>',
                                      '<dd><div class="codeImgNew"><img src="'+result.weChatPic+'"></div></dd>',
                                  '</dl>',
                              '</div>',
                          '</div>'
                          ];
                          wrap.append(successHtml.join(''));
          
                          _this.centerDialog(wrap.parent());
                      } else if (res && res.code == "self") {
                        alert("您不能给自己发询价单！");
                      } else {
                        alert("网络异常，请稍后重试！");
                      }
                    },
                    error: function() {
                      alert("网络异常，请稍后重试！");
                    }
                  })
            }else{
                console.log('接口返回异常！')
            }
        }).fail(function(){
            alert("网络异常，请稍后重试！");
        })
        
    }

    /**
     * 获取场景id和二维码
     * @returns {*}
     */
    IAlert.prototype.getweChatDef = function () {
        
        return $.ajax({
        url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_doinquerypicid/doInquerypicid",
        type: "GET",
        dataType: "jsonp",
        data:{
            imid:'hc360-hfb'//测试环境“test-cg”,正式环境“hc360-hfb”
        },
        jsonpCallback: 'callback'
        });
        
    }

    
    /**
     * 校验图形验证码
     */
    IAlert.prototype.checkValidCode = function (wrap,validCodeVal) {
        var _this = this;
        jQuery.ajax({
          type: "GET",
          url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
          dataType: "jsonp",
          data: {
            picCode: validCodeVal
          },
          timeout: 2000,
          async: false,
          success: function(res) {
  
            if (res.code == 0) {
              //验证成功
              wrap.find('[node-name="validate_input"]').siblings("em.warning").hide().html("<strong></strong>请输入验证码");
              //发送验证码,先校验手机号不为空
              if ($.trim(wrap.find('[node-name="detailMP"]').val()) == "") {
                wrap.find('[node-name="detailMP"]').siblings("em.warning").show();
              } else {
                _this.sendPhoneValiCode(wrap,$.trim(wrap.find('[node-name="validate_input"]').val()),$.trim(wrap.find('[node-name="detailMP"]').val()));
              }
            } else {
              //验证失败
              wrap.find('[node-name="validate_input"]').siblings("em.warning").show().html("<strong></strong>验证码错误");
            }
  
          },
          error: function() {
            alert("网络异常，请重试");
          }
        });
    }
    
    /**
     * 发送短信验证码
     * @param wrap
     * @param validCodeVal 图形验证码
     * @param mp 手机号
     */
    IAlert.prototype.sendPhoneValiCode = function(wrap,validCodeVal,mp) {
        var _this = this, timer;
        $.ajax({
          type: "GET",
          url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",
          dataType: "jsonp",
          contentType: "application/x-www-form-urlencoded; charset=utf-8",
          jsonp: "callback",
          data: {
            picCode: validCodeVal,
            phone: mp
          },
          timeout: 2000,
          async: false,
          success: function(res) {
            var msgCodeTip = wrap.find('#msgCodeTip');
            if (res.code == 1) { //发送手机验证码成功
              //按钮置灰，60秒后恢复
              wrap.find('#phoneGetCode').removeClass("codeBtnNew").addClass("codeBtnGray").attr("disabled");
              settime(wrap.find('#phoneGetCode'), 60); //发送按钮点击成功后置灰设置倒计时
            } else if (res.code == 2) {
              msgCodeTip.show().html("<strong></strong>每天发送次数超过上限");
            } else if (res.code == 3) {
              msgCodeTip.show().html("<strong></strong>发送验证码失败");
            } else if (res.code == 4) {
              msgCodeTip.show().html("<strong></strong>验证码失败，请重新获取");
            } else { //res==5
              msgCodeTip.show().html("<strong></strong>图形验证码不正确");
            }
          },
          error: function() {
            alert("网络异常，请重试");
          }
        });
  
  
        //按钮发送倒计时
        function settime(val, count) {
          if (count == 0) {
            val.removeAttr("disabled");
            val.html("免费获取验证码");
            wrap.find('#phoneGetCode').removeClass("codeBtnGray").addClass("codeBtnNew");
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
    }

    /**
     * 创建遮罩
     */
    IAlert.prototype.createMask = function(){
        var downWrap = $('.dAlertBoxBg');
        if (downWrap.length == 0) {
            downWrap = $('<div>', {
            'class': 'dAlertBoxBg'
            }).appendTo("body").show();
        } else {
            downWrap.show();
        }
    }
    

    /**
     * 使弹框居中
     */
    IAlert.prototype.centerDialog = function(opt){
        var winH = $(window).height();
        var winW = $(window).width();
        var hScroll = $(window).scrollTop();
        var selfH = opt.height();
        var selfW = opt.width();
        winH = winH < selfH ? selfH + 100 : winH;
        opt.css({
        "position": "absolute",
        "left": (winW - selfW) / 2 + "px",
        "top": (winH - selfH) / 2 + hScroll + "px"
        })

    }


})(jQuery)