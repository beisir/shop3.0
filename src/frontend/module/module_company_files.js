/**
 * Created by 姜艳云 on 2016/10/31.
 * [ 企业档案 ]  只存在百分之二十五区域，百分之七十五不能插入企业档案
 */
enterpriseArchives = function(moduleEntity) {
    /***
     * 所在区域标识  百分之二十五或者七十五
     */
    this.regionmark = moduleEntity.dataEntity.regionmark;
    /***
     * 当前模块
     * @type {*|jQuery|HTMLElement}
     */
    this.archivesBox = $(moduleEntity.htmlEntity);
    this.bindEvent();

    /**
     * [显示 商盈通 图标逻辑]
     */
    if (moduleEntity.regionEntity.pageEntity.issyt) {
        if (jQuery("#sytico").length > 0) {
            jQuery("#sytico").show();
        } else if (jQuery("#service-message").length > 0) {
            jQuery("#service-message").show();
        }
    }
};
enterpriseArchives.prototype = {
    /***
     * 绑定全局
     */
    bindEvent: function() {
        var that = this,
            serverUrl = window.serverUrl || '',
            subjectId = window.subjectId || '';
        /**
         * 创建二维码
         */
        that.createQrcode(window.userName, 'qrcodeBox', 80, 80);
        /***
         * 给我留言
         */
        that.archivesBox.find('[data-node-name="messageBtn"]').click(function() {
            window.righToolbar && window.righToolbar.messageDialog();
        });
        /***
         * 收藏公司
         */
        that.archivesBox.find('[data-node-name="collectionBtn"]').click(function() {
            that.addFavorites();
        });

        /***
         * 关闭收藏成功的弹框
         */
        $('body').on('click', '#update-shoucang [data-node-name="closeCollection"]', function() {
            window.location.reload();
            $("#update-shoucang").hide();
        });

        /**
         * [当前用户为分销宝用户，且用户未上传分销宝经销商海报，则隐藏企业档案模块的"招商"图标]
         * @type {[type]}
         */
        if (serverUrl && subjectId) {
            jQuery.ajax({
                type: "GET",
                url: serverUrl,
                data: {
                    systemID: 1,
                    operType: "query",
                    purposeID: 3,
                    subjectID: subjectId
                },
                cache: false,
                dataType: "jsonp",
                success: function(data) {
                    if (data.result.url == "") {
                        $("#poster").hide();
                    }
                }
            });
        }

        /***
         * 初始化所有商铺
         */
        $('.comDetailBox').mouseenter(function() {
            $(this).find('.showduo').show();
        }).mouseleave(function() {
            $(this).find('.showduo').hide();
        });
    },
    /***
     * 收藏公司
     */
    addFavorites: function() {
        var that = this,
            popLogin = $('#popLogin'),
            _left = $(window).width() / 2,
            _top = $(window).height() / 2,
            isLogin = HC.util.cookie.get("HC360.SSOUser"); //没有登录，是undefined
        /***
         * 判断是否登录过，如果登录过，直接收藏，否则弹出登录对话框
         */
        if (isLogin) {
            popLogin.wijdialog('close');
            that.getSuccessHtml();
        } else {
            popLogin.wijdialog('open');
            /***
             * 兼容3.0，登陆弹框组件不居中问题，没有找到原因，只能手动改一下样式
             */
            popLogin.parent().css({
                top: _top - popLogin.height() / 2,
                left: _left - popLogin.width() / 2
            });
            callbackLogin = function() {
                popLogin.wijdialog('close');
                that.getSuccessHtml();
                return false;
            };
        }
    },
    /***
     * 创建二维码
     * @param shopName 商铺名称
     * @param wrapName 二维码包裹元素
     * @param _width 二维码宽度
     * @param _height 二维码高度
     */
    createQrcode: function(shopName, wrapName, _width, _height) {
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
            $.getScript('//style.org.hc360.cn/js/build/source/widgets/qrcode/hc.qrcode.min.js', function() {
                $('[data-node-name="' + wrapName + '"]').hcQrcode({
                    width: _width,
                    height: _height,
                    text: "//app.hc360.com/m.html?uid=" + shopName + ",a=x"
                });
            });
        } else {
            $('[data-node-name="' + wrapName + '"]').hcQrcode({
                width: _width,
                height: _height,
                text: "//app.hc360.com/m.html?uid=" + shopName + ",a=x"
            });
        }
    },
    /**
     * 拉取收藏接口，成功之后显示对应的弹框
     * @constructor
     */
    Ajaxshoucang: function() {
        var url = "//my.b2b.hc360.com/my/turbine/action/favorites.FavoritesAction/eventsubmit_doAddinfonew/doAddinfonew?";
        $.ajax({
            type: "get",
            url: url,
            data: {
                infoid: window.providerId,
                infotype: 9,
                buyerSourceId: 'detail_shoucang_company'

            },
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            timeout: 3000,
            success: function(result) {
                var top = $(document).scrollTop();
                $('#update-shoucang').css('margin-top', top);
                if (result.code == '007') {
                    $("#update-shoucang").show();
                    $("#send-succeed").show();
                    $("#send-succeed-send-errow").hide();
                } else if (result.code == '006') {
                    $("#update-shoucang").show();
                    $("#send-succeed-send-errow").show();
                    $("#send-succeed").hide();
                } else if (result.code == '012') {
                    $("#update-shoucang").show();
                    $("#send-succeed").hide();
                    $("#send-succeed-send-errow-gsx").show();
                } else if (result.code == '013') {
                    $("#update-shoucang").show();
                    $("#send-succeed").hide();
                    $("#send-succeed-send-errow-ggsx").show();
                } else if (result.code == '004') {
                    $("#update-shoucang").show();
                    $("#send-succeed").hide();
                    $("#send-succeed-send-errow-bq").show();
                } else if (result.code == '005') {
                    $("#update-shoucang").show();
                    $("#send-succeed").hide();
                    $("#send-succeed-send-errow-bcz").show();
                } else {
                    $("#update-shoucang").show();
                    $("#send-succeed").hide();
                    $("#send-succeed-send-errow-qt").show();
                }
            }
        });
    },
    /***
     * 获取收藏成功的弹层的html
     */
    getSuccessHtml: function() {
        var that = this,
            collectionHtml = $("#update-shoucang");
        if (collectionHtml.length == 0) {
            $.ajax({
                url: '//detail.b2b.hc360.com/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet?filename=collectionHtml',
                dataType: 'jsonp',
                success: function(dialogHtml) {
                    $('body').append(dialogHtml);
                    that.Ajaxshoucang();
                }
            });
        } else {
            that.Ajaxshoucang();
        }
    }
};

module.exports = enterpriseArchives;