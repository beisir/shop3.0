webpackJsonp([39],[function(e,i,t){function o(e){var i=u.includedMod,t=e.attr("id"),o={listType:b[t],areaName:encodeURIComponent(window.areaName||""),is3y:e.index()},n=e.find("li").length;if(0===n){var a=l(i,o);a.done(function(i){var o="";if(i&&"1"==i.success){var n=i.productList;if(n&&n.length>0)for(var a=0;a<n.length;a++){var l=n[a],r="",d="";l.title?(r=l.title.replaceAll("\\+"," "),d=l.url):l.relaWordName&&(r=l.relaWordName.replaceAll("\\+"," "),d=l.relaWordsInfo),a<f.optyM[t]&&(o=o+"<li><a href='"+d+"' title='"+decodeURIComponent(r)+"' target='_blank'>"+decodeURIComponent(r)+"</a></li>")}}""===o&&(o="<li><a href='javascript:void(0);'  target='_blank'>\u6682\u65e0\u76f8\u5173\u6570\u636e\uff01</a></li>"),e.html(o),e.show(),v.show()})}}function n(){function e(){var e=5;$(".friendMid").find("#changeSp").bind("click",function(){g.find("li").each(function(i){i<e+5&&i>=e?$(this).show():$(this).hide()}),e+=5,e=e>=o?0:e})}var i=$(".friendMid").find(".changeSp"),t="hcdetail_enterpriselog=detail_recommend_sp",o=0,n=0,a=5,r={listType:"homeRelatedList",username:window.userName||"",memTypeId:window.memTypeId||"",supCat:encodeURIComponent(window.searchVal||""),areaName:encodeURIComponent(window.areaName||"")};"undefined"!=typeof is3y&&parseInt(is3y)&&(t="hcdetail_enterpriselog=detail_recommend_sp_sw");var d=l(u.likeMod,r);d.done(function(l){if(l&&"1"==l.success){var r=l.jsonP4pList?l.jsonP4pList.searchResultInfo:[],d=l.productList.slice(r.length),s="";$.p4pTempData=r,o=d.length+r.length;var p=o%a;n=0===p?o/a:o/a+1,$(document).on("p4pRenderDone.p4p",function(){for(var o=0;o<d.length;o++)if(o<f.likeMod){var n=d[o],l=decodeURIComponent(n.title.replaceAll("\\+"," ")),p=n.url,h=""!=n.price?"&yen;"+n.price:"\u9762\u8bae",u=n.imgUrlBig,v=c(n.url);s=s+"<li style=\"display:none\"><div class='picbox'><a href='"+p+"' data-exposurelog='"+userName+","+v+"' title='"+l+"'  target='_blank' onclick=\"return hcclick('?"+t+"');\"><img onload='resizeImg(this,150,150);' onerror='imgonerror(this)' src='"+u+"'/></a></div><p class='pay'>"+h+"</p><p class='txtoverf'><a href='"+p+"' title='"+l+"' target='_blank' onclick=\"return hcclick('?"+t+"');\">"+l+"</a></p></li>"}""!==s||r.length?(g.append(s),g.find("li").each(function(e){e<a&&$(this).show()}),d.length<=5&&r.length<=5&&i.hide(),m.show()):r.length>0?m.show():m.hide(),e()}),$(document).trigger("p4pDataReady.p4pmy")}else m.hide()}).fail(function(e){m.hide()}),$.handleChangeSp=e}function a(){var e=u.fillShopMod,i={providerId:window.providerId},t=y.find("ul");searchVal&&""!==searchVal&&(i.searchVal=encodeURIComponent(searchVal));var o=l(e,i);o.done(function(e){var i=e.keyword;if(y.find(".more a").attr("href","//s.hc360.com/?w="+i+"&ql=3&qh=5&SP=1&t=1&v=6"),e&&"1"==e.success){var o=e.productList,n=new Array;if(o&&o.length>0){for(var a=0;a<o.length;a++){var l=o[a],r=l.title.replaceAll("\\+"," "),d=c(l.url);a<f.fillShopMod&&(n.push("<li><div class='rqpic'>"),n.push("<a href='"+l.url+"' data-exposurelog='"+window.userName+","+d+"' target='_blank' onclick=\"return hcclick('?hcdetail_enterpriselog=detail_home_freesptcpic');\" title='"+decodeURIComponent(r)+"'><img onload='resizeImg(this,160,160);' src='"+l.imgUrlBig+"' alt='"+decodeURIComponent(r)+"' onerror='imgonerror(this)'></a></div>"),n.push("<div class='pro_price'><strong>&yen;</strong>"+l.price+"</div>"),n.push("<div class='rqpinfo'>"),n.push("<a href='"+l.url+"' target='_blank' onclick=\"return hcclick('?hcdetail_enterpriselog=detail_home_freesptctit');\" title='"+decodeURIComponent(r)+"'>"+decodeURIComponent(r)+"</a>"),parseInt(l.hasOnline)&&n.push("<p class='pro_ico'><s>&nbsp;</s></p>"),n.push("</div></li>"))}n.length>0&&t.html(n.join("")),y.addClass("loaded"),y.find(".proPic").show()}else y.hide()}else y.hide()}).fail(function(e){y.hide()})}function l(e,i){return $.ajax({url:e,data:i,timeout:3e3,scriptCharset:"utf-8",dataType:"jsonp",jsonp:"jsoncallback"})}function r(){$("div.friendMid span").bind("click",function(){var e=jQuery(this).index();$("div.comyanyList").find("ul").hide(),$("div.friendMid span").addClass("tabTitCur"),$("div.friendMid span").removeClass("newIntoTab"),$(this).removeClass("tabTitCur"),$(this).addClass("newIntoTab"),$("div.comyanyList").find("ul").eq(e).show()})}function d(){var e=$("#baidu945"),i=$("#baidu970");if(e.length=1==i.length){var t=$("#baidu945").offset().top,o=$("#baidu945").height(),n=$("#baidu970").offset().top;n>t+o+30||$("#baidu970").remove()}}function s(){var e=$("#smallCou"),i=$("#coupons");HC.HUB.addScript("//style.org.hc360.cn/js/detail/scripts/coupon/jq_moveXY.js",function(){$("#pic_roll").moveXY({effect:"buttonClick"})}),$(window).resize(function(){var t=$(window).width();t<1200?(i.css({left:"0","margin-right":"0"}),e.css({left:"0","margin-right":"0"})):(i.css({left:"auto",right:"50%","margin-right":"400px"}),e.css({left:"auto",right:"51%","margin-right":"480px"}))}),e.click(function(){i.show(),e.hide()}),$("#close09").click(function(){i.hide(),e.show()})}function c(e){var i=e.indexOf(".html");if(i&&i>0)return e.substring(32,i)}var p=t(117),h=new p;window.pageEntity=h;var u={likeMod:"//detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doProdbysupply/doProdbysupply",fillShopMod:"//detail.b2b.hc360.com/detail/turbine/action/ajax.DetailHomePageFillAjaxAction/eventsubmit_doNewsupply/doNewsupply",includedMod:"//detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doRelawordbysupply/doRelawordbysupply"},f={likeMod:15,includedMod:10,fillShopMod:20,optyM:{compOpty:10,newOpty:10,productOpty:15,miniOpty:15}},m=$("#homeRelatedMod"),g=m.find("ul"),v=$("#includedMod"),w=v.find("ul"),y=$("#fillShopMod"),b={compOpty:"seoIncludeSPList",newOpty:"seoIncludeSPList",productOpty:"seoProductRelaMod",miniOpty:"seoMiniRelaMod"},k=$.extend(!0,{homeRelatedM:{isShow:0},optyM:{isShow:0},fillShopM:{isShow:0}},window.moduleConf);v.length>0&&w.length>0&&(o(w.eq(0)),v.addClass("linkfbox")),m.length>0&&"1"===k.homeRelatedM.isShow&&n(),y.length>0&&"1"===k.fillShopM.isShow&&(y.show(),a()),r(),d(),s(),function(){$.ajax({type:"get",url:"//order.b2b.hc360.com/brandneworder/checkbuslinks.html",data:{providerid:window.providerId},timeout:3e3,dataType:"jsonp",jsonp:"jsoncallback",success:function(e){e&&($("#sytico").length>0?$("#sytico").show():$("#service-message").length>0&&$("#service-message").show())},error:function(e){}})}()}]);