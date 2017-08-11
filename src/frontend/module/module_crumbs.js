/**
 * [module_crumbs 搜索栏模块渲染逻辑]
 * @return {[type]} [description]
 */
function module_crumbs(moduleEntity) {
    var _this = this;

    /**
     * [初始化模块元素引用]
     */
    $.extend(true, _this, {

        /**
         * [form 表单元素]
         * @type {Object}
         */
        form: moduleEntity.htmlEntity.find('form'),

        /**
         * [txtKeyword 关键字文本框]
         * @type {Object}
         */
        txtKeyword: moduleEntity.htmlEntity.find('[name="w"]'),

        /**
         * [btnActionType 搜索类型单选框]
         * @type {Object}
         */
        btnActionType: moduleEntity.htmlEntity.find('[data-act-type]'),

        /**
         * [actionType 搜索类型，默认站内搜索]
         * @type {String}
         */
        actionType: 'search'
    });

    /**
     * 初始化模块业务逻辑
     */
    module_crumbs.prototype.init.call(_this);
}

/**
 * [init 初始化]
 */
module_crumbs.prototype.init = function() {
    var _this = this,

        /**
         * [submitForm 提交表单函数]
         * @return {[type]} [description]
         */
        submitForm = function() {

            /**
             * [_keyword 关键字]
             * @type {String}
             */
            var _keyword = _this.txtKeyword.val(),

                /**
                 * [_actionConfig 表单提交配置]
                 * @type {Object}
                 */
                _actionConfig = {
                    'search': function() {
                        this.form.attr({
                            action: window.shopSearchUrl || '',
                            target: '_self'
                        });
                        window.hcclick && window.hcclick('?hcdetail_enterpriselog=search_inside');
                    },
                    'product': function() {
                        this.form.attr({
                            action: 'http://s.hc360.com/?w=' + encodeURIComponent(this.txtKeyword.val()) + '&mc=seller',
                            target: '_blank'
                        });
                    }
                };

            /**
             * [判断关键字是否为空]
             */
            if ($.trim(_keyword).length === 0) {
                alert('请输入关键词！');
                return false;
            }

            /**
             * 根据搜索类型设置表单属性，提交表单
             */
            _actionConfig[_this.actionType] && _actionConfig[_this.actionType].call(_this);
            _this.form[0].submit();
        };

    /**
     * 兼容低版本浏览器 placeholder 功能
     */
    _this.txtKeyword.placeholder().keypress(function(event) {
        if (event.keyCode == "13") {
            return submitForm();
        }
    });

    /**
     * [绑定搜索类型单选框点击事件]
     */
    _this.btnActionType.click(function(event) {
        var $this = $(this),
            actionType = $this.attr('data-act-type') || '';

        /**
         * [actionType 设置搜索类型]
         * @type {String}
         */
        _this.actionType = actionType;

        /**
         * 提交表单
         */
        return submitForm();
    });
};

module.exports = module_crumbs;
