var page = require('./page');

/**
 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
 * @type {Object}
 */
// require('./template/page.data')();

/**
 * 实例化页面业务对象
 */
var pageEntity = new page();

/**
 * [pageEntity 将页面业务对象暴露到全局]
 * @type {Object}
 */
window.pageEntity = pageEntity;

/**
 * [resizeEvalIframe 定义全局重置iframe高度的方法，以重置 卖家累计信用 框架页高度]
 */
window.resizeEvalIframe = function() {
	document.domain = "hc360.com";
	var iframe = document.getElementById("evalFrame");
	try {
		var minHeight = "480";
		jQuery('#evalFrame').height(minHeight);
		var h = "0";
		if (iframe.contentDocument && iframe.contentDocument.body.offsetHeight) { // ff,chrome等
			h = parseInt(iframe.contentDocument.body.offsetHeight);
		} else if (iframe.Document && iframe.Document.body.scrollHeight) { // IE
			h = parseInt(iframe.Document.body.scrollHeight);
		} else {
			var bHeight = parseInt(iframe.contentWindow.document.body.scrollHeight);
			var dHeight = parseInt(iframe.contentWindow.document.documentElement.scrollHeight);
			h = Math.max(bHeight, dHeight);
		}
		if (h < minHeight) {
			h = minHeight;
		}
		jQuery('#evalFrame').height(h);

		if (jQuery(window).scrollTop() > 450) {
			jQuery(window).scrollTop(180);
		}
	} catch (ex) {}
};

/**----------------------------------公司介绍页面业务--------------------------------------------------------*/
$(function () {

	$.when(loadComponent()).done(function(){

        var leftBtn = $('.fieldCon .fLeftArrow'),//向左滑按钮
            rightBtn = $('.fieldCon .fRigArrow'),//向右滑按钮
            fieldDiv = $("#field_details"),//图片区域
            fieldBot = $('.fieldBot');//标识区域


        //如果仅存在一张照片，则左右按钮、标识区域隐藏
        if(fieldDiv.find('li').length<2){
            leftBtn.hide();
            rightBtn.hide();
            fieldBot.hide();
        }

        if(fieldBot.find(".fieldLink a").length > 5){
            fieldBot.css('height','108px');
        }

        //鼠标移入标识区域显示，移出隐藏
        /*fieldDiv.parent().parent().hover(function(){
            if(fieldDiv.find('li').length>1){
                //如果标识超过5个（即两行）就要控制高度为108
                if(fieldBot.find(".fieldLink a").length > 5){
                    fieldBot.css('height','108px');
                }
                fieldBot.show();
            }
        },function(){
            fieldBot.hide();
        });*/

        //初始化owlCarousel
        fieldDiv.owlCarousel({
            singleItem: true,
            afterAction:function () {
                var index = $('.owl-pagination').find('.active').index();
                /**查找页码对应的标识*/
                var identifier = $('.owl-wrapper .owl-item:eq('+index+')').find('li').attr('id').split("_")[0];
                /**将对应的标识加亮*/
                $("a[data-id='"+ identifier +"']").addClass('fieldCir').siblings('a').removeClass('fieldCir');
            }
        });

        //向左移动
        leftBtn.on('click',function () {
            fieldDiv.trigger("owl.prev");
        });

        //向右移动
        rightBtn.on('click',function () {
            fieldDiv.trigger("owl.next");
        });

        //点击标识跳转到对应的照片
        var owl = $(".owl-carousel").data('owlCarousel');
        $('.fieldLink a').on('click',function(){
            var $this = $(this);
            var identifier = $this.attr('data-id');
            var num = $('.owl-wrapper').find('li[id ^= "'+ identifier +'_"]:eq(0)').closest('.owl-item').index();
            owl.jumpTo(num);
        })
	});

	/**y异步加载owlCarousel组件*/
    function loadComponent(){
    	var owlCarouselDef = $.Deferred();
    	require.ensure([], function(require) {
            require('OwlCarousel');
            owlCarouselDef.resolve();
        }, 'components/OwlCarousel/OwlCarousel');
    	return owlCarouselDef;
    }

    /**
     * 资质证书和认证报告没有连接的友情给提示
     */
    $(".certificateBox li").on('click',function () {
        var $this = $(this);
        if(!$this.find('a') || $this.find('a').length<1){
            if($this.hasClass('cerLeft')){
                alert('暂无资质证书上传!');
            }else{
                alert('暂无实地认证报告上传!');
            }
        }
    });

    /**
     * [显示企业档案模块的 商盈通 图标逻辑]
     */
    $.ajax({
      type: "get",
      url: "//order.b2b.hc360.com/brandneworder/checkbuslinks.html",
      data: {
        providerid: window.providerId
      },
      timeout: 3000,
      dataType: "jsonp",
      jsonp: "jsoncallback",
      success: function(result) {
        if (result) {
          if ($("#sytico").length > 0) {
            $("#sytico").show();
          } else if ($("#service-message").length > 0) {
            $("#service-message").show();
          }
        }
      },
      error: function(e) {}
    });
});
