webpackJsonp([29],{145:function(e,t){"function"!=typeof $.cookie&&$.getScript("http://style.org.hc360.cn/js/build/source/widgets/jquery.cookie.js");var a={pageType:"supplydetailself",id:""},i={init:function(e){function t(e,t,a){i.createSidebarHtml(e,t,a),i.gotoTopFn($("#gotoTop").offset().top),i.initQQToll(),i.bindEvent(),e&&t&&a&&setTimeout(function(){$("[node-id='weix']").append('<a class="wxAlert">\u5356\u5bb6\u5fae\u4fe1\u5728\u7ebf</a>')},5e3)}var i=this;i.is3y=1==e.is3y,i.option=$.extend({},a,e);var n;$.when($.ajax({url:"http://madata.hc360.com/mobileweb/m/get/bindstatus",dataType:"jsonp",data:{imid:window.company_username||window.welfarename||window.userName}})).done(function(e){n="200"==e.code,n?t("http://style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/wxIco.gif","\u5fae\u4fe1","http://style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_3.gif"):t()}).fail(function(){t()})},createSidebarHtml:function(e,t,a){e||t||a||(e="http://style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_1.gif",t="\u5728\u7ebf\u54a8\u8be2",a="http://style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/lyIco_2.gif");var i="onmousedown=\"return hcclick('?hcdetail_supply=supplyself_online_chat')\"",n="onmousedown=\"return hcclick('?hcdetail_supply=supplyself_open_shop')\"",s="onmousedown=\"return hcclick('?hcdetail_supply=supplyself_backtop')\"",o="onclick=\"HC.UBA.sendUserlogsElement('"+this.getUserLog("consult")+"')\"",c="onclick=\"HC.UBA.sendUserlogsElement('"+this.getLog("message")+"')\"",d=$("<div>",{"class":"fix-right-box"}).appendTo("body"),l=$("<div>",{"class":"fix-right"}).appendTo(d),r=$("<div>",{"class":"fix-right"}).appendTo(d).hide(),p=['<div class="every weix" node-id="weix">','<a href="javascript:;"'+o+'class="every-a"'+i+' id="OnlineBtn">','<img class="icon" src="'+e+'" height="37" width="43" alt="">',"<span>"+t+"</span>","</a>","</div>"],m=['<div class="every">','<a href="javascript:;" class="every-a"'+c+' id="proMessage">','<img class="icon" src="'+a+'" height="37" width="43" alt="">','<span class="border-none">\u7acb\u5373\u7559\u8a00</span>',"</a>","</div>"],u=['<div class="every top"  id="gotoTop" style="display: none">','<a href="#"'+s+' class="every-a">','<img class="icon" src="http://style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/p-top.png" height="37" width="43" alt="">','<span class="border-none">\u8fd4\u56de\u9876\u90e8</span>',"</a>","</div>"],g=['<div class="R-top">','<a href="http://my.b2b.hc360.com/my/turbine/template/firstview,reg_first.html?sourcetypeid=3731"'+n+' target="_blank"><img class="icon" src="http://style.org.hc360.cn/images/detail/mysite/siteconfig/fix-r/R-top.png" alt="" height="64" width="73"></a>',"</div>"];l.append(p.join("")).append(m.join("")),r.append(u.join("")),"function"==typeof $.cookie&&($.cookie("LoginID")||$.cookie("HC360.SSOUser")||$(".fix-right-box").prepend(g.join("")))},bindEvent:function(){var e=this;$("body").on("click","#OnlineBtn,#contactChat",function(){var t=$(this);return!t.attr("isopen")&&(t.attr("isopen",!0),void e.onlineConsult(function(){t.removeAttr("isopen")}))}),$("#proMessage").click(function(){e.messageDialog()}),$(window).scroll(function(){e.gotoTopFn($(this).scrollTop())}),$("body").on("mouseenter",".every.qq",function(){$(".qq-tk").show(),clearInterval(e.timer)}).on("mouseleave",".every.qq",function(){e.timer=setTimeout(function(){$(".qq-tk").hide()},50)}),e.is3y&&$("body").on("click",".every.qq",function(e){$('[data-query="qqTalk"]').show(),$(".b-blue").trigger("click"),e.preventDefault()})},onlineConsult:function(e){var t=this,a=$(".dAlertBoxBg"),i="",n="http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png",s=$.Deferred();$.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",type:"GET",dataType:"jsonp",jsonpCallback:"callback"}).done(function(e){e&&e.senceid&&(i=e.senceid,n=e.weChatPic),s.resolve()}).fail(function(){s.resolve()}),$.when(s).done(function(){0==a.length?a=$("<div>",{"class":"dAlertBoxBg consultBg"}).appendTo("body").show():a.show(),$("html").css("overflow-y","hidden"),t.consultWrap=$("<div>",{"class":"Consultation","data-startTime":t.getDateTime(!0)}).appendTo("body").show();var s=['<div class="mTitle">','<div class="mTitLeft">',"<em></em>","<span>\u5c0f\u6167</span>",'<span class="borLeft">'+t.companyName+"</span>","</div>",'<span class="mCloseBtn" ele-type="closeWindow" data-picUrl="'+n+'">\u5173\u95ed</span>',"</div>",'<div class="ConsulCon">','<div class="ConsulBox">','<div class="clTop" id="cInnerBox">',"</div>",'<div class="clBot">','<div class="clBotText">','<textarea name="" placeholder="\u8bf7\u5728\u6b64\u76f4\u63a5\u8f93\u5165\u60a8\u8981\u91c7\u8d2d\u7684\u4ea7\u54c1\u53ca\u5176\u4ed6\u9700\u6c42" data-node-name="area"></textarea>','<p class="textareaLen" data-node-name="maxLen">\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57</p>','<p class="ProhibitedTxt" data-promptInfo><strong></strong>\u5185\u5bb9\u542b\u6709\u8fdd\u7981\u8bcd</p>',"</div>","</div>",'<div class="clBotInput">','<div id="mobilephoneCon">',"<span><em>*</em>\u60a8\u7684\u624b\u673a\u53f7</span>",'<div class="bInputBox">','<input type="text" style="color:#999999;" value="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801" name="MP" data-node-name="MP"/><em class="c-red warning isNull" data-promptInfo><strong></strong>\u624b\u673a\u53f7\u4e0d\u80fd\u4e3a\u7a7a</em>','<em class="c-red warning isError" data-promptInfo><strong></strong>\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7</em>',"</div>","</div>",'<div id="validcodeCon" style="display: none">',"<span><em>*</em>\u9a8c\u8bc1\u7801</span>",'<div class="clCode">','<input type="text" class="w210" style="color:#999999;" value="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" data-node-name="validCodeInput">','<em class="c-red warning isNull" data-promptInfo><strong></strong>\u9a8c\u8bc1\u7801\u4e0d\u4e3a\u7a7a</em>','<em class="c-red warning isError" data-promptInfo><strong></strong>\u9a8c\u8bc1\u7801\u9519\u8bef</em>','<span class="clCodeImg">','<img src="http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+(new Date).getTime()+'"></span>',"</div>","</div>",'<button type="submit" data-node-name="subtn" data-sceneid="'+i+'">\u53d1\u9001</button>',"</div>","</div>","</div>"];$(".Consultation").append(s.join("")),t.getHistoryMsg(function(){var e=['<div class="clBoxLeft">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+t.getDateTime(!0)+"</p>",'<div class="ConsulList">',"<em></em>","<p>\u4f60\u597d\uff0c\u6b22\u8fce\u5149\u4e34"+t.companyName+"\uff0c\u8bf7\u53d1\u9001\u60a8\u8981\u54a8\u8be2\u7684\u5185\u5bb9\u3002</p>","</div>","</div>","</div>"];$("#cInnerBox").append(e.join("")).scrollTop($("#cInnerBox")[0].scrollHeight)}),t.option.interval=setInterval(function(){t.loopGetMsgPer10s()},1e4),t.onlineFormValidation(),$('[ele-type="closeWindow"]').click(function(){var e=$(this).attr("data-picUrl");if($(".Consultation").remove(),$("html").css("overflow-y","auto"),$(".dAlertBoxBg.consultBg").hide(),t.option.interval&&clearInterval(t.option.interval),$("#friendlyTip").length>0)$("#friendlyTip,.consultBg").show();else{var a=['<div class="dAlertBoxBg consultBg" style=" display:block;"></div>','<div class="Consultation" id="friendlyTip">','<a class="clCloseBtn"></a>',"<h3>\u6e29\u99a8\u63d0\u793a</h3>",'<div class="ConsulRig">',"<dl>",'<dt><img src="'+e+'"></dt>',"<dd>\u5fae\u4fe1\u626b\u63cf\u4e0a\u65b9\u4e8c\u7ef4\u7801\uff0c\u624b\u673a\u968f\u65f6\u968f\u5730\u63a5\u6536\u5356\u5bb6\u56de\u590d</dd>","</dl>","</div>","</div>"];$(a.join("")).appendTo("body")}}),$("body").on("click","#friendlyTip a.clCloseBtn",function(){$("#friendlyTip").siblings(".consultBg:visible").remove(),$("#friendlyTip").remove()}),$("#cInnerBox").on("click","p.moreList",function(){var e=$(this),a=$(this).next("div").attr("data-id")||$(this).next("div.moreHistory").children(":first").attr("data-id");$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",type:"GET",timeout:3e3,data:{isLogon:$.cookie("LoginID")?"1":"0",buyid:$.cookie("LoginID")?$.cookie("newhcproviderid")||$.cookie("hc360_userid"):$.cookie("HC_anonyBuyerId")||"",spid:t.option.providerId,minid:a},dataType:"jsonp",jsonpCallback:"callback",success:function(t){if(t&&t.length>0){e.after('<div class="moreHistory"></div>');for(var a=t,i=0;i<a.length;i++){if("0"==a[i].infokind){var n=['<div class="clBoxRig" data-id="'+a[i].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  '+a[i].createtime+"</p>",'<div class="ConsulList">',"<em></em>","<p>"+a[i].purchaseinfo+"</p>","</div>","</div>","</div>"];$(".moreHistory:eq(0)").append(n.join(""))}else if("1"==a[i].infokind){var s=['<div class="clBoxLeft" data-id="'+a[i].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  '+a[i].createtime+"</p>",'<div class="ConsulList">',"<em></em>","<p>"+a[i].purchaseinfo+"</p>","</div>","</div>","</div>"];$(".moreHistory:eq(0)").append(s.join(""))}t.length<15&&e.remove()}}},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})}),$("[data-starttime]").on("click",".clCodeImg",function(){$(this);$(this).find("img").attr("src",'http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+(new Date).getTime())}),e&&e()})},getMsgContent:function(){var e=this;return $.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGethismsg/doGethismsg",type:"GET",timeout:3e3,data:{buyid:$.cookie("LoginID")?$.cookie("newhcproviderid")||$.cookie("hc360_userid"):$.cookie("HC_anonyBuyerId")||"",isLogon:$.cookie("LoginID")?"1":"0",spid:e.option.providerId},dataType:"jsonp",jsonpCallback:"callback"})},getDateDifference:function(e,t){if(e>t)return console.log("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4\uff01"),!1;var a=e.substr(0,10).split("-"),i=t.substr(0,10).split("-"),n=new Date(a[1]+-+a[2]+-+a[0]),s=new Date(i[1]+-+i[2]+-+i[0]),o=parseInt(Math.abs(s-n)/1e3/60),c=60*parseInt(e.substr(11,2))+parseInt(e.substr(14,2)),d=60*parseInt(t.substr(11,2))+parseInt(t.substr(14,2)),l=d-c,r=o+l;return r},getCodeUrlBySceneid:function(e){return $.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dochatingpicid/doChatingpicid",type:"GET",data:{senceid:e},dataType:"jsonp",jsonpCallback:"callback"})},getHistoryMsg:function(e){var t=this;$.when(t.getMsgContent()).done(function(a){if(a&&a.length>0){var i=a,n=i[0].qrcodeid;$('button[data-node-name="subtn"]').attr("data-sceneid",n);for(var s=0;s<i.length;s++)if("0"==i[s].infokind){var o=['<div class="clBoxRig" data-id="'+i[s].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  <span>'+i[s].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+i[s].purchaseinfo||"</p>","</div>","</div>","</div>"];$("#cInnerBox").append(o.join(""))}else if("1"==i[s].infokind){var c=['<div class="clBoxLeft" data-id="'+i[s].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  <span>'+i[s].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+i[s].purchaseinfo||"</p>","</div>","</div>","</div>"];$("#cInnerBox").append(c.join(""))}15==a.length&&$("#cInnerBox").prepend('<p class="moreList"><a href="javascript:;">\u70b9\u51fb\u67e5\u770b\u66f4\u591a</a></p>');var d=$('span[ele-type="closeWindow"]');$.when(t.getCodeUrlBySceneid(n)).done(function(e){d.attr("data-picurl",e.weChatPic)}).fail(function(){d.attr("data-picurl","http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/cRigImg.png")})}$("#cInnerBox").scrollTop($("#cInnerBox")[0].scrollHeight),e&&e()}).fail(function(){console.log("Failed to obtain data,Please try again later!")})},loopGetMsgPer10s:function(){function e(e,t){if(!t)return e;var a=Date.parse(new Date(e.replace(/-/g,"/"))),i=Date.parse(new Date(t.replace(/-/g,"/")));return a-i>0?e:t}var t=this;$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doGetpollintervalmsg/doGetpollintervalmsg",type:"GET",timeout:5e3,data:{buyid:$.cookie("LoginID")?$.cookie("newhcproviderid")||$.cookie("hc360_userid"):$.cookie("HC_anonyBuyerId")||"",isLogon:$.cookie("LoginID")?"1":"0",spid:t.option.providerId,maxBpID:$("#cInnerBox").children(".clBoxRig:last").attr("data-id")||"",maxSpID:$("#cInnerBox").children(".clBoxLeft[data-id]:last").attr("data-id")||""},dataType:"jsonp",jsonpCallback:"callback",success:function(a){if(0==$("#cInnerBox").length)return!1;if(a&&a.length>0){for(var i=a,n=0;n<i.length;n++){if("0"==i[n].infokind){var s=['<div class="clBoxRig" data-id="'+i[n].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u6211  <span>'+i[n].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+i[n].purchaseinfo||"</p>","</div>","</div>","</div>"];$("#cInnerBox").append(s.join(""))}else if("1"==i[n].infokind){var o=['<div class="clBoxLeft" data-id="'+i[n].id+'">','<em class="clImg"></em>','<div class="clImgRig">','<p class="clTime">\u5e97\u7ecf\u7406  <span>'+i[n].createtime+"</span></p>",'<div class="ConsulList">',"<em></em>","<p>"+i[n].purchaseinfo||"</p>","</div>","</div>","</div>"];$("#cInnerBox").append(o.join(""))}n==i.length-1&&(t.lastMsgTime=i[n].createtime)}$("#cInnerBox").scrollTop($("#cInnerBox")[0].scrollHeight)}else t.lastMsgTime=$("#cInnerBox").children("[data-id]:last").find("p.clTime span").text();var c=$(".Consultation:visible").attr("data-starttime"),d=e(c,t.lastMsgTime),l=t.getDateTime(!0),r=t.getDateDifference(d,l);r>=30&&$('[ele-type="closeWindow"]').trigger("click")},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})},onlineFormValidation:function(){var e=this,t="#333333",a="#a2a2a2";e.consultWrap.find("[data-promptInfo]").on("click",function(){$(this).closest("div").find("[data-node-name]").focus()}),e.elements={MP:{selector:'input[data-node-name="MP"]',defaultValue:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801",reg:/^1\d{10}$/,notInput:/\D+/g,maxLen:11},contentArea:{selector:'[data-node-name="area"]',defaultValue:"\u8bf7\u5728\u6b64\u76f4\u63a5\u8f93\u5165\u60a8\u8981\u91c7\u8d2d\u7684\u4ea7\u54c1\u53ca\u5176\u4ed6\u9700\u6c42",notInput:/[\xa7\u3003\u3013\u25cb\u25b3\u25b2\u25ce\u2606\u2605\u25c7\u25c6\u25a1\u25a0\u25bd\u25bc\u32a3\ufe3f\ufe39\ufe3d_\ufe41\ufe43\ufe3b\ufe36\ufe38\ufe40\ufe3a\ufe3e\u02c9\ufe42\ufe44\ufe3c\u2605]/g,maxLen:150},validCode:{selector:'input[data-node-name="validCodeInput"]',defaultValue:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",notInput:/\D+/g,maxLen:4,isMast:!0}},$.each(e.elements,function(e,i){var n=$(i.selector),s=i.defaultValue,o=i.reg,c=i.maxLen;n.on("focus",function(){var e=$(this).val();e!=s&&""!=e||$(this).val("").css("color",t),$(this).closest("div").find("[data-promptInfo]").hide()}).on("blur",function(){var t=$(this).val();"MP"==e?(""==t&&($(this).val(s).css("color",a),$(this).parent().find("em.isNull").show()),o.test(t)?"":$(this).parent().find("em.isError").show()):"contentArea"==e?""==t?$(this).attr("placeholder",s):"":""==t?$(this).val(s).css("color",a):""}).on("change keyup",function(){var t=$(this).val();if(i.notInput?$(this).val(t.replace(i.notInput,"")):"",t.length>c?$(this).val(t.substr(0,c)):"","contentArea"==e){var a=i.maxLen-t.length;$(this).closest("div").find('[data-node-name="maxLen"]').html("\u8fd8\u53ef\u4ee5\u8f93\u5165"+a+"\u5b57")}})}),e.consultWrap.find('[data-node-name="subtn"]').click(function(){var t=$(this);t.addClass("cGrayBtn").attr("disabled","disabled"),e.submitOnlineForm(t.attr("data-sceneid")||"")})},submitOnlineForm:function(e){function t(){$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/outerinf.OnlinePcIMAction/eventsubmit_doSendmsg/doSendmsg",type:"GET",timeout:5e3,data:{isLogon:$.cookie("LoginID")?"1":"0",buyid:$.cookie("LoginID")?$.cookie("newhcproviderid")||$.cookie("hc360_userid"):$.cookie("HC_anonyBuyerId")||"",spid:a.option.providerId,MP:encodeURIComponent(s.val()),plantitle:encodeURIComponent(n.val()),contacter:encodeURIComponent(c),introduce:encodeURIComponent(n.val()),qrcodeid:e},dataType:"jsonp",jsonpCallback:"callback",success:function(e){e&&(0==e.code?alert("\u53d1\u9001\u5931\u8d25\uff0c\u7a0d\u540e\u91cd\u8bd5\uff01"):1==e.code?e.cntADay>0&&($("#mobilephoneCon").hide(),n.siblings("p.textareaLen").text("\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57"),e.cntADay%5==0?($("#validcodeCon").show().find(".clCodeImg").trigger("click"),$("#validcodeCon").find('[data-node-name="validCodeInput"]').val(""),$("#validcodeCon").find("em.warning").hide()):$("#validcodeCon").hide(),a.MessageContent(e.msgId),$("#cInnerBox").scrollTop($("#cInnerBox")[0].scrollHeight),$('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled")):3==e.code?alert("\u60a8\u4e0d\u80fd\u7ed9\u81ea\u5df1\u53d1\u7559\u8a00\uff01"):alert("\u7559\u8a00\u6b21\u6570\u8d85\u9650\uff0c\u7a0d\u540e\u91cd\u8bd5\uff01"))},error:function(e){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")}})}var a=this,i=!0,n=a.consultWrap.find('[data-node-name="area"]'),s=a.consultWrap.find('[data-node-name="MP"]'),o="",c="",d=$("#mobilephoneCon"),l=$("#validcodeCon");$.each(a.elements,function(e,t){$(t.selector).focus().blur()}),""==$.trim(n.val())&&(alert("\u8bf7\u8f93\u5165\u804a\u5929\u5185\u5bb9\uff01"),i=!1),d.is(":visible")&&d.find(".bInputBox em.warning").is(":visible")&&(i=!1),l.is(":visible")&&l.find(".clCode em.warning").is(":visible")&&(i=!1),a.forVal={plantitle:n.val(),contacter:c,MP:s.val(),name:o},i?l.is(":visible")?$.ajax({type:"GET",url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",dataType:"jsonp",data:{picCode:$.trim($(a.elements.validCode.selector).val())},timeout:2e3,async:!1,success:function(e){0==e.code?t():(l.find(".clCode em.isError").show(),l.find(".clCodeImg img").attr("src","http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+(new Date).getTime()),$('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled"))},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5")}}):t():$('button[data-node-name="subtn"]').removeClass("cGrayBtn").removeAttr("disabled")},submitFrom:function(){function e(e,a){$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",type:"GET",data:{plantitle:encodeURIComponent(i.val())},dataType:"jsonp",success:function(n){0==n.code?$("p.ProhibitedTxt").show():($.extend(t.formDatas,{qrcodeid:e||""}),$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform?",data:t.formDatas,dataType:"jsonp",jsonpCallback:"callback",success:function(n){1==n.code?($('button[ele-type="subtn"]').addClass("cGrayBtn"),$('button[ele-type="subtn"]').attr("disabled","disabled"),t.MessageContent(),i.find('[data-node-name="maxLen"]').html("\u8fd8\u53ef\u4ee5\u8f93\u5165150\u5b57"),e&&($(".ConsulRig dt img").attr("src",a).css({width:"185px",height:"187px"}),$(".ConsulRig dd").html("\u60a8\u597d\uff0c\u5fae\u4fe1\u626b\u7801\u4e8c\u7ef4\u7801\uff0c\u5fae\u4fe1\u53ef\u968f\u65f6\u63a5\u6536\u6d88\u606f\u56de\u590d"))):(alert("\u64cd\u4f5c\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"),$('[ele-type="closeWindow"]').trigger("click"),$("html").css("overflow-y","auto"),$('button[ele-type="subtn"]').removeClass("cGrayBtn"),$('button[ele-type="subtn"]').removeAttr("disabled"))}}))}})}var t=this,a=!0,i=t.consultWrap.find('[data-node-name="area"]'),n=t.consultWrap.find('[data-node-name="MP"]');if($.each(t.elements,function(e,t){$(t.selector).focus().blur()}),$.each(t.elements,function(e,t){$(t.selector).closest("div").find("[data-promptInfo]").is(":visible")&&(a=!1)}),i.val()==t.elements.contentArea.defaultValue&&i.val(""),a){var s="",o="";t.formDatas={plantitle:encodeURIComponent(i.val()),contacter:encodeURIComponent(o),MP:encodeURIComponent(n.val()),name:encodeURIComponent(s),pid:t.option.providerId,comeUrl:window.location.href,buyerSourceId:1==t.option.is3y?"my_online_message_3y":"my_online_message"},t.forVal={plantitle:i.val(),contacter:o,MP:n.val(),name:s},i.val().search(/\S*(?:\(\u5fae\)\s{0,2}\(\u4fe1\)|\uff08\u5fae\uff09\s{0,2}\uff08\u4fe1\uff09|\u5fae\u4fe1)\S*/)!=-1?$(".ProhibitedTxt").show():$.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",type:"GET",dataType:"jsonp",jsonpCallback:"callback",success:function(t){t?e(t.senceid,t.weChatPic):e()},error:function(t){e()}})}},MessageContent:function(e){var t=this,a="";a+='<div class="clBoxRig inputCount" data-id="'+e+'"><em class="clImg"></em><div class="clImgRig"><p class="name clTime">\u6211 '+t.getDateTime(!0)+'</p><div class="ConsulList"><em></em><p>'+t.forVal.plantitle+"</p></div></div></div>",$("#cInnerBox").append(a),$('textarea[data-node-name="area"]').val(""),$.each(t.elements,function(e,t){$(t.selector).css("color","gray")})},getDateTime:function(e){function t(e){return Number(e)<10&&(e="0"+e),e}var a=new Date,i=a.getFullYear(),n=a.getMonth()+1,s=a.getDate(),o=a.getHours(),c=a.getMinutes(),d=a.getSeconds();return e?i+"-"+t(n)+"-"+t(s)+" "+t(o)+":"+t(c)+":"+t(d):t(o)+":"+t(c)+":"+t(d)},messageDialog:function(){var e=$(".down");if(0==e.length?e=$("<div>",{"class":"down"}).appendTo("body").show():e.show(),$("html").css("overflow-y","hidden"),this.messageWrap=$('[data-node-name="messageWrap"]'),0==this.messageWrap.length){this.messageWrap=$("<div>",{"class":"proMessage"}).attr("data-node-name","messageWrap").appendTo("body").show();var t=['<div class="mTitle">',"<strong>\u6211\u8981\u7559\u8a00</strong>",'<span class="mCloseBtn">\u5173\u95ed</span>',"</div>"],a=['<div class="proMessCon">','<form data-node-name="mesageForm">','<div class="proMtop">',"<p>\u6ce8\uff1a1.\u5546\u5bb6\u4f1a\u572824\u5c0f\u65f6\u5185\u4e0e\u60a8\u8054\u7cfb\uff0c\u8bf7\u786e\u4fdd\u624b\u673a\u7545\u901a\u3002</p>",'<p class="in2em">2.\u6167\u806a\u7f51\u4f1a\u786e\u4fdd\u60a8\u7684\u624b\u673a\u53f7\u7801\u4e0d\u88ab\u6cc4\u9732\u7ed9\u5176\u4ed6\u5e73\u53f0\uff0c\u8bf7\u653e\u5fc3\u586b\u5199\u3002</p>',"</div>",'<div class="proMList">',"<ul>",'<li><span class="mListLeft">\u516c\u53f8\u540d\u79f0\uff1a</span>','<div class="mListRig" title='+("1"==this.is3y?window.companyName:this.companyName)+">"+("1"==this.is3y?window.companyName:this.companyName)+"</div>","</li>",'<li id="prodMesCont">','<span class="mListLeft">\u8be2\u4ef7\u4ea7\u54c1\uff1a</span>','<div class="mListRig" id="prodMesTitle"></div>',"</li>","<li>",'<span class="mListLeft">\u7559\u8a00\u4e3b\u9898\uff1a</span>','<div class="mListRig" id="quckSelector">',"<span>\u4ef7\u683c</span>","<span>\u5546\u54c1\u8be6\u60c5</span>","<span>\u7269\u6d41\u4e0e\u53d1\u8d27\u65f6\u95f4</span>","<span>\u552e\u540e</span>","</div>","</li>",'<li class="pBot30">','<span class="mListLeft letter2"><em>*</em>\u7559\u8a00\u8be6\u60c5\uff1a</span>','<div class="mListRig">','<textarea data-node-name="messageContent" placeholder="\u53ef\u81ea\u5b9a\u4e49\u7559\u8a00\u5185\u5bb9\uff0c\u4e5f\u53ef\u9009\u62e9\u7559\u8a00\u4e3b\u9898\uff0c\u5feb\u6377\u8f93\u5165\u5185\u5bb9"  maxlen="200"></textarea>','<em class="c-red warning foctextarea"><strong></strong>\u8bf7\u8f93\u5165\u7559\u8a00\u5185\u5bb9</em>','<em class="c-red warning foctextarea banned"><strong></strong>\u5185\u5bb9\u542b\u6709\u8fdd\u7981\u8bcd</em>',"</div>","</li>",'<li class="pBot30">','<div class="mTelCon">','<span class="mListLeft letter2"><em>*</em>\u624b\u673a\u53f7\u7801\uff1a</span>','<div class="mListRig">','<input data-node-name="messagePhone"  type="tel"  maxlen="11"/><em class="c-red warning focphone"><strong></strong>\u8bf7\u8f93\u5165\u6b63\u786e\u53f7\u7801</em>',"</div>","</div>",'<div class="mCodeCon">','<span class="mListLeft"><em>*</em>\u9a8c\u8bc1\u7801\uff1a</span>','<div class="mListRig">','<input id="validCode" data-node-name="validCode" maxlen="4" type="text" maxlength="4">','<em class="c-red warning focValidCode"><strong></strong>\u8bf7\u6b63\u786e\u8f93\u5165</em>','<a href="javascript:;" data-id="validateCodeImg">','<img src="http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="'+(new Date).getTime()+">","</a>","</div>","</div>","</li>",'<li class="pBot30">','<span class="mListLeft letter0">\u5982\u4f55\u79f0\u547c\u60a8\uff1a</span>','<div class="mListRig">','<input data-node-name="messageContact" type="text" maxlen="5"/>',"</div>","</li>","</ul>",'<div class="mBtnBox">','<button id="proMessSubmitBtn" type="button">\u53d1\u9001\u7559\u8a00</button>',"</div>","</div>","</form>","</div>"],i=['<div class="mSuccBox" style="display: none">',"<em></em>",'<p class="mSuccPrompt">\u5173\u6ce8\u540e\uff0c\u5356\u5bb6\u53cd\u9988\u4f1a\u901a\u8fc7<span>\u5fae\u4fe1\u516c\u4f17\u53f7</span>\u53d1\u9001\u5230\u60a8\u7684\u624b\u673a\uff01</p>','<div class="mCodeImg" id="wechatContainer">','<img src="http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/mCodeImg.png" />',"<p>\u626b\u63cf\u4e8c\u7ef4\u7801</p>","</div>",'<div class="mSuccBtnBox">','<button id="clearDown" type="submit">\u786e\u5b9a</button>','<button id="proMessMoreBtn" type="submit" class="moreBtn">\u66f4\u591a\u76f8\u5173\u63a8\u8350</button>',"</div>","</div>"];if(this.messageWrap.append(t.join("")).append(a.join("")).append(i.join("")),1==this.is3y)var n=$('a[data-useractivelogs="UserBehavior_supplyself_nowposition"]').html(),s=$(".position>a.list-link").html();else var n=$("#comTitle").html(),s=$(".titleCon span").html();null!=n&&""!=n?($("#prodMesTitle").html(n),$("#prodMesTitle").attr("title",n)):null!=s&&""!=s?($("#prodMesTitle").html(s),$("#prodMesTitle").attr("title",s)):$("#prodMesCont").hide(),this.messageEvent()}else this.messageWrap.find("#quckSelector span").removeClass("seleCur"),this.messageWrap.find("em.warning").hide(),this.messageWrap.find(".mSuccBox").hide().end().find(".proMessCon").show(),this.messageWrap.find('[data-node-name="mesageForm"]')[0].reset(),this.messageWrap.show()},messageEvent:function(){var e=this,t=e.messageWrap.find(".mCloseBtn"),a=e.messageWrap.find("#proMessSubmitBtn"),i=e.messageWrap.find('a[data-id="validateCodeImg"]'),n=e.messageWrap.find("#quckSelector span");e.defaultTextarea="\u53ef\u81ea\u5b9a\u4e49\u7559\u8a00\u5185\u5bb9\uff0c\u4e5f\u53ef\u9009\u62e9\u7559\u8a00\u4e3b\u9898\uff0c\u5feb\u6377\u8f93\u5165\u5185\u5bb9",t.click(function(){$(".down").hide(),e.messageWrap.hide(),$("html").css("overflow-y","auto")}),i.on("click",function(){$(this).find("img").attr("src","http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doGenerateimagecode/doGenerateimagecode?date="+(new Date).getTime())}),n.click(function(){e.quickMessage($(this))}),e.messageFormValidat(),a.click(function(){e.sendMessage()}),e.messageWrap.find("em").click(function(){$(this).hide(),$(this).parent().find("[maxlen]").focus()})},sendMessage:function(){function e(){var e=t.is3y?companyName:t.companyName,a=$.trim($("#prodMesTitle").html()),i=t.is3y?11:4,s=t.is3y?"detail_company_message_3y":"detail_company_message",d={type:i,plantitle:null==a?encodeURIComponent(t.companyName):encodeURIComponent(a),contacter:encodeURIComponent(c),MP:encodeURIComponent(n),introduce:encodeURIComponent(o),companyName:encodeURIComponent(e),pid:t.option.providerId,comeUrl:window.location.href,buyerSourceId:s};$.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.MobileBcidAjaxAction/eventsubmit_dowechatpicid/doWechatpicid",type:"GET",dataType:"jsonp",jsonpCallback:"callback",success:function(e){e?($.extend(d,{qrcodeid:e.senceid}),t.ajaxFun(d,e.senceid,e.weChatPic)):t.ajaxFun(d)},error:function(){t.ajaxFun(d)}})}var t=this,a=!0,i=t.messageWrap.find('[data-node-name="messagePhone"]'),n=$.trim(i.val()),s=this.messageWrap.find('[data-node-name="messageContent"]'),o=$.trim(s.val()),c=$.trim(this.messageWrap.find('[data-node-name="messageContact"]').val()),d=$.trim(this.messageWrap.find('[id="validCode"]').val());0!=o.length&&o!=this.defaultTextarea||(s.parent().find("em").eq(0).show(),a=!1),o.search(/\S*(?:\(\u5fae\)\s{0,2}\(\u4fe1\)|\uff08\u5fae\uff09\s{0,2}\uff08\u4fe1\uff09|\u5fae\u4fe1)\S*/)!=-1&&(s.parent().find("em").eq(1).show(),a=!1),0!=n.length&&/^1\d{10}$/.test(n)||(i.parent().find("em.warning").show(),a=!1),(""==d||d.length<1)&&(this.messageWrap.find("#validCode").parent().find("em.warning").show(),a=!1),a&&jQuery.ajax({type:"GET",url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.Sendcodebysupplyselfv2/eventsubmit_doCheckpicvercode/doCheckpicvercode?callback=?",dataType:"jsonp",data:{picCode:$.trim(d)},timeout:2e3,async:!1,success:function(a){0==a.code?e():t.messageWrap.find("#validCode").parent().find("em.warning").show()},error:function(){alert("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5")}})},ajaxFun:function(e,t,a){var i=this,n=this.messageWrap.find('[data-node-name="messageContent"]'),s=$.trim(n.val()),o=i.messageWrap.find(".mCloseBtn");$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doCheckword/doCheckword",type:"GET",data:{plantitle:encodeURIComponent(s)},dataType:"jsonp",success:function(s){0==s.code?n.parent().find("em.banned").show():$.ajax({url:"http://my.b2b.hc360.com/my/turbine/action/consulting.OnlineconsultingAction/eventsubmit_doperform/doPerform",data:e,dataType:"jsonp",jsonpCallback:"callback",success:function(e){1==e.code?(i.submitProMesSuccess(),t&&$("#wechatContainer img").attr("src",a).css({width:"140px",height:"140px"})):3==e.code?(alert("\u4e0d\u80fd\u7ed9\u81ea\u5df1\u7559\u8a00"),o.trigger("click"),$("html").css("overflow-y","auto")):(alert("\u64cd\u4f5c\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"),o.trigger("click"),$("html").css("overflow-y","auto"))}})}})},submitProMesSuccess:function(){var e=this;this.messageWrap.find(".proMessCon").hide(),this.messageWrap.find(".mSuccBox").show(),$("#proMessMoreBtn").on("click",function(){var t="";if(e.is3y){var a;a="undefined"==typeof company_username||null===company_username||""===company_username?welfarename:company_username,t="http://"+a+".b2b.hc360.com/shop/businwindow.html"}else t="undefined"==typeof company_username||null===company_username||""===company_username?"undefined"==typeof userName||null===userName||""===userName?businUrl:"http://"+userName+".b2b.hc360.com/shop/businwindow.html":"http://"+company_username+".b2b.hc360.com/shop/businwindow.html";window.open(t)}),$("#clearDown").on("click",function(){e.messageWrap.hide(),$("html").css("overflow-y","auto"),$(".down").hide()})},messageFormValidat:function(){this.messageWrap.on("focus","[maxlen]",function(){$(this).parent().find("em").hide()}).on("change keyup","[maxlen]",function(){var e=$(this).attr("maxlen"),t=null,a=$(this).attr("data-node-name"),i=$(this).val();"messagePhone"==a?t=/\D/g:"messageContact"==a?t=/[^a-zA-Z\s\u4e00-\u9fa5]/g:"validCode"==a&&(t=/\D/g),void 0!=t?$(this).val(i.replace(t,"")):"",i.length>e?$(this).val(i.substr(0,e)):""})},quickMessage:function(e){var t=["\u5f88\u559c\u6b22\u8d35\u516c\u53f8\u7684\u5546\u54c1\uff0c\u53ef\u5426\u7ed9\u4e2a\u771f\u5b9e\u7684\u5546\u54c1\u62a5\u4ef7","\u4f60\u597d\uff1a\u5f88\u559c\u6b22\u8d35\u516c\u53f8\u7684\u5546\u54c1\uff0c\u662f\u5426\u53ef\u4ee5\u7ed9\u4e2a\u8be6\u7ec6\u4ecb\u7ecd\u770b\u770b","\u60f3\u8d2d\u4e70\u8d35\u516c\u53f8\u7684\u5546\u54c1\uff0c\u8bf7\u95ee\u7528\u7684\u7269\u6d41\u3001\u53d1\u8d27\u65f6\u95f4\u662f\u4ec0\u4e48","\u8bf7\u95ee\u54b1\u4eec\u5546\u54c1\u7684\u552e\u540e\u662f\u5982\u4f55\u5904\u7406\u7684\uff0c\u514d\u8d39\u7ef4\u4fee\u662f\u591a\u957f\u65f6\u95f4"],a=this.messageWrap.find('[data-node-name="messageContent"]'),i=e.index(),n=new RegExp(t[i],"g"),s=a.parent().find("em"),o=a.val();
e.hasClass("seleCur")?(e.removeClass("seleCur"),o=o.replace(n,""),s.hide()):(e.addClass("seleCur"),o+=t[i],s.hide()),o!==this.defaultTextarea?a.val(o):""},initQQToll:function(){var e=this,t=['<div class="every qq" node-name="qqList">','<a href="#" class="every-a">','<img class="icon" src="http://style.org.hc360.com/images/detail/mysite/siteconfig/fix-r/qqIco.gif" height="37" width="43" alt="">',"<span>QQ</span>","</a>",'<div class="qq-tk">',"</div>","</div>"];if(e.is3y)var a=window.userName||window.welfarename||"",i={providerid:this.option.providerId,name:a,contactor:window.contactor||"",duty:window.duty||"",page:Number(window.page_no)||0,supercatid:window.lastClassId||0,IsAliHot:window.IsAliHot||""},n="http://b2b.hc360.com/qqser/"+a+".html";else var i={providerId:this.option.providerId},n="http://detail.b2b.hc360.com/detail/turbine/template/saleser,qqser.html";$.ajax({url:n,type:"GET",data:i,dataType:"jsonp",jsonp:"jsoncallback",success:function(a){if(e.qqlist=a.listQQ,e.companyName=e.is3y?window.companyName||"":a.companyName,e.is3y)var i=$('[data-query="qqTalk"]'),n=i.find("a"),s=i.find("img");var o="<ul>";e.qqlist&&e.qqlist.length>0&&(e.is3y&&(n.attr("href","http://wpa.qq.com/msgrd?v=3&uin="+e.qqlist[0].qq+"&site=qq&menu=yes"),s.attr("src","http://wpa.qq.com/pa?p=2:"+e.qqlist[0].qq+":51")),$('div[node-id="weix"]').after(t.join("")),$.each(e.qqlist,function(t,a){o+="<li><a href='http://wpa.qq.com/msgrd?v=3&uin="+a.qq+"&site=qq&menu=yes' target='_blank' onmousedown=\"HC.UBA.sendUserlogsElement('"+e.getUserLog("qq",t+1)+"')\"><img border='0' src='http://wpa.qq.com/pa?p=2:"+a.qq+":51' title='"+a.qqalias+"'/></a></li>"})),o+="</ul>",$('[node-name="qqList"] .qq-tk').append(o)},error:function(){throw new Error("\u62c9\u53d6qq\u63a5\u53e3\u5931\u8d25\uff01")}})},getUserLog:function(e,t){var a="",i=this.option,n=i.userId,s=i.pageType,t=t?"_"+t:"";return"shop"===s||"pics"===s?a=i.ismmt||window.ismmt?"UserBehavior_detail_"+e+"_kf"+t+"?detailuserid="+n:"UserBehavior_detail_"+e+"_kf"+t+"_free?detailuserid="+n:"supplydetailself"===s&&(a=i.isTS?"UserBehavior_supplyself_"+e+"_kf"+t+"_transaction?detailbcid="+n:"UserBehavior_supplyself_"+e+"_kf"+t+"?detailbcid="+n),a},getLog:function(e){var t=this,a="",i=t.option,n=i.userId,s=i.pageType;return"shop"===s||"pics"===s?a=i.ismmt||window.ismmt?"UserBehavior_detail_"+e+"_float?detailuserid="+n:"UserBehavior_detail_"+e+"_float_free?detailuserid="+n:"supplydetailself"===s&&(a=i.isTS?"UserBehavior_supplyself_"+e+"_float_transaction?detailbcid="+n:"UserBehavior_supplyself_"+e+"_float?detailbcid="+n),a},gotoTopFn:function(e){var t=$(".fix-right").eq(1);e>$(window).height()/3?($("#gotoTop").show(),t.is(":hidden")&&t.show()):($("#gotoTop").hide(),t.hide())}};e.exports=i}});