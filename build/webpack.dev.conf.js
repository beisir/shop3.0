var utils = require('./utils'),
	webpack = require('webpack'),
	config = require('./config')[process.env.NODE_ENV],
	merge = require('webpack-merge'),
	baseWebpackConfig = require('./webpack.base.conf'),
	HTMLWebPackPlugin = require('html-webpack-plugin'),
	FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

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
	_entries[key].template && _plugins.push(
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

module.exports = merge({
	plugins: _plugins
}, baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.cssSourceMap
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': process.env.Node_Env
		}),
		// //github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		// //github.com/ampedandwired/html-webpack-plugin
		// new HTMLWebPackPlugin({
		// 	filename: config.index,
		// 	template: config.template,
		// 	chunks: ['backend/page.index'],
		// 	inject: true
		// }),
		new FriendlyErrorsPlugin()
	]
});