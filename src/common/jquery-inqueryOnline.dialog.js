/**
 * Created by xyh on 2017/8/22.
 */
(function ($) {
  $.fn.queryDialog = function (options) {

    if (typeof $.cookie != "function") {
      $.getScript('//style.org.hc360.cn/js/build/source/widgets/jquery.cookie.js');
    }

    return this.each(function (idx,_this) {
      $.extend(true,options,{element:$(_this)});
      var qDialog = new QDialog(options);
      qDialog.init();
    })
  };

  var QDialog = function (options) {

    this.defaultOptions = {

      /**是否是3y页面，默认不是*/
      is3y:false,

      /**是否绑定微信，默认不绑定*/
      isBindWX:false,

      /**当前元素*/
      element:'',

      /**公司名称*/
      companyName: '',

      /**定时器*/
      interval:'',

      /**在线咨询弹框最外包裹层*/
      consultContainer:'',

      providerId:''
    };
    $.extend(this.defaultOptions,options);
  };

  QDialog.prototype = {

    init:function () {
      this.createDialogHtml();
    },

    /**
     * 用户是否绑定延迟对象
     */
    bindStatusDef:function () {
      return $.ajax({
        url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
        dataType:"jsonp",
        data:{"imid":window.company_username || window.welfarename || window.userName }
      })
    },

    /**
     * 请求获取在线咨询的聊天内容接口
     */
    getMsgContent:function () {
      var _this = this;
      return $.ajax({
        url:'//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg',
        type:'GET',
        timeout:5000,
        data:{
          buyid:$.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
          isLogon: $.cookie('LoginID') ? "1":"0",
          spid:_this.defaultOptions.providerId
        },
        dataType:"jsonp",
        jsonpCallback:'callback'
      });
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
          senceid:sceneid,
          imid:'hc360-hfb'//测试环境“test-wsc”,正式环境“hc360-hfb”
        },
        dataType:"jsonp",
        jsonpCallback:'callback'
      })
    },

    /**
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

          /*if((res.length)%5 == 0){//默认验证码不显示，模5需要输入验证码
            $('#validcodeCon').show().find('.clCodeImg').trigger('click');
            $('#validcodeCon').find('[data-node-name="validCodeInput"]').val("");
            $('#validcodeCon').find('em.warning').hide();
          }else{
            $('#validcodeCon').hide();
            //$("#mobilephoneCon").show();
          }*/

          //用旧的场景id获取旧的二维码
          var codeUrlDom = $('[node-name="friendlyTip"]').find('dl dt img');

          if(_this.defaultOptions.isBindWX){
            $.when(_this.getCodeUrlBySceneid(sceneid)).done(function (res) {
              if(res && res.weChatPic){
                codeUrlDom.attr('src',res.weChatPic);
              }else{
                //还用默认的二维码
                codeUrlDom.attr('src','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg');
              }

            }).fail(function () {
              //获取失败时，还用默认的二维码
              codeUrlDom.attr('src','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg');
            })
          }else{
            codeUrlDom.attr('src','//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg');
          }


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
     * 获取微信场景id和二维码延迟对象
     */
    getChatWXDef:function () {
      return $.ajax({
        url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",
        type:"GET",
        dataType:"jsonp",
        jsonpCallback:'callback',
        data:{imid:'hc360-hfb'}//测试环境“test-wsc”,正式环境“hc360-hfb”
      })
    },

    /**
     * 获取微信绑定状态延迟对象
     */
    getBindStatusDef:function () {
      return $.ajax({
        url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
        dataType:"jsonp",
        data:{"imid":window.company_username||window.welfarename || window.userName }
      })
    },

    /**
     * 初始化弹层html
     */
    createDialogHtml:function () {

      var _this = this,
          downWrap = $('.dAlertBoxBg');

      _this.defaultOptions.element.on('click',function () {

        var $this = $(this),sceneid='',codeUrl='//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg';

        //防止重复提交
        if($this.attr('isopen')){
          return false;
        }

        $this.attr('isopen',true);

        $.when(_this.getChatWXDef()).done(function (res) {

          if(res && res.senceid){
            sceneid=res.senceid;
            codeUrl=res.weChatPic;
          }

          /**
           * 先创建遮罩
           */
          $('<div>', {
            'class': 'dAlertBoxBg consultBg'
          }).appendTo("body").show();
          /*if (downWrap.length == 0) {
            downWrap = $('<div>', {
              'class': 'dAlertBoxBg consultBg'
            }).appendTo("body").show();
          } else {
            downWrap.show();
          }*/

          /**
           * 再创建弹层内容
           */
          if(!_this.defaultOptions.is3y){

            $.when(_this.getBindStatusDef()).done(function (res) {

              if(res && res.code=="200"){
                _this.defaultOptions.isBindWX = true;
              }

              var tipWord = '商家回复慢？<br>可扫码微信接收回复信息';
              if(!_this.defaultOptions.isBindWX){
                tipWord = '关注慧聪采购<br>找好货，更方便';
              }

              _this.defaultOptions.consultContainer = $("<div>", {
                "class": "Consultation",
                "data-node-name":"queryDialog",
                "data-startTime":_this.getDateTime(true)
              }).appendTo("body").show();
              var consultWrap = _this.defaultOptions.consultContainer;
              var fixStr = [

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
                '<dt><img src="'+ codeUrl +'"></dt>',
                '<dd>'+ tipWord +'</dd>',
                '</dl>',
                '</div>',
                '</div>',
              ];

              consultWrap.append(fixStr.join(''));

              //获取聊天记录
              _this.getHistoryMsg(function () {
                /**
                 * 聊天窗口只要一打开，有无聊天记录都在后面添加一句问候语
                 * @type {[*]}
                 */
                var hiMsg = [
                  '<div class="clBoxLeft">',
                  '<em class="clImg"></em>',
                  '<div class="clImgRig">',
                  '<p class="clTime">店经理  '+_this.getDateTime(true)+'</p>',
                  '<div class="ConsulList">',
                  '<em></em>',
                  '<p>你好，欢迎光临'+_this.defaultOptions.companyName+'，请发送您要咨询的内容。</p>',
                  '</div>',
                  '</div>',
                  '</div>'
                ];
                $("#cInnerBox").append(hiMsg.join('')).scrollTop( $('#cInnerBox')[0].scrollHeight );
                var buyid = $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || ''
                $("#validcodeCon").find('.clCodeImg img').attr('src','//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date()+'&buyid='+buyid);
              });

              if(_this.defaultOptions.isBindWX){

                /**
                 * 每隔10s请求获取聊天记录接口
                 * @type {number}
                 */
                _this.defaultOptions.interval = setInterval(function () {
                  _this.loopGetMsgPer10s(consultWrap);
                },10000);
              }

              _this.bindEvent(consultWrap);

            }).fail(function () {
              console.warn("获取微信绑定状态失败，请稍后重试！")
            });



          }else{

                    _this.defaultOptions.consultContainer = $("<div>", {
                      "class": "Consultation syConsul",
                      "data-node-name":"queryDialog",
                      "data-startTime":_this.getDateTime(true)
                    }).appendTo("body").show();
                    var consultWrap = _this.defaultOptions.consultContainer;
                    var fixStr = [

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
                      '</div>',
                    ];

                    consultWrap.append(fixStr.join(''));

                    _this.getHistoryMsg(function () {
                      /**
                       * 聊天窗口只要一打开，有无聊天记录都在后面添加一句问候语
                       * @type {[*]}
                       */
                      var hiMsg = [
                        '<div class="clBoxLeft">',
                        '<em class="clImg"></em>',
                        '<div class="clImgRig">',
                        '<p class="clTime">店经理  '+_this.getDateTime(true)+'</p>',
                        '<div class="ConsulList">',
                        '<em></em>',
                        '<p>你好，欢迎光临'+_this.defaultOptions.companyName+'，请发送您要咨询的内容。</p>',
                        '</div>',
                        '</div>',
                        '</div>'
                      ];
                      $("#cInnerBox").append(hiMsg.join('')).scrollTop( $('#cInnerBox')[0].scrollHeight );
                      var buyid = $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || ''
                      $("#validcodeCon").find('.clCodeImg img').attr('src','//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date()+'&buyid='+buyid);
                    });

                    _this.bindEvent(consultWrap);

          }
        }).fail(function () {
          alert('网络异常，请稍后重试！')
        });


      });

    },

    /**
     * 事件绑定及校验
     */
    bindEvent:function (wrap) {

      var _this = this,
          focusColor = '#333333',
          blurColor = '#a2a2a2';

      wrap.find('.clCodeImg').trigger('click');

      /**
       * 校验textarea、电话号码、验证码
       * @type {{MP: {selector: string, defaultValue: string, reg: RegExp, notInput: RegExp, maxLen: number}, contentArea: {selector: string, defaultValue: string, notInput: RegExp, maxLen: number}, validCode: {selector: string, defaultValue: string, notInput: RegExp, maxLen: number, isMast: boolean}}}
       */
      var elements = {

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
          defaultValue:'验证码',
          notInput:/\D+/g,
          maxLen: 4,
          isMast:true
        }
      };
      $.each(elements, function(key, val) {
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
          $(this).closest('div').find('.warning').hide();
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
            $(this).closest('div').find('[data-node-name="maxLen"]').html('还可以输入' + (val.maxLen - eleVal.length) + '字');
          }
        });
      });

      /**
       * 错误提示，提示消失，输入框获得焦点
       */
      wrap.find('.warning').on('click', function() {
        $(this).closest('div').find('[data-node-name]').focus();
      });

      /**
       * 弹框的关闭
       */
      wrap.find('[data-node-nane="closeInqueryDialog"]').on('click',function () {
        //wrap.siblings('.dAlertBoxBg').hide();
        wrap.siblings('.dAlertBoxBg').remove();
        wrap.remove();

        /**
         * 弹框关闭时，将isopen删除
         */
        _this.defaultOptions.element.removeAttr('isopen');

        /**
         * 弹框关闭时，外层包裹元素清空
         * @type {string}
         */
        _this.defaultOptions.consultContainer = '';

        /**
         * 在线咨询弹窗关闭时，请求获取聊天记录停止
         */
        if(_this.defaultOptions.interval){
          clearInterval(_this.defaultOptions.interval);
        }
      });

      /**
       * 查看更多历史记录
       */
      wrap.find("#cInnerBox").on('click','p.moreList',function () {

        var $this = $(this);
        var minMsgId = $(this).next('div').attr('data-id') || $(this).next('div.moreHistory').children(':first').attr('data-id');//最早的消息id

        $.ajax({
          url:"//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",
          type:"GET",
          timeout:3000,
          data:{
            isLogon : $.cookie('LoginID') ? "1":"0",
            buyid: $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',
            spid:_this.defaultOptions.providerId,
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

      /**
       * 验证码点击图片换一换
       */
      wrap.on('click','.clCodeImg',function () {
        var buyid = $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '';
        $(this).find('img').attr('src','//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date().getTime()+'&buyid='+buyid);
      });

      /**
       * 发送按钮事件
       */
      wrap.find('[data-node-name="subtn"]').click(function() {
        var $this = $(this);

        $this.addClass('cGrayBtn').attr("disabled", "disabled");
        _this.sendEvent($this.attr("data-sceneid") || '',wrap,elements);
      });


    },

    /**
     * 发送按钮事件
     */
    sendEvent:function (sceneid,wrap,elements) {



      var _this = this,
        flag=true,//校验标志
        contentWrap = $(elements.contentArea.selector), //聊天内容
        mpWrap = $(elements.MP.selector),//联系人电话
        companyCount='',//公司名称
        contacter = '',
        phoneZone = wrap.find("#mobilephoneCon"),//手机号container
        validCodeZone = wrap.find('#validcodeCon');//验证码container

      $.each(elements, function(key, val) {
        $(val.selector).focus().blur();
      });

      /**
       * 聊天内容不为空
       */
      if($.trim(contentWrap.val()) == ""){
        //验证码换一换
        //wrap.find('.clCodeImg').trigger('click');
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

      if(flag){
        sendMessage();
        /*if(validCodeZone.is(':visible')){
          //验证码区域可见才校验验证码，否则直接发送聊天请求
          //验证通过之后向后台发送请求校验验证码是否正确，验证码正确之后，再发送聊天请求
          $.ajax({
            type: "GET",
            url: "//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",
            dataType: "jsonp",
            data:{
              picCode:$.trim($(elements.validCode.selector).val())
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
                validCodeZone.find('.clCodeImg img').attr('src','http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date='+new Date().getTime());
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
        }*/

      }else{//有警告信息时，再将发送按钮置为可用状态

        wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
      }

      function sendMessage() {
        $.ajax({
          url:"//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doSendmsg/doSendmsg",
          type:"GET",
          timeout:5000,
          data:{
            isLogon : $.cookie('LoginID') ? "1":"0",
            buyid: $.cookie('LoginID') ? ($.cookie("newhcproviderid") || $.cookie('hc360_userid')) : ($.cookie("HC_anonyBuyerId")  || ''),
            spid:_this.defaultOptions.providerId,
            MP:encodeURIComponent(mpWrap.val()),
            plantitle:encodeURIComponent(contentWrap.val()),
            contacter:encodeURIComponent(contacter),
            introduce:encodeURIComponent(contentWrap.val()),
            comeUrl:window.location.href,
            qrcodeid:sceneid,
            picCode:$.trim($(elements.validCode.selector).val()) == "验证码" ? '' :$.trim($(elements.validCode.selector).val())
          },
          dataType:"jsonp",
          jsonpCallback:'callback',
          success:function(res){
            if(res){

              if(res.code == 0){
                alert("发送失败，稍后重试！");
                wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
              }else if(res.code == 1){

                var isAppear = wrap.find('[data-node-name="subtn"]').attr("isappear");
                if(isAppear){
                  /**
                   * 友情提示框闪现
                   */
                  wrap.find('[node-name="friendlyTip"]').addClass('left530');
                }

                if(res.cntADay > 0){
                  //首次之后手机号不用再输
                  phoneZone.hide();

                  //发送成功之后内容框字数还原
                  contentWrap.siblings('p.textareaLen').text('还可以输入150字');

                  if((res.cntADay)%5 == 0){//默认验证码不显示，模5需要输入验证码
                    validCodeZone.show().find('.clCodeImg').trigger('click');
                    validCodeZone.find('[data-node-name="validCodeInput"]').val("");
                    validCodeZone.find('em.warning').hide();
                  }else{
                    validCodeZone.hide();
                  }

                  //消息发送成功后，将消息渲染到面板上
                  _this.renderMessageContent(res.msgId,elements);

                  //3y页面出现提示语
                  if(!_this.defaultOptions.isBindWX  || _this.defaultOptions.is3y ){
                    var tip = [
                      '<div class="clBoxLeft">',
                      '<em class="clImg"></em>',
                      '<div class="clImgRig">',
                      '<p class="clTime">店经理  '+_this.getDateTime(true)+'</p>',
                      '<div class="ConsulList">',
                      '<em></em>',
                      '<p>保持电话畅通，商家会电话联系您。关注慧聪采购，找好货更方便！</p>',
                      '</div>',
                      '</div>',
                      '</div>'
                    ];

                    setTimeout(function () {
                      $("#cInnerBox").append(tip.join('')).scrollTop( $('#cInnerBox')[0].scrollHeight);
                    },1000);

                  }

                  //滚动条滚到最底部
                  $("#cInnerBox").scrollTop( $('#cInnerBox')[0].scrollHeight);

                  //将发送按钮置为可用状态,是否出现友情提示框标志清除
                  wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled").removeAttr("isappear");

                }

              }else if(res.code == 3){
                alert("您不能给自己发留言！");
                wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
              }else if(res.code == 5){

                /*if((res.cntADay)%5 == 0){//默认验证码不显示，模5需要输入验证码
                  validCodeZone.show().find('.clCodeImg').trigger('click');
                  validCodeZone.find('[data-node-name="validCodeInput"]').val("");
                  validCodeZone.find('em.warning').hide();
                }else{
                  validCodeZone.hide();
                }*/
                //错误信息提示
                validCodeZone.find('.clCode em.isError').show();
                //验证码图片更换
                var buyid = $.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || ''
                validCodeZone.find('.clCodeImg img').attr('src','//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+ new Date().getTime()+'&buyid='+buyid);
                //发送按钮置为可用状态
                $('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
              }
              else{
                alert("留言次数超限，稍后重试！");
                wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
              }

            }
          },
          error:function(res){
            wrap.find('button[data-node-name="subtn"]').removeClass('cGrayBtn').removeAttr("disabled");
            alert('网络异常，请稍后重试！');
          }
        })
      }
    },

    /***
     * 留言成功后
     * @constructor
     */
    renderMessageContent: function(msgId,elements) {
      var _this = this;

      var MessageStr = '<div class="clBoxRig inputCount" data-id="'+ msgId +'">' +
        '<em class="clImg"></em>' +
        '<div class="clImgRig">' +
        '<p class="name clTime">我 ' + _this.getDateTime(true) + '</p>' +
        '<div class="ConsulList">' +
        '<em></em>' +
        '<p>' + $(elements.contentArea.selector).val() + '</p>' +
        '</div>' +
        '</div>' +
        '</div>';


      $('#cInnerBox').append(MessageStr);

      //清空输入框
      $(elements.contentArea.selector).val('');
      $.each(elements, function(key, val) {
        $(val.selector).css('color', 'gray');
      });
    },

    /**
     * 每隔10s中请求获取在线咨询的聊天内容
     */
    loopGetMsgPer10s:function (wrap) {

      var _this = this;
      $.ajax({
        url:'//my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGetpollintervalmsg/doGetpollintervalmsg',
        type:'GET',
        timeout:5000,
        data:{
          buyid:$.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
          isLogon: $.cookie('LoginID') ? "1":"0",
          spid:_this.defaultOptions.providerId,
          maxBpID:wrap.find('#cInnerBox').children(".clBoxRig:last").attr('data-id') || '',
          maxSpID:wrap.find('#cInnerBox').children(".clBoxLeft[data-id]:last").attr('data-id') || ''
        },
        dataType:"jsonp",
        jsonpCallback:'callback',
        success:function (res) {
          //为了防止页面恰好轮询，此时关闭了聊天窗口，再进行以下逻辑js报错
          if(!_this.defaultOptions.consultContainer){
            return false;
          }

          var innerBox = wrap.find("#cInnerBox");

          if(res && res.length > 0){
            var msgList = res,
              lastMsgTime='';
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
                innerBox.append(buyerMsg.join(''));

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
                innerBox.append(sellerMsg.join(''));
              }

              if(i == msgList.length - 1){//有轮询数据返回时，轮询的最后一条数据时间为基准点
                lastMsgTime = msgList[i].createtime;
              }

            }

            /**
             * 使聊天记录窗口滚动条滚到最底部
             */
            innerBox.scrollTop( $('#cInnerBox')[0].scrollHeight );

          }else{//无轮询数据返回时，则默认最新的数据时间为基准点

            lastMsgTime = innerBox.children("[data-id]:last").find('p.clTime span').text();

          }

          /**
           * 比较打开窗口时间和聊天最新记录时间最大的作为弹窗关闭基准点时间
           */
          var startDialogTime = $('.Consultation:visible').attr('data-starttime');//聊天窗口打开时间
          var timeLevel = compareToGetMaxDate(startDialogTime,lastMsgTime);//获取基准点时间
          var currentDate = _this.getDateTime(true);//当前时间

          //获取当前时间和基准点时间之差
          var timeDiff = _this.getDateDifference(timeLevel,currentDate);

          //如果时间差超过30分钟，则关闭该聊天窗口给予友情提示
          if(timeDiff >= 30){

            wrap.find('[data-node-nane="closeInqueryDialog"]').trigger("click");

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

  }
})(jQuery);
