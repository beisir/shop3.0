var path = require('path'),
    utils = require('./utils'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    config = require('./config')[process.env.NODE_ENV],
    ExtractTextPlugin = require('extract-text-webpack-plugin'),

    /**
     * [entries 入口文件列表]
     * @type {Object}
     */
    entries = require('./entries');

/**
 * [初始化入口文件，插件配置]
 */
var _entry = {},
    _plugins = [
        new ExtractTextPlugin(utils.assetsPath('[name].css'))
    ],
    _commonsChunkPlugins = {},

    /**
     * [_sourcePrefix 入口文件路径前缀]
     * @type {String}
     */
    _sourcePrefix = './src/';
Object.keys(entries).forEach((key) => {
    _entry[key] = _sourcePrefix + key;
});

module.exports = {
    entry: _entry,
    output: {
        path: config.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },
    resolve: {
        extensions: ['', '.js', '.css'],
        alias: {
            // 'jquery': path.join(__dirname, 'node_modules/jquery/jquery'),//因为jquery1.9未遵循commonJS规范，所以暂对jquery源码修改以方便webpack构建
            'jquery': path.join(__dirname, '../src/components/jquery'),
            'dialog': path.join(__dirname, '../src/components/artDialog/dist/dialog'),
            'mustache': path.join(__dirname, '../node_modules/mustache/mustache'),
            'jquery.spectrum': path.join(__dirname, '../node_modules/spectrum-colorpicker/spectrum'),
            'webuploader': path.join(__dirname, '../src/components/webuploader/webuploader'),
            'OwlCarousel': path.join(__dirname, '../src/components/OwlCarousel/owl.carousel'),
            'slick': path.join(__dirname, '../node_modules/slick-carousel/slick/slick.js'),
            'KindEditor': path.join(__dirname, '../src/components/KindEditor/kindeditor-all'),
            'jquery_pagination': path.join(__dirname, '../src/components/jquery.pagination'),
            'jquery_imgLiquid': path.join(__dirname, '../src/components/jquery.imgLiquid'),
            'jquery.placeholder': path.join(__dirname, '../node_modules/jquery-placeholder/jquery.placeholder'),
            'jquery.lazyload': path.join(__dirname, '../src/components/jquery.lazyload'),
            'Jcrop': path.join(__dirname, '../src/components/jquery.jcrop/jquery.Jcrop'),
            'json2': path.join(__dirname, '../src/components/json2'),
            'cookie': path.join(__dirname, '../src/components/cookie'),
            'uuid': path.join(__dirname, '../src/components/uuid'),
            'ua': path.join(__dirname, '../src/components/ua'),
            'msclass': path.join(__dirname, '../src/components/msclass'),
            'jquery.transitionEffectsSlider': path.join(__dirname, '../src/components/jquery.transitionEffectsSlider/jquery.transitionEffectsSlider')
        }
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['es3ify-loader']
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /dragula\.js$/,
            loader: 'expose-loader?dragula' //baol dragula 模块为全局对象
        }, {
            test: /dialog\-\.js$/,
            loader: 'expose-loader?dialog' //暴露 dialog 模块为全局对象
        }, {
            test: /mustache\.js$/,
            loader: 'expose-loader?mustache' //暴露 mustache 模块为全局对象
        }, {
            test: /colorjoe\.js$/,
            loader: 'expose-loader?colorjoe' //暴露 colorjoe 模块为全局对象
        }, {
            test: /webuploader\.js$/,
            loader: 'expose-loader?webuploader' //暴露 webuploader 模块为全局对象
        }, {
            test: /owl\.carousel\.js$/,
            loader: 'expose-loader?OwlCarousel' //暴露 OwlCarousel 模块为全局对象
        }, {
            test: /cookie\.js$/,
            loader: 'expose-loader?Cookies' //暴露 Cookies 模块为全局对象
        }, {
            test: /msclass\.js$/,
            loader: 'expose-loader?Marquee' //暴露 Marquee 模块为全局对象
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + JSON.stringify({
                discardComments: {
                    removeAll: true
                }
            }))
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[ext]')
            }
        }]
    },
    plugins: _plugins,
    postcss: function() {
        return [autoprefixer];
    }
};