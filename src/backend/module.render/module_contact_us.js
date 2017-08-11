/**
 * Created by 姜艳云 on 2016/11/21.
 * [module_contact_us 联系我们所见即所得渲染逻辑]
 */
function module_contact_us() {
}

module_contact_us.prototype = {
    /***
     * 初始化联系我们里面的qq和微信
     */
    initQQFFMod:function(){
        var bcid=(window.scyps&&window.scyps.sc&&window.scyps.sc.id)&&"";
        $.ajax({
            url:"/detail/turbine/template/saleser,qqser.html?jsoncallback=?",
            data:{
                providerId: window.providerId
            },
            dataType: "jsonp",
            success:function(result){
                var qqlist=result.listQQ,
                    qqHtml="";
                if(qqlist.length>0){
                    var item=qqlist[0];
                    qqHtml='<a href="http://wpa.qq.com/msgrd?v=3&uin='+item.qq+'&site=qq&menu=yes" target="_blank" onclick="window.qqAction();" class="leftqqIco" onmousedown="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_qq_float_1?detailuserid='+window.providerId+'&quot;)" /></a>';
                }
                qqHtml+='<a href="" class="awxIco" data-bcid="'+bcid+'" onmousedone="HC.UBA.sendUserlogsElement(&quot;UserBehavior_detail_fafa_float_1?detailuserid='+window.providerId+'&quot;)" ><img data-query="weixin" src="http://style.org.hc360.com/images/detail/mysite/siteconfig/new_product/newImg/wxIco2.png" /></a>';
                $('[data-node-name="companyServiceMod"]').html(qqHtml);
            }
        });
    },
    /**
     * [render 渲染函数]
     * @return {[type]} [description]
     */
    render: function() {
        this.initQQFFMod();
    }

};


module.exports = module_contact_us;