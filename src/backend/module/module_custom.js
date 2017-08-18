/**
 * [util 引入工具模块]
 * @type {Object}
 */
var util = require('../common/util');

/**
 * [custom 自定义模块]
 * @param  {[type]} moduleEntity [模块业务对象]
 * @param  {[type]} html         [模块设置表单HTMl]
 * @return {[type]}              [description]
 */
function custom(moduleEntity, html, options) {
  var _this = this;
  _this.moduleEntity = moduleEntity;

  _this.dialogEntity = dialog({
    content: html,
    title: '编辑内容>自定义内容'
  }).showModal();
  _this.options = $.extend({

    /**
     * [contentMaxLengthLimit 不同区域内容长度限制]
     * @type {Object}
     */
    // contentMaxLengthLimit: {
    // 	'region_percent_25': 5000,
    // 	'region_percent_75': 30000,
    // 	'region_full_widescreen': 40000
    // }
  }, options || {});
  _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
  _this.dialogHtmlEntity = $(_this.dialogEntity.node);
  _this.btnCancel = _this.dialogHtmlEntity.find(".t-close,.Cancel"); //关闭、取消按钮
  _this.btnSave = _this.dialogHtmlEntity.find(".Save"); //弹框的保存按钮
  _this.chkShowTitleAndBorder = _this.dialogHtmlEntity.find("#titleAndBorder"); //板块标题栏和边栏是否选中
  _this.txtTitle = _this.dialogHtmlEntity.find("input[name='title']"); //标题文本框
  _this.txtContent = _this.dialogHtmlEntity.find('textarea[name="content"]');
  // _this.contentMaxLengthPrompt = _this.dialogHtmlEntity.find('.textPrompt'); //用户可输入字符数量提示元素
  /**
   * [异步加载 KindEditor 组件后再继续模块初始化]
   */
  require.ensure([], function(require) {

    /**
     * 加载 KindEditor 组件
     */
    require('KindEditor');

    /**
     * 初始化弹出框数据
     */
    _this.initData();

    /**
     * 绑定弹出框事件
     */
    _this.bindEvent();

  }, 'components/kindeditor/kindeditor');
}

/**
 * [init 模块初始化]
 * @return {[type]} [description]
 */
custom.prototype.initData = function() {
  var _this = this,
    _cssPath = [];

  /**
   * 获取当前页面的所以外链样式表，并初始化到富文本编辑器中，以使编辑器中的展示效果和真实页面效果一致
   */
  // $('link[rel="stylesheet"]').each(function(index, style) {
  // 	var _href = $.trim($(style).attr('href'));
  // 	if (_href.length) {
  // 		_cssPath.push(_href);
  // 	}
  // });

  /**
   * [获取自定义内容后开始初始化数据]
   */
  _this.getContentDeferred().always(function() {
    _this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
    if (Number(_this.moduleEntity.dataEntity.data.showTitleAndBorder)) {
      _this.chkShowTitleAndBorder.addClass('curChosen');
    } else {
      _this.chkShowTitleAndBorder.removeClass('curChosen');
    }

    /**
     * 显示用户可输入字符数量提示元素
     */
    // _this.contentMaxLengthPrompt.show();

    /**
     * [加载富文本编辑器]
     */
    _this.editorEntity = KindEditor.create(_this.txtContent, {
      resizeType: 1, //2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
      width: '100%',
      height: 300,
      items: [
        'source', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
        'insertunorderedlist', 'link', 'unlink'
      ],
      cssPath: ['http://style.org.hc360.com/css/detail/mysite/siteconfig/newPro/mallBase.css'],
      afterChange: function() {

        /**
         * 更新用户可输入字符数量
         */
        // _this.contentMaxLengthPrompt.find('em').text((_this.options.contentMaxLengthLimit[_this.moduleEntity.regionEntity.identifier] || 5000) - this.count('html'));
      },
      filterMode: false // 关闭过滤模式
    });

    /**
     * 初始化富文本编辑器
     */
    _this.editorEntity.html(_this.moduleEntity.dataEntity.data.content);

    /**
     * IE9失去焦点的问题
     */
    _this.editorEntity.focus();
  });
};

/**
 * [getContentDeferred 自定义内容获取延迟对象]
 * @return {[type]} [description]
 */
custom.prototype.getContentDeferred = function() {
  var _this = this;

  /**
   * [返回自定义内容获取延迟对象]
   */
  var xhr = $.ajax({
    url: '/detail/turbine/action/GetCustomContentAction/eventsubmit_doGetcustomcontent/doGetcustomcontent',
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'callback',
    data: {
      providerid: _this.moduleEntity.regionEntity.pageEntity.providerid,
      area: _this.moduleEntity.regionEntity.identifier,
      moduleid: _this.moduleEntity.dataEntity.moduleid,
      windowtype: _this.moduleEntity.dataEntity.windowtype,
      modulemark:_this.txtContent.attr('data-flag') ? _this.moduleEntity.identifier : ''
    }
  });

  /**
   * [定义延迟对象成功回调函数]
   */
  xhr.done(function(json) {
    if (!!Number(json.state)) {

      /**
       * [content 更新模块数据]
       */
      //_this.moduleEntity.dataEntity.data.content = decodeURIComponent(json.data) || '';
      _this.moduleEntity.dataEntity.data.content = json.data || '';
    }
  });

  return xhr;
};

/**
 * [bindEvent 绑定事件]
 * @return {[type]} [description]
 */
custom.prototype.bindEvent = function() {
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
      _showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1 : 0,

      /**
       * [_contentMaxLengthLimit 区域内容长度限制]
       * @type {Number}
       */
      // _contentMaxLengthLimit = _this.options.contentMaxLengthLimit[_this.moduleEntity.regionEntity.identifier] || 5000,

      /**
       * [_params 请求参数，不包含内容，内容通过单独接口保存]
       * @type {[type]}
       */
      _params = {
        //'title': encodeURIComponent(_title),
        'title': _this.txtTitle.length ? _title : '',
        'showTitleAndBorder': _this.chkShowTitleAndBorder.length ? _showTitleAndBorder : 0,
        'content': ''
      },

      /**
       * [_callee 正在执行函数引用]
       * @type {Function}
       */
      _callee = arguments.callee;

    /**
     * [验证标题非空]
     */
    if (_this.txtTitle.length && (_title.length === 0)) {
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
     * [验证标题字数上限]
     */
    if (_this.txtTitle.length && (_title.length > 5)) {
      dialog({
        title: '提示',
        content: '标题最多输入5个字符',
        okValue: '确定',
        ok: function() {
          this.remove();
        }
      }).showModal();
      return false;
    }

    /**
     * [验证内容字数上限]
     */
    // if (_this.editorEntity.count('html') > _contentMaxLengthLimit) {
    // 	dialog({
    // 		title: '提示',
    // 		content: '内容最多输入' + _contentMaxLengthLimit + '个字符',
    // 		okValue: '确定',
    // 		ok: function() {
    // 			this.remove();
    // 		}
    // 	}).showModal();
    // 	return false;
    // }

    /**
     * 过滤外网链接地址
     */
    var tempHtmlEntity = $('<div>').html(_this.editorEntity.html());
    tempHtmlEntity.find('a').each(function(index, el) {
      var linkAttr = util.parseURL($(el).attr('href'));
      if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
        el.href = '#';
      }
    });
    _params.content = tempHtmlEntity.html();

    /**
     * [保存模块配置]
     */
    _this.moduleEntity.update({
      data: _params
    }, function() {

      /**
       * 模块更新成功后移除当前模块设置弹出框
       */
      _this.dialogEntity.remove();
    });
  });
};

module.exports = custom;
