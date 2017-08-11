/**
 * [companyAlbum 公司相册模块]
 * @param  {[type]} moduleEntity [模块业务对象]
 * @param  {[type]} html         [模块设置表单HTMl]
 * @return {[type]}              [description]
 */
function companyAlbum(moduleEntity, html, options) {
	var _this = this;
	_this.moduleEntity = moduleEntity;
	_this.dialogEntity = dialog({
		content: html,
		title:'编辑内容>公司相册'
	}).showModal();
	_this.options = $.extend({

	}, options || {});
	_this.options.rendedCallback && _this.options.rendedCallback.call(_this);
	_this.btnCancel = $(_this.dialogEntity.node).find(".t-close,.Cancel"); //关闭、取消按钮
	_this.btnSave = $(_this.dialogEntity.node).find(".Save"); //弹框的保存按钮
	_this.chkShowTitleAndBorder = $(_this.dialogEntity.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
	_this.txtTitle = $(_this.dialogEntity.node).find("input[name='title']"); //标题文本框

	/**
	 * 初始化弹出框数据
	 */
	_this.initData();

	/**
	 * 绑定弹出框事件
	 */
	_this.bindEvent();
}

/**
 * [init 模块初始化]
 * @return {[type]} [description]
 */
companyAlbum.prototype.initData = function() {
	var _this = this;
	_this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
	var showTitleAndBorder = parseInt(_this.moduleEntity.dataEntity.data.showTitleAndBorder) || 0;
	if (showTitleAndBorder) {
		_this.chkShowTitleAndBorder.addClass('curChosen');
	}else{
        _this.chkShowTitleAndBorder.removeClass('curChosen');
	}
};

/**
 * [bindEvent 绑定事件]
 * @return {[type]} [description]
 */
companyAlbum.prototype.bindEvent = function() {
	var _this = this;

	/**
	 * [绑定关闭、取消按钮点击事件]
	 */
	_this.btnCancel.on('click', function() {
		_this.dialogEntity.remove();
	});

	/**
	 * [绑定板块标题栏和边栏是否选中复选框点击事件]
	 */
	_this.chkShowTitleAndBorder.on('click', function() {
		$(this).toggleClass("curChosen");
	});

	/**
	 * [绑定保存按钮点击事件]
	 */
	_this.btnSave.click(function(event) {

		/**
		 * [_title 获取标题]
		 * @type {String}
		 */
		var _title = $.trim(_this.txtTitle.val()),

			/**
			 * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
			 * @type {Boolean}
			 */
			_showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1:0,

			/**
			 * [_params 请求参数]
			 * @type {[type]}
			 */
			_params = {
				'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
				'operatedata': { //操作内容
					'providerid': pageEntity.providerid, //商铺编号
					'username': pageEntity.username, //商铺用户名
					'data': {
						//'title': encodeURIComponent(_title),
						'title': _title,
						'showTitleAndBorder': _showTitleAndBorder
					}
				}
			},

			/**
			 * [_callee 正在执行函数引用]
			 * @type {Function}
			 */
			_callee = arguments.callee;

		/**
		 * [operatedata 更新请求参数]
		 * @type {Object}
		 */
		_params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
		//_params.operatedata=JSON.stringify(_params.operatedata);

		/**
		 * [验证标题非空]
		 */
		if (_title.length === 0) {
			dialog({
				title: '提示',
				content: '标题不能为空！',
				okValue: '确定',
				ok: function() {
					this.remove();
				}
			}).showModal();
			return false;
		}


		/**
		 * [保存模块配置]
		 */
		_this.moduleEntity.update({data:_params.operatedata.data},function(){

			_this.dialogEntity.close().remove();

		});


	});
};

module.exports = companyAlbum;