/**
 * 导入 json2 模块
 * 导入 es5-shim 模块
 * 导入 jQuery 模块
 */
require('json2');
require('es5-shim/es5-shim');
require('jquery');
require('mustache');

/**
 * 加载 OwlCarousel 组件样式
 * 加载 jquery.transitionEffectsSlider 组件样式
 */
require('../../../src/components/OwlCarousel/owl.carousel.css');
require('../../../src/components/OwlCarousel/owl.theme.css');
require('../../../src/components/OwlCarousel/owl.transitions.css');
// require('../../components/jquery.transitionEffectsSlider/style.css');//百叶窗效果已删除

/**
 * [adsPreview 宽屏广告预览业务对象]
 */
function adsPreview(options) {
    var _this = this;

    /**
     * [moduleEntity 扩展本地设置]
     * @type {Object}
     */
    $.extend(true, _this, {

        /**
         * [moduleEntity 模块业务逻辑对象]
         * @type {Object}
         */
        moduleEntity: {

            /**
             * [dataEntity 模块数据对象]
             * @type {Object}
             */
            dataEntity: null,

            /**
             * [htmlEntity 模块包裹元素]
             * @type {Object}
             */
            htmlEntity: null
        }
    }, options);

    /**
     * 初始化宽屏广告预览业务对象
     */
    adsPreview.prototype.init.call(_this);
}

/**
 * [init 初始化宽屏广告预览业务对象]
 */
adsPreview.prototype.init = function() {
    var _this = this;

    /**
     * [moduleEntity 获取模块业务逻辑对象]
     * @type {Object}
     */
    $.when.apply(null,_this.getMaxHeightDef()).done(function(){

        var dataEntity = {};
        var maxHeight = Math.max.apply(null, arguments);
        if(!maxHeight || maxHeight === 0){
            dataEntity = $.extend(_this.deserializeEntity(),{'height':""});
        }else{
            var height = maxHeight +"px";
            dataEntity = $.extend(_this.deserializeEntity(),{'height':height});
        }

        _this.moduleEntity.dataEntity = {
            data: dataEntity
        };
        if (!_this.moduleEntity) {
            return;
        }

        /**
         * [html 获取模块HTML模板]
         * @type {String}
         */
        _this.html = _this.getTemplateHTML();
        if (!$.trim(_this.html.length)) {
            return;
        }

        /**
         * [渲染模板]
         * @type {String}
         */
        _this.html = mustache.render(_this.html, {
            'prolist': _this.moduleEntity.dataEntity.data['prolist'],
            'piclist': _this.moduleEntity.dataEntity.data['piclist'],
            'height': _this.moduleEntity.dataEntity.data['height']
        });

        /**
         * 更新html到页面
         */
        _this.moduleEntity.htmlEntity.html(_this.html);

        /**
         * [moduleRender 获取渲染模块]
         * @type {Object}
         */
        var moduleRender = require('../../frontend/module/module_ads');
        var moduleRenderEntity = new moduleRender(_this.moduleEntity);

    });

};

/**
 * [deserializeEntity 解析模块业务逻辑对象]
 * @return {Object} [模块业务逻辑对象]
 */
adsPreview.prototype.deserializeEntity = function() {
    var _entity = {} ;
    try {
        _entity = $.parseJSON(decodeURIComponent(window.location.search.slice(1)));
    } catch (ex) {}
    return _entity;
};


/**
 * 获取每张图片高度的数组集合
 * @returns {Array}
 */
adsPreview.prototype.getMaxHeightDef = function(){

    var heightArray = [],_this = this;
    if(_this.deserializeEntity()['piclist'] && _this.deserializeEntity()['piclist'].length>0){
        $.each(_this.deserializeEntity()['piclist'],function(i,v){
            var heightDef = $.Deferred();
            heightArray.push(heightDef);
            var imgUrl = v.picurl;
            if(imgUrl == "" || !imgUrl) return true;
            var img = new Image();
            img.src = imgUrl;
            img.onload = function(){
                heightDef.resolve(this.height);
            };
            img.onerror = function(){
                heightDef.resolve(0);
            };
        });
    }

    return heightArray;
};


/**
 * [getTemplateHTML 获取模板HTML]
 * @return {String} [模板HTML]
 */
adsPreview.prototype.getTemplateHTML = function() {
    var _this = this;

    /**
     * [根据轮播类型及切换效果获取HTML]
     */
    var _type = Number(_this.moduleEntity.dataEntity.data.type) || 1,
        _transition = _type != 2 ? Number(_this.moduleEntity.dataEntity.data.transition) : 0,
        _htmlEntity = $('#template_' + _type + '_' + _transition);

    return _htmlEntity.html();
};

/**
 * [adsPreviewEntity 创建宽屏广告预览业务对象实例]
 * @type {adsPreview}
 */
var adsPreviewEntity = new adsPreview({
    moduleEntity: {
        htmlEntity: $('[data-wrap]')
    }
});