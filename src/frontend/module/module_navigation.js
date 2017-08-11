/**
 * [module_navigation 导航模块渲染逻辑]
 * @param  {[type]} moduleEntity [description]
 * @return {[type]}              [description]
 */
function module_navigation(moduleEntity) {
    var _this = this;

    /**
     * [初始化模块元素引用]
     */
    $.extend(true, _this, {

        /**
         * [moduleEntity 模块业务对象]
         * @type {Object}
         */
        moduleEntity: moduleEntity
    });

    /**
     * 初始化模块业务逻辑
     */
    module_navigation.prototype.init.call(_this);
}

/**
 * [init 初始化]
 */
module_navigation.prototype.init = function() {
    var _this = this;

    /**
     * 针对 kqe666 用户，在导航后新增一个内容为 总成报价 的链接，该链接跳转到 http://www.gyjgzc.com
     * 
     * 该需求为产品人员 高松 提出的特殊需求
     */
    if (window.userName === 'kqe666') {
        $([
            '<td>',
            '   <a href="http://www.gyjgzc.com" target="_blank">总成报价</a>',
            '</td>'
        ].join('')).appendTo(_this.moduleEntity.htmlEntity.find('.navBoxCon tr'));
    }
};

module.exports = module_navigation;
