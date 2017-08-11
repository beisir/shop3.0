/**
 * Created by StarLikeRain on 28/09/2016.
 * [友情链接]
 */
var firendship = function(settions, html, options) {
    var _this = this;
    _this.module = settions;
    _this.moduleBox = settions.htmlEntity; //模块对象
    _this.moduleData = settions.dataEntity; //模块配置数据
    _this.editDialog = dialog({
        content: html,
        title:'编辑内容>友情链接'
    }).showModal(); //弹框显示
    _this.options = options || {};
    _this.options.rendedCallback && _this.options.rendedCallback.call(_this);
    _this.closeAndCancelDialogBtn = $(_this.editDialog.node).find(".t-close,.Cancel"); //关闭、取消按钮
    _this.saveDialogBtn = $(_this.editDialog.node).find(".Save"); //弹框的保存按钮
    _this.showTitleAndBorderRadio = $(_this.editDialog.node).find("#titleAndBorder"); //板块标题栏和边栏是否选中
    _this.titleInput = $(_this.editDialog.node).find("input[name='title']"); //标题文本框
    //初始化数据
    _this.initModuleData();
    //操作数据
    _this.operateModuleData();
};
firendship.prototype = {

    /**
     * 初始化数据
     */
    initModuleData: function() {
        var _t = this;
        _t.titleInput.val(_t.moduleData.data.title);
        var showTitleAndBorder = parseInt(_t.moduleData.data.showTitleAndBorder) || 0;
        if (showTitleAndBorder) {
            _t.showTitleAndBorderRadio.addClass('curChosen');
        }else{
            _t.showTitleAndBorderRadio.removeClass('curChosen');
        }
    },

    /**
     * 操作数据
     */
    operateModuleData: function() {
        var _t = this;
        //关闭、取消弹框
        _t.closeAndCancelDialogBtn.on('click', function() {
            _t.editDialog.close().remove();
        });
        //板块标题栏和边栏是否选中
        _t.showTitleAndBorderRadio.on('click', function() {
            $(this).toggleClass("curChosen");
            // $(this).hasClass("curChosen") ? $(this).removeClass("curChosen") : $(this).addClass("curChosen");
        });
        //弹框的保存
        _t.saveDialogBtn.on('click', function() {
            var title = $.trim(_t.titleInput.val());
            var isshow = _t.showTitleAndBorderRadio.hasClass("curChosen") ? 1:0;
            if (title.length === 0) {
                dialog({
                    title: '提示',
                    content: '标题不能为空！',
                    okValue: '确定',
                    ok: function() {
                        this.close().remove();
                    }
                }).showModal();
                return false;
            }
            var updateParam = {
                'operatetype': 2, //操作类型，1：新增模块，2：编辑模块
                'operatedata': { //操作内容
                    'providerid': pageEntity.providerid, //商铺编号
                    'username': pageEntity.username, //商铺用户名
                    'data': {
                        //'title': encodeURIComponent(title),
                        'title': title,
                        'showTitleAndBorder': isshow
                    } //模块配置数据
                }
            };
            updateParam.operatedata = $.extend(_t.moduleData, updateParam.operatedata);

            _t.module.update({data:updateParam.data},function(){

                _t.editDialog.close().remove();

            });

        });

    }
};

module.exports = firendship;
