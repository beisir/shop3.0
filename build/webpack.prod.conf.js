var path = require('path'),
    utils = require('./utils'),
    webpack = require('webpack'),
    config = require('./config')[process.env.NODE_ENV],
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.conf'),
    HTMLWebPackPlugin = require('html-webpack-plugin');

/**
 * [_plugins 插件配置对象]
 * @type {Array}
 */
var _plugins = [],

    /**
     * [_entries 入口文件列表]
     * @type {Object}
     */
    _entries = require('./entries'),

    /**
     * 提取公用模块插件配置对象
     */
    _commonsChunkPlugins = {},

    /**
     * [_sourcePrefix 入口文件路径前缀]
     * @type {String}
     */
    _sourcePrefix = './src/';

/**
 * [根据入口文件group属性对入口文件进行分组]
 */
Object.keys(_entries).forEach((key) => {

    /**
     * [对入口文件进行分组，以便同一组的入口文件提取公用模块]
     */
    if (_entries[key].group) {
        _commonsChunkPlugins[_entries[key].group] ? _commonsChunkPlugins[_entries[key].group].push(key) : _commonsChunkPlugins[_entries[key].group] = [key];
    }

    /**
     * [添加模板插件配置]
     */
    _entries[key].html && _plugins.push(
        new HTMLWebPackPlugin({
            template: _sourcePrefix + _entries[key].template,
            filename: _entries[key].filename,
            chunks: _entries[key].group ? [_entries[key].group + '/combo.css', _entries[key].group + '/combo', key] : [key], //该配置针对多入口文件
            inject: true,
            chunksSortMode: 'dependency' // 指定的chunk在插入到html文档前的排序方式
        })
    );
});

/**
 * [创建CommonsChunkPlugin插件配置]
 */
Object.keys(_commonsChunkPlugins).forEach((key) => {
    _plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: key + '/combo',
            chunks: _commonsChunkPlugins[key]
        })
    );
});

var webpackConfig = merge({
    plugins: _plugins
}, baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.productionSourceMap,
            extract: true
        })
    },
    devtool: config.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.assetsRoot,
        // filename: utils.assetsPath('js/[name].js'),
        // chunkFilename: utils.assetsPath('js/[id].js')
        // filename: utils.assetsPath('[name].js'),
        filename: utils.assetsPath('[name].js'),
        chunkFilename: utils.assetsPath('[name].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false
            },
            output: {
                comments: false,
                ascii_only: true,
                screw_ie8: false
            },
            mangle: {
                screw_ie8: false
            }
        }),

        // split vendor js into its own file
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'combo'
        // }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // })
    ]
});
module.exports = webpackConfig;
