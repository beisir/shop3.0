/**
 * [util 导入通用工具函数模块]
 * @type {Object}
 */
var util = require('../common/util'),
    moduleUtil = require('../common/module.setting.util');

/**
 * [bannerAd 扩展广告设置模块]
 * @param  {Object} moduleEntity [模块业务对象]
 * @param  {String} html         [模块设置表单HTML]
 * @param  {Object} options      [模块设置配置项]
 * @return {Object}              [description]
 */
function bannerAd(moduleEntity, html, options) {
    var _this = this;

    /**
     * [html 初始化模块设置对象属性]
     * @type {[type]}
     */
    _this.html = html;
    _this.moduleEntity = moduleEntity;
    _this.formData = $.extend(true, {}, moduleEntity.dataEntity.data);

    /**
     * [options 配置项]
     * @type {Object}
     */
    _this.options = $.extend({

        /**
         * [webuploader 默认上传组件配置]
         * @type {Object}
         */
        webuploader: {
            server: '//imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd', //上传文件服务接口地址
            formData: {

                /**
                 * [operType 操作类型设置为上传图片]
                 */
                operType: 'upload',

                /**
                 * [picstr 加密信息picstr]
                 * @type {String}
                 */
                picstr: $('#picstr').val() || '',
                /***
                 * 是否限制宽高
                 */
                widthHeightLimitFlag: 1,
                /***
                 * 最小宽度
                 */
                widthMinLimit: '0',
                /***
                 * 最大宽度
                 */
                widthMaxLimit: '1920',
                /***
                 * 最小高度
                 */
                heightMinLimit: '0',
                /***
                 * 最大高度
                 */
                heightMaxLimit: '800'
            },
            fileVal: 'file',
            pick: {
                multiple: false
            },
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg',
                mimeTypes: 'image/gif,image/jpg,image/jpeg'
            },
            threads: 1,
            compress: false, //是否启用图片压缩
            /** 360安全浏览器限制了跨域flash文件的访问权限，所以如果要兼容该浏览器，需要将swf文件放置到页面所在域] */
            swf: '//style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf?t=' + Math.random(),
            // swf: '//b2b.hc360.com/components/webuploader/webuploader.swf?t=' + Math.random(),
            disableGlobalDnd: true, // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            fileSizeLimit: 5 * 1024 * 1024, // 验证文件总大小是否超出限制（此处设置为5M）
            duplicate: true, //是否可以上传重复文件，默认为false
            auto: false //设置为 true 后，不需要手动调用上传，有文件选择即开始上传
        }
    }, options || {});

    /**
     * [_deferreds 获取组件延迟对象数组]
     * @type {Array}
     */
    var _deferreds = _this.getComponentDeferred();
    $.when.apply(null, _deferreds).done(function() {

        /**
         * 组建加载完成后开始初始化
         */
        _this.init();
    });
}

/**
 * [init 初始化]
 * @return {[type]} [description]
 */
bannerAd.prototype.init = function() {
    var _this = this,
        _url = _this.formData['picurl'] || '';

    /**
     * [_url 从样式字符串中解析出图片路径]
     * @type {[type]}
     */
    _url = moduleUtil.getBgUrl(moduleUtil.serializeStyle(_url)['background-image'] || '');
    _this.formData['picurl'] = _url;

    /**
     * [dialogEntity 创建弹框对象]
     * @type {Object}
     */
    _this.dialogEntity = dialog({
        content: _this.html,
        title: '编辑内容>宽屏扩展广告'
    }).showModal();

    /**
     * 执行渲染完成回调
     */
    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);

    /**
     * [获取页面元素]
     */
    $(_this.dialogEntity.node).find('[data-element-name]').each(function(index, element) {
        var _elementName = $.trim($(element).attr('data-element-name'));
        if (_elementName && (!_this[_elementName])) {
            _this[_elementName] = $('[data-element-name="' + _elementName + '"]');
        }
    });

    /**
     * [初始化图片上传区域]
     */
    _this.wrapUnselected.show();
    _this.wrapSelected.hide();
    _this.imgAD.removeAttr('src');
    if (_url) {
        _this.wrapUnselected.hide();
        _this.wrapSelected.show();
        _this.imgAD.attr('src', _url);

        /**
         * 使图片在容器中以全部填充的形式显示
         */
        // _this.imgAD.parent().imgLiquid({
        // 	fill: true
        // });

        /**
         * 设置预览图片按钮链接
         */
        _this.btnPreview.attr({
            href: _url,
            target: "_blank"
        });
    }

    /**
     * [txtLink 填充链接地址]
     * @type {String}
     */
    _this.txtLink.val('');
    if ($.trim(_this.formData['linkurl'])) {
        _this.txtLink.val(_this.formData['linkurl']);
    }

    /**
     * 上传区域默认隐藏
     */
    _this.wrapUpload.hide();

    /**
     * 绑定元素事件
     */
    _this.bindEvent();
};

/**
 * [bindEvent 绑定事件]
 * @return {[type]} [description]
 */
bannerAd.prototype.bindEvent = function() {
    var _this = this;

    /**
     * [绑定 选择图片 按钮点击事件]
     */
    _this.btnShowSelectArea.click(function(event) {
        _this.wrapUnselected.hide();
        /***
         * 初始化选择图片的标题
         */
        _this.imgTitle.html('未选择任何文件');
        _this.wrapUpload.show();
    });

    /**
     * [绑定 撤销 按钮点击事件]
     */
    _this.btnHideSelectArea.click(function(event) {
        _this.wrapUnselected.show();
        _this.wrapUpload.hide();
    });

    /**
     * [绑定 保存 按钮点击事件]
     */
    _this.btnSave.click(function(event) {

        /**
         * 获取表单数据
         */
        _this.formData['linkurl'] = _this.txtLink.val();
        // _this.formData['picurl'] = _this.imgAD.attr('src')||'';

        /**
         * [验证数据]
         */
        if (!_this.validate()) {
            return false;
        }

        /**
         * [_deferred 获取完图片高度后再进行保存操作]
         * @type {[type]}
         */
        var _deferred = _this.getMaxHeightDeferred(_this.formData['picurl']);
        _deferred.done(function(_height) {

            /**
             * [_params 请求参数]
             * @type {[type]}
             */
            var _params = {
                    'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
                    'operatedata': { //操作内容
                        'providerid': pageEntity.providerid, //商铺编号
                        'username': pageEntity.username, //商铺用户名
                        'data': {
                            'picurl': 'background-image:url(' + _this.formData['picurl'] + ');height:' + _height + 'px;', //图片地址
                            'linkurl': _this.formData['linkurl'] //链接地址
                        }
                    }
                },

                /**
                 * [_callee 正在执行函数引用]
                 * @type {Function}
                 */
                _callee = arguments.callee;

            /**
             * [operatedata 更新请求参数]
             * @type {Object}
             */
            _params.operatedata = $.extend({}, _this.moduleEntity.dataEntity, _params.operatedata);
            //_params.operatedata = JSON.stringify(_params.operatedata);

            /**
             * [保存模块配置]
             */
            _this.moduleEntity.update({
                data: _params.operatedata.data
            }, function() {

                /**
                 * 模块更新成功后移除当前模块设置弹出框
                 */
                _this.dialogEntity.remove();
            });

        });
    });

    /**
     * [绑定 取消 关闭 按钮点击事件]
     */
    _this.btnCancel.click(function(event) {
        _this.dialogEntity.remove();

        /**
         * 销毁 webuploader 对象实例
         */
        _this.webuploaderEntity && _this.webuploaderEntity.destroy();
    });

    /**
     * [绑定 上传 按钮点击事件]
     */
    _this.btnUpload.click(function(event) {

        /**
         * [未选择文件时提示]
         */
        if (_this.webuploaderEntity.getFiles().length === 0) {
            dialog({
                title: '提示',
                content: '未选择任何文件',
                okValue: '确定',
                ok: function() {
                    this.remove();
                }
            }).showModal();
            return;
        }

        _this.webuploaderEntity && _this.webuploaderEntity.upload();
    });

    /**
     * [检测浏览器是否支持 webuploader 上传组件]
     */
    if (!_this.detectBrowserSupport()) {
        return;
    }

    /**
     * [webuploaderSettings 初始化上传组件配置]
     * @type {Object}
     */
    var webuploaderSettings = $.extend(_this.options.webuploader, {
        pick: {
            id: _this.btnSelect.selector
        }
    });

    /**
     * [webuploaderEntity 实例化上传组件对象实例]
     * @type {webuploader}
     */
    _this.webuploaderEntity = webuploader.create(webuploaderSettings);

    /** 添加进来图片,修改图片标题 **/
    _this.webuploaderEntity.on('fileQueued', function(file) {
        _this.imgTitle.html(file.name);
    });
    /**
     * [监听文件上传后接收服务器响应事件]
     */
    _this.webuploaderEntity.on('uploadAccept', function(obj, ret) {
        var _json = ret || {},
            _result = false;

        /**
         * [文件上传成功]
         */
        if (_json.state === 'true') {

            /**
             * 更新缓存中的数据
             */
            _this.formData['picurl'] = _json.result.url;

            /**
             * 显示上传后的图片
             */
            _this.imgAD.attr('src', _json.result.url);

            /**
             * 设置预览图片按钮链接
             */
            _this.btnPreview.attr({
                href: _this.formData['picurl'],
                target: "_blank"
            });

            /**
             * 使图片在容器中以全部填充的形式显示
             */
            _this.imgAD.parent().imgLiquid({
                fill: false
            });

            /**
             * 隐藏选择图片区域，显示上传图片区域
             */
            _this.wrapSelected.show();
            _this.wrapUpload.hide();
        }
        /**
         * 文件上传失败
         */
        else {
            _this.webuploaderEntity.trigger('error', 'CUSTOM', _json.error.message);
        }

        return _result;
    });

    /**
     * [监听上传错误事件，以显示上传错误信息]
     */
    _this.webuploaderEntity.on('error', function() {

        /**
         * [errorSettings 错误信息枚举列表]
         * @type {Object}
         */
        var _errorSettings = {
            'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
            'Q_EXCEED_SIZE_LIMIT': '上传文件大小超过上限！',
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
};

/**
 * [validate 验证数据]
 * @return {[type]} [description]
 */
bannerAd.prototype.validate = function() {
    var _this = this;

    /**
     * [验证图片是否非空]
     */
    if (!$.trim(_this.formData['picurl'])) {
        dialog({
            title: '提示',
            content: '请上传图片！',
            okValue: '确定',
            ok: function() {
                this.remove();
            }
        }).showModal();
        return false;
    }

    /**
     * [链接地址非空时，验证地址是否外链]
     */
    if ($.trim(_this.formData['linkurl'])) {

        /**
         * [linkAttr 获取指定链接地址的相关属性]
         * @type {Object}
         */
        var linkAttr = util.parseURL(_this.formData['linkurl']);
        if (!(/hc360.com$/.test(linkAttr.host.toLowerCase()))) {
            dialog({
                title: '提示',
                content: '不能链接慧聪网以外地址！',
                okValue: '确定',
                ok: function() {
                    this.remove();
                }
            }).showModal();

            /**
             * 清空链接地址文本框
             */
            _this.txtLink.val('');
            return false;
        } else {
            /**
             * 填充带有协议的url地址
             */
            _this.txtLink.val(linkAttr.source);
            _this.formData['linkurl'] = linkAttr.source;
        }
    }

    return true;
};

/**
 * [getComponentDeferred 加载组件]
 * @return {Array} [延迟对象数组]
 */
bannerAd.prototype.getComponentDeferred = function() {
    var _this = this;

    /**
     * [webuploaderDeferred 创建加载 webuploader 延迟对象]
     * @type {Object}
     */
    var webuploaderDeferred = $.Deferred();
    require.ensure([], function(require) {
        require('webuploader');
        webuploaderDeferred.resolve();
    }, 'components/webuploader/webuploader');

    /**
     * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
     * @type {Object}
     */
    var imgLiquidDeferred = $.Deferred();
    require.ensure([], function(require) {
        require('jquery_imgLiquid');
        imgLiquidDeferred.resolve();
    }, 'components/jquery_imgLiquid');

    return [webuploaderDeferred, imgLiquidDeferred];
};

/**
 * [detectBrowserSupport 检测浏览器兼容性]
 * @return {[type]} [description]
 */
bannerAd.prototype.detectBrowserSupport = function() {
    var _this = this;
    var _flashVersion = (function() {
        var version;
        try {
            version = navigator.plugins['Shockwave Flash'];
            version = version.description;
        } catch (ex) {
            try {
                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                    .GetVariable('$version');
            } catch (ex2) {
                version = '0.0';
            }
        }
        version = version.match(/\d+/g);
        return parseFloat(version[0] + '.' + version[1], 10);
    })();

    /**
     * [若当前浏览器是IE且未安装flash插件]
     */
    if (!webuploader.Uploader.support('flash') && webuploader.browser.ie) {

        /**
         * [安装了flash但是版本过低]
         */
        if (_flashVersion) {
            (function(container) {
                window['expressinstallcallback'] = function(state) {
                    switch (state) {
                        case 'Download.Cancelled':
                            alert('您取消了更新！');
                            break;

                        case 'Download.Failed':
                            alert('安装失败');
                            break;

                        default:
                            alert('安装已成功，请刷新！');
                            break;
                    }
                    delete window['expressinstallcallback'];
                };

                var swf = '//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/expressInstall.swf';
                var html = '<object type="application/' +
                    'x-shockwave-flash" data="' + swf + '" ';

                if (webuploader.browser.ie) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }

                html += 'width="100%" height="100%" style="outline:0">' +
                    '<param name="movie" value="' + swf + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                    '</object>';

                container.html(html);

            })(_this.btnSelect);
        } else {

            /**
             * [未安装时，提示安装]
             * @param  {String} $('<a href          [description]
             * @return {[type]}       [description]
             */
            _this.btnSelect.replaceWith($('<a href="//www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="//style.org.hc360.cn/js/build/source/widgets/jqwebuploader/getFlashPlayer.jpg" /></a>'));
        }
        return false;
    } else if (!webuploader.Uploader.support()) {

        /**
         * 图片上传组件不支持当前浏览器
         */
        dialog({
            title: '提示',
            content: '图片上传组件不支持您的浏览器！',
            okValue: '确定',
            ok: function() {
                this.remove();
            }
        }).showModal();
        return false;
    }
    return true;
};

/**
 * [getMaxHeightDeferred 获取图片高度延迟对象]
 * @return {[type]} [description]
 */
bannerAd.prototype.getMaxHeightDeferred = function(picurl) {
    var _this = this;
    var heightDef = $.Deferred();
    var imgUrl = picurl;
    if (imgUrl == "" || !imgUrl) {
        return true;
    }
    var img = new Image();
    img.onload = function() {
        heightDef.resolve(this.height);
    };
    img.onerror = function() {
        heightDef.resolve(0);
    };
    img.src = imgUrl;
    return heightDef;
};

module.exports = bannerAd;