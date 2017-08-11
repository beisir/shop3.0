/**
 * Created by 姜艳云 on 2016/12/9.
 * 风格设置
 */
var tool = require('../common/module.setting.util'),
    topStyle = function(pageEntity, html, interfaceUrl) {
        /***
         * 商铺配置数据
         */
        this.pageEntity = $.extend({}, pageEntity);
        /****
         * 接口地址
         */
        this.interfaceUrl = interfaceUrl;
        /***
         * 风格设置区域
         */
        this.templateStyleWrap = $('[node-name="templateStyle"]');

        /***
         * 更新样式的全局样式发送的ajax数据
         */
        this.globalStyle = $.extend(true, {}, this.pageEntity["global-style"]);

        /***
         * 记录用户选择的内背景样式
         */
        this.insidebackground = {
            recommBg: '', //推荐背景
            uploadBg: '', //上传背景
            bgColor: '' //图片颜色
        };
        /***
         * 记录用户选择的外背景样式
         */
        this.outsidebackground = {
            vipBg: '', //vip背景
            recommBg: '', //推荐背景
            uploadBg: '', //上传背景
            bgColor: '' //图片颜色
        };

        this.initStyle();
    };
topStyle.prototype = {
    initStyle: function() {
        var that = this; //外背景样式
        /***
         * 初始化内背景操作
         */
        new tempStyle({
            backType: 'insidebackground',
            uploadBtn: '#insideSelectBtn',
            webuploader: {
                fileSingleSizeLimit: 1 * 1024 * 1024
            }
        }, that);

        /***
         * 初始化外背景操作
         */
        new tempStyle({
            backType: 'outsidebackground',
            uploadBtn: '#outsideSelectBtn'
        }, that);
        /**
         * 内外背景切换
         */
        var bgManageBox = that.templateStyleWrap.find('.editBoxRight .bgManageBox');
        that.templateStyleWrap.find('.editBoxLeft dd').click(function() {
            $(this).addClass('ddCur').siblings().removeClass('ddCur');
            bgManageBox.find('.bgManage').hide();
            bgManageBox.find('.bgManage').eq($(this).index()).show();
        });
    }

};

module.exports = topStyle;

/***
 * 创建内外背景的构造函数
 * @param config   内外背景的配置项
 * @param that  当前对象
 */
var tempStyle = function(config, that) {
    this.copyAttr(that);
    /***
     * 是否可用使用vip外背景
     */
    this.membersVip = this.pageEntity.isvip;

    /***
     * 当前用户使用的模板数据
     */
    this.template = this.pageEntity.template;

    /****
     * 风格设置的内外背景，如果用户没有上传图片，用无图的图片
     * @type {string}
     */
    this.noPicAddress = 'http://style.org.hc360.com/images/detail/mysite/default/noPicAddress.jpg';
    /***
     * 初始化内外背景
     */
    this.init(config);
};
tempStyle.prototype = {

    init: function(config) {
        var that = this;
        /** 上传图片按钮 **/
        this.uploadBtn = config.uploadBtn;
        /***
         * 背景类型  内背景或者外背景
         */
        this.backType = config.backType;
        /***
         * 背景区域
         */
        this.content = this.templateStyleWrap.find('[node-name="' + this.backType + '"]');
        /***
         * 默认背景样式
         */
        this.defaultBack = tool.formatDate(this.globalStyle[this.backType]);
        /***
         * 默认当前区域的背景图片，
         */
        this.imageSrc = tool.getBgUrl(this.defaultBack["background-image"]);
        /***
         * 将大图路径替换成小图路径
         */
        this.defaultBgImg = this.imageSrc && this.imageSrc.replace('/abroad/', '/within/');
        /***
         *  默认当前区域的背景颜色
         */
        this.defaultBgColor = this.defaultBack.background;
        /***
         * 内外背景图片地址
         * @type {{insideBg: 内背景推荐背景, insideVipBg: 内背景VIP背景, outsideBg: 外背景推荐背景, outsideVipBg: 外背景VIP背景}}
         */
        this.backObject = {
            insideBg: [
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_1.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_2.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_3.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_4.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_5.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_1_6.jpg'
            ],
            outsideBg: [
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_1.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_2.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_3.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_4.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_5.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_2_6.jpg'
            ],
            outsideVipBg: [
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_1.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_2.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_3.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_4.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_5.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_6.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_7.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_8.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_9.jpg',
                'http://style.org.hc360.com/images/detail/mysite/siteconfig/newPro/within/pic_3_10.jpg'
            ]
        };

        /**
         * [webuploaderConfig 上传组件基础配置对象]
         * @type {[type]}
         */
        that.webuploaderConfig = $.extend({}, {
            // swf文件路径
            swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
            // 文件接收服务端。
            server: 'http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd',
            // 选择文件的按钮。可选。
            pick: {
                id: that.uploadBtn,
                multiple: false //关闭多个文件传输的功能
            },
            formData: {
                /**
                 * [operType 操作类型设置为上传图片]
                 */
                operType: 'upload',
                /**
                 * [picstr 加密信息picstr]
                 */
                picstr: $('#picstr').val() || ''
            },
            //设置文件上传域的name。
            fileVal: "file",
            //最多支持上传一个图片
            threads: 1,
            //限制单个文件大小
            fileSingleSizeLimit: 5 * 1024 * 1024, // 5M
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,png',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
            },
            compress: false,
            //禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true,
            duplicate: true, //是否可以上传重复文件，默认为undefined
            //不需要手动调用上传，有文件选择即开始上传
            auto: true
        }, config.webuploader);

        this.initRecommendBack();
        this.initImageUplaod();
        this.initColor();
        /***
         * 背景类型前面的单选按钮点击事件
         */
        that.content.find('dl dt').click(function() {
            var _me = $(this).find('em'), //背景类型
                _type = _me.parents('.bgImgBox').attr('node-name'), //应用的图片类型：vip，推荐，上传，颜色
                thisBgStyle = that[that.backType][_type]; //用户当前类型下的样式；
            /***
             * 更新发送给后台的样式对象
             */
            if (thisBgStyle) {
                that.globalStyle[that.backType] = thisBgStyle;
            }
            /***
             * 更新导航样式，并选中选择背景色单选
             */
            that.updateTempStyle(function() {
                that.content.find('dl dt em').removeClass('radioCur');
                _me.addClass('radioCur');
            });
        });
        /***
         * vip背景和推荐背景点击事件
         */
        that.content.on('click', 'ul[data-bglogo] li', function() {
            that.applicaBackground($(this));
        });
    },
    /**
     * 初始化内外背景的推荐背景和vip背景
     */
    initRecommendBack: function() {
        var that = this,
            vipBgWrap = this.content.find('[node-name="vipBg"]'), //vip背景
            ulList = this.content.find('ul[data-bglogo]'); //外背景的vipul和推荐背景ul，内背景的推荐背景ul列表

        $.each(ulList, function() {
            var me = $(this),
                backKey = me.attr('node-name'), //对应backObject里面的key
                isVip = (backKey == "outsideVipBg") ? 'isVip=1' : '', //是否是vip列表
                _em = me.parents('dl').find('dt em'), //单选按钮
                _type = me.parents('.bgImgBox').attr('node-name'), //当前的背景类型 insideBg outsideVipBg  outsideBg
                imgHtml = '';
            /***
             * 获取vip背景和推荐背景ul上面的自定义属性node-name,对应bgObj里面的属性值，循环输出背景图，并且初始化默认选中背景
             */
            $.each(that.backObject[backKey], function(index, val) {
                if (that.defaultBgImg && that.defaultBgImg == val) {
                    (!_em.hasClass('radioCur')) ? _em.addClass('radioCur'): null;
                    /***
                     * 修改全局用户内外背景对象 insidebackground  outsidebackground
                     */
                    that[that.backType][_type] = 'background-image: url(' + that.defaultBgImg + ');';
                    imgHtml += '<li class="bgCur" ' + isVip + '><img src="' + val + '"> </li>';
                } else {
                    imgHtml += '<li ' + isVip + '><img src="' + val + '"> </li>';
                }
            });
            me.html(imgHtml);
        });
        /***
         * 如果是免费会员隐藏vip背景
         */
        if (!that.membersVip && vipBgWrap.length > 0) {
            vipBgWrap.hide();
        }
    },
    /***
     * 初始化上传图片
     */
    initImageUplaod: function() {
        var that = this,
            uploadWrap = that.content.find('[node-name="uploadBg"]'),
            imgElement = uploadWrap.find('.updateImgBox img');
        if (that.defaultBgImg) {
            var flag = true,
                bglinkArr = that.backType == 'insidebackground' ? that.backObject["insideBg"] : that.backObject["outsideBg"].concat(that.backObject["outsideVipBg"]);
            /***
             * 遍历推荐背景图片，跟默认的图片比对，如果不相等，那就是上传的图片
             */
            $.each(bglinkArr, function(index, val) {
                if (val == that.defaultBgImg) {
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                imgElement.attr('src', that.defaultBgImg);
                uploadWrap.find('dl dt em').addClass('radioCur');
                /***
                 * 更新全局用户内外背景对象
                 * @type {string}
                 */
                that[that.backType].uploadBg = 'background-image: url(' + that.defaultBgImg + ');';
            } else {
                imgElement.attr('src', this.noPicAddress);
            }
        } else {
            imgElement.attr('src', this.noPicAddress);
        }

        /***
         * 初始化图片上传
         */
        that.bgImgUpload(uploadWrap);
    },
    /***
     * 初始化颜色选择器
     */
    initColor: function() {
        var that = this,
            backColorWrap = that.content.find('[node-name="bgColor"]'),
            colorVal = that.defaultBgColor ? that.defaultBgColor : '',
            _type = backColorWrap.attr('node-name'); // 背景类型，背景颜色，上传背景，推荐背景
        /***
         * 初始化默认是否是背景颜色
         */
        if (that.defaultBgColor) {
            backColorWrap.find('dt em').addClass('radioCur');
            backColorWrap.find('.bgColorBox').css('background', that.defaultBgColor).attr('data-color', that.defaultBgColor);
            /***
             * 更新全局用户内外背景对象  insidebackground  outsidebackground
             */
            this[this.backType].bgColor = 'background: ' + this.defaultBgColor + ';';
        }

        /***
         * 初始化颜色编辑器
         */
        tool.createColorpicker(backColorWrap.find('.bgColorBox'), colorVal, null, function() {
            var color = backColorWrap.find('.bgColorBox').attr('data-color'),
                colorCss = 'background: ' + color + ';';
            /***
             * 更新全局用户内外背景对象
             */
            that[that.backType][_type] = colorCss;
            /***
             * 更新发送给后台的用户当前选择的背景对象
             */
            that.globalStyle[that.backType] = colorCss;
            that.globalStyle.isvipbackground = 0;
            /***
             * 更新导航样式，并选中选择背景色单选
             */
            that.updateTempStyle(function() {
                that.content.find('dl dt em').removeClass('radioCur');
                backColorWrap.find('dt em').addClass('radioCur');
            });
        });
    },
    /***
     * 应用推荐背景和vip背景
     * @param me 当前点击项
     */
    applicaBackground: function(me) {
        var that = this,
            /***
             * 当前背景里面的推荐背景，vip背景，上传背景，背景色
             */
            _type = me.parents('.bgImgBox').attr('node-name'), //样式类型，上传，颜色或者推荐
            isVip = me.attr('isVip'),
            imgSrc = me.find('img').attr('src').replace('/within/', '/abroad/'), //替换成大图
            bgCss = 'background-image: url(' + imgSrc + ');',
            _em = me.parents('dl').find('dt em');
        /***
         * 取消背景选择
         */
        if (me.hasClass('bgCur')) {
            var thatBg = that[that.backType][_type],
                globalBg = that.globalStyle[that.backType];
            /***
             * 如果取消选中的背景，跟全局背景相同就更新全局样式，否则不更新全局样式
             */
            if (thatBg == globalBg) {
                /***
                 * 更新发送给后台的用户当前选择的背景对象
                 */
                that.globalStyle[that.backType] = "";
                that.globalStyle.isvipbackground = isVip == 1 ? 1 : 0;
                that.updateTempStyle(function() {
                    _em.removeClass('radioCur');
                    me.removeClass('bgCur');
                });
            }
            /***
             * 更新全局用户内外背景对象
             */
            that[that.backType][_type] = "";
            me.removeClass('bgCur');
        } else {
            /***
             * 更新全局用户内外背景对象
             */
            that[that.backType][_type] = bgCss;
            /***
             * 更新发送给后台的用户当前选择的背景对象
             */
            that.globalStyle[that.backType] = bgCss;
            that.globalStyle.isvipbackground = isVip == 1 ? 1 : 0;
            that.updateTempStyle(function() {
                /***
                 * 选中当前点击项目
                 */
                that.content.find('ul[data-bglogo] li').removeClass('bgCur');
                that.content.find('dl dt em').removeClass('radioCur');
                _em.addClass('radioCur');
                me.addClass('bgCur');
            });
        }
    },
    /***
     * 更新全局模板样式
     * @param data ajaxData
     * @param callback 成功后的回调函数
     */
    updateTempStyle: function(callback) {
        var that = this,
            insideWrap = $('div[data-inside-bg-wrap]'), //渲染内背景区域
            outsideWrap = $('body'); //渲染外背景的区域
        /***
         * 发送更新样式请求的ajax的data属性增加一个模板id的字段，id的值是当前模板的id
         */
        that.globalStyle.templateid = this.template.id;
        $.ajax({
            url: that.interfaceUrl.styleUpdate,
            data: that.globalStyle,
            dataType: 'json',
            success: function(data) {
                if (data.state == 0) {
                    tool.createDialog(data.message);
                } else {
                    var insideObj = tool.formatDate(that.globalStyle.insidebackground),
                        outside = tool.formatDate(that.globalStyle.outsidebackground);
                    /***
                     * 移除内背景内敛样式，增加当前设置的样式
                     */
                    insideWrap.removeAttr('style', "");
                    $.each(insideObj, function(key, val) {
                        insideWrap.css($.trim(key), $.trim(val));
                    });
                    /***
                     * 移除外背景内敛样式，增加当前设置的样式
                     */
                    outsideWrap.removeAttr('style', "");
                    $.each(outside, function(key, val) {
                        outsideWrap.css($.trim(key), $.trim(val));
                    });
                    /***
                     * 执行回调
                     */
                    callback && callback();
                }
            },
            error: function() {
                tool.createDialog('更新样式失败！');
            }
        });
    },
    /***
     * 初始化上传背景
     * @param uploadBgWrap   上传区域
     */
    bgImgUpload: function(uploadBgWrap) {
        var that = this,
            webuploderObj = that.webuploaderConfig,
            webuploaderEntity = webuploader.create(webuploderObj);

        
        /**
         * [监听文件上传后接收服务器响应事件]
         */
        webuploaderEntity.on('uploadAccept', function(obj, ret) {
            var _json = ret || {},
                _type = uploadBgWrap.attr('node-name'), //uploadBg
                _img = uploadBgWrap.find('.updateImgBox img'),
                _result = false;
            /**
             * [文件上传成功]
             */
            if (_json.state === 'true') {
                /***
                 * 定义当前背景
                 * @type {string}
                 */
                var bgCss = 'background-image: url(' + _json.result.url + ');';
                /**
                 * 显示上传后的图片
                 */
                _img.attr('src', _json.result.url);
                /**
                 * 使图片在容器中以全部填充的形式显示
                 */
                _img.parent().imgLiquid({
                    fill: false
                });
                /***
                 * 更新当前背景的选中样式
                 */
                that[that.backType][_type] = bgCss;
                /***
                 * 修改发送请求的ajaxdata数据
                 * @type {string}
                 */
                that.globalStyle[that.backType] = bgCss;
                that.globalStyle.isvipbackground = 0;
                /***
                 * 更新样式
                 */
                that.updateTempStyle(function() {
                    /***
                     * 选中上传背景图的的单选按钮；
                     */
                    that.content.find('dl dt em').removeClass('radioCur');
                    uploadBgWrap.find('dt em').addClass('radioCur');
                });

            }
            /**
             * 文件上传失败
             */
            else {
                webuploaderEntity.trigger('error', 'CUSTOM', _json.error.message);
            }

            return _result;
        });

        /**
         * [监听上传错误事件，以显示上传错误信息]
         */
        webuploaderEntity.on('error', function() {
            /**
             * [errorSettings 错误信息枚举列表]
             * @type {Object}
             */
            var _errorSettings = {
                'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
                'Q_EXCEED_SIZE_': '上传文件大小超过上限！',
                'F_EXCEED_SIZE': '上传文件大小超过上限！',
                'Q_TYPE_DENIED': '上传文件类型错误，请重新选择上传！',
                'F_DUPLICATE': '上传文件重复了请重新选择上传！',
                'OTHER': '上传失败请重新上传！',
                'CUSTOM': ''
            };

            /** [显示错误信息] */
            var errorCode = arguments[0] || 'OTHER';
            dialog({
                title: '提示',
                content: _errorSettings[errorCode] || arguments[1] || '',
                okValue: '确定',
                ok: function() {
                    this.remove();
                }
            }).showModal();
        });
    },
    /***
     * 拷贝  tempStyle上的属性
     * @param self
     */
    copyAttr: function(self) {
        var that = this;
        $.each(self, function(key, val) {
            if (typeof val != "function") {
                that[key] = val;
            }
        });
    }
};