/**
 * Created by 姜艳云 on 2016/11/16.
 * [module_company_files 企业档案所见即所得渲染逻辑]
 */
var enterpriseArchives = function(moduleEntity) {
}
enterpriseArchives.prototype = {
    /***
     * 创建二维码
     * @param shopName 商铺名称
     * @param wrapName 二维码包裹元素
     * @param _width 二维码宽度
     * @param _height 二维码高度
     */
    createQrcode: function (shopName, wrapName, _width, _height) {
        /***
         * 创建二维码的组件用$.browser.msie来判断ie版本，但是我们升级Jquery版本号，现在用的1.9不支持，所以我们定义一个全局对象来代替$.browser
         * @type {{msie: boolean, version: *}}
         */
        $.browser = {
            msie: HC.env.ie > 0,
            version: HC.env.ie
        };
        /***
         * 拉取二维码js
         */
        if (!$.fn.hcQrcode) {
            $.getScript('//style.org.hc360.cn/js/build/source/widgets/qrcode/hc.qrcode.min.js', function () {
                $('[data-node-name="' + wrapName + '"]').hcQrcode({
                    width: _width,
                    height: _height,
                    text: "http://app.hc360.com/m.html?uid=" + shopName + ",a=x"
                });
            });
        } else {
            $('[data-node-name="' + wrapName + '"]').hcQrcode({
                width: _width,
                height: _height,
                text: "http://app.hc360.com/m.html?uid=" + shopName + ",a=x"
            });
        }
    },

    /**
     * [render 渲染函数]
     * @return {[type]} [description]
     */
    render: function() {
        this.createQrcode(window.userName, 'qrcodeBox', 80, 80);
    }

};

module.exports = enterpriseArchives;
