webpackJsonp([31],{149:function(t,n){function e(t){this.moduleContainer=t,this.switchBtn=t.find("#switchBtn"),this.showNum=4,this.currentPage=0,this.ajaxUrl="//detail.b2b.hc360.com/detail/turbine/action/ajax.SmartWinAjax/eventsubmit_doGet/doGet",this.ajaxData={username:userName,memTypeId:memTypeId},"undefined"!=typeof keyword&&$.extend(this.ajaxData,{keyword:encodeURIComponent(keyword)}),this.countNum=0,this.pageTotal=0,"undefined"!=typeof showFlag&&1==showFlag?(this.showFlag=showFlag,this.initLayer()):this.bindsynchroFun()}e.prototype={bindsynchroFun:function(){var t=this;t.switchBtn.on("click",function(){var t=$("ul[name=smartWinUL]"),n=$("ul[name=smartWinUL][class!=imgDisplayNone]"),e=n.attr("id");$("ul[name=smartWinUL]").attr("class","imgDisplayNone"),e>=t.length-1+1e4?$("#10000").toggleClass("imgDisplayNone"):(e=Number(e)+1,$("#"+e).toggleClass("imgDisplayNone"))})},initLayer:function(){var t=this;t.moduleContainer.length>0&&("1"===t.showFlag?t.initData():t.moduleContainer.find("ul li").length<=t.showNum&&t.switchBtn.hide(),t.bindEvent())},initData:function(){function t(t){var n=t.indexOf(".html");if(n&&n>0)return t.substring(32,n)}var n=this;$.ajax({url:n.ajaxUrl,data:n.ajaxData,timeout:3e3,dataType:"jsonp",jsonp:"jsoncallback",success:function(e){if(e&&"1"==e.success){n.countNum=parseInt(e.countNum);var i=n.countNum%n.showNum;n.pageTotal=0===i?n.countNum/n.showNum:n.countNum/n.showNum+1;var o=e.productList,a="",r="",s="";n.countNum>n.showNum&&0!==i&&(o=o.concat(o.slice(0,n.showNum-i))),n.countNum<5&&n.switchBtn.hide();for(var u=0;u<o.length;u++){var l=o[u];""!==l.title&&(a=l.title.replace(new RegExp("\\+","gm")," "),a=decodeURIComponent(a));var c=t(l.url);l.imgUrl=""==l.imgUrl?"//b2b.hc360.com/mmtTrade/images/nopic.jpg":l.imgUrl,s=s+"<li><div class='wRepro'><table><tr><td><a target='_blank1' data-exposurelog='"+n.ajaxData.username+","+c+"' href='"+l.url+"' title='"+a+"' onclick=\"return hcclick('?"+userLog.img+"');\"><img onerror='imgonerror(this)' onload='resizeImg(this,160,160)' src='"+l.imgUrl+"' alt='"+a+"'/></a></td></tr></table></div><p class='pro_price'>",1==l.hasOnline&&(s+="<strong>&yen;</strong>"),r=decodeURIComponent(l.price),"\u9762\u8bae"!==r&&(r+=""==l.unit?"":"/"+decodeURIComponent(l.unit)),s+=r+"</p><div class='wReproinfo'><a target='_blank' href='"+l.url+"' title='"+a+"' onclick=\"return hcclick('?"+userLog.title+"');\">"+a+"</a>","1"===l.hasOnline&&(s+="<p class='pro_ico'><s>&nbsp;</s></p>"),s+="</div></li>"}""!==s?(n.moduleContainer.find("ul").html(s),n.countNum=n.moduleContainer.find("ul li").length,n.moduleContainer.show()):n.moduleContainer.hide()}else n.moduleContainer.hide()},error:function(){n.moduleContainer.hide()}})},bindEvent:function(){var t=this;t.switchBtn.on("click",function(){var n=t.moduleContainer.find(".contentbox ul li:eq(0)");t.countNum>t.showNum&&(t.currentPage++,t.currentPage=t.currentPage>t.pageTotal-1?0:t.currentPage,t.moduleContainer.find("ul").css({marginLeft:-n.outerWidth(!1)*t.showNum*t.currentPage})),window.hcclick&&window.hcclick("?"+userLog.switchBtn)})}},t.exports=e}});