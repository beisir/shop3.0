webpackJsonp([38],[function(e,t,n){function a(e,t,n,a){this._point=e,this._text=t,this._overText=n,this.provinceId=a}var o=n(116),i=new o;window.pageEntity=i;var s=0,l=1;!function(e){e(function(){var t={province:"//detail.b2b.hc360.com/detail/turbine/template/fxb,initprovice.html",agent:"//detail.b2b.hc360.com/detail/turbine/template/fxb,getdealersells.html"},n=[],o=["\u5317\u4eac","\u4e0a\u6d77","\u5929\u6d25","\u91cd\u5e86"],i=8,p=["\u5185\u8499\u53e4","\u65b0\u7586","\u897f\u85cf","\u5e7f\u897f","\u5b81\u590f","\u5317\u4eac","\u4e0a\u6d77","\u5929\u6d25","\u91cd\u5e86"];e.agentMap={map:"",subMap:"",init:function(){var n=this;n.map=new BMap.Map("containerMap",{enableMapClick:!1}),n.map.centerAndZoom("\u9655\u897f",5),n.map.disableDoubleClickZoom(),n.map.enableAutoResize(),n.map.clearOverlays(),e.ajax({url:t.province,data:{username:username},timeout:5e3,scriptCharset:"utf-8",dataType:"jsonp",jsonp:"jsoncallback",success:function(e){if("1"===e.success)for(var t=e.dataList,o=0;o<t.length;o++){var i=t[o],s=decodeURIComponent(i.name),l="<h2>"+s+"\u6709<span>"+i.agentCount+"</span>\u5bb6\u7ecf\u9500\u5546</h2>",p=new BMap.Point(i.x,i.y),r=new a(p,s,l,i.id);n.map.addOverlay(r)}}}),n.handle(),e(".callbkmaps").hide()},showProvinceMap:function(t,n,a){var s=this;s.subMap=new BMap.Map("containerMap",{enableMapClick:!1}),s.subMap.disableDoubleClickZoom(),s.subMap.clearOverlays(),e(".callbkmaps").show(),i=8,flag=!0;for(var l=0;l<o.length;l++)if(n===o[l]){i=11;break}for(var r=0;r<p.length;r++)n===p[r]&&(flag=!1);flag&&(n+="\u7701"),s.subMap.centerAndZoom(t,i),s.subMap.clearOverlays(),s.setMarker(a),s.getBoundary(t,n)},getBoundary:function(e,t){var n=this;n.subMap.centerAndZoom(e,i);var a=new BMap.Boundary;a.get(t,function(e){for(var t=e.boundaries.length,a=0;a<t;a++){var o=new BMap.Polygon(e.boundaries[a],{strokeWeight:3,strokeColor:"#ff0000",fillColor:""});n.subMap.addOverlay(o)}})},setMarker:function(n){var a=this,o={provinceId:n,username:username};e.ajax({url:t.province,data:o,timeout:5e3,scriptCharset:"utf-8",dataType:"jsonp",jsonp:"jsoncallback",success:function(e){if("1"===e.success)for(var t=e.dataList,n=0;n<t.length;n++){var o=t[n],i=(decodeURIComponent(o.name),new BMap.Point(o.x,o.y)),l=new BMap.Marker(i);l.id=o.id,a.subMap.addOverlay(l),l.setAnimation(BMAP_ANIMATION_BOUNCE),l.addEventListener("click",function(e){s=0;var t=e.target;e.point;a.getAgentById(t.id,function(t){a.openInfo(t,e,a.subMap)})})}}})},openInfo:function(e,t,n){var a={width:280,height:193,title:"",enableMessage:!0},o=t.target,i=new BMap.Point(o.getPosition().lng,o.getPosition().lat),s=new BMap.InfoWindow(e,a);n.openInfoWindow(s,i)},getAgentById:function(a,o){var i=this,s={cityId:a,username:username};n[a]?i.showAgent(n[a],o):e.ajax({url:t.agent,data:s,timeout:5e3,scriptCharset:"utf-8",dataType:"jsonp",jsonp:"jsoncallback",success:function(e){if(e&&"1"===e.success){var t=e.dataList;i.showAgent(t,o),n[a]=t}}})},showAgent:function(e,t){var n=e;l=n.length;var a=new Array;a.push("  <div class='itemfloor'> "),a.push("  <h2>\u8be5\u5730\u533a\u6709<span>"+n.length+"</span>\u5bb6\u7ecf\u9500\u5546</h2> "),a.push("  <div class='iteminfo'><ul>");for(var o=0;o<n.length;o++){var i=n[o],s=i.nameType?"\u516c\u53f8\u540d\u79f0":"\u5546\u94fa\u540d\u79f0";a.push("  <li> <p class='itemtt'><span>"+s+"\uff1a</span><em><a href='//"+i.sellname+".b2b.hc360.com' target='_blank' title='"+decodeURIComponent(i.name)+"'>"+decodeURIComponent(i.name)+"</a></em></p> "),a.push("  <p class='itemtt'><span>\u8054\u7cfb\u7535\u8bdd\uff1a</span><em>"+i.telephone+"</em></p> "),a.push("  <p class='itemtt'><span>\u5730\u5740\uff1a</span><em title='"+i.address+"'>"+i.address+"</em></p></li> ")}a.push("  </ul></div> "),1===l?a.push("  <div class='floorBtn' style='display:none;'><button>\u6362\u4e00\u5bb6</button></div></div> "):a.push("  <div class='floorBtn'><button onclick='changeAgent(this)'>\u6362\u4e00\u5bb6</button></div></div> "),n.length>0&&t(a.join(""))},handle:function(){var t=e("body");t.undelegate(".itemfloor","dblclick"),t.delegate(".itemfloor","dblclick",function(e){return!1}),t.undelegate(".callbkmaps","click"),t.delegate(".callbkmaps","click",function(){e.agentMap.init()})}},e.agentMap.init()})}(jQuery),a.prototype=new BMap.Overlay,a.prototype.initialize=function(e){var t=this;this._map=e;var n=this._div=document.createElement("div");n.style.position="absolute",n.style.zIndex=BMap.Overlay.getZIndex(this._point.lat),n.style.backgroundColor="#EE5D5B",n.style.border="1px solid #BC3B3A",n.style.color="white",n.style.height="18px",n.style.padding="2px",n.style.lineHeight="18px",n.style.whiteSpace="nowrap",n.style.MozUserSelect="none",n.style.fontSize="12px",n.id=this.provinceId;var a=this._span=document.createElement("span");n.appendChild(a),a.appendChild(document.createTextNode(this._text));var o=this,i=this._arrow=document.createElement("div");i.style.background="url(//map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat",i.style.position="absolute",i.style.width="11px",i.style.height="10px",i.style.top="22px",i.style.left="10px",i.style.overflow="hidden",n.appendChild(i);var s=this._over=document.createElement("div");return s.className="probussnumb",s.id="province"+this.provinceId,s.innerHTML=this._overText,n.appendChild(s),n.onmouseover=function(){var e="province"+o.provinceId,t=document.getElementById(e);t.style.display="block"},n.onmouseout=function(){var e="province"+o.provinceId,t=document.getElementById(e);t.style.display="none"},n.onclick=function(e){$.agentMap.showProvinceMap(t._point,t._text,t.provinceId)},e.getPanes().labelPane.appendChild(n),n},a.prototype.draw=function(){var e=this._map,t=e.pointToOverlayPixel(this._point);this._div.style.left=t.x-parseInt(this._arrow.style.left)+"px",this._div.style.top=t.y-30+"px"}}]);