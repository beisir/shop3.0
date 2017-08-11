var webpack = require('webpack'),
	path = require('path'),
	htmlWebPackPlugin = require('html-webpack-plugin'),
	assetsPlugin = require('assets-webpack-plugin'),
	extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {

	/**
	 * [entry 入口文件配置]
	 * @type {Object}
	 */
	entry: {

		/**
		 * 通用入口文件
		 */
		'common/page.top': path.join(__dirname, 'src/common/page.top'), //顶部
		'common/page.bottom': path.join(__dirname, 'src/common/page.bottom'), //底部

		/**
		 * 所见即所得页面入口文件
		 */
		'backend/page.index': path.join(__dirname, 'src/backend/page.index'), //首页
		'backend/page.show': path.join(__dirname, 'src/backend/page.show'), //公司介绍
		'backend/page.info': path.join(__dirname, 'src/backend/page.info'), //公司动态
		'backend/page.businwindow': path.join(__dirname, 'src/backend/page.businwindow'), //供应产品
		'backend/page.album': path.join(__dirname, 'src/backend/page.album'), //公司相册
		'backend/page.company': path.join(__dirname, 'src/backend/page.company'), //联系我们
		'backend/page.busnote': path.join(__dirname, 'src/backend/page.busnote'), //客户反馈
		'backend/page.userdefinechannel': path.join(__dirname, 'src/backend/page.userdefinechannel'), //自定义频道
		'backend/page.mmtdocs': path.join(__dirname, 'src/backend/page.mmtdocs'), //买卖通档案
		'backend/page.credit': path.join(__dirname, 'src/backend/page.credit'), //信用证书

		/**
		 * 所见即所得预览页面入口文件
		 */
		'backend/preview/module_ads': path.join(__dirname, 'src/backend/preview/module_ads'), //宽屏广告
		'backend/preview/module_certificate': path.join(__dirname, 'src/backend/preview/module_certificate'), //荣誉证书

		/**
		 * 前台页面入口文件
		 */
		'frontend/page.index': path.join(__dirname, 'src/frontend/page.index'), //首页
		'frontend/page.show': path.join(__dirname, 'src/frontend/page.show'), //公司介绍
		'frontend/page.info': path.join(__dirname, 'src/frontend/page.info'), //公司动态
		'frontend/page.infodetail': path.join(__dirname, 'src/frontend/page.infodetail'), //公司动态详情页面
		'frontend/page.businwindow': path.join(__dirname, 'src/frontend/page.businwindow'), //供应产品
		'frontend/page.album': path.join(__dirname, 'src/frontend/page.album'), //公司相册
		'frontend/page.company': path.join(__dirname, 'src/frontend/page.company'), //联系我们
		'frontend/page.busnote': path.join(__dirname, 'src/frontend/page.busnote'), //客户反馈
		'frontend/page.userdefinechannel': path.join(__dirname, 'src/frontend/page.userdefinechannel'), //自定义频道
		'frontend/page.mmtdocs': path.join(__dirname, 'src/frontend/page.mmtdocs'), //买卖通档案
		'frontend/page.dealer_network': path.join(__dirname, 'src/frontend/page.dealer_network'), //经销网络
		'frontend/page.credit': path.join(__dirname, 'src/frontend/page.credit'), //信用证书
		'frontend/page.creditdetail': path.join(__dirname, 'src/frontend/page.creditdetail'), //企业资质详情页
        'frontend/page.commodity': path.join(__dirname, 'src/frontend/page.commodity') //企业资质详情页
	},

	/**
	 * [output 输出文件配置]
	 * @type {Object}
	 */
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name].js',
		// filename: '[name].[hash].js',//根据compilation对象计算所得
		// filename: '[name].[chunkhash].js',//根据具体模块文件的内容计算所得
		publicPath: 'http://style.org.hc360.cn/js/module/shop3.0/dist/',
		 // publicPath: 'http://localhost:8080/',
		// chunkFilename: '[name].[hash].js',//根据compilation对象计算所得
		// chunkFilename: '[name].[chunkhash].js',//根据具体模块文件的内容计算所得
		chunkFilename: '[name].js'
	},

	/**
	 * [resolve description]
	 * @type {Object}
	 */
	resolve: {
		extensions: ['', '.js'],
		alias: {
			// 'jquery': path.join(__dirname, 'node_modules/jquery/jquery'),//因为jquery1.9未遵循commonJS规范，所以暂对jquery源码修改以方便webpack构建
			'jquery': path.join(__dirname, 'src/components/jquery'),
			'dialog': path.join(__dirname, 'src/components/artDialog/dist/dialog'),
			'mustache': path.join(__dirname, 'node_modules/mustache/mustache'),
			'jquery.spectrum': path.join(__dirname, 'node_modules/spectrum-colorpicker/spectrum'),
			'webuploader': path.join(__dirname, 'src/components/webuploader/webuploader'),
			'OwlCarousel': path.join(__dirname, 'src/components/OwlCarousel/owl.carousel'),
			'slick': path.join(__dirname, 'node_modules/slick-carousel/slick/slick.js'),
			'KindEditor': path.join(__dirname, 'src/components/KindEditor/kindeditor-all'),
			'jquery_pagination': path.join(__dirname, 'src/components/jquery.pagination'),
			'jquery_imgLiquid': path.join(__dirname, 'src/components/jquery.imgLiquid'),
			'jquery.placeholder': path.join(__dirname, 'node_modules/jquery-placeholder/jquery.placeholder'),
			'jquery.lazyload': path.join(__dirname, 'src/components/jquery.lazyload'),
			'Jcrop': path.join(__dirname, 'src/components/jquery.jcrop/jquery.Jcrop'),
			'json2': path.join(__dirname, 'src/components/json2'),
			'cookie': path.join(__dirname, 'src/components/cookie'),
			'uuid': path.join(__dirname, 'src/components/uuid'),
			'ua': path.join(__dirname, 'src/components/ua'),
			'msclass': path.join(__dirname, 'src/components/msclass'),
			'jquery.transitionEffectsSlider': path.join(__dirname, 'src/components/jquery.transitionEffectsSlider/jquery.transitionEffectsSlider')
		}
	},

	/**
	 * [module 模块加载器配置]
	 * @type {Object}
	 */
	module: {
		loaders: [{
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
			loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader?' + JSON.stringify({
				discardComments: {
					removeAll: true
				}
			}))
		}, {
			test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
			loader: 'url-loader?limit=8192&name=[path][name].[ext]' //处理png jpg gif svg woff woff2 ttf eot模块
		}]
	},

	/**
	 * [devServer 本地服务配置]
	 * @type {Object}
	 */
	devServer: {
		port: 8080,
		contentBase: './dist',
		inline: true,
		host: '0.0.0.0',
		proxy: {

			// /**
			//  * 数据文件映射配置
			//  */
			// '/json': {
			// 	target: 'http://localhost:8080/json',
			// 	secure: false,
			// 	pathRewrite: {
			// 		'^/json/(.*)': '$1.json'
			// 	}
			// },

			// /**
			//  * html文件映射配置
			//  */
			// '/html': {
			// 	target: 'http://localhost:8080/html',
			// 	secure: false,
			// 	pathRewrite: {
			// 		'^/html/(.*)': '$1.html'
			// 	}
			// }
		}
	},

	/**
	 * [plugins 插件配置]
	 * @type {Array}
	 */
	plugins: [

		/**************************************************所见即所得模块预览功能模板构建配置-开始**************************************************/

		/**
		 * [宽屏广告模块"预览页"模板构建配置]
		 */
		new htmlWebPackPlugin({
			template: './src/backend/template/preview/module_ads.html',
			filename: 'backend/preview/module_ads.html',
			chunks: ['backend/combo.css', 'backend/combo', 'backend/preview/module_ads'],
			inject: 'body'
		}),

		/**
		 * [荣誉证书模块"预览页"模板构建配置]
		 */
		new htmlWebPackPlugin({
			template: './src/backend/template/preview/module_certificate.html',
			filename: 'backend/preview/module_certificate.html',
			chunks: ['backend/combo.css', 'backend/combo', 'backend/preview/module_certificate'],
			inject: 'body'
		}),


		/**************************************************所见即所得模块预览功能模板构建配置-结束**************************************************/



		/**************************************************所见即所得页面模板构建配置-开始**************************************************/

		/**
		 * ["首页"模板构建配置]
		 */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.index.html',
		// 	filename: 'backend/index.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.index'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["公司介绍"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.intro.html',
		// 	filename: 'backend/intro.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.show'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["公司动态"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.news.html',
		// 	filename: 'backend/news.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.info'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["供应产品"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.supply.html',
		// 	filename: 'backend/supply.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.businwindow'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["公司相册"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.album.html',
		// 	filename: 'backend/album.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.album'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["联系我们"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.contactus.html',
		// 	filename: 'backend/contactus.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.company'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["客户反馈"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/backend/template/page.feedback.html',
		// 	filename: 'backend/feedback.html',
		// 	chunks: ['backend/combo.css', 'backend/combo', 'backend/page.busnote'],
		// 	inject: 'body'
		// }),

		/**************************************************所见即所得页面模板构建配置-结束**************************************************/



		/**************************************************前台页面模板构建配置-开始**************************************************/

		/**
		 * ["首页"模板构建配置]
		 */
		 /*new htmlWebPackPlugin({
		 	template: './src/frontend/template/page.index.html',
		 	filename: 'frontend/index.html',
		 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.index'],
		 	inject: 'body'
		 }),*/

		// /**
		//  * ["公司介绍"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.intro.html',
		// 	filename: 'frontend/intro.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.show'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["公司动态"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.news.html',
		// 	filename: 'frontend/news.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.info'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["供应产品"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.supply.html',
		// 	filename: 'frontend/supply.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.businwindow'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["公司相册"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.album.html',
		// 	filename: 'frontend/album.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.album'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["联系我们"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.contactus.html',
		// 	filename: 'frontend/contactus.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.company'],
		// 	inject: 'body'
		// }),

		// /**
		//  * ["客户反馈"模板构建配置]
		//  */
		// new htmlWebPackPlugin({
		// 	template: './src/frontend/template/page.feedback.html',
		// 	filename: 'frontend/feedback.html',
		// 	chunks: ['frontend/combo.css', 'frontend/combo', 'frontend/page.busnote'],
		// 	inject: 'body'
		// }),

        /**
		 * ["产品大图页"模板构建配置]
         */
        /*new htmlWebPackPlugin({
			template: './src/frontend/template/page.commodity.html',
			filename: 'frontend/page.commodity.html',
			chunks: ['frontend/page.commodity'],
			inject: 'body'
		}),*/


		/**************************************************前台页面模板构建配置-结束**************************************************/



		/**************************************************提取通用模块配置-开始**************************************************/

		/**
		 * 提取所见即所得各页面入口文件的通用模块到 backend/combo.js
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'backend/combo',
			chunks: ['backend/page.index', 'backend/page.show', 'backend/page.info', 'backend/page.businwindow', 'backend/page.album', 'backend/page.company', 'backend/page.busnote', 'backend/page.userdefinechannel', 'backend/page.mmtdocs', 'backend/page.credit']
		}),

		/**
		 * 提取前台各页面入口文件的通用模块到 frontend/combo.js
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'frontend/combo',
			chunks: ['frontend/page.index', 'frontend/page.show', 'frontend/page.info', 'frontend/page.infodetail', 'frontend/page.creditdetail', 'frontend/page.businwindow', 'frontend/page.album', 'frontend/page.company', 'frontend/page.busnote', 'frontend/page.userdefinechannel', 'frontend/page.mmtdocs', 'frontend/page.credit', 'frontend/page.dealer_network']
		}),

		/**************************************************提取通用模块配置-结束**************************************************/



		/**************************************************提取通用样式配置-开始**************************************************/

		/**
		 * 提取后端通用样式到combo.css
		 */
		new extractTextWebpackPlugin('[name].css'),

		/**************************************************提取通用模块配置-结束**************************************************/



		/**************************************************性能优化配置-开始**************************************************/

		/**
		 * [UglifyJsPlugin js压缩插件配置]
		 */
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

		/**
		 * [根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小]
		 */
		new webpack.optimize.OccurrenceOrderPlugin()

		/**************************************************性能优化配置-开始**************************************************/



		/**************************************************脚本文件摘要命名映射文件生成配置-开始**************************************************/

		/**
		 * [assetsPlugin 脚本文件摘要命名映射文件生成配置]
		 */
		// new assetsPlugin({
		// 	filename: 'assets-mapping.json',
		// 	fullPath: true, // the output will include the full path of the generated file.
		// 	prettyPrint: true,
		// 	processOutput: function(assets) {

		// 		// 修改属性名，将入口文件名替换成生产环境地址
		// 		for (var asset in assets) {
		// 			assets['http://style.org.hc360.cn/js/module/shop3.0/dist/' + asset + '.js'] = assets[asset];
		// 			delete assets[asset];
		// 		}

		// 		return JSON.stringify(assets);
		// 	}
		// })

		/**************************************************脚本文件摘要命名映射文件生成配置-开始**************************************************/
	]

	/**
	 * [devtool 生成压缩脚本map文件]
	 * @type {String}
	 */
	// devtool: 'source-map'
};