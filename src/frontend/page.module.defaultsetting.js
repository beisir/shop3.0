/**
 * Created by 姜艳云 on 2016/11/9.
 */
/**
 * [setting 商铺前台页面各模块默认配置项]
 * @type {Object}
 */
var setting = {
    /**
     * 宽屏广告模块
     */
    module_ads:{
        'type': "", //广告形式，1：翻页图片，当前只显示一张图片，每次滚动一张；2：产品轮播，按照模块区域宽度显示图片，不间歇滚动；
        'transition': "", //过渡效果类型
        'pause': 3000 //事件间隔，翻页图片配置，单位ms
    },
    /**
     * 通栏产品模块
     */
    module_banner_products:{
        'type': "" //1：平铺展示，2：滚动展示
    }

};
module.exports = setting;