!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="http://style.org.hc360.cn/js/module/shop3.0/dist/",t(0)}([function(e,t){!function(e){e.fn.queryDialog=function(n){return"function"!=typeof e.cookie&&e.getScript("http://style.org.hc360.cn/js/build/source/widgets/jquery.cookie.js"),this.each(function(i,a){e.extend(!0,n,{element:e(a)});var o=new t(n);o.init()})};var t=function(t){this.defaultOptions={is3y:!1,isBindWX:!1,element:"",companyName:"",interval:"",consultContainer:"",providerId:""},e.extend(this.defaultOptions,t)};t.prototype={init:function(){this.createDialogHtml()},bindStatusDef:function(){return e.ajax({url:"http://madata.hc360.com/mobileweb/m/get/bindstatus",dataType:"jsonp",data:{imid:window.company_username||window.welfarename||window.userName}})},getMsgContent:function(){var t=this;return e.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",type:"GET",timeout:5e3,data:{buyid:e.cookie("LoginID")?e.cookie("newhcproviderid")||e.cookie("hc360_userid"):e.cookie("HC_anonyBuyerId")||"",isLogon:e.cookie("LoginID")?"1":"0",spid:t.defaultOptions.providerId},dataType:"jsonp",jsonpCallback:"callback"})},getCodeUrlBySceneid:function(t){return e.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dochatingpicid/doChatingpicid",type:"GET",data:{senceid:t,imid:"hc360-hfb"},dataType:"jsonp",jsonpCallback:"callback"})},getHistoryMsg:function(t){var n=this;e.when(n.getMsgContent()).done(function(i){if(i&&i.length>0){var a=i,o=a[0].qrcodeid;e('button[data-node-name="subtn"]').attr("data-sceneid",o);for(var s=0;s<a.length;s++)if("0"==a[s].infokind){var d=['<div class="clBoxRig" data-id="'+a[s].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  <span>'+a[s].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+a[s].purchaseinfo||"</p>","</div>","</div>","</div>"];e("#cInnerBox").append(d.join(""))}else if("1"==a[s].infokind){var c=['<div class="clBoxLeft" data-id="'+a[s].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  <span>'+a[s].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+a[s].purchaseinfo||"</p>","</div>","</div>","</div>"];e("#cInnerBox").append(c.join(""))}15==i.length&&e("#cInnerBox").prepend('<p class="moreList"><a href="javascript:;">\u70b9\u51fb\u67e5\u770b\u66f4\u591a</a></p>');var l=e('[node-name="friendlyTip"]').find("dl dt img");n.defaultOptions.isBindWX?e.when(n.getCodeUrlBySceneid(o)).done(function(e){e&&e.weChatPic?l.attr("src",e.weChatPic):l.attr("src","http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg")}).fail(function(){l.attr("src","http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg")}):l.attr("src","http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg")}e("#cInnerBox").scrollTop(e("#cInnerBox")[0].scrollHeight),t&&t()}).fail(function(){console.log("Failed to obtain data,Please try again later!")})},getChatWXDef:function(){return e.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",type:"GET",dataType:"jsonp",jsonpCallback:"callback",data:{imid:"hc360-hfb"}})},getBindStatusDef:function(){return e.ajax({url:"http://madata.hc360.com/mobileweb/m/get/bindstatus",dataType:"jsonp",data:{imid:window.company_username||window.welfarename||window.userName}})},createDialogHtml:function(){var t=this,n=e(".dAlertBoxBg");t.defaultOptions.element.on("click",function(){var i=e(this),a="",o="http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg";return!i.attr("isopen")&&(i.attr("isopen",!0),void e.when(t.getChatWXDef()).done(function(i){if(i&&i.senceid&&(a=i.senceid,o=i.weChatPic),0==n.length?n=e("<div>",{"class":"dAlertBoxBg consultBg"}).appendTo("body").show():n.show(),t.defaultOptions.is3y){t.defaultOptions.consultContainer=e("<div>",{"class":"Consultation syConsul","data-node-name":"queryDialog","data-startTime":t.getDateTime(!0)}).appendTo("body").show();var s=t.defaultOptions.consultContainer,d=['<div class="ConsultationCon">','<div class="mTitle">','<div class="mTitLeft">',"<em></em>",'<span class="borLeft">'+t.defaultOptions.companyName+"</span>","</div>",'<span class="mCloseBtn" data-node-nane="closeInqueryDialog">\u5173\u95ed</span>',"</div>",'<div class="ConsulCon">','<div class="ConsulBox">','<div class="clTop" id="cInnerBox"></div>','<div class="clBot">','<div class="clBotText">','<textarea name="" data-node-name="area" placeholder="\u8bf7\u5728\u6b64\u76f4\u63a5\u8f93\u5165\u60a8\u8981\u91c7\u8d2d\u7684\u4ea7\u54c1\u53ca\u5176\u4ed6\u9700\u6c42"></textarea>','<p class="textareaLen" data-node-name="maxLen">\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57</p>','<p class="ProhibitedTxt" style="display: none;"><strong></strong>\u5185\u5bb9\u542b\u6709\u8fdd\u7981\u8bcd</p>',"</div>","</div>",'<div class="clBotInput">','<div id="mobilephoneCon">',"<span><em>*</em>\u7535\u8bdd\u53f7\u7801</span>",'<div class="bInputBox">','<input type="text" style="color: rgb(162, 162, 162);" maxLength="11" value="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801" name="MP" data-node-name="MP">','<em class="c-red warning isNull" style="display: none;"><strong></strong>\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a</em>','<em class="c-red warning isError" style="display: none;"><strong></strong>\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7</em>',"</div>","</div>",'<div id="validcodeCon" style="display:none;">',"<span><em>*</em>\u9a8c\u8bc1\u7801</span>",'<div class="clCode">','<input type="text" class="w210" style="color:#999999;"maxLength="4" value="\u9a8c\u8bc1\u7801" data-node-name="validCodeInput">','<em class="c-red warning isNull" style="display: none;"><strong></strong>\u9a8c\u8bc1\u7801\u4e0d\u4e3a\u7a7a</em>','<em class="c-red warning isError" style="display: none;"><strong></strong>\u9a8c\u8bc1\u7801\u9519\u8bef</em>','<span class="clCodeImg"><img src="http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="></span>',"</div>","</div>",'<button type="submit" data-node-name="subtn" isappear="true" data-sceneid="'+a+'">\u53d1\u9001</button>',"</div>","</div>","</div>","</div>",'<div class="rigIphone" node-name="friendlyTip">','<div class="rigCodeBox">',"<dl>",'<dt><img src="http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/codeImg_3.jpg"></dt>',"<dd>\u5173\u6ce8\u6167\u806a\u91c7\u8d2d<br>\u627e\u597d\u8d27\uff0c\u66f4\u65b9\u4fbf</dd>","</dl>","</div>","</div>"];s.append(d.join(""));var c=['<div class="clBoxLeft">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+t.getDateTime(!0)+"</p>",'<div class="ConsulList">',"<em></em>","<p>\u4f60\u597d\uff0c\u6b22\u8fce\u5149\u4e34"+t.defaultOptions.companyName+"\uff0c\u8bf7\u53d1\u9001\u60a8\u8981\u54a8\u8be2\u7684\u5185\u5bb9\u3002</p>","</div>","</div>","</div>"];e("#cInnerBox").append(c.join("")).scrollTop(e("#cInnerBox")[0].scrollHeight),t.bindEvent(s)}else e.when(t.getBindStatusDef()).done(function(n){n&&"200"==n.code&&(t.defaultOptions.isBindWX=!0);var i="\u5546\u5bb6\u56de\u590d\u6162\uff1f<br>\u53ef\u626b\u7801\u5fae\u4fe1\u63a5\u6536\u56de\u590d\u4fe1\u606f";t.defaultOptions.isBindWX||(i="\u5173\u6ce8\u6167\u806a\u91c7\u8d2d<br>\u627e\u597d\u8d27\uff0c\u66f4\u65b9\u4fbf"),t.defaultOptions.consultContainer=e("<div>",{"class":"Consultation","data-node-name":"queryDialog","data-startTime":t.getDateTime(!0)}).appendTo("body").show();var s=t.defaultOptions.consultContainer,d=['<div class="ConsultationCon">','<div class="mTitle">','<div class="mTitLeft">',"<em></em>",'<span class="borLeft">'+t.defaultOptions.companyName+"</span>","</div>",'<span class="mCloseBtn" data-node-nane="closeInqueryDialog">\u5173\u95ed</span>',"</div>",'<div class="ConsulCon">','<div class="ConsulBox">','<div class="clTop" id="cInnerBox"></div>','<div class="clBot">','<div class="clBotText">','<textarea name="" data-node-name="area" placeholder="\u8bf7\u5728\u6b64\u76f4\u63a5\u8f93\u5165\u60a8\u8981\u91c7\u8d2d\u7684\u4ea7\u54c1\u53ca\u5176\u4ed6\u9700\u6c42"></textarea>','<p class="textareaLen" data-node-name="maxLen">\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57</p>','<p class="ProhibitedTxt" style="display: none;"><strong></strong>\u5185\u5bb9\u542b\u6709\u8fdd\u7981\u8bcd</p>',"</div>","</div>",'<div class="clBotInput">','<div id="mobilephoneCon">',"<span><em>*</em>\u7535\u8bdd\u53f7\u7801</span>",'<div class="bInputBox">','<input type="text" style="color: rgb(162, 162, 162);" maxLength="11" value="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801" name="MP" data-node-name="MP">','<em class="c-red warning isNull" style="display: none;"><strong></strong>\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a</em>','<em class="c-red warning isError" style="display: none;"><strong></strong>\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7</em>',"</div>","</div>",'<div id="validcodeCon" style="display:none;">',"<span><em>*</em>\u9a8c\u8bc1\u7801</span>",'<div class="clCode">','<input type="text" class="w210" style="color:#999999;"maxLength="4" value="\u9a8c\u8bc1\u7801" data-node-name="validCodeInput">','<em class="c-red warning isNull" style="display: none;"><strong></strong>\u9a8c\u8bc1\u7801\u4e0d\u4e3a\u7a7a</em>','<em class="c-red warning isError" style="display: none;"><strong></strong>\u9a8c\u8bc1\u7801\u9519\u8bef</em>','<span class="clCodeImg"><img src="http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="></span>',"</div>","</div>",'<button type="submit" data-node-name="subtn" isappear="true" data-sceneid="'+a+'">\u53d1\u9001</button>',"</div>","</div>","</div>","</div>",'<div class="rigIphone" node-name="friendlyTip">','<div class="rigCodeBox">',"<dl>",'<dt><img src="'+o+'"></dt>',"<dd>"+i+"</dd>","</dl>","</div>","</div>"];if(s.append(d.join("")),t.defaultOptions.isBindWX)t.getHistoryMsg(function(){var n=['<div class="clBoxLeft">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+t.getDateTime(!0)+"</p>",'<div class="ConsulList">',"<em></em>","<p>\u4f60\u597d\uff0c\u6b22\u8fce\u5149\u4e34"+t.defaultOptions.companyName+"\uff0c\u8bf7\u53d1\u9001\u60a8\u8981\u54a8\u8be2\u7684\u5185\u5bb9\u3002</p>","</div>","</div>","</div>"];e("#cInnerBox").append(n.join("")).scrollTop(e("#cInnerBox")[0].scrollHeight)}),t.defaultOptions.interval=setInterval(function(){t.loopGetMsgPer10s(s)},1e4);else{var c=['<div class="clBoxLeft">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+t.getDateTime(!0)+"</p>",'<div class="ConsulList">',"<em></em>","<p>\u4f60\u597d\uff0c\u6b22\u8fce\u5149\u4e34"+t.defaultOptions.companyName+"\uff0c\u8bf7\u53d1\u9001\u60a8\u8981\u54a8\u8be2\u7684\u5185\u5bb9\u3002</p>","</div>","</div>","</div>"];e("#cInnerBox").append(c.join("")).scrollTop(e("#cInnerBox")[0].scrollHeight)}t.bindEvent(s)}).fail(function(){console.warn("\u83b7\u53d6\u5fae\u4fe1\u7ed1\u5b9a\u72b6\u6001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")})}).fail(function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}))})},bindEvent:function(t){var n=this,i="#333333",a="#a2a2a2",o={MP:{selector:'input[data-node-name="MP"]',defaultValue:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801",reg:/^1\d{10}$/,notInput:/\D+/g,maxLen:11},contentArea:{selector:'[data-node-name="area"]',defaultValue:"\u8bf7\u5728\u6b64\u76f4\u63a5\u8f93\u5165\u60a8\u8981\u91c7\u8d2d\u7684\u4ea7\u54c1\u53ca\u5176\u4ed6\u9700\u6c42",notInput:/[\xa7\u3003\u3013\u25cb\u25b3\u25b2\u25ce\u2606\u2605\u25c7\u25c6\u25a1\u25a0\u25bd\u25bc\u32a3\ufe3f\ufe39\ufe3d_\ufe41\ufe43\ufe3b\ufe36\ufe38\ufe40\ufe3a\ufe3e\u02c9\ufe42\ufe44\ufe3c\u2605]/g,maxLen:150},validCode:{selector:'input[data-node-name="validCodeInput"]',defaultValue:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",notInput:/\D+/g,maxLen:4,isMast:!0}};e.each(o,function(t,n){var o=e(n.selector),s=n.defaultValue,d=n.reg,c=n.maxLen;o.on("focus",function(){var t=e(this).val();t!=s&&""!=t||e(this).val("").css("color",i),e(this).closest("div").find(".warning").hide()}).on("blur",function(){var n=e(this).val();"MP"==t?(""==n&&(e(this).val(s).css("color",a),e(this).parent().find("em.isNull").show()),d.test(n)?"":e(this).parent().find("em.isError").show()):"contentArea"==t?""==n?e(this).attr("placeholder",s):"":""==n?e(this).val(s).css("color",a):""}).on("change keyup",function(){var i=e(this).val();n.notInput?e(this).val(i.replace(n.notInput,"")):"",i.length>c?e(this).val(i.substr(0,c)):"","contentArea"==t&&e(this).closest("div").find('[data-node-name="maxLen"]').html("\u8fd8\u53ef\u4ee5\u8f93\u5165"+(n.maxLen-i.length)+"\u5b57")})}),t.find(".warning").on("click",function(){e(this).closest("div").find("[data-node-name]").focus()}),t.find('[data-node-nane="closeInqueryDialog"]').on("click",function(){t.siblings(".dAlertBoxBg").hide(),t.remove(),n.defaultOptions.element.removeAttr("isopen"),n.defaultOptions.consultContainer="",n.defaultOptions.interval&&clearInterval(n.defaultOptions.interval)}),t.find("#cInnerBox").on("click","p.moreList",function(){var t=e(this),i=e(this).next("div").attr("data-id")||e(this).next("div.moreHistory").children(":first").attr("data-id");e.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",type:"GET",timeout:3e3,data:{isLogon:e.cookie("LoginID")?"1":"0",buyid:e.cookie("LoginID")?e.cookie("newhcproviderid")||e.cookie("hc360_userid"):e.cookie("HC_anonyBuyerId")||"",spid:n.defaultOptions.providerId,minid:i},dataType:"jsonp",jsonpCallback:"callback",success:function(n){if(n&&n.length>0){t.after('<div class="moreHistory"></div>');for(var i=n,a=0;a<i.length;a++){if("0"==i[a].infokind){var o=['<div class="clBoxRig" data-id="'+i[a].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  '+i[a].createtime+"</p>",'<div class="ConsulList">',"<em></em>","<p>"+i[a].purchaseinfo+"</p>","</div>","</div>","</div>"];e(".moreHistory:eq(0)").append(o.join(""))}else if("1"==i[a].infokind){var s=['<div class="clBoxLeft" data-id="'+i[a].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+i[a].createtime+"</p>",'<div class="ConsulList">',"<em></em>","<p>"+i[a].purchaseinfo+"</p>","</div>","</div>","</div>"];e(".moreHistory:eq(0)").append(s.join(""))}n.length<15&&t.remove()}}},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})}),t.on("click",".clCodeImg",function(){e(this).find("img").attr("src",'http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+(new Date).getTime())}),t.find('[data-node-name="subtn"]').click(function(){var i=e(this);i.addClass("cGrayBtn").attr("disabled","disabled"),n.sendEvent(i.attr("data-sceneid")||"",t,o)})},sendEvent:function(t,n,i){function a(){e.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doSendmsg/doSendmsg",type:"GET",timeout:5e3,data:{isLogon:e.cookie("LoginID")?"1":"0",buyid:e.cookie("LoginID")?e.cookie("newhcproviderid")||e.cookie("hc360_userid"):e.cookie("HC_anonyBuyerId")||e.cookie("hc360analyid")||"",spid:o.defaultOptions.providerId,MP:encodeURIComponent(c.val()),plantitle:encodeURIComponent(d.val()),contacter:encodeURIComponent(l),introduce:encodeURIComponent(d.val()),comeUrl:window.location.href,qrcodeid:t},dataType:"jsonp",jsonpCallback:"callback",success:function(t){if(t)if(0==t.code)alert("\u53d1\u9001\u5931\u8d25\uff0c\u7a0d\u540e\u91cd\u8bd5\uff01"),n.find('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled");else if(1==t.code){if(t.cntADay>0){if(r.hide(),d.siblings("p.textareaLen").text("\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57"),t.cntADay%5==0?(p.show().find(".clCodeImg").trigger("click"),p.find('[data-node-name="validCodeInput"]').val(""),p.find("em.warning").hide()):p.hide(),o.renderMessageContent(t.msgId,i),!o.defaultOptions.isBindWX||o.defaultOptions.is3y){var a=['<div class="clBoxLeft">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+o.getDateTime(!0)+"</p>",'<div class="ConsulList">',"<em></em>","<p>\u4fdd\u6301\u7535\u8bdd\u7545\u901a\uff0c\u5546\u5bb6\u56de\u7535\u8bdd\u8054\u7cfb\u60a8\u3002\u5173\u6ce8\u6167\u806a\u91c7\u8d2d\uff0c\u627e\u597d\u8d27\u66f4\u65b9\u4fbf\uff01</p>","</div>","</div>","</div>"];setTimeout(function(){e("#cInnerBox").append(a.join("")).scrollTop(e("#cInnerBox")[0].scrollHeight)},1e3)}e("#cInnerBox").scrollTop(e("#cInnerBox")[0].scrollHeight),n.find('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled").removeAttr("isappear")}}else 3==t.code?(alert("\u60a8\u4e0d\u80fd\u7ed9\u81ea\u5df1\u53d1\u7559\u8a00\uff01"),n.find('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled")):alert("\u7559\u8a00\u6b21\u6570\u8d85\u9650\uff0c\u7a0d\u540e\u91cd\u8bd5\uff01")},error:function(e){n.find('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled"),alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})}var o=this,s=!0,d=e(i.contentArea.selector),c=e(i.MP.selector),l="",r=n.find("#mobilephoneCon"),p=n.find("#validcodeCon");if(e.each(i,function(t,n){e(n.selector).focus().blur()}),""==e.trim(d.val())&&(n.find(".clCodeImg").trigger("click"),alert("\u8bf7\u8f93\u5165\u804a\u5929\u5185\u5bb9\uff01"),s=!1),r.is(":visible")&&r.find(".bInputBox em.warning").is(":visible")&&(s=!1),p.is(":visible")&&p.find(".clCode em.warning").is(":visible")&&(s=!1),s){var m=n.find('[data-node-name="subtn"]').attr("isappear");m&&n.find('[node-name="friendlyTip"]').addClass("left530"),p.is(":visible")?e.ajax({type:"GET",url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",dataType:"jsonp",data:{picCode:e.trim(e(i.validCode.selector).val())},timeout:2e3,async:!1,success:function(t){0==t.code?a():(p.find(".clCode em.isError").show(),p.find(".clCodeImg img").attr("src","http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+(new Date).getTime()),e('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled"))},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5")}}):a()}else n.find('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled")},renderMessageContent:function(t,n){var i=this,a='<div class="clBoxRig inputCount" data-id="'+t+'"><em class="clImg"></em><div class="clImgRig"><p class="name clTime">\u6211 '+i.getDateTime(!0)+'</p><div class="ConsulList"><em></em><p>'+e(n.contentArea.selector).val()+"</p></div></div></div>";e("#cInnerBox").append(a),e(n.contentArea.selector).val(""),e.each(n,function(t,n){e(n.selector).css("color","gray")})},loopGetMsgPer10s:function(t){function n(e,t){if(!t)return e;var n=Date.parse(new Date(e.replace(/-/g,"/"))),i=Date.parse(new Date(t.replace(/-/g,"/")));return n-i>0?e:t}var i=this;e.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGetpollintervalmsg/doGetpollintervalmsg",type:"GET",timeout:5e3,data:{buyid:e.cookie("LoginID")?e.cookie("newhcproviderid")||e.cookie("hc360_userid"):e.cookie("HC_anonyBuyerId")||"",isLogon:e.cookie("LoginID")?"1":"0",spid:i.defaultOptions.providerId,maxBpID:t.find("#cInnerBox").children(".clBoxRig:last").attr("data-id")||"",maxSpID:t.find("#cInnerBox").children(".clBoxLeft[data-id]:last").attr("data-id")||""},dataType:"jsonp",jsonpCallback:"callback",success:function(a){if(!i.defaultOptions.consultContainer)return!1;var o=t.find("#cInnerBox");if(a&&a.length>0){for(var s=a,d="",c=0;c<s.length;c++){if("0"==s[c].infokind){var l=['<div class="clBoxRig" data-id="'+s[c].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  <span>'+s[c].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+s[c].purchaseinfo||"</p>","</div>","</div>","</div>"];o.append(l.join(""))}else if("1"==s[c].infokind){var r=['<div class="clBoxLeft" data-id="'+s[c].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  <span>'+s[c].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+s[c].purchaseinfo||"</p>","</div>","</div>","</div>"];o.append(r.join(""))}c==s.length-1&&(d=s[c].createtime)}o.scrollTop(e("#cInnerBox")[0].scrollHeight)}else d=o.children("[data-id]:last").find("p.clTime span").text();var p=e(".Consultation:visible").attr("data-starttime"),m=n(p,d),u=i.getDateTime(!0),v=i.getDateDifference(m,u);v>=30&&t.find('[data-node-nane="closeInqueryDialog"]').trigger("click")},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})},getDateTime:function(e){function t(e){return Number(e)<10&&(e="0"+e),e}var n=new Date,i=n.getFullYear(),a=n.getMonth()+1,o=n.getDate(),s=n.getHours(),d=n.getMinutes(),c=n.getSeconds();return e?i+"-"+t(a)+"-"+t(o)+" "+t(s)+":"+t(d)+":"+t(c):t(s)+":"+t(d)+":"+t(c)},getDateDifference:function(e,t){if(e>t)return console.log("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4\uff01"),!1;var n=e.substr(0,10).split("-"),i=t.substr(0,10).split("-"),a=new Date(n[1]+-+n[2]+-+n[0]),o=new Date(i[1]+-+i[2]+-+i[0]),s=parseInt(Math.abs(o-a)/1e3/60),d=60*parseInt(e.substr(11,2))+parseInt(e.substr(14,2)),c=60*parseInt(t.substr(11,2))+parseInt(t.substr(14,2)),l=c-d,r=s+l;return r}}}(jQuery)}]);