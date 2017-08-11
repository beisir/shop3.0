var fs = require('fs'),
	path = require('path'),
	config = require('./config')[process.env.NODE_ENV];
module.exports = function(app) {

	/**
	 * [若本地代理服务配置中存在配置项，则忽略以下配置项]
	 */
	if (Object.keys(config.proxyTable).length) {
		return;
	}

	/**
	 * [代理获取模块设置弹出框HTML的请求]
	 */
	app.use('/detail/turbine/action/GetModuleEditBoxAction/eventsubmit_doGet/doGet', function(req, res, next) {
		var _filename = req.query.filename,
			_callback = req.query.callback;
		fs.readFile(path.resolve(__dirname, '../src/data/' + _filename + '.html'), function(err, data) {
			if (err) {
				throw err;
				return;
			}
			res.type('text/javascript');
			res.send(_callback + '(' + JSON.stringify(data.toString()) + ')');
		});
	});

	/**
	 * [代理保存模块设置的请求]
	 */
	app.use('/detail/turbine/template/shop2016,editmodule.html', function(req, res, next) {
		var _operatetype = req.body.operatetype || req.query.operatetype,
			_operatedata = {},
			_username = req.body.username || req.query.username;

		_operatedata = JSON.parse(decodeURIComponent(req.body.operatedata || req.query.operatedata));
		var content = fs.readFileSync(path.resolve(__dirname, '../src/data/' + _operatedata.modulemark + '_save.html'));
		res.send(content.toString());
	});

	/**
	 * [_roterMapping 静态文件映射配置]
	 * @type {Object}
	 */
	var _routerMapping = {
		'/detail/turbine/action/GetListOfCommonTemplateAction/eventsubmit_doCommontemplate/doCommontemplate': '/data/publicTemplate.json', // 公共模板数据接口
		'/detail/turbine/action/GetCustomTemplateListAction/eventsubmit_doCustomlate/doCustomlate': '/data/myTemplate.json', // 私有模板数据接口
		'/detail/turbine/action/NavDataListAction/eventsubmit_doGetnavlist/doGetnavlist': '/data/navSettings.json', // 导航数据接口
		'/detail/turbine/action/RegionModuleSortAction/eventsubmit_doModulesort/doModulesort': '/data/module_sequential_update.json' // 模块顺序更新接口
	};
	Object.keys(_routerMapping).forEach(function(key) {
		app.use(key, function(req, res, next) {
			var content = fs.readFileSync(path.resolve(__dirname, '../src' + _routerMapping[key]));
			res.header("Content-Type", "application/json;charset=utf-8");
			res.json(JSON.parse(content));
		});
	});
}