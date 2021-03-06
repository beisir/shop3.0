/**
 * [util 工具类模块]
 * @type {Object}
 */
var util = {
    /**
     * [getByteLength 获取字符串长度，英文占1个字符，中文汉字占2个字符]
     * @param {String} str [字符串]
     * @param {Number} minLength [字符串长度]
     */
    getByteLength: function(str) {
        if (typeof str != 'string') {
            str = str.toString();
        }
        var nlength = 0;
        for (var i = 0; i < str.length; i++) {
            if ((str.charCodeAt(i) & 0xff00) != 0) {
                nlength++;
            }
            nlength++;
        }
        return nlength;
    },

    /**
     * [获取指定url地址的主机名、协议等属性]
     * @param  {String} url [url]
     * @return {Object}     [属性对象]
     */
    parseURL: function(url) {

        /**
         * [url 删除左右空格]
         * @type {String}
         */
        var _url = url.replace(/(^\s*)|(\s*$)/g, ""),

            /**
             * [_protocols 网络协议前缀]
             * @type {Array}
             */
            _protocols = ['http', 'https'],

            /**
             * [_regExp 判断url地址是否包含网络协议]
             * @type {RegExp}
             */
            _regExp = new RegExp('^(' + _protocols.join('|') + ')\:\/\/', 'ig');

        /**
         * [若url地址不包含协议，则默认在url地址起始位置添加 // ]
         */
        (!_regExp.test(url)) && (_url = '//' + _url);

        /**
         * [根据url地址创建链接元素并解析链接属性]
         * @type {Object}
         */
        var a = document.createElement('a');
        a.href = _url;
        return {
            source: _url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    },

    /**
     * [getQueryString 获取查询参数]
     * @param {String} key [键]
     * @return {String} [值]
     */
    getQueryString: function(key) {
        var search = window.location.search;
        var regExp = new RegExp('[\\?\\&]([^\\?\\&]+)=([^\\?\\&]+)', 'ig');
        var queryStringList = {};
        var parttern;
        while ((parttern = regExp.exec(search))) {
            if (!queryStringList[parttern[1].toLowerCase()]) {
                queryStringList[parttern[1].toLowerCase()] = parttern[2];
            }
        }

        //返回指定键的值
        if (key) {
            return queryStringList[key.toLowerCase()] || '';
        }

        //返回所有查询参数
        return queryStringList;
    },


    /**
     * [resizeImage 计算图片大小]
     */
    resizeImage: function($img, $imgWidth, $imgHeight, $wrapWidth, $wrapHeight) {

        // Calculate size
        var w, h, wn, hn, ha, va, hdif, vdif,
            margT = 0,
            margL = 0,
            $imgCW = $wrapWidth,
            $imgCH = $wrapHeight;


        // Save original sizes
        if ($img.data('owidth') === undefined) $img.data('owidth', $imgWidth);
        if ($img.data('oheight') === undefined) $img.data('oheight', $imgHeight);


        // Compare ratio
        if (($imgCW / $imgCH) < ($img.data('owidth') / $img.data('oheight'))) {
            w = '100%';
            h = 'auto';
            wn = Math.floor($imgCW);
            hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
        } else {
            w = 'auto';
            h = '100%';
            wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
            hn = Math.floor($imgCH);
        }

        // Align X
        ha = 'center';
        hdif = $imgCW - wn;
        if (ha === 'left') margL = 0;
        if (ha === 'center') margL = hdif * 0.5;
        if (ha === 'right') margL = hdif;
        if (ha.indexOf('%') !== -1) {
            ha = parseInt(ha.replace('%', ''), 10);
            if (ha > 0) margL = hdif * ha * 0.01;
        }


        // Align Y
        va = 'center';
        vdif = $imgCH - hn;
        if (va === 'top') margT = 0;
        if (va === 'center') margT = vdif * 0.5;
        if (va === 'bottom') margT = vdif;
        if (va.indexOf('%') !== -1) {
            va = parseInt(va.replace('%', ''), 10);
            if (va > 0) margT = vdif * va * 0.01;
        }


        // Add Css
        w = wn;
        h = hn;
        $img.css({
            'width': w,
            'height': h,
            'margin-left': Math.floor(margL),
            'margin-top': Math.floor(margT)
        });
    },

    /**
     * [resizeImage 图片在容器中自适应]
     * @param  {Array} imageEntityList       [图片元素列表]
     * @param  {Function} imageWrapEntityGetter [图片父元素获取回调函数]
     */
    resizeImage: function(imageEntityList, imageWrapEntityGetter) {

        /**
         * [calculateImageSize 计算图片大小]
         */
        function calculateImageSize($img, $imgWidth, $imgHeight, $wrapWidth, $wrapHeight) {

            // Calculate size
            var w, h, wn, hn, ha, va, hdif, vdif,
                margT = 0,
                margL = 0,
                $imgCW = $wrapWidth,
                $imgCH = $wrapHeight;


            // Save original sizes
            if ($img.data('owidth') === undefined) $img.data('owidth', $imgWidth);
            if ($img.data('oheight') === undefined) $img.data('oheight', $imgHeight);


            // Compare ratio
            if (($imgCW / $imgCH) < ($img.data('owidth') / $img.data('oheight'))) {
                w = '100%';
                h = 'auto';
                wn = Math.floor($imgCW);
                hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
            } else {
                w = 'auto';
                h = '100%';
                wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
                hn = Math.floor($imgCH);
            }

            // Align X
            ha = 'center';
            hdif = $imgCW - wn;
            if (ha === 'left') margL = 0;
            if (ha === 'center') margL = hdif * 0.5;
            if (ha === 'right') margL = hdif;
            if (ha.indexOf('%') !== -1) {
                ha = parseInt(ha.replace('%', ''), 10);
                if (ha > 0) margL = hdif * ha * 0.01;
            }


            // Align Y
            va = 'center';
            vdif = $imgCH - hn;
            if (va === 'top') margT = 0;
            if (va === 'center') margT = vdif * 0.5;
            if (va === 'bottom') margT = vdif;
            if (va.indexOf('%') !== -1) {
                va = parseInt(va.replace('%', ''), 10);
                if (va > 0) margT = vdif * va * 0.01;
            }


            // Add Css
            w = wn;
            h = hn;
            $img.css({
                'width': w,
                'height': h,
                'margin-left': Math.floor(margL),
                'margin-top': Math.floor(margT)
            });
        }

        /**
         * [计算图片列表中图片尺寸]
         */
        $.each(imageEntityList, function(index, imageEntity) {
            var src = imageEntity.src || '';
            if (src) {
                var imageTemp = new Image();
                imageTemp.onload = function() {

                    /**
                     * [imageWrapEntity 获取图片容器元素]
                     * @type {[type]}
                     */
                    var imageWrapEntity = $(imageEntity).parent();
                    if (imageWrapEntityGetter) {
                        imageWrapEntity = imageWrapEntityGetter.call(imageEntity);
                    }

                    /**
                     * 计算图片尺寸
                     */
                    calculateImageSize($(imageEntity), this.width, this.height, imageWrapEntity.width(), imageWrapEntity.height());

                    /**
                     * 销毁图片临时对象
                     */
                    imageTemp = null;
                };
                imageTemp.src = src;
            }
        });
    }
};
module.exports = util;