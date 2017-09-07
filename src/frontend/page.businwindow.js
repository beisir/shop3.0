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
 * [定义文档DOMContentLoaded事件监听函数]
 */
$(function() {

	/**
	 * [membertype 获取用户类型]
	 * @type {Boolean}
	 */
	var membertype = Boolean(window['ismmt']) || false;


	/**
	 * 初始化流量宝业务
	 */
	if (membertype) {
		var hignQualityEntity = new HighQuality({

			/**
			 * [param 参数对象]
			 * @type {Object}
			 */
			param: {
				st: 'splb'
			},

			/**
			 * [wrap 包裹元素]
			 * @type {Object}
			 */
			wrap: $("#highQualityMod"),

			/**
			 * [url 服务地址]
			 * @type {String}
			 */
			url: {

				/**
				 * [service 数据服务地址]
				 * @type {String}
				 */
				service: '//flow.org.hc360.com/flowtreasure/flowTreasureFP',

				/**
				 * [template 模板服务地址]
				 * @type {String}
				 */
				template: '//detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=page.businwindow'
			},

			/**
			 * [limit 渲染数据上限]
			 * @type {Number}
			 */
			limit: 4
		});
	}

	/**
	 *供应产品的业务对象
	 */
	new SupplyProduct().init();

});


/**
 * 供应产品业务对象
 * @constructor
 */
function SupplyProduct(){
	this.categoryShowCount = 20;//全部分类要展示的数量
	this.pageMaxCount = 199;//能跳转页码的最大数量
	this.frm1 = $("#queryForm");//条件搜索form
	this.frm2 = $("#listForm");//页码搜索form
}
SupplyProduct.prototype = {

	/**
	 * 初始化
	 */
	init:function(){
		var _t = this;
		_t.showAndHide();

		/**
		 * 按价格搜索
		 */
		$("#byPriceBtn").on('click',function(){
            var $this = $(this);
            if((!$this.hasClass('ArrowUpCur')) && (!$this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','a','');
			}
			if($this.hasClass('ArrowUpCur') && (!$this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','d','');
			}
            if((!$this.hasClass('ArrowUpCur')) && ($this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','a','');
            }

		});

		/**
		 * 按时间搜索
		 */
		$("#byTimeBtn").on('click',function(){
			var $this = $(this);
            if((!$this.hasClass('ArrowUpCur')) && (!$this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','','a');
            }
            if($this.hasClass('ArrowUpCur') && (!$this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','','d');
            }
            if((!$this.hasClass('ArrowUpCur')) && ($this.hasClass('ArrowDownCur'))){
                _t.queryByConditionFun('','','a');
            }
		});

		/**
		 * 全部搜索（即重置）
		 */
		$("#resetBtn").on('click',function(){
			_t.resetQueryFun();
		});

		/**
		 * 确定按钮
		 */
		$("#confirmBtn").on('click',function(){
			_t.queryByConditionFun('','','');
		});

		/**
		 * 在线交易搜索
		 */
		$("#onLineTrade").on('click',function(){
			_t.queryByConditionFun('','','');
		});

		/**
		 * 点击页码事件
		 */
		$(".pageNumCon").find("a").on('click',function(e){
            e.preventDefault();
			var $this = $(this);
			var pageNum = $this.attr("data-page");
			_t.queryByConditionFun(pageNum);
		});

		/**
		 * 页码跳转
		 */
		$("#turnPageBtn").on('click',function(){
			_t.turnPage();
		});

		/**
		 * 鼠标悬浮在线咨询
		 */
		$(".OnConsulting").hide();
		$(".dProList ul").find("li").hover(function(){
			var $this = $(this);
      $this.find(".OnConsulting").show();
      /**
       * 初始化在线咨询按钮
       */
      HC.HUB.addScript('//style.org.hc360.com/js/module/shop3.0/dist/common/jquery-inqueryOnline.dialog.js',function () {

        $this.find(".OnConsulting").queryDialog({
          is3y:window.scyps.sc.is3y=="1" ? true : false,
          companyName:window.infoname || '',
          providerId:window.scyps.sc.providerId
        });

      });

		},function(){
			var $this = $(this);
			$this.find(".OnConsulting").hide();
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
	},

	/**
	 * 全部分类的收起和展开
	 */
	showAndHide:function(){
		var _t = this;

		var totalCount = $("#mainContList").find('li').length ,//全部分类总数
			afterCategory20 = $("#mainContList").find('li:gt(19)');//默认隐藏的部分（20个之后就是隐藏的）

		if(totalCount > _t.categoryShowCount){//所有分类超过20个
			//$(".reClassHide").hide();
            $(".reClassShow").show();

			if(afterCategory20.length === 0){
                return false;
			}

			/**
			 * 默认隐藏的第20个之后的部分
			 */
			afterCategory20.hide();

			/**
			 * 点击加载更多
			 */
			$(".reClassShow").on('click',function(){
				afterCategory20.show();
				$(".reClassHide").show();
			});

			/**
			 * 收起
			 */
			$(".reClassHide").on('click',function(){
				afterCategory20.hide();
				$(".reClassHide").hide();
				$(".reClassShow").show();
			});

		}else{//所有分类没有超过20个

			$(".reClassShow,.reClassHide").hide();
		}


	},

	/**
	 * 按条件搜索
	 * @param pageNum
	 * @param priceOrderValue
	 * @param updateOrderValue
     */
	queryByConditionFun:function(pageNum,priceOrderValue,updateOrderValue){
		var _t = this,
			priceH = $.trim($("#priceH").val()),//高价格
			priceL = $.trim($("#priceL").val()),//低价格
			onLineTrade = _t.frm1.find("input[name='onLineTrade']"),//在线交易
			priceOrderType = _t.frm1.find("input[name='priceOrderType']"),
			updateOrderType = _t.frm1.find("input[name='updateOrderType']"),
			page = _t.frm1.find("input[name='page']");

		//验证价格是否合法
		if((priceL&&!_t.isDigit(priceL))||(priceH&&!_t.isDigit(priceH))){
			alert("请输入合法的价格！");
			return false;
		}
		//如果低价格高于高价格，两者互换
		if(priceH&&priceL&&Number(priceH)<Number(priceL)){
			$("#priceH").val(priceL);
			$("#priceL").val(priceH);
		}
		//在线交易是否选中
		if(onLineTrade&&onLineTrade.is(":checked")){
			onLineTrade.val(1);
		}

		if(pageNum){
			page.val(pageNum);
		}
		if(priceOrderValue){
			priceOrderType.val(priceOrderValue);
			updateOrderType.val("");
		}else if(updateOrderValue){
			updateOrderType.val(updateOrderValue);
			priceOrderType.val("");
		}

		_t.formSubmit(_t.frm1);
	},

	/**
	 * 重置搜索
	 */
	resetQueryFun:function(){
		var _t = this,
			onLineTrade = _t.frm1.find("#onLineTrade"),
			page = _t.frm1.find("input[name='page']");

		_t.frm1.find("input[name='searchname']").val("");
		_t.frm1.find("input[name='priceOrderType']").val("");
		_t.frm1.find("input[name='updateOrderType']").val("");
		_t.frm1.find("input[name='seriesId']").val("");
		_t.frm1.find("input[name='priceL']").val("");
		_t.frm1.find("input[name='priceH']").val("");

		if(onLineTrade){
			onLineTrade.val("");
		}
		page.val("1");

		_t.formSubmit(_t.frm1);
	},

	/**
	 * 页码跳转
	 * @param pageInput
     */
	turnPage: function(){
		var _t = this,
			pageNum = $.trim($("#pageInput").val());

		if(!_t.isDigit(pageNum)){
			alert("填写的页码不合法！");
			return false;
		}
		if(pageNum>_t.pageMaxCount){
			alert("填写的页码不能大于最大页!");
			return false;
		}
		if(pageNum<1){
			alert("填写的页码不能小于1!");
			return false;
		}
		_t.frm2.find("input[name='page']").val(pageNum);
		_t.formSubmit(_t.frm2);
	},

	/**
	 * 表单提交
	 * @param frm
	 * @returns {boolean}
     */
	formSubmit:function(frm){

		var url = frm.attr("action");
		var pagenum =frm.find("input[name='page']").val();
		pagenum = (pagenum == null || pagenum == "") ? "" : pagenum;
		frm.attr("action",getPageUrl(url,pagenum));
		frm.submit();

		function getPageUrl(url,pagenum) {
			var tagName = '#PageNum#';
			var idx = url.indexOf(tagName);
			if (idx == -1){
                return url;
			} else {
				url = url.substring(0, idx) + pagenum + url.substring(idx+tagName.length,url.length);
				return url;
			}
		}

	},

	/**
	 * 验证是否是数字
	 * @param NUM
	 * @returns {boolean}
     */
	isDigit: function (NUM){
		var i,j,strTemp;
		strTemp="0123456789";
		if (NUM.length==0){
			return false ;
		}
		for (i=0;i<NUM.length;i++)
		{
			j=strTemp.indexOf(NUM.charAt(i));
			if (j==-1)
			{
				return false;
			}
		}
		return true;
	}


};

//===========================================================================================================

/**
 * [HighQuality 流量宝模块业务对象]
 */
function HighQuality(options) {
	var _this = this;

	/**
	 * 扩展本地配置
	 */
	$.extend(true, _this, {

		/**
		 * [param 参数对象]
		 * @type {Object}
		 */
		param: {},

		/**
		 * [url 服务地址]
		 * @type {String}
		 */
		url: {

			/**
			 * [service 数据服务地址]
			 * @type {String}
			 */
			service: '',

			/**
			 * [template 模板服务地址]
			 * @type {String}
			 */
			template: ''
		},

		/**
		 * [wrap 包裹元素]
		 * @type {Object}
		 */
		wrap: null,

		/**
		 * [limit 渲染数据上限]
		 * @type {Number}
		 */
		limit: 4
	}, options);

	/**
	 * [不存在包裹元素直接返回]
	 */
	if(_this.wrap.length===0){
		return;
	}

	/**
	 * 初始化
	 */
	HighQuality.prototype.init.call(_this);
}

/**
 * [init 初始化]
 */
HighQuality.prototype.init = function() {
	var _this = this;

	/**
	 * [数据、模板、模板引擎加载完成后开始渲染]
	 */
	$.when.apply(null, _this.getDeferreds()).done(function(dataAjaxArgs, templateAjaxArgs) {

		/**
		 * [data 预处理数据]
		 * @type {Object}
		 */
		var data = _this.pretreatData(dataAjaxArgs[0] || []);

		/**
		 * [发送曝光数据]
		 */
		_this.sendexposurelog(data);

		/**
		 * 渲染页面
		 */
		_this.wrap.find('#highQualityList').html(mustache.render(templateAjaxArgs[0], {
			prolist: data
		}));
		_this.wrap.show();
	}).fail(function() {

		/**
		 * 隐藏包裹元素
		 */
		_this.wrap.hide();
	});
};

/**
 * [pretreatData 预处理数据]
 * @param  {Object} data [处理前数据]
 * @return {Object}      [处理后数据]
 */
HighQuality.prototype.pretreatData = function(data) {
	var _this = this,

		/**
		 * [_data 根据上限值截取返回数据]
		 * @type {Array}
		 */
		_data = data.slice(0, _this.limit),

		/**
		 * [_dataResult 返回数据]
		 * @type {Array}
		 */
		_dataResult = [];

	/**
	 * [将数据处理成模板引擎需要的数据]
	 */
	for (var i = 0; i < _data.length; i++) {
		var _dataEntityTemp = {
			title: _data[i].bc_title.replace(/\\/igm, ''),
			url: _data[i].supplyself_url,
			midPic: _data[i].image210,
			price: _data[i].bc_price,
			curPriceUnit: null,
			bcid: _data[i].bc_id,
			count: i + 1
		};
		_dataEntityTemp.curPriceUnit = Number(_data[i].bc_price) ? ("<strong>&yen</strong>" + _data[i].bc_price) : '面议';
		_dataEntityTemp.trade = (Number(_data[i].is_support_trade) === 1) ? ("<s>&nbsp;</s>") : '';
		_dataResult.push(_dataEntityTemp);
	}
	return _dataResult;
};

/**
 * [sendexposurelog 发送曝光数据日志]
 */
HighQuality.prototype.sendexposurelog = function(data) {
	var _this = this,
		_exposurelogs = [];

	/**
	 * [组装曝光数据]
	 */
	for (var i = 0; i < data.length; i++) {
		_exposurelogs.push("llb_detailbcid" + data[i].bc_id);
	}

	/**
	 * [发送曝光数据]
	 */
	_exposurelogs.length && HC.exposure.sendexposurelog({
		exposurecompany: "",
		exposureproduct: _exposurelogs.join("#&#"),
		exposureadvert: ""
	});
};

/**
 * [getDeferreds 获取加载数据、加载模板、加载模板引擎延迟对象]
 * @return {Object} [description]
 */
HighQuality.prototype.getDeferreds = function() {
	var _this = this,
		_deferreds = [];

	/**
	 * [加载数据延迟对象]
	 * @type {Object}
	 */
	_deferreds.push($.ajax({
		url: _this.url.service,
		type: 'GET',
		dataType: 'jsonp',
		jsonp: "callbackparam",
		timeout: 3000,
		scriptCharset: "utf-8",
		data: _this.param
	}));

	/**
	 * [加载数据延迟对象]
	 * @type {Object}
	 */
	_deferreds.push($.ajax({
		url: _this.url.template,
		type: 'GET',
		dataType: 'jsonp'
	}));

	/**
	 * [加载模板引擎延迟对象]
	 * @type {Object}
	 */
	var _deferredtemp = $.Deferred();
	_deferreds.push(_deferredtemp);
	require.ensure([], function(require) {
		require('mustache');
		_deferredtemp.resolve();
	}, 'components/mustache/mustache');

	return _deferreds;
};
