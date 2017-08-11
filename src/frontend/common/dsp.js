/**
 * [exports DSP分量部码]
 * @return {[type]} [description]
 */
module.exports = function() {
	/**
	 * DSP分量部码
	 */
	function isShouldDSP() {
		var arr = ["A", "C", "D", "E", "0", "2", "4", "6", "8"];
		var uuid = HC.util.cookie.get('hc360visitid');
		return (uuid && jQuery.inArray(uuid.substr(uuid.length - 1, 1), arr) > -1);
	}

	if (isShouldDSP()) {
		/* DSP 基础代码  */
		(function(w, d, s, l, a) {
			w._CommandName_ = l;
			w[l] = w[l] || function() {
				(w[l].q = w[l].q || []).push(arguments);
				w[l].track = function() {
					(w[l].q[w[l].q.length - 1].t = []).push(arguments);
				};
				return w[l];
			}, w[l].a = a, w[l].l = 1 * new Date();
			var c = d.createElement(s);
			c.async = 1;
			c.src = '//fm.ipinyou.com/j/a.js';
			var h = d.getElementsByTagName(s)[0];
			h.parentNode.insertBefore(c, h);
		})(window, document, 'script', 'py', 'jV..38GexfbZoNEYSQDDqEHcG_');
	}

	/** DSP单品访客代码 页面中植入 
	//	py('event','viewItem',{
	//		'product_no':'商品编号',
	//		'spu_id':'标准化产品单元ID',
	//		'name':'商品名称',
	//		.....
	**/

	/** DSP执行代码 - QQ **/
	window.qqAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'QQ').track('jV._Hh.q9RV6zzYbA8O544cR2rVEP');
		}
	};

	/** DSP执行代码 - 公司留言 **/
	window.commentsAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'comments').track('jV.zHh.ZX_7RcXQtTdh42Ur-qMbk0');
		}
	};
	/** DSP执行代码 - 加入采购单 **/
	window.addtolistAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'addtolist').track('jV.KHh.5rGefkA74q5P2HAVgnhxw0');
		}
	};
	/** DSP执行代码 - 立即订购 **/
	window.quickorderAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'quickorder').track('jV.AHh.MiG2rXpnyLVqPxMU3NfAU0');
		}
	};
	/** DSP执行代码 - 联系方式点击触发 **/
	window.clickcontactAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'clickcontact').track('jV.iHh.WkM09Der6PMyKuMv-kr3BX');
		}
	};
	/** DSP执行代码 - 询价留言 **/
	window.pricemessageAction = function() {
		if (isShouldDSP()) {
			py('event', 'custom', 'pricemessage').track('jV.s2h.5GCipsT-kTIMFeNvZB7UYP');
		}
	};
};