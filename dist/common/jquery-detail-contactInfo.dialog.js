!function(e){function n(t){if(i[t])return i[t].exports;var o=i[t]={exports:{},id:t,loaded:!1};return e[t].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var i={};return n.m=e,n.c=i,n.p="//style.org.hc360.cn/js/module/shop3.0/dist/",n(0)}([function(e,n){!function(){$.fn.contactDialogDetail=function(n){return this.each(function(i,t){$.extend(!0,n,{element:$(t)});var o=new e(n);o.init()})};var e=function(e){this.defaultOptions={is3y:!0,element:"",isLogin:!1,contactInfo:{},inquiryTitle:"",isbusin:2,isAlbum:!1,providerId:"",businessId:"",checkMPClick:"",noAnswerClick:"",sendPhoneClick:"",submitAllClick:""},$.extend(this.defaultOptions,e)};e.prototype={init:function(){this.createDialogHtml()},createDialogHtml:function(){var e=this,n="";e.defaultOptions.element.on("click",function(){var i=e.seriesTelphone(e.defaultOptions.contactInfo.mp),t=i[1];e.defaultOptions.showTelephone=i[0],e.defaultOptions.showText=i[2];var o=$.Deferred();e.defaultOptions.isLogin?$.when(e.getQRcodeByLogin()).done(function(e){o.resolve(e)}):o.resolve(['<div class="cardBoxBot" node-name="noLoginBox">',"<dl>","<dt>\u8bf7\u9a8c\u8bc1\u60a8\u7684\u624b\u673a\u53f7\u7801\uff0c\u5373\u523b<b>\u83b7\u53d6\u516c\u53f8\u540d\u7247</b>\uff0c\u5e76\u83b7\u5f97\u66f4\u591a<b>\u5b9e\u529b\u5546\u5bb6\u62a5\u4ef7</b>\uff01</dt>","<dd>",'<input type="text" maxlength="11" node-name="phoneText" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801"><button type="submit" onclick="HC.UBA.sendUserlogsElement(\''+e.defaultOptions.checkMPClick+e.defaultOptions.businessId+'\');" id="checkMobilePhone">\u9a8c\u8bc1</button>','<em class="warning"><strong></strong>\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801</em>',"</dd>","</dl>","</div>"].join("")),e.createMask(),n=$("<div>",{"class":"check-num-box"}),o.done(function(i){var o=e.defaultOptions.showText.length>2?"letter-spacing:0.5em;margin-right:-0.5em":"letter-spacing: 2em;margin-right:-0.5em;",a=['<div class="check-num" node-name="pageOneBox">','<div class="title" node-name="titleBox"><span class="t-left"></span>\u516c\u53f8\u540d\u7247'+(e.defaultOptions.isLogin?'<span class="sent-me"><em></em><a href="javascript:void(0)" node-name="sendMyPhoneBtn" onclick="HC.UBA.sendUserlogsElement(\''+e.defaultOptions.sendPhoneClick+e.defaultOptions.businessId+"');\">\u53d1\u9001\u5230\u6211\u624b\u673a</a></span> ":"")+"</div>",'<a class="closeBtn"></a>','<div class="contactBoxNew" node-name="pageOneContactBox">','<div class="cardBox" node-name="cardBox">'+(e.defaultOptions.isLogin?'<a href="javascript:void(0)" class="telRigLinkNew" node-name="noReplyBtn" onclick="HC.UBA.sendUserlogsElement(\''+e.defaultOptions.noAnswerClick+e.defaultOptions.businessId+"');\">\u7535\u8bdd\u65e0\u4eba\u63a5\u542c\u600e\u4e48\u529e\uff1f</a>":""),'<div class="cardBoxList">','<div class="pListNew tel2">','<b></b><span style="'+o+'">'+e.defaultOptions.showText+'</span><em class="c-red" node-name="sellername"> <s>\uff1a</s>'+(e.defaultOptions.isLogin?e.defaultOptions.showTelephone:t)+"</em>","</div>",'<div class="pListNew name">','<b></b><span style="letter-spacing:0.5em;margin-right:-0.5em">\u8054\u7cfb\u4eba</span><em>\uff1a'+e.defaultOptions.contactInfo.contactor+"</em>","</div>",'<div class="pListNew sate">',"<b></b><span>\u516c\u53f8\u540d\u79f0</span><em>\uff1a"+e.defaultOptions.contactInfo.companyname+"</em>","</div>","</div>","</div>",i+"</div>","</div>"];n.append(a.join("")).appendTo("body").show(),e.centerDialog(n),e.bindEvent(n)})})},getQRcodeByLogin:function(e){var n=this,i=$.Deferred(),t="";inquiryParamVO.businTitle=inquiryParamVO.businTitle?inquiryParamVO.businTitle.length<1?encodeURIComponent(n.defaultOptions.inquiryTitle):inquiryParamVO.businTitle:encodeURIComponent(n.defaultOptions.inquiryTitle);var o=inquiryParamVO;return o.contact=encodeURIComponent(window.companyContactor||""),o.CompanyName=encodeURIComponent(window.infoname||""),o.comeUrl=window.location.href,o.isbusin=n.defaultOptions.isbusin,o.type=2,o.buyerSourceId="detail_information",2==n.defaultOptions.isbusin&&(o.supcatName=encodeURIComponent(window.lastClass)),e&&e.length>0&&(o.telPhone=e),$.when(n.getweChatDef()).done(function(e){e&&e.senceid&&($.extend(o,{qrcodeid:e.senceid}),$.ajax({type:"get",url:"//my.b2b.hc360.com/my/turbine/action/favorites.Favorite_PurchaseAction/eventsubmit_doPerform/doPerform?",data:o,dataType:"jsonp",jsonp:"jsoncallback",timeout:3e3,success:function(n){t=['<div class="cardBoxBot2">',"<dl>","<dt>\u626b\u63cf\u4e0b\u65b9\u4e8c\u7ef4\u7801\uff0c\u53d1\u9001<b>\u516c\u53f8\u540d\u7247</b>\u81f3\u624b\u673a\uff0c\u5e76\u5b9e\u65f6\u63a5\u6536<b>\u5356\u5bb6\u56de\u590d</b>\uff01</dt>",'<dd><div class="codeImgNew"><img src="'+e.weChatPic+'"></div></dd>',"</dl>","</div>"].join(""),i.resolve(t)},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01"),i.resolve("")}}))}).fail(function(){console.warn("Failed to get data,Please try again!"),i.resolve("")}),i},bindEvent:function(e){var n=this,i=e.find('input[node-name="phoneText"]');i.keyup(function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){""==this.value?$(this).siblings("em.warning").show():/^1(3|5|7|8)\d{9}$/.test(this.value)||$(this).siblings("em.warning").show()}),i.siblings("em.warning").on("click",function(){$(this).hide(),i.focus()}),e.on("click","#checkMobilePhone",function(){var t=$(this);return!t.attr("disabled")&&(t.attr("disabled",!0),""==$.trim(i.val())?(t.siblings("em.warning").show(),t.removeAttr("disabled"),!1):t.siblings("em.warning").is(":visible")?(t.removeAttr("disabled"),!1):void $.when(n.getQRcodeByLogin(i.val())).done(function(i){i&&i.length>0&&(e.find('[node-name="noLoginBox"]').replaceWith(i),e.find('[node-name="sellername"]').text("\uff1a"+n.defaultOptions.showTelephone),e.find('[node-name="titleBox"]').append('<span class="sent-me"><em></em><a href="javascript:void(0)" node-name="sendMyPhoneBtn" onclick="HC.UBA.sendUserlogsElement(\''+n.defaultOptions.sendPhoneClick+n.defaultOptions.businessId+"');\">\u53d1\u9001\u5230\u6211\u624b\u673a</a></span>"),e.find('[node-name="cardBox"]').prepend('<a href="javascript:void(0)" class="telRigLinkNew" node-name="noReplyBtn" onclick="HC.UBA.sendUserlogsElement(\''+n.defaultOptions.noAnswerClick+n.defaultOptions.businessId+"');\">\u7535\u8bdd\u65e0\u4eba\u63a5\u542c\u600e\u4e48\u529e\uff1f</a>")),t.removeAttr("disabled")}))}),e.on("click",'[node-name="sendMyPhoneBtn"]',function(){e.find('[node-name="pageOneContactBox"],[node-name="noReplyBox"]').hide(),e.find('[node-name="pageOneBox"] [node-name="sendMyPhoneBox"]').length>0?(e.find('[node-name="sendMyPhoneBox"]').show(),e.find('[node-name="sendMyPhoneBox"]').children(":eq(0)").show(),e.find('[node-name="sendMyPhoneBox"]').children(":gt(0)").hide(),e.find('[node-name="telText"],[node-name="validCodeText"]').val(""),e.find("p.hide").hide()):e.find('[node-name="pageOneBox"]').append(n.createSendMyPhoneHtml()),n.refreshValidcode(e.find('[node-name="sendMyPhoneBox"]')),n.bindSendMyPhoneEvent(e.find('[node-name="sendMyPhoneBox"]'),e)}),e.on("click",'[node-name="noReplyBtn"]',function(){e.find('[node-name="pageOneContactBox"],[node-name="sendMyPhoneBox"]').hide(),e.find('[node-name="pageOneBox"] [node-name="noReplyBox"]').length>0?(e.find('[node-name="noReplyBox"]').show(),e.find('[node-name="noReplyBox"]').children(":eq(0)").show(),e.find('[node-name="noReplyBox"]').children(":gt(0)").hide(),e.find('[node-name="noReplyBox"] [node-name="mpText"]').val(""),e.find('[node-name="noReplyBox"] em.warning').hide()):e.find('[node-name="pageOneBox"]').append(n.createNoReplyHtml()),n.bindNoReplyEvent(e.find('[node-name="noReplyBox"]'),e)}),e.on("click",'[node-name="pageOneBox"] a.closeBtn',function(){e.find('[node-name="pageOneBox"]').hide(),e.append(n.createPageTwoHtml()),n.centerDialog(e),n.bindPageTwoEvent(e)}),e.on("click",'[node-name="pageTwoBox"] a.closeBtn',function(){e.remove(),$(".dAlertBoxBg").remove()})},createPageTwoHtml:function(){var e=this,n=['<div class="check-num" node-name="pageTwoBox">','<a class="closeBtn"></a>','<div class="dAlertBoxCon2">','<div class="dSuccBox">',"<dl>","<dt>\u5b8c\u5584\u8be2\u4ef7\u5355\u4fe1\u606f</dt>","<dd>\u6709\u52a9\u4e8e\u66f4\u5feb\u901f\u7684\u4e3a\u60a8\u5339\u914d\u6ee1\u610f\u7684\u4f9b\u5e94\u5546\uff01</dd>","</dl>","</div>",'<div class="freeConBox">',"<ul>","<li>","<span><b>*</b>\u91c7\u8d2d\u4ea7\u54c1\uff1a</span>",'<div class="fConRig xjIBox">','<input type="text" class="telInput" node-name="buyProduct">','<em class="warning" style="display: none;"><strong></strong>\u8bf7\u8f93\u5165\u4ea7\u54c1\u540d\u79f0</em>',"</div>","</li>","<li>","<span><b>*</b>\u91c7\u8d2d\u6570\u91cf/\u5355\u4f4d\uff1a</span>",'<div class="fConRig xjIBox  zIndex5">','<input type="text" class="telInput w120" node-name="buyAmount" placeholder="\u91c7\u8d2d\u6570\u91cf" maxlength="6">','<div class="seleCon2" node-name="unitBox">','<div class="tsCon">\t<input class="sec-p" placeholder="\u5355\u4f4d" node-name="buyUnit" maxlength="6">\t<s></s></div>','<ul class="seleList" style="display:none">',"<li>\u628a</li><li>\u5305</li><li>\u672c</li><li>\u90e8</li><li>\u6253</li><li>\u888b</li><li>\u5355</li><li>\u540a</li><li>\u9876</li><li>\u5bf9</li><li>\u7ec4</li><li>\u5c0a</li>","<li>\u5428</li><li>\u5e45</li><li>\u4e2a</li><li>\u6839</li><li>\u516c\u65a4</li><li>\u516c\u5347</li><li>\u7f50</li><li>\u6beb\u7c73</li><li>\u6beb\u5347</li><li>\u76d2</li><li>\u5ea7</li>","<li>\u67b6</li><li>\u4ef6</li><li>\u8282</li><li>\u5177</li><li>\u5377</li><li>\u5361</li><li>\u68f5</li><li>\u9897</li><li>\u514b</li><li>\u5757</li><li>\u6b3e</li><li>\u682a</li>","<li>\u5398\u7c73</li><li>\u7acb\u65b9</li><li>\u7acb\u65b9\u6839</li><li>\u7c92</li><li>\u8f86</li><li>\u8def</li><li>\u7801</li><li>\u679a</li><li>\u7c73</li><li>\u9762</li><li>\u76c6</li>","<li>\u7247</li><li>\u7968</li><li>\u5e73\u65b9\u5398\u7c73</li><li>\u5e73\u65b9\u7c73</li><li>\u5e73\u65b9\u5e02\u5c3a</li><li>\u5e73\u65b9\u82f1\u5c3a</li><li>\u74f6</li><li>\u5343\u514b</li><li>\u5347</li><li>\u675f</li>","<li>\u53f0</li><li>\u53cc</li><li>\u5957</li><li>\u6761</li><li>\u6876</li><li>\u5934</li><li>\u7bb1</li><li>\u82f1\u5bf8</li><li>\u76cf</li><li>\u5f20</li><li>\u652f</li><li>\u53ea</li>","</ul>","</div>",'<em class="warning w120" style="display: none;"><strong></strong>\u8bf7\u8f93\u5165\u91c7\u8d2d\u6570\u91cf</em>','<em class="warning w100" style="display: none;"><strong></strong>\u8bf7\u9009\u62e9\u5355\u4f4d</em>',"</div>","</li>","<li>","<span><b>*</b>\u91c7\u8d2d\u622a\u6b62\u65e5\u671f\uff1a</span>",'<div class="fConRig xjIBox">','<input type="text" class="telInput" readonly="true" node-name="buyToDate" maxlength="11">','<b class=""></b>','<em class="warning" style="display: none;"><strong></strong>\u8bf7\u9009\u62e9\u91c7\u8d2d\u622a\u6b62\u65e5\u671f</em>',"</div>","</li>","<li>",'<span class="pTop15">\u66f4\u591a\u63cf\u8ff0\uff1a</span>','<div class="fConRig">','<textarea placeholder="\u65b9\u4fbf\u66f4\u597d\u7684\u4e3a\u60a8\u5339\u914d\u4f9b\u5e94\u5546\uff0c\u5982\uff1a\u91c7\u8d2d\u5199\u5b57\u697c\u6240\u7528\u7684\u5de5\u4f5c\u6905500\u628a" node-name="moreDesc"></textarea>',"</div>","</li>","<li>","<span><b>*</b>\u624b\u673a\u53f7\uff1a</span>",'<div class="fConRig xjIBox">','<input type="text" class="telInput" node-name="detailMP" maxlength="11">','<em class="warning" style="display: none;"><strong></strong>\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801</em>',"</div>","</li>","<li>","<span><b>*</b>\u9a8c\u8bc1\u7801\uff1a</span>",'<div class="fConRig xjIBox hei70">','<input type="text" tabindex="2" node-name="validate_input" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" class="codeInput w100" maxlength="4">','<span class="codeImgNew"><img id="validate_img" title="\u9a8c\u8bc1\u7801" src="//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date=1490168767568"></span>','<a class="codeLink" id="refresh_Img">\u770b\u4e0d\u6e05\uff0c\u6362\u4e00\u5f20</a>','<em class="warning" style="display: none; background-color: rgb(255, 255, 255);"><strong></strong>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</em>',"</div>","</li>","<li>","<span><b>*</b>\u77ed\u4fe1\u9a8c\u8bc1\u7801\uff1a</span>",'<div class="fConRig xjIBox hei70">','<input type="text" class="codeInput" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" node-name="msgcodeInput" maxlength="6">','<button type="submit" class="codeBtnNew" id="phoneGetCode">\u83b7\u53d6\u9a8c\u8bc1\u7801</button>','<button type="submit" class="codeBtnGray" style="display: none">\u83b7\u53d6\u9a8c\u8bc1\u7801</button>','<p class="codePromptNew">\u4e3a\u4e86\u5b89\u5168\uff0c\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff0c\u6211\u4eec\u5c06\u4f18\u5148\u5904\u7406\u60a8\u7684\u9700\u6c42\uff01</p>','<em class="warning" node-name="msgCodeTip" style="display: none;"><strong></strong>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801</em>',"</div>","</li>","</ul>",'<div class="alertBtnBox2"><button type="submit" node-name="submitAllBtn" onclick="HC.UBA.sendUserlogsElement(\''+e.defaultOptions.submitAllClick+e.defaultOptions.businessId+"');\">\u786e\u5b9a\u53d1\u9001</button></div>","</div>","</div>","</div>"].join("");return n},createSendMyPhoneHtml:function(){var e=['<div class="contactBoxNew" node-name="sendMyPhoneBox">','<div class="sendTel">','<div class="p num">',"<span>\u624b\u673a\u53f7\u7801</span>:",'<input class="text-num" type="text" maxlength="11" node-name="telText">','<p class="hide" style="display:none;">',"<strong></strong>\u624b\u673a\u53f7\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01","</p>","</div>",'<div class="p num yanzm">','<span style="letter-spacing:0.5em;margin-right:-0.5em">\u9a8c\u8bc1\u7801</span>:','<input type="hidden" node-name="validCode-seed">','<input class="text-num" type="text" maxlength="4" node-name="validCodeText">','<div class="yanzm-img">','<img width="110" node-name="validCodeImg" height="40" id="validate_map" title="\u9a8c\u8bc1\u7801" src="//detail.b2b.hc360.com/detail/ValidImage.jsp?Seed=0.29667985887426007">',"</div>",'<a href="javascript:;" class="change-more" node-name="changeImg">\u6362\u4e00\u6362</a>','<p class="hide" style="display:none;">',"<strong></strong>\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9a8c\u8bc1\u7801","</p>","</div>",'<div class="button1">','<a href="javascript:void(0)" node-name="cancelBtn">\u53d6\u6d88</a>',"</div>",'<div class="button2">','<a href="javascript:void(0)" node-name="confirmBtn">\u786e\u8ba4</a>',"</div>","</div>","</div>"].join("");return e},createNoReplyHtml:function(){var e=['<div class="contactBoxNew" node-name="noReplyBox">','<div class="cInfoListBox2">',"<ul>","<li><p>\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801\uff0c\u6211\u4eec\u5c06\u901a\u77e5\u5356\u5bb6\u5c3d\u5feb\u8054\u7cfb\u60a8\uff0c\u540c\u65f6\u4e3a\u60a8\u63d0\u4f9b\u66f4\u591a1\u5bf91\u91c7\u8d2d\u670d\u52a1\uff01</p></li>","<li>","<span>\u60a8\u7684\u624b\u673a\u53f7\u7801\uff1a</span>",'<div class="rigIbox"><input type="text" maxlength="11" node-name="mpText"><em class="warning" style="display: none;"><strong></strong>\u8bf7\u8f93\u5165\u6b63\u786e\u624b\u673a\u53f7\u7801</em></div>',"</li>","<li>",'<div class="IngoBtnBox4">','<div class="button1"><a href="javascript:void(0)" node-name="cancelBtn">\u53d6\u6d88</a></div>','<div class="button2"><a href="javascript:void(0)" node-name="confirmBtn">\u786e\u8ba4\u53d1\u9001</a></div>',"</div>","</li>","</ul>","</div>","</div>"].join("");return e},createMyPhoneSuccessHtml:function(e){return['<div class="contactSucc" node-name="myPhone-success">','<div class="tcbx1">','<p class="tcbx1-1"> <span></span>\u53d1\u9001\u6210\u529f\uff01</p>','<p class="tcbx1-2">\u6167\u806a\u5df2\u5411\u60a8\u53d1\u9001\u4e86\u77ed\u4fe1\uff0c\u8bf7\u67e5\u6536\uff01</p>',"</div>","</div>",'<div class="cardBoxBot2" node-name="myPhone-code">',"<dl>","<dt>\u60a8\u8fd8\u53ef\u4ee5\u626b\u7801\u5173\u6ce8\u201c\u6167\u806a\u91c7\u8d2d\u201d\uff0c\u63a5\u6536<b>\u5356\u5bb6\u540d\u7247</b>\uff0c\u4e0e\u5356\u5bb6\u4fdd\u6301<b>\u5b9e\u65f6\u6c9f\u901a</b>\uff01</dt>",'<dd><div class="codeImgNew"><img src="'+e+'"></div></dd>',"</dl>","</div>"].join("")},createMyPhoneFailHtml:function(e){var n=[];return(e=2)?n=['<div id="sendFail2" class="word1" node-name="myPhone-fail3">','<div class="tcbx1">','<p class="tcbx1-1 error_num num_tip_no">',"\u8d85\u8fc7\u6b21\u6570\u9650\u5236!","</p>",'<p class="tcbx1-2 tc">','\u60a8\u4e5f\u53ef\u4ee5<a rel="nofollow" href="http://my.b2b.hc360.com/my/turbine/template/buycenter,business,supplydetailedit.html">\u53d1\u5e03\u91c7\u8d2d\u8ba1\u5212</a>\uff0c\u8ba9\u5356\u5bb6\u4e3b\u52a8\u627e\u60a8\uff01',"</p>","</div>","</div>"]:(e=3)&&(n=['<div id="sendFail3" class="word1" node-name="myPhone-fail2">','<div class="tcbx1">','<p class="tcbx1-1 error_num">',"\u8d85\u8fc7\u6b21\u6570\u9650\u5236!<em>\u672a\u767b\u5f55\u7528\u6237\u4ec5\u53ef\u514d\u8d39\u4f7f\u75285\u6b21\u3002</em>","</p>",'<p class="tcbx1-2 tc" id="returnUrlNav"><a href="http://sso.hc360.com/ssologin?logincode=3&amp;loginparam=supplyend_ssotop&amp;ReturnURL=http://b2b.hc360.com/supplyself/521792640.html">\u767b\u5f55</a>\u6216<a href="javascript:varifyIdentity(2);">\u9a8c\u8bc1\u8eab\u4efd</a>\uff0c\u83b7\u5f97\u66f4\u591a\u7684\u4f7f\u7528\u6743\u9650\uff01</p>',"</div>","</div>"]),n.join("")},refreshValidcode:function(e){$.ajax({type:"GET",url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MsgDownloadAjaxAction/eventsubmit_dorefreshvalicode/doRefreshvalicode?callback=?",dataType:"jsonp",contentType:"application/x-www-form-urlencoded; charset=utf-8",data:{},timeout:2e3,success:function(n){if(n&&n.resultStr.length>0){var i=n.resultStr.split(",");"validcode"==i[0]&&3==i.length&&(e.find('[node-name="validCode-seed"]').val(i[1]),e.find('[node-name="validCodeImg"]').attr("src","//wsdetail.b2b.hc360.com/ValidImage.jsp?Seed="+i[2]))}}})},bindSendMyPhoneEvent:function(e,n){var i=this,t=e.find('[node-name="telText"]'),o=e.find('[node-name="validCodeText"]');t.keyup(function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){/^1(3|5|7|8)\d{9}$/.test(this.value)||$(this).siblings("p.hide").show()}),o.keyup(function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){""==this.value&&$(this).siblings("p.hide").show()}),e.find("p.hide").on("click",function(){var e=$(this);e.hide(),e.siblings("input[node-name]").focus()}),e.find('[node-name="cancelBtn"]').on("click",function(){e.hide(),e.siblings('[node-name="pageOneContactBox"]').show()}),e.find('[node-name="changeImg"]').on("click",function(){i.refreshValidcode(e)}),e.find('[node-name="confirmBtn"]').on("click",function(){function a(){inquiryParamVO.businTitle=inquiryParamVO.businTitle?inquiryParamVO.businTitle.length<1?encodeURIComponent(i.defaultOptions.inquiryTitle):inquiryParamVO.businTitle:encodeURIComponent(i.defaultOptions.inquiryTitle);var e=inquiryParamVO;e.contact=encodeURIComponent(window.companyContactor||""),e.CompanyName=encodeURIComponent(window.infoname||""),e.comeUrl=window.location.href,e.isbusin=i.defaultOptions.isbusin,e.type=15,e.buyerSourceId=i.defaultOptions.is3y?"u_ff_msg_cj_3y":"u_ff_msg_cj",e.telPhone=$.trim(t.val()),2==i.defaultOptions.isbusin&&(e.supcatName=encodeURIComponent(window.lastClass)),$.ajax({type:"get",url:"//my.b2b.hc360.com/my/turbine/action/favorites.Favorite_PurchaseAction/eventsubmit_doPerform/doPerform?",data:e,dataType:"jsonp",jsonp:"jsoncallback",timeout:3e3,success:function(e){},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})}var s=$(this);if(""==$.trim(t.val()))return t.siblings("p.hide").show(),!1;if(""==$.trim(o.val()))return o.siblings("p.hide").show(),!1;if(e.find("p.hide").is(":visible"))return!1;if(s.attr("disabled"))return!1;s.attr("disabled",!0);var l={LoginTicket:$.trim(e.find('[node-name="validCode-seed"]').val()),ValidKey:$.trim(o.val()),cellphone:$.trim(t.val())};1==window.pageIndex?$.extend(l,{downloadSource:1,providerId:commonCompanyObject_providerId}):2==window.pageIndex?$.extend(l,{downloadSource:3,bcId:supplyInfo_bcId,providerId:company_providerId}):$.extend(l,{downloadSource:2,providerId:commonCompanyObject_providerId}),$.ajax({type:"GET",url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MsgDownloadAjaxAction/eventsubmit_domsgdownload/doMsgdownload?callback=?",data:l,dataType:"jsonp",contentType:"application/x-www-form-urlencoded; charset=utf-8",timeout:2e3,success:function(t){"0"==t.tip?(e.find('[node-name="validCodeText"]').siblings("p.hide").show(),i.refreshValidcode(e),e.find('[node-name="confirmBtn"]').removeAttr("disabled")):"1"==t.tip?(e.children(":eq(0)").hide(),e.append(i.createMyPhoneSuccessHtml(n.find('[node-name="pageOneContactBox"] .codeImgNew img').attr("src"))),a(),e.find('[node-name="confirmBtn"]').removeAttr("disabled")):"2"==t.tip?(e.children('[node-name="myPhone-success"],[node-name="myPhone-code"],[node-name="myPhone-fail3"]').hide(),e.append(i.createMyPhoneFailHtml(2)),e.find('[node-name="confirmBtn"]').removeAttr("disabled")):"3"==t.tip&&(e.children('[node-name="myPhone-success"],[node-name="myPhone-code"],[node-name="myPhone-fail2"]').hide(),e.append(i.createMyPhoneFailHtml(3)),e.find('[node-name="confirmBtn"]').removeAttr("disabled"))},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01"),e.find('[node-name="confirmBtn"]').removeAttr("disabled")}})})},bindNoReplyEvent:function(e,n){var i=this,t=e.find('[node-name="mpText"]');e.find('[node-name="cancelBtn"]').on("click",function(){e.hide(),e.siblings('[node-name="pageOneContactBox"]').show()}),t.keyup(function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){/^1(3|5|7|8)\d{9}$/.test(this.value)||$(this).siblings("em.warning").show()}),t.siblings("em.warning").on("click",function(){$(this).hide(),t.focus()}),e.find('[node-name="confirmBtn"]').on("click",function(){var o=$(this);if(""==$.trim(t.val()))return t.siblings("em.warning").show(),!1;if(e.find("em.warning").is(":visible"))return!1;if(o.attr("disabled"))return!1;o.attr("disabled",!0);var a=i.defaultOptions.isAlbum?encodeURIComponent("\u624b\u673a\u53f7\u7801\u4e3a"+t.val()+"\u7684\u7528\u6237\u5bf9\u60a8\u5546\u54c1\u611f\u5174\u8da3"):encodeURIComponent(i.defaultOptions.inquiryTitle);$.ajax({url:"//my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform",data:{type:24,pid:inquiryParamVO.sellerProviderId,comeUrl:window.location.href,buyerSourceId:i.defaultOptions.is3y?"u_ff_msg_cj_3y":"u_ff_msg_cj",MP:$.trim(t.val()),companyName:encodeURIComponent(window.infoname)||"",plantitle:a||""},dataType:"jsonp",jsonpCallback:"callback",success:function(t){if(1==t.code){if(e.children(":eq(0)").hide(),e.find('[node-name="noReply-success"]').length>0)e.find('[node-name="noReply-success"]').show(),e.find('[node-name="noReply-success"]').siblings(".cardBoxBot2").show();else{var a=['<div class="contactSucc" node-name="noReply-success">','<div class="tcbx1">','<p class="tcbx1-1"> <span></span>\u53d1\u9001\u6210\u529f\uff01</p>','<p class="tcbx1-2">\u6167\u806a\u5df2\u6536\u5230\u60a8\u7684\u9700\u6c42\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u901a\u77e5\u5356\u5bb6\u8054\u7cfb\u60a8\uff0c\u540c\u65f6\u4f1a\u6d3e\u51fa\u91c7\u8d2d\u4e13\u54581\u5bf91\u4e3a\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u8bf7\u60a8\u8010\u5fc3\u7b49\u5f85\u3002</p>',"</div>","</div>",'<div class="cardBoxBot2" node-name="noReply-code">',"<dl>","<dt>\u60a8\u8fd8\u53ef\u4ee5\u626b\u7801\u5173\u6ce8\u201c\u6167\u806a\u91c7\u8d2d\u201d\uff0c\u63a5\u6536<b>\u5356\u5bb6\u540d\u7247</b>\uff0c\u4e0e\u5356\u5bb6\u4fdd\u6301<b>\u5b9e\u65f6\u6c9f\u901a</b>\uff01</dt>",'<dd><div class="codeImgNew"><img src="'+n.find('[node-name="pageOneContactBox"] .codeImgNew img').attr("src")+'"></div></dd>',"</dl>","</div>"].join("");e.append(a)}i.centerDialog(n),o.removeAttr("disabled")}else 3==t.code?(alert("\u4e0d\u80fd\u7ed9\u81ea\u5df1\u7559\u8a00"),o.removeAttr("disabled")):(alert("\u64cd\u4f5c\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"),o.removeAttr("disabled"))},error:function(e){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"),o.removeAttr("disabled")}})})},bindPageTwoEvent:function(e){var n=this,i=e.find('[node-name="pageTwoBox"]');n.defaultOptions.isLogin&&i.find('[node-name="detailMP"]').val(window.inquiryParamVO.telPhone);var t=i.find('[node-name="buyToDate"]');HC.W.load("datepicker",function(){$.datepicker.regional["zh-CN"]={monthNames:["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],monthNamesShort:["\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u5341\u4e00","\u5341\u4e8c"],dayNames:["\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],dayNamesShort:["\u5468\u65e5","\u5468\u4e00","\u5468\u4e8c","\u5468\u4e09","\u5468\u56db","\u5468\u4e94","\u5468\u516d"],dayNamesMin:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],dateFormat:"yy-mm-dd"},$.datepicker.setDefaults($.datepicker.regional["zh-CN"]);var e=new Date;e.setDate(e.getDate()+1),t.datepicker({minDate:e})});var o=i.find('[node-name="buyProduct"]');o.on("blur",function(){""!=$.trim($(this).val())&&0!=$(this).val().length||$(this).siblings("em.warning").show()});var a=i.find('[node-name="buyAmount"]');a.on("keyup",function(){var e=/^[1-9]\d*(\.\d+)?$/;e.exec(this.value)||(this.value="")}).on("blur",function(){""!=$.trim($(this).val())&&0!=$(this).val().length||$(this).siblings("em.warning.w120").show()});var s=i.find('[node-name="unitBox"] .tsCon'),l=i.find('[node-name="buyUnit"]'),d=s.siblings("ul");s.on("click",function(e){e.stopPropagation();var n=$(this);n.parent().siblings("em.warning.w100").is(":visible")&&(n.parent().siblings("em.warning.w100").hide(),l.focus()),d.show()}),i.on("click",function(){d.is(":visible")&&(d.hide(),""!=l.val()&&0!=l.val().length||d.closest('[node-name="unitBox"]').siblings("em.warning.w100").show())}),s.siblings("ul").find("li").on("click",function(){var e=$(this);l.val(e.text()),s.siblings("ul").hide()}),l.keyup(function(){var e=$(this),n=$(this).parent().siblings("ul").children(),i=$.trim(e.val());if(i.length>0){var t=new RegExp("^[\u4e00-\u9fa5]+$");if(t.test(i)){var o=new RegExp("("+i+")");n.each(function(){var e=$(this),n=e.text();if(o.test(n)){var i=RegExp.$1;e.html(i),e.show()}else e.hide()})}else n.hide()}else n.show(),n.parent().show()}).blur(function(){""!=$.trim($(this).val())&&0!=$(this).val().length||$(this).siblings("em.warning.w100").show()});var c=i.find('[node-name="detailMP"]');c.keyup(function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){""==this.value?$(this).siblings("em.warning").show():/^1(3|5|7|8)\d{9}$/.test(this.value)||$(this).siblings("em.warning").show()});var r=i.find('[node-name="moreDesc"]');r.on("keyup",function(){var e=$.trim(this.value.replace(/[\xa7\u3003\u3013\u25cb\u25b3\u25b2\u25ce\u2606\u2605\u25c7\u25c6\u25a1\u25a0\u25bd\u25bc\u32a3\u2605]/g,""));this.value=e});var m=i.find('[node-name="validate_input"]');m.on("keyup",function(){this.value=this.value.replace(/\D/g,"")}).blur(function(){""==this.value&&$(this).siblings("em.warning").show()});var u=i.find('[node-name="msgcodeInput"]');u.blur(function(){""==this.value&&$(this).siblings("em.warning").show()}),i.find("em.warning").on("click",function(){var e=$(this);e.hasClass("w100")?e.hide().siblings('[node-name="unitBox"]').find("input[node-name]").focus():e.hide().siblings("input[node-name]").focus()});var p=i.find("#refresh_Img");p.on("click",function(){var e=$(this);e.siblings(".codeImgNew").find("img").attr("src","//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+(new Date).getTime())});var h=i.find("#phoneGetCode");h.on("click",function(){""==$.trim(m.val())?m.siblings("em.warning").show():n.checkValidCode(i,$.trim(m.val()))});var v=i.find('[node-name="submitAllBtn"]');v.on("click",function(){return""==$.trim(o.val())||o.val().length<1?(o.siblings("em.warning").show(),!1):""==$.trim(a.val())||a.val().length<1?(a.siblings("em.warning.w120").show(),!1):""==$.trim(l.val())||l.val().length<1?(l.closest(".seleCon2").siblings("em.warning.w100").show(),!1):(l.closest(".seleCon2").siblings("em.warning.w100").hide(),""==$.trim(t.val())||t.val().length<1?(t.siblings("em.warning").show(),!1):""==$.trim(c.val())||c.val().length<1?(c.siblings("em.warning").show(),!1):""==$.trim(m.val())||m.val().length<1?(m.siblings("em.warning").show(),!1):""==$.trim(u.val())||u.val().length<1?(u.siblings("em.warning").show(),!1):!i.find("em.warning").is(":visible")&&void $.when(n.checkMsgCode(i,$.trim(u.val()),$.trim(c.val()))).done(function(e){if(1==e.code){u.siblings("em.warning").hide().html("<strong></strong>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801");var s={areaName:"",areaid:window.inquiryParamVO.areaid,businId:window.inquiryParamVO.businId,businTitle:encodeURIComponent($.trim(o.val())),comeUrl:window.location.href,companyName:"",isbusin:"",sellerProviderId:n.defaultOptions.providerId,supcatId:window.inquiryParamVO.supcatId,supcatName:"",sysFlag:"",telPhone:$.trim(c.val()),purchaseInfo:encodeURIComponent(r.val()),inquiryNum:$.trim(a.val()),deadline:$.trim(t.val()),product:encodeURIComponent(o.val()),type:1,buyerSourceId:"detail_short_inquiry",charset:"utf8",mobileCheck:!0,unit:encodeURIComponent($.trim(l.val()))};n.submitData(i,s)}else 2==e.code?u.siblings("em.warning").show().html("<strong></strong>\u9a8c\u8bc1\u5931\u8d25"):3==e.code?u.siblings("em.warning").show().html("<strong></strong>\u9a8c\u8bc1\u7801\u9519\u8bef"):4==e.code&&u.siblings("em.warning").show().html("<strong></strong>\u9a8c\u8bc1\u5931\u8d25\u5df2\u8fc7\u671f")}).fail(function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}))})},submitData:function(e,n){$.ajax({type:"GET",url:"//my.b2b.hc360.com/my/turbine/action/inquiry.InquiryAction/eventsubmit_doPerform/doperform?callback=?",dataType:"jsonp",contentType:"application/x-www-form-urlencoded; charset=utf-8",data:n,jsonp:"callback",success:function(n){if(n&&"yes"==n.code){var i=['<div class="dSuccBoxStep3">',"<dl>","<dt><em></em>\u53d1\u9001\u6210\u529f\uff01</dt>","<dd>\u6167\u806a\u5df2\u6536\u5230\u60a8\u7684\u9700\u6c42\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u901a\u77e5\u5356\u5bb6\u8054\u7cfb\u60a8\uff0c\u540c\u65f6\u4f1a\u6d3e\u51fa\u91c7\u8d2d\u4e13\u54581\u5bf91\u4e3a\u60a8\u63d0\u4f9b\u670d\u52a1\uff0c\u8bf7\u60a8\u8010\u5fc3\u7b49\u5f85\uff01</dd>","</dl>","</div>"].join("");e.find(".dAlertBoxCon2").html(i)}else n&&"self"==n.code?alert("\u60a8\u4e0d\u80fd\u7ed9\u81ea\u5df1\u53d1\u8be2\u4ef7\u5355\uff01"):alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})},checkMsgCode:function(e,n,i){return $.ajax({type:"GET",url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doValidcode/doValidcode?callback=?",dataType:"jsonp",contentType:"application/x-www-form-urlencoded; charset=utf-8",data:{code:n,phone:i},timeout:2e3})},checkValidCode:function(e,n){var i=this;jQuery.ajax({type:"GET",url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",dataType:"jsonp",data:{picCode:n},timeout:2e3,async:!1,success:function(n){0==n.code?(e.find('[node-name="validate_input"]').siblings("em.warning").hide().html("<strong></strong>\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"),""==$.trim(e.find('[node-name="detailMP"]').val())?e.find('[node-name="detailMP"]').siblings("em.warning").show():i.sendPhoneValiCode(e,$.trim(e.find('[node-name="validate_input"]').val()),$.trim(e.find('[node-name="detailMP"]').val()))):e.find('[node-name="validate_input"]').siblings("em.warning").show().html("<strong></strong>\u9a8c\u8bc1\u7801\u9519\u8bef");
},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5")}})},sendPhoneValiCode:function(e,n,i){function t(n,i){return 0==i?(n.removeAttr("disabled"),n.html("\u514d\u8d39\u83b7\u53d6\u9a8c\u8bc1\u7801"),e.find("#phoneGetCode").removeClass("codeBtnGray").addClass("codeBtnNew"),i=60,clearTimeout(o),!1):(n.html("\u91cd\u65b0\u53d1\u9001("+i+")"),i--,void(o=setTimeout(function(){t(n,i)},1e3)))}var o;$.ajax({type:"GET",url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doSendyzm/doSendyzm?callback=?",dataType:"jsonp",contentType:"application/x-www-form-urlencoded; charset=utf-8",jsonp:"callback",data:{picCode:n,phone:i},timeout:2e3,async:!1,success:function(n){var i=e.find("#msgCodeTip");1==n.code?(e.find("#phoneGetCode").removeClass("codeBtnNew").addClass("codeBtnGray").attr("disabled"),t(e.find("#phoneGetCode"),60)):2==n.code?i.show().html("<strong></strong>\u6bcf\u5929\u53d1\u9001\u6b21\u6570\u8d85\u8fc7\u4e0a\u9650"):3==n.code?i.show().html("<strong></strong>\u53d1\u9001\u9a8c\u8bc1\u7801\u5931\u8d25"):4==n.code?i.show().html("<strong></strong>\u9a8c\u8bc1\u7801\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u83b7\u53d6"):i.show().html("<strong></strong>\u56fe\u5f62\u9a8c\u8bc1\u7801\u4e0d\u6b63\u786e")},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5")}})},getweChatDef:function(){return $.ajax({url:"//detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",type:"GET",dataType:"jsonp",data:{imid:"hc360-hfb"},jsonpCallback:"callback"})},createMask:function(){var e=$(".dAlertBoxBg");0==e.length?e=$("<div>",{"class":"dAlertBoxBg"}).appendTo("body").show():e.show()},centerDialog:function(e){var n=$(window).height(),i=$(window).width(),t=$(window).scrollTop(),o=e.height(),a=e.width();n=n<o?o+100:n,e.css({position:"absolute",left:(i-a)/2+"px",top:(n-o)/2+t+"px","z-index":1000001})},seriesTelphone:function(e){for(var n="",i="",t="\u624b\u673a\u53f7",o=0;o<e.length;o++)if(e[o]){var a=/^1\d{10}$/;a.test(e[o])?(n=e[o],i=e[o].replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")):(n=e[o],i=e[o].replace(/^(\d{3,4})(-?)\d{4}(\d+)/,"$1$2****$3"),t="\u7535\u8bdd");break}return[n,i,t]}}}()}]);