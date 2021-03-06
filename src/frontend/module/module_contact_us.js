/**
 * [module_contact_us 联系我们模块渲染逻辑]
 * @return {[type]} [description]
 */
function module_contact_us(moduleEntity) {
	var _this = this;

	/**
	 * [初始化模块元素引用]
	 */
	$.extend(true, _this, {

		/**
		 * [btnLeaveMessage 给我留言按钮元素]
		 * @type {Object}
		 */
		btnLeaveMessage: moduleEntity.htmlEntity.find('[data-btn-name="btnLeaveMessage"]')
	});

	/**
	 * 初始化模块业务逻辑
	 */
	module_contact_us.prototype.init.call(_this);
}

/**
 * [init 初始化]
 */
module_contact_us.prototype.init = function() {
	var _this = this;

	/**
	 * [绑定给我留言按钮点击事件]
	 */
	_this.btnLeaveMessage.click(function(event) {

		/**
		 * 确认右侧工具条加载完成并完成初始化，再调用右侧工具条对象的相应方法
		 */
		window.righToolbar && window.righToolbar.messageDialog && window.righToolbar.messageDialog();
	});
	/***
	 * 初始化联系我们里面的qq和微信
	 */
	this.initQQFFMod();
};

module_contact_us.prototype.initQQFFMod=function(){
	var bcid=(window.scyps&&window.scyps.sc&&window.scyps.sc.id)||"",
		qqMonitor="",
		userId=(window.scyps&&window.scyps.sc&&window.scyps.sc.userId)||"";
	if(window.ismmt){//收费
		qqMonitor='onmousedown="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_qq_float_1?detailuserid='+userId+'&quot;)"';
	}else{//免费
		qqMonitor='onmousedown="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_qq_float_free_1?detailuserid='+userId+'&quot;)"';
	}
	$.ajax({
		url:"//detail.b2b.hc360.com/detail/turbine/template/saleser,qqser.html?jsoncallback=?",
		data:{
			providerId: window.providerId
		},
		dataType: "jsonp",
		success:function(result){
			var qqlist=result.listQQ,
				qqHtml="";
			if(qqlist.length>0){
				var item=qqlist[0];
				qqHtml='<a href="//wpa.qq.com/msgrd?v=3&uin='+item.qq+'&site=qq&menu=yes" target="_blank" onclick="return hcclick(&quot;?hcdetail_enterpriselog=contact_qq&quot;);" class="leftqqIco"'+qqMonitor+'/></a>';
			}

			$.when(getBindStatusDef()).done(function (res) {
				//绑定微信时，微信图标点亮
				if(res && res.code=="200"){
					qqHtml+='<a href="javascript:;" class="awxIco" data-bcid="'+bcid+'" onmousedone="HC.UBA.sendUserlogsElement(UserBehavior_detail_fafa_float_1?detailuserid='+userId+'),return hcclick(&quot;?hcdetail_enterpriselog=contact_weixin&quot;)"><img data-query="weixin" src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/wxIco1.png" /></a>'
				}else{
					qqHtml+='<a href="javascript:;" class="awxIco" data-bcid="'+bcid+'" onmousedone="HC.UBA.sendUserlogsElement(UserBehavior_detail_fafa_float_1?detailuserid='+userId+'),return hcclick(&quot;?hcdetail_enterpriselog=contact_weixin&quot;)"><img data-query="weixin" src="//style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/wxIco2.png" /></a>'
				}
				$('[data-node-name="companyServiceMod"]').html(qqHtml);

				/**
				 * 初始化微信图标弹框  
				 */
				HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {
					
							$('[data-query="weixin"]').queryDialog({
							is3y:window.scyps.sc.is3y=="1" ? true : false,
							companyName:window.infoname || '',
							providerId:window.scyps.sc.providerId
							});
					
				});
			})
						
		}
	});

	function getBindStatusDef() {
        return $.ajax({
          url: "//madata.hc360.com/mobileweb/m/get/bindstatus",
          dataType:"jsonp",
          data:{"imid":window.company_username||window.welfarename || window.userName }
        })
    }
    
};
module.exports = module_contact_us;