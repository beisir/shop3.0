webpackJsonp([35],[function(e,n,o){var t=o(117),s=new t,a=function(){this.messageBtn=$("[data-node-name=pageComMessage]"),this.sendPhoneBtn=$("[data-node-name=sendMsgToPhone]"),this.initContactIcon(),this.bindEvent()};a.prototype={initContactIcon:function(){$.when($.ajax({url:"http://madata.hc360.com/mobileweb/m/get/bindstatus",dataType:"jsonp",data:{imid:window.userName||window.welfarename}})).done(function(e){flag="200"==e.code,flag&&$("#contactChat").removeClass("contactChat").addClass("contactWX2")}).fail(function(){console.warn("Error on Internet,Please try again later!")})},bindEvent:function(){var e=this,n=$("#companyTmLayerWei");$(".wxIcoNew").mouseenter(function(){n.show()}).mouseleave(function(){n.hide()}),$("#qrcode1").mouseenter(function(){$(this).find(".cxcode2").show()}).mouseleave(function(){$(this).find(".cxcode2").hide()}),e.messageBtn.click(function(){window.righToolbar&&window.righToolbar.messageDialog&&window.righToolbar.messageDialog()}),e.sendPhoneBtn.click(function(){return e.sendMyPhoneHtml?void(e.msgDownload?resetCorMessage():$.getScript("http://style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js",function(){e.msgDownload=!0,resetCorMessage()})):void $.ajax({url:"http://detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=sendMyPhoneHtml",dataType:"jsonp",success:function(n){e.sendMyPhoneHtml=n,$(".contact3Btn").append(n),e.msgDownload||$.getScript("http://style.org.hc360.cn/js/detail/scripts/contact_msgDownload.min.js",function(){e.msgDownload=!0,resetCorMessage()})}})}),HC.HUB.addScript("http://style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js",function(){$("#contactChat").queryDialog({is3y:"1"==window.scyps.sc.is3y,companyName:window.infoname||"",providerId:window.scyps.sc.providerId})}),$.ajax({type:"get",url:"http://order.b2b.hc360.com/brandneworder/checkbuslinks.html",data:{providerid:window.providerId},timeout:3e3,dataType:"jsonp",jsonp:"jsoncallback",success:function(e){e&&($("#sytico").length>0?$("#sytico").show():$("#service-message").length>0&&$("#service-message").show())},error:function(e){}})}},new a,window.pageEntity=s}]);