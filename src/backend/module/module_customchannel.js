/**
 * [util 引入工具模块]
 * @type {Object}
 */
var util = require('../common/util');

/**
 * [customchannel 自定义模块]
 * @param  {[type]} moduleEntity [模块业务对象]
 * @param  {[type]} html         [模块设置表单HTMl]
 * @return {[type]}              [description]
 */
function customchannel(moduleEntity, html, options) {
    var _this = this;
    _this.moduleEntity = moduleEntity;
    _this.dialogEntity = dialog({
        content: html,
        title: '编辑内容>自定义频道'
    }).showModal();
    _this.options = $.extend({

        /**
         * [contentMaxLengthLimit 内容长度限制]
         * @type {Object}
         */
        contentMaxLengthLimit: 20000
    }, options || {});
    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
    _this.dialogHtmlEntity = $(_this.dialogEntity.node);
    _this.btnCancel = _this.dialogHtmlEntity.find(".t-close,.Cancel"); //关闭、取消按钮
    _this.btnSave = _this.dialogHtmlEntity.find(".Save"); //弹框的保存按钮
    _this.txtContent = _this.dialogHtmlEntity.find('textarea[name="content"]'); //内容文本框
    _this.contentWrap = _this.moduleEntity.htmlEntity.find('#contents'); //模块内容包裹元素
    _this.contentContainer = _this.moduleEntity.htmlEntity.find('textarea[name="contents"]'); //模块数据包裹元素
    _this.contentMaxLengthPrompt = _this.dialogHtmlEntity.find('.textPrompt'); //用户可输入字符数量元素

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
customchannel.prototype.initData = function() {
    var _this = this;

    /**
     * [content 更新模块数据]
     */
    _this.moduleEntity.dataEntity.content = _this.contentWrap.html();

    /**
     * 显示用户可输入字符数量提示元素
     */
    _this.contentMaxLengthPrompt.show();

    /**
     * [加载富文本编辑器]
     */
    _this.editorEntity = KindEditor.create(_this.txtContent, {
        resizeType: 1, //2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。
        width: '100%',
        height: 300,
        items: [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', 'link'
        ],
        afterChange: function() {

            /**
             * 更新用户可输入字符数量
             */
            _this.contentMaxLengthPrompt.find('em').text(_this.options.contentMaxLengthLimit - this.count('html')).show();
        }
    });

    /**
     * 初始化富文本编辑器
     */
    _this.editorEntity.html(_this.contentContainer.val());

    /**
     * IE9失去焦点的问题
     */
    _this.editorEntity.focus();
};

/**
 * [getContentUpdateDeferred 获取内容更新延迟对象]
 * @param  {Object} param [更新内容参数]
 * @return {Object}       [description]
 */
customchannel.prototype.getContentUpdateDeferred = function(param) {
    var _this = this;

    return $.ajax({
        //url: '/detail/turbine/action/ajax.TemplateAjaxAction/eventsubmit_doEditcontent/doEditcontent',
        url: '/detail/turbine/action/SaveCustomContentAction/eventsubmit_doSave/doSave',
        type: 'post',
        dataType: 'text',
        data: param || {}
    });
};

/**
 * [bindEvent 绑定事件]
 * @return {[type]} [description]
 */
customchannel.prototype.bindEvent = function() {
    var _this = this;

    /**
     * [绑定关闭、取消按钮点击事件]
     */
    _this.btnCancel.on('click', function() {
        _this.dialogEntity.remove();
    });

    /**
     * [绑定保存按钮点击事件]
     */
    _this.btnSave.click(function(event) {

        /**
         * [_contentMaxLengthLimit 区域内容长度限制]
         * @type {Number}
         */
        var _contentMaxLengthLimit = _this.options.contentMaxLengthLimit,

            /**
             * [_params 请求参数]
             */
            _params = {
                customizeType: _this.moduleEntity.dataEntity.type,
                providerid: window.providerId,
                customizeContent: ''
            },

            /**
             * [_callee 正在执行函数引用]
             * @type {Function}
             */
            _callee = arguments.callee;

        /**
         * [验证内容字数上限]
         */
        if (_this.editorEntity.count('html') > _contentMaxLengthLimit) {
            dialog({
                title: '提示',
                content: '内容最多输入' + _contentMaxLengthLimit + '个字符',
                okValue: '确定',
                ok: function() {
                    this.remove();
                }
            }).showModal();
            return false;
        }

        /**
         * 过滤外网链接地址
         */
        var tempHtmlEntity = $('<div>').html(_this.editorEntity.html());
        tempHtmlEntity.find('a').each(function(index, el) {
            var linkAttr = util.parseURL(el.href);
            if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
                el.href = '#';
            }
        });
        _params.customizeContent = encodeURIComponent(tempHtmlEntity.html());

        /**
         * [loadingDialogEntity 显示加载中的遮罩层]
         * @type {Object}
         */
        var loadingDialogEntity = dialog({
            content: '<span class="ui-dialog-loading">加载中..</span>'
        }).showModal();

        /**
         * [保存模块配置]
         */
        $.when(_this.getContentUpdateDeferred(_params)).done(function(data) {

            /**
             * 执行模块渲染逻辑
             */
            _this.contentWrap.html(data);

            /**
             * 更新模块数据
             */
            _this.contentContainer.val(data);

            /**
             * 模块更新成功后移除当前模块设置弹出框
             */
            _this.dialogEntity.remove();
        }).always(function() {

            /**
             * 删除加载中弹出框
             */
            loadingDialogEntity.remove();
        });
    });
};

module.exports = customchannel;