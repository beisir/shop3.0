webpackJsonp([32],[function(n,i,e){function r(){this.categoryShowCount=20,this.pageMaxCount=199,this.frm1=$("#queryForm"),this.frm2=$("#listForm")}function t(n){var i=this;$.extend(!0,i,{param:{},url:{service:"",template:""},wrap:null,limit:4},n),0!==i.wrap.length&&t.prototype.init.call(i)}var o=e(117),a=new o;window.pageEntity=a,$(function(){var n=Boolean(window.ismmt)||!1;if(n){new t({param:{st:"splb"},wrap:$("#highQualityMod"),url:{service:"http://flow.org.hc360.com/flowtreasure/flowTreasureFP",template:"http://detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=page.businwindow"},limit:4})}(new r).init()}),r.prototype={init:function(){var n=this;n.showAndHide(),$("#byPriceBtn").on("click",function(){var i=$(this);i.hasClass("ArrowUpCur")||i.hasClass("ArrowDownCur")||n.queryByConditionFun("","a",""),i.hasClass("ArrowUpCur")&&!i.hasClass("ArrowDownCur")&&n.queryByConditionFun("","d",""),!i.hasClass("ArrowUpCur")&&i.hasClass("ArrowDownCur")&&n.queryByConditionFun("","a","")}),$("#byTimeBtn").on("click",function(){var i=$(this);i.hasClass("ArrowUpCur")||i.hasClass("ArrowDownCur")||n.queryByConditionFun("","","a"),i.hasClass("ArrowUpCur")&&!i.hasClass("ArrowDownCur")&&n.queryByConditionFun("","","d"),!i.hasClass("ArrowUpCur")&&i.hasClass("ArrowDownCur")&&n.queryByConditionFun("","","a")}),$("#resetBtn").on("click",function(){n.resetQueryFun()}),$("#confirmBtn").on("click",function(){n.queryByConditionFun("","","")}),$("#onLineTrade").on("click",function(){n.queryByConditionFun("","","")}),$(".pageNumCon").find("a").on("click",function(i){i.preventDefault();var e=$(this),r=e.attr("data-page");n.queryByConditionFun(r)}),$("#turnPageBtn").on("click",function(){n.turnPage()}),$(".OnConsulting").hide(),$(".dProList ul").find("li").hover(function(){var n=$(this);n.find(".OnConsulting").show(),HC.HUB.addScript("http://style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js",function(){n.find(".OnConsulting").queryDialog({is3y:"1"==window.scyps.sc.is3y,companyName:window.infoname||"",providerId:window.scyps.sc.providerId})})},function(){var n=$(this);n.find(".OnConsulting").hide()}),$.ajax({type:"get",url:"http://order.b2b.hc360.com/brandneworder/checkbuslinks.html",data:{providerid:window.providerId},timeout:3e3,dataType:"jsonp",jsonp:"jsoncallback",success:function(n){n&&($("#sytico").length>0?$("#sytico").show():$("#service-message").length>0&&$("#service-message").show())},error:function(n){}})},showAndHide:function(){var n=this,i=$("#mainContList").find("li").length,e=$("#mainContList").find("li:gt(19)");if(i>n.categoryShowCount){if($(".reClassShow").show(),0===e.length)return!1;e.hide(),$(".reClassShow").on("click",function(){e.show(),$(".reClassHide").show()}),$(".reClassHide").on("click",function(){e.hide(),$(".reClassHide").hide(),$(".reClassShow").show()})}else $(".reClassShow,.reClassHide").hide()},queryByConditionFun:function(n,i,e){var r=this,t=$.trim($("#priceH").val()),o=$.trim($("#priceL").val()),a=r.frm1.find("input[name='onLineTrade']"),s=r.frm1.find("input[name='priceOrderType']"),u=r.frm1.find("input[name='updateOrderType']"),l=r.frm1.find("input[name='page']");return o&&!r.isDigit(o)||t&&!r.isDigit(t)?(alert("\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u4ef7\u683c\uff01"),!1):(t&&o&&Number(t)<Number(o)&&($("#priceH").val(o),$("#priceL").val(t)),a&&a.is(":checked")&&a.val(1),n&&l.val(n),i?(s.val(i),u.val("")):e&&(u.val(e),s.val("")),void r.formSubmit(r.frm1))},resetQueryFun:function(){var n=this,i=n.frm1.find("#onLineTrade"),e=n.frm1.find("input[name='page']");n.frm1.find("input[name='searchname']").val(""),n.frm1.find("input[name='priceOrderType']").val(""),n.frm1.find("input[name='updateOrderType']").val(""),n.frm1.find("input[name='seriesId']").val(""),n.frm1.find("input[name='priceL']").val(""),n.frm1.find("input[name='priceH']").val(""),i&&i.val(""),e.val("1"),n.formSubmit(n.frm1)},turnPage:function(){var n=this,i=$.trim($("#pageInput").val());return n.isDigit(i)?i>n.pageMaxCount?(alert("\u586b\u5199\u7684\u9875\u7801\u4e0d\u80fd\u5927\u4e8e\u6700\u5927\u9875!"),!1):i<1?(alert("\u586b\u5199\u7684\u9875\u7801\u4e0d\u80fd\u5c0f\u4e8e1!"),!1):(n.frm2.find("input[name='page']").val(i),void n.formSubmit(n.frm2)):(alert("\u586b\u5199\u7684\u9875\u7801\u4e0d\u5408\u6cd5\uff01"),!1)},formSubmit:function(n){function i(n,i){var e="#PageNum#",r=n.indexOf(e);return r==-1?n:n=n.substring(0,r)+i+n.substring(r+e.length,n.length)}var e=n.attr("action"),r=n.find("input[name='page']").val();r=null==r||""==r?"":r,n.attr("action",i(e,r)),n.submit()},isDigit:function(n){var i,e,r;if(r="0123456789",0==n.length)return!1;for(i=0;i<n.length;i++)if(e=r.indexOf(n.charAt(i)),e==-1)return!1;return!0}},t.prototype.init=function(){var n=this;$.when.apply(null,n.getDeferreds()).done(function(i,e){var r=n.pretreatData(i[0]||[]);n.sendexposurelog(r),n.wrap.find("#highQualityList").html(mustache.render(e[0],{prolist:r})),n.wrap.show()}).fail(function(){n.wrap.hide()})},t.prototype.pretreatData=function(n){for(var i=this,e=n.slice(0,i.limit),r=[],t=0;t<e.length;t++){var o={title:e[t].bc_title.replace(/\\/gim,""),url:e[t].supplyself_url,midPic:e[t].image210,price:e[t].bc_price,curPriceUnit:null,bcid:e[t].bc_id,count:t+1};o.curPriceUnit=Number(e[t].bc_price)?"<strong>&yen</strong>"+e[t].bc_price:"\u9762\u8bae",o.trade=1===Number(e[t].is_support_trade)?"<s>&nbsp;</s>":"",r.push(o)}return r},t.prototype.sendexposurelog=function(n){for(var i=[],e=0;e<n.length;e++)i.push("llb_detailbcid"+n[e].bc_id);i.length&&HC.exposure.sendexposurelog({exposurecompany:"",exposureproduct:i.join("#&#"),exposureadvert:""})},t.prototype.getDeferreds=function(){var n=this,i=[];i.push($.ajax({url:n.url.service,type:"GET",dataType:"jsonp",jsonp:"callbackparam",timeout:3e3,scriptCharset:"utf-8",data:n.param})),i.push($.ajax({url:n.url.template,type:"GET",dataType:"jsonp"}));var r=$.Deferred();return i.push(r),e.e(3,function(n){e(54),r.resolve()}),i}}]);