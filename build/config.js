var path = require('path'),
    url = require('url');

module.exports = {
    production: {
        index: path.resolve(__dirname, '../dist/backend/template/page.index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '//style.org.hc360.cn/js/module/shop3.0/dist/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        template: 'src/backend/template/page.index.html'
    },
    development: {
        index:'/backend/template/page.index.html',
        // index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        port: 8989,
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        proxyTable: {
            // /**
            //  * 映射到指定主机
            //  */
            // '/dataweb': {
            //     // target: '//123.103.77.81', //生产环境
            //     target: '//data.360jz.com', //测试环境
            //     // target: '//192.168.34.179', //张婉如机器
            //     changeOrigin: true
            // }
            /**
             * 映射到本地文件
             */
            // '/detail/turbine/action': {
            //     target: '//localhost:8989',
            //     changeOrigin: true,
            //     pathRewrite: function(path, req) {
            //         var urlParsed = url.parse(req.url, true),
            //             query = urlParsed.query,
            //             pathname = urlParsed.pathname.replace(/\/*$/g,'');
            //         pathname = pathname.substring(pathname.lastIndexOf('/'));
            //         Object.keys(query).forEach((key) => {
            //             pathname += ('-' + key + query[key]);
            //         });
            //         pathname = '/static/json' + pathname + '.json';
            //         console.log('proxy request ' + path + ' to ' + pathname);
            //         return pathname;
            //     }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (//github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        template: 'src/backend/template/page.index.html'
    }
};