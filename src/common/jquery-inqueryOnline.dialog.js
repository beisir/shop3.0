/**
 * Created by xyh on 2017/8/22.
 */
(function ($) {
  $.fn.queryDialog = function (options) {

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
      companyName:window.infoname || ''
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
        url: "http://madata.hc360.com/mobileweb/m/get/bindstatus",
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
        url:'http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg',
        type:'GET',
        timeout:3000,
        data:{
          buyid:$.cookie('LoginID') ? $.cookie("newhcproviderid") || $.cookie('hc360_userid') : $.cookie("HC_anonyBuyerId") || '',//买家信息，该值从cookie里取，未取到说明是新用户
          isLogon: $.cookie('LoginID') ? "1":"0",
          spid:window.scyps.sc.providerId || ''
        },
        dataType:"jsonp",
        jsonpCallback:'callback'
      });
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

          //用旧的场景id获取旧的二维码
          var codeUrlDom = $('span[ele-type="closeWindow"]');
          $.when(_this.getCodeUrlBySceneid(sceneid)).done(function (res) {
            codeUrlDom.attr('data-picurl',res.weChatPic);
          }).fail(function () {
            //获取失败时，还用默认的二维码
            codeUrlDom.attr('data-picurl','http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png');
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
     * 初始化弹层html
     */
    createDialogHtml:function () {

      var _this = this,
          downWrap = $('.dAlertBoxBg');

      _this.defaultOptions.element.on('click',function () {

        /**
         * 先创建遮罩
         */
        if (downWrap.length == 0) {
          downWrap = $('<div>', {
            'class': 'dAlertBoxBg consultBg'
          }).appendTo("body").show();
        } else {
          downWrap.show();
        }

        /**
         * 再创建弹层内容
         */
        if(_this.is3y){

          var consultWrap = $("<div>", {
            "class": "Consultation",
            "data-startTime":_this.getDateTime(true)
          }).appendTo("body").show();

          var fixStr = [

            '<div class="ConsultationCon">',

              '<div class="mTitle">',
                '<div class="mTitLeft">',
                    '<em></em>',
                    '<span>小慧</span>',
                    '<span class="borLeft">'+ _this.companyName +'</span>',
                '</div>',
                '<span class="mCloseBtn">关闭</span>',
              '</div>',


              '<div class="ConsulCon">',
                '<div class="ConsulBox">',

                  '<div class="clTop"></div>',

                  '<div class="clBot">',
                              '<div class="clBotText">',
                                '<textarea name="" placeholder="请在此直接输入您要采购的产品及其他需求"></textarea>',
                                '<p class="textareaLen">还可以输入150字</p>',
                                '<p class="ProhibitedTxt" style="display: none;"><strong></strong>内容含有违禁词</p>',
                              '</div>',
                  '</div>',

                  '<div class="clBotInput">',
                                '<div id="mobilephoneCon">',
                                    '<span><em>*</em>电话号码</span>',
                                    '<div class="bInputBox">',
                                      '<input type="text" style="color: rgb(162, 162, 162);" value="请输入手机号码" name="MP" data-node-name="MP">',
                                      '<em class="c-red warning isNull" style="display: inline;"><strong></strong>手机号不能为空</em>',
                                      '<em class="c-red warning isError" style="display: inline;"><strong></strong>请填写正确的手机号</em>',
                                    '</div>',
                                '</div>',
                                '<div id="validcodeCon" style="display:none;">',
                                    '<span><em>*</em>验证码</span>',
                                    '<div class="clCode">',
                                      '<input type="text" class="w210" style="color:#999999;" value="验证码" data-node-name="validCodeInput">',
                                      '<em class="c-red warning isNull"><strong></strong>验证码不为空</em>',
                                      '<em class="c-red warning isError"><strong></strong>验证码错误</em>',
                                      '<span class="clCodeImg"><img src="http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="></span>',
                                    '</div>',
                                '</div>',
                                '<button type="submit">发送</button>',
                  '</div>',

                '</div>',
              '</div>',
            '</div>'
          ];

          $('.Consultation').append(fixStr.join(''));

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

        }else{

        }

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

  }
})(jQuery);
