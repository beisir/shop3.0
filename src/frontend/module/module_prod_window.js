/**
 * Created by 姜艳云 on 2016/11/1.
 * [产品橱窗] 百分之七十五区域有页面效果
 */
productWin=function(moduleEntity){
    /***
     * 所在区域标识  百分之二十五或者七十五
     */
    this.regionmark = moduleEntity.dataEntity.regionmark;
    /***
     * 当前模块
     * @type {*|jQuery|HTMLElement}
     */
    this.productWinBox = $(moduleEntity.htmlEntity);

    if(this.regionmark=="region_percent_75"){

        this.initRephael();
    }
};

productWin.prototype={
    initRephael:function(){
       var proUl=this.productWinBox.find('[data-node-name="proWin"]');
        /***
         * 默认隐藏图片遮罩
         */
        proUl.find('li .proImgBg1').hide();
        /***
         * 鼠标指上去，显示遮罩层和title
         */
        proUl.find('li').hover(function(){
            $(this).find(".proImgBg1").stop().fadeTo(500,0.4);
            $(this).find(".proImgAlertCon").stop().animate({left:'0'}, {duration: 500});
        },function(){
            /***
             * 鼠标指上去，隐藏遮罩层和并且将title定位成-160px
             */
            $(this).find(".proImgBg1").stop().fadeTo(500,0);
            $(this).find(".proImgAlertCon").stop().animate({left:'160px'}, {duration: "fast"});
            $(this).find(".proImgAlertCon").animate({left:'-160px'}, {duration: 0});
        });
    }
};

module.exports=productWin;