webpackJsonp([39],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 经销商网络页面
	 */
	var page = __webpack_require__(117);

	/**
	 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
	 * @type {Object}
	 */
	// require('./template/page.data')();

	/**
	 * 实例化页面业务对象
	 */
	var pageEntity = new page();

	/**
	 * [pageEntity 将页面业务对象暴露到全局]
	 * @type {Object}
	 */
	window.pageEntity = pageEntity;

	/**
	Project:经销商网络地图
	author: lishuna
	*/
	var showIndex = 0,
		totalCount = 1;
	(function($) {
		$(function() {
			var ajaxurl = {
				province: "//detail.b2b.hc360.com/detail/turbine/template/fxb,initprovice.html",
				agent: "//detail.b2b.hc360.com/detail/turbine/template/fxb,getdealersells.html"
			};
			var agentArr = [],
				underCityArr = ['北京', '上海', '天津', '重庆'],
				level = 8,
				specialProArr = ['内蒙古', '新疆', '西藏', '广西', '宁夏', '北京', '上海', '天津', '重庆'];
			$.agentMap = {
				map: '',
				subMap: '',
				init: function() {
					var self = this;
					self.map = new BMap.Map("containerMap", {
						enableMapClick: false
					});
					self.map.centerAndZoom("陕西", 5);
					self.map.disableDoubleClickZoom();
					self.map.enableAutoResize();
					self.map.clearOverlays(); //清除地图覆盖物 
					$.ajax({
						url: ajaxurl.province,
						data: {
							username: username
						},
						timeout: 5000,
						scriptCharset: "utf-8",
						dataType: "jsonp",
						jsonp: "jsoncallback",
						success: function(result) {
							if (result.success === "1") {
								var list = result.dataList;
								for (var i = 0; i < list.length; i++) {
									var obj = list[i];
									var txt = decodeURIComponent(obj.name),
										mouseoverTxt = "<h2>" + txt + "有<span>" + obj.agentCount + "</span>家经销商</h2>";
									var point = new BMap.Point(obj.x, obj.y);
									var myCompOverlay = new ComplexCustomOverlay(point, txt, mouseoverTxt, obj.id);
									self.map.addOverlay(myCompOverlay);

								}
							}
						}
					});
					self.handle();
					$('.callbkmaps').hide();
				},
				showProvinceMap: function(point, name, id) {
					var self = this;
					self.subMap = new BMap.Map("containerMap", {
						enableMapClick: false
					});
					self.subMap.disableDoubleClickZoom();
					self.subMap.clearOverlays(); //清除地图覆盖物 
					$('.callbkmaps').show();
					level = 8, flag = true;
					for (var i = 0; i < underCityArr.length; i++) {
						if (name === underCityArr[i]) {
							level = 11;
							break;
						}
					}
					for (var k = 0; k < specialProArr.length; k++) {
						if (name === specialProArr[k]) {
							flag = false;
						}
					}
					if (flag) {
						name = name + "省";
					}
					self.subMap.centerAndZoom(point, level);
					self.subMap.clearOverlays(); //清除地图覆盖物 
					self.setMarker(id);
					self.getBoundary(point, name);
				},
				//建立省的边线
				getBoundary: function(point, name) {
					var self = this;
					self.subMap.centerAndZoom(point, level);
					var bdary = new BMap.Boundary();
					bdary.get(name, function(rs) { //获取行政区域
						var count = rs.boundaries.length; //行政区域的点有多少个					
						for (var i = 0; i < count; i++) {
							var ply = new BMap.Polygon(rs.boundaries[i], {
								strokeWeight: 3,
								strokeColor: "#ff0000",
								fillColor: ""
							}); //建立多边形覆盖物
							self.subMap.addOverlay(ply); //添加覆盖物         
						}
					});
				},
				setMarker: function(id) {
					var self = this;
					var param = {
						provinceId: id,
						username: username
					};
					$.ajax({
						url: ajaxurl.province,
						data: param,
						timeout: 5000,
						scriptCharset: "utf-8",
						dataType: "jsonp",
						jsonp: "jsoncallback",
						success: function(result) {
							if (result.success === "1") {
								var list = result.dataList;
								for (var i = 0; i < list.length; i++) {
									var obj = list[i],
										name = decodeURIComponent(obj.name);
									var point = new BMap.Point(obj.x, obj.y);
									var over = new BMap.Marker(point);
									over.id = obj.id;
									self.subMap.addOverlay(over);
									over.setAnimation(BMAP_ANIMATION_BOUNCE);
									over.addEventListener('click', function(e) {
										showIndex = 0;
										var _mark = e.target;
										var point = e.point;
										self.getAgentById(_mark.id, function(html) {
											self.openInfo(html, e, self.subMap);
										});
									});

								}
							}
						}
					});
				},
				openInfo: function(content, e, map) {
					var opts = {
						width: 280, // 信息窗口宽度
						height: 193, // 信息窗口高度
						title: "", // 信息窗口标题
						enableMessage: true //设置允许信息窗发送短息
					};
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
					map.openInfoWindow(infoWindow, point); //开启信息窗口
				},
				getAgentById: function(id, callback) {
					var self = this;
					var param = {
						cityId: id,
						username: username
					};
					if (!agentArr[id]) {
						$.ajax({
							url: ajaxurl.agent,
							data: param,
							timeout: 5000,
							scriptCharset: "utf-8",
							dataType: "jsonp",
							jsonp: "jsoncallback",
							success: function(result) {
								if (result && result.success === '1') {
									var list = result.dataList;
									self.showAgent(list, callback);
									agentArr[id] = list;
								}
							}
						});
					} else {
						self.showAgent(agentArr[id], callback);
					}
				},
				showAgent: function(data, callback) {
					var self = this;
					var list = data;
					totalCount = list.length;
					var str = new Array();
					str.push("  <div class='itemfloor'> ");
					str.push("  <h2>该地区有<span>" + list.length + "</span>家经销商</h2> ");
					str.push("  <div class='iteminfo'><ul>");
					for (var i = 0; i < list.length; i++) {
						var obj = list[i];
						var title = obj.nameType ? '公司名称' : '商铺名称';
						str.push("  <li> <p class='itemtt'><span>" + title + "：</span><em><a href='//" + obj.sellname + ".b2b.hc360.com' target='_blank' title='" + decodeURIComponent(obj.name) + "'>" + decodeURIComponent(obj.name) + "</a></em></p> ");
						str.push("  <p class='itemtt'><span>联系电话：</span><em>" + obj.telephone + "</em></p> ");
						str.push("  <p class='itemtt'><span>地址：</span><em title='" + obj.address + "'>" + obj.address + "</em></p></li> ");
					}
					str.push("  </ul></div> ");
					if (totalCount === 1) {
						str.push("  <div class='floorBtn' style='display:none;'><button>换一家</button></div></div> ");
					} else {
						str.push("  <div class='floorBtn'><button onclick='changeAgent(this)'>换一家</button></div></div> ");
					}
					if (list.length > 0) {
						callback(str.join(''));
					}
				},
				handle: function() {
					var self = this,
						body = $('body');
					body.undelegate('.itemfloor', 'dblclick');
					body.delegate('.itemfloor', 'dblclick', function(evt) {
						return false;
					});
					body.undelegate('.callbkmaps', 'click');
					body.delegate('.callbkmaps', 'click', function() {
						$.agentMap.init();

					});
				}
			};
			$.agentMap.init();
		});
	})(jQuery);

	function changeAgent(evt) {
		showIndex++;
		showIndex = (showIndex + 1) > totalCount ? 0 : showIndex;
		var _ul = $('.itemfloor').find('ul');
		var _lilength = _ul.find('li').eq(0).outerWidth();
		_ul.css({
			marginLeft: -_lilength * showIndex
		});
	}
	// 复杂的自定义覆盖物
	function ComplexCustomOverlay(point, text, mouseoverText, provinceId) {
		this._point = point;
		this._text = text;
		this._overText = mouseoverText;
		this.provinceId = provinceId;
	}
	ComplexCustomOverlay.prototype = new BMap.Overlay();
	ComplexCustomOverlay.prototype.initialize = function(map) {
		var _self = this;
		this._map = map;
		var div = this._div = document.createElement("div");
		div.style.position = "absolute";
		div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
		div.style.backgroundColor = "#EE5D5B";
		div.style.border = "1px solid #BC3B3A";
		div.style.color = "white";
		div.style.height = "18px";
		div.style.padding = "2px";
		div.style.lineHeight = "18px";
		div.style.whiteSpace = "nowrap";
		div.style.MozUserSelect = "none";
		div.style.fontSize = "12px";
		div.id = this.provinceId;
		var span = this._span = document.createElement("span");
		div.appendChild(span);
		span.appendChild(document.createTextNode(this._text));

		var that = this;

		var arrow = this._arrow = document.createElement("div");
		arrow.style.background = "url(//map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
		arrow.style.position = "absolute";
		arrow.style.width = "11px";
		arrow.style.height = "10px";
		arrow.style.top = "22px";
		arrow.style.left = "10px";
		arrow.style.overflow = "hidden";
		div.appendChild(arrow);

		var _over = this._over = document.createElement("div");
		_over.className = "probussnumb";
		_over.id = "province" + this.provinceId;
		_over.innerHTML = this._overText;
		div.appendChild(_over);
		div.onmouseover = function() {
			var _id = "province" + that.provinceId;
			var node = document.getElementById(_id);
			node.style.display = "block";
		};
		div.onmouseout = function() {
			var _id = "province" + that.provinceId;
			var node = document.getElementById(_id);
			node.style.display = "none";
		};
		div.onclick = function(e) {
			$.agentMap.showProvinceMap(_self._point, _self._text, _self.provinceId);
		};
		map.getPanes().labelPane.appendChild(div);

		return div;
	};
	ComplexCustomOverlay.prototype.draw = function() {
		var map = this._map;
		var pixel = map.pointToOverlayPixel(this._point);
		this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
		this._div.style.top = pixel.y - 30 + "px";
	};

/***/ })
]);