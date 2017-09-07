/**
 * Created by 姜艳云 on 2016/10/13.
 *
 *  模块工具包
 */
/**
 * jQuery Mousewheel 3.1.13
 */
require('../../components/jquery.mousewheel');

var tool = {
    /***
     * 格式化字符串，返回一个对象
     * @returns {{}}
     */
    formatDate: function(data) {
        var result,
            reg = /([^:;]+):([^;]+);/ig,
            obj = {};
        while (result = reg.exec(data)) {
            obj[result[1]] = result[2];
        }
        return obj;
    },
    /***
     * background:url(//www.hc360.com/1.jpg)
     * 获取//www.hc360.com/1.jpg图片路径，返回一个图片地址
     * @returns {string}
     */
    getBgUrl: function(url) {
        var reg = /url\((['"]?)(.+)\1\)/g;
        var result;
        if (result = reg.exec(url)) {
            return result[2];
        } else {
            return result;
        }
    },
    /***
     * 初始化图片路径，图片加载失败，替换成无图
     * @param list
     */
    initImgSrc: function(list) {
        $.each(list, function(index, val) {
            var _img = $(val).find('img'),
                _imgSrc = $.trim(_img.attr('src')),
                newImg = $('<img>').attr('src', _imgSrc);
            newImg.error(function() {
                _img.attr('src', '//style.org.hc360.com/images/detail/mysite/siteconfig/newPro/nPic.jpg');
                newImg.onerror = null;
            });
        });
    },
    /****
     * 创建提示性弹框，只有一个确定按钮；
     * @param prompt 弹框提示内容
     */
    createDialog: function(prompt) {
        dialog({
            title: '提示',
            content: prompt,
            okValue: '确定',
            ok: function() {
                this.remove();
                return false;
            }
        }).showModal();
    },

    /**
     * [serializeStyle 解析样式字符串]
     * @param  {[type]} strStyle [description]
     * @return {[type]}          [description]
     */
    serializeStyle: function(strStyle) {
        var _regExp = new RegExp('([^:;]+):([^;]+)', 'igm'),
            _ret = {},
            _parttern;

        while (_parttern = _regExp.exec(strStyle)) {
            _ret[_parttern[1].trim()] = _parttern[2].trim();
        }

        return _ret;
    },

    /**
     * [createColorpicker 创建取色器]
     * @param node 点击出现颜色选择器的元素
     * @param color 初始化颜色选择器的颜色
     * @param dialog 当前弹框
     * @param callback 改变颜色后的回调函数
     * @param showCallback 显示取色器时的回调函数
     */
    createColorpicker: function(node, color, dialog, callback, showCallback) {
        require.ensure([], function(require) {
            require('jquery.spectrum');

            /**
             * [color 设置默认色]
             */
            color = $.trim(color);
            color = color.length ? color : '#2399fe';

            /**
             * [初始化取色器]
             */
            node.spectrum({
                showInput: true,
                color: color,
                cancelText: "取消",
                chooseText: "选择",
                clearText: "清除",
                preferredFormat: 'hex',
                change: function(col) {
                    $(this).attr('data-color', col.toHexString());
                    callback && callback();
                },
                hide: function(col) {
                    $(this).attr('data-color', col.toHexString());
                    callback && callback();
                },
                show: function(color) {
                    showCallback && showCallback.apply(this, arguments);
                }
            });
            /***
             * 拖拽停止后，执行方法
             */
            node.on("dragstop.spectrum", function(e, color) {
                $(this).attr('data-color', color.toHexString());
                callback && callback();
            })

            /**
             * [点击时切换显示状态]
             */
            .click(function(event) {
                $(this).spectrum("toggle");
            });

            /***
             * 关闭弹层的时候移除颜色编辑器
             */
            dialog && dialog.addEventListener('close', function() {
                node.spectrum("destroy");
            });
        }, 'components/jquery.spectrum/jquery.spectrum');
    },

    /***
     * 创建上传组件
     * @param data webuploader配置
     * @param upload 上传按钮
     * @param logoTitle  图片加入队列后，图片标题显示区域
     * @param defaultTilte 默认无图，标题文字
     * @param webuploderSuccess 图片上传完成后执行的回调
     */
    createWebuploder: function(data, upload, logoTitle, defaultTilte, webuploderSuccess, webuploaderLoadedCallback) {
        var that = this;
        require.ensure([], function(require) {
            require('webuploader');
            var uploader = webuploader.create(data);
            webuploaderLoadedCallback && webuploaderLoadedCallback(uploader);
            /** 图片上传 **/
            upload.click(function() {
                if (logoTitle.html() == defaultTilte) {
                    that.createDialog('请选择要上传的文件！');
                    return false;
                }
                uploader.upload();
            });
            /** 添加进来图片 **/
            uploader.on('fileQueued', function(file) {
                logoTitle.html(file.name);
            });
            /**
             * [监听文件上传后接收服务器响应事件]
             */
            uploader.on('uploadAccept', function(obj, ret) {
                var _json = ret || {},
                    _result = false;
                /**
                 * [文件上传成功]
                 */
                if (_json.state === 'true') {
                    var _img = $('<img src="' + _json.result.url + '">');
                    /** 上传图片成功后执行webuploderSuccess**/
                    webuploderSuccess && webuploderSuccess(_img);
                } else {
                    uploader.trigger('error', 'CUSTOM', _json.error.message);
                }
                return _result;
            });
            /***
             * [监听文件上传失败后的响应事件]
             */
            uploader.on('error', function() {
                /**
                 * [errorSettings 错误信息枚举列表]
                 * @type {Object}
                 */
                var _errorSettings = {
                    'Q_EXCEED_NUM_LIMIT': '上传文件数量超过上限！',
                    'Q_EXCEED_SIZE_': '上传文件大小超过上限！',
                    'F_EXCEED_SIZE': '上传文件大小超过限制！',
                    'Q_TYPE_DENIED': '格式不正确，请重新选择上传！',
                    'F_DUPLICATE': '上传文件重复了请重新选择上传！',
                    'OTHER': '上传失败请重新上传！',
                    'CUSTOM': ''
                };
                /** [显示错误信息] */
                var errorCode = arguments[0] || 'OTHER';
                that.createDialog(_errorSettings[errorCode] || arguments[1] || '');
            });
        }, 'components/webuploader/webuploader');
    },
    /** 设置字体类型初始值 **/
    "setFontType": function(data, _default, that) {
        var dataFamily = data["font-family"],
            fontFamily = dataFamily ? dataFamily : _default;
        if (that == fontFamily) {
            return '<option selected>' + that + '</option>';
        } else {
            return '<option>' + that + '</option>';
        }
    },
    /** 设置字号初始值 **/
    "setFontSize": function(data, _default, that) {
        var dataSize = window.parseInt(data["font-size"]),
            fontSize = dataSize ? dataSize : _default;
        if (that == fontSize) {
            return '<option selected>' + that + '</option>';
        } else {
            return '<option>' + that + '</option>';
        }
    },
    /** 设置是否加粗初始值 **/
    "setFontBold": function(data) {
        var fontFamily = data["font-weight"];
        if (fontFamily == "bold") {
            return 'curCheckBox';
        }
    },
    /** 设置是否倾斜初始值 **/
    "setFontStyle": function(data) {
        var fontStyle = data["font-style"];
        if (fontStyle == "italic") {
            return 'curCheckBox';
        }
    },

    /**
     * [preventMousewheel 在指定元素滚动到顶部或底部时，取消置顶包裹元素的滚动事件行为，防止页面发生滚动]
     * @param  {Object} wrap [要操作的元素]
     */
    preventMousewheel: function(wrap) {

        /**
         * [preventDefault 取消默认行为]
         */
        function preventDefault(e) {
            e = e || window.event;
            e.preventDefault && e.preventDefault();
            e.returnValue = false;
        }

        /**
         * [stopPropagation 阻止事件冒泡]
         */
        function stopPropagation(e) {
            e = e || window.event;
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = false;
        }

        /**
         * [绑定元素鼠标滚动事件]
         */
        wrap.on('mousewheel', function(e, delta) {
            stopPropagation(e);
            var box = $(this).get(0);
            if ($(box).outerHeight() + box.scrollTop >= box.scrollHeight) {
                if (delta < 0) {
                    preventDefault(e);
                    return false;
                }
            }
            if (box.scrollTop === 0) {
                if (delta > 0) {
                    preventDefault(e);
                    return false;
                }
            }
        });
    }
};
module.exports = tool;