webpackJsonp([16],{0:function(t,a,i){var n=i(1),e=i(95),s=new n;window.pageEntity=s;new e(s)},95:function(t,a,i){function n(t){var a=this,e=i(49),s=new e;a.region_module_mapping_data=s.analyticPageModuleData(t),a.pageEntity=t,n.prototype.init.call(a)}n.prototype.init=function(){var t=this,a=0,i=['<div class="guideBox">','    <div class="step1" data-index="1" data-position="action-guider-start">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>',"    </div>",'    <div class="step2" data-index="2" data-position="action-select-layout">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>',"    </div>",'    <div class="step3" data-index="3" data-position="action-select-template">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step4" data-index="4" data-position="action-select-navigation">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step5" data-index="5" data-position="module_setting">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step6" data-index="6" data-position="module_ads">','\t\t<a href="javascript:;" class="sClose"></a>','\t\t<a href="javascript:;" class="sBtn"></a>','\t\t<a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step7" data-index="7" data-position="region_top_banner">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step8" data-index="8" data-position="action-select-theme">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step9" data-index="9" data-position="action-preview-backup-recovery">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>",'    <div class="step10" data-index="10" data-position="action-release">','        <a href="javascript:;" class="sClose"></a>','        <a href="javascript:;" class="sBtn"></a>','        <a href="javascript:;" class="ReturnBtn"></a>',"    </div>","</div>"];try{a=parseInt(HC.util.cookie.get("shop3.0.guider"))||0}catch(n){}if(!a){t.dialogEntity=dialog({innerHTML:i.join(""),autofocus:!1}).showModal(),t.dialogEntity.htmlEntity=$(t.dialogEntity.node).css({left:"auto",top:"auto",position:"static"});var e={region_top_banner:null,module_ads:null,module_setting:null},s=function(){for(var t in e)if(!e[t])return!1;return!0};$.each(t.pageEntity.regionList,function(a,i){return!s()&&($.each(t.region_module_mapping_data[i.identifier],function(t,a){if(!e.region_top_banner&&"module_banner_ads"===a.identifier&&a.enabled)return e.region_top_banner=i,!1}),!s()&&($.each(i.moduleList,function(t,a){if(e.module_ads||"module_ads"!==a.identifier||(e.module_ads=a),"region_percent_75"===i.identifier&&a.dragable&&a.configurable&&a.deletable&&0!==t&&!e.module_setting&&(e.module_setting=a),s())return!1}),!s()&&void 0))}),t.htmlEntityList=t.dialogEntity.htmlEntity.find(".guideBox").children().map(function(t,a){var i=$(a),n=(parseInt(i.attr("data-index"))||0,i.attr("data-position")||"");if(!(n in e)||e[n])return i.data({index:parseInt(i.attr("data-index"))||0,position:i.attr("data-position")||""})}).sort(function(t,a){return t.data("index")-a.data("index")}),t.resetPositionCallback={"action-select-layout":function(a){$(window).scrollTop(0),t.dialogEntity.htmlEntity.css({top:0})},"action-select-template":function(t){$(window).scrollTop(0)},"action-select-navigation":function(t){$(window).scrollTop(0)},module_setting:function(a){var i=e.module_setting,n=163;2===parseInt(t.pageEntity.layout)&&(n=-55),a.css({top:i.htmlEntity.offset().top+4,marginLeft:n});var s=$(window).height(),o=i.htmlEntity.offset().top;$(window).scrollTop(o-s/2+a.height())},module_ads:function(t){var a=e.module_ads;t.css({top:a.htmlEntity.offset().top+a.htmlEntity.height()});var i=$(window).height(),n=a.htmlEntity.offset().top;$(window).scrollTop(n+t.height()+a.htmlEntity.height()-i)},region_top_banner:function(t){var a=e.region_top_banner;t.css({top:a.htmlEntity.btnAppendModule.offset().top+a.htmlEntity.btnAppendModule.height()-176});var i=$(window).height(),n=a.htmlEntity.btnAppendModule.offset().top;$(window).scrollTop(n-i/2+t.height())},"action-select-theme":function(t){$(window).scrollTop(0)},"action-preview-backup-recovery":function(t){$(window).scrollTop(0)},"action-release":function(t){$(window).scrollTop(0)}},t.bindEvent(),t.index=0,t.start();try{HC.util.cookie.set("shop3.0.guider",1,{expires:7,path:"/"})}catch(n){}}},n.prototype.bindEvent=function(){var t=this;t.dialogEntity.htmlEntity.find(".sClose").click(function(a){t.dialogEntity.remove()}).end().find(".sBtn").click(function(a){t.next()}).end().find(".ReturnBtn").click(function(a){t.prev()})},n.prototype.start=function(){var t=this;if(t.index>=t.htmlEntityList.length)return void t.dialogEntity.remove();var a=t.htmlEntityList[t.index].show(),i=t.resetPositionCallback[a.data("position")];i&&i.call(t,a)},n.prototype.prev=function(){var t=this;t.htmlEntityList[t.index].hide(),t.index=--t.index<1?1:t.index,t.start()},n.prototype.next=function(){var t=this;t.htmlEntityList[t.index].hide(),t.index=++t.index>t.htmlEntityList.length?t.htmlEntityList.length:t.index,t.start()},t.exports=n}});