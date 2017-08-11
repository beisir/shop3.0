/**
 * Created by 姜艳云 on 2016/9/29.
 *
 * [导航栏]
 */
var tool = require('../common/module.setting.util');
var navigation = function(data, html, obj) {
    /***
     * 图片上传地址
     */
    this.uploadUrl = 'http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd';
    this.moduleEntity = data;
    /**
     * 模块数据
     */
    this.moduleData = data.dataEntity.data;
    /****
     * 配置对象
     * @type {*|{}}
     */
    this.option = obj || {};

    /***
     * 选中按钮样式设置 selectedStyleSet
     */
    this.selectedStyleSet = tool.formatDate(this.moduleData.button.selected);

    /**
     * 未选中按钮样式设置
     * @type {*|{}}
     */
    this.unSelectedStyleSet = tool.formatDate(this.moduleData.button.unselected);

    /**
     * 边线类型
     *
     */
    this.borderType = {
        none: '无边框',
        solid: '实线',
        dashed: '点线'
    };

    /**
     * [navBackgroundColor 导航背景颜色]
     * @type {[type]}
     */
    this.navBackgroundColor = tool.serializeStyle(this.moduleData['background'])['background'] || '';

    /** 初始化弹层 **/
    this.initLayer(html);
};
navigation.prototype = {
    constructor: navigation,
    /****
     * 初始化弹框
     */
    initLayer: function(html) {
        var that = this,
            selectedData = that.selectedStyleSet,
            unSelectedData = that.unSelectedStyleSet;
        /***
         * 模板引擎配置数据
         *
         */
        var configData = {
            "fontType": ['宋体', '仿宋', '黑体', '楷体'],
            "fontSize": ['12', '14', '16'],
            /** 选中字体颜色和边框颜色 **/
            "selectedColor": selectedData.color,
            "selectedBorderColor": selectedData.border ? selectedData.border.split(" ")[2] : "",
            /** 未选中字体颜色和边框颜色 **/
            "unSelectedColor": unSelectedData.color,
            "unSelectedBorderColor": unSelectedData.border ? unSelectedData.border.split(" ")[2] : "",
            /***
             * 选中背景
             */
            'selectBackground': selectedData ? tool.getBgUrl(selectedData["background"]) : undefined,
            /***
             * 未选中背景
             */
            'unSelectBackground': unSelectedData ? tool.getBgUrl(unSelectedData["background"]) : undefined,
            /**
             * 导航栏背景
             */
            'navBackground': tool.getBgUrl(that.moduleData['background']),
            'navBackgroundColor': that.navBackgroundColor,
            /** 边框类型 **/
            "borderType": ['无边框', '实线', '点线'],
            /**
             * 设置选择的字体类型初始值
             */
            "setSelectFontType": function() {
                return tool.setFontType(selectedData, '宋体', this);
            },
            /**
             * 设置选择的字号初始值
             */
            "setSelectFontSize": function() {
                return tool.setFontSize(selectedData, '12', this);
            },

            /**
             * 设置选择的否加粗初始值
             */
            "setSelectFontBold": function() {
                return tool.setFontBold(selectedData);
            },

            /**
             * 设置选择的是否倾斜初始值
             */
            "setSelectFontStyle": function() {
                return tool.setFontStyle(selectedData);
            },

            /**
             * 设置选择的边框初始值
             */
            "setSelectBorderType": function() {
                var _border = selectedData["border"],
                    borderStyle = _border ? _border.split(" ")[1] : "none";
                if (this == that.borderType[borderStyle]) {
                    return '<option selected>' + this + '</option>';
                } else {
                    return '<option>' + this + '</option>';
                }
            },
            /**
             * 设置未选择的字体类型初始值
             */
            "unSelectFontType": function() {
                return tool.setFontType(unSelectedData, '宋体', this);
            },

            /**
             * 设置未选择的字号初始值
             */
            "unSelectFontSize": function() {
                return tool.setFontSize(unSelectedData, '12', this);
            },

            /**
             * 设置未选择的是否加粗初始值
             */
            "unSelectFontBold": function() {
                return tool.setFontBold(unSelectedData);
            },

            /**
             * 设置未选择的是否倾斜初始值
             */
            "unSelectFontStyle": function() {
                return tool.setFontStyle(unSelectedData);
            },

            /**
             * 设置未选择的边框初始值
             */
            "unSelectBorderType": function() {
                var _border = unSelectedData["border"],
                    borderStyle = _border ? _border.split(" ")[1] : "none";
                if (this == that.borderType[borderStyle]) {
                    return '<option selected>' + this + '</option>';
                } else {
                    return '<option>' + this + '</option>';
                }
            }
        };

        /**
         * [异步加载 mustache 组件后再继续模块初始化]
         */
        require.ensure([], function(require) {
            require('mustache');

            /**
             * 创建弹层触发一个回调函数；汪浩让第一个弹层出现的时候加的；
             */
            that.option.rendedCallback && that.option.rendedCallback.call(that);

            that.navDialog = dialog({
                content: mustache.render(html, configData),
                title: '编辑内容>导航栏'
            }).showModal();

            /** 导航栏弹框元素 **/
            that.nav = $(that.navDialog.node);

            /** 导航按钮设置区域 **/
            that.navBtnSet = that.nav.find('[node-name="navBtnSet"]');

            /** 导航栏背景设置区域 **/
            that.navBgSet = that.nav.find('[node-name="navBgSet"]');

            that.bindEvent();

        }, 'components/mustache/mustache');
    },
    /****
     * 绑定弹层操作事件
     */
    bindEvent: function() {
        var that = this;
        /**
         * 选中未选中按钮切换区域
         */
        var btnCheck = that.navBtnSet.find('[node-name="btnCheck"]');

        /**
         * 选中未选中内容按钮切换区域
         */
        var navContainer = that.navBtnSet.find('[node-name="navContainer"]');

        /**
         * 选中区域
         */
        var selectWrap = navContainer.find('[node-name="checkBtnSet"]');

        /** 未选中区域 **/
        var unSelectWrap = navContainer.find('[node-name="uncheckBtnSet"]');

        /***
         *  关闭弹层  保存  取消
         */
        that.nav.on('click', '.t-close,.Cancel', function() {
            that.navDialog.close().remove();
        });

        /****
         * 弹层设置保存
         */
        that.nav.on('click', '.Save', function() {
            that.dialogSetSave();
        });

        /****
         *  选中和未选中切换
         */
        btnCheck.on('click', 'span', function() {
            btnCheck.find('span').removeClass();
            $(this).addClass('checked').siblings().addClass('unchecked');
            navContainer.find('.layout-info').hide().eq($(this).index()).show();
        });
        /***
         * 加粗，斜体，点击切换
         */
        that.navBtnSet.on('click', '.checkBox', function() {
            if ($(this).hasClass('curCheckBox')) {
                $(this).removeClass('curCheckBox');
            } else {
                $(this).addClass('curCheckBox');
            }
        });
        /**
         * 导航按钮和导航栏背景 默认和自定义切换
         */
        that.nav.on('click', '.radioCon,.sp-replacer', function() {
            var customBox = $(this).parent('.radioBox').next('.pic-box');
            var selectePicBox = customBox.next('.navimg-file-box');
            $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
            if ($(this).index() == 2) {
                customBox.show();
            } else {
                customBox.hide();
                selectePicBox.hide();
            }
        });

        /***
         * 初始化选中字体颜色选择器
         */
        tool.createColorpicker(
            selectWrap.find('[node-name="fontCorlorJoe"]'),
            that.selectedStyleSet["color"],
            that.navDialog
        );

        /***
         * 初始化选中边框颜色选择器
         */
        tool.createColorpicker(
            selectWrap.find('[node-name="borderColorJoe"]'),
            that.selectedStyleSet["border-color"],
            that.navDialog
        );

        /***
         * 初始化没有选中的字体颜色选择器
         */
        tool.createColorpicker(
            unSelectWrap.find('[node-name="fontCorlorJoe"]'),
            that.unSelectedStyleSet["color"],
            that.navDialog
        );

        /***
         * 初始化没有选中的边框颜色选择器
         */
        tool.createColorpicker(
            unSelectWrap.find('[node-name="borderColorJoe"]'),
            that.unSelectedStyleSet["border-color"],
            that.navDialog
        );

        /**
         * [初始化导航栏背景设置的背景色选择器]
         */
        tool.createColorpicker(
            that.navBgSet.find('[node-name="bgColorJoe"]'),
            that.navBackgroundColor,
            that.navDialog,
            null,
            function(color) {
                var radioWrap = $(this).closest('.radioCon'),
                    customBox = $(this).closest('.radioBox').next('.pic-box'),
                    selectePicBox = customBox.next('.navimg-file-box');
                radioWrap.addClass('curRadioBox').siblings().removeClass('curRadioBox');
                customBox.hide();
                selectePicBox.hide();
            }
        );

        /**
         * 点击选择图片出现选择文件，初始化了选中和未选中，还有导航栏背景
         */
        var checkImg = this.nav.find('[node-name="imgUpload"]');
        checkImg.click(function() {
            $(this).parent('.pic-box').hide();
            $(this).parents('.layout-info-con').find('.navimg-file-box').show();
        });

        /**
         * 撤销选择文件，初始化了选中和未选中，还有导航栏背景
         */
        var undo = this.nav.find('[node-name="undo"]');
        undo.click(function() {
            $(this).parents('.navimg-file-box').find('span.txt').html('未选择任何文件').end().hide();
            $(this).parents('.layout-info-con').find('.pic-box').show();
        });

        /**
         * 初始化选中按钮背景图片上传
         */
        this.btnBgUpload('#checkImgUpload', selectWrap);

        /**
         * 初始化未选中按钮背景图片上传
         */
        this.btnBgUpload('#unCheckImgUpload', unSelectWrap);

        this.navBgUpload();
    },
    /**
     * 弹层设置保存
     */
    dialogSetSave: function() {
        var that = this,
            moduleData = {},
            picBox = that.navBgSet.find('.pic-box');

        /**
         * [bgColorChecked 导航栏背景设置是否选中]
         * @type {Boolean}
         */
        var bgColorChecked = that.navBgSet.find('.radioBox .curRadioBox').index() === 1,

            /**
             * [bgColorValue 导航栏背景色值]
             * @type {[type]}
             */
            bgColorValue = that.navBgSet.find('[node-name="bgColorJoe"]').attr('data-color');
        moduleData.button = {
            "selected": that.formData('[node-name="checkBtnSet"]'),
            "unselected": that.formData('[node-name="uncheckBtnSet"]')
        };

        if (picBox.is(":visible")) {
            moduleData.background = 'background:url(' + picBox.find('.picUpdetaImg img').attr('src') + ')';
        } else if (bgColorChecked && bgColorValue) {
            moduleData.background = 'background:' + bgColorValue + ';';
        } else {
            moduleData.background = '';
        }
        //模块的保存
        that.moduleEntity.update({
            data: moduleData
        }, function() {

            that.navDialog.close().remove();
        });
    },
    /***
     * 导航按钮背景上传
     * @param id  触发上传的id
     * @param wrap 选中和未选中的外层div
     */
    btnBgUpload: function(id, checkeWrap) {
        var that = this,
            /** 上传图片展示区域 **/
            pictureShow = checkeWrap.find('.pic-box'),
            /** 上传图片操作区域 **/
            pictureOperat = checkeWrap.find('.navimg-file-box'),
            /** logo图片标题区域 **/
            titleWrap = pictureOperat.find('span.txt'),
            /** 上传按钮 **/
            upload = pictureOperat.find('[node-name="upload"]'),
            /** 默认logoTile **/
            defaultTilte = "未选择任何文件";
        var webuploderObj = {
            // swf文件路径
            swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
            // 文件接收服务端。
            server: that.uploadUrl,
            // 选择文件的按钮。可选。
            pick: {
                id: id,
                multiple: false //关闭多个文件传输的功能
            },
            formData: {
                /**
                 * [operType 操作类型设置为上传图片]
                 */
                operType: 'upload',

                /**
                 * [picstr 加密信息picstr]
                 * @type {String}
                 */
                picstr: $('#picstr').val() || ''
            },
            //设置文件上传域的name。
            fileVal: "file",
            //最多支持上传一个图片
            threads: 1,
            //限制单个文件大小
            fileSingleSizeLimit: 100 * 1024, // 100 k
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,png',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
            },
            compress: false,
            duplicate: true, //是否可以上传重复文件，默认为undefined
            //禁掉整个页面的拖拽功能
            disableGlobalDnd: true
        };
        tool.createWebuploder(webuploderObj, upload, titleWrap, defaultTilte, function(img) {
            titleWrap.html('未选择任何文件').end().hide();
            pictureShow.show().find('.picUpdetaImg p').empty().append(img);
        });
    },
    /***
     * 导航栏背景上传
     */
    navBgUpload: function() {
        var that = this,
            /** 上传图片展示区域 **/
            pictureShow = this.navBgSet.find('.pic-box'),
            /** 上传图片操作区域 **/
            pictureOperat = this.navBgSet.find('.navimg-file-box'),
            /** logo图片标题区域 **/
            titleWrap = pictureOperat.find('span.txt'),
            /** 上传按钮 **/
            upload = pictureOperat.find('[node-name="upload"]'),
            /** 默认logoTile **/
            defaultTilte = "未选择任何文件";
        var webuploderObj = {
            // swf文件路径
            swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
            // 文件接收服务端。
            server: that.uploadUrl,
            // 选择文件的按钮。可选。
            pick: {
                id: '#navBgUpload',
                multiple: false //关闭多个文件传输的功能
            },
            formData: {
                /**
                 * [operType 操作类型设置为上传图片]
                 */
                operType: 'upload',

                /**
                 * [picstr 加密信息picstr]
                 * @type {String}
                 */
                picstr: $('#picstr').val() || ''
            },
            //设置文件上传域的name。
            fileVal: "file",
            //最多支持上传一个图片
            threads: 1,
            //限制单个文件大小
            fileSingleSizeLimit: 100 * 1024, // 100 k
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,png',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
            },
            compress: false,
            duplicate: true, //是否可以上传重复文件，默认为undefined
            //禁掉整个页面的拖拽功能
            disableGlobalDnd: true
        };
        tool.createWebuploder(webuploderObj, upload, titleWrap, defaultTilte, function(img) {
            titleWrap.html('未选择任何文件').end().hide();
            pictureShow.show().find('.picUpdetaImg p').empty().append(img);
        });
    },
    /**
     *  结构化选择和未选择的数据
     * @param wrap  选择和未选择warp
     * @returns {string}
     */
    formData: function(wrap) {
        var that = this,
            companyString = "",
            checkWrap = that.nav.find(wrap),
            radioBox = checkWrap.find('.radioBox>span.radioCon'),
            checkBox = checkWrap.find('.checkBox'),
            /** 自定义背景路径 **/
            backgroundSrc = checkWrap.find('.pic-box .picUpdetaImg img').attr('src'),
            /** 边框类型 **/
            borderStyle = that.getBorderType(checkWrap.find('[name="borderStyle"] option:selected').html()),
            /** 边框颜色 **/
            borderColor = checkWrap.find('[node-name="borderColorJoe"]').attr('data-color'),
            navSetObj = {
                "font-family": checkWrap.find('[name="wordType"] option:selected').html(),
                "font-size": checkWrap.find('[name="wordSize"] option:selected').html() + 'px',
                "font-weight": checkBox.eq(0).hasClass("curCheckBox") ? "bold" : "normal",
                "font-style": checkBox.eq(1).hasClass("curCheckBox") ? "italic" : "normal",
                "color": checkWrap.find('[node-name="fontCorlorJoe"]').attr('data-color'),
                "border": '1px ' + borderStyle + ' ' + borderColor
            };

        /***
         * 如果选中的是默认背景，background是“”；
         */
        if (radioBox.eq(0).hasClass('curRadioBox')) {
            navSetObj.background = "";
        } else {
            backgroundSrc ? (navSetObj.background = 'url(' + backgroundSrc + ')') : (navSetObj.background = "");
        }

        for (var key in navSetObj) {
            companyString += key + ':' + navSetObj[key] + ';';
        }
        return companyString;
    },
    /***
     * 获取页面上的边框类型，转换成css
     * @param value 边框类型
     * @returns {string}
     */
    getBorderType: function(value) {
        var borderType = '';
        $.each(this.borderType, function(key, val) {
            if (value == val) {
                borderType = key;
                return false;
            }
        });
        return borderType;
    }
};
module.exports = navigation;