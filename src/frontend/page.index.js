var page = require('./page');

/**
 * [page_data_analog 导入模拟数据模块，并模拟页面数据]
 * @type {Object}
 */
//require('./template/page.data')();

/**
 * 实例化页面业务对象
 */
var pageEntity = new page();

/**
 * [pageEntity 将页面业务对象暴露到全局]
 * @type {Object}
 */
window.pageEntity = pageEntity;


var ajaxUrl = {
        likeMod: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doProdbysupply/doProdbysupply",
        fillShopMod: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.DetailHomePageFillAjaxAction/eventsubmit_doNewsupply/doNewsupply",
        includedMod: "http://detail.b2b.hc360.com/detail/turbine/action/ajax.SearchSupplyDetailAjaxAction/eventsubmit_doRelawordbysupply/doRelawordbysupply"
    },
    showNum = {
        likeMod: 15,
        includedMod: 10,
        fillShopMod: 20,
        optyM: {
            compOpty: 10,
            newOpty: 10,
            productOpty: 15,
            miniOpty: 15
        }
    },

    /**
     * ["猜你正在找"模块]
     */
    mod = $("#homeRelatedMod"),

    /**
     * ["猜你正在找"模块列表]
     */
    listnode = mod.find("ul"),

    /**
     * ["推荐企业" "最新入驻"模块]
     */
    includedNode = $("#includedMod"),
    /**
     * ["推荐企业" "最新入驻"模块列表]
     */
    includeULs = includedNode.find("ul"),

    /**
     * ["您访问的商铺中未发布任何商品，我们为您推荐了以下商品"提示元素]
     */
    fillShopNode = $("#fillShopMod"),

    /**
     * [seo相关配置]
     */
    opty_listType = {
        compOpty: 'seoIncludeSPList',
        newOpty: 'seoIncludeSPList',
        productOpty: 'seoProductRelaMod',
        miniOpty: 'seoMiniRelaMod'
    },

    /**
     * [moduleConfig 模块配置]
     * @type {Object}
     */
    moduleConfig = $.extend(true, {
        homeRelatedM: {
            isShow: 0 //是否显示"猜你正在找"模块
        },
        optyM: {
            isShow: 0 //是否显示"推荐企业" "最新入驻"模块
        },
        fillShopM: {
            isShow: 0 //(2013-10-21 23:59:59)以前的老用户销售中商机数量<5填充字段 1代表填充 0代表不填充
        }
    }, window.moduleConf);

/**
 * [存在“推荐企业" "最新入驻"模块列表]就初始化模块数据
 */
if (includedNode.length > 0 && includeULs.length > 0) {
    includedInit(includeULs.eq(0));
    includedNode.addClass("linkfbox");
}
/**
 * [存在"猜你正在找"模块且该模块配置为显示时初始化该模块内容]
 */
if (mod.length > 0 && moduleConfig.homeRelatedM.isShow === "1") { //首页猜你喜欢模块
    initRelated();
}
/**
 * [存在"猜你正在找"模块且该模块配置为显示时初始化该模块内容]
 */
if (fillShopNode.length > 0 && moduleConfig.fillShopM.isShow === "1") { //商铺填充模块
    fillShopNode.show(); //显示loading状态
    fillShopInit();
}
/** 推荐企业" "最新入驻 tab 切换**/
handle();
/** 百度联盟广告 **/
baiduAdvert();
/** 优惠券业务 **/
pageHandler();

/***
 * 商铺收录优化模块 推荐企业 最新入驻 产品库相关词 微门户相关词
 * @param node
 */
function includedInit(node) {
    var url = ajaxUrl.includedMod;
    var _key = node.attr("id");
    var param = {
        "listType": opty_listType[_key],
        areaName: encodeURIComponent(window.areaName || ""),
        is3y: node.index()
    };
    var len = node.find("li").length;
    if (len === 0) { //是否缓存
        var data = getData(url, param);
        data.done(function (dataArr) {
            var html = "";
            if (dataArr && dataArr.success == "1") { //获得数据成功
                var list = dataArr.productList;
                if (list && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var obj = list[i];
                        var title = "",
                            url = "";
                        if (obj.title) {
                            title = obj.title.replaceAll("\\+", " ");
                            url = obj.url;
                        } else if (obj.relaWordName) {
                            title = obj.relaWordName.replaceAll("\\+", " ");
                            url = obj.relaWordsInfo;
                        }
                        if (i < showNum.optyM[_key]) {
                            html = html + "<li><a href='" + url + "' title='" + decodeURIComponent(title) + "' target='_blank'>" + decodeURIComponent(title) + "</a></li>";
                        }
                    }
                }
            }
            if (html === "") {
                html = "<li><a href='javascript:void(0);'  target='_blank'>暂无相关数据！</a></li>";
            }
            node.html(html);
            node.show();
            includedNode.show();
        });
    }
}

/***
 * 首页猜你喜欢模块
 */
function initRelated() {
    var changeSp = $(".friendMid").find(".changeSp"),
        userlogs = "hcdetail_enterpriselog=detail_recommend_sp",//非3亿监测点
        countNum = 0,
        pageTotal = 0,
        everyshowNum = 5,
        param = {
            "listType": "homeRelatedList",
            username: window.userName || "",
            memTypeId: window.memTypeId || "",
            supCat: encodeURIComponent(window.searchVal || ""),
            areaName: encodeURIComponent(window.areaName || "")
        };
    /** 3亿监测点 **/
    if (typeof is3y !== "undefined") {
        if (parseInt(is3y)) {
            userlogs = "hcdetail_enterpriselog=detail_recommend_sp_sw";
        }
    }
    var data = getData(ajaxUrl.likeMod, param);
    data.done(function (dataArr) {
        if (dataArr && dataArr.success == "1") { //获得数据成功
            /**
             * Created by dell on 2016/9/13.  p4p项目 修改
             */
            var p4pData = dataArr.jsonP4pList ? dataArr.jsonP4pList.searchResultInfo : [],
                list = dataArr.productList.slice(p4pData.length),
                html = "";
            $.p4pTempData = p4pData;
            countNum = list.length + p4pData.length; //总个数
            var _num = countNum % everyshowNum;
            pageTotal = (_num === 0) ? (countNum / everyshowNum) : (countNum / everyshowNum) + 1; //总页数
            $(document).on("p4pRenderDone.p4p", function () {
                for (var i = 0; i < list.length; i++) {
                    if (i < showNum.likeMod) {
                        var obj = list[i],
                            title = decodeURIComponent(obj.title.replaceAll("\\+", " ")),
                            url = obj.url,
                            price = (obj.price != "") ? ("&yen;" + obj.price) : "面议",
                            imgsrc = obj.imgUrlBig,
                            ids = getId(obj.url);
                        html = html + '<li style="display:none">' + "<div class='picbox'>" + "<a href='" + url + "' data-exposurelog='" + userName + "," + ids + "' title='" + title + "'  target='_blank' onclick=\"return hcclick('?" + userlogs + "');\"><img onload='resizeImg(this,150,150);' onerror='imgonerror(this)' src='" + imgsrc + "'/></a>" + "</div>" + "<p class='pay'>" + price + "</p>" + "<p class='txtoverf'>" + "<a href='" + url + "' title='" + title + "' target='_blank' onclick=\"return hcclick('?" + userlogs + "');\">" + title + "</a>" + "</p>" + "</li>";
                    }
                }
                if (html !== "" || p4pData.length) {
                    listnode.append(html);
                    listnode.find("li").each(function (index) {
                        index < everyshowNum && $(this).show();
                    });
                    if (list.length <= 5 && p4pData.length <= 5) {
                        changeSp.hide();
                    }
                    mod.show();
                } else {
                    p4pData.length > 0 ? mod.show() : mod.hide();
                }
                handleChangeSp();
            });
            $(document).trigger("p4pDataReady.p4pmy");
        } else {
            mod.hide();
        }
    }).fail(function (er) {
        mod.hide();
    });
    /***
     *  优品推荐换一批
     */
    function handleChangeSp() {
        var showIndex = 5;
        $(".friendMid").find("#changeSp").bind("click", function () {
            //p4p重写
            listnode.find('li').each(function (index) {
                index < showIndex + 5 && index >= showIndex ? $(this).show() : $(this).hide();
            });
            showIndex += 5;
            showIndex = showIndex >= countNum ? 0 : showIndex;

        });
    }

    $.handleChangeSp = handleChangeSp;
};

/***
 *商铺首页热销商品和最新商品填充
 */
function fillShopInit() {
    var url = ajaxUrl.fillShopMod,
        param = {
            "providerId": window.providerId
        },
        fillList = fillShopNode.find("ul");
    if (searchVal && searchVal !== "") {
        param.searchVal = encodeURIComponent(searchVal);
    }
    var data = getData(url, param);
    data.done(function (dataArr) {
        var keyword = dataArr.keyword;
        fillShopNode.find(".more a").attr("href", "http://s.hc360.com/?w=" + keyword + "&ql=3&qh=5&SP=1&t=1&v=6");
        if (dataArr && dataArr.success == "1") { //获得数据成功
            var list = dataArr.productList,
                str = new Array();
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i],
                        title = obj.title.replaceAll("\\+", " "),
                        ids = getId(obj.url);
                    if (i < showNum.fillShopMod) {
                        str.push("<li><div class='rqpic'>");
                        str.push("<a href='" + obj.url + "' data-exposurelog='" + window.userName + "," + ids + "' target='_blank' onclick=\"return hcclick('?hcdetail_enterpriselog=detail_home_freesptcpic');\" title='" + decodeURIComponent(title) + "'><img onload='resizeImg(this,160,160);' src='" + obj.imgUrlBig + "' alt='" + decodeURIComponent(title) + "' onerror='imgonerror(this)'></a></div>");
                        str.push("<div class='pro_price'><strong>&yen;</strong>" + obj.price + "</div>");
                        str.push("<div class='rqpinfo'>");
                        str.push("<a href='" + obj.url + "' target='_blank' onclick=\"return hcclick('?hcdetail_enterpriselog=detail_home_freesptctit');\" title='" + decodeURIComponent(title) + "'>" + decodeURIComponent(title) + "</a>");
                        if (parseInt(obj.hasOnline)) {
                            str.push("<p class='pro_ico'><s>&nbsp;</s></p>");
                        }
                        str.push("</div></li>");
                    }
                }
                if (str.length > 0) {
                    fillList.html(str.join(""));
                }
                fillShopNode.addClass("loaded");
                fillShopNode.find(".proPic").show();
            } else {
                fillShopNode.hide();
            }
        } else {
            fillShopNode.hide();
        }
    }).fail(function (er) {
        fillShopNode.hide();
    });
}
/***
 * 获取接口返回的数据
 * @param url
 * @param data
 * @returns {*}
 */
function getData(url, data) {
    return $.ajax({
        url: url,
        data: data,
        //dataType: "json"
        timeout: 3000,
        scriptCharset: "utf-8",
        dataType: "jsonp",
        jsonp: "jsoncallback"
    });
}

/***
 * 推荐企业 最新入驻 产品库相关词 微门户相关词 切换方法
 * @param node
 */
function handle() {
    $("div.friendMid span").bind("click",function(){
        var index=jQuery(this).index();
        $("div.comyanyList").find("ul").hide();
        $("div.friendMid span").addClass("tabTitCur");
        $("div.friendMid span").removeClass("newIntoTab");
        $(this).removeClass("tabTitCur");
        $(this).addClass("newIntoTab");
        $("div.comyanyList").find("ul").eq(index).show();
    });
}

/***
 * 推荐企业 最新入驻切换的时候，页面上onclick调用了这个方法，前端和后台都找不到这个方法是在哪里写的，后台是一个宏也不能去掉页面上的onclick调用，所以只能前端补加一个方法，不让页面报错；
 */
function changeTJSPQY(){}
/**
 *  初始化百度广告是否隐藏
 */
function baiduAdvert() {
    var $baidu945 = $('#baidu945'),
        $baidu970 = $('#baidu970');
    if ($baidu945.length = 1 && $baidu970.length == 1) {
        var $offsetTopBaidu945 = $('#baidu945').offset().top,
            $heightBaidu945 = $('#baidu945').height(),
            $offsetTopBaidu970 = $('#baidu970').offset().top;
        if (!($offsetTopBaidu970 > ($offsetTopBaidu945 + $heightBaidu945 + 30))) {
            $('#baidu970').remove();
        }
    }
}
/***
 * 优惠券方法
 */
function pageHandler() {
    var couponsBtn = $("#smallCou"), //优惠券按钮
        couponsCount = $("#coupons");//优惠券红包
    /***
     * 初始化优惠券
     */
    HC.HUB.addScript('http://style.org.hc360.cn/js/detail/scripts/coupon/jq_moveXY.js', function () {
        $("#pic_roll").moveXY({
            effect: "buttonClick"
        });
    });

    /**
     窗口改变，改变优惠券显示位置
     */
    $(window).resize(function () {
        var _width = $(window).width();
        if (_width < 1200) {
            couponsCount.css({
                "left": "0",
                "margin-right": "0"
            });
            couponsBtn.css({
                "left": "0",
                "margin-right": "0"
            });

        } else {
            couponsCount.css({
                "left": "auto",
                "right": "50%",
                "margin-right": "400px"
            });
            couponsBtn.css({
                "left": "auto",
                "right": "51%",
                "margin-right": "480px"
            });
        }
    });

    /***
     * 点击优惠券按钮，显示优惠券红包，隐藏按钮
     */
    couponsBtn.click(function () {
        couponsCount.show();
        couponsBtn.hide();
    });
    /***
     * 点击优惠券红包关闭按钮，显示优惠券按钮，隐藏优惠券红包
     */
    $('#close09').click(function () {
        couponsCount.hide();
        couponsBtn.show();
    });

}


/***
 * 截取href的id
 * @param href
 * @returns {string}
 */
function getId(href) {
    var len = href.indexOf('.html');
    if (len && len > 0) {
        return href.substring(32, len);
    }
}
/***
 * 图片加载失败
 * @param img
 */
function imgonerror(img) {
    var noneImg = "http://b2b.hc360.com/mmtTrade/images/nopic.jpg";
    img.src = noneImg;
    img.onerror = null;
}


/**
 * [显示企业档案模块的 商盈通 图标逻辑]
 */
(function () {
  $.ajax({
    type: "get",
    url: "http://order.b2b.hc360.com/brandneworder/checkbuslinks.html",
    data: {
      providerid: window.providerId
    },
    timeout: 3000,
    dataType: "jsonp",
    jsonp: "jsoncallback",
    success: function(result) {
      if (result) {
        if ($("#sytico").length > 0) {
          $("#sytico").show();
        } else if ($("#service-message").length > 0) {
          $("#service-message").show();
        }
      }
    },
    error: function(e) {}
  });
})();
