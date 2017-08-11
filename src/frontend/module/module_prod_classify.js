/**
 * Created by 姜艳云 on 2016/10/31.
 * [ 产品分类 ]
 */
productCate=function(moduleEntity){
    /***
     * 所在区域标识  百分之二十五或者七十五
     */
    this.regionmark=moduleEntity.dataEntity.regionmark;
    /***
     * 当前模块的html
     * @type {*|jQuery|HTMLElement}
     */
    this.proCateBox=$(moduleEntity.htmlEntity);
    /***
     * 如果是百分之二十五区域，加载js折叠类目效果
     */
    if(this.regionmark=="region_percent_25"){
        this.initEffect();
    }
};
productCate.prototype={
    initEffect:function(){
        var that=this,
            _ul=this.proCateBox.find('.leftBoxCon ul');
        _ul.find('li h4').click(function(event){
             var html = "",
                 me=$(this);
            $.when(that.showNextSeries(me)).done(function(data){
                if(data != undefined){
                    for(var i =0;i<data.length;i++){
                        html+='<dd><a href="'+data[i].seriesUrl+'" title="'+data[i].seriesName+'" target="_blank" onmousedown=return hcclick(\'?hcdetail_enterpriselog=classification_pic\') >'+data[i].seriesName+'</a></dd>';

                    }
                    me.next('dl').html(html);
                }
                if(me.hasClass('classShow')){
                    me.removeClass('classShow').addClass('classHide');
                    me.next('dl').hide();
                }else{
                    me.removeClass('classHide').addClass('classShow');
                    me.next('dl').show();
                }
            });
        });
    },
    /***
     * 获取所有分类列表
     * @param _h4
     * @returns {*}
     */
    showNextSeries:function(_h4){
        var wrap=_h4.next('dl'),
            deff= $.Deferred(),
            paramData=JSON.parse(_h4.attr('data-category'));
        if(wrap.html() == ""){
           return $.ajax({
               url:"http://detail.b2b.hc360.com/detail/turbine/action/ajax.ProSeriesAjaxAction/eventsubmit_doloadsubproseries/doLoadsubproseries",
               dataType:'jsonp',
               jsonp:'callback',
               data:paramData
           });
        }else{
            deff.resolve();
           return deff;
        }
    }
};

module.exports=productCate;