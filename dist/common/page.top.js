!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="http://style.org.hc360.cn/js/module/shop3.0/dist/",t(0)}({0:function(e,t,n){!function(e,t){if(!e.HC){var o={startTime:e.performance?performance.timing.navigationStart:+new Date,env:"",util:{cookie:n(108),uuid:n(110),ua:n(111),isPageInFrame:function(){var t,n;try{t=e.top.location.href}catch(o){return n=2}return n=t?t===e.location.href?0:1:2},ready:n(112),addEventListener:t.addEventListener?function(e,t,n,o){e.addEventListener(t,n,o)}:function(e,t,n,o){e.attachEvent("on"+t,n)},removeEventListener:t.removeEventListener?function(e,t,n,o){e.removeEventListener(t,n,o)}:function(e,t,n,o){e.detachEvent("on"+t,n)},addCss:function(e,n){if(e){var o=t.createElement("link");o.href=e,o.type="text/css",o.rel="stylesheet",o.readyState?o.onreadystatechange=function(){"loaded"!=o.readyState&&"complete"!=o.readyState||(o.onreadystatechange=null,n&&n())}:o.onload=function(){n&&n()},t.getElementsByTagName("head")[0].appendChild(o)}},addScript:function(e,n){if(e){var o=t.createElement("script");o.readyState?o.onreadystatechange=function(){"loaded"!=o.readyState&&"complete"!=o.readyState||(o.onreadystatechange=null,n&&n())}:o.onload=function(){n&&n()},o.type="text/javascript",o.src=e,o.setAttribute("charset","utf-8"),t.getElementsByTagName("head")[0].appendChild(o)}}}};o.UUID=o.util.uuid,o.HUB={LocalCookie:{set:function(e){o.util.cookie.set(e.key,e.value,{expires:e.day,domain:e.domain,path:e.path})},get:o.util.cookie.get,remove:o.util.cookie.remove},addEvent:function(e,t,n){o.util.addEventListener(e,n,t,!1)},addCss:o.util.addCss,addScript:o.util.addScript},o.W=n(113);var i=o.util.cookie.get("hc360visitid");if(!i){var r=new Date;o.util.cookie.set("visitid_time",r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate()+" "+r.getHours()+":"+r.getMinutes()+":"+r.getSeconds(),{expires:3650,path:"/",domain:"hc360.com"});var a=(new o.util.uuid).createUUID();o.util.cookie.set("hc360visitid",a,{expires:3650,path:"/",domain:"hc360.com"})}var s=o.util.cookie.get("hc360first_time");if(!s){var r=new Date;o.util.cookie.set("hc360first_time",r.getFullYear()+"-"+("0"+(r.getMonth()+1)).slice(-2)+"-"+("0"+r.getDate()).slice(-2),{expires:3650,path:"/",domain:"hc360.com"})}o.util.cookie.get("hcbrowserid");if(!s){var a=(new o.util.uuid).createUUID();o.util.cookie.set("hcbrowserid",a,{expires:3650,path:"/",domain:"hc360.com"})}o.env=o.util.ua.parseUA(),e.HC=o}}(window,document)},14:function(e,t){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function r(e){if(d===clearTimeout)return clearTimeout(e);if((d===o||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function a(){p&&h&&(p=!1,h.length?m=h.concat(m):g=-1,m.length&&s())}function s(){if(!p){var e=i(a);p=!0;for(var t=m.length;t;){for(h=m,m=[];++g<t;)h&&h[g].run();g=-1,t=m.length}h=null,p=!1,r(e)}}function c(e,t){this.fun=e,this.array=t}function u(){}var l,d,f=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{d="function"==typeof clearTimeout?clearTimeout:o}catch(e){d=o}}();var h,m=[],p=!1,g=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||p||i(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.prependListener=u,f.prependOnceListener=u,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},108:function(e,t,n){(function(t){e.exports=t.Cookies=n(109)}).call(t,function(){return this}())},109:function(e,t,n){var o,i;!function(r){var a=!1;if(o=r,i="function"==typeof o?o.call(t,n,t,e):o,!(void 0!==i&&(e.exports=i)),a=!0,e.exports=r(),a=!0,!a){var s=window.Cookies,c=window.Cookies=r();c.noConflict=function(){return window.Cookies=s,c}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(n){function o(t,i,r){var a;if("undefined"!=typeof document){if(arguments.length>1){if(r=e({path:"/"},o.defaults,r),"number"==typeof r.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*r.expires),r.expires=s}try{a=JSON.stringify(i),/^[\{\[]/.test(a)&&(i=a)}catch(c){}return i=n.write?n.write(i,t):encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",i,r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("")}t||(a={});for(var u=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,d=0;d<u.length;d++){var f=u[d].split("="),h=f.slice(1).join("=");'"'===h.charAt(0)&&(h=h.slice(1,-1));try{var m=f[0].replace(l,decodeURIComponent);if(h=n.read?n.read(h,m):n(h,m)||h.replace(l,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch(c){}if(t===m){a=h;break}t||(a[m]=h)}catch(c){}}return a}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}return t(function(){})})},110:function(e,t){function n(){this.id=this.createUUID()}n.prototype.valueOf=function(){return this.id},n.prototype.toString=function(){return this.id},n.prototype.createUUID=function(){var e=new Date(1582,10,15,0,0,0,0),t=new Date,o=t.getTime()-e.getTime(),i="",r=n.getIntegerBits(o,0,31),a=n.getIntegerBits(o,32,47),s=n.getIntegerBits(o,48,59)+"1",c=n.getIntegerBits(n.rand(4095),0,7),u=n.getIntegerBits(n.rand(4095),0,7),l=n.getIntegerBits(n.rand(8191),0,7)+n.getIntegerBits(n.rand(8191),8,15)+n.getIntegerBits(n.rand(8191),0,7)+n.getIntegerBits(n.rand(8191),8,15)+n.getIntegerBits(n.rand(8191),0,15);return r+i+a+i+s+i+c+u+i+l},n.getIntegerBits=function(e,t,o){var i=n.returnBase(e,16),r=new Array,a="",s=0;for(s=0;s<i.length;s++)r.push(i.substring(s,s+1));for(s=Math.floor(t/4);s<=Math.floor(o/4);s++)a+=r[s]&&""!=r[s]?r[s]:"0";return a},n.returnBase=function(e,t){var n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if(e<t)var o=n[e];else{var i=""+Math.floor(e/t),r=e-i*t;if(i>=t)var o=this.returnBase(i,t)+n[r];else var o=n[i]+n[r]}return o},n.rand=function(e){return Math.floor(Math.random()*e)},e.exports=n},111:function(e,t,n){(function(t){e.exports={compareVersions:function(e,t){var n,o,i,r,a,s;if(e===t)return 0;for(o=(e+"").split("."),r=(t+"").split("."),a=0,s=Math.max(o.length,r.length);a<s;++a){if(n=parseInt(o[a],10),i=parseInt(r[a],10),isNaN(n)&&(n=0),isNaN(i)&&(i=0),n<i)return-1;if(n>i)return 1}return 0},parseUA:function(e){var n,o=function(e){var t=0;return parseFloat(e.replace(/\./g,function(){return 1===t++?"":"."}))},i=window,r=i&&i.navigator,a={ie:0,opera:0,gecko:0,webkit:0,safari:0,chrome:0,mobile:null,air:0,phantomjs:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,silk:0,ubuntu:0,accel:!1,webos:0,caja:r&&r.cajaVersion,secure:!1,os:null,nodejs:0,winjs:!("undefined"==typeof Windows||!Windows.System),touchEnabled:!1},s=e||r&&r.userAgent,c=i&&i.location,u=c&&c.href;return a.userAgent=s,a.secure=u&&0===u.toLowerCase().indexOf("https"),s&&(/windows|win32/i.test(s)?a.os="windows":/macintosh|mac_powerpc/i.test(s)?a.os="macintosh":/android/i.test(s)?a.os="android":/symbos/i.test(s)?a.os="symbos":/linux/i.test(s)?a.os="linux":/rhino/i.test(s)&&(a.os="rhino"),/KHTML/.test(s)&&(a.webkit=1),/IEMobile|XBLWP7/.test(s)&&(a.mobile="windows"),/Fennec/.test(s)&&(a.mobile="gecko"),n=s.match(/AppleWebKit\/([^\s]*)/),n&&n[1]&&(a.webkit=o(n[1]),a.safari=a.webkit,/PhantomJS/.test(s)&&(n=s.match(/PhantomJS\/([^\s]*)/),n&&n[1]&&(a.phantomjs=o(n[1]))),/ Mobile\//.test(s)||/iPad|iPod|iPhone/.test(s)?(a.mobile="Apple",n=s.match(/OS ([^\s]*)/),n&&n[1]&&(n=o(n[1].replace("_","."))),a.ios=n,a.os="ios",a.ipad=a.ipod=a.iphone=0,n=s.match(/iPad|iPod|iPhone/),n&&n[0]&&(a[n[0].toLowerCase()]=a.ios)):(n=s.match(/NokiaN[^\/]*|webOS\/\d\.\d/),n&&(a.mobile=n[0]),/webOS/.test(s)&&(a.mobile="WebOS",n=s.match(/webOS\/([^\s]*);/),n&&n[1]&&(a.webos=o(n[1]))),/ Android/.test(s)&&(a.mobile="Android",n=s.match(/Android ([^\s]*);/),n&&n[1]&&(a.android=o(n[1]))),/Silk/.test(s)&&(n=s.match(/Silk\/([^\s]*)/),n&&n[1]&&(a.silk=o(n[1])),a.android||(a.android=2.34,a.os="Android"),/Accelerated=true/.test(s)&&(a.accel=!0))),n=s.match(/OPR\/(\d+\.\d+)/),n&&n[1]?a.opera=o(n[1]):(n=s.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/),n&&n[1]&&n[2]?(a.chrome=o(n[2]),a.safari=0,"CrMo"===n[1]&&(a.mobile="chrome")):(n=s.match(/AdobeAIR\/([^\s]*)/),n&&(a.air=n[0])))),n=s.match(/Ubuntu\ (\d+\.\d+)/),n&&n[1]&&(a.os="linux",a.ubuntu=o(n[1]),n=s.match(/\ WebKit\/([^\s]*)/),n&&n[1]&&(a.webkit=o(n[1])),n=s.match(/\ Chromium\/([^\s]*)/),n&&n[1]&&(a.chrome=o(n[1])),/ Mobile$/.test(s)&&(a.mobile="Ubuntu")),a.webkit||(/Opera/.test(s)?(n=s.match(/Opera[\s\/]([^\s]*)/),n&&n[1]&&(a.opera=o(n[1])),n=s.match(/Version\/([^\s]*)/),n&&n[1]&&(a.opera=o(n[1])),/Opera Mobi/.test(s)&&(a.mobile="opera",n=s.replace("Opera Mobi","").match(/Opera ([^\s]*)/),n&&n[1]&&(a.opera=o(n[1]))),n=s.match(/Opera Mini[^;]*/),n&&(a.mobile=n[0])):(n=s.match(/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/),n&&(n[1]||n[2])?a.ie=o(n[1]||n[2]):(n=s.match(/Gecko\/([^\s]*)/),n&&(a.gecko=1,n=s.match(/rv:([^\s\)]*)/),n&&n[1]&&(a.gecko=o(n[1]),/Mobile|Tablet/.test(s)&&(a.mobile="ffos"))))))),!i||!r||a.chrome&&a.chrome<6||(a.touchEnabled="ontouchstart"in i||"msMaxTouchPoints"in r&&r.msMaxTouchPoints>0),e||"object"==typeof t&&t.versions&&t.versions.node&&(a.os=t.platform,a.nodejs=o(t.versions.node)),a}}}).call(t,n(14))},112:function(e,t,n){!function(t,n){e.exports=n()}("domready",function(e){function t(e){for(h=1;e=o.shift();)e()}var n,o=[],i=!1,r=document,a=r.documentElement,s=a.doScroll,c="DOMContentLoaded",u="addEventListener",l="onreadystatechange",d="readyState",f=s?/^loaded|^c/:/^loaded|c/,h=f.test(r[d]);return r[u]&&r[u](c,n=function(){r.removeEventListener(c,n,i),t()},i),s&&r.attachEvent(l,n=function(){/^c/.test(r[d])&&(r.detachEvent(l,n),t())}),e=s?function(t){self!=top?h?t():o.push(t):function(){try{a.doScroll("left")}catch(n){return setTimeout(function(){e(t)},50)}t()}()}:function(e){h?e():o.push(e)}})},113:function(module,exports){var loadDict={},taskQueue={},linkDict={},LOADER_URL="//style.org.hc360.cn/js/build/source/widgets/loader/",Loader=function(e,t){this.init.call(this,e,t)};Loader.prototype={init:function(e,t){for(var n=this,o=document.getElementsByTagName("link"),i=0,r=o.length;i<r;i++)linkDict[o[i].href]=1;HC.W[e+"Urls"]?n.loadUrls(0,HC.W[e+"Urls"],t):loadDict[e]?n.addTaskQueue(e,function(){n.loadUrls(0,HC.W[e+"Urls"],t)}):(loadDict[e]=1,HC.HUB.addScript(LOADER_URL+"hc."+e+".urls.js",function(){loadDict[e]=0,n.loadUrls(0,HC.W[e+"Urls"],t),n.callTaskQueue(e)}))},addTaskQueue:function(e,t){taskQueue[e]||(taskQueue[e]=[]),taskQueue[e].push(t)},callTaskQueue:function(e){if(taskQueue[e]){for(var t=0,n=taskQueue[e].length;t<n;t++)taskQueue[e][t]();taskQueue[e].length=0}},loadUrls:function(index,moduleUrls,moduleFn){function loadUrl(e,t){loadDict[e]?_this.addTaskQueue(e,function(){_this.loadUrls(++i,moduleUrls,moduleFn)}):(loadDict[e]=1,HC.HUB[t](e,function(){loadDict[e]=0,_this.loadUrls(++i,moduleUrls,moduleFn),"css"===t&&(linkDict[e]=1),_this.callTaskQueue(e)}))}var _this=this,i=index;if(i===moduleUrls.length)moduleFn&&moduleFn(),moduleFn=null;else{var urlObj=moduleUrls[i];if(urlObj.css)linkDict[urlObj.css]?_this.loadUrls(++i,moduleUrls,moduleFn):loadUrl(urlObj.css,"addCss");else try{eval(urlObj.isExisted)?_this.loadUrls(++i,moduleUrls,moduleFn):loadUrl(urlObj.js,"addScript")}catch(ex){loadUrl(urlObj.js,"addScript")}}}},module.exports={Loader:Loader,load:function(e,t){new Loader(e,t)}}}});