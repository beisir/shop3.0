webpackJsonp([22],{107:function(t,e){function i(t){var e=this;$.extend(e,{index:0,wrap:null,pause:3e3,auto:!0,timer:null,animationSpeed:1e3},t),i.prototype.init.call(this)}i.prototype.init=function(){var t=this;t.height=t.wrap.height(),t.slidersWrap=t.wrap.children("ul"),t.sliders=t.slidersWrap.children("li"),t.slidersWrap.css({height:t.sliders.length*t.height+"px",position:"absolute",width:"100%"}),t.sliders.css({height:t.height+"px"}),t.auto&&(t.timer=setInterval(function(){t.next()},t.pause))},i.prototype.animate=function(){var t=this;t.slidersWrap.stop().animate({top:-(t.height*t.index)},t.animationSpeed)},i.prototype.next=function(){var t=this;t.index++,t.index=t.index===t.sliders.length?0:t.index,t.animate()},i.prototype.prev=function(){var t=this;t.index--,t.index=t.index<0?t.sliders.length-1:t.index,t.animate()},i.prototype["goto"]=function(t){var e=this;e.index=t,e.animate()},i.prototype.stop=function(){var t=this;window.clearInterval(t.timer)},i.prototype.start=function(){var t=this;t.auto&&(t.timer=setInterval(function(){t.next()},t.pause))},t.exports=i}});