webpackJsonp([32],{

/***/ 149:
/***/ (function(module, exports) {

	/**
	 * Created by xyh on 2016/11/18.
	 */
	function SmartWindow(container){

	    this.moduleContainer = container;//智能橱窗模块容器
	    this.switchBtn = container.find("#switchBtn");//智能橱窗换一换按钮
	    this.showNum = 4;//展示的个数
	    this.currentPage = 0;//默认当前页
	    this.ajaxUrl = '//detail.b2b.hc360.com/detail/turbine/action/ajax.SmartWinAjax/eventsubmit_doGet/doGet';//请求的接口

	    this.ajaxData = {
	        username : userName,//取当前页全局变量username
	        memTypeId : memTypeId//取当前页全局变量memTypeId
	    };

	    if(typeof keyword != "undefined"){
	        $.extend(this.ajaxData,{keyword : encodeURIComponent(keyword)});
	    }

	    this.countNum = 0;//默认总数
	    this.pageTotal = 0;//默认总页数

	    /**
	     * 【注意：智能橱窗异步是由前端渲染产品，
	     *  而异步是由后台初始化产品，前端只负责换一换按钮操作】
	     */
	    if(typeof showFlag != 'undefined' && showFlag == 1){
	        this.showFlag = showFlag;//取当前页全局变量showFlag(0是同步，1是异步)
	        this.initLayer();//异步操作
	    }else{
	        this.bindsynchroFun();//同步操作
	    }

	}

	SmartWindow.prototype = {

	    /**
	     * 同步操作
	     */
	    bindsynchroFun:function(){

	        var _t = this;
	        //换一换
	        _t.switchBtn.on('click',function(){

	            var smartWinULs=$("ul[name=smartWinUL]");
	            var smartWinUL=$("ul[name=smartWinUL][class!=imgDisplayNone]");
	            var currentIndex=smartWinUL.attr("id");
	            $("ul[name=smartWinUL]").attr("class","imgDisplayNone");
	            if(currentIndex>=smartWinULs.length-1+10000){
	                $("#10000").toggleClass("imgDisplayNone");//.attr("class","");
	            }else{
	                currentIndex=Number(currentIndex)+1;
	                $("#"+currentIndex).toggleClass("imgDisplayNone");
	            }
	        });
	    },

	    /**
	     * 异步操作
	     */
	    initLayer:function(){

	        var _t = this;
	        if(_t.moduleContainer.length > 0){
	            if(_t.showFlag === "1"){
	                _t.initData();
	            }else{
	                if(_t.moduleContainer.find("ul li").length <= _t.showNum){
	                    _t.switchBtn.hide();
	                }
	            }
	            _t.bindEvent();
	        }

	    },

	    initData:function(){

	        var _t = this;

	        $.ajax({
	            "url": _t.ajaxUrl,
	            "data": _t.ajaxData,
	            "timeout": 3000,
	            "dataType": "jsonp",
	            "jsonp": "jsoncallback",
	            "success": function (data) {
	                if (data && data.success == "1") {//获得数据成功
	                    _t.countNum = parseInt(data.countNum);//总个数
	                    var _num = _t.countNum % _t.showNum;
	                    _t.pageTotal = (_num === 0) ? (_t.countNum / _t.showNum) : (_t.countNum / _t.showNum) + 1;//总页数
	                    var list = data.productList, title = "", price = "";
	                    var html = "";
	                    if (_t.countNum > _t.showNum && _num !== 0) {//总数超过4条，并且取余之后不足一页的数据，进行补全
	                        list = list.concat(list.slice(0, _t.showNum - _num));
	                    }
	                    if (_t.countNum < 5) {//小于5条不显示按钮
	                        _t.switchBtn.hide();
	                    }
	                    for (var i = 0; i < list.length; i++) {
	                        var obj = list[i];
	                        if (obj.title !== "") {
	                            title = obj.title.replace(new RegExp("\\+", "gm"), " ");
	                            title = decodeURIComponent(title);
	                        }
	                        var ids = getId(obj.url);
	                        obj.imgUrl = (obj.imgUrl == "" ? "//b2b.hc360.com/mmtTrade/images/nopic.jpg" : obj.imgUrl);
	                        html = html + "<li><div class='wRepro'><table><tr><td>"
	                            + "<a target='_blank1' data-exposurelog='" + _t.ajaxData.username + "," + ids + "' href='" + obj.url + "' title='" + title + "' onclick=\"return hcclick('?" + userLog.img + "');\">"
	                            + "<img onerror='imgonerror(this)' onload='resizeImg(this,160,160)' src='" + obj.imgUrl + "' alt='" + title + "'/>"
	                            + "</a></td></tr></table>"
	                            + "</div>"
	                            + "<p class='pro_price'>";
	                        if (obj.hasOnline == 1) {
	                            html += "<strong>&yen;</strong>";
	                        }
	                        price = decodeURIComponent(obj.price);
	                        if (price !== "面议") {
	                            price = price + (obj.unit == "" ? "" : ("/" + decodeURIComponent(obj.unit)));
	                        }
	                        html += price + "</p>"
	                            + "<div class='wReproinfo'><a target='_blank' href='" + obj.url + "' title='" + title + "' onclick=\"return hcclick('?" + userLog.title + "');\">" + title + "</a>"
	                        if (obj.hasOnline === "1") {
	                            html = html + "<p class='pro_ico'><s>&nbsp;</s></p>";
	                        }

	                        html = html + "</div></li>";
	                    }
	                    if (html !== "") {
	                        _t.moduleContainer.find('ul').html(html);
	                        _t.countNum = _t.moduleContainer.find('ul li').length;
	                        _t.moduleContainer.show();
	                    } else {
	                        _t.moduleContainer.hide();
	                    }
	                } else {
	                    _t.moduleContainer.hide();
	                }
	            },
	            error: function () {
	                _t.moduleContainer.hide();
	            }
	        });


	        function getId(href) {
	            var len = href.indexOf('.html');
	            if (len && len > 0) {
	                return href.substring(32, len);
	            }
	        }

	        function imgonerror(img) {
	            var noneImg = "//b2b.hc360.com/mmtTrade/images/nopic.jpg";
	            img.src = noneImg;
	            img.onerror = null;
	        }

	        function resizeImg(img, oAW, oAH) {
	            var oimgW = img.width,
	                oimgH = img.height,
	                oimg = img,
	                oY = (oimgH / oimgW).toFixed(2),
	                oX = (oimgW / oimgH).toFixed(2);
	            if (oimgW <= oAW && oimgH <= oAH) {//图片高和宽比指定的宽高都小
	                oimg.style.height = oimgH + 'px';
	                oimg.style.width = oimgW + 'px';
	            } else if (oimgW >= oAW && oimgH >= oAH) {//图片高和宽比指定的宽高都大
	                if (oY * oAW >= oAH) { //图片高比宽大
	                    oimg.style.height = oAH + 'px';
	                    oimg.style.width = oX * oAH + 'px';
	                } else { //图片高比宽小
	                    oimg.style.height = oY * oAH + 'px';
	                    oimg.style.width = oAW + 'px';
	                }
	            } else if (oimgW > oAW && oimgH < oAH) {//图片宽比指定宽大，高比指定的小
	                oimg.style.height = oY * oAW + 'px';
	                oimg.style.width = oAW + 'px';
	            } else if (oimgW < oAW && oimgH > oAH) {//图片宽比指定宽小，高比指定的大
	                oimg.style.height = oAH + 'px';
	                oimg.style.width = oX * oAH + 'px';
	            }
	        }

	    },

	    bindEvent:function(){
	        var _t = this;
	        _t.switchBtn.on("click", function () {
	            var _li = _t.moduleContainer.find(".contentbox ul li:eq(0)");
	            if (_t.countNum > _t.showNum) {
	                _t.currentPage++;
	                _t.currentPage = _t.currentPage > (_t.pageTotal - 1) ? 0 : _t.currentPage;
	                /**[注意：由于jquery和jquery-ui脚本有方法outerWidth同名的冲突，故_li.outerWidth()中传入参数“false”以确保进入jquery的方法]*/
	                _t.moduleContainer.find('ul').css({"marginLeft": (-_li.outerWidth(false) * _t.showNum * _t.currentPage)});
	            }
	            if(window.hcclick){
	                window.hcclick("?" + userLog.switchBtn);
	            }
	        });
	    }

	};
	module.exports = SmartWindow;

/***/ })

});