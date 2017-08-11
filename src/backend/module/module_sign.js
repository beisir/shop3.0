/**
 * Created by 姜艳云 on 2016/9/22.
 *
 * [公司招牌]
 */
var tool = require('../common/module.setting.util');
var signature = function(data, html, obj) {

    this.moduleEntity = data;

    /***
     * 图片上传地址
     */
    this.uploadUrl = 'http://imgup.b2b.hc360.com/imgup/turbine/action/imgup.PicManagementAction/eventsubmit_doPerform/ddd';
    /**
     * 模块数据
     */
    this.moduleData = data.dataEntity.data;

    /****
     * 配置对象
     * @type {*|{}}
     */
    this.option = obj || {};

    var that = this;
    that.def = this.loadComponents();
    $.when.apply(null, that.def).done(function() {
        that.initLayer(html);
    });
};

signature.prototype = {
    constructor: signature,
    /***
     * 根据 that.dataEntity.data 初始化公司招牌弹层默认值；
     * @param date  弹层的html
     */
    initLayer: function(date) {
        var that = this,
            /***
             * 招牌背景设置
             */
            backgUrl = that.moduleData["backgroundurl"],
            /**
             * 公司名称设置
             */
            companyName = tool.formatDate(that.moduleData["companyname"]),
            /**
             * 招牌背景url
             */
            bjUrlCss = backgUrl == "" ? "" : (tool.getBgUrl(backgUrl) || ''),

            /**
             * [styleObject 解析样式]
             * @type {[type]}
             */
            styleObject = tool.serializeStyle(backgUrl),

            /**
             * [signHeight 招牌高度，默认为110]
             * @type {[type]}
             */
            signHeight = parseInt(styleObject['height']) || 110;


        /***
         * 模板引擎配置数据
         */
        var
            configData = {
                "fontType": ['宋体', '仿宋', '黑体', '楷体'],
                "fontSize": ['12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],
                "signHeight": [{
                    text: '110像素',
                    val: 110
                }, {
                    text: '130像素',
                    val: 130
                }, {
                    text: '150像素',
                    val: 150
                }],
                "height": signHeight,
                "logourl": that.moduleData.logourl,
                "defaultBg": pageEntity.template.BrandImage, //默认招牌背景图【defaultBg】
                "companyname": companyName,
                "backgroundCollor": companyName.color ? companyName.color : "#2399fe", //默认公司名称背景色
                /** 是否显示公司名称 **/
                "showCompanyName": function() {
                    var fontSize = companyName["display"];
                    if (fontSize != "none") {
                        return 'curCheckBox';
                    }
                },
                /***
                 * 是否显示删除按钮
                 */
                "isShowDel": function() {
                    var _logo = that.moduleData.logourl;
                    if (_logo) {
                        return 'block';
                    } else {
                        return 'none';
                    }
                },
                /***
                 * 是否显示自定义招牌的图片
                 * @returns {*}
                 */
                isShowUserImg: function() {
                    if (backgUrl) {
                        return 'block';
                    } else {
                        return 'none';
                    }
                },
                /** 设置字号初始值 **/
                "setFontSize": function() {
                    return tool.setFontSize(companyName, 30, this);
                },
                /** 设置字体类型初始值 **/
                "setFontType": function() {
                    return tool.setFontType(companyName, "宋体", this);
                },
                /** 设置是否加粗初始值 **/
                "setFontBold": function() {
                    return tool.setFontBold(companyName);
                },
                /** 设置是否倾斜初始值 **/
                "setFontStyle": function() {
                    return tool.setFontStyle(companyName);
                },
                /** 设置默认招牌背景 **/
                "setDefaultSign": function() {
                    if (bjUrlCss == "") {
                        return 'curRadioBox';
                    }
                },
                "signSelectedHeight": function() {
                    if (this.val == signHeight) {
                        return 'curRadioBox';
                    }
                },
                /** 设置自定义招牌背景 **/
                "setUserSign": function() {
                    if (bjUrlCss != "") {
                        return 'curRadioBox';
                    }
                },
                /** 初始化默认背景和自定义的内容显示 **/
                "showUserSign": function() {
                    return function(text, render) {
                        if (render(text) == 'curRadioBox') {
                            return 'block';
                        } else {
                            return 'none';
                        }
                    };
                },
                /** 自定义招牌 显示自定义招牌图片 **/
                "signBjImg": function() {
                    return function(text, render) {
                        if (render(text) == 'curRadioBox') {
                            return bjUrlCss;
                        }
                    };
                }
            };
        /**
         * 创建弹层触发一个回调函数；
         */
        that.option.rendedCallback && that.option.rendedCallback.call(that);

        /**
         * 初始化公司招牌弹层
         */
        that.signDialog = dialog({
            content: mustache.render(date, configData),
            title: '编辑内容>公司招牌'
        }).showModal();

        /** 公司招牌弹框元素 **/
        that.sign = $(that.signDialog.node);

        /** 公司logo元素 **/
        that.logo = $('[node-name="companyLogo"]', that.sign);

        /** 公司名称元素 **/
        that.companyName = $('[node-name="companyName"]', that.sign);

        /**
         * [signHeight 招牌高度]
         * @type {[type]}
         */
        that.signHeight = $('[node-name="signHeight"]', that.sign);
        that.signHeightLimit = signHeight;

        /** 招牌背景元素 **/
        that.signList = $('[node-name="signList"]', that.sign);

        /** 绑定各种事件 **/
        that.bindEvent();

        /***
         * 点击颜色初始化colorjoe
         */
        tool.createColorpicker(that.companyName.find('[node-name="colorjoe"]'), companyName["color"], that.signDialog);

    },
    /***
     * 绑定事件
     */
    bindEvent: function() {
        var that = this;
        /***
         *  关闭弹层
         */
        that.sign.on('click', '.t-close,.Cancel', function() {
            that.signDialog.close().remove();
        });

        /***
         * 公司名称,加粗，斜体，点击切换
         */
        that.companyName.on('click', '.checkBox', function() {
            if ($(this).hasClass('curCheckBox')) {
                $(this).removeClass('curCheckBox');
            } else {
                $(this).addClass('curCheckBox');
            }
        });
        /***
         * 默认和自定义招牌切换
         */
        that.signList.on('click', '.radioCon', function() {
            var index = $(this).index();
            var _defaultSign = $('[node-name="defaultSign"]');
            var userSign = $('[node-name="userSign"]');
            if (!$(this).hasClass('curRadioBox')) {
                $(this).addClass('curRadioBox').siblings().removeClass('curRadioBox');
                if (index == 0) {
                    _defaultSign.show();
                    userSign.hide();
                } else if (index == 1) {
                    userSign.show();
                    _defaultSign.hide();
                }
            }
        });
        /**
         * [切换选中样式]
         */
        that.signHeight.on('click', '.radioCon', function() {
            var _this = $(this),
                _val = $(this).attr('data-val') || '';
            if (!_this.hasClass('curRadioBox')) {
                _this.addClass('curRadioBox').siblings().removeClass('curRadioBox');
                that.signList.find('.wrapSignHeight').text(_val);
            }

            /**自定义招牌展示区域**/
            var userSign = $('[node-name="userSign"]', that.signList),

                /**选择文件区域**/
                operateUserSign = userSign.find('.updown-file-box'),

                /**上传完成后图片标题；**/
                signBjTitle = operateUserSign.find('.txt');

            /**
             * 修改上传图高度上线
             */
            if (that.uploadEntity) {

                /**
                 * [若第一次选择的招牌高度导致上传文件失败，第二次选择正确的高度后，不用再选择文件，直接点击上传即可]
                 */
                var _files = that.uploadEntity.getFiles(),
                    _file_last = _files[_files.length - 1];
                if (_file_last && (_file_last.getStatus() === 'error') && _file_last.name === signBjTitle.text()) {
                    _file_last.setStatus('queued');
                }
                that.uploadEntity.options.formData['heightMaxLimit'] = _val;
            }
        });
        this.logoUpload();
        this.trademarkUpload();
        this.saveModuleData();
    },
    /***
     *  公司LOGO 上传，删除等操作
     */
    logoUpload: function() {
        var that = this,
            /** 上传图片展示区域 **/
            logoShow = $('.logo-box', that.logo),
            /** 选择文件区域 **/
            uploadLogo = $('.updown-file-box', that.logo),
            /** 上传按钮 **/
            upload = $('[node-name="upload"]', uploadLogo),
            /** 删除按钮 **/
            aDelBtn = $('.aDelBtn', that.logo),
            /** 撤销按钮 **/
            undo = $('[node-name="undo"]', uploadLogo),
            /** logo图片标题区域 **/
            logoTitle = $('.txt', uploadLogo),
            /** 默认logoTile **/
            defaultTilte = "未选择任何文件";
        /**
         * 删除logo
         */
        aDelBtn.click(function() {
            $('.com-logo', that.logo).find('p').html('');
            /***
             * 隐藏删除按钮
             */
            aDelBtn.hide();
        });
        /** 上传按钮切换到上传操作区域 **/
        $('.uploadBtn', that.logo).click(function() {
            logoShow.hide();
            uploadLogo.show();
        });
        /** 撤销上传 **/
        undo.click(function() {
            var _img = logoShow.show().find('.com-logo p img');
            /***
             * 修改默认标题
             */
            logoTitle.html(defaultTilte);
            /***
             * 隐藏选择文件区域
             */
            uploadLogo.hide();
            /***
             * 显示选择图片区域
             */
            logoShow.show();
            /***
             * 如果没有上传图片，隐藏删除按钮
             */
            if (_img.length == 0 || (!_img.attr('src'))) {
                aDelBtn.hide();
            }
            return false;
        });
        /****
         * 初始化上传组件
         */
        var webuploderObj = {
            // swf文件路径
            swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
            // 文件接收服务端。
            server: that.uploadUrl,
            // 选择文件的按钮。可选。
            pick: {
                id: '#logoUploadBtn',
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
            fileSingleSizeLimit: 200 * 1024, // 200 k
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
        tool.createWebuploder(webuploderObj, upload, logoTitle, defaultTilte, function(img) {
            /***
             * 修改成默认图片标题
             */
            logoTitle.html('未选择任何文件').end().hide();
            /***
             * 显示删除按钮
             */
            aDelBtn.show();
            /***
             * 更新logo
             */
            logoShow.show().find('.com-logo p').empty().append(img);
        });

    },
    /***
     *  招牌背景 上传，删除等操作
     */
    trademarkUpload: function() {
        var that = this,
            /**自定义招牌展示区域**/
            userSign = $('[node-name="userSign"]', that.signList),

            /**选择图片区域**/
            showUserSign = userSign.find('.updown-pic'),

            /**选择图片按钮**/
            selectImgBtn = showUserSign.find('.uploadBtn'),

            /**选择文件区域**/
            operateUserSign = userSign.find('.updown-file-box'),

            /** 自定义招牌显示区域**/
            customImg = userSign.find('[node-name="customImg"]'),

            /** 上传按钮**/
            upload = operateUserSign.find('[node-name="upload"]'),

            /**撤销按钮**/
            undo = operateUserSign.find('[node-name="undo"]'),

            /**上传完成后图片标题；**/
            signBjTitle = operateUserSign.find('.txt'),

            /****
             * 默认标题
             */
            defaultTilte = '未选择任何文件';
        /***
         * 选择图片
         */
        selectImgBtn.click(function() {
            showUserSign.hide();
            operateUserSign.show();
        });
        /** 撤销上传 **/
        undo.click(function() {
            var _img = customImg.find('[noda-name="imgShowWrap"] img');
            /***
             * 初始化默认标题
             */
            signBjTitle.html(defaultTilte);
            /** 隐藏选择文件区域 ***/
            operateUserSign.hide();

            /** 如果没有上传图片，或者图片的src==“”，隐藏自定义招牌图片显示区域 ***/
            if (_img.length == 0 || (!_img.attr('src'))) {
                customImg.hide();
            }

            /** 显示选择图片区域**/
            showUserSign.show();
            return false;
        });
        /****
         * 初始化上传组件
         */
        var webuploderObj = {
            // swf文件路径
            swf: 'http://style.org.hc360.cn/js/module/shop3.0/dist/components/webuploader/webuploader.swf',
            // 文件接收服务端。
            server: that.uploadUrl,
            // 选择文件的按钮。可选。
            pick: {
                id: '#signUploadBtn',
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
                heightMaxLimit: that.signHeightLimit
            },
            //设置文件上传域的name。
            fileVal: "file",
            //最多支持上传一个图片
            threads: 1,
            //限制单个文件大小
            fileSingleSizeLimit: 5 * 1024 * 1024, // 5 M
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,png',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
            },
            compress: false,
            duplicate: true, //是否可以上传重复文件，默认为undefined
            disableGlobalDnd: true
        };
        tool.createWebuploder(webuploderObj, upload, signBjTitle, defaultTilte, function(img) {
            /***
             * 修改选择文件区域的标题，隐藏选择文件区域
             */
            operateUserSign.find('.txt').html('未选择任何文件').end().hide();
            /***
             * 显示上传图片区域
             */
            showUserSign.show();
            /***
             * 更新图片
             */
            customImg.show().find('[noda-name="imgShowWrap"]').empty().append(img);
        }, function(uploadEntity) {
            that.uploadEntity = uploadEntity;
        });
    },

    /***
     * 保存弹框的数据
     */
    saveModuleData: function() {
        var that = this;
        that.sign.find('.Save').click(function() {
            var _src = that.logo.find('.com-logo img').attr('src'),
                _data = {
                    logourl: _src ? _src : "",
                    companyname: that.assemblyCompanyDate(),
                    backgroundurl: that.assemblySignBj(),
                    brandimage: pageEntity.template.BrandImage
                };

            //模块保存
            that.moduleEntity.update({
                data: _data
            }, function() {

                that.signDialog.close().remove();
            });

        });
    },
    /***
     * 根据弹框的设置。拼接companyname，返回拼接好的公司名称的设置字符串；
     * @returns {string}
     */
    assemblyCompanyDate: function() {
        var that = this;
        var checkBox = that.companyName.find('.checkBox');
        var companySite = {
            "display": checkBox.eq(0).hasClass("curCheckBox") ? "" : "none",
            "font-family": $('[name="wordType"] option:selected').html(),
            "font-size": $('[name="wordSize"] option:selected').html() + "px",
            "font-weight": checkBox.eq(1).hasClass("curCheckBox") ? "bold" : "normal",
            "font-style": checkBox.eq(2).hasClass("curCheckBox") ? "italic" : "normal",
            "color": that.companyName.find('[node-name="colorjoe"]').attr('data-color')
        };
        var companyString = "";
        for (var key in companySite) {
            companyString += key + ':' + companySite[key] + ';';
        }
        return companyString;
    },
    /****
     * 返回用户选择的招牌背景
     */
    assemblySignBj: function() {
        var _arr = [];
        var radioCon = this.signList.find('.radioBox .radioCon');
        // 默认招牌
        if (!radioCon.eq(0).hasClass('curRadioBox')) {
            // 自定义
            var _src = this.signList.find('[node-name="userSign"] .signBg-pic img').attr('src');
            if (_src != "") {
                _arr.push('background:url(' + _src + ') no-repeat center center');
            }
        }

        /**
         * 招牌高度
         */
        var _radioSignHeight = this.signHeight.find('.curRadioBox').first();
        if (_radioSignHeight.length) {
            _arr.push('height:' + _radioSignHeight.attr('data-val') + 'px;');
        }

        /**
         * 返回解析后的样式字符串
         */
        return _arr.join(';');
    },
    loadComponents: function() {
        var mustacheDef = $.Deferred();
        require.ensure([], function(require) {
            require('mustache');
            mustacheDef.resolve();
        }, 'components/mustache/mustache');

        /**
         * [imgLiquidDeferred 创建加载 imgLiquid 延迟对象]
         * @type {Object}
         */
        var imgLiquidDeferred = $.Deferred();
        require.ensure([], function(require) {
            require('jquery_imgLiquid');
            imgLiquidDeferred.resolve();
        }, 'components/jquery_imgLiquid');

        return [mustacheDef, imgLiquidDeferred];
    }

};
module.exports = signature;