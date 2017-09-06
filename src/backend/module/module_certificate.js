/**
 * [certificate 信誉证书模块]
 * @param  {[type]} moduleEntity [模块业务对象]
 * @param  {[type]} html         [模块设置表单HTMl]
 * @return {[type]}              [description]
 */
function certificate(moduleEntity, html, options) {
    var _this = this;
    _this.moduleEntity = moduleEntity;
    _this.dialogEntity = dialog({
        content: html,
        title: '编辑内容>信誉证书'
    }).showModal();
    _this.options = $.extend({}, options || {});
    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
    _this.btnCancel = $(_this.dialogEntity.node).find(".t-close,.Cancel"); //关闭、取消按钮
    _this.btnSave = $(_this.dialogEntity.node).find(".Save"); //弹框的保存按钮
    _this.chkShowTitleAndBorder = $(_this.dialogEntity.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
    _this.txtTitle = $(_this.dialogEntity.node).find("input[name='title']"); //标题文本框
    _this.displayOptions = $('.radioBox span.radioCon');
    _this.btnPreview = $(_this.dialogEntity.node).find("#btnPreview"); //预览效果按钮

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
certificate.prototype.initData = function() {
    var _this = this;
    _this.txtTitle.val(_this.moduleEntity.dataEntity.data.title);
    var showTitleAndBorder = parseInt(_this.moduleEntity.dataEntity.data.showTitleAndBorder) || 0;
    if (showTitleAndBorder) {
        _this.chkShowTitleAndBorder.addClass('curChosen');
    }else{
        _this.chkShowTitleAndBorder.removeClass('curChosen');
    }

    _this.displayOptions.filter('[data-val="' + _this.moduleEntity.dataEntity.data.type + '"]').addClass('curRadioBox').siblings().removeClass('curRadioBox');
};

/**
 * [bindEvent 绑定事件]
 * @return {[type]} [description]
 */
certificate.prototype.bindEvent = function() {
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
     * [绑定显示设置切换事件]
     */
    _this.displayOptions.click(function(event) {
        $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
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
             * [_type 显示设置]
             * @type {String}
             */
            _type = _this.displayOptions.filter('span.curRadioBox').length ? _this.displayOptions.filter('span.curRadioBox').attr('data-val') : 0,

            /**
             * [_params 请求参数]
             * @type {Object}
             */
            _params = {
                //'title': encodeURIComponent(_title),
                'title': _title,
                'showTitleAndBorder': _showTitleAndBorder,
                'type': _type
            };

        /**
         * [验证标题非空]
         */
        if (_title.length === 0 || _title.length > 5) {
            var _content = (_title.length === 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
            dialog({
                title: '提示',
                content: _content,
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
        _this.moduleEntity.update({
            data: _params
        }, function() {

            /**
             * 模块更新成功后移除当前模块设置弹出框
             */
            _this.dialogEntity.remove();
        });
    });

    /**
     * [绑定预览效果按钮点击事件]
     */
    _this.btnPreview.click(function(event) {
        var $this = $(this),

            /**
             * [_title 获取标题]
             * @type {String}
             */
            _title = $.trim(_this.txtTitle.val()),

            /**
             * [_showTitleAndBorder 获取是否显示标题及边框复选框状态]
             * @type {Boolean}
             */
            _showTitleAndBorder = _this.chkShowTitleAndBorder.hasClass("curChosen") ? 1 : 0,

            /**
             * [_type 显示设置]
             * @type {String}
             */
            _type = _this.displayOptions.filter('span.curRadioBox').length ? _this.displayOptions.filter('span.curRadioBox').attr('data-val') : 0;

        /**
         * [验证标题非空]
         */
        if (_title.length === 0 || _title.length > 5) {
            var _content = (_title.length === 0) ? '标题不能为空！' : '标题长度不能大于5个字符！';
            dialog({
                title: '提示',
                content: _content,
                okValue: '确定',
                ok: function() {
                    this.remove();
                }
            }).showModal();
            return false;
        }

        /**
         * [data 更新模块设置]
         * @type {Object}
         */
        _this.moduleEntity.dataEntity.data = {
            'title': _title,
            'showTitleAndBorder': _showTitleAndBorder,
            'type': _type
        };

        /**
         * [previewUrl 预览页面地址]
         * @type {String}
         */
        var previewUrl = '//style.org.hc360.cn/js/module/shop3.0/dist/backend/preview/module_certificate.html?params={{params}}',

            /**
             * [params 传递到预览页的参数]
             * @type {Object}
             */
            params = {

                /**
                 * [data 荣誉证书数据]
                 * @type {Array}
                 */
                data: [],

                /**
                 * [layout 当前页面布局 //布局枚举值，1：侧栏在左，2：侧栏在右；]
                 * @type {Number}
                 */
                layout: window.pageEntity.layout || 1,

                /**
                 * [entity 模块所属区域标识符]
                 * @type {Object}
                 */
                entity: $.extend(true, {}, _this.moduleEntity.dataEntity, {
                    data: {
                        'title': _title,
                        'showTitleAndBorder': _showTitleAndBorder,
                        'type': _type
                    }
                }),

                /**
                 * [style 获取当前公共模板样式表地址]
                 * @type {String}
                 */
                style: $('#lnkThemeStyle').attr('href') || ''
            };

        /**
         * [解析模块数据]
         */
        _this.moduleEntity.htmlEntity.find('li').each(function(index, el) {
            var $el = $(el);
            params.data.push({
                title: $el.find('p').text() || '', //荣誉证书标题
                pic: $el.find('img').attr('src') || '', //荣誉证书图片地址
                link: $el.find('a:first').attr('href') //荣誉证书链接地址
            });
        });

        /**
         * 设置预览效果按钮链接地址
         */
        try {
            $this.attr('href', previewUrl.replace(/{{params}}/ig, encodeURIComponent(JSON.stringify(params))));
        } catch (ex) {}

    });
};

module.exports = certificate;